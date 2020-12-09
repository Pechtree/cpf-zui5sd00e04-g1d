sap.ui.controller("zui5sd00e04.D.D200", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		//----------------------------------------------------------- D201		
		if(fcode=='d201btnAct'){
			if(!oCon.isSelected('d201TblAuf')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_D204","evt_d204","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- D202		
		if(fcode=='d202btnSum'){ //Display Ingredient by Total
			oCon.ui5DispatchBackEnd("SAPEVT_D205","evt_d205","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='d202TblPmx_edt'){//Edit
			oCon.getControl('d202inpOrder').setValue(oCon.getProperty('d202TblPmx','menge_ikg'));
			oCon.getControl('d202DiaEdt').open();
		};
		
		if(fcode=='d202btnAcp'){//Edit - OK
			oCon.getCell('d202TblPmx',6).setText(oCon.fmtDec(oCon.getControl('d202inpOrder').getValue(),3));
			oCon.getControl('d202DiaEdt').close();
		};
		
		if(fcode=='d202btnDis'){//Calculate RAW Meat
			if(!oCon.isSelected('d202TblPmx')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_D206","evt_d206","{i18n>MSG_PROCESS}");
			oApp.diaMeatEdit_PBO('d202','d202TblPmx','menge_ikg');
		};
		
		if(fcode=='d202btnCalOk'){//Adjust Raw Meat - OK
			oCon.getCell('d202TblPmx',6).setText(oCon.fmtDec(oCon.getControl('d202inpMenge_ist').getValue(),3));
			oCon.getControl('d202DiaCal').close();
		};
		
		if(fcode=='d202LstMeat'){ //RAW Meat Selected
			if(!oCon.isSelected('d202LstMeat')){return;};
			oApp.diaMeatEdit_PBO('d202','d202LstMeat','menge_ist');
			oCon.getControl('d202DiaCal').open();
			oCon.getControl('d202DiaMeat').close();
		};
		
		if(fcode=='d202btnTog'){ //Toggle
			if(oCon.getControl('d202InpMode').getValue()=='X'){
				oCon.getControl('d202InpMode').setValue();
			}else{
				oCon.getControl('d202InpMode').setValue('X');
			};
			oCon.ui5DispatchBackEnd("SAPEVT_D202","evt_d202","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- D203
		if(fcode=='d203lstLgort'){
			oCon.getControl('d202InpMode').setValue();
			oCon.ui5DispatchBackEnd("SAPEVT_D202","evt_d202","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- D204
		if(fcode=='d204btnSav'){
			oCon.popConfirm('Do you want to save?','d204btnSav_ok','d204btnSav_no');
		};
		if(fcode=='d204btnSav_ok'){
			oCon.ui5DispatchBackEnd("SAPEVT_D203","evt_d203","{i18n>MSG_PROCESS}");
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
		
		if(fcode=="SAPEVT_D201"){//Production Order List
			return oParameters = { 
				"idate"   : oCon.getControl('d201inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('d201chkShiftD'),
				"iaprion" : oCon.getAbapTrue('d201chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_D202"){ //List Ingredient for Create
			return oParameters = {
				"imodeset": oCon.getControl('d202InpMode').getValue(),
				"ilgortf" : oCon.getProperty('d203lstLgort','lgort'), 
				"aufnr"   : oCon.arrListSelected('d201TblAuf','aufnr'),};
		};
		
		if(fcode=="SAPEVT_D203"){ //Save create Transfer order
			return oParameters = {
				"idate" 	: oCon.getControl('d201inpDate').getValue(),
				"iapriod"   : oCon.getAbapTrue('d201chkShiftD'),
				"iaprion"   : oCon.getAbapTrue('d201chkShiftN'),
				"ilgortf"   : oCon.getProperty('d203lstLgort','lgort'), 
				"matnr_in"  : oCon.arrListItemsNoBlank('d204TblPmx','matnr_in','menge_ikg'), 
				"menge_ikg" : oCon.arrListItemsNoBlank('d204TblPmx','menge_ikg','menge_ikg'), 
			};
		};
		
		if(fcode=="SAPEVT_D205"){ //List Ingredient for Create (Total)
			return oParameters = { 
				"imodeset"	: oCon.getControl('d202InpMode').getValue(),
				"aufnr"     : oCon.arrListItemsNoBlank('d202TblPmx','aufnr','menge_ikg'),
				"vornr"     : oCon.arrListItemsNoBlank('d202TblPmx','vornr','menge_ikg'),
				"matnr_in"  : oCon.arrListItemsNoBlank('d202TblPmx','matnr_in','menge_ikg'), 
				"menge_ikg" : oCon.arrListItemsNoBlank('d202TblPmx','menge_ikg','menge_ikg'), 
			};
		};
		
		if(fcode=="SAPEVT_D206"){ //Calculate by RAW Meat
			return oParameters = { 
				"iaufnr"     : oCon.getProperty('d202TblPmx','aufnr'),
				"imatnr"     : oCon.getProperty('d202TblPmx','matnr_in'),
				"ilgortf"    : oCon.getProperty('d203lstLgort','lgort'), 
				"imenge"     : oCon.getProperty('d202TblPmx','menge_ikg'),
			};
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=='SAPEVT_D201'){ //List Process Order
			oCon.getControl('d201TblAuf').setModel(oModela);
		}
		
		if(fcode=='SAPEVT_D202'){ //Create from Process Order
			oCon.getControl('d202TblPmx').setModel(oModela);
		}
		
		if(fcode=='SAPEVT_D203'){ //Save Transfer Order
			if(oCon.popMsgErrSuc(oModela,"S")){
				oCon.getControl('d201TblAuf').setModel(oModela);
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};
		
		if(fcode=='SAPEVT_D204'){ //List Storage
			oCon.getControl('d203lstLgort').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_D205'){ //List Ingredient for Create (Total)
			oCon.getControl('d204TblPmx').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_D206'&&oModela.oData.logon.typ!='E'){//Calculate RAW Meat
			oCon.getControl('d202LstMeat').setModel(oModela);
			oCon.getControl('d202DiaMeat').open();
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		if(fcode=="SAPEVT_D202"){ 
			if(oCon.getControl('d202InpMode').getValue()=='X'){
				oCon.getControl('d202btnDis').setVisible(true);
			}else{
				oCon.getControl('d202btnDis').setVisible(false);
			};
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="SAPEVT_D201")    {app.to('D201','slide');};
		if(fcode=="SAPEVT_D204")    {app.to('D203','slide');};
		if(fcode=="SAPEVT_D202")    {app.to('D202','slide');};
		if(fcode=="SAPEVT_D203")    {app.to('D201','slide');};
		if(fcode=="SAPEVT_D205")    {app.to('D204','slide');};
		
		if(fcode=='d201btnBck')		{oCon.nav_home();};
		if(fcode=='d202btnBck')		{app.to('D203','slide');};
		if(fcode=='d203btnBck')		{app.to('D201','slide');};
		if(fcode=='d204btnBck')		{app.to('D202','slide');};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
		if(fcode=='SAPEVT_D206'&&oModela.oData.t_c_xoring.length<=1){ //Get RAW Meat
			oCon.getControl('d202DiaCal').open();
			oCon.getControl('d202DiaMeat').close();
		};
	},
});