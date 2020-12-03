sap.ui.controller("zui5sd00e04.controller.E.E303", {

	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeEdt: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e303TblIng').setSelectedItem(oEvt.getSource().getParent());	
		oCon.ui5DispatchFcode('e303TblIng_edt');
	},
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e303TblIng').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('e303TblIng','menge_ist13_6','+',5,6);																// ++ 2018.12.14 :: Picking Order - Multiple V1.6.0
		//oCon.pressQtyTxt('e303TblIng','menge_ist','+',5,3);																// -- 2018.12.14 :: Picking Order - Multiple V1.6.0
		oCon.ui5DispatchFcode('e303TblIng_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e303TblIng').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('e303TblIng','menge_ist13_6','-',5,6);																// ++ 2018.12.14 :: Picking Order - Multiple V1.6.0
		//oCon.pressQtyTxt('e303TblIng','menge_ist','-',5,3);																// -- 2018.12.14 :: Picking Order - Multiple V1.6.0
		oCon.ui5DispatchFcode('e303TblIng_dec');
	},

});