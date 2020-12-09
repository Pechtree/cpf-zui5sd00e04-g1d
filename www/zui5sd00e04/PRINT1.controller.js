sap.ui.controller("zui5sd00e04.PRINT1", {
	
	//--------------------------------------------------------------------------------
	//DISPATCHER
	//--------------------------------------------------------------------------------
	dispatch: function(fcode,iData){
		
		if(oCTX.oData.hybrid!='X'){return;};
		if(oCTX.oData.bth_on!='X'){return;};
		
		//#3
		if(fcode=="CON"){
			oPrint1.PRINTER_CON();
		};
		if(fcode=="SND"){
			bluetoothSerial.isConnected(
				function(){oPrint1.PRINTER_SND(iData);},
				function(){oPrint1.PRINTER_CON();}
				//function(){oCon.getControl("a002InpBSta").setValue("Bluetooth not connect");}
			);
		};
		
		if(fcode=='CLS'){
			bluetoothSerial.disconnect(
				function(){oCon.getControl("a002InpBSta").setValue("Bluetooth disconnect OK");},
				function(){oCon.getControl("a002InpBSta").setValue("Bluetooth disconnect fail");}
			);
		};
	},	
	//--------------------------------------------------------------------------------
	//PRINTER_CON
	//--------------------------------------------------------------------------------
	PRINTER_CON: function(){
		bluetoothSerial.connect(
			oCon.getControl("a002InpBMac").getValue(),
			function(){oCon.getControl("a002InpBSta").setValue("Bluetooth OK");},
			function(){oCon.getControl("a002InpBSta").setValue("Bluetooth Error");}
		);
	},
	//--------------------------------------------------------------------------------
	//PRINTER_SND
	//--------------------------------------------------------------------------------
	PRINTER_SND: function(iData){
		bluetoothSerial.write(
			//oCon.getControl("a002inpBData").getValue(), 
			iData,
			function(){oCon.getControl("a002InpBSta").setValue("Bluetooth send OK");},
			function(){oCon.getControl("a002InpBSta").setValue("Bluetooth send Error");}
		);
	},
	
	
});	