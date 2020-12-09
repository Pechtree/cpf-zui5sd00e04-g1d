sap.ui.controller("zui5sd00e04.C.C300", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- C301		
		if(fcode=='c301btnDis'){//Display Ingredient
			if(!oCon.isSelected('c301TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_C304","evt_c304","{i18n>MSG_PROCESS}");
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_C301"){//PREMIX Order List
			return oParameters = { 
				"idate"   : oCon.getControl('c301inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('c301chkShiftD'),
				"iaprion" : oCon.getAbapTrue('c301chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_C304"){//Display Ingredient
			return oParameters = { 
				"idate"   : oCon.getControl('c301inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('c301chkShiftD'),
				"iaprion" : oCon.getAbapTrue('c301chkShiftN'),
			    "ipmxnr"  : oCon.getProperty('c301TblOvw','pmxnr'),
				"imatnr"  : oCon.getProperty('c301TblOvw','matnr_px'),};
		};
		

		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=='SAPEVT_C301'){ //List PREMIX Order Overview
			oCon.getControl('c301TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_C304'){ //Display Ingredient
			oCon.getControl('c303TblOvw').setModel(oModela);
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
		
		if(fcode=="SAPEVT_C301")    {app.to('C301','slide');};
		if(fcode=="SAPEVT_C304")    {app.to('C303','slide');};
		
		if(fcode=='c301btnBck')		{oCon.nav_home();};
		if(fcode=='c303btnBck')		{app.to('C301','slide');};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
});