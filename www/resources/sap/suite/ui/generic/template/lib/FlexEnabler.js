jQuery.sap.declare("sap.suite.ui.generic.template.lib.FlexEnabler");sap.ui.core.Control.extend("sap.suite.ui.generic.template.lib.FlexEnabler",{metadata:{library:"sap.suite.ui.generic.template",designtime:"sap/suite/ui/generic/template/designtime/FlexEnabler.designtime",aggregations:{"content":{singularName:"content",multiple:false}},defaultAggregation:"content",properties:{flexEnabled:{type:"boolean",group:"Misc",defaultValue:true}},designTime:true},renderer:function(r,c){"use strict";r.write("<div");r.writeControlData(c);r.write(">");r.write("<div>FlexEnabler</div>");var a=c.getAggregation("content");r.renderControl(a);r.write("</div>");}});
