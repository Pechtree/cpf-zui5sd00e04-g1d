// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/service/ServiceFactory","sap/ui/core/service/Service","sap/ui/integration/services/Navigation","sap/ui/integration/services/Data"],function(S,a,N,D){"use strict";var A;function s(i){A=i;}function g(){return A;}function b(m){return!!/^[^_].+/.test(m);}function c(o){var p,P=[];for(p in o){P.push(p);}return P;}function d(u,p,P,i){c(u).filter(b).filter(function(n){var v=u[n];p[n]=v;return typeof v==="function";}).forEach(function(F){p[F]=p[F].bind(u);if(i){f(P,p,F);}});}function e(C){var G;if(typeof C==="undefined"){return true;}if(!jQuery.isPlainObject(C)){return false;}if(!C.scopeType){return false;}G=jQuery.sap.getObject("scopeObject.getId",undefined,C);if(typeof G!=="function"){return false;}return true;}function f(p,P,l){var o=P[l];P[l]=function(){var i,m,A=g();if(!p||p.scopeObject.getId()!==A){jQuery.sap.log.warning("Call to "+l+" is not allowed","This may be caused by an app component other than the active '"+A+"' that tries to call the method","sap.ushell.Ui5ServiceFactory");return undefined;}m=new Array(arguments.length);for(i=0;i<m.length;++i){m[i]=arguments[i];}return o.apply(P,m);};}function h(p,u,i){var P={};if(i){i=typeof p==="object";}d(u,P,p,i);if(i&&p.scopeType==="component"&&p.scopeObject&&p.scopeObject.getId){s(p.scopeObject.getId());}return P;}function j(u){return new Promise(function(r,R){try{var U=sap.ushell.Container.getService(u);r(U);}catch(E){R(E);}});}function k(u,i){var U=S.extend("sap.ushell.ui5service."+u+"Factory",{createInstance:function(p){return new Promise(function(r,R){j(u).then(function(o){var l,m,n;if(o instanceof N||o instanceof D){r(o);return;}if(!e(p)){jQuery.sap.log.error("Invalid context for "+u+" service interface","The context must be empty or an object like { scopeType: ..., scopeObject: ... }","sap.ushell.Ui5ServiceFactory");R("Invalid Context for "+u+" service");return;}m=h(p,o,i);n=a.extend("sap.ushell.ui5service."+u,{getInterface:function(){return m;}});l=new n(p);r(l);},function(G){R(G);});});}});return new U();}return{createServiceFactory:k};});
