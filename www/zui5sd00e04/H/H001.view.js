sap.ui.jsview("zui5sd00e04.H.H001", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.H.H001
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.H.H001";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.H.H001
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//List: Type
		//-------------------------------------------------------------------------------
		var h001lstItm1 = new sap.m.StandardListItem({
			title			: "Transfer",
			info			: "311",
			icon			: "sap-icon://example",
			type 			: sap.m.ListType.Navigation,
		});
		var h001lstItm2 = new sap.m.StandardListItem({
			title			: "Return",
			info			: "312",
			icon			: "sap-icon://example",
			type 			: sap.m.ListType.Navigation,
		});
		var h001lstType = new sap.m.List({
			id				: 'h001lstType',
			mode			: sap.m.ListMode.SingleSelectMaster,
			itemPress		: oCon.ui5Dispatch,
			items			: [h001lstItm1,h001lstItm2]
		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var h001lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Transfer Type"});
		var h001btnBck    = new sap.m.Button({id:'h001btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var h001page = new sap.m.Page({
			id				: 'h001page',
			customHeader	: new sap.m.Bar({contentLeft:	[h001btnBck],
											 contentMiddle:	[h001lblTitle],
											 contentRight:	[],}),
			content			: [h001lstType]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [h001page];
	}

});