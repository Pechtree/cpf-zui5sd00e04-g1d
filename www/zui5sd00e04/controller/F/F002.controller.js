sap.ui.controller("zui5sd00e04.controller.F.F002", {

	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeEdt: function(oEvt){	
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('f002TblOvw').setSelectedItem(oEvt.getSource().getParent());
		//oCon.getControl('f002inpOrder').setValue(oCon.getProperty('f002TblOvw','menge_ost'));							// +- 2018.10.29 :: Weight-PRMX V1.3.1
		oCon.getControl('f002inpOrder').setValue(oCon.getProperty('f002TblOvw','menge_ost13_6'));						// Change 'menge_ost' to 6 digit
		oCon.getControl('f002DiaEdt').open();
		oCon.ui5DispatchFcode('f002TblOvw_edt');
	},
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('f002TblOvw').setSelectedItem(oEvt.getSource().getParent());
		//oCon.pressQtyTxt('f002TblOvw','menge_ost','+',6,3);															// +- 2018.10.29 :: Weight-PRMX V1.3.1
		oCon.pressQtyTxt('f002TblOvw','menge_ost13_6','+',6,6);															// Change 'menge_ost' to 6 digit
		oCon.ui5DispatchFcode('f002TblOvw_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('f002TblOvw').setSelectedItem(oEvt.getSource().getParent());
		//oCon.pressQtyTxt('f002TblOvw','menge_ost','-',6,3);															// +- 2018.10.29 :: Weight-PRMX V1.3.1
		oCon.pressQtyTxt('f002TblOvw','menge_ost13_6','-',6,6);															// Change 'menge_ost' to 6 digit
		oCon.ui5DispatchFcode('f002TblOvw_dec');
	},
});