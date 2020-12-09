sap.ui.controller("zui5sd00e04.controller.I.I302", {

	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeAdj: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('i302TblIng').setSelectedItem(oEvt.getSource().getParent());
		oCon.ui5DispatchFcode('i302TblIng_adj');
	},
	
});