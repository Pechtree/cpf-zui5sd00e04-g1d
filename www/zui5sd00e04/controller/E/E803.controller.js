sap.ui.controller("zui5sd00e04.controller.E.E803", {

	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	fcodeEdt: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e803TblIng').setSelectedItem(oEvt.getSource().getParent());	
		oCon.ui5DispatchFcode('e803TblIng_edt');
	},
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e803TblIng').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('e803TblIng','menge_ist13_6','+',5,6);																// ++ 2018.12.14 :: Picking Order - Dummy V1.2.0
		//oCon.pressQtyTxt('e803TblIng','menge_ist','+',5,3);																// -- 2018.12.14 :: Picking Order - Dummy V1.2.0
		oCon.ui5DispatchFcode('e803TblIng_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('e803TblIng').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('e803TblIng','menge_ist13_6','-',5,6);																// ++ 2018.12.14 :: Picking Order - Dummy V1.2.0
		//oCon.pressQtyTxt('e803TblIng','menge_ist','-',5,3);																// -- 2018.12.14 :: Picking Order - Dummy V1.2.0
		oCon.ui5DispatchFcode('e803TblIng_dec');
	},

});