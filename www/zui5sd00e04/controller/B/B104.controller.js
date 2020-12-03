sap.ui.controller("zui5sd00e04.controller.B.B104", {  
	
	fcodeFmtText: function(text){	
		if (text) { 
			return '\u000A' + text;
		} return
	},
	
//	fcodeDelete: function(oEvt){	
//		oCTX.oData.oEvt  	= oEvt;
//		oCon.getControl('b104TblOvw').setSelectedItem(oEvt.getSource().getParent());
//		oCon.getControl('b104inpInd').setValue(oCon.getProperty('b104TblOvw','index'));
//		oCon.getControl('b104inpQty').setValue(oCon.getProperty('b104TblOvw','menge_ikg'));
//		oCon.ui5DispatchFcode('b104TblOvw_delete');
//	},
	
//	fcodeDelete: function(oEvt){
//		oCTX.oData.index = oEvt.getSource().getBindingContext().getProperty('index'); 
//		oCTX.oData.oEvt  = oEvt;
//		oCon.ui5DispatchFcode('b104TblOvw_delete');
//	},	

//	fcodeDelete: function(oEvt){
//		oCTX.oData.oEvt = oEvt;
//		oCon.getControl('b104TblOvw').setSelectedItem(oEvt.getSource().getParent());
//		oCon.ui5DispatchFcode('b104TblOvw_delete');
//	},

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zui5sd00e04.view.B.B104
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zui5sd00e04.view.B.B104
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zui5sd00e04.view.B.B104
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zui5sd00e04.view.B.B104
*/
//	onExit: function() {
//
//	}

});