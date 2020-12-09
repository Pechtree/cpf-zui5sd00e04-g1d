sap.ui.controller("zui5sd00e04.E.E300", {
	
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- E301
		if(fcode=='e301btnAct'){ // Determine Batch
			oCon.ui5DispatchBackEnd("SAPEVT_E302","evt_e302","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- E302
		if(fcode=='e302btnAcp'){//Edit - OK
			oCon.getCell('e302TblIng',4).setText(oCon.fmtDec(oCon.getControl('e302inpOrder').getValue(),3));
		};
		
		if(fcode=='e302btnTog'){//Toggle SET or KG
			oCon.ui5DispatchBackEnd("SAPEVT_E303","evt_e303","{i18n>MSG_PROCESS}");
		}
		
		if(fcode=='e302btnAct'){
			oCon.ui5DispatchBackEnd("SAPEVT_E304","evt_e304","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- E303
		if(fcode=='e303btnAcp'){//Edit - OK
			oCon.getCell('e303TblIng',5).setText(oCon.fmtDec(oCon.getControl('e303inpOrder').getValue(),3));
		};
		
		if(fcode=='e303btnTog'){//Toggle SET or KG
			oCon.ui5DispatchBackEnd("SAPEVT_E302","evt_e302","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='e303btnAct'){
			oCon.ui5DispatchBackEnd("SAPEVT_E305","evt_e305","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- E304
		if(fcode=='e304btnBat'){
			oCon.ui5DispatchBackEnd("SAPEVT_E306","evt_e306","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- E305
		if(fcode=='e305btnBat'){
			oCon.ui5DispatchBackEnd("SAPEVT_E307","evt_e307","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- E306
		if(fcode=='e306btnSav'){
			oCon.popConfirm("Do you want to save?","e306btnSav_ok","e306btnSav_no");
		};
		if(fcode=='e306btnSav_ok'){
			oCon.ui5DispatchBackEnd("SAPEVT_E308","evt_e308","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- E307
		if(fcode=='e307btnSav'){
			oCon.popConfirm("Do you want to save?","e307btnSav_ok","e307btnSav_no");
		};
		if(fcode=='e307btnSav_ok'){
			oCon.ui5DispatchBackEnd("SAPEVT_E309","evt_e309","{i18n>MSG_PROCESS}");
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_E301"){//Date
			return oParameters = { 
				"idate"   : oCon.getControl('e301inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('e301chkShiftD'),
				"iaprion" : oCon.getAbapTrue('e301chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_E302"){ //List for Adjust (KG)
			return oParameters = { 
			    "idate"   	: oCon.getControl('e301inpDate').getValue(),
		    	"iapriod" 	: oCon.getAbapTrue('e301chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('e301chkShiftN'),
				"tfrnr"   	: oCon.arrListSelected('e301TblOvw','tfrnr'),
				"matnr_in"  : oCon.arrListSelected('e301TblOvw','matnr_in'),
			};
		};
		
		
		if(fcode=="SAPEVT_E303"){ //List for Adjust (SET)
			return oParameters = { 
			    "idate"   	: oCon.getControl('e301inpDate').getValue(),
		    	"iapriod" 	: oCon.getAbapTrue('e301chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('e301chkShiftN'),
				"tfrnr"   	: oCon.arrListSelected('e301TblOvw','tfrnr'),
				"matnr_in"  : oCon.arrListSelected('e301TblOvw','matnr_in'),
			};
		};
		
		if((fcode=="SAPEVT_E304")||(fcode=="SAPEVT_E306")||(fcode=="SAPEVT_E308")){ //List total for Adjust (KG)
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
		
		if((fcode=="SAPEVT_E305")||(fcode=="SAPEVT_E307")||(fcode=="SAPEVT_E309")){ //List total for Adjust (SET)
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
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=='SAPEVT_E301'){ //Ingredient Transfer Order Overview
			oCon.getControl('e301TblOvw').setModel(oModela);
		};

		if(fcode=='SAPEVT_E302'){ //Determine Process/Premix Order (KG)
			oCon.getControl('e302TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_E303'){ //Determine Process/Premix Order (SET)
			oCon.getControl('e303TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_E304'){ //Determine Process/Premix Order (KG)
			oCon.getControl('e304TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_E305'){ //Determine Process/Premix Order (SET)
			oCon.getControl('e305TblIng').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_E306'){ //Determine Batch (KG)
			oCon.getControl('e306TblBat').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_E307'){ //Determine Batch (SET)
			oCon.getControl('e307TblBat').setModel(oModela);
		};
		
		if((fcode=='SAPEVT_E308')||(fcode=='SAPEVT_E309')){ //Create Picking Order
			if(oModela.oData.logon.typ=='S'){
				oCon.popMsgbox(oModela.oData.logon.msg);
				oCon.getControl('e301TblOvw').setModel(oModela);
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
		
		if(fcode=='e301btnBck')		{oCon.nav_home();};
		if(fcode=='e302btnBck')		{app.to('E301','slide');};
		if(fcode=='e303btnBck')		{app.to('E301','slide');};
		if(fcode=='e304btnBck')		{app.to('E302','slide');};
		if(fcode=='e305btnBck')		{app.to('E303','slide');};
		if(fcode=='e306btnBck')		{app.to('E304','slide');};
		if(fcode=='e307btnBck')		{app.to('E305','slide');};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
});