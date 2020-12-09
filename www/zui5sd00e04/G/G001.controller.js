sap.ui.controller("zui5sd00e04.G.G001", {
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('g001TblOvw').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('g001TblOvw','menge_ist','+',4,3);
		oCon.ui5DispatchFcode('g001TblOvw_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('g001TblOvw').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('g001TblOvw','menge_ist','-',4,3);
		oCon.ui5DispatchFcode('g001TblOvw_dec');
	},
	fcodeEdt: function(oEvt){
		
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('g001TblOvw').setSelectedItem(oEvt.getSource().getParent());
		oCon.getControl('g001inpOrder').setValue(oCon.getProperty('g001TblOvw','menge_ist'));
		oCon.getControl('g001DiaEdt').open();
		oCon.ui5DispatchFcode('g001TblOvw_edt');
	},
});