sap.ui.controller("zui5sd00e04.controller.E.E104", {
	
	/**
	* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	* This hook is the same one that SAPUI5 controls get after being rendered.
	* @memberOf zui5sd00e02.A101
	*/
	onAfterRendering: function() {	
		jQuery.sap.delayedCall(500, this, function() {
			oCon.getControl('e104InpQrData').focus();	
		});
	},
	
});