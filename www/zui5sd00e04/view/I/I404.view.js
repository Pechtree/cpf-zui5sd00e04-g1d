sap.ui.jsview("zui5sd00e04.view.I.I404", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.I.I404
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I404";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.I.I404
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	Form
	//	-------------------------------------------------------------------------------
		
   		var i404FrmMain = oCon.getForm(3);   	
 		i404FrmMain.addContent(new sap.m.Label({text:'Order'}));
   		i404FrmMain.addContent(new sap.m.Input({id:'i404InpAufnr',editable:false,value:'{/head/aufnr}'}));
   		
 		i404FrmMain.addContent(new sap.m.Label({text:'FG'}));
 		i404FrmMain.addContent(new sap.m.Input({id:'i404InpMatnr',editable:false,value:'{/head/matnr_fg}'}));
 		i404FrmMain.addContent(new sap.m.Input({id:'i404InpMaktx',editable:false,value:'{/head/maktx_fg}'}));
   		
 		i404FrmMain.addContent(new sap.m.Label({text:'Cnf-Text'}));
 		i404FrmMain.addContent(new sap.m.Input({id:'i404InpCharg',editable:false,value:'{/head/ltxa1}'}));					// ++ 2018.12.12 :: Output Confirm - COOK V1.0.1
 		//i404FrmMain.addContent(new sap.m.Input({id:'i404InpCharg',editable:false,value:'{/head/charg}'}));				// -- 2018.12.12 :: Output Confirm - COOK V1.0.1
   
 		
 		i404FrmMain.addContent(new sap.m.Label({text:'Phase'}));
 		i404FrmMain.addContent(new sap.m.Input({id:'i404InVornr',editable:false,value:'{/head/vornr}'}));
 		i404FrmMain.addContent(new sap.m.Input({id:'i404Bezei',editable:false,value:'{/head/bezei}'}));
 		
   		i404FrmMain.addContent(new sap.m.Label({text:'Yield'}));
   		i404FrmMain.addContent(new sap.m.Input({id:'i404InpYield',type:"Number"}));
   		i404FrmMain.addContent(new sap.m.Input({id:'i404InpMeins',value:'{/head/meins}'}));
   		sap.ui.getCore().byId("i404InpYield").onsapenter = function(oEvt){oCon.ui5DispatchFcode('i404InpYield');};
   		
   		i404FrmMain.addContent(new sap.m.Label({text:'Start'}));
   		i404FrmMain.addContent(oCon.getDatePicker('i404InpSDate','{/head/isdd}'));
   		i404FrmMain.addContent(oCon.getTimePicker('i404InpSTime','{/head/isdz}'));
   		
   		i404FrmMain.addContent(new sap.m.Label({text:'Finish'}));
   		i404FrmMain.addContent(oCon.getDatePicker('i404InpFDate'));
   		i404FrmMain.addContent(oCon.getTimePicker('i404InpFTime'));
   		
   		i404FrmMain.addContent(new sap.m.Label({text:'Employee'}));
   		i404FrmMain.addContent(new sap.m.Input({id:'i404InpAnzma',type:"Number",value:'{/head/anzma}'}));
   		
  		i404FrmMain.addContent(new sap.m.Label({text:'Labour'}));
   		i404FrmMain.addContent(new sap.m.Input({id:'i404InpLaborQ',type:"Number",value:'{/head/menge1}'}));
   		i404FrmMain.addContent(new sap.m.Input({id:'i404InpLaborU',value:'{/head/meins1}',editable:false}));

   		i404FrmMain.addContent(new sap.m.Label({text:'Machine'}));
   		i404FrmMain.addContent(new sap.m.Input({id:'i404InpMech1Q',type:"Number",value:'{/head/menge2}'}));
   		i404FrmMain.addContent(new sap.m.Input({id:'i404InpMech1U',value:'{/head/meins2}',editable:false}));
   		
   		// Enable field (Use field 'Machine' instead)
   		i404FrmMain.addContent(new sap.m.Label({text:'Machine Time 2',visible:false}));
   		i404FrmMain.addContent(new sap.m.Input({id:'i404InpMech2Q',type:"Number",value:'{/head/menge3}',visible:false}));
   		i404FrmMain.addContent(new sap.m.Input({id:'i404InpMech2U',value:'{/head/meins3}',editable:false,visible:false}));

   	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   		
		var i404lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Confirmation Out"});
		var i404btnBck    = new sap.m.Button({id:'i404btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i404btnDis    = new sap.m.Button({id:'i404btnDis',icon:"sap-icon://display",text:'Component',press:oCon.ui5Dispatch});
		var i404btnRfh    = new sap.m.Button({id:'i404btnRfh',icon:"sap-icon://simulate",text:'Refresh',press:oCon.ui5Dispatch});
		var i404btnSav    = new sap.m.Button({id:'i404btnSav',icon:"sap-icon://save",text:'Confirm',press:oCon.ui5Dispatch});
		var i404page = new sap.m.Page({
			id				: 'i404page',
			customHeader	: new sap.m.Bar({contentLeft:	[i404btnBck,i404btnDis],
											 contentMiddle:	[i404lblTitle],
											 contentRight:	[i404btnRfh,i404btnSav],}),
			content			: [i404FrmMain]
		});	

	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [i404page];
	}

});