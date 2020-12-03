/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(['./ODataType','sap/ui/model/odata/AnnotationHelper','sap/base/Log'],function(O,A,L){"use strict";var f={"com.sap.vocabularies.Common.v1.FilterExpressionType/SingleInterval":"interval","com.sap.vocabularies.Common.v1.FilterExpressionType/MultiValue":"multi-value","com.sap.vocabularies.Common.v1.FilterExpressionType/SingleValue":"single-value"};var s={"com.sap.vocabularies.UI.v1.SelectionRangeOptionType/EQ":"EQ","com.sap.vocabularies.UI.v1.SelectionRangeOptionType/BT":"BT","com.sap.vocabularies.UI.v1.SelectionRangeOptionType/CP":"CP","com.sap.vocabularies.UI.v1.SelectionRangeOptionType/LE":"LE","com.sap.vocabularies.UI.v1.SelectionRangeOptionType/GE":"GE","com.sap.vocabularies.UI.v1.SelectionRangeOptionType/NE":"NE","com.sap.vocabularies.UI.v1.SelectionRangeOptionType/NB":"NB","com.sap.vocabularies.UI.v1.SelectionRangeOptionType/NP":"NP","com.sap.vocabularies.UI.v1.SelectionRangeOptionType/GT":"GT","com.sap.vocabularies.UI.v1.SelectionRangeOptionType/LT":"LT"};var S={"com.sap.vocabularies.UI.v1.SelectionRangeSignType/I":"I","com.sap.vocabularies.UI.v1.SelectionRangeSignType/E":"E"};var M=function(r){if(typeof r==="object"){this.oModel=r;}else{this._sResourceRootUri=r;}this._oMetadata=null;if(!this.oModel&&this._sResourceRootUri){L.error("Analyzing metadata cannot be done without an ODataModel!");return;}if(this.oModel){this._oMetaModel=this.oModel.getMetaModel();}if(this._oMetaModel){this._oMetadata=this._oMetaModel.getProperty("/");}if(this._oMetadata&&this._oMetadata.dataServices){this._oSchemaDefinition=this._oMetadata.dataServices.schema[0];}};M.hierarchyType={nodeFor:1,nodeExternalKeyFor:2,parentNodeFor:3,levelFor:4,drillStateFor:5,nodeDescendantCountFor:6};M.prototype.getNamespace=function(){if(this._oSchemaDefinition){return this._oSchemaDefinition.namespace;}};M.prototype.getSchemaDefinition=function(){return this._oSchemaDefinition;};M.prototype.getEntityContainerAttribute=function(a){var b=null,e;if(this._oMetaModel&&a){if(a.indexOf("sap:")<0){a="sap:"+a;}e=this._oMetaModel.getODataEntityContainer();b=e[a]||null;}return b;};M.prototype.getEntityLabelByEntityTypeName=function(e){var E=this._getEntityDefinition(e),r,R="";if(E){r=E["com.sap.vocabularies.Common.v1.Label"];if(r&&r.String){R=r.String;}}return R;};M.prototype._getEntityDefinition=function(e){var E=null;if(e){E=this._oMetaModel.getODataEntityType(this._getFullyQualifiedNameForEntity(e));}return E;};M.prototype._getComplexTypeDefinition=function(c){var C=null;if(c){C=this._oMetaModel.getODataComplexType(this._getFullyQualifiedNameForEntity(c));}return C;};M.prototype._getNameOfPropertyUsingComplexType=function(e,c){var C=this.getNamespace();if(e&&c&&C){var t=C+"."+c;var m=this._getEntityDefinition(e);if(m){var p=m.property;if(p&&p.length){var i=0;for(i=0;i<p.length;i++){var P=p[i];if(P&&P.type===t){return P.name;}}}}}return null;};M.prototype.removeNamespace=function(a){var i,r=a;if(a){i=a.lastIndexOf(".")+1;}if(i>0){r=a.substring(i);}return r;};M.prototype.getEntityTypeNameFromEntitySetName=function(e){var E=null,a=null;if(this._oMetaModel){E=this._oMetaModel.getODataEntitySet(e);if(E){a=E.entityType;}}return a;};M.prototype.getEntitySetNameFromEntityTypeName=function(e){var q,E,a,i,l,o;if(this._oMetaModel&&e){q=this._getFullyQualifiedNameForEntity(e);E=this._oMetaModel.getODataEntityContainer();if(E&&q){a=E.entitySet;l=a.length;for(i=0;i<l;i++){o=a[i];if(o.entityType===q){break;}o=null;}if(o){return o.name;}}}return null;};M.prototype.getKeysByEntitySetName=function(e){var k=null,E=null;if(!this._oMetaModel){return undefined;}E=this.getEntityTypeNameFromEntitySetName(e);if(E){k=this.getKeysByEntityTypeName(E);}return k;};M.prototype.getKeysByEntityTypeName=function(e){var k=null,p=null,i,l=0,E=null;if(!this._oMetaModel){return undefined;}E=this._getEntityDefinition(e);if(E){if(E.key){p=E.key.propertyRef;if(p){l=p.length;k=[];for(i=0;i<l;i++){k.push(p[i].name);}}}}return k;};M.prototype.getFieldsByEntitySetName=function(e){var F=null,E,a=null;if(!this._oMetaModel){return undefined;}E=this._oMetaModel.getODataEntitySet(e);if(E){a=E.entityType;}if(a){F=this.getFieldsByEntityTypeName(a);this._enrichEntitySetMetadata(F,E);}return F;};M.prototype._enrichEntitySetMetadata=function(F,e){var l,o,n,N,r,m;n=this._getNonSortableFields(e);N=this._getNonFilterableFields(e);r=this._getRequiredFilterFields(e);m=this._getFilterExpressionRestriction(e);l=F.length;while(l--){o=F[l];o.sortable=!(n.indexOf(o.name)>-1);o.filterable=!(N.indexOf(o.name)>-1);o.requiredFilterField=(r.indexOf(o.name)>-1);o.filterRestriction=m[o.name];}};M.prototype._extractPropertyPathsFromAnnotation=function(a,b){var p=[],c,l,P;if(a&&b){c=a[b];}if(c){l=c.length;while(l--){P=c[l].PropertyPath;if(P){p.push(P);}}}return p;};M.prototype._getNonSortableFields=function(e){var o;if(e){o=e["Org.OData.Capabilities.V1.SortRestrictions"];}return this._extractPropertyPathsFromAnnotation(o,"NonSortableProperties");};M.prototype._getNonFilterableFields=function(e){var F;if(e){F=e["Org.OData.Capabilities.V1.FilterRestrictions"];}return this._extractPropertyPathsFromAnnotation(F,"NonFilterableProperties");};M.prototype._getRequiredFilterFields=function(e){var F;if(e){F=e["Org.OData.Capabilities.V1.FilterRestrictions"];}return this._extractPropertyPathsFromAnnotation(F,"RequiredProperties");};M.prototype._getFilterExpressionRestriction=function(e){var F={},a,l,o,p,b;if(e){var c=e["Org.OData.Capabilities.V1.FilterRestrictions"];if(c){a=c["FilterExpressionRestrictions"];if(a){for(var i=0;i<a.length;i++){p=a[i].Property;b=a[i].AllowedExpressions;if(b&&b.String){switch(b.String){case"SingleValue":F[p.PropertyPath]="single-value";break;case"MultiValue":F[p.PropertyPath]="multi-value";break;case"SingleRange":F[p.PropertyPath]="interval";break;default:}}}}}if(a==undefined){a=e["com.sap.vocabularies.Common.v1.FilterExpressionRestrictions"];if(a){l=a.length;while(l--){o=a[l];if(o){p=o.Property;b=o.AllowedExpressions;if(p&&b&&p.PropertyPath&&b.EnumMember){F[p.PropertyPath]=f[b.EnumMember];}}}}}}return F;};M.prototype._isFilterable=function(p,e){var n,F=true;if(e){n=this._getNonFilterableFields(e);F=!(n.indexOf(p.name)>-1);}if(F){F=!(p["sap:filterable"]==="false");}return F;};M.isHiddenFilter=function(p){return!!p["com.sap.vocabularies.UI.v1.HiddenFilter"]&&M.isTermDefaultTrue(p["com.sap.vocabularies.UI.v1.HiddenFilter"]);};M.isHidden=function(p){return!!p["com.sap.vocabularies.UI.v1.Hidden"]&&M.isTermDefaultTrue(p["com.sap.vocabularies.UI.v1.Hidden"]);};M.prototype.getFieldsByEntityTypeName=function(e){var E;if(!this._oMetaModel){return undefined;}E=this._getEntityDefinition(e);return this._getFieldsByEntityDefinition(E);};M.prototype.getFieldsByComplexTypeName=function(c,p){var C;if(!this._oMetaModel){return undefined;}C=this._getComplexTypeDefinition(c);return this._getFieldsByEntityDefinition(C,p);};M.prototype.getAllEntityTypeNames=function(){if(!this._oMetaModel){return undefined;}var o=this._oSchemaDefinition;if(o.entityType&&o.entityType.length>0){var i=0;var r=[];for(i=0;i<o.entityType.length;i++){r.push(o.entityType[i].name);}return r;}return null;};M.prototype.getFieldSemanticObjectMap=function(e){var o=this.getFieldsByEntitySetName(e);if(!o){return null;}var m={},i,l=o.length;for(i=0;i<l;i++){var F=o[i];var a=this.getSemanticObjectAnnotation(F.fullName);if(a&&a.semanticObject){m[F.name]=a.semanticObject;}}return m;};M.prototype._getFieldsByEntityDefinition=function(e,p){var F=null,P=null,i=0,l=0,o,a;if(e){P=e.property;}if(P){F=[];l=P.length;for(i=0;i<l;i++){o=P[i];if(o){a=this._parseV4PropertyAnnotations(o,e,p);this._determineHierarchyInformation(a,o);this._determineFilterAndSortInformation(a,o,null);F.push(a);}}}return F;};M.getDisplayFormat=function(p){var d=p["sap:display-format"];if(d){return d;}};M.isCalendarDate=function(p){return M.isPropertyStringType(p)&&M.isTermDefaultTrue(p["com.sap.vocabularies.Common.v1.IsCalendarDate"]);};M.getAggregationRole=function(p){if(p["com.sap.vocabularies.Analytics.v1.Dimension"]){return"dimension";}if(p["com.sap.vocabularies.Analytics.v1.Measure"]){return"measure";}return undefined;};M.getLinkDisplayFormat=function(p){if(M.isEmailAddress(p)){return"EmailAddress";}if(M.isPhoneNumber(p)){return"PhoneNumber";}if(M.isURL(p)){return"URL";}return"";};M.getValueListMode=function(p){if(M.isValueListWithFixedValues(p)){return"fixed-values";}var v=p["sap:value-list"];if(v){return v;}return"";};M.isTermTrue=function(t){return!!t&&(t.Bool==="true");};M.isPropertyStringType=function(p){return!!p&&(p.type==="Edm.String");};M.isTermDefaultTrue=function(t){if(t){return t.Bool?t.Bool!=="false":true;}return false;};M.isNullable=function(p){return!(p&&(p.nullable==="false"));};M.isDigitSequence=function(p){return M.isPropertyStringType(p)&&M.isTermDefaultTrue(p["com.sap.vocabularies.Common.v1.IsDigitSequence"]);};M.isUpperCase=function(p){return M.isPropertyStringType(p)&&M.isTermDefaultTrue(p["com.sap.vocabularies.Common.v1.IsUpperCase"]);};M.isEmailAddress=function(p){return M.isPropertyStringType(p)&&M.isTermDefaultTrue(p["com.sap.vocabularies.Communication.v1.IsEmailAddress"]);};M.isPhoneNumber=function(p){return M.isPropertyStringType(p)&&M.isTermDefaultTrue(p["com.sap.vocabularies.Communication.v1.IsPhoneNumber"]);};M.isURL=function(p){return M.isPropertyStringType(p)&&(M.isTermDefaultTrue(p["Org.OData.Core.V1.IsURL"])||M.isTermDefaultTrue(p["Org.OData.Core.V1.IsUrl"]));};M.isValueList=function(p){var t="com.sap.vocabularies.Common.v1.ValueList";return!!(p&&(p["sap:value-list"]||p[t]));};M.isValueListWithFixedValues=function(p){var t="com.sap.vocabularies.Common.v1.ValueListWithFixedValues";return M.isTermTrue(p[t]);};M.prototype._parseProperty=function(p,e,P){var F=this._parseV4PropertyAnnotations(p,e,P);this._determineHierarchyInformation(F,p);this._determineFilterAndSortInformation(F,p,null);return F;};M.prototype._parseV4PropertyAnnotations=function(p,e,P){var F=Object.assign({},p);var r=p["com.sap.vocabularies.Common.v1.Label"];if(r){F.fieldLabel=r.String;}r=p["com.sap.vocabularies.Common.v1.QuickInfo"];if(r){F.quickInfo=r.String;}F.displayFormat=M.getDisplayFormat(p);F.isDigitSequence=M.isDigitSequence(p);F.isURL=M.isURL(p);F.isEmailAddress=M.isEmailAddress(p);F.isPhoneNumber=M.isPhoneNumber(p);F.isUpperCase=M.isUpperCase(p);F.isCalendarDate=M.isCalendarDate(p);F.aggregationRole=M.getAggregationRole(p);r=p["Org.OData.Measures.V1.ISOCurrency"];if(r){F.isCurrencyField=true;F.isMeasureField=true;F.unit=r.Path;}r=p["Org.OData.Measures.V1.Unit"];if(r){F.isMeasureField=true;F.unit=r.Path;}r=p["com.sap.vocabularies.Common.v1.Text"];if(r){F.description=r.Path;F.displayBehaviour=this.getTextArrangementValue(r);}r=p["com.sap.vocabularies.UI.v1.IsImageURL"]||p["com.sap.vocabularies.UI.v1.IsImageUrl"];F.isImageURL=M.isTermDefaultTrue(r);F.entityName=e.name;F.parentPropertyName=P;F.fullName=this._getFullyQualifiedNameForField(p.name,e);r=p["com.sap.vocabularies.Common.v1.FieldControl"];F.visible=!(r&&((r.EnumMember==="com.sap.vocabularies.Common.v1.FieldControlType/Hidden")||(r.EnumMember==="com.sap.vocabularies.Common.v1.FieldControlType/Inapplicable")));F.visible=F.visible&&!M.isHidden(p);F.hiddenFilter=M.isHiddenFilter(p);if(p["defaultValue"]!==undefined){F.defaultPropertyValue=p["defaultValue"];}r=p["com.sap.vocabularies.Common.v1.FilterDefaultValue"];if(r){F.defaultFilterValue=this._getDefaultValues(p.type,r,p);}return F;};M.prototype._determineHierarchyInformation=function(F,p){var h={field:null,type:null};if(p["sap:hierarchy-node-for"]!=null){h.field=p["sap:hierarchy-node-for"];h.type=M.hierarchyType.nodeFor;}if(p["sap:hierarchy-node-external-key-for"]!=null){h.field=p["sap:hierarchy-node-external-key-for"];h.type=M.hierarchyType.nodeExternalKeyFor;}if(p["sap:hierarchy-parent-node-for"]!=null){h.field=p["sap:hierarchy-parent-node-for"];h.type=M.hierarchyType.parentNodeFor;}if(p["sap:hierarchy-level-for"]!=null){h.field=p["sap:hierarchy-level-for"];h.type=M.hierarchyType.levelFor;}if(p["sap:hierarchy-drill-state-for"]!=null){h.field=p["sap:hierarchy-drill-state-for"];h.type=M.hierarchyType.drillStateFor;}if(p["sap:hierarchy-node-descendant-count-for"]!=null){h.field=p["sap:hierarchy-node-descendant-count-for"];h.type=M.hierarchyType.nodeDescendantCountFor;}if(h.type!=null){F.hierarchy=h;}};M.prototype._determineFilterAndSortInformation=function(F,p,e){if(e){this._enrichEntitySetMetadata([F],e);}if(F.filterable==undefined||F.filterable){F.filterable=p["sap:filterable"]!=="false";}if(!F.filterRestriction&&p["sap:filter-restriction"]){F.filterRestriction=p["sap:filter-restriction"];}if(!F.requiredFilterField){F.requiredFilterField=p["sap:required-in-filter"]==="true";}if(F.sortable==undefined||F.sortable){F.sortable=p["sap:sortable"]!=="false";}};M.prototype._getDefaultValues=function(t,r,p){var v=null,d=O.getDefaultValueTypeName(t);if(r[d]){v=r[d];}else{L.error("default value for "+p.name+" expected through the property "+d);}return v;};M.prototype.extractNavigationPropertyField=function(p,e){var E,m,o,P,a,n,b,F=null;if(e&&p){E="/"+e+"/";P=p.split("/");a=P.pop();n=P.join("/");if(n&&a){m=this._oMetaModel.getMetaContext(E+n);if(m){b=this._oMetaModel.getProperty(m.getPath());}}if(b){o=this._oMetaModel.getODataProperty(b,a);}if(o){F=this._parseV4PropertyAnnotations(o,b,n);F.name=p;var c=this._oMetaModel.getODataEntitySet(e);this._determineFilterAndSortInformation(F,o,c);F.name=o.name;}}return F;};M.prototype.getAllFilterableFieldNamesByEntityTypeName=function(e){var g,i,a,j,b,r,G;r=[];g=this.getAllFilterableFieldsByEntityTypeName(e);if(g&&g.length){a=g.length;for(i=0;i<a;i++){G=g[i];if(G.fields&&G.fields.length){b=G.fields.length;for(j=0;j<b;j++){r.push(G.fields[j].name);}}}}return r;};M.prototype._getAllFilterableFieldsByEntity=function(e,i,I,c){var F=[],E,o,a,n,r,b,d,g;if(!this._oMetaModel||!e){return undefined;}if(i){o=this._oMetaModel.getODataEntitySet(e);if(o){E=this._getEntityDefinition(o.entityType);}}else{E=this._getEntityDefinition(e);}if(E){F.push(this._getFilterableFieldsFromEntityDefinition(E,undefined,o));a=this._getFilterableAssociations(E,o);for(n in a){if(!c||(c.indexOf(n)>-1)){g=a[n];if(i){r=this._oMetaModel.getODataAssociationSetEnd(E,n);if(r.entitySet){d=this._oMetaModel.getODataEntitySet(r.entitySet);}}b=this._getEntityDefinition(g);if(b){if(I&&(b["sap:semantics"]==="parameters")){continue;}F.push(this._getFilterableFieldsFromEntityDefinition(b,n,d));}}}}return F;};M.prototype.getAllFilterableFieldsByEntitySetName=function(e,i,c){if(!this._oMetaModel){return undefined;}return this._getAllFilterableFieldsByEntity(e,true,i,c);};M.prototype.getAllFilterableFieldsByEntityTypeName=function(e){if(!this._oMetaModel){return undefined;}return this._getAllFilterableFieldsByEntity(e);};M.prototype._getFilterableFieldsFromEntityDefinition=function(e,p,E){var F={},a=[],P=null,o,i,l,b=null;if(!this._oMetaModel||!e){return undefined;}if(!E){L.error("mandatory parameter 'oEntitySet' not set or null.");}else{o=e["com.sap.vocabularies.Common.v1.Label"];if(o){F.groupLabel=o.String;}F.groupEntitySetName=E.name;F.groupEntityTypeName=e.name;F.groupName=p;P=this._getFieldsByEntityDefinition(e,p);if(E){this._enrichEntitySetMetadata(P,E);}l=P.length;for(i=0;i<l;i++){b=P[i];if(b.visible&&b.filterable){b.groupEntitySet=F.groupEntitySetName;b.groupEntityType=F.groupEntityTypeName;a.push(b);}}}F.fields=a;return F;};M.prototype._getFullyQualifiedNameForField=function(F,e){var n,E,r=F;if(e){n=e.namespace;E=e.name;}if(n&&E){r=n+"."+E+"/"+F;}return r;};M.prototype.getFieldNameByFullyQualifiedFieldName=function(F){var r,n;r=this.removeNamespace(F);n=r.indexOf("/");r=r.substring(n+1);return r;};M.prototype._getFilterableAssociations=function(e,E){return this._getAssociations(e,E,true,false);};M.prototype._getAssociations=function(e,E,c,a){var F={},n=null,N=null,i,l=0,o=null;if(!this._oMetaModel||!e){return undefined;}n=e.navigationProperty;if(n&&n.length){l=n.length;for(i=0;i<l;i++){N=n[i];if(c){if(!this._isFilterable(N,E)||M.isHiddenFilter(N)){continue;}}o=this._oMetaModel.getODataAssociationEnd(e,N.name);if(!o||o.type===(e.namespace+"."+e.name)){continue;}if(a||o.multiplicity==="1"||o.multiplicity==="0..1"){if(F[N.name]===undefined){F[N.name]=o.type;}}}}return F;};M.prototype.getParametersByEntitySetName=function(e){var r,a,m,n,b,c,d,o,E,g,h;h=this._oMetaModel.getODataEntitySet(e);if(h){E=this._getEntityDefinition(h.entityType);}a=this._getAssociations(E,null,false,false);for(n in a){c=a[n];o=this._oMetaModel.getODataAssociationSetEnd(E,n);if(o.entitySet){g=this._getEntityDefinition(c);if(g){if((g["sap:semantics"]==="parameters")&&g.key){r={entitySetName:o.entitySet,parameters:[],navPropertyName:""};for(var i=0;i<g.key.propertyRef.length;i++){r.parameters.push(g.key.propertyRef[i].name);}m=this._getAssociations(g,null,false,true);for(b in m){d=m[b];if(d===h.entityType){r.navPropertyName=b;break;}}return r;}}}}return null;};M.prototype.getValueListAnnotationLazy=function(p){var P,a={additionalAnnotations:[]},r,b,c,t,d,o,q;P=new Promise(function(R,e){if(p&&this._oMetaModel){c=p.split("/");t=this._oMetaModel.getODataEntityType(c[0])||this._oMetaModel.getODataComplexType(c[0]);b=c[1];d=this._oMetaModel.getODataProperty(t,b,true);if(d){o=this._oMetaModel.createBindingContext(d);this._oMetaModel.getODataValueLists(o).then(function(v){for(q in v){r={annotation:v[q]};if(r.annotation&&!r.annotation["PresentationVariantQualifier"]){this._enrichValueHelpAnnotation(r,b);if(!q){a.primaryValueListAnnotation=r;}else{r.qualifier=q;a.additionalAnnotations.push(r);}}}R(a);}.bind(this),e);return;}}e();}.bind(this));return P;};M.prototype.getValueListAnnotationForFunctionImport=function(v,p){var a={additionalAnnotations:[]},r,q;for(q in v){r={annotation:v[q]};if(r.annotation){this._enrichValueHelpAnnotation(r,p);if(!q){a.primaryValueListAnnotation=r;}else{r.qualifier=q;a.additionalAnnotations.push(r);}}}return a;};M.prototype.getValueListAnnotation=function(p){var a={additionalAnnotations:[]},r,P,b,t,o,q;if(p&&this._oMetaModel){b=p.split("/");t=this._oMetaModel.getODataEntityType(b[0])||this._oMetaModel.getODataComplexType(b[0]);o=this._oMetaModel.getODataProperty(t,b[1]);if(o){P=o.name;for(var c in o){if(c==="com.sap.vocabularies.Common.v1.ValueList"||c.indexOf("com.sap.vocabularies.Common.v1.ValueList#")>-1){q=null;r={annotation:o[c]};b=c.split("#");if(b.length===2){q=b[1];}if(r.annotation){this._enrichValueHelpAnnotation(r,P);if(!q){a.primaryValueListAnnotation=r;}else{r.qualifier=q;a.additionalAnnotations.push(r);}}}}}}return a;};M.prototype._enrichValueHelpAnnotation=function(a,p){var r,R,e,k=[],K,I={},o={},b,c,F=[],v=[],d,P,V,l,g,h=0,i=0,j=0;if(a&&a.annotation){r=a.annotation;if(r){R=r["SearchSupported"];a.isSearchSupported=R?R.Bool==="true":false;R=r["CollectionPath"];if(R){a.valueListEntitySetName=R.String;if(this._oMetaModel){e=this._oMetaModel.getODataEntitySet(a.valueListEntitySetName);}if(e){a.valueListEntityName=e.entityType;a.semantics=e["sap:semantics"];k=this.getKeysByEntitySetName(e.name);F=this.getFieldsByEntitySetName(e.name);}}R=r["Label"];if(R){a.valueListTitle=R.String;}d=r["Parameters"];if(F&&d){h=d.length;}for(i=0;i<h;i++){g=d[i];V=undefined;l=undefined;P=g["ValueListProperty"];if(P){V=P.String;}P=g["LocalDataProperty"];if(P){l=P.PropertyPath;}b=false;if(g.RecordType==="com.sap.vocabularies.Common.v1.ValueListParameterInOut"||g.RecordType==="com.sap.vocabularies.Common.v1.ValueListParameterIn"){b=true;}c=false;if(g.RecordType==="com.sap.vocabularies.Common.v1.ValueListParameterInOut"||g.RecordType==="com.sap.vocabularies.Common.v1.ValueListParameterOut"){c=true;}if(b){I[l]=V;}if(c){o[l]=V;}if(c||g.RecordType==="com.sap.vocabularies.Common.v1.ValueListParameterDisplayOnly"){j=F.length;while(j--){if(F[j].name===V){v.push(F[j]);break;}}}if(!K&&c&&l===p){K=V;}}}a.inParams=I;a.outParams=o;a.fields=F;a.valueListFields=v;a.keys=k;a.keyField=K;a.descriptionField=this.getDescriptionFieldName(a.keyField,a.valueListEntitySetName);}};M.prototype.getDescriptionFieldName=function(k,e){var F,i=0,l,o,d;if(typeof k==="object"){o=k;}else{F=this.getFieldsByEntitySetName(e);if(F){l=F.length;for(i=0;i<l;i++){o=F[i];if(o.name===k){break;}o=null;}}}if(o&&o["com.sap.vocabularies.Common.v1.Text"]){d=o["com.sap.vocabularies.Common.v1.Text"].Path;}return d;};M.prototype.getIsSearchSupported=function(a){var i=false,p;if(a){p=a.SearchSupported;if(p&&p.Bool==="true"){i=true;}}return i;};M.prototype.getValueListSemantics=function(a){var e,E,b;if(a){e=a["CollectionPath"]?a["CollectionPath"].String:undefined;}if(e){E=this._oMetaModel.getODataEntitySet(e);if(E){b=E["sap:semantics"];}}return b;};M.prototype.getLineItemAnnotation=function(p,q){var e,t,a,r;if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(p);if(e){t="com.sap.vocabularies.UI.v1.LineItem";if(q){t+="#"+q;}a=e[t];if(a){r={annotation:a};this._enrichAnnotationWithUIDataField(r,a);}}}return r;};M.prototype.isSemanticAggregation=function(p){var e;if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(p);if(e){return e["sap:semantics"]==="aggregate";}}return false;};M.prototype.getPresentationVariantAnnotation=function(p,q){var e,t,a,l,i,r,o,c,I;if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(p);if(e){t="com.sap.vocabularies.UI.v1.PresentationVariant";if(q){t+="#"+q;}a=e[t];if(a){r={annotation:a,requestAtLeastFields:[],sortOrderFields:[],groupByFields:[],maxItems:undefined};if(a.Visualizations){l=a.Visualizations.length;for(i=0;i<l;i++){I=a.Visualizations[i].AnnotationPath;if(!o&&(I==="@com.sap.vocabularies.UI.v1.LineItem"||I.indexOf("@com.sap.vocabularies.UI.v1.LineItem#")>-1)){o=e[I.substring(1)];r.lineItemAnnotation={annotation:o};this._enrichAnnotationWithUIDataField(r.lineItemAnnotation,o);}else if(!c&&(I==="@com.sap.vocabularies.UI.v1.Chart"||I.indexOf("@com.sap.vocabularies.UI.v1.Chart#")>-1)){c=e[I.substring(1)];r.chartAnnotation={annotation:c,semantics:e["sap:semantics"]};this._enrichChartAnnotation(r.chartAnnotation,c);}if(o&&c){break;}}}if(a.RequestAtLeast){l=a.RequestAtLeast.length;for(i=0;i<l;i++){r.requestAtLeastFields.push(a.RequestAtLeast[i].PropertyPath);}}if(a.SortOrder){l=a.SortOrder.length;for(i=0;i<l;i++){r.sortOrderFields.push({name:a.SortOrder[i].Property.PropertyPath,descending:a.SortOrder[i].Descending?a.SortOrder[i].Descending.Bool==="true":false});}}if(a.GroupBy){l=a.GroupBy.length;for(i=0;i<l;i++){r.groupByFields.push(a.GroupBy[i].PropertyPath);}}if(a.MaxItems){r.maxItems=a.MaxItems.Int;}}}}return r;};M.prototype._enrichChartAnnotation=function(a,o){var i,l,b;if(a&&o){a.measureFields=[];a.dimensionFields=[];a.measureAttributes={};a.dimensionAttributes={};if(o.ChartType&&o.ChartType.EnumMember){a.chartType=o.ChartType.EnumMember;}if(o.Measures){l=o.Measures.length;for(i=0;i<l;i++){a.measureFields.push(o.Measures[i].PropertyPath);}}if(o.MeasureAttributes){l=o.MeasureAttributes.length;for(i=0;i<l;i++){b=o.MeasureAttributes[i];if(b.Measure){a.measureAttributes[b.Measure.PropertyPath]={role:b.Role?b.Role.EnumMember:null,dataPoint:b.DataPoint?b.DataPoint.AnnotationPath:null};}}}if(o.Dimensions){l=o.Dimensions.length;for(i=0;i<l;i++){a.dimensionFields.push(o.Dimensions[i].PropertyPath);}}if(o.DimensionAttributes){l=o.DimensionAttributes.length;for(i=0;i<l;i++){b=o.DimensionAttributes[i];if(b.Dimension){a.dimensionAttributes[b.Dimension.PropertyPath]={role:b.Role?b.Role.EnumMember:null,hierarchyLevel:b.HierarchyLevel?b.HierarchyLevel.Int:0};}}}}};M.prototype.getChartAnnotation=function(p,q){var e,a,r,t;if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(p);if(e){t="com.sap.vocabularies.UI.v1.Chart";if(q){t+="#"+q;}a=e[t];if(a){r={annotation:a,semantics:e["sap:semantics"]};this._enrichChartAnnotation(r,a);}}}return r;};M.prototype.getDataPointAnnotation=function(p){var e,P,q,a,d,r={};if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(p);if(e){for(P in e){if(P==="com.sap.vocabularies.UI.v1.DataPoint"||P.indexOf("com.sap.vocabularies.UI.v1.DataPoint#")>-1){q=null;d=e[P];a=P.split("#");if(a.length===2){q=a[1];}if(d){if(q){if(!r.additionalAnnotations){r.additionalAnnotations={};}r.additionalAnnotations[q]=d;}else{r.primaryAnnotation=d;}}}}}}return r;};M.prototype.getFieldGroupAnnotation=function(p){var e,q,P,r,a,R,b=[];if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(this._getFullyQualifiedNameForEntity(p));if(e){for(var c in e){if(c==="com.sap.vocabularies.UI.v1.FieldGroup"||c.indexOf("com.sap.vocabularies.UI.v1.FieldGroup#")>-1){q=null;a=e[c];P=c.split("#");if(P.length===2){q=P[1];}if(a){R={annotation:a};if(q){R.groupName=q;}r=a["Label"];if(r){R.groupLabel=r.String;}r=a["Data"];if(r){this._enrichAnnotationWithUIDataField(R,r);}b.push(R);}}}}}return b;};M.prototype.getFieldGroupsByFilterFacetsAnnotation=function(p){var e,P,q,r,R,F=this.getFieldGroupAnnotation(p);R=F;if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(this._getFullyQualifiedNameForEntity(p));if(e){for(var a in e){if(a==="com.sap.vocabularies.UI.v1.FilterFacets"||a.indexOf("com.sap.vocabularies.UI.v1.FilterFacets#")>-1){R=[];r=e[a];if(r){for(var i=0;i<r.length;i++){P=r[i].Target.AnnotationPath.split("#");if(P.length===2){q=P[1];}if(q){F.some(function(o){if(o.groupName===q){if(r[i].Label){o.groupLabel=r[i].Label.String;}R.push(o);return true;}return false;});}}}}}}}return R;};M.prototype._enrichAnnotationWithUIDataField=function(a,r){var F=[],u={},l={},I={},c={},p,b,P,d=0,i=0;if(a&&r){d=r.length;F=[];l={};for(i=0;i<d;i++){P=r[i];if(P&&(P.RecordType==="com.sap.vocabularies.UI.v1.DataField"||P.RecordType==="com.sap.vocabularies.UI.v1.DataFieldWithUrl")){b=null;p=P["Value"];if(p){b=p.Path;}if(b){F.push(b);p=P["Url"];if(p){u[b]=this._extractURLInfo(p);}p=P["Label"];if(p&&p.String){l[b]=p.String;}I[b]=this._getImportanceAnnotation(P);p=P["Criticality"];if(p){c[b]=this._extractCriticalityInfo(p,P);}}}}a.fields=F;a.urlInfo=u;a.labels=l;a.importance=I;a.criticality=c;}};M.prototype._extractCriticalityInfo=function(c,r){var R,C;if(c.Path||c.EnumMember){R={};R["path"]=c.Path;R["criticalityType"]=c.EnumMember;C=r["CriticalityRepresentation"];if(C){if(C.Path){R["criticalityRepresentationPath"]=C.Path;}else if(C.EnumMember){R["criticalityRepresentationType"]=C.EnumMember;}}}return R;};M.prototype._extractURLInfo=function(p){var r,P,l,o;if(p){if(p.Apply&&p.Apply.Name==="odata.fillUriTemplate"){r={urlTarget:undefined,parameters:[]};if(!this._oDummyAnnotationHelperContext){this._oDummyAnnotationHelperContext=this._oMetaModel.createBindingContext("/");}if(this._oDummyAnnotationHelperContext){r.urlTarget=A.format(this._oDummyAnnotationHelperContext,p);}P=p.Apply.Parameters;l=P&&P.length?P.length:0;while(l--){o=P[l];if(o&&o.Type==="LabeledElement"&&o.Value&&o.Value.Path){r.parameters.push(o.Value.Path);}}}else if(p.Path){r={urlPath:p.Path};}}return r;};M.prototype.updateDataFieldDefault=function(F){var d=F&&F["com.sap.vocabularies.UI.v1.DataFieldDefault"],p;if(d&&(d.RecordType==="com.sap.vocabularies.UI.v1.DataField"||d.RecordType==="com.sap.vocabularies.UI.v1.DataFieldWithUrl")){p=d["Label"];if(p&&p.String){F.label=p.String;}p=d["Criticality"];if(p){F.criticalityInfo=this._extractCriticalityInfo(p,d);}p=d["Url"];if(p){F.urlInfo=this._extractURLInfo(p);}}};M.prototype.getSelectionVariantAnnotationList=function(p){var e,a,q,r=[],P;if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(this._getFullyQualifiedNameForEntity(p));if(e){for(var b in e){if(b==="com.sap.vocabularies.UI.v1.SelectionVariant"||b.indexOf("com.sap.vocabularies.UI.v1.SelectionVariant#")>-1){q="";a=e[b];P=b.split("#");if(P.length===2){q=P[1];}if(a){r.push({qualifier:q,annotation:a});}}}}}return r;};M.prototype.getSelectionPresentationVariantAnnotationList=function(e){var E,o,a,b,q,v,c,t=null,d=null,p=null,r=[],P;if(e&&this._oMetaModel){o=this._oMetaModel.getODataEntitySet(e);if(o){a=this._oMetaModel.getODataEntityType(o.entityType);}E=[o,a];var g=function(q,i){return i.filter(function(d){return d.qualifier===q;})[0];};var F=this.getEntityTypeNameFromEntitySetName(e);var h=this;E.forEach(function(i){if(i){for(var j in i){if(j==="com.sap.vocabularies.UI.v1.SelectionPresentationVariant"||j.indexOf("com.sap.vocabularies.UI.v1.SelectionPresentationVariant#")>-1){q="";b=i[j];P=j.split("#");if(P.length===2){q=P[1];}if(b){t=null;if(b.Text&&b.Text.String){t=b.Text.String;}if(b.SelectionVariant&&b.SelectionVariant.Path){c=b.SelectionVariant.Path;v="";P=c.split("#");if(P.length===2){v=P[1];}if(a[c.substring(1)]){var k=g(v,h.getSelectionVariantAnnotationList(F));d={qualifier:v,annotation:k?k.annotation:undefined};}}if(b.PresentationVariant&&b.PresentationVariant.Path){c=b.PresentationVariant.Path;v="";P=c.split("#");if(P.length===2){v=P[1];}if(a[c.substring(1)]){p={qualifier:v,annotation:h.getPresentationVariantAnnotation(F,v)};}}r.push({qualifier:q,text:t,annotation:b,selectionVariant:d,presentationVariant:p});}}}}});}return r;};M.prototype.getSelectionFieldsAnnotation=function(p){var e,a,l,i,r;if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(this._getFullyQualifiedNameForEntity(p));if(e){a=e["com.sap.vocabularies.UI.v1.SelectionFields"];if(a){r={annotation:a,selectionFields:[]};l=a.length;for(i=0;i<l;i++){r.selectionFields.push(a[i].PropertyPath);}}}}return r;};M.prototype.getSemanticKeyAnnotation=function(p){var e,a,l,i,r;if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(p);if(e){a=e["com.sap.vocabularies.Common.v1.SemanticKey"];if(a){r={annotation:a,semanticKeyFields:[]};l=a.length;for(i=0;i<l;i++){r.semanticKeyFields.push(a[i].PropertyPath);}}}}return r;};M.prototype._getImportanceAnnotation=function(p){var i=null,r;r=p["com.sap.vocabularies.UI.v1.Importance"];if(r){i=r.EnumMember;}switch(i){case"com.sap.vocabularies.UI.v1.ImportanceType/Medium":return"Medium";case"com.sap.vocabularies.UI.v1.ImportanceType/Low":return"Low";default:return"High";}};M.prototype.getTextArrangementValue=function(p){var P,t,o,a,d;if(p&&this._oMetaModel){if(typeof(p)==="string"){p=this._getFullyQualifiedNameForEntity(p);P=p.split("/");if(P.length>1){t=this._oMetaModel.getODataEntityType(P[0])||this._oMetaModel.getODataComplexType(P[0]);o=this._oMetaModel.getODataProperty(t,P[1]);}else{o=this._oMetaModel.getODataEntityType(p)||this._oMetaModel.getODataComplexType(p);}}else{o=p;}if(o){a=o["com.sap.vocabularies.UI.v1.TextArrangement"];}if(a){switch(a.EnumMember){case"com.sap.vocabularies.UI.v1.TextArrangementType/TextFirst":d="descriptionAndId";break;case"com.sap.vocabularies.UI.v1.TextArrangementType/TextLast":d="idAndDescription";break;case"com.sap.vocabularies.UI.v1.TextArrangementType/TextSeparate":d="idOnly";break;case"com.sap.vocabularies.UI.v1.TextArrangementType/TextOnly":d="descriptionOnly";break;default:d=undefined;break;}}}return d;};M.prototype.getSemanticObjectAnnotation=function(p){var P,t,o,a;if(p&&this._oMetaModel){P=p.split("/");t=this._oMetaModel.getODataEntityType(P[0])||this._oMetaModel.getODataComplexType(P[0]);o=this._oMetaModel.getODataProperty(t,P[1]);if(o){a=o["com.sap.vocabularies.Common.v1.SemanticObject"];}return this._prepareSemanticObjectAnnotationFromProperty(a);}return null;};M.prototype.getSemanticObjectsFromAnnotation=function(p){if(!p||!this._oMetaModel){return null;}var P=p.split("/");var t=this._oMetaModel.getODataEntityType(P[0])||this._oMetaModel.getODataComplexType(P[0]);return M.getSemanticObjectsFromProperty(this._oMetaModel.getODataProperty(t,P[1]));};M.getSemanticObjectsFromProperty=function(p){var o={defaultSemanticObject:undefined,additionalSemanticObjects:[]};for(var a in p){if(a==="com.sap.vocabularies.Common.v1.SemanticObject"){o.defaultSemanticObject=p[a]["String"];}else if(a.startsWith("com.sap.vocabularies.Common.v1.SemanticObject#")){o.additionalSemanticObjects.push(p[a]["String"]);}}return(o.defaultSemanticObject||o.additionalSemanticObjects.length>0)?o:undefined;};M.prototype.getSemanticObjectAnnotationFromProperty=function(p){var a;if(p){a=p["com.sap.vocabularies.Common.v1.SemanticObject"];return this._prepareSemanticObjectAnnotationFromProperty(a);}return null;};M.prototype._prepareSemanticObjectAnnotationFromProperty=function(a){var r,R;if(a){r=a["String"];if(r){R={annotation:a};R.semanticObject=r;}}return R;};M.prototype.getContactAnnotation=function(b){var m=this._oMetaModel.getMetaContext(b);var p=m.getProperty(m.getPath());return p["com.sap.vocabularies.Communication.v1.Contact"];};M.prototype._getFullyQualifiedNameForEntity=function(e){var n,r;if(!e){return undefined;}if(e.indexOf(".")>-1){return e;}n=this.getNamespace();if(n&&!(e.indexOf(n)>-1)){r=n+"."+e;}else{r=e;}return r;};M.getSelectionRangeOptionType=function(t){return s[t];};M.getSelectionRangeSignType=function(t){return S[t];};M.prototype.destroy=function(){this.oModel=null;this._oMetaModel=null;this._oMetadata=null;this._oSchemaDefinition=null;this._sResourceRootUri=null;this.bIsDestroyed=true;this._oDummyAnnotationHelperContext=null;};return M;},true);
