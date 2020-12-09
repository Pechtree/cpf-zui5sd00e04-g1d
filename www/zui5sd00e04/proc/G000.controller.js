sap.ui.controller("zui5sd00e04.proc.G000", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//-------------------------------------------------------------------- G001		
		if(fcode=='g001btnCnf'){ //Select Premix Order
			if(!oCon.isSelected('g001TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_G002","evt_g002","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='g001btnDis'){ //List Backflush Document
			if(oCon.isSelected('g001TblOvw')){
				oCon.ui5DispatchBackEnd("SAPEVT_G005","evt_g005","{i18n>MSG_PROCESS}");
			};
		};
		
		if(fcode=='g001btnAcp'){//Edit - OK
			//oCon.getCell('g001TblOvw',4).setText(oCon.fmtDec(oCon.getControl('g001inpOrder').getValue(),3));			// +- 2018.10.30 :: Finishing V1.0.1
			oCon.getCell('g001TblOvw',4).setText(oCon.fmtDec(oCon.getControl('g001inpOrder').getValue(),6));			// Change 'g001TblOvw' to 6 digit
		};
		//-------------------------------------------------------------------- G002
		if(fcode=='g002inpQr'){
			var oModel = oCon.getQrData(oCon.getControl('g002inpQr').getValue());
			oCTX.oData.matnr = oModel.oData.matnr;
			oCTX.oData.charg = oModel.oData.charg;
			oCTX.oData.seta  = oModel.oData.seta;
			oCTX.oData.menge = oModel.oData.menge;
			oCTX.oData.meins = oModel.oData.meins;
			oCon.getControl('g002inpQr').setValue();
			oCon.ui5DispatchBackEnd("SAPEVT_G003","evt_g003","{i18n>MSG_PROCESS}");
		};
		if(fcode=='g002btnCam'){
			oCon.scanCam('g002inpQr','g002inpQr');
		};


		//-------------------------------------------------------------------- G003
		if(fcode=='g003TblBck'){ //Backflush Post - OK
			if(oCon.isSelected('g003TblBck')){
				oCon.ui5DispatchBackEnd("SAPEVT_G006","evt_g006","{i18n>MSG_PROCESS}");
			};
		};
		
		//-------------------------------------------------------------------- G005
		if(fcode=='g005btnBfk'){ //Backflush Post
			oCon.ui5DispatchBackEnd("SAPEVT_G004","evt_g004","{i18n>MSG_PROCESS}");
		};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_G001"){//List PREMIX Order
			return oParameters = { 
				"idate"   : oCon.getControl('g001inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('g001chkShiftD'),
				"iaprion" : oCon.getAbapTrue('g001chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_G002"){ //List Ingredient for Backflush
			return oParameters = { 
				"ipmxnr" 	: oCon.getProperty('g001TblOvw','pmxnr'),
				"ipospx" 	: oCon.getProperty('g001TblOvw','pospx'),
				//"imenge" 	: oCon.getProperty('g001TblOvw','menge_ist'),												// +- 2018.10.30 :: Finishing V1.0.1
				"imenge" 	: oCon.getProperty('g001TblOvw','menge_ist13_6'),											// Change sendingField from 3 digit => 6 digit
			};
		};
		
		if(fcode=="SAPEVT_G003"){ //Accept Scan Batch
			return oParameters = { 
				"ipmxnr" 	: oCTX.oData.pmxnr,
				"ipospx" 	: oCTX.oData.pospx,
				"imenge" 	: oCTX.oData.menge,
				"imatnr" 	: oCTX.oData.matnr,
				"icharg" 	: oCTX.oData.charg,
				"imeins" 	: oCTX.oData.meins,
				"iseta" 	: oCTX.oData.seta,
			};
		};
		
		if(fcode=="SAPEVT_G004"){ //Backflush Post
			return oParameters = { 
				"ipmxnr" 	: oCTX.oData.pmxnr,
				"ipospx" 	: oCTX.oData.pospx,
			};
		};
		
		if(fcode=="SAPEVT_G005"){ //List Backflush Doc
			return oParameters = { 
				"ipmxnr" 	: oCon.getProperty('g001TblOvw','pmxnr'),
				"ipospx" 	: oCon.getProperty('g001TblOvw','pospx'),
			};
		};
		
		if(fcode=="SAPEVT_G006"){ //List Backflush Ing
			return oParameters = { 
				"ipmxnr" 	: oCon.getProperty('g003TblBck','pmxnr'),
				"ipospx" 	: oCon.getProperty('g003TblBck','pospx'),
				"imblnr" 	: oCon.getProperty('g003TblBck','mblnr'),
				"imjahr" 	: oCon.getProperty('g003TblBck','mjahr'),
			};
		};
		
		if(fcode=="SAPEVT_G007"){ //List Entered batch
			return oParameters = { 
				"ipmxnr" 	: oCTX.oData.pmxnr,
				"ipospx" 	: oCTX.oData.pospx,
			};
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=='SAPEVT_G001'){ //List Premix Order
			oCon.getControl('g001TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_G002'){ //List Ingredient
			if(oModela.oData.logon.typ=='E'){
				oCTX.oData.cancel_nav = true; return;
			};
			oCTX.oData.pmxnr 	 = oCon.getProperty('g001TblOvw','pmxnr');
			oCTX.oData.pospx     = oCon.getProperty('g001TblOvw','pospx'); 
			oCTX.oData.menge_rst = oCon.getProperty('g001TblOvw','menge_rst');
			oCon.getControl('g002TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_G003'){ //Confirm found ingredient/batch
			oCon.getControl('g002TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_G004'){ //Post Backflush
			if(oModela.oData.logon.typ=='S'){
				oCon.getControl('g002TblIng').setModel(oModela);
				
				//Set Print QR Data Protocal
				var oModel = oCon.qrPrintCtx();
				oModel.oData.aufnr  = oModela.oData.head.aufnr;
				oModel.oData.mblnr  = oModela.oData.head.mblnr;
				oModel.oData.rsnum  = '';
				oModel.oData.rspos  = '';
				oModel.oData.piknr  = '';
				oModel.oData.matnr  = oModela.oData.stick.matnr;
				oModel.oData.maktx  = oModela.oData.stick.maktx;
				oModel.oData.charg  = oModela.oData.stick.charg;
				oModel.oData.licha  = oModela.oData.stick.licha;
				oModel.oData.hsdat  = oFmt.fmtDate(oModela.oData.stick.hsdat);
				oModel.oData.vfdat  = oFmt.fmtDate(oModela.oData.stick.vfdat);
				oModel.oData.lifnr  = oModela.oData.stick.lifnr;
				oModel.oData.name1  = oModela.oData.stick.name1;
				oModel.oData.menge  = oModela.oData.head.menge_fkg;
				oModel.oData.meins  = oModela.oData.head.meins;
				oModel.oData.seta   = oModela.oData.head.seta;
				oModel.oData.faktor = oModela.oData.stick.faktor;
				oModel.oData.qrcod 	= oModela.oData.stick.qrcod;	// ++ 2018.03.12
				
				//Generate QR Data
				oCTX.oData.qr_copy = 1;
				oCTX.oData.qr_data = oCon.qrPrintData(oModel);
				oCon.qrPrint();		
				
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};
		
		if(fcode=='SAPEVT_G005'){ //List Backflush Doc
			oCon.getControl('g003TblBck').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_G006'){ //List Backflush Ing
			oCon.getControl('g004TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_G007'){ //Confirm Backflush
			oCon.getControl('g005TblIng').setModel(oModela);
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		var vCnt = 0;
		
		if(fcode=='SAPEVT_G002'){ //Start Scan Container
			oCon.getFocus('g002inpQr');
		};
		
		if(fcode=='SAPEVT_G003'){ //Scan Accept
		};
		
		if(fcode=='SAPEVT_G004'&&oModela.oData.logon.typ=='S'){ //Backflush OK
			oCon.getFocus('g002inpQr');
		};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		//G001=>G002=>G005
		
		if(fcode=="SAPEVT_G001")    {app.to('G001','slide');};
		if(fcode=="SAPEVT_G002")    {app.to('G002','slide');};
		if(fcode=="SAPEVT_G004")    {app.to('G002','slide');};
		if(fcode=="SAPEVT_G005")    {app.to('G003','slide');};
		if(fcode=="SAPEVT_G006")    {app.to('G004','slide');};
		if(fcode=="SAPEVT_G007")    {app.to('G005','slide');};
		
		if(fcode=='g001btnBck')		{oCon.nav_home();};
		if(fcode=='g002btnBck')		{app.to('G001','slide');};
		if(fcode=='g003btnBck')		{app.to('G001','slide');};
		if(fcode=='g004btnBck')		{app.to('G003','slide');};
		if(fcode=='g005btnBck')		{app.to('G002','slide');};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
		if(fcode=='SAPEVT_G003'&&oModela.oData.head.bckok=='X'){//Move to backflush ready screen
			oApp.deviceManager('CON');
			oCon.ui5DispatchBackEnd("SAPEVT_G007","evt_g007","{i18n>MSG_PROCESS}");
		};
		
		if((fcode=='SAPEVT_G004')&&(oModela.oData.head.bckdone=='X')){//Backflush Done
			oApp.deviceManager('CLS');
			oCon.ui5DispatchBackEnd("SAPEVT_G001","evt_g001","{i18n>MSG_PROCESS}");
		};
		
	},
});