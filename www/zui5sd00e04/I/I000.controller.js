sap.ui.controller("zui5sd00e04.I.I000", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- I001		
		if(fcode=='i001TblAuf'){ // Select Process Order
			if(!oCon.isSelected('i001TblAuf')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_I002","evt_i002","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- I002		
		if(fcode=='i002TblIng'){ // Scan input dialog
			oCon.getControl('i002inpMatnr').setValue(oCon.getProperty('i002TblIng','matnr_in'));
			oCon.getControl('i002inpMenge_rkg').setValue(oCon.getProperty('i002TblIng','menge_rkg'));
			oCon.getControl('i002inpMeins_kg').setValue(oCon.getProperty('i002TblIng','meins_kg'));
			
			oCon.getControl('i002inpMatnrTx').setValue(oCon.getFieldValue('i002TblIng',['matnr_in','maktx_in']));
			oCon.getControl('i002InpQrData').setValue();
			oCon.getControl('i002inpCharg').setValue();
			oCon.getControl('i002inpMenge').setValue();
			oCon.getControl('i002inpMeins').setValue();
			oCon.getControl('i002DiaQr').open();
			oCon.getFocus('i002InpQrData');
		};
		
		if(fcode=='i002btnBat'){//Select Batch
			oCon.ui5DispatchBackEnd("SAPEVT_I008","evt_i008","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i002inpQr'){//Scan QR Data (auto matching component)
			var oModel = oCon.getQrData(oCon.getControl('i002inpQr').getValue());
			oCTX.oData.matnr = oModel.oData.matnr;
			oCTX.oData.charg = oModel.oData.charg;
			oCTX.oData.seta  = oModel.oData.seta;
			oCTX.oData.menge = oModel.oData.menge;
			oCTX.oData.meins = oModel.oData.meins;
			oCon.getControl('i002inpQr').setValue();
			oCon.ui5DispatchBackEnd("SAPEVT_I012","evt_i012","{i18n>MSG_PROCESS}");
		};
		if(fcode=='i002btnCam'){ // Scan with Camera
			oCon.scanCam('i002InpQrData','i002InpQrData');
		};
		
		if(fcode=='i002InpQrData'){ // Enter QR data
			var oModel  = oCon.getQrData(oCon.getControl('i002InpQrData').getValue());

			oCon.getControl('i002InpQrData').setValue();
			if(oModel.oData.matnr!=oCon.getControl('i002inpMatnr').getValue()){
				oCon.popMsgbox('Component ' + oModel.oData.matnr + ' not valid');return;
			};
			oCon.getControl('i002inpCharg').setValue(oModel.oData.charg);
			oCon.getControl('i002inpMenge').setValue(oModel.oData.menge);
			oCon.getControl('i002inpMeins').setValue(oModel.oData.meins);
			oCon.ui5DispatchBackEnd("SAPEVT_I004","evt_i004","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i002btnQrAcp'){ // Commit Scan Dialog
			//oCon.getControl('i002DiaQr').close();
			oCon.ui5DispatchBackEnd("SAPEVT_I004","evt_i004","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i002btnCnf'){ //Confirm Input Batch & Start
			oCon.getControl('i002InpTAprio').setValue();
			oCon.getControl('i002InpTJuldat').setValue();
			oCon.ui5DispatchBackEnd("SAPEVT_I007","evt_i007","{i18n>MSG_PROCESS}");
			oCon.getControl('i002InpTDate').setValue(oCon.getDateIn());
			oCon.getControl('i002InpTTime').setValue(oCon.getTime());
			oCon.getControl('i002DiaCnf').open();
		};
		if(fcode=='i002btnTSave'){ //Confirm Save
			oCon.getControl('i002DiaCnf').close();
			oCon.ui5DispatchBackEnd("SAPEVT_I006","evt_i006","{i18n>MSG_PROCESS}");
		};
		if(fcode=='i002btnTRfh'){//Refresh Tumbling Batch
			oCon.ui5DispatchBackEnd("SAPEVT_I013","evt_i013","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i002btnDis'){ //Display Actual Component
			oCon.ui5DispatchBackEnd("SAPEVT_I005","evt_i005","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i002btnMSave'){//Confirm selected batch
			oCon.ui5DispatchBackEnd("SAPEVT_I009","evt_i009","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i002btnList'){//Material Replacement
			oCon.ui5DispatchBackEnd("SAPEVT_I010","evt_i010","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i002btnRSave'){//Material Replacement Confirm
			oCon.getControl('i002DiaRep').close();
			oCon.ui5DispatchBackEnd("SAPEVT_I011","evt_i011","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- I005
		if(fcode=='i005lstVornr'){ // Select Phase
			
			oCon.getControl('i005inpOrder').setValue();
			if(oCon.getProperty('i005lstVornr','vornr')=='0099'){
				oCon.getControl('i005DiaEdt').open();
			}else{
				oCon.ui5DispatchBackEnd("SAPEVT_I003","evt_i003","{i18n>MSG_PROCESS}");
			}
		};
		if(fcode=='i005btnAcp'){
			oCon.getControl('i005DiaEdt').close();
			oCon.ui5DispatchBackEnd("SAPEVT_I003","evt_i003","{i18n>MSG_PROCESS}");
		};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_I001"){//Production Order List
			return oParameters = { 
				"idate"   : oCon.getControl('i001inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('i001chkShiftD'),
				"iaprion" : oCon.getAbapTrue('i001chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_I002"){ //Process Order - Select From List
			return oParameters = { 
			    "iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
			};
		};
		
		if(fcode=="SAPEVT_I003"){ //Propose Component
			return oParameters = { 
				"isets"		: oCon.getControl('i005inpOrder').getValue(),
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
			    "ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
			};
		};
		
		if(fcode=='SAPEVT_I004'){//Confirm component
			return oParameters = { 
				"isets"		: oCon.getControl('i005inpOrder').getValue(),
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
				"imatnr" 	: oCon.getControl('i002inpMatnr').getValue(),
				"icharg" 	: oCon.getControl('i002inpCharg').getValue(),
				"imenge" 	: oCon.getControl('i002inpMenge').getValue(),
				"imeins" 	: oCon.getControl('i002inpMeins').getValue(),
			};
		};
		
		if(fcode=='SAPEVT_I005'){//Display Actual Component & Batch
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
			};
		};
		
		if(fcode=='SAPEVT_I006'){//Save Confirm
			return oParameters = { 
			    "isets"		: oCon.getControl('i005inpOrder').getValue(),	
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
				"imenge" 	: oCon.getControl('i002inpMenge').getValue(),
				"iarbpl" 	: oCon.getControl('i002InpTTumbl').getSelectedKey(),
				"icharg" 	: oCon.getControl('i002InpTCharg').getValue(),
				"iisdd" 	: oCon.getControl('i002InpTDate').getValue(),
				"iisdz" 	: oCon.getControl('i002InpTTime').getValue(),
				"iaprio" 	: oCon.getControl('i002InpTAprio').getValue(),
				"ijuldat" 	: oCon.getControl('i002InpTJuldat').getValue(),
			};
		};
		
		if(fcode=='SAPEVT_I007'||fcode=='SAPEVT_I013'){//Get Tumbling Batch
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"iaprio" 	: oCon.getControl('i002InpTAprio').getValue(),
				"ijuldat" 	: oCon.getControl('i002InpTJuldat').getValue(),
			};
		};
		
		if(fcode=='SAPEVT_I008'){//List Batch
			return oParameters = { 
				"imatnr" 	: oCon.getControl('i002inpMatnr').getValue(),
				"imenge" 	: oCon.getControl('i002inpMenge_rkg').getValue(),
				"imeins" 	: oCon.getControl('i002inpMeins_kg').getValue(),
			};
		};
		
		if(fcode=='SAPEVT_I009'){//Confirm Select Batch
			return oParameters = { 
			    "isets"		: oCon.getControl('i005inpOrder').getValue(),
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
				"imatnr" 	: oCon.getControl('i002inpMatnr').getValue(),
				"matnr_in" 	: oCon.arrListItems('i002TblMeat','matnr_in'),
				"charg" 	: oCon.arrListItems('i002TblMeat','charg'),
				"menge_ikg" : oCon.arrListItems('i002TblMeat','menge_ikg'),
				"meins_kg" 	: oCon.arrListItems('i002TblMeat','meins_kg'),
			};
		};
		
		if(fcode=='SAPEVT_I010'){//Material Replacement
			return oParameters = { 
				"imatnr" 	: oCon.getControl('i002inpMatnr').getValue(),
				"imenge" 	: oCon.getControl('i002inpMenge_rkg').getValue(),
				"imeins" 	: oCon.getControl('i002inpMeins_kg').getValue(),
			};
		};
		
		if(fcode=='SAPEVT_I011'){//Material Replacement Confirm
			return oParameters = { 
			    "isets"		: oCon.getControl('i005inpOrder').getValue(),
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
				"imatnr" 	: oCon.getControl('i002inpMatnr').getValue(),
				"matnr_in" 	: oCon.arrListItems('i002TblRep','matnr_in'),
				"charg" 	: oCon.arrListItems('i002TblRep','charg'),
				"menge_ikg" : oCon.arrListItems('i002TblRep','menge_ikg'),
				"meins_kg" 	: oCon.arrListItems('i002TblRep','meins_kg'),
			};
		};
		
		if(fcode=='SAPEVT_I012'){//Scan QR Data (auto matching component)
			return oParameters = { 
				"isets"		: oCTX.oData.seta,
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
				"imatnr" 	: oCTX.oData.matnr,
				"icharg" 	: oCTX.oData.charg,
				"imenge" 	: oCTX.oData.menge,
				"imeins" 	: oCTX.oData.meins,
			};
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=='SAPEVT_I001'){ //Process Order List
			oCon.getControl('i001TblAuf').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I002'){ //Phase List
			oCon.getControl('i005lstVornr').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I003'){ //List propose component
			oCon.getControl('i002TblIng').setModel(oModela);
			oCon.getControl('i002TblIng').setHeaderText(oCon.getFieldValue('i001TblAuf',['matnr_fg','maktx_fg']));
		};
		
		if(fcode=='SAPEVT_I004'){ //Confirm component
			oCon.getControl('i002TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I005'){ //List actual component & batch
			oCon.getControl('i003TblBat').setModel(oModela);
			oCon.getControl('i003TblBat').setHeaderText(oCon.getFieldValue('i001TblAuf',['matnr_fg','maktx_fg']));
		};
		
		if(fcode=='SAPEVT_I006'){ //Save Confirm
			if(oModela.oData.logon.typ=='S'){
				oCon.popMsgbox(oModela.oData.logon.msg);
				oCon.getControl('i001TblAuf').setModel(oModela);
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};
		
		if(fcode=='SAPEVT_I007'){ //Get Propose Tumbling Batch
			oCon.getControl('i002InpTCharg').setModel(oModela);
			oCon.getControl('i002InpTTumbl').setModel(oModela);
			oCon.getControl('i002InpTJuldat').setModel(oModela);
			oCon.getControl('i002InpTAprio').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I008'){ //List Batch
			oCon.getControl('i002TblMeat').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I009'&&oModela.oData.logon.typ!='E'){ //Save Confirm (RAW Meat)
			oCon.getControl('i002TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I010'&&oModela.oData.logon.typ!='E'){ //Mat Replacement
			oCon.getControl('i002TblRep').setModel(oModela);
			oCon.getControl('i002DiaRep').open();
		};
		
		if(fcode=='SAPEVT_I011'&&oModela.oData.logon.typ!='E'){ //Save Confirm (Replacement)
			oCon.getControl('i002TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I012'&&oModela.oData.logon.typ!='E'){//Scan QR Data (auto matching component)
			oCon.getControl('i002TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I013'){ //Refresh Tumbling Batch
			oCon.getControl('i002InpTCharg').setModel(oModela);
		};
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		if(fcode=='SAPEVT_I003'){ //Focust QR Field
			oCon.getFocus('i002inpQr');
		};
		
		if(fcode=='SAPEVT_I008'&&oModela.oData.logon.typ!='E'){ //RAW Meat
			oCon.getControl('i002lblMengeRkg').setText('Req Qty: '+ 
													   oCon.getControl('i002inpMenge_rkg').getValue() + ' ' +
													   oCon.getControl('i002inpMeins_kg').getValue());
			oCon.getControl('i002DiaQr').close();
			oCon.getControl('i002DiaMeat').open();
		};
		
		if(fcode=='SAPEVT_I009'&&oModela.oData.logon.typ!='E'){ //Save Confirm (RAW Meat)
			oCon.getControl('i002DiaMeat').close();
		};
		
		if(fcode=='SAPEVT_I004'&&oModela.oData.logon.typ!='E'){ //Scan component Success
			oCon.getControl('i002inpCharg').setValue();
			oCon.getControl('i002inpMenge').setValue();
			oCon.getControl('i002inpMeins').setValue();
		};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		//I001=>I005=>I002=>I003 (In)
		if(fcode=="SAPEVT_I001")    {app.to('I001','slide');};
		if(fcode=="SAPEVT_I002")    {app.to('I005','slide');};
		if(fcode=="SAPEVT_I003")    {app.to('I002','slide');};
		if(fcode=="SAPEVT_I005")    {app.to('I003','slide');};
		if(fcode=="SAPEVT_I006")    {app.to('I001','slide');};
		
		if(fcode=='i001btnBck')		{oCon.nav_home();};
		if(fcode=='i005btnBck')		{app.to('I001','slide');};
		if(fcode=='i002btnBck')		{app.to('I005','slide');};
		if(fcode=='i003btnBck')		{app.to('I002','slide');};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
});