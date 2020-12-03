// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/Table","sap/m/Column","sap/m/CheckBox","sap/m/Switch","sap/m/Text","sap/m/Label","sap/m/VBox","sap/m/HBox","sap/m/FlexBox","sap/ui/core/Icon","sap/m/ColumnListItem","sap/ui/core/TextAlign","sap/m/BackgroundDesign","sap/m/ListSeparators","sap/ui/model/Sorter"],function(T,C,a,S,b,L,V,H,F,I,c,d,B,e,f){"use strict";sap.ui.jsview("sap.ushell.components.shell.Notifications.Settings",{createContent:function(o){var t=this,n,g,s,v,h,r=sap.ushell.resources.i18n;n=new T("notificationSettingsTable",{backgroundDesign:B.Transparent,showSeparators:e.All,fixedLayout:false,columns:[new C({header:new b({text:r.getText("notificationType_column"),tooltip:r.getText("notificationType_columnTooltip")}),vAlign:"Middle",hAlign:"Left"}),new C({header:new b({text:r.getText("iOSNotification_column"),tooltip:r.getText("iOSNotification_columnTooltip")}),visible:"{/flags/mobileNotificationsEnabled}",minScreenWidth:"Tablet",demandPopin:true,vAlign:"Middle",hAlign:"Left"}),new C({header:new b({text:r.getText("eMailFld"),tooltip:r.getText("email_columnTooltip")}),visible:"{/flags/emailNotificationsEnabled}",minScreenWidth:"Tablet",demandPopin:true,vAlign:"Middle",hAlign:"Left"}),new C({header:new b({text:r.getText("highNotificationsBanner_column"),tooltip:r.getText("highNotificationsBanner_columnTooltip")}),minScreenWidth:"Tablet",demandPopin:true,hAlign:"Left"}),new C({header:new b({text:r.getText("Notifications_Settings_Show_Type_column"),tooltip:r.getText("notificationTypeEnable_columnTooltip")}),vAlign:"Middle",hAlign:"Left"})]});g=new c({cells:[new L({text:"{NotificationTypeDesc}"}),new a({selected:{parts:["DoNotDeliverMob"],formatter:function(D){return!D;}},select:function(E){t.getController().setControlDirtyFlag.apply(this);var p=E.getSource().getBindingContext().sPath;t.getModel().setProperty(p+"/DoNotDeliverMob",!E.mParameters.selected);}}),new a({visible:{parts:["IsEmailEnabled","IsEmailIdMaintained","DoNotDeliver"],formatter:function(E,i,D){return E&&i&&!D;}},selected:{path:"DoNotDeliverEmail",formatter:function(D){return!D;}},select:function(E){t.getController().setControlDirtyFlag.apply(this);var p=E.getSource().getBindingContext().sPath;t.getModel().setProperty(p+"/DoNotDeliverEmail",!E.mParameters.selected);}}),new a({select:function(E){t.getController().setControlDirtyFlag.apply(this);var p=E.getSource().getBindingContext().sPath;if(E.mParameters.selected===true){t.getModel().setProperty(p+"/PriorityDefault","40-HIGH");}else{t.getModel().setProperty(p+"/PriorityDefault","");}},selected:{parts:["PriorityDefault"],formatter:function(p){t.getController().setControlDirtyFlag.apply(this);if(p==="40-HIGH"){return true;}return false;}}}),new S({state:{parts:["DoNotDeliver"],formatter:function(D){return!D;}},customTextOn:" ",customTextOff:" ",change:function(E){var N=E.getParameter("state"),p=E.getSource().getBindingContext().sPath;t.getModel().setProperty(p+"/DoNotDeliver",!N);t.getController().setControlDirtyFlag.apply(this);}})]});n.bindAggregation("items",{path:"/rows",template:g,sorter:new f("NotificationTypeDesc")});v=new V();s=this.createSwitchControlBar();h=new V();h.addStyleClass("sapContrastPlus");h.addItem(s);v.addItem(h);v.addItem(n);return[v];},createSwitchControlBar:function(){var D,o,g,p,E,h,s,r=sap.ushell.resources.i18n,i=sap.ui.Device.system,j=i.desktop||i.tablet||i.combi;s=new F('notificationSettingsSwitchBar');o=new L("doNotDisturbLabel",{text:r.getText("Show_High_Priority_Alerts_title")});D=new S("doNotDisturbSwitch",{tooltip:r.getText("showAlertsForHighNotifications_tooltip"),state:"{/flags/highPriorityBannerEnabled}",customTextOn:r.getText("Yes"),customTextOff:r.getText("No")}).addAriaLabelledBy(o);g=new H("notificationDoNotDisturbHBox",{items:[D,o]});s.addItem(g);if(j===true){E=new L("enablePreviewLabel",{text:r.getText("Show_Preview_in_Home_Page_title"),visible:"{/flags/previewNotificationVisible}"});p=new S("enablePreviewSwitch",{tooltip:r.getText("showNotificationsPreview_tooltip"),state:"{/flags/previewNotificationEnabled}",customTextOn:r.getText("Yes"),customTextOff:r.getText("No"),visible:"{/flags/previewNotificationVisible}"}).addAriaLabelledBy(E);h=new F({items:[p,E]});s.addItem(h);}return s;},getNoDataUI:function(){var n,N,o,g,r=sap.ushell.resources.i18n;if(n===undefined){N=new I("notificationSettingsNoDataIcon",{size:"5rem",src:"sap-icon://message-information"});o=new b("notificationSettingsNoDataTextHeader",{text:r.getText("noNotificationTypesEnabledHeader_message")}).setTextAlign(d.Center);g=new b("notificationSettingsNoDataText",{text:r.getText("noNotificationTypesEnabled_message")}).setTextAlign(d.Center);n=new V("notificationSettingsNoDataInnerBox",{items:[N,o,g]});}return n;},getControllerName:function(){return"sap.ushell.components.shell.Notifications.Settings";}});},false);
