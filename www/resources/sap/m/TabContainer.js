/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/ui/core/IconPool','./TabContainerRenderer','./TabStrip','./TabStripItem','./Button'],function(l,C,I,T,a,b,B){"use strict";var c=l.ButtonType;var d=C.extend("sap.m.TabContainer",{metadata:{library:"sap.m",properties:{showAddNewButton:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{items:{type:"sap.m.TabContainerItem",multiple:true,singularName:"item",bindable:"bindable"},_addNewButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_tabStrip:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.m.TabContainerItem",multiple:false}},events:{itemClose:{allowPreventDefault:true,parameters:{item:{type:"sap.m.TabContainerItem"}}},itemSelect:{allowPreventDefault:true,parameters:{item:{type:"sap.m.TabContainerItem"}}},addNewButtonPress:{}},designtime:"sap/m/designtime/TabContainer.designtime",dnd:{draggable:false,droppable:true}},constructor:function(i,s){var S=[];if(!s&&typeof i==='object'){s=i;}if(s&&Array.isArray(s['items'])){S=s['items'];delete s['items'];}C.prototype.constructor.apply(this,arguments);var o=new a(this.getId()+"--tabstrip",{hasSelect:true,itemSelect:function(e){var f=e.getParameter("item"),g=this._fromTabStripItem(f);this.setSelectedItem(g,e);}.bind(this),itemClose:function(e){var f=e.getParameter("item"),r=this._fromTabStripItem(f);e.preventDefault();if(this.fireItemClose({item:r})){this.removeItem(r);}}.bind(this)});this.setAggregation("_tabStrip",o,true);if(s&&s['showAddNewButton']){this.setShowAddNewButton(true);}S.forEach(function(e){this.addItem(e);},this);this.data("sap-ui-fastnavgroup","true",true);}});var t={"name":"text","additionalText":"additionalText","icon":"icon","iconTooltip":"iconTooltip","modified":"modified"};d.prototype.onBeforeRendering=function(){if(this.getSelectedItem()){return;}this._setDefaultTab();};d.prototype._getAddNewTabButton=function(){var o=this.getAggregation("_addNewButton");var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(!o){o=new B({type:c.Transparent,tooltip:r.getText("TABCONTAINER_ADD_NEW_TAB"),icon:I.getIconURI("add"),press:function(){this.getParent().getParent().fireAddNewButtonPress();}});o.addStyleClass("sapMTSAddNewTabBtn");this.setAggregation("_addNewButton",o,true);}return o;};d.prototype._getTabStrip=function(){return this.getAggregation("_tabStrip");};d.prototype._fromTabStripItem=function(i){var e=this.getItems()||[],f=e.length,g=0;for(;g<f;g++){if(e[g].getId()===i.getKey()){return e[g];}}return null;};d.prototype._toTabStripItem=function(i){var e=0,k=i,o,f,g=this._getTabStrip();if(!g){return null;}o=g.getItems();f=o.length;if(typeof i==="object"){k=i.getId();}for(;e<f;e++){if(o[e].getKey()===k){return o[e];}}return null;};d.prototype._getSelectedItemContent=function(){var o=this._getTabStrip(),s=this.getSelectedItem(),S=sap.ui.getCore().byId(s),e=this._toTabStripItem(S);if(o){o.setSelectedItem(e);}return S?S.getContent():null;};d.prototype._moveToNextItem=function(s){if(!this._getTabStrip()._oItemNavigation){return;}var i=this.getItems().length,e=this._getTabStrip()._oItemNavigation.getFocusedIndex(),n=i===e?--e:e,N=this.getItems()[n],f=function(){if(this._getTabStrip()._oItemNavigation){this._getTabStrip()._oItemNavigation.focusItem(n);}};if(s){this.setSelectedItem(N);this.fireItemSelect({item:N});}if(document.activeElement.classList.contains('sapMTabStripSelectListItemCloseBtn')){setTimeout(f.bind(this),0);}};d.prototype._attachItemPropertyChanged=function(o){o.attachItemPropertyChanged(function(e){var p=e['mParameters'].propertyKey;if(t[p]){p=t[p];var f=this._toTabStripItem(e.getSource());var m="set"+p.substr(0,1).toUpperCase()+p.substr(1);f&&f[m](e['mParameters'].propertyValue);}}.bind(this));};d.prototype.removeItem=function(i){var e;if(typeof i==="undefined"||i===null){return null;}i=this.removeAggregation("items",i);e=i.getId()===this.getSelectedItem();this._getTabStrip().removeItem(this._toTabStripItem(i));this._moveToNextItem(e);return i;};d.prototype.addAggregation=function(A,o,s){if(A==='items'){this._attachItemPropertyChanged(o);}return C.prototype.addAggregation.call(this,A,o,s);};d.prototype.insertAggregation=function(A,o,i,s){if(A==='items'){this._attachItemPropertyChanged(o);}return C.prototype.insertAggregation.call(this,A,o,i,s);};d.prototype.addItem=function(i){this.addAggregation("items",i,false);this._getTabStrip().addItem(new b({key:i.getId(),text:i.getName(),additionalText:i.getAdditionalText(),icon:i.getIcon(),iconTooltip:i.getIconTooltip(),modified:i.getModified(),tooltip:i.getTooltip()}));return this;};d.prototype.destroyItems=function(){this._getTabStrip().destroyItems();this.setAssociation("selectedItem",null);return this.destroyAggregation("items");};d.prototype.insertItem=function(i,e){this._getTabStrip().insertItem(new b({key:i.getId(),text:i.getName(),additionalText:i.getAdditionalText(),icon:i.getIcon(),iconTooltip:i.getIconTooltip(),modified:i.getModified(),tooltip:i.getTooltip()}),e);return this.insertAggregation("items",i,e);};d.prototype.removeAllItems=function(){this._getTabStrip().removeAllItems();this.setSelectedItem(null);return this.removeAllAggregation("items");};d.prototype.setAddButton=function(o){return this._getTabStrip().setAddButton(o);};d.prototype.getAddButton=function(){return this._getTabStrip().getAddButton();};d.prototype.setShowAddNewButton=function(s){this.setProperty("showAddNewButton",s,true);var o=this._getTabStrip();if(o){o.setAddButton(s?this._getAddNewTabButton():null);}return this;};d.prototype.setSelectedItem=function(s,e){if(this.fireItemSelect({item:s})){var o=this._getTabStrip();if(s&&o){o.setSelectedItem(this._toTabStripItem(s));this._rerenderContent(s.getContent());}d.prototype.setAssociation.call(this,"selectedItem",s,true);return this;}if(e){e.preventDefault();}return this;};d.prototype._rerenderContent=function(o){var $=this.$("content"),r;if(!o||($.length<=0)){return;}r=sap.ui.getCore().createRenderManager();for(var i=0;i<o.length;i++){r.renderControl(o[i]);}r.flush($[0]);r.destroy();};d.prototype._setDefaultTab=function(){var f=this.getItems()[0]||null;this.setSelectedItem(f);return f;};return d;});
