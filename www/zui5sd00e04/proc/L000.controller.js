sap.ui.controller("zui5sd00e04.proc.L000", {

//	PAI FCODE 
//	--------------------------------------------------------------------------------	
	
	M01_FCD: function(fcode,oModela){

	//	L001: List Process Order
	//	-------------------------------------------------------------------------------- 
	
		//	Toggle FG / WIP
			if(fcode=='l001btnFGWIP'){ 
				if(oCon.getControl('l001InpMode').getValue()=='WIP'){
					oCon.getControl('l001InpMode').setValue('FG');
				}else{
					oCon.getControl('l001InpMode').setValue('WIP');
				};
				oCon.ui5DispatchBackEnd("SAPEVT_L001","evt_l001","{i18n>MSG_PROCESS}");
			};
		
		//	Select row in Table FG
			if(fcode=='l001TblAufFG'){ 
				oCon.getControl('l002inpFlag').setValue('Clr');
				oCon.ui5DispatchBackEnd("SAPEVT_L004","evt_l004","{i18n>MSG_PROCESS}");
				if(!oCon.isSelected('l001TblAufFG')){return;};
				oCon.ui5DispatchBackEnd("SAPEVT_L002","evt_l002","{i18n>MSG_PROCESS}");
			};
	
		//	Select row in Table WIP
			if(fcode=='l001TblAufWIP'){ 
				oCon.getControl('l002inpFlag').setValue('Clr');
				oCon.ui5DispatchBackEnd("SAPEVT_L004","evt_l004","{i18n>MSG_PROCESS}");
				if(!oCon.isSelected('l001TblAufWIP')){return;};
				oCon.ui5DispatchBackEnd("SAPEVT_L002","evt_l002","{i18n>MSG_PROCESS}");
			};

	//	L002: List Detail and GR Input
	//	--------------------------------------------------------------------------------
		//	Save SHM 																										// ++ 2018.02.01 :: GR FG V1.6	
			if(fcode=='l002btnAcp'){	
				oCon.getControl('l002inpFlag').setValue('Add');
				
				var checkQTY 		= this.checkQTY(oCon.getControl('l002InpQTY').getValue());
				var checkQTYUnit 	= this.checkQTYUnit(oCon.getControl('l002InpQTYUnit').getValue());
				var checkSet 		= this.checkSet(oCon.getControl('l002InpSet').getValue());
				var checkLine 		= this.checkLine(oCon.getControl('l002InpLine').getValue());
				var checkHR 		= this.checkHR(oCon.getControl('l002InpHR').getValue());
				var checkSoak 		= this.checkSoak(oCon.getControl('l002InpSoak').getValue());
				var checkWIPReason 	= this.checkWIPReason(oCon.getControl('l002InpWIPReason').getValue());
				var state 			= oCon.getControl('l002InpState').getValue();
				var showDiaChk 		= false;
				
				//if(!checkQTY){oCon.getControl('l002DiaChkQTY').setVisible(true);showDiaChk = true;};						// -- 2018.10.08 :: GR FG V2.2.2 :: change validate point to back-end	
				//if(!checkQTYUnit){oCon.getControl('l002DiaChkQTYUnit').setVisible(true);showDiaChk = true;};
				//if(!checkSet){oCon.getControl('l002DiaChkSet').setVisible(true);showDiaChk = true;};
				//if(!checkLine && state.substring(0,1)=="1"){oCon.getControl('l002DiaChkLine').setVisible(true);showDiaChk = true;};
				//if(!checkHR && state.substring(1,2)=="1"){oCon.getControl('l002DiaChkHR').setVisible(true);showDiaChk = true;};
				//if(!checkSoak && state.substring(2,3)=="1"){oCon.getControl('l002DiaChkSoak').setVisible(true);showDiaChk = true;};
				//if(!checkWIPReason && state.substring(3,4)=="1"){oCon.getControl('l002DiaChkWIPReason').setVisible(true);showDiaChk = true;};
									
				//if(showDiaChk){	//	Check Input not Pass => [Yes]Show Dialog, [No]Show Dialog Post GR
				//	oCon.getControl('l002DiaChk').open();
				//}else {
					oCon.ui5DispatchBackEnd("SAPEVT_L003","evt_l003","{i18n>MSG_PROCESS}");
				//};
			};
			
		//	Close Dialog Check Input Field	
			if(fcode=='l002DiaChkbtnOK'){ 
				oCon.getControl('l002DiaChk').close();
				oCon.getControl('l002DiaChkQTY').setVisible(false);
				oCon.getControl('l002DiaChkQTYUnit').setVisible(false);
				oCon.getControl('l002DiaChkSet').setVisible(false);
				oCon.getControl('l002DiaChkLine').setVisible(false);
				oCon.getControl('l002DiaChkHR').setVisible(false);
				oCon.getControl('l002DiaChkSoak').setVisible(false);
				oCon.getControl('l002DiaChkWIPReason').setVisible(false);
			};
		
		//	Save SHM 																										// ++ 2018.02.01 :: GR FG V1.6
			if(fcode=='l002DiabtnSav'){
				oCon.ui5DispatchBackEnd("SAPEVT_L004","evt_l004","{i18n>MSG_PROCESS}"); 		
			};
			
		//	Cancel Save SHM 																								// ++ 2018.02.01 :: GR FG V1.6
			if(fcode=='l002DiabtnCanc'){	
				oCon.getControl('l002DiaSav').close();
			};
			
		//	OK After Post		
			if(fcode=='l002DiaErrSucbtnOK'){ 
				oCon.getControl('l002DiaErrSuc').close();
			};

		//	Display SHM 																									// ++ 2018.01.30 :: GR FG V1.6
			if(fcode=='l002btnDis'){ 
				if (oCon.getControl('l001InpMode').getValue() == "FG") {
					oCon.getControl('l003TblOvw').setHeaderText(oCon.getFieldValue('l001TblAufFG',['aufnr']) + 
						' : ' + oCon.getFieldValue('l001TblAufFG',['matnr_fg']) + 
						' : ' + oCon.getFieldValue('l001TblAufFG',['maktx_fg']));
				} else {
					oCon.getControl('l003TblOvw').setHeaderText(oCon.getFieldValue('l001TblAufWIP',['aufnr']) + 
						' : ' + oCon.getFieldValue('l001TblAufWIP',['matnr_fg']) + 
						' : ' + oCon.getFieldValue('l001TblAufWIP',['maktx_fg']));
				}
				oCon.getControl('l002inpFlag').setValue('Dis');
				oCon.ui5DispatchBackEnd("SAPEVT_L004","evt_l004","{i18n>MSG_PROCESS}");
			};
			
		//	Edit Exp. date		
			if(fcode=='l002DiabtnEdit'){ 																					// ++ 2018.10.08 :: GR FG V2.2.2 :: set editable 'l002DiaInpExpDate' when press 'l002DiabtnEdit'
				oCon.getControl('l002DiaInpExpDate').setEditable(true);
			};

	//	L003: Confirm GR 																									// ++ 2018.01.30 :: GR FG V1.6
	//	--------------------------------------------------------------------------------		
		//	Delete SHM
			if(fcode=='l003btnDel'){ 
				oCon.getControl('l002inpFlag').setValue('Del');
				oCon.getControl('l003inpInd').setValue(oCon.getProperty('l003TblOvw','index')); 
				oCon.ui5DispatchBackEnd("SAPEVT_L004","evt_l004","{i18n>MSG_PROCESS}");
				oCon.getControl('l002inpFlag').setValue('Dis');
				oCon.getControl('l003inpInd').setValue(); 
				oCon.ui5DispatchBackEnd("SAPEVT_L004","evt_l004","{i18n>MSG_PROCESS}");
			};		
			
		//	Post GR
			if(fcode=='l003btnSav'){ 
				oCon.ui5DispatchBackEnd("SAPEVT_L005","evt_l005","{i18n>MSG_PROCESS}");
			};	
		},
		
//	Parameters 
//	--------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){

	//	L001: List Process Order
	//	-------------------------------------------------------------------------------- 
	
		//	List Process Order
			if(fcode=="SAPEVT_L001"){ 
				return oParameters = {
					"imodeset": oCon.getControl('l001InpMode').getValue(),	
					"idate"   : oCon.getControl('l001inpDate').getValue(),
					"iapriod" : oCon.getAbapTrue('l001chkShiftD'),
					"iaprion" : oCon.getAbapTrue('l001chkShiftN'),
				};
			};

	//	L002: List Detail and GR Input
	//	--------------------------------------------------------------------------------
		
		//	Process Order - Select From List
			if(fcode=="SAPEVT_L002"){ 
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
		
		//	Show QTY, QTY Unit, MFG.Date - EXP.Date, Batch Number [imenge1,imeins1 for Issue Unit]
			if(fcode=="SAPEVT_L003"){ 
				oCon.getControl('l002DiaInpText').setValue(oCon.getControl('l002InpText').getValue());						// ++ 2018.02.01 :: GR FG V1.7
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
		
		//	SHM Process
			if(fcode=="SAPEVT_L004"){ 
				if (oCon.getControl('l002inpFlag').getValue() == 'Add') {
					return oParameters = { 
						"iaufnr" 	: oCon.getControl('l002InpAufnr').getValue(),
						"imatnr"	: oCon.getControl('l002InpMatnr').getValue(),
						"icharg"	: oCon.getControl('l002DiaInpBatchNumber').getValue(),
						"ihsdat"	: oCon.getControl('l002DiaInpMfgDate').getValue(),
						"ivfdat"	: oCon.getControl('l002DiaInpExpDate').getValue(),
						"imenge"	: oCon.getControl('l002DiaInpQTY').getValue(),
						"imeins"	: oCon.getControl('l002DiaInpQTYUnit').getValue(),
						"iflag"		: oCon.getControl('l002inpFlag').getValue(),
						"itext"		: oCon.getControl('l002DiaInpText').getValue(),											// ++ 2018.01.30 :: GR FG V1.7
						"iset"		: oCon.getControl('l002InpSet').getValue(),												// ++ 2018.10.05 :: GR FG V2.2.1
					};
				} else if (oCon.getControl('l002inpFlag').getValue() == 'Dis') {
					return oParameters = { 
						"iflag"		: oCon.getControl('l002inpFlag').getValue(),
					};					
				} else if (oCon.getControl('l002inpFlag').getValue() == 'Clr') {											// ++ 2018.01.30 :: GR FG V1.7
					return oParameters = { 
						"iflag"		: oCon.getControl('l002inpFlag').getValue(),
					};				
				} else if (oCon.getControl('l002inpFlag').getValue() == 'Del') {											// ++ 2018.01.30 :: GR FG V1.7
					return oParameters = { 
						"iflag"		: oCon.getControl('l002inpFlag').getValue(),
						"iindex"	: oCon.getControl('l003inpInd').getValue(), 
					};				
				}
			};
			
		//	Post GR
			if(fcode=="SAPEVT_L005"){
				if (oCTX.oData.hybrid == 'X') { oCTX.oData.mode = "App" }													// ++ 2018.06.29 :: For Printer WANG NOI
				return oParameters = { 		
					"iaufnr" 	: oCon.getControl('l002InpAufnr').getValue(),
					"imatnr"	: oCon.getControl('l002InpMatnr').getValue(),
					//"ilgort"	: oCon.getControl('l002InpSlocNumber').getValue(),
					"ilgort"	: oCon.getControl('l002SelSlocNumber').getSelectedKey(),
					"imodeset"	: oCon.getControl('l001InpMode').getValue(),
					"imode"  	: oCTX.oData.mode,
				};			
			};
	
	},

//	Model Set 
//	--------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){

	//	L001: List Process Order
	//	-------------------------------------------------------------------------------- 
		
		//	List Process Order
			if(fcode=="SAPEVT_L001"){ 
				oCon.getControl('l001TblAufFG').setModel(oModela);
				oCon.getControl('l001TblAufWIP').setModel(oModela);
			};

	//	L002: List Detail and GR Input
	//	--------------------------------------------------------------------------------
		
		//	Detail and GR Input	
			if(fcode=="SAPEVT_L002"){ 
				oCon.getControl('l002InpAufnr').setModel(oModela);
				oCon.getControl('l002InpMatnr').setModel(oModela);
				oCon.getControl('l002InpMaktx').setModel(oModela);
				oCon.getControl('l002InpWerks').setModel(oModela);
				oCon.getControl('l002InpWerksText').setModel(oModela);
				//oCon.getControl('l002InpSlocNumber').setModel(oModela);
				//oCon.getControl('l002InpSlocName').setModel(oModela);
				oCon.getControl('l002SelSlocNumber').setModel(oModela);
				oCon.getControl('l002InpMfgDate').setModel(oModela);
				oCon.getControl('l002InpQTYUnit').setModel(oModela);
				oCon.getControl('l002InpState').setModel(oModela);
				oCon.getControl('l002InpBatType').setModel(oModela);
				oCon.getControl('l002InpBaseUnit').setModel(oModela);
			};
		
		//	Dialog Display Batch Number && Mfg Date
			if(fcode=="SAPEVT_L003"){ 
				oCon.getControl('l002DiaInpQTY').setModel(oModela);
				oCon.getControl('l002DiaInpQTYUnit').setModel(oModela);
				//oCon.getControl('l002DiaInpMfgExpDate').setModel(oModela);												// ++ 2018.10.08 :: GR FG V2.2.2 :: delete 'l002DiaInpMfgExpDate'
				oCon.getControl('l002DiaInpBatchNumber').setModel(oModela);				
				oCon.getControl('l002DiaInpMfgDate').setModel(oModela);
				oCon.getControl('l002DiaInpExpDate').setModel(oModela);
			};
			
		//	After SHM Process 																								// ++ 2018.01.30 :: GR FG V1.6
			if(fcode=="SAPEVT_L004"){
				oCon.getControl('l003TblOvw').setModel(oModela);
				if (oCon.getControl('l002inpFlag').getValue() == 'Add' && oModela.oData.logon.typ=='S') {
					oCon.popMsgbox(oModela.oData.logon.msg);					
				}
				if (oCon.getControl('l002inpFlag').getValue() == 'Dis') {
					app.to('L003','slide');
				}
			};
			
		//	After Post GR 																									// ++ 2018.01.30 :: GR FG V1.6 [Change Event No. from L004 to L005]		
			if(fcode=="SAPEVT_L005"){
				//oCon.getControl('l002DiaErrSucMsg').setModel(oModela);
			};
		
	},

//	Set UI 
//	--------------------------------------------------------------------------------
	
	M04_DYN: function(fcode,oModela){

	//	L001: List Process Order
	//	-------------------------------------------------------------------------------- 
		
		//	List Process Order
			if(fcode=='SAPEVT_L001'){ 
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

	//	L002: List Detail and GR Input
	//	--------------------------------------------------------------------------------
		
		//	Process Order - Select From List
			if(fcode=='SAPEVT_L002'){

				oCon.getControl('l002InpText').setVisible(true);															// ++ 2018.10.03 :: GR FG V2.2.1 :: Enable input field for GR FG
				oCon.getControl('l002DiaInpText').setVisible(true);															// ++ 2018.02.01 :: GR FG V1.7 
				
				//state ==> Visible 1(true), 0(false) 
				//state has 4 digit[1110] 1st(Line) 2nd(Hour) 3rd(Soak) 4th(WIPReason)
				var state = oCon.getControl('l002InpState').getValue();
				if(state.substring(0,1)=="1")oCon.getControl('l002InpLine').setVisible(true);
					else oCon.getControl('l002InpLine').setVisible(false);
				if(state.substring(1,2)=="1")oCon.getControl('l002InpHR').setVisible(true);
					else oCon.getControl('l002InpHR').setVisible(false);
				if(state.substring(2,3)=="1")oCon.getControl('l002InpSoak').setVisible(true);
					else oCon.getControl('l002InpSoak').setVisible(false);
				if(state.substring(3,4)=="1") {
					oCon.getControl('l002InpWIPReason').setVisible(true);
				} else {
					oCon.getControl('l002InpWIPReason').setVisible(false);
				}
				
																						// ++ 2018.12.11 :: GR FG V1.0.0 
				oCon.getControl('l002InpQTY').setValue();
				oCon.getControl('l002InpSet').setValue();
				oCon.getControl('l002InpLine').setValue();
				oCon.getControl('l002InpHR').setValue();
				oCon.getControl('l002InpSoak').setValue();
				oCon.getControl('l002InpWIPReason').setValue();
				oCon.getControl('l002InpText').setValue();
				
			};
			
		//	Dialog Display Batch Number && Mfg Date
			if(fcode=='SAPEVT_L003'){ 
							
				oCon.getControl('l002DiaInpMfgDate').setEditable(false);													// ++ 2018.10.08 :: GR FG V2.2.2 :: set editable 'l002DiaInpMfgDate'
				oCon.getControl('l002DiaInpExpDate').setEditable(false);													// ++ 2018.10.08 :: GR FG V2.2.2 :: set editable 'l002DiaInpExpDate'
				
				if (oModela.oData.t_l_grwbat[0].flag == 'X') { oCon.getControl('l002DiabtnEdit').setVisible(true) }			// ++ 2018.10.08 :: GR FG V2.2.2 :: set visible button edit (according to Configuration)
					else { oCon.getControl('l002DiabtnEdit').setVisible(false) }	

				if (oModela.oData.t_l_grwbat[0].vfdat=='00000000') { oCon.getControl('l002DiaInpExpDate').setValue() }		// ++ 2018.10.08 :: GR FG V2.2.2 :: set Exp. date = blank if vfdat is undefined (00000000)
				
				oCon.getControl('l002DiaSav').open();
				//oCon.getControl('l002DiaInpMfgExpDate').setValue(															// -- 2018.10.08 :: GR FG V2.2.2 :: delete 'l002DiaInpMfgExpDate'
				//		this.changeMfgExpDate(oCon.getControl('l002DiaInpMfgExpDate').getValue())
				//);
				oCon.getControl('l002DiaTitle').setText(
						oCon.getControl('l002InpAufnr').getValue()
						+ " : " +
						oCon.getControl('l002InpMatnr').getValue()
						+ " : " +
						oCon.getControl('l002InpMaktx').getValue()
				);

				if(!oCon.getControl('l002DiaInpText').getValue()){ oCon.getControl('l002DiaInpText').setVisible(false) }	// ++ 2018.10.08 :: GR FG V2.2.2 :: set visible of text in dialog (invisible if value is blank)
					else { oCon.getControl('l002DiaInpText').setVisible(true) }
			};
			
		// 	Save SHM 																										// ++ 2018.01.30 :: GR FG V1.6 
			if(fcode=='SAPEVT_L004'){ 
				if (oCon.getControl('l002inpFlag').getValue() == 'Add' && oModela.oData.logon.typ == 'S') {
					oCon.getControl('l002inpFlag').setValue();			
					oCon.getControl('l002InpQTY').setValue();
					oCon.getControl('l002InpSet').setValue();
					oCon.getControl('l002InpLine').setValue();
					oCon.getControl('l002InpHR').setValue();
					oCon.getControl('l002InpSoak').setValue();
					oCon.getControl('l002InpWIPReason').setValue();
					oCon.getControl('l002InpText').setValue();
					oCon.getControl('l002DiaSav').close();	
					oCon.getControl('l003inpInd').close();																	// ++ 2018.02.01 :: GR FG V1.7 
				} else { 																									// ++ 2018.12.11 :: GR FG V1.0.0  
					oCon.getControl('l002InpQTY').setValue();
					oCon.getControl('l002InpSet').setValue();
					oCon.getControl('l002InpLine').setValue();
					oCon.getControl('l002InpHR').setValue();
					oCon.getControl('l002InpSoak').setValue();
					oCon.getControl('l002InpWIPReason').setValue();
					oCon.getControl('l002InpText').setValue();
				} 
				//else { oCon.getControl('l002DiaInpExpDate')._openPopup(); }
			};

	//	L003: Post GR
	//	--------------------------------------------------------------------------------
		
		// 	After Post GR 																									// ++ 2018.01.30 :: GR FG V1.6 
			if(fcode=='SAPEVT_L005'){
				if(oCon.checkErrSuc(oModela,"S")){	
					oCon.popMsgbox(oModela.oData.logon.msg);
					if (oCTX.oData.hybrid != 'X' && oModela.oData.head.pdf_url != '') {										// ++ 2018.05.02 :: GR - Process Order V1.9
							var mWin = window.open(oModela.oData.head.pdf_url);
							mWin.print();
					}					
				} else {																									// ++ 2018.06.30 :: [ T E M P O R A R Y !! ] Prevent msg 'ZUI5LENUM'
					if (oModela.oData.return[0].msg != '') {
						oCon.popMsgbox(oModela.oData.return[0].msg);						
					}
				}
				oCon.ui5DispatchBackEnd("SAPEVT_L001","evt_l001","{i18n>MSG_PROCESS}");
			};
		
	},

//	Navigation 
//--------------------------------------------------------------------------------
	
	M05_NAV: function(fcode,oModela){

	//	L001: List Process Order
		if(fcode=="SAPEVT_L001")	{app.to('L001','slide');};
		if(fcode=='l001btnBck')		{oCon.nav_home();};
	//	L002: List Detail and GR Input
		if(fcode=="SAPEVT_L002")	{app.to('L002','slide');};
		if(fcode=='l002btnBck')		{oCon.ui5DispatchBackEnd("SAPEVT_L001","evt_l001","{i18n>MSG_PROCESS}");};
		if(fcode=='l002btnHom')		{oCon.nav_home();}; 
	//	L003: Display SHM 																									// ++ 2018.01.30 :: GR FG V1.6
		if(fcode=='l003btnBck')		{app.to('L002','slide');};
		if(fcode=='l003btnHom')		{oCon.nav_home();};
	},

//	Navigation 
//	--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
		//	Set selected key as receive sloc in Production Version
			if(fcode=="SAPEVT_L002"){
				oCon.getControl('l002SelSlocNumber').setSelectedKey(oModela.oData.t_l_grwmat[0].lgort)
			};
		
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
		if(inp.match("^([1-9]|[a-z]|[A-Z])$"))return true;
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
		if(number < 10 && inp.substring(0,1) != "0") return "0" + inp;
		else return inp;
	},

});