sap.ui.controller("zui5sd00e04.H.H003", {
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeDel: function(oEvt){
		oCTX.oData.oEvt = oEvt;
		oCon.getControl('h003TblIng').setSelectedItem(oEvt.getSource().getParent());
		oCon.ui5DispatchFcode('h003TblIng_del');
	},

});