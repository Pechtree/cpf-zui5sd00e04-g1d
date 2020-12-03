sap.ui.controller("zui5sd00e04.controller.K.K102", {

	fcodeEdt: function(oEvt){
		oCTX.oData.oEvt  	= oEvt; 
		oCon.getControl('k102TblOvw').setSelectedItem(oEvt.getSource().getParent());
		oCon.ui5DispatchFcode('k102TblOvw_edt');
	},

});