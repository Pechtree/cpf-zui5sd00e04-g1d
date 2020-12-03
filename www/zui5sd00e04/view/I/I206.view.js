sap.ui.jsview("zui5sd00e04.view.I.I206", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.I.I206
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I206";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.I.I206
	*/ 
	createContent : function(oController) {
		
		//	-------------------------------------------------------------------------------
		//	List: Phase
		//	-------------------------------------------------------------------------------
			
			var i206lstItm = new sap.m.StandardListItem({
				title			: "{bezei}",
				info			: "{vornr}",
				icon			: "sap-icon://example",
				type 			: sap.m.ListType.Navigation,
			});
			var i206lstVornr = new sap.m.List({
				id				: 'i206lstVornr',
				mode			: sap.m.ListMode.SingleSelectMaster,
				itemPress		: oCon.ui5Dispatch,
				items			: {path:"/t_i_pcipha",template:i206lstItm},
			});
	   	
		//	-------------------------------------------------------------------------------
		//	Page
		//	-------------------------------------------------------------------------------

			var i206lblTitle  	= new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Phase"});
			var i206btnBck    	= new sap.m.Button({id:'i206btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
			var i206page = new sap.m.Page({
				id				: 'i206page',
				customHeader	: new sap.m.Bar({contentLeft:	[i206btnBck],
												 contentMiddle:	[i206lblTitle],
												 contentRight:	[],}),
				footer			: new sap.m.Bar({contentMiddle:	[]}),
				content			: [i206lstVornr]
			});	

		//	-------------------------------------------------------------------------------
		//	Return
		//	-------------------------------------------------------------------------------
			
			this.setDisplayBlock(true);
			return [i206page];
		},

	});