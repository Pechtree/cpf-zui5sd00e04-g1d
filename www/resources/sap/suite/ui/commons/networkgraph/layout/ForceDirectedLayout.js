/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/suite/ui/commons/library","./LayoutAlgorithm","./Geometry","./LayoutTask","sap/ui/performance/Measurement"],function(l,L,G,a,M){"use strict";var F=L.extend("sap.suite.ui.commons.networkgraph.layout.ForceDirectedLayout",{metadata:{properties:{optimalDistanceConstant:{type:"float",defaultValue:0.2},maxIterations:{type:"int",defaultValue:200},maxTime:{type:"int",defaultValue:2000},initialTemperature:{type:"float",defaultValue:200},coolDownStep:{type:"float",defaultValue:1},staticNodes:{type:"string[]",defaultValue:[]}}}});var b=l.networkgraph.LayoutRenderType,S=200,c=2.39996322972865332;F.prototype.getLayoutRenderType=function(){return b.Forces;};F.prototype.isLayered=function(){return false;};F.prototype.layout=function(){return new a(function(r,R,o){var g=this.getParent();if(!g){R("The algorithm must be associated with a graph.");return;}this.oGraph=g;M.start("NetworkGraph - ForcedDirectedLayout","Layouting of a graph "+g.getId());this._initPhyllotaxisPattern();this._runSimulation();this._normalizeLines();this._alignCoordinatesWithView();r();}.bind(this));};F.prototype._initPhyllotaxisPattern=function(){var s=S*Math.sqrt(this.oGraph.getNodes().length),A=0,v={center:{x:0,y:0},apex:{x:0,y:0}};this.aCenters=[];this.oGraph.getNodes().forEach(function(n,i){if(this.getStaticNodes().indexOf(n.getKey())>-1){n.center={x:n.getCenterPosition().x,y:n.getCenterPosition().y};}else{v.apex.x=Math.sqrt(i+1)*S;v.apex.y=0;A+=c;v=G.getRotatedVector(v,A);n.center={x:v.apex.x+s,y:v.apex.y+s};}this.aCenters.push(n.center);}.bind(this));};F.prototype._runSimulation=function(){var m=this.getMaxIterations(),t=this.getInitialTemperature(),C=this.getCoolDownStep(),T=(this.getMaxTime()>0)?(this.getMaxTime()+Date.now()):0,i=0,d,D,f,o,e,x,y;var B=G.getBoundingBox(this.aCenters),A=(B.p2.x-B.p1.x)*(B.p2.y-B.p1.y),O=this.getOptimalDistanceConstant()*Math.sqrt(A/this.oGraph.getNodes().length);var g=function(p){return Math.sqrt(p.x*p.x+p.y*p.y);},h=function(D){return(D*D)/O;},r=function(D){return(O*O)/(D);};while(t>0&&i<m&&(T===0||Date.now()<T)){this.oGraph.getNodes().forEach(function(n){n.disp={x:0,y:0};});this.oGraph.getNodes().forEach(function(n){this.oGraph.getNodes().forEach(function(j){if(n.getKey()===j.getKey()){return;}d=G.getPointDif(n.center,j.center);D=Math.max(1,g(d)-(n._getCircleSize()/2+j._getCircleSize()/2));n.disp.x+=(d.x/D)*r(D);n.disp.y+=(d.y/D)*r(D);});}.bind(this));this.oGraph.getLines().forEach(function(j){o=j.getFromNode();e=j.getToNode();if(o.getKey()===e.getKey()){return;}d=G.getPointDif(o.center,e.center);D=g(d);x=(d.x/D)*h(D);y=(d.y/D)*h(D);o.disp.x-=x;o.disp.y-=y;e.disp.x+=x;e.disp.y+=y;});this.oGraph.getNodes().forEach(function(n){if(this.getStaticNodes().indexOf(n.getKey())>-1){return;}D=g(n.disp);f=Math.min(D,t)/D;n.center.x+=n.disp.x*f;n.center.y+=n.disp.y*f;}.bind(this));t-=C;i++;}this.oGraph.getNodes().forEach(function(n){n.setX(n.center.x-n._iWidth/2);n.setY(n.center.y-n._iHeight/2);});};F.prototype.destroy=function(){this.aCenters=null;this.oGraph=null;L.prototype.destroy.apply(this);};return F;});
