sap.ui.controller("zui5sd00e04.proc.A000", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
	
		
		//----------------------------------------------------------------------  Initial App
		if(fcode=="AFTER_RENDER"){ //Start Logon

			if((oCTX.oData.hybrid=='X')||(oCTX.oData.rendered==true)){ 	
				return;
			};
			
			oCTX.oData.rendered = true;
			oCTX.oData.session	= oCon.getURLParm('session');
			oCTX.oData.uuid		= oCon.getURLParm('uuid');
			oCTX.oData.regid	= oCon.getURLParm('regid');
			oCTX.oData.urlid	= oCon.getURLParm('urlid');
			oCTX.oData.uname	= oCon.getURLParm('uname');
			oCTX.oData.rfcdest	= oCon.getURLParm('rfc');
			
			if((oCTX.oData.uuid!=''))
				oCon.ui5DispatchBackEnd("SAPEVT_A103","evt_a103","{i18n>MSG_PROCESS}");
				
			if((oCTX.oData.session!=''))
				oCon.ui5DispatchBackEnd("SAPEVT_A104","evt_a104","{i18n>MSG_PROCESS}");
			
			oCon.getControl('a002InpHost').setValue(oCTX.oData.host);
		};
		
		if(fcode=='INITIALIZE'){//Initial Screen Value
			oCon.getControl('a002InpVname').setValue(oCon.ui5ReadUser())
		};
		
		//----------------------------------------------------------------------  A003 (Tile)
		if(fcode=='a003tilB000'){oCon.ui5DispatchBackEnd("SAPEVT_B201","evt_b201","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilB100'){oCon.ui5DispatchBackEnd("SAPEVT_B101","evt_b101","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilC100'){oCon.ui5DispatchBackEnd("SAPEVT_C105","evt_c105","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilC200'){oCon.ui5DispatchBackEnd("SAPEVT_C201","evt_c201","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilC103'){oCon.ui5DispatchBackEnd("SAPEVT_C103","evt_c103","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilC300'){oCon.ui5DispatchBackEnd("SAPEVT_C301","evt_c301","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilD400'){oCon.ui5DispatchBackEnd("SAPEVT_D411","evt_d411","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilD200'){oCon.ui5DispatchBackEnd("SAPEVT_D211","evt_d211","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilD104'){oCon.ui5DispatchBackEnd("SAPEVT_D104","evt_d104","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilD300'){oCon.ui5DispatchBackEnd("SAPEVT_D301","evt_d301","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilD500'){oCon.ui5DispatchBackEnd("SAPEVT_D501","evt_d501","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilD600'){oCon.ui5DispatchBackEnd("SAPEVT_D601","evt_d601","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilD700'){oCon.ui5DispatchBackEnd("SAPEVT_D701","evt_d701","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilD800'){oCon.ui5DispatchBackEnd("SAPEVT_D801","evt_d801","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilE100'){oCon.ui5DispatchBackEnd("SAPEVT_E101","evt_e101","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilE200'){oCon.ui5DispatchBackEnd("SAPEVT_E201","evt_e201","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilE300'){oCon.ui5DispatchBackEnd("SAPEVT_E311","evt_e311","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilE400'){oCon.ui5DispatchBackEnd("SAPEVT_E401","evt_e401","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilE500'){oCon.ui5DispatchBackEnd("SAPEVT_E501","evt_e501","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilE600'){oCon.ui5DispatchBackEnd("SAPEVT_E601","evt_e601","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilE700'){oCon.ui5DispatchBackEnd("SAPEVT_E701","evt_e701","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilE800'){oCon.ui5DispatchBackEnd("SAPEVT_E801","evt_e801","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilF000'){oCon.ui5DispatchBackEnd("SAPEVT_F001","evt_f001","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilG000'){oCon.ui5DispatchBackEnd("SAPEVT_G001","evt_g001","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilH000'){oCon.ui5DispatchBackEnd("SAPEVT_H001","evt_h001","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilH100'){oCon.ui5DispatchBackEnd("SAPEVT_H101","evt_h101","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilK000'){oCon.ui5DispatchBackEnd("SAPEVT_K001","evt_k001","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilI000'){oCon.ui5DispatchBackEnd("SAPEVT_L001","evt_l001","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilI100'){oCon.ui5DispatchBackEnd("SAPEVT_I101","evt_i101","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilI200'){oCon.ui5DispatchBackEnd("SAPEVT_I201","evt_i201","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilL000'){oCon.ui5DispatchBackEnd("SAPEVT_L001","evt_l001","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilL100'){oCon.ui5DispatchBackEnd("SAPEVT_L101","evt_l101","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilM001'){oCon.ui5DispatchBackEnd("SAPEVT_M001","evt_m001","{i18n>MSG_PROCESS}");}
		if(fcode=='a003tilM101'){oCon.ui5DispatchBackEnd("SAPEVT_M101","evt_m101","{i18n>MSG_PROCESS}");}
		
		//----------------------------------------------------------------------  A001 (List)
		if(fcode=='a001tilB000'){oCon.ui5DispatchBackEnd("SAPEVT_B201","evt_b201","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilB100'){oCon.ui5DispatchBackEnd("SAPEVT_B101","evt_b101","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilC100'){oCon.ui5DispatchBackEnd("SAPEVT_C105","evt_c105","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilC200'){oCon.ui5DispatchBackEnd("SAPEVT_C201","evt_c201","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilC103'){oCon.ui5DispatchBackEnd("SAPEVT_C103","evt_c103","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilC300'){oCon.ui5DispatchBackEnd("SAPEVT_C301","evt_c301","{i18n>MSG_PROCESS}");}
		//if(fcode=='a001tilD400'){oCon.ui5DispatchBackEnd("SAPEVT_D401","evt_d401","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilD400'){oCon.ui5DispatchBackEnd("SAPEVT_D411","evt_d411","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilD104'){oCon.ui5DispatchBackEnd("SAPEVT_D104","evt_d104","{i18n>MSG_PROCESS}");}
		//if(fcode=='a001tilD200'){oCon.ui5DispatchBackEnd("SAPEVT_D201","evt_d201","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilD200'){oCon.ui5DispatchBackEnd("SAPEVT_D211","evt_d211","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilD300'){oCon.ui5DispatchBackEnd("SAPEVT_D301","evt_d301","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilD500'){oCon.ui5DispatchBackEnd("SAPEVT_D501","evt_d501","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilD600'){oCon.ui5DispatchBackEnd("SAPEVT_D601","evt_d601","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilD700'){oCon.ui5DispatchBackEnd("SAPEVT_D701","evt_d701","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilE100'){oCon.ui5DispatchBackEnd("SAPEVT_E101","evt_e101","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilE200'){oCon.ui5DispatchBackEnd("SAPEVT_E201","evt_e201","{i18n>MSG_PROCESS}");}
		//if(fcode=='a001tilE300'){oCon.ui5DispatchBackEnd("SAPEVT_E301","evt_e301","{i18n>MSG_PROCESS}");}
		//if(fcode=='a001tilE300'){oCon.ui5DispatchBackEnd("SAPEVT_E310","evt_e310","{i18n>MSG_PROCESS}");}	//New// -- 06.11.2017
		if(fcode=='a001tilE300'){oCon.ui5DispatchBackEnd("SAPEVT_E311","evt_e311","{i18n>MSG_PROCESS}");}	// ++ 06.11.2017
		if(fcode=='a001tilE400'){oCon.ui5DispatchBackEnd("SAPEVT_E401","evt_e401","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilE500'){oCon.ui5DispatchBackEnd("SAPEVT_E501","evt_e501","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilE600'){oCon.ui5DispatchBackEnd("SAPEVT_E601","evt_e601","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilE700'){oCon.ui5DispatchBackEnd("SAPEVT_E701","evt_e701","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilE800'){oCon.ui5DispatchBackEnd("SAPEVT_E801","evt_e801","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilF000'){oCon.ui5DispatchBackEnd("SAPEVT_F001","evt_f001","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilG000'){oCon.ui5DispatchBackEnd("SAPEVT_G001","evt_g001","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilH000'){oCon.ui5DispatchBackEnd("SAPEVT_H001","evt_h001","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilH100'){oCon.ui5DispatchBackEnd("SAPEVT_H101","evt_h101","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilK000'){oCon.ui5DispatchBackEnd("SAPEVT_K001","evt_k001","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilI000'){oCon.ui5DispatchBackEnd("SAPEVT_I001","evt_i001","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilI100'){oCon.ui5DispatchBackEnd("SAPEVT_I101","evt_i101","{i18n>MSG_PROCESS}");}
		//if(fcode=='a001tilI200'){oCon.ui5DispatchBackEnd("SAPEVT_I201","evt_i201","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilI200'){oCon.ui5DispatchBackEnd("SAPEVT_I209","evt_i209","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilL000'){oCon.ui5DispatchBackEnd("SAPEVT_L001","evt_l001","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilL100'){oCon.ui5DispatchBackEnd("SAPEVT_L101","evt_l101","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilM001'){oCon.ui5DispatchBackEnd("SAPEVT_M001","evt_m001","{i18n>MSG_PROCESS}");}
		if(fcode=='a001tilM101'){oCon.ui5DispatchBackEnd("SAPEVT_M101","evt_m101","{i18n>MSG_PROCESS}");}
		
		//---------------------------------------------------------  A002 (User)
		if(fcode=='a002btnUCon'){
			//oWeight.dispatch('CLS');
			oCTX.oData.uname = oCon.getControl('a002InpVname').getValue();
			oCTX.oData.uuid  = oCon.getControl('a002InpUUID').getValue();
			oCon.ui5DispatchBackEnd("SAPEVT_A105","evt_a105","{i18n>MSG_PROCESS}");
			oCon.ui5SaveUser();
		};
		if(fcode=='a002SelVname'){
			oCon.getControl('a002InpVname').setValue(oCon.getControl('a002InpVname').getSelectedKey());
		};
		//---------------------------------------------------------  A002 (Bluetooth Printer)
		if(fcode=='a002btnBCon'){
			oPrint1.dispatch('CON');
		};
		if(fcode=='a002btnBSnd'){ //Test print QR via bluetooth
			oCTX.oData.qr_data = oCon.getControl("a002inpBData").getValue();
			oCTX.oData.qr_copy = 1;
			for(var i=0;i<oCTX.oData.qr_copy;i++){
				oPrint1.dispatch('SND');
			};
		};
		if(fcode=='a002btnBClr'){
			oCon.getControl('a002inpBData').setValue();
		};
		
		//---------------------------------------------------------  A002 (Netowrk Printer)
		if(fcode=='a002btnPCon'){
			oPrint2.dispatch('CON');
		};
		if(fcode=='a002btnPSnd'){
			oCTX.oData.qr_data  = oCon.getControl("a002inpPData").getValue();
			oPrint2.dispatch('SND');
		};
		if(fcode=='a002btnPDis'){
			oPrint2.dispatch('CLS');
		};
		if(fcode=='a002btnPRst'){
			oCon.getControl("a002inpPData").setValue('~JR');
			oCTX.oData.qr_data  = oCon.getControl("a002inpPData").getValue();
			oPrint2.dispatch('SND');
		};
		
		//---------------------------------------------------------  A002  (Weight)
		if(fcode=='a002btnWSnd'){
			oCTX.oData.wei_data  = oCon.getControl("a002inpWDataO").getValue();
			oWeight.dispatch('SND');
		};
		if(fcode=='a002btnWCon'){
			oWeight.dispatch('CON');
		};
		if(fcode=='a002btnWDis'){
			oWeight.dispatch('CLS');
		};
		
		//---------------------------------------------------------  Hardware
		if(fcode=='a002btnDef'){
			oCon.getControl("a002DiaHW").open();
		};
		if(fcode=='a002btnAcp'){
			oCon.getControl("a002DiaHW").close();
			oCon.ui5DispatchBackEnd("SAPEVT_A106","evt_a106","{i18n>MSG_PROCESS}");
		};
		if(fcode=='a002btnAcv'){
			oCon.getControl("a002DiaHW").close();
			oCon.ui5DispatchBackEnd("SAPEVT_A107","evt_a107","{i18n>MSG_PROCESS}");
		};

		//---------------------------------------------------------  A003
		if(fcode=="a001btnSet"){
			oCon.ui5DispatchBackEnd("SAPEVT_A101","evt_a101","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=="a003btnSet"){
			oCon.ui5DispatchBackEnd("SAPEVT_A101","evt_a101","{i18n>MSG_PROCESS}");
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_A101"){ //List User
			return oParameters = { 
				"uuid" 		: oCTX.oData.uuid,
			};
		};
		
		if(fcode=="SAPEVT_A103"){ //Login Device ID
			return oParameters = { 
				"uname" 	: oCTX.oData.uname,
				"regid" 	: oCTX.oData.regid,
				"urlid" 	: oCTX.oData.urlid,
				"uuid" 		: oCTX.oData.uuid,};
		};
		
		if(fcode=="SAPEVT_A105"){ //Direct Login Hybrid
			return oParameters = { 
				"uname" 	: oCTX.oData.uname,
				"regid" 	: oCTX.oData.regid,
				"urlid" 	: oCTX.oData.urlid,
				"uuid" 		: oCTX.oData.uuid,};
		};
		
		if(fcode=="SAPEVT_A106"||fcode=="SAPEVT_A107"){ //Switch H/W
			return oParameters = { 
				"idev_bth" 	: oCon.getControl('a002selBth').getSelectedKey(),
				"idev_prn" 	: oCon.getControl('a002selPrn').getSelectedKey(),
				"idev_wei" 	: oCon.getControl('a002selWei').getSelectedKey(),
				"idev_def"  : oCon.getControl('a002InpUPrint').getSelectedKey(),
			};
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=='SAPEVT_A101'){ //Load User List
			oCon.getControl('a002SelVname').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_A103'){ //Login Device ID
			if(oModela.oData.logon.typ=='S'){
				oApp.logon_PAI(fcode,oModela);
			}else{
			};
		};
		
		if(fcode=='SAPEVT_A104'){ //Login from Launchpad
			oApp.logon_PAI(fcode,oModela);
		};
		
		if(fcode=='SAPEVT_A105'){ //Login Hybrid
			if(oModela.oData.logon.typ=='S'){
				oApp.logon_PAI(fcode,oModela);
			}else{
			};
		};
		
		if(fcode=='SAPEVT_A106'||fcode=='SAPEVT_A107'){ //Switch H/W
			
			if(oCTX.oData.hybrid=='X'){
				oPrint1.dispatch('CLS');
				oWeight.dispatch('CLS');
			};
			
			oCon.getControl('a002InpWip').setModel(oModela);
			oCon.getControl('a002InpWPort').setModel(oModela);
			oCon.getControl('a002InpWRate').setModel(oModela);
			oCon.getControl('a002InpWTole').setModel(oModela);
			oCon.getControl('a002InpBMac').setModel(oModela);
			oCon.getControl('a002InpBMargin').setModel(oModela);
			oCon.getControl('a002InpBQrSize').setModel(oModela);
			oCon.getControl('a002InpPip').setModel(oModela);
			oCon.getControl('a002InpPPort').setModel(oModela);
			oCon.getControl('a002InpPMargin').setModel(oModela);
			oCon.getControl('a002InpPQrSize').setModel(oModela);
			oCon.getControl('a002InpBFont').setModel(oModela);
			oCon.getControl('a002InpPFont').setModel(oModela);
			
			//Hardware
			if(oCTX.oData.hybrid=='X'){
				oPrint1.dispatch('CON');
				oWeight.dispatch('CON');
			};
			
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		oCon.getControl('a002btnUCon').setVisible(oCTX.oData.hybridbool);
		oCon.getControl('a002InpUUID').setVisible(oCTX.oData.hybridbool);
		if(!oCTX.oData.hybridbool){
			oCon.getControl('a002SelVname').setVisible(false);
		}else{
			oCon.getControl('a002SelVname').setVisible(true);
		};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="a001btnSet")    {oCon.nav_to('A003','A002','slide','');};
		if(fcode=="a003btnSet")    {oCon.nav_to('A003','A002','slide','');};
		if(fcode=="a003btnLst")	   {oCon.nav_to('A003','A001','slide','');oCTX.oData.homemenu='A001';};
		//if(fcode=="a002btnBck")    {oCon.nav_back();};
		if(fcode=='a002btnBck')		{oCon.nav_home();};
		if(fcode=="a001btnBck")    {oCon.nav_back();oCTX.oData.homemenu='A003';};

	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
});