sap.ui.controller("zui5sd00e04.proc.K000", {

	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- K001
		
		if(fcode=='k001til01'){ //List Material Document
			oCon.getControl('k006inpCheck').setValue("PrintFromGR");
			oCon.ui5DispatchBackEnd("SAPEVT_K002","evt_k002","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='k001til02'){ // Print From Picking Confirmation
			oCon.getControl('k006inpCheck').setValue("PrintFromPickingOrder");
			oCon.ui5DispatchBackEnd("SAPEVT_K008","evt_k008","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='k001til03'){ // Print From Weight Confirmation
			oCon.getControl('k006inpCheck').setValue("PrintFromWeight");
			oCon.ui5DispatchBackEnd("SAPEVT_K004","evt_k004","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='k001til04'){ // Print From Finishing 
			oCon.getControl('k006inpCheck').setValue("PrintFromFinishing");
			oCon.ui5DispatchBackEnd("SAPEVT_K005","evt_k005","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='k001til05'){ // Print From Stock 
			oCon.getControl('k006inpCheck').setValue("PrintFromStock");
			//oCon.ui5DispatchBackEnd("SAPEVT_K009","evt_k009","{i18n>MSG_PROCESS}");
			oCon.ui5DispatchBackEnd("SAPEVT_K010","evt_k010","{i18n>MSG_PROCESS}");
		}; 
		
		
		//----------------------------------------------------------- K002
		if(fcode=='k002btnSel'){
			oCon.getControl('k002DiaSel').open();
		}
		if(fcode=='k002btnApply'){
			oCon.ui5DispatchBackEnd("SAPEVT_K002","evt_k002","{i18n>MSG_PROCESS}");
			oCon.getControl('k002DiaSel').close();
		};
		if(fcode=='k002TblOvw'){//Select matdoc to Print
			oApp.diaPrint_PBO('k002','GR',
				oCon.getProperty('k002TblOvw','matnr_in'),		// Material
			    oCon.getProperty('k002TblOvw','charg'),			// Batch
			    oCon.getProperty('k002TblOvw','menge_opk'),		// Qty
			    oCon.getProperty('k002TblOvw','meins_pkx'),		// UOM
			    oCon.getProperty('k002TblOvw','menge_okg'),		// Base Qty
			    oCon.getProperty('k002TblOvw','qrcod'),			// Scaned QR code
			    '',												// Process Order
			    '',												// Set No.
			    '',												// Picking Order
			    '',												// Picking Item
			    '',												// Sequence No.
			    ''												// Weight No.
			);
		};
				
		//----------------------------------------------------------- K003
		if(fcode=='k003TblOvw'){//Select Picking to Print	
			oCon.getControl('k006inpSeqpk').setValue(oCon.getProperty('k003TblOvw','seqpk'));	
			oApp.diaPrint_PBO('k003','PIK',
				oCon.getProperty('k003TblOvw','matnr_in'),		// Material
				oCon.getProperty('k003TblOvw','charg'),			// Batch
				oCon.getProperty('k003TblOvw','menge_opk'),		// Qty
				oCon.getProperty('k003TblOvw','meins_pkx'),		// UOM
				oCon.getProperty('k003TblOvw','menge_okg'),		// Base Qty
				oCon.getProperty('k003TblOvw','qrcod'),			// Scaned QR code
			    '',												// Process Order
			    '',												// Set No.
			    oCon.getProperty('k003TblOvw','piknr'),			// Picking Order
			    oCon.getProperty('k003TblOvw','pospk'),			// Picking Item
			    oCon.getProperty('k003TblOvw','seqpk'),			// Sequence No.
			    ''												// Weight No.					          
			);
		};

				
		//----------------------------------------------------------- K004
		if(fcode=='k004TblWei'){
			oApp.diaPrint_PBO('k004','PMX',
				oCon.getProperty('k004TblWei','matnr_in'),		// Material
			    oCon.getProperty('k004TblWei','charg'),			// Batch
			    oCon.getProperty('k004TblWei','menge_opk'),		// Qty
			    oCon.getProperty('k004TblWei','meins_pkx'),		// UOM
			    oCon.getProperty('k004TblWei','menge_okg'),		// Base Qty
			    oCon.getProperty('k004TblWei','qrcod'),			// Scaned QR code
			    oCon.getProperty('k004TblWei','aufnr'),			// Process Order
			    oCon.getProperty('k004TblWei','seta'),			// Scaned QR code
			    oCon.getProperty('k004TblWei','piknr'),			// Picking Order
			    oCon.getProperty('k004TblWei','pospk'),			// Picking Item
			    oCon.getProperty('k004TblWei','seqpk'),			// Sequence No.
			    oCon.getProperty('k004TblWei','weinr')			// Weight No.	
			);
		};
		
		//----------------------------------------------------------- K005
		if(fcode=='k005TblBck'){
			oApp.diaPrint_PBO('k005','BCK',
				oCon.getProperty('k005TblBck','matnr_in'),		// Material
			    oCon.getProperty('k005TblBck','charg'),			// Batch
			    oCon.getProperty('k005TblBck','menge_opk'),		// Qty
			    oCon.getProperty('k005TblBck','meins_pkx'),		// UOM
			    oCon.getProperty('k005TblBck','menge_okg'),		// Base Qty
			    oCon.getProperty('k005TblBck','qrcod'),			// Scaned QR code
			    oCon.getProperty('k005TblBck','aufnr'),			// Process Order
			    oCon.getProperty('k005TblBck','seta'),			// Scaned QR code
			    '',												// Picking Order
			    '',												// Picking Item
			    '',												// Sequence No.
			    ''												// Weight No.
			);
		};
		
		
		//----------------------------------------------------------- K006
		if(fcode=='k006TblOvw'){// Select Pick
			if(!oCon.isSelected('k006TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_K003","evt_k003","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- K007
		if(fcode=='k007TblOvw'){//Select Stock to Print
			oApp.diaPrint_PBO('k007','STK',
				oCon.getProperty('k007TblOvw','matnr_in'),		// Material
				oCon.getProperty('k007TblOvw','charg'),			// Batch
				oCon.getProperty('k007TblOvw','menge_opk'),		// Qty
				oCon.getProperty('k007TblOvw','meins_pkx'),		// UOM
				oCon.getProperty('k007TblOvw','menge_okg'),		// Base Qty
				oCon.getProperty('k007TblOvw','qrcod'),			// Scaned QR code
			    '',												// Process Order
			    '',												// Set No.
			    '',												// Picking Order
			    '',												// Picking Item
			    '',												// Sequence No.
			    ''												// Weight No.
			);
		};
		
		//----------------------------------------------------------- K008
		if(fcode=='k008lstMatnr'){// Select Pick
			if(!oCon.isSelected('k008lstMatnr')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_K009","evt_k009","{i18n>MSG_PROCESS}");
		};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_K002"){//List Material Document
			return oParameters = { 
				"ibudat" : oCon.getControl('k002inpBudat').getValue(),
				"iebeln" : oCon.getControl('k002inpEbeln').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_K003"){//List Material Document
			return oParameters = { 
				"ipiknr" 	: oCon.getProperty('k006TblOvw','piknr'),
			};
		};
		
		if(fcode=="SAPEVT_K004"){//List Weight Confirm
			return oParameters = { 
				"idate" 	: oCon.getControl('k004inpDate').getValue(),
				"iapriod" 	: oCon.getAbapTrue('k004chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('k004chkShiftN')
			};
		};
		
		if(fcode=="SAPEVT_K005"){//List Backflush
			return oParameters = { 
				"idate" 	: oCon.getControl('k005inpDate').getValue(),
				"iapriod" 	: oCon.getAbapTrue('k005chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('k005chkShiftN')
			};
		};
		
		if(fcode=="SAPEVT_K006"){//Print GR Sticker (preview dialog) 
			return oParameters = {			
				"imatnr"  : oCTX.oData.matnr,
				"icharg"  : oCTX.oData.charg,
				"iaufnr"  : oCTX.oData.aufnr,	
				"ipiknr"  : oCTX.oData.piknr,
				"ipospk"  : oCTX.oData.pospk,
				"iseqpk"  : oCTX.oData.seqpk,
				"iweinr"  : oCTX.oData.weinr,
			};
		};
		
		if(fcode=="SAPEVT_K007"){//Print GR Sticker (actual print) 
			return oParameters = {	
				"imatnr"  : oCTX.oData.matnr,
				"icharg"  : oCTX.oData.charg,
				"imenges" : oCTX.oData.menges, 		//	quantity in sticker
				"imengeq" : oCTX.oData.mengeq, 		//	no of sticker
				"iqrcod"  : oCTX.oData.qrcod,
				"itcode"  : oCTX.oData.tcode,				
				"ipiknr"  : oCTX.oData.piknr,		// ++ 2018.09.13
				"ipospk"  : oCTX.oData.pospk,		// ++ 2018.09.13
				"iseqpk"  : oCTX.oData.seqpk,		// ++ 2018.09.13
				"iweinr"  : oCTX.oData.weinr,		// ++ 2018.09.13
				
			}
		};
		
		if(fcode=="SAPEVT_K008"){//Pick Order List
			return oParameters = { 
				"idate"   : oCon.getControl('k006inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('k006chkShiftD'),
				"iaprion" : oCon.getAbapTrue('k006chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_K009"){//Select Material to Print
			return oParameters = { 
				"imatnr"   :  oCon.getProperty('k008lstMatnr','matnr_in'),
			};
		};			 
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=='SAPEVT_K002'){ //List Material Doc
			oCon.getControl('k002TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_K003'){ //List Picking Confirmation
			oCon.getControl('k003TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_K004'){ //List Weight Confirm
			oCon.getControl('k004TblWei').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_K005'){ //List Backflush
			oCon.getControl('k005TblBck').setModel(oModela);
		};
		
		if((fcode=='SAPEVT_K006'||fcode=='SAPEVT_K007')){ //Print Sticker 
			oApp.diaPrint_PAI(fcode,oModela);
		};
		
		if(fcode=="SAPEVT_K008"){ //Picking Order
			oCon.getControl('k006TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_K009'){ //List stock
			oCon.getControl('k007TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_K010'){ //List stock
			oCon.getControl('k008lstMatnr').setModel(oModela);
		};
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		if(fcode=='SAPEVT_K009'){
			
		};

	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="SAPEVT_K001")    {app.to('K001','slide');};
		if(fcode=="SAPEVT_K002")    {app.to('K002','slide');};
		if(fcode=="SAPEVT_K003")    {app.to('K003','slide');};
		if(fcode=="SAPEVT_K004")    {app.to('K004','slide');};
		if(fcode=="SAPEVT_K005")    {app.to('K005','slide');};
		if(fcode=="SAPEVT_K008")    {app.to('K006','slide');};
		if(fcode=="SAPEVT_K009")    {app.to('K007','slide');};
		if(fcode=="SAPEVT_K010")    {app.to('K008','slide');}; 
		
		if(fcode=='k001btnBck')		{oCon.nav_home(); oCon.getControl('k006inpCheck').setValue(); };
		if(fcode=='k002btnBck')		{app.to('K001','slide');};
		if(fcode=='k003btnBck')		{app.to('K006','slide');};
		if(fcode=='k004btnBck')		{app.to('K001','slide');};
		if(fcode=='k005btnBck')		{app.to('K001','slide');};
		if(fcode=='k006btnBck')		{app.to('K001','slide');};
		//if(fcode=='k007btnBck')		{app.to('K001','slide');};
		if(fcode=='k007btnBck')		{app.to('K008','slide');};
		if(fcode=='k008btnBck')		{app.to('K001','slide');};

		if(fcode=='k003btnHom')		{oCon.nav_home();};	
		if(fcode=='k007btnHom')		{oCon.nav_home();};	
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){

	},
});