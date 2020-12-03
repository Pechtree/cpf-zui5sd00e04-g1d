sap.ui.controller("zui5sd00e04.proc.H000", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- H001
		if(fcode=='h001lstType'){
			oCon.ui5DispatchBackEnd("SAPEVT_H005","evt_h005","{i18n>MSG_PROCESS}");	
		};
		
		//----------------------------------------------------------- H003		
		if(fcode=='h003TblIng_del'){//Delete Item
			oCon.popConfirm('Do you want to delete?','h003TblIng_delok','h003TblIng_delno');
		};
		
		if(fcode=='h003TblIng_delok'){ //Delete Item - OK
			oCon.ui5DispatchBackEnd("SAPEVT_H003","evt_h003","{i18n>MSG_PROCESS}");	
		};
		
		if(fcode=='h003btnSav'){ //Post Transfer  
			oCon.popConfirm('Do you want to save?','h003btnSav_ok','h003btnSav_no')
		};
		
		if(fcode=='h003btnSav_ok'){ //Post Transfer - OK
			oCon.ui5DispatchBackEnd("SAPEVT_H004","evt_h004","{i18n>MSG_PROCESS}");	
		};
		
		if(fcode=='h003inpQr'){//QR Scan
			var oModel = oCon.getQrData(oCon.getControl('h003inpQr').getValue());
			oCon.getControl('h003inpQr').setValue();
			
			oCon.getControl('h003InpMatnr').setValue(oModel.oData.matnr);
			oCon.getControl('h003InpCharg').setValue(oModel.oData.charg);
			oCon.getControl('h003InpMenge').setValue(oModel.oData.menge);
			oCon.getControl('h003InpMeins').setValue(oModel.oData.meins);
			oCon.getControl('h003InpQrcod').setValue(oModel.oData.qrcod);
			oCon.getControl('h003InpSeta').setValue(oModel.oData.seta);
			oCon.ui5DispatchBackEnd("SAPEVT_H002","evt_h002","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='h003btnCam'){
			oCon.scanCam('h003inpQr','h003inpQr');
		};

		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=='SAPEVT_H002'){ //Insert Transfer Item
			return oParameters = { 
				"imatnr"  		: oCon.getControl('h003InpMatnr').getValue(),
				"icharg"  		: oCon.getControl('h003InpCharg').getValue(),
				"imenge" 		: oCon.getControl('h003InpMenge').getValue(),
				"imeins"  		: oCon.getControl('h003InpMeins').getValue(),
				"iqrcod"  		: oCon.getControl('h003InpQrcod').getValue(),
				"iseta"  		: oCon.getControl('h003InpSeta').getValue(),
			};
		};
		
		if(fcode=='SAPEVT_H003'){ //Delete Transfer Item
			return oParameters = { 
				"ipostr"  		: oCon.getProperty('h003TblIng','postr'),
			};
		};
		
		if(fcode=='SAPEVT_H004'){ //Save Transfer
			return oParameters = { 
				"ibwart"  		: oCon.getControl('h001lstType').getSelectedItem().getInfo(),
				"ilgortt" 		: oCon.getControl('h002lstLgort').getSelectedItem().getInfo(),
			};
		};
		
		if(fcode=='SAPEVT_H005'){ //Delete Transfer Item
			return oParameters = { 
				"ibwart"  		: oCon.getControl('h001lstType').getSelectedItem().getInfo(),
			};
		};
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if((fcode=='SAPEVT_H001')){ //Dummy
			//oCon.getControl('h002lstLgort').setModel(oModela);
		};
		
		if((fcode=='SAPEVT_H002')&&(oModela.oData.logon.typ=='S')){ //Insert Transfer Item
			oCon.getControl('h003TblIng').setModel(oModela);
			oCon.getControl('h003inpQr').setValue();
			oCon.getControl('h003InpMatnr').setValue();
			oCon.getControl('h003InpCharg').setValue();
			oCon.getControl('h003InpMenge').setValue();
			oCon.getControl('h003InpMeins').setValue();
			oCon.getControl('h003InpQrcod').setValue();
		};
		
		if((fcode=='SAPEVT_H003')&&(oModela.oData.logon.typ=='S')){ //Delete Transfer Item
			oCon.getControl('h003TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_H004'){ //Save Transfer
			if(oModela.oData.logon.typ=='S'){
				oCon.popMsgbox(oModela.oData.logon.msg);
				oCon.getControl('h003TblIng').setModel(oModela);
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};
		
		if((fcode=='SAPEVT_H005')){ //List Storage
			oCon.getControl('h002lstLgort').setModel(oModela);
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		if((fcode=='h002lstLgort')||(fcode=='SAPEVT_H002')){ //Start Scan Container
			oCon.getFocus('h003inpQr');
		};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="SAPEVT_H001")    {app.to('H001','slide');};
		if(fcode=="SAPEVT_H005")	{app.to('H002','slide');};
		if(fcode=="h002lstLgort")	{app.to('H003','slide');};
		
		
		if(fcode=='h001btnBck')		{oCon.nav_home();};
		if(fcode=='h002btnBck')		{app.to('H001','slide');};
		if(fcode=='h003btnBck')		{app.to('H002','slide');};
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		

	},
});