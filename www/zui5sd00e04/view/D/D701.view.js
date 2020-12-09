sap.ui.jsview("zui5sd00e04.view.D.D701", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.D.D701
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D701";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.D.D701
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	List: Storage
	//	-------------------------------------------------------------------------------

	   	var d701inpFlag  = new sap.m.Input({id:'d701inpFlag',visible:true}); 
	   	
		var d701lstItm = new sap.m.StandardListItem({
			title			: "{werksx}",	// --- Plant Name
			info			: "{werks}",	// --- Plant Number
			icon			: "sap-icon://example",
			type 			: sap.m.ListType.Navigation,
		});
		var d701lstOvw = new sap.m.List({
			id				: 'd701lstOvw',
			mode			: sap.m.ListMode.SingleSelectMaster,
			itemPress		: oCon.ui5Dispatch,
			items			: {path:"/t_d_xrspln",template:d701lstItm},
		});
			
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
		
		var d701lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Plant"});
		var d701btnBck    = new sap.m.Button({id:'d701btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d701btnNxt    = new sap.m.Button({id:'d701btnNxt',icon:"sap-icon://navigation-right-arrow",press:oCon.ui5Dispatch});
		
		var d701page = new sap.m.Page({
			id				: 'd701page',
			customHeader	: new sap.m.Bar({contentLeft:	[d701btnBck],
											 contentMiddle:	[d701lblTitle],
											 contentRight:	[],}),
			content			: [d701lstOvw]
		}); 
		
	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [d701page];
	}
});