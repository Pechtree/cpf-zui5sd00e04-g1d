sap.ui.jsview("zui5sd00e04.view.M.M101", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.M.M101
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.M.M101";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.M.M101
	*/ 
	createContent : function(oController) {
 	
		
		//-------------------------------------------------------------------------------
		//Movebin
		//-------------------------------------------------------------------------------
   		var m101FrmMain = oCon.getForm_S(3);
   		
   		m101FrmMain.addContent(new sap.m.Label({text:'QR txt',visible:false}));
   		m101FrmMain.addContent(new sap.m.Input({id:'m101InpQrData',visible:true,editable:true}));
		sap.ui.getCore().byId("m101InpQrData").onsapenter = function(oEvt){oCon.ui5DispatchFcode('m101InpQrData');};
   		
   		m101FrmMain.addContent(new sap.m.Label({text:'SU Number'}));
   		m101FrmMain.addContent(new sap.m.Input({id:'m101InpLenum',editable:true,value:'{/t_m_movbsu/0/lenum}'}));
   		sap.ui.getCore().byId("m101InpLenum").onsapenter = function(oEvt){oCon.ui5DispatchFcode('m101InpLenum');};
   		
   		m101FrmMain.addContent(new sap.m.Label({text:'Material'}));
   		m101FrmMain.addContent(new sap.m.Input({id:'m101InpMatnr',editable:false,value:'{/t_m_movbsu/0/matnr}'}));
   		m101FrmMain.addContent(new sap.m.Input({id:'m101InpMaktx',editable:false,value:'{/t_m_movbsu/0/maktx}'}));
		
   		m101FrmMain.addContent(new sap.m.Label({text:'Batch Number'}));
   		m101FrmMain.addContent(new sap.m.Input({id:'m101InpCharg',editable:false,value:'{/t_m_movbsu/0/charg}'}));
   		
   		m101FrmMain.addContent(new sap.m.Label({text:'Qty/UOM'}));
   		m101FrmMain.addContent(new sap.m.Input({id:'m101InpMenge',editable:true,value:'{/t_m_movbsu/0/menge}'}));
   		m101FrmMain.addContent(new sap.m.Input({id:'m101InpMeins',editable:true,value:'{/t_m_movbsu/0/meins}'}));
   		
   		m101FrmMain.addContent(new sap.m.Label({text:'Form'}));
   		m101FrmMain.addContent(new sap.m.Input({id:'m101InpLgpla1',editable:false,value:'{/t_m_movbsu/0/lgpla}'}));
  		sap.ui.getCore().byId("m101InpLgpla1").onsapenter = function(oEvt){oCon.ui5DispatchFcode('m101InpLgpla1');};
  		
   		m101FrmMain.addContent(new sap.m.Label({text:'To'}));
   		m101FrmMain.addContent(new sap.m.Input({id:'m101InpLgpla2',editable:true}));
  		sap.ui.getCore().byId("m101InpLgpla2").onsapenter = function(oEvt){oCon.ui5DispatchFcode('m101InpLgpla2');};
   		
   		m101FrmMain.addContent(new sap.m.Label({text:'TO'}));
  		m101FrmMain.addContent(new sap.m.Input({id:'m101InpTanum',visible:false,editable:false,value:'{/t_m_movbsu/0/tanum}'}));   		
   		
  		m101FrmMain.addContent(new sap.m.Label({text:'Batch Type'}));
  		m101FrmMain.addContent(new sap.m.Input({id:'m101InpLqtyp',visible:false,editable:true}));
  		
   		m101FrmMain.addContent(new sap.m.Label({text:''}));
   		m101FrmMain.addContent(new sap.m.Button({id:'m101BtnSU',text:'Scan SU',press:oCon.ui5Dispatch}));
   		
   		m101FrmMain.addContent(new sap.m.Label({text:''}));
   		m101FrmMain.addContent(new sap.m.Button({id:'m101BtnBin',text:'Scan Bin',enabled:false,press:oCon.ui5Dispatch}));
   		
   		
//   		m101FrmMain.addContent(new sap.m.Label({text:''}));
//   		m101FrmMain.addContent(new sap.m.Button({id:'m101BtnTestSU',text:'Test SU',icon:'sap-icon://camera',press:oCon.ui5Dispatch}));
//   		
//   		m101FrmMain.addContent(new sap.m.Label({text:''}));
//   		m101FrmMain.addContent(new sap.m.Button({id:'m101BtnTestBIN',text:'Test Bin',icon:'sap-icon://camera',press:oCon.ui5Dispatch}));

   		
   	
		
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var m101btnBck    = new sap.m.Button({id:'m101btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
   		var m101btnSav    = new sap.m.Button({id:'m101btnSav',icon:"sap-icon://save",press:oCon.ui5Dispatch});
   		var m101lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Movebin"});
   		
   		var m101pullMain  = oCon.getPullMain('m101','SAPEVT_M101','evt_m101');
		
//		var m101lblFoot   = new sap.m.Label({id:'m101lblFoot',design:sap.m.LabelDesign.Bold,text:"{/head/ftitle}"});
		
		var m101page = new sap.m.Page({
			id				: 'm101page',
			customHeader	: new sap.m.Bar({contentLeft:	[m101btnBck],
											 contentMiddle: [m101lblTitle],
											 contentRight:	[m101btnSav]}),
//			footer			: new sap.m.Bar({contentLeft:	[],
//										     contentMiddle:	[],
//											 contentRight:	[]}),
			content			: [m101pullMain,m101FrmMain]
		});
		
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [m101page];
	
	
	
	
	
	}

});