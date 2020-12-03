sap.ui.controller("zui5sd00e04.controller.C.C101", {
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeEdt: function(oEvt){	
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('c101TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.ui5DispatchFcode('c101TblPmx_edt');
	},
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('c101TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('c101TblPmx','menge_ist13_6','+',6,6);																// ++ 2018.12.13 :: Premix Order V1.0.2
		//oCon.pressQtyTxt('c101TblPmx','menge_ist','+',6,3);																// -- 2018.12.13 :: Premix Order V1.0.2
		oCon.ui5DispatchFcode('c101TblPmx_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('c101TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('c101TblPmx','menge_ist13_6','-',6,6);																// ++ 2018.12.13 :: Premix Order V1.0.2
		//oCon.pressQtyTxt('c101TblPmx','menge_ist','-',6,3);																// -- 2018.12.13 :: Premix Order V1.0.2
		oCon.ui5DispatchFcode('c101TblPmx_dec');
	},
});