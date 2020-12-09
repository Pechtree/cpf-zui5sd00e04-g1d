sap.ui.jsview("zui5sd00e04.I.I102", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I.I102
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.I.I102";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I.I102
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//List: Phase
		//-------------------------------------------------------------------------------
		var i102lstItm = new sap.m.StandardListItem({
			title			: "{bezei}",
			info			: "{vornr}",
			icon			: "sap-icon://example",
			type 			: sap.m.ListType.Navigation,
		});
		var i102lstVornr = new sap.m.List({
			id				: 'i102lstVornr',
			mode			: sap.m.ListMode.SingleSelectMaster,
			itemPress		: oCon.ui5Dispatch,
			items			: {path:"/t_i_pcipha",template:i102lstItm},
		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var i102lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Phase"});
		var i102btnBck    = new sap.m.Button({id:'i102btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i102page = new sap.m.Page({
			id				: 'i102page',
			customHeader	: new sap.m.Bar({contentLeft:	[i102btnBck],
											 contentMiddle:	[i102lblTitle],
											 contentRight:	[],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [i102lstVornr]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i102page];
	}

});