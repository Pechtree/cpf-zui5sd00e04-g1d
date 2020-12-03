sinaDefine(['../../core/core','./Configurator'],function(c,C){"use strict";return C.derive({initAsync:function(){this.elements=[];this.cache={};var p=[];for(var i=0;i<this.configuration.length;++i){var e=this.configuration[i];p.push(this.createElementConfiguratorAsync(this.type,e,i));}return c.Promise.all(p);},isSuitable:function(o){if(o.typeContext&&o.typeContext.multiple&&c.isList(o.configuration)){return true;}},createElementConfiguratorAsync:function(t,a,i){return this.createConfiguratorAsync({type:t,configuration:a}).then(function(b){this.elements.push({configuration:a,configurator:b,id:i});}.bind(this));},getElement:function(l){var a=this.typeContext.getElementId(l);var e=this.cache[a];if(e){return e;}for(var i=0;i<this.elements.length;++i){e=this.elements[i];if(this.matchId(l,e)){this.cache[a]=e;return e;}}},matchId:function(l,e){var a=this.typeContext.getElementId(l);var b=this.typeContext.getElementId(e.configuration);var m;if(c.isObject(b)&&b.hasOwnProperty('regExp')){if(!b.regExpObj){b.regExpObj=new RegExp(b.regExp,b.regExpFlags);}m=b.regExpObj.test(a);}else{m=a===b;}return m;},createEmptyUsedElements:function(){var u=[];for(var i=0;i<this.elements.length;++i){u.push(false);}return u;},configure:function(l,a){if(!l){l=[];}a=this.createContext(a,l);var u=this.createEmptyUsedElements();var e,b,n;for(var i=0;i<l.length;++i){b=l[i];e=this.getElement(b);if(!e){continue;}var d=e.configurator.configure(b,a);if(d!==b){l[i]=d;}u[e.id]={index:i};}var f;var g=0;if(this.typeContext.createElement){for(var j=0;j<u.length;++j){var h=u[j];e=this.elements[j];if(h){f=h;continue;}var t=this.typeContext.createElement(e.configuration,a);n=e.configurator.configure(t,a);var k=(f?f.index:-1)+g+1;l.splice(k,0,n);g++;if(this.typeContext.postProcessCreatedElement){this.typeContext.postProcessCreatedElement(n,a);}}}return l;},configureAsync:function(l,a){if(!l){l=[];}a=this.createContext(a,l);var u=this.createEmptyUsedElements();var b;var n=0;var d=function(f){if(f>=l.length){return null;}var g=l[f];var h=this.getElement(g);if(!h){return d(f+1);}u[h.id]={index:f};return c.Promise.resolve().then(function(){return h.configurator.configureAsync(g,a);}).then(function(i){if(i!==g){l[f]=i;}return d(f+1);});}.bind(this);var e=function(f){if(f>=this.elements.length){return null;}var g=this.elements[f];var h=u[f];if(h){b=h;return e(f+1);}var t=this.typeContext.createElement(g.configuration,a);return c.Promise.resolve().then(function(){return g.configurator.configureAsync(t,a);}).then(function(i){var j=(b?b.index:-1)+n+1;l.splice(j,0,i);n++;if(this.typeContext.postProcessCreatedElement){this.typeContext.postProcessCreatedElement(i,a);}return e(f+1);}.bind(this));}.bind(this);return c.Promise.resolve().then(function(){return d(0);}).then(function(){if(!this.typeContext.createElement){return null;}return e(0);}.bind(this)).then(function(){return l;});}});});
