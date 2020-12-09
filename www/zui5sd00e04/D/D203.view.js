sap.ui.jsview("zui5sd00e04.D.D203", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.D.D203
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.D.D203";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.D.D203
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//List: Storage
		//-------------------------------------------------------------------------------
		var d203lstItm = new sap.m.StandardListItem({
			title			: "{bezei}",
			info			: "{lgort}",
			icon			: "sap-icon://example",
			type 			: sap.m.ListType.Navigation,
		});
		var d203lstLgort = new sap.m.List({
			id				: 'd203lstLgort',
			mode			: sap.m.ListMode.SingleSelectMaster,
			itemPress		: oCon.ui5Dispatch,
			items			: {path:"/t_d_xrsloc",template:d203lstItm},
		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var d203lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Storage"});
		var d203btnBck    = new sap.m.Button({id:'d203btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d203page = new sap.m.Page({
			id				: 'd203page',
			customHeader	: new sap.m.Bar({contentLeft:	[d203btnBck],
											 contentMiddle:	[d203lblTitle],
											 contentRight:	[],}),
			content			: [d203lstLgort]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [d203page];
	}

});