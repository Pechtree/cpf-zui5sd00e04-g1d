sap.ui.jsview("zui5sd00e04.view.E.E105", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.E.E105
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E105";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.E.E105
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Transfer Order
		//-------------------------------------------------------------------------------
		var e105RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: {path:'tfrnr',formatter:oFmt.fmtAlpha},
												  text : '{matnr_in} {maktx_in} {charg}'}),
					  new sap.m.ObjectIdentifier({title: '{menge_npk}',
				     		  				      text : ''}),
			     	  new sap.m.ObjectIdentifier({title: '{menge_rpk}',
				     		  				      text : '{menge_kpk}'}),
				      new sap.m.ObjectIdentifier({title: '{meins_pkx}',
					     		  				  text : ''}),]
		}); 
   		var e105TblOvw = new sap.m.Table({
   			id						: "e105TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','Tfr Order','','','e105TblOvw','tfrnr'),
   			       		   oCon.getCol('02','Opn'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_e_wpktfr",template:e105RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var e105pullMain  = oCon.getPullMain('e105','SAPEVT_E105','evt_e105');
		var e105lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Transfer Order"});
		var e105btnBck    = new sap.m.Button({id:'e105btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e105page = new sap.m.Page({
			id				: 'e105page',
			customHeader	: new sap.m.Bar({contentLeft:	[e105btnBck],
											 contentMiddle:	[e105lblTitle],
											 contentRight:	[],}),
			content			: [e105pullMain,e105TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e105page];
	}

});