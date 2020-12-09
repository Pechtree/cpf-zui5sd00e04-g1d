sap.ui.controller("zui5sd00e04.proc.E400", {
	
//	--------------------------------------------------------------------------------	
//	PAI FCODE 
//	--------------------------------------------------------------------------------
	
	M01_FCD: function(fcode,oModela){
	
	//	----------------------------------------------------------- E401 :: List Picking Order
		if(fcode=='e401TblOvw'){ 
			if(!oCon.isSelected('e401TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_E402","evt_e402","{i18n>MSG_PROCESS}");
			oCon.ui5DispatchBackEnd("SAPEVT_E409","evt_e409","{i18n>MSG_PROCESS}");	// ++ 2018.02.13 : Picking Dummy V1.3
		};
		
	//	----------------------------------------------------------- E402 :: List Picking Order Items
		if(fcode=='e402btnDis'){ // Display actual
			if(!oCon.isSelected('e402TblOvw')){return;}; 
			oCon.ui5DispatchBackEnd("SAPEVT_E406","evt_e406","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='e402btnAcp'){ 
			if(!oCon.isSelected('e402TblOvw')){return;};
			oCon.getControl('k006inpPospk').setValue(oCon.getProperty('e402TblOvw','pospk'));
			oCon.ui5DispatchBackEnd("SAPEVT_E403","evt_e403","{i18n>MSG_PROCESS}");
		};	
		
		if(fcode=='e402btnBck'){
			oCon.ui5DispatchBackEnd("SAPEVT_E407","evt_e407","{i18n>MSG_PROCESS}");
		};	
		
		if(fcode=='e402btnSav_ok'){
			app.to('E401','slide');
			oCon.ui5DispatchBackEnd("SAPEVT_E408","evt_e408","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='e402btnRef'){	// Refresh Batch ++ 2018.02.13 : Picking Dummy V1.3
			oCon.ui5DispatchBackEnd("SAPEVT_E409","evt_e409","{i18n>MSG_PROCESS}");
		};	
		
	//	----------------------------------------------------------- E403 :: List Transfer Order
		if(fcode=='e403TblOvw'){
			if(!oCon.isSelected('e403TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_E404","evt_e404","{i18n>MSG_PROCESS}");
		};
		
	//	----------------------------------------------------------- E404 :: Scan Pick
		
		if(fcode=='e404btnAcp'){
			oCon.getControl('k006inpCheck').setValue();
			oCon.ui5DispatchBackEnd("SAPEVT_E405","evt_e405","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=="e404BtnStk")	{
			oCon.scanCam('e404InpQrData','e404InpQrData');
		};
		
		if(fcode=='e404InpQrData'){//Scan Sticker
			var oModel  = oCon.getQrData(oCon.getControl('e404InpQrData').getValue());
			
			oCTX.oData.charg = oModel.oData.charg;
			oCTX.oData.menge = oModel.oData.menge;
			oCTX.oData.meins  = oModel.oData.meins;
			oCTX.oData.qrcod  = oModel.oData.qrcod;
			
			// Validate actual batch :: 2018.07.07 :: START 

				if(oModel.oData.matnr!=oCon.getControl('e404InpMatnr').getValue()){
					oCon.popMsgbox('Material not valid'); return;
				}; 
				
				if(oCTX.oData.charg!=oCon.getControl('e404InpCharg1').getValue()&&oCTX.oData.charg!=''){ 
					oCon.getControl('e404InpCharg2').setValueState(sap.ui.core.ValueState.Error);
				}else{
					oCon.getControl('e404InpCharg2').setValueState(sap.ui.core.ValueState.None);
				}; 
				
			// Validate actual batch :: 2018.07.07 :: END 
			
			oCon.getControl('e404InpQrData').setValue();		
			oCon.getControl('e404InpCharg2').setValue(oModel.oData.charg);
			oCon.getControl('e404InpMenge2').setValue(oModel.oData.menge);
			oCon.getControl('e404InpMeins2').setValue(oModel.oData.meins);
			oCon.getControl('e404InpQrID').setValue(oModel.oData.qrcod); 
			
		}; 
		
		if(fcode=="e404btnPrt")	{	// ++ 2018.02.19 
			oCon.getControl('k006inpCheck').setValue('PickAndPrintDummy');
			oCon.ui5DispatchBackEnd("SAPEVT_E405","evt_e405","{i18n>MSG_PROCESS}");
		};
		
	},
	
//	--------------------------------------------------------------------------------	
//	Parameters 
//	--------------------------------------------------------------------------------

	M02_PAR: function(fcode,oModela){
		
	//	----------------------------------------------------------- E401 :: List Picking Order
		if(fcode=="SAPEVT_E401"){
			return oParameters = { 
				"idate"   : oCon.getControl('e401inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('e401chkShiftD'),
				"iaprion" : oCon.getAbapTrue('e401chkShiftN'),
			};
		};
		
	//	----------------------------------------------------------- E401 :: List Picking Order Item
		if(fcode=="SAPEVT_E402"){
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e401TblOvw','piknr'),};
		};
		
	//	----------------------------------------------------------- E403 :: List Transfer Order
		if(fcode=="SAPEVT_E403"){
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e402TblOvw','piknr'),
				"ipospk" 	: oCon.getProperty('e402TblOvw','pospk'),
				"imatnr" 	: oCon.getProperty('e402TblOvw','matnr_in'),
				"icharg" 	: oCon.getProperty('e402TblOvw','charg'),
				//"itanum" 	: oCon.getProperty('e402TblOvw','tanum'),	// -- 2018.02.13 : Picking Dummy V1.3
				//"itapos" 	: oCon.getProperty('e402TblOvw','tapos'),	// -- 2018.02.13 : Picking Dummy V1.3
			};
		};
		
	//	----------------------------------------------------------- E404 :: Scan preparing
		if(fcode=="SAPEVT_E404"){ 
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e403TblOvw','piknr'),
				"ipospk" 	: oCon.getProperty('e402TblOvw','pospk'),
				"imatnr" 	: oCon.getProperty('e403TblOvw','matnr_in'),
				"icharg" 	: oCon.getProperty('e403TblOvw','charg'),
				//"itanum" 	: oCon.getProperty('e403TblOvw','tanum'),	// -- 2018.02.13 : Picking Dummy V1.3
				//"itapos" 	: oCon.getProperty('e403TblOvw','tapos'),	// -- 2018.02.13 : Picking Dummy V1.3
			};
		};
		
	//	----------------------------------------------------------- E405 :: Pick
		if(fcode=="SAPEVT_E405"){  
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e403TblOvw','piknr'),
				"ipospk" 	: oCon.getProperty('e402TblOvw','pospk'),
				"imatnr" 	: oCon.getControl('e404InpMatnr').getValue(),
				"icharg" 	: oCon.getControl('e404InpCharg2').getValue(),
				"itfrnr"	: oCon.getControl('e404InpLenum').getValue(),
				//"icharga" : oCon.getControl('e404InpCharg2').getValue(),
				"imenge" 	: oCon.getControl('e404InpMenge2').getValue(),
				"imeins"	: oCon.getControl('e404InpMeins2').getValue(),
				//"itanum" 	: oCon.getProperty('e403TblOvw','tanum'),		// -- 2018.02.13 : Picking Dummy V1.3
				//"itapos" 	: oCon.getProperty('e403TblOvw','tapos'),		// -- 2018.02.13 : Picking Dummy V1.3
				"iqrcod" 	: oCon.getControl('e404InpQrID').getValue(),
				
				
			};
		};
		
	//	----------------------------------------------------------- E406 :: List actual pick		
		if(fcode=="SAPEVT_E406"){  
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e402TblOvw','piknr'),
				"ipospk" 	: oCon.getProperty('e402TblOvw','pospk'),
				//"itanum" 	: oCon.getProperty('e402TblOvw','tanum'),	// -- 2018.02.13 : Picking Dummy V1.3
				//"itapos" 	: oCon.getProperty('e402TblOvw','tapos'),	// -- 2018.02.13 : Picking Dummy V1.3
			};
		};
		
	//	----------------------------------------------------------- E407 :: Back
		if(fcode=="SAPEVT_E407"){  
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e401TblOvw','piknr'),
				//"itfrnr" 	: oCon.getProperty('e402TblOvw','tfrnr'),
			};
		};
		
	//	----------------------------------------------------------- E408 :: Confirm back
		if(fcode=="SAPEVT_E408"){  
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e401TblOvw','piknr'),
				//"itfrnr" 	: oCon.getProperty('e402TblOvw','tfrnr'),
			};
		};
		
	// 	Refresh Batch ++ 2018.02.13 : Picking Dummy V1.3
		if(fcode=="SAPEVT_E409"){ 
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e401TblOvw','piknr'), 
			};
		};
		
	},

//	--------------------------------------------------------------------------------	
//	Model Set 
//	--------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){
		
	//	----------------------------------------------------------- E401 :: List Picking Order
		if(fcode=="SAPEVT_E401"){
			oCon.getControl('e401TblOvw').setModel(oModela);
		};
		
	//	----------------------------------------------------------- E402 :: List Picking Order Item
		if((fcode=="SAPEVT_E402")||(fcode=="SAPEVT_E409")){ 
			oCon.getControl('e402TblOvw').setModel(oModela);
		};
		
	//	----------------------------------------------------------- E403 :: List Transfer Order
		if(fcode=="SAPEVT_E403"){ 
			oCon.getControl('e403TblOvw').setModel(oModela);
			oCon.getControl('e403lblTitle').setModel(oModela);
		};
		
	//	----------------------------------------------------------- E404 :: Scan preparing
		if(fcode=="SAPEVT_E404"){ 
			
			oCon.getFocus('e404InpQrData');
			
			oCon.getControl('e404InpLenum').setModel(oModela);
			oCon.getControl('e404InpMatnr').setModel(oModela);
			oCon.getControl('e404InpMaktx').setModel(oModela);
			oCon.getControl('e404InpCharg1').setModel(oModela);
			oCon.getControl('e404InpCharg2').setModel(oModela);
			oCon.getControl('e404InpMenge1').setModel(oModela);
			oCon.getControl('e404InpMenge2').setModel(oModela);
			oCon.getControl('e404InpMeins1').setModel(oModela);
			oCon.getControl('e404InpMeins2').setModel(oModela);	
			oCon.getControl('e404InpMenge3').setModel(oModela);		// ++ 2018.02.26 :: Picking - Dummy V1.2
			//oCon.getControl('e404InpMeins').setModel(oModela);
		};
		
	//	----------------------------------------------------------- E405 :: Pick
		if(fcode=="SAPEVT_E405"){ 
			
			if(oModela.oData.logon.typ=='S'){ 
				if (oCon.getControl('k006inpCheck').getValue()!='PickAndPrintDummy') {
					oCon.popMsgbox(oModela.oData.logon.msg);					
				}
				oCon.getControl('e402TblOvw').setModel(oModela);
				app.to('E402','slide');
			}else{
				oCTX.oData.cancel_nav = true;
				//oCon.popMsgbox(oModela.oData.logon.msg);
				//oCon.ui5DispatchBackEnd("SAPEVT_E402","evt_e402","{i18n>MSG_PROCESS}");
			}
			
		};
		
	//	----------------------------------------------------------- E406 :: List actual pick
		if(fcode=="SAPEVT_E406"){
			oCon.getControl('e405TblOvw').setModel(oModela);
		};
	},
	
//	--------------------------------------------------------------------------------	
//	Set UI 
//	--------------------------------------------------------------------------------
	
	M04_DYN: function(fcode,oModela){
		
		if(fcode=="SAPEVT_E401"){
			oCon.getControl('e401schMain').setValue("");
		};
		
		if(fcode=="SAPEVT_E402"){
			oCon.getControl('e402schMain').setValue("");
		};

		if(fcode=="SAPEVT_E403"){
			oCon.getControl('e403schMain').setValue("");
		};
		
		if(fcode=="SAPEVT_E407"){
			if(oModela.oData.logon.typ =="W"){
				var sMsg = 'Picking item ' + oModela.oData.logon.msg + ' not complete, Do you want to save ?';
				oCon.popConfirm(sMsg,'e402btnSav_ok','e402btnSav_no');
			}else{
				oCon.getControl('e401schMain').setValue("");
				app.to('E401','slide');
			}
		};		
		
		if(fcode=='e404btnBck'){ 
			oCon.getControl('e404InpCharg2').setValueState(sap.ui.core.ValueState.None);	// ++ 2018.08.21 :: Picking Dummy V1.8 :: Validate Batch
			oCon.getControl('e404InpCharg2').setValue("");
			oCon.getControl('e404InpMenge2').setValue("");
			oCon.getControl('e404InpMeins2').setValue("");
		};
				
		if(fcode=='SAPEVT_E405'){
			if (oModela.oData.logon.typ!='E') {
				oCon.getControl('e404InpCharg2').setValueState(sap.ui.core.ValueState.None);	// ++ 2018.08.21 :: Picking Dummy V1.8 :: Validate Batch
			}
			if (oCon.getControl('k006inpCheck').getValue()!='PickAndPrintDummy'){  
				oCon.getControl('e404InpCharg2').setValue("");
				oCon.getControl('e404InpMenge2').setValue("");
				oCon.getControl('e404InpMeins2').setValue("");			
			}		 
		};
		
	},

//	--------------------------------------------------------------------------------	
//	Navigation 
//	--------------------------------------------------------------------------------
	
	M05_NAV: function(fcode,oModela){

		if(fcode=="SAPEVT_E401")    {app.to('E401','slide');};
		if(fcode=="SAPEVT_E402")    {app.to('E402','slide');};
		if(fcode=="SAPEVT_E403")	{if(oModela.oData.logon.typ!='E'){app.to('E403','slide');}};
		if(fcode=="SAPEVT_E404")    {app.to('E404','slide');};
//		if(fcode=="SAPEVT_E405")    {app.to('E402','slide');};
		if(fcode=="SAPEVT_E406")    {app.to('E405','slide');};
		
		if(fcode=='e401btnBck')		{oCon.nav_home();};
//		if(fcode=='e402btnBck')		{app.to('E401','slide');};
		if(fcode=='e403btnBck')		{app.to('E402','slide');oCon.getControl('e402schMain').setValue("");};
		if(fcode=='e404btnBck')		{app.to('E403','slide');oCon.getControl('e403schMain').setValue("");};
		if(fcode=='e405btnBck')		{app.to('E402','slide');oCon.getControl('e402schMain').setValue("");};
		
		if(fcode=='e402btnHom')		{oCon.nav_home();};
		if(fcode=='e403btnHom')		{oCon.nav_home();}; 	
		if(fcode=='e404btnHom')		{oCon.nav_home();}; 	
		if(fcode=='e405btnHom')		{oCon.nav_home();}; 	

	},
	
//	--------------------------------------------------------------------------------	
//	Navigation 
//	--------------------------------------------------------------------------------
	
	M06_NEX: function(fcode,oModela){ 
		
		if(fcode=='SAPEVT_E405'&&oModela.oData.logon.typ=='S'&oCon.getControl('k006inpCheck').getValue()=='PickAndPrintDummy'){
			oCon.getControl('k006inpSeqpk').setValue(oModela.oData.stick.seqpk);			
			oApp.diaPrint_PBO('e4044','PIK',
					  oCon.getControl('e404InpMatnr').getValue(),		// Material
					  oCon.getControl('e404InpCharg2').getValue(),		// Batch
					  oCon.getControl('e404InpMenge2').getValue(),		// Qty
					  oCon.getControl('e404InpMeins2').getValue(),		// UOM
					  oCon.getControl('e404InpMenge3').getValue(),		// Base Qty
					  oCon.getControl('e404InpQrID').getValue(),		// Scaned QR code
					  '',												// Process Order			++ 2018.09.18
					  '',												// Set No.					++ 2018.09.18
					  oCon.getProperty('e401TblOvw','piknr'),			// Picking Order			++ 2018.09.18
					  oCon.getControl('k006inpPospk').getValue(),		// Picking Item				++ 2018.09.18
					  oModela.oData.stick.seqpk,						// Sequence No.				++ 2018.09.18
					  ''												// Weight No.				++ 2018.09.18
			); 		 
			oCon.getControl('e404InpCharg2').setValue();
			oCon.getControl('e404InpMenge2').setValue();
			oCon.getControl('e404InpMeins2').setValue(); 
			oCon.getControl('e404InpMenge3').setValue();
			oCon.getControl('e404InpQrID').setValue();
			oCon.getControl('k006inpPospk').setValue();
		};		
	},
});