sap.ui.jsview("zui5sd00e04.view.K.K103", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.K.K103
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.K.K103";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.K.K103
	*/ 
	createContent : function(oController) {
 
		//-------------------------------------------------------------------------------
		//List: Phase
		//-------------------------------------------------------------------------------
		var k103lstItm = new sap.m.StandardListItem({
			title			: "{matnr}",
			info			: "{maktx}",
			icon			: "sap-icon://example",
			type 			: sap.m.ListType.Navigation,
		});
		var k103lstMatnr= new sap.m.List({
			id				: 'k103lstMatnr',
			mode			: sap.m.ListMode.SingleSelectMaster,
			itemPress		: oCon.ui5Dispatch,
			items			: {path:"/t_k_sckfwm",template:k103lstItm},
		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var k103lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Material (WM)"});
		var k103btnBck    = new sap.m.Button({id:'k103btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
   		var k103schMain   = oCon.getSchMain('k103','k103lstMatnr',['matnr','maktx']);
   		var k103pullMain  = oCon.getPullMain('k103','SAPEVT_K103','evt_k103');
		var k103page = new sap.m.Page({
			id				: 'k103page',
			customHeader	: new sap.m.Bar({contentLeft:	[k103btnBck],
											 contentMiddle:	[k103lblTitle],
											 contentRight:	[],}),
			content			: [k103pullMain,k103schMain,k103lstMatnr]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [k103page];
		
		
		
		
		
	}

});