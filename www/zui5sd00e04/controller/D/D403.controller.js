sap.ui.controller("zui5sd00e04.controller.D.D403", {
	
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d403TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('d403TblPmx','menge_ikg','+',4,3);
		oCon.ui5DispatchFcode('d403TblPmx_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d403TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('d403TblPmx','menge_ikg','-',4,3);
		oCon.ui5DispatchFcode('d403TblPmx_dec');
	},
	fcodeEdt: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d403TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.getControl('d403inpOrder').setValue(oCon.getProperty('d403TblPmx','menge_ikg'));
		oCon.getControl('d403DiaEdt').open();
		oCon.ui5DispatchFcode('d403TblPmx_edt');
	},

});