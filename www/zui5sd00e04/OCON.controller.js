sap.ui.controller("zui5sd00e04.OCON", {
	
	//--------------------------------------------------------------------------------
	//																	Config
	//--------------------------------------------------------------------------------
	getCTX: function(){
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({
			debug		: '',
			bth_on		: '',
			homemenu	: 'A001',
			qr_data		: '',
			qr_copy		: 1,
			wei_data	: '',
			wei_rcv		: '',
			wei_tare	: '',
			//host		: 'http://cpfdv6.cpf.co.th:8000',
			//client		: '220',
			//host		: 'http://cpfrpt06.cpf.co.th:8002',
			//client		: '888',
//			host		: 'http://cpfsapgw.cpf.co.th:8000',
//			client		: '444',
			host		: 'http://sapwebe1.cpf.co.th:8011',
			client		: '',
			cancel_nav 	: false,
			oEvt		: null,
			rendered 	: false,
			viewp		: '',
			viewc		: '',
			typ			: "",	//User for sure
			timer		: 0,
			ui5id		: "",   //Print sticker : Dynamic UI access
			menges		: "",	//Print sticker : Quantity in Sticker
			mengeq		: '',   //Print sticker : No of Sticker
			qrcod 		: "",   //Pick
			menge_wkg	: "", 	//Weight to prevent unstable qty b/w Wei & Sticker
			tfrnr		: "",	//Weight
			postr		: "",	//Weight
			etenr		: "",   //Weight
			aufnr		: "",	//Weight
			matnr		: "",	//Backflush Screen/Sticker
			charg		: "",	//Backflush Screen/Stcker
		    pmxnr   	: "",	//Backflush Screen
		    pospx   	: "",	//Backflush Screen
		    sets		: "",	//Obsolete !!!
		    seta		: "",	//Backflush screen
		    menge		: "",   //Backflush screen
		    meins		: "",   //Backflush screen
		    menge_rst	: "",	//Backflush screen (Set to backflush -- not use yet)
		    menge_ost	: "",	//Investigate !!!
		    matnr_in    : "",   //Investigate !!!
		    posnr		: "",	//Delete Transfer Screen
		    uuid		: "",	//Device UUID
		    urlid		: "",	//Device URI
		    uname		: "",	//SAP Virtual User
		    session		: "",	//SAP Session
		    rfcdest	   	: "",	//SAP Transaction Server
		    hybrid		: "",   //Determine running in android ??
		    hybridbool  : false, 

		    piknr		: "", 	// Picking Order		++ 2018.09.18
		    pospk		: "", 	// Picking Item			++ 2018.09.18
		    seqnr		: "", 	// Sequence No.			++ 2018.09.18
		    weinr		: "", 	// Weight No.			++ 2018.09.18	
		    sptxt		: "", 	// Allergens			++ 2018.09.18	
		    cnfnr		: "", 	// ConfirmNo			++ 2018.11.06			    
		    
		});
		return oModel;
	},	
	//--------------------------------------------------------------------------------
	//getModelURL
	//--------------------------------------------------------------------------------
	getModelURL: function(action){
	
		//RPT
//		if(oCTX.oData.host=='http://cpfsapgw.cpf.co.th:8000'){
//			//return  oCTX.oData.host + "/zui5?sap-language=TH&sap-client=448" +
//			return  oCTX.oData.host + "/zui5?sap-language=TH&sap-client=448&sap-user=chaivsut&sap-password=voot%40123" +
//		    	"&prot-version=2" 						+ 
//	          	"&application=mobi08" 					+
//	       		"&uname=" 		+ oCTX.oData.uname 		+
//	       		"&uuid=" 		+ oCTX.oData.uuid 		+
//	       		"&session=" 	+ oCTX.oData.session 	+
//	       		"&rfc=" 		+ oCTX.oData.rfcdest 	+
//	       		"&action=" 		+ action;				
//		};
		
		
		if(oCTX.oData.hybrid=='X'){
			return  oCTX.oData.host + "/zui5?sap-language=TH" +
			//return  oCTX.oData.host + "/zui5?sap-language=TH&sap-user=chaivsut&sap-password=voot%40123" +
			    "&prot-version=2" 						+
		        "&application=mobi08" 					+
		       	"&uname=" 		+ oCTX.oData.uname 		+
		       	"&uuid=" 		+ oCTX.oData.uuid 		+
		       	"&session=" 	+ oCTX.oData.session 	+
		       	"&rfc=" 		+ oCTX.oData.rfcdest 	+
		       	"&action=" 		+ action;
		}else{
			return  "/zui5?sap-language=TH" 			+
		    	"&prot-version=2" 						+ 
		    	"&application=mobi08" 					+
				"&uname=" 		+ oCTX.oData.uname 		+
				"&uuid=" 		+ oCTX.oData.uuid 		+
				"&session=" 	+ oCTX.oData.session 	+
				"&rfc=" 		+ oCTX.oData.rfcdest 	+
				"&action=" 	+ action;
		};
	},
	//--------------------------------------------------------------------------------
	//																	DEVICE-EVENT
	//--------------------------------------------------------------------------------
	
	//onDeviceReady
	//--------------------------------------------------------------------------------
	onDeviceReady: function(){
		
		//Global flag, UI5 run in hybrid application
		oCTX.oData.hybrid = 'X';
		oCTX.oData.hybridbool = true;
		
		window.plugins.uniqueDeviceID.get(
			function(uuid){oCon.getControl('a002InpUUID').setValue(uuid);},
			function(){oCon.popMsgbox("Cannot read device UUID");}
		);
		
		bluetoothSerial.isEnabled(
			function(){oCTX.oData.bth_on = 'X';},
			function(){oCTX.oData.bth_on = '';}
		);
		
		oWeight.dispatch('INI');

	},
	
	
	//--------------------------------------------------------------------------------
	//																	UI5-DISPATCH
	//--------------------------------------------------------------------------------
	
	//ui5DispatchBackEnd
	//--------------------------------------------------------------------------------
	ui5DispatchBackEnd: function(fcode,iAction,sBusy){
		
		var oModela = new sap.ui.model.json.JSONModel();
		var oDialog = oCon.getBusyDialog(sBusy);
		var oParam  = oCon.ui5DispatchParam(fcode);
		oModela.setSizeLimit(1000);
		
		//Register Handler
		oModela.attachRequestSent(function(){oDialog.open();});
		oModela.attachRequestCompleted(function(){
			oDialog.close();
			oCon.popMsgErrSuc(oModela,"E");
			oCon.ui5DispatchFcode(fcode,oModela);
		});
		oModela.attachRequestFailed(function(){
			oDialog.close();
			oCon.popMsgbox("Coummunication to SAP fail !!!");
		});
		oModela.attachParseError(function(){
			oDialog.close();
			oCon.popMsgbox("Coummunication to SAP fail !!!");
		});
		
		//Call Back-end
//		oModela.loadData(oCon.getModelURL(iAction),oParam);
		oModela.loadData(oCon.getModelURL(iAction),oParam,true,"POST");
		
	},
	
	//ui5Dispatch				(======> #0)
	//--------------------------------------------------------------------------------
	ui5Dispatch: function(oEvt){
		
		var vPar 	= '';
		
		oCTX.oData.oEvt = oEvt;
		try{
			vPar = oEvt.getSource().getParent().sId;
			//Page was clicked
			if((vPar=="v003page")||(vPar=="v005page")){
				vPar = oEvt.getSource().sId;
			}
		}catch(err){
		};
		
		if(vPar=="dummy"){
			oCon.ui5DispatchFcode(vPar);
		}else{
			oCon.ui5DispatchFcode(oEvt.getSource().sId);
		};
		
	},
	
	//ui5DispatchFcode      	(======> #1)
	//--------------------------------------------------------------------------------
	ui5DispatchFcode: function(fcode,oModela){
		
		oCTX.oData.cancel_nav = false;
		
		sap.ui.controller('zui5sd00e04.proc.A000').M01_FCD(fcode,oModela); 
		sap.ui.controller('zui5sd00e04.proc.B000').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.B100').M01_FCD(fcode,oModela); 
		sap.ui.controller('zui5sd00e04.proc.C100').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.C200').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.C300').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D100').M01_FCD(fcode,oModela);
//		sap.ui.controller('zui5sd00e04.proc.D200').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D210').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D300').M01_FCD(fcode,oModela);
//		sap.ui.controller('zui5sd00e04.proc.D400').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D410').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D500').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D600').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D700').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D800').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E100').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E200').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E300').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E400').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E500').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E600').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E700').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E800').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F000').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F100').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F300').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F400').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.G000').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.H000').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.H100').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.K000').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.K100').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.K200').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.I000').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.I100').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.I200').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.I300').M01_FCD(fcode,oModela);													// ++ 2018.11.12 :: Input confirm - Cooking V1.0.0
		sap.ui.controller('zui5sd00e04.proc.I400').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.L000').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.L100').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.M000').M01_FCD(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.M100').M01_FCD(fcode,oModela);
		
		//Model Set 
		//------------------------------------
		oCon.ui5DispatchModelSet(fcode,oModela);
		oCon.ui5DispatchUI(fcode,oModela);
		oCon.ui5DispatchNav(fcode,oModela);
		oCon.ui5DispatchNex(fcode,oModela);
		
	},
	
	//ui5DispatchParam       	(======> #2)
	//--------------------------------------------------------------------------------
	ui5DispatchParam: function(fcode){
		
		//Login
		if(fcode=="SAPEVT_A101"){return sap.ui.controller('zui5sd00e04.proc.A000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_A103"){return sap.ui.controller('zui5sd00e04.proc.A000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_A105"){return sap.ui.controller('zui5sd00e04.proc.A000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_A106"){return sap.ui.controller('zui5sd00e04.proc.A000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_A107"){return sap.ui.controller('zui5sd00e04.proc.A000').M02_PAR(fcode);};
		
		//GR
		if(fcode=="SAPEVT_B001"){return sap.ui.controller('zui5sd00e04.proc.B000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B002"){return sap.ui.controller('zui5sd00e04.proc.B000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B003"){return sap.ui.controller('zui5sd00e04.proc.B000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B004"){return sap.ui.controller('zui5sd00e04.proc.B000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B005"){return sap.ui.controller('zui5sd00e04.proc.B000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B101"){return sap.ui.controller('zui5sd00e04.proc.B100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B102"){return sap.ui.controller('zui5sd00e04.proc.B100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B103"){return sap.ui.controller('zui5sd00e04.proc.B100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B104"){return sap.ui.controller('zui5sd00e04.proc.B100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B105"){return sap.ui.controller('zui5sd00e04.proc.B100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B106"){return sap.ui.controller('zui5sd00e04.proc.B100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B201"){return sap.ui.controller('zui5sd00e04.proc.B000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B202"){return sap.ui.controller('zui5sd00e04.proc.B000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B203"){return sap.ui.controller('zui5sd00e04.proc.B000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B204"){return sap.ui.controller('zui5sd00e04.proc.B000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B205"){return sap.ui.controller('zui5sd00e04.proc.B000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_B206"){return sap.ui.controller('zui5sd00e04.proc.B000').M02_PAR(fcode);};
		
		//PREMIX Order
		if(fcode=="SAPEVT_C101"){return sap.ui.controller('zui5sd00e04.proc.C100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_C102"){return sap.ui.controller('zui5sd00e04.proc.C100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_C103"){return sap.ui.controller('zui5sd00e04.proc.C100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_C104"){return sap.ui.controller('zui5sd00e04.proc.C100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_C105"){return sap.ui.controller('zui5sd00e04.proc.C100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_C106"){return sap.ui.controller('zui5sd00e04.proc.C100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_C107"){return sap.ui.controller('zui5sd00e04.proc.C100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_C108"){return sap.ui.controller('zui5sd00e04.proc.C100').M02_PAR(fcode);};
		
		if(fcode=="SAPEVT_C201"){return sap.ui.controller('zui5sd00e04.proc.C200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_C202"){return sap.ui.controller('zui5sd00e04.proc.C200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_C203"){return sap.ui.controller('zui5sd00e04.proc.C200').M02_PAR(fcode);};
		
		if(fcode=="SAPEVT_C301"){return sap.ui.controller('zui5sd00e04.proc.C300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_C302"){return sap.ui.controller('zui5sd00e04.proc.C300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_C303"){return sap.ui.controller('zui5sd00e04.proc.C300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_C304"){return sap.ui.controller('zui5sd00e04.proc.C300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_C305"){return sap.ui.controller('zui5sd00e04.proc.C300').M02_PAR(fcode);};
		
		//Transfer Order
		if(fcode=="SAPEVT_D105"){return sap.ui.controller('zui5sd00e04.proc.D100').M02_PAR(fcode);};
		
//		if(fcode=="SAPEVT_D201"){return sap.ui.controller('zui5sd00e04.proc.D200').M02_PAR(fcode);};
//		if(fcode=="SAPEVT_D202"){return sap.ui.controller('zui5sd00e04.proc.D200').M02_PAR(fcode);};
//		if(fcode=="SAPEVT_D203"){return sap.ui.controller('zui5sd00e04.proc.D200').M02_PAR(fcode);};
//		if(fcode=="SAPEVT_D205"){return sap.ui.controller('zui5sd00e04.proc.D200').M02_PAR(fcode);};
//		if(fcode=="SAPEVT_D206"){return sap.ui.controller('zui5sd00e04.proc.D200').M02_PAR(fcode);};
		
		if(fcode=="SAPEVT_D211"){return sap.ui.controller('zui5sd00e04.proc.D210').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D212"){return sap.ui.controller('zui5sd00e04.proc.D210').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D213"){return sap.ui.controller('zui5sd00e04.proc.D210').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D214"){return sap.ui.controller('zui5sd00e04.proc.D210').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D215"){return sap.ui.controller('zui5sd00e04.proc.D210').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D216"){return sap.ui.controller('zui5sd00e04.proc.D210').M02_PAR(fcode);};
		
		if(fcode=="SAPEVT_D301"){return sap.ui.controller('zui5sd00e04.proc.D300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D302"){return sap.ui.controller('zui5sd00e04.proc.D300').M02_PAR(fcode);};
		
//		if(fcode=="SAPEVT_D401"){return sap.ui.controller('zui5sd00e04.proc.D400').M02_PAR(fcode);};
//		if(fcode=="SAPEVT_D402"){return sap.ui.controller('zui5sd00e04.proc.D400').M02_PAR(fcode);};
//		if(fcode=="SAPEVT_D403"){return sap.ui.controller('zui5sd00e04.proc.D400').M02_PAR(fcode);};
//		if(fcode=="SAPEVT_D404"){return sap.ui.controller('zui5sd00e04.proc.D400').M02_PAR(fcode);};
//		if(fcode=="SAPEVT_D405"){return sap.ui.controller('zui5sd00e04.proc.D400').M02_PAR(fcode);};
//		if(fcode=="SAPEVT_D406"){return sap.ui.controller('zui5sd00e04.proc.D400').M02_PAR(fcode);};
//		if(fcode=="SAPEVT_D407"){return sap.ui.controller('zui5sd00e04.proc.D400').M02_PAR(fcode);};
//		if(fcode=="SAPEVT_D408"){return sap.ui.controller('zui5sd00e04.proc.D400').M02_PAR(fcode);};
//		if(fcode=="SAPEVT_D409"){return sap.ui.controller('zui5sd00e04.proc.D400').M02_PAR(fcode);};

		if(fcode=="SAPEVT_D411"){return sap.ui.controller('zui5sd00e04.proc.D410').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D412"){return sap.ui.controller('zui5sd00e04.proc.D410').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D413"){return sap.ui.controller('zui5sd00e04.proc.D410').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D414"){return sap.ui.controller('zui5sd00e04.proc.D410').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D415"){return sap.ui.controller('zui5sd00e04.proc.D410').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D416"){return sap.ui.controller('zui5sd00e04.proc.D410').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D417"){return sap.ui.controller('zui5sd00e04.proc.D410').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D418"){return sap.ui.controller('zui5sd00e04.proc.D410').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D419"){return sap.ui.controller('zui5sd00e04.proc.D410').M02_PAR(fcode);};
		
		if(fcode=="SAPEVT_D501"){return sap.ui.controller('zui5sd00e04.proc.D500').M02_PAR(fcode);};
		if(fcode=="SAPEVT_D502"){return sap.ui.controller('zui5sd00e04.proc.D500').M02_PAR(fcode);}; 
		if(fcode=="SAPEVT_D503"){return sap.ui.controller('zui5sd00e04.proc.D500').M02_PAR(fcode);}; 
		if(fcode=="SAPEVT_D504"){return sap.ui.controller('zui5sd00e04.proc.D500').M02_PAR(fcode);}; 
		if(fcode=="SAPEVT_D601"){return sap.ui.controller('zui5sd00e04.proc.D600').M02_PAR(fcode);}; 
		if(fcode=="SAPEVT_D602"){return sap.ui.controller('zui5sd00e04.proc.D600').M02_PAR(fcode);};   
		if(fcode=="SAPEVT_D701"){return sap.ui.controller('zui5sd00e04.proc.D700').M02_PAR(fcode);};  
		if(fcode=="SAPEVT_D702"){return sap.ui.controller('zui5sd00e04.proc.D700').M02_PAR(fcode);};  
		if(fcode=="SAPEVT_D703"){return sap.ui.controller('zui5sd00e04.proc.D700').M02_PAR(fcode);};  
		if(fcode=="SAPEVT_D704"){return sap.ui.controller('zui5sd00e04.proc.D700').M02_PAR(fcode);};  
		if(fcode=="SAPEVT_D705"){return sap.ui.controller('zui5sd00e04.proc.D700').M02_PAR(fcode);};  
		if(fcode=="SAPEVT_D801"){return sap.ui.controller('zui5sd00e04.proc.D800').M02_PAR(fcode);};  
		
		//Picking 	
		if(fcode=="SAPEVT_E101"){return sap.ui.controller('zui5sd00e04.proc.E100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E102"){return sap.ui.controller('zui5sd00e04.proc.E100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E103"){return sap.ui.controller('zui5sd00e04.proc.E100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E104"){return sap.ui.controller('zui5sd00e04.proc.E100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E105"){return sap.ui.controller('zui5sd00e04.proc.E100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E106"){return sap.ui.controller('zui5sd00e04.proc.E100').M02_PAR(fcode);};
		
		if(fcode=="SAPEVT_E201"){return sap.ui.controller('zui5sd00e04.proc.E200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E202"){return sap.ui.controller('zui5sd00e04.proc.E200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E203"){return sap.ui.controller('zui5sd00e04.proc.E200').M02_PAR(fcode);};
		
		if(fcode=="SAPEVT_E301"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E302"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E303"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E304"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E305"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E306"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E307"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E308"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E309"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E311"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};// ++ 07.11.2017
		if(fcode=="SAPEVT_E312"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};// ++ 07.11.2017
		if(fcode=="SAPEVT_E313"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};// ++ 07.11.2017
		if(fcode=="SAPEVT_E314"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};// ++ 07.11.2017
		if(fcode=="SAPEVT_E315"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};// ++ 07.11.2017
		if(fcode=="SAPEVT_E316"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};// ++ 07.11.2017
		if(fcode=="SAPEVT_E317"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};// ++ 07.11.2017
		if(fcode=="SAPEVT_E318"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};// ++ 07.11.2017
		if(fcode=="SAPEVT_E319"){return sap.ui.controller('zui5sd00e04.proc.E300').M02_PAR(fcode);};// ++ 07.11.2017
		
		if(fcode=="SAPEVT_E401"){return sap.ui.controller('zui5sd00e04.proc.E400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E402"){return sap.ui.controller('zui5sd00e04.proc.E400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E403"){return sap.ui.controller('zui5sd00e04.proc.E400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E404"){return sap.ui.controller('zui5sd00e04.proc.E400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E405"){return sap.ui.controller('zui5sd00e04.proc.E400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E406"){return sap.ui.controller('zui5sd00e04.proc.E400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E407"){return sap.ui.controller('zui5sd00e04.proc.E400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E408"){return sap.ui.controller('zui5sd00e04.proc.E400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E409"){return sap.ui.controller('zui5sd00e04.proc.E400').M02_PAR(fcode);};// Picking Dummy V1.3
		
		if(fcode=="SAPEVT_E501"){return sap.ui.controller('zui5sd00e04.proc.E500').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E502"){return sap.ui.controller('zui5sd00e04.proc.E500').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E503"){return sap.ui.controller('zui5sd00e04.proc.E500').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E504"){return sap.ui.controller('zui5sd00e04.proc.E500').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E505"){return sap.ui.controller('zui5sd00e04.proc.E500').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E506"){return sap.ui.controller('zui5sd00e04.proc.E500').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E507"){return sap.ui.controller('zui5sd00e04.proc.E500').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E508"){return sap.ui.controller('zui5sd00e04.proc.E500').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E509"){return sap.ui.controller('zui5sd00e04.proc.E500').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E510"){return sap.ui.controller('zui5sd00e04.proc.E500').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E511"){return sap.ui.controller('zui5sd00e04.proc.E500').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E512"){return sap.ui.controller('zui5sd00e04.proc.E500').M02_PAR(fcode);};

		
		if(fcode=="SAPEVT_E601"){return sap.ui.controller('zui5sd00e04.proc.E600').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E602"){return sap.ui.controller('zui5sd00e04.proc.E600').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E603"){return sap.ui.controller('zui5sd00e04.proc.E600').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E604"){return sap.ui.controller('zui5sd00e04.proc.E600').M02_PAR(fcode);};
		
		if(fcode=="SAPEVT_E701"){return sap.ui.controller('zui5sd00e04.proc.E700').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E702"){return sap.ui.controller('zui5sd00e04.proc.E700').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E703"){return sap.ui.controller('zui5sd00e04.proc.E700').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E704"){return sap.ui.controller('zui5sd00e04.proc.E700').M02_PAR(fcode);};
		
		if(fcode=="SAPEVT_E801"){return sap.ui.controller('zui5sd00e04.proc.E800').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E802"){return sap.ui.controller('zui5sd00e04.proc.E800').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E803"){return sap.ui.controller('zui5sd00e04.proc.E800').M02_PAR(fcode);}; 
		if(fcode=="SAPEVT_E808"){return sap.ui.controller('zui5sd00e04.proc.E800').M02_PAR(fcode);};
		if(fcode=="SAPEVT_E809"){return sap.ui.controller('zui5sd00e04.proc.E800').M02_PAR(fcode);}; 
		
		//Premix Weight
		if(fcode=="SAPEVT_F001"){return sap.ui.controller('zui5sd00e04.proc.F000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F002"){return sap.ui.controller('zui5sd00e04.proc.F000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F003"){return sap.ui.controller('zui5sd00e04.proc.F000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F004"){return sap.ui.controller('zui5sd00e04.proc.F000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F005"){return sap.ui.controller('zui5sd00e04.proc.F000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F006"){return sap.ui.controller('zui5sd00e04.proc.F000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F007"){return sap.ui.controller('zui5sd00e04.proc.F000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F008"){return sap.ui.controller('zui5sd00e04.proc.F000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F009"){return sap.ui.controller('zui5sd00e04.proc.F000').M02_PAR(fcode);};
		
		if(fcode=="SAPEVT_F101"){return sap.ui.controller('zui5sd00e04.proc.F100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F102"){return sap.ui.controller('zui5sd00e04.proc.F100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F104"){return sap.ui.controller('zui5sd00e04.proc.F100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F105"){return sap.ui.controller('zui5sd00e04.proc.F100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F106"){return sap.ui.controller('zui5sd00e04.proc.F100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F107"){return sap.ui.controller('zui5sd00e04.proc.F100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F108"){return sap.ui.controller('zui5sd00e04.proc.F100').M02_PAR(fcode);};// ++ 2020.03.31 - F1 V2.0.0
		
		if(fcode=="SAPEVT_F301"){return sap.ui.controller('zui5sd00e04.proc.F300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F302"){return sap.ui.controller('zui5sd00e04.proc.F300').M02_PAR(fcode);};
		
		if(fcode=="SAPEVT_F401"){return sap.ui.controller('zui5sd00e04.proc.F400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F402"){return sap.ui.controller('zui5sd00e04.proc.F400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F403"){return sap.ui.controller('zui5sd00e04.proc.F400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F404"){return sap.ui.controller('zui5sd00e04.proc.F400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F405"){return sap.ui.controller('zui5sd00e04.proc.F400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F406"){return sap.ui.controller('zui5sd00e04.proc.F400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_F407"){return sap.ui.controller('zui5sd00e04.proc.F400').M02_PAR(fcode);};// ++ 2019.12.04 - F4 V3.0.0
		
		//Backflush
		if(fcode=="SAPEVT_G001"){return sap.ui.controller('zui5sd00e04.proc.G000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_G002"){return sap.ui.controller('zui5sd00e04.proc.G000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_G003"){return sap.ui.controller('zui5sd00e04.proc.G000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_G004"){return sap.ui.controller('zui5sd00e04.proc.G000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_G005"){return sap.ui.controller('zui5sd00e04.proc.G000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_G006"){return sap.ui.controller('zui5sd00e04.proc.G000').M02_PAR(fcode);};
		
		//Premix/Ingredient Transfer to Production
		if(fcode=="SAPEVT_H002"){return sap.ui.controller('zui5sd00e04.proc.H000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_H003"){return sap.ui.controller('zui5sd00e04.proc.H000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_H004"){return sap.ui.controller('zui5sd00e04.proc.H000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_H005"){return sap.ui.controller('zui5sd00e04.proc.H000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_H101"){return sap.ui.controller('zui5sd00e04.proc.H100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_H102"){return sap.ui.controller('zui5sd00e04.proc.H100').M02_PAR(fcode);};
		
		//Print Sticker
		if(fcode=="SAPEVT_K002"){return sap.ui.controller('zui5sd00e04.proc.K000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K003"){return sap.ui.controller('zui5sd00e04.proc.K000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K004"){return sap.ui.controller('zui5sd00e04.proc.K000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K005"){return sap.ui.controller('zui5sd00e04.proc.K000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K006"){return sap.ui.controller('zui5sd00e04.proc.K000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K007"){return sap.ui.controller('zui5sd00e04.proc.K000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K008"){return sap.ui.controller('zui5sd00e04.proc.K000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K009"){return sap.ui.controller('zui5sd00e04.proc.K000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K010"){return sap.ui.controller('zui5sd00e04.proc.K000').M02_PAR(fcode);}; 
		
		if(fcode=="SAPEVT_K101"){return sap.ui.controller('zui5sd00e04.proc.K100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K102"){return sap.ui.controller('zui5sd00e04.proc.K100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K103"){return sap.ui.controller('zui5sd00e04.proc.K100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K104"){return sap.ui.controller('zui5sd00e04.proc.K100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K105"){return sap.ui.controller('zui5sd00e04.proc.K100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K106"){return sap.ui.controller('zui5sd00e04.proc.K100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K107"){return sap.ui.controller('zui5sd00e04.proc.K100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_K108"){return sap.ui.controller('zui5sd00e04.proc.K100').M02_PAR(fcode);};
		
		if(fcode=="SAPEVT_K201"){return sap.ui.controller('zui5sd00e04.proc.K200').M02_PAR(fcode);};// ++ 2018.06.25
		
		
		// Preparing Confirmation - Confirm-in
		if(fcode=="SAPEVT_I001"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I002"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I003"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I004"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I005"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I006"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I007"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I008"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I009"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I010"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I011"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I012"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I013"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I003_1"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};						// ++ 2018.07.31 :: Selection Confirm
		if(fcode=="SAPEVT_I003_2"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};						// ++ 2018.07.31 :: Selection Confirm
		if(fcode=="SAPEVT_I014"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};						// ++ 2018.11.05 :: Input confirm - Preparing V1.0.0 :: List remaining set 
		if(fcode=="SAPEVT_I015"){return sap.ui.controller('zui5sd00e04.proc.I000').M02_PAR(fcode);};						// ++ 2018.11.05 :: Input confirm - Preparing V1.0.0 :: List actual scan 
		
		// Preparing Confirmation - Confirm-out
		if(fcode=="SAPEVT_I101"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I102"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I103"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I104"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I105"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I106"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I107"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I108"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I109"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I110"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I111"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I112"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I113"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I114"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I115"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I116"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I117"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I118"){return sap.ui.controller('zui5sd00e04.proc.I100').M02_PAR(fcode);};
		
		// Confirmation Overview
		if(fcode=="SAPEVT_I201"){return sap.ui.controller('zui5sd00e04.proc.I200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I202"){return sap.ui.controller('zui5sd00e04.proc.I200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I203"){return sap.ui.controller('zui5sd00e04.proc.I200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I204"){return sap.ui.controller('zui5sd00e04.proc.I200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I205"){return sap.ui.controller('zui5sd00e04.proc.I200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I206"){return sap.ui.controller('zui5sd00e04.proc.I200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I207"){return sap.ui.controller('zui5sd00e04.proc.I200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I208"){return sap.ui.controller('zui5sd00e04.proc.I200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I209"){return sap.ui.controller('zui5sd00e04.proc.I200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I210"){return sap.ui.controller('zui5sd00e04.proc.I200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I211"){return sap.ui.controller('zui5sd00e04.proc.I200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I212"){return sap.ui.controller('zui5sd00e04.proc.I200').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I213"){return sap.ui.controller('zui5sd00e04.proc.I200').M02_PAR(fcode);};						// ++ 2018.11.28 :: Confirmation Overview V1.3.0
		
		// Cooking Confirmation - Confirm-in																				// ++ 2018.11.12 :: Input confirm - COOK V1.0.0 
		if(fcode=="SAPEVT_I301"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I302"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I303"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I304"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I305"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I306"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I307"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I308"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I309"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I310"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I311"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I312"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I313"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I314"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I315"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I316"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I317"){return sap.ui.controller('zui5sd00e04.proc.I300').M02_PAR(fcode);};
		
		// Cooking Confirmation - Confirm-out
		if(fcode=="SAPEVT_I403"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I404"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I405"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I406"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I407"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I408"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I409"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I410"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I411"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I412"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I413"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I414"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I415"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I416"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I417"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		if(fcode=="SAPEVT_I418"){return sap.ui.controller('zui5sd00e04.proc.I400').M02_PAR(fcode);};
		
		if(fcode=="SAPEVT_L001"){return sap.ui.controller('zui5sd00e04.proc.L000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_L002"){return sap.ui.controller('zui5sd00e04.proc.L000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_L003"){return sap.ui.controller('zui5sd00e04.proc.L000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_L004"){return sap.ui.controller('zui5sd00e04.proc.L000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_L005"){return sap.ui.controller('zui5sd00e04.proc.L000').M02_PAR(fcode);};						// ++ 2018.02.01 :: GR to FG Warehouse V1.6
		
		if(fcode=="SAPEVT_L101"){return sap.ui.controller('zui5sd00e04.proc.L100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_L102"){return sap.ui.controller('zui5sd00e04.proc.L100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_L103"){return sap.ui.controller('zui5sd00e04.proc.L100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_L104"){return sap.ui.controller('zui5sd00e04.proc.L100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_L105"){return sap.ui.controller('zui5sd00e04.proc.L100').M02_PAR(fcode);};
		
		//Putaway & Movebin
		if(fcode=="SAPEVT_M001"){return sap.ui.controller('zui5sd00e04.proc.M000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_M002"){return sap.ui.controller('zui5sd00e04.proc.M000').M02_PAR(fcode);};
		if(fcode=="SAPEVT_M003"){return sap.ui.controller('zui5sd00e04.proc.M000').M02_PAR(fcode);};
		
		if(fcode=="SAPEVT_M101"){return sap.ui.controller('zui5sd00e04.proc.M100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_M102"){return sap.ui.controller('zui5sd00e04.proc.M100').M02_PAR(fcode);};
		if(fcode=="SAPEVT_M103"){return sap.ui.controller('zui5sd00e04.proc.M100').M02_PAR(fcode);};
		
		
	},
	
	//ui5DispatchModelSet    	(======> #3)
	//--------------------------------------------------------------------------------
	ui5DispatchModelSet: function(fcode,oModela){
		//try{
			
			sap.ui.controller('zui5sd00e04.proc.A000').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.B000').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.B100').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.C100').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.C200').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.C300').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.D100').M03_MOD(fcode,oModela);
//			sap.ui.controller('zui5sd00e04.proc.D200').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.D210').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.D300').M03_MOD(fcode,oModela);
//			sap.ui.controller('zui5sd00e04.proc.D400').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.D410').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.D500').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.D600').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.D700').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.D800').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.E100').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.E200').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.E300').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.E400').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.E500').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.E600').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.E700').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.E800').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.F000').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.F100').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.F300').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.F400').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.G000').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.H000').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.H100').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.K000').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.K100').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.K200').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.I000').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.I100').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.I200').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.I300').M03_MOD(fcode,oModela);												// ++ 2018.11.12 :: Input confirm - COOK V1.0.0 
			sap.ui.controller('zui5sd00e04.proc.I400').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.L000').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.L100').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.M000').M03_MOD(fcode,oModela);
			sap.ui.controller('zui5sd00e04.proc.M100').M03_MOD(fcode,oModela);
			
		//}catch(err){
		//	oCTX.oData.cancel_nav=true;
		//};
			
		//Session totally wrong
		try{
			if(oModela.oData.logon.msgno=='002'&&oModela.oData.logon.typ=='E'){
				if(oCTX.oData.hybrid=='X')
					//app.to('A002','slide');
					oCon.nav_to('A003','A002','slide','');
				else
					app.to('A003','slide');
				oCTX.oData.cancel_nav = true;
			};
		}catch(err){};
		
	},
	
	//ui5DispatchUI     		(======> #4)
	//--------------------------------------------------------------------------------
	ui5DispatchUI: function(fcode,oModela){		
		
		sap.ui.controller('zui5sd00e04.proc.A000').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.B000').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.B100').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.C100').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.C200').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.C300').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D100').M04_DYN(fcode,oModela);
//		sap.ui.controller('zui5sd00e04.proc.D200').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D210').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D300').M04_DYN(fcode,oModela);
//		sap.ui.controller('zui5sd00e04.proc.D400').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D410').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D500').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D600').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D700').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D800').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E100').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E200').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E300').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E400').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E500').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E600').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E700').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E800').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F000').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F100').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F300').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F400').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.G000').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.H000').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.H100').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.K000').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.K100').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.K200').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.I000').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.I100').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.I200').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.I300').M04_DYN(fcode,oModela);													// ++ 2018.11.12 :: Input confirm - COOK V1.0.0 
		sap.ui.controller('zui5sd00e04.proc.I400').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.L000').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.L100').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.M000').M04_DYN(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.M100').M04_DYN(fcode,oModela);
	},
	
	//ui5DispatchNav    		(======> #5)
	//--------------------------------------------------------------------------------
	ui5DispatchNav: function(fcode,oModela){
		
		if(oCTX.oData.cancel_nav){return;};
		
		sap.ui.controller('zui5sd00e04.proc.A000').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.B000').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.B100').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.C100').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.C200').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.C300').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D100').M05_NAV(fcode,oModela);
//		sap.ui.controller('zui5sd00e04.proc.D200').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D210').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D300').M05_NAV(fcode,oModela);
//		sap.ui.controller('zui5sd00e04.proc.D400').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D410').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D500').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D600').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D700').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D800').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E100').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E200').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E300').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E400').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E500').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E600').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E700').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E800').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F000').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F100').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F300').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F400').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.G000').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.H000').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.H100').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.K000').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.K100').M05_NAV(fcode,oModela); 
		sap.ui.controller('zui5sd00e04.proc.K200').M05_NAV(fcode,oModela); 
		sap.ui.controller('zui5sd00e04.proc.I000').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.I100').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.I200').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.I300').M05_NAV(fcode,oModela);													// ++ 2018.11.12 :: Input confirm - COOK V1.0.0 
		sap.ui.controller('zui5sd00e04.proc.I400').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.L000').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.L100').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.M000').M05_NAV(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.M100').M05_NAV(fcode,oModela);
		
	},
	//ui5DispatchNex    		(======> #6)
	//--------------------------------------------------------------------------------
	ui5DispatchNex: function(fcode,oModela){
		
		if(oCTX.oData.cancel_nav){return;};
		
		sap.ui.controller('zui5sd00e04.proc.A000').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.B000').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.B100').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.C100').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.C200').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.C300').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D100').M06_NEX(fcode,oModela);
//		sap.ui.controller('zui5sd00e04.proc.D200').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D210').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D300').M06_NEX(fcode,oModela);
//		sap.ui.controller('zui5sd00e04.proc.D400').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D410').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D500').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D600').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D700').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.D800').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E100').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E200').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E300').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E400').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E500').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E600').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E700').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.E800').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F000').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F100').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F300').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.F400').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.G000').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.H000').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.H100').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.K000').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.K100').M06_NEX(fcode,oModela); 
		sap.ui.controller('zui5sd00e04.proc.K200').M06_NEX(fcode,oModela); 
		sap.ui.controller('zui5sd00e04.proc.I000').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.I100').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.I200').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.I300').M06_NEX(fcode,oModela);													// ++ 2018.11.12 :: Input confirm - COOK V1.0.0 
		sap.ui.controller('zui5sd00e04.proc.I400').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.L000').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.L100').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.M000').M06_NEX(fcode,oModela);
		sap.ui.controller('zui5sd00e04.proc.M100').M06_NEX(fcode,oModela);
		
	},
	//--------------------------------------------------------------------------------
	//																		SAPUI5-H
	//--------------------------------------------------------------------------------
	//getDatePicker
	//--------------------------------------------------------------------------------
	getDatePicker: function(id,val){
		return new sap.m.DatePicker({
			id				: id,
			displayFormat	: 'dd.MM.yyyy',
			valueFormat		: 'yyyyMMdd',
			value			: val,
			change			: function(oEvt){							// ++ 2018.06.15 :: Validate input date
				//var sValid 	= oEvt.getParameter("valid")
				//if (!sValid) {	
				var sValue 	= oEvt.getParameter("value")
				if (sValue.length > 8) {	
					sap.ui.getCore().byId(id).setValue()
					oCon.popMsgbox(sValue+" is not valid date");		// Change message on 2018.06.20
				}
			}
		});
	},
	//getTimePicker
	//--------------------------------------------------------------------------------
	getTimePicker: function(id,val){
		return new sap.m.TimePicker({id				: id,
									 displayFormat  : 'HH:mm:ss',
									 valueFormat	: "HHmmss",
									 value			: val, });
	},
	//getForm
	//--------------------------------------------------------------------------------
	getForm: function(col){
		return new sap.ui.layout.form.SimpleForm({
			layout          : "ResponsiveGridLayout",
			//maxContainerCols: col,
			editable        : true,
			breakpointL		: 500,
			breakpointM		: 500,
			columnsL   		: col,
			columnsM   		: col,	
			//width			: '600px',
			//labelMinWidth	: 200,
		});
	},
		
	//getControl
	//--------------------------------------------------------------------------------
	getControl: function(sName){
		return sap.ui.getCore().getControl(sName);
	},
	//getCell
	//--------------------------------------------------------------------------------
	getCell: function(sName,idx){
		return oCon.getControl(sName).getSelectedItem().getAggregation("cells")[idx];
	},
	//getProperty
	//--------------------------------------------------------------------------------
	getProperty: function(sName,sProp){
		return oCon.getControl(sName).getSelectedItem().getBindingContext().getProperty(sProp);
	},
	//getBusyDialog
	//--------------------------------------------------------------------------------
	getBusyDialog: function(sText){
		return new sap.m.BusyDialog({
			text		: sText + '..',
			title		: 'CPF-SAP'});
	},
	
	//popMsgbox
	//--------------------------------------------------------------------------------
	popMsgbox: function(sMsg){
		if (sMsg != 'For object ZUI5LENUM , number range interval 01 do') {		// ++ 2018.06.30 :: [ T E M P O R A R Y !! ] Prevent msg 'ZUI5LENUM'
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(sMsg, {
		          title	: "CPF-SAP",
		 	});
		}
	},
	
	//popConfirm
	//--------------------------------------------------------------------------------
	popConfirm: function(sMsg,fcodeOK,fcodeCanc){
		jQuery.sap.require("sap.m.MessageBox");
		sap.m.MessageBox.confirm(sMsg, {
		          title		: "CPF-SAP",
		          onClose	: function(oEvt){
		        	  if(oEvt==sap.m.MessageBox.Action.OK)
		        		  oCon.ui5DispatchFcode(fcodeOK);
		        	  else
		        		  oCon.ui5DispatchFcode(fcodeCanc);
		          },
		 });		
	},
	
	//popMsgErrSuc
	//--------------------------------------------------------------------------------
	popMsgErrSuc: function(oModela,typ){
		try
		{
			if(oModela.oData.logon.typ==typ){
				oCon.popMsgbox(oModela.oData.logon.msg);
				return true;
			};
			return false;
		}catch (err){
			return false;
		};
	},
	
	//scanCam
	//--------------------------------------------------------------------------------
	scanCam: function(oInp,oFcode){		   
		cordova.plugins.barcodeScanner.scan(
				function (result) {
					oCon.getControl(oInp).setValue(result.text);
					oCon.ui5DispatchFcode(oFcode);					
				},
				function (error)  {oCon.popMsgbox("Scanning failed: " + error);},
				{
					preferFrontCamera : false, // iOS and Android
					showFlipCameraButton : true, // iOS and Android
					showTorchButton : true, // iOS and Android
					torchOn: true, // Android, launch with the torch switched on (if available)
					prompt : "Place a barcode inside the scan area", // Android
					resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
					formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
					orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
					disableAnimations : true, // iOS
					disableSuccessBeep: false // iOS
				}
			);
	},
	
	//getQrData
	//--------------------------------------------------------------------------------
	getQrData: function(iData){
		
		var oModel = new sap.ui.model.json.JSONModel();
		var qrData = iData.split("|");
		
		oModel.setData({
			matnr 		: "",
		    charg		: "",
		    meins		: "",
		    menge		: "",
		    sets		: "",
		    qrcod		: "",
		    piknr		: "",
		    pospk		: "",
		    seqpk		: "",
		    lenum		: "",
		    lgpla		: "",
		    type		: "",
		    lgtyp		: "",
		});
		
		for(var i=0;i<qrData.length;i++){
			if(qrData[i].substring(0,3).toUpperCase()=='PCK'){oModel.oData.piknr = qrData[i].substring(4);};
			if(qrData[i].substring(0,3).toUpperCase()=='ITM'){oModel.oData.pospk = qrData[i].substring(4);};
			if(qrData[i].substring(0,3).toUpperCase()=='SEQ'){oModel.oData.seqpk = qrData[i].substring(4);};
			if(qrData[i].substring(0,3).toUpperCase()=='MAT'){oModel.oData.matnr = qrData[i].substring(4);};
			if(qrData[i].substring(0,3).toUpperCase()=='BAT'){oModel.oData.charg = qrData[i].substring(4);};
			if(qrData[i].substring(0,3).toUpperCase()=='UOM'){oModel.oData.meins = qrData[i].substring(4);};
			if(qrData[i].substring(0,3).toUpperCase()=='QTY'){oModel.oData.menge = qrData[i].substring(4).trim();};
			if(qrData[i].substring(0,3).toUpperCase()=='SET'){oModel.oData.seta  = qrData[i].substring(4);};
			if(qrData[i].substring(0,3).toUpperCase()=='QID'){oModel.oData.qrcod = qrData[i].substring(4);};
			if(qrData[i].substring(0,3).toUpperCase()=='SUN'){oModel.oData.lenum = qrData[i].substring(4);};
			if(qrData[i].substring(0,3).toUpperCase()=='BIN'){oModel.oData.lgpla = qrData[i].substring(4);};
			if(qrData[i].substring(0,3).toUpperCase()=='TYP'){oModel.oData.type  = qrData[i].substring(4);};
			if(qrData[i].substring(0,3).toUpperCase()=='BTY'){oModel.oData.lgtyp = qrData[i].substring(4);};
		}; 
		return oModel;
	},
	//getWeiDataIshida
	//--------------------------------------------------------------------------------
	getWeiDataIshida: function(iData){
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({
			stat1 		: "",
		    stat2		: "",
		    sign		: "",
		    wei			: "",
		    uom			: "",
		    data		: "",
		});
		
		oModel.oData.stat1 = iData.substring(0,1);
		oModel.oData.stat2 = iData.substring(1,2);
		oModel.oData.sign  = iData.substring(2,3);
		oModel.oData.wei   = iData.substring(3,11).replace(',','.');
		oModel.oData.uom   = iData.substring(12);
		oModel.oData.data  = iData;
		return oModel;
	},
	//fmtDec
	//--------------------------------------------------------------------------------
	fmtDec: function(oEvt,iDec){
		
		jQuery.sap.require("sap.ui.core.format.NumberFormat");
		var oNumberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
			maxFractionDigits 	: iDec,
			minFractionDigits   : iDec,
			groupingEnabled		: false,
			groupingSeparator	: ",",
			decimalSeparator	: ".",
			minusSign           : "-",
		}); 
		
		if((oEvt=='')||(!oEvt))
			return oNumberFormat.format(0);
		
		var n 	= oEvt.search('-');
		var amt = parseFloat(oEvt.replace(',',''));

		if(n>=0){
			amt = Math.abs(amt) * -1;
		};
		return oNumberFormat.format(amt);
	},
	//--------------------------------------------------------------------------------
	//liveSearchMulti
	//--------------------------------------------------------------------------------
	liveSearchMulti: function(sInput,sTab,sField,sMode){
		
		var sQuery = oCon.getControl(sInput).getValue();
		
		if(sMode=='0'){ //Force search
			oCon.liveSearch(sQuery,sTab,sField); 
		}else{
			if(oCon.getControl(sTab).getItems()<=0)
				oCon.liveSearch(sQuery,sTab,sField); 
		};
	},
	//--------------------------------------------------------------------------------
	//liveSearch
	//--------------------------------------------------------------------------------
	liveSearch: function(sQuery,sTab,sField){
		
	    // add filter for search
	    var aFilters = [];
	    if (sQuery && sQuery.length > 0) {
	      var filter = new sap.ui.model.Filter(sField, sap.ui.model.FilterOperator.Contains, sQuery);
	      aFilters.push(filter);
	    }

	    // update list binding
	    var list = oCon.getControl(sTab);
	    var binding = list.getBinding("items");
	    binding.filter(aFilters, "Application");
	    
	    if (sTab == "b101TblOvw") {	// ++ 2018.03.08 : Set status
	    	oCon.ui5DispatchNex("SAPEVT_B101");
		}
	
	},
	//--------------------------------------------------------------------------------
	//arrListItemsNoBlank
	//--------------------------------------------------------------------------------
	arrListItemsNoBlank: function(vList,vField,vFieldChk){
		
		var arr 	= new Array();
		for(var i=0;i<oCon.getControl(vList).getItems().length;i++){
			if(oCon.getControl(vList).getItems()[i].getBindingContext().getProperty(vFieldChk)!=""){
				arr[i]     = new Array(1);
				arr[i][0]  = oCon.getControl(vList).getItems()[i].getBindingContext().getProperty(vField);
			};
		};
		return arr;
	
	},
	//--------------------------------------------------------------------------------
	//arrListSelected
	//--------------------------------------------------------------------------------
	arrListSelected: function(vList,vField){
		
		var arr 	= new Array();
		for(var i=0;i<oCon.getControl(vList).getSelectedItems().length;i++){
			arr[i]     = new Array(1);
			arr[i][0]  = oCon.getControl(vList).getSelectedItems()[i].getBindingContext().getProperty(vField);
		};
		return arr;
	
	},
	//--------------------------------------------------------------------------------
	//arrListItems
	//--------------------------------------------------------------------------------
	arrListItems: function(vList,vField){
		
		var arr 	= new Array();
		for(var i=0;i<oCon.getControl(vList).getItems().length;i++){
			arr[i]     = new Array(1);
			arr[i][0]  = oCon.getControl(vList).getItems()[i].getBindingContext().getProperty(vField);
		};
		return arr;
	
	},
	//--------------------------------------------------------------------------------
	//fldQtyST
	//--------------------------------------------------------------------------------
	fldQtyST: function(sSign,iField,step){
		
		var Qty = parseFloat(oCon.getControl(iField).getText());
		
		//Current Line Order
		if(sSign=='+'){
			Qty = Qty  + step;
			if(isNaN(Qty)){Qty = step;};
		}else{
			if(Qty>0){Qty = Qty - step;};
		};
		
		//Current Line Order
		if(!isNaN(Qty)&&Qty>0)
			oCon.getControl(iField).setText(Qty);
		else
			oCon.getControl(iField).setText('');
	},	
	//--------------------------------------------------------------------------------
	//pressQtyTxt
	//--------------------------------------------------------------------------------
	pressQtyTxt: function(tab,fld,sign,pos,dec){
		
		var oCtx 	 = oCon.getControl(tab).getSelectedItem().getBindingContext();
		var oRow 	 = oCon.getControl(tab).getSelectedItem();
		var lv_menge = 0;
		
		if(oCtx.getProperty(fld)=='')
			lv_menge = 0;
		else
			lv_menge = parseFloat(oCtx.getProperty(fld));
		
		if(sign=='+'){
			lv_menge = lv_menge + 1; 
		}else{
			lv_menge = Math.round(parseFloat(oCtx.getProperty(fld)));
			lv_menge = lv_menge - 1; 
		};
		
		if(lv_menge<0)
			lv_menge = 0;
		
		lv_menge = parseInt(lv_menge);
		oRow.getAggregation("cells")[pos].setText(oCon.fmtDec(lv_menge.toString(),dec));

	},
	//--------------------------------------------------------------------------------
	//getCol
	//--------------------------------------------------------------------------------
	getCol: function(style,desp,width,id,tbl,fld){
		switch(style){
		
			case '01'://Normal Header
				return new sap.m.Column({header: new sap.m.Label({text:desp,design:"Bold",})});
				break;
				
			case '02'://Number
				return new sap.m.Column({
					//width	:'62px',
					width	:'60px',
					hAlign	:sap.ui.core.TextAlign.Right,
					header	: new sap.m.Label({text:desp,design:"Bold",})
				});
				break; 
				
			case '03'://UoM
				return new sap.m.Column({width:'40px',header: new sap.m.Label({text:desp,design:"Bold",})});
				break;  
				
			case '04'://BTN +/-
				return new sap.m.Column({
					id		: id,
					width	:'35px',
					hAlign	: sap.ui.core.TextAlign.Center,
					header	: new sap.m.Label({text:desp})});
				break;
			
			case '05'://Number Input
				return new sap.m.Column({
					width	: '75px',
					hAlign	: sap.ui.core.TextAlign.Center,
					header	: new sap.m.Label({text:desp,design:"Bold",})
				});
				break;
				
			case '06'://Doc Number/Date
				return new sap.m.Column({width:'87px',header: new sap.m.Label({text:desp,design:"Bold"})});
				break;
			
			case '07'://Sort link Header (01)
				return new sap.m.Column({
					header: new sap.m.Link({
							 text:desp,
							 press:function(){
								 oCon.sortTable(tbl,fld);
								 oCon.ui5DispatchFcode(id)
							  },		 
					})});
				break;
				
			case '08'://Sort link Header //Doc Number/Date (06) 
				return new sap.m.Column({ 
					width:'87px',
					header: new sap.m.Link({
							 text:desp,
							 press:function(){
								 oCon.sortTable(tbl,fld);
								 oCon.ui5DispatchFcode(id)
							  },		 
					})});
				break;
				
			case '09'://Sort Link UoM (03)
				return new sap.m.Column({width:'40px',
					header: new sap.m.Link({
						 text:desp,
						 press:function(){
							 oCon.sortTable(tbl,fld);
							 oCon.ui5DispatchFcode(id)
						  },		 
				})});
				break;
				
			case '10'://Doc Number/Date
				return new sap.m.Column({width:'10%',header: new sap.m.Label({text:desp,design:"Bold"})});
				break;
				
			case '15'://Doc Number/Date
				return new sap.m.Column({width:'15%',header: new sap.m.Label({text:desp,design:"Bold"})});
				break;
				
			case '20'://Doc Number/Date
				return new sap.m.Column({width:'20%',header: new sap.m.Label({text:desp,design:"Bold"})});
				break;
				
			case '25'://Doc Number/Date
				return new sap.m.Column({width:'25%',header: new sap.m.Label({text:desp,design:"Bold"})});
				break;
				
			case '30'://Doc Number/Date
				return new sap.m.Column({width:'30%',header: new sap.m.Label({text:desp,design:"Bold"})});
				break;
				
			case '35'://Doc Number/Date
				return new sap.m.Column({width:'35%',header: new sap.m.Label({text:desp,design:"Bold"})});
				break;
				
			case '40'://Doc Number/Date
				return new sap.m.Column({width:'40%',header: new sap.m.Label({text:desp,design:"Bold"})});
				break; 
				
			case '45'://Doc Number/Date
				return new sap.m.Column({width:'45%',header: new sap.m.Label({text:desp,design:"Bold"})});
				break; 
				
			case '50'://Doc Number/Date
				return new sap.m.Column({width:'50%',header: new sap.m.Label({text:desp,design:"Bold"})});
				break; 
			
			case '99':
				return new sap.m.Column({width:width,header: new sap.m.Label({text:desp,design:"Bold",})});
				break;
		};
	},
	//--------------------------------------------------------------------------------
	//sortTable
	//--------------------------------------------------------------------------------
	sortTable: function(sTable,sField){
		var oBinding = oCon.getControl(sTable).getBinding("items");
		var aSorters = [];
		aSorters.push(new sap.ui.model.Sorter(sField));
	    oBinding.sort(aSorters); 
	    
	    if (sTable == "b101TblOvw") {	// ++ 2018.03.08 : Set status
	    	oCon.ui5DispatchNex("SAPEVT_B101");
		}
	},
	//--------------------------------------------------------------------------------
	//getDate: External Format
	//--------------------------------------------------------------------------------
	getDate: function(){
		var date        = new Date();
		var oDateFormat = sap.ui.core.format.DateFormat.getInstance({pattern: "dd.MM.yyyy"});
		var datetx      = oDateFormat.format(date);
		return datetx;
	},
	//--------------------------------------------------------------------------------
	//getDateIn: Internal Format
	//--------------------------------------------------------------------------------
	getDateIn: function(days){
		var date        = new Date();
		
		if(days>0)
			date.setDate(date.getDate()+days);
		
		var oDateFormat = sap.ui.core.format.DateFormat.getInstance({pattern: "YYYYMMdd"});
		var datetx      = oDateFormat.format(date);
		return datetx;
	},
	//--------------------------------------------------------------------------------
	//getTime: Internal Format
	//--------------------------------------------------------------------------------
	getTime: function(){
		var date        = new Date();		
		var oDateFormat = sap.ui.core.format.DateFormat.getInstance({pattern: "HHmmss"});
		var datetx      = oDateFormat.format(date);
		return datetx;
	},
	
	//--------------------------------------------------------------------------------
	//getURLParm
	//--------------------------------------------------------------------------------
	getURLParm: function(parm){
		var r = jQuery.sap.getUriParameters().get(parm);
		if(jQuery.sap.getUriParameters().get(parm)==null)
			return '';
		
		return jQuery.sap.getUriParameters().get(parm);
	},	
	//--------------------------------------------------------------------------------
	//getDialogDate
	//--------------------------------------------------------------------------------
	getDialogDate: function(id,ui5_evt,sap_evt){
		
		var FrmDate = oCon.getForm(3);
		var inpDate = oCon.getDatePicker(id+'inpDate');		
		inpDate.setValue(oCon.getDateIn(1));
			
		FrmDate.addContent(new sap.m.Label({text:'Date'}));
		FrmDate.addContent(inpDate);
		FrmDate.addContent(new sap.m.Label({text:'Shift'}));
		FrmDate.addContent(new sap.m.CheckBox({id:id+'chkShiftD',selected:true,text:"Day"}));
		FrmDate.addContent(new sap.m.CheckBox({id:id+'chkShiftN',selected:true,text:"Night",valueState:"Warning"}));
		var DiaDate = new sap.m.Dialog({
			id				: id+'DiaDate',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Label({text:"Process Order"})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){DiaDate.close();},})],}),
			contentWidth	: '550px',
			beginButton		: new sap.m.Button({id:id+'btnApply',icon:"sap-icon://accept",text:'Apply',press:function(){
							  oCon.ui5DispatchFcode(id+'btnApply');
							  DiaDate.close();
							  if(ui5_evt!=''&&sap_evt!='')
								  oCon.ui5DispatchBackEnd(ui5_evt,sap_evt,"{i18n>MSG_PROCESS}");
							}}),
		    content			: [FrmDate],
		});
		return DiaDate;
	},
	//--------------------------------------------------------------------------------
	//getBtnDate
	//--------------------------------------------------------------------------------
	getBtnDate: function(id){
		return new sap.m.Button({id		: id+'btnDate',
								 icon	: "sap-icon://accelerated",
								 press	: function(){
									 oCon.ui5DispatchFcode(id+'btnDate');
									 oCon.getControl(id+'DiaDate').open();
								 }});
	},
	//--------------------------------------------------------------------------------
	//getDialogEditInp
	//--------------------------------------------------------------------------------
	getDialogEditInp: function(id,lbl){
		var FrmEdt = oCon.getForm(2);
		var inpQty = new sap.m.Input({id:id+'inpOrder',type:"Number"});
		FrmEdt.addContent(new sap.m.Label({text:lbl}));
		FrmEdt.addContent(inpQty);
		
		var DiaEdt = new sap.m.Dialog({
			id				: id+'DiaEdt',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Button({icon:"sap-icon://eraser",press:function(){
												inpQty.setValue();
												inpQty.focus();
												},})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){DiaEdt.close();},})],}),
			contentWidth	: '550px',
		    //beginButton		: new sap.m.Button({id:id+'btnAcp',icon:"sap-icon://accept",text:'Accept',press:oCon.ui5Dispatch}),
			beginButton		: new sap.m.Button({id:id+'btnAcp',icon:"sap-icon://accept",text:'Accept',press:function(){
									if(!oCon.chkAmt(inpQty.getValue())){inpQty.focus();return;}	
									DiaEdt.close();
									oCon.ui5DispatchFcode(id+'btnAcp');
								}}),
		    content			: [FrmEdt],
		});
		return DiaEdt;
	},
	//--------------------------------------------------------------------------------
	//getPullMain
	//--------------------------------------------------------------------------------
	getPullMain: function(id,ui5_evt,sap_evt){
		 var pullMain = new sap.m.PullToRefresh({
			id			: id+'pullMain',
			description	: '',
			showIcon	: true,
			//refresh     : oCon.ui5Dispatch,
			refresh		: function(){
				oCon.ui5DispatchFcode(id+'pullMain');
				pullMain.hide();
				if(ui5_evt!=''&&sap_evt!='')
					oCon.ui5DispatchBackEnd(ui5_evt,sap_evt,"{i18n>MSG_PROCESS}");
			},
		});
		 return pullMain;
	},
	//--------------------------------------------------------------------------------
	//getSchMain
	//--------------------------------------------------------------------------------
	getSchMain: function(id,tab,columns){
		SchMain = new sap.m.SearchField({
			id			: id+'schMain',
			width 		: '100%',
			liveChange : function(){
				oCon.ui5DispatchFcode(id+'schMain');
				for(i=0;i<columns.length;i++){
					oCon.liveSearchMulti(id+'schMain',tab,columns[i],i.toString());
				};
			},
		});
		return SchMain;
	},
	//--------------------------------------------------------------------------------
	//getFieldValue
	//--------------------------------------------------------------------------------
	getFieldValue: function(tab,columns){
		var out = '';
		for(i=0;i<columns.length;i++){
			out = out + oCon.getProperty(tab,columns[i]) + ' ';
		};
		out.trim();
		return out;
	},
	//--------------------------------------------------------------------------------
	//getFloat
	//--------------------------------------------------------------------------------
	getFloat: function(oEvt){
		return parseFloat(oEvt.replace(',',''));
	},
	//--------------------------------------------------------------------------------
	//getAbapTrue
	//--------------------------------------------------------------------------------
	getAbapTrue: function(iChkbox){
		if(oCon.getControl(iChkbox).getSelected())
			return 'X';
	},
	//--------------------------------------------------------------------------------
	//ui5SaveUser
	//--------------------------------------------------------------------------------
	ui5SaveUser: function(){
		
		 $.sap.require("jquery.sap.storage");
		 var UI5Storage = $.sap.storage(jQuery.sap.storage.Type.local);
		 UI5Storage.put('LOGON_NAME',oCTX.oData.uname);
		 
	},
	//--------------------------------------------------------------------------------
	//ui5ReadUser
	//--------------------------------------------------------------------------------
	ui5ReadUser: function(){
		
		$.sap.require("jquery.sap.storage");
		var UI5Storage = $.sap.storage(jQuery.sap.storage.Type.local);
		var auth = UI5Storage.get('LOGON_NAME');
		return auth;
		
	},
	//--------------------------------------------------------------------------------
	//qrPrintCtx: Prepare Print Data oModel
	//--------------------------------------------------------------------------------
	qrPrintCtx: function(){
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({
			matnr		: '',
			maktx		: '',
			charg		: '',
			licha		: '', //Vendor Batch
			hsdat		: '', //Manu. Date
			vfdat		: '', //Batch Expire Date
			lifnr		: '',
			name1		: '',
			menge		: '',
			meins		: '',
			sets		: '', //Obsolete !!!
			seta		: '', //SET# Number of Premix
			margin		: '',
			qrsize		: '',
			margin2		: '',
			maktx1		: '',
			maktx2		: '',
			maktx3		: '',
			qrcod		: '',
			bismt		: '',
			maktx_all	: '',
			faktor		: '',
			lenum		: '', //SU
			lgpla		: '', //BIN
			type		: '', //SUN or MAT
			weidat		: '', // Weight date ++ 2018.09.13 :: Spec. Weight for PRD V1.2
		});
		return oModel;
	},
	//--------------------------------------------------------------------------------
	//qrPrint: Actual Print Function
	//--------------------------------------------------------------------------------
	qrPrint: function(){
		
		if(oCTX.oData.hybrid!='X'){return;};
		
		oCon.getControl("a002inpBData").setValue(oCTX.oData.qr_data);
		oCon.getControl("a002inpPData").setValue(oCTX.oData.qr_data);
		
		//Margin Settings Based on Printer
		for(var i=0;i<oCTX.oData.qr_copy;i++){
			if(oCon.getControl('a002InpUPrint').getSelectedKey()=='P1'){
				oPrint1.dispatch('SND',oCTX.oData.qr_data);
			}else{
				oPrint2.dispatch('SND',oCTX.oData.qr_data);	
			};
		};
		
	},
	//--------------------------------------------------------------------------------
	//qrPrintData: Get QR Data for Printing
	//--------------------------------------------------------------------------------
	qrPrintData: function(iData){

		//Margin Settings Based on Printer
		if(oCon.getControl('a002InpUPrint').getSelectedKey()=='P1'){	//(P1=Bluetooth, P2=Network) 
			iData.oData.margin = oCon.getControl('a002InpBMargin').getValue();
			iData.oData.qrsize = oCon.getControl('a002InpBQrSize').getValue();
			iData.oData.font   = oCon.getControl('a002InpBFont').getValue();
		}else{
			iData.oData.margin = oCon.getControl('a002InpPMargin').getValue();
			iData.oData.qrsize = oCon.getControl('a002InpPQrSize').getValue();
			iData.oData.font   = oCon.getControl('a002InpPFont').getValue();
		};
		
		//Margin Block 2
		var vMargin2          = parseInt(iData.oData.margin)+180;
		iData.oData.maktx_all = iData.oData.bismt + ' ' + iData.oData.maktx;
		iData.oData.maktx_all = iData.oData.maktx_all.trim();
		iData.oData.margin2   = vMargin2.toString();
		iData.oData.maktx1    = iData.oData.maktx_all.substring(0,13);
		iData.oData.maktx2    = iData.oData.maktx_all.substring(13,35);
		iData.oData.maktx3    = iData.oData.maktx_all.substring(35);
		
		//Sticker Type A=5x5(cm), B=6x4(inch)
		iData.oData.type  	  = 'A';
		
		//TH Conversion into UTF-8 Hex.
		var strMaktx1		  =	oFmt.fmtZplTH(iData.oData.maktx1);
		var strMaktx2		  =	oFmt.fmtZplTH(iData.oData.maktx2);
		var strMaktx3		  =	oFmt.fmtZplTH(iData.oData.maktx3);
		var strName1		  =	oFmt.fmtZplTH(iData.oData.name1);
		
		if (iData.oData.weidat == "00.00.0000") { iData.oData.weidat = "" }		// ++ 2018.09.18
		
		
// 		2018.03.13 : Change for support THAI language ************************** S T A R T **************************		

//		return '^XA' +
//	   	   	   '^PW380' +
////	   	   	   '^CW3,E:ANGSANA.TTF^FS' + //QLn220
////	   	   	   '^CW3,E:ANGSANA.FNT^FS' + //GK420t
//	   	   	   '^CW3,E:' +iData.oData.font +'^FS' +
//		       '^FO'+iData.oData.margin2+',60^A0N35,35^FD'  + iData.oData.charg  +'^FS' +
//		       '^FO'+iData.oData.margin2+',100^A0N25,20^FD' + iData.oData.hsdat  +'^FS' +
//		       '^FO'+iData.oData.margin2+',130^A0N25,20^FD' + iData.oData.vfdat  +'^FS' +
//		       '^FO'+iData.oData.margin2+',160^A0N25,20^FD' + iData.oData.menge  +' '+ iData.oData.meins  +'^FS' +
//		       '^FO'+iData.oData.margin2+',190^A0N25,20^FD' + 'SET# ' +' '+ iData.oData.seta +' '+ iData.oData.faktor  +'^FS' +
//		       '^FO'+iData.oData.margin2+',220^A0N25,20^FD' + iData.oData.licha  +'^FS' +
//		       '^FO'+iData.oData.margin +',230^A0N20,20^FD' + iData.oData.qrcod  +'^FS' +
////			   '^FO'+iData.oData.margin +',250^A0N30,30^FD' + iData.oData.matnr  +':'+ iData.oData.maktx1 +'^FS' +
////			   '^FO'+iData.oData.margin +',280^A0N30,30^FD' + iData.oData.maktx2 +'^FS' +
////			   '^FO'+iData.oData.margin +',310^A0N30,30^FD' + iData.oData.maktx3 +'^FS' +
////			   '^FO'+iData.oData.margin +',340^A0N25,20^FD' + iData.oData.lifnr  +':'+ iData.oData.name1  +'^FS' +
//			   '^FO'+iData.oData.margin +',250^CI28^A3N55,45^FH|^FD' + iData.oData.matnr  +':'+ strMaktx1 +'^FS' +
//			   '^FO'+iData.oData.margin +',280^CI28^A3N55,45^FH|^FD' + strMaktx2 +'^FS' +
//			   '^FO'+iData.oData.margin +',310^CI28^A3N55,45^FH|^FD' + strMaktx3 +'^FS' +
//			   '^FO'+iData.oData.margin +',340^CI28^A3N45,35^FH|^FD' + iData.oData.lifnr  +':'+ strName1  +'^FS' +
//			   '^FO'+iData.oData.margin +',50^BQN,2,'+iData.oData.qrsize+'^FD '  +
//			   '|QID:'+iData.oData.qrcod+
//			   '|PCK:'+iData.oData.piknr+
//			   '|ITM:'+iData.oData.pospk+
//			   '|SEQ:'+iData.oData.seqpk+		// ++ 2017.12.26 
//			   '|MAT:'+iData.oData.matnr+
//			   '|BAT:'+iData.oData.charg+
//			   '|SUN:'+iData.oData.lenum+		// ++ 2017.12.26
//			   '|UOM:'+iData.oData.meins+
//			   '|QTY:'+iData.oData.menge+
//			   '|MFC:'+iData.oData.hsdat+
//			   '|EXP:'+iData.oData.vfdat+
//			   '|SET:'+iData.oData.seta+
//			   '|TYP:'+iData.oData.type+
//			   '| ^FS' +
//			   '^XZ';
		
		return '^XA' +
		   	   '^PW380' + 
		   	   '^CW3,E:' +iData.oData.font +'^FS' +
		       '^FO'+iData.oData.margin2+',45^A0N35,35^FD'  + iData.oData.charg  +'^FS' +
		       '^FO'+iData.oData.margin2+',83^A0N25,20^FD' + iData.oData.hsdat  +'^FS' +
		       '^FO'+iData.oData.margin2+',109^A0N25,20^FD' + iData.oData.vfdat  +'^FS' +
		       '^FO'+iData.oData.margin2+',136^A0N25,20^FD' + iData.oData.menge  +' '+ iData.oData.meins  +'^FS' +
		       '^FO'+iData.oData.margin2+',162^A0N25,20^FD' + 'SET# ' +' '+ iData.oData.seta +' '+ iData.oData.faktor  +'^FS' +
		       '^FO'+iData.oData.margin2+',190^A0N25,20^FD' + iData.oData.licha  +'^FS' +
		       '^FO'+iData.oData.margin2+',217^A0N25,20^FD' + iData.oData.weidat  +'^FS' +
		       '^FO'+iData.oData.margin +',225^A0N20,20^FD' + iData.oData.qrcod  +'^FS' +
			   '^FO'+iData.oData.margin +',240^CI28^A3N55,40^FH|^FD' + iData.oData.matnr  +':'+ strMaktx1 +'^FS' +
			   '^FO'+iData.oData.margin +',280^CI28^A3N55,40^FH|^FD' + strMaktx2 +'^FS' +
			   '^FO'+iData.oData.margin +',320^CI28^A3N55,40^FH|^FD' + strMaktx3 +'^FS' +
			   '^FO'+iData.oData.margin +',358^CI28^A3N45,34^FH|^FD' + iData.oData.sptxt  +':'+ strName1  +'^FS' +
			   //'^FO'+iData.oData.margin +',358^CI28^A3N45,34^FH|^FD' + iData.oData.lifnr  +':'+ strName1  +'^FS' +
			   '^FO'+iData.oData.margin +',35^BQN,2,'+iData.oData.qrsize+'^FD '  +
			   '|QID:'+iData.oData.qrcod+
			   '|PCK:'+iData.oData.piknr+
			   '|ITM:'+iData.oData.pospk+
			   '|SEQ:'+iData.oData.seqpk+		// ++ 2017.12.26 
			   '|MAT:'+iData.oData.matnr+
			   '|BAT:'+iData.oData.charg+
			   '|SUN:'+iData.oData.lenum+		// ++ 2017.12.26
			   '|UOM:'+iData.oData.meins+
			   '|QTY:'+iData.oData.menge+
			   '|MFC:'+iData.oData.hsdat+
			   '|EXP:'+iData.oData.vfdat+
			   '|SET:'+iData.oData.seta+
			   '|TYP:'+iData.oData.type+
			   '| ^FS' +
			   '^XZ';
		
// 		2018.03.13 : Change for support THAI language **************************** E N D ****************************
		
	},
	
	
	//CHATUPOM TEST XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
	
	qrPrintDataSU: function(iData){
		
		//Margin Settings Based on Printer
		if(oCon.getControl('a002InpUPrint').getSelectedKey()=='P1'){	//(P1=Bluetooth, P2=Network) 
			iData.oData.margin = oCon.getControl('a002InpBMargin').getValue();
			iData.oData.qrsize = oCon.getControl('a002InpBQrSize').getValue();
			iData.oData.font   = oCon.getControl('a002InpBFont').getValue();
		}else{
			iData.oData.margin = oCon.getControl('a002InpPMargin').getValue();
			iData.oData.qrsize = oCon.getControl('a002InpPQrSize').getValue();	
			iData.oData.font   = oCon.getControl('a002InpPFont').getValue();
		};
		
		//Margin Block 2
		var vMargin2          = parseInt(iData.oData.margin)+250;
		var vMargin3          = parseInt(iData.oData.margin)+600;
		iData.oData.maktx_all = iData.oData.bismt + ' ' + iData.oData.maktx;
		iData.oData.maktx_all = iData.oData.maktx_all.trim();
		iData.oData.margin2   = vMargin2.toString();
		iData.oData.margin3   = vMargin3.toString();
		iData.oData.maktx1    = iData.oData.maktx_all.substring(0,15);
		iData.oData.maktx2    = iData.oData.maktx_all.substring(15);
		//iData.oData.name1_all = iData.oData.lifnr + ': ' + iData.oData.name1;		// -- 2018.09.18
		//iData.oData.name1x1   = iData.oData.name1_all.substring(0,15);			// -- 2018.09.18
		//iData.oData.name1x2   = iData.oData.name1_all.substring(15);				// -- 2018.09.18
		iData.oData.name1x1   = iData.oData.name1.substring(0,6);					// ++ 2018.09.18
		iData.oData.name1x2   = iData.oData.name1.substring(6);						// ++ 2018.09.18
		
		//Sticker Type A=5x5(cm), B=6x4(inch)
		iData.oData.type  	  = 'B';
		
		
		//TH Conversion into UTF-8 Hex.
		var strMaktx1		  =	oFmt.fmtZplTH(iData.oData.maktx1);
		var strMaktx2		  =	oFmt.fmtZplTH(iData.oData.maktx2);
		var strName1x1		  =	oFmt.fmtZplTH(iData.oData.name1x1);
		var strName1x2		  =	oFmt.fmtZplTH(iData.oData.name1x2);
		
		//Return Print Data
		return '^XA' +
		   	   '^PW700' +
		   	   '^CW3,E:' +iData.oData.font +'^FS' +
		   	   //'^CW3,E:ANGSANA.FNT^FS' + //GK420t		// Change 2018.07.01 :: Edit from hard code to value from config
		       '^FO'+iData.oData.margin +',330^A0N20,25^FD' + 'Sticker#' +'^FS' +
		       '^FO'+iData.oData.margin +',380^A0N20,50^FD' + 'SU#' +'^FS' +		   
		       '^FO'+iData.oData.margin +',450^A0N20,50^FD' + 'Batch' +'^FS' +
		       '^FO'+iData.oData.margin +',520^A0N20,50^FD' + 'MFC Date' +'^FS' +
		       '^FO'+iData.oData.margin +',590^A0N20,50^FD' + 'EXP Date' +'^FS' +
		       '^FO'+iData.oData.margin +',660^A0N20,50^FD' + 'Quantity:' +'^FS' +
		       '^FO'+iData.oData.margin +',730^A0N20,50^FD' + '' +'^FS' +
			   '^FO'+iData.oData.margin +',800^A0N20,50^FD' + 'Material' +'^FS' +
			   '^FO'+iData.oData.margin +',870^A0N20,50^FD' + '' +'^FS' +
			   '^FO'+iData.oData.margin +',940^A0N20,50^FD' + '' +'^FS' +
			   '^FO'+iData.oData.margin +',1010^A0N20,50^FD' + 'Vendor' +'^FS' +
			   '^FO'+iData.oData.margin2 +',330^A0N20,25^FD' + iData.oData.qrcod  +'^FS' +
		       '^FO'+iData.oData.margin2 +',380^A0N20,50^FD' + iData.oData.lenum  +'^FS' +		   
		       '^FO'+iData.oData.margin2 +',450^A0N20,50^FD' + iData.oData.charg  +'^FS' +
		       '^FO'+iData.oData.margin2 +',520^A0N20,50^FD' + iData.oData.hsdat  +'^FS' +
		       '^FO'+iData.oData.margin2 +',590^A0N20,50^FD' + iData.oData.vfdat  +'^FS' +
		       '^FO'+iData.oData.margin2 +',660^A0N20,50^FD' + iData.oData.menge_uoi  +'^FS' +
		       '^FO'+iData.oData.margin2 +',730^A0N20,50^FD' + iData.oData.menge  +'^FS' +
			   '^FO'+iData.oData.margin2 +',800^A0N20,50^FD' + iData.oData.matnr  +'^FS' +
//			   '^FO'+iData.oData.margin2 +',870^A0N20,65^FD' + iData.oData.maktx1 +'^FS' +
//			   '^FO'+iData.oData.margin2 +',940^A0N20,65^FD' + iData.oData.maktx2 +'^FS' +
//			   '^FO'+iData.oData.margin2 +',1010^A0N20,65^FD' + iData.oData.name1x1  +'^FS' +
//			   '^FO'+iData.oData.margin2 +',1080^A0N20,65^FD' + iData.oData.name1x2  +'^FS' +
			   '^FO'+iData.oData.margin2 +',870^CI28^A3N20,65^FH|^FD' + strMaktx1 +'^FS' +		// Change 2018.07.01
			   '^FO'+iData.oData.margin2 +',940^CI28^A3N20,65^FH|^FD' + strMaktx2 +'^FS' +		// Add "|"
			   '^FO'+iData.oData.margin2 +',1010^CI28^A3N20,65^FH|^FD' + iData.oData.sptxt + ' : ' + strName1x1 +'^FS' +
			   '^FO'+iData.oData.margin2 +',1080^CI28^A3N20,65^FH|^FD' + strName1x2  +'^FS' +
			   '^FO'+iData.oData.margin3 +',660^A0N20,50^FD' + iData.oData.meins_uoi  +'^FS' +
		       '^FO'+iData.oData.margin3 +',730^A0N20,50^FD' + iData.oData.meins  +'^FS' +	   
			   '^FO'+iData.oData.margin +',50^BQN,2,'+iData.oData.qrsize+'^FD '  +
			   '|QID:'+iData.oData.qrcod+
			   '|MAT:'+iData.oData.matnr+
			   '|BAT:'+iData.oData.charg+
			   '|UOM:'+iData.oData.meins+
			   '|QTY:'+iData.oData.menge+
			   '|SUN:'+iData.oData.lenum+
			   '|TYP:'+iData.oData.type+
			   '| ^FS' +
			   '^XZ';
		
//		Test New Design
//		var vMargin4          	= parseInt(iData.oData.margin)+300;
//		iData.oData.margin4   	= vMargin4.toString();
//		iData.oData.maktx_all2 	= iData.oData.bismt + ' ' + iData.oData.maktx;
//		iData.oData.maktx_all2 	= iData.oData.maktx_all2.trim();
//		iData.oData.maktx3    	= iData.oData.maktx_all2.substring(0,25);
//		iData.oData.maktx4    	= iData.oData.maktx_all2.substring(25);
//		iData.oData.name2_all 	= iData.oData.lifnr + ': ' + iData.oData.name1;
//		iData.oData.name2x1   	= iData.oData.name2_all.substring(0,25);
//		iData.oData.name2x2   	= iData.oData.name2_all.substring(25);
//		iData.oData.maktx_all3 	= iData.oData.matnr + ': ' + iData.oData.bismt + ' ' + iData.oData.maktx;
//		iData.oData.maktx_all3 	= iData.oData.maktx_all3.trim();
//		iData.oData.maktx5    	= iData.oData.maktx_all3.substring(0,25);
//		iData.oData.maktx6    	= iData.oData.maktx_all3.substring(25,49);
//		iData.oData.maktx7    	= iData.oData.maktx_all3.substring(49);
//		
//		//Return Print Data
//		return '^XA' +
//	   	   '^PW700' +
//	       '^FO'+iData.oData.margin +',330^A0N20,25^FD' + iData.oData.qrcod  +'^FS' +	   
//		   '^FO'+iData.oData.margin4 +',50^A0N20,50^FD' + iData.oData.lenum  +'^FS' +
//		   '^FO'+iData.oData.margin4 +',120^A0N20,50^FD' + iData.oData.charg  +'^FS' +
//		   '^FO'+iData.oData.margin4 +',190^A0N20,50^FD' + iData.oData.menge_uoi  +'^FS' +
//	       '^FO'+iData.oData.margin4 +',260^A0N20,50^FD' + iData.oData.menge  +'^FS' +
//		   '^FO'+iData.oData.margin3 +',190^A0N20,50^FD' + iData.oData.meins_uoi  +'^FS' +
//	       '^FO'+iData.oData.margin3 +',260^A0N20,50^FD' + iData.oData.meins  +'^FS' +
//	       '^FO'+iData.oData.margin +',380^A0N20,50^FD' + iData.oData.hsdat +' - '+ iData.oData.vfdat +'^FS' +		   
//	       '^FO'+iData.oData.margin +',450^A0N20,50^FD' + iData.oData.matnr +'^FS' +
//	       '^FO'+iData.oData.margin +',520^A0N20,50^FD' + iData.oData.maktx3 +'^FS' +
//	       '^FO'+iData.oData.margin +',590^A0N20,50^FD' + iData.oData.maktx4  +'^FS' +
//	       '^FO'+iData.oData.margin +',660^A0N20,50^FD' + iData.oData.name2x1  +'^FS' +
//	       '^FO'+iData.oData.margin +',730^A0N20,50^FD' + iData.oData.name2x2  +'^FS' +
//	       '^FO'+iData.oData.margin +',450^A0N20,50^FD' + iData.oData.maktx5 +'^FS' +
//	       '^FO'+iData.oData.margin +',520^A0N20,50^FD' + iData.oData.maktx6 +'^FS' +
//	       '^FO'+iData.oData.margin +',590^A0N20,50^FD' + iData.oData.maktx7  +'^FS' +
//	       '^FO'+iData.oData.margin +',660^A0N20,50^FD' + iData.oData.name2x1  +'^FS' +
//	       '^FO'+iData.oData.margin +',730^A0N20,50^FD' + iData.oData.name2x2  +'^FS' +
//		   '^FO'+iData.oData.margin +',50^BQN,2,'+iData.oData.qrsize+'^FD '  +
//		   '|QID:'+iData.oData.qrcod+
//		   '|MAT:'+iData.oData.matnr+
//		   '|BAT:'+iData.oData.charg+
//		   '|UOM:'+iData.oData.meins+
//		   '|QTY:'+iData.oData.menge+
//		   '|SUN:'+iData.oData.lenum+
//		   '|TYP:'+iData.oData.type+
//		   '| ^FS' +
//		   '^XZ';

	},
	
	//^CHATUPOM TEST XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
	
	
	
	
	
	
	
	
	//--------------------------------------------------------------------------------
	//chkAmt
	//--------------------------------------------------------------------------------
	chkAmt: function(iAmt){
		if(parseFloat(iAmt)<0||iAmt==''){
			oCon.popMsgbox('Please enter valid amount');
			return false;
		}else{
			return true;
		};
		
	},
	//--------------------------------------------------------------------------------
	//isSelected
	//--------------------------------------------------------------------------------
	isSelected: function(iTbl){
		if(!oCon.getControl(iTbl).getSelectedItem()){
			oCon.popMsgbox('Please select an item');
			return false;
		}else{
			return true;
		};	
	},
	//--------------------------------------------------------------------------------
	//chkOrdAmt
	//--------------------------------------------------------------------------------
	chkOrdAmt: function(iAmt){
		if(parseFloat(iAmt)<=0){
			oCon.popMsgbox('Please enter amount');
			return false;
		}else{
			return true;
		};
		
	},
	//--------------------------------------------------------------------------------
	//getFocus
	//--------------------------------------------------------------------------------
	getFocus: function(iCon){
		jQuery.sap.delayedCall(500, this, function() {
			oCon.getControl(iCon).focus();	
		});
	},
	
	//--------------------------------------------------------------------------------
	//nav_to
	//--------------------------------------------------------------------------------
	nav_to: function(from,to,anm,evt){
		
		var iDx	 		= oNavArr.length;
		oNavArr[iDx]    = new Array(4);
		oNavArr[iDx][0] = from;	//From
		oNavArr[iDx][1] = to;	//To
		oNavArr[iDx][2] = anm;	//Animation
		oNavArr[iDx][3] = evt;	//SAP Event
		app.to(to,anm);
	},
	//--------------------------------------------------------------------------------
	//nav_back
	//--------------------------------------------------------------------------------
	nav_back: function(){
		
		var iDx	 		= oNavArr.length-1;
		var iTo			= oNavArr[iDx][0]; //From
		var iAnm		= oNavArr[iDx][2]; //Animation
		
		oNavArr.splice(iDx,1)
		app.to(iTo,iAnm);
	},
	//--------------------------------------------------------------------------------
	//nav_home
	//--------------------------------------------------------------------------------
	nav_home: function(){
		app.to(oCTX.oData.homemenu,'slide');
	},
	
	//--------------------------------------------------------------------------------
	//Add by Settha[SAP-User: SETTHSAE]
	//--------------------------------------------------------------------------------
	//// _S for Support Device Size S [width:360px]
	//--------------------------------------------------------------------------------
	//getForm_S
	//--------------------------------------------------------------------------------
	getForm_S: function(col){
		return new sap.ui.layout.form.SimpleForm({
			layout          : "ResponsiveGridLayout",
			//maxContainerCols: col,
			editable        : true,
//			breakpointL		: 500,
//			breakpointM		: 500,
			breakpointL		: 200,
			breakpointM		: 200,
			columnsL   		: col,
			columnsM   		: col,	
			//width			: '600px',
			//labelMinWidth	: 200,
		});
	},
	//getDialogDate_S
	//--------------------------------------------------------------------------------
	getDialogDate_S: function(id,ui5_evt,sap_evt){
		
//		var FrmDate = oCon.getForm(3);
		var FrmDate = oCon.getForm_S(1);
		var inpDate = oCon.getDatePicker(id+'inpDate');		
		inpDate.setValue(oCon.getDateIn(1));
			
		FrmDate.addContent(new sap.m.Label({text:'Date'}));
		FrmDate.addContent(inpDate);
		FrmDate.addContent(new sap.m.Label({text:'Shift'}));
		FrmDate.addContent(new sap.m.CheckBox({id:id+'chkShiftD',selected:true,text:"Day"}));
		FrmDate.addContent(new sap.m.CheckBox({id:id+'chkShiftN',selected:true,text:"Night",valueState:"Warning"}));
		
		var lblHeader 	= new sap.m.Label({text:"Process Order"});
		var btnClose	= new sap.m.Button({icon:"sap-icon://decline",press:function(){DiaDate.close();},});
		var btnApply	= new sap.m.Button({id:id+'btnApply',icon:"sap-icon://accept",text:'Apply',
							press:function(){
								oCon.ui5DispatchFcode(id+'btnApply');
								DiaDate.close();
								if(ui5_evt!=''&&sap_evt!='')
									oCon.ui5DispatchBackEnd(ui5_evt,sap_evt,"{i18n>MSG_PROCESS}");
							}});
//		if(sap.ui.Device.system.tablet && window.innerWidth < 400){
			lblHeader.addStyleClass("sapUiMediumMarginBegin");
			btnClose.addStyleClass("sapUiSmallMarginEnd");
			btnApply.addStyleClass("sapUiSmallMarginEnd");
//		};
		
		var DiaDate = new sap.m.Dialog({
			id				: id+'DiaDate',
			customHeader	: new sap.m.Bar({contentLeft:	[lblHeader],
				 				             contentMiddle:	[],
				 				             contentRight:	[btnClose],}),
			contentWidth	: '550px',	 				             
			beginButton		: btnApply,
		    content			: [FrmDate],
		});
		return DiaDate;
	},
	//checkErrSuc
	//--------------------------------------------------------------------------------
	checkErrSuc: function(oModela,typ){ 
		try
		{
			if(oModela.oData.logon.typ==typ){
				return true;
			};
			return false;
		}catch (err){
			return false;
		};
	},
	//popDialogErrSuc
	//--------------------------------------------------------------------------------
	popDialogErrSuc_S: function(id,ui5_evt,sap_evt){
		var DiaErrSucTitle	= new sap.m.Label({id:id+'DiaErrSucTitle',design:sap.m.LabelDesign.Bold,text:"CPF-SAP"});
   		
   		var DiaErrSucMsg	= new sap.m.Text({id:id+'DiaErrSucMsg',text:"{/logon/msg}"});
   		
   		var DiaErrSucFlexBox = new sap.m.VBox({
			items : [DiaErrSucMsg]
		});
   		
   		var DiaErrSucbtnOK	= new sap.m.Button({id:id+'DiaErrSucbtnOK',icon:"",text:'OK',
			press:function(){
				oCon.ui5DispatchFcode(id+'DiaErrSucbtnOK');
				DiaErrSuc.close();
				if(ui5_evt!=''&&sap_evt!='')
					oCon.ui5DispatchBackEnd(ui5_evt,sap_evt,"{i18n>MSG_PROCESS}");
			}});
   		
//   	if(sap.ui.Device.system.tablet && window.innerWidth < 400){
   			DiaErrSucMsg.addStyleClass("sapUiSmallMarginBegin");
   			DiaErrSucbtnOK.addStyleClass("sapUiSmallMarginEnd");
//		};
   		
   		var DiaErrSuc = new sap.m.Dialog({
			id				: id+'DiaErrSuc',
			customHeader	: new sap.m.Bar({contentLeft:	[],
				 				             contentMiddle:	[DiaErrSucTitle],
				 				             contentRight:	[],}),
			contentWidth	: '550px',
		    buttons			: [DiaErrSucbtnOK,],
		    content			: [DiaErrSucFlexBox],
		});
   		return DiaErrSuc;
	},

});	