sap.ui.controller("zui5sd00e04.F.F200", {
	
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- F201	
		if(fcode=='f201btnTes'){
			oCon.getControl('f201TxtWei').setText('2.5');
		};
		
		if(fcode=='f201btnWeiOk'){ //Weight OK			
			if(oCon.getControl('f201TxtCharg').getText()==''||oCon.getControl('f201TxtMatnr').getText()==''){
				oCon.popMsgbox('Please scan material & batch'); return;
			};
			oCon.ui5DispatchBackEnd("SAPEVT_F202","evt_f202","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='f201InpQrData'){ //QR Code Scanner
			var oModel = oCon.getQrData(oCon.getControl('f201InpQrData').getValue());
			oCon.getControl('f201InpQrData').setValue();
			oCon.getControl('f201TxtCharg').setText(oModel.oData.charg);
			oCon.getControl('f201TxtMatnr').setText(oModel.oData.matnr);
			oCon.getControl('f201TxtMatnrIn').setText(oModel.oData.matnr);
			oCon.getControl('f201TxtQrcodIn').setText(oModel.oData.qrcod);
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		
		if(fcode=="SAPEVT_F202"){ //Weight Confirmaiton
			return oParameters = { 
				"imatnr"  	: oCon.getControl('f201TxtMatnr').getText(),
				"icharg"    : oCon.getControl('f201TxtCharg').getText(),
				"iweight"	: oCon.getControl('f201TxtWei').getText(),
			};
		};
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){	
		
		if(fcode=='SAPEVT_F202'){ //Weight Confirmation OK
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
				oModel.oData.menge = oCon.getControl('f201TxtWei').getText();
				oModel.oData.meins = 'KG';
				oModel.oData.sets  = '';
				
				//Generate QR Data
				oCTX.oData.qr_copy = 1;
				oCTX.oData.qr_data = oCon.qrPrintData(oModel);
				oCon.qrPrint();	
				oCon.getControl('f201btnWeiOk').setVisible(false);
			};
		};
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
			
		if(fcode=='SAPEVT_F201'){ //Weight Confirmation OK
			oCon.getControl('f201btnWeiOk').setVisible(true);
			oCon.getControl('f201TxtMatnrIn').setText();
			oCon.getControl('f201TxtMatnr').setText();
			oCon.getControl('f201TxtCharg').setText();
			oCon.getControl('f201TxtWei').setText();
		};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="SAPEVT_F201")    {app.to('F201','slide');};
		
		if(fcode=='f201btnBck')		{app.to('F001','slide');};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
});