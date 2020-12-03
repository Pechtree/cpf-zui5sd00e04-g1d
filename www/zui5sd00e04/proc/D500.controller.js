sap.ui.controller("zui5sd00e04.proc.D500", {
	
	//	--------------------------------------------------------------------------------	
	//	PAI FCODE 
	//	--------------------------------------------------------------------------------
	
	M01_FCD: function(fcode,oModela){
		
	//	-------------------------------------------------------------------------------- D501 : Select Storage Location
			
		//	Click on Sloc Tab for Clear and Display SHM ; Return to Page D502
			if(fcode=='d501lstOvw'){
				oCon.getControl('d501inpFlag').setValue("Clr");
				oCon.ui5DispatchBackEnd("SAPEVT_D502","evt_d502","{i18n>MSG_PROCESS}");
			};
		
		// 	Back to Previous Page
			if(fcode=='d501btnBck'){
				oCon.nav_home();				
			};	
			
		// 	Back to Next Page
			if(fcode=='d501btnNxt'){
				app.to('D502','slide');		
			};	
			
	//	-------------------------------------------------------------------------------- D502 : Add Material
			
		// 	Back to Previous Page
			if(fcode=='d502btnBck'){
				app.to('D501','slide');				
			};	
			
		// 	Back to Home Page
			if(fcode=='d502btnHom'){
				oCon.nav_home();
			};
			
		//	Add Material to SHM and Display Total
			if(fcode=='d502btnAdd'){
				//oCon.getControl('d502DiaAdd').open(); 
				oCon.ui5DispatchBackEnd("SAPEVT_D504","evt_d504","{i18n>MSG_PROCESS}");
				app.to('D503','slide');	
			};
			if(fcode=='d502btnAcp'){
				oCon.getControl('d501inpFlag').setValue("Add");
				oCon.getControl('d502DiaAdd').close(); 
				oCon.ui5DispatchBackEnd("SAPEVT_D502","evt_d502","{i18n>MSG_PROCESS}");
			};
	
		//	Delete Material from SHM and Display Total
			if(fcode=='d502btnDel'){
				oCon.getControl('d501inpFlag').setValue("Del");
				oCon.ui5DispatchBackEnd("SAPEVT_D502","evt_d502","{i18n>MSG_PROCESS}");
			};
			
		//	Save Transfer Order
			if(fcode=='d502btnSav'){ 
				oCon.getControl('d502DiaRemark').open();
			}

			if(fcode=='d502btnNot'){ 
				oCon.getControl('d502DiaRemark').close();
				oCon.ui5DispatchBackEnd("SAPEVT_D503","evt_d503","{i18n>MSG_PROCESS}");
			};	
			
	//	-------------------------------------------------------------------------------- D503 : Material List
			
		// 	Back to Previous Page
			if(fcode=='d503btnBck'){
				app.to('D502','slide');				
			};	
			
		// 	Back to Home Page
			if(fcode=='d503btnHom'){
				oCon.nav_home();
			};
			
		// 	Add Material Manually											++ 2018.01.16 :: TFR-NonPRD V1.6
			if(fcode=='d503btnOth'){ 
				oCon.getControl('d503inpMatnr').setValue();
				oCon.getControl('d503DiaAdd').open();
			};
			
		//	Add Material to SHM and Display Total
			if(fcode=='d503TblOvw'){
				oCon.getControl('d503inpMatnr').setValue(oCon.getProperty('d503TblOvw','matnr'));
				oCon.getControl('d503DiaAdd').open();
			};
			if(fcode=='d503btnAcp'){
				oCon.getControl('d501inpFlag').setValue("Add");
				oCon.getControl('d503DiaAdd').close(); 
				oCon.ui5DispatchBackEnd("SAPEVT_D502","evt_d502","{i18n>MSG_PROCESS}");
			};
	},
	
	//	--------------------------------------------------------------------------------	
	//	Parameters 
	//	--------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){ 
		
	//	-------------------------------------------------------------------------------- D501 : List Sloc

		//	Display Material in SHM	
			if(fcode=="SAPEVT_D502"){
				if (oCon.getControl('d501inpFlag').getValue() == "Clr") {
					return oParameters = {
						"iflag" 	: oCon.getControl('d501inpFlag').getValue()
					}					
				} else if (oCon.getControl('d501inpFlag').getValue() == "Add") {
					return oParameters = {
						"iflag" 	: oCon.getControl('d501inpFlag').getValue(),
						//"imatnr" 	: oCon.getControl('d502inpMatnr').getValue(),
						//"imenge" 	: oCon.getControl('d502inpMenge').getValue(),
						//"imeins" 	: oCon.getControl('d502inpMeins').getValue()
						"imatnr" 	: oCon.getControl('d503inpMatnr').getValue(),
						"imenge" 	: oCon.getControl('d503inpMenge').getValue(),
						"imeins" 	: oCon.getControl('d503inpMeins').getValue()
					}					
				} else if (oCon.getControl('d501inpFlag').getValue() == "Del") {
					return oParameters = {
						"iflag" 	: oCon.getControl('d501inpFlag').getValue(),
						"imatnr"  	: oCon.getFieldValue('d502TblOvw',['matnr'])
					}					
				}
			}
			
		//	Save Transfer Order	
			if(fcode=="SAPEVT_D503"){
				return oParameters = {
					"ilgortf" 	: oCon.getProperty('d501lstOvw','lgort'),
					"iremark" 	: oCon.getControl('d502inpRemark').getValue(),
				}
			}
			
		//	List Material	
			if(fcode=="SAPEVT_D504"){
				return oParameters = {
					"iwerksf" 	: oCon.getControl('a002InpWerks').getValue()
				}
			}
	},
	//	--------------------------------------------------------------------------------	
	//	Model Set 
	//	--------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){ 
		
		// 	List Sloc
			if(fcode=='SAPEVT_D501'){
				oCon.getControl('d501lstOvw').setModel(oModela);
			}
		
		// 	Display Material in SHM
			if(fcode=='SAPEVT_D502'){
				if (oModela.oData.logon.typ != 'E') {						// ++ 2018.01.17 
					oCon.getControl('d502TblOvw').setModel(oModela);		// Add IF statement for check SHM add successful 
					app.to('D502','slide');									// [Stay in same page if not successful]
				} 	
			}
			
		// 	Pop up Return Transfer Order Number
			if((fcode=='SAPEVT_D503')&&(oModela.oData.logon.typ=='S')){ 
				oCon.getControl('d502TblOvw').setModel(oModela);
				oCon.popMsgbox(oModela.oData.logon.msg);
			};
			
		//  List Material
			if(fcode=='SAPEVT_D504'){
				oCon.getControl('d503TblOvw').setModel(oModela);
			}
	},
	
	//	--------------------------------------------------------------------------------	
	//	Set UI 
	//	--------------------------------------------------------------------------------
	
	M04_DYN: function(fcode,oModela){
		
	// 	Set Text box in Dialog to BLANK
		if(fcode=='SAPEVT_D502'){
			if (oCon.getControl('d501inpFlag').getValue() == "Add") {
				oCon.getControl('d503inpMatnr').setValue();
				oCon.getControl('d503inpMenge').setValue();
				oCon.getControl('d503inpMeins').setValue();
				oCon.getControl('d502inpRemark').setValue();				
			}
		}

	},
	
	//	--------------------------------------------------------------------------------	
	//	Navigation 
	//	--------------------------------------------------------------------------------
	
	M05_NAV: function(fcode,oModela){

		if(fcode=="SAPEVT_D501")    {app.to('D501','slide');};
		//if(fcode=="SAPEVT_D502")    {app.to('D502','slide');};			// -- 2018.01.17
		if(fcode=="SAPEVT_D504")    {app.to('D503','slide');};

	},
	
	//	--------------------------------------------------------------------------------	
	//	Navigation 
	//	--------------------------------------------------------------------------------
	
	M06_NEX: function(fcode,oModela){
 
	},
});