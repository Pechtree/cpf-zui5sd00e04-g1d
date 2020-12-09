sap.ui.controller("zui5sd00e04.I.I001", {
	//--------------------------------------------------------------------------------	
	//fcodeInc 
	//--------------------------------------------------------------------------------
	fcodeInc: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('i001TblAuf').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('i001TblAuf','menge_ist','+',6,3);
		oCon.ui5DispatchFcode('i001TblAuf_inc');
	},
	fcodeDec: function(oEvt){
		oCTX.oData.oEvt  	= oEvt;
		oCon.getControl('i001TblAuf').setSelectedItem(oEvt.getSource().getParent());
		oCon.pressQtyTxt('i001TblAuf','menge_ist','-',6,3);
		oCon.ui5DispatchFcode('i001TblAuf_dec');
	},
	
});