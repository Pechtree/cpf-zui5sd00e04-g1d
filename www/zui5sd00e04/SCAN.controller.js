sap.ui.controller("zui5sd00e04.SCAN", {
	
	//--------------------------------------------------------------------------------
	//DISPATCHER
	//--------------------------------------------------------------------------------
	dispatch: function(fcode){
		
		//#3
		if(fcode=="CON"){
			oScan.CON();
		};
		if(fcode=="SND"){
			bluetoothSerial.isConnected(
				function(){oScan.SND();},
				function(){oCon.getControl("a002InpBSta2").setValue("Bluetooth not connect");}
			);
		};
		if(fcode=="SUB"){
			bluetoothSerial.isConnected(
				function(){oScan.SUB();},
				function(){oCon.getControl("a002InpBSta2").setValue("Bluetooth not connect");}
			);
		};
	},	
	//--------------------------------------------------------------------------------
	//CON
	//--------------------------------------------------------------------------------
	CON: function(){
		bluetoothSerial.connect(
			oCon.getControl("a002InpBMac2").getValue(),
			function(){oCon.getControl("a002InpBSta2").setValue("Bluetooth OK");},
			function(){oCon.getControl("a002InpBSta2").setValue("Bluetooth Error");}
		);
	},
	//--------------------------------------------------------------------------------
	//SND
	//--------------------------------------------------------------------------------
	SND: function(){
		bluetoothSerial.write(
			oCTX.oData.qr_data,
			function(){oCon.getControl("a002InpBSta2").setValue("Bluetooth send OK");},
			function(){oCon.getControl("a002InpBSta2").setValue("Bluetooth send Error");}
		);
	},
	//--------------------------------------------------------------------------------
	//SUB
	//--------------------------------------------------------------------------------
	SUB: function(){
		bluetoothSerial.subscribe('\n', 
		  function(data){oCon.getControl("a002inpBData2").setValue(data);}, 
		  function(){oCon.getControl("a002InpBSta2").setValue("Bluetooth receive Error");}
		);
	},
});	