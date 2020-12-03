sap.ui.controller("zui5sd00e04.proc.I100", {
	
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- I101		
		if(fcode=='i101TblAuf'){ // Select Process Order
			if(!oCon.isSelected('i101TblAuf')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_I102","evt_i102","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- I102
		if(fcode=='i102lstVornr'){ // Select Phase
			
			// Consider phase for call different event of each phase									// ++ 2018.11.07 :: Output Confirm - PREP V1.0.0
			if(oCon.getProperty('i102lstVornr','vornr')=='0099' ||
					oCon.getProperty('i102lstVornr','vornr')=='0049' ||
					oCon.getProperty('i102lstVornr','vornr')=='0019' ||
					oCon.getProperty('i102lstVornr','vornr')=='0029' ||
					oCon.getProperty('i102lstVornr','vornr')=='0039' ||
					oCon.getProperty('i102lstVornr','vornr')=='0059' ||
					oCon.getProperty('i102lstVornr','vornr')=='0069'){ 
				oCon.ui5DispatchBackEnd("SAPEVT_I103","evt_i103","{i18n>MSG_PROCESS}");				
			} else if (oCon.getProperty('i102lstVornr','vornr')=='0399' ||
							oCon.getProperty('i102lstVornr','vornr')=='0410' ||
							oCon.getProperty('i102lstVornr','vornr')=='0420' ||
							oCon.getProperty('i102lstVornr','vornr')=='0499') {
				oCon.ui5DispatchBackEnd("SAPEVT_I403","evt_i403","{i18n>MSG_PROCESS}");
			} else{
				oCon.ui5DispatchBackEnd("SAPEVT_I103","evt_i103","{i18n>MSG_PROCESS}");
			}
			
		};
		
		//----------------------------------------------------------- I103
		if(fcode=='i103TblCnf'){ // Select Confirmation-in
			if(!oCon.isSelected('i103TblCnf')){return;};
			
			if(oCon.getProperty('i103TblCnf','kosta')=='C'){
				//Confirm-in is complete, go to confirm-out
				oCon.ui5DispatchBackEnd("SAPEVT_I104","evt_i104","{i18n>MSG_PROCESS}");
			}else{
				oCon.getControl('i106TblIng').setHeaderText(oFmt.fmtAlpha(oCon.getProperty('i103TblCnf','cnfnr')));
				oCon.ui5DispatchBackEnd("SAPEVT_I108","evt_i108","{i18n>MSG_PROCESS}");
			};
		};
		
		//----------------------------------------------------------- I104
		if(fcode=='i104btnDis'){//Display Component
			oCon.ui5DispatchBackEnd("SAPEVT_I105","evt_i105","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i104btnSav'){//Save Confirm
			oCon.popConfirm('Do you want to save?','i104btnSav_ok','i104btnSav_no')
		};
		
		if(fcode=='i104btnSav_ok'){//Confirm Save
			oCon.ui5DispatchBackEnd("SAPEVT_I106","evt_i106","{i18n>MSG_PROCESS}");
		};
		
		if((fcode=='i104btnRfh')||(fcode=='i104InpYield')){//Refresh Yield
			oCon.ui5DispatchBackEnd("SAPEVT_I107","evt_i107","{i18n>MSG_PROCESS}");
		};
	
		//----------------------------------------------------------- I106
		if(fcode=='i106TblIng'){ // Scan input dialog
			oCon.getControl('i106inpMatnr').setValue(oCon.getProperty('i106TblIng','matnr_in'));
			oCon.getControl('i106inpMenge_rkg').setValue(oCon.getProperty('i106TblIng','menge_rkg'));
			oCon.getControl('i106inpMeins_kg').setValue(oCon.getProperty('i106TblIng','meins_kg'));
			
			
			oCon.getControl('i106inpMatnrTx').setValue(oCon.getFieldValue('i106TblIng',['matnr_in','maktx_in']));
			oCon.getControl('i106InpQrData').setValue();
			oCon.getControl('i106inpCharg').setValue();
			oCon.getControl('i106inpMenge').setValue();
			oCon.getControl('i106inpMeins').setValue();
			
			// Set visible of button 'Choose Batch'														// ++ 2018.08.02 :: Output Confirm V1.2			
			if (oCon.getProperty('i106TblIng','state') != 1) { 
				oCon.getControl('i106btnBat').setVisible(false); 
			} else { 
				oCon.getControl('i106btnBat').setVisible(true);
			}
			
			oCon.getControl('i106DiaQr').open();
			oCon.getFocus('i106InpQrData');
		};
		if(fcode=='i106inpQr'){//Scan QR Data (auto matching component)
			var oModel = oCon.getQrData(oCon.getControl('i106inpQr').getValue());
			oCTX.oData.matnr = oModel.oData.matnr;
			oCTX.oData.charg = oModel.oData.charg;
			oCTX.oData.seta  = oModel.oData.seta;
			oCTX.oData.menge = oModel.oData.menge;
			oCTX.oData.meins = oModel.oData.meins;
			oCon.getControl('i106inpQr').setValue();
			oCon.ui5DispatchBackEnd("SAPEVT_I117","evt_i117","{i18n>MSG_PROCESS}");
		};
		if(fcode=='i106btnCam'){ // Scan with Camera
			oCon.scanCam('i106InpQrData','i106InpQrData');
		};
		
		if(fcode=='i106InpQrData'){ // Enter QR data
			var oModel  = oCon.getQrData(oCon.getControl('i106InpQrData').getValue());

			oCon.getControl('i106InpQrData').setValue();
			if(oModel.oData.matnr!=oCon.getControl('i106inpMatnr').getValue()){
				oCon.popMsgbox('Component ' + oModel.oData.matnr + ' not valid');return;
			};
			oCon.getControl('i106inpCharg').setValue(oModel.oData.charg);
			oCon.getControl('i106inpMenge').setValue(oModel.oData.menge);
			oCon.getControl('i106inpMeins').setValue(oModel.oData.meins);
			oCon.ui5DispatchBackEnd("SAPEVT_I109","evt_i109","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i106btnQrAcp'){ // Commit Scan Dialog
			//oCon.getControl('i106DiaQr').close();
			oCon.ui5DispatchBackEnd("SAPEVT_I109","evt_i109","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i106btnBat'){//Select Batch
			oCon.ui5DispatchBackEnd("SAPEVT_I110","evt_i110","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i106btnMSave'){//Confirm selected batch
			oCon.ui5DispatchBackEnd("SAPEVT_I111","evt_i111","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i106btnCnf'){ //Confirm Save Confirm - in ?
			oCon.getControl('i106btnTEdit').setVisible(false)											// ++ 2018.10.04 :: Output Confirm V1.2.2 :: set default visible 'i106btnTEdit' = false
			oCon.getControl('i106InpTCharg2').setVisible(false)											// ++ 2018.10.04 :: Output Confirm V1.2.2 :: set default visible 'i106InpTCharg2' = false
			oCon.getControl('i106InpTCharg2').setValue()												// ++ 2018.10.04 :: Output Confirm V1.2.2 :: set default value 'i106InpTCharg2' = blank
			oCon.getControl('i106DiaCnf').open();
			oCon.ui5DispatchBackEnd("SAPEVT_I113","evt_i113","{i18n>MSG_PROCESS}");
		};
		if(fcode=='i106btnTSave'){  //Confirm Save Confirm - in Confirm
			oCon.getControl('i106DiaCnf').close();
			oCon.ui5DispatchBackEnd("SAPEVT_I112","evt_i112","{i18n>MSG_PROCESS}");
		};
		if(fcode=='i106btnTRfh'){//Refresh Tumbling Batch
			if (oCon.getControl('i106InpTCharg2').getValue().length > 2) {								// ++ 2018.10.04 :: Output Confirm V1.2.2 :: check digit of changed set no.
				oCon.popMsgbox('Please fill set number with 2 digits');return;
			}
			oCon.ui5DispatchBackEnd("SAPEVT_I118","evt_i118","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i106btnDis'){
			oCon.ui5DispatchBackEnd("SAPEVT_I114","evt_i114","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i106btnList'){//Material Replacement
			oCon.ui5DispatchBackEnd("SAPEVT_I115","evt_i115","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i106btnRSave'){//Material Replacement Confirm
			oCon.getControl('i106DiaRep').close();
			oCon.ui5DispatchBackEnd("SAPEVT_I116","evt_i116","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='i106btnTEdit'){																		// ++ 2018.10.04 :: Output Confirm V1.2.2 :: set visible 'i106InpTCharg2' when press 'i106btnTEdit'
			oCon.getControl('i106InpTCharg2').setVisible(true)
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_I101"){//Production Order List
			return oParameters = { 
				"idate"   : oCon.getControl('i101inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('i101chkShiftD'),
				"iaprion" : oCon.getAbapTrue('i101chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_I102"){ //Process Order - Select From List
			return oParameters = { 
			    "iaufnr" 	: oCon.getProperty('i101TblAuf','aufnr'),
			};
		};
		
		if(fcode=="SAPEVT_I103"){ //List Confirmation - In
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i101TblAuf','aufnr'),
			    "ivornr" 	: oCon.getProperty('i102lstVornr','vornr'),
			};
		};
		
		if(fcode=="SAPEVT_I104"){ //Confirmation Screen
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i103TblCnf','aufnr'),
			    "ivornr" 	: oCon.getProperty('i103TblCnf','vornr'),
			    "icnfnr" 	: oCon.getProperty('i103TblCnf','cnfnr'),
			};
		};
		
		if(fcode=="SAPEVT_I105"){ //Component & Batch
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i103TblCnf','aufnr'),
			    "ivornr" 	: oCon.getProperty('i103TblCnf','vornr'),
			    "icnfnr" 	: oCon.getProperty('i103TblCnf','cnfnr'),
			};
		};
		
		if(fcode=="SAPEVT_I106"||fcode=="SAPEVT_I107"){//Post Confirmation
			return oParameters = { 
				"iaufnr"  : oCon.getProperty('i103TblCnf','aufnr'),
			    "ivornr"  : oCon.getProperty('i103TblCnf','vornr'),
			    "icnfnr"  : oCon.getProperty('i103TblCnf','cnfnr'),
				"iyield"  : oCon.getControl('i104InpYield').getValue(),
				"imeins"  : oCon.getControl('i104InpMeins').getValue(),
				"iisdd"   : oCon.getControl('i104InpSDate').getValue(),
				"iisdz"   : oCon.getControl('i104InpSTime').getValue(),
				"iiedd"   : oCon.getControl('i104InpFDate').getValue(),
				"iiedz"   : oCon.getControl('i104InpFTime').getValue(),
				"ianzma"  : oCon.getControl('i104InpAnzma').getValue(),
				"imenge1" : oCon.getControl('i104InpLaborQ').getValue(),
				"imeins1" : oCon.getControl('i104InpLaborU').getValue(),
				"imenge2" : oCon.getControl('i104InpMech1Q').getValue(),
				"imeins2" : oCon.getControl('i104InpMech1U').getValue(),
				//"imenge3" : oCon.getControl('i104InpMech2Q').getValue(),								// +- 2018.11.07 :: Output Confirm - PREP V1.0.0
				"imenge3" : oCon.getControl('i104InpMech1Q').getValue(),
				//"imeins3" : oCon.getControl('i104InpMech2U').getValue(),								// ++ 2018.11.07 :: Output Confirm - PREP V1.0.0
				"imeins3" : oCon.getControl('i104InpMech1U').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_I108"){ //Edit confirm in
			return oParameters = { 
			    "icnfnr" 	: oCon.getProperty('i103TblCnf','cnfnr'),
			};
		};
		
		if(fcode=='SAPEVT_I109'){//Confirm component
			return oParameters = { 
				"icnfnr" 	: oCon.getProperty('i103TblCnf','cnfnr'),
				"imatnr" 	: oCon.getControl('i106inpMatnr').getValue(),
				"icharg" 	: oCon.getControl('i106inpCharg').getValue(),
				"imenge" 	: oCon.getControl('i106inpMenge').getValue(),
				"imeins" 	: oCon.getControl('i106inpMeins').getValue(),
			};
		};
		
		if(fcode=='SAPEVT_I110'){//List Batch
			return oParameters = { 
				"imatnr" 	: oCon.getControl('i106inpMatnr').getValue(),
				"imenge" 	: oCon.getControl('i106inpMenge_rkg').getValue(),
				"imeins" 	: oCon.getControl('i106inpMeins_kg').getValue(),
			};
		};
		
		if(fcode=='SAPEVT_I111'){//Confirm Select Batch
			return oParameters = { 
				"icnfnr" 	: oCon.getProperty('i103TblCnf','cnfnr'),
				"imatnr" 	: oCon.getControl('i106inpMatnr').getValue(),
				"matnr_in" 	: oCon.arrListItems('i106TblMeat','matnr_in'),
				"charg" 	: oCon.arrListItems('i106TblMeat','charg'),
				"menge_ikg" : oCon.arrListItems('i106TblMeat','menge_ikg'),
				"meins_kg" 	: oCon.arrListItems('i106TblMeat','meins_kg'),
			};
		};
		
		if(fcode=='SAPEVT_I112'){//Save Confirm - in
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i101TblAuf','aufnr'),
			    "ivornr" 	: oCon.getProperty('i102lstVornr','vornr'),
				"icnfnr" 	: oCon.getProperty('i103TblCnf','cnfnr'),
				"iarbpl" 	: oCon.getControl('i106InpTTumbl').getSelectedKey(),
				"icharg" 	: oCon.getControl('i106InpTCharg').getValue(),
				"iisdd" 	: oCon.getControl('i106InpTDate').getValue(),
				"iisdz" 	: oCon.getControl('i106InpTTime').getValue(),
				"iaprio" 	: oCon.getControl('i106InpTAprio').getValue(),
				"ijuldat" 	: oCon.getControl('i106InpTJuldat').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_I113"){ //Edit header confirm in
			return oParameters = { 
			    "icnfnr" 	: oCon.getProperty('i103TblCnf','cnfnr'),
			};
		};
		
		if(fcode=="SAPEVT_I114"){ //Component & Batch
			return oParameters = { 
			    "icnfnr" 	: oCon.getProperty('i103TblCnf','cnfnr'),
			};
		};
		
		if(fcode=='SAPEVT_I115'){//Material Replacement
			return oParameters = { 
				"imatnr" 	: oCon.getControl('i106inpMatnr').getValue(),
				"imenge" 	: oCon.getControl('i106inpMenge_rkg').getValue(),
				"imeins" 	: oCon.getControl('i106inpMeins_kg').getValue(),
			};
		};
		
		if(fcode=='SAPEVT_I116'){//Material Replacement Confirm
			return oParameters = { 
				"icnfnr" 	: oCon.getProperty('i103TblCnf','cnfnr'),
				"imatnr" 	: oCon.getControl('i106inpMatnr').getValue(),
				"matnr_in" 	: oCon.arrListItems('i106TblRep','matnr_in'),
				"charg" 	: oCon.arrListItems('i106TblRep','charg'),
				"menge_ikg" : oCon.arrListItems('i106TblRep','menge_ikg'),
				"meins_kg" 	: oCon.arrListItems('i106TblRep','meins_kg'),
			};
		};
		
		if(fcode=='SAPEVT_I117'){//Scan QR Data (auto matching component)
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
		
		if(fcode=='SAPEVT_I118'){//Get Tumbling Batch
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i101TblAuf','aufnr'),
				"iaprio" 	: oCon.getControl('i106InpTAprio').getValue(),
				"ijuldat" 	: oCon.getControl('i106InpTJuldat').getValue(),
				"itext" 	: oCon.getControl('i106InpTCharg2').getValue(),								// ++ 2018.10.04 :: Output Confirm V1.2.2 :: Add sendingField 'itext'			
			};
		};
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=='SAPEVT_I101'){ //Process Order List
			oCon.getControl('i101TblAuf').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I102'){ //Phase List
			oCon.getControl('i102lstVornr').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I103'){ //List Confirmation - In
			oCon.getControl('i103TblCnf').setModel(oModela);
			oCon.getControl('i103TblCnf').setHeaderText(oCon.getFieldValue('i101TblAuf',['matnr_fg','maktx_fg']));
		};
		
		if((fcode=='SAPEVT_I104')||(fcode=='SAPEVT_I107')){ //Confirmation Screen
			oCon.getControl('i104InpAufnr').setModel(oModela);
			oCon.getControl('i104InpMatnr').setModel(oModela);
			oCon.getControl('i104InpMaktx').setModel(oModela);
			oCon.getControl('i104InpCharg').setModel(oModela);
			oCon.getControl('i104InVornr').setModel(oModela);
			oCon.getControl('i104Bezei').setModel(oModela);
			if(fcode=='SAPEVT_I104'){
				oCon.getControl('i104InpSDate').setModel(oModela);
				oCon.getControl('i104InpSTime').setModel(oModela);
				oCon.getControl('i104InpYield').setModel(oModela);										// ++ 2019.11.01 - I1 V2.0.0
				oCon.getControl('i104InpAnzma').setModel(oModela);										// ++ 2019.11.01 - I1 V2.0.0
				oCon.getControl('i104InpFDate').setModel(oModela);										// ++ 2019.11.01 - I1 V2.0.0
				oCon.getControl('i104InpFTime').setModel(oModela);										// ++ 2019.11.01 - I1 V2.0.0
			};
			//oCon.getControl('i104InpYield').setModel(oModela);
			oCon.getControl('i104InpMeins').setModel(oModela);
			//oCon.getControl('i104InpAnzma').setModel(oModela);
			oCon.getControl('i104InpLaborQ').setModel(oModela);
			oCon.getControl('i104InpLaborU').setModel(oModela);
			oCon.getControl('i104InpMech1Q').setModel(oModela);
			oCon.getControl('i104InpMech1U').setModel(oModela);
			oCon.getControl('i104InpMech2Q').setModel(oModela);
			oCon.getControl('i104InpMech2U').setModel(oModela);
			//oCon.getControl('i104InpFDate').setValue(oCon.getDateIn());
			//oCon.getControl('i104InpFTime').setValue(oCon.getTime());
		};
		
		if(fcode=='SAPEVT_I105'){ //Component & Batch
			oCon.getControl('i105TblBat').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I106'){ //Save Confirm
			if(oModela.oData.logon.typ=='S'){
				oCon.popMsgbox(oModela.oData.logon.msg);
				oCon.getControl('i101TblAuf').setModel(oModela);
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};
		
		if(fcode=='SAPEVT_I108'){ //Edit Confirm-in
			oCon.getControl('i106TblIng').setModel(oModela);
			oCon.getControl('i106TblIng').setHeaderText(oCon.getFieldValue('i103TblCnf',['matnr_fg','maktx_fg']));
		};
		
		if(fcode=='SAPEVT_I109'){ //Confirm component
			oCon.getControl('i106TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I110'){ //List Batch
			oCon.getControl('i106TblMeat').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I111'&&oModela.oData.logon.typ!='E'){ //Save Confirm (RAW Meat)
			oCon.getControl('i106TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I112'&&oModela.oData.logon.typ!='E'){ //List Confirmation - In
			oCon.getControl('i103TblCnf').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I113'){ //Edit Header Confirm-in
			oCon.getControl('i106InpTCharg').setModel(oModela);
			oCon.getControl('i106InpTTumbl').setModel(oModela);
			
			oCon.getControl('i106InpTDate').setValue(oModela.oData.head.isdd);
			oCon.getControl('i106InpTTime').setValue(oModela.oData.head.isdz);
			
			oCon.getControl('i106InpTJuldat').setValue(oModela.oData.head.juldat);
			oCon.getControl('i106InpTAprio').setValue(oModela.oData.head.aprio);
			
		};
		
		if(fcode=='SAPEVT_I114'){ //Component & Batch
			oCon.getControl('i107TblBat').setModel(oModela);
			oCon.getControl('i107TblBat').setHeaderText(oCon.getFieldValue('i103TblCnf',['matnr_fg','maktx_fg']));
		};
		
		if(fcode=='SAPEVT_I115'&&oModela.oData.logon.typ!='E'){ //Mat Replacement
			oCon.getControl('i106TblRep').setModel(oModela);
			oCon.getControl('i106DiaRep').open();
		};
		
		if(fcode=='SAPEVT_I116'&&oModela.oData.logon.typ!='E'){ //Save Confirm (Replacement)
			oCon.getControl('i106TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I117'&&oModela.oData.logon.typ!='E'){//Scan QR Data (auto matching component)
			oCon.getControl('i106TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I118'){ //Refresh Tumbling Batch
			oCon.getControl('i106InpTCharg').setModel(oModela);
		};
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		if((fcode=='SAPEVT_I104')){ //Confirmation Screen
			//oCon.getControl('i104InpYield').setValue();												// -- 2019.11.01 - I1 V2.0.0
			//oCon.getControl('i104InpAnzma').setValue();												// -- 2019.11.01 - I1 V2.0.0
			//oCon.getControl('i104InpFDate').setValue(oCon.getDateIn());								// -- 2019.11.01 - I1 V2.0.0								// -- 2019.11.01 - I1 V2.0.0
			//oCon.getControl('i104InpFTime').setValue(oCon.getTime());									// -- 2019.11.01 - I1 V2.0.0
		};
		
		if(fcode=='SAPEVT_I110'&&oModela.oData.logon.typ!='E'){ //RAW Meat
			oCon.getControl('i106lblMengeRkg').setText('Req Qty: '+ 
					   									oCon.getControl('i106inpMenge_rkg').getValue() + ' ' +
					   									oCon.getControl('i106inpMeins_kg').getValue());
			oCon.getControl('i106DiaQr').close();
			oCon.getControl('i106DiaMeat').open();
		};
		
		if(fcode=='SAPEVT_I111'&&oModela.oData.logon.typ!='E'){ //Save Confirm
			oCon.getControl('i106DiaMeat').close();
		};
		
		if(fcode=='SAPEVT_I109'&&oModela.oData.logon.typ!='E'){ //Scan component Success
			oCon.getControl('i106inpCharg').setValue();
			oCon.getControl('i106inpMenge').setValue();
			oCon.getControl('i106inpMeins').setValue();
		};
		
		if(fcode=='SAPEVT_I113'){ // Set visible of i106btnTEdit 										// ++ 2018.10.04 :: Output Confirm V1.1.2			
			if (oModela.oData.head.state == 'X') { oCon.getControl('i106btnTEdit').setVisible(true) }
				else { oCon.getControl('i106btnTEdit').setVisible(false) }			
		};
		
		if(fcode=='SAPEVT_I103'){ //List Confirmation - In (Sort by CHARG)								// ++ 2018.11.05 :: Output Confirm - PREP V1.0.0
			oCon.sortTable('i103TblCnf','charg')
		};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		
		//I101=>I102=>I103=>I104=>I105=>(Out)
		if(fcode=="SAPEVT_I101")    {app.to('I101','slide');};
		if(fcode=="SAPEVT_I102")    {app.to('I102','slide');};
		if(fcode=="SAPEVT_I103")    {app.to('I103','slide');};
		if(fcode=="SAPEVT_I104")    {app.to('I104','slide');};
		if(fcode=="SAPEVT_I105")    {app.to('I105','slide');};
		if(fcode=="SAPEVT_I106")    {app.to('I101','slide');};
		if(fcode=="SAPEVT_I108")    {app.to('I106','slide');};
		if(fcode=="SAPEVT_I112")    {app.to('I103','slide');};
		if(fcode=="SAPEVT_I114")    {app.to('I107','slide');};
		
		if(fcode=="SAPEVT_I403")    {app.to('I403','slide');};
		
		if(fcode=='i101btnBck')		{oCon.nav_home();};
		if(fcode=='i102btnBck')		{app.to('I101','slide');};
		if(fcode=='i103btnBck')		{app.to('I102','slide');};
		if(fcode=='i104btnBck')		{app.to('I103','slide');};
		if(fcode=='i105btnBck')		{app.to('I104','slide');};
		if(fcode=='i106btnBck')		{app.to('I103','slide');};
		if(fcode=='i107btnBck')		{app.to('I106','slide');};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
	
});