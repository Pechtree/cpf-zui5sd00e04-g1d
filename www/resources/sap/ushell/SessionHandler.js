// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/ushell/resources','sap/m/Dialog','sap/m/Button','sap/m/Text','sap/ui/model/json/JSONModel'],function(r,d,b,t,J){"use strict";var S=function(){this.init=function(c){jQuery.sap.measure.start("SessionTimeoutInit","Inititialize Session Timeout","FLP_SHELL");this.config=c;this.oModel=new J();if(this.config.enableAutomaticSignout===undefined){this.config.enableAutomaticSignout=false;}if(this.config.sessionTimeoutReminderInMinutes===undefined){this.config.sessionTimeoutReminderInMinutes=0;}this.oModel.setProperty("/SessionRemainingTimeInSeconds",this.config.sessionTimeoutReminderInMinutes*60);this.counter=0;this.oKeepAliveDialog=undefined;this.oLocalStorage=jQuery.sap.storage(jQuery.sap.storage.Type.local,"com.sap.ushell.adapters.local.session");this.putTimestampInStorage(this._getCurrentDate());this.putContinueWorkingVisibilityInStorage(null);this.attachUserEvents();this.notifyServer();this.notifyUserInactivity();jQuery.sap.measure.end("SessionTimeoutInit");};this.notifyUserInactivity=function(){var a=this._getCurrentDate()-new Date(this.getTimestampFromStorage()),c=a/(1000*60),e=this.config.sessionTimeoutIntervalInMinutes-this.config.sessionTimeoutReminderInMinutes;if(c<e){setTimeout(this.notifyUserInactivity.bind(this),(e-c)*60*1000);}else if(this.config.sessionTimeoutReminderInMinutes>0){this.putContinueWorkingVisibilityInStorage(null);this.detachUserEvents();this.handleSessionRemainingTime(this.config.sessionTimeoutReminderInMinutes*60,true);this.oContinueWorkingDialog=this.createContinueWorkingDialog();this.oContinueWorkingDialog.open();}else{this.handleSessionOver();}};this.handleSessionOver=function(){clearTimeout(this.notifyServerTimer);sap.ui.getCore().getEventBus().publish("launchpad","sessionTimeout");if(this.config.enableAutomaticSignout===true){this.logout();}else{this.createSessionExpiredDialog().open();}};this.notifyServer=function(){var a=this._getCurrentDate()-new Date(this.getTimestampFromStorage()),c=a/(1000*60);if(c<=this.config.sessionTimeoutIntervalInMinutes){sap.ushell.Container.sessionKeepAlive();}else{}this.notifyServerTimer=setTimeout(this.notifyServer.bind(this),this.config.sessionTimeoutIntervalInMinutes*60*1000);};this.handleSessionRemainingTime=function(R){var a=this;var s=this.getContinueWorkingVisibilityFromStorage();if(s!=undefined&&s===false&&this.oContinueWorkingDialog&&this.oContinueWorkingDialog.isOpen()){this.continueWorkingButtonPressHandler();}if(R===0){if(this.oSessionKeepAliveDialog){this.oSessionKeepAliveDialog.close();}this.handleSessionOver();}else{R=R-1;this.oModel.setProperty("/SessionRemainingTimeInSeconds",R);this.remainingTimer=setTimeout(a.handleSessionRemainingTime.bind(a,R,false),1000);}};this.createContinueWorkingDialog=function(){var a=this;this.oMessageVBox=new sap.m.VBox();this.oSessionKeepAliveLabel=new t({text:{parts:["/SessionRemainingTimeInSeconds"],formatter:function(s){var i=s>60,T,c,m;T=i?r.i18n.getText("sessionTimeoutMessage_units_minutes"):r.i18n.getText("sessionTimeoutMessage_units_seconds");c=i?Math.ceil(s/60):s;if(a.config.enableAutomaticSignout){m=r.i18n.getText("sessionTimeoutMessage_kioskMode_main",[c,T]);}else{m=r.i18n.getText("sessionTimeoutMessage_main",[c,T]);}return m;}}});this.oMessageVBox.addItem(this.oSessionKeepAliveLabel);if(this.config.enableAutomaticSignout===false){this.oLostDataReminder=new t({text:r.i18n.getText("sessionTimeoutMessage_unsavedData")});this.oMessageVBox.addItem(this.oLostDataReminder);}this.oSessionKeepAliveLabel.setModel(this.oModel);this.oSessionKeepAliveDialog=new d("sapUshellKeepAliveDialog",{title:r.i18n.getText("sessionTimeoutMessage_title"),type:'Message',state:sap.ui.core.ValueState.Warning,content:this.oMessageVBox,beginButton:this.getContinueWorkingButton(),afterClose:function(){this.oSessionKeepAliveDialog.destroy();}.bind(this)});if(this.config.enableAutomaticSignout===true){this.oSignOutButton=new b({text:r.i18n.getText("logoutBtn_title"),tooltip:r.i18n.getText("logoutBtn_tooltip"),press:this.logout.bind(this)});this.oSessionKeepAliveDialog.setEndButton(this.oSignOutButton);}return this.oSessionKeepAliveDialog;};this.getContinueWorkingButton=function(){var a=this;return new b({text:r.i18n.getText("sessionTimeoutMessage_continue_button_title"),press:a.continueWorkingButtonPressHandler.bind(a)});};this.continueWorkingButtonPressHandler=function(){if(this.oSessionKeepAliveDialog){this.oSessionKeepAliveDialog.close();}clearTimeout(this.remainingTimer);this.putTimestampInStorage(this._getCurrentDate());this.notifyUserInactivity();this.attachUserEvents();this.putContinueWorkingVisibilityInStorage(false);};this.createSessionExpiredDialog=function(){this.oSessionExpiredDialog=new d("sapUshellSessioTimedOutDialog",{title:r.i18n.getText("sessionExpiredMessage_title"),type:'Message',state:sap.ui.core.ValueState.Warning,content:new t({text:r.i18n.getText("sessionExpiredMessage_main")}),beginButton:this.getReloadButton(),afterClose:function(){this.oSessionExpiredDialog.destroy();}.bind(this)});return this.oSessionExpiredDialog;};this.getReloadButton=function(){var a=this;return new b({text:r.i18n.getText("sessionExpiredMessage_reloadPage_button_title"),press:function(){a.oSessionExpiredDialog.close();location.reload();}});};this.attachUserEvents=function(){jQuery(document).on("mousedown.sessionTimeout mousemove.sessionTimeout",this.userActivityHandler.bind(this));jQuery(document).on("keyup.sessionTimeout",this.userActivityHandler.bind(this));jQuery(document).on("touchstart.sessionTimeout",this.userActivityHandler.bind(this));sap.ushell.Container.getService("AppLifeCycle").attachAppLoaded({},this.userActivityHandler,this);};this.detachUserEvents=function(){jQuery(document).off("mousedown.sessionTimeout mousemove.sessionTimeout");jQuery(document).off("keydown.sessionTimeout");jQuery(document).off("touchstart.sessionTimeout");sap.ushell.Container.getService("AppLifeCycle").detachAppLoaded(this.userActivityHandler,this);};this.putTimestampInStorage=function(a){jQuery.sap.measure.average("SessionTimeoutPutLocalStorage","Put timestamp in local storage Average","FLP_SHELL");this.oLocalStorage.put("lastActivityTime",a);jQuery.sap.measure.end("SessionTimeoutPutLocalStorage");};this.putContinueWorkingVisibilityInStorage=function(v){this.oLocalStorage.put("showContinueWorkingDialog",v);};this.getContinueWorkingVisibilityFromStorage=function(){return this.oLocalStorage.get("showContinueWorkingDialog");};this.getTimestampFromStorage=function(){return this.oLocalStorage.get("lastActivityTime");};this.userActivityHandler=function(e){if(this.oUserActivityTimer!==undefined){return;}var a=this;this.oUserActivityTimer=setTimeout(function(){a.putTimestampInStorage(a._getCurrentDate());a.oUserActivityTimer=undefined;},1000);};this._getCurrentDate=function(){return new Date();};this.logout=function(){var l=new sap.ushell.ui.launchpad.LoadingDialog({text:""});this.detachUserEvents();clearTimeout(this.oUserActivityTimer);clearTimeout(this.remainingTimer);clearTimeout(this.notifyServerTimer);l.openLoadingScreen();l.showAppInfo(r.i18n.getText("beforeLogoutMsg"),null);sap.ushell.Container.logout();};};return S;},true);
