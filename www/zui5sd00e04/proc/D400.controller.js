sap.ui.controller("zui5sd00e04.proc.D400", {
	//--------------------------------------------------------------------------------	
	//PAI FCODE 
	//--------------------------------------------------------------------------------	
	M01_FCD: function(fcode,oModela){
		
		//----------------------------------------------------------- D401	
		if(fcode=='d401btnAct'){
			if(!oCon.isSelected('d401TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_D402","evt_d402","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- D402	
		if(fcode=='d402btnAcp'){//Edit - OK
			oCon.getCell('d402TblOvw',6).setText(oCon.fmtDec(oCon.getControl('d402inpOrder').getValue(),3));
			oCon.getControl('d402DiaEdt').close();
		};
		
		if(fcode=='d402btnAct'){
			oCon.ui5DispatchBackEnd("SAPEVT_D403","evt_d403","{i18n>MSG_PROCESS}");
		};
		
		if(fcode=='d402btnDis'){//Display Premix & Ingredient
			if(!oCon.isSelected('d402TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_D406","evt_d406","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- D403
		if(fcode=='d403btnSum'){
			oCon.ui5DispatchBackEnd("SAPEVT_D404","evt_d404","{i18n>MSG_PROCESS}");
		};
		if(fcode=='d403btnAcp'){//Edit - OK
			oCon.getCell('d403TblPmx',4).setText(oCon.fmtDec(oCon.getControl('d403inpOrder').getValue(),3));
			oCon.getControl('d403DiaEdt').close();
		};
		
		//----------------------------------------------------------- D404
		if(fcode=='d404btnSav'){
			oCon.popConfirm('Do you want to save?','d404btnSav_ok','d404btnSav_no');
		};
		
		if(fcode=='d404btnSav_ok'){
			oCon.ui5DispatchBackEnd("SAPEVT_D405","evt_d405","{i18n>MSG_PROCESS}");
		};
		if(fcode=='d404btnAcp'){//Edit - OK
			oCon.getCell('d404TblPmx',4).setText(oCon.fmtDec(oCon.getControl('d404inpOrder').getValue(),3));
			oCon.getControl('d404DiaEdt').close();
		};

		
		//----------------------------------------------------------- D405
		if(fcode=='d405btnEdt'){
			if(!oCon.isSelected('d405TblOvw')){return;};
			oCon.ui5DispatchBackEnd("SAPEVT_D407","evt_d407","{i18n>MSG_PROCESS}");
		};
		if(fcode=='d405btnDel'){
			if(!oCon.isSelected('d405TblOvw')){return;};
			oCon.popConfirm('Do you want to delete ingredient?','d405btnDel_ok','d405btnDel_no');
		};
		if(fcode=='d405btnDel_ok'){
			oCon.ui5DispatchBackEnd("SAPEVT_D409","evt_d409","{i18n>MSG_PROCESS}");
		};
		
		//----------------------------------------------------------- D406
		if(fcode=='d406btnSav'){
			
		};
		
		if(fcode=='d406btnSav'){//Save Alt.BOM
			if(!oCon.getControl('d406TblBom').getSelectedItem()){
				oCon.popMsgbox('Please select Alt.BOM')
			}else{
				var vMsg 	= 'Do you want save Alt.BOM '+oCon.getProperty('d406TblBom','stlal')+' ?';
				oCon.popConfirm(vMsg,'d406btnSav_ok','d406btnSav_no');
			};
		};
		if(fcode=='d406btnSav_ok'){//Save Alt.BOM - OK
			oCon.ui5DispatchBackEnd("SAPEVT_D408","evt_d408","{i18n>MSG_PROCESS}");
		};
		
		
	},
	//--------------------------------------------------------------------------------	
	//Parameters 
	//--------------------------------------------------------------------------------
	M02_PAR: function(fcode,oModela){
		
		if(fcode=="SAPEVT_D401"){//PREMIX Order List
			return oParameters = { 
				"idate"   : oCon.getControl('d401inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('d401chkShiftD'),
				"iaprion" : oCon.getAbapTrue('d401chkShiftN'),
			};
		};
		
		if(fcode=="SAPEVT_D402"){//Selected PREMIX Order List
			return oParameters = { 
				"idate"   : oCon.getControl('d401inpDate').getValue(),
				"iapriod" : oCon.getAbapTrue('d401chkShiftD'),
				"iaprion" : oCon.getAbapTrue('d401chkShiftN'),
				"pmxnr"   : oCon.arrListSelected('d401TblOvw','pmxnr'),
			};
		};
		
		if(fcode=="SAPEVT_D403"){//List Premix VS Ingredient
			return oParameters = { 
				"idate"   	: oCon.getControl('d401inpDate').getValue(),
				"iapriod" 	: oCon.getAbapTrue('d401chkShiftD'),
				"iaprion" 	: oCon.getAbapTrue('d401chkShiftN'),
				"pmxnr"    	: oCon.arrListItemsNoBlank('d402TblOvw','pmxnr','menge_ist'),
				"menge_ist" : oCon.arrListItemsNoBlank('d402TblOvw','menge_ist','menge_ist'),
			};
		};
		
		if(fcode=="SAPEVT_D404"){ //Sum Total Quantity
			return oParameters = {
				"pmxnr"     : oCon.arrListItemsNoBlank('d403TblPmx','pmxnr','menge_ikg'),
				"pospx"     : oCon.arrListItemsNoBlank('d403TblPmx','pospx','menge_ikg'),
				"etenr"     : oCon.arrListItemsNoBlank('d403TblPmx','etenr','menge_ikg'), 
				"menge_ikg" : oCon.arrListItemsNoBlank('d403TblPmx','menge_ikg','menge_ikg'), 
			};
		};
		
		if(fcode=="SAPEVT_D405"){ //Save Transfer Order
			return oParameters = {
			    "idate"     : oCon.getControl('d401inpDate').getValue(),
			    "iapriod"   : oCon.getAbapTrue('d401chkShiftD'),
			    "iaprion"   : oCon.getAbapTrue('d401chkShiftN'),	
				"matnr_in"  : oCon.arrListItemsNoBlank('d404TblPmx','matnr_in','menge_ikg'), 
				"menge_ikg" : oCon.arrListItemsNoBlank('d404TblPmx','menge_ikg','menge_ikg'), 
				"meins_kg"  : oCon.arrListItemsNoBlank('d404TblPmx','meins_kg','menge_ikg'),
			};
		};
		
		if(fcode=="SAPEVT_D406"){ //Display Pmx & Ingredient
			return oParameters = {
				 "ipmxnr"  : oCon.getProperty('d402TblOvw','pmxnr'),
			};
		};
		
		if(fcode=="SAPEVT_D407"){ //Disp Alt Bom
			return oParameters = {
				"ipmxnr" : oCon.getProperty('d405TblOvw','pmxnr'),
				"imatnr" : oCon.getProperty('d405TblOvw','matnr_px'),
			};
		};
		
		if(fcode=="SAPEVT_D408"){//PREMIX Edit Alt. BOM - Save
			return oParameters = { 
			    "ipmxnr"  : oCon.getProperty('d406TblBom','pmxnr'),
			    "istlal"  : oCon.getProperty('d406TblBom','stlal'),
				"imatnr"  : oCon.getProperty('d406TblBom','matnr_px'),};
		};
		
		if(fcode=="SAPEVT_D409"){//PREMIX Delete Ingredient
			return oParameters = { 
			    "ipmxnr"  : oCon.getProperty('d405TblOvw','pmxnr'),
				"ipospx"  : oCon.getProperty('d405TblOvw','pospx'),
				"ietenr"  : oCon.getProperty('d405TblOvw','etenr'),
			};
		};
		
	},
	//--------------------------------------------------------------------------------	
	//Model Set 
	//--------------------------------------------------------------------------------
	M03_MOD: function(fcode,oModela){
		
		if(fcode=='SAPEVT_D401'){ //PREMIX Order List
			oCon.getControl('d401TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_D402'){ //Selected PREMIX Order List
			oCon.getControl('d402TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_D403'){ //List Premix VS Ingredient
			oCon.getControl('d404TblPmx').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_D404'){ //Sum Input (KG)
			oCon.getControl('d404TblPmx').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_D405'){ //Save Transfer Order
			if(oCon.popMsgErrSuc(oModela,"S")){
				oCon.getControl('d401TblOvw').setModel(oModela);
			}else{
				oCTX.oData.cancel_nav = true;
			};
		};
		
		if(fcode=='SAPEVT_D406'){ //Sum Input (KG)
			oCon.getControl('d405TblOvw').setModel(oModela);
		};
		
		if(fcode=='SAPEVT_D407'){ //Sum Input (KG)
			oCon.getControl('d406TblBom').setModel(oModela);
		};
		
		if((fcode=='SAPEVT_D408')&&(oModela.oData.logon.typ=='S')){ //Alt.BOM Change Success
			oCon.getControl('d405TblOvw').setModel(oModela);
		};
		
		if((fcode=='SAPEVT_D409')&&(oModela.oData.logon.typ=='S')){ //Delete Ingredient
			oCon.getControl('d405TblOvw').setModel(oModela);
		}
		
	},
	//--------------------------------------------------------------------------------	
	//Set UI 
	//--------------------------------------------------------------------------------
	M04_DYN: function(fcode,oModela){
		
		if(fcode=='SAPEVT_D407'){ //PREMIX Edit Alt BOM
			for(var i=0;i<oCon.getControl('d406TblBom').getItems().length;i++){
				if(oCon.getControl('d406TblBom').getItems()[i].getBindingContext().getProperty('mark')=='X'){
					oCon.getControl('d406TblBom').setSelectedItem(oCon.getControl('d406TblBom').getItems()[i])
				};
			};
		}
		
		
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M05_NAV: function(fcode,oModela){
		
		if(fcode=="SAPEVT_D401")    {app.to('D401','slide');};
		if(fcode=="SAPEVT_D402")    {app.to('D402','slide');};
		if(fcode=="SAPEVT_D403")    {app.to('D404','slide');};
		if(fcode=="SAPEVT_D404")    {app.to('D404','slide');};
		if(fcode=="SAPEVT_D405")    {app.to('D401','slide');};
		
		if(fcode=="SAPEVT_D406")    {app.to('D405','slide');};
		if(fcode=="SAPEVT_D407")    {app.to('D406','slide');};
		if(fcode=="SAPEVT_D408")    {app.to('D405','slide');};
		
		if(fcode=='d401btnBck')		{oCon.nav_home();};
		if(fcode=='d402btnBck')		{app.to('D401','slide');};
		if(fcode=='d403btnBck')		{app.to('D402','slide');};
		if(fcode=='d404btnBck')		{app.to('D402','slide');};
		if(fcode=='d405btnBck')		{app.to('D402','slide');};
		if(fcode=='d406btnBck')		{app.to('D405','slide');};
	},
	//--------------------------------------------------------------------------------	
	//Navigation 
	//--------------------------------------------------------------------------------
	M06_NEX: function(fcode,oModela){
		
	},
});