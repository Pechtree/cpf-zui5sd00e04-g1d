sap.ui.jsview("zui5sd00e04.C.C303", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.C.C303
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.C.C303";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.C.C303
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Overview Table
		//-------------------------------------------------------------------------------
		var c303RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title : '{matnr_px}',
				 								 text   : '{maktx_px}'}),
					  new sap.m.ObjectIdentifier({title : '{matnr_in}',
											      text  : '{maktx_in}'}),
					  new sap.m.ObjectIdentifier({title : '{menge_rst}',
						  						  text  : ''}),
					  new sap.m.ObjectIdentifier({title : '{menge_pkg}',
						                          text  : ''}),
					  new sap.m.ObjectIdentifier({title : '{menge_rkg}',
						                          text  : ''}),
					  new sap.m.ObjectIdentifier({title : '{meins_kg}',
							                      text  : ''}),]
		}); 
   		var c303TblOvw = new sap.m.Table({
   			id						: "c303TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','Pmx','','','c303TblOvw','matnr_px'),
   			       		   oCon.getCol('07','{i18n>COL_RAWMAT}','','','c303TblOvw','matnr_in'),
   			       		   oCon.getCol('02','Req Set'),
   			       		   oCon.getCol('02','{i18n>COL_KGETSET}'),
   			       		   oCon.getCol('02','TotReq'),
   			       		   oCon.getCol('02','{i18n>COL_UOM}'),],
   			items		: {path:"/t_c_xoring",template:c303RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var c303schMain   = oCon.getSchMain('c303','c303TblOvw',['matnr_px','maktx_px','matnr_in','maktx_in']);
   		var c303pullMain  = oCon.getPullMain('c303','SAPEVT_C304','evt_c304');
		var c303lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Display Ingredient"});
		var c303btnBck    = new sap.m.Button({id:'c303btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var c303page = new sap.m.Page({
			id				: 'c303page',
			customHeader	: new sap.m.Bar({contentLeft:	[c303btnBck],
											 contentMiddle:	[c303lblTitle],
											 contentRight:	[],}),
			//footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [c303pullMain,c303schMain,c303TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [c303page];
	}

});