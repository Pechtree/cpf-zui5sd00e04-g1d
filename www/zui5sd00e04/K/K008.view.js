sap.ui.jsview("zui5sd00e04.K.K008", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.K008
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.K.K008";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.K008
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//List: Phase
		//-------------------------------------------------------------------------------
		var k008lstItm = new sap.m.StandardListItem({
			title			: "{matnr_in}",
			info			: "{maktx_in}",
			icon			: "sap-icon://example",
			type 			: sap.m.ListType.Navigation,
		});
		var k008lstMatnr= new sap.m.List({
			id				: 'k008lstMatnr',
			mode			: sap.m.ListMode.SingleSelectMaster,
			itemPress		: oCon.ui5Dispatch,
			items			: {path:"/t_k_sckmat",template:k008lstItm},
		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var k008lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Material"});
		var k008btnBck    = new sap.m.Button({id:'k008btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
   		var k008schMain   = oCon.getSchMain('k008','k008lstMatnr',['matnr_in','maktx_in']);
   		var k008pullMain  = oCon.getPullMain('k008','SAPEVT_K010','evt_k010');
		var k008page = new sap.m.Page({
			id				: 'k008page',
			customHeader	: new sap.m.Bar({contentLeft:	[k008btnBck],
											 contentMiddle:	[k008lblTitle],
											 contentRight:	[],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [k008pullMain,k008schMain,k008lstMatnr]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [k008page];
	}

});