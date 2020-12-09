sap.ui.controller("zui5sd00e04.F.F000", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//-------------------------------------------------------------------- F001
		if(fcode=='f001til01'){
			oCon.ui5DispatchBackEnd("SAPEVT_F002","evt_f002","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='f001til02'){ //by Premix
			oCon.ui5DispatchBackEnd("SAPEVT_F401","evt_f401","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='f001til03'){
			oCon.ui5DispatchBackEnd("SAPEVT_F104","evt_f104","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='f001til05'){
			oCon.ui5DispatchBackEnd("SAPEVT_F301","evt_f301","{i18n>MSG_PROCESS}");
		};
		
		//-------------------------------------------------------------------- F002						
		if(fcode=='f002btnAcp'){//Edit - OK
			oCon.getCell('f002TblOvw',6).setText(oCon.fmtDec(oCon.getControl('f002inpOrder').getValue(),3));
		};
		
		if(fcode=='f002btnEdt'){ //Edit KG/Set
			if(!oCon.isSelected('f002TblOvw')){return;};
			
			oCon.getControl('f002txtPmxnrKG').setText('Premix Order ' + oCon.getProperty('f002TblOvw','pmxnr'));
			oCon.getControl('f002inpMatnrPxKG').setValue(oCon.getProperty('f002TblOvw','matnr_px') + ' ' + oCon.getProperty('f002TblOvw','maktx_px'));
			oCon.getControl('f002inpMatnrInKG').setValue(oCon.getProperty('f002TblOvw','matnr_in') + ' ' + oCon.getProperty('f002TblOvw','maktx_in'));
			oCon.getControl('f002inpMengePkgKG').setValue(oCon.getProperty('f002TblOvw','menge_pkg'));
			oCon.getControl('f002inpMengePkgKGO').setValue(oCon.getProperty('f002TblOvw','menge_pkg'));
			oCon.getControl('f002DiaKG').open();
		};	
		if(fcode=='f002btnKGAcp'){
			oCon.ui5DispatchBackEnd("SAPEVT_F003","evt_f003","{i18n>MSG_PROCESS}");
			oCon.getControl('f002DiaKG').close();
		};
		
		//-------------------------------------------------------------------- Weight Dialog
		if(fcode=='f002btnWei'){ //Dialog Weight
		
			if(!oCon.isSelected('f002TblOvw')){return;};
			if(!oCon.chkOrdAmt(oCon.getProperty('f002TblOvw','menge_ost'))){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_F004","evt_f004","{i18n>MSG_PROCESS}");

		};		
		
		if(fcode=='f002btnWeiNex'){ //Change Batch	
			oCon.ui5DispatchBackEnd("SAPEVT_F006","evt_f006","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='f002btnWeiOk'){ //Weight OK		
			oCon.ui5DispatchBackEnd("SAPEVT_F005","evt_f005","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=="f002InpQrData"){
			var oModel = oCon.getQrData(oCon.getControl('f002InpQrData').getValue());
			oCon.getControl('f002InpQrData').setValue();
			
			if(oModel.oData.matnr!=oCon.getControl('f002TxtWMatnr').getText()){
				oCon.popMsgbox('Material not valid'); return;
			};
			oCon.getControl('f002TxtWCharg').setText(oModel.oData.charg);
			oCon.getControl('f002TxtWQrcod').setText(oModel.oData.qrcod);
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		
		if(fcode=="SAPEVT_F002"){//List PREMIX Order - PREMIX
			return oParameters = { 
				"idate" : oCon.getControl('f002inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('f002chkShiftD'),
				"iaprion" : oCon.getAbapTrue('f002chkShiftN'),
			};
		};
				
		if(fcode=="SAPEVT_F003"){//Edit KG/Set
			return oParameters = { 
				"idate" 		: oCon.getControl('f002inpDate').getValue(),
				"iapriod" 		: oCon.getAbapTrue('f002chkShiftD'),
				"iaprion" 		: oCon.getAbapTrue('f002chkShiftN'),
				"ipmxnr"  		: oCon.getProperty('f002TblOvw','pmxnr'),
				"ipospx"  		: oCon.getProperty('f002TblOvw','pospx'),
				"ietenr"  		: oCon.getProperty('f002TblOvw','etenr'),
				"imenge_pkg"  	: oCon.getControl('f002inpMengePkgKG').getValue(),
				"imenge_pkgo"  	: oCon.getControl('f002inpMengePkgKGO').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_F004"){//Start Weight Dialog
			return oParameters = { 
				"idate" 		: oCon.getControl('f002inpDate').getValue(),
				"iapriod" 		: oCon.getAbapTrue('f002chkShiftD'),
				"iaprion" 		: oCon.getAbapTrue('f002chkShiftN'),
				"ipmxnr"  		: oCon.getProperty('f002TblOvw','pmxnr'),
				"ipospx"  		: oCon.getProperty('f002TblOvw','pospx'),
				"ietenr"  		: oCon.getProperty('f002TblOvw','etenr'),
				"imatnr"  		: oCon.getProperty('f002TblOvw','matnr_in'),
				"imenge" 		: oCon.getProperty('f002TblOvw','menge_ost'),
				"imenge_pkg"  	: oCon.getProperty('f002TblOvw','menge_pkg'),
				"imenge_wst"  	: oCon.getProperty('f002TblOvw','menge_wst'),
				"iwstep"		: oCon.getControl('a002InpWTole').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_F005"||fcode=="SAPEVT_F006"){ //Weight Confirmaiton
			return oParameters = { 
				"idate" 	: oCon.getControl('f002inpDate').getValue(),
				"iapriod" 	: oCon.getAbapTrue('f002chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('f002chkShiftN'),
				"iaufnr" 	: oCTX.oData.aufnr,
				"ipmxnr" 	: oCTX.oData.pmxnr,
				"ipospx" 	: oCTX.oData.pospx,
				"ietenr"	: oCTX.oData.etenr,
				"imatnr"  	: oCon.getControl('f002TxtWMatnr').getText(),
				"icharg"    : oCon.getControl('f002TxtWCharg').getText(),
				"iweight"	: oCon.getControl('f002TxtMengeSkgW').getText(),
				"isets"		: oCon.getControl('f002TxtWSets').getText(),
				"iwstep"	: oCon.getControl('a002InpWTole').getValue(),
			};
		};	
		
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=='SAPEVT_F002'){ //List PREMIX Order
			oCon.getControl('f002TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_F003'&&oModela.oData.logon.typ=='S'){ //List PREMIX Order
			oCon.getControl('f002TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_F004'){ //Start Weight Dialog
			oCTX.oData.aufnr = oCon.getProperty('f002TblOvw','aufnr');
			oCTX.oData.pmxnr = oCon.getProperty('f002TblOvw','pmxnr');
			oCTX.oData.pospx = oCon.getProperty('f002TblOvw','pospx');
			oCTX.oData.etenr = oCon.getProperty('f002TblOvw','etenr');
			oApp.diaWeight_PBO('f002',oModela);
		};
		
		if(fcode=='SAPEVT_F005'||fcode=='SAPEVT_F006'){ //Weight Confirmation OK
			if(oModela.oData.logon.typ=='E'){
				oCTX.oData.cancel_nav = true;
			}else{
				oApp.diaWeight_PAI('f002',fcode,oModela);
				oCon.getControl('f002TblOvw').setModel(oModela);
			};
		};

		
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
						
		if(fcode=='SAPEVT_F005'||fcode=='SAPEVT_F003'){ //Restore Selected Line
			for(var i=0;i<oCon.getControl('f002TblOvw').getItems().length;i++){
				if(oCon.getControl('f002TblOvw').getItems()[i].getBindingContext().getProperty('mark')=='X'){
					oCon.getControl('f002TblOvw').setSelectedItem(oCon.getControl('f002TblOvw').getItems()[i])
				};
			};
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="SAPEVT_F001")    {app.to('F001','slide');};
		if(fcode=="SAPEVT_F002")    {app.to('F002','slide');};
		
		if(fcode=='f001btnBck')		{oCon.nav_home();};
		if(fcode=='f002btnBck')		{app.to('F001','slide');};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		

	},
});