sap.ui.jsview("zui5sd00e04.view.E.E202", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.E202
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E202";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.E202
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var e202RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_in} {maktx_in}',
												  text :{parts:[{path:'charg'},
												                {path:'vfdat',formatter:oFmt.fmtDate}]}}),
					  new sap.m.ObjectIdentifier({title:'{menge_npk}', 
				     		  					  text :'',}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}', 
			     		  						  text :'{menge_kpk}',}),
			     	  new sap.m.ObjectIdentifier({title:'{meins_pkx}',
				     		  					  text :''}),]
		}); 
   		var e202TblOvw = new sap.m.Table({
   			id						: "e202TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','e202TblOvw','matnr_in'),
   			       		   oCon.getCol('02','Opn'),
   			       		   oCon.getCol('02','Qty'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_e_wpkbat",template:e202RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var e202schMain   = oCon.getSchMain('e202','e202TblOvw',['matnr_in','maktx_in','charg']);
   		var e202pullMain  = oCon.getPullMain('e202','SAPEVT_E202','evt_e202');
		var e202lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Start/Continue Pick"});
		var e202btnCls    = new sap.m.Button({id:'e202btnCls',icon:"sap-icon://accept",text:'Close',press:oCon.ui5Dispatch});
		var e202btnBck    = new sap.m.Button({id:'e202btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e202page = new sap.m.Page({
			id				: 'e202page',
			customHeader	: new sap.m.Bar({contentLeft:	[e202btnBck],
											 contentMiddle:	[e202lblTitle],
											 contentRight:	[e202btnCls],}),
			content			: [e202pullMain,e202schMain,e202TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e202page];
	}

});