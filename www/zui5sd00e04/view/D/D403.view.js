sap.ui.jsview("zui5sd00e04.view.D.D403", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.D403
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D403";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.D403
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Edit Table
		//-------------------------------------------------------------------------------
		var d403RowPmx = new sap.m.ColumnListItem({
			cells	:[ new sap.m.ObjectIdentifier({title: '{matnr_px} {maktx_px}',
				       							   text : {path:'pmxnr',formatter:oFmt.fmtAlpha}}),
			     	   new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												   text : ''}),
				       new sap.m.ObjectIdentifier({title: '{menge_rkg}',
				    	   						   text : ''}),
			     	   new sap.m.Button({
			     		   	press			: oController.fcodeDec,
			     		   	icon			: "sap-icon://less",}),
				       new sap.m.Link({text:"{menge_ikg}",press:oController.fcodeEdt}),
			     	   new sap.m.Button({
			     		   press			: oController.fcodeInc,
			     		   icon				: "sap-icon://add",}),
			     	   new sap.m.ObjectIdentifier({title:'{meins_kgx}',text:''}),]
		}); 
   		var d403TblPmx = new sap.m.Table({
   			id			: "d403TblPmx",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','Pmx','','','d403TblPmx','pmxnr'),
   			       		   oCon.getCol('07','{i18n>COL_RAWMAT}','','','d403TblPmx','matnr_in'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('04',''),
   			               oCon.getCol('05','Order'),
   			               oCon.getCol('04',''),
   			               oCon.getCol('03','UoM'),],
   			items		: {path:"/t_d_xrsing",template:d403RowPmx},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var d403schMain   = oCon.getSchMain('d403','d403TblPmx',['pmxnr','matnr_px','maktx_px','matnr_in','maktx_in']);
   		// var d403pullMain  = oCon.getPullMain('d403','SAPEVT_D403','evt_d403');
   		var d403pullMain  = oCon.getPullMain('d403','SAPEVT_D413','evt_d413');
		var d403DiaEdt    = oCon.getDialogEditInp('d403','Order');
		var d403lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Stock Transfer Orders - Premix Order"});
		var d403btnSum    = new sap.m.Button({id:'d403btnSum',icon:"sap-icon://simulate",text:'Sum',press:oCon.ui5Dispatch});
		var d403btnBck    = new sap.m.Button({id:'d403btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d403page = new sap.m.Page({
			id				: 'd403page',
			customHeader	: new sap.m.Bar({contentLeft:	[d403btnBck],
											 contentMiddle:	[d403lblTitle],
											 contentRight:	[d403btnSum],}),
			content			: [d403pullMain,d403schMain,d403TblPmx]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [d403page];
	}

});