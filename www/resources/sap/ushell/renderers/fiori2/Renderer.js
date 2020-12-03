// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/UIComponent","./RendererExtensions","sap/ushell/ui/shell/ToolAreaItem","./FlpMeasure","sap/ushell/Config","sap/ushell/EventHub","sap/ushell/components/applicationIntegration/AppLifeCycle","sap/ui/Device","sap/ui/model/json/JSONModel","sap/ushell/components/SharedComponentUtils","sap/ushell/services/AppConfiguration","sap/ushell/resources","sap/ushell/components/HeaderManager"],function(U,R,T,f,C,E,A,D,J,s,a,r,H){"use strict";var n=C.last("/core/shell/enableFiori3")===true;var b=U.extend("sap.ushell.renderers.fiori2.Renderer",{metadata:{version:"1.65.1",dependencies:{version:"1.65.1",libs:["sap.ui.core","sap.m"],components:[]},routing:{config:{path:"sap.ushell.components",async:true,controlId:"viewPortContainer",clearAggregation:false,controlAggregation:n?"pages":"centerViewPort"},routes:[{name:"appfinder-legacy",pattern:"Shell-home&/appFinder/:menu:/:filter:"},{name:"home",pattern:["Shell-home?:hashParameters:","Shell-home&/:innerHash*:","Shell-home"],target:"home"},{name:"appfinder",pattern:["Shell-appfinder?:hashParameters:&/:innerHash*:","Shell-appfinder?:hashParameters*:","Shell-appfinder&/:innerHash*:","Shell-appfinder"],target:"appfinder"}],targets:{home:{name:"homepage",type:"Component",title:r.i18n.getText("homeBtn_tooltip"),id:"Shell-home-component",options:{manifest:false,asyncHints:{preloadBundles:["sap/fiori/flp-controls.js"]},componentData:{config:{enablePersonalization:true,enableHomePageSettings:false}}}},appfinder:{name:"appfinder",type:"Component",id:"Shell-appfinder-component",options:{manifest:false,asyncHints:{preloadBundles:["sap/fiori/flp-controls.js"]},componentData:{config:{enablePersonalization:true,enableHomePageSettings:false}}}}}}},init:function(){U.prototype.init.apply(this,arguments);var t=this;var o=this.getRouter();o.getRoute("home").attachMatched(function(){var h=r.i18n.getText("homeBtn_tooltip");A.switchViewState("home",false,"Shell-home");t.setCurrentCoreView("home");a.setCurrentApplication(null);A.getShellUIService().setTitle(h);A.getShellUIService().setHierarchy();A.getShellUIService().setRelatedApps();A.getAppMeta().setAppIcons();});o.getRoute("appfinder-legacy").attachMatched(function(e){o.navTo("appfinder",{},true);});o.getRoute("appfinder").attachMatched(function(e){var c=sap.ui.getCore().getComponent(t.createId("Shell-appfinder-component"));var g=e.getParameter("arguments");if(sap.ushell.Container.getRenderer("fiori2")){sap.ushell.Container.getRenderer("fiori2").setCurrentCoreView("appFinder");}a.setCurrentApplication(null);var h=c.getRouter();c.getRootControl().loaded().then(function(){h.parse(g["innerHash*"]||"");});A.switchViewState("app",false,"Shell-appfinder");A.getAppMeta().setAppIcons();});var d=new J(D);d.setDefaultBindingMode("OneWay");this.setModel(d,"device");this.setModel(r.i18nModel,"i18n");s.initializeAccessKeys();}});b.prototype.createContent=function(){var p=jQuery.sap.getUriParameters().get("appState")||jQuery.sap.getUriParameters().get("sap-ushell-config"),w,v=this.getComponentData()||{},o={applications:{"Shell-home":{}},rootIntent:"Shell-home"},V;w=(p==="headerless-opt")?"headerless":p;if(w){if(!v.config){v.config={};}v.config.appState=w;v.config.appStateOrig=p;v.config.inHeaderLessOpt=(p==="headerless-opt");}if(v.config){if(v.config.rootIntent===undefined){v.config.migrationConfig=true;}v.config=jQuery.extend(true,o,v.config);jQuery.extend(v.config.applications["Shell-home"],C.last("/core/home"),C.last("/core/catalog"));if(v.config.appState==="headerless"||v.config.appState==="merged"||v.config.appState==="blank"){v.config["enablePersonalization"]=false;C.emit("/core/shell/enablePersonalization",false);}else{v.config["enablePersonalization"]=C.last("/core/shell/enablePersonalization");}}f.start(0,"Creating Shell",0);if(v.config&&v.config.customViews){Object.keys(v.config.customViews).forEach(function(c){var V=v.config.customViews[c];sap.ui.view(c,{type:V.viewType,viewName:V.viewName,viewData:V.componentData});});}var S=C.createModel("/core/shell/model",J);v.shellModel=S;V=sap.ui.view("mainShell",{type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.ushell.renderers.fiori2.Shell",viewData:v});if(C.last("/core/shell/enableFiori3")===true){V.addStyleClass("sapUshellFiori3");}V.setModel(S);this._oShellView=V;this.oShellModel=A.getElementsModel();V.loaded().then(function(V){sap.ushell.renderers.fiori2.utils.init(V.getController());this.shellCtrl=V.oController;}.bind(this));return V;};b.prototype.createExtendedShellState=function(S,c){return A.shellElements().createExtendedShellState(S,c);};b.prototype.applyExtendedShellState=function(S,c){this.oShellModel.applyExtendedShellState(S,c);};b.prototype.showLeftPaneContent=function(i,c,S){if(c){A.shellElements().addShellModelForApplications("paneContent",typeof i==="string"?[i]:i);}else{this.oShellModel.addLeftPaneContent(typeof i==="string"?[i]:i,false,S);}};b.prototype.showHeaderItem=function(i,c,S){if(c){A.shellElements().addShellModelForApplications("headItems",typeof i==="string"?[i]:i);}else{this.oShellModel.addHeaderItem(typeof i==="string"?[i]:i,false,S);}};b.prototype.showRightFloatingContainerItem=function(i,c,S){if(c){A.shellElements().addShellModelForApplications("RightFloatingContainerItems",typeof i==="string"?[i]:i);}else{this.oShellModel.addRightFloatingContainerItem(typeof i==="string"?[i]:i,false,S);}};b.prototype.showRightFloatingContainer=function(S){A.shellElements().setShellModelForApplications("showRightFloatingContainer",S);};b.prototype.showToolAreaItem=function(i,c,S){if(c){A.shellElements().addShellModelForApplications("toolAreaItems",typeof aIds==="string"?[i]:i);}else{this.oShellModel.addToolAreaItem(i,false,S);}};b.prototype.showActionButton=function(i,c,S,I){var B=[],d=[],o;if(typeof i==="string"){i=[i];}B=i.filter(function(e){o=sap.ui.getCore().byId(e);return o instanceof sap.m.Button&&!(o instanceof sap.ushell.ui.launchpad.ActionItem);});d=i.filter(function(e){o=sap.ui.getCore().byId(e);return o instanceof sap.ushell.ui.launchpad.ActionItem;});if(B.length){this.convertButtonsToActions(B,c,S,I);}if(d.length){if(c){A.shellElements().addShellModelForApplications("actions",i,I);}else{this.oShellModel.addActionButton(i,false,S,I);}}this.toggleOverFlowActions();};b.prototype.showFloatingActionButton=function(i,c,S){if(c){A.shellElements().addShellModelForApplications("floatingActions",typeof i==="string"?[i]:i);}else{this.oShellModel.addFloatingActionButton(typeof i==="string"?[i]:i,false,S);}};b.prototype.showHeaderEndItem=function(i,c,S){if(c){A.shellElements().addShellModelForApplications("headEndItems",typeof i==="string"?[i]:i);}else{this.oShellModel.addHeaderEndItem(typeof i==="string"?[i]:i,false,S);}};b.prototype.setHeaderVisibility=function(v,c,S){if(c){A.shellElements().setShellModelForApplications("headerVisible",v);}else{this.oShellModel.setHeaderVisibility(v,false,S);}};b.prototype.showSubHeader=function(i,c,S){if(c){A.shellElements().addShellModelForApplications("subHeader",typeof i==="string"?[i]:i);}else{this.oShellModel.addSubHeader(typeof i==="string"?[i]:i,false,S);}};b.prototype.showSignOutItem=function(c,S){if(c){A.shellElements().addShellModelForApplications("actions",["logoutBtn"],false);}else{this.oShellModel.showSignOutButton(c,S);}};b.prototype.showSettingsItem=function(c,S){this.oShellModel.showSettingsButton(c,S);};b.prototype.setFooter=function(F){this.shellCtrl.setFooter(F);};b.prototype.setShellFooter=function(p){var d=new jQuery.Deferred(),t=this,c,o,e=p.controlType,g=p.oControlProperties;if(g&&g.id&&sap.ui.getCore().byId(g.id)){o=sap.ui.getCore().byId(g.id);if(o){if(this.lastFooterId){this.removeFooter();}this.lastFooterId=oInnerControl.getId();this.shellCtrl.setFooter(o);d.resolve(o);}}if(e){c=e.replace(/\./g,"/");sap.ui.require([c],function(h){o=new h(g);if(t.lastFooterId){t.removeFooter();}t.oShellModel.addElementToManagedQueue(o);t.lastFooterId=o.getId();t.shellCtrl.setFooter(o);d.resolve(o);});}else{jQuery.sap.log.warning("You must specify control type in order to create it");}return d.promise();};b.prototype.setFooterControl=function(c,o){var d=c.replace(/\./g,"/"),e=sap.ui.require(d),g,h,i=false;if(e){i=true;}else if(!jQuery.sap.getObject(c)){jQuery.sap.require(c);}h=function(o){if(c){if(i){return new e(o);}else{var j=jQuery.sap.getObject(c);return new j(o);}}else{jQuery.sap.log.warning("You must specify control type in order to create it");}};g=this.createItem(o,undefined,undefined,h);if(this.lastFooterId){this.removeFooter();}this.lastFooterId=g.getId();this.shellCtrl.setFooter(g);return g;};b.prototype.hideHeaderItem=function(i,c,S){if(typeof i==="string"){this.oShellModel.removeHeaderItem([i],c,S);}else{this.oShellModel.removeHeaderItem(i,c,S);}};b.prototype.removeToolAreaItem=function(i,c,S){E.once("ToolAreaCreated").do(function(){if(typeof i==="string"){this.oShellModel.removeToolAreaItem([i],c,S);}else{this.oShellModel.removeToolAreaItem(i,c,S);}}.bind(this));};b.prototype.removeRightFloatingContainerItem=function(i,c,S){if(typeof i==="string"){this.oShellModel.removeRightFloatingContainerItem([i],c,S);}else{this.oShellModel.removeRightFloatingContainerItem(i,c,S);}};b.prototype.hideActionButton=function(i,c,S){if(typeof i==="string"){this.oShellModel.removeActionButton([i],c,S);}else{this.oShellModel.removeActionButton(i,c,S);}this.toggleOverFlowActions();};b.prototype.toggleOverFlowActions=function(){jQuery.sap.measure.start("FLP:Shell.controller.toggleMeAreaView","show or hide actionbox if no actions in me area","FLP");var m=sap.ui.getCore().byId("meArea");var B={};try{if(m){if(m.actionBox){if(m.actionBox._getControlsIds().length===0){sap.ui.getCore().byId("overflowActions").setVisible(false);}else{m.actionBox._getControlsIds().forEach(function(c){var d=sap.ui.getCore().byId(c);if(d.getVisible()){throw B;}});sap.ui.getCore().byId("overflowActions").setVisible(false);}}}}catch(e){if(e!==B){throw e;}else{sap.ui.getCore().byId("overflowActions").setVisible(true);}}jQuery.sap.measure.end("FLP:Shell.controller.toggleMeAreaView");};b.prototype.hideLeftPaneContent=function(i,c,S){if(typeof i==="string"){this.oShellModel.removeLeftPaneContent([i],c,S);}else{this.oShellModel.removeLeftPaneContent(i,c,S);}};b.prototype.hideFloatingActionButton=function(i,c,S){if(typeof i==="string"){this.oShellModel.removeFloatingActionButton([i],c,S);}else{this.oShellModel.removeFloatingActionButton(i,c,S);}};b.prototype.hideHeaderEndItem=function(i,c,S){if(typeof i==="string"){this.oShellModel.removeHeaderEndItem([i],c,S);}else{this.oShellModel.removeHeaderEndItem(i,c,S);}};b.prototype.hideSubHeader=function(i,c,S){if(typeof i==="string"){this.oShellModel.removeSubHeader([i],c,S);}else{this.oShellModel.removeSubHeader(i,c,S);}};b.prototype.removeFooter=function(){this.shellCtrl.removeFooter();if(this.lastFooterId){var F=sap.ui.getCore().byId(this.lastFooterId);if(F){F.destroy();}this.lastFooterId=undefined;}};b.prototype.getCurrentViewportState=function(){return this.shellCtrl.getCurrentViewportState();};b.prototype.addShellSubHeader=function(p){var d=new jQuery.Deferred(),t=this,c,o,e=p.controlType,g=p.oControlProperties,i=p.bIsVisible,h=p.bCurrentState,S=p.aStates;if(g&&g.id&&sap.ui.getCore().byId(g.id)){o=sap.ui.getCore().byId(g.id);if(o){if(i){this.showSubHeader(o.getId(),h,S);}d.resolve(o);}}if(e){c=e.replace(/\./g,"/");sap.ui.require([c],function(j){o=new j(g);if(i){t.showSubHeader(o.getId(),h,S);t.oShellModel.addElementToManagedQueue(o);}d.resolve(o);});}else{jQuery.sap.log.warning("You must specify control type in order to create it");}return d.promise();};b.prototype.addSubHeader=function(c,o,i,d,S){var e=c.replace(/\./g,"/"),g=sap.ui.require(e),h,j,k=false;if(g){k=true;}else if(!jQuery.sap.getObject(c)){jQuery.sap.require(c);}j=function(o){if(c){if(k){return new g(o);}else{var l=jQuery.sap.getObject(c);return new l(o);}}else{jQuery.sap.log.warning("You must specify control type in order to create it");}};h=this.createItem(o,d,S,j);if(i){this.showSubHeader(h.getId(),d,S);}return h;};b.prototype.addUserAction=function(p){var d=new jQuery.Deferred(),t=this,c,o,e=p.controlType,g=p.oControlProperties,i=p.bIsVisible,h=p.bCurrentState,m=h?A.shellElements().getStateModelToUpdate():this.oShellModel.getModelToUpdate(),S=p.aStates,I=p.bIsFirst||true,N;if(g){o=sap.ui.getCore().byId(g.id);}if(o){d.resolve(o);}if(e){if(e==="sap.m.Button"){e="sap.ushell.ui.launchpad.ActionItem";}c=e.replace(/\./g,"/");sap.ui.require([c],function(j){var O;if(h){O=A.shellElements().getStateModelToUpdate();A.shellElements().setStateModelToUpdate(m);}else{O=t.oShellModel.getModelToUpdate();t.oShellModel.setModelToUpdate(m,true);}o=o||new j(g);if(!o.getActionType){o=new j(g);}if(i){t.showActionButton(o.getId(),h,S,I);t.oShellModel.addElementToManagedQueue(o);}if(h){A.shellElements().setStateModelToUpdate(O);}else{t.oShellModel.setModelToUpdate(O,false);}d.resolve(o);});}else{N="You must specify control type in order to create it";jQuery.sap.log.warning(N);d.reject(N);}return d.promise();};b.prototype.addActionButton=function(c,o,i,d,S,I){var e,g,h,j,k=false;if(c==="sap.m.Button"){c="sap.ushell.ui.launchpad.ActionItem";}e=c.replace(/\./g,"/");g=sap.ui.require(e);if(g){k=true;}else if(!jQuery.sap.getObject(c)){jQuery.sap.require(c);}j=function(o){if(c){if(k){return new g(o);}else{var l=jQuery.sap.getObject(c);return new l(o);}}else{jQuery.sap.log.warning("You must specify control type in order to create it");}};h=this.createItem(o,d,S,j);if(i){this.showActionButton(h.getId(),d,S,I);}return h;};b.prototype.addFloatingButton=function(p){var d=new jQuery.Deferred(),t=this,c,o,e=p.controlType,g=p.oControlProperties,i=p.bIsVisible,h=p.bCurrentState,S=p.aStates;if(g&&g.id&&sap.ui.getCore().byId(g.id)){o=sap.ui.getCore().byId(g.id);if(o){if(i){t.showFloatingActionButton(oItem.getId(),h,S);t.oShellModel.addElementToManagedQueue(o);}d.resolve(o);}}if(e){c=e.replace(/\./g,"/");}else{c="sap/m/Button";}sap.ui.require([c],function(j){o=new j(g);if(i){this.showFloatingActionButton(oItem.getId(),h,S);}d.resolve(o);});return d.promise();};b.prototype.addFloatingActionButton=function(c,o,i,d,S){var e,g,h,j,k=false;if(!c){c="sap.m.Button";}e=c.replace(/\./g,"/");g=sap.ui.require(e);if(g){k=true;}else if(!jQuery.sap.getObject(c)){jQuery.sap.require(c);}j=function(o){if(c){if(k){return new g(o);}else{var l=jQuery.sap.getObject(c);return new l(o);}}else{jQuery.sap.log.warning("You must specify control type in order to create it");}};h=this.createItem(o,d,S,j);if(i){this.showFloatingActionButton(h.getId(),d,S);}return h;};b.prototype.addSidePaneContent=function(p){var d=new jQuery.Deferred(),t=this,c,o,e=p.controlType,g=p.oControlProperties,i=p.bIsVisible,h=p.bCurrentState,S=p.aStates;if(g&&g.id&&sap.ui.getCore().byId(g.id)){o=sap.ui.getCore().byId(g.id);if(o){d.resolve(o);}}if(e){c=e.replace(/\./g,"/");sap.ui.require([c],function(j){o=new j(g);if(i){t.oShellModel.addElementToManagedQueue(o);t.showLeftPaneContent(oItem.getId(),h,S);}d.resolve(o);});}else{jQuery.sap.log.warning("You must specify control type in order to create it");}return d.promise();};b.prototype.addLeftPaneContent=function(c,o,i,d,S){var e=c.replace(/\./g,"/"),g=sap.ui.require(e),h,j,k;if(g){k=true;}else if(!jQuery.sap.getObject(c)){jQuery.sap.require(c);}j=function(o){if(c){if(k){return new g(o);}else{var l=jQuery.sap.getObject(c);return new l(o);}}else{jQuery.sap.log.warning("You must specify control type in order to create it");}};h=this.createItem(o,d,S,j);if(i){this.showLeftPaneContent(h.getId(),d,S);}return h;};b.prototype.addHeaderItem=function(c,o,i,d,S){if(typeof(arguments[0])==="object"&&typeof(arguments[1])==="boolean"){o=arguments[0];i=arguments[1];d=arguments[2];S=arguments[3];}else{jQuery.sap.log.warning("sap.ushell.renderers.fiori2.Renderer: The parameter 'controlType' of the function 'addHeaderItem' is deprecated. Usage will be ignored!");}var p=o;p.showSeparator=false;var e=function(o){return new sap.ushell.ui.shell.ShellHeadItem(o);},I=this.createItem(p,d,S,e);if(i){this.showHeaderItem(I.getId(),d,S);}return I;};b.prototype.addRightFloatingContainerItem=function(c,i,d,S){var e=function(c){return new sap.m.NotificationListItem(c);},I=this.createItem(c,d,S,e);if(i){this.showRightFloatingContainerItem(I.getId(),d,S);}return I;};b.prototype.addToolAreaItem=function(c,i,d,S){var e=function(c){return new T(c);},I=this.createItem(c,d,S,e);E.once("ToolAreaCreated").do(function(){if(i){this.showToolAreaItem(I.getId(),d,S);}}.bind(this));return I;};b.prototype.addHeaderEndItem=function(c,o,i,d,S){var p=o;p.showSeparator=false;var e=function(o){return new sap.ushell.ui.shell.ShellHeadItem(o);},I=this.createItem(p,d,S,e);if(i){this.showHeaderEndItem(I.getId(),d,S);}return I;};b.prototype.getModelConfiguration=function(){return this.shellCtrl.getModelConfiguration();};b.prototype.addEndUserFeedbackCustomUI=function(c,S){this.shellCtrl.addEndUserFeedbackCustomUI(c,S);};b.prototype.addUserPreferencesEntry=function(e){return this.shellCtrl.addUserPreferencesEntry(e);};b.prototype.setHeaderTitle=function(t,c,o){var d,e=null,g;if(o&&o.id&&sap.ui.getCore().byId(o.id)){e=sap.ui.getCore().byId(o.id);this.shellCtrl.setHeaderTitle(t,e);}else if(c){d=c.replace(/\./g,"/");g=sap.ui.require(d);if(g){e=new g(o);this.shellCtrl.setHeaderTitle(t,e);}else{sap.ui.require([d],function(g){e=new g(o);this.shellCtrl.setHeaderTitle(t,e);});}}else{this.shellCtrl.setHeaderTitle(t,e);}};b.prototype.setLeftPaneVisibility=function(l,v){this.oShellModel.setLeftPaneVisibility(v,false,[l]);};b.prototype.showToolArea=function(l,v){this.oShellModel.showShellItem("/toolAreaVisible",l,v);};b.prototype.setHeaderHiding=function(h){return this.oShellModel.setHeaderHiding(h);};b.prototype.setFloatingContainerContent=function(c,d,S){this.shellCtrl.setFloatingContainerContent("floatingContainerContent",[c.getId()],d,S);};b.prototype.setFloatingContainerVisibility=function(v){this.shellCtrl.setFloatingContainerVisibility(v);};b.prototype.getFloatingContainerState=function(){return this.shellCtrl.getFloatingContainerState();};b.prototype.getFloatingContainerVisiblity=function(){return this.shellCtrl.getFloatingContainerVisibility();};b.prototype.getRightFloatingContainerVisibility=function(){return this.shellCtrl.getRightFloatingContainerVisibility();};b.prototype.setFloatingContainerDragSelector=function(e){this.shellCtrl.setFloatingContainerDragSelector(e);};b.prototype.makeEndUserFeedbackAnonymousByDefault=function(e){this.shellCtrl.makeEndUserFeedbackAnonymousByDefault(e);};b.prototype.showEndUserFeedbackLegalAgreement=function(S){this.shellCtrl.showEndUserFeedbackLegalAgreement(S);};b.prototype.LaunchpadState={App:"app",Home:"home"};b.prototype.createTriggers=function(t,c,S){this.oShellModel.createTriggers(t,c,S);};b.prototype.convertButtonsToActions=function(i,c,S,I){var p={},B,t=this;i.forEach(function(d){B=sap.ui.getCore().byId(d);p.id=B.getId();p.text=B.getText();p.icon=B.getIcon();p.tooltip=B.getTooltip();p.enabled=B.getEnabled();p.visible=B.getVisible();if(B.mEventRegistry&&B.mEventRegistry.press){p.press=B.mEventRegistry.press[0].fFunction;}B.destroy();t.addActionButton("sap.ushell.ui.launchpad.ActionItem",p,p.visible,c,S,I);});};b.prototype.createItem=function(c,d,S,e){var i;if(c&&c.id){i=sap.ui.getCore().byId(c.id);}if(!i){i=e(c);if(d){this.oShellModel.addElementToManagedQueue(i);}}return i;};b.prototype.addEntryInShellStates=function(N,e,c,d,S){this.oShellModel.addEntryInShellStates(N,e,c,d,S);};b.prototype.removeCustomItems=function(S,i,c,d){if(typeof i==="string"){this.oShellModel.removeCustomItems(S,[i],c,d);}else{this.oShellModel.removeCustomItems(S,i,c,d);}};b.prototype.addCustomItems=function(S,i,c,d){if(typeof i==="string"){this.oShellModel.addCustomItems(S,[i],c,d);}else{this.oShellModel.addCustomItems(S,i,c,d);}};b.prototype.addRightViewPort=function(v){this.shellCtrl.getViewPortContainer().addRightViewPort(v,false);};b.prototype.addLeftViewPort=function(v){this.shellCtrl.getViewPortContainer().addLeftViewPort(v,false);};b.prototype.getShellController=function(){return this.shellCtrl;};b.prototype.getViewPortContainerCurrentState=function(){return this.shellCtrl.getViewPortContainer().getCurrentState();};b.prototype.ViewPortContainerNavTo=function(N,t,c){return this.shellCtrl.getViewPortContainer().navTo(N,t,c);};b.prototype.switchViewPortStateByControl=function(o,S){var t=this,c=false;if(o&&o.setEnabled&&typeof o.setEnabled==="function"){c=true;}if(c){o.addStyleClass("sapUshellShellHeadItemOverrideDisableStyle");o.setEnabled(false);}function d(){o.setEnabled(true);o.removeStyleClass("sapUshellShellHeadItemOverrideDisableStyle");t.shellCtrl.getViewPortContainer().detachAfterSwitchStateAnimationFinished(d);}if(c){this.ViewPortContainerAttachAfterSwitchStateAnimationFinished(d);}this.shellCtrl.getViewPortContainer().switchState(S);};b.prototype.ViewPortContainerAttachAfterSwitchStateAnimationFinished=function(c){this.shellCtrl.getViewPortContainer().attachAfterSwitchStateAnimationFinished(c);};b.prototype.setMeAreaSelected=function(S){this.shellCtrl.setMeAreaSelected(S);};b.prototype.getMeAreaSelected=function(){return this.shellCtrl.getMeAreaSelected();};b.prototype.setNotificationsSelected=function(S){this.shellCtrl.setNotificationsSelected(S);};b.prototype.getNotificationsSelected=function(){return this.shellCtrl.getNotificationsSelected();};b.prototype.addShellDanglingControl=function(c){this.shellCtrl.getView().addDanglingControl(c);};b.prototype.getShellConfig=function(){return(this.shellCtrl.getView().getViewData()?this.shellCtrl.getView().getViewData().config||{}:{});};b.prototype.getEndUserFeedbackConfiguration=function(){return this.shellCtrl.oEndUserFeedbackConfiguration;};b.prototype.reorderUserPrefEntries=function(e){return this.shellCtrl._reorderUserPrefEntries(e);};b.prototype.addUserProfilingEntry=function(e){this.shellCtrl.addUserProfilingEntry(e);};b.prototype.logRecentActivity=function(o){if(!o.appType){o.appType="App";}if(!o.appId){o.appId=o.url;}return this.shellCtrl._logRecentActivity(o);};b.prototype.setCurrentCoreView=function(c){this.currentCoreView=c;};b.prototype.getCurrentCoreView=function(){return this.currentCoreView;};return b;});
