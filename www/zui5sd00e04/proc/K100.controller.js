sap.ui.controller("zui5sd00e04.proc.K100", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){		 

	//	-------------------------------------------------------------------------------- K101 :: List Material Document for Print SU
		
		//	List GR Doc		
			if(fcode=='k001til06'){ 
				oCon.ui5DispatchBackEnd("SAPEVT_K101","evt_k101","{i18n>MSG_PROCESS}");
			};  
		
		//	Pop up Date Selection
			if(fcode=='k101btnSel'){
				oCon.getControl('k101DiaSel').open();
			}
			
			if(fcode=='k101btnApply'){
				oCon.ui5DispatchBackEnd("SAPEVT_K101","evt_k101","{i18n>MSG_PROCESS}");
				oCon.getControl('k101DiaSel').close();
			};
			
		//	Display SU of Each GR			
			if(fcode=='k101TblOvw'){
				oCon.ui5DispatchBackEnd("SAPEVT_K102","evt_k102","{i18n>MSG_PROCESS}"); 
			}; 		 
	
	//	-------------------------------------------------------------------------------- K102 :: List SU 
			
		//	Pop up for Edit Each SU Qty
			if(fcode=='k102TblOvw_edt'){
				oCon.getControl('k102inpOrder').setValue(oCon.getProperty('k102TblOvw','menge')); 
				// oCon.getCell('k102TblOvw',3).setText(oCon.fmtDec(oCon.getControl('k102inpOrder').getValue(),3));
				oCon.getControl('k102DiaEdt').open();
				// oCon.ui5DispatchBackEnd("SAPEVT_K106","evt_k106","{i18n>MSG_PROCESS}"); 
			};

		//	Pop up for Edit Each SU Qty
			if(fcode=='k102btnAcp'){
				oCon.getCell('k102TblOvw',2).setText(oCon.fmtDec(oCon.getControl('k102inpOrder').getValue(),0));
				oCon.getControl('k102DiaEdt').close();
			}; 
	
			if(fcode=='k102diaPrint'){
				if(!oCon.isSelected('k102TblOvw')){return;}
				oCon.ui5DispatchBackEnd("SAPEVT_K106","evt_k106","{i18n>MSG_PROCESS}"); 				
			};  
	
			if(fcode=='k102btnBck'){
				app.to('K101','slide');
			};  
			
			if(fcode=='k102btnHom'){
				oCon.nav_home();
			};
			
			if(fcode=='k104btnPrint'){
				//oCon.ui5DispatchBackEnd("SAPEVT_K107","evt_k107","{i18n>MSG_PROCESS}");
				
				// 	++ 2018.04.26 :: Print SU - GR V1.0 [for Mahachai]				
					if (oCTX.oData.hybrid == 'X') {			
						oCon.ui5DispatchBackEnd("SAPEVT_K107","evt_k107","{i18n>MSG_PROCESS}");					
					} else {
						oCon.ui5DispatchBackEnd("SAPEVT_K108","evt_k108","{i18n>MSG_PROCESS}");					
					}
				//	--------------------------------------------------
					
			};

		//----------------------------------------------------------- K103
		
		//List Material Document for Print SU (WM)
		if(fcode=='k001til07'){ 
			oCon.ui5DispatchBackEnd("SAPEVT_K103","evt_k103","{i18n>MSG_PROCESS}");

		};
		
		
		//----------------------------------------------------------- K103
		if(fcode=='k103lstMatnr'){// Select Pick
			if(!oCon.isSelected('k103lstMatnr')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_K104","evt_k104","{i18n>MSG_PROCESS}");
		};
		
//		if(fcode=='k104TblOvw'){//Select Stock to Print

//			oApp.diaPrintSU_PBO('k104','STKWH',
//					oCon.getProperty('k104TblOvw','lenum'),
//					oCon.getProperty('k104TblOvw','matnr'),
//					oCon.getProperty('k104TblOvw','maktx'),
//					oCon.getProperty('k104TblOvw','menge'),
//					oCon.getProperty('k104TblOvw','meins'),
//					oCon.getProperty('k104TblOvw','charg'),
//					oCon.getProperty('k104TblOvw','vfdat')
//			);
//			
//			
//			
//		};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		//----------------------------------------------------------- List Material Document for Print SU
		
			if(fcode=="SAPEVT_K101"){
				return oParameters = { 
					"ibudat" : oCon.getControl('k101inpBudat').getValue(),
					"iebeln" : oCon.getControl('k101inpEbeln').getValue(),
				};
			};  
		
		//----------------------------------------------------------- List SU
		
			if(fcode=="SAPEVT_K102"){
				return oParameters = {  
					"imblnr" 	: oCon.getProperty('k101TblOvw','mblnr'), 
					"iebeln" 	: oCon.getProperty('k101TblOvw','ebeln'), 
				};
			};
		
			if(fcode=="SAPEVT_K106"){
				return oParameters = {	
					"imblnr" 	: oCon.getProperty('k101TblOvw','mblnr'), 
					"iebeln" 	: oCon.getProperty('k101TblOvw','ebeln'),
					"lenum"   	: oCon.arrListSelected('k102TblOvw','lenum'),
					"matnr"   	: oCon.arrListSelected('k102TblOvw','matnr'),
					"charg"   	: oCon.arrListSelected('k102TblOvw','charg'),
					"menge_n"  	: oCon.arrListSelected('k102TblOvw','menge_n'),
				};
			};
		 
		
		if(fcode=="SAPEVT_K104"){//Select Material to Print
			return oParameters = { 
				"imatnr"   :  oCon.getProperty('k103lstMatnr','matnr'), 
			};
		};
		
		if(fcode=="SAPEVT_K105"){//Pop-up
			return oParameters = { 
				"ilenum"   :  oCon.getProperty('k104TblOvw','lenum'), 
				"icharg"   :  oCon.getProperty('k104TblOvw','charg'), 
			};
		};
		
		if(fcode=="SAPEVT_K107"){//Print SU Sticker (actual print) :: From HH
			oApp.deviceManager('CON');
			oCTX.oData.mengeq 	= "1";
			oCTX.oData.qrcod 	= "";
			oCTX.oData.tcode 	= "STK";				
			if (oCon.getControl('k102chkPrn').getValue() == 'fromGR') {
				return oParameters = {  
					"lenum"   	: oCon.arrListSelected('k102TblOvw','lenum'),
					"matnr"   	: oCon.arrListSelected('k102TblOvw','matnr'),
					"charg"   	: oCon.arrListSelected('k102TblOvw','charg'),
					"menges"  	: oCon.arrListSelected('k102TblOvw','menge_n'),
					"imengeq" 	: oCTX.oData.mengeq,
					"iqrcod"  	: oCTX.oData.qrcod,
					"itcode"  	: oCTX.oData.tcode,
				};				
			}
			else {
				return oParameters = { 
					"lenum"   	: oCon.arrListSelected('k104TblOvw','lenum'),
					"matnr"   	: oCon.arrListSelected('k104TblOvw','matnr'),
					"charg"   	: oCon.arrListSelected('k104TblOvw','charg'),
					"menges"  	: oCon.arrListSelected('k104TblOvw','menge'),
					"imengeq" 	: oCTX.oData.mengeq,
					"iqrcod"  	: oCTX.oData.qrcod,
					"itcode"  	: oCTX.oData.tcode,
				};				
			}	 
		};		
		
		if(fcode=="SAPEVT_K108"){//Print SU Sticker (actual print) :: From Web // ++ 2018.04.26 :: Print SU - GR V1.0
			oApp.deviceManager('CON');
			oCTX.oData.mengeq 	= "1";
			oCTX.oData.qrcod 	= "";
			oCTX.oData.tcode 	= "STK";				
			if (oCon.getControl('k102chkPrn').getValue() == 'fromGR') {
				oCTX.oData.flag 	= "GR";		// ++ 2018.05.02 :: Add flag
				return oParameters = {  
					"lenum"   	: oCon.arrListSelected('k102TblOvw','lenum'),
					"matnr"   	: oCon.arrListSelected('k102TblOvw','matnr'),
					"charg"   	: oCon.arrListSelected('k102TblOvw','charg'),
					"menges"  	: oCon.arrListSelected('k102TblOvw','menge_n'),
					"imengeq" 	: oCTX.oData.mengeq,
					"iqrcod"  	: oCTX.oData.qrcod,
					"itcode"  	: oCTX.oData.tcode,
					"iflag"  	: oCTX.oData.flag,
				};				
			}
			else {
				oCTX.oData.flag 	= "STOCK";
				return oParameters = { 
					"lenum"   	: oCon.arrListSelected('k104TblOvw','lenum'),
					"matnr"   	: oCon.arrListSelected('k104TblOvw','matnr'),
					"charg"   	: oCon.arrListSelected('k104TblOvw','charg'),
					"menges"  	: oCon.arrListSelected('k104TblOvw','menge'),
					"imengeq" 	: oCTX.oData.mengeq,
					"iqrcod"  	: oCTX.oData.qrcod,
					"itcode"  	: oCTX.oData.tcode,
					"iflag"  	: oCTX.oData.flag,
				};				
			}	 
		};		
	},
	
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		//----------------------------------------------------------- List GR Material Doc
		if(fcode=='SAPEVT_K101'){ 
			oCon.getControl('k101TblOvw').setModel(oModela);
		}; 
		
		//----------------------------------------------------------- List GR Material Doc
		if(fcode=='SAPEVT_K102'){ 
			oCon.getControl('k102TblOvw').setModel(oModela);
		}; 
		
		//----------------------------------------------------------- List GR Material Doc
		if(fcode=='SAPEVT_K106'){ 
			if ((fcode=='SAPEVT_K106')&&(oModela.oData.logon.typ != 'E')) {
				oCon.getControl('k102chkPrn').setValue('fromGR');
				
			// 	++ 2018.04.26 :: Print SU - GR V1.0 [for Mahachai]				
				if (oCTX.oData.hybrid == 'X') {			
					oCon.ui5DispatchBackEnd("SAPEVT_K107","evt_k107","{i18n>MSG_PROCESS}");					
				} else {
					oCon.ui5DispatchBackEnd("SAPEVT_K108","evt_k108","{i18n>MSG_PROCESS}");					
				}
			//	--------------------------------------------------
				
				oCon.getControl('k102chkPrn').setValue(); 
			}
			oCon.getControl('k102TblOvw').setModel(oModela);
		}; 
		
		if(fcode=='SAPEVT_K103'){ //List stock
			oCon.getControl('k103lstMatnr').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_K104'){ //List stock
			oCon.getControl('k104TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_K105'||fcode=='SAPEVT_K107'){//Print Sticker SU from HH
			//debugger; 
			oApp.diaPrintSU_PAI(fcode,oModela); 
		};
		
		if(fcode=='SAPEVT_K108'){//Print Sticker SU from Web	// ++ 2018.04.26 :: Print SU - GR V1.0
			//debugger;
			if (oCTX.oData.hybrid != 'X' && oModela.oData.head.pdf_url != '') {		// ++ 2018.05.02 :: GR - WM V2.5				
				var mWin = window.open(oModela.oData.head.pdf_url); 
				mWin.print();
			} 
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
//		if ((fcode=='SAPEVT_B106')&&(oModela.oData.logon.typ=='S')) {
//			oCon.getControl('k102chkAdj').setValue('S');
//		}
		
		if(fcode=='SAPEVT_K009'){
			
		};

	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){ 

		if(fcode=="SAPEVT_K101")    {app.to('K101','slide');};
		if(fcode=="SAPEVT_K102")    {app.to('K102','slide');};
		if(fcode=="SAPEVT_K103")    {app.to('K103','slide');};
		if(fcode=="SAPEVT_K104")    {app.to('K104','slide');};

		if(fcode=='k101btnBck')		{app.to('K001','slide');};
		if(fcode=='k103btnBck')		{app.to('K001','slide');};
		if(fcode=='k104btnBck')		{app.to('K103','slide');};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
});