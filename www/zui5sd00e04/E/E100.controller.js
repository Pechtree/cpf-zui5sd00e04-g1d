sap.ui.controller("zui5sd00e04.E.E100", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- E101
		if(fcode=='e101TblOvw'){// Start/Continue Pick
			if(!oCon.isSelected('e101TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_E102","evt_e102","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- E102
		if(fcode=='e102TblOvw'){ //List Transfer Order
			if(!oCon.isSelected('e102TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_E105","evt_e105","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='e102btnDis'){ //Display Actual Batch
			if(!oCon.isSelected('e101TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_E104","evt_e104","{i18n>MSG_PROCESS}");
		};
		if(fcode=='e102btnDet'){// Refresh Batch
			if(!oCon.isSelected('e101TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_E106","evt_e106","{i18n>MSG_PROCESS}");
		};	
		
		//----------------------------------------------------------- E104
		if(fcode=='e104InpQrData'){//Scan Pick
			var oModel  = oCon.getQrData(oCon.getControl('e104InpQrData').getValue());
			
			oCTX.oData.matnr = oModel.oData.matnr;
			oCTX.oData.charg = oModel.oData.charg;
			oCTX.oData.sets  = oModel.oData.sets;
			oCTX.oData.menge = oModel.oData.menge;
			oCTX.oData.meins = oModel.oData.meins;
			oCTX.oData.qrcod = oModel.oData.qrcod;
			oCon.getControl('e104InpQrData').setValue();
			if(oModel.oData.matnr!=oCon.getProperty('e102TblOvw','matnr_in')){
				oCon.popMsgbox('Material not valid'); return;
			};
			oCon.getControl('e104InpMengeK').setValue(oModel.oData.menge);
			oCon.getControl('e104InpMengeA').setValue(oModel.oData.menge);
			oCon.getControl('e104InpMatnrA').setValue(oModel.oData.matnr);
			oCon.getControl('e104InpChargA').setValue(oModel.oData.charg);
			oCon.getControl('e104InpMeinsA').setValue(oModel.oData.meins);
			oCon.getControl('e104InpQrcodA').setValue(oModel.oData.qrcod);
		};
		
		if(fcode=='e104btnCam'){// User Camera
			oCon.scanCam('e104InpQrData','e104InpQrData');
		};
		
		if(fcode=='e104btnAcp'||fcode=='e104btnPrn'){//Confirm Pick
			var vMengeK = parseFloat(oCon.getControl('e104InpMengeK').getValue());
			var vMengeA = parseFloat(oCon.getControl('e104InpMengeA').getValue());
			
			if(oCon.getControl('e104InpChargA').getValue()==''){
				oCon.popMsgbox('Please enter actual pick batch'); return;
			};
			if(oCon.getControl('e104InpMengeA').getValue()==''){
				oCon.popMsgbox('Please enter actual pick quantity'); return;
			};
			if(oCon.getControl('e104InpMeinsA').getValue()==''){
				oCon.popMsgbox('Please enter actual pick Uom'); return;
			};
			if(vMengeA>vMengeK){
				oCon.popMsgbox('Pick quantity cannot more than sticker quantity'); return;
			};
			
			if(fcode=='e104btnPrn'){
				oCon.getControl('e104InpPrint').setValue('X');
			};
			
			oCon.ui5DispatchBackEnd("SAPEVT_E103","evt_e103","{i18n>MSG_PROCESS}");
		};
		
		
		//----------------------------------------------------------- E105
		if(fcode=='e105TblOvw'){ //Scan			
			
			var lv_pck_qty = parseFloat(oCon.getProperty('e102TblOvw','menge_npk'));
			var lv_tfr_qty = parseFloat(oCon.getProperty('e105TblOvw','menge_npk'));
			
			if(lv_pck_qty<lv_tfr_qty){
				oCon.getControl('e104InpMengeT').setValue(oCon.getProperty('e102TblOvw','menge_npk'));
			}else{
				oCon.getControl('e104InpMengeT').setValue(oCon.getProperty('e105TblOvw','menge_npk'));
			};
			
			oCon.getControl('e104InpTfrnr').setValue(oFmt.fmtAlpha(oCon.getProperty('e105TblOvw','tfrnr')));
			oCon.getControl('e104InpMatnrT').setValue(oCon.getFieldValue('e102TblOvw',['matnr_in','maktx_in']));
			oCon.getControl('e104InpChargT').setValue(oCon.getProperty('e102TblOvw','charg'));
			oCon.getControl('e104InpMeinsT').setValue(oCon.getProperty('e105TblOvw','meins_pkx'));
			oCon.getControl('e104InpMatnrA').setValue();
			oCon.getControl('e104InpChargA').setValue();
			oCon.getControl('e104InpMengeA').setValue();
			oCon.getControl('e104InpMeinsA').setValue();
			oCon.getControl('e104InpQrData').setValue();
			oCon.getControl('e104InpQrcodA').setValue();
			oCon.getControl('e104InpPrint').setValue();
			oCon.getControl('e104InpMengeK').setValue();
			oCon.getFocus('e104InpQrData');
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_E101"){//Pick Order List
			return oParameters = { 
				"idate"   : oCon.getControl('e101inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('e101chkShiftD'),
				"iaprion" : oCon.getAbapTrue('e101chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_E102"){ //Start/Continue Pick
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e101TblOvw','piknr'),};
		};
		
		if(fcode=="SAPEVT_E103"){ //Start/Continue Pick
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e102TblOvw','piknr'),
				"ipospk" 	: oCon.getProperty('e102TblOvw','pospk'),
				"imatnr" 	: oCon.getProperty('e102TblOvw','matnr_in'),
				"icharg" 	: oCon.getProperty('e102TblOvw','charg'),
				"itfrnr" 	: oCon.getProperty('e105TblOvw','tfrnr'),
				"icharga" 	: oCon.getControl('e104InpChargA').getValue(),
			    "imenge" 	: oCon.getControl('e104InpMengeA').getValue(),
			    "imeins" 	: oCon.getControl('e104InpMeinsA').getValue(),
				"iqrcod" 	: oCon.getControl('e104InpQrcodA').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_E104"){ // Display Batch
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e101TblOvw','piknr'),};
		};
		
		if(fcode=="SAPEVT_E105"){ // List transfer order to confirm pick
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e102TblOvw','piknr'),
				"ipospk" 	: oCon.getProperty('e102TblOvw','pospk'),
				"imatnr" 	: oCon.getProperty('e102TblOvw','matnr_in'),
				"icharg" 	: oCon.getProperty('e102TblOvw','charg'),
			};
		};
		
		if(fcode=="SAPEVT_E106"){ //Re-Determine Batch
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('e101TblOvw','piknr'),};
		};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=="SAPEVT_E101"){ //Picking Order
			oCon.getControl('e101TblOvw').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E102"){ //Start/Continue Pick
			oCon.getControl('e102TblOvw').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E103"){ //Confirm Pick
			if(oModela.oData.logon.typ=='S'){
				oCon.getControl('e102TblOvw').setModel(oModela);
				oCon.getControl('e105TblOvw').setModel(oModela);
				//oCon.popMsgbox(oModela.oData.logon.msg);
			}else{
				oCTX.oData.cancel_nav = true;
			}
			
		};
		
		if(fcode=="SAPEVT_E104"){ //Display Batch
			oCon.getControl('e103TblOvw').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E105"){ //List Transfer Order to Confirm
			oCon.getControl('e105TblOvw').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E106"){ //Re-Determine Batch
			oCon.getControl('e102TblOvw').setModel(oModela);
		};
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		var lvChargT = oCon.getControl('e104InpChargT').getValue();
		var lvChargA = oCon.getControl('e104InpChargA').getValue();
		
		if(lvChargA!=lvChargT&&lvChargA!=''){
			oCon.getControl('e104InpChargA').setValueState(sap.ui.core.ValueState.Warning);
		}else{
			oCon.getControl('e104InpChargA').setValueState(sap.ui.core.ValueState.None);
		};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="SAPEVT_E101")    {app.to('E101','slide');};
		if(fcode=="SAPEVT_E102")    {app.to('E102','slide');};
		if(fcode=="SAPEVT_E105")    {app.to('E105','slide');};
		if(fcode=="e105TblOvw")		{app.to('E104','slide');};
		if(fcode=="SAPEVT_E103")    {app.to('E102','slide');};
		if(fcode=="SAPEVT_E104")    {app.to('E103','slide');};

		if(fcode=='e101btnBck')		{oCon.nav_home();};
		if(fcode=='e102btnBck')		{app.to('E101','slide');};
		if(fcode=='e105btnBck')		{app.to('E102','slide');};
		if(fcode=='e104btnBck')		{app.to('E105','slide');};
		if(fcode=='e103btnBck')		{app.to('E102','slide');};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
		if(fcode=='SAPEVT_E103'&&oModela.oData.logon.typ=='S'&oCon.getControl('e104InpPrint').getValue()=='X'){
			oApp.diaPrint_PBO('e104','PIK',
							  oCon.getControl('e104InpMatnrA').getValue(),
							  oCon.getControl('e104InpChargA').getValue(),
							  oCon.getControl('e104InpMengeA').getValue(),
							  oCon.getControl('e104InpMeinsA').getValue(),
							  oCon.getControl('e104InpMengeA').getValue(),
							  oCon.getControl('e104InpQrcodA').getValue()
			);
		};

	},
});