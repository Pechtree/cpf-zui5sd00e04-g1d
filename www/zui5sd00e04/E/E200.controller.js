sap.ui.controller("zui5sd00e04.E.E200", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- E201
		if(fcode=='e201TblOvw'){//List Picking
			if(!oCon.isSelected('e201TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_E202","evt_e202","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- E202
		if(fcode=='e202btnCls'){ //Close
			if(!oCon.isSelected('e201TblOvw')){return;};
			oCon.popConfirm('Do you want to close picking order?','e202btnCls_ok','e202btnCls_no');
		};
		if(fcode=='e202btnCls_ok'){
			oCon.ui5DispatchBackEnd("SAPEVT_E203","evt_e203","{i18n>MSG_PROCESS}");
		};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_E201"){//Pick Order List
			return oParameters = { 
				"idate"   : oCon.getControl('e201inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('e201chkShiftD'),
				"iaprion" : oCon.getAbapTrue('e201chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_E202"){ //List Reservation Item
			return oParameters = { 
				"idate"   : oCon.getControl('e201inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('e201chkShiftD'),
				"iaprion" : oCon.getAbapTrue('e201chkShiftN'),
				"ipiknr" : oCon.getProperty('e201TblOvw','piknr'),
			};
		};
		
		if(fcode=="SAPEVT_E203"){ //Close Reservation
			return oParameters = { 
				"idate"   : oCon.getControl('e201inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('e201chkShiftD'),
				"iaprion" : oCon.getAbapTrue('e201chkShiftN'),
				"ipiknr" : oCon.getProperty('e201TblOvw','piknr'),
			};
		};
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=="SAPEVT_E201"){ //Picking Order
			oCon.getControl('e201TblOvw').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E202"){ //Start/Continue Pick
			oCon.getControl('e202TblOvw').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_E203"){ //Picking Order
			if(oModela.oData.logon.typ=='S'){
				oCon.getControl('e201TblOvw').setModel(oModela);
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
		
		if(fcode=="SAPEVT_E201")    {app.to('E201','slide');};
		if(fcode=="SAPEVT_E202")    {app.to('E202','slide');};
		if(fcode=="SAPEVT_E203")    {app.to('E201','slide');};
		
		if(fcode=='e201btnBck')		{oCon.nav_home();};
		if(fcode=='e202btnBck')		{app.to('E201','slide');};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
});