sap.ui.controller("zui5sd00e04.proc.D700", {
	
	//	--------------------------------------------------------------------------------	
	//	PAI FCODE 
	//	--------------------------------------------------------------------------------
	
	M01_FCD: function(fcode,oModela){
		
	//	-------------------------------------------------------------------------------- D701 : List Plant
		
		//	Click on Plant Tab ; Return to Page D702 
			if(fcode=='d701lstOvw'){ 
				oCon.ui5DispatchBackEnd("SAPEVT_D702","evt_d702","{i18n>MSG_PROCESS}");
			};
		
		// 	Back to Previous Page
			if(fcode=='d701btnBck'){
				oCon.nav_home();
			};	
			
	//	-------------------------------------------------------------------------------- D702 : List Sloc
			
		//	Click on Sloc Tab for Clear and Display SHM ; Return to Page D703		 
			if(fcode=='d702lstOvw'){
				oCon.getControl('d701inpFlag').setValue("Clr");
				oCon.ui5DispatchBackEnd("SAPEVT_D703","evt_d703","{i18n>MSG_PROCESS}");
			};

		// 	Back to Previous Page
			if(fcode=='d702btnBck'){
				app.to('D701','slide');
			};	
				
		// 	Back to Home Page
			if(fcode=='d702btnHom'){
				oCon.nav_home();
			}; 			

	//	-------------------------------------------------------------------------------- D703 : Add Material
			
		// 	Back to Previous Page
			if(fcode=='d703btnBck'){
				app.to('D702','slide');				
			};	
			
		// 	Back to Home Page
			if(fcode=='d703btnHom'){
				oCon.nav_home();
			};
			
		//	Add Material to SHM and Display Total
			if(fcode=='d703btnAdd'){ 
				oCon.ui5DispatchBackEnd("SAPEVT_D705","evt_d705","{i18n>MSG_PROCESS}");
				app.to('D704','slide');		
				//oCon.getControl('d703DiaAdd').open();
			};
			//if(fcode=='d703btnAcp'){
			//	oCon.getControl('d701inpFlag').setValue("Add");
			//	oCon.getControl('d703DiaAdd').close(); 
			//	oCon.ui5DispatchBackEnd("SAPEVT_D703","evt_d703","{i18n>MSG_PROCESS}");
			//};		 
	
		//	Delete Material from SHM and Display Total
			if(fcode=='d703btnDel'){
				oCon.getControl('d701inpFlag').setValue("Del");
				oCon.ui5DispatchBackEnd("SAPEVT_D703","evt_d703","{i18n>MSG_PROCESS}");
				//app.to('D703','slide');
			};
			
		//	Save Transfer Order
			if(fcode=='d703btnSav'){ 
				oCon.getControl('d703DiaRemark').open();
			}
			
			if(fcode=='d703btnRmk'){  
				oCon.getControl('d703DiaRemark').close();
				oCon.ui5DispatchBackEnd("SAPEVT_D704","evt_d704","{i18n>MSG_PROCESS}"); 
			};	
			
	//	-------------------------------------------------------------------------------- D503 : Material List
		
		// 	Back to Previous Page
			if(fcode=='d704btnBck'){
				app.to('D703','slide');				
			};	
				
		// 	Back to Home Page
			if(fcode=='d704btnHom'){
				oCon.nav_home();
			};
			
		// 	Add Material Manually											++ 2018.01.16 :: TFR-OthPlant V1.7
			if(fcode=='d704btnOth'){ 
				oCon.getControl('d704inpMatnr').setValue();
				oCon.getControl('d704DiaAdd').open();
			};
				
		//	Add Material to SHM and Display Total
			if(fcode=='d704TblOvw'){
				oCon.getControl('d704inpMatnr').setValue(oCon.getProperty('d704TblOvw','matnr'));
				oCon.getControl('d704DiaAdd').open(); 
			};
			if(fcode=='d704btnAcp'){
				oCon.getControl('d701inpFlag').setValue("Add");
				oCon.getControl('d704DiaAdd').close(); 
				oCon.ui5DispatchBackEnd("SAPEVT_D703","evt_d703","{i18n>MSG_PROCESS}");
			};		 
	},	
	//	--------------------------------------------------------------------------------	
	//	Parameters 
	//	--------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){
		
		//	Save Transfer Order	
			if(fcode=="SAPEVT_D702"){
				return oParameters = {
					"iwerksf" : oCon.getProperty('d701lstOvw','werks'),
				}
			}
		
		//	SHM Process	
			if(fcode=="SAPEVT_D703"){
				// List Document Item
				if (oCon.getControl('d701inpFlag').getValue() == "Add") {	
					return oParameters = { 
						"iflag" 	: oCon.getControl('d701inpFlag').getValue(),
						//"imatnr" 	: oCon.getControl('d703inpMatnr').getValue(),
						//"imenge" 	: oCon.getControl('d703inpMenge').getValue(),
						//"imeins" 	: oCon.getControl('d703inpMeins').getValue(),
						"imatnr" 	: oCon.getControl('d704inpMatnr').getValue(),
						"imenge" 	: oCon.getControl('d704inpMenge').getValue(),
						"imeins" 	: oCon.getControl('d704inpMeins').getValue(),
					};				
				} else if (oCon.getControl('d701inpFlag').getValue() == "Del") {
					return oParameters = { 
						"iflag" 	: oCon.getControl('d701inpFlag').getValue(),
						"imatnr" 	: oCon.getProperty('d703TblOvw','matnr'),
					}
				} else {
					return oParameters = { 
						"iflag" 	: oCon.getControl('d701inpFlag').getValue(),
					}					
				}
			} 
		
		//	Save Transfer Order	
			if(fcode=="SAPEVT_D704"){
				return oParameters = {
					"iwerksf" : oCon.getProperty('d701lstOvw','werks'),
					"ilgortf" : oCon.getProperty('d702lstOvw','lgort'),
					"iremark" : oCon.getControl('d703inpRemark').getValue(),
				}
			}
			
		//	List Material
			if(fcode=="SAPEVT_D705"){
				return oParameters = {
					"iwerksf" : oCon.getProperty('d701lstOvw','werks'),
				}
			}
		
	},
	//	--------------------------------------------------------------------------------	
	//	Model Set 
	//	--------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){ 

	//	-------------------------------------------------------------------------------- D702 : List Sloc

		//	Display Plant			
			if(fcode=='SAPEVT_D701'){
				oCon.getControl('d701lstOvw').setModel(oModela);
			};
			
		// 	Display Storage Location
			if(fcode=='SAPEVT_D702'){
				oCon.getControl('d702lstOvw').setModel(oModela);
			};
			
		// 	Display SHM
			if(fcode=='SAPEVT_D703'){
				if (oModela.oData.logon.typ != 'E') {						// ++ 2018.01.17 
					oCon.getControl('d703TblOvw').setModel(oModela);		// Add IF statement for check SHM add successful 
					app.to('D703','slide');									// [Stay in same page if not successful]
				}
			};
			
		// 	Pop up Return Transfer Order Number
			if((fcode=='SAPEVT_D704')&&(oModela.oData.logon.typ=='S')){ 
				oCon.getControl('d703TblOvw').setModel(oModela);
				oCon.popMsgbox(oModela.oData.logon.msg);
			};
			
		//  List Material
			if(fcode=='SAPEVT_D705'){
				oCon.getControl('d704TblOvw').setModel(oModela);
				oCon.sortTable('d704TblOvw','matnr');
			}
			
	},
	
	//	--------------------------------------------------------------------------------	
	//	Set UI 
	//	--------------------------------------------------------------------------------
	
	M04_DYN: function(fcode,oModela){
		
		// 	Set Text box in Dialog to BLANK
			if(fcode=='SAPEVT_D703'){
				if (oCon.getControl('d701inpFlag').getValue() == "Add") {
					oCon.getControl('d704inpMatnr').setValue();
					oCon.getControl('d704inpMenge').setValue();
					oCon.getControl('d704inpMeins').setValue();
					oCon.getControl('d703inpRemark').setValue();				
				}
			}

	},
	
	//	--------------------------------------------------------------------------------	
	//	Navigation 
	//	--------------------------------------------------------------------------------
	
	M05_NAV: function(fcode,oModela){

		if(fcode=="SAPEVT_D701")	{app.to('D701','slide');};
		if(fcode=="SAPEVT_D702")	{app.to('D702','slide');};
		//if(fcode=="SAPEVT_D703")	{app.to('D703','slide');};				// -- 2018.01.17 

	},
	
	//	--------------------------------------------------------------------------------	
	//	Navigation 
	//	--------------------------------------------------------------------------------
	
	M06_NEX: function(fcode,oModela){
 
	},
});