sap.ui.controller("zui5sd00e04.F.F300", {
	
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- f301	
		if(fcode=='f301btnTes'){
			oCon.getControl('f301DiaEdt').open();
		};
		
		if(fcode=='f301btnWeiOk'){ //Weight OK
			if(oCon.getControl('f301TxtCharg').getText()==''||oCon.getControl('f301TxtMatnr').getText()==''){
				oCon.popMsgbox('Please scan material & batch'); return;
			};
			oCon.ui5DispatchBackEnd("SAPEVT_F302","evt_f302","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='f301InpQrData'){ //QR Code Scanner
			var oModel = oCon.getQrData(oCon.getControl('f301InpQrData').getValue());
			oCon.getControl('f301InpQrData').setValue();
			oCon.getControl('f301TxtCharg').setText(oModel.oData.charg);
			oCon.getControl('f301TxtMatnr').setText(oModel.oData.matnr);
			oCon.getControl('f301TxtMatnrIn').setText(oModel.oData.matnr);
			oCon.getControl('f301TxtQrcodIn').setText(oModel.oData.qrcod);
		};
		if(fcode=='f301btnCam'){
			oCon.scanCam('f301InpQrData','f301InpQrData');
		};
		if(fcode=='f301btnAcp'){
			oCon.getControl('f301DiaEdt').close();
			oCon.getControl('f301TxtWei').setText(oCon.getControl('f301inpOrder').getValue());
		};
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		
		if(fcode=="SAPEVT_F302"){ //Weight Confirmaiton
			return oParameters = { 
				"imatnr"  	: oCon.getControl('f301TxtMatnr').getText(),
				"icharg"    : oCon.getControl('f301TxtCharg').getText(),
				"iweight"	: oCon.getControl('f301TxtWei').getText(),
			};
		};
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){	
		
		if(fcode=='SAPEVT_F302'){ //Weight Confirmation OK
			if(oModela.oData.logon.typ=='E'){
				oCTX.oData.cancel_nav = true;
			}else{
				//Calculate Print Qty
				var oModel = oCon.qrPrintCtx();
			
				oModel.oData.qrcod = oModela.oData.stick.qrcod;
				oModel.oData.matnr = oModela.oData.stick.matnr;
				oModel.oData.maktx = oModela.oData.stick.maktx;
				oModel.oData.charg = oModela.oData.stick.charg;
				oModel.oData.licha = oModela.oData.stick.licha;
				oModel.oData.vfdat = oModela.oData.stick.vfdat;
				oModel.oData.hsdat = oModela.oData.stick.hsdat;
				oModel.oData.lifnr = oModela.oData.stick.lifnr;
				oModel.oData.name1 = oModela.oData.stick.name1;
				oModel.oData.menge = oCon.getControl('f301TxtWei').getText();
				oModel.oData.meins = 'KG';
				
				//Generate QR Data
				oCTX.oData.qr_copy = 1;
				oCTX.oData.qr_data = oCon.qrPrintData(oModel);
				oCon.qrPrint();	
				oCon.getControl('f301TxtWei').setText();
			};
		};
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
			
		if(fcode=='SAPEVT_F301'){ //Weight Confirmation OK
			oCon.getControl('f301btnWeiOk').setVisible(true);
			oCon.getControl('f301TxtMatnrIn').setText();
			oCon.getControl('f301TxtMatnr').setText();
			oCon.getControl('f301TxtCharg').setText();
			oCon.getControl('f301TxtWei').setText();
			oCon.getControl('f301InpQrData').setValue();
			oCon.getFocus('f301InpQrData');
		};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="SAPEVT_F301"){app.to('F301','slide');};
		
		if(fcode=='f301btnBck'){app.to('F001','slide');};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
		if(fcode=="SAPEVT_F301"){oApp.deviceManager('WON');};
		
		if(fcode=='f301btnBck'){oApp.deviceManager('WLS');};
		
	},
});