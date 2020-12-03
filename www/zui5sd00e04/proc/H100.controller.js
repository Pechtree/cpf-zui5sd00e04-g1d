sap.ui.controller("zui5sd00e04.proc.H100", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		if(fcode=="h101btnCam")	{
			oCon.scanCam('h101InpQrData','h101InpQrData');
		};
		
		if(fcode=='h101InpQrData'){//Scan Sticker
			var oModel  = oCon.getQrData(oCon.getControl('h101InpQrData').getValue());
			
			oCTX.oData.piknr = oModel.oData.piknr;
			oCTX.oData.pospk = oModel.oData.pospk;
			oCTX.oData.seqpk = oModel.oData.seqpk;
			oCTX.oData.menge = oModel.oData.menge;
			oCTX.oData.meins = oModel.oData.meins;
			oCTX.oData.qrcod = oModel.oData.qrcod;
			oCTX.oData.seta  = oModel.oData.seta;		// ++ 2018.07.09 :: Log 133
			
			if (!oCTX.oData.piknr||oCTX.oData.piknr=="undefined") {	// ++ 2018.08.14 :: Transfer V1.3 :: Log 162 :: check Picking Order No.
				oCon.popMsgbox("Picking Order not found");	return;			
			} 
			
			oCon.getControl('h101InpQrData').setValue();
			oCon.getControl('h101InpPiknr').setValue(oModel.oData.piknr);
			oCon.getControl('h101InpPospk').setValue(oModel.oData.pospk);
			oCon.getControl('h101InpSeqpk').setValue(oModel.oData.seqpk);
			oCon.getControl('h101InpMenge').setValue(oModel.oData.menge);
			oCon.getControl('h101InpMeins').setValue(oModel.oData.meins);
			oCon.getControl('h101InpQrID').setValue(oModel.oData.qrcod);
			oCon.getControl('h101InpSeta').setValue(oModel.oData.seta);			// ++ 2018.07.09 :: Log 133
			oCon.getControl('h101InpFlag').setValue("ADD");
					
			oCon.ui5DispatchBackEnd("SAPEVT_H101","evt_h101","{i18n>MSG_PROCESS}");				
			
			
		};

		if(fcode=='h101btnTest'){// TEST
			oCon.getControl('h101InpFlag').setValue("ADD");
		    oCon.ui5DispatchBackEnd("SAPEVT_H101","evt_h101","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='h101btnDel'){
			oCon.getControl('h101InpFlag').setValue("DEL");
		    oCon.ui5DispatchBackEnd("SAPEVT_H101","evt_h101","{i18n>MSG_PROCESS}");
		};

		if(fcode=='h101btnSav'){
		    oCon.ui5DispatchBackEnd("SAPEVT_H102","evt_h102","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='h101btnBck'){			
			oCon.getControl('h101InpFlag').setValue("CLS");
		    oCon.ui5DispatchBackEnd("SAPEVT_H101","evt_h101","{i18n>MSG_PROCESS}");		    
			oCon.getControl('h101InpPiknr').setValue("");
			oCon.getControl('h101InpPospk').setValue("");
			oCon.getControl('h101InpSeqpk').setValue("");
			oCon.getControl('h101InpMenge').setValue("");
			oCon.getControl('h101InpMeins').setValue("");
			oCon.getControl('h101InpQrID').setValue("");
			oCon.getControl('h101InpSeta').setValue("");		// ++ 2018.07.09 :: Log 133
		};
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_H101"){
			if(oCon.getControl('h101InpFlag').getValue() == "ADD"){
				return oParameters = { 
						"ipiknr" 	: oCon.getControl('h101InpPiknr').getValue(),
						"ipospk" 	: oCon.getControl('h101InpPospk').getValue(),
						"iseqpk" 	: oCon.getControl('h101InpSeqpk').getValue(),
						"imenge" 	: oCon.getControl('h101InpMenge').getValue(),
						"imeins" 	: oCon.getControl('h101InpMeins').getValue(),
						"iqrcod" 	: oCon.getControl('h101InpQrID').getValue(),
						"iflag" 	: oCon.getControl('h101InpFlag').getValue(),
						"iseta" 	: oCon.getControl('h101InpSeta').getValue(),		// ++ 2018.07.09 :: Log 133
				};
			}
			
			if(oCon.getControl('h101InpFlag').getValue() == "DEL"){
				return oParameters = { 
						"ipiknr" 	: oCon.getProperty('h101TblOvw','piknr'),
						"ipospk" 	: oCon.getProperty('h101TblOvw','pospk'),
						"iseqpk" 	: oCon.getProperty('h101TblOvw','seqpk'),
						"iflag" 	: oCon.getControl('h101InpFlag').getValue(),
				};
			}
			
			if(oCon.getControl('h101InpFlag').getValue() == "CLS"){
				return oParameters = { 
						"iflag" 	: oCon.getControl('h101InpFlag').getValue(),
				};
			}		
			
		};
		
		if(fcode=="SAPEVT_H102"){
			return oParameters = { 
//				"ipiknr" 	: oCon.getControl('h101InpPiknr').getValue(),
//				"ipospk" 	: oCon.getControl('h101InpPospk').getValue(),
			};
		};

	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if((fcode=='SAPEVT_H101')){ //
			oCon.getControl('h101TblOvw').setModel(oModela);
		};
		
		if((fcode=='SAPEVT_H102')){ //
			oCon.getControl('h101TblOvw').setModel(oModela);
		};

		
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		if((fcode=='SAPEVT_H101')){ //
			oCon.getFocus('h101InpQrData');
		};
		
		if(fcode=="SAPEVT_H102"){ //			
			if(oModela.oData.logon.typ =="S"){
				var sMsg = oModela.oData.logon.msg;
				oCon.popMsgbox(sMsg);
			}			
		};
		

	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="SAPEVT_H101")	{			
			if(oCon.getControl('h101InpFlag').getValue() == "CLS"){
				oCon.getControl('h101InpFlag').setValue("");
			}else{
				app.to('H101','slide');
			}		
		};		

		if(fcode=='h101btnBck')		{oCon.nav_home();}; 
//		if(fcode=='h002btnBck')		{app.to('H001','slide');};

		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		

	},
});