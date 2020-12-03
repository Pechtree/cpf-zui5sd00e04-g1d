ace.define("ace/mode/latex_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;var L=function(){this.$rules={"start":[{token:"comment",regex:"%.*$"},{token:["keyword","lparen","variable.parameter","rparen","lparen","storage.type","rparen"],regex:"(\\\\(?:documentclass|usepackage|input))(?:(\\[)([^\\]]*)(\\]))?({)([^}]*)(})"},{token:["keyword","lparen","variable.parameter","rparen"],regex:"(\\\\(?:label|v?ref|cite(?:[^{]*)))(?:({)([^}]*)(}))?"},{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\begin)({)(verbatim)(})",next:"verbatim"},{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\begin)({)(lstlisting)(})",next:"lstlisting"},{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\(?:begin|end))({)([\\w*]*)(})"},{token:"storage.type",regex:/\\verb\b\*?/,next:[{token:["keyword.operator","string","keyword.operator"],regex:"(.)(.*?)(\\1|$)|",next:"start"}]},{token:"storage.type",regex:"\\\\[a-zA-Z]+"},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"},{token:"constant.character.escape",regex:"\\\\[^a-zA-Z]?"},{token:"string",regex:"\\${1,2}",next:"equation"}],"equation":[{token:"comment",regex:"%.*$"},{token:"string",regex:"\\${1,2}",next:"start"},{token:"constant.character.escape",regex:"\\\\(?:[^a-zA-Z]|[a-zA-Z]+)"},{token:"error",regex:"^\\s*$",next:"start"},{defaultToken:"string"}],"verbatim":[{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\end)({)(verbatim)(})",next:"start"},{defaultToken:"text"}],"lstlisting":[{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\end)({)(lstlisting)(})",next:"start"},{defaultToken:"text"}]};this.normalizeRules();};o.inherits(L,T);e.LatexHighlightRules=L;});ace.define("ace/mode/folding/latex",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range","ace/token_iterator"],function(r,e,m){"use strict";var o=r("../../lib/oop");var B=r("./fold_mode").FoldMode;var R=r("../../range").Range;var T=r("../../token_iterator").TokenIterator;var k={"\\subparagraph":1,"\\paragraph":2,"\\subsubsubsection":3,"\\subsubsection":4,"\\subsection":5,"\\section":6,"\\chapter":7,"\\part":8,"\\begin":9,"\\end":10};var F=e.FoldMode=function(){};o.inherits(F,B);(function(){this.foldingStartMarker=/^\s*\\(begin)|\s*\\(part|chapter|(?:sub)*(?:section|paragraph))\b|{\s*$/;this.foldingStopMarker=/^\s*\\(end)\b|^\s*}/;this.getFoldWidgetRange=function(s,f,a){var l=s.doc.getLine(a);var b=this.foldingStartMarker.exec(l);if(b){if(b[1])return this.latexBlock(s,a,b[0].length-1);if(b[2])return this.latexSection(s,a,b[0].length-1);return this.openingBracketBlock(s,"{",a,b.index);}var b=this.foldingStopMarker.exec(l);if(b){if(b[1])return this.latexBlock(s,a,b[0].length-1);return this.closingBracketBlock(s,"}",a,b.index+b[0].length);}};this.latexBlock=function(s,a,c,b){var d={"\\begin":1,"\\end":-1};var f=new T(s,a,c);var t=f.getCurrentToken();if(!t||!(t.type=="storage.type"||t.type=="constant.character.escape"))return;var v=t.value;var g=d[v];var h=function(){var t=f.stepForward();var p=t.type=="lparen"?f.stepForward().value:"";if(g===-1){f.stepBackward();if(p)f.stepBackward();}return p;};var i=[h()];var j=g===-1?f.getCurrentTokenColumn():s.getLine(a).length;var l=a;f.step=g===-1?f.stepBackward:f.stepForward;while(t=f.step()){if(!t||!(t.type=="storage.type"||t.type=="constant.character.escape"))continue;var n=d[t.value];if(!n)continue;var p=h();if(n===g)i.unshift(p);else if(i.shift()!==p||!i.length)break;}if(i.length)return;if(g==1){f.stepBackward();f.stepBackward();}if(b)return f.getCurrentTokenRange();var a=f.getCurrentTokenRow();if(g===-1)return new R(a,s.getLine(a).length,l,j);else return new R(l,j,a,f.getCurrentTokenColumn());};this.latexSection=function(s,a,c){var b=new T(s,a,c);var t=b.getCurrentToken();if(!t||t.type!="storage.type")return;var d=k[t.value]||0;var f=0;var g=a;while(t=b.stepForward()){if(t.type!=="storage.type")continue;var l=k[t.value]||0;if(l>=9){if(!f)g=b.getCurrentTokenRow()-1;f+=l==9?1:-1;if(f<0)break;}else if(l>=d)break;}if(!f)g=b.getCurrentTokenRow()-1;while(g>a&&!/\S/.test(s.getLine(g)))g--;return new R(a,s.getLine(a).length,g,s.getLine(g).length);};}).call(F.prototype);});ace.define("ace/mode/latex",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/latex_highlight_rules","ace/mode/behaviour/cstyle","ace/mode/folding/latex"],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var L=r("./latex_highlight_rules").LatexHighlightRules;var C=r("./behaviour/cstyle").CstyleBehaviour;var a=r("./folding/latex").FoldMode;var M=function(){this.HighlightRules=L;this.foldingRules=new a();this.$behaviour=new C({braces:true});};o.inherits(M,T);(function(){this.type="text";this.lineCommentStart="%";this.$id="ace/mode/latex";this.getMatching=function(s,b,c){if(b==undefined)b=s.selection.lead;if(typeof b=="object"){c=b.column;b=b.row;}var d=s.getTokenAt(b,c);if(!d)return;if(d.value=="\\begin"||d.value=="\\end"){return this.foldingRules.latexBlock(s,b,c,true);}};}).call(M.prototype);e.Mode=M;});(function(){ace.require(["ace/mode/latex"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();