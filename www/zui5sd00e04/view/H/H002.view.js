sap.ui.jsview("zui5sd00e04.view.H.H002", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.H002
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.H.H002";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.H002
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//List: Storage
		//-------------------------------------------------------------------------------
		var h002lstItm = new sap.m.StandardListItem({
			title			: "{bezei}",
			info			: "{lgort}",
			icon			: "sap-icon://example",
			type 			: sap.m.ListType.Navigation,
		});
		var h002lstLgort = new sap.m.List({
			id				: 'h002lstLgort',
			mode			: sap.m.ListMode.SingleSelectMaster,
			itemPress		: oCon.ui5Dispatch,
			items			: {path:"/t_h_xrsloc",template:h002lstItm},
		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var h002lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Destination"});
		var h002btnBck    = new sap.m.Button({id:'h002btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var h002page = new sap.m.Page({
			id				: 'h002page',
			customHeader	: new sap.m.Bar({contentLeft:	[h002btnBck],
											 contentMiddle:	[h002lblTitle],
											 contentRight:	[],}),
			content			: [h002lstLgort]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [h002page];
	}

});