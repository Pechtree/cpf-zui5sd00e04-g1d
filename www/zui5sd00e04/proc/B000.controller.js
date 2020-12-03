sap.ui.controller("zui5sd00e04.proc.B000", {
	
	// --------------------------------------------------------------------------------	
	// PAI FCODE 
	// --------------------------------------------------------------------------------	
	
	M01_FCD: function(fcode,oModela){
		
	// -------------------------------------------------------------------------------- B001 :: List Document Header 
		
		// 	List Document 
			if(fcode=='b001TblOvw'){
				oCon.getControl('b003checkBck').setValue("");
				oCon.ui5DispatchBackEnd("SAPEVT_B202","evt_b202","{i18n>MSG_PROCESS}");	 
			};	
			
		// 	Pop Up Input Document Number & Delivery Date 		
			if(fcode=='b001btnSel'){ 
				oCon.getFocus('b002inpXblnr');
				oCon.getControl('b001DiaSel').open();	
			}	
			if(fcode=='b001btnApply'){ 
				oCon.ui5DispatchBackEnd("SAPEVT_B201","evt_b201","{i18n>MSG_PROCESS}");
				oCon.getControl('b001DiaSel').close();	
			};	
			
		// 	Back to Previous Page
			if(fcode=='b001btnBck'){
				oCon.nav_home();				
			};		
			
	// -------------------------------------------------------------------------------- B002 :: List Document Items
			
		// 	Popup input GR (Page B103)
			if(fcode=='b002TblOvw'){ 
				oCon.getControl('b003inpName').setValue(oCon.getFieldValue('b002TblOvw',['matnr_in']));
				oCon.getControl('b003inpMatnr').setValue(oCon.getFieldValue('b002TblOvw',['matnr_in','maktx_in']));
				oCon.getControl('b003inpHsdat').setValue();				
				oCon.getControl('b003inpVfdat').setValue();
				app.to('B003','slide');	
			}; 
			
		// 	Popup ready to post GR
			if(fcode=='b002btnSav'){
				oCon.getControl('b002inpXblnr').setValue();
				oCon.getControl('b002inpBldat').setValue(oCon.getDateIn(0));
				oCon.getControl('b002DiaSav').open();
				oCon.getFocus('b002inpXblnr');
			};
	
		//	Post GR			
			if(fcode=='b002btnPost'){ 
				oCon.getControl('b002DiaSav').close();
				oCon.ui5DispatchBackEnd("SAPEVT_B204","evt_b204","{i18n>MSG_PROCESS}");
			};
			
		// 	Back to Home Page
			if(fcode=='b002btnHom'){
				oCon.nav_home();
			};	 

	// -------------------------------------------------------------------------------- B003 :: Store Vendor Batch		
			
		// 	Determine Exp. Date	++ 2018.08.30 :: GR - Vendor V2.7 :: Determine Exp. date
			if(fcode=='b003inpHsdat'){
				var sValue 	= oCon.getControl('b003inpHsdat').getValue()
				if (sValue.length > 8) {	
					oCon.popMsgbox(sValue+" is not valid date");
					oCon.getControl('b003inpHsdat').setValue()
					oCon.getControl('b003inpVfdat').setValue()
					return;
				} 
				oCon.ui5DispatchBackEnd("SAPEVT_B206","evt_b206","{i18n>MSG_PROCESS}");
			};	 	
			
		// 	Accept Button ; Store Vendor Batch				
			if(fcode=='b003btnAcp'){ 
				oCon.ui5DispatchBackEnd("SAPEVT_B203","evt_b203","{i18n>MSG_PROCESS}");
				oCon.getControl('b003inpCharg').setValue();
				oCon.getControl('b003inpHsdat').setValue();
				oCon.getControl('b003inpMenge').setValue();
				oCon.getControl('b003inpVfdat').setValue();		// ++ 2018.08.30 :: GR - Vendor V2.7 :: Determine Exp. date
			};	 
			
		//	Display Actual Entered Batch
			if(fcode=='b003btnDis'){ 
				oCon.getControl('b003inpCheck').setValue("X");			
				oCon.ui5DispatchBackEnd("SAPEVT_B205","evt_b205","{i18n>MSG_PROCESS}");
			}; 
			
		// 	Back Button	:: recall evt002 for get GR Qty from SHM			
			if(fcode=='b003btnBck'){ 
				oCon.getControl('b003checkBck').setValue("X");	
				oCon.ui5DispatchBackEnd("SAPEVT_B202","evt_b202","{i18n>MSG_PROCESS}");
			};
			
		// 	Back to Home Page
			if(fcode=='b003btnHom'){
				oCon.nav_home();
			};	 	 
			
	// -------------------------------------------------------------------------------- B004 :: Display Entered Batch 
		
		//	Delete Actual Entered Batch	
			if(fcode=='b004btnDel'){
				oCon.getControl('b003inpCheck').setValue("");
				oCon.getControl('b004inpInd').setValue(oCon.getProperty('b004TblOvw','index'));
				oCon.ui5DispatchBackEnd("SAPEVT_B205","evt_b205","{i18n>MSG_PROCESS}");  
			};
			
		// 	Back Button
			if(fcode=='b004btnBck'){ 
				oCon.getControl('b003inpHsdat').setValue();				
				oCon.getControl('b003inpVfdat').setValue();
				app.to('B003','slide');
			}; 			
					
		// 	Back to Home Page
			if(fcode=='b004btnHom'){
				oCon.nav_home();
			};
	},
	
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_B201"){
			return oParameters = { 
				"ieindt" 	: oCon.getControl('b001inpEindt').getValue(),
				"iebeln" 	: oCon.getControl('b001inpEbeln').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_B202"){		
			// List Document Item
			if (oCon.getControl('b003checkBck').getValue() == "") {	
				return oParameters = { 
					"iebeln" 	: oCon.getProperty('b001TblOvw','ebeln'), 
					"ieindt" 	: oCon.getControl('b001inpEindt').getValue(),
					"ibsart" : oCon.getProperty('b001TblOvw','bsart')
				};				
			}				
			// Back
			else if (oCon.getControl('b003checkBck').getValue() == "X"){ 	
				return oParameters = {
					"iebeln" 	: oCon.getProperty('b001TblOvw','ebeln'),
					"ieindt" 	: oCon.getControl('b001inpEindt').getValue(), 
					"iback" 	: oCon.getControl('b003checkBck').getValue(),
					"ibsart" 	: oCon.getProperty('b001TblOvw','bsart'),
				};				
			} 
		}; 
		
		if(fcode=="SAPEVT_B204"){//Post GR
			return oParameters = { 
				"iebeln" 	: oCon.getProperty('b001TblOvw','ebeln'),
				"ibldat"	: oCon.getControl('b002inpBldat').getValue(),
				"ixblnr"	: oCon.getControl('b002inpXblnr').getValue(),
				"ibsart" 	: oCon.getProperty('b001TblOvw','bsart'),
			};
		};
		
		if(fcode=="SAPEVT_B203"){//Store Vendor Batch
			return oParameters = { 
				"iebeln" 	: oCon.getProperty('b002TblOvw','ebeln'),
				"iebelp" 	: oCon.getProperty('b002TblOvw','ebelp'),
				"ilicha"	: oCon.getControl('b003inpCharg').getValue(),
				"ihsdat"	: oCon.getControl('b003inpHsdat').getValue(),
				"imenge"	: oCon.getControl('b003inpMenge').getValue(),
				"imatnr"	: oCon.getControl('b003inpName').getValue(),
				"ibsart" 	: oCon.getProperty('b001TblOvw','bsart'),
				"ivfdat"	: oCon.getControl('b003inpVfdat').getValue(),	// ++ 2018.08.30 :: GR - Vendor V2.7 :: Determine Exp. date

			};
		};
		
		if(fcode=="SAPEVT_B205"){
			// Delete
			if (oCon.getControl('b003inpCheck').getValue() == "") {
				return oParameters = { 
					"iebeln" 	: oCon.getProperty('b001TblOvw','ebeln'),
					"iebelp" 	: oCon.getProperty('b002TblOvw','ebelp'),
					"iindex" 	: oCon.getControl('b004inpInd').getValue(), 
					"imatnr" 	: oCon.getControl('b003inpName').getValue(),
					"icharg" 	: oCon.getControl('b003inpCharg').getValue(), 
					"ibsart" 	: oCon.getProperty('b001TblOvw','bsart'),   
				};				
			}				
			// Display
			else if (oCon.getControl('b003inpCheck').getValue() == "X"){ 	
				return oParameters = { 
					"iebeln" 	: oCon.getProperty('b001TblOvw','ebeln'),
					"iebelp" 	: oCon.getProperty('b002TblOvw','ebelp'),
					"imatnr" 	: oCon.getControl('b003inpName').getValue(),
					"icharg" 	: oCon.getControl('b003inpCharg').getValue(),
					"ibsart" 	: oCon.getProperty('b001TblOvw','bsart'), 
				};				
			}
		}; 
		
		if(fcode=="SAPEVT_B206"){//Determine Exp. date
			return oParameters = { 
				"ihsdat"	: oCon.getControl('b003inpHsdat').getValue(),
				"imatnr"	: oCon.getControl('b003inpName').getValue(),
			};
		};
	},
	
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){
		
		//Load PO Header List
		if(fcode=='SAPEVT_B201'){oCon.getControl('b001TblOvw').setModel(oModela);};
		
		//Load PO Item List
		if(fcode=='SAPEVT_B202'){oCon.getControl('b002TblOvw').setModel(oModela);};
		
		if((fcode=='SAPEVT_B204')&&(oModela.oData.logon.typ=='S')){ //Post GR OK
			oCon.getControl('b002TblOvw').setModel(oModela);
			oCon.popMsgbox(oModela.oData.logon.msg);
			if (oCTX.oData.hybrid != 'X' && oModela.oData.head.pdf_url != '') {		// ++ 2018.05.02 :: GR - WM V2.5
				var mWin = window.open(oModela.oData.head.pdf_url);
				mWin.print();
			} 
		};
		
		if(fcode=='SAPEVT_B203'){ //Store Vendor Batch
			var oItm  = oCon.getControl('b002TblOvw').getSelectedItem();
			oItm.getAttributes()[2].setText(oModela.oData.head.menge_ikg);
			//oCon.popMsgbox(oModela.oData.logon.msg);
		};
		
		if(fcode=='SAPEVT_B205'){ //List entred batch
			oCon.getControl('b004TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_B206'){ //Determine Exp. date
			oCon.getControl('b003inpVfdat').setModel(oModela);
		};
		
	},
	
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	
	M04_DYN: function(fcode,oModela){
		
		if(fcode=='a003tilB000'){
			oCon.getControl('b001inpEindt').setValue(oCon.getDateIn());
			oCon.getControl('b001inpEbeln').setValue(); 
		};
		
	},
	
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="SAPEVT_B201")    {app.to('B001','slide');};
		if(fcode=="a003tilB000")    {app.to('B001','slide');};
		if(fcode=="SAPEVT_B202")    {app.to('B002','slide');};
		if(fcode=="SAPEVT_B205")    {app.to('B004','slide');};
		
		if(fcode=='b001btnBck')		{oCon.nav_home();};
		if(fcode=='b002btnBck')		{app.to('B001','slide');};
		if(fcode=='b003btnBck')		{app.to('B002','slide');};
		if(fcode=='b004btnBck')		{app.to('B003','slide');};
	},
	
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	
	M06_NEX: function(fcode,oModela){
		
	},
});