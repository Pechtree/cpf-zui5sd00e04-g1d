sap.ui.controller("zui5sd00e04.controller.E.E302", {

	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeEdt: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e302TblIng').setSelectedItem(oEvt.getSource().getParent());	
		oCon.getControl('e302inpOrder').setValue(oCon.getProperty('e302TblIng','menge_ipk'));
		oCon.getControl('e302DiaEdt').open();
		oCon.ui5DispatchFcode('e302TblIng_edt');
	},
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e302TblIng').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('e302TblIng','menge_ipk','+',4,3);
		oCon.ui5DispatchFcode('e302TblIng_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e302TblIng').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('e302TblIng','menge_ipk','-',4,3);
		oCon.ui5DispatchFcode('e302TblIng_dec');
	},

});