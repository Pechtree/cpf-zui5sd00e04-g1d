sap.ui.define(["sap/suite/ui/generic/template/changeHandler/util/AnnotationChangeUtilsV2","sap/suite/ui/generic/template/designtime/utils/DesigntimeUtils"],function(A,D){"use strict";var C={},M="com.sap.vocabularies.UI.v1.ChartMeasureRoleType",a="com.sap.vocabularies.UI.v1.DataPoint",b="com.sap.vocabularies.UI.v1.ChartType/Area",c="com.sap.vocabularies.UI.v1.ChartType/Donut",d="com.sap.vocabularies.UI.v1.ChartType/Bullet";C.getMeasureDefinition=function(e){var m={Measure:{displayName:"Measure",type:"Edm.PropertyPath",namespace:"com.sap.vocabularies.UI.v1",annotation:"Chart",nullable:"false"},Role:{displayName:"Role",type:"EnumType",namespace:"com.sap.vocabularies.UI.v1",annotation:"Chart",nullable:"false",possibleValues:{Axis1:{displayName:"Axis 1"},Axis2:{displayName:"Axis 2"},Axis3:{displayName:"Axis 3"}}},DataPointAnnotationPath:{displayName:"Data Point Reference",type:"Edm.AnnotationPath",namespace:"com.sap.vocabularies.UI.v1",annotation:"Chart",nullable:"false"}};var o=D.getChartFromParent(e),f=o&&o.entityType[o.chartID];if(!o||!f||!f.ChartType){return m;}switch(f.ChartType.EnumMember){case b:m.DataPoint={displayName:"Data Point Properties",type:"ComplexType",namespace:"com.sap.vocabularies.UI.v1",annotation:"DataPoint",whiteList:{properties:["Value","TargetValue","CriticalityCalculation"],expressionTypes:{Value:["Path"],TargetValue:["Path","String","Int","Decimal"]},CriticalityCalculation:{properties:["ImprovementDirection","DeviationRangeLowValue","DeviationRangeHighValue","ToleranceRangeLowValue","ToleranceRangeHighValue"]}}};break;case d:m.DataPoint={displayName:"Data Point Properties",type:"ComplexType",namespace:"com.sap.vocabularies.UI.v1",annotation:"DataPoint",whiteList:{properties:["Value","TargetValue","ForecastValue","MinimumValue","MaximumValue","Criticality","CriticalityCalculation"],expressionTypes:{Value:["Path"],TargetValue:["Path","String","Int","Decimal"],ForecastValue:["Path","String","Int","Decimal"]},CriticalityCalculation:{properties:["ImprovementDirection","DeviationRangeLowValue","DeviationRangeHighValue","ToleranceRangeLowValue","ToleranceRangeHighValue"]}}};break;case c:m.DataPoint={displayName:"Data Point Properties",type:"ComplexType",namespace:"com.sap.vocabularies.UI.v1",annotation:"DataPoint",whiteList:{properties:["Value","TargetValue","Criticality","CriticalityCalculation"],expressionTypes:{Value:["Path"],TargetValue:["Path","String","Int","Decimal"]},CriticalityCalculation:{properties:["ImprovementDirection","DeviationRangeLowValue","DeviationRangeHighValue","ToleranceRangeLowValue","ToleranceRangeHighValue"]}}};break;default:break;}return m;};C.getMeasures=function(e){var m={},f=[],s,q,g,o,h,k={},l,n=D.getChartFromParent(e),p=n&&n.entityType[n.chartID];if(p&&p.Measures){var r=jQuery.extend(true,{},r,p);for(var i=0;i<r.Measures.length;i++){s=r.Measures[i].PropertyPath;g=false;if(r.MeasureAttributes){for(var j=0;j<r.MeasureAttributes.length;j++){o=r.MeasureAttributes[j];k={};if(o.Measure&&o.Measure.PropertyPath===s){g=true;if(o.DataPoint&&o.DataPoint.AnnotationPath){q=o.DataPoint.AnnotationPath.split("#").reverse()[0];h=q?a+"#"+q:a;l=n.entityType[h];if(l){jQuery.extend(true,k,l);}}m={Measure:{PropertyPath:o.Measure&&o.Measure.PropertyPath},DataPointAnnotationPath:{AnnotationPath:o.DataPoint&&o.DataPoint.AnnotationPath},DataPoint:k};if(o.Role&&o.Role.EnumMember){switch(o.Role.EnumMember){case"com.sap.vocabularies.UI.v1.ChartMeasureRoleType/Axis1":m.Role={EnumMember:"Axis1"};break;case"com.sap.vocabularies.UI.v1.ChartMeasureRoleType/Axis2":m.Role={EnumMember:"Axis2"};break;case"com.sap.vocabularies.UI.v1.ChartMeasureRoleType/Axis3":m.Role={EnumMember:"Axis3"};break;default:break;}}f.push(m);break;}}}if(!g){m={Measure:r.Measures[i]};f.push(m);}}}return f;};C.setMeasures=function(o,n,e){var i,j,k,m,E,N,s,f=[],g,h={},l=D.getChartFromColumn(o),p=l&&l.entityType&&l.entityType[l.chartID];if(!p||jQuery.isEmptyObject(p)||!l||!n){return f;}var q=jQuery.extend(true,{},p),t=l.entityType.namespace+"."+l.entityType.name;if(q.Measures){for(i=q.Measures.length-1;i>=0;i--){E=false;m=q.Measures[i].PropertyPath;for(j=0;j<n.length;j++){if(n[j].Measure&&n[j].Measure.PropertyPath===m){E=true;break;}}if(!E){q.Measures.splice(i,1);for(j=q.MeasureAttributes.length-1;j>=0;j--){g=q.MeasureAttributes[j].Measure;if(g&&g.PropertyPath===m){q.MeasureAttributes.splice(j,1);if(!m){e.noRefreshOnChange=true;}break;}}}}}for(i=0;i<n.length;i++){N=n[i];if(jQuery.isEmptyObject(N)){N={Measure:{PropertyPath:""}};}E=false;if(q.MeasureAttributes){for(j=0;j<q.MeasureAttributes.length;j++){g=q.MeasureAttributes[j].Measure;if(N.Measure&&g&&g.PropertyPath===N.Measure.PropertyPath){E=true;break;}}}if(N.DataPointAnnotationPath&&N.DataPointAnnotationPath.AnnotationPath){s=N.DataPointAnnotationPath.AnnotationPath;}else if(N.Measure&&N.Measure.PropertyPath){s="@"+a+"#"+N.Measure.PropertyPath;N.DataPointAnnotationPath={AnnotationPath:s};}else{s="";}h={Measure:{PropertyPath:N.Measure.PropertyPath},DataPoint:{AnnotationPath:s},RecordType:"com.sap.vocabularies.UI.v1.ChartMeasureAttributeType"};if(N.Role){switch(N.Role.EnumMember){case"Axis2":h.Role={EnumMember:M+"/Axis2"};break;case"Axis3":h.Role={EnumMember:M+"/Axis3"};break;default:h.Role={EnumMember:M+"/Axis1"};break;}}else{var r="Axis1";if(p.MeasureAttributes){var P=["Axis1","Axis2","Axis3"];r="Axis3";for(k=0;k<p.MeasureAttributes.length;k++){var R=p.MeasureAttributes[k].Role.EnumMember.split("/").reverse()[0];var u=P.indexOf(R);if(u!==-1){P.splice(u,1);}}if(P.length>0){r=P[0];}}N.Role={EnumMember:r};h.Role={EnumMember:M+"/"+r};}if(!E){if(!q.Measures){q.Measures=[];}q.Measures.push(N.Measure);if(!q.MeasureAttributes){q.MeasureAttributes=[];}q.MeasureAttributes.push(h);}else{q.MeasureAttributes[j]=h;}if(!jQuery.isEmptyObject(N.DataPoint)){D.modifyDataPointForChart(t,l.entityType,N,f);}if(N.Measure.PropertyPath===""){e.noRefreshOnChange=true;}else if(N.Measure.PropertyPath!==""&&N.DataPoint&&N.DataPoint.Value&&N.DataPoint.Value!==""){e.noRefreshOnChange=false;}}var v=A.createCustomAnnotationTermChange(t,q,p,l.chartID);f.push(v);return f;};return C;});
