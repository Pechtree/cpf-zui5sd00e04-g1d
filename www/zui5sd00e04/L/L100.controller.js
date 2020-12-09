sap.ui.controller("zui5sd00e04.L.L100", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
	
		//--------------------------------------------------------------------------------	
		//L101: List IR Material
		//-------------------------------------------------------------------------------- 
		if(fcode=='l101TblMatIR'){ //Select row in Table MatIR
			if(!oCon.isSelected('l101TblMatIR')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_L102","evt_l102","{i18n>MSG_PROCESS}");
		};
		
		//--------------------------------------------------------------------------------	
		//L102: List Process Order
		//--------------------------------------------------------------------------------
		if(fcode=='l102TblAuf'){ //Select row in Table Process Order
			if(!oCon.isSelected('l102TblAuf')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_L103","evt_l103","{i18n>MSG_PROCESS}");
		};
		
		//--------------------------------------------------------------------------------	
		//L103: List Detail and IR Input
		//--------------------------------------------------------------------------------
		if(fcode=='l103btnSav'){ //Click Save on Detail View.
			//Check Input Field
			var checkQTY 		= this.checkQTY(oCon.getControl('l103InpQTY').getValue());
			var checkQTYUnit	= this.checkQTYUnit(oCon.getControl('l103InpQTYUnit').getValue());
			var showDiaChk = false;
			
			if(!checkQTY){oCon.getControl('l103DiaChkQTY').setVisible(true);showDiaChk = true;};
			if(!checkQTYUnit){oCon.getControl('l103DiaChkQTYUnit').setVisible(true);showDiaChk = true;};
			
			//Check Input not Pass => [Yes]Show Dialog, [No]Show Dialog Post IR
			if(showDiaChk){
				oCon.getControl('l103DiaChk').open();
			}else {
				oCon.ui5DispatchBackEnd("SAPEVT_L104","evt_l104","{i18n>MSG_PROCESS}");
			};
		};
		
		if(fcode=='l103DiaChkbtnOK'){ //Close Dialog Check Input Field
			oCon.getControl('l103DiaChk').close();
			oCon.getControl('l103DiaChkQTY').setVisible(false);
			oCon.getControl('l103DiaChkQTYUnit').setVisible(false);
		};
		
		if(fcode=='l103DiabtnSav'){ //Post IR
			oCon.ui5DispatchBackEnd("SAPEVT_L105","evt_l105","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='l103DiabtnCanc'){ //Cancel Post IR => Close Dialog
			oCon.getControl('l103DiaSav').close();
		};
		
		if(fcode=='l103DiaErrSucbtnOK'){ //OK After Post
			oCon.getControl('l103DiaErrSuc').close();
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		//--------------------------------------------------------------------------------	
		//L101: List IR Material
		//-------------------------------------------------------------------------------- 
		if(fcode=="SAPEVT_L101"){ //List IR Material
			return oParameters = { 
				"imodeset"	: oCon.getControl('l101InpMode').getValue(),
			};
		};
		
		//--------------------------------------------------------------------------------	
		//L102: List Process Order
		//--------------------------------------------------------------------------------
		if(fcode=="SAPEVT_L102"){ //List Process Order
			return oParameters = { 
				"imodeset"	: oCon.getControl('l101InpMode').getValue(),
				"idate"		: oCon.getControl('l102inpDate').getValue(),
				"iapriod"	: oCon.getAbapTrue('l102chkShiftD'),
				"iaprion"	: oCon.getAbapTrue('l102chkShiftN'),
			};
		};
		
		//--------------------------------------------------------------------------------	
		//L103: List Detail and IR Input
		//--------------------------------------------------------------------------------
		if(fcode=="SAPEVT_L103"){ //Process Order - Select From List
			return oParameters = { 
				"imodeset"	: oCon.getControl('l101InpMode').getValue(),
				"idate"   	: oCon.getControl('l102inpDate').getValue(),
				"iapriod" 	: oCon.getAbapTrue('l102chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('l102chkShiftN'),
				
				"iaufnr" 	: oCon.getProperty('l102TblAuf','aufnr'),
//				"imatnr"	: oCon.getControl('l103InpMatnr').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_L104"){ //Show QTY, QTY Unit
			return oParameters = { 
				"imatnr_ir"	: oCon.getControl('l103InpIR').getValue(),
				"iaufnr" 	: oCon.getControl('l103InpAufnr').getValue(),
				"imatnr"	: oCon.getControl('l103InpMatnr').getValue(),
				"ihsdat"	: oCon.getControl('l103InpMfgDate').getValue(),
				"imenge1"	: oCon.getControl('l103InpQTY').getValue(),
				"imeins1"	: oCon.getControl('l103InpQTYUnit').getValue(),
			
				"imodeset"	: oCon.getControl('l101InpMode').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_L105"){ //Post IR
			return oParameters = { 
				"imatnr_ir"	: oCon.getControl('l103InpIR').getValue(),
				"iaufnr" 	: oCon.getControl('l103InpAufnr').getValue(),
				"imatnr"	: oCon.getControl('l103InpMatnr').getValue(),
				"ilgort"	: oCon.getControl('l103InpSlocNumber').getValue(), 
					
				"imenge"	: oCon.getControl('l103DiaInpQTY').getValue(),
				"imeins"	: oCon.getControl('l103DiaInpQTYUnit').getValue(),
				"ihsdat"	: oCon.getControl('l103DiaInpMfgDate').getValue(),
				"ivfdat"	: oCon.getControl('l103DiaInpExpDate').getValue(),
					
				"imodeset"	: oCon.getControl('l101InpMode').getValue(),
			};
		};

		
	},
	//--------------------------------------------------------------------------------
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		//--------------------------------------------------------------------------------	
		//L101: List IR Material
		//-------------------------------------------------------------------------------- 
		if(fcode=="SAPEVT_L101"){ //List MatIR
			oCon.getControl('l101TblMatIR').setModel(oModela);
		};
		
		//--------------------------------------------------------------------------------	
		//L102: List Process Order
		//--------------------------------------------------------------------------------
		if(fcode=="SAPEVT_L102"){ //List Process Order
			oCon.getControl('l102TblAuf').setModel(oModela);
		};
		
		//--------------------------------------------------------------------------------	
		//L103: List Detail and IR Input
		//--------------------------------------------------------------------------------
		if(fcode=="SAPEVT_L103"){//Detail and IR Input
			oCon.getControl('l103InpIR').setModel(oModela);
			oCon.getControl('l103InpIRtx').setModel(oModela);
			oCon.getControl('l103InpAufnr').setModel(oModela);
			oCon.getControl('l103InpMatnr').setModel(oModela);
			oCon.getControl('l103InpMaktx').setModel(oModela);
			oCon.getControl('l103InpWerks').setModel(oModela);
			oCon.getControl('l103InpWerksText').setModel(oModela);
			oCon.getControl('l103InpSlocNumber').setModel(oModela);
			oCon.getControl('l103InpSlocName').setModel(oModela);
			oCon.getControl('l103InpMfgDate').setModel(oModela);
			oCon.getControl('l103InpQTYUnit').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_L104"){ //Dialog Post IR
			oCon.getControl('l103DiaInpQTY').setModel(oModela);
			oCon.getControl('l103DiaInpQTYUnit').setModel(oModela);
			oCon.getControl('l103DiaInpMfgExpDate').setModel(oModela);
			
			oCon.getControl('l103DiaInpMfgDate').setModel(oModela);
			oCon.getControl('l103DiaInpExpDate').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_L105"){ //After Post IR
			oCon.getControl('l103DiaErrSucMsg').setModel(oModela);
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		//--------------------------------------------------------------------------------	
		//L101: List IR Material
		//-------------------------------------------------------------------------------- 
		
		
		//--------------------------------------------------------------------------------	
		//L102: List Process Order
		//--------------------------------------------------------------------------------
		
		
		//--------------------------------------------------------------------------------	
		//L103: List Detail and IR Input
		//--------------------------------------------------------------------------------
		if(fcode=='SAPEVT_L103'){
			oCon.getControl('l103InpIR').setValue(oCon.getProperty('l101TblMatIR','matnr_fg'));
			oCon.getControl('l103InpIRtx').setValue(oCon.getProperty('l101TblMatIR','maktx_fg'));
			
			oCon.getControl('l103InpQTY').setValue("");
		};
		
		if(fcode=='SAPEVT_L104'){
			oCon.getControl('l103DiaSav').open();
//			oCon.getControl('l103DiaInpQTY').setValue(oCon.getControl('l103InpQTY').getValue());
//			oCon.getControl('l103DiaInpQTYUnit').setValue(oCon.getControl('l103InpQTYUnit').getValue());
			oCon.getControl('l103DiaInpMfgExpDate').setValue(
					this.changeMfgExpDate(oCon.getControl('l103DiaInpMfgExpDate').getValue())
			);
			
			oCon.getControl('l103DiaTitle').setText(
					oCon.getControl('l103InpAufnr').getValue()
					+ " : " +
					oCon.getControl('l103InpMatnr').getValue()
					+ " : " +
					oCon.getControl('l103InpMaktx').getValue()
			);
		};
		
		if(fcode=='SAPEVT_L105'){ //After Post IR
			oCon.getControl('l103DiaSav').close();
			if(oCon.checkErrSuc(oModela,"S")){
				oCon.getControl('l103DiaErrSuc').open();
			}else{

			};
//			if(oCon.popMsgErrSuc(oModela,"S")){
//				oCon.ui5DispatchBackEnd("SAPEVT_L102","evt_l102","{i18n>MSG_PROCESS}");
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
		//L101: List IR Material
		//-------------------------------------------------------------------------------- 
		if(fcode=="SAPEVT_L101")    {app.to('L101','slide');};
		if(fcode=='l101btnBck')		{oCon.nav_home();};
		
		//--------------------------------------------------------------------------------	
		//L102: List Process Order
		//--------------------------------------------------------------------------------
		if(fcode=="SAPEVT_L102")    {app.to('L102','slide');};
		if(fcode=='l102btnBck')		{oCon.ui5DispatchBackEnd("SAPEVT_L101","evt_l101","{i18n>MSG_PROCESS}");};
		
		//--------------------------------------------------------------------------------	
		//L103: List Detail and IR Input
		//--------------------------------------------------------------------------------
		if(fcode=="SAPEVT_L103")    {app.to('L103','slide');};
		if(fcode=='l103btnBck')		{oCon.ui5DispatchBackEnd("SAPEVT_L102","evt_l102","{i18n>MSG_PROCESS}");};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
	
	checkQTY: function(inp){ 
//		number > 0
		if(inp.match("^([1-9]{1}[0-9]*[.]?[0-9]*)$|(^[0]{1}[^0-9][.]?[0-9]+)$"))return true;
		else return false;
	},
	
	checkQTYUnit: function(inp){
//		number > 0
		if(inp.length > 0)return true;
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
});