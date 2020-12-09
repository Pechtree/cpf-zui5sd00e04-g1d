sap.ui.controller("zui5sd00e04.proc.E300", {
	
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	
	M01_FCD: function(fcode,oModela){
		
	//----------------------------------------------------------- E301 :: List Transfer Order
		
		// Determine Batch - New
		if(fcode=='e301btnAct'){ 
			if(!oCon.isSelected('e301TblOvw')){return;};						   											// ++ 2018.01.04 
			//oCon.ui5DispatchBackEnd("SAPEVT_E302","evt_e302","{i18n>MSG_PROCESS}");										// -- 06.11.2017
			oCon.ui5DispatchBackEnd("SAPEVT_E312","evt_e312","{i18n>MSG_PROCESS}");											// ++ 06.11.2017
		};
		
	//----------------------------------------------------------- E302 :: List Material in Transfer Order [KG]
		// Edit - OK
		if(fcode=='e302btnAcp'){
			oCon.getCell('e302TblIng',4).setText(oCon.fmtDec(oCon.getControl('e302inpOrder').getValue(),3));
		};
		
		// Toggle SET or KG		
		if(fcode=='e302btnTog'){
			//oCon.ui5DispatchBackEnd("SAPEVT_E303","evt_e303","{i18n>MSG_PROCESS}");										// -- 06.11.2017
			oCon.ui5DispatchBackEnd("SAPEVT_E313","evt_e313","{i18n>MSG_PROCESS}");											// ++ 06.11.2017
		}
		
		if(fcode=='e302btnAct'){
			//oCon.ui5DispatchBackEnd("SAPEVT_E304","evt_e304","{i18n>MSG_PROCESS}");										// -- 06.11.2017
			//oCon.ui5DispatchBackEnd("SAPEVT_E314","evt_e314","{i18n>MSG_PROCESS}");										// ++ 06.11.2017
			//oCon.ui5DispatchBackEnd("SAPEVT_E318","evt_e318","{i18n>MSG_PROCESS}");										// ++ 12.12.2017
			oCon.popConfirm("Do you want to save?","e306btnSav_ok","e316btnSav_no");										// ++ 12.12.2017
		};
		
	//----------------------------------------------------------- E303 :: List Material in Transfer Order [SET]
		
		// Edit
		if(fcode=='e303TblIng_edt'){
			oCon.getControl('e303inpOrder').setValue(oCon.getProperty('e303TblIng','menge_ist13_6'));						// ++ 2018.12.14 :: Picking Order - Multiple V1.6.0
			//oCon.getControl('e303inpOrder').setValue(oCon.getProperty('e303TblIng','menge_ist'));							// -- 2018.12.14 :: Picking Order - Multiple V1.6.0
			oCon.getControl('e303DiaEdt').open();
		};		
		
		// Edit - OK
		if(fcode=='e303btnAcp'){
			oCon.getCell('e303TblIng',5).setText(oCon.fmtDec(oCon.getControl('e303inpOrder').getValue(),6));				// ++ 2018.12.14 :: Picking Order - Multiple V1.6.0
			//oCon.getCell('e303TblIng',5).setText(oCon.fmtDec(oCon.getControl('e303inpOrder').getValue(),3));				// -- 2018.12.14 :: Picking Order - Multiple V1.6.0
		};
		
		// Toggle SET or KG
		if(fcode=='e303btnTog'){
			//oCon.ui5DispatchBackEnd("SAPEVT_E302","evt_e302","{i18n>MSG_PROCESS}");										// -- 06.11.2017
			oCon.ui5DispatchBackEnd("SAPEVT_E312","evt_e312","{i18n>MSG_PROCESS}");											// ++ 06.11.2017
		}; 
		
		if(fcode=='e303btnAct'){
			//oCon.ui5DispatchBackEnd("SAPEVT_E305","evt_e305","{i18n>MSG_PROCESS}");										// -- 06.11.2017
			//oCon.ui5DispatchBackEnd("SAPEVT_E315","evt_e315","{i18n>MSG_PROCESS}");										// ++ 06.11.2017 // -- 06.02.2018
			oCon.popConfirm("Do you want to save?","e307btnSav_ok","e317btnSav_no");										// ++ 06.02.2018
		};
		
	//----------------------------------------------------------- E304
		if(fcode=='e304btnBat'){
			//oCon.ui5DispatchBackEnd("SAPEVT_E306","evt_e306","{i18n>MSG_PROCESS}");										// -- 06.11.2017
			oCon.ui5DispatchBackEnd("SAPEVT_E316","evt_e316","{i18n>MSG_PROCESS}");											// ++ 06.11.2017
		};
		
	//----------------------------------------------------------- E305
		if(fcode=='e305btnBat'){
			//oCon.ui5DispatchBackEnd("SAPEVT_E307","evt_e307","{i18n>MSG_PROCESS}");										// -- 06.11.2017
			oCon.ui5DispatchBackEnd("SAPEVT_E317","evt_e317","{i18n>MSG_PROCESS}");											// ++ 06.11.2017
		};
		
	//----------------------------------------------------------- E306
		if(fcode=='e306btnSav'){
			//oCon.popConfirm("Do you want to save?","e306btnSav_ok","e306btnSav_no");										// -- 06.11.2017
			oCon.popConfirm("Do you want to save?","e306btnSav_ok","e316btnSav_no");										// ++ 06.11.2017
		};
		
		if(fcode=='e306btnSav_ok'){
			//oCon.ui5DispatchBackEnd("SAPEVT_E308","evt_e308","{i18n>MSG_PROCESS}"); 										// -- 06.11.2017
			oCon.ui5DispatchBackEnd("SAPEVT_E318","evt_e318","{i18n>MSG_PROCESS}"); 										// ++ 06.11.2017
		};
		
	//----------------------------------------------------------- E307 
		if(fcode=='e307btnSav'){
			oCon.popConfirm("Do you want to save?","e307btnSav_ok","e307btnSav_no");
		};
		if(fcode=='e307btnSav_ok'){
			//oCon.ui5DispatchBackEnd("SAPEVT_E309","evt_e309","{i18n>MSG_PROCESS}");										// -- 06.11.2017
			oCon.ui5DispatchBackEnd("SAPEVT_E319","evt_e319","{i18n>MSG_PROCESS}");											// ++ 06.11.2017
		};
		
	//----------------------------------------------------------- E308 														// ++ 19.12.2017
		if(fcode=='e308btnBck'){													
			oCon.ui5DispatchBackEnd("SAPEVT_E311","evt_e311","{i18n>MSG_PROCESS}");	
		};
		
	},
	
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	
	M02_PAR: function(fcode,oModela){
		
	//	Date
		if(fcode=="SAPEVT_E301"){
			return oParameters = { 
				"idate"   : oCon.getControl('e301inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('e301chkShiftD'),
				"iaprion" : oCon.getAbapTrue('e301chkShiftN'),
			};
		};
		
	//	List for Adjust (KG)
		if(fcode=="SAPEVT_E302"){ 
			return oParameters = { 
			    "idate"   	: oCon.getControl('e301inpDate').getValue(),
		    	"iapriod" 	: oCon.getAbapTrue('e301chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('e301chkShiftN'),
				"tfrnr"   	: oCon.arrListSelected('e301TblOvw','tfrnr'),
				"matnr_in"  : oCon.arrListSelected('e301TblOvw','matnr_in'),
			};
		};
		
	//	List for Adjust (SET)	
		if(fcode=="SAPEVT_E303"){ 
			return oParameters = { 
			    "idate"   	: oCon.getControl('e301inpDate').getValue(),
		    	"iapriod" 	: oCon.getAbapTrue('e301chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('e301chkShiftN'),
				"tfrnr"   	: oCon.arrListSelected('e301TblOvw','tfrnr'),
				"matnr_in"  : oCon.arrListSelected('e301TblOvw','matnr_in'),
			};
		};
	
	//	List total for Adjust (KG)
		if((fcode=="SAPEVT_E304")||(fcode=="SAPEVT_E306")||(fcode=="SAPEVT_E308")){ 
			return oParameters = { 
			    "idate"   	: oCon.getControl('e301inpDate').getValue(),
		    	"iapriod" 	: oCon.getAbapTrue('e301chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('e301chkShiftN'),
				"tfrnr"   	: oCon.arrListItemsNoBlank('e302TblIng','tfrnr','menge_ipk'),
				"matnr_in"  : oCon.arrListItemsNoBlank('e302TblIng','matnr_in','menge_ipk'),
				"menge_ipk" : oCon.arrListItemsNoBlank('e302TblIng','menge_ipk','menge_ipk'),
				"meins_pk" : oCon.arrListItemsNoBlank('e302TblIng','meins_pk','menge_ipk'),
			};
		};
		
	//	List total for Adjust (SET)
		if((fcode=="SAPEVT_E305")||(fcode=="SAPEVT_E307")||(fcode=="SAPEVT_E309")){ 
			return oParameters = { 
			    "idate"   	: oCon.getControl('e301inpDate').getValue(),
		    	"iapriod" 	: oCon.getAbapTrue('e301chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('e301chkShiftN'),
				"tfrnr"   	: oCon.arrListItemsNoBlank('e303TblIng','tfrnr','menge_ist'),
				"matnr_in"  : oCon.arrListItemsNoBlank('e303TblIng','matnr_in','menge_ist'),
				"menge_pkg" : oCon.arrListItemsNoBlank('e303TblIng','menge_pkg','menge_ist'),
				"menge_ist" : oCon.arrListItemsNoBlank('e303TblIng','menge_ist','menge_ist'),
				"meins_pk"  : oCon.arrListItemsNoBlank('e302TblIng','meins_pk','menge_ipk'),
				"meins_kg"  : oCon.arrListItemsNoBlank('e303TblIng','meins_kg','menge_ist'),
			};
		};
		
	//	Date																												// ++ 07.11.2017
		if(fcode=="SAPEVT_E311"){										
			return oParameters = {
				"idate"   : oCon.getControl('e301inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('e301chkShiftD'),
				"iaprion" : oCon.getAbapTrue('e301chkShiftN'),
			};
		};
		
	//	List for Adjust (KG)																								// ++ 07.11.2017
		if(fcode=="SAPEVT_E312"){ 
			return oParameters = { 
			    "idate"   	: oCon.getControl('e301inpDate').getValue(),
		    	"iapriod" 	: oCon.getAbapTrue('e301chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('e301chkShiftN'),
				"tfrnr"   	: oCon.arrListSelected('e301TblOvw','tfrnr'),
				"matnr_in"  : oCon.arrListSelected('e301TblOvw','matnr_in'),
			};
		};
		
	//	List for Adjust (SET)																								// ++ 07.11.2017		
		if(fcode=="SAPEVT_E313"){ 
			return oParameters = {
			    "idate"   	: oCon.getControl('e301inpDate').getValue(),
		    	"iapriod" 	: oCon.getAbapTrue('e301chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('e301chkShiftN'),
				"tfrnr"   	: oCon.arrListSelected('e301TblOvw','tfrnr'),
				"matnr_in"  : oCon.arrListSelected('e301TblOvw','matnr_in'),
			};
		};
		
	//	List total for Adjust (KG)																							// ++ 07.11.2017		
		if((fcode=="SAPEVT_E314")||(fcode=="SAPEVT_E316")||(fcode=="SAPEVT_E318")){ 
			return oParameters = {
			    "idate"   	: oCon.getControl('e301inpDate').getValue(),
		    	"iapriod" 	: oCon.getAbapTrue('e301chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('e301chkShiftN'),
				"tfrnr"   	: oCon.arrListItemsNoBlank('e302TblIng','tfrnr','menge_ipk'),
				"matnr_in"  : oCon.arrListItemsNoBlank('e302TblIng','matnr_in','menge_ipk'),
				"menge_ipk" : oCon.arrListItemsNoBlank('e302TblIng','menge_ipk','menge_ipk'),
				"meins_pk" : oCon.arrListItemsNoBlank('e302TblIng','meins_pk','menge_ipk'),
			};
		};
		
	//	List total for Adjust (SET)																							// ++ 07.11.2017		
		if((fcode=="SAPEVT_E315")||(fcode=="SAPEVT_E317")||(fcode=="SAPEVT_E319")){ 
			return oParameters = {
			    "idate"   	: oCon.getControl('e301inpDate').getValue(),
		    	"iapriod" 	: oCon.getAbapTrue('e301chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('e301chkShiftN'),
				"tfrnr"   	: oCon.arrListItemsNoBlank('e303TblIng','tfrnr','menge_ist13_6'),								// ++ 2018.12.14 :: Picking Order - Multiple V1.6.0
				"matnr_in"  : oCon.arrListItemsNoBlank('e303TblIng','matnr_in','menge_ist13_6'),							// ++ 2018.12.14 :: Picking Order - Multiple V1.6.0
				"menge_pkg" : oCon.arrListItemsNoBlank('e303TblIng','menge_pkg13_6','menge_ist13_6'),						// ++ 2018.12.14 :: Picking Order - Multiple V1.6.0
				"menge_ist" : oCon.arrListItemsNoBlank('e303TblIng','menge_ist13_6','menge_ist13_6'),						// ++ 2018.12.14 :: Picking Order - Multiple V1.6.0
				"meins_pk"  : oCon.arrListItemsNoBlank('e302TblIng','meins_pk','menge_ipk'),								// ++ 2018.12.14 :: Picking Order - Multiple V1.6.0
				"meins_kg"  : oCon.arrListItemsNoBlank('e303TblIng','meins_kg','menge_ist13_6'),							// ++ 2018.12.14 :: Picking Order - Multiple V1.6.0
				//"tfrnr"   	: oCon.arrListItemsNoBlank('e303TblIng','tfrnr','menge_ist'),								// -- 2018.12.14 :: Picking Order - Multiple V1.6.0
				//"matnr_in"  : oCon.arrListItemsNoBlank('e303TblIng','matnr_in','menge_ist'),								// -- 2018.12.14 :: Picking Order - Multiple V1.6.0
				//"menge_pkg" : oCon.arrListItemsNoBlank('e303TblIng','menge_pkg','menge_ist'),								// -- 2018.12.14 :: Picking Order - Multiple V1.6.0
				//"menge_ist" : oCon.arrListItemsNoBlank('e303TblIng','menge_ist','menge_ist'),								// -- 2018.12.14 :: Picking Order - Multiple V1.6.0
				//"meins_kg"  : oCon.arrListItemsNoBlank('e303TblIng','meins_kg','menge_ist'),								// -- 2018.12.14 :: Picking Order - Multiple V1.6.0
			};
		};
		
	},
	
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	
	M03_MOD: function(fcode,oModela){
		
	//	Ingredient Transfer Order Overview
		if(fcode=='SAPEVT_E301'){ 
			oCon.getControl('e301TblOvw').setModel(oModela);
		};
	
	//	Determine Process/Premix Order (KG)																					// ++ 06.11.2017
		if(fcode=='SAPEVT_E302'){ 
			oCon.getControl('e302TblIng').setModel(oModela);
		};
	
	//	Determine Process/Premix Order (SET)	
		if(fcode=='SAPEVT_E303'){ 
			oCon.getControl('e303TblIng').setModel(oModela);
		};
	
	//	Determine Process/Premix Order (KG)
		if(fcode=='SAPEVT_E304'){ 
			oCon.getControl('e304TblIng').setModel(oModela);
		};
		
	//	Determine Process/Premix Order (SET)
		if(fcode=='SAPEVT_E305'){ 
			oCon.getControl('e305TblIng').setModel(oModela);
		};
		
	//	Determine Batch (KG)
		if(fcode=='SAPEVT_E306'){ 
			oCon.getControl('e306TblBat').setModel(oModela);
		};

	//	Determine Batch (SET)
		if(fcode=='SAPEVT_E307'){ 
			oCon.getControl('e307TblBat').setModel(oModela);
		};
	
	//	Create Picking Order																								// ++ 06.11.2017
		if((fcode=='SAPEVT_E308')||(fcode=='SAPEVT_E309')){ 
			if(oModela.oData.logon.typ=='S'){
				oCon.popMsgbox(oModela.oData.logon.msg);
				oCon.getControl('e301TblOvw').setModel(oModela);
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};
		
	//	Ingredient Transfer Order Overview																					// ++ 06.11.2017
		if(fcode=='SAPEVT_E311'){ 
			oCon.getControl('e301TblOvw').setModel(oModela);
		};

	//	Determine Process/Premix Order (KG)																					// ++ 06.11.2017
		if(fcode=='SAPEVT_E312'){ 			
			if(oModela.oData.logon.typ!='E'){																				// ++ 22.12.2017
				oCon.getControl('e302TblIng').setModel(oModela);															
				app.to('E302','slide');																						 
			};
		};
		
	//	Determine Process/Premix Order (SET)																				// ++ 06.11.2017
		if(fcode=='SAPEVT_E313'){ 
			oCon.getControl('e303TblIng').setModel(oModela);
		};
		
	//	Determine Process/Premix Order (KG)																					// ++ 06.11.2017
		if(fcode=='SAPEVT_E314'){ 
			oCon.getControl('e304TblIng').setModel(oModela);
		};
		
	//	Determine Process/Premix Order (SET)																				// ++ 06.11.2017
		if(fcode=='SAPEVT_E315'){ 
			oCon.getControl('e305TblIng').setModel(oModela);
		};
		
	//	Determine Batch (KG)																								// ++ 06.11.2017
		if(fcode=='SAPEVT_E316'){ 
			oCon.getControl('e306TblBat').setModel(oModela);
		};

	//	Determine Batch (SET)																								// ++ 06.11.2017
		if(fcode=='SAPEVT_E317'){ 
			oCon.getControl('e307TblBat').setModel(oModela);
		};
	
	//	Create Picking Order																								// ++ 06.11.2017
		if((fcode=='SAPEVT_E318')||(fcode=='SAPEVT_E319')){
			if(oModela.oData.logon.typ=='S'){
				for (var i = oModela.oData.return.length-1; i >= 0; i--) {
					oCon.popMsgbox(oModela.oData.return[i].msg);
				}
				oCon.getControl('e308TblOvw').setModel(oModela); 
			}else{
				oCTX.oData.cancel_nav = true;
			};
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

		if(fcode=="SAPEVT_E301")    {app.to('E301','slide');};
		if(fcode=="SAPEVT_E302")    {app.to('E302','slide');};
		if(fcode=="SAPEVT_E303")    {app.to('E303','slide');};
		if(fcode=="SAPEVT_E304")    {app.to('E304','slide');};
		if(fcode=="SAPEVT_E305")    {app.to('E305','slide');};
		if(fcode=="SAPEVT_E306")    {app.to('E306','slide');};
		if(fcode=="SAPEVT_E307")    {app.to('E307','slide');};
		if(fcode=="SAPEVT_E308")    {app.to('E301','slide');};
		if(fcode=="SAPEVT_E309")    {app.to('E301','slide');};
		//if(fcode=="SAPEVT_E310")    {app.to('E301','slide');};

		
		//New Event [Picking Dummy]								 															// ++ 06.11.2017
		if(fcode=="SAPEVT_E311")    {app.to('E301','slide');};
		//if(fcode=="SAPEVT_E312")    {app.to('E302','slide');};
		if(fcode=="SAPEVT_E313")    {app.to('E303','slide');};
		if(fcode=="SAPEVT_E314")    {app.to('E304','slide');};
		if(fcode=="SAPEVT_E315")    {app.to('E305','slide');};
		if(fcode=="SAPEVT_E316")    {app.to('E306','slide');};
		if(fcode=="SAPEVT_E317")    {app.to('E307','slide');};
		if(fcode=="SAPEVT_E318")    {app.to('E308','slide');}; 
		if(fcode=="SAPEVT_E319")    {app.to('E308','slide');};
		
		
		if(fcode=='e301btnBck')		{oCon.nav_home();};
		if(fcode=='e302btnBck')		{app.to('E301','slide');};
		if(fcode=='e303btnBck')		{app.to('E301','slide');};
		if(fcode=='e304btnBck')		{app.to('E302','slide');};
		if(fcode=='e305btnBck')		{app.to('E303','slide');};
		if(fcode=='e306btnBck')		{app.to('E304','slide');};
		if(fcode=='e307btnBck')		{app.to('E305','slide');};
		if(fcode=='e308btnHom')		{oCon.nav_home();};
	},
	
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	
	M06_NEX: function(fcode,oModela){
		
	},
	
});