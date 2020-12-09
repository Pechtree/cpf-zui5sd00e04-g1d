sap.ui.controller("zui5sd00e04.D.D100", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		

		//----------------------------------------------------------- D103		
		if(fcode=='d103btnDel'){//Cancel Transfer Order
			if(!oCon.isSelected('d103TblOvw')){return;};
			oCon.popConfirm('Do you want to cancel transfer order?','d103btnDel_ok','d103btnDel_no');
		};
		
		if(fcode=='d103btnDel_ok'){//Cancel Transfer Order - OK
			oCon.ui5DispatchBackEnd("SAPEVT_D105","evt_d105","{i18n>MSG_PROCESS}");
		};

		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		if(fcode=='SAPEVT_D104'){ //
			return oParameters = { 
				"idate"   : oCon.getControl('d103inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('d103chkShiftD'),
				"iaprion" : oCon.getAbapTrue('d103chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_D105"){//Cancel Transfer Order
			return oParameters = { 
				"itfrnr" 	: oCon.getProperty('d103TblOvw','tfrnr'),};
		};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=='SAPEVT_D104'){ //Create from Premix Order
			oCon.getControl('d103TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_D105'){ //Cancel Transfer Order
			if(oModela.oData.logon.typ=='S'){
				oCon.popMsgbox(oModela.oData.logon.msg);
				oCon.getControl('d103TblOvw').setModel(oModela);
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
			
		if(fcode=="SAPEVT_D104")    {app.to('D103','slide');};

		if(fcode=='d103btnBck')		{oCon.nav_home();};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
});