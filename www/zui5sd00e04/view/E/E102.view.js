sap.ui.jsview("zui5sd00e04.view.E.E102", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.E.E102
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E102";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.E.E102
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var e102RowOvw = new sap.m.ColumnListItem({
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
   		var e102TblOvw = new sap.m.Table({
   			id						: "e102TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','e102TblOvw','matnr_in'),
   			       		   oCon.getCol('02','Opn'),
   			       		   oCon.getCol('02','T/A.Pck'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_e_wpkbat",template:e102RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var e102schMain   = oCon.getSchMain('e102','e102TblOvw',['matnr_in','maktx_in','charg']);
   		var e102pullMain  = oCon.getPullMain('e102','SAPEVT_E102','evt_e102');
		var e102lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Start/Continue Pick"});
		var e102btnDis    = new sap.m.Button({id:'e102btnDis',icon:"sap-icon://display",text:'Actual',press:oCon.ui5Dispatch});
		var e102btnDet    = new sap.m.Button({id:'e102btnDet',icon:"sap-icon://refresh",text:'Batch',press:oCon.ui5Dispatch});
		var e102btnBck    = new sap.m.Button({id:'e102btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e102page = new sap.m.Page({
			id				: 'e102page',
			customHeader	: new sap.m.Bar({contentLeft:	[e102btnBck],
											 contentMiddle:	[e102lblTitle],
											 contentRight:	[e102btnDet,e102btnDis],}),
			content			: [e102pullMain,e102schMain,e102TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e102page];
	}

});