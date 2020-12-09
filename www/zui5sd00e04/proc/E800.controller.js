sap.ui.controller("zui5sd00e04.proc.E800", {
	
//	--------------------------------------------------------------------------------	
//	PAI FCODE 
//	--------------------------------------------------------------------------------
	
	M01_FCD: function(fcode,oModela){
		
	//	----------------------------------------------------------- E801 :: List Transfer Order
		if(fcode=='e801btnAct'){
			if(!oCon.isSelected('e801TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_E802","evt_e802","{i18n>MSG_PROCESS}");
		};
		
	//	----------------------------------------------------------- E802 :: List Transfer Order	Items :: KG
		if(fcode=='e802btnAcp'){
			oCon.getCell('e802TblIng',4).setText(oCon.fmtDec(oCon.getControl('e802inpOrder').getValue(),3));
		};
		
		if(fcode=='e802btnTog'){ 
			oCon.ui5DispatchBackEnd("SAPEVT_E803","evt_e803","{i18n>MSG_PROCESS}");
		}
		
		if(fcode=='e802btnAct'){
			oCon.popConfirm("Do you want to save?","e802btnSav_ok","e802btnSav_no"); 
		};
		
		if(fcode=='e802btnSav_ok'){ 
			oCon.ui5DispatchBackEnd("SAPEVT_E808","evt_e808","{i18n>MSG_PROCESS}");
		};

		if(fcode=='e802btnBck'){
			oCon.ui5DispatchBackEnd("SAPEVT_E801","evt_e801","{i18n>MSG_PROCESS}");
		}; 
		
	//	----------------------------------------------------------- E803 :: List Transfer Order	Items :: KG
		if(fcode=='e803TblIng_edt'){
			oCon.getControl('e803inpOrder').setValue(oCon.getProperty('e803TblIng','menge_ist13_6'));						// ++ 2018.12.14 :: Picking Order - Dummy V1.2.0
			//oCon.getControl('e803inpOrder').setValue(oCon.getProperty('e803TblIng','menge_ist'));							// -- 2018.12.14 :: Picking Order - Dummy V1.2.0
			oCon.getControl('e803DiaEdt').open();
		};
		
		if(fcode=='e803btnAcp'){
			oCon.getCell('e803TblIng',5).setText(oCon.fmtDec(oCon.getControl('e803inpOrder').getValue(),6));				// ++ 2018.12.14 :: Picking Order - Dummy V1.2.0
			//oCon.getCell('e803TblIng',5).setText(oCon.fmtDec(oCon.getControl('e803inpOrder').getValue(),3));				// -- 2018.12.14 :: Picking Order - Dummy V1.2.0
		};
		
		if(fcode=='e803btnTog'){ 
			oCon.ui5DispatchBackEnd("SAPEVT_E802","evt_e802","{i18n>MSG_PROCESS}");
		}
		
		if(fcode=='e803btnAct'){
			oCon.popConfirm("Do you want to save?","e803btnSav_ok","e803btnSav_no");
		};
		
		if(fcode=='e803btnSav_ok'){ 
			oCon.ui5DispatchBackEnd("SAPEVT_E809","evt_e809","{i18n>MSG_PROCESS}");
		};

		if(fcode=='e803btnBck'){
			oCon.ui5DispatchBackEnd("SAPEVT_E801","evt_e801","{i18n>MSG_PROCESS}");
		};
		
	//	----------------------------------------------------------- E808 :: Conclusion
		if(fcode=='e808btnBck'){ 
			oCon.ui5DispatchBackEnd("SAPEVT_E801","evt_e801","{i18n>MSG_PROCESS}");
		}; 
		
	},
	
//	--------------------------------------------------------------------------------	
//	Parameters 
//	--------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){ 
		
	//	----------------------------------------------------------- E801 :: List Transfer Order		
		if(fcode=="SAPEVT_E801"){
			return oParameters = { 
				"idate"   : oCon.getControl('e801inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('e801chkShiftD'),
				"iaprion" : oCon.getAbapTrue('e801chkShiftN'),
			};
		};
		
	//	----------------------------------------------------------- E802 :: List Transfer Order	Items :: KG
		if(fcode=="SAPEVT_E802"){
			return oParameters = { 
			    "idate"   	: oCon.getControl('e801inpDate').getValue(),
		    	"iapriod" 	: oCon.getAbapTrue('e801chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('e801chkShiftN'),
				"tfrnr"   	: oCon.arrListSelected('e801TblOvw','tfrnr'),
				"matnr_in"  : oCon.arrListSelected('e801TblOvw','matnr_in'),
			};
		};
		
	//	----------------------------------------------------------- E802 :: List Transfer Order	Items :: SET
		if(fcode=="SAPEVT_E803"){
			return oParameters = { 
			    "idate"   	: oCon.getControl('e801inpDate').getValue(),
		    	"iapriod" 	: oCon.getAbapTrue('e801chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('e801chkShiftN'),
				"tfrnr"   	: oCon.arrListSelected('e801TblOvw','tfrnr'),
				"matnr_in"  : oCon.arrListSelected('e801TblOvw','matnr_in'),
			};
		};
		
	//	----------------------------------------------------------- E808 :: Save Picking Order :: KG
		if(fcode=="SAPEVT_E808"){
			return oParameters = {
			    "idate"   	: oCon.getControl('e801inpDate').getValue(),
		    	"iapriod" 	: oCon.getAbapTrue('e801chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('e801chkShiftN'),
				"tfrnr"   	: oCon.arrListItemsNoBlank('e802TblIng','tfrnr','menge_ipk'),
				"matnr_in"  : oCon.arrListItemsNoBlank('e802TblIng','matnr_in','menge_ipk'),
				"menge_ipk" : oCon.arrListItemsNoBlank('e802TblIng','menge_ipk','menge_ipk'),
				"meins_pk" 	: oCon.arrListItemsNoBlank('e802TblIng','meins_pk','menge_ipk'),
			};
		};
		
	//	----------------------------------------------------------- E809 :: Save Picking Order :: SET		
		if(fcode=="SAPEVT_E809"){ 
			return oParameters = { 
			    "idate"   	: oCon.getControl('e801inpDate').getValue(),
		    	"iapriod" 	: oCon.getAbapTrue('e801chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('e801chkShiftN'),
				"tfrnr"   	: oCon.arrListItemsNoBlank('e803TblIng','tfrnr','menge_ist13_6'),								// ++ 2018.12.14 :: Picking Order - Dummy V1.2.0
				"matnr_in"  : oCon.arrListItemsNoBlank('e803TblIng','matnr_in','menge_ist13_6'),							// ++ 2018.12.14 :: Picking Order - Dummy V1.2.0
				"menge_pkg" : oCon.arrListItemsNoBlank('e803TblIng','menge_pkg13_6','menge_ist13_6'),						// ++ 2018.12.14 :: Picking Order - Dummy V1.2.0
				"menge_ist" : oCon.arrListItemsNoBlank('e803TblIng','menge_ist13_6','menge_ist13_6'),						// ++ 2018.12.14 :: Picking Order - Dummy V1.2.0
				"meins_pk"  : oCon.arrListItemsNoBlank('e803TblIng','meins_pk','menge_ist13_6'),							// ++ 2018.12.14 :: Picking Order - Dummy V1.2.0
				"meins_kg"  : oCon.arrListItemsNoBlank('e803TblIng','meins_kg','menge_ist13_6'), 							// ++ 2018.12.14 :: Picking Order - Dummy V1.2.0
				//"tfrnr"   	: oCon.arrListItemsNoBlank('e803TblIng','tfrnr','menge_ist'), 								// -- 2018.12.14 :: Picking Order - Dummy V1.2.0
				//"matnr_in"  : oCon.arrListItemsNoBlank('e803TblIng','matnr_in','menge_ist'),								// -- 2018.12.14 :: Picking Order - Dummy V1.2.0
				//"menge_pkg" : oCon.arrListItemsNoBlank('e803TblIng','menge_pkg','menge_ist'),								// -- 2018.12.14 :: Picking Order - Dummy V1.2.0
				//"menge_ist" : oCon.arrListItemsNoBlank('e803TblIng','menge_ist','menge_ist'),								// -- 2018.12.14 :: Picking Order - Dummy V1.2.0
				//"meins_pk"  : oCon.arrListItemsNoBlank('e803TblIng','meins_pk','menge_ist'),								// -- 2018.12.14 :: Picking Order - Dummy V1.2.0
				//"meins_kg"  : oCon.arrListItemsNoBlank('e803TblIng','meins_kg','menge_ist'), 								// -- 2018.12.14 :: Picking Order - Dummy V1.2.0
			};
		};
	
	},

//	--------------------------------------------------------------------------------	
//	Model Set 
//	--------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){
		
	//	----------------------------------------------------------- E801 :: List Transfer Order			
		if(fcode=='SAPEVT_E801'){
			oCon.getControl('e801TblOvw').setModel(oModela);
		};
		
	//	----------------------------------------------------------- E802 :: List Transfer Order	Items :: KG
		if(fcode=='SAPEVT_E802'){
			oCon.getControl('e802TblIng').setModel(oModela);
		};
		
	//	----------------------------------------------------------- E803 :: List Transfer Order	Items :: SET		
		if(fcode=='SAPEVT_E803'){
			oCon.getControl('e803TblIng').setModel(oModela);
		};
		
	//	----------------------------------------------------------- E808/E809 :: Save Picking Order		
		if((fcode=='SAPEVT_E808')||(fcode=='SAPEVT_E809')){
			if(oModela.oData.logon.typ=='S'){
				for (var i = oModela.oData.return.length-1; i >= 0; i--) {
					oCon.popMsgbox(oModela.oData.return[i].msg);
				}
				oCon.getControl('e808TblOvw').setModel(oModela); 
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};
		
	},
	
//	--------------------------------------------------------------------------------	
//	Set UI 
//	--------------------------------------------------------------------------------
	
	M04_DYN: function(fcode,oModela){

	},

//	--------------------------------------------------------------------------------	
//	Navigation 
//	--------------------------------------------------------------------------------
	
	M05_NAV: function(fcode,oModela){

		if(fcode=="SAPEVT_E801")    {app.to('E801','slide');}; 
		if(fcode=="SAPEVT_E802")    {app.to('E802','slide');}; 
		if(fcode=="SAPEVT_E803")    {app.to('E803','slide');}; 
		if(fcode=="SAPEVT_E808")    {app.to('E808','slide');};
		if(fcode=="SAPEVT_E809")    {app.to('E808','slide');};

		if(fcode=='e801btnBck')		{oCon.nav_home();}; 
		if(fcode=='e802btnBck')		{app.to('E801','slide');}; 
		if(fcode=='e803btnBck')		{app.to('E801','slide');};

		if(fcode=='e802btnHom')		{oCon.nav_home();}; 
		if(fcode=='e803btnHom')		{oCon.nav_home();}; 
		if(fcode=='e808btnHom')		{oCon.nav_home();}; 
		
	},
	
//	--------------------------------------------------------------------------------	
//	Navigation 
//	--------------------------------------------------------------------------------
	
	M06_NEX: function(fcode,oModela){
		
	},
});