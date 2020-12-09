sap.ui.controller("zui5sd00e04.F.F400", {
	
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		if(fcode=='f401btnCnf'){ //Select Premix
			if(!oCon.isSelected('f401TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_F402","evt_f402","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='f402btnEdt'){ //Edit KG/Set
			if(!oCon.isSelected('f402TblIng')){return;};
			oCon.getControl('f402txtPmxnrKG').setText('Premix Order ' + oCon.getProperty('f402TblIng','pmxnr'));
			oCon.getControl('f402inpMatnrPxKG').setValue(oCon.getProperty('f402TblIng','matnr_px') + ' ' + oCon.getProperty('f402TblIng','maktx_px'));
			oCon.getControl('f402inpMatnrInKG').setValue(oCon.getProperty('f402TblIng','matnr_in') + ' ' + oCon.getProperty('f402TblIng','maktx_in'));
			oCon.getControl('f402inpMengePkgKG').setValue(oCon.getProperty('f402TblIng','menge_pkg'));
			oCon.getControl('f402inpMengePkgKGO').setValue(oCon.getProperty('f402TblIng','menge_pkg'));
			oCon.getControl('f402DiaKG').open();
		};	
		if(fcode=='f402btnKGAcp'){
			oCon.ui5DispatchBackEnd("SAPEVT_F403","evt_f403","{i18n>MSG_PROCESS}");
			oCon.getControl('f402DiaKG').close();
		};
		
		if(fcode=='f402btnWei'){ //Start Weight
			oCon.ui5DispatchBackEnd("SAPEVT_F404","evt_f404","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='f402btnWeiNex'){ //Change Batch	
			oCon.ui5DispatchBackEnd("SAPEVT_F406","evt_f406","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='f402btnWeiOk'){ //Weight OK		
			oCon.ui5DispatchBackEnd("SAPEVT_F405","evt_f405","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=="f402InpQrData"){
			var oModel = oCon.getQrData(oCon.getControl('f402InpQrData').getValue());
			oCon.getControl('f402InpQrData').setValue();
			
			if(oModel.oData.matnr!=oCon.getControl('f402TxtWMatnr').getText()){
				oCon.popMsgbox('Material not valid'); return;
			};
			oCon.getControl('f402TxtWCharg').setText(oModel.oData.charg);
			oCon.getControl('f402TxtWQrcod').setText(oModel.oData.qrcod);
		};
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_F401"){//List Premix
			return oParameters = { 
				"idate"   	: oCon.getControl('f401inpDate').getValue(),
				"iapriod" 	: oCon.getAbapTrue('f401chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('f401chkShiftN'),
			};
		};
		
		if(fcode=='SAPEVT_F402'){ //Select Premix
			return oParameters = { 
				"ipmxnr" 	: oCon.getProperty('f401TblOvw','pmxnr'),
				"ipospx" 	: oCon.getProperty('f401TblOvw','pospx'),
				"imenge" 	: oCon.getProperty('f401TblOvw','menge_ist'),
			};
		};
		
		if(fcode=="SAPEVT_F403"){//Edit KG/Set
			return oParameters = { 
				"idate" 		: oCon.getControl('f401inpDate').getValue(),
				"iapriod" 		: oCon.getAbapTrue('f401chkShiftD'),
				"iaprion" 		: oCon.getAbapTrue('f401chkShiftN'),
				"imenge" 		: oCon.getProperty('f401TblOvw','menge_ist'),
				"ipmxnr"  		: oCon.getProperty('f402TblIng','pmxnr'),
				"ipospx"  		: oCon.getProperty('f402TblIng','pospx'),
				"ietenr"  		: oCon.getProperty('f402TblIng','etenr'),
				"imenge_pkg"  	: oCon.getControl('f402inpMengePkgKG').getValue(),
				"imenge_pkgo"  	: oCon.getControl('f402inpMengePkgKGO').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_F404"){//Start Weight
			return oParameters = { 
				"ipmxnr" 	: oCon.getProperty('f401TblOvw','pmxnr'),
				"ipospx" 	: oCon.getProperty('f401TblOvw','pospx'),
				"imenge" 	: oCon.getProperty('f401TblOvw','menge_ist'),
			};
		};
		
		if(fcode=="SAPEVT_F405"||fcode=="SAPEVT_F406"){ //Weight Confirmaiton
			return oParameters = { 
				"idate" 	: oCon.getControl('f401inpDate').getValue(),
				"iapriod" 	: oCon.getAbapTrue('f401chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('f401chkShiftN'),
				"iaufnr" 	: oCTX.oData.aufnr,
				"ipmxnr" 	: oCTX.oData.pmxnr,
				"ipospx" 	: oCTX.oData.pospx,
				"itabix"	: oCon.getControl('f402TxtTabix').getText(),
				"imatnr"  	: oCon.getControl('f402TxtWMatnr').getText(),
				"icharg"    : oCon.getControl('f402TxtWCharg').getText(),
				"iweight"	: oCon.getControl('f402TxtMengeSkgW').getText(),
				"isets"		: oCon.getControl('f402TxtWSets').getText(),
				"iwstep"	: oCon.getControl('a002InpWTole').getValue(),
				"itaretotal": oModela.oData.wei.taretotal
			};
		};	
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){	
		
		if(fcode=='SAPEVT_F401'){ //List Premix
			oCon.getControl('f401TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_F402'){ //Select Premix
			oCon.getControl('f402TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_F403'&&oModela.oData.logon.typ=='S'){ //List PREMIX Order
			oCon.getControl('f402TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_F404'&&oModela.oData.logon.typ!='E'){ //Start Weight
			oCTX.oData.aufnr = oCon.getProperty('f401TblOvw','aufnr');
			oCTX.oData.pmxnr = oCon.getProperty('f401TblOvw','pmxnr');
			oCTX.oData.pospx = oCon.getProperty('f401TblOvw','pospx');
			oApp.diaWeight_PBO2('f402',oModela,true);
			oCon.getControl('f402TxtWCharg').setText(oModela.oData.wei.charg);
			oCon.getControl('f402txtTot').setText(); //Total Weight for Tare
			oCTX.oData.wei_tare = 'q#'; //Delete TARE
			oWeight.dispatch('TAR');    //Set weight ZERO for next round
			
		};
		
		if(fcode=='SAPEVT_F405'||fcode=='SAPEVT_F406'){ //Weight Confirmation OK
			if(oModela.oData.logon.typ=='E'){
				oCTX.oData.cancel_nav = true;
			}else{
				if(oModela.oData.wei.tarecmd!=''){
					oCTX.oData.wei_tare = oModela.oData.wei.tarecmd;
					oWeight.dispatch('TAR'); //Set weight ZERO for next round
				};
				oCon.getControl('f402txtTot').setText(oModela.oData.wei.taretotal);
			};
			
			//Binding Model Screen
			oApp.diaWeight_PBO2('f402',oModela,false);
			oCon.getControl('f402TblIng').setModel(oModela);
			oCon.getControl('f402TxtWCharg').setText(oModela.oData.wei.charg);
			
			
			if(oModela.oData.head.weiok=='X'){
				oApp.deviceManager('WLS');
				oCon.getControl('f402DiaWei').close();
			};

		};
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
			
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="SAPEVT_F401"){app.to('F401','slide');};
		if(fcode=="SAPEVT_F402"){app.to('F402','slide');};
		
		if(fcode=='f401btnBck')	{app.to('F001','slide');};
		if(fcode=='f402btnBck')	{app.to('F401','slide');};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
		//Backflush OK, Print Sticker
		if(fcode=="SAPEVT_F405"&&
		   oModela.oData.head.bckdone=='X'&&
		   oModela.oData.logon.typ!='E'){
			
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
			
			//Generate QR Data
			oCTX.oData.qr_copy = 1;
			oCTX.oData.qr_data = oCon.qrPrintData(oModel);
			oCon.qrPrint();	
		};
		
		//All weight complete
//		if(fcode=="SAPEVT_F405"&&
//		   oModela.oData.head.weiok=='X'&&
//		   oModela.oData.logon.typ!='E'){
//			oApp.deviceManager('WLS');
//			oCon.getControl('f402DiaWei').close();
//		};
		
	},
});