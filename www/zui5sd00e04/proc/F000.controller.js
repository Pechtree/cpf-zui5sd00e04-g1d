sap.ui.controller("zui5sd00e04.proc.F000", {

//	--------------------------------------------------------------------------------	
//	PAI FCODE 
//	--------------------------------------------------------------------------------
	
	M01_FCD: function(fcode,oModela){
		
	//	-------------------------------------------------------------------- F001
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
		
	//	-------------------------------------------------------------------- F002
	//	Edit - OK
		if(fcode=='f002btnAcp'){
			//oCon.getCell('f002TblOvw',6).setText(oCon.fmtDec(oCon.getControl('f002inpOrder').getValue(),3));				// +- 2018.10.16 :: Weight-PRMX V1.3.1
			oCon.getCell('f002TblOvw',6).setText(oCon.fmtDec(oCon.getControl('f002inpOrder').getValue(),6));				// Change 'f002TblOvw' to 6 digit
		};
		
	//	Edit KG/Set
		if(fcode=='f002btnEdt'){ 
			if(!oCon.isSelected('f002TblOvw')){return;};			
			oCon.getControl('f002txtPmxnrKG').setText(
				'Premix Order ' + oCon.getProperty('f002TblOvw','pmxnr')
			);
			oCon.getControl('f002inpMatnrPxKG').setValue(
				oCon.getProperty('f002TblOvw','matnr_px') + ' ' + 
				oCon.getProperty('f002TblOvw','maktx_px')
			);
			oCon.getControl('f002inpMatnrInKG').setValue(
				oCon.getProperty('f002TblOvw','matnr_in') + ' ' + 
				oCon.getProperty('f002TblOvw','maktx_in')
			);
			oCon.getControl('f002inpMengePkgKG').setValue(
				oCon.getProperty('f002TblOvw','menge_pkg')
			);
			oCon.getControl('f002inpMengePkgKGO').setValue(
				oCon.getProperty('f002TblOvw','menge_pkg')
			);
			oCon.getControl('f002DiaKG').open();
		};	
		if(fcode=='f002btnKGAcp'){
			oCon.ui5DispatchBackEnd("SAPEVT_F003","evt_f003","{i18n>MSG_PROCESS}");
			oCon.getControl('f002DiaKG').close();
		};
		
	//	-------------------------------------------------------------------- F002 [Weight Dialog]
	//	Dialog Weight
		if(fcode=='f002btnWei'){		
			if(!oCon.isSelected('f002TblOvw')){return;};
			if(!oCon.chkOrdAmt(oCon.getProperty('f002TblOvw','menge_ost'))){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_F004","evt_f004","{i18n>MSG_PROCESS}");
		};		
		
	//	Change Batch
		if(fcode=='f002btnWeiNex'){
			oCon.ui5DispatchBackEnd("SAPEVT_F006","evt_f006","{i18n>MSG_PROCESS}");
		};
		
	//	Weight OK
		if(fcode=='f002btnWeiOk'){ 		
			oCon.ui5DispatchBackEnd("SAPEVT_F005","evt_f005","{i18n>MSG_PROCESS}");
		};
		
	// 	Scan Ingredient		
		if(fcode=="f002InpQrData"){
			var oModel = oCon.getQrData(oCon.getControl('f002InpQrData').getValue());
			oCon.getControl('f002InpQrData').setValue();
			
			if(oModel.oData.matnr!=oCon.getControl('f002TxtWMatnr').getText()){
				oCon.popMsgbox('Material not valid'); return;
			};
			oCon.getControl('f002TxtWCharg').setText(oModel.oData.charg);
			oCon.getControl('f002TxtWQrcod').setText(oModel.oData.qrcod);
		};
		
	//	-------------------------------------------------------------------- F002 [Edit Set (Mass Cap)]
	// 	Determine KG/Set - Calculated by Rate Routing capacity											// ++ 2018.01.03 - F0 V1.0
		if(fcode=='f002btnEdtCap'){
			if(!oCon.isSelected('f002TblOvw')){return;};
			oCon.getControl('f002txtCapPmxnrKG').setText(
				'Premix Order ' + oCon.getProperty('f002TblOvw','pmxnr') + ' / ' + 
				oCon.getProperty('f002TblOvw','matnr_px')
			);
			oCon.getControl('f002inpCapMatnrPxKG').setValue(
				oCon.getProperty('f002TblOvw','maktx_px')
			);
			oCon.ui5DispatchBackEnd("SAPEVT_F007","evt_f007","{i18n>MSG_PROCESS}");
		};	
		
	//	Determine KG/Set - Calculated by SET number from front-end										// ++ 2018.01.03 - F0 V1.0
		if(fcode=='f002btnCapKGCal'){
			oCon.ui5DispatchBackEnd("SAPEVT_F008","evt_f008","{i18n>MSG_PROCESS}");
		};
		
	//	Save Change and Close Dialog																	// ++ 2018.01.03 - F0 V1.0
		if(fcode=='f002btnCapKGAcp'){
			oCon.ui5DispatchBackEnd("SAPEVT_F009","evt_f009","{i18n>MSG_PROCESS}");   
			oCon.getControl('f002DiaCap').close();
		};	
		
	//	Close Dialog																					// ++ 2018.01.03 - F0 V1.0
		if(fcode=='f002btnCapKGCls'){
			oCon.getControl('f002DiaCap').close();
		};
		
	//	Edit Capacity																					// ++ 2019.10.29 - F0 V2.0.0
		if(fcode=='f002btnCapKgEdt'){
			oCon.getControl('f002inpCapBmsch').setVisible(true);
		};
		
	},
	
//	--------------------------------------------------------------------------------	
//	Parameters 
//	--------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){
		
	//	List Premix Order - PREMIX	
		if(fcode=="SAPEVT_F002"){
			return oParameters = { 
				"idate" 		: oCon.getControl('f002inpDate').getValue(),
				"iapriod" 		: oCon.getAbapTrue('f002chkShiftD'),
				"iaprion" 		: oCon.getAbapTrue('f002chkShiftN'),
			};
		};
	
	//	Edit KG/Set
		if(fcode=="SAPEVT_F003"){
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
	
	//	Start Weight Dialog	
		if(fcode=="SAPEVT_F004"){			
			return oParameters = { 
				"idate" 		: oCon.getControl('f002inpDate').getValue(),
				"iapriod" 		: oCon.getAbapTrue('f002chkShiftD'),
				"iaprion" 		: oCon.getAbapTrue('f002chkShiftN'),
				"ipmxnr"  		: oCon.getProperty('f002TblOvw','pmxnr'),
				"ipospx"  		: oCon.getProperty('f002TblOvw','pospx'),
				"ietenr"  		: oCon.getProperty('f002TblOvw','etenr'),
				"imatnr"  		: oCon.getProperty('f002TblOvw','matnr_in'),
				//"imenge" 		: oCon.getProperty('f002TblOvw','menge_ost'),												// +- 2018.10.29 :: Weight-PRMX V1.3.1
				"imenge" 		: oCon.getProperty('f002TblOvw','menge_ost13_6'),											// Change sendingField from 3 digit => 6 digit
				"imenge_pkg"  	: oCon.getProperty('f002TblOvw','menge_pkg'),
				"imenge_wst"  	: oCon.getProperty('f002TblOvw','menge_wst'),
				"iwstep"		: oCon.getControl('a002InpWTole').getValue(),
			};
		};
	
	//	Weight Confirmaiton
		if(fcode=="SAPEVT_F005"||fcode=="SAPEVT_F006"){ 
			return oParameters = { 
				"idate" 		: oCon.getControl('f002inpDate').getValue(),
				"iapriod" 		: oCon.getAbapTrue('f002chkShiftD'),
				"iaprion" 		: oCon.getAbapTrue('f002chkShiftN'),
				"iaufnr" 		: oCTX.oData.aufnr,
				"ipmxnr" 		: oCTX.oData.pmxnr,
				"ipospx" 		: oCTX.oData.pospx,
				"ietenr"		: oCTX.oData.etenr,
				"imatnr"  		: oCon.getControl('f002TxtWMatnr').getText(),
				"icharg"    	: oCon.getControl('f002TxtWCharg').getText(),
				"iweight"		: oCon.getControl('f002TxtMengeSkgW').getText(),
				"isets"			: oCon.getControl('f002TxtWSets').getText(),
				"iwstep"		: oCon.getControl('a002InpWTole').getValue(),
			};
		};
		
	//	Determine KG/Set - Calculated by Rate Routing capacity											// ++ 2018.01.03 - F0 V1.0
		if(fcode=="SAPEVT_F007"){ 
			return oParameters = { 
				"ipmxnr"  		: oCon.getProperty('f002TblOvw','pmxnr'),	
				"ipospx"  		: oCon.getProperty('f002TblOvw','pospx'),								// ++ F0 V1.1
				//"imatnr_px"  	: oCon.getProperty('f002TblOvw','matnr_px'),							// -- F0 V1.1
				"imatnr_pmx"  	: oCon.getProperty('f002TblOvw','matnr_px'),							// ++ F0 V1.1
				"iwerks"  		: oCon.getControl('a002InpWerks').getValue(),
				"imenge"		: oCon.getProperty('f002TblOvw','menge_ost13_6'),						// ++ 2019.11.11 - F0 V2.0.1
			};
		};	
		
	//	Determine KG/Set - Calculated by SET number from front-end  									// ++ 2018.01.03 - F0 V1.0	
		if(fcode=="SAPEVT_F008"){ 
			return oParameters = { 
				"ipmxnr"  		: oCon.getProperty('f002TblOvw','pmxnr'),	
				"ipospx"  		: oCon.getProperty('f002TblOvw','pospx'),								// ++ F0 V1.1
				//"imatnr_px"  	: oCon.getProperty('f002TblOvw','matnr_px'),							// -- F0 V1.1
				"imatnr_pmx"  	: oCon.getProperty('f002TblOvw','matnr_px'),							// ++ F0 V1.1
				"imenge_rst"  	: oCon.getControl('f002inpCapMengeSet').getValue(),
				"ibmsch"  		: oCon.getControl('f002inpCapBmsch').getValue(),						// ++ 2019.10.29 - F0 V2.0.0
			};
		};		
		
	//	Save Change and Close Dialog																	// ++ 2018.01.03 - F0 V1.0	
		if(fcode=="SAPEVT_F009"){ 
			return oParameters = { 
				"ipmxnr"  		: oCon.getProperty('f002TblOvw','pmxnr'),	
				"ipospx"  		: oCon.getProperty('f002TblOvw','pospx'),								// ++ F0 V1.1
				//"imatnr_px"  	: oCon.getProperty('f002TblOvw','matnr_px'),							// -- F0 V1.1
				"imatnr_pmx"  	: oCon.getProperty('f002TblOvw','matnr_px'),							// ++ F0 V1.1
				"imenge_ist"  	: oCon.getControl('f002inpCapMengeSet').getValue(),
			};
		};
		
	},
	
//	--------------------------------------------------------------------------------	
//	Model Set 
//	--------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){
		
	//	List Premix Order - PREMIX
		if(fcode=='SAPEVT_F002'){
			oCon.getControl('f002TblOvw').setModel(oModela);
		};
		
	//	List PREMIX Order
		if(fcode=='SAPEVT_F003'&&oModela.oData.logon.typ=='S'){ 
			oCon.getControl('f002TblOvw').setModel(oModela);
		};
		
	//	Start Weight Dialog
		if(fcode=='SAPEVT_F004'){ 
			oCTX.oData.aufnr = oCon.getProperty('f002TblOvw','aufnr');
			oCTX.oData.pmxnr = oCon.getProperty('f002TblOvw','pmxnr');
			oCTX.oData.pospx = oCon.getProperty('f002TblOvw','pospx');
			oCTX.oData.etenr = oCon.getProperty('f002TblOvw','etenr');
			oApp.diaWeight_PBO('f002',oModela);
		};
		
	//	Weight Confirmation OK
		if(fcode=='SAPEVT_F005'||fcode=='SAPEVT_F006'){ 
			if(oModela.oData.logon.typ=='E'){
				oCTX.oData.cancel_nav = true;
			}else{
				oApp.diaWeight_PAI('f002',fcode,oModela);
				oCon.getControl('f002TblOvw').setModel(oModela);
			};
		};
		
	// 	Edit Set - Calculated SET by System																// ++ 2018.01.03 - F0 V1.0
		if(fcode=='SAPEVT_F007'){ 
			oCon.getControl('f002inpCapMengePkgKGO').setModel(oModela);
			oCon.getControl('f002inpCapMeinsPkgKGO').setModel(oModela);
			oCon.getControl('f002inpCapMengeSet').setModel(oModela);
			oCon.getControl('f002inpCapBmsch').setModel(oModela);										// ++ 2019.10.29 - F0 V2.0.0
			oCon.getControl('f002inpCapBmsch').setVisible(false);										// ++ 2019.10.29 - F0 V2.0.0
			oCon.getControl('f002DiaCap').open();
		};
		
	// 	Edit Set - Manual Input SET Number																// ++ 2018.01.03 - F0 V1.0
		if(fcode=='SAPEVT_F008'){ 
			oCon.getControl('f002inpCapMengePkgKGO').setModel(oModela);
			oCon.getControl('f002inpCapMeinsPkgKGO').setModel(oModela);
			oCon.getControl('f002inpCapMengeSet').setModel(oModela);
		};
	
	// 	Edit Set - Manual Input SET Number																// ++ 2018.01.03 - F0 V1.0
		if(fcode=='SAPEVT_F009'){ 
			oCon.ui5DispatchBackEnd("SAPEVT_F002","evt_f002","{i18n>MSG_PROCESS}");
		};
		
	},
	
//	--------------------------------------------------------------------------------	
//	Set UI 
//	--------------------------------------------------------------------------------
	
	M04_DYN: function(fcode,oModela){
	
	//	Restore Selected Line					
		if(fcode=='SAPEVT_F005'||fcode=='SAPEVT_F003'){ 
			for(var i=0;i<oCon.getControl('f002TblOvw').getItems().length;i++){
				if(oCon.getControl('f002TblOvw').getItems()[i].getBindingContext().getProperty('mark')=='X'){
					oCon.getControl('f002TblOvw').setSelectedItem(oCon.getControl('f002TblOvw').getItems()[i])
				};
			};
		};
		
	},
	
//	--------------------------------------------------------------------------------	
//	Navigation 
//	--------------------------------------------------------------------------------
	
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="SAPEVT_F001")    {app.to('F001','slide');};
		if(fcode=="SAPEVT_F002")    {app.to('F002','slide');};
		
		if(fcode=='f001btnBck')		{oCon.nav_home();};
		if(fcode=='f002btnBck')		{app.to('F001','slide');};
		
	},
	
//	--------------------------------------------------------------------------------	
//	Navigation 
//	--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		

	},
	
});