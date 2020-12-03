sap.ui.controller("zui5sd00e04.proc.D800", {
	
	//	--------------------------------------------------------------------------------	
	//	PAI FCODE 
	//	--------------------------------------------------------------------------------
	
	M01_FCD: function(fcode,oModela){
		
	//	-------------------------------------------------------------------------------- d801 : List TFR
		
		// 	Pop up Dialog for Confirm Cancel
			if(fcode=='d801btnDel'){
				if(!oCon.isSelected('d801TblOvw')){return;};
				oCon.popConfirm('Do you want to cancel transfer order?','d801btnDel_ok','d801btnDel_no')
			};

		// 	Cancel Confirmed 			
			if(fcode=='d801btnDel_ok'){
				oCon.ui5DispatchBackEnd("SAPEVT_d802","evt_d802","{i18n>MSG_PROCESS}");
			};
		
		// 	Back to Previous Page
			if(fcode=='d801btnBck'){
				oCon.nav_home();				
			};
	
		// 	Cancel TFR
			if(fcode=='d801btnDel'){
				oCon.nav_home();				
			};
		
	},
	
	//	--------------------------------------------------------------------------------	
	//	Parameters 
	//	--------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){ 

		// 	List TFR
			if(fcode=='SAPEVT_d801'){ 
				return oParameters = { 
					"idate"   : oCon.getControl('d801inpDate').getValue(),
					"iapriod" : oCon.getAbapTrue('d801chkShiftD'),
					"iaprion" : oCon.getAbapTrue('d801chkShiftN'),
				};
			};
		
		// 	Cancel TFR
			if(fcode=="SAPEVT_d802"){
				return oParameters = { 
					"itfrnr" : oCon.getProperty('d801TblOvw','tfrnr'),};
			};
		
	},
	
	//	--------------------------------------------------------------------------------	
	//	Model Set 
	//	--------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){ 
	
		// 	List TFR
			if(fcode=='SAPEVT_d801'){ 
				oCon.getControl('d801TblOvw').setModel(oModela);
			}

		// 	Cancel TFR		
			if(fcode=='SAPEVT_d802'){
				if(oModela.oData.logon.typ=='S'){
					oCon.popMsgbox(oModela.oData.logon.msg);
					oCon.getControl('d801TblOvw').setModel(oModela);
				};
			}
		
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
		
		if(fcode=="SAPEVT_d801")    {app.to('d801','slide');};

	},
	
	//	--------------------------------------------------------------------------------	
	//	Navigation 
	//	--------------------------------------------------------------------------------
	
	M06_NEX: function(fcode,oModela){
 
	},
});