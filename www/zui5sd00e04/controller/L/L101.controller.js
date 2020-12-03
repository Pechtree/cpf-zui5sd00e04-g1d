sap.ui.controller("zui5sd00e04.controller.L.L101", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zui5sd00e04.L.L101
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zui5sd00e04.L.L101
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zui5sd00e04.L.L101
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zui5sd00e04.L.L101
*/
//	onExit: function() {
//
//	},
	
	getCol: function(style,desp,width,id,tbl,fld){
		switch(style){
		
		case '01'://Sort link Header //MatIR Number
			return new sap.m.Column({
				width:'110px',
				header: new sap.m.Link({
						 text:desp,
						 press:function(){
							 oCon.sortTable(tbl,fld);
							 oCon.ui5DispatchFcode(id)
						  },		 
				})});
			break;	
		
		case '02'://Name Header
				return new sap.m.Column({hAlign:sap.ui.core.TextAlign.Right,header: new sap.m.Label({text:desp,design:"Bold",})});
				break;
			
		}
	},
});