sap.ui.controller("zui5sd00e04.controller.D.D204", {

	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d204TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('d204TblPmx','menge_ikg','+',4,3);
		oCon.ui5DispatchFcode('d204TblPmx_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d204TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('d204TblPmx','menge_ikg','-',4,3);
		oCon.ui5DispatchFcode('d204TblPmx_dec');
	},
	fcodeEdt: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d204TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.getControl('d204inpOrder').setValue(oCon.getProperty('d204TblPmx','menge_ikg'));
		oCon.getControl('d204DiaEdt').open();
		oCon.ui5DispatchFcode('d204TblPmx_edt');
	},
});