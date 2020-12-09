sap.ui.controller("zui5sd00e04.proc.B100", {
	
	// --------------------------------------------------------------------------------	
	// PAI FCODE 
	// --------------------------------------------------------------------------------	
	
	M01_FCD: function(fcode,oModela){	 
		
	// -------------------------------------------------------------------------------- B101 :: List Document Header 
		
		// 	List Document 
			if(fcode=='b101TblOvw'){
				//var doc_number = oCon.getProperty('b101TblOvw','docnum');
				//if (doc_number.length > 10) { 
				//	doc_number = doc_number.substring(0,9) + doc_number.substring(14,20); 
				//} 
				oCon.getControl('b103checkBck').setValue();
				oCon.getControl('b103inpState').setValue();
				oCon.ui5DispatchBackEnd("SAPEVT_B102","evt_b102","{i18n>MSG_PROCESS}");
			};	
					
		// 	Pop Up Input Document Number & Delivery Date 		
			if(fcode=='b101btnSel'){ 
				oCon.getFocus('b102inpXblnr');
				oCon.getControl('b101DiaSel').open();
			}	
			if(fcode=='b101btnApply'){ 
				oCon.ui5DispatchBackEnd("SAPEVT_B101","evt_b101","{i18n>MSG_PROCESS}");
				oCon.getControl('b101DiaSel').close();
			};	
			
		// 	Back to Previous Page
			if(fcode=='b101btnBck'){
				oCon.nav_home();				
			};		
		
	// -------------------------------------------------------------------------------- B102 :: List Document Items
		
		// 	Popup input GR (Page B103)
			if(fcode=='b102TblOvw'){  
				oCon.getControl('b103inpState').setValue(oCon.getFieldValue('b102TblOvw',['state']));
				oCon.getControl('b103inpName').setValue(oCon.getFieldValue('b102TblOvw',['matnr']));
				oCon.getControl('b103inpMatnr').setValue(oCon.getFieldValue('b102TblOvw',['matnr','maktx']));
				oCon.getControl('b103inpHsdat').setValue(oCon.getFieldValue('b102TblOvw',['hsdat']));
				oCon.getControl('b103inpVfdat').setValue(oCon.getFieldValue('b102TblOvw',['vfdat']));
				oCon.getControl('b103inpLicha').setValue(oCon.getFieldValue('b102TblOvw',['licha']));
	        	oCon.getControl('b103inpCharg').setValue(oCon.getFieldValue('b102TblOvw',['charg']));
				oCon.getControl('b103inpBudat').setValue(oCon.getFieldValue('b102TblOvw',['budat']));
				oCon.getControl('b103inpXblnr').setValue(oCon.getFieldValue('b102TblOvw',['xblnr']));
				oCon.getControl('b103inpBldat').setValue(oCon.getFieldValue('b102TblOvw',['bldat']));
				oCon.getControl('b103inpEbeln').setValue(oCon.getFieldValue('b102TblOvw',['ebeln']));
				oCon.getControl('b103inpType').setValue(oCon.getFieldValue('b102TblOvw',['rm_type']));						// ++ 2018.01.16 :: GR - WM V1.9  
				oCon.getControl('b103inpSource').setValue(oCon.getFieldValue('b102TblOvw',['rm_source']));					// ++ 2018.01.16 :: GR - WM V1.9
				oCon.getControl('b103inpLicha').setEditable(false);
				oCon.getControl('b103inpHsdat').setEditable(false);
				oCon.getControl('b103inpVfdat').setEditable(false); 
				oCon.getControl('b103inpCharg').setVisible(false); 
				oCon.getControl('b103inpType').setVisible(false);															// ++ 2018.01.16 :: GR - WM V1.9  
				oCon.getControl('b103inpSource').setVisible(false); 														// ++ 2018.01.16 :: GR - WM V1.9 
				
				if (oCon.getControl('b103inpState').getValue() == 0) { // 	Case RM 
					//oCon.getControl('b103inpVfdat').setVisible(false);
					if (oCon.getFieldValue('b102TblOvw',['nss_mfg']) == ' ') {oCon.getControl('b103inpHsdat').setEditable(false);}	// ++ 2018.02.07 :: GR - WM V2.1
						else {oCon.getControl('b103inpHsdat').setEditable(true);}
					if (oCon.getFieldValue('b102TblOvw',['nss_rmt']) == ' ') {oCon.getControl('b103inpType').setVisible(false);}	// ++ 2018.02.07 :: GR - WM V2.1
						else {oCon.getControl('b103inpType').setVisible(true);}
					if (oCon.getFieldValue('b102TblOvw',['nss_rms']) == ' ') {oCon.getControl('b103inpSource').setVisible(false);}	// ++ 2018.02.07 :: GR - WM V2.1
						else {oCon.getControl('b103inpSource').setVisible(true);} 
					if (oCon.getFieldValue('b102TblOvw',['nss_txt']) == ' ') {oCon.getControl('b103inpText').setVisible(false);}	// ++ 2018.10.09 :: GR - WM V2.7.2
						else {oCon.getControl('b103inpText').setVisible(true);} 
				};
				
				if (oCon.getFieldValue('b102TblOvw',['vfdat']) < oCon.getDateIn(0)) {											// ++ 2018.09.12 :: GR From CPF V2.7.1
					oCon.getControl('b103inpHsdat').setValueState(sap.ui.core.ValueState.Error);
				} else {oCon.getControl('b103inpHsdat').setValueState(sap.ui.core.ValueState.None);}
				
				app.to('B103','slide');
				
			};
			
		// 	Popup ready to post GR
			if(fcode=='b102btnSav'){  
				if (oCon.getControl('b103inpState').getValue() == 0) {	// Case RM ; Close Field Dlv. Note
					oCon.getControl('b102inpXblnr').setEditable(false);  
				} else {
					oCon.getControl('b102inpXblnr').setEditable(true);   
				}	
				oCon.getControl('b102inpXblnr').setValue(oCon.getControl('b103inpXblnr').getValue()); 
				oCon.getControl('b102inpBldat').setValue(oCon.getControl('b103inpBldat').getValue()); 
				oCon.getControl('b102DiaSav').open();
			};	
			
		// 	Post GR				
			if(fcode=='b102btnPost'){ 
				oCon.getControl('b102DiaSav').close();
				oCon.ui5DispatchBackEnd("SAPEVT_B104","evt_b104","{i18n>MSG_PROCESS}");
			};		
			
		// 	Back to Previous Page
			if(fcode=='b102btnBck'){
				oCon.ui5DispatchBackEnd("SAPEVT_B101","evt_b101","{i18n>MSG_PROCESS}");
				app.to('B101','slide');
			};	 			
			
		// 	Back to Home Page
			if(fcode=='b102btnHom'){
				oCon.nav_home();
			};	 
		
	// -------------------------------------------------------------------------------- B103 :: Store Vendor Match	
		
		// 	Accept Button ; Store Vendor Batch				
			if(fcode=='b103btnAcp'){ 
				oCon.ui5DispatchBackEnd("SAPEVT_B103","evt_b103","{i18n>MSG_PROCESS}");
				oCon.getControl('b103inpMenge').setValue();																	// ++ 2018.01.04			
				oCon.getControl('b103inpDiffQty').setValue(); 																// ++ 2018.01.04
				oCon.getControl('b103inpText').setValue();																	// ++ 2018.10.09 :: GR - WM V2.7.2
			};	 
			
		//	Display Actual Entered Batch
			if(fcode=='b103btnDis'){ 
				oCon.getControl('b103inpCheck').setValue("X");			
				oCon.ui5DispatchBackEnd("SAPEVT_B105","evt_b105","{i18n>MSG_PROCESS}");
			}; 
			
		// 	Refresh Exp Date
			if(fcode=='b103btnCal'){
				oCon.ui5DispatchBackEnd("SAPEVT_B106","evt_b106","{i18n>MSG_PROCESS}");
			};	
			
		// 	Back Button	:: recall evt102 for get GR Qty from SHM			
			if(fcode=='b103btnBck'){ 
				oCon.getControl('b103checkBck').setValue("X");	
				oCon.ui5DispatchBackEnd("SAPEVT_B102","evt_b102","{i18n>MSG_PROCESS}");
			};
			
		// 	Back to Home Page
			if(fcode=='b103btnHom'){
				oCon.nav_home();
			};	 	 
			
	// -------------------------------------------------------------------------------- B104 :: Display Entered Batch 
			
		//	Delete Actual Entered Batch	
			// if(fcode=='b104TblOvw_delete'){
			//	oCon.getControl('b103inpCheck').setValue("");	
			//	oCon.getControl('b104inpInd').setValue(oCon.getProperty('b104TblOvw','index'));
			//	oCon.getControl('b104inpQty').setValue(oCon.getProperty('b104TblOvw','menge_ikg'));
			//	oCon.ui5DispatchBackEnd("SAPEVT_B105","evt_b105","{i18n>MSG_PROCESS}"); 
			// };
			
		//	Delete Actual Entered Batch	
			if(fcode=='b104btnDel'){ 
				oCon.getControl('b103inpCheck').setValue("");
				oCon.getControl('b104inpInd').setValue(oCon.getProperty('b104TblOvw','index'));
				oCon.ui5DispatchBackEnd("SAPEVT_B105","evt_b105","{i18n>MSG_PROCESS}"); 
			};
		
		// 	Back Button
			if(fcode=='b104btnBck'){ 
				app.to('B103','slide');
			}; 			
			
		// 	Back to Home Page
			if(fcode=='b104btnHom'){
				oCon.nav_home();
			};
	}, 
	
	// --------------------------------------------------------------------------------	
	// Parameters 
	// --------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){ 
		
	// 	List Document <SY-DATUM>
		if(fcode=="SAPEVT_B101"){
			return oParameters = { 
				"ieindt" 	: oCon.getControl('b101inpEindt').getValue(),
				"idocnum" 	: oCon.getControl('b101inpDocNum').getValue(),
			};
		};
	
	// 	Click on Doc, Read Doc No & Dlv Date & Doc Type
		if(fcode=="SAPEVT_B102"){
		// 	List Document Item
			if (oCon.getControl('b103checkBck').getValue() == "") {	
				return oParameters = { 
					"idocnum" 	: oCon.getProperty('b101TblOvw','docnum'), 
					"ixblnr" 	: oCon.getProperty('b101TblOvw','xblnr'), 
					"ieindt" 	: oCon.getControl('b101inpEindt').getValue(),
					"ibsart" 	: oCon.getProperty('b101TblOvw','bsart'),
				};				
			}				
		// 	Back
			else if (oCon.getControl('b103checkBck').getValue() == "X"){ 	
				return oParameters = {
					"idocnum" 	: oCon.getProperty('b101TblOvw','docnum'),
					"ieindt" 	: oCon.getControl('b101inpEindt').getValue(), 
					"iback" 	: oCon.getControl('b103checkBck').getValue(),
					"ixblnr" 	: oCon.getProperty('b101TblOvw','xblnr'), 
					"ibsart" 	: oCon.getProperty('b101TblOvw','bsart'),
				};				
			} 
		};		
			
	// 	Store Vendor Batch	
		if(fcode=="SAPEVT_B103"){ 
			return oParameters = { 
				"idocnum" 		: oCon.getProperty('b101TblOvw','docnum'),
				"iebelp" 		: oCon.getProperty('b102TblOvw','ebelp'),
				"ilicha"		: oCon.getControl('b103inpLicha').getValue(),
				"icharg"		: oCon.getControl('b103inpCharg').getValue(),
				"ihsdat"		: oCon.getControl('b103inpHsdat').getValue(),
				"ivfdat"		: oCon.getControl('b103inpVfdat').getValue(),
				"imenge"		: oCon.getControl('b103inpMenge').getValue(),
				"idiff"			: oCon.getControl('b103inpDiffQty').getValue(),
				"imatnr"		: oCon.getControl('b103inpName').getValue(),
				"iebeln"		: oCon.getControl('b103inpEbeln').getValue(),
				"imeins" 		: oCon.getProperty('b102TblOvw','meins_kgx'),
				"irm_type"		: oCon.getControl('b103inpType').getValue(),												// ++ 2018.01.16 :: GR - WM V1.9  
				"irm_source"	: oCon.getControl('b103inpSource').getValue(),												// ++ 2018.01.16 :: GR - WM V1.9
				"itext"			: oCon.getControl('b103inpText').getValue(),												// ++ 2018.10.09 :: GR - WM V2.7.2  
			};
		};  
		
	// 	Post GR	
		if(fcode=="SAPEVT_B104"){
			return oParameters = { 
				"idocnum" 	: oCon.getProperty('b101TblOvw','docnum'),
				"ibsart" 	: oCon.getProperty('b101TblOvw','bsart'), 
				"ixblnr"	: oCon.getControl('b102inpXblnr').getValue(),
				"ibudat"	: oCon.getControl('b103inpBudat').getValue(),
				"ibldat"	: oCon.getControl('b102inpBldat').getValue(),
				"ilfsnr"	: oCon.getControl('b102inpXblnr').getValue(),
				"ieindt" 	: oCon.getControl('b101inpEindt').getValue(),
			};
		};
		
	// 	Display and Delete Entered Batch	
		if(fcode=="SAPEVT_B105"){
			oCon.getControl('b103inpMenge').setValue(oCon.getControl('b103lblTitle').getText());				
			// Delete				
			if (oCon.getControl('b103inpCheck').getValue() == "") {	  				
				return oParameters = { 
					"idocnum" 	: oCon.getProperty('b101TblOvw','docnum'),
					"iebelp" 	: oCon.getProperty('b102TblOvw','ebelp'), 
					"iindex" 	: oCon.getControl('b104inpInd').getValue(), 
					"imatnr" 	: oCon.getControl('b103inpName').getValue(),
					"icharg" 	: oCon.getControl('b103inpCharg').getValue(),    
					"ibsart" 	: oCon.getProperty('b101TblOvw','bsart'),
				};				
			}				
			// Display
			else if (oCon.getControl('b103inpCheck').getValue() == "X"){ 	
				return oParameters = { 
					"idocnum" 	: oCon.getProperty('b101TblOvw','docnum'),
					"iebelp" 	: oCon.getProperty('b102TblOvw','ebelp'),
					"imatnr" 	: oCon.getControl('b103inpName').getValue(),
					"icharg" 	: oCon.getControl('b103inpCharg').getValue(), 
					"ibsart" 	: oCon.getProperty('b101TblOvw','bsart'),  
				};				
			}
		}; 
		
	// 	Refresh Exp Date	
		if(fcode=="SAPEVT_B106"){
			return oParameters = {
				"imatnr"	: oCon.getControl('b103inpName').getValue(), 
			};
		};	  
	},	
	
	// --------------------------------------------------------------------------------	
	// Model Set 
	// --------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){ 
		
	// 	Load Doc Header List
		if(fcode=='SAPEVT_B101'){oCon.getControl('b101TblOvw').setModel(oModela);};
	
	// 	Load Doc Item List
		if(fcode=='SAPEVT_B102'){oCon.getControl('b102TblOvw').setModel(oModela);};
		
	// 	Store Entered Batch
		if((fcode=='SAPEVT_B103')&&(oModela.oData.logon.typ=='S')){
			// var oItm  = oCon.getControl('b102TblOvw').getSelectedItem();
			// oItm.getAttributes()[1].setText(oModela.oData.head.menge_ikg);
			oCon.popMsgbox(oModela.oData.logon.msg);
		};
		
	// 	Post GR OK
		if((fcode=='SAPEVT_B104')&&(oModela.oData.logon.typ=='S')){ 
			oCon.getControl('b102TblOvw').setModel(oModela);
			oCon.popMsgbox(oModela.oData.logon.msg);
			if (oCTX.oData.hybrid != 'X' && oModela.oData.head.pdf_url != '') {												// ++ 2018.05.02 :: GR - WM V2.5				
				var mWin = window.open(oModela.oData.head.pdf_url);
				mWin.print();
			} 
		};
		
	// 	List entered batch		
		if(fcode=='SAPEVT_B105'){ 
			oCon.getControl('b104TblOvw').setModel(oModela);
//			if (oCon.getFieldValue('b104TblOvw',['flag']) != "Diff") {
//				oCon.getControl('b104btnDiff').setVisible(false);
//			}
		};
		
	// 	Refresh Exp. Date		
		if(fcode=='SAPEVT_B106'){ 
			var oItm  = oCon.getControl('b103inpVfdat').getSelectedItem(); 
			oItm.setText(oModela.oData.head.vfdat);
		}; 
		
	},
	
	// --------------------------------------------------------------------------------	
	// Set UI 
	// --------------------------------------------------------------------------------
	
	M04_DYN: function(fcode,oModela){ 
		
	// 	Set Default System Date
		if(fcode=='a103tilB100'){
			oCon.getControl('b101inpEindt').setValue(oCon.getDateIn());
			oCon.getControl('b101inpEbeln').setValue();
		};
	
	},
	
	// --------------------------------------------------------------------------------	
	// Navigation 
	// --------------------------------------------------------------------------------
		M05_NAV: function(fcode,oModela){
	
		if(fcode=="SAPEVT_B101")    {app.to('B101','slide');};
		if(fcode=="SAPEVT_B102")    {app.to('B102','slide');};
		if(fcode=="SAPEVT_B105")    {app.to('B104','slide');};
	
		// if(fcode=='b101btnBck')	{oCon.nav_home();};
		// if(fcode=='b102btnBck')	{app.to('B101','slide');};
		if(fcode=='b103btnBck')		{app.to('B102','slide');};
		if(fcode=='b104btnBck')		{app.to('B103','slide');};
	},
	
	// --------------------------------------------------------------------------------	
	// Navigation 
	// --------------------------------------------------------------------------------
	
	M06_NEX: function(fcode,oModela){
		
	// 	Set color of status text
		if(fcode=='SAPEVT_B101'){
			var oItms = oCon.arrListItems('b101TblOvw','status'); 
			
			for (var i = 0; i < oItms.length; i++) {
				
				var oItm 	= oItms[i];  
				if (oItm == 'Complete') { 
					oCon.getControl('b101TblOvw').getItems()[i].getAggregation("cells")[0].setState('Success');
				} else { 
					oCon.getControl('b101TblOvw').getItems()[i].getAggregation("cells")[0].setState('Warning');
				}
			}
		}; 
		
	},
});