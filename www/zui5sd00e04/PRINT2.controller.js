sap.ui.controller("zui5sd00e04.PRINT2", {
	
	//--------------------------------------------------------------------------------
	//DISPATCHER
	//--------------------------------------------------------------------------------
	dispatch: function(fcode,iData){
		
		if(oCTX.oData.hybrid!='X'){return;};
		
		//#3
		if(fcode=="CON"){
			oPrint2.PRINTER_CON();
		};
		if(fcode=="SND"){
			oPrint2.PRINTER_SND(iData);
		};
		if(fcode=="CLS"){
			window.tlantic.plugins.socket.disconnect(
					function(){oCon.getControl("a002InpPSta").setValue("Printer close Ok");},
					function(){oCon.getControl("a002InpPSta").setValue("Printer not connect");},
					oCon.getControl('a002InpPConn').getValue()
			);
		};
		
	},
	//--------------------------------------------------------------------------------
	//PRINTER_CON
	//--------------------------------------------------------------------------------
	PRINTER_CON: function(){
		
		var vHost = oCon.getControl("a002InpPip").getValue();
		var vPort = parseInt(oCon.getControl("a002InpPPort").getValue());
		
		if(vHost==''){return;};
		
		window.tlantic.plugins.socket.connect(
			function(conid){
				oCon.getControl("a002InpPSta").setValue("Printer Connection OK "+conid);
				oCon.getControl("a002InpPConn").setValue(conid);
			},
			function(){
				oCon.getControl("a002InpPSta").setValue("Printer Connection Error");
			},
			vHost,
			vPort
		);
		
	},
	//--------------------------------------------------------------------------------
	//PRINTER_SND
	//--------------------------------------------------------------------------------
	PRINTER_SND: function(iData){
		window.tlantic.plugins.socket.send(
			function(){
				oCon.getControl("a002InpPSta").setValue("Printer Send OK ");
			},
			function(){
				oCon.getControl("a002InpPSta").setValue("Printer Send Error ");
			},
			oCon.getControl("a002InpPConn").getValue(), //connection
			iData
			//oCTX.oData.qr_data 							//data
		);
	},
	//--------------------------------------------------------------------------------
	//PRINTER_CLS
	//--------------------------------------------------------------------------------
	PRINTER_CLS: function(){
		window.tlantic.plugins.socket.disconnectAll(
			function(){
				oCon.getControl("a002InpPSta").setValue("Printer Close OK ");
				oCon.getControl("a002InpPConn").setValue();
			},
			function(){
				oCon.getControl("a002InpPSta").setValue("Printer Close Error ");
				oCon.getControl("a002InpPConn").setValue();
			}
		);
	},
	
//	//--------------------------------------------------------------------------------
//	//getQR_GRSticker
//	//--------------------------------------------------------------------------------
//	getQR_GRSticker: function(matnr,charg,meins,menge,mblnr,rsnum,rspos,aufnr,piknr,sets){
//		
//		var vMargin = oCon.getControl('a002InpPMargin').getValue();
//		var vQRSize = oCon.getControl('a002InpPQrSize').getValue();
//		
//		
//		return '^XA' +
//			   '^FO'+vMargin+',250^A0N25,20^FD Mat:'+matnr+'^FS' +
//			   '^FO'+vMargin+',280^A0N25,20^FD Exp : 30.04.2017 ^FS' +
//			   '^FO'+vMargin+',310^A0N25,20^FD Batch :'+charg+'^FS' +
//			   '^FO'+vMargin+',50^BQN,2,'+vQRSize+'^FD '+
//			   '|MAT:'+matnr+
//			   '|BAT:'+charg+
//			   '|UOM:'+meins+
//			   '|QTY:'+menge+
//			   '|AUF:'+aufnr+
//			   '|MBL:'+mblnr+
//			   '|RES:'+rsnum+
//			   '|REP:'+rspos+
//			   '|PIK:'+piknr+
//			   '|SET:'+sets+
//			   '| ^FS' +
//			   '^XZ';
//	},
	
});