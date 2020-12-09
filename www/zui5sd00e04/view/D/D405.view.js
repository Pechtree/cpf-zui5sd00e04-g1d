sap.ui.jsview("zui5sd00e04.view.D.D405", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.D405
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D405";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.D405
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Overview Table
		//-------------------------------------------------------------------------------
		var d405RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title : '{matnr_px}',
				 								 text   : '{maktx_px}'}),
					  new sap.m.ObjectIdentifier({title : '{matnr_in}',
											      text  : '{maktx_in}'}),
				      new sap.m.ObjectIdentifier({title : '{menge_pkg}',
							                      text  : ''}),
					  new sap.m.ObjectIdentifier({title : '{menge_rst}',
						  						  text  : ''}),
					  new sap.m.ObjectIdentifier({title : '{menge_rkg}',
						                          text  : ''}),],
		}); 
   		var d405TblOvw = new sap.m.Table({
   			id						: "d405TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','Pmx','','','d405TblOvw','matnr_px'),
   			       		   oCon.getCol('07','{i18n>COL_RAWMAT}','','','d405TblOvw','matnr_in'),
   			       		   oCon.getCol('02','{i18n>COL_KGETSET}'),
   			       		   oCon.getCol('02','Req Set'),
   			       		   oCon.getCol('02','Req KG'),],
   			items		: {path:"/t_d_xrsing",template:d405RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var d405schMain   = oCon.getSchMain('d405','d405TblOvw',['matnr_px','maktx_px','matnr_in','maktx_in']);
   		// var d405pullMain  = oCon.getPullMain('d405','SAPEVT_D406','evt_d406');
   		var d405pullMain  = oCon.getPullMain('d405','SAPEVT_D416','evt_d416');
		var d405lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Display Ingredient"});
		var d405btnDel    = new sap.m.Button({id:'d405btnDel',icon:"sap-icon://delete",text:'Ingredient',press:oCon.ui5Dispatch});
		var d405btnEdt    = new sap.m.Button({id:'d405btnEdt',icon:"sap-icon://edit",text:'Alt.BOM',press:oCon.ui5Dispatch});
		var d405btnBck    = new sap.m.Button({id:'d405btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d405page = new sap.m.Page({
			id				: 'd405page',
			customHeader	: new sap.m.Bar({contentLeft:	[d405btnBck],
											 contentMiddle:	[d405lblTitle],
											 contentRight:	[d405btnDel,d405btnEdt],}),
			content			: [d405pullMain,d405schMain,d405TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [d405page];
	}

});