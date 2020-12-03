sap.ui.controller("zui5sd00e04.proc.I000", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- I001		
		if(fcode=='i001TblAuf'){ // Select Process Order
			if(!oCon.isSelected('i001TblAuf')){return;};
			oCon.getControl('i002inpWIP').setValue()																		// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
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
			
			// Set visible of button 'Choose Batch'																			// ++ 2018.08.02 :: Input Confirm V1.2
			if (oCon.getProperty('i002TblIng','state') != 1) { oCon.getControl('i002btnBat').setVisible(false); } 
				else { oCon.getControl('i002btnBat').setVisible(true);}
			
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
			oCTX.oData.qrcod = oModel.oData.qrcod;																			// ++ 2018.01.19 :: Input Confirm V1.0 :: Prevent scanning confirmed sticker.
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
			oCon.getControl('i002inpQrcod').setValue(oModel.oData.qrcod);													// ++ 2018.01.19 :: Input Confirm V1.0 :: Prevent scanning confirmed sticker.
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
			oCon.getControl('i002btnTEdit').setVisible(false)																// ++ 2018.10.04 :: Input Confirm V1.2.2 :: set default visible 'i002btnTEdit' = false
			oCon.getControl('i002InpTCharg2').setVisible(false)																// ++ 2018.10.04 :: Input Confirm V1.2.2 :: set default visible 'i002InpTCharg2' = false
			oCon.getControl('i002InpTCharg2').setValue()																	// ++ 2018.10.04 :: Input Confirm V1.2.2 :: set default value 'i002InpTCharg2' = blank
			oCon.getControl('i002DiaCnf').open();
		};
		if(fcode=='i002btnTSave'){ //Confirm Save
			oCon.getControl('i002DiaCnf').close();
			oCon.ui5DispatchBackEnd("SAPEVT_I006","evt_i006","{i18n>MSG_PROCESS}");
		};
		if(fcode=='i002btnTRfh'){//Refresh Tumbling Batch
			//if (oCon.getControl('i002InpTCharg2').getValue().length > 2) {												// ++ 2018.10.04 :: Input Confirm V1.2.2 :: check digit of changed set no.
			//	oCon.popMsgbox('Please fill set number with 2 digits');return;												// -- 2018.12.07 :: Input Confirm - PREP V1.0.1 [Unchecked digit] 
			//}
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
		
		if(fcode=='i002btnTEdit'){																							// ++ 2018.10.04 :: Input Confirm V1.2.2 :: set visible 'i002InpTCharg2' when press 'i002btnTEdit'
			oCon.getControl('i002InpTCharg2').setValue(oCon.getControl('i002InpTCharg').getValue().substring(6))			// ++ 2018.12.07 :: Input Confirm - PREP V1.0.1
			oCon.getControl('i002InpTCharg2').setVisible(true)
		};
		
		//----------------------------------------------------------- I005
		if(fcode=='i005lstVornr'){ // Select Phase
			
			oCon.getControl('i005inpOrder').setValue();
			if(oCon.getProperty('i005lstVornr','vornr')=='0099' || 
					oCon.getProperty('i005lstVornr','vornr')=='0049' || 	
					oCon.getProperty('i005lstVornr','vornr')=='0019' || 													// ++ 2018.07.02 :: [ T E M P O R A R Y !! ] Wang Noi
					oCon.getProperty('i005lstVornr','vornr')=='0029' ||  													// Add phase 0039, 0059, 0059			   
					oCon.getProperty('i005lstVornr','vornr')=='0039' || 	
					oCon.getProperty('i005lstVornr','vornr')=='0059' ||  		   
					oCon.getProperty('i005lstVornr','vornr')=='0069'){ 
				oCon.ui5DispatchBackEnd("SAPEVT_I014","evt_i014","{i18n>MSG_PROCESS}");										// ++ 2018.11.05 :: Input Confirm - PREP V1.0.0
				// oCon.getControl('i005DiaEdt').open();																	// -- 2018.11.05 :: Input Confirm - PREP V1.0.0
			} else if (oCon.getProperty('i005lstVornr','vornr')=='0399' ||
							oCon.getProperty('i005lstVornr','vornr')=='0410' ||
							oCon.getProperty('i005lstVornr','vornr')=='0420' ||
							oCon.getProperty('i005lstVornr','vornr')=='0499') {													
				oCon.ui5DispatchBackEnd("SAPEVT_I314","evt_i314","{i18n>MSG_PROCESS}");
			} else{
				oCon.ui5DispatchBackEnd("SAPEVT_I003_1","evt_i003_1","{i18n>MSG_PROCESS}");									// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
				// oCon.ui5DispatchBackEnd("SAPEVT_I003","evt_i003","{i18n>MSG_PROCESS}");									// -- 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
			}
			
		};
		
		if(fcode=='i005btnAcp'){
			oCon.getControl('i005DiaEdt').close();
			oCon.ui5DispatchBackEnd("SAPEVT_I003_1","evt_i003_1","{i18n>MSG_PROCESS}");										// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
			//oCon.ui5DispatchBackEnd("SAPEVT_I003","evt_i003","{i18n>MSG_PROCESS}");										// -- 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
		}; 
		
		if(fcode=='i005btnWIPClose'){																						// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
			oCon.getControl('i005DiaWIP').close();
		}; 
		
		if(fcode=='i005lstWIP'){																							// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
			oCon.getControl('i002inpWIP').setValue(oCon.getProperty('i005lstWIP','matnr_in'))
			oCon.ui5DispatchBackEnd("SAPEVT_I003_2","evt_i003_2","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- I006 													// ++ 2018.11.05 :: Input Confirm - PREP V1.0.0
		if(fcode=='i006TblCnf'){
			oCon.getControl('i005inpOrder').setValue();
			oCon.ui5DispatchBackEnd("SAPEVT_I015","evt_i015","{i18n>MSG_PROCESS}");
		}; 													

		if(fcode=='i006btnAdd'){
			oCon.getControl('i005DiaEdt').open();
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
		
		if(fcode=="SAPEVT_I003_1"){ // List WIP 																			// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
			return oParameters = { 
				"isets"		: oCon.getControl('i005inpOrder').getValue(),
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
			    "ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
			};
		};
		
		if(fcode=="SAPEVT_I003_2"){ // List component of WIP 																// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
			return oParameters = { 
				"isets"		: oCon.getControl('i005inpOrder').getValue(),
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
				"imatnr" 	: oCon.getProperty('i005lstWIP','matnr_in'),
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
				"iqrcod" 	: oCon.getControl('i002inpQrcod').getValue(),													// ++ 2018.01.19 :: Input Confirm V1.0 :: Prevent scanning confirmed sticker.
			};
		};
		
		if(fcode=='SAPEVT_I005'){//Display Actual Component & Batch
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),
			};
		};
		
		if(fcode=='SAPEVT_I006'){//Save Confirm
			
			if (oCon.getControl('i005inpOrder').getValue() == "") { 														// ++ 2018.11.06 :: Input Confirm- PREP V1.0.0
				oCTX.oData.cnfnr = oCon.getProperty('i006TblCnf','cnfnr') 													// Check new set or current set for Add sendingField 'cnfnr' in case current set
			} else { oCTX.oData.cnfnr = "" }
			
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
				"imatnr" 	: oCon.getControl('i002inpWIP').getValue(),														// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
				"icnfnr" 	: oCTX.oData.cnfnr,																				// ++ 2018.11.06 :: Input Confirm- PREP V1.0.0
				"iltxa1" 	: oCon.getControl('i002InpTCharg').getValue()													// ++ 2018.12.07 :: Input Confirm- PREP V1.0.1
			};
		};
		
		if(fcode=='SAPEVT_I007'||fcode=='SAPEVT_I013'){//Get Tumbling Batch
			
			if (oCon.getControl('i005inpOrder').getValue() == "") { 														// ++ 2018.11.06 :: Input Confirm- PREP V1.0.0
				oCTX.oData.cnfnr = oCon.getProperty('i006TblCnf','cnfnr') 													// Check new set or current set for Add sendingField 'cnfnr' in case current set
			} else { oCTX.oData.cnfnr = "" }
			
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"iaprio" 	: oCon.getControl('i002InpTAprio').getValue(),
				"ijuldat" 	: oCon.getControl('i002InpTJuldat').getValue(),
				"imatnr" 	: oCon.getControl('i002inpWIP').getValue(),														// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
				"itext" 	: oCon.getControl('i002InpTCharg2').getValue(),													// ++ 2018.10.04 :: Input Confirm V1.2.2 :: Add sendingField 'itext'
				"icnfnr" 	: oCTX.oData.cnfnr																				// ++ 2018.11.06 :: Input Confirm- PREP V1.0.0 :: Add sendingField 'cnfnr'
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
				"iqrcod" 	: oCTX.oData.qrcod,																				// ++ 2018.01.19 :: Input Confirm V1.0 :: Prevent scanning confirmed sticker.
			};
		};
		
		if(fcode=='SAPEVT_I014'){//List remaining set																		// ++ 2018.11.05 :: Input Confirm - PREP V1.0.0
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i001TblAuf','aufnr'),
				"ivornr" 	: oCon.getProperty('i005lstVornr','vornr'),											
			};
		};
		
		if(fcode=='SAPEVT_I015'){//List actual scan																			// ++ 2018.11.05 :: Input Confirm - PREP V1.0.0
			return oParameters = { 
				"icnfnr" 	: oCon.getProperty('i006TblCnf','cnfnr'),									
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
			oCon.getControl('i002TblIng').setHeaderText(
				oCon.getFieldValue('i001TblAuf',['matnr_fg','maktx_fg'])
			);
		};
		
		if(fcode=='SAPEVT_I003_1'){ 																						// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
			if (oModela.oData.t_i_pciwip.length > 0) {
				oCon.getControl('i005lstWIP').setModel(oModela);  	
				oCon.getControl('i005DiaWIP').open();	 
			} else {
				oCon.getControl('i002TblIng').setModel(oModela);
				oCon.getControl('i002TblIng').setHeaderText(
					oCon.getFieldValue('i001TblAuf',['matnr_fg','maktx_fg'])
				);
				app.to('I002','slide')
			}
		};
		
		if(fcode=='SAPEVT_I003_2'){ 																						// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
			oCon.getControl('i005DiaWIP').close();				
			oCon.getControl('i002TblIng').setModel(oModela);
			oCon.getControl('i002TblIng').setHeaderText(oCon.getFieldValue('i001TblAuf',['matnr_fg','maktx_fg']));
		};		
		
		if(fcode=='SAPEVT_I004'){ //Confirm component
			if (oModela.oData.logon.typ!='E') {
				oCon.getControl('i002TblIng').setModel(oModela);
			} else {
				oCon.getControl('i002inpCharg').setValue(); 																// ++ 2018.01.19 
				oCon.getControl('i002inpMenge').setValue(); 																//    ==========
				oCon.getControl('i002inpMeins').setValue(); 																//    If scanning used sticker
				oCon.getControl('i002inpQrcod').setValue();																	//	  Not binding data from sticker into text box
			}
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
			
			// Set Start date & Start time as current date & time of selected confirmation									// ++ 2018.11.06 :: Input Confirm - PREP V1.0.0
			if (oModela.oData.head.isdd != "00000000" && oModela.oData.head.isdz != "000000") {
				oCon.getControl('i002InpTDate').setValue(oModela.oData.head.isdd);
				oCon.getControl('i002InpTTime').setValue(oModela.oData.head.isdz);
			};
			
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
		
		if(fcode=='SAPEVT_I014'){ //List remaining set																		// ++ 2018.11.05 :: Input Confirm - PREP V1.0.0
			if (oModela.oData.t_i_pcicnf.length > 0) {
				oCon.getControl('i006TblCnf').setModel(oModela); 
				oCon.getControl('i006TblCnf').setHeaderText(oCon.getFieldValue('i001TblAuf',['matnr_fg','maktx_fg']));
				app.to('I006','slide');
			} else {
				oCon.getControl('i005DiaEdt').open();
			}
		};
		
		if(fcode=='SAPEVT_I015'){ //List component with actual																// ++ 2018.11.05 :: Input Confirm - PREP V1.0.0
			oCon.getControl('i002TblIng').setModel(oModela);
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		if(fcode=='SAPEVT_I003'){ //Focust QR Field											
			oCon.getFocus('i002inpQr');															
		};
		
		if(fcode=='SAPEVT_I003_2'){ //Focust QR Field																		// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
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
		
		if(fcode=='SAPEVT_I007'){ // Set visible of i002btnTEdit															// ++ 2018.10.04 :: Input Confirm V1.2.2
			if (oModela.oData.head.state == 'X') { oCon.getControl('i002btnTEdit').setVisible(true) }
				else { oCon.getControl('i002btnTEdit').setVisible(false) }
		};
		
		if(fcode=='SAPEVT_I014'){ //List remaining set	(Sort by CHARG)														// ++ 2018.11.05 :: Input Confirm - PREP V1.0.0
			oCon.sortTable('i006TblCnf','charg')
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
		if(fcode=="SAPEVT_I003_2")    {app.to('I002','slide');};															// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
		if(fcode=="SAPEVT_I005")    {app.to('I003','slide');};
		if(fcode=="SAPEVT_I006")    {app.to('I001','slide');};
		if(fcode=="SAPEVT_I015")    {app.to('I002','slide');};																// ++ 2018.11.05 :: Input Confirm - PREP V1.0.0
		if(fcode=="SAPEVT_I314")    {app.to('I306','slide');};																// ++ 2018.11.12 :: Input Confirm - COOK V1.0.0
		
		if(fcode=='i001btnBck')		{oCon.nav_home();};
		if(fcode=='i005btnBck')		{app.to('I001','slide');};
		if(fcode=='i002btnBck')		{app.to('I005','slide');};
		if(fcode=='i003btnBck')		{app.to('I002','slide');};
		if(fcode=='i006btnBck')		{app.to('I005','slide');};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
});