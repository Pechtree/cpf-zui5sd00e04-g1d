sap.ui.controller("zui5sd00e04.proc.E700", {
	
	// --------------------------------------------------------------------------------	
	// PAI FCODE 
	// --------------------------------------------------------------------------------	
	
	M01_FCD: function(fcode,oModela){
		
	// -------------------------------------------------------------------------------- E701 :: List Picking Order
		
		// 	Read Picking Order Items
			if(fcode=='e701btnNxt'){
				// if(!oCon.isSelected('e701TblOvw')){return;};
				oCon.ui5DispatchBackEnd("SAPEVT_E702","evt_e702","{i18n>MSG_PROCESS}");
			};
				
		// 	Back to Previous Page
			if(fcode=='e701btnBck'){
				oCon.nav_home();				
			};	

	// -------------------------------------------------------------------------------- E702 :: Display Picking Order Item
			
		// 	Close Order
			if(fcode=='e702btnCls'){ 
				// if(!oCon.isSelected('e701TblOvw')){return;};
				oCon.popConfirm('Do you want to close picking order?','e702btnCls_ok','e702btnCls_no');
			};
			
			if(fcode=='e702btnCls_ok'){
				oCon.ui5DispatchBackEnd("SAPEVT_E703","evt_e703","{i18n>MSG_PROCESS}");
			};
			
		// 	Back to Home Page
			if(fcode=='e702btnHom'){
				oCon.nav_home();				
			};
			
		// 	Back to Previous Page
			if(fcode=='e702btnBck'){
				app.to('E701','slide')			
			};
	}, 
	
	// --------------------------------------------------------------------------------	
	// Parameters 
	// --------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){ 
		
		// 	List Picking Order 
			if(fcode=="SAPEVT_E701"){
				return oParameters = { 
					"idate"   : oCon.getControl('e701inpDate').getValue(),
					"iapriod" : oCon.getAbapTrue('e701chkShiftD'),
					"iaprion" : oCon.getAbapTrue('e701chkShiftN'),
				};
			};

		// 	List Picking Order Items
			if(fcode=="SAPEVT_E702"){ 
				return oParameters = { 
					"idate"   : oCon.getControl('e701inpDate').getValue(),
					"iapriod" : oCon.getAbapTrue('e701chkShiftD'),
					"iaprion" : oCon.getAbapTrue('e701chkShiftN'),
					// "ipiknr" : oCon.getProperty('e701TblOvw','piknr'),
				};
			};

		// 	Close Picking Order 	
			if(fcode=="SAPEVT_E703"){ 
				return oParameters = { 
					"idate"   : oCon.getControl('e701inpDate').getValue(),
					"iapriod" : oCon.getAbapTrue('e701chkShiftD'),
					"iaprion" : oCon.getAbapTrue('e701chkShiftN'),
					// "ipiknr" : oCon.getProperty('e701TblOvw','piknr'),
				};
			};
	},	
	
	// --------------------------------------------------------------------------------	
	// Model Set 
	// --------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){ 
	
		// 	List Picking Order
			if(fcode=="SAPEVT_E701"){ 
				oCon.getControl('e701TblOvw').setModel(oModela);
			};

		// 	Display Picking Order Item	
			if(fcode=="SAPEVT_E702"){ 
				oCon.getControl('e702TblOvw').setModel(oModela);
			};
		
		// 	Close Picking Order ; Refresh Page E701	
			if(fcode=="SAPEVT_E703"){
				if(oModela.oData.logon.typ=='S'){
					oCon.getControl('e701TblOvw').setModel(oModela);
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

		if(fcode=="SAPEVT_E701")    {app.to('E701','slide');};
		if(fcode=="SAPEVT_E702")    {app.to('E702','slide');};
		
	},
	
	// --------------------------------------------------------------------------------	
	// Navigation 
	// --------------------------------------------------------------------------------
	
	M06_NEX: function(fcode,oModela){
		
	},
});