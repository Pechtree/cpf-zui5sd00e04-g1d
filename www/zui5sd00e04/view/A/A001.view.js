sap.ui.jsview("zui5sd00e04.view.A.A001", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.A001
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.A.A001";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.A001
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//CPF-SAP
		//-------------------------------------------------------------------------------
		var a001tilB000 = new sap.m.StandardListItem({
			id      		: 'a001tilB000',
			title			: "GR From Vendor",
			info			: "",
			icon			: "images/truck.png",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilB100 = new sap.m.StandardListItem({
			id      		: 'a001tilB100',
			title			: "GR From CPF",
			info			: "",
			icon			: "sap-icon://step",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilC100 = new sap.m.StandardListItem({
			id      		: 'a001tilC100',
			title			: "Premix Order for Process Order",
			info			: "",
			icon			: "sap-icon://lab",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilC200 = new sap.m.StandardListItem({
			id      		: 'a001tilC200',
			title			: "Premix Order for Safety Stock",
			info			: "",
			icon			: "sap-icon://lab",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilC103 = new sap.m.StandardListItem({
			id      		: 'a001tilC103',
			title			: "Premix Orders Overview for Production",
			info			: "",
			icon			: "sap-icon://display",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilC300 = new sap.m.StandardListItem({
			id      		: 'a001tilC300',
			title			: "Premix Orders Overview for Premix",
			info			: "",
			icon			: "sap-icon://display",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilD400 = new sap.m.StandardListItem({
			id      		: 'a001tilD400',
			title			: "Stock Transfer Order for Premix",
			info			: "",
			icon			: "sap-icon://step",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilD200 = new sap.m.StandardListItem({
			id      		: 'a001tilD200',
			title			: "Stock Transfer Order for Production",
			info			: "",
			icon			: "sap-icon://step",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilD500 = new sap.m.StandardListItem({
			id      		: 'a001tilD500',
			title			: "Stock Transfer Order for Non-Production",
			info			: "",
			icon			: "sap-icon://step",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilD700 = new sap.m.StandardListItem({
			id      		: 'a001tilD700',
			title			: "Stock Transfer Order for Other Plant",
			info			: "",
			icon			: "sap-icon://step",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilD104 = new sap.m.StandardListItem({
			id      		: 'a001tilD104',
			title			: "Stock Transfer Order Overview for Premix",
			info			: "",
			icon			: "sap-icon://step",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilD300 = new sap.m.StandardListItem({
			id      		: 'a001tilD300',
			title			: "Stock Transfer Order Overview for Production",
			info			: "",
			icon			: "sap-icon://step",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilD600 = new sap.m.StandardListItem({
			id      		: 'a001tilD600',
			title			: "Stock Transfer Order Overview for Non-Production",
			info			: "",
			icon			: "sap-icon://step",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilD800 = new sap.m.StandardListItem({
			id      		: 'a001tilD800',
			title			: "Stock Transfer Order Overview for Other Plant",
			info			: "",
			icon			: "sap-icon://step",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilE300 = new sap.m.StandardListItem({
			id      		: 'a001tilE300',
			title			: "Picking Order - Multiple Bin",
			info			: "",
			icon			: "sap-icon://accept",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilE200 = new sap.m.StandardListItem({
			id      		: 'a001tilE200',
			title			: "Close Picking Order",
			info			: "",
			icon			: "sap-icon://accept",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilE100 = new sap.m.StandardListItem({
			id      		: 'a001tilE100',
			title			: "Picking",
			info			: "",
			icon			: "sap-icon://accept",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilE400 = new sap.m.StandardListItem({
			id      		: 'a001tilE400',
			title			: "Picking Dummy Bin",
			info			: "",
			icon			: "sap-icon://accept",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilE500 = new sap.m.StandardListItem({
			id      		: 'a001tilE500',
			title			: "Picking Multiple Bin",
			info			: "",
			icon			: "sap-icon://accept",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilE600 = new sap.m.StandardListItem({
			id      		: 'a001tilE600',
			title			: "Close Picking Order - Dummy Bin",
			info			: "",
			icon			: "sap-icon://accept",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilE700 = new sap.m.StandardListItem({
			id      		: 'a001tilE700',
			title			: "Close Picking Order - Multiple Bin",
			info			: "",
			icon			: "sap-icon://accept",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilE800 = new sap.m.StandardListItem({
			id      		: 'a001tilE800',
			title			: "Picking Order - Dummy Bin",
			info			: "",
			icon			: "sap-icon://accept",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilF000 = new sap.m.StandardListItem({
			id      		: 'a001tilF000',
			title			: "Weighing",
			info			: "",
			icon			: "sap-icon://unwired",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilG000 = new sap.m.StandardListItem({
			id      		: 'a001tilG000',
			title			: "Finishing",
			info			: "",
			icon			: "sap-icon://lab",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilK000 = new sap.m.StandardListItem({
			id      		: 'a001tilK000',
			title			: "Print Sticker",
			info			: "",
			icon			: "sap-icon://print",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilI200 = new sap.m.StandardListItem({
			id      		: 'a001tilI200',
			title			: "Confirmation Overview",
			info			: "",
			icon			: "sap-icon://goal",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilI000 = new sap.m.StandardListItem({
			id      		: 'a001tilI000',
			title			: "Input Confirmation",
			info			: "",
			icon			: "sap-icon://goal",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilI100 = new sap.m.StandardListItem({
			id      		: 'a001tilI100',
			title			: "Output Confirmation",
			info			: "",
			icon			: "sap-icon://goal",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilH000 = new sap.m.StandardListItem({
			id      		: 'a001tilH000',
			title			: "Stock Transfer/Return",
			info			: "",
			icon			: "sap-icon://step",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilH100 = new sap.m.StandardListItem({
			id      		: 'a001tilH100',
			title			: "Transfer",
			info			: "",
			icon			: "sap-icon://step",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilL000 = new sap.m.StandardListItem({
			id      		: 'a001tilL000',
			title			: "GR to FG Warehouse",
			info			: "",
			icon			: "sap-icon://table-view",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilL100 = new sap.m.StandardListItem({
			id      		: 'a001tilL100',
			//title			: "IR from Process Order",
			title			: "Reject from Process Order",
			info			: "",
			icon			: "sap-icon://grid",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilM001 = new sap.m.StandardListItem({
			id      		: 'a001tilM001',
			title			: "Putaway",
			info			: "",
			icon			: "sap-icon://grid",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001tilM101 = new sap.m.StandardListItem({
			id      		: 'a001tilM101',
			title			: "Movebin",
			info			: "",
			icon			: "sap-icon://grid",
			type 			: sap.m.ListType.Navigation,
			press			: oCon.ui5Dispatch,
		});
		var a001Mnu = new sap.m.List({
			id				: 'a001Mnu',
			items			: [a001tilB000,a001tilB100,a001tilC100,a001tilC200,a001tilC103,a001tilC300,a001tilD400,
								a001tilD200,a001tilD500,a001tilD700,a001tilD104,a001tilD300,//a001tilD600,a001tilD800,
								a001tilE300,a001tilE800,a001tilE200,a001tilE600,a001tilE700,a001tilE100,a001tilE400,a001tilE500,
								a001tilF000,a001tilG000,a001tilK000,a001tilI200,a001tilI000,a001tilI100,a001tilH000,
								a001tilH100,a001tilL000,a001tilL100,a001tilM001,a001tilM101],
		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var a001lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"CPF-SAP"});
		var a001btnSet    = new sap.m.Button({id:'a001btnSet',text:"Settings",icon:"sap-icon://action-settings",press:oCon.ui5Dispatch});
		var a001btnBck    = new sap.m.Button({id:'a001btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var a001page = new sap.m.Page({
			id				: 'a001page',
			customHeader	: new sap.m.Bar({contentLeft:	[a001btnSet],
											 contentMiddle:	[a001lblTitle],
											 contentRight:	[],}),
			content			: [a001Mnu]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [a001page];
	}

});