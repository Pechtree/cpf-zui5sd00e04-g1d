sap.ui.controller("zui5sd00e04.controller.D.D402", {

	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d402TblOvw').setSelectedItem(oEvt.getSource().getParent());
		//oCon.pressQtyTxt('d402TblOvw','menge_ist','+',6,3);																// +- 2018.10.29 :: TFR-PRMX V1.2.1
		oCon.pressQtyTxt('d402TblOvw','menge_ist13_6','+',6,6);																// Change 'menge_ist' to 6 digit
		oCon.ui5DispatchFcode('d402TblOvw_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d402TblOvw').setSelectedItem(oEvt.getSource().getParent());
		//oCon.pressQtyTxt('d402TblOvw','menge_ist','-',6,3);																// +- 2018.10.29 :: TFR-PRMX V1.2.1
		oCon.pressQtyTxt('d402TblOvw','menge_ist13_6','-',6,6);																// Change 'menge_ist' to 6 digit
		oCon.ui5DispatchFcode('d402TblOvw_dec');
	},
	fcodeEdt: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d402TblOvw').setSelectedItem(oEvt.getSource().getParent());
		//oCon.getControl('d402inpOrder').setValue(oCon.getProperty('d402TblOvw','menge_ist'));								// +- 2018.10.29 :: TFR-PRMX V1.2.1
		oCon.getControl('d402inpOrder').setValue(oCon.getProperty('d402TblOvw','menge_ist13_6'));							// Change 'menge_ist' to 6 digit
		oCon.getControl('d402DiaEdt').open();
		oCon.ui5DispatchFcode('d402TblOvw_edt');
	},

});