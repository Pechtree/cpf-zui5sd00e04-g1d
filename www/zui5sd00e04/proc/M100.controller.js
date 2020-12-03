sap.ui.controller("zui5sd00e04.proc.M100", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		//----------------------------------------------------------- 
	
		
//		if(fcode=="m101BtnTestSU")	{
//			oCon.getControl('m101InpLenum').getValue();
//			oCon.ui5DispatchBackEnd("SAPEVT_M102","evt_m102","{i18n>MSG_PROCESS}");
//		};
//			
//		if(fcode=="m101BtnTestBIN")	{			
//			oCon.getControl('m101InpLenum').getValue();
//			oCon.ui5DispatchBackEnd("SAPEVT_M103","evt_m103","{i18n>MSG_PROCESS}");
//		};
		
		//Enter Key SU
		if(fcode=="m101InpQrData")	{
			oCon.ui5DispatchBackEnd("SAPEVT_M102","evt_m102","{i18n>MSG_PROCESS}");
			oCon.getControl('m101BtnSU').setEnabled(false);
			oCon.getControl('m101BtnSU').setEnabled(false);
			oCon.getControl('m101InpLgpla2').setValue();
		};
		
		//Enter Key SU
		if(fcode=="m101InpLenum")	{
			oCon.ui5DispatchBackEnd("SAPEVT_M102","evt_m102","{i18n>MSG_PROCESS}");
			oCon.getControl('m101BtnSU').setEnabled(false);
			oCon.getControl('m101BtnSU').setEnabled(false);
			oCon.getControl('m101InpLgpla2').setValue();
		};
		
		//Enter Key Bin
		if(fcode=="m101InpLgpla2")	{
			//oCon.ui5DispatchBackEnd("SAPEVT_M103","evt_m103","{i18n>MSG_PROCESS}");
		};
				
		
		if(fcode=="m101BtnSU")	{
			//oCon.scanCam('m101InpQrData','m101InpQrData');
		};
		
		if(fcode=="m101BtnBin")	{
			//oCon.scanCam('m101InpQrData','m101InpQrData');
		};
		
		if(fcode=="m101btnSav")	{
			
			var bin = oCon.getControl('m101InpLgpla1').getValue();
			var newbin = oCon.getControl('m101InpLgpla2').getValue();
			var lenum = oCon.getControl('m101InpLenum').getValue();
			
			if(bin != newbin){
				if (newbin == '') {
					oCon.popMsgbox('Please scan bin');						
				} else {
					var txt = 'Do you want to save ? Bin: ' + newbin ;
					oCon.popConfirm(txt,'m101btnSav_ok','m101btnSav_no');					
				}
			}else{
				oCon.popMsgbox('SU ' + lenum + ' has already place at bin ' + bin);
			}
			
		};
		
//		if(fcode=='m101InpQrData_SU'){//Scan SU
//			var oModel  = oCon.getQrData(oCon.getControl('m101InpQrData').getValue());
//			
//			oCon.getControl('m101InpQrData').setValue();
//				
//			oCon.getControl('m101InpLenum').setValue(oModel.oData.lenum);
//
//			var su = oCon.getControl('m101InpLenum').getValue();
//			if(su!=""){
//				oCon.ui5DispatchBackEnd("SAPEVT_M102","evt_m102","{i18n>MSG_PROCESS}"); // Display SU
//				oCon.getControl('m101BtnSU').setEnabled(false);
//				oCon.getControl('m101BtnBin').setEnabled(true);
//			}
//			
//			
//		};
//		
//		if(fcode=='m101InpQrData_BIN'){//Scan BIN
//			var oModel  = oCon.getQrData(oCon.getControl('m101InpQrData').getValue());
//			
//			oCTX.oData.lgpla = oModel.oData.lgpla;
//			
//			oCon.getControl('m101InpQrData').setValue();
//			
//			var bin = oCon.getControl('m101InpLgpla').getValue();
//			var newbin = oCTX.oData.lgpla;
//			
//			if(bin != newbin){
//				var txt = 'Do you want to save ? Bin: ' + newbin ;
//				oCon.popConfirm(txt,'m101btnSav_ok','m101btnSav_no');
//			}else{
//				//oCon.popConfirm('Do you want to save ?','m101btnSav_ok','m101btnSav_no');	
//				oCon.popMsgbox("error!!! same bin");
//			}
//			
//
//		};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){ 
		
		if(fcode=="SAPEVT_M102"){
			return oParameters = { 
				"ilenum" 	: oCon.getControl('m101InpLenum').getValue(), //su
			};
		};
		
		if(fcode=="SAPEVT_M103"){
			return oParameters = { 
				"ilenum" 	: oCon.getControl('m101InpLenum').getValue(), //su
				"ilgpla" 	: oCon.getControl('m101InpLgpla2').getValue(), //new bin
				"imenge" 	: oCon.getControl('m101InpMenge').getValue(),
				"ilgtyp" 	: oCon.getControl('m101InpLqtyp').getValue(),
			};
		};
	
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){ 
		
		if(fcode=='SAPEVT_M102'){
			
			//oCon.getControl('m001InpLenum').setModel(oModela);
			oCon.getControl('m101InpMatnr').setModel(oModela);
			oCon.getControl('m101InpMaktx').setModel(oModela);
			oCon.getControl('m101InpCharg').setModel(oModela);
			oCon.getControl('m101InpMenge').setModel(oModela);
			oCon.getControl('m101InpMeins').setModel(oModela);
			oCon.getControl('m101InpLgpla1').setModel(oModela);
			oCon.getControl('m101InpTanum').setModel(oModela);
			
			
		}; //

	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){ 
		
		
		if(fcode=='m101InpQrData'){	
			var oModel  = oCon.getQrData(oCon.getControl('m101InpQrData').getValue());
			
			if((oModel.oData.type == 'A') || (oModel.oData.type == 'B')){ //Scan SU			// -- 2018.01.08 :: Don't check sticker type :: Picking - Move Bin V1
				oCTX.oData.lenum = oModel.oData.lenum;
				oCon.getControl('m101InpQrData').setValue();
				oCon.getControl('m101InpLenum').setValue(oModel.oData.lenum);
				
				var su = oCon.getControl('m101InpLenum').getValue();
				if(su!=""){
					oCon.ui5DispatchBackEnd("SAPEVT_M102","evt_m102","{i18n>MSG_PROCESS}"); // Display SU
					oCon.getControl('m101BtnSU').setEnabled(false);
					oCon.getControl('m101BtnBin').setEnabled(true);
				}
			}
			
			if(oModel.oData.type == 'BIN'){ //Scan BIN
				
				if(oCon.getControl('m101InpLenum').getValue() != ""){
				
					//oCTX.oData.lgpla = oModel.oData.lgpla;
					//oCTX.oData.lgtyp = oModel.oData.lgtyp;
					oCon.getControl('m101InpQrData').setValue();
					oCon.getControl('m101InpLgpla2').setValue(oModel.oData.lgpla);
					oCon.getControl('m101InpLqtyp').setValue(oModel.oData.lgtyp);
					
//					var bin = oCon.getControl('m101InpLgpla1').getValue();
//					var newbin = oCon.getControl('m101InpLgpla2').getValue();
				
//					if(bin != newbin){
//						var txt = 'Do you want to save ? Bin: ' + newbin ;
//						oCon.popConfirm(txt,'m101btnSav_ok','m101btnSav_no');
//					}else{
//						oCon.popMsgbox("error!!! same bin");
//					}
				
				}else{
					oCon.popMsgbox("Please scan SU.");
				}
				
			}

		};

		if(fcode=='SAPEVT_M101'){ 
			
			oCon.getFocus('m101InpQrData');
			
			oCon.getControl('m101InpLenum').setValue("");
			oCon.getControl('m101InpMatnr').setValue("");
			oCon.getControl('m101InpMaktx').setValue("");
			oCon.getControl('m101InpCharg').setValue("");
			oCon.getControl('m101InpMenge').setValue("");
			oCon.getControl('m101InpMeins').setValue("");
			oCon.getControl('m101InpLgpla1').setValue("");
			oCon.getControl('m101InpLgpla2').setValue("");
			oCon.getControl('m101InpLqtyp').setValue("");
			//oCon.getControl('m101InpTanum').setValue("");
			
			oCon.getControl('m101BtnSU').setEnabled(true);
			oCon.getControl('m101BtnBin').setEnabled(false);
	
		};
		
		if(fcode=='m101btnSav_ok'){
			//oCon.getControl('m101InpLgpla').setValue(oCTX.oData.lgpla);			
			oCon.ui5DispatchBackEnd("SAPEVT_M103","evt_m103","{i18n>MSG_PROCESS}"); // add new bin to zsu & create TO + confirm TO			
		};
		
		
		if(fcode=='SAPEVT_M103'){ 
			
			if(oModela.oData.logon.typ=='S'){
				oCon.popMsgbox(oModela.oData.logon.msg);
				oCon.getControl('m101BtnSU').setEnabled(true);
				oCon.getControl('m101BtnBin').setEnabled(false);

				oCon.getControl('m101InpLenum').setValue();
				oCon.getControl('m101InpMatnr').setValue();
				oCon.getControl('m101InpMaktx').setValue();
				oCon.getControl('m101InpCharg').setValue();
				oCon.getControl('m101InpMenge').setValue();
				oCon.getControl('m101InpMeins').setValue();
				oCon.getControl('m101InpLgpla1').setValue();
				oCon.getControl('m101InpTanum').setValue();
				oCon.getControl('m101InpLgpla2').setValue();
				
			}
	
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){ 
		
		if(fcode=="SAPEVT_M101")	{app.to('M101','slide');};
		if(fcode=='m101btnBck')		{oCon.nav_home();};
	
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
});