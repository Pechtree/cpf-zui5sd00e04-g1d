sap.ui.jsview("zui5sd00e04.F.F201", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.F201
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.F.F201";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.F201
	*/ 
	createContent : function(oController) {
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var f201FrmScn = new sap.ui.layout.form.SimpleForm({
			layout		: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			editable	: true,
			content		: [new sap.m.Label({text:'QR Data'}),
			       		   new sap.m.Input({id:'f201InpQrData'}),
			       		   new sap.m.Label({text:'Ingredient'}),
			       		   new sap.m.Text({id:'f201TxtMatnrIn',text:""}),
			       		   new sap.m.Label({text:'Batch'}),
			       		   new sap.m.Text({id:'f201TxtCharg',text:""}),
			       		   new sap.m.Label({text:'Weight'}),
			       		   new sap.m.Text({id:'f201TxtWei',text:""}).addStyleClass("Wei4Nok"),
			       		   new sap.m.Label({text:''}),
			       		   new sap.m.Button({id:'f201btnWeiOk',icon:"sap-icon://bar-code",text:'Confirm and Print',press:oCon.ui5Dispatch}),],
		}); 
		sap.ui.getCore().byId("f201InpQrData").onsapenter = function(oEvt){oCon.ui5DispatchFcode('f201InpQrData');};
		new sap.m.Text({id:'f201TxtQrcodIn',visible:false}) //Hidden
		new sap.m.Text({id:'f201TxtMatnr',visible:false}) //Hidden
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   	
		var f201lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Weight for Stock Adjust"});
		var f201btnTes    = new sap.m.Button({id:'f201btnTes',icon:"sap-icon://accept",text:'Test Weight',press:oCon.ui5Dispatch});
		var f201btnBck    = new sap.m.Button({id:'f201btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var f201page = new sap.m.Page({
			id				: 'f201page',
			customHeader	: new sap.m.Bar({contentLeft:	[f201btnBck],
											 contentMiddle:	[f201lblTitle],
											 contentRight:	[f201btnTes],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [f201FrmScn]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [f201page];
	}

});