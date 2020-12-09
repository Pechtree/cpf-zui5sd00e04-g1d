sap.ui.jsview("zui5sd00e04.view.D.D501", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.D.D501
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D501";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.D.D501
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	List: Storage
	//	-------------------------------------------------------------------------------
		
	   	var d501inpFlag  = new sap.m.Input({id:'d501inpFlag',visible:true}); 
	
		var d501lstItm = new sap.m.StandardListItem({
			title			: "{bezei}",
			info			: "{lgort}",
			icon			: "sap-icon://example",
			type 			: sap.m.ListType.Navigation,
		});
		var d501lstOvw = new sap.m.List({
			id				: 'd501lstOvw',
			mode			: sap.m.ListMode.SingleSelectMaster,
			itemPress		: oCon.ui5Dispatch,
			items			: {path:"/t_d_xrsloc",template:d501lstItm},
		});

		
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------

		var d501lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Storage Location"});
		var d501btnBck    = new sap.m.Button({id:'d501btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d501btnNxt    = new sap.m.Button({id:'d501btnNxt',icon:"sap-icon://navigation-right-arrow",press:oCon.ui5Dispatch});
		
		var d501page = new sap.m.Page({
			id				: 'd501page',
			customHeader	: new sap.m.Bar({contentLeft:	[d501btnBck],
											 contentMiddle:	[d501lblTitle],
											 contentRight:	[]}),
			content			: [d501lstOvw]
		}); 
		
		//	-------------------------------------------------------------------------------
		//	Return
		//	-------------------------------------------------------------------------------

		this.setDisplayBlock(true);
		return [d501page];
	}

});