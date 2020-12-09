sap.ui.controller("zui5sd00e04.B.B000", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- B001
		if(fcode=='b001TblOvw'){ //GR
			oCon.ui5DispatchBackEnd("SAPEVT_B002","evt_b002","{i18n>MSG_PROCESS}");
		};		
		if(fcode=='b001btnSel'){
			oCon.getFocus('b002inpXblnr');
			oCon.getControl('b001DiaSel').open();
		}
		if(fcode=='b001btnApply'){
			oCon.ui5DispatchBackEnd("SAPEVT_B001","evt_b001","{i18n>MSG_PROCESS}");
			oCon.getControl('b001DiaSel').close();
		};
		
		//----------------------------------------------------------- B002		
		if(fcode=='b002TblOvw'){//Popup input GR
			oCon.getControl('b003inpMatnr').setValue(oCon.getFieldValue('b002TblOvw',['matnr_in','maktx_in']));
			app.to('B003','slide');
		};

		if(fcode=='b002btnSav'){//Popup ready to post GR
			oCon.getControl('b002inpXblnr').setValue();
			oCon.getControl('b002inpBldat').setValue(oCon.getDateIn(0));
			oCon.getControl('b002DiaSav').open();
			oCon.getFocus('b002inpXblnr');
		};
		
		if(fcode=='b002btnPost'){//Post GR
			oCon.getControl('b002DiaSav').close();
			oCon.ui5DispatchBackEnd("SAPEVT_B003","evt_b003","{i18n>MSG_PROCESS}");
		};

		
		//----------------------------------------------------------- B003	
		if(fcode=='b003btnAcp'){
			oCon.ui5DispatchBackEnd("SAPEVT_B004","evt_b004","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='b003btnDis'){//Display Entered Batch
			oCon.ui5DispatchBackEnd("SAPEVT_B005","evt_b005","{i18n>MSG_PROCESS}");
		};
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_B001"){//PO List
			return oParameters = { 
				"ieindt" 	: oCon.getControl('b001inpEindt').getValue(),
				"iebeln" 	: oCon.getControl('b001inpEbeln').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_B002"){//Read PO Item
			return oParameters = { 
				"iebeln" 	: oCon.getProperty('b001TblOvw','ebeln'),
				"ieindt" 	: oCon.getControl('b001inpEindt').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_B003"){//Post GR
			return oParameters = { 
				"iebeln" 	: oCon.getProperty('b001TblOvw','ebeln'),
				"ibldat"	: oCon.getControl('b002inpBldat').getValue(),
				"ixblnr"	: oCon.getControl('b002inpXblnr').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_B004"){//Store Vendor Batch
			return oParameters = { 
				"iebeln" 	: oCon.getProperty('b002TblOvw','ebeln'),
				"iebelp" 	: oCon.getProperty('b002TblOvw','ebelp'),
				"ilicha"	: oCon.getControl('b003inpCharg').getValue(),
				"ihsdat"	: oCon.getControl('b003inpHsdat').getValue(),
				"imenge"	: oCon.getControl('b003inpMenge').getValue(),

			};
		};
		
		if(fcode=="SAPEVT_B005"){//Display Entered Batch
			return oParameters = { 
				"iebeln" 	: oCon.getProperty('b002TblOvw','ebeln'),
				"iebelp" 	: oCon.getProperty('b002TblOvw','ebelp'),
			};
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		//Load PO Header List
		if(fcode=='SAPEVT_B001'){oCon.getControl('b001TblOvw').setModel(oModela);};
		
		//Load PO Item List
		if(fcode=='SAPEVT_B002'){oCon.getControl('b002TblOvw').setModel(oModela);};
		
		if((fcode=='SAPEVT_B003')&&(oModela.oData.logon.typ=='S')){ //Post GR OK
			oCon.getControl('b002TblOvw').setModel(oModela);
			oCon.popMsgbox(oModela.oData.logon.msg);
		};
		
		if(fcode=='SAPEVT_B004'){ //Store Vendor Batch
			var oItm  = oCon.getControl('b002TblOvw').getSelectedItem();
			oItm.getAttributes()[2].setText(oModela.oData.head.menge_ikg);
			oCon.popMsgbox(oModela.oData.logon.msg);
		};
		
		if(fcode=='SAPEVT_B005'){ //List entred batch
			oCon.getControl('b004TblOvw').setModel(oModela);
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
		
		if((fcode=='SAPEVT_B004')&&(oModela.oData.logon.typ=='S')){ //Store Vendor Batch
			oCon.getControl('b003inpCharg').setValue();
			oCon.getControl('b003inpHsdat').setValue();
			oCon.getControl('b003inpMenge').setValue();
		};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		//if(fcode=="SAPEVT_B001")    {app.to('B001','slide');};
		if(fcode=="a003tilB000")    {app.to('B001','slide');};
		if(fcode=="SAPEVT_B002")    {app.to('B002','slide');};
		if(fcode=="SAPEVT_B005")    {app.to('B004','slide');};
		
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