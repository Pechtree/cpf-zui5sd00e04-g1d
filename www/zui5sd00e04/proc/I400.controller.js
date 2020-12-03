sap.ui.controller("zui5sd00e04.proc.I400", {
	
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	
	M01_FCD: function(fcode,oModela){
		
	//	----------------------------------------------------------- I403
		// 	Select Confirmation-in
			if(fcode=='i403TblCnf'){
				if(!oCon.isSelected('i403TblCnf')){return;};
			
				if(oCon.getProperty('i403TblCnf','kosta')=='C'){
					//Confirm-in is complete, go to confirm-out
					oCon.ui5DispatchBackEnd("SAPEVT_I404","evt_i404","{i18n>MSG_PROCESS}");
				}else{
					oCon.getControl('i406TblIng').setHeaderText(oFmt.fmtAlpha(oCon.getProperty('i403TblCnf','cnfnr')));
					oCon.ui5DispatchBackEnd("SAPEVT_I408","evt_i408","{i18n>MSG_PROCESS}");
				};
			};
			
	//	----------------------------------------------------------- I404
		//	Display Component
			if(fcode=='i404btnDis'){
				oCon.ui5DispatchBackEnd("SAPEVT_I405","evt_i405","{i18n>MSG_PROCESS}");
			};
			
		//	Save Confirm			
			if(fcode=='i404btnSav'){
				oCon.popConfirm('Do you want to save?','i404btnSav_ok','i404btnSav_no')
			};
			
		//	Confirm Save
			if(fcode=='i404btnSav_ok'){
				oCon.ui5DispatchBackEnd("SAPEVT_I406","evt_i406","{i18n>MSG_PROCESS}");
			};
			
		//	Refresh Yield
			if((fcode=='i404btnRfh')||(fcode=='i404InpYield')){
				oCon.ui5DispatchBackEnd("SAPEVT_I407","evt_i407","{i18n>MSG_PROCESS}");
			};
			
	//	----------------------------------------------------------- I406
		//	Scan input dialog
			if(fcode=='i406TblIng'){
				oCon.getControl('i406inpMatnr').setValue(oCon.getProperty('i406TblIng','matnr_in'));
				oCon.getControl('i406inpMenge_rkg').setValue(oCon.getProperty('i406TblIng','menge_rkg'));
				oCon.getControl('i406inpMeins_kg').setValue(oCon.getProperty('i406TblIng','meins_kg'));
				
				
				oCon.getControl('i406inpMatnrTx').setValue(oCon.getFieldValue('i406TblIng',['matnr_in','maktx_in']));
				oCon.getControl('i406InpQrData').setValue();
				oCon.getControl('i406inpCharg').setValue();
				oCon.getControl('i406inpMenge').setValue();
				oCon.getControl('i406inpMeins').setValue();
				
				oCon.getControl('i406DiaQr').open();
				oCon.getFocus('i406InpQrData');
			};
			
		//	Scan QR Data (auto matching component)
			if(fcode=='i406inpQr'){
				var oModel = oCon.getQrData(oCon.getControl('i406inpQr').getValue());
				oCTX.oData.matnr = oModel.oData.matnr;
				oCTX.oData.charg = oModel.oData.charg;
				oCTX.oData.seta  = oModel.oData.seta;
				oCTX.oData.menge = oModel.oData.menge;
				oCTX.oData.meins = oModel.oData.meins;
				oCon.getControl('i406inpQr').setValue();
				oCon.ui5DispatchBackEnd("SAPEVT_I417","evt_i417","{i18n>MSG_PROCESS}");
			};

		//	Scan with Camera
			if(fcode=='i406btnCam'){
				oCon.scanCam('i406InpQrData','i406InpQrData');
			};

		//	Enter QR data
			if(fcode=='i406InpQrData'){ 
				var oModel  = oCon.getQrData(oCon.getControl('i406InpQrData').getValue());

				oCon.getControl('i406InpQrData').setValue();
				if(oModel.oData.matnr!=oCon.getControl('i406inpMatnr').getValue()){
					oCon.popMsgbox('Component ' + oModel.oData.matnr + ' not valid');return;
				};
				oCon.getControl('i406inpCharg').setValue(oModel.oData.charg);
				oCon.getControl('i406inpMenge').setValue(oModel.oData.menge);
				oCon.getControl('i406inpMeins').setValue(oModel.oData.meins);
				oCon.ui5DispatchBackEnd("SAPEVT_I409","evt_i409","{i18n>MSG_PROCESS}");
			};

		//	Commit Scan Dialog
			if(fcode=='i406btnQrAcp'){ 
				//oCon.getControl('i106DiaQr').close();
				oCon.ui5DispatchBackEnd("SAPEVT_I409","evt_i409","{i18n>MSG_PROCESS}");
			};

		//	Select Batch	
			if(fcode=='i406btnBat'){
				oCon.ui5DispatchBackEnd("SAPEVT_I410","evt_i410","{i18n>MSG_PROCESS}");
			};

		//	Confirm selected batch
			if(fcode=='i406btnMSave'){
				oCon.ui5DispatchBackEnd("SAPEVT_I411","evt_i411","{i18n>MSG_PROCESS}");
			};
			
		//	Confirm Save Confirm - in ?	
			if(fcode=='i406btnCnf'){ 
				oCon.getControl('i406btnTEdit').setVisible(false)
				oCon.getControl('i406InpTCharg2').setVisible(false)
				oCon.getControl('i406InpTCharg2').setValue()
				oCon.getControl('i406DiaCnf').open();
				oCon.ui5DispatchBackEnd("SAPEVT_I413","evt_i413","{i18n>MSG_PROCESS}");
			};

		//	Confirm Save Confirm - in Confirm
			if(fcode=='i406btnTSave'){  
				oCon.getControl('i406DiaCnf').close();
				oCon.ui5DispatchBackEnd("SAPEVT_I412","evt_i412","{i18n>MSG_PROCESS}");
			};
			
		//	Refresh confirmation text
			if(fcode=='i406btnTRfh'){
				if (oCon.getControl('i406InpTCharg2').getValue().length > 2) {
					oCon.popMsgbox('Please fill set number with 2 digits');return;
				}
				oCon.ui5DispatchBackEnd("SAPEVT_I418","evt_i418","{i18n>MSG_PROCESS}");
			};
		
		//		
			if(fcode=='i406btnDis'){
				oCon.ui5DispatchBackEnd("SAPEVT_I114","evt_i114","{i18n>MSG_PROCESS}");
			};
		
		//	Material Replacement
			if(fcode=='i406btnList'){
				oCon.ui5DispatchBackEnd("SAPEVT_I115","evt_i115","{i18n>MSG_PROCESS}");
			};

		//	Material Replacement Confirm	
			if(fcode=='i406btnRSave'){
				oCon.getControl('i406DiaRep').close();
				oCon.ui5DispatchBackEnd("SAPEVT_I416","evt_i416","{i18n>MSG_PROCESS}");
			};

		//	
			if(fcode=='i406btnTEdit'){
				oCon.getControl('i406InpTCharg2').setVisible(true)
			};
		
	},
	
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){
		
	//	List Confirmation - In
		if(fcode=="SAPEVT_I403"){
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i101TblAuf','aufnr'),
			    "ivornr" 	: oCon.getProperty('i102lstVornr','vornr'),
			};
		};
	
	//	Confirmation Screen	
		if(fcode=="SAPEVT_I404"){ 
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i101TblAuf','aufnr'),
			    "ivornr" 	: oCon.getProperty('i102lstVornr','vornr'),
			    "icnfnr" 	: oCon.getProperty('i403TblCnf','cnfnr'),
			};
		};

	//	Display Component		
		if(fcode=="SAPEVT_I405"){ 
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i403TblCnf','aufnr'),
			    "ivornr" 	: oCon.getProperty('i403TblCnf','vornr'),
			    "icnfnr" 	: oCon.getProperty('i403TblCnf','cnfnr'),
			};
		};
	
	//	Post Confirmation
		if(fcode=="SAPEVT_I406"||fcode=="SAPEVT_I407"){
			return oParameters = { 
				"iaufnr"  : oCon.getProperty('i101TblAuf','aufnr'),
			    "ivornr"  : oCon.getProperty('i102lstVornr','vornr'),
			    "icnfnr"  : oCon.getProperty('i403TblCnf','cnfnr'),
				"iyield"  : oCon.getControl('i404InpYield').getValue(),
				"imeins"  : oCon.getControl('i404InpMeins').getValue(),
				"iisdd"   : oCon.getControl('i404InpSDate').getValue(),
				"iisdz"   : oCon.getControl('i404InpSTime').getValue(),
				"iiedd"   : oCon.getControl('i404InpFDate').getValue(),
				"iiedz"   : oCon.getControl('i404InpFTime').getValue(),
				"ianzma"  : oCon.getControl('i404InpAnzma').getValue(),
				"imenge1" : oCon.getControl('i404InpLaborQ').getValue(),
				"imeins1" : oCon.getControl('i404InpLaborU').getValue(),
				"imenge2" : oCon.getControl('i404InpMech1Q').getValue(),
				"imeins2" : oCon.getControl('i404InpMech1U').getValue(),
				"imenge3" : oCon.getControl('i404InpMech1Q').getValue(),
				"imeins3" : oCon.getControl('i404InpMech1U').getValue(),
			};
		};
	
	//	Edit confirm in	
		if(fcode=="SAPEVT_I408"){ 
			return oParameters = { 
			    "icnfnr" 	: oCon.getProperty('i403TblCnf','cnfnr'),
			};
		};
	
	//	Confirm component
		if(fcode=='SAPEVT_I409'){
			return oParameters = { 
				"icnfnr" 	: oCon.getProperty('i403TblCnf','cnfnr'),
				"imatnr" 	: oCon.getControl('i406inpMatnr').getValue(),
				"icharg" 	: oCon.getControl('i406inpCharg').getValue(),
				"imenge" 	: oCon.getControl('i406inpMenge').getValue(),
				"imeins" 	: oCon.getControl('i406inpMeins').getValue(),
			};
		};
		
	//	List Batch
		if(fcode=='SAPEVT_I410'){
			return oParameters = { 
				"imatnr" 	: oCon.getControl('i406inpMatnr').getValue(),
				"imenge" 	: oCon.getControl('i406inpMenge_rkg').getValue(),
				"imeins" 	: oCon.getControl('i406inpMeins_kg').getValue(),
			};
		};
		
	//	Confirm Select Batch
		if(fcode=='SAPEVT_I411'){
			return oParameters = { 
				"icnfnr" 	: oCon.getProperty('i403TblCnf','cnfnr'),
				"imatnr" 	: oCon.getControl('i406inpMatnr').getValue(),
				"matnr_in" 	: oCon.arrListItems('i406TblMeat','matnr_in'),
				"charg" 	: oCon.arrListItems('i406TblMeat','charg'),
				"menge_ikg" : oCon.arrListItems('i406TblMeat','menge_ikg'),
				"meins_kg" 	: oCon.arrListItems('i406TblMeat','meins_kg'),
			};
		};
	
	//	Save Confirm - in
		if(fcode=='SAPEVT_I412'){
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i101TblAuf','aufnr'),
			    "ivornr" 	: oCon.getProperty('i102lstVornr','vornr'),
				"icnfnr" 	: oCon.getProperty('i403TblCnf','cnfnr'),
				"iarbpl" 	: oCon.getControl('i406InpTTumbl').getSelectedKey(),
				"icharg" 	: oCon.getControl('i406InpTCharg').getValue(),
				"iisdd" 	: oCon.getControl('i406InpTDate').getValue(),
				"iisdz" 	: oCon.getControl('i406InpTTime').getValue(),
				"iaprio" 	: oCon.getControl('i406InpTAprio').getValue(),
				"ijuldat" 	: oCon.getControl('i406InpTJuldat').getValue(),
			};
		};

	//	Edit header confirm in
		if(fcode=="SAPEVT_I413"){ 
			return oParameters = { 
			    "icnfnr" 	: oCon.getProperty('i403TblCnf','cnfnr'),
			};
		};

	//	Component & Batch
		if(fcode=="SAPEVT_I414"){ 
			return oParameters = { 
			    "icnfnr" 	: oCon.getProperty('i403TblCnf','cnfnr'),
			};
		};

	//	Material Replacement
		if(fcode=='SAPEVT_I415'){
			return oParameters = { 
				"imatnr" 	: oCon.getControl('i406inpMatnr').getValue(),
				"imenge" 	: oCon.getControl('i406inpMenge_rkg').getValue(),
				"imeins" 	: oCon.getControl('i406inpMeins_kg').getValue(),
			};
		};

	//	Material Replacement Confirm	
		if(fcode=='SAPEVT_I416'){
			return oParameters = { 
				"icnfnr" 	: oCon.getProperty('i403TblCnf','cnfnr'),
				"imatnr" 	: oCon.getControl('i406inpMatnr').getValue(),
				"matnr_in" 	: oCon.arrListItems('i406TblRep','matnr_in'),
				"charg" 	: oCon.arrListItems('i406TblRep','charg'),
				"menge_ikg" : oCon.arrListItems('i406TblRep','menge_ikg'),
				"meins_kg" 	: oCon.arrListItems('i406TblRep','meins_kg'),
			};
		};
		
	//	Scan QR Data (auto matching component)
		if(fcode=='SAPEVT_I417'){
			return oParameters = { 
				"isets"		: oCTX.oData.seta,
				"iaufnr" 	: oCon.getProperty('i101TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i102lstVornr','vornr'),
				"imatnr" 	: oCTX.oData.matnr,
				"icharg" 	: oCTX.oData.charg,
				"imenge" 	: oCTX.oData.menge,
				"imeins" 	: oCTX.oData.meins,
			};
		};
	
	//	Get confirmation text
		if(fcode=='SAPEVT_I418'){
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i101TblAuf','aufnr'),
				"iaprio" 	: oCon.getControl('i406InpTAprio').getValue(),
				"ijuldat" 	: oCon.getControl('i406InpTJuldat').getValue(),
				"itext" 	: oCon.getControl('i406InpTCharg2').getValue(),	
			};
		};

	},
	
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){
		
	//	List Confirmation - In		
		if(fcode=='SAPEVT_I403'){
			oCon.getControl('i403TblCnf').setModel(oModela);
			oCon.getControl('i403TblCnf').setHeaderText(oCon.getFieldValue('i101TblAuf',['matnr_fg','maktx_fg']));
		};

	//	Confirmation Screen	
		if((fcode=='SAPEVT_I404')||(fcode=='SAPEVT_I407')){ 
			oCon.getControl('i404InpAufnr').setModel(oModela);
			oCon.getControl('i404InpMatnr').setModel(oModela);
			oCon.getControl('i404InpMaktx').setModel(oModela);
			oCon.getControl('i404InpCharg').setModel(oModela);
			oCon.getControl('i404InVornr').setModel(oModela);
			oCon.getControl('i404Bezei').setModel(oModela);
			if(fcode=='SAPEVT_I404'){
				oCon.getControl('i404InpSDate').setModel(oModela);
				oCon.getControl('i404InpSTime').setModel(oModela);
			};
			oCon.getControl('i404InpMeins').setModel(oModela);
			oCon.getControl('i404InpLaborQ').setModel(oModela);
			oCon.getControl('i404InpLaborU').setModel(oModela);
			oCon.getControl('i404InpMech1Q').setModel(oModela);
			oCon.getControl('i404InpMech1U').setModel(oModela);
			oCon.getControl('i404InpMech2Q').setModel(oModela);
			oCon.getControl('i404InpMech2U').setModel(oModela);
		};

	//	Display Component		
		if(fcode=='SAPEVT_I405'){ 
			oCon.getControl('i405TblBat').setModel(oModela);
		};
		
	//	Post Confirmation		
		if(fcode=='SAPEVT_I406'){ 
			if(oModela.oData.logon.typ=='S'){
				oCon.popMsgbox(oModela.oData.logon.msg);
				oCon.getControl('i101TblAuf').setModel(oModela);
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};

	//	Edit Confirm-in
		if(fcode=='SAPEVT_I408'){ 
			oCon.getControl('i406TblIng').setModel(oModela);
			oCon.getControl('i406TblIng').setHeaderText(oCon.getFieldValue('i403TblCnf',['matnr_fg','maktx_fg']));
		};
		
	//	Confirm component
		if(fcode=='SAPEVT_I409'){ 
			oCon.getControl('i406TblIng').setModel(oModela);
		};

	//	List Batch
		if(fcode=='SAPEVT_I410'){ 
			oCon.getControl('i406TblMeat').setModel(oModela);
		};

	//	Save Confirm (RAW Meat)
		if(fcode=='SAPEVT_I411'&&oModela.oData.logon.typ!='E'){ 
			oCon.getControl('i406TblIng').setModel(oModela);
		};

	//	List Confirmation - In
		if(fcode=='SAPEVT_I412'&&oModela.oData.logon.typ!='E'){
			oCon.getControl('i403TblCnf').setModel(oModela);
		};

	//	Edit Header Confirm-in
		if(fcode=='SAPEVT_I413'){ 
			oCon.getControl('i406InpTCharg').setModel(oModela);
			oCon.getControl('i406InpTTumbl').setModel(oModela);
			
			oCon.getControl('i406InpTDate').setValue(oModela.oData.head.isdd);
			oCon.getControl('i406InpTTime').setValue(oModela.oData.head.isdz);
			
			oCon.getControl('i406InpTJuldat').setValue(oModela.oData.head.juldat);
			oCon.getControl('i406InpTAprio').setValue(oModela.oData.head.aprio);
			
		};
	
	//	Component & Batch
		if(fcode=='SAPEVT_I414'){ 
			oCon.getControl('i407TblBat').setModel(oModela);
			oCon.getControl('i407TblBat').setHeaderText(oCon.getFieldValue('i403TblCnf',['matnr_fg','maktx_fg']));
		};
		
	//	Mat Replacement
		if(fcode=='SAPEVT_I415'&&oModela.oData.logon.typ!='E'){ 
			oCon.getControl('i406TblRep').setModel(oModela);
			oCon.getControl('i406DiaRep').open();
		};

	//	Save Confirm (Replacement)
		if(fcode=='SAPEVT_I416'&&oModela.oData.logon.typ!='E'){ 
			oCon.getControl('i406TblIng').setModel(oModela);
		};

	//	Scan QR Data (auto matching component)
		if(fcode=='SAPEVT_I417'&&oModela.oData.logon.typ!='E'){
			oCon.getControl('i406TblIng').setModel(oModela);
		};
		
	//	Refresh confirmation text
		if(fcode=='SAPEVT_I418'){ 
			oCon.getControl('i406InpTCharg').setModel(oModela);
		};

	},
	
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	
	M04_DYN: function(fcode,oModela){

	// 	List Confirmation - In (Sort by CHARG)		
		if(fcode=='SAPEVT_I403'){ 
			oCon.sortTable('i403TblCnf','charg')		
		};

	//	Confirmation Screen
		if(fcode=='SAPEVT_I404'){
			oCon.getControl('i404InpYield').setValue();
			oCon.getControl('i404InpAnzma').setValue();
			oCon.getControl('i404InpFDate').setValue(oCon.getDateIn());
			oCon.getControl('i404InpFTime').setValue(oCon.getTime());
		};

	//	RAW Meat
		if(fcode=='SAPEVT_I410'&&oModela.oData.logon.typ!='E'){ 
			oCon.getControl('i406lblMengeRkg').setText('Req Qty: '+ 
					   									oCon.getControl('i406inpMenge_rkg').getValue() + ' ' +
					   									oCon.getControl('i406inpMeins_kg').getValue());
			oCon.getControl('i406DiaQr').close();
			oCon.getControl('i406DiaMeat').open();
		};
		
	//	Save Confirm
		if(fcode=='SAPEVT_I411'&&oModela.oData.logon.typ!='E'){
			oCon.getControl('i406DiaMeat').close();
		};

	//	Scan component Success
		if(fcode=='SAPEVT_I409'&&oModela.oData.logon.typ!='E'){ 
			oCon.getControl('i406inpCharg').setValue();
			oCon.getControl('i406inpMenge').setValue();
			oCon.getControl('i406inpMeins').setValue();
		};

	// 	Set visible of i406btnTEdit
		if(fcode=='SAPEVT_I413'){ 
			oCon.getControl('i406btnTEdit').setVisible(false)			
		};

	},
	
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="SAPEVT_I404")    {app.to('I404','slide');};
		if(fcode=="SAPEVT_I405")    {app.to('I405','slide');};
		if(fcode=="SAPEVT_I406")    {app.to('I101','slide');};
		if(fcode=="SAPEVT_I408")    {app.to('I406','slide');};
		if(fcode=="SAPEVT_I412")    {app.to('I403','slide');};
		if(fcode=="SAPEVT_I414")    {app.to('I407','slide');};
		
		if(fcode=='i403btnBck')		{app.to('I102','slide');};
		if(fcode=='i404btnBck')		{app.to('I403','slide');};
		if(fcode=='i405btnBck')		{app.to('I404','slide');};
		if(fcode=='i406btnBck')		{app.to('I403','slide');};
		if(fcode=='i407btnBck')		{app.to('I406','slide');};

	},
	
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	
	M06_NEX: function(fcode,oModela){
		
	},
	
});