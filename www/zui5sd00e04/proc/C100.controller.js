sap.ui.controller("zui5sd00e04.proc.C100", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		
		//----------------------------------------------------------- C101		
		if(fcode=='c101btnSav'){ // Save - PREMIX Order from Process Order
			oCon.popConfirm('Do you want to save ?','c101btnSav_ok','c101btnSav_no');
		};
		if(fcode=='c101btnSav_ok'){
			oCon.ui5DispatchBackEnd("SAPEVT_C102","evt_c102","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='c101btnDis'){//Display Raw Meat
			if(!oCon.isSelected('c101TblPmx')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_C106","evt_c106","{i18n>MSG_PROCESS}");
			oApp.diaMeatEdit_PBO('c101','c101TblPmx','menge_ist13_6');														// ++ 2018.12.13 :: Premix Order V1.0.2
			//oApp.diaMeatEdit_PBO('c101','c101TblPmx','menge_ist');														// -- 2018.12.13 :: Premix Order V1.0.2
		};
		
		if(fcode=='c101btnCalOk'){//Adjust Raw Meat - OK
			
			if(!oCon.chkAmt(oCon.getControl('c101inpMenge_ist').getValue())){return;}

			//oCon.getCell('c101TblPmx',6).setText(oCon.fmtDec(oCon.getControl('c101inpMenge_ist').getValue(),3));			// +- 2018.10.16 :: Premix Order V1.0.1
			oCon.getCell('c101TblPmx',6).setText(oCon.fmtDec(oCon.getControl('c101inpMenge_ist').getValue(),6));			// Change 'c101TblPmx' to 6 digit
			oCon.getControl('c101DiaCal').close();
		};
		
		if(fcode=='c101TblPmx_edt'){// Edit
			oCon.getControl('c101inpOrder').setValue(oCon.getProperty('c101TblPmx','menge_ist13_6'));						// ++ 2018.12.13 :: Premix Order V1.0.2
			//oCon.getControl('c101inpOrder').setValue(oCon.getProperty('c101TblPmx','menge_ist'));							// -- 2018.12.13 :: Premix Order V1.0.2
			oCon.getControl('c101DiaEdt').open();			
		};
		
		if(fcode=='c101btnAcp'){//Edit - OK
			//oCon.getCell('c101TblPmx',6).setText(oCon.fmtDec(oCon.getControl('c101inpOrder').getValue(),3));				// +- 2018.10.16 :: Premix Order V1.0.1
			oCon.getCell('c101TblPmx',6).setText(oCon.fmtDec(oCon.getControl('c101inpOrder').getValue(),6));				// Change 'c101TblPmx' to 6 digit
		};	
		
		if(fcode=='c101LstMeat'){ //RAW Meat Selected
			if(!oCon.isSelected('c101LstMeat')){return;};
			oApp.diaMeatEdit_PBO('c101','c101LstMeat','menge_ist13_6');														// ++ 2018.12.13 :: Premix Order V1.0.2
			//oApp.diaMeatEdit_PBO('c101','c101LstMeat','menge_ist');														// -- 2018.12.13 :: Premix Order V1.0.2
			oCon.getControl('c101DiaCal').open();
			oCon.getControl('c101DiaMeat').close();
		};
		
		//----------------------------------------------------------- C102		
		if(fcode=='c102btnCnc'){ //Cancel PREMIX Order
			
			if(!oCon.isSelected('c102TblOvw')){return;};
			var vMsg 	= 'Do you want to cancel premix order '+ oCon.getProperty('c102TblOvw','pmxnr')+' ?';
			oCon.popConfirm(vMsg,'c102btnCnc_ok','c102btnCnc_no');
			
		};
		if(fcode=='c102btnCnc_ok'){ //Cancel PREMIX Order- OK
			oCon.ui5DispatchBackEnd("SAPEVT_C104","evt_c104","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- C103		
		if(fcode=='c103btnAct'){ //List Process Order Multiple Select
			if(!oCon.isSelected('c103TblPmx')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_C101","evt_c101","{i18n>MSG_PROCESS}");
		};
		if(fcode=='c103btnEdt'){ //List FG to edit KG/SET
			if(!oCon.isSelected('c103TblPmx')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_C107","evt_c107","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='c104btnSav'){//Save KG/SET for FG
			oCon.popConfirm('Do you want to save ?','c104btnSav_ok','c104btnSav_no');
		};
		if(fcode=='c104btnSav_ok'){//Save KG/SET for FG
			oCon.ui5DispatchBackEnd("SAPEVT_C108","evt_c108","{i18n>MSG_PROCESS}");
		};
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_C101"){//Production Order List
			return oParameters = { 
				"idate"   : oCon.getControl('c103inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('c103chkShiftD'),
				"iaprion" : oCon.getAbapTrue('c103chkShiftN'),
				"aufnr"   : oCon.arrListSelected('c103TblPmx','aufnr'),
			};
		};
		
		if(fcode=="SAPEVT_C102"){//Save Premix Order
			return oParameters = { 
				"idate" 	: oCon.getControl('c103inpDate').getValue(),
				"iapriod" 	: oCon.getAbapTrue('c103chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('c103chkShiftN'),
				"aufnr" 	: oCon.arrListItemsNoBlank('c101TblPmx','aufnr','menge_ist13_6'),								// ++ 2018.12.13 :: Premix Order V1.0.2
				"matnr_px" 	: oCon.arrListItemsNoBlank('c101TblPmx','matnr_px','menge_ist13_6'),							// ++ 2018.12.13 :: Premix Order V1.0.2
				"menge_ist" : oCon.arrListItemsNoBlank('c101TblPmx','menge_ist13_6','menge_ist13_6'),						// ++ 2018.12.13 :: Premix Order V1.0.2
				//"aufnr" 	: oCon.arrListItemsNoBlank('c101TblPmx','aufnr','menge_ist'),									// -- 2018.12.13 :: Premix Order V1.0.2
				//"matnr_px" 	: oCon.arrListItemsNoBlank('c101TblPmx','matnr_px','menge_ist'),							// -- 2018.12.13 :: Premix Order V1.0.2
				//"menge_ist" : oCon.arrListItemsNoBlank('c101TblPmx','menge_ist','menge_ist'),								// -- 2018.12.13 :: Premix Order V1.0.2
			};
		};
		
		if(fcode=="SAPEVT_C103"){//PREMIX Order List
			return oParameters = { 
				"idate"   : oCon.getControl('c102inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('c102chkShiftD'),
				"iaprion" : oCon.getAbapTrue('c102chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_C104"){//PREMIX Cancel
			return oParameters = { 
				"idate"   : oCon.getControl('c102inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('c102chkShiftD'),
				"iaprion" : oCon.getAbapTrue('c102chkShiftN'),
				"ipmxnr"  : oCon.getProperty('c102TblOvw','pmxnr'),
			};
		};
		
		if(fcode=="SAPEVT_C105"){//Production Order List (Multiple Selected)
			return oParameters = { 
				"idate"   : oCon.getControl('c103inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('c103chkShiftD'),
				"iaprion" : oCon.getAbapTrue('c103chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_C106"){//Get RAW Meat
			return oParameters = { 
				"iaufnr"   : oCon.getProperty('c101TblPmx','aufnr'),
				"imenge"   : oCon.getProperty('c101TblPmx','menge_ist13_6'),												// ++ 2018.12.13 :: Premix Order V1.0.2
				//"imenge"   : oCon.getProperty('c101TblPmx','menge_ist'),													// -- 2018.12.13 :: Premix Order V1.0.2
			};
		};
		
		if(fcode=="SAPEVT_C107"){//List FG to edit KG/SET
			return oParameters = { 
				"matnr_fg"   : oCon.arrListSelected('c103TblPmx','matnr_fg'),
				"menge_pkg"  : oCon.arrListSelected('c103TblPmx','menge_pkg'),
				"meins_kg"   : oCon.arrListSelected('c103TblPmx','meins_kg'),
			};
		};
		
		if(fcode=="SAPEVT_C108"){//Save KG/SET for FG
			return oParameters = { 
				"idate"   	: oCon.getControl('c103inpDate').getValue(),
				"iapriod" 	: oCon.getAbapTrue('c103chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('c103chkShiftN'),
				"matnr_fg"  : oCon.arrListItems('c104TblPmx','matnr_fg'),
				"menge_pkg" : oCon.arrListItems('c104TblPmx','menge_pkg'),
				"meins_kg"  : oCon.arrListItems('c104TblPmx','meins_kg'),
			};
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=='SAPEVT_C101'){ //List selected premix for edit qty/set
			oCon.getControl('c101TblPmx').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_C102'){ //Create - Process order - Save
			if(oCon.popMsgErrSuc(oModela,"S")){
				oCon.getControl('c101TblPmx').setModel(oModela);
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};
		
		if(fcode=='SAPEVT_C103'){ //List PREMIX Order Overview
			oCon.getControl('c102TblOvw').setModel(oModela);
		}
		
		if((fcode=='SAPEVT_C104')&&(oModela.oData.logon.typ=='S')){ //PREMIX Cancel Success
			oCon.getControl('c102TblOvw').setModel(oModela);
		};
	
		if(fcode=='SAPEVT_C105'){ //List Process Order (Multiple Selected)
			oCon.getControl('c103TblPmx').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_C106'){ //Get RAW Meat
			oCon.getControl('c101LstMeat').setModel(oModela);
			oCon.getControl('c101DiaMeat').open();
		};
		
		if(fcode=='SAPEVT_C107'){//List FG to edit KG/SET
			oCon.getControl('c104TblPmx').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_C108'){ //Save KG/SET for FG
			if(oModela.oData.logon.typ=='S'){
				oCon.getControl('c103TblPmx').setModel(oModela);
			}else{
				oCTX.oData.cancel_nav = true;
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
		
		//C103=>C101
		if(fcode=="SAPEVT_C105")    {app.to('C103','slide');};
		if(fcode=="SAPEVT_C101")    {app.to('C101','slide');};
		if(fcode=="SAPEVT_C103")    {app.to('C102','slide');};
		if(fcode=="SAPEVT_C107")    {app.to('C104','slide');};
		if(fcode=="SAPEVT_C108")    {app.to('C103','slide');};
		
		if(fcode=='c103btnBck')		{oCon.nav_home();};
		if(fcode=='c101btnBck')		{app.to('C103','slide');};
		if(fcode=='c102btnBck')		{oCon.nav_home();};
		if(fcode=='c104btnBck')		{app.to('C103','slide');};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
		if(fcode=='SAPEVT_C106'&&oModela.oData.t_c_xoring.length<=1){ //Get RAW Meat
			oCon.getControl('c101DiaCal').open();
			oCon.getControl('c101DiaMeat').close();
		};
	},
});