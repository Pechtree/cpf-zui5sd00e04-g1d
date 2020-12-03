sap.ui.jsview("zui5sd00e04.view.M.M001", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.M.M001
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.M.M001";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.M.M001
	*/ 
	createContent : function(oController) {
 	
		
		
		//-------------------------------------------------------------------------------
		//Putaway
		//-------------------------------------------------------------------------------
   		var m001FrmMain = oCon.getForm_S(3);
   		
   		m001FrmMain.addContent(new sap.m.Label({text:'QR txt',visible:false}));
   		m001FrmMain.addContent(new sap.m.Input({id:'m001InpQrData',visible:true,editable:true}));
		sap.ui.getCore().byId("m001InpQrData").onsapenter = function(oEvt){oCon.ui5DispatchFcode('m001InpQrData');};
   		
   		m001FrmMain.addContent(new sap.m.Label({text:'SU Number'}));
   		m001FrmMain.addContent(new sap.m.Input({id:'m001InpLenum',editable:true,value:'{/t_m_pawssu/0/lenum}'}));
   		sap.ui.getCore().byId("m001InpLenum").onsapenter = function(oEvt){oCon.ui5DispatchFcode('m001InpLenum');};
   		
   		m001FrmMain.addContent(new sap.m.Label({text:'Material'}));
   		m001FrmMain.addContent(new sap.m.Input({id:'m001InpMatnr',editable:false,value:'{/t_m_pawssu/0/matnr}'}));
   		m001FrmMain.addContent(new sap.m.Input({id:'m001InpMaktx',editable:false,value:'{/t_m_pawssu/0/maktx}'}));
		
   		m001FrmMain.addContent(new sap.m.Label({text:'Batch Number'}));
   		m001FrmMain.addContent(new sap.m.Input({id:'m001InpCharg',editable:false,value:'{/t_m_pawssu/0/charg}'}));
   		
   		m001FrmMain.addContent(new sap.m.Label({text:'Qty/UOM'}));
   		m001FrmMain.addContent(new sap.m.Input({id:'m001InpMenge',editable:false,value:'{/t_m_pawssu/0/menge}'}));
   		m001FrmMain.addContent(new sap.m.Input({id:'m001InpMeins',editable:false,value:'{/t_m_pawssu/0/meins}'}));
   		
   		m001FrmMain.addContent(new sap.m.Label({text:'Putaway Bin'}));
   		m001FrmMain.addContent(new sap.m.Input({id:'m001InpLgpla',editable:true,value:'{/t_m_pawssu/0/lgpla}'}));
   		sap.ui.getCore().byId("m001InpLgpla").onsapenter = function(oEvt){oCon.ui5DispatchFcode('m001InpLgpla');};
   		
   		m001FrmMain.addContent(new sap.m.Label({text:'TO'}));
   		m001FrmMain.addContent(new sap.m.Input({id:'m001InpTanum',visible:false,editable:false,value:'{/t_m_pawssu/0/tanum}'}));  		
   		
   		m001FrmMain.addContent(new sap.m.Label({text:''}));
   		m001FrmMain.addContent(new sap.m.Button({id:'m001BtnSU',text:'Scan SU',press:oCon.ui5Dispatch}));
   		
   		m001FrmMain.addContent(new sap.m.Label({text:''}));
   		m001FrmMain.addContent(new sap.m.Button({id:'m001BtnBin',text:'Scan Bin',enabled:false,press:oCon.ui5Dispatch}));
   		
   		
//   		m001FrmMain.addContent(new sap.m.Label({text:''}));
//   		m001FrmMain.addContent(new sap.m.Button({id:'m001BtnTestSU',text:'Test SU',icon:'sap-icon://camera',press:oCon.ui5Dispatch}));
//   		
//   		m001FrmMain.addContent(new sap.m.Label({text:''}));
//   		m001FrmMain.addContent(new sap.m.Button({id:'m001BtnTestBIN',text:'Test Bin',icon:'sap-icon://camera',press:oCon.ui5Dispatch}));
   		
   		
		
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var m001btnBck    = new sap.m.Button({id:'m001btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
   		var m001lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Putaway"});
   		
   		var m001pullMain  = oCon.getPullMain('m001','SAPEVT_M001','evt_m001');
		
//		var m001lblFoot   = new sap.m.Label({id:'m001lblFoot',design:sap.m.LabelDesign.Bold,text:"{/head/ftitle}"});
		
		var m001page = new sap.m.Page({
			id				: 'm001page',
			customHeader	: new sap.m.Bar({contentLeft:	[m001btnBck],
											 contentMiddle: [m001lblTitle],}),
//			footer			: new sap.m.Bar({contentLeft:	[],
//										     contentMiddle:	[],
//											 contentRight:	[]}),
			content			: [m001pullMain,m001FrmMain]
		});
		
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [m001page];
		
		
		
	}

});