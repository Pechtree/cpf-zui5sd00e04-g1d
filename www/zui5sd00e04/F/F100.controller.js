sap.ui.controller("zui5sd00e04.F.F100", {
	
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- F101	
		if(fcode=='f101btnAcp'){//Edit - OK
			oCon.getCell('f101TblOvw',6).setText(oCon.fmtDec(oCon.getControl('f101inpOrder').getValue(),3));
		};
		if(fcode=='f101btnEdt'){//Edit - KG/SET
			if(!oCon.isSelected('f101TblOvw')){return;};
			
			oCon.getControl('f101txtTfrnrKG').setText('Transfer Order ' + oCon.getProperty('f101TblOvw','tfrnr'));
			oCon.getControl('f101inpAufnrKG').setValue(oCon.getProperty('f101TblOvw','aufnr'));
			oCon.getControl('f101inpMatnrInKG').setValue(oCon.getProperty('f101TblOvw','matnr_in') + ' ' + oCon.getProperty('f101TblOvw','maktx_in'));
			oCon.getControl('f101inpMengePkgKG').setValue(oCon.getProperty('f101TblOvw','menge_pkg'));
			oCon.getControl('f101inpMengePkgKGO').setValue(oCon.getProperty('f101TblOvw','menge_pkg'));
			oCon.getControl('f101DiaKG').open();
		};
		if(fcode=='f101btnKGAcp'){ //Edit KG/Set Save
			oCon.ui5DispatchBackEnd("SAPEVT_F102","evt_f102","{i18n>MSG_PROCESS}");
			oCon.getControl('f101DiaKG').close();
		};
		
		//----------------------------------------------------------- F102
		if(fcode=='f102TblAuf'){
			oCon.ui5DispatchBackEnd("SAPEVT_F101","evt_f101","{i18n>MSG_PROCESS}");
		};
		
		//-------------------------------------------------------------------- Weight Dialog
		if(fcode=='f101btnWei'){ //Dialog Weight
			
			if(!oCon.isSelected('f101TblOvw')){return;};
			if(!oCon.chkOrdAmt(oCon.getProperty('f101TblOvw','menge_ost'))){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_F105","evt_f105","{i18n>MSG_PROCESS}");

		};
		
		
		if(fcode=='f101btnWeiNex'){ //Change Batch		
			oCon.ui5DispatchBackEnd("SAPEVT_F107","evt_f107","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='f101btnWeiOk'){ //Weight OK			
			oCon.ui5DispatchBackEnd("SAPEVT_F106","evt_f106","{i18n>MSG_PROCESS}");
		};
		if(fcode=="f101InpQrData"){
			var oModel = oCon.getQrData(oCon.getControl('f101InpQrData').getValue());
			oCon.getControl('f101InpQrData').setValue();
			
			if(oModel.oData.matnr!=oCon.getControl('f101TxtWMatnr').getText()){
				oCon.popMsgbox('Material not valid'); return;
			};
			oCon.getControl('f101TxtWCharg').setText(oModel.oData.charg);
			oCon.getControl('f101TxtWQrcod').setText(oModel.oData.qrcod);
		};
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_F101"){//List Transfer Order
			return oParameters = { 
				"iaufnr"	: oCon.getProperty('f102TblAuf','aufnr'),
				"idate"   	: oCon.getControl('f102inpDate').getValue(),
				"iapriod" 	: oCon.getAbapTrue('f102chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('f102chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_F102"){//Edit KG/SEt
			return oParameters = { 
				"iaufnr"		: oCon.getProperty('f102TblAuf','aufnr'),
				"idate"   		: oCon.getControl('f102inpDate').getValue(),
				"iapriod" 		: oCon.getAbapTrue('f102chkShiftD'),
				"iaprion" 		: oCon.getAbapTrue('f102chkShiftN'),
				"itfrnr"  		: oCon.getProperty('f101TblOvw','tfrnr'),
				"ipostr"  		: oCon.getProperty('f101TblOvw','postr'),
				"ietenr"  		: oCon.getProperty('f101TblOvw','etenr'),
				"imenge_pkg"  	: oCon.getControl('f101inpMengePkgKG').getValue(),
				"imenge_pkgo"  	: oCon.getControl('f101inpMengePkgKGO').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_F104"){//List Transfer Order
			return oParameters = { 
				"idate"   : oCon.getControl('f102inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('f102chkShiftD'),
				"iaprion" : oCon.getAbapTrue('f102chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_F105"){//Start Weight Dialog
			return oParameters = { 
				"iaufnr"		: oCon.getProperty('f102TblAuf','aufnr'),
				"idate"   		: oCon.getControl('f102inpDate').getValue(),
				"iapriod" 		: oCon.getAbapTrue('f102chkShiftD'),
				"iaprion" 		: oCon.getAbapTrue('f102chkShiftN'),
				"itfrnr"  		: oCon.getProperty('f101TblOvw','tfrnr'),
				"ipostr"  		: oCon.getProperty('f101TblOvw','postr'),
				"ietenr"  		: oCon.getProperty('f101TblOvw','etenr'),
				"ivornr"  		: oCon.getProperty('f101TblOvw','vornr'),
				"imatnr"  		: oCon.getProperty('f101TblOvw','matnr_in'),
				"imenge" 		: oCon.getProperty('f101TblOvw','menge_ost'),
				"imenge_pkg"  	: oCon.getProperty('f101TblOvw','menge_pkg'),
				"imenge_wst"  	: oCon.getProperty('f101TblOvw','menge_wst'),
				"iwstep"		: oCon.getControl('a002InpWTole').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_F106"||fcode=="SAPEVT_F107"){ //Weight Confirmaiton
			return oParameters = {
				"idate"   	: oCon.getControl('f102inpDate').getValue(),
				"iapriod" 	: oCon.getAbapTrue('f102chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('f102chkShiftN'),	
			    "iaufnr" 	: oCTX.oData.aufnr,
				"itfrnr" 	: oCTX.oData.tfrnr,
				"ipostr" 	: oCTX.oData.postr,
				"ietenr" 	: oCTX.oData.etenr,
				"iqrcod"	: oCon.getControl('f101TxtWQrcod').getText(),
				"imatnr"  	: oCon.getControl('f101TxtWMatnr').getText(),
				"icharg"    : oCon.getControl('f101TxtWCharg').getText(),
				"iweight"	: oCon.getControl('f101TxtMengeSkgW').getText(),
				"isets"		: oCon.getControl('f101TxtWSets').getText(),
				"iwstep"	: oCon.getControl('a002InpWTole').getValue(),
			};
		};	
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=='SAPEVT_F101'){ //List Transfer Order
			oCon.getControl('f101TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_F102'&&oModela.oData.logon.typ=='S'){ //List Transfer Order
			oCon.getControl('f101TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_F104'){ //List Process Order
			oCon.getControl('f102TblAuf').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_F105'){ //Start Weight Dialog
			oCTX.oData.aufnr = oCon.getProperty('f101TblOvw','aufnr');
			oCTX.oData.tfrnr = oCon.getProperty('f101TblOvw','tfrnr');
			oCTX.oData.postr = oCon.getProperty('f101TblOvw','postr');
			oCTX.oData.etenr = oCon.getProperty('f101TblOvw','etenr');
			oApp.diaWeight_PBO('f101',oModela);
		};
		
		
		if(fcode=='SAPEVT_F106'||fcode=='SAPEVT_F107'){ //Weight Confirmation OK
			if(oModela.oData.logon.typ=='E'){
				oCTX.oData.cancel_nav = true;
			}else{
				oApp.diaWeight_PAI('f101',fcode,oModela);
				oCon.getControl('f101TblOvw').setModel(oModela);
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
		
		if(fcode=="SAPEVT_F104")    {app.to('F102','slide');};
		if(fcode=="SAPEVT_F101")    {app.to('F101','slide');};

		if(fcode=='f101btnBck')		{app.to('F102','slide');};
		if(fcode=='f102btnBck')		{app.to('F001','slide');};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
});