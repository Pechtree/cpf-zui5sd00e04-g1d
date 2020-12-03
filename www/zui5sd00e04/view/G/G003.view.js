sap.ui.jsview("zui5sd00e04.view.G.G003", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.G003
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.G.G003";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.G003
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Mat Doc
		//-------------------------------------------------------------------------------
		var g003RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: {path:'mblnr',formatter:oFmt.fmtAlpha},
												  text : ''}),
			     	  new sap.m.ObjectIdentifier({title: '{menge_pkg}',
			     		  						  text : ''}),
			     	  new sap.m.ObjectIdentifier({title: '{charg}',
			     		  					      text : {path:'vfdat',formatter:oFmt.fmtDate}}),
			     	  new sap.m.ObjectIdentifier({title: '{menge_ikg}',
			     		  						  text : ''}),
			     	  new sap.m.ObjectIdentifier({title: '{meins_kgx}',
			     		  						  text : ''}),]
		}); 
   		var g003TblBck = new sap.m.Table({
   			id			: "g003TblBck",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','MatDoc','','','g003TblBck','mblnr'),
   			       		   oCon.getCol('02','Kg/Set'),
   			       		   oCon.getCol('08','Batch','','','g003TblBck','charg'),
   			       		   oCon.getCol('02','Qty'),
   			       		   oCon.getCol('02','Uom'),],
   			items		: {path:"/t_g_xbfbck",template:g003RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var g003schMain   = oCon.getSchMain('g003','g003TblOvw',['mblnr','charg']);
   		var g003pullMain  = oCon.getPullMain('g003','SAPEVT_G005','evt_g005');
		var g003lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Backflush MatDoc List"});
		var g003btnBck    = new sap.m.Button({id:'g003btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var g003page = new sap.m.Page({
			id				: 'g003page',
			customHeader	: new sap.m.Bar({contentLeft:	[g003btnBck],
											 contentMiddle:	[g003lblTitle],
											 contentRight:	[],}),
			content			: [g003pullMain,g003schMain,g003TblBck]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [g003page];
	}

});