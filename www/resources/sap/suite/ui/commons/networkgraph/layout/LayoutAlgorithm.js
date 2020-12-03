/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/suite/ui/commons/library","sap/ui/core/Element","./Geometry"],function(l,E,G){"use strict";var L=E.extend("sap.suite.ui.commons.networkgraph.layout.LayoutAlgorithm",{metadata:{"abstract":true,publicMethods:["getType","isLayered","layout"]}});var a=50,N=0.2;var O=l.networkgraph.Orientation,S=l.networkgraph.NodeShape;L.prototype._normalizeLines=function(){var g=this.getParent(),p={},k,P,i,c,n,s,f,b,d;g.getLines().forEach(function(o){k=o.getFrom()<o.getTo()?o.getFrom()+"-"+o.getTo():o.getTo()+"-"+o.getFrom();if(!p[k]){p[k]={from:o.getFromNode(),to:o.getToNode(),lines:[]};}p[k].lines.push(o);});Object.keys(p).forEach(function(K){P=p[K];if(P.lines.length===1){P.lines[0]._normalizePath();return;}n=Math.min(P.from._getCircleSize(),P.to._getCircleSize())/2;f=2*(1-N)/(P.lines.length-1);i=-1;P.lines.forEach(function(o){i++;c={center:o.getFromNode().getCenterPosition(),apex:o.getToNode().getCenterPosition()};s=G.getNormalizedVector(c,n);s=G.getRotatedVector(s,Math.PI/2);b=((N-1)+i*f)*s.apex.x;d=((N-1)+i*f)*s.apex.y;o.setSource({x:o.getFromNode().getCenterPosition().x+b,y:o.getFromNode().getCenterPosition().y+d});o.setTarget({x:o.getToNode().getCenterPosition().x+b,y:o.getToNode().getCenterPosition().y+d});});});};L.prototype._stretchLinesToCircleNodeAxes=function(){var g=this.getParent(),h=g.getOrientation()!=O.TopBottom&&g.getOrientation()!=O.BottomTop,f,t;g.getLines().forEach(function(o){if(o._isIgnored()){return;}var s=o.getStretchToCenter();var b=function(n){return((s&&n._isCustom())||n._isCircle())&&!n._isIgnored();};f=o.getFromNode();t=o.getToNode();if(h){if(b(f)){o.getSource().setX(Math.round(f.getX()+f._iWidth/2));}if(b(t)){o.getTarget().setX(Math.round(t.getX()+t._iWidth/2));}}else{if(b(f)){o.getSource().setY(Math.round(f.getY()+f._getShapeSize(h)/2));}if(b(t)){o.getTarget().setY(Math.round(t.getY()+t._getShapeSize(h)/2));}}});};L.prototype._cutLinesAtBoxNodeBorders=function(){var g=this.getParent(),c,p,b,n,x,i;g.getLines().forEach(function(o){c=o.getCoordinates();if(o.getFromNode().getShape()===S.Box){p={x:c[0].getX(),y:c[0].getY()};b={x:c[1].getX(),y:c[1].getY()};n=this._getNodePoints(o.getFromNode());x=G.getLineRectangleIntersections({p1:p,p2:b},{p1:n[0],p2:n[1]});if(x.length>1){if(G.getPointsDistance(x[0],b)<G.getPointsDistance(x[1],b)){o.setSource(x[0]);}else{o.setSource(x[1]);}}}if(o.getToNode().getShape()===S.Box){i=c.length-1;p={x:c[i-1].getX(),y:c[i-1].getY()};b={x:c[i].getX(),y:c[i].getY()};n=this._getNodePoints(o.getToNode());x=G.getLineRectangleIntersections({p1:p,p2:b},{p1:n[0],p2:n[1]});if(x.length>1){if(G.getPointsDistance(x[0],p)<G.getPointsDistance(x[1],p)){o.setTarget(x[0]);}else{o.setTarget(x[1]);}}}}.bind(this));};L.prototype._getNodePoints=function(n){return[{x:n.getX(),y:n.getY()},{x:n.getX()+n._iWidth,y:n.getY()+n._iHeight}];};L.prototype._getNodesPoints=function(e){var p=[];e.forEach(function(o){if(o._isIgnored&&!o._isIgnored()&&(!o._isInCollapsedGroup||!o._isInCollapsedGroup())){p.push({x:o.getX(),y:o.getY()});p.push({x:o.getX()+o._iWidth,y:o.getY()+o._iHeight});}});return p;};L.prototype._getLinesPoints=function(){var g=this.getParent(),p=[];g.getLines().forEach(function(o){if(o._isIgnored()){return;}if(o.getSource()){p.push({x:o.getSource().getX(),y:o.getSource().getY()});}if(o.getTarget()){p.push({x:o.getTarget().getX(),y:o.getTarget().getY()});}o.getBends().forEach(function(b){p.push({x:b.getX(),y:b.getY()});});});return p;};L.prototype._verticalMirror=function(u){var g=this.getParent(),b=this._getGraphBoundingBox(),A=(b.p1.x+b.p2.x),f;g.getNodes().forEach(function(n){n.setX(A-(n.getX()+n._iWidth));});g.getGroups().forEach(function(o){f=u?2*o._getBorderSize():0;o.setX(A-(o.getX()+o._iWidth+f));});g.getLines().forEach(function(o){if(o._isIgnored()){return;}if(o.getSource()){o.setSource({x:A-o.getSource().getX()});}if(o.getTarget()){o.setTarget({x:A-o.getTarget().getX()});}o.getBends().forEach(function(B){B.setX(A-B.getX());});if(o._aNipples){o._aNipples.forEach(function(n){n.x=A-n.x;if(n.orientation===O.LeftRight){n.orientation=O.RightLeft;}else if(n.orientation===O.RightLeft){n.orientation=O.LeftRight;}});}});};L.prototype._horizontalMirror=function(u){var g=this.getParent(),b=this._getGraphBoundingBox(),A=(b.p1.y+b.p2.y),f;g.getNodes().forEach(function(n){n.setY(A-(n.getY()+n._iHeight));});g.getGroups().forEach(function(o){f=u?2*o._getBorderSize():0;o.setY(A-(o.getY()+o._iHeight+f));});g.getLines().forEach(function(o){if(o._isIgnored()){return;}if(o.getSource()){o.setSource({y:A-o.getSource().getY()});}if(o.getTarget()){o.setTarget({y:A-o.getTarget().getY()});}o.getBends().forEach(function(B){B.setY(A-B.getY());});if(o._aNipples){o._aNipples.forEach(function(n){n.y=A-n.y;if(n.orientation===O.TopBottom){n.orientation=O.BottomTop;}else if(n.orientation===O.BottomTop){n.orientation=O.TopBottom;}});}});};L.prototype._shiftGraph=function(x,y,s){var g=this.getParent();if(!s){g.getGroups().forEach(function(o){o.setX(o.getX()+x);o.setY(o.getY()+y);});}g.getNodes().forEach(function(n){n.setX(n.getX()+x);n.setY(n.getY()+y);n.aLines.forEach(function(o){o._shift({x:x,y:y});});});};L.prototype._getGraphBoundingBox=function(){var g=this.getParent(),p=this._getNodesPoints(g.getNodes()).concat(this._getNodesPoints(g.getGroups())).concat(this._getLinesPoints());return G.getBoundingBox(p);};L.prototype._alignCoordinatesWithView=function(){var b=this._getGraphBoundingBox(),x=a-b.p1.x,y=a-b.p1.y;this._shiftGraph(x,y);};L.prototype._hasHierarchicalGroups=function(){return this.getParent().getGroups().some(function(g){return g.getParentGroupKey();});};L.prototype.getType=function(){throw new Error("To be overridden in implementing class.");};L.prototype.isLayered=function(){throw new Error("To be overridden in implementing class.");};L.prototype.layout=function(){throw new Error("To be overridden in implementing class.");};return L;});
