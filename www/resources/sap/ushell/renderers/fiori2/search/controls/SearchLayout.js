sap.ui.define([],function(){"use strict";return sap.ui.layout.FixFlex.extend("sap.ushell.renderers.fiori2.search.controls.SearchLayout",{metadata:{properties:{isBusy:{type:"boolean",defaultValue:false},busyDelay:{type:"int",defaultValue:100},showFacets:{type:"boolean",defaultValue:false},animateFacetTransition:{type:"boolean",defaultValue:false}},aggregations:{"resultListContainer":{type:"sap.ui.core.Control",multiple:false},"facets":{type:"sap.ui.core.Control",multiple:false},"busyIndicator":{type:"sap.ui.core.Control",multiple:false}}},init:function(){var t=this;sap.ui.layout.FixFlex.prototype.init.apply(this);var r=new sap.m.ScrollContainer("ushell-search-result-container",{height:'100%',vertical:true});t.setFlexContent(r);},constructor:function(o,i){var t=this;sap.ui.layout.FixFlex.prototype.constructor.apply(this,[o],i);t.setVertical(false);this.addEventDelegate({onAfterRendering:function(){var $=jQuery(".sapUiFixFlexFixed");if(t.getShowFacets()&&!sap.ui.Device.system.phone){$.addClass('sapUshellSearchFacetPanelOpen');}else{$.removeClass('sapUshellSearchFacetPanelOpen');}}});},getFacets:function(){return this.getFixContent();},setFacets:function(c){this.addFixContent(c);},getResultListContainer:function(){var r=this.getFlexContent();var c=r.getContent();if(c.length>0){return c[0];}return undefined;},setResultListContainer:function(c){var r=this.getFlexContent();r.destroyContent();r.addContent(c);},setAnimateFacetTransition:function(v){this.setProperty("animateFacetTransition",v,true);},setIsBusy:function(i){var t=this;if(i){if(this.busyFlag){return;}if(this.busyTimeout){return;}this.busyTimeout=setTimeout(function(){t.busyTimeout=null;t._setIsBusy(i);},this.getBusyDelay());}else{if(this.busyFlag){this._setIsBusy(i);return;}if(this.busyTimeout){clearTimeout(this.busyTimeout);this.busyTimeout=null;return;}}},setBusyDelay:function(b){this.setProperty("busyDelay",b,true);},_setIsBusy:function(i){if(i){this.getBusyIndicator().open();this.busyFlag=true;}else if(this.busyFlag){this.getBusyIndicator().close();this.busyFlag=false;}this.setProperty("isBusy",i,true);},setShowFacets:function(a){if(a===this.getShowFacets()){return undefined;}var $=jQuery(".sapUiFixFlexFixed");var b=jQuery(".sapUshellSearchResultListsContainer");if(this.getAnimateFacetTransition()){$.addClass("sapUshellSearchFacetAnimation");}else{$.removeClass("sapUshellSearchFacetAnimation");}if(!a){b.removeClass("sapUshellSearchFacetPanelOpen");$.removeClass("sapUshellSearchFacetPanelOpen");$.attr("aria-hidden","true");}else{b.addClass("sapUshellSearchFacetPanelOpen");$.addClass("sapUshellSearchFacetPanelOpen");$.attr("aria-hidden","false");}var h=function(e){sap.ui.getCore().getEventBus().publish("searchLayoutChanged");};$.one("transitionend",h);this.setProperty("showFacets",a,true);return this;},renderer:"sap.ui.layout.FixFlexRenderer"});});