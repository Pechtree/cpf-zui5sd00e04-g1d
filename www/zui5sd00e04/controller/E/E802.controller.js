sap.ui.controller("zui5sd00e04.controller.E.E802", {

	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeEdt: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e802TblIng').setSelectedItem(oEvt.getSource().getParent());	
		oCon.getControl('e802inpOrder').setValue(oCon.getProperty('e802TblIng','menge_ipk'));
		oCon.getControl('e802DiaEdt').open();
		oCon.ui5DispatchFcode('e802TblIng_edt');
	},
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e802TblIng').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('e802TblIng','menge_ipk','+',4,3);
		oCon.ui5DispatchFcode('e802TblIng_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e802TblIng').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('e802TblIng','menge_ipk','-',4,3);
		oCon.ui5DispatchFcode('e802TblIng_dec');
	},

});