sap.ui.jsview("zui5sd00e04.G.G004", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.G004
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.G.G004";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.G004
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Ingredient
		//-------------------------------------------------------------------------------
		var g004RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in}',
											      text : '{maktx_in}'}),
			     	  new sap.m.ObjectIdentifier({title: '{charg}',
			     		  						  text : {path:'vfdat',formatter:oFmt.fmtDate}}),
			     	  new sap.m.ObjectIdentifier({title: '{menge_ikg}',
			     		  						  text : ''}),
			     	  new sap.m.ObjectIdentifier({title: '{meins_kgx}',
			     		  						  text : ''}),]
		}); 
   		var g004TblIng = new sap.m.Table({
   			id			: "g004TblIng",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','g004TblOvw','matnr_in'),
   			       		   oCon.getCol('08','Batch','','','g004TblOvw','charg'),
   			       		   oCon.getCol('02','Qty'),
   			       		   oCon.getCol('02','Uom'),],
   			items		: {path:"/t_g_xbfing",template:g004RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var g004schMain   = oCon.getSchMain('g004','g004TblOvw',['matnr_in','charg']);
   		var g004pullMain  = oCon.getPullMain('g004','SAPEVT_G006','evt_g006');
		var g004lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Backflush MatDoc List"});
		var g004btnBck    = new sap.m.Button({id:'g004btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var g004page = new sap.m.Page({
			id				: 'g004page',
			customHeader	: new sap.m.Bar({contentLeft:	[g004btnBck],
											 contentMiddle:	[g004lblTitle],
											 contentRight:	[],}),
			content			: [g004pullMain,g004schMain,g004TblIng]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [g004page];
	}

});