sap.ui.define(["jquery.sap.global","sap/ui/core/Fragment","sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/thirdparty/d3","sap/suite/ui/generic/template/AnalyticalListPage/util/KpiUtil","sap/suite/ui/generic/template/AnalyticalListPage/util/V4Terms","sap/ui/generic/app/navigation/service/SelectionVariant","sap/m/MessageBox","sap/ui/model/analytics/odata4analytics"],function(q,F,C,J,D,K,V,S,M,d){"use strict";var n,s,o,a;var c=C.extend("sap.suite.ui.generic.template.AnalyticalListPage.controller.KpiCardController",{onInit:function(e){sap.ui.require(["sap/ovp/cards/CommonUtils"],function(O){o=O;});},onExit:function(){},onBeforeRendering:function(){var v=this.getView();var b=v.data("qualifierSettings");var Q=b.qualifier;var m=v.getModel();var e=m.getMetaModel();var E=e.getODataEntitySet(b.entitySet);var f=e.getODataEntityType(E.entityType);var g=v.data("mergedSelectionVariant");var k=v.data("kpiAnnotationPath");var h=v.data("selectionPresentationVariantPath");var i=v.data("dataPointPath");var j="kpiCard"+Q;var l={"cards":{}};l["cards"][j]={"model":b.model,"template":"sap.ovp.cards.charts.analytical","settings":{"title":v.data("kpiTitle"),"entitySet":b.entitySet,"showFilterInHeader":true,"navigation":"chartNav"}};if(f[i]&&f[i].hasOwnProperty("Description")){l["cards"][j]["settings"].subTitle=f[i]["Description"].String;}if(k){l["cards"][j].settings.kpiAnnotationPath=k;o.createCardComponent(v,l,"template::ALPcardContainer",g);}else{l["cards"][j].settings.dataPointAnnotationPath=i;l["cards"][j].settings.selectionPresentationAnnotationPath=h;var p=function(){var N=v.getModel("detailNavigation");if(N){var t=N.getProperty("/target");var A=N.getProperty("/action");if(t&&A){return true;}}return false;};o.createCardComponent(v,l,"template::ALPcardContainer",g,p);}o.onHeaderClicked=function(r){this.handleNavigationPress(v);}.bind(this);o.onContentClicked=function(r){var t=r.getObject();this.handleNavigationPress(v,t);}.bind(this);},handleNavigationPress:function(v,b){var N=v.getModel("detailNavigation");if(N){var t=N.getProperty("/target");var A=N.getProperty("/action");var p=v.getParent();p.setModal(true);if(t&&A){if(!n){n=s.getNavigationHandler();}var O={semanticObject:t,action:A};this._oSelectionVariant=new S();var e=JSON.parse(N.getProperty("/parameters"));this._createNavigationContext(e,true);this._getSelectOptionsFromAnnotation(v);if(b){this._createNavigationContext(b);}a.adaptNavigationParameterExtension(this._oSelectionVariant,O);this._constructContextURL();if(this._sParameterContextURL){this._oSelectionVariant.setParameterContextUrl(this._sParameterContextURL);}if(this._sFilterContextURL){this._oSelectionVariant.setFilterContextUrl(this._sFilterContextURL);}n.setModel(this.getView().getModel());this._oSelectionVariant=this._oSelectionVariant.toJSONString();n.navigate(t,A,this._oSelectionVariant,null,function(E){if(E instanceof sap.ui.generic.app.navigation.service.NavError){if(E.getErrorCode()==="NavigationHandler.isIntentSupported.notSupported"){M.show(s.getText("ST_NAV_ERROR_NOT_AUTHORIZED_DESC"),{title:s.getText("ST_GENERIC_ERROR_TITLE"),onClose:function(){p.setModal(false);}});}else{M.show(E.getErrorCode(),{title:s.getText("ST_GENERIC_ERROR_TITLE"),onClose:function(){p.setModal(false);}});}}});}}},_assignSmartTemplateDependencies:function(b,e){s=b;a=e;n=s.getNavigationHandler();},_createNavigationContext:function(p,I){var k=Object.keys(p);for(var i=0;i<k.length;i++){var e=k[i];if(!p[e]&&p[e]!==""){return;}if(I){this._oSelectionVariant.addParameter(e,p[e]);}else{if(this._oSelectionVariant.getSelectOption(e)){this._oSelectionVariant.removeSelectOption(e);}this._oSelectionVariant.addSelectOption(e,"I","EQ",p[e]);}}},_getSelectOptionsFromAnnotation:function(v){var t=this;var I=v.data("qualifierSettings").filterable;if(I){var m=v.data("mergedSelectionVariant");var p=this._oSelectionVariant.getParameterNames();if(p){for(var i=0;i<p.length;i++){if(!m.getParameter(p[i])){m.addParameter(p[i],this._oSelectionVariant.getParameter(p[i]));}}}this._oSelectionVariant=m;return;}var b=v.data("selectionVariant");var e=b.SelectOptions;var f=b.Parameters;if(f&&f.length){f.forEach(function(P){var g=P.PropertyName.PropertyPath;var h=P.PropertyValue.String;if(t._oSelectionVariant.getParameter(g)){t._oSelectionVariant.removeParameter(g);}t._oSelectionVariant.addParameter(g,h);});}if(e&&e.length){e.forEach(function(g){var P=g.PropertyName.PropertyPath;var r=g.Ranges;r.forEach(function(R){var l=R.Low.String;var h=(R.High&&R.High.String)?R.High.String:null;var j=R.Sign.EnumMember.split("/")[1];var O=R.Option.EnumMember.split("/")[1];t._oSelectionVariant.addSelectOption(P,j,O,l,h);});});}},_constructContextURL:function(){if(this._sFilterContextURL||this._sParameterContextURL){return;}var v=this.getView();var b=v.data("qualifierSettings");var m=v.getModel();var e=m.getMetaModel();var E=e.getODataEntitySet(b.entitySet);var f=new d.Model(d.Model.ReferenceByModel(m));var g=f.findQueryResultByName(E.name);var p=g&&g.getParameterization();if(p){this._sParameterContextURL=n.constructContextUrl(p.getEntitySet().getQName(),m);}this._sFilterContextURL=n.constructContextUrl(E.name,m);}});return c;});