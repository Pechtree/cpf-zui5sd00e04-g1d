sap.ui.controller("zui5sd00e04.proc.E500", {

	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
//		if(fcode=='e401TblOvw'){// Start/Continue Pick
//			if(!oCon.isSelected('e401TblOvw')){return;};
//			oCon.ui5DispatchBackEnd("SAPEVT_E402","evt_e402","{i18n>MSG_PROCESS}");
//		};
//		
//		if(fcode=='e402btnDis'){ //Display Actual Batch
//			//if(!oCon.isSelected('e402TblOvw')){return;};
//			//oCon.ui5DispatchBackEnd("SAPEVT_E104","evt_e104","{i18n>MSG_PROCESS}");
//			
//			oCon.ui5DispatchBackEnd("SAPEVT_E406","evt_e406","{i18n>MSG_PROCESS}");
//		};
//		
//		if(fcode=='e402btnAcp'){// 
//			oCon.ui5DispatchBackEnd("SAPEVT_E403","evt_e403","{i18n>MSG_PROCESS}");
//		};	
//		
//		if(fcode=='e403TblOvw'){// 
//			if(!oCon.isSelected('e403TblOvw')){return;};
//			oCon.ui5DispatchBackEnd("SAPEVT_E404","evt_e404","{i18n>MSG_PROCESS}");
//		};
//		
//		if(fcode=='e404btnAcp'){// 
//			oCon.ui5DispatchBackEnd("SAPEVT_E405","evt_e405","{i18n>MSG_PROCESS}");
//		};
//		
		if(fcode=='e501TblOvw'){// 
			oCon.ui5DispatchBackEnd("SAPEVT_E502","evt_e502","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='e502btnDis'){// 
			if(!oCon.isSelected('e502TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_E511","evt_e511","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='e502btnDel'){// 
			if(!oCon.isSelected('e502TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_E512","evt_e512","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='e502btnEdt'){// 
			if(!oCon.isSelected('e502TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_E504","evt_e504","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='e502btnAcp'){// 
			if(!oCon.isSelected('e502TblOvw')){return;};
			oCon.getControl('k006inpPospk').setValue(oCon.getProperty('e502TblOvw','pospk'));
			oCon.ui5DispatchBackEnd("SAPEVT_E503","evt_e503","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='e504btnAcp'){// 
			oCon.ui5DispatchBackEnd("SAPEVT_E505","evt_e505","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='e505btnAcp'){// 
			oCon.ui5DispatchBackEnd("SAPEVT_E506","evt_e506","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='e503TblOvw'){// 
			oCon.ui5DispatchBackEnd("SAPEVT_E507","evt_e507","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='e506BtnSU'){// 
			//oCon.scanCam('e506InpQrData','e506InpQrData_SU');
			oCon.scanCam('e506InpQrData','e506InpQrData');
		};
		
		if(fcode=='e506BtnBin'){// 
			//oCon.scanCam('e506InpQrData','e506InpQrData_BIN');
			oCon.scanCam('e506InpQrData','e506InpQrData');
		};
		
		if(fcode=='e506btnPrt'){//	 
			oCon.getControl('k006inpCheck').setValue('PickAndPrint');
			oCon.ui5DispatchBackEnd("SAPEVT_E510","evt_e510","{i18n>MSG_PROCESS}");
			
		};
		
		if(fcode=='e506btnAcp'){// 
			oCon.getControl('k006inpCheck').setValue();
			oCon.ui5DispatchBackEnd("SAPEVT_E510","evt_e510","{i18n>MSG_PROCESS}");
		};
		
		//Enter Key SU
		if(fcode=="e506InpLenum2")	{
			oCon.ui5DispatchBackEnd("SAPEVT_E508","evt_e508","{i18n>MSG_PROCESS}");
		};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_E501"){//Pick Order List
			return oParameters = { 
				"idate"   : oCon.getControl('e501inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('e501chkShiftD'),
				"iaprion" : oCon.getAbapTrue('e501chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_E502"){ //Start/Continue Pick
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e501TblOvw','piknr'),
			};
			
		};
		
		if(fcode=="SAPEVT_E503"){ // List transfer order to confirm pick
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e502TblOvw','piknr'),
				"ipospk" 	: oCon.getProperty('e502TblOvw','pospk'),
				"imatnr" 	: oCon.getProperty('e502TblOvw','matnr_in'),
				"icharg" 	: oCon.getProperty('e502TblOvw','charg'),
				"itanum" 	: oCon.getProperty('e502TblOvw','tanum'),
				"itapos" 	: oCon.getProperty('e502TblOvw','tapos'),
			};
		};
		
		if(fcode=="SAPEVT_E504"){ // 
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e502TblOvw','piknr'),
				"ipospk" 	: oCon.getProperty('e502TblOvw','pospk'),
				"imatnr" 	: oCon.getProperty('e502TblOvw','matnr_in'),
				"icharg" 	: oCon.getProperty('e502TblOvw','charg'),
				"ilenum" 	: oCon.getProperty('e502TblOvw','lenum'),
				"ilgpla" 	: oCon.getProperty('e502TblOvw','lgpla'),
				"itanum" 	: oCon.getProperty('e502TblOvw','tanum'),
				"itapos" 	: oCon.getProperty('e502TblOvw','tapos'),
				"ivlenr" 	: oCon.getProperty('e502TblOvw','vlenr'),
			};
		};
		
		if(fcode=="SAPEVT_E505"){ // 
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e502TblOvw','piknr'),
				"ipospk" 	: oCon.getProperty('e502TblOvw','pospk'),
				"matnr" 	: oCon.arrListItems('e504TblOvw','matnr_in'),
				"charg" 	: oCon.arrListItems('e504TblOvw','charg'),
				"itanum" 	: oCon.getProperty('e502TblOvw','tanum'),
				"itapos" 	: oCon.getProperty('e502TblOvw','tapos'),
				"menge" 	: oCon.arrListItems('e504TblOvw','menge_opk'),
				"vlenr" 	: oCon.arrListItems('e504TblOvw','vlenr'),
				"meins" 	: oCon.arrListItems('e504TblOvw','meins'),
				"ivlenr" 	: oCon.getProperty('e502TblOvw','vlenr'),
			};
		};
		
		if(fcode=="SAPEVT_E506"){ // 
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e502TblOvw','piknr'),
				"ipospk" 	: oCon.getProperty('e502TblOvw','pospk'),
				"matnr" 	: oCon.arrListItems('e505TblOvwN','matnr_in'),
				"charg" 	: oCon.arrListItems('e505TblOvwN','charg'),
				"itanum" 	: oCon.getProperty('e502TblOvw','tanum'),
				"itapos" 	: oCon.getProperty('e502TblOvw','tapos'),
				"menge" 	: oCon.arrListItems('e505TblOvwN','menge_opk'),
				"vlenr" 	: oCon.arrListItems('e505TblOvwN','vlenr'),
				"meins" 	: oCon.arrListItems('e505TblOvwN','meins_pkx'),
				"itfrnr" 	: oCon.getProperty('e502TblOvw','tfrnr'),
				"ivlenr" 	: oCon.getProperty('e502TblOvw','vlenr'),
			};
		};
		
		
		
		if(fcode=="SAPEVT_E507"){ // List transfer order to confirm pick
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e502TblOvw','piknr'),
				"ipospk" 	: oCon.getProperty('e502TblOvw','pospk'),
				"imatnr" 	: oCon.getProperty('e502TblOvw','matnr_in'),
				"icharg" 	: oCon.getProperty('e502TblOvw','charg'),
				"itanum" 	: oCon.getProperty('e502TblOvw','tanum'),
				"itapos" 	: oCon.getProperty('e502TblOvw','tapos'),
			};
		};
		
		if(fcode=="SAPEVT_E508"){ //
			return oParameters = { 
				"ilenum" 	: oCon.getControl('e506InpLenum2').getValue(),				
				"imeins" 	: oCon.getControl('e506InpMeins1').getValue(), 
				"ipiknr" 	: oCon.getProperty('e501TblOvw','piknr'),			// ++ 2017.12.27 - Picking-Multiple V.1.4
				"ipospk" 	: oCon.getControl('k006inpPospk').getValue(),	 	// ++ 2017.12.27 - Picking-Multiple V.1.4
			};
		};
		
		if(fcode=="SAPEVT_E510"){ //  
			return oParameters = { 
					"ipiknr" 	: oCon.getProperty('e502TblOvw','piknr'),
					"ipospk" 	: oCon.getProperty('e502TblOvw','pospk'),
					"itanum" 	: oCon.getProperty('e502TblOvw','tanum'),
					"itapos" 	: oCon.getProperty('e502TblOvw','tapos'),
					"ilenum"    : oCon.getControl('e506InpLenum2').getValue(),
					"icharg"    : oCon.getControl('e506InpCharg2').getValue(),
					"imenge"    : oCon.getControl('e506InpMenge2').getValue(),
					"imeins"    : oCon.getControl('e506InpMeins2').getValue(),
					"ilgpla"    : oCon.getControl('e506InpLgpla2').getValue(),
					"itfrnr"    : oCon.getControl('e506InpTfrnr').getValue(),
					"imatnr"    : oCon.getControl('e506InpMatnr').getValue(),
					"iqrcod" 	: oCon.getControl('e506InpQrID').getValue(),
				
			};
		};
		
		if(fcode=="SAPEVT_E511"){ // 
			return oParameters = { 
					"ipiknr" 	: oCon.getProperty('e502TblOvw','piknr'),
					"ipospk" 	: oCon.getProperty('e502TblOvw','pospk'),
					"itanum" 	: oCon.getProperty('e502TblOvw','tanum'),
					"itapos" 	: oCon.getProperty('e502TblOvw','tapos'),
				
			};
		};
		
		if(fcode=="SAPEVT_E512"){ // 
			return oParameters = { 
					"ipiknr" 	: oCon.getProperty('e502TblOvw','piknr'),
					"ipospk" 	: oCon.getProperty('e502TblOvw','pospk'),
					"itanum" 	: oCon.getProperty('e502TblOvw','tanum'),
					"itapos" 	: oCon.getProperty('e502TblOvw','tapos'),
				
			};
		};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
			
		if(fcode=="SAPEVT_E501"){ //
			oCon.getControl('e501TblOvw').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E502"){ //
			oCon.getControl('e502TblOvw').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E503"){ //
			oCon.getControl('e503TblOvw').setModel(oModela);
			oCon.getControl('e503lblTitle').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E504"){ //
			oCon.getControl('e504TblOvw').setModel(oModela);
			oCon.getControl('e504lblTitle').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E505"){ //
			oCon.getControl('e505TblOvw').setModel(oModela);
			oCon.getControl('e505TblOvwN').setModel(oModela);
			oCon.getControl('e505lblTitle').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E506"){ //
			oCon.getControl('e502TblOvw').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E507"){ //

			oCon.getControl('e506InpLenum2').setValue();
			oCon.getControl('e506InpCharg2').setValue();
			oCon.getControl('e506InpMenge2').setValue();
			oCon.getControl('e506InpMeins2').setValue();
			oCon.getControl('e506InpLgpla2').setValue();		
			
			oCon.getFocus('e506InpQrData');
			
			oCon.getControl('e506InpTfrnr').setModel(oModela);
			oCon.getControl('e506InpMatnr').setModel(oModela);
			oCon.getControl('e506InpMaktx').setModel(oModela);
			oCon.getControl('e506InpLenum1').setModel(oModela);
			oCon.getControl('e506InpCharg1').setModel(oModela);
			oCon.getControl('e506InpMenge1').setModel(oModela);
			oCon.getControl('e506InpLgpla1').setModel(oModela);
			oCon.getControl('e506InpMeins1').setModel(oModela);
			oCon.getControl('e506InpMenge3').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E508"){ //
			oCon.getControl('e506InpCharg2').setModel(oModela);
			oCon.getControl('e506InpMenge2').setModel(oModela);
			oCon.getControl('e506InpMeins2').setModel(oModela);
			oCon.getControl('e506InpLgpla2').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E510"){ // 	 
			if(oModela.oData.logon.typ=='S'){
				oCon.getControl('e502TblOvw').setModel(oModela);
				//oCon.popMsgbox(oModela.oData.logon.msg);
			}			
		};
		
		if(fcode=="SAPEVT_E511"){ //
			oCon.getControl('e507TblOvw').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E512"){ //
			if(oModela.oData.logon.typ=='S'){
				oCon.popMsgbox(oModela.oData.logon.msg);
				oCon.getControl('e502TblOvw').setModel(oModela);
			}
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
//		if(fcode=='e506InpQrData_SU'){//Scan SU
//			var oModel  = oCon.getQrData(oCon.getControl('e506InpQrData').getValue());
//			oCon.getControl('e506InpQrData').setValue();
//			oCon.getControl('e506InpLenum2').setValue(oModel.oData.lenum);
//			
//			oCon.ui5DispatchBackEnd("SAPEVT_E508","evt_e508","{i18n>MSG_PROCESS}");
//		};
//		
//		if(fcode=='e506InpQrData_BIN'){//Scan Bin
//			var oModel  = oCon.getQrData(oCon.getControl('e506InpQrData').getValue());
//			oCon.getControl('e506InpQrData').setValue();
//			oCon.getControl('e506InpLgpla2').setValue(oModel.oData.lgpla);
//			
//			oCon.ui5DispatchBackEnd("SAPEVT_E509","evt_e509","{i18n>MSG_PROCESS}");
//		};
		
		
		if(fcode=="SAPEVT_E501"){
			oCon.getControl('e501schMain').setValue("");
		};
		
		if(fcode=="SAPEVT_E502"){
			oCon.getControl('e502schMain').setValue("");
		};

		if(fcode=="SAPEVT_E503"){
			oCon.getControl('e503schMain').setValue("");
		};
		
		if(fcode=='e506InpQrData'){
			var oModel  = oCon.getQrData(oCon.getControl('e506InpQrData').getValue());
			
			if(oModel.oData.type == 'B'){
				oCTX.oData.lenum = oModel.oData.lenum;
				oCTX.oData.qrcod  = oModel.oData.qrcod;
				oCon.getControl('e506InpQrData').setValue();
				oCon.getControl('e506InpLenum2').setValue(oModel.oData.lenum);
				oCon.getControl('e506InpQrID').setValue(oModel.oData.qrcod);
				oCon.ui5DispatchBackEnd("SAPEVT_E508","evt_e508","{i18n>MSG_PROCESS}");
			}
			
			if(oModel.oData.type == 'BIN'){
				oCTX.oData.lgpla = oModel.oData.lgpla;
				oCon.getControl('e506InpQrData').setValue();
				oCon.getControl('e506InpLgpla2').setValue(oModel.oData.lgpla);
				oCon.ui5DispatchBackEnd("SAPEVT_E509","evt_e509","{i18n>MSG_PROCESS}");
			}

		};
		
		if(fcode=='SAPEVT_507'){ 
			oCon.getControl('e506InpLenum2').setValue("");
			oCon.getControl('e506InpCharg2').setValue("");
			oCon.getControl('e506InpMenge2').setValue("");
			oCon.getControl('e506InpMeins2').setValue("");
			oCon.getControl('e506InpLgpla2').setValue("");
			oCon.getControl('e506InpQrData').setValue();
			oCon.getFocus('506InpQrData');
		};
		
		if(fcode=='e506btnBck'){ 
			oCon.getControl('e506InpLenum2').setValue("");
			oCon.getControl('e506InpCharg2').setValue("");
			oCon.getControl('e506InpMenge2').setValue("");
			oCon.getControl('e506InpMeins2').setValue("");
			oCon.getControl('e506InpLgpla2').setValue("");
		};

	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){

		
		if(fcode=="SAPEVT_E501")    {app.to('E501','slide');};
		//if(fcode=="SAPEVT_E502")    {app.to('E502','slide');};
		if(fcode=="SAPEVT_E502")	{if(oModela.oData.logon.typ!='E'){app.to('E502','slide');}};
		//if(fcode=="SAPEVT_E503")    {app.to('E503','slide');};
		if(fcode=="SAPEVT_E503")	{if(oModela.oData.logon.typ!='E'){app.to('E503','slide');}};
		if(fcode=="SAPEVT_E504")    {app.to('E504','slide');};
		if(fcode=="SAPEVT_E505")    {app.to('E505','slide');};
		if(fcode=="SAPEVT_E506")    {app.to('E502','slide');};
		if(fcode=="SAPEVT_E507")    {app.to('E506','slide');};
		if(fcode=="SAPEVT_E510")    {app.to('E502','slide');};	
		//if(fcode=="SAPEVT_E510")	{if(oModela.oData.logon.typ!='E'){app.to('E502','slide');}};
		if(fcode=="SAPEVT_E511")    {app.to('E507','slide');};
		
		if(fcode=='e501btnBck')		{oCon.nav_home();};
		if(fcode=='e502btnBck')		{
			oCon.ui5DispatchBackEnd("SAPEVT_E501","evt_e501","{i18n>MSG_PROCESS}");
			oCon.getControl('e501schMain').setValue("");
			};
		if(fcode=='e503btnBck')		{app.to('E502','slide');oCon.getControl('e502schMain').setValue("");};
		if(fcode=='e504btnBck')		{app.to('E502','slide');oCon.getControl('e502schMain').setValue("");};
		if(fcode=='e505btnBck')		{app.to('E504','slide');oCon.getControl('e504schMain').setValue("");};
		if(fcode=='e506btnBck')		{app.to('E503','slide');oCon.getControl('e503schMain').setValue("");};
		if(fcode=='e507btnBck')		{app.to('E502','slide');oCon.getControl('e502schMain').setValue("");};
		
		if(fcode=='e502btnHom')		{oCon.nav_home();};
		if(fcode=='e503btnHom')		{oCon.nav_home();}; 	
		if(fcode=='e504btnHom')		{oCon.nav_home();}; 	
		if(fcode=='e505btnHom')		{oCon.nav_home();}; 	
		if(fcode=='e506btnHom')		{oCon.nav_home();}; 	
		if(fcode=='e507btnHom')		{oCon.nav_home();}; 	

	},
	
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	
	M06_NEX: function(fcode,oModela){
		
		if(fcode=='SAPEVT_E510'&&oModela.oData.logon.typ=='S'&oCon.getControl('k006inpCheck').getValue()=='PickAndPrint'){
			oCon.getControl('k006inpSeqpk').setValue(oModela.oData.stick.seqpk);			
			oApp.diaPrint_PBO('e5066','PIK',
					  oCon.getControl('e506InpMatnr').getValue(),		// Material
					  oCon.getControl('e506InpCharg2').getValue(),		// Batch
					  oCon.getControl('e506InpMenge2').getValue(),		// Qty
					  oCon.getControl('e506InpMeins2').getValue(),		// UOM
					  oCon.getControl('e506InpMenge3').getValue(),		// Base Qty
					  oCon.getControl('e506InpQrID').getValue(),		// Scaned QR code
					  '',												// Process Order 
					  '',												// Set No.
					  oCon.getProperty('e501TblOvw','piknr'),			// Picking Order
					  oCon.getControl('k006inpPospk').getValue(),		// Picking Item
					  oModela.oData.stick.seqpk,						// Sequence No.
					  ''												// Weight No.
			); 		
			oCon.getControl('e506InpLenum2').setValue();
			oCon.getControl('e506InpCharg2').setValue();
			oCon.getControl('e506InpMenge2').setValue();
			oCon.getControl('e506InpMenge3').setValue();
			oCon.getControl('e506InpMeins2').setValue();
			oCon.getControl('e506InpLgpla2').setValue();
			oCon.getControl('k006inpPospk').setValue();
			//oCon.getControl('e506InpSeqpk').setValue();		// -- 2018.01.15
			//oCon.getControl('e506InpPckItm').setValue();		// -- 2018.01.15
		};		
	},
});