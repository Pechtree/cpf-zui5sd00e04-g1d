sap.ui.controller("zui5sd00e04.D.D402", {

	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d402TblOvw').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('d402TblOvw','menge_ist','+',6,3);
		oCon.ui5DispatchFcode('d402TblOvw_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d402TblOvw').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('d402TblOvw','menge_ist','-',6,3);
		oCon.ui5DispatchFcode('d402TblOvw_dec');
	},
	fcodeEdt: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d402TblOvw').setSelectedItem(oEvt.getSource().getParent());
		oCon.getControl('d402inpOrder').setValue(oCon.getProperty('d402TblOvw','menge_ist'));
		oCon.getControl('d402DiaEdt').open();
		oCon.ui5DispatchFcode('d402TblOvw_edt');
	},

});