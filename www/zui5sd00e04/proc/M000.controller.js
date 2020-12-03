sap.ui.controller("zui5sd00e04.proc.M000", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		//----------------------------------------------------------- 
	
		
		
//		if(fcode=="m001BtnTestSU")	{
//		oCon.getControl('m001InpLenum').getValue();
//		oCon.ui5DispatchBackEnd("SAPEVT_M002","evt_m002","{i18n>MSG_PROCESS}");
//		};
//		
//		if(fcode=="m001BtnTestBIN")	{
//			oCon.getControl('m001InpLenum').getValue();
//			oCon.ui5DispatchBackEnd("SAPEVT_M003","evt_m003","{i18n>MSG_PROCESS}");
//		};
//		
		//Enter Key SU
		if(fcode=="m001InpLenum")	{
			oCon.ui5DispatchBackEnd("SAPEVT_M002","evt_m002","{i18n>MSG_PROCESS}");
			oCon.getControl('m001BtnSU').setEnabled(false);
			oCon.getControl('m001BtnBin').setEnabled(true);
		};
		
		//Enter Key Bin
		if(fcode=="m001InpLgpla")	{
			oCon.ui5DispatchBackEnd("SAPEVT_M003","evt_m003","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=="m001BtnSU")	{		
			//oCon.scanCam('m001InpQrData','m001InpQrData');			
		};
		
		if(fcode=="m001BtnBin")	{			
			//oCon.scanCam('m001InpQrData','m001InpQrData');			
		};
		
		
//		if(fcode=='m001InpQrData_SU'){//Scan SU
//			var oModel  = oCon.getQrData(oCon.getControl('m001InpQrData').getValue());
//			
////			oCTX.oData.matnr = oModel.oData.matnr;
//
//			oCon.getControl('m001InpQrData').setValue();
//					
//			oCon.getControl('m001InpLenum').setValue(oModel.oData.lenum);
//			
//			var su = oCon.getControl('m001InpLenum').getValue();
//			
//			if(su!=""){
//				oCon.ui5DispatchBackEnd("SAPEVT_M002","evt_m002","{i18n>MSG_PROCESS}"); // Create TO
//				oCon.getControl('m001BtnSU').setEnabled(false);
//				oCon.getControl('m001BtnBin').setEnabled(true);
//			}	
//		};
//		
//		if(fcode=='m001InpQrData_BIN'){//Scan BIN
//			var oModel  = oCon.getQrData(oCon.getControl('m001InpQrData').getValue());
//			
//			oCTX.oData.lgpla = oModel.oData.lgpla;
//			oCon.getControl('m001InpQrData').setValue();
//
//			var bin = oCon.getControl('m001InpLgpla').getValue();
//			var newbin = oCTX.oData.lgpla;
//			
//			if(bin != newbin){
//				var txt = 'Do you want to save ? Bin: ' + newbin ;
//				oCon.popConfirm(txt,'m001btnSav_ok','m001btnSav_no');
//			}else{
//				oCon.popConfirm('Do you want to save ?','m001btnSav_ok','m001btnSav_no');	
//			}
//			
////			if(fcode=='m001btnSav_ok'){
////				//backend add new bin to zsu
////				oCon.getControl('m001InpLgpla').setValue(oCTX.oData.charg);
////			};
//			
//		};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){ 
		
		if(fcode=="SAPEVT_M002"){
			return oParameters = { 
				"ilenum" 	: oCon.getControl('m001InpLenum').getValue(), //su
			};
		};
		
		if(fcode=="SAPEVT_M003"){
			return oParameters = { 
				"ilenum" 	: oCon.getControl('m001InpLenum').getValue(), //su
				"ilgpla" 	: oCon.getControl('m001InpLgpla').getValue(), //new bin
				"ito" 	: oCon.getControl('m001InpTanum').getValue(), //to
			};
		};
	
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){ 
		
		if(fcode=='SAPEVT_M002'){
//			if(oModela.oData.logon.typ=='E'){
//				oCon.getControl('m001InpLenum').setValue();	
//			} else {
				oCon.getControl('m001InpMatnr').setModel(oModela);
				oCon.getControl('m001InpMaktx').setModel(oModela);
				oCon.getControl('m001InpCharg').setModel(oModela);
				oCon.getControl('m001InpMenge').setModel(oModela);
				oCon.getControl('m001InpMeins').setModel(oModela);
				oCon.getControl('m001InpLgpla').setModel(oModela);
				oCon.getControl('m001InpTanum').setModel(oModela);
//			}
				//oCon.getControl('m001InpLenum').setModel(oModela);
				//oCon.getControl('m001InpMatnr').setModel(oModela);
				//oCon.getControl('m001InpMaktx').setModel(oModela);
				//oCon.getControl('m001InpCharg').setModel(oModela);
				//oCon.getControl('m001InpMenge').setModel(oModela);
				//oCon.getControl('m001InpMeins').setModel(oModela);
				//oCon.getControl('m001InpLgpla').setModel(oModela);
				//oCon.getControl('m001InpTanum').setModel(oModela);
//			} else {
//				oCon.getControl('m001InpLenum').setValue();				
//			}		
		}; //
		
		if(fcode=='SAPEVT_M003'){
			oCon.popMsgbox(oModela.oData.logon.msg);
			oCon.getControl('m001InpLenum').setValue();
			oCon.getControl('m001InpMatnr').setValue();
			oCon.getControl('m001InpMaktx').setValue();
			oCon.getControl('m001InpCharg').setValue();
			oCon.getControl('m001InpMenge').setValue();
			oCon.getControl('m001InpMeins').setValue();
			oCon.getControl('m001InpLgpla').setValue();
			oCon.getControl('m001InpTanum').setValue();
		}; //

	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){ 
		
	
//		if(fcode=="m001BtnSU")	{
//			
//			var su = oCon.getControl('m001InpLenum').getValue();
//			
//			if(su!=""){
//				oCon.getControl('m001BtnSU').setEnabled(false);
//				oCon.getControl('m001BtnBin').setEnabled(true);
//			}
//			
//		};
		
		
		if(fcode=='m001InpQrData'){
			var oModel  = oCon.getQrData(oCon.getControl('m001InpQrData').getValue());
					
			if(oModel.oData.type == 'B'){ //Scan SU
		
				oCTX.oData.lenum = oModel.oData.lenum;
				oCon.getControl('m001InpQrData').setValue();
				oCon.getControl('m001InpLenum').setValue(oModel.oData.lenum);
				
				var su = oCon.getControl('m001InpLenum').getValue();
				
				if(su!=""){
					oCon.ui5DispatchBackEnd("SAPEVT_M002","evt_m002","{i18n>MSG_PROCESS}"); // Create TO
					oCon.getControl('m001BtnSU').setEnabled(false);
					oCon.getControl('m001BtnBin').setEnabled(true);
				}		
			}
			
			if(oModel.oData.type == 'BIN'){ //Scan BIN
				
				if(oCon.getControl('m001InpLenum').getValue() != ""){
					
					oCTX.oData.lgpla = oModel.oData.lgpla;
					oCon.getControl('m001InpQrData').setValue();

					var bin = oCon.getControl('m001InpLgpla').getValue();
					var newbin = oCTX.oData.lgpla;
				
					if(bin != newbin){
						var txt = 'Do you want to save ? Bin: ' + newbin ;
						oCon.popConfirm(txt,'m001btnSav_ok','m001btnSav_no');
					}else{
						oCon.popConfirm('Do you want to save ?','m001btnSav_ok','m001btnSav_no');	
					}
				}else{
					oCon.popMsgbox("Please scan SU");
				}
			}
			
		};
			
		
		if(fcode=='SAPEVT_M001'){ 
			
			oCon.getFocus('m001InpQrData');
			
			oCon.getControl('m001InpLenum').setValue("");
			oCon.getControl('m001InpMatnr').setValue("");
			oCon.getControl('m001InpMaktx').setValue("");
			oCon.getControl('m001InpCharg').setValue("");
			oCon.getControl('m001InpMenge').setValue("");
			oCon.getControl('m001InpMeins').setValue("");
			oCon.getControl('m001InpLgpla').setValue("");
			oCon.getControl('m001InpTanum').setValue("");
			
			oCon.getControl('m001BtnSU').setEnabled(true);
			oCon.getControl('m001BtnBin').setEnabled(false);
	
		};
		
		if(fcode=='m001btnSav_ok'){
			oCon.getControl('m001InpLgpla').setValue(oCTX.oData.lgpla);
			oCon.getControl('m001BtnSU').setEnabled(true);
			oCon.getControl('m001BtnBin').setEnabled(false);
			
			oCon.ui5DispatchBackEnd("SAPEVT_M003","evt_m003","{i18n>MSG_PROCESS}");		
		};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){ 
		
		if(fcode=="SAPEVT_M001")	{app.to('M001','slide');};
		if(fcode=='m001btnBck')		{oCon.nav_home();};
	
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
	

	
});