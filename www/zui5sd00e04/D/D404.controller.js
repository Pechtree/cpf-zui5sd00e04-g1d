sap.ui.controller("zui5sd00e04.D.D404", {

	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d404TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('d404TblPmx','menge_ikg','+',4,3);
		oCon.ui5DispatchFcode('d404TblPmx_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d404TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('d404TblPmx','menge_ikg','-',4,3);
		oCon.ui5DispatchFcode('d404TblPmx_dec');
	},
	fcodeEdt: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d404TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.getControl('d404inpOrder').setValue(oCon.getProperty('d404TblPmx','menge_ikg'));
		oCon.getControl('d404DiaEdt').open();
		oCon.ui5DispatchFcode('d404TblPmx_edt');
	},

});