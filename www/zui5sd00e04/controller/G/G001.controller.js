sap.ui.controller("zui5sd00e04.controller.G.G001", {
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('g001TblOvw').setSelectedItem(oEvt.getSource().getParent());
		//oCon.pressQtyTxt('g001TblOvw','menge_ist','+',4,3);															// +- 2018.10.30 :: Finishing V1.0.1
		oCon.pressQtyTxt('g001TblOvw','menge_ist13_6','+',4,6);															// Change 'menge_ist' to 6 digit
		oCon.ui5DispatchFcode('g001TblOvw_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('g001TblOvw').setSelectedItem(oEvt.getSource().getParent());
		//oCon.pressQtyTxt('g001TblOvw','menge_ist','-',4,3);															// +- 2018.10.30 :: Finishing V1.0.1
		oCon.pressQtyTxt('g001TblOvw','menge_ist13_6','-',4,6);															// Change 'menge_ist' to 6 digit
		oCon.ui5DispatchFcode('g001TblOvw_dec');
	},
	fcodeEdt: function(oEvt){
		
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('g001TblOvw').setSelectedItem(oEvt.getSource().getParent());
		//oCon.getControl('g001inpOrder').setValue(oCon.getProperty('g001TblOvw','menge_ist'));							// +- 2018.10.30 :: Finishing V1.0.1
		oCon.getControl('g001inpOrder').setValue(oCon.getProperty('g001TblOvw','menge_ist13_6'));						// Change 'menge_ist' to 6 digit
		oCon.getControl('g001DiaEdt').open();
		oCon.ui5DispatchFcode('g001TblOvw_edt');
	},
});