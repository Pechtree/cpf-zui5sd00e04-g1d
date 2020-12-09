/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/support/Plugin','sap/ui/core/util/serializer/ViewSerializer','sap/ui/thirdparty/jszip','sap/ui/base/DataType','sap/ui/core/Element','sap/ui/core/ElementMetadata','sap/ui/core/UIArea','sap/ui/core/mvc/View','sap/ui/core/mvc/Controller','sap/ui/model/Binding','sap/ui/model/CompositeBinding'],function(q,P,V,J,D,E,a,U,b,C,B,c){"use strict";var $=q;var d=P.extend("sap.ui.core.support.plugins.ControlTree",{constructor:function(s){P.apply(this,["sapUiSupportControlTree","Control Tree",s]);this._oStub=s;if(this.runsAsToolPlugin()){this._aEventIds=["sapUiSupportSelectorSelect",this.getId()+"ReceiveControlTree",this.getId()+"ReceiveControlTreeExport",this.getId()+"ReceiveControlTreeExportError",this.getId()+"TriggerRequestProperties",this.getId()+"ReceiveProperties",this.getId()+"ReceiveBindingInfos",this.getId()+"ReceiveMethods",this.getId()+"ReceivePropertiesMethods"];this._breakpointId="sapUiSupportBreakpoint";this._tab={properties:"Properties",bindinginfos:"BindingInfos",breakpoints:"Breakpoints",exports:"Export"};this._currentTab=this._tab.properties;}else{this._aEventIds=[this.getId()+"RequestControlTree",this.getId()+"RequestControlTreeSerialize",this.getId()+"RequestProperties",this.getId()+"RequestBindingInfos",this.getId()+"ChangeProperty",this.getId()+"RefreshBinding"];var t=this;sap.ui.getCore().registerPlugin({startPlugin:function(o){t.oCore=o;},stopPlugin:function(){t.oCore=undefined;}});}}});d.prototype.init=function(s){P.prototype.init.apply(this,arguments);if(this.runsAsToolPlugin()){e.call(this,s);}else{h.call(this,s);}};function e(s){$(document).on("click","li img.sapUiControlTreeIcon",$.proxy(this._onIconClick,this)).on("click","li.sapUiControlTreeElement div",$.proxy(this._onNodeClick,this)).on("click","li.sapUiControlTreeLink div",$.proxy(this._onControlTreeLinkClick,this)).on("click","#sapUiSupportControlTabProperties",$.proxy(this._onPropertiesTab,this)).on("click","#sapUiSupportControlTabBindingInfos",$.proxy(this._onBindingInfosTab,this)).on("click","#sapUiSupportControlTabBreakpoints",$.proxy(this._onMethodsTab,this)).on("click","#sapUiSupportControlTabExport",$.proxy(this._onExportTab,this)).on("change","[data-sap-ui-name]",$.proxy(this._onPropertyChange,this)).on("change","[data-sap-ui-method]",$.proxy(this._onPropertyBreakpointChange,this)).on("keyup",'.sapUiSupportControlMethods input[type="text"]',$.proxy(this._autoComplete,this)).on("blur",'.sapUiSupportControlMethods input[type="text"]',$.proxy(this._updateSelectOptions,this)).on("change",'.sapUiSupportControlMethods select',$.proxy(this._selectOptionsChanged,this)).on("click",'#sapUiSupportControlAddBreakPoint',$.proxy(this._onAddBreakpointClicked,this)).on("click",'#sapUiSupportControlExportToXml',$.proxy(this._onExportToXmlClicked,this)).on("click",'#sapUiSupportControlExportToHtml',$.proxy(this._onExportToHtmlClicked,this)).on("click",'#sapUiSupportControlActiveBreakpoints img.remove-breakpoint',$.proxy(this._onRemoveBreakpointClicked,this)).on("click",'#sapUiSupportControlPropertiesArea a.control-tree',$.proxy(this._onNavToControl,this)).on("click",'#sapUiSupportControlPropertiesArea img.sapUiSupportRefreshBinding',$.proxy(this._onRefreshBinding,this));this.renderContentAreas();}d.prototype.exit=function(s){P.prototype.exit.apply(this,arguments);if(this.runsAsToolPlugin()){$(document).off('click','li img.sapUiControlTreeIcon').off('click','li div').off("click","li.sapUiControlTreeLink").off("click","#sapUiSupportControlTabProperties").off("click","#sapUiSupportControlTabBindings").off("click","#sapUiSupportControlTabBreakpoints").off("click","#sapUiSupportControlTabExport").off('change','[data-sap-ui-name]').off('change','[data-sap-ui-method]').off('keyup','.sapUiSupportControlMethods input[type="text"]').off('blur','.sapUiSupportControlMethods select').off('change','.sapUiSupportControlMethods select').off('click','#sapUiSupportControlAddBreakPoint').off('click','#sapUiSupportControlExportToXml').off('click','#sapUiSupportControlExportToHtml').off('click','#sapUiSupportControlActiveBreakpoints img.remove-breakpoint').off('click','#sapUiSupportControlPropertiesArea a.control-tree').off('click','#sapUiSupportControlPropertiesArea img.sapUiSupportRefreshBinding');}};function f(s){if(s==null){return"";}s=String(s);return s.slice(1+s.lastIndexOf('.'));}function g(s){return s==null?"":q.sap.encodeHTML(String(s));}d.prototype.renderContentAreas=function(){var r=sap.ui.getCore().createRenderManager();r.write('<div>You can find a control in this tree by clicking it in the application UI while pressing the Ctrl+Alt+Shift keys.</div>');r.write('<div id="sapUiSupportControlTreeArea"><ul class="sapUiSupportControlTreeList"></ul></div>');r.write('<div id="sapUiSupportControlTabs" style="visibility:hidden">');r.write('<button id="sapUiSupportControlTabProperties" class="sapUiSupportBtn">Properties</button>');r.write('<button id="sapUiSupportControlTabBindingInfos" class="sapUiSupportBtn">Binding Infos</button>');r.write('<button id="sapUiSupportControlTabBreakpoints" class="sapUiSupportBtn">Breakpoints</button>');r.write('<button id="sapUiSupportControlTabExport" class="sapUiSupportBtn">Export</button>');r.write('</div>');r.write('<div id="sapUiSupportControlPropertiesArea"></div>');r.flush(this.$().get(0));r.destroy();};d.prototype.renderControlTree=function(i){var r=sap.ui.getCore().createRenderManager();function j(I,m){var H=m.aggregation.length>0||m.association.length>0;r.write("<li id=\"sap-debug-controltree-"+g(m.id)+"\" class=\"sapUiControlTreeElement\">");var s=H?"minus":"space";r.write("<img class=\"sapUiControlTreeIcon\" style=\"height: 12px; width: 12px;\" src=\"../../debug/images/"+s+".gif\" />");if(m.isAssociation){r.write("<img title=\"Association\" class=\"sapUiControlTreeIcon\" style=\"height: 12px; width: 12px;\" src=\"../../debug/images/link.gif\" />");}var k=f(m.type);r.write('<div>');r.write('<span class="name" title="'+g(m.type)+'">'+g(k)+' - '+g(m.id)+'</span>');r.write('<span class="sapUiSupportControlTreeBreakpointCount" title="Number of active breakpoints / methods" style="display:none;"></span>');r.write('</div>');if(m.aggregation.length>0){r.write("<ul>");$.each(m.aggregation,j);r.write("</ul>");}if(m.association.length>0){r.write("<ul>");$.each(m.association,function(I,v){if(v.isAssociationLink){var t=f(v.type);r.write("<li data-sap-ui-controlid=\""+g(v.id)+"\" class=\"sapUiControlTreeLink\">");r.write("<img class=\"sapUiControlTreeIcon\" style=\"height: 12px; width: 12px;\" align=\"middle\" src=\"../../debug/images/space.gif\" />");r.write("<img class=\"sapUiControlTreeIcon\" style=\"height: 12px; width: 12px;\" align=\"middle\" src=\"../../debug/images/link.gif\" />");r.write("<div><span title=\"Association '"+g(v.name)+"' to '"+g(v.id)+"' with type '"+g(v.type)+"'\">"+g(t)+" - "+g(v.id)+" ("+g(v.name)+")</span></div>");r.write("</li>");}else{j(0,v);}});r.write("</ul>");}r.write("</li>");}$.each(i,j);r.flush(this.$().find("#sapUiSupportControlTreeArea > ul.sapUiSupportControlTreeList").get(0));r.destroy();};d.prototype.renderPropertiesTab=function(i,s){var r=sap.ui.getCore().createRenderManager();r.write('<ul class="sapUiSupportControlTreeList" data-sap-ui-controlid="'+g(s)+'">');$.each(i,function(I,v){r.write("<li>");r.write("<span><label class='sapUiSupportLabel'>BaseType:</label> <code>"+g(v.control)+"</code></span>");if(v.properties.length>0||v.aggregations.length>0){r.write('<div class="get" title="Activate debugger for get-method">G</div><div class="set" title="Activate debugger for set-method">S</div>');r.write("<div class=\"sapUiSupportControlProperties\"><table><colgroup><col width=\"50%\"/><col width=\"50%\"/></colgroup>");$.each(v.properties,function(I,p){r.write("<tr><td>");r.write("<label class='sapUiSupportLabel'>"+g(p.name)+((p.isBound)?'<img title="Value is bound (see Binding Infos)" src="../../debug/images/link.gif" style="vertical-align:middle;margin-left:3px">':"")+"</label>");r.write("</td><td>");if(p.type==="boolean"){r.write("<input type='checkbox' ");r.write("data-sap-ui-name='"+g(p.name)+"' ");if(p.value==true){r.write("checked='checked'");}r.write("/>");}else if(p.enumValues){r.write("<div><select ");r.write("data-sap-ui-name='"+g(p.name)+"'>");$.each(p.enumValues,function(k,j){r.write("<option");if(k===p.value){r.write(" selected");}r.write(">");r.writeEscaped(""+k);r.write("</option>");});r.write("</select></div>");}else{r.write("<div><input type='text' ");r.write("data-sap-ui-name='"+g(p.name)+"' ");if(p.value){r.write("value='");r.writeEscaped(""+p.value);r.write("'");}r.write("/></div>");}r.write("</td>");r.write('<td><input type="checkbox" data-sap-ui-method="'+g(p._sGetter)+'" title="Activate debugger for '+g(p._sGetter)+'"');if(p.bp_sGetter){r.write("checked='checked'");}r.write('/></td>');r.write('<td><input type="checkbox" data-sap-ui-method="'+g(p._sMutator)+'" title="Activate debugger for '+g(p._sMutator)+'"');if(p.bp_sMutator){r.write("checked='checked'");}r.write('/></td>');r.write("</tr>");});$.each(v.aggregations,function(I,A){r.write("<tr><td>");r.write("<label class='sapUiSupportLabel'>"+g(A.name)+"</label>");r.write("</td><td>");r.write(g(A.value));r.write("</td>");r.write('<td><input type="checkbox" data-sap-ui-method="'+g(A._sGetter)+'" title="Activate debugger for '+g(A._sGetter)+'"');if(A.bp_sGetter){r.write("checked='checked'");}r.write('/></td>');r.write('<td><input type="checkbox" data-sap-ui-method="'+g(A._sMutator)+'" title="Activate debugger for '+g(A._sMutator)+'"');if(A.bp_sMutator){r.write("checked='checked'");}r.write('/></td>');r.write("</tr>");});r.write("</table></div>");}r.write("</li>");});r.write("</ul>");r.flush(this.$().find("#sapUiSupportControlPropertiesArea").get(0));r.destroy();this.$().find("#sapUiSupportControlTabs").css("visibility","");this.selectTab(this._tab.properties);};d.prototype.renderBindingsTab=function(m,s){var r=sap.ui.getCore().createRenderManager();if(m.contexts.length>0){r.write('<h2 style="padding-left:5px">Contexts</h2>');r.write('<ul class="sapUiSupportControlTreeList" data-sap-ui-controlid="'+g(s)+'">');$.each(m.contexts,function(i,o){r.write('<li>');r.write('<span><label class="sapUiSupportLabel">Model Name: '+g(o.modelName)+'</label></span>');r.write('<div class="sapUiSupportControlProperties">');r.write('<table><colgroup><col width="15%"><col width="35%"><col width="50%"></colgroup>');r.write('<tbody>');r.write('<tr><td colspan="2">');r.write('<label class="sapUiSupportLabel">Path</label>');r.write('</td><td>');r.write('<div><span');if(o.invalidPath){r.write(' style="color:red"');}r.write('>'+g(o.path));if(o.invalidPath){r.write(' (invalid)');}r.write('</span></div>');r.write('</td></tr>');if(o.location){r.write('<tr><td colspan="2">');r.write('<label class="sapUiSupportLabel">Inherited from</label>');r.write('</td><td>');r.write('<div><a class="control-tree sapUiSupportLink" title="'+g(o.location.name)+'" data-sap-ui-control-id="'+g(o.location.id)+'" href="#">'+g(f(o.location.name))+' ('+g(o.location.id)+')</a></div>');r.write('</td></tr>');}r.write('</tbody></table></div></li>');});r.write('</ul>');}if(m.bindings.length>0){r.write('<h2 style="padding-left:5px">Bindings</h2>');r.write('<ul class="sapUiSupportControlTreeList" data-sap-ui-controlid="'+g(s)+'">');$.each(m.bindings,function(i,o){r.write('<li data-sap-ui-binding-name="'+g(o.name)+'">');r.write('<span>');r.write('<label class="sapUiSupportLabel" style="vertical-align: middle">'+g(o.name)+'</label>');r.write('<img class="sapUiSupportRefreshBinding" title="Refresh Binding" '+'src="../../debug/images/refresh.gif" style="cursor:pointer;margin-left:5px;vertical-align:middle">');r.write('</span>');$.each(o.bindings,function(j,k){r.write('<div class="sapUiSupportControlProperties">');r.write('<table><colgroup><col width="15%"><col width="35%"><col width="50%"></colgroup>');r.write('<tbody>');r.write('<tr><td colspan="2">');r.write('<label class="sapUiSupportLabel">Path</label>');r.write('</td><td>');r.write('<div><span');if(k.invalidPath){r.write(' style="color:red"');}r.write('>'+g(k.path));if(k.invalidPath){r.write(' (invalid)');}r.write('</span></div>');r.write('</td></tr>');r.write('<tr><td colspan="2">');r.write('<label class="sapUiSupportLabel">Absolute Path</label>');r.write('</td><td>');if(typeof k.absolutePath!=='undefined'){r.write('<div>'+g(k.absolutePath)+'</div>');}else{r.write('<div>No binding</div>');}r.write('</td></tr>');r.write('<tr><td colspan="2">');r.write('<label class="sapUiSupportLabel">Relative</label>');r.write('</td><td>');if(typeof k.isRelative!=='undefined'){r.write('<div>'+g(k.isRelative)+'</div>');}else{r.write('<div>No binding</div>');}r.write('</td></tr>');r.write('<tr><td colspan="2">');r.write('<label class="sapUiSupportLabel">Binding Type</label>');r.write('</td><td>');if(!o.type){r.write('<div>No binding</div>');}else{r.write('<div title="'+g(o.type)+'">'+g(f(o.type))+'</div>');}r.write('</td></tr>');if(k.mode){r.write('<tr><td colspan="2">');r.write('<label class="sapUiSupportLabel">Binding Mode</label>');r.write('</td><td>');r.write('<div>'+g(k.mode)+'</div>');r.write('</td></tr>');}r.write('<tr><td>');r.write('<label class="sapUiSupportLabel">Model</label>');r.write('</td><td>');r.write('<label class="sapUiSupportLabel">Name</label>');r.write('</td><td>');if(k.model&&k.model.name){r.write('<div>'+g(k.model.name)+'</div>');}else{r.write('<div>No binding</div>');}r.write('</td></tr>');r.write('<tr><td>');r.write('</td><td>');r.write('<label class="sapUiSupportLabel">Type</label>');r.write('</td><td>');if(k.model&&k.model.type){r.write('<div><span title="'+g(k.model.type)+'">'+g(f(k.model.type))+'</span></div>');}else{r.write('<div><span>No binding</span></div>');}r.write('</td></tr>');r.write('<tr><td>');r.write('</td><td>');r.write('<label class="sapUiSupportLabel">Default Binding Mode</label>');r.write('</td><td>');if(k.model&&k.model.bindingMode){r.write('<div><span>'+g(k.model.bindingMode)+'</span></div>');}else{r.write('<div><span>No binding</span></div>');}r.write('</td></tr>');r.write('<tr><td>');r.write('</td><td>');r.write('<label class="sapUiSupportLabel">Location</label>');r.write('</td><td>');if(k.model&&k.model.location&&k.model.location.type){if(k.model.location.type==='control'){r.write('<div><a class="control-tree sapUiSupportLink" title="'+g(k.model.location.name)+'" data-sap-ui-control-id="'+g(k.model.location.id)+'" href="#">'+g(f(k.model.location.name))+' ('+g(k.model.location.id)+')</a></div>');}else{r.write('<div><span title="sap.ui.getCore()">Core</span></div>');}}else{r.write('<div><span>No binding</span></div>');}r.write('</td></tr>');r.write('</tbody></table></div>');});r.write('</li>');});r.write('</ul>');}r.flush(this.$().find("#sapUiSupportControlPropertiesArea").get(0));r.destroy();};d.prototype.renderBreakpointsTab=function(m,s){var r=sap.ui.getCore().createRenderManager();r.write('<div class="sapUiSupportControlMethods" data-sap-ui-controlid="'+g(s)+'">');r.write('<select id="sapUiSupportControlMethodsSelect" class="sapUiSupportAutocomplete"><option></option>');$.each(m,function(i,v){if(!v.active){r.write('<option>'+g(v.name)+'</option>');}});r.write('</select>');r.write('<input class="sapUiSupportControlBreakpointInput sapUiSupportAutocomplete" type="text"/>');r.write('<button id="sapUiSupportControlAddBreakPoint" class="sapUiSupportBtn">Add breakpoint</button>');r.write('<hr class="no-border"/><ul id="sapUiSupportControlActiveBreakpoints" class="sapUiSupportList sapUiSupportBreakpointList">');$.each(m,function(i,v){if(!v.active){return;}r.write('<li><span>'+g(v.name)+'</span>'+'<img class="remove-breakpoint" style="cursor:pointer;margin-left:5px" '+'src="../../debug/images/delete.gif"></li>');});r.write('</ul></div>');r.flush(this.$().find("#sapUiSupportControlPropertiesArea").get(0));r.destroy();this.selectTab(this._tab.breakpoints);this.$().find('.sapUiSupportControlBreakpointInput').focus();};d.prototype.renderExportTab=function(){var r=sap.ui.getCore().createRenderManager();r.write('<button id="sapUiSupportControlExportToXml" class="sapUiSupportBtn">Export To XML</button>');r.write('<br><br>');r.write('<button id="sapUiSupportControlExportToHtml" class="sapUiSupportBtn">Export To HTML</button>');r.flush(this.$().find("#sapUiSupportControlPropertiesArea").get(0));r.destroy();this.selectTab(this._tab.exports);};d.prototype.requestProperties=function(s){this._oStub.sendEvent(this._breakpointId+"RequestInstanceMethods",{controlId:s,callback:this.getId()+"ReceivePropertiesMethods"});};d.prototype.updateBreakpointCount=function(s,m){var i=$("#sap-debug-controltree-"+s+" > div span.sapUiSupportControlTreeBreakpointCount");if(m.active>0){i.text(m.active+" / "+m.all).show();}else{i.text("").hide();}};d.prototype.onsapUiSupportControlTreeTriggerRequestProperties=function(o){this.requestProperties(o.getParameter("controlId"));};d.prototype.onsapUiSupportControlTreeReceivePropertiesMethods=function(o){var s=o.getParameter("controlId");this._oStub.sendEvent(this.getId()+"RequestProperties",{id:s,breakpointMethods:o.getParameter("methods")});this.updateBreakpointCount(s,JSON.parse(o.getParameter("breakpointCount")));};d.prototype.onsapUiSupportControlTreeReceiveControlTree=function(o){this.renderControlTree(JSON.parse(o.getParameter("controlTree")));};d.prototype.onsapUiSupportControlTreeReceiveControlTreeExportError=function(o){var s=o.getParameter("errorMessage");this._drawAlert(s);};d.prototype._drawAlert=function(s){alert("ERROR: The selected element cannot not be exported.\nPlease choose an other one.\n\nReason:\n"+s);};d.prototype.onsapUiSupportControlTreeReceiveControlTreeExport=function(o){var z;var v=JSON.parse(o.getParameter("serializedViews"));var t=o.getParameter("sType");if(!$.isEmptyObject(v)){z=new J();for(var j in v){var k=v[j];z.file(j.replace(/\./g,'/')+".view."+t.toLowerCase(),k);}}if(z){var l=z.generate({base64:true});var r=window.atob(l);var u=new Uint8Array(r.length);for(var i=0;i<u.length;++i){u[i]=r.charCodeAt(i);}var m=new Blob([u],{type:'application/zip'});var n=document.createEvent("HTMLEvents");n.initEvent("click");$("<a>",{download:t.toUpperCase()+"Export.zip",href:window.URL.createObjectURL(m)}).get(0).dispatchEvent(n);}};d.prototype.onsapUiSupportSelectorSelect=function(o){this.selectControl(o.getParameter("id"));};d.prototype.onsapUiSupportControlTreeReceiveProperties=function(o){this.renderPropertiesTab(JSON.parse(o.getParameter("properties")),o.getParameter("id"));};d.prototype.onsapUiSupportControlTreeReceiveBindingInfos=function(o){this.renderBindingsTab(JSON.parse(o.getParameter("bindinginfos")),o.getParameter("id"));};d.prototype.onsapUiSupportControlTreeReceiveMethods=function(o){var s=o.getParameter("controlId");this.renderBreakpointsTab(JSON.parse(o.getParameter("methods")),s);this.updateBreakpointCount(s,JSON.parse(o.getParameter("breakpointCount")));};d.prototype._onNodeClick=function(o){var i=$(o.target);var j=i.closest("li");if(j.hasClass("sapUiControlTreeElement")){$(".sapUiControlTreeElement > div").removeClass("sapUiSupportControlTreeSelected");j.children("div").addClass("sapUiSupportControlTreeSelected");this._oStub.sendEvent("sapUiSupportSelectorHighlight",{id:j.attr("id").substring("sap-debug-controltree-".length)});var I=j.attr("id").substring("sap-debug-controltree-".length);if(i.hasClass("sapUiSupportControlTreeBreakpointCount")){this._currentTab=this._tab.breakpoints;}this.onAfterControlSelected(I);}o.stopPropagation();};d.prototype._onIconClick=function(o){var i=$(o.target);if(i.parent().attr("data-sap-ui-collapsed")){i.attr("src",i.attr("src").replace("plus","minus")).parent().removeAttr("data-sap-ui-collapsed");i.siblings("ul").show();}else{i.attr("src",i.attr("src").replace("minus","plus")).parent().attr("data-sap-ui-collapsed","true");i.siblings("ul").hide();}if(o.stopPropagation){o.stopPropagation();}};d.prototype._onControlTreeLinkClick=function(o){this.selectControl($(o.target).closest("li").attr("data-sap-ui-controlid"));};d.prototype._onPropertiesTab=function(o){if(this.selectTab(this._tab.properties)){this.requestProperties(this.getSelectedControlId());}};d.prototype._onBindingInfosTab=function(o){if(this.selectTab(this._tab.bindinginfos)){this._oStub.sendEvent(this.getId()+"RequestBindingInfos",{id:this.getSelectedControlId()});}};d.prototype._onMethodsTab=function(o){if(this.selectTab(this._tab.breakpoints)){this._oStub.sendEvent(this._breakpointId+"RequestInstanceMethods",{controlId:this.getSelectedControlId(),callback:this.getId()+"ReceiveMethods"});}};d.prototype._onExportTab=function(o){if(this.selectTab(this._tab.exports)){this.renderExportTab();}};d.prototype._autoComplete=function(o){if(o.keyCode==q.sap.KeyCodes.ENTER){this._updateSelectOptions(o);this._onAddBreakpointClicked();}if(o.keyCode>=q.sap.KeyCodes.ARROW_LEFT&&o.keyCode<=q.sap.KeyCodes.ARROW_DOWN){return;}var j=$(o.target),k=j.prev("select"),I=j.val();if(I==""){return;}var O=k.find("option").map(function(){return $(this).val();}).get();var s;for(var i=0;i<O.length;i++){s=O[i];if(s.toUpperCase().indexOf(I.toUpperCase())==0){var l=j.cursorPos();if(o.keyCode==q.sap.KeyCodes.BACKSPACE){l--;}j.val(s);j.selectText(l,s.length);break;}}return;};d.prototype._updateSelectOptions=function(o){var s=o.target;if(s.tagName=="INPUT"){var v=s.value;s=s.previousSibling;var O=s.options;for(var i=0;i<O.length;i++){var t=O[i].value||O[i].text;if(t.toUpperCase()==v.toUpperCase()){s.selectedIndex=i;break;}}}var j=s.selectedIndex;var k=s.options[j].value||s.options[j].text;if(s.nextSibling&&s.nextSibling.tagName=="INPUT"){s.nextSibling.value=k;}};d.prototype._onAddBreakpointClicked=function(o){var i=this.$().find("#sapUiSupportControlMethodsSelect");this._oStub.sendEvent(this._breakpointId+"ChangeInstanceBreakpoint",{controlId:i.closest("[data-sap-ui-controlid]").attr("data-sap-ui-controlid"),methodName:i.val(),active:true,callback:this.getId()+"ReceiveMethods"});};d.prototype._onExportToXmlClicked=function(o){this._startSerializing("XML");};d.prototype._onExportToHtmlClicked=function(o){this._startSerializing("HTML");};d.prototype._startSerializing=function(t){var s=this.getSelectedControlId();if(s){this._oStub.sendEvent(this.getId()+"RequestControlTreeSerialize",{controlID:s,sType:t});}else{this._drawAlert("Nothing to export. Please select an item in the control tree.");}};d.prototype._onRemoveBreakpointClicked=function(o){var i=$(o.target);this._oStub.sendEvent(this._breakpointId+"ChangeInstanceBreakpoint",{controlId:i.closest("[data-sap-ui-controlid]").attr("data-sap-ui-controlid"),methodName:i.siblings('span').text(),active:false,callback:this.getId()+"ReceiveMethods"});};d.prototype._selectOptionsChanged=function(o){var s=o.target;var i=s.nextSibling;i.value=s.options[s.selectedIndex].value;};d.prototype._onPropertyChange=function(o){var s=o.target;var i=$(s);var I=i.closest("[data-sap-ui-controlid]").attr("data-sap-ui-controlid");var v=i.val();if(i.attr("type")==="checkbox"){v=""+i.is(":checked");}this._oStub.sendEvent(this.getId()+"ChangeProperty",{id:I,name:i.attr("data-sap-ui-name"),value:v});};d.prototype._onPropertyBreakpointChange=function(o){var i=$(o.target);this._oStub.sendEvent(this._breakpointId+"ChangeInstanceBreakpoint",{controlId:i.closest("[data-sap-ui-controlid]").attr("data-sap-ui-controlid"),methodName:i.attr("data-sap-ui-method"),active:i.is(":checked"),callback:this.getId()+"TriggerRequestProperties"});};d.prototype._onNavToControl=function(o){var i=$(o.target);var I=i.attr("data-sap-ui-control-id");if(I!==this.getSelectedControlId()){this.selectControl(I);}};d.prototype._onRefreshBinding=function(o){var i=$(o.target);var I=i.closest("[data-sap-ui-controlid]").attr("data-sap-ui-controlid");var n=i.closest("[data-sap-ui-binding-name]").attr("data-sap-ui-binding-name");this._oStub.sendEvent(this.getId()+"RefreshBinding",{id:I,name:n});};d.prototype.selectTab=function(t){var i=this.$().find("#sapUiSupportControlTab"+t);if(i.hasClass("active")){return false;}this.$().find("#sapUiSupportControlTabs button").removeClass("active");i.addClass("active");this._currentTab=t;return true;};d.prototype.getSelectedControlId=function(){var i=this.$().find(".sapUiSupportControlTreeSelected");if(i.length===0){return undefined;}else{return i.parent().attr("id").substring("sap-debug-controltree-".length);}};d.prototype.selectControl=function(s){if(!s){return;}$(".sapUiControlTreeElement > div").removeClass("sapUiSupportControlTreeSelected");var t=this;$.sap.byId("sap-debug-controltree-"+s).parents("[data-sap-ui-collapsed]").each(function(i,v){t._onIconClick({target:$(v).find("img:first").get(0)});});var p=$.sap.byId("sap-debug-controltree-"+s).children("div").addClass("sapUiSupportControlTreeSelected").position();var S=this.$().find("#sapUiSupportControlTreeArea").scrollTop();this.$().find("#sapUiSupportControlTreeArea").scrollTop(S+p.top);this.onAfterControlSelected(s);};d.prototype.onAfterControlSelected=function(i){if(this._currentTab==this._tab.properties){this.requestProperties(i);}else if(this._currentTab==this._tab.breakpoints){this._oStub.sendEvent(this._breakpointId+"RequestInstanceMethods",{controlId:i,callback:this.getId()+"ReceiveMethods"});}else if(this._currentTab==this._tab.bindinginfos){this._oStub.sendEvent(this.getId()+"RequestBindingInfos",{id:this.getSelectedControlId()});}};function h(s){this.onsapUiSupportControlTreeRequestControlTree();}d.prototype.onsapUiSupportControlTreeRequestControlTree=function(o){this._oStub.sendEvent(this.getId()+"ReceiveControlTree",{controlTree:JSON.stringify(this.getControlTree())});};d.prototype.onsapUiSupportControlTreeRequestControlTreeSerialize=function(o){var j=this.oCore.byId(o.getParameter("controlID"));var t=o.getParameter("sType");var v;var m;sap.ui.controller(t+"ViewController",{});sap.ui.jsview(t+"ViewExported",{getControllerName:function(){return t+"ViewController";},createContent:function(s){}});sap.ui.controller(t+"ViewController",{});sap.ui.jsview(t+"ViewExported",{getControllerName:function(){return t+"ViewController";},createContent:function(s){}});try{if(j){var p=j.getParent();var k;k=p.indexOfContent(j);if(j instanceof b){v=new V(j,window,"sap.m");}else{var l=sap.ui.jsview(t+"ViewExported");l.addContent(j);v=new V(l,window,"sap.m");}m=(t&&t!=="XML")?v.serializeToHTML():v.serializeToXML();if(k){p.insertContent(j,k);}else{p.addContent(j);}}else{var u=this.oCore.getUIArea(o.getParameter("controlID"));var l=sap.ui.jsview(t+"ViewExported");var n=u.getContent();for(var i=0;i<n.length;i++){l.addContent(n[i]);}v=new V(l,window,"sap.m");m=(t&&t!=="XML")?v.serializeToHTML():v.serializeToXML();for(var i=0;i<n.length;i++){u.addContent(n[i]);}}if(v){this._oStub.sendEvent(this.getId()+"ReceiveControlTreeExport",{serializedViews:JSON.stringify(m),sType:t});}}catch(r){this._oStub.sendEvent(this.getId()+"ReceiveControlTreeExportError",{errorMessage:r.message});}};d.prototype.onsapUiSupportControlTreeRequestProperties=function(o){var i=JSON.parse(o.getParameter("breakpointMethods"));var j=this.getControlProperties(o.getParameter("id"),i);this._oStub.sendEvent(this.getId()+"ReceiveProperties",{id:o.getParameter("id"),properties:JSON.stringify(j)});};d.prototype.onsapUiSupportControlTreeChangeProperty=function(o){var i=o.getParameter("id");var j=this.oCore.byId(i);if(j){var n=o.getParameter("name");var v=o.getParameter("value");var p=j.getMetadata().getProperty(n);if(p&&p.type){var t=D.getType(p.type);if(t instanceof D){var k=t.parseValue(v);if(t.isValid(k)&&k!=="(null)"){j[p._sMutator](k);}}else if(t){if(t[v]){j[p._sMutator](v);}}}}};d.prototype.onsapUiSupportControlTreeRequestBindingInfos=function(o){var i=o.getParameter("id");this._oStub.sendEvent(this.getId()+"ReceiveBindingInfos",{id:i,bindinginfos:JSON.stringify(this.getControlBindingInfos(i))});};d.prototype.onsapUiSupportControlTreeRefreshBinding=function(o){var i=o.getParameter("id");var s=o.getParameter("name");this.refreshBinding(i,s);this._oStub.sendEvent(this.getId()+"ReceiveBindingInfos",{id:i,bindinginfos:JSON.stringify(this.getControlBindingInfos(i))});};d.prototype.getControlTree=function(){var o=this.oCore,j=[],A={};function s(i){var m={id:i.getId(),type:"",aggregation:[],association:[]};A[m.id]=m.id;if(i instanceof U){m.library="sap.ui.core";m.type="sap.ui.core.UIArea";$.each(i.getContent(),function(I,i){var x=s(i);m.aggregation.push(x);});}else{m.library=i.getMetadata().getLibraryName();m.type=i.getMetadata().getName();if(i.mAggregations){for(var l in i.mAggregations){var n=i.mAggregations[l];if(n){var p=$.isArray(n)?n:[n];$.each(p,function(I,x){if(x instanceof E){var y=s(x);m.aggregation.push(y);}});}}}if(i.mAssociations){var r=i.getMetadata().getAllAssociations();for(var t in i.mAssociations){var u=i.mAssociations[t];var v=(r[t])?r[t].type:null;if(u&&v){var w=$.isArray(u)?u:[u];$.each(w,function(I,x){m.association.push({id:x,type:v,name:t,isAssociationLink:true});});}}}}return m;}$.each(o.mUIAreas,function(i,u){var m=s(u);j.push(m);});function k(I,m){for(var i=0;i<m.association.length;i++){var l=m.association[i];if(!A[l.id]){var t=q.sap.getObject(l.type);if(!t){continue;}var S=t.getMetadata().getStereotype(),O=null;switch(S){case"element":case"control":O=o.byId(l.id);break;case"component":O=o.getComponent(l.id);break;case"template":O=o.getTemplate(l.id);break;default:break;}if(!O){continue;}m.association[i]=s(O);m.association[i].isAssociation=true;k(0,m.association[i]);}}$.each(m.aggregation,k);}$.each(j,k);return j;};d.prototype.getControlProperties=function(i,m){var p=/^((boolean|string|int|float)(\[\])?)$/;var j=[];var k=this.oCore.byId(i);if(!k&&this.oCore.getUIArea(i)){j.push({control:"sap.ui.core.UIArea",properties:[],aggregations:[]});}else if(k){var M=k.getMetadata();while(M instanceof a){var l={control:M.getName(),properties:[],aggregations:[]};var n=M.getProperties();$.each(n,function(K,r){var s={};$.each(r,function(N,v){if(N.substring(0,1)!=="_"||(N=='_sGetter'||N=='_sMutator')){s[N]=v;}if(N=='_sGetter'||N=='_sMutator'){s["bp"+N]=$.grep(m,function(o){return o.name===v&&o.active;}).length===1;}var t=D.getType(r.type);if(t&&!(t instanceof D)){s["enumValues"]=t;}});s.value=k.getProperty(K);s.isBound=!!k.mBindingInfos[K];l.properties.push(s);});var A=M.getAggregations();$.each(A,function(K,r){if(r.altTypes&&r.altTypes[0]&&p.test(r.altTypes[0])&&typeof(k.getAggregation(K))!=='object'){var s={};$.each(r,function(N,v){if(N.substring(0,1)!=="_"||(N=='_sGetter'||N=='_sMutator')){s[N]=v;}if(N=='_sGetter'||N=='_sMutator'){s["bp"+N]=$.grep(m,function(o){return o.name===v&&o.active;}).length===1;}});s.value=k.getAggregation(K);l.aggregations.push(s);}});j.push(l);M=M.getParent();}}return j;};d.prototype.getControlBindingInfos=function(i){var m={bindings:[],contexts:[]};var o=this.oCore.byId(i);if(!o){return m;}var j=o.mBindingInfos;var t=this;for(var k in j){if(j.hasOwnProperty(k)){var l=j[k];var n=[];var p,r=[];if($.isArray(l.parts)){p=l.parts;}else{p=[l];}if(l.binding instanceof c){r=l.binding.getBindings();}else if(l.binding instanceof B){r=[l.binding];}$.each(p,function(I,y){var z={};z.invalidPath=true;z.path=y.path;z.mode=y.mode;z.model={name:y.model};if(r.length>I&&r[I]){var A=r[I],M=A.getModel();var F;if(M){F=M.resolve(A.getPath(),A.getContext());if(M.getProperty(F)!=null){z.invalidPath=false;}}z.absolutePath=(typeof(F)==='undefined')?'Unresolvable':F;z.isRelative=A.isRelative();z.model=t.getBindingModelInfo(A,o);}n.push(z);});m.bindings.push({name:k,type:(l.binding)?l.binding.getMetadata().getName():undefined,bindings:n});}}function s(y,M){var z={modelName:(M==='undefined')?'none (default)':M,path:y.getPath()};if(!y.getObject()==null){z.invalidPath=true;}return z;}var u=o.oBindingContexts;for(var v in u){if(u.hasOwnProperty(v)){m.contexts.push(s(u[v],v));}}var u=o.oPropagatedProperties.oBindingContexts;for(var v in u){if(u.hasOwnProperty(v)&&!o.oBindingContexts[v]){var w=s(u[v],v);var x=o;do{if(x.oBindingContexts[v]==u[v]){w.location={id:x.getId(),name:x.getMetadata().getName()};break;}}while((x=x.getParent()));m.contexts.push(w);}}return m;};d.prototype.getBindingModelInfo=function(o,i){var m={};var j=o.getModel();function k(M){for(var s in M){if(M.hasOwnProperty(s)){if(M[s]===j){return s;}}}return null;}m.name=k(i.oModels)||k(i.oPropagatedProperties.oModels);if(m.name){var l=i;do{if(l.oModels[m.name]===j){m.location={type:'control',id:l.getId(),name:l.getMetadata().getName()};break;}}while((l=l.getParent()));if(!m.location){var n=null;if(m.name==='undefined'){n=this.oCore.getModel();}else{n=this.oCore.getModel(m.name);}if(n){m.location={type:'core'};}}}m.type=j.getMetadata().getName();m.bindingMode=j.getDefaultBindingMode();m.name=(m.name==='undefined')?'none (default)':m.name;return m;};d.prototype.refreshBinding=function(I,s){var o=this.oCore.byId(I);var m=o.mBindingInfos[s];if(!o||!m){return;}var j=m.binding;if(!j){return;}if(j instanceof c){var k=j.getBindings();for(var i=0;i<k.length;i++){k[i].refresh();}}else{j.refresh();}};return d;});
