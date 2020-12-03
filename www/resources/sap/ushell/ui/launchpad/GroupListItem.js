/*!
 * Copyright (c) 2009-2017 SAP SE, All Rights Reserved
 */
sap.ui.define(['sap/m/ListItemBase','sap/ushell/library','sap/ushell/utils','./GroupListItemRenderer'],function(L,l,u){"use strict";var G=L.extend("sap.ushell.ui.launchpad.GroupListItem",{metadata:{library:"sap.ushell",properties:{title:{type:"string",group:"Misc",defaultValue:null},defaultGroup:{type:"boolean",group:"Misc",defaultValue:false},show:{type:"boolean",group:"Misc",defaultValue:true},groupId:{type:"string",group:"Misc",defaultValue:null},index:{type:"int",group:"Misc",defaultValue:null},numberOfTiles:{type:"int",group:"Misc",defaultValue:0},isGroupVisible:{type:"boolean",group:"Misc",defaultValue:true}},events:{press:{},afterRendering:{}}}});G.prototype.exit=function(){L.prototype.exit.apply(this,arguments);};G.prototype.onAfterRendering=function(){this.fireAfterRendering();};G.prototype.groupHasVisibleTiles=function(){var g=this.getModel().getProperty("/groups/"+this.getIndex()+"/tiles");var a=this.getModel().getProperty("/groups/"+this.getIndex()+"/links");return u.groupHasVisibleTiles(g,a);};G.prototype.onclick=function(){this.firePress({id:this.getId()});};G.prototype.setGroupId=function(g){this.setProperty("groupId",g,true);return this;};G.prototype.setTitle=function(t){this.setProperty("title",t);this.$().find(".sapMSLITitleOnly").text(t);return this;};return G;});
