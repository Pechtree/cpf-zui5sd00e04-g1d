sap.ui.jsview("zui5sd00e04.view.F.F301", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.F301
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.F.F301";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.F301
	*/ 
	createContent : function(oController) {
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var f301FrmScn = new sap.ui.layout.form.SimpleForm({
			layout		: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			editable	: true,
			content		: [new sap.m.Label({text:'QR Data'}),
			       		   new sap.m.Input({id:'f301InpQrData'}),
			       		   new sap.m.Label({text:'Ingredient'}),
			       		   new sap.m.Text({id:'f301TxtMatnrIn',text:""}),
			       		   new sap.m.Label({text:'Batch'}),
			       		   new sap.m.Text({id:'f301TxtCharg',text:""}),
			       		   new sap.m.Label({text:'Weight'}),
			       		   new sap.m.Text({id:'f301TxtWei',text:""}).addStyleClass("Wei4Nok"),
			       		   new sap.m.Label({text:''}),
			       		   new sap.m.Button({id:'f301btnWeiOk',icon:"sap-icon://bar-code",text:'Confirm and Print',press:oCon.ui5Dispatch}),],
		}); 
		sap.ui.getCore().byId("f301InpQrData").onsapenter = function(oEvt){oCon.ui5DispatchFcode('f301InpQrData');};
		new sap.m.Text({id:'f301TxtQrcodIn',visible:false}) //Hidden
		new sap.m.Text({id:'f301TxtMatnr',visible:false}) //Hidden
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   
		var f301DiaEdt    = oCon.getDialogEditInp('f301','KG');
		var f301lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Weight and Print Sticker"});
		var f301btnTes    = new sap.m.Button({id:'f301btnTes',icon:"sap-icon://accept",text:'Test Weight',visible:false,press:oCon.ui5Dispatch});
		var f301btnCam    = new sap.m.Button({id:'f301btnCam',icon:"sap-icon://camera",text:'Scan',press:oCon.ui5Dispatch});
		var f301btnBck    = new sap.m.Button({id:'f301btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var f301page = new sap.m.Page({
			id				: 'f301page',
			customHeader	: new sap.m.Bar({contentLeft:	[f301btnBck],
											 contentMiddle:	[f301lblTitle],
											 contentRight:	[f301btnTes,f301btnCam],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [f301FrmScn]
		});	
		//Developer Debug
		//-------------------------------------------------------------------------------
		if(oCTX.oData.debug=='X'){ //Developer debug
			f301btnTes.setVisible(true);
		};
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [f301page];
	}

});