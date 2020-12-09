sap.ui.controller("zui5sd00e04.controller.D.D202", {
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d202TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('d202TblPmx','menge_ikg13_6','+',6,6);																// ++ 2018.12.13 :: TFR-PROD V1.2.1 
		//oCon.pressQtyTxt('d202TblPmx','menge_ikg','+',6,3);																// -- 2018.12.13 :: TFR-PROD V1.2.1
		oCon.ui5DispatchFcode('d202TblPmx_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d202TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('d202TblPmx','menge_ikg13_6','-',6,6);																// ++ 2018.12.13 :: TFR-PROD V1.2.1 
		//oCon.pressQtyTxt('d202TblPmx','menge_ikg','-',6,3);																// -- 2018.12.13 :: TFR-PROD V1.2.1
		oCon.ui5DispatchFcode('d202TblPmx_dec');
	},
	fcodeEdt: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('d202TblPmx').setSelectedItem(oEvt.getSource().getParent());
		oCon.ui5DispatchFcode('d202TblPmx_edt');
	},
});