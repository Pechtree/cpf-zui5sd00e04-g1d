sap.ui.jsview("zui5sd00e04.view.E.E506", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E506
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E506";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E506
	*/ 
	createContent : function(oController) {
		
		new sap.m.Input({id:'e506inpPrint',visible:false})						//Hidden ++ 2017.12.21 ; Add for Pick & Print button	
		new sap.m.Input({id:'e506inpMengeq',visible:false,value:'1'})			//Hidden ++ 2017.12.21 ; Add for Pick & Print button
		//new sap.m.Input({id:'e506inpPckItm',visible:true})						//Hidden ++ 2017.12.21 ; Add for Pick & Print button	
		//new sap.m.Input({id:'e506inpSeqpk',visible:false})						//Hidden ++ 2017.12.21 ; Add for Pick & Print button	
		
		//-------------------------------------------------------------------------------
		//
		//-------------------------------------------------------------------------------
   		var e506FrmMain = oCon.getForm_S(3);
   		
   		e506FrmMain.addContent(new sap.m.Label({text:'QR txt'}));
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpQrData',visible:true,editable:true}));
		sap.ui.getCore().byId("e506InpQrData").onsapenter = function(oEvt){oCon.ui5DispatchFcode('e506InpQrData');};
   		
   		e506FrmMain.addContent(new sap.m.Label({text:'Transfer Order'}));
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpTfrnr',editable:false,value:'{/t_e_wpktfr/0/tfrnr}'}));
   		
   		e506FrmMain.addContent(new sap.m.Label({text:'Material'}));
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpMatnr',editable:false,value:'{/t_e_wpktfr/0/matnr_in}'}));
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpMaktx',editable:false,value:'{/t_e_wpktfr/0/maktx_in}'}));
		
   		e506FrmMain.addContent(new sap.m.Label({text:'SU'}));
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpLenum1',editable:false,value:'{/t_e_wpktfr/0/vlenr}'}));
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpLenum2',editable:true,value:''}));
 		sap.ui.getCore().byId("e506InpLenum2").onsapenter = function(oEvt){oCon.ui5DispatchFcode('e506InpLenum2');};
   		
   		e506FrmMain.addContent(new sap.m.Label({text:'Batch'}));
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpCharg1',editable:false,value:'{/t_e_wpktfr/0/charg}'}));
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpCharg2',editable:true,value:'{/t_e_wpkssu/0/charg}'}));
   		
   		e506FrmMain.addContent(new sap.m.Label({text:'Qty'}));
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpMenge1',editable:false,value:'{/t_e_wpktfr/0/menge_opk}' + ' / ' + '{/t_e_wpktfr/0/menge_hpk}'}));		// ++ 2017.12.27 - Picking-Multiple V.1.4
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpMenge2',editable:true,value:'{/t_e_wpkssu/0/menge_npk}'}));	// ++ 2018.01.03 :: Bug Resolve 
   		
   		e506FrmMain.addContent(new sap.m.Label({text:'UoM'}));
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpMeins1',editable:false,value:'{/t_e_wpktfr/0/meins_pkx}'}));
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpMeins2',editable:true,value:'{/t_e_wpkssu/0/meins_pkx}'}));
   		
  		e506FrmMain.addContent(new sap.m.Label({text:'Bin'}));
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpLgpla1',editable:false,value:'{/t_e_wpktfr/0/vlpla}'}));
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpLgpla2',editable:true,value:'{/t_e_wpkssu/0/vlpla}'}));
   		
   		e506FrmMain.addContent(new sap.m.Label({text:'QR ID'}));
   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpQrID',visible:false,editable:false}));   		

   		e506FrmMain.addContent(new sap.m.Input({id:'e506InpMenge3',visible:false,value:'{/t_e_wpktfr/0/menge_okg}'}));
   		
   		e506FrmMain.addContent(new sap.m.Label({text:''}));
   		e506FrmMain.addContent(new sap.m.Button({id:'e506BtnSU',text:'Scan SU',icon:'sap-icon://camera',press:oCon.ui5Dispatch}));
   		
   		e506FrmMain.addContent(new sap.m.Label({text:''}));
   		e506FrmMain.addContent(new sap.m.Button({id:'e506BtnBin',text:'Scan Bin',icon:'sap-icon://camera',enabled:true,press:oCon.ui5Dispatch}));
//   		
//   		
//   		e506FrmMain.addContent(new sap.m.Label({text:''}));
//   		e506FrmMain.addContent(new sap.m.Button({id:'e506BtnTestSU',text:'Test SU',icon:'sap-icon://camera',press:oCon.ui5Dispatch}));
//   		
//   		e506FrmMain.addContent(new sap.m.Label({text:''}));
//   		e506FrmMain.addContent(new sap.m.Button({id:'e506BtnTestBIN',text:'Test Bin',icon:'sap-icon://camera',press:oCon.ui5Dispatch}));

   		
   	
		
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var e506diaPrint  = oApp.diaPrint('e5066');
   		
   		var e506btnBck    = new sap.m.Button({id:'e506btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
   		var e506lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Pick"});
   		
		var e506btnAcp    = new sap.m.Button({id:'e506btnAcp',icon:"sap-icon://accept",text:'',press:oCon.ui5Dispatch});
		var e506btnPrt    = new sap.m.Button({id:'e506btnPrt',icon:"sap-icon://print",text:'',press:oCon.ui5Dispatch});
		
   		var e506pullMain  = oCon.getPullMain('e507','SAPEVT_E507','evt_e507');
		var e506btnHom    = new sap.m.Button({id:'e506btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});

		
		var e506page = new sap.m.Page({
			id				: 'e506page',
			customHeader	: new sap.m.Bar({contentLeft:	[e506btnBck,e506btnHom],
											 contentMiddle: [e506lblTitle],
											 contentRight:	[e506btnPrt,e506btnAcp],}),
			content			: [e506pullMain,e506FrmMain]
		});
		
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e506page];
		

 		
 		
	}

});