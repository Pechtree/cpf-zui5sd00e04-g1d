sap.ui.controller("zui5sd00e04.E.E303", {

	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeEdt: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e303TblIng').setSelectedItem(oEvt.getSource().getParent());	
		oCon.getControl('e303inpOrder').setValue(oCon.getProperty('e303TblIng','menge_ist'));
		oCon.getControl('e303DiaEdt').open();
		oCon.ui5DispatchFcode('e303TblIng_edt');
	},
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e303TblIng').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('e303TblIng','menge_ist','+',5,3);
		oCon.ui5DispatchFcode('e303TblIng_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e303TblIng').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('e303TblIng','menge_ist','-',5,3);
		oCon.ui5DispatchFcode('e303TblIng_dec');
	},

});