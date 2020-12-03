// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/Layout","sap/ui/base/Object","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ushell/ui/launchpad/Tile","sap/ushell/ui/launchpad/DashboardGroupsContainer","sap/ushell/EventHub","sap/ushell/Config","sap/ui/core/Component","sap/m/GenericTile","sap/base/Log","sap/ui/Device","sap/ui/integration/widgets/Card"],function(L,b,F,a,c,D,E,C,d,G,e,f,g){"use strict";var h=b.extend("sap.ushell.components.homepage.DashboardGroupsBox",{metadata:{publicMethods:["createGroupsBox"]},constructor:function(i,s){if(sap.ushell.components.homepage.getDashboardGroupsBox&&sap.ushell.components.homepage.getDashboardGroupsBox()){return sap.ushell.components.homepage.getDashboardGroupsBox();}sap.ushell.components.homepage.getDashboardGroupsBox=jQuery.sap.getter(this.getInterface());this.oController=undefined;this.oGroupsContainer=undefined;this.isLinkPersonalizationSupported=sap.ushell.Container.getService("LaunchPage").isLinkPersonalizationSupported();sap.ui.getCore().getEventBus().subscribe("launchpad","actionModeActive",this._handleActionModeChange,this);sap.ui.getCore().getEventBus().subscribe("launchpad","actionModeInactive",this._handleActionModeChange,this);sap.ui.getCore().getEventBus().subscribe("launchpad","GroupHeaderVisibility",this._updateGroupHeaderVisibility,this);},destroy:function(){sap.ui.getCore().getEventBus().unsubscribe("launchpad","actionModeActive",this._handleActionModeChange,this);sap.ui.getCore().getEventBus().unsubscribe("launchpad","actionModeInactive",this._handleActionModeChange,this);sap.ui.getCore().getEventBus().unsubscribe("launchpad","GroupHeaderVisibility",this._updateGroupHeaderVisibility,this);sap.ushell.components.homepage.getDashboardGroupsBox=undefined;},calculateFilter:function(){var i=[];var o;var s=this.oModel.getProperty("/homePageGroupDisplay"),j=this.oModel.getProperty("/tileActionModeActive");if(!j){if(s&&s==="tabs"){o=new F("isGroupSelected",a.EQ,true);}else{o=new F("isGroupVisible",a.EQ,true);}i.push(o);}return i;},createGroupsBox:function(o,m){this.oController=o;var t=this,A,i,j=function(l){var n,p;if(l&&(n=l.getDomRef())){p=n.querySelector(".sapUshellPlusTile");if(p){return p;}}return null;},r=function(l){var p=j(l.currentGroup),n=j(l.endGroup),q=(l.tiles[l.tiles.length-2]===l.item)||(l.endGroup.getTiles().length===0);if(q){t._hidePlusTile(n);}else{t._showPlusTile(n);}if(l.currentGroup!==l.endGroup){t._showPlusTile(p);}};A=function(){L.getLayoutEngine().setExcludedControl(sap.ushell.ui.launchpad.PlusTile);L.getLayoutEngine().setReorderTilesCallback.call(L.layoutEngine,r);};i=function(){if(!L.isInited){L.init({getGroups:this.getGroups.bind(this),getAllGroups:t.getAllGroupsFromModel.bind(t),isTabBarActive:t.isTabBarActive.bind(t),animationsEnabled:(t.oModel.getProperty("/animationMode")==="full")}).done(A);f.media.attachHandler(function(){if(!this.bIsDestroyed){L.reRenderGroupsLayout(null);}},this,f.media.RANGESETS.SAP_STANDARD);var l=this.getDomRef();o.getView().sDashboardGroupsWrapperId=!jQuery.isEmptyObject(l)&&l.parentNode?l.parentNode.id:"";}L.reRenderGroupsLayout(null);if(this.getGroups().length){if(o.bModelInitialized){o._initializeUIActions();}o._addBottomSpace();if(this.getModel().getProperty("/enableTilesOpacity")){sap.ushell.utils.handleTilesOpacity(this.getModel());}}E.emit("CenterViewPointContentRendered",{"groups":this.getGroups().length});sap.ui.getCore().getEventBus().publish("launchpad","contentRendered");sap.ui.getCore().getEventBus().publish("launchpad","contentRefresh");this.getBinding("groups").filter(t.calculateFilter());};this.isTabBarActive=function(){return this.oModel.getProperty("/homePageGroupDisplay")==="tabs";};this.oModel=m;var k=this.calculateFilter(),u=C.last("/core/home/gridContainer");this.oGroupsContainer=new D("dashboardGroups",{accessibilityLabel:sap.ushell.resources.i18n.getText("DashboardGroups_label"),displayMode:"{/homePageGroupDisplay}",afterRendering:i});if(u){sap.ui.require(["sap/ushell/ui/launchpad/GridContainer"],function(l){t.oGroupsContainer.bindAggregation("groups",{filters:k,path:"/groups",factory:function(){return t._createGridContainer(o,m);}});});}else{this.oGroupsContainer.bindAggregation("groups",{filters:k,path:"/groups",factory:function(){return t._createTileContainer(o,m);}});}this.oGroupsContainer.addEventDelegate({onsapskipback:function(l){l.preventDefault();sap.ushell.renderers.fiori2.AccessKeysHandler.setIsFocusHandledByAnotherHandler(true);if(jQuery(".sapUshellAnchorItem:visible:first").length){sap.ushell.components.homepage.ComponentKeysHandler.goToSelectedAnchorNavigationItem();}else{sap.ushell.renderers.fiori2.AccessKeysHandler.sendFocusBackToShell(l);}},onsapskipforward:function(l){l.preventDefault();var n=jQuery("#sapUshellDashboardFooterDoneBtn:visible");if(n.length){n.focus();}else if(jQuery("#sapUshellFloatingContainerWrapper:visible").length&&l.originalEvent.srcElement.id!==""){sap.ui.getCore().getEventBus().publish("launchpad","shellFloatingContainerIsAccessible");}else{sap.ushell.renderers.fiori2.AccessKeysHandler.setIsFocusHandledByAnotherHandler(true);sap.ushell.renderers.fiori2.AccessKeysHandler.sendFocusBackToShell(l);}},onsaptabnext:function(l){if(t.oModel.getProperty("/tileActionModeActive")){if(jQuery(document.activeElement).closest(".sapUshellTileContainerHeader").length){var n=jQuery(document.activeElement).closest(".sapUshellTileContainer");var p=jQuery(document.activeElement).hasClass("sapUshellContainerTitle");var q=n.find(".sapUshellHeaderActionButton");if(p&&!q.length||document.activeElement.id===q.last()[0].id){if(n.find(".sapUshellTile:visible, .sapUshellLink:visible, .sapFCard:visible").length){l.preventDefault();sap.ushell.components.homepage.ComponentKeysHandler.goToLastVisitedTile(n,true);return;}}if(q.length&&document.activeElement.id!==q.last()[0].id){return;}}var s=jQuery("#sapUshellDashboardFooterDoneBtn:visible");if(s.length){l.preventDefault();s.focus();return;}}l.preventDefault();if(jQuery("#sapUshellFloatingContainerWrapper:visible").length&&(l.originalEvent.srcElement.id)!==""){sap.ui.getCore().getEventBus().publish("launchpad","shellFloatingContainerIsAccessible");}else{sap.ushell.renderers.fiori2.AccessKeysHandler.setIsFocusHandledByAnotherHandler(true);sap.ushell.renderers.fiori2.AccessKeysHandler.sendFocusBackToShell(l);}},onsaptabprevious:function(l){sap.ushell.renderers.fiori2.AccessKeysHandler.setIsFocusHandledByAnotherHandler(true);var n=jQuery(":focus");if(!t.oModel.getProperty("/tileActionModeActive")||n.hasClass("sapUshellTileContainerHeader")){l.preventDefault();var p=jQuery(".sapUshellAnchorItem:visible:first"),q=jQuery(".sapUshellAnchorItemOverFlow");if(!p.length){sap.ushell.renderers.fiori2.AccessKeysHandler.sendFocusBackToShell(l);}if(q.hasClass("sapUshellShellHidden")){sap.ushell.components.homepage.ComponentKeysHandler.goToSelectedAnchorNavigationItem();}else{q.find("button").focus();}}else if(t.oModel.getProperty("/tileActionModeActive")){var s=jQuery(document.activeElement);if(s.hasClass("sapUshellTile")){l.preventDefault();var v=s.closest(".sapUshellTileContainer");var w=v.find(".sapUshellHeaderActionButton:visible").last();if(w.length>0){w.focus();}else{v.find(".sapUshellContainerTitle").focus();}}}}});return this.oGroupsContainer;},getAllGroupsFromModel:function(){return this.oModel.getProperty("/groups");},_createTileContainer:function(o,m){var t=this,i=new F("isTileIntentSupported",a.EQ,true),T=new sap.ushell.ui.launchpad.TileContainer({headerText:"{title}",showEmptyLinksArea:{parts:["/tileActionModeActive","links/length","isGroupLocked","/isInDrag","/homePageGroupDisplay"],formatter:function(j,n,k,I,A){if(n){return true;}else if(k){return false;}return j||I&&A==="tabs";}},showMobileActions:{parts:["/tileActionModeActive"],formatter:function(I){return I&&!this.getDefaultGroup();}},showIcon:{parts:["/isInDrag","/tileActionModeActive"],formatter:function(I,j){return(this.getIsGroupLocked()&&(I||j));}},deluminate:{parts:["/isInDrag"],formatter:function(I){return this.getIsGroupLocked()&&I;}},transformationError:{parts:["/isInDrag","/draggedTileLinkPersonalizationSupported"],formatter:function(I,j){return I&&!j;}},showBackground:"{/tileActionModeActive}",tooltip:"{title}",tileActionModeActive:"{/tileActionModeActive}",ieHtml5DnD:o.getView().ieHtml5DnD,enableHelp:"{/enableHelp}",groupId:"{groupId}",defaultGroup:"{isDefaultGroup}",isLastGroup:"{isLastGroup}",isGroupLocked:"{isGroupLocked}",isGroupSelected:"{isGroupSelected}",showHeader:true,showGroupHeader:"{showGroupHeader}",homePageGroupDisplay:"{/homePageGroupDisplay}",editMode:"{editMode}",supportLinkPersonalization:this.isLinkPersonalizationSupported,titleChange:function(j){sap.ui.getCore().getEventBus().publish("launchpad","changeGroupTitle",{groupId:j.getSource().getGroupId(),newTitle:j.getParameter("newTitle")});},showEmptyLinksAreaPlaceHolder:{parts:["links/length","/isInDrag","/homePageGroupDisplay"],formatter:function(n,I,A){return I&&A==="tabs"&&!n;}},showPlaceholder:{parts:["/tileActionModeActive","tiles/length"],formatter:function(j){return j&&!this.getIsGroupLocked();}},visible:{parts:["/tileActionModeActive","isGroupVisible","visibilityModes"],formatter:function(j,k,v){if(!v[j?1:0]){return false;}return k||j;}},hidden:{parts:["/tileActionModeActive","isGroupVisible"],formatter:function(I,j){return I&&!j;}},links:this._getLinkTemplate(),tiles:{path:"tiles",factory:this._itemFactory.bind(this),filters:[i]},add:function(j){if(document.toDetail){document.toDetail();}d.getOwnerComponentFor(t.oController.getView().parentComponent).getRouter().navTo("appfinder",{"innerHash*":"catalog/"+JSON.stringify({targetGroup:encodeURIComponent(j.getSource().getBindingContext().sPath)})});}});return T;},_createGridContainer:function(o,m){var i=sap.ui.require("sap/ushell/ui/launchpad/GridContainer"),j=new F("isTileIntentSupported",a.EQ,true);return new i({groupId:"{groupId}",showHeader:true,defaultGroup:"{isDefaultGroup}",isLastGroup:"{isLastGroup}",headerText:"{title}",showGroupHeader:"{showGroupHeader}",homePageGroupDisplay:"{/homePageGroupDisplay}",visible:{parts:["/tileActionModeActive","isGroupVisible","visibilityModes"],formatter:function(t,k,v){if(!v[t?1:0]){return false;}return k||t;}},isGroupLocked:"{isGroupLocked}",isGroupSelected:"{isGroupSelected}",editMode:"{editMode}",showBackground:"{/tileActionModeActive}",showIcon:{parts:["/isInDrag","/tileActionModeActive"],formatter:function(I,k){return(this.getIsGroupLocked()&&(I||k));}},tileActionModeActive:"{/tileActionModeActive}",supportLinkPersonalization:this.isLinkPersonalizationSupported,ieHtml5DnD:o.getView().ieHtml5DnD,enableHelp:"{/enableHelp}",showEmptyLinksAreaPlaceHolder:{parts:["links/length","/isInDrag","/homePageGroupDisplay"],formatter:function(n,I,A){return I&&A==="tabs"&&!n;}},showEmptyLinksArea:{parts:["/tileActionModeActive","links/length","isGroupLocked","/isInDrag","/homePageGroupDisplay"],formatter:function(t,n,k,I,A){if(n){return true;}else if(k){return false;}return t||I&&A==="tabs";}},titleChange:function(k){sap.ui.getCore().getEventBus().publish("launchpad","changeGroupTitle",{groupId:k.getSource().getGroupId(),newTitle:k.getParameter("newTitle")});},tooltip:"{title}",links:this._getLinkTemplate(),tiles:{path:"tiles",factory:this._itemFactory.bind(this),filters:[j]}});},_getLinkTemplate:function(){var o=new F("isTileIntentSupported",a.EQ,true);if(!this.isLinkPersonalizationSupported){return{path:"links",templateShareable:true,template:new sap.ushell.ui.launchpad.LinkTileWrapper({uuid:"{uuid}",tileCatalogId:"{tileCatalogId}",target:"{target}",isLocked:"{isLocked}",tileActionModeActive:"{/tileActionModeActive}",animationRendered:false,debugInfo:"{debugInfo}",ieHtml5DnD:this.oController.getView().ieHtml5DnD,tileViews:{path:"content",factory:function(i,j){return j.getObject();}},afterRendering:function(i){var j=jQuery(this.getDomRef().getElementsByTagName("a"));j.attr("tabindex",-1);}}),filters:[o]};}return{path:"links",factory:function(i,j){var k=j.getObject().content[0];if(k&&k.bIsDestroyed){k=k.clone();j.getModel().setProperty(j.getPath()+"/content/0",k);}return k;},filters:[o]};},_itemFactory:function(i,o){var t=o.getProperty(o.sPath),j,k,l,m;if(t){if(t.isCard){j=t&&t.content;k=j&&j.length&&j[0];if(k&&k["sap.card"]){m=k;}else{m={"sap.flp":t.manifest&&t.manifest["sap.flp"],"sap.card":{"type":"List"}};}l=new g({manifest:m});}else{l=this._createTile();}t.controlId=l&&l.getId&&l.getId();}return l;},_createErrorTile:function(){return new c({tileViews:{path:"content",factory:function(){return new G({state:"Failed"});}}});},_createTile:function(){var t=new c({"long":"{long}",isDraggedInTabBarToSourceGroup:"{draggedInTabBarToSourceGroup}",uuid:"{uuid}",tileCatalogId:"{tileCatalogId}",isCustomTile:"{isCustomTile}",target:"{target}",isLocked:"{isLocked}",navigationMode:"{navigationMode}",tileActionModeActive:"{/tileActionModeActive}",showActionsIcon:"{showActionsIcon}",rgba:"{rgba}",animationRendered:false,debugInfo:"{debugInfo}",ieHtml5DnD:this.oController.getView().ieHtml5DnD,tileViews:{path:"content",factory:function(i,o){return o.getObject();}},coverDivPress:function(o){if(!o.oSource.getBindingContext().getObject().tileIsBeingMoved){sap.ushell.components.homepage.ActionMode._openActionsMenu(o);}},showActions:function(o){sap.ushell.components.homepage.ActionMode._openActionsMenu(o);},deletePress:function(o){var T=o.getSource(),t=T.getBindingContext().getObject().object,i={originalTileId:sap.ushell.Container.getService("LaunchPage").getTileId(t)};sap.ui.getCore().getEventBus().publish("launchpad","deleteTile",i,this);},press:[this.oController.dashboardTilePress,this.oController]});var v=sap.ui.getCore().byId("viewPortContainer");t.addEventDelegate({onclick:function(o){jQuery.sap.measure.start("FLP:DashboardGroupsBox.onclick","Click on tile","FLP");jQuery.sap.measure.start("FLP:OpenApplicationonClick","Open Application","FLP");function i(){jQuery.sap.measure.end("FLP:DashboardGroupsBox.onclick");v.detachAfterNavigate(i);}v.attachAfterNavigate(i);}});return t;},_updateGroupHeaderVisibility:function(A,B,o){this._updateFirstGroupHeaderVisibility(o.group.getModel().getProperty("/tileActionModeActive"),this.oModel.getProperty("/homePageGroupDisplay")!=="tabs");},_updateFirstGroupHeaderVisibility:function(I,j){var k=this.oGroupsContainer.getGroups(),l=undefined,v=0;for(var i=0;i<k.length;i++){if(k[i].getProperty("visible")){v++;if(l===undefined){l=i;}else{k[i].setShowGroupHeader(I||j);}}}if(l!==undefined){var s=this.oModel.getProperty("/homePageGroupDisplay"),V=I||(v==1&&j),m=k.length>1||s==="tabs";k[l].setShowGroupHeader(V,m);}},_handleActionModeChange:function(){var A=this.oModel.getProperty("/tileActionModeActive");if(A){this._addTileContainersContent();}else{L.reRenderGroupsLayout(null);}},_addTileContainersContent:function(){var j=this.oGroupsContainer.getGroups();for(var i=0;i<j.length;i++){var o=j[i];if(!o.getBeforeContent().length){o.addBeforeContent(this._getBeforeContent());}if(!o.getAfterContent().length){o.addAfterContent(this._getAfterContent());}if(!o.getHeaderActions().length){o.addHeaderAction(this._getGroupHeaderAction());}}},_handleAddGroupButtonPress:function(o){this.oController._addGroupHandler(o);this._addTileContainersContent();},_getBeforeContent:function(){var A=new sap.m.Button({icon:"sap-icon://add",text:sap.ushell.resources.i18n.getText("add_group_at"),visible:"{= !${isGroupLocked} && !${isDefaultGroup} && ${/tileActionModeActive}}",enabled:"{= !${editTitle}}",press:[this._handleAddGroupButtonPress.bind(this)]});A.addStyleClass("sapUshellAddGroupButton");A.addCustomData(new sap.ushell.ui.launchpad.AccessibilityCustomData({key:"tabindex",value:"-1",writeToDom:true}));return A;},_getAfterContent:function(){var A=new sap.m.Button({icon:"sap-icon://add",text:sap.ushell.resources.i18n.getText("add_group_at"),visible:"{= ${isLastGroup} && ${/tileActionModeActive}}",enabled:"{= !${editTitle}}",press:[this._handleAddGroupButtonPress.bind(this)]}).addStyleClass("sapUshellAddGroupButton");A.addStyleClass("sapUshellAddGroupButton");A.addCustomData(new sap.ushell.ui.launchpad.AccessibilityCustomData({key:"tabindex",value:"-1",writeToDom:true}));return A;},_getGroupHeaderAction:function(){return new sap.ushell.ui.launchpad.GroupHeaderActions({content:this._getHeaderActions(),tileActionModeActive:"{/tileActionModeActive}",isOverflow:"{/isPhoneWidth}"}).addStyleClass("sapUshellOverlayGroupActionPanel");},_getHeaderActions:function(){var H=[];if(C.last("/core/home/gridContainer")){var A=new sap.m.Button({text:sap.ushell.resources.i18n.getText("AddTileBtn"),visible:"{= !${isGroupLocked}}",enabled:"{= !${editTitle}}",press:this._handleAddTileToGroup.bind(this)}).addStyleClass("sapUshellHeaderActionButton");if(f.system.phone){A.setIcon("sap-icon://add");}H.push(A);}H.push(new sap.m.Button({text:{path:"isGroupVisible",formatter:function(i){return sap.ushell.resources.i18n.getText(i?"HideGroupBtn":"ShowGroupBtn");}},icon:{path:"isGroupVisible",formatter:function(i){if(f.system.phone){return i?"sap-icon://hide":"sap-icon://show";}return"";}},visible:"{= ${/enableHideGroups} && !${isGroupLocked} && !${isDefaultGroup}}",enabled:"{= !${editTitle}}",press:function(o){var s=o.getSource(),i=s.getBindingContext();this.oController._changeGroupVisibility(i);}.bind(this)}).addStyleClass("sapUshellHeaderActionButton"));H.push(new sap.m.Button({text:{path:"removable",formatter:function(i){return sap.ushell.resources.i18n.getText(i?"DeleteGroupBtn":"ResetGroupBtn");}},icon:{path:"removable",formatter:function(i){if(f.system.phone){return i?"sap-icon://delete":"sap-icon://refresh";}return"";}},visible:"{= !${isDefaultGroup}}",enabled:"{= !${editTitle}}",press:function(o){var s=o.getSource(),i=s.getBindingContext();this.oController._handleGroupDeletion(i);}.bind(this)}).addStyleClass("sapUshellHeaderActionButton"));return H;},_handleAddTileToGroup:function(o){if(document.toDetail){document.toDetail();}d.getOwnerComponentFor(this.oController.getView().parentComponent).getRouter().navTo("appfinder",{"innerHash*":"catalog/"+JSON.stringify({targetGroup:encodeURIComponent(o.getSource().getBindingContext().sPath)})});},_hidePlusTile:function(p){if(p){p.classList.add("sapUshellHidePlusTile");}},_showPlusTile:function(p){if(p){p.classList.remove("sapUshellHidePlusTile");}}});return h;});