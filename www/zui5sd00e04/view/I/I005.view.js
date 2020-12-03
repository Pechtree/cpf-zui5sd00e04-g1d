sap.ui.jsview("zui5sd00e04.view.I.I005", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I.I005
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I005";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I.I005
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	List: Phase
	//	-------------------------------------------------------------------------------
		
		var i005lstItm = new sap.m.StandardListItem({
			title			: "{bezei}",
			info			: "{vornr}",
			icon			: "sap-icon://example",
			type 			: sap.m.ListType.Navigation,
		});
		var i005lstVornr = new sap.m.List({
			id				: 'i005lstVornr',
			mode			: sap.m.ListMode.SingleSelectMaster,
			itemPress		: oCon.ui5Dispatch,
			items			: {path:"/t_i_pcipha",template:i005lstItm},
		});
	   	
	//	-------------------------------------------------------------------------------
	//	Dialog for select WIP // ++ 2018.07.31
	//	-------------------------------------------------------------------------------
		
		var i005lstItem = new sap.m.StandardListItem({
			title			: "{matnr_in}",
			description		: "{maktx_in}",
			//info			: "{maktx_in}",
			//icon			: "sap-icon://example",
			type 			: sap.m.ListType.Navigation,
		});
		var i005lstWIP = new sap.m.List({
			id				: 'i005lstWIP',
			mode			: sap.m.ListMode.SingleSelectMaster,
			itemPress		: oCon.ui5Dispatch,
			items			: {path:"/t_i_pciwip",template:i005lstItem},
		});

   		var i005DiaWIPTitle	= new sap.m.Label({id:'i005DiaWIPTitle',design:sap.m.LabelDesign.Bold,text:"Select WIP"});
    	var i005btnWIPClose	= new sap.m.Button({id:'i005btnWIPClose',icon:"",text:'Close',press:oCon.ui5Dispatch}); 
		
   		var i005DiaWIP = new sap.m.Dialog({
			id				: 'i005DiaWIP',
			customHeader	: new sap.m.Bar({contentLeft:	[],
				 				             contentMiddle:	[i005DiaWIPTitle],
				 				             contentRight:	[],}),
			//contentWidth	: '550px',
		    buttons			: [i005btnWIPClose],
		    content			: [i005lstWIP],
		});		
   	
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
		
		var i005DiaEdt    	= oCon.getDialogEditInp('i005','SET');
		var i005lblTitle  	= new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Phase"});
		var i005btnBck    	= new sap.m.Button({id:'i005btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i005page = new sap.m.Page({
			id				: 'i005page',
			customHeader	: new sap.m.Bar({contentLeft:	[i005btnBck],
											 contentMiddle:	[i005lblTitle],
											 contentRight:	[],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [i005lstVornr]
		});	

	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [i005page];
	},

});