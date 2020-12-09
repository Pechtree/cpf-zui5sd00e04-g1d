sap.ui.controller("zui5sd00e04.I.I200", {
	
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- I201
		if(fcode=='i201TblCnf'){//List RawMat
			oCon.ui5DispatchBackEnd("SAPEVT_I202","evt_i202","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- I202
		if(fcode=='i202btnSave'){
			oCon.ui5DispatchBackEnd("SAPEVT_I203","evt_i203","{i18n>MSG_PROCESS}");
		};
		if(fcode=='i202btnCan'){//Cancel Confirm In
			oCon.popConfirm('Do you want to cancel confirm in?','i202btnCan_ok','i202btnCan_no')
		};
		if(fcode=='i202btnCan_ok'){
			oCon.ui5DispatchBackEnd("SAPEVT_I204","evt_i204","{i18n>MSG_PROCESS}");
		};
		if(fcode=='i202btnOrd'){//Cancel Confirm Out - List Order
			oCon.ui5DispatchBackEnd("SAPEVT_I207","evt_i207","{i18n>MSG_PROCESS}");
		};
		if(fcode=='i202btnDel'){//Cancel Confirm Out
			oCon.popConfirm('Do you want to cancel confirm out?','i202btnDel_ok','i202btnDel_no')
		};
		if(fcode=='i202btnDel_ok'){
			oCon.ui5DispatchBackEnd("SAPEVT_I203","evt_i203","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- I203
		if(fcode=='i203btnCnf'){
			oCon.popConfirm('Do you want to cancel confirm out?','i203btnCnf_ok','i203btnCnf_no')
		};
		if(fcode=='i203btnCnf_ok'){//Cancel Confirm Out (Save)
			oCon.ui5DispatchBackEnd("SAPEVT_I205","evt_i205","{i18n>MSG_PROCESS}");
		};
		if(fcode=='i203btnCal'){ //Calculate Yield
						
			var vMenge100 = parseFloat(oCon.getControl('i203InpYieldF').getValue());
			var vMengePct = parseFloat(oCon.getControl('i203InpMenge').getValue());
			var vMengeSet = parseFloat(oCon.getControl('i203InpMengeCstF').getValue());
			var vMengeF   = 0;
			var vMengeN   = 0;
			
			//by Percent
			if(oCon.getControl('i203Selcal').getSelectedKey()=='P1'){
				vMengeF = (vMenge100 * vMengePct) / 100;
			}else if(oCon.getControl('i203Selcal').getSelectedKey()=='P3'){
				vMengeF = (vMenge100 / vMengeSet) * vMengePct;
			}else{
				vMengeF = oCon.getControl('i203InpMenge').getValue();
			};
			
//			if(vMengeF>=vMenge100){
//				oCon.popMsgbox('yield to new order cannot over or equal original yield'); return;
//			};
			if(vMengeF>vMenge100){
				oCon.popMsgbox('yield to new order cannot over original yield'); return;
			};
			
			vMengeN = vMenge100 - vMengeF;
			oCon.getControl('i203InpYieldT').setValue(oFmt.fmtAmt(vMengeF.toString()));
			oCon.getControl('i203InpYieldN').setValue(oFmt.fmtAmt(vMengeN.toString()));
			
			oCon.ui5DispatchBackEnd("SAPEVT_I208","evt_i208","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- I204
		if(fcode=='i204TblAuf'){//Cancel Confirm Out - Get Confirmation Detail
			oCon.ui5DispatchBackEnd("SAPEVT_I206","evt_i206","{i18n>MSG_PROCESS}"); //Cancel - Out
			oCon.getControl('i203InpMenge').setValue();
			oCon.getControl('i203InpYieldN').setValue();
			oCon.getControl('i203InpYieldT').setValue();
			oCon.getControl('i203Selcal').setSelectedKey('P3');
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_I201"){//List Confirm In
			return oParameters = { 
				"idate"   : oCon.getControl('i201inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('i201chkShiftD'),
				"iaprion" : oCon.getAbapTrue('i201chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_I202"){ //List RawMat
			return oParameters = { 
				"icnfnr" 	: oCon.getProperty('i201TblCnf','cnfnr'),
			};
		};
		
		if(fcode=="SAPEVT_I203"){ //Change Order
			return oParameters = { 
				"idate"   : oCon.getControl('i201inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('i201chkShiftD'),
				"iaprion" : oCon.getAbapTrue('i201chkShiftN'),
				"icnfnr"  : oCon.getProperty('i201TblCnf','cnfnr'),
			};
		};
		
		if(fcode=="SAPEVT_I204"){ //Cancel (Confirm In)
			return oParameters = { 
				"idate"   : oCon.getControl('i201inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('i201chkShiftD'),
				"iaprion" : oCon.getAbapTrue('i201chkShiftN'),
				"icnfnr"  : oCon.getProperty('i201TblCnf','cnfnr'),
			};
		};
		
		if(fcode=="SAPEVT_I205"){ //Cancel (Confirm Out)
			return oParameters = { 
				"icnfnr" 	: oCon.getProperty('i201TblCnf','cnfnr'),
				"iaufnr" 	: oCon.getControl('i203InpAufnrT').getValue(),
				"iyieldt" 	: oCon.getControl('i203InpYieldT').getValue(),
				"iyieldn" 	: oCon.getControl('i203InpYieldN').getValue(),
				"imenge"	: oCon.getControl('i203InpMenge').getValue(),
				"iyieldcal" : oCon.getControl('i203Selcal').getSelectedKey(),
			};
		};
		
		if(fcode=="SAPEVT_I206"){ //Cancel (Confirm Out) - Get Input
			return oParameters = { 
				"icnfnr" 	: oCon.getProperty('i201TblCnf','cnfnr'),
			};
		};
		
		if(fcode=="SAPEVT_I207"){ //Cancel (Confirm Out)  List Order
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i201TblCnf','aufnr'),
				"idate"   	: oCon.getControl('i204inpDate').getValue(),
				"iapriod" 	: oCon.getAbapTrue('i204chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('i204chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_I208"){ //Simulate Cancel to Other Order
			return oParameters = { 
				"icnfnr" 	: oCon.getProperty('i201TblCnf','cnfnr'),
				"iaufnr" 	: oCon.getControl('i203InpAufnrT').getValue(),
				"iyieldt" 	: oCon.getControl('i203InpYieldT').getValue(),
				"iyieldn" 	: oCon.getControl('i203InpYieldN').getValue(),
				"imenge"	: oCon.getControl('i203InpMenge').getValue(),
				"iyieldcal" : oCon.getControl('i203Selcal').getSelectedKey(),
			};
		};
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=='SAPEVT_I201'){ //Confirm in Header
			oCon.getControl('i201TblCnf').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I202'){ //Confirm in Rawmat
			oCon.getControl('i202TblBat').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I203'){ //Change Order
			if(oModela.oData.logon.typ=='S'){
				oCon.getControl('i201TblCnf').setModel(oModela);
				oCon.popMsgbox(oModela.oData.logon.msg);
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};
		
		if(fcode=='SAPEVT_I204'){ //Cancel (Confirm In)
			if(oModela.oData.logon.typ=='S'){
				oCon.getControl('i201TblCnf').setModel(oModela);
				oCon.popMsgbox(oModela.oData.logon.msg);
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};
		
		if(fcode=='SAPEVT_I205'){ //Cancel (Confirm Out)
			if(oModela.oData.logon.typ=='S'){
				oCon.getControl('i201TblCnf').setModel(oModela);
				oCon.popMsgbox(oModela.oData.logon.msg);
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};
		
		if(fcode=='SAPEVT_I206'){ //Cancel (Confirm Out) Get Detail
			oCon.getControl('i203InpAufnrF').setValue(oCon.getProperty('i201TblCnf','aufnr'));
			oCon.getControl('i203InpAufnrT').setValue(oCon.getProperty('i204TblAuf','aufnr'));
			oCon.getControl('i203InpMengeCstF').setValue(oCon.getProperty('i201TblCnf','menge_cst'));
			oCon.getControl('i203InpYieldF').setModel(oModela);
			oCon.getControl('i203TblBat').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I207'){ //Cancel (Confirm Out) List Order
			oCon.getControl('i204TblAuf').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_I208'){ //Cancel confirm to other - Simulate
			oCon.getControl('i203TblBat').setModel(oModela);
		};
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		if(fcode=="SAPEVT_I202"){ //List RawMat			
			if(oCon.getProperty('i201TblCnf','rueck')!='0000000000'&&oCon.getProperty('i201TblCnf','rueck')!=''){
				oCon.getControl('i202btnOrd').setVisible(true);
				oCon.getControl('i202btnDel').setVisible(true);
				oCon.getControl('i202btnCan').setVisible(false);
			}else{
				oCon.getControl('i202btnOrd').setVisible(false);
				oCon.getControl('i202btnDel').setVisible(false);
				oCon.getControl('i202btnCan').setVisible(true);
			};
		};
		

	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		

		if(fcode=="SAPEVT_I201")    {app.to('I201','slide');};
		if(fcode=="SAPEVT_I202")    {app.to('I202','slide');};
		if(fcode=="SAPEVT_I203")    {app.to('I201','slide');};
		if(fcode=="SAPEVT_I204")    {app.to('I201','slide');};
		if(fcode=="SAPEVT_I205")    {app.to('I201','slide');};
		if(fcode=="SAPEVT_I206")    {app.to('I203','slide');};
		if(fcode=="SAPEVT_I207")    {app.to('I204','slide');};
		
		if(fcode=='i201btnBck')		{oCon.nav_home();};
		if(fcode=='i202btnBck')		{app.to('I201','slide');};
		if(fcode=='i203btnBck')		{app.to('I204','slide');};
		if(fcode=='i204btnBck')		{app.to('I202','slide');};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
});