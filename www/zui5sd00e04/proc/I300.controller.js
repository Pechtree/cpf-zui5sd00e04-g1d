sap.ui.controller("zui5sd00e04.proc.I300", {
	
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	
	M01_FCD: function(fcode,oModela){

	// 	-------------------------------------------------------------------------------- I302 :: List component with actual		
		
		// 	Scan input dialog
			if(fcode=='i302TblIng'){ 
				oCon.getControl('i302inpMatnr').setValue(oCon.getProperty('i302TblIng','matnr_in'));
				oCon.getControl('i302inpMenge_rkg').setValue(oCon.getProperty('i302TblIng','menge_rkg'));
				oCon.getControl('i302inpMeins_kg').setValue(oCon.getProperty('i302TblIng','meins_kg'));
			
				oCon.getControl('i302inpMatnrTx').setValue(oCon.getFieldValue('i302TblIng',['matnr_in','maktx_in']));
				oCon.getControl('i302InpQrData').setValue();
				oCon.getControl('i302inpCharg').setValue();
				oCon.getControl('i302inpMenge').setValue();
				oCon.getControl('i302inpMeins').setValue();
				oCon.getControl('i302DiaQr').open();
				oCon.getFocus('i302InpQrData');				
			};
		
		//	Select batch
			if(fcode=='i302btnBat'){
				oCon.ui5DispatchBackEnd("SAPEVT_I308","evt_i308","{i18n>MSG_PROCESS}");
			};
		
		//	Scan QR data (auto matching component)
			if(fcode=='i302inpQr'){
				var oModel = oCon.getQrData(oCon.getControl('i302inpQr').getValue());
				oCTX.oData.matnr = oModel.oData.matnr;
				oCTX.oData.charg = oModel.oData.charg;
				oCTX.oData.seta  = oModel.oData.seta;
				oCTX.oData.menge = oModel.oData.menge;
				oCTX.oData.meins = oModel.oData.meins;
				oCTX.oData.qrcod = oModel.oData.qrcod;
				oCon.getControl('i302inpQr').setValue();
				oCon.ui5DispatchBackEnd("SAPEVT_I312","evt_i312","{i18n>MSG_PROCESS}");
			};

		// 	Scan with camera
			if(fcode=='i302btnCam'){ 
				oCon.scanCam('i302InpQrData','i302InpQrData');
			};
		
		// 	Enter QR data
			if(fcode=='i302InpQrData'){ 
				var oModel  = oCon.getQrData(oCon.getControl('i302InpQrData').getValue());

				oCon.getControl('i302InpQrData').setValue();
				if(oModel.oData.matnr!=oCon.getControl('i302inpMatnr').getValue()){
					oCon.popMsgbox('Component ' + oModel.oData.matnr + ' not valid');return;
				};
				oCon.getControl('i302inpCharg').setValue(oModel.oData.charg);
				oCon.getControl('i302inpMenge').setValue(oModel.oData.menge);
				oCon.getControl('i302inpMeins').setValue(oModel.oData.meins);
				oCon.getControl('i302inpQrcod').setValue(oModel.oData.qrcod);
				oCon.ui5DispatchBackEnd("SAPEVT_I304","evt_i304","{i18n>MSG_PROCESS}");
			};

		// 	Confirm component (Scanning field in dialog)			
			if(fcode=='i302btnQrAcp'){ 
				oCon.ui5DispatchBackEnd("SAPEVT_I304","evt_i304","{i18n>MSG_PROCESS}");
			};
		
		//	Retrieve confirmation text
			if(fcode=='i302btnCnf'){ 
				oCon.getControl('i302InpTAprio').setValue();
				oCon.getControl('i302InpTJuldat').setValue();
				oCon.ui5DispatchBackEnd("SAPEVT_I307","evt_i307","{i18n>MSG_PROCESS}");
				oCon.getControl('i302InpTDate').setValue(oCon.getDateIn());
				oCon.getControl('i302InpTTime').setValue(oCon.getTime());
				oCon.getControl('i302btnTEdit').setVisible(false)
				oCon.getControl('i302InpTCharg2').setVisible(false)
				oCon.getControl('i302InpTCharg2').setValue()
				oCon.getControl('i302DiaCnf').open();
			};
			
		//	Confirm save			
			if(fcode=='i302btnTSave'){ 
				oCon.getControl('i302DiaCnf').close();
				oCon.ui5DispatchBackEnd("SAPEVT_I306","evt_i306","{i18n>MSG_PROCESS}");
			};
		
		//	Refresh confirmation text
			if(fcode=='i302btnTRfh'){
				if (oCon.getControl('i302InpTCharg2').getValue().length > 2) {
					oCon.popMsgbox('Please fill set number with 2 digits');return;
				}
				oCon.ui5DispatchBackEnd("SAPEVT_I313","evt_i313","{i18n>MSG_PROCESS}");
			};

		//	Display actual component & batch
			if(fcode=='i302btnDis'){ 
				oCon.ui5DispatchBackEnd("SAPEVT_I305","evt_i305","{i18n>MSG_PROCESS}");
			};
		
		//	Confirm selected batch		
			if(fcode=='i302btnMSave'){
				oCon.ui5DispatchBackEnd("SAPEVT_I309","evt_i309","{i18n>MSG_PROCESS}");
			};
			
		//	Material replacement			
			if(fcode=='i302btnList'){
				oCon.ui5DispatchBackEnd("SAPEVT_I310","evt_i310","{i18n>MSG_PROCESS}");
			};
		
		//	Material replacement confirm	
			if(fcode=='i302btnRSave'){
				oCon.getControl('i302DiaRep').close();
				oCon.ui5DispatchBackEnd("SAPEVT_I311","evt_i311","{i18n>MSG_PROCESS}");
			};
			
		//	set visible 'i302InpTCharg2' when press 'i302btnTEdit'	
			if(fcode=='i302btnTEdit'){
				oCon.getControl('i302InpTCharg2').setVisible(true)
			};
			
		//	Adjust scanned quantity	
			if(fcode=='i302TblIng_adj'){
				oCon.ui5DispatchBackEnd("SAPEVT_I316","evt_i316","{i18n>MSG_PROCESS}");
				oCon.getControl('i302lblAdj').setText( 
						oCon.getProperty('i302TblIng','matnr_in') + ' ' +
						oCon.getProperty('i302TblIng','maktx_in'));
			};	
			
		//	Apply adjusted quantity 	
			if(fcode=='i302btnASave'){
				oCon.ui5DispatchBackEnd("SAPEVT_I317","evt_i317","{i18n>MSG_PROCESS}");
			};			
		
	// 	-------------------------------------------------------------------------------- I306 :: List List completed preparing set
		
		// 	Select preparing completed set
			if(fcode=='i306TblCnf'){
				if (!oCon.getProperty('i306TblCnf','cnfnr')) {
					oCon.ui5DispatchBackEnd("SAPEVT_I303","evt_i303","{i18n>MSG_PROCESS}");
				} else {
					oCon.ui5DispatchBackEnd("SAPEVT_I315","evt_i315","{i18n>MSG_PROCESS}");
				}
			};
			
	},
	
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){
		
	//	Propose component		
		if(fcode=="SAPEVT_I303"){ 
			return oParameters = {
				"isets"		: oCon.getProperty('i306TblCnf','menge_cst13_6'),
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
			    "ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
			};
		};
		
	//	Confirm component (Scanning field in dialog)
		if(fcode=='SAPEVT_I304'){
			return oParameters = { 
				"isets"		: oCon.getProperty('i306TblCnf','menge_cst13_6'),
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
				"imatnr" 	: oCon.getControl('i302inpMatnr').getValue(),
				"icharg" 	: oCon.getControl('i302inpCharg').getValue(),
				"imenge" 	: oCon.getControl('i302inpMenge').getValue(),
				"imeins" 	: oCon.getControl('i302inpMeins').getValue(),	
				"iqrcod" 	: oCon.getControl('i302inpQrcod').getValue(),
			};
		};
	
	//	Display actual component & batch	
		if(fcode=='SAPEVT_I305'){
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
			};
		};
		
	//	Save confirm		
		if(fcode=='SAPEVT_I306'){			
			return oParameters = { 
			    "isets"		: oCon.getProperty('i306TblCnf','menge_cst13_6'),	
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
				"imenge" 	: oCon.getControl('i302inpMenge').getValue(),
				"iarbpl" 	: oCon.getControl('i302InpTTumbl').getSelectedKey(),
				"icharg" 	: oCon.getControl('i302InpTCharg').getValue(),
				"iisdd" 	: oCon.getControl('i302InpTDate').getValue(),
				"iisdz" 	: oCon.getControl('i302InpTTime').getValue(),
				"iaprio" 	: oCon.getControl('i302InpTAprio').getValue(),
				"ijuldat" 	: oCon.getControl('i302InpTJuldat').getValue(),
				"imatnr" 	: oCon.getControl('i302inpWIP').getValue(),
				"icnfnr" 	: oCon.getProperty('i306TblCnf','cnfnr'),
				"iltxa1" 	: oCon.getControl('i302InpTCharg').getValue()													// ++ 2018.12.12 :: Input Confirm - COOK V1.0.1
			};
		};
		
	//	Retrieve confirmation text
		if(fcode=='SAPEVT_I307'||fcode=='SAPEVT_I313'){
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"iaprio" 	: oCon.getControl('i302InpTAprio').getValue(),
				"ijuldat" 	: oCon.getControl('i302InpTJuldat').getValue(),
				"imatnr" 	: oCon.getControl('i302inpWIP').getValue(),	
				"itext" 	: oCon.getControl('i302InpTCharg2').getValue(),
				"icnfnr" 	: oCon.getProperty('i306TblCnf','cnfnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr')
			};
		};
		
	//	List batch		
		if(fcode=='SAPEVT_I308'){
			return oParameters = { 
				"imatnr" 	: oCon.getControl('i302inpMatnr').getValue(),
				"imenge" 	: oCon.getControl('i302inpMenge_rkg').getValue(),
				"imeins" 	: oCon.getControl('i302inpMeins_kg').getValue(),
			};
		};
	
	//	Confirm choose batch
		if(fcode=='SAPEVT_I309'){
			return oParameters = { 
			    "isets"		: oCon.getProperty('i306TblCnf','menge_cst13_6'),
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
				"imatnr" 	: oCon.getControl('i302inpMatnr').getValue(),
				"matnr_in" 	: oCon.arrListItems('i302TblMeat','matnr_in'),
				"charg" 	: oCon.arrListItems('i302TblMeat','charg'),
				"menge_ikg" : oCon.arrListItems('i302TblMeat','menge_ikg'),
				"meins_kg" 	: oCon.arrListItems('i302TblMeat','meins_kg'),
			};
		};
		
	//	Material replacement	
		if(fcode=='SAPEVT_I310'){
			return oParameters = { 
				"imatnr" 	: oCon.getControl('i302inpMatnr').getValue(),
				"imenge" 	: oCon.getControl('i302inpMenge_rkg').getValue(),
				"imeins" 	: oCon.getControl('i302inpMeins_kg').getValue(),
			};
		};
	
	//	Material replacement confirm
		if(fcode=='SAPEVT_I311'){
			return oParameters = { 
			    "isets"		: oCon.getProperty('i306TblCnf','menge_cst13_6'),
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
				"imatnr" 	: oCon.getControl('i302inpMatnr').getValue(),
				"matnr_in" 	: oCon.arrListItems('i302TblRep','matnr_in'),
				"charg" 	: oCon.arrListItems('i302TblRep','charg'),
				"menge_ikg" : oCon.arrListItems('i302TblRep','menge_ikg'),
				"meins_kg" 	: oCon.arrListItems('i302TblRep','meins_kg'),
			};
		};
	
	//	Scan QR Data (auto matching component)
		if(fcode=='SAPEVT_I312'){
			return oParameters = { 
				"isets"		: oCTX.oData.seta,
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
				"imatnr" 	: oCTX.oData.matnr,
				"icharg" 	: oCTX.oData.charg,
				"imenge" 	: oCTX.oData.menge,
				"imeins" 	: oCTX.oData.meins,
				"iqrcod" 	: oCTX.oData.qrcod,
			};
		};
		
	//	List completed preparing set
		if(fcode=='SAPEVT_I314'){
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),											
			};
		};
		
	//	List component with actual
		if(fcode=='SAPEVT_I315'){
			return oParameters = { 
				"icnfnr" 	: oCon.getProperty('i306TblCnf','cnfnr'),									
			};
		};
		
	//	Adjust scanned quantity
		if(fcode=='SAPEVT_I316'){
			return oParameters = { 
				"imatnr" 	: oCon.getProperty('i302TblIng','matnr_in'),									
			};
		};
			
	//	Apply adjusted quantity 
		if(fcode=='SAPEVT_I317'){
			return oParameters = { 
				"imatnr" 		: oCon.getProperty('i302TblIng','matnr_in'),
				"index" 		: oCon.arrListItems('i302TblAdj','index'),
				"menge_ckg"		: oCon.arrListItems('i302TblAdj','menge_ckg'),
			};
		};	

		
	},
	
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){

	//	List propose component
		if(fcode=='SAPEVT_I303'){
			oCon.getControl('i302TblIng').setModel(oModela);
			oCon.getControl('i302TblIng').setHeaderText(
				oCon.getFieldValue('i001TblAuf',['matnr_fg','maktx_fg'])
			);
		};
		
	//	Confirm component (Scanning field in dialog)	
		if(fcode=='SAPEVT_I304'){
			if (oModela.oData.logon.typ!='E') {
				oCon.getControl('i302TblIng').setModel(oModela);
			} else {
				oCon.getControl('i302inpCharg').setValue();
				oCon.getControl('i302inpMenge').setValue();
				oCon.getControl('i302inpMeins').setValue();
				oCon.getControl('i302inpQrcod').setValue();
			}
		};
	
	//	List actual component & batch	
		if(fcode=='SAPEVT_I305'){ 
			oCon.getControl('i303TblBat').setModel(oModela);
			oCon.getControl('i303TblBat').setHeaderText(oCon.getFieldValue('i001TblAuf',['matnr_fg','maktx_fg']));
		};

	//	Save Confirm
		if(fcode=='SAPEVT_I306'){
			if(oModela.oData.logon.typ=='S'){
				oCon.popMsgbox(oModela.oData.logon.msg);
				oCon.getControl('i001TblAuf').setModel(oModela);
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};

	//	Retrieve confirmation text		
		if(fcode=='SAPEVT_I307'){
			oCon.getControl('i302InpTTumbl').setModel(oModela);
			
			// Set Start date & Start time as current date & time of selected confirmation
			if (oModela.oData.head.isdd != "00000000" && oModela.oData.head.isdz != "000000") {
				oCon.getControl('i302InpTDate').setValue(oModela.oData.head.isdd);
				oCon.getControl('i302InpTTime').setValue(oModela.oData.head.isdz);
			};
			
		};
		
	//	List batch		
		if(fcode=='SAPEVT_I308'){
			oCon.getControl('i302TblMeat').setModel(oModela);
		};
		
	//	Confirm choose batch
		if(fcode=='SAPEVT_I309'&&oModela.oData.logon.typ!='E'){ 
			oCon.getControl('i302TblIng').setModel(oModela);
		};

	//	Material replacement
		if(fcode=='SAPEVT_I310'&&oModela.oData.logon.typ!='E'){
			oCon.getControl('i302TblRep').setModel(oModela);
			oCon.getControl('i302DiaRep').open();
		};

	//	Material replacement confirm		
		if(fcode=='SAPEVT_I311'&&oModela.oData.logon.typ!='E'){ 
			oCon.getControl('i302TblIng').setModel(oModela);
		};
		
	//	Scan QR data (auto matching component)
		if(fcode=='SAPEVT_I312'&&oModela.oData.logon.typ!='E'){
			oCon.getControl('i302TblIng').setModel(oModela);
		};
		
	//	Refresh confirmation text		
		if(fcode=='SAPEVT_I313'){
			oCon.getControl('i302InpTCharg').setModel(oModela);
		};
		
	//	List completed preparing set
		if(fcode=='SAPEVT_I314'){
			oCon.getControl('i306TblCnf').setModel(oModela); 
			oCon.getControl('i306TblCnf').setHeaderText(oCon.getFieldValue('i001TblAuf',['matnr_fg','maktx_fg']));
		};
		
	//	List component with actual
		if(fcode=='SAPEVT_I315'){
			oCon.getControl('i302TblIng').setHeaderText(
					oCon.getFieldValue('i001TblAuf',['matnr_fg','maktx_fg'])
				);
			oCon.getControl('i302TblIng').setModel(oModela); 
		};
		
	//	Adjust scanned quantity
		if(fcode=='SAPEVT_I316'){
			oCon.getControl('i302TblAdj').setModel(oModela); 
		};
		
	//	Adjust scanned quantity
		if(fcode=='SAPEVT_I317'){
			oCon.getControl('i302TblIng').setModel(oModela); 
		};
		
	},
	
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	
	M04_DYN: function(fcode,oModela){
		
	//	Focus QR Field		
		if(fcode=='SAPEVT_I303'){
			oCon.getFocus('i302inpQr');															
		};
		
	//	List batch
		if(fcode=='SAPEVT_I308'&&oModela.oData.logon.typ!='E'){
			oCon.getControl('i302lblMengeRkg').setText('Req Qty: '+ 
													   oCon.getControl('i302inpMenge_rkg').getValue() + ' ' +
													   oCon.getControl('i302inpMeins_kg').getValue());
			oCon.getControl('i302DiaQr').close();
			oCon.getControl('i302DiaMeat').open();
		};
		
	//	Confirm choose batch		
		if(fcode=='SAPEVT_I309'&&oModela.oData.logon.typ!='E'){
			oCon.getControl('i302DiaMeat').close();
		};
		
	//	Confirm component (Scanning field in dialog)		
		if(fcode=='SAPEVT_I304'&&oModela.oData.logon.typ!='E'){
			oCon.getControl('i302inpCharg').setValue();
			oCon.getControl('i302inpMenge').setValue();
			oCon.getControl('i302inpMeins').setValue();
		};
		
	// Set visible of i002btnTEdit		
		if(fcode=='SAPEVT_I307'){ 
			oCon.getControl('i302btnTEdit').setVisible(false);
			oCon.getControl('i302btnTRfh').setVisible(false);
			oCon.getControl('i302InpTTumbl').setEnabled(false);
			oCon.getControl('i302InpTJuldat').setEditable(false);
			oCon.getControl('i302InpTAprio').setEditable(false);		
			oCon.getControl('i302InpTJuldat').setValue(oCon.getProperty('i306TblCnf','juldat'));				
			oCon.getControl('i302InpTCharg').setValue(oCon.getProperty('i306TblCnf','ltxa1'));									// ++ 2018.12.07 :: Input Confirm- COOK V1.0.1
			//oCon.getControl('i302InpTCharg').setValue(oCon.getProperty('i306TblCnf','charg'));								// -- 2018.12.07 :: Input Confirm- COOK V1.0.1
			oCon.getControl('i302InpTAprio').setValue(oCon.getProperty('i001TblAuf','aprio'));		
		};
		
	//	List completed preparing set (Sort by CHARG)
		if(fcode=='SAPEVT_I314'){
			oCon.sortTable('i306TblCnf','ltxa1')																				// ++ 2018.12.07 :: Input Confirm- COOK V1.0.1
			//oCon.sortTable('i306TblCnf','charg')																				// -- 2018.12.07 :: Input Confirm- COOK V1.0.1
		};	
			
	//	Adjust scanned quantity	
		if(fcode=='SAPEVT_I316'){
			oCon.getControl('i302DiaAdj').open();
		};	
		
	//	Adjust scanned quantity	
		if(fcode=='SAPEVT_I317'){
			oCon.getControl('i302DiaAdj').close();
		};			
		
	},
	
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	
	M05_NAV: function(fcode,oModela){

		if(fcode=="SAPEVT_I303")    {app.to('I302','slide');};	
		if(fcode=="SAPEVT_I305")    {app.to('I303','slide');};
		if(fcode=="SAPEVT_I306")    {app.to('I001','slide');};		
		if(fcode=="SAPEVT_I315")    {app.to('I302','slide');};
		if(fcode=="SAPEVT_I314")    {app.to('I306','slide');};

		if(fcode=='i302btnBck')		{app.to('I306','slide');};
		if(fcode=='i303btnBck')		{app.to('I302','slide');};
		if(fcode=='i306btnBck')		{app.to('I005','slide');};
		
	},
	
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	
	M06_NEX: function(fcode,oModela){
		
	},
});