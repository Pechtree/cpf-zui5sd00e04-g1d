sap.ui.controller("zui5sd00e04.D.D300", {
	
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- D301		
		if(fcode=='d301btnDel'){//Cancel Transfer Order
			if(!oCon.isSelected('d301TblOvw')){return;};
			oCon.popConfirm('Do you want to cancel transfer order?','d301btnDel_ok','d301btnDel_no')
		};
		
		if(fcode=='d301btnDel_ok'){//Cancel Transfer Order - OK
			oCon.ui5DispatchBackEnd("SAPEVT_D302","evt_d302","{i18n>MSG_PROCESS}");
		};
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){

		if(fcode=='SAPEVT_D301'){ //
			return oParameters = { 
				"idate"   : oCon.getControl('d301inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('d301chkShiftD'),
				"iaprion" : oCon.getAbapTrue('d301chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_D302"){//Cancel Transfer Order
			return oParameters = { 
				"itfrnr" : oCon.getProperty('d301TblOvw','tfrnr'),};
		};
		
	
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
	
		if(fcode=='SAPEVT_D301'){ //Create from Premix Order
			oCon.getControl('d301TblOvw').setModel(oModela);
		}
		
		if(fcode=='SAPEVT_D302'){ //Cancel Transfer Order
			if(oModela.oData.logon.typ=='S'){
				oCon.popMsgbox(oModela.oData.logon.msg);
				oCon.getControl('d301TblOvw').setModel(oModela);
			};
		}
	
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
		
		if(fcode=="SAPEVT_D301")    {app.to('D301','slide');};
		
		if(fcode=='d301btnBck')		{oCon.nav_home();};

	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
	
});