sap.ui.controller("zui5sd00e04.proc.E600", {
	
	// --------------------------------------------------------------------------------	
	// PAI FCODE 
	// --------------------------------------------------------------------------------	
	
	M01_FCD: function(fcode,oModela){
		
	// -------------------------------------------------------------------------------- E601 :: List Picking Order
		
		// 	Read Picking Order Items
			if(fcode=='e601TblOvw'){
				oCon.ui5DispatchBackEnd("SAPEVT_E602","evt_e602","{i18n>MSG_PROCESS}");
			};
				
		// 	Back to Previous Page
			if(fcode=='e601btnBck'){
				oCon.nav_home();				
			};	

	// -------------------------------------------------------------------------------- E602 :: Display Picking Order Item
			
		// 	Close Order
			if(fcode=='e602btnCls'){
				oCon.popConfirm('Do you want to close picking order?','e602btnCls_ok','e602btnCls_no');
			};
			
			if(fcode=='e602btnCls_ok'){
				oCon.ui5DispatchBackEnd("SAPEVT_E603","evt_e603","{i18n>MSG_PROCESS}");
			};
			
		// 	Back to Home Page
			if(fcode=='e602btnHom'){
				oCon.nav_home();				
			};
			
		// 	Back to Previous Page
			if(fcode=='e602btnBck'){
				app.to('E601','slide')			
			};
	}, 
	
	// --------------------------------------------------------------------------------	
	// Parameters 
	// --------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){ 
		
		// 	List Picking Order 
			if(fcode=="SAPEVT_E601"){
				return oParameters = { 
					"idate"   : oCon.getControl('e601inpDate').getValue(),
					"iapriod" : oCon.getAbapTrue('e601chkShiftD'),
					"iaprion" : oCon.getAbapTrue('e601chkShiftN'),
				};
			};

		// 	List Picking Order Items
			if(fcode=="SAPEVT_E602"){ 
				return oParameters = { 
					"idate"   : oCon.getControl('e601inpDate').getValue(),
					"iapriod" : oCon.getAbapTrue('e601chkShiftD'),
					"iaprion" : oCon.getAbapTrue('e601chkShiftN'),
					"ipiknr" : oCon.getProperty('e601TblOvw','piknr'),
				};
			};

		// 	Close Picking Order 	
			if(fcode=="SAPEVT_E603"){ 
				return oParameters = { 
					"idate"   : oCon.getControl('e601inpDate').getValue(),
					"iapriod" : oCon.getAbapTrue('e601chkShiftD'),
					"iaprion" : oCon.getAbapTrue('e601chkShiftN'),
					"ipiknr" : oCon.getProperty('e601TblOvw','piknr'),
				};
			};
	},	
	
	// --------------------------------------------------------------------------------	
	// Model Set 
	// --------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){ 
	
		// 	List Picking Order
			if(fcode=="SAPEVT_E601"){ 
				oCon.getControl('e601TblOvw').setModel(oModela);
			};

		// 	Display Picking Order Item	
			if(fcode=="SAPEVT_E602"){ 
				oCon.getControl('e602TblOvw').setModel(oModela);
			};
		
		// 	Close Picking Order ; Refresh Page E601	
			if(fcode=="SAPEVT_E603"){
				if(oModela.oData.logon.typ=='S'){
					oCon.getControl('e601TblOvw').setModel(oModela);
				}else{
					oCTX.oData.cancel_nav = true;
				};
			};
	},
	
	// --------------------------------------------------------------------------------	
	// Set UI 
	// --------------------------------------------------------------------------------
	
	M04_DYN: function(fcode,oModela){ 
		
	},
	
	// --------------------------------------------------------------------------------	
	// Navigation 
	// --------------------------------------------------------------------------------
	
	M05_NAV: function(fcode,oModela){

		if(fcode=="SAPEVT_E601")    {app.to('E601','slide');};
		if(fcode=="SAPEVT_E602")    {app.to('E602','slide');};
		
	},
	
	// --------------------------------------------------------------------------------	
	// Navigation 
	// --------------------------------------------------------------------------------
	
	M06_NEX: function(fcode,oModela){
		
	},
});