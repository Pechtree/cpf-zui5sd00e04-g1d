sap.ui.controller("zui5sd00e04.proc.C200", {
	
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		if(fcode=='c201btnAdd'){//Insert FG
			oCon.getControl('c201inpMatnrFg').setValue();
//			oCon.getControl('c201inpMengeIkg').setValue();
			oCon.getControl('c201inpMengeIst').setValue();
			oCon.getControl('c201diaFg').open();
		};
		
		if(fcode=='c201btnApply'){ //Insert FG
			
			if(oCon.getControl('c201inpMatnrFg').getValue()==''){ //Input FG
				oCon.popMsgbox('Please enter FG');
				return;
			};
//			if(oCon.getControl('c201inpMengeIkg').getValue()==''){ //Input Qty
//				oCon.popMsgbox('Please enter Qty');
//				return;
//			};
			if(oCon.getControl('c201inpMengeIst').getValue()==''){ //Input SET
				oCon.popMsgbox('Please enter order SET');
				return;
			};
			
			oCon.ui5DispatchBackEnd("SAPEVT_C202","evt_c202","{i18n>MSG_PROCESS}");
			oCon.getControl('c201diaFg').close();
		};
		
		if(fcode=='c201btnSav'){//Save Order
			oCon.popConfirm('Do you want to save ?','c201btnSav_ok','c201btnSav_no');
		};
		if(fcode=='c201btnSav_ok'){ //Confirm save
			oCon.ui5DispatchBackEnd("SAPEVT_C203","evt_c203","{i18n>MSG_PROCESS}");
		};
		
//		if(fcode=='c201btnAcp'){//Edit - OK
//			oCon.getCell('c201TblPmx',3).setText(oCon.fmtDec(oCon.getControl('c201inpOrder').getValue(),3));
//		};
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_C201"){//Enter menu
		};
		
		if(fcode=="SAPEVT_C202"){//Insert FG
			return oParameters = { 
				"imatnr"  		: oCon.getControl('c201inpMatnrFg').getValue(),
//				"imenge_pkg"  	: oCon.getControl('c201inpMengeIkg').getValue(),
				"imenge"  		: oCon.getControl('c201inpMengeIst').getValue(),
			};
		};
		
		if(fcode=="SAPEVT_C203"){//Save Premix
			return oParameters = { 
				"imatnr"  		: oCon.getControl('c201inpMatnrFg').getValue(),
//				"imenge_pkg"  	: oCon.getControl('c201inpMengeIkg').getValue(),
				"imenge"  		: oCon.getControl('c201inpMengeIst').getValue(),
				"matnr_px" 		: oCon.arrListSelected('c201TblPmx','matnr_px','menge_ist'),
				"menge_pkg" 	: oCon.arrListSelected('c201TblPmx','menge_pkg','menge_ist'),
				"menge_ist" 	: oCon.arrListSelected('c201TblPmx','menge_ist','menge_ist'),
				"meins_kg" 		: oCon.arrListSelected('c201TblPmx','meins_kg','menge_ist'),
			};
		};
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=="SAPEVT_C201"){//Enter menu
			oCon.getControl('c201TblPmx').setModel(oModela);
		};
		
		if(fcode=="SAPEVT_C202"){//Add FG
			oCon.getControl('c201TblPmx').setModel(oModela);
			oCon.getControl('c201TblPmx').selectAll();
		};
		
		if(fcode=="SAPEVT_C203"&&oModela.oData.logon.typ=='S'){//Save Premix
			oCon.popMsgbox(oModela.oData.logon.msg);
			oCon.getControl('c201TblPmx').setModel(oModela);
		};
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="SAPEVT_C201")    {app.to('C201','slide');};

		if(fcode=='c201btnBck')		{oCon.nav_home();};

		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){

	},
});
