sap.ui.jsview("zui5sd00e04.view.E.E404", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E404
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E404";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E404
	*/ 
	createContent : function(oController) {

	//	-------------------------------------------------------------------------------
	//	Screen for scan sticker
	//	-------------------------------------------------------------------------------
   		var e404FrmMain = oCon.getForm_S(3);
   		
   		e404FrmMain.addContent(new sap.m.Label({text:'QR txt'}));
   		e404FrmMain.addContent(new sap.m.Input({id:'e404InpQrData',visible:true,editable:true,value:'{}'}));
		sap.ui.getCore().byId("e404InpQrData").onsapenter = function(oEvt){oCon.ui5DispatchFcode('e404InpQrData');};
   		
   		e404FrmMain.addContent(new sap.m.Label({text:'Transfer Order'}));
   		e404FrmMain.addContent(new sap.m.Input({id:'e404InpLenum',editable:false,value:'{/t_e_wpktfr/0/tfrnr}'}));
   		
   		e404FrmMain.addContent(new sap.m.Label({text:'Material'}));
   		e404FrmMain.addContent(new sap.m.Input({id:'e404InpMatnr',editable:false,value:'{/t_e_wpktfr/0/matnr_in}'}));
   		e404FrmMain.addContent(new sap.m.Input({id:'e404InpMaktx',editable:false,value:'{/t_e_wpktfr/0/maktx_in}'}));
		
   		e404FrmMain.addContent(new sap.m.Label({text:'Batch Number'}));
   		e404FrmMain.addContent(new sap.m.Input({id:'e404InpCharg1',editable:false,value:'{/t_e_wpktfr/0/charg}'}));
   		e404FrmMain.addContent(new sap.m.Input({id:'e404InpCharg2',editable:true,value:'{/t_e_wpktfr/0/chargp}'}));
   		
   		e404FrmMain.addContent(new sap.m.Label({text:'Qty'}));
   		e404FrmMain.addContent(new sap.m.Input({id:'e404InpMenge1',editable:false,value:'{/t_e_wpktfr/0/menge_npk}'}));
   		e404FrmMain.addContent(new sap.m.Input({id:'e404InpMenge2',editable:true,value:'{/t_e_wpktfr/0/menge}'}));
   		
   		e404FrmMain.addContent(new sap.m.Label({text:'UOM'}));
   		e404FrmMain.addContent(new sap.m.Input({id:'e404InpMeins1',editable:false,value:'{/t_e_wpktfr/0/meins_pk}'}));
   		e404FrmMain.addContent(new sap.m.Input({id:'e404InpMeins2',editable:true,value:'{/t_e_wpktfr/0/meins}'}));
   		
   		e404FrmMain.addContent(new sap.m.Label({text:'QR ID'}));
   		e404FrmMain.addContent(new sap.m.Input({id:'e404InpQrID',visible:false,editable:true})); 
   		
   		e404FrmMain.addContent(new sap.m.Label({text:''}));
   		e404FrmMain.addContent(new sap.m.Button({id:'e404BtnStk',text:'Scan Sticker',icon:'sap-icon://camera',press:oCon.ui5Dispatch}));   		
   		
   		// ++ 2018.02.19 :: Picking Dummy V1.3 [Pick&Print; store base qty]
  		e404FrmMain.addContent(new sap.m.Label({text:''}));
   		e404FrmMain.addContent(new sap.m.Input({id:'e404InpMenge3',visible:false,value:'{/t_e_wpktfr/0/menge_okg}'}));	
		
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   		
   		var e404diaPrint  = oApp.diaPrint('e4044'); // ++ 2018.02.19 :: Picking Dummy V1.3 [Pick&Print; Dialog for Print Sticker]
   		
   		var e404btnBck    = new sap.m.Button({id:'e404btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
   		var e404lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Pick"});
   		
		var e404btnAcp    = new sap.m.Button({id:'e404btnAcp',icon:"sap-icon://accept",text:'',press:oCon.ui5Dispatch});
		var e404btnPrt    = new sap.m.Button({id:'e404btnPrt',icon:"sap-icon://print",text:'',press:oCon.ui5Dispatch});
		
   		var e404pullMain  = oCon.getPullMain('e404','SAPEVT_E404','evt_e404');
		var e404btnHom    = new sap.m.Button({id:'e404btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		

		
		var e404page = new sap.m.Page({
			id				: 'e404page',
			customHeader	: new sap.m.Bar({contentLeft:	[e404btnBck,e404btnHom],
											 contentMiddle: [e404lblTitle],
											 contentRight:	[e404btnPrt,e404btnAcp],}), 
			content			: [e404pullMain,e404FrmMain]
		});

	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [e404page]; 
		
	}

});