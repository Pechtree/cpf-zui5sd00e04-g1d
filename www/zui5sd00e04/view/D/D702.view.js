sap.ui.jsview("zui5sd00e04.view.D.D702", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.D.D702
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D702";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.D.D702
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	List: Storage
	//	-------------------------------------------------------------------------------
	
		var d702lstItm = new sap.m.StandardListItem({
			title			: "{bezei}",	// --- Storage Location Name
			info			: "{lgort}",	// --- Storage Location Number
			icon			: "sap-icon://example",
			type 			: sap.m.ListType.Navigation,
		});
		var d702lstOvw = new sap.m.List({
			id				: 'd702lstOvw',
			mode			: sap.m.ListMode.SingleSelectMaster,
			itemPress		: oCon.ui5Dispatch,
			items			: {path:"/t_d_xrsloc",template:d702lstItm},
		});
			
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
		
		var d702lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Storage Location"});
		var d702btnBck    = new sap.m.Button({id:'d702btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch}); 
		var d702btnHom    = new sap.m.Button({id:'d702btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		
		var d702page = new sap.m.Page({
			id				: 'd702page',
			customHeader	: new sap.m.Bar({contentLeft:	[d702btnBck, d702btnHom],
											 contentMiddle:	[d702lblTitle],
											 contentRight:	[],}),
			content			: [d702lstOvw]
		}); 
		
	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [d702page];
	}
});