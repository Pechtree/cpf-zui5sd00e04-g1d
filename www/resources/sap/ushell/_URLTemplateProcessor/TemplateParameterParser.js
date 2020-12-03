// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils/clone","sap/ushell/_URLTemplateProcessor/Functions"],function(c,f){"use strict";function p(D,E){var s=m();var u=s.exec(E);if(u===null){throw new Error("Cannot parse expression: '"+E+"'");}var S=r(E);if(S.indexOf("*")===0){return a(D,S);}var A="^("+f.getPossibleFunctionsRegExpString()+")[^a-z]";var v=new RegExp(A);if(v.exec(S)){return i(D,S);}return e(D,S);}function a(D,P){var s=j(D,P,"|");var w=s.shift();return{type:"pipe",value:[{type:"wildcard",value:w}].concat(s.map(i.bind(null,D)))};}function b(R){var s=R.substr(1);var N;if(s.indexOf(":")>=0){var u=s.split(":");N=u[0];s=u[1];}var v={type:"reference",value:s};if(N){v.namespace=N;}return v;}function d(D,P){var s=P.split("/");var u="relative";if(s[0]===""){u="absolute";s.shift();}if(s[0]==="."){s.shift();}return{type:"path",pathType:u,value:s.map(g.bind(null,D))};}function e(D,L){if(L.charAt(0)==="{"&&L.charAt(L.length-1)==="}"){return e(D,r(L));}if(L.indexOf(".")===0||L.indexOf("/")===0){return d(D,L);}if(L.charAt(0)==="'"&&L.charAt(L.length-1)==="'"){return h(r(L));}if(L.charAt(0)==="&"){return b(L);}return{type:"reference",value:L,namespace:D};}function g(D,P){if(P.charAt(0)==="{"&&P.charAt(P.length-1)==="}"){return e(D,r(P));}return{type:"literal",value:P};}function h(L){return{type:"literal",value:L};}function i(D,F){var u=F.split(/[(\s]/)[0];var R=o(F,u);R=R.replace(/^\s+/,"");var v="";if(R.charAt(0)==="("){var w=R.search(/([)]\s)|([)]$)/);if(w===-1){throw new Error("Cannot find termination of function '"+R+"' in '"+F+"'");}v=R.substr(1,w-1);R=o(R,"("+v+")");R=R.replace(/^\s+/,"");}var x=R;return{type:"function",name:u,args:j(D,v,",").map(function(s){return s.charAt(0)==="{"?r(s):"'"+s+"'";}).map(e.bind(null,D)),params:j(D,x,",").map(e.bind(null,D))};}function j(D,L,s){if(!L){return[];}var S=L.split(s).reduce(function(A,N,I){if(I===0){A.push(N);return A;}var u=A.length-1;var P=A[u];var M=P.length>0&&P.charAt(P.length-1)==="\\";var v="";if(M){v=A.pop();v=v.substr(0,v.length-1)+s;}A.push(v+N);return A;},[]);return S;}function k(D,P){var s=P;var R=null;if(Object.prototype.toString.apply(P)==="[object Object]"){s=P.value;R=P.renameTo;}var I=q(s);if(I){return{type:"literal",value:s};}var T="expression";var u=p(D,s);var v={type:T,value:u};if(R){u.renameTo=R;}return v;}function l(s){var E=s.indexOf("{")===0;var u=m();var G=u.exec(s);if(!G){if(E){throw new Error("Expression was expected. But "+s+" does not look like a valid expression");}return null;}return G[1];}function m(){var O="[a-zA-Z0-9]+?:";var v="((&("+O+")?)?[.a-zA-Z0-9_-]+?)";var Q="('(.*?)')";var u="([^' ]*?)";var V="{("+v+")}";var P="("+"[.]?([/]("+v+"|"+V+"))+"+")";var L="("+P+"|"+Q+"|"+v+"|"+V+")";var s="("+L+"(,"+L+")*)";var F="("+u+"|"+V+")";var w="("+F+"(,"+F+")*)";var x="("+"[(]"+w+"[)]"+")?";var A=f.getPossibleFunctionsRegExpString();var y="("+"("+A+")"+"("+x+")"+")";var W="([*]([|]"+y+")*)";var E="^{("+W+"|"+"(("+y+")([ ]("+s+"))?)"+"|"+"("+L+")"+")}$";var z=new RegExp(E);return z;}function n(s){return l(s)!==null;}function r(s){var C=s.split("");C.shift();C.pop();return C.join("");}function o(T,P){if(T.indexOf(P)===0){return T.substr(P.length);}throw new Error("Given string does not start with prefix '"+P+"'");}function q(s){return typeof s==="string"&&!n(s);}function t(P,D){return Object.keys(P).reduce(function(s,N){var v=P[N];s[N]=k(D,v);return s;},{});}return{parseTemplateParameterSet:t,parsePath:d,_isExpression:n,_parseList:j,_parseParameterValue:k};},false);
