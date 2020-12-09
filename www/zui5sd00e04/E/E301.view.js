sap.ui.jsview("zui5sd00e04.E.E301", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.E301
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.E.E301";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.E301
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Transfer Order
		//-------------------------------------------------------------------------------
		var e301RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
			     		  						  text : {parts:[{path:'tfrnr',formatter:oFmt.fmtAlpha},
			     		  						                 {path:'lgort'}]} 
											      }),
			     	  new sap.m.ObjectIdentifier({title: '{menge_opk}',
			     		  						  text : '{meins_pkx}'}),]
		}); 
   		var e301TblOvw = new sap.m.Table({
   			id						: "e301TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.MultiSelect,
   			columns		: [oCon.getCol('07','TfrOrd','','','e301TblOvw','matnr_in'),
   			       		   oCon.getCol('02','Req'),],
   			items		: {path:"/t_e_wpkovw",template:e301RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var e301btnDate	  = oCon.getBtnDate('e301');
		var e301DiaDate   = oCon.getDialogDate('e301',"SAPEVT_E301","evt_e301");
   		var e301schMain   = oCon.getSchMain('e301','e301TblOvw',['tfrnr','matnr_in','maktx_in']);
   		var e301pullMain  = oCon.getPullMain('e301','SAPEVT_E301','evt_e301');
   		
		var e301lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Ingredient Picking"});
		var e301btnAct    = new sap.m.Button({id:'e301btnAct',icon:"sap-icon://accept",text:'Action',press:oCon.ui5Dispatch});
		var e301btnBck    = new sap.m.Button({id:'e301btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e301page = new sap.m.Page({
			id				: 'e301page',
			customHeader	: new sap.m.Bar({contentLeft:	[e301btnBck,e301btnDate],
											 contentMiddle:	[e301lblTitle],
											 contentRight:	[e301btnAct],}),
			content			: [e301pullMain,e301schMain,e301TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e301page];
	}

});