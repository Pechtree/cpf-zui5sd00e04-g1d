sap.ui.controller("zui5sd00e04.F.F401", {

	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('f401TblOvw').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('f401TblOvw','menge_ist','+',4,3);
		oCon.ui5DispatchFcode('f401TblOvw_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('f401TblOvw').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('f401TblOvw','menge_ist','-',4,3);
		oCon.ui5DispatchFcode('f401TblOvw_dec');
	},
	fcodeEdt: function(oEvt){
		
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('f401TblOvw').setSelectedItem(oEvt.getSource().getParent());
		oCon.getControl('f401inpOrder').setValue(oCon.getProperty('f401TblOvw','menge_ist'));
		oCon.getControl('f401DiaEdt').open();
		oCon.ui5DispatchFcode('f401TblOvw_edt');
	},

});