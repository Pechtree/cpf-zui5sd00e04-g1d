// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui2/srvc/factory","sap/ui2/srvc/page"],function(f,p){"use strict";function P(a,c){this.getFactory=function(){return a.getFactory();};this.getPage=function(s){return a.getFactory().createPage(s);};this.getPageSet=function(i){var d=new jQuery.Deferred();a.getFactory().createPageSet(i,d.resolve.bind(d),d.reject.bind(d));return d.promise();};}P.hasNoAdapter=false;return P;},true);