sap.ui.controller("zui5sd00e04.proc.I200", {
	
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
		if(fcode=='i202btnEdt'){																							// ++ 2018.11.15 :: Confirmation Overview V1.3.0
			oCon.ui5DispatchBackEnd("SAPEVT_I211","evt_i211","{i18n>MSG_PROCESS}");
		};
		if(fcode=='i202btnEdtSave'){																						// ++ 2018.11.15 :: Confirmation Overview V1.3.0
			oCon.ui5DispatchBackEnd("SAPEVT_I212","evt_i212","{i18n>MSG_PROCESS}");
		};
		if(fcode=='i202btnEdtRfh'){																							// ++ 2018.11.28 :: Confirmation Overview V1.3.0
			oCon.ui5DispatchBackEnd("SAPEVT_I213","evt_i213","{i18n>MSG_PROCESS}");
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
		
		//----------------------------------------------------------- I205													// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		if(fcode=='i205TblAuf'){
			oCon.ui5DispatchBackEnd("SAPEVT_I210","evt_i210","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- I206													// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		if(fcode=='i206lstVornr'){
			oCon.getControl('i201inpDate').setValue(oCon.getControl('i205inpDate').getValue())								// ++ 2018.12.03 :: Confirmation Overview V1.3.0
			oCon.ui5DispatchBackEnd("SAPEVT_I201","evt_i201","{i18n>MSG_PROCESS}");
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
				"iaufnr"  : oCon.getProperty('i205TblAuf','aufnr'),															// ++ 2018.11.15 :: Confirmation Overview V1.3.0
				"ivornr"  : oCon.getProperty('i206lstVornr','vornr'),														// ++ 2018.11.15 :: Confirmation Overview V1.3.0
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
		
		//	List Process Order																								// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		if(fcode=="SAPEVT_I209"){ 
			return oParameters = { 
				"idate"   : oCon.getControl('i205inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('i205chkShiftD'),
				"iaprion" : oCon.getAbapTrue('i205chkShiftN'),
			};
		};
		
		//	List phase																										// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		if(fcode=="SAPEVT_I210"){ 
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i205TblAuf','aufnr'),
			};
		};
		
		//	Edit confirmation																								// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		if(fcode=="SAPEVT_I211"){ 
			return oParameters = { 
				"icnfnr" 	: oCon.getProperty('i201TblCnf','cnfnr'),
				"irueck" 	: oCon.getProperty('i201TblCnf','rueck'),
				"irmzhl" 	: oCon.getProperty('i201TblCnf','rmzhl'),
			};
		};
		
		//	Edit confirmation - Save																						// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		if(fcode=="SAPEVT_I212"){ 
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i201TblCnf','aufnr'),
				"ivornr" 	: oCon.getProperty('i201TblCnf','vornr'),														// ++ 2018.11.23 :: Confirmation Overview V1.3.0
				"icnfnr" 	: oCon.getProperty('i201TblCnf','cnfnr'),
				"irueck" 	: oCon.getProperty('i201TblCnf','rueck'),
				"irmzhl" 	: oCon.getProperty('i201TblCnf','rmzhl'),
				"ilmnga" 	: oCon.getControl('i202InpYield').getValue(),
				"imeinh" 	: oCon.getControl('i202InpMeins').getValue(),
				"iisdd" 	: oCon.getControl('i202InpSDate').getValue(),
				"iisdz" 	: oCon.getControl('i202InpSTime').getValue(),
				"iiedd" 	: oCon.getControl('i202InpFDate').getValue(),
				"iiedz" 	: oCon.getControl('i202InpFTime').getValue(),
				"ianzma" 	: oCon.getControl('i202InpAnzma').getValue(),
				"iism02" 	: oCon.getControl('i202InpMech1Q').getValue(),
				"iile02" 	: oCon.getControl('i202InpMech1U').getValue(),
				"iltxa1" 	: oCon.getProperty('i201TblCnf','charg'),
				"icharg" 	: oCon.getProperty('i201TblCnf','charg'),
				"iarbpl" 	: oCon.getControl('i202InpArbpl').getSelectedKey(),
				"iism01" 	: oCon.getControl('i202InpLaborQ').getValue(),													// ++ 2018.11.28 :: Confirmation Overview V1.3.0
				"iile01" 	: oCon.getControl('i202InpLaborU').getValue(),													// ++ 2018.11.28 :: Confirmation Overview V1.3.0
			};
		};
		
		//	Edit confirmation - Refresh																						// ++ 2018.11.28 :: Confirmation Overview V1.3.0
		if(fcode=="SAPEVT_I213"){ 
			return oParameters = { 
				"iaufnr" 	: oCon.getProperty('i201TblCnf','aufnr'),
				"ivornr" 	: oCon.getProperty('i201TblCnf','vornr'),
				"iisdd" 	: oCon.getControl('i202InpSDate').getValue(),
				"iisdz" 	: oCon.getControl('i202InpSTime').getValue(),
				"iiedd" 	: oCon.getControl('i202InpFDate').getValue(),
				"iiedz" 	: oCon.getControl('i202InpFTime').getValue(),
				"ianzma" 	: oCon.getControl('i202InpAnzma').getValue(),
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
		
		//	List Process Order																								// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		if(fcode=='SAPEVT_I209'){
			oCon.getControl('i205TblAuf').setModel(oModela);
		};
		
		//	List phase																										// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		if(fcode=='SAPEVT_I210'){
			oCon.getControl('i206lstVornr').setModel(oModela);
		};
		
		//	Edit confirmation																								// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		if(fcode=="SAPEVT_I211"){ 
			oCon.getControl('i202InpYield').setModel(oModela);
			oCon.getControl('i202InpMeins').setModel(oModela);
			oCon.getControl('i202InpYield').setModel(oModela);
			oCon.getControl('i202InpAnzma').setModel(oModela);
			oCon.getControl('i202InpMech1Q').setModel(oModela);
			oCon.getControl('i202InpMech1U').setModel(oModela);
			oCon.getControl('i202InpArbpl').setModel(oModela);
			oCon.getControl('i202InpLaborQ').setModel(oModela);																// ++ 2018.11.28 :: Confirmation Overview V1.3.0
			oCon.getControl('i202InpLaborU').setModel(oModela);																// ++ 2018.11.28 :: Confirmation Overview V1.3.0
			
			oCon.getControl('i202InpSDate').setValue(oModela.oData.t_i_pcicnf[0].isdd);
			oCon.getControl('i202InpSTime').setValue(oModela.oData.t_i_pcicnf[0].isdz);
			oCon.getControl('i202InpFDate').setValue(oModela.oData.t_i_pcicnf[0].iedd);
			oCon.getControl('i202InpFTime').setValue(oModela.oData.t_i_pcicnf[0].iedz);
		};
		
		//	Edit confirmation - Refresh																						// ++ 2018.11.28 :: Confirmation Overview V1.3.0
		if(fcode=="SAPEVT_I213"){ 
			oCon.getControl('i202InpLaborQ').setModel(oModela);
			oCon.getControl('i202InpMech1Q').setModel(oModela);
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
				oCon.getControl('i202btnEdt').setVisible(true);
			}else{
				oCon.getControl('i202btnOrd').setVisible(false);
				oCon.getControl('i202btnDel').setVisible(false);
				oCon.getControl('i202btnCan').setVisible(true);
				oCon.getControl('i202btnEdt').setVisible(false);
			};
		};
		
		//	Edit confirmation																								// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		if(fcode=="SAPEVT_I211"){ 
			oCon.getControl('i202DiaEdt').open();
		};
		
		//	Edit confirmation - Save																						// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		if(fcode=="SAPEVT_I212"){ 
			if (oModela.oData.logon.typ=='S') {
				oCon.getControl('i202DiaEdt').close();
				oCon.popMsgbox(oModela.oData.logon.msg);
				app.to('I205','slide');
			} else {
				oCTX.oData.cancel_nav = true;			
			}
		};
		
		if(fcode=='SAPEVT_I201'){ 																							// ++ 2018.11.05 :: Confirmation Overview V1.3.0
			oCon.sortTable('i201TblCnf','charg')
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
		if(fcode=="SAPEVT_I209")    {app.to('I205','slide');};																// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		if(fcode=="SAPEVT_I210")    {app.to('I206','slide');};																// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		
		if(fcode=='i201btnBck')		{app.to('I206','slide');};																// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		//if(fcode=='i201btnBck')	{oCon.nav_home();};																		// -- 2018.11.15 :: Confirmation Overview V1.3.0
		if(fcode=='i202btnBck')		{app.to('I201','slide');};
		if(fcode=='i203btnBck')		{app.to('I204','slide');};
		if(fcode=='i204btnBck')		{app.to('I202','slide');};	
		if(fcode=='i205btnBck')		{oCon.nav_home();};																		// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		if(fcode=='i206btnBck')		{app.to('I205','slide');};																// ++ 2018.11.15 :: Confirmation Overview V1.3.0
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
});