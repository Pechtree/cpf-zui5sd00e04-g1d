sap.ui.controller("zui5sd00e04.proc.D600", {
	
	//	--------------------------------------------------------------------------------	
	//	PAI FCODE 
	//	--------------------------------------------------------------------------------
	
	M01_FCD: function(fcode,oModela){
		
	//	-------------------------------------------------------------------------------- D601 : List TFR
		
		// 	Pop up Dialog for Confirm Cancel
			if(fcode=='d601btnDel'){
				if(!oCon.isSelected('d601TblOvw')){return;};
				oCon.popConfirm('Do you want to cancel transfer order?','d601btnDel_ok','d601btnDel_no')
			};

		// 	Cancel Confirmed 			
			if(fcode=='d601btnDel_ok'){
				oCon.ui5DispatchBackEnd("SAPEVT_D602","evt_d602","{i18n>MSG_PROCESS}");
			};
		
		// 	Back to Previous Page
			if(fcode=='d601btnBck'){
				oCon.nav_home();				
			};
	
		// 	Cancel TFR
			if(fcode=='d601btnDel'){
				oCon.nav_home();				
			};
		
	},
	
	//	--------------------------------------------------------------------------------	
	//	Parameters 
	//	--------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){ 

		// 	List TFR
			if(fcode=='SAPEVT_D601'){ 
				return oParameters = { 
					"idate"   : oCon.getControl('d601inpDate').getValue(),
					"iapriod" : oCon.getAbapTrue('d601chkShiftD'),
					"iaprion" : oCon.getAbapTrue('d601chkShiftN'),
				};
			};
		
		// 	Cancel TFR
			if(fcode=="SAPEVT_D602"){
				return oParameters = { 
					"itfrnr" : oCon.getProperty('d601TblOvw','tfrnr'),};
			};
		
	},
	
	//	--------------------------------------------------------------------------------	
	//	Model Set 
	//	--------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){ 
	
		// 	List TFR
			if(fcode=='SAPEVT_D601'){ 
				oCon.getControl('d601TblOvw').setModel(oModela);
			}

		// 	Cancel TFR		
			if(fcode=='SAPEVT_D602'){
				if(oModela.oData.logon.typ=='S'){
					oCon.popMsgbox(oModela.oData.logon.msg);
					oCon.getControl('d601TblOvw').setModel(oModela);
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
		
		if(fcode=="SAPEVT_D601")    {app.to('D601','slide');};

	},
	
	//	--------------------------------------------------------------------------------	
	//	Navigation 
	//	--------------------------------------------------------------------------------
	
	M06_NEX: function(fcode,oModela){
 
	},
});