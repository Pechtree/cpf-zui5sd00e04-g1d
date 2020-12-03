sap.ui.controller("zui5sd00e04.proc.D210", {
	
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	
	M01_FCD: function(fcode,oModela){
		
	//	----------------------------------------------------------- D214
		
		// List Sloc
		if(fcode=='d201btnAct'){
			if(!oCon.isSelected('d201TblAuf')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_D214","evt_d214","{i18n>MSG_PROCESS}");
		};
		
	//	----------------------------------------------------------- D215
		
		// Display Ingredient by Total
		if(fcode=='d202btnSum'){ 
			oCon.ui5DispatchBackEnd("SAPEVT_D215","evt_d215","{i18n>MSG_PROCESS}");
		};
		
		// Edit
		if(fcode=='d202TblPmx_edt'){
			oCon.getControl('d202inpOrder').setValue(oCon.getProperty('d202TblPmx','menge_ikg13_6'));						// ++ 2018.12.13 :: TFR-PROD V1.2.1
			//oCon.getControl('d202inpOrder').setValue(oCon.getProperty('d202TblPmx','menge_ikg'));							// -- 2018.12.13 :: TFR-PROD V1.2.1
			oCon.getControl('d202DiaEdt').open();
		};
		
		// Edit - OK
		if(fcode=='d202btnAcp'){
			// Check mode for consider menge_ist format (KG = 3 digit, SET = 6 digit)										// -- 2018.12.13 :: TFR-PROD V1.2.1		// +- 2018.10.16 :: TFR-PROD V1.2.0
			//if (!oCon.getControl('d202InpMode').getValue()) {
			//	oCon.getCell('d202TblPmx',6).setText(oCon.fmtDec(oCon.getControl('d202inpOrder').getValue(),3));				
			//} else {
				oCon.getCell('d202TblPmx',6).setText(oCon.fmtDec(oCon.getControl('d202inpOrder').getValue(),6));
			//};
			oCon.getControl('d202DiaEdt').close();
		};
		
		// Calculate RAW Meat
		if(fcode=='d202btnDis'){
			if(!oCon.isSelected('d202TblPmx')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_D216","evt_d216","{i18n>MSG_PROCESS}");
			oApp.diaMeatEdit_PBO('d202','d202TblPmx','menge_ikg13_6');														// ++ 2018.12.13 :: TFR-PROD V1.2.1
			//oApp.diaMeatEdit_PBO('d202','d202TblPmx','menge_ikg');														// -- 2018.12.13 :: TFR-PROD V1.2.1
		};
		
		// Adjust Raw Meat - OK		
		if(fcode=='d202btnCalOk'){
			//oCon.getCell('d202TblPmx',6).setText(oCon.fmtDec(oCon.getControl('d202inpMenge_ist').getValue(),3));			// +- 2018.10.16 :: TFR-PROD V1.2.0
			oCon.getCell('d202TblPmx',6).setText(oCon.fmtDec(oCon.getControl('d202inpMenge_ist').getValue(),6));			// Change 'd202TblPmx' to 6 digit
			oCon.getControl('d202DiaCal').close();
		};
		
		// RAW Meat Selected
		if(fcode=='d202LstMeat'){ 
			if(!oCon.isSelected('d202LstMeat')){return;};
			oApp.diaMeatEdit_PBO('d202','d202LstMeat','menge_ist13_6');														// ++ 2018.12.13 :: TFR-PROD V1.2.1
			//oApp.diaMeatEdit_PBO('d202','d202LstMeat','menge_ist');														// -- 2018.12.13 :: TFR-PROD V1.2.1
			oCon.getControl('d202DiaCal').open();
			oCon.getControl('d202DiaMeat').close();
		};
		
		// Toggle
		if(fcode=='d202btnTog'){ 
			if(oCon.getControl('d202InpMode').getValue()=='X'){
				oCon.getControl('d202InpMode').setValue();
			}else{
				oCon.getControl('d202InpMode').setValue('X');
			};
			oCon.ui5DispatchBackEnd("SAPEVT_D212","evt_d212","{i18n>MSG_PROCESS}");
		};
		
	//	----------------------------------------------------------- D212
		
		if(fcode=='d203lstLgort'){
			oCon.getControl('d202InpMode').setValue();
			oCon.ui5DispatchBackEnd("SAPEVT_D212","evt_d212","{i18n>MSG_PROCESS}");
		};
		
	//	----------------------------------------------------------- D213
		
		if(fcode=='d204btnSav'){
			// oCon.popConfirm('Do you want to save?','d204btnSav_ok','d204btnSav_no');
			oCon.getControl('d204DiaRemark').open();
		};
		
		if(fcode=='d204btnRmk'){
			oCon.getControl('d204DiaRemark').close();
			oCon.ui5DispatchBackEnd("SAPEVT_D213","evt_d213","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='d204btnAcp'){//Edit - OKs
			oCon.getCell('d204TblPmx',4).setText(oCon.fmtDec(oCon.getControl('d204inpOrder').getValue(),3));
			oCon.getControl('d204DiaEdt').close();
		};
		
	},

	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){
		
	//	Production Order List		
		if(fcode=="SAPEVT_D211"){
			return oParameters = { 
				"idate"   : oCon.getControl('d201inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('d201chkShiftD'),
				"iaprion" : oCon.getAbapTrue('d201chkShiftN'),
			};
		};
	
	//	List Ingredient for Create	
		if(fcode=="SAPEVT_D212"){ 
			return oParameters = {
				"imodeset": oCon.getControl('d202InpMode').getValue(),
				"ilgortf" : oCon.getProperty('d203lstLgort','lgort'), 
				"aufnr"   : oCon.arrListSelected('d201TblAuf','aufnr'),};
		};
	
	// 	Save create Transfer order		
		if(fcode=="SAPEVT_D213"){ 
			return oParameters = {
				"iremark" 	: oCon.getControl('d204inpRemark').getValue(),
				"idate" 	: oCon.getControl('d201inpDate').getValue(),
				"iapriod"   : oCon.getAbapTrue('d201chkShiftD'),
				"iaprion"   : oCon.getAbapTrue('d201chkShiftN'),
				"ilgortf"   : oCon.getProperty('d203lstLgort','lgort'), 
				"matnr_in"  : oCon.arrListItemsNoBlank('d204TblPmx','matnr_in','menge_ikg'), 
				"menge_ikg" : oCon.arrListItemsNoBlank('d204TblPmx','menge_ikg','menge_ikg'), 
			};
		};
	
	//	List Ingredient for Create (Total)	
		if(fcode=="SAPEVT_D215"){ 
			return oParameters = { 
				"imodeset"	: oCon.getControl('d202InpMode').getValue(),
				"aufnr"     : oCon.arrListItemsNoBlank('d202TblPmx','aufnr','menge_ikg13_6'),								// ++ 2018.12.13 :: TFR-PROD V1.2.1
				"vornr"     : oCon.arrListItemsNoBlank('d202TblPmx','vornr','menge_ikg13_6'),								// ++ 2018.12.13 :: TFR-PROD V1.2.1
				"matnr_in"  : oCon.arrListItemsNoBlank('d202TblPmx','matnr_in','menge_ikg13_6'), 							// ++ 2018.12.13 :: TFR-PROD V1.2.1
				"menge_ikg" : oCon.arrListItemsNoBlank('d202TblPmx','menge_ikg13_6','menge_ikg13_6'), 						// ++ 2018.12.13 :: TFR-PROD V1.2.1
				//"aufnr"     : oCon.arrListItemsNoBlank('d202TblPmx','aufnr','menge_ikg'),									// -- 2018.12.13 :: TFR-PROD V1.2.1
				//"vornr"     : oCon.arrListItemsNoBlank('d202TblPmx','vornr','menge_ikg'),									// -- 2018.12.13 :: TFR-PROD V1.2.1
				//"matnr_in"  : oCon.arrListItemsNoBlank('d202TblPmx','matnr_in','menge_ikg'), 								// -- 2018.12.13 :: TFR-PROD V1.2.1
				//"menge_ikg" : oCon.arrListItemsNoBlank('d202TblPmx','menge_ikg','menge_ikg'), 							// -- 2018.12.13 :: TFR-PROD V1.2.1
			};
		};
	
	//	Calculate by RAW Meat	
		if(fcode=="SAPEVT_D216"){ 
			return oParameters = { 
				"iaufnr"     : oCon.getProperty('d202TblPmx','aufnr'),
				"imatnr"     : oCon.getProperty('d202TblPmx','matnr_in'),
				"ilgortf"    : oCon.getProperty('d203lstLgort','lgort'), 
				"imenge" 	 : oCon.getProperty('d202TblPmx','menge_ikg13_6'),												// ++ 2018.12.13 :: TFR-PROD V1.2.1
				//"imenge"     : oCon.getProperty('d202TblPmx','menge_ikg'),												// -- 2018.12.13 :: TFR-PROD V1.2.1
			};
		};		
	},
	
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){
		
	//	List Process Order		
		if(fcode=='SAPEVT_D211'){ 
			oCon.getControl('d201TblAuf').setModel(oModela);
		}
	
	//	Create from Process Order
		if(fcode=='SAPEVT_D212'){ 
			oCon.getControl('d202TblPmx').setModel(oModela);
		}
	
	//	Save Transfer Order	
		if(fcode=='SAPEVT_D213'){ 
			if(oCon.popMsgErrSuc(oModela,"S")){
				oCon.getControl('d201TblAuf').setModel(oModela);
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};
	
	//	List Storage
		if(fcode=='SAPEVT_D214'){ 
			oCon.getControl('d203lstLgort').setModel(oModela);
		};
		
	//	List Ingredient for Create (Total)	
		if(fcode=='SAPEVT_D215'){ 
			oCon.getControl('d204TblPmx').setModel(oModela);
		};
	
	//	Calculate RAW Meat
		if(fcode=='SAPEVT_D216'&&oModela.oData.logon.typ!='E'){
			oCon.getControl('d202LstMeat').setModel(oModela);
			oCon.getControl('d202DiaMeat').open();
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		if(fcode=="SAPEVT_D212"){ 
			if(oCon.getControl('d202InpMode').getValue()=='X'){
				oCon.getControl('d202btnDis').setVisible(true);
			}else{
				oCon.getControl('d202btnDis').setVisible(false);
			};
		};
		
//		if(fcode=="SAPEVT_D202"){ 
//			if(oCon.getControl('d202InpMode').getValue()=='X'){
//				oCon.getControl('d202btnDis').setVisible(true);
//			}else{
//				oCon.getControl('d202btnDis').setVisible(false);
//			};
//		};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
				
		if(fcode=="SAPEVT_D211")    {app.to('D201','slide');};
		if(fcode=="SAPEVT_D214")    {app.to('D203','slide');};
		if(fcode=="SAPEVT_D212")    {app.to('D202','slide');};
		if(fcode=="SAPEVT_D213")    {app.to('D201','slide');};
		if(fcode=="SAPEVT_D215")    {app.to('D204','slide');};
		
		if(fcode=='d201btnBck')		{oCon.nav_home();};
		if(fcode=='d202btnBck')		{app.to('D203','slide');};
		if(fcode=='d203btnBck')		{app.to('D201','slide');};
		if(fcode=='d204btnBck')		{app.to('D202','slide');};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
		if(fcode=='SAPEVT_D216'&&oModela.oData.t_c_xoring.length<=1){ //Get RAW Meat
			oCon.getControl('d202DiaCal').open();
			oCon.getControl('d202DiaMeat').close();
		};
	},
});