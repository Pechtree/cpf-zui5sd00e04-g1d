// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/ui/core/Control','sap/ushell/ui/launchpad/TileContainerUtils'],function(C,T){"use strict";var a=C.extend("sap.ushell.ui.launchpad.CatalogEntryContainer",{metadata:{properties:{header:{type:"string",group:"Appearance",defaultValue:null},catalogSearchTerm:{type:"string",group:"Appearance",defaultValue:null},catalogTagSelector:{type:"object",group:"Appearance",defaultValue:null}},aggregations:{appBoxesContainer:{type:"sap.ushell.ui.appfinder.AppBox",multiple:true},customTilesContainer:{type:"sap.ushell.ui.launchpad.Tile",multiple:true}}},renderer:{render:function(r,c){var t=c.getCustomTilesContainer(),A=c.getAppBoxesContainer(),h,b;r.write("<div");r.writeControlData(c);r.addClass("sapUshellTileContainer sapUshellCatalogTileContainer");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapUshellTileContainerContent");r.writeClasses();r.writeAttribute("tabindex","-1");r.write(">");if(c.getHeader()){h=sap.ushell.resources.i18n.getText(c.getHeader());r.write("<div");r.addClass("sapUshellTileContainerHeader sapUshellCatalogTileContainerHeader");r.writeAttribute("id",c.getId()+"-groupheader");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-title");r.addClass("sapUshellCatalogTileContainerHeaderInner");r.writeClasses();r.write(">");r.write("<");r.write('h2');r.addClass("sapUshellContainerTitle sapUshellCatalogContainerTitle");r.writeClasses();r.writeAttributeEscaped("title",h);r.write(">");r.writeEscaped(h);r.write("</");r.write('h2');r.writeAttribute("id",c.getId()+"-groupheader");r.write(">");r.write("</div>");r.write("</div>");}r.write("<ul");b=c.data('containerHeight');if(b){r.writeAttribute("style",'height:'+b);}r.addClass('sapUshellTilesContainer-sortable');r.addClass('sapUshellInner');r.writeClasses();r.writeAccessibilityState(c,{role:"listbox"});r.write(">");jQuery.each(A,function(){if(this.getVisible()){}if(this.getVisible){r.renderControl(this);}});r.write("</ul>");r.write("<ul");b=c.data('containerHeight');if(b){r.writeAttribute("style",'height:'+b);}r.addClass('sapUshellTilesContainer-sortable');r.addClass('sapUshellInner');r.writeClasses();r.writeAccessibilityState(c,{role:"listbox"});r.write(">");jQuery.each(t,function(){if(this.getVisible()){}if(this.getVisible){r.renderControl(this);}});r.write("</ul>");r.write("</div>");r.write("</div>");}}});a.prototype.setCatalogTagSelector=function(t){};a.prototype.setAfterHandleElements=function(c){this.onAfterHandleElements=c;};a.prototype.onAfterUpdate=function(c){this.fnCallback=c;};a.prototype.setCatalogSearchTerm=function(s){};a.prototype.updateAggregation=function(r){jQuery.sap.log.debug("Updating CatalogEntryContainer. Reason: ",r);try{}catch(e){sap.ui.base.ManagedObject.prototype.updateAggregation.apply(this,arguments);}};a.prototype.addNewItem=function(e,n){var N,i,p=e.getPath(),b=e.getObject?e.getObject().src:undefined,c=undefined;if(this.catalogState[n]!="full"){if(this.getAllocatedUnits){if(!this.getAllocatedUnits()){this.catalogState[n]="partial";return false;}}}if(n==="customTilesContainer"){if(b!==undefined){if(b.Chip!==undefined&&b.Chip.getContract!==undefined){c=b.Chip.getContract("preview");}else if(b.getContract!==undefined){c=b.getContract("preview");}if(c!==undefined){c.setEnabled(true);}}var d=sap.ushell.Container.getService("LaunchPage").getCatalogTileView(e.getProperty("src"));e.getProperty("content")[0]=d;}N=T.createNewItem.bind(this)(e,n);T.addNewItem.bind(this)(N,n);i=(n==="appBoxesContainer")?this.getAppBoxesContainer():this.getCustomTilesContainer(),this.indexingMaps[n].onScreenPathIndexMap[p]={aItemsRefrenceIndex:i.length-1,isVisible:true};return true;};a.prototype.getNumberResults=function(r){return{nAppboxes:this.nNumberOfVisibileElements["appBoxesContainer"],nCustom:this.nNumberOfVisibileElements["customTilesContainer"]};};a.prototype.handleElements=function(r){var n=r,b=this.mBindingInfos[n].binding,B=b.getContexts(),i,s,c;if(!this.catalogState){this.catalogState={};}if(!this.catalogState[r]){this.catalogState[r]="start";}if(!this.indexingMaps){this.indexingMaps={};}if(!this.nNumberOfVisibileElements){this.nNumberOfVisibileElements=[];}if(!this.nNumberOfVisibileElements["customTilesContainer"]){this.nNumberOfVisibileElements["customTilesContainer"]=0;}if(!this.nNumberOfVisibileElements["appBoxesContainer"]){this.nNumberOfVisibileElements["appBoxesContainer"]=0;}if(!this.filters){this.filters={};}i=(n==="appBoxesContainer")?this.getAppBoxesContainer():this.getCustomTilesContainer();this.indexingMaps[n]=T.indexOnScreenElements(i,false);c=T.markVisibleOnScreenElementsSearchCatalog(B,this.indexingMaps[n],true);if(T.createMissingElementsInOnScreenElementsSearchCatalog(this.indexingMaps[n],B,c,this.addNewItem.bind(this),i,this.filters[n],n,this.processFiltering.bind(this))){if(this.getAllocatedUnits&&this.getAllocatedUnits()){this.catalogState[r]="full";}}i=(n==="appBoxesContainer")?this.getAppBoxesContainer():this.getCustomTilesContainer();s=T.showHideTilesAndHeaders(this.indexingMaps[n],i);this.nNumberOfVisibileElements[n]=s.nCountVisibElelemnts;if(this.fnCallback){this.fnCallback(this);}if(this.onAfterHandleElements){this.onAfterHandleElements(this);}};a.prototype.processFiltering=function(e,n){var p=e.getPath(),i;if(n){i=this.indexingMaps[n].onScreenPathIndexMap[p];if(i.isVisible&&this.currElementVisible){this.currElementVisible();}}};return a;});
