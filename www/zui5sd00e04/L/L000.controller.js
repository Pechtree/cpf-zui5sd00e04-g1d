sap.ui.controller("zui5sd00e04.L.L000", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
	
		//--------------------------------------------------------------------------------	
		//L001: List Process Order
		//-------------------------------------------------------------------------------- 
		if(fcode=='l001btnFGWIP'){ //Toggle FG / WIP
			if(oCon.getControl('l001InpMode').getValue()=='WIP'){
				oCon.getControl('l001InpMode').setValue('FG');
			}else{
				oCon.getControl('l001InpMode').setValue('WIP');
			};
			oCon.ui5DispatchBackEnd("SAPEVT_L001","evt_l001","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='l001TblAufFG'){ //Select row in Table FG
			if(!oCon.isSelected('l001TblAufFG')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_L002","evt_l002","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='l001TblAufWIP'){ //Select row in Table WIP
			if(!oCon.isSelected('l001TblAufWIP')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_L002","evt_l002","{i18n>MSG_PROCESS}");
		};
		
		//--------------------------------------------------------------------------------	
		//L002: List Detail and GR Input
		//--------------------------------------------------------------------------------
		if(fcode=='l002btnSav'){ //Click Save on Detail View.
			//Check Input Field
			var checkQTY 		= this.checkQTY(oCon.getControl('l002InpQTY').getValue());
			var checkQTYUnit 	= this.checkQTYUnit(oCon.getControl('l002InpQTYUnit').getValue());
			var checkSet 		= this.checkSet(oCon.getControl('l002InpSet').getValue());
			var checkLine 		= this.checkLine(oCon.getControl('l002InpLine').getValue());
			var checkHR 		= this.checkHR(oCon.getControl('l002InpHR').getValue());
			var checkSoak 		= this.checkSoak(oCon.getControl('l002InpSoak').getValue());
			var checkWIPReason 	= this.checkWIPReason(oCon.getControl('l002InpWIPReason').getValue());
			
			var state = oCon.getControl('l002InpState').getValue();
			var showDiaChk = false;
			
			if(!checkQTY){oCon.getControl('l002DiaChkQTY').setVisible(true);showDiaChk = true;};
			if(!checkQTYUnit){oCon.getControl('l002DiaChkQTYUnit').setVisible(true);showDiaChk = true;};
			if(!checkSet){oCon.getControl('l002DiaChkSet').setVisible(true);showDiaChk = true;};
			if(!checkLine && state.substring(0,1)=="1"){oCon.getControl('l002DiaChkLine').setVisible(true);showDiaChk = true;};
			if(!checkHR && state.substring(1,2)=="1"){oCon.getControl('l002DiaChkHR').setVisible(true);showDiaChk = true;};
			if(!checkSoak && state.substring(2,3)=="1"){oCon.getControl('l002DiaChkSoak').setVisible(true);showDiaChk = true;};
			if(!checkWIPReason && state.substring(3,4)=="1"){oCon.getControl('l002DiaChkWIPReason').setVisible(true);showDiaChk = true;};
			
			//Check Input not Pass => [Yes]Show Dialog, [No]Show Dialog Post GR
			if(showDiaChk){
				oCon.getControl('l002DiaChk').open();
			}else {
				oCon.ui5DispatchBackEnd("SAPEVT_L003","evt_l003","{i18n>MSG_PROCESS}");
			};
		};
		
		if(fcode=='l002DiaChkbtnOK'){ //Close Dialog Check Input Field
			oCon.getControl('l002DiaChk').close();
			oCon.getControl('l002DiaChkQTY').setVisible(false);
			oCon.getControl('l002DiaChkQTYUnit').setVisible(false);
			oCon.getControl('l002DiaChkSet').setVisible(false);
			oCon.getControl('l002DiaChkLine').setVisible(false);
			oCon.getControl('l002DiaChkHR').setVisible(false);
			oCon.getControl('l002DiaChkSoak').setVisible(false);
			oCon.getControl('l002DiaChkWIPReason').setVisible(false);
		};
		
		if(fcode=='l002DiabtnSav'){ //Post GR
			oCon.ui5DispatchBackEnd("SAPEVT_L004","evt_l004","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='l002DiabtnCanc'){ //Cancel Post GR => Close Dialog
			oCon.getControl('l002DiaSav').close();
		};
		
		if(fcode=='l002DiaErrSucbtnOK'){ //OK After Post
			oCon.getControl('l002DiaErrSuc').close();
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		//--------------------------------------------------------------------------------	
		//L001: List Process Order
		//-------------------------------------------------------------------------------- 
		if(fcode=="SAPEVT_L001"){ //List Process Order
			return oParameters = {
				"imodeset": oCon.getControl('l001InpMode').getValue(),	
				"idate"   : oCon.getControl('l001inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('l001chkShiftD'),
				"iaprion" : oCon.getAbapTrue('l001chkShiftN'),
			};
		};
		
		//--------------------------------------------------------------------------------	
		//L002: List Detail and GR Input
		//--------------------------------------------------------------------------------
		if(fcode=="SAPEVT_L002"){ //Process Order - Select From List
			if(oCon.getControl('l001InpMode').getValue()=='WIP'){
				oParameters = { 
					"iaufnr" 	: oCon.getProperty('l001TblAufWIP','aufnr'),
					"imatnr" 	: oCon.getProperty('l001TblAufWIP','matnr_fg'),
				};
			}else{
				oParameters = { 
					"iaufnr" 	: oCon.getProperty('l001TblAufFG','aufnr'),
					"imatnr" 	: oCon.getProperty('l001TblAufFG','matnr_fg'),
				};
			};
			oParameters.imodeset	= oCon.getControl('l001InpMode').getValue();
			oParameters.idate 		= oCon.getControl('l001inpDate').getValue();
			oParameters.iapriod 	= oCon.getAbapTrue('l001chkShiftD');
			oParameters.iaprion 	= oCon.getAbapTrue('l001chkShiftN');
			return oParameters;
		};
		
		//imenge1,imeins1 for Issue Unit
		if(fcode=="SAPEVT_L003"){ //Show QTY, QTY Unit, MFG.Date - EXP.Date, Batch Number
			return oParameters = { 
				"iaufnr" 	: oCon.getControl('l002InpAufnr').getValue(),
				"imatnr"	: oCon.getControl('l002InpMatnr').getValue(),
				"ihsdat"	: oCon.getControl('l002InpMfgDate').getValue(),
				"imenge1"	: oCon.getControl('l002InpQTY').getValue(),
				"imeins1"	: oCon.getControl('l002InpQTYUnit').getValue(),
				"iset"		: this.changeLessTen(oCon.getControl('l002InpSet').getValue()),
				"iline"		: oCon.getControl('l002InpLine').getValue(),
				"ihour"		: this.changeLessTen(oCon.getControl('l002InpHR').getValue()),
				"isoak"		: this.changeLessTen(oCon.getControl('l002InpSoak').getValue()),
				"iwreason"	: oCon.getControl('l002InpWIPReason').getValue(),
				
				"imodeset"	: oCon.getControl('l001InpMode').getValue(),
				"ibattype"	: oCon.getControl('l002InpBatType').getValue(),
			};
		};
		
		//imenge,imeins for Base Unit
		if(fcode=="SAPEVT_L004"){ //Post GR
			return oParameters = { 
				"iaufnr" 	: oCon.getControl('l002InpAufnr').getValue(),
				"imatnr"	: oCon.getControl('l002InpMatnr').getValue(),
				"ilgort"	: oCon.getControl('l002InpSlocNumber').getValue(),
				"iset"		: oCon.getControl('l002InpSet').getValue(),
				"iline"		: oCon.getControl('l002InpLine').getValue(),
				"ihour"		: oCon.getControl('l002InpHR').getValue(),
				"isoak"		: oCon.getControl('l002InpSoak').getValue(),
				"iwreason"	: oCon.getControl('l002InpWIPReason').getValue(),
				
				"imenge"	: oCon.getControl('l002DiaInpQTY').getValue(),
				"imeins"	: oCon.getControl('l002DiaInpQTYUnit').getValue(),
				"ihsdat"	: oCon.getControl('l002DiaInpMfgDate').getValue(),
				"ivfdat"	: oCon.getControl('l002DiaInpExpDate').getValue(),
				"icharg"	: oCon.getControl('l002DiaInpBatchNumber').getValue(),
					
				"imodeset"	: oCon.getControl('l001InpMode').getValue(),
			};
		};
		
	},
	//--------------------------------------------------------------------------------
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		//--------------------------------------------------------------------------------	
		//L001: List Process Order
		//-------------------------------------------------------------------------------- 
		if(fcode=="SAPEVT_L001"){ //List Process Order
			oCon.getControl('l001TblAufFG').setModel(oModela);
			oCon.getControl('l001TblAufWIP').setModel(oModela);
		};
		
		//--------------------------------------------------------------------------------	
		//L002: List Detail and GR Input
		//--------------------------------------------------------------------------------
		if(fcode=="SAPEVT_L002"){ //Detail and GR Input
			oCon.getControl('l002InpAufnr').setModel(oModela);
			oCon.getControl('l002InpMatnr').setModel(oModela);
			oCon.getControl('l002InpMaktx').setModel(oModela);
			oCon.getControl('l002InpWerks').setModel(oModela);
			oCon.getControl('l002InpWerksText').setModel(oModela);
			oCon.getControl('l002InpSlocNumber').setModel(oModela);
			oCon.getControl('l002InpSlocName').setModel(oModela);
			oCon.getControl('l002InpMfgDate').setModel(oModela);
			oCon.getControl('l002InpQTYUnit').setModel(oModela);
			
			oCon.getControl('l002InpState').setModel(oModela);
			oCon.getControl('l002InpBatType').setModel(oModela);
			oCon.getControl('l002InpBaseUnit').setModel(oModela);
			
//			oCon.getControl('l002SelSet').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_L003"){ //Dialog Post GR
			oCon.getControl('l002DiaInpQTY').setModel(oModela);
			oCon.getControl('l002DiaInpQTYUnit').setModel(oModela);
			oCon.getControl('l002DiaInpMfgExpDate').setModel(oModela);
			oCon.getControl('l002DiaInpBatchNumber').setModel(oModela);
			
			oCon.getControl('l002DiaInpMfgDate').setModel(oModela);
			oCon.getControl('l002DiaInpExpDate').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_L004"){ //After Post GR
			oCon.getControl('l002DiaErrSucMsg').setModel(oModela);
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		//--------------------------------------------------------------------------------	
		//L001: List Process Order
		//-------------------------------------------------------------------------------- 
		if(fcode=='SAPEVT_L001'){ //List Process Order
			if(oCon.getControl('l001InpMode').getValue()=='WIP'){
				oCon.getControl('l001TblAufFG').setVisible(false);
				oCon.getControl('l001TblAufWIP').setVisible(true);
				oCon.getControl('l001schMainFG').setVisible(false);
				oCon.getControl('l001schMainWIP').setVisible(true);
			}else{
				oCon.getControl('l001TblAufFG').setVisible(true);
				oCon.getControl('l001TblAufWIP').setVisible(false);
				oCon.getControl('l001schMainFG').setVisible(true);
				oCon.getControl('l001schMainWIP').setVisible(false);
			};
		};
		
		//--------------------------------------------------------------------------------	
		//L002: List Detail and GR Input
		//--------------------------------------------------------------------------------
		if(fcode=='SAPEVT_L002'){ //Process Order - Select From List
			//state ==> Visible 1(true), 0(false) 
			//state has 4 digit[1110] 1st(Line) 2nd(Hour) 3rd(Soak) 4th(WIPReason)
			var state = oCon.getControl('l002InpState').getValue();
			if(state.substring(0,1)=="1")oCon.getControl('l002InpLine').setVisible(true);
				else oCon.getControl('l002InpLine').setVisible(false);
			if(state.substring(1,2)=="1")oCon.getControl('l002InpHR').setVisible(true);
				else oCon.getControl('l002InpHR').setVisible(false);
			if(state.substring(2,3)=="1")oCon.getControl('l002InpSoak').setVisible(true);
				else oCon.getControl('l002InpSoak').setVisible(false);
			if(state.substring(3,4)=="1")oCon.getControl('l002InpWIPReason').setVisible(true);
				else oCon.getControl('l002InpWIPReason').setVisible(false);
			
			oCon.getControl('l002InpQTY').setValue("");
			oCon.getControl('l002InpSet').setValue("");
			oCon.getControl('l002InpLine').setValue("");
			oCon.getControl('l002InpHR').setValue("");
			oCon.getControl('l002InpSoak').setValue("");
			oCon.getControl('l002InpWIPReason').setValue("");
		};
		
		if(fcode=='SAPEVT_L003'){ //Dialog Post GR
			oCon.getControl('l002DiaSav').open();
			oCon.getControl('l002DiaInpMfgExpDate').setValue(
					this.changeMfgExpDate(oCon.getControl('l002DiaInpMfgExpDate').getValue())
			);
			oCon.getControl('l002DiaTitle').setText(
					oCon.getControl('l002InpAufnr').getValue()
					+ " : " +
					oCon.getControl('l002InpMatnr').getValue()
					+ " : " +
					oCon.getControl('l002InpMaktx').getValue()
			);
		};
		
		if(fcode=='SAPEVT_L004'){ //After Post GR
			oCon.getControl('l002DiaSav').close();
			if(oCon.checkErrSuc(oModela,"S")){
				oCon.getControl('l002DiaErrSuc').open();
			}else{

			};
//			if(oCon.popMsgErrSuc(oModela,"S")){
//				oCon.ui5DispatchBackEnd("SAPEVT_L001","evt_l001","{i18n>MSG_PROCESS}");
//			}else{
//
//			};
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		//--------------------------------------------------------------------------------	
		//L001: List Process Order
		//-------------------------------------------------------------------------------- 
		if(fcode=="SAPEVT_L001")	{app.to('L001','slide');};
		if(fcode=='l001btnBck')		{oCon.nav_home();};
		
		//--------------------------------------------------------------------------------	
		//L002: List Detail and GR Input
		//--------------------------------------------------------------------------------
		if(fcode=="SAPEVT_L002")	{app.to('L002','slide');};
		if(fcode=='l002btnBck')		{oCon.ui5DispatchBackEnd("SAPEVT_L001","evt_l001","{i18n>MSG_PROCESS}");};

	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
	
	checkQTY: function(inp){
//		number > 0
		if(inp.match("^([1-9]{1}[0-9]*|[1-9]{1}[0-9]*[.]{1}[0-9]+|[0]{1}[.]{1}[0-9]+)$"))return true;
		else return false;
	},
	
	checkQTYUnit: function(inp){
//		number > 0
		if(inp.length > 0)return true;
		else return false;
	},
	
	checkSet: function(inp){
//		01-99 OR 1-99 (2 digit)
		if(inp.match("^(0?[1-9]|[1-9][0-9])$"))return true;
		else return false;
	},
	
	checkLine: function(inp){ 
//		1-9 (1 digit)
		if(inp.match("^[1-9]$"))return true;
		else return false;
	},
	
	checkHR: function(inp){ 
//		01-24 OR 1-24 (2 digit)
		if(inp.match("^(0?[1-9]|1[0-9]|2[0-4])$"))return true;
		else return false;
	},
	
	checkSoak: function(inp){
//		01-99 OR 1-99 (2 digit)
		if(inp.match("^(0?[1-9]|[1-9][0-9])$"))return true;
		else return false;
	},
	
	checkWIPReason: function(inp){
//		Number or Character (2 digit)
		if(inp.match("^([0-9a-zA-Z][0-9a-zA-Z])$"))return true;
		else return false;
	},
	
	changeMfgExpDate: function(inp){
//		[Mfd.Date - Exp.Date]: YYYYMMDD - YYYYMMDD ==> DD.MM.YYYY - DD.MM.YYYY 
		return 	inp.substring(6,8)		
				+"."+	inp.substring(4,6)
				+"."+	inp.substring(0,4)		
				+" - "+	inp.substring(17,19)
				+"."+	inp.substring(15,17)
				+"."+	inp.substring(11,15)
	       		;
	},
	
	changeLessTen: function(inp){
//		1-9 ==> 01-09
		var number = parseInt(inp);
		if(number < 10) return "0" + inp;
		else return inp;
	},

});