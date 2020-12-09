sap.ui.controller("zui5sd00e04.C.C101", {
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeEdt: function(oEvt){	
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('c101TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.getControl('c101inpOrder').setValue(oCon.getProperty('c101TblPmx','menge_ist'));
		oCon.getControl('c101DiaEdt').open();
		oCon.ui5DispatchFcode('c101TblPmx_edt');
	},
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('c101TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('c101TblPmx','menge_ist','+',6,3);
		oCon.ui5DispatchFcode('c101TblPmx_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('c101TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('c101TblPmx','menge_ist','-',6,3);
		oCon.ui5DispatchFcode('c101TblPmx_dec');
	},
});