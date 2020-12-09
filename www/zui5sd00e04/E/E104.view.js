sap.ui.jsview("zui5sd00e04.E.E104", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.E.E104
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.E.E104";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.E.E104
	*/ 
	createContent : function(oController) {
   		//-------------------------------------------------------------------------------
		//Dialog: Scan Pick
		//-------------------------------------------------------------------------------
		var e104FrmScn = oCon.getForm(3);
		e104FrmScn.addContent(new sap.m.Label({text:'QR Data'}));
		e104FrmScn.addContent(new sap.m.Input({id:'e104InpQrData'}));
		e104FrmScn.addContent(new sap.m.Label({text:'Tfr Ord'}));
		e104FrmScn.addContent(new sap.m.Input({id:'e104InpTfrnr',editable:false}));
		e104FrmScn.addContent(new sap.m.Label({text:'Raw Mat'}));
		e104FrmScn.addContent(new sap.m.Input({id:'e104InpMatnrT',editable:false}));
		e104FrmScn.addContent(new sap.m.Label({text:'Pick Batch'}));
		e104FrmScn.addContent(new sap.m.Input({id:'e104InpChargT',editable:false}));
		e104FrmScn.addContent(new sap.m.Input({id:'e104InpChargA'}));
		e104FrmScn.addContent(new sap.m.Label({text:'Pick Qty'}));
		e104FrmScn.addContent(new sap.m.Input({id:'e104InpMengeT',type:"Number",editable:false}));
		e104FrmScn.addContent(new sap.m.Input({id:'e104InpMengeA',type:"Number",}));
		e104FrmScn.addContent(new sap.m.Label({text:'UoM'}));
		e104FrmScn.addContent(new sap.m.Input({id:'e104InpMeinsT',editable:false}));
		e104FrmScn.addContent(new sap.m.Input({id:'e104InpMeinsA'}));
		sap.ui.getCore().byId("e104InpQrData").onsapenter = function(oEvt){oCon.ui5DispatchFcode('e104InpQrData');};
		
		new sap.m.Input({id:'e104InpMengeK',visible:false})//Hidden
		new sap.m.Input({id:'e104InpMatnrA',visible:false})//Hidden
		new sap.m.Input({id:'e104InpQrcodA',visible:false})//Hidden
		new sap.m.Input({id:'e104InpPrint',visible:false})//Hidden
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var e104diaPrint  = oApp.diaPrint('e104');
		var e104lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Pick"});
		var e104btnCam    = new sap.m.Button({id:'e104btnCam',icon:"sap-icon://camera",press:oCon.ui5Dispatch});
		var e104btnPrn    = new sap.m.Button({id:'e104btnPrn',icon:"sap-icon://print",text:'Pick & Print',press:oCon.ui5Dispatch});
		var e104btnAcp    = new sap.m.Button({id:'e104btnAcp',icon:"sap-icon://accept",text:'Pick',press:oCon.ui5Dispatch});
		var e104btnBck    = new sap.m.Button({id:'e104btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e104page = new sap.m.Page({
			id				: 'e104page',
			customHeader	: new sap.m.Bar({contentLeft:	[e104btnBck,e104btnCam],
											 contentMiddle:	[e104lblTitle],
											 contentRight:	[e104btnPrn,e104btnAcp],}),
			content			: [e104FrmScn]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e104page];
	}

});