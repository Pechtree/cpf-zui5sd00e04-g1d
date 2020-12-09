sap.ui.controller("zui5sd00e04.F.F101", {
	
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeEdt: function(oEvt){	
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('f101TblOvw').setSelectedItem(oEvt.getSource().getParent());
		oCon.getControl('f101inpOrder').setValue(oCon.getProperty('f101TblOvw','menge_ost'));
		oCon.getControl('f101DiaEdt').open();
		oCon.ui5DispatchFcode('f101TblOvw_edt');
	},
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('f101TblOvw').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('f101TblOvw','menge_ost','+',6,3);
		oCon.ui5DispatchFcode('f101TblOvw_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('f101TblOvw').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('f101TblOvw','menge_ost','-',6,3);
		oCon.ui5DispatchFcode('f101TblOvw_dec');
	},

});