sap.ui.jsview("zui5sd00e04.view.D.D301", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.D301
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D301";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.D301
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Transfer Order
		//-------------------------------------------------------------------------------
		var d301RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:{path:'tfrnr',formatter:oFmt.fmtAlpha},
												  text :'{matnr_in} {maktx_in} ({vornr})'}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_okg}',
			     		  						  text :'{menge_ost}'}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_kkg}',
			     		  						  text :'{menge_kst}'}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_tkg}',
			     		  						  text :'{menge_tst}'}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_nkg}',
			     		  						  text :'{menge_nst}'}),
			     	  new sap.m.ObjectIdentifier({title:'{meins_kgx}',
				     		  					  text :'{meins_stx}'}),]
		}); 
   		var d301TblOvw = new sap.m.Table({
   			id						: "d301TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','Tfr','','','d301TblOvw','matnr_in'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Pck'),
   			       		   oCon.getCol('02','Tfr'),
   			       		   oCon.getCol('02','Opn'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_d_xrstfr",template:d301RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var d301DiaDate   = oCon.getDialogDate('d301',"SAPEVT_D301","evt_d301");
   		var d301btnDate	  = oCon.getBtnDate('d301');
   		var d301schMain   = oCon.getSchMain('d301','d301TblOvw',['tfrnr','matnr_in','maktx_in']);
   		var d301pullMain  = oCon.getPullMain('d301','SAPEVT_D301','evt_d301');
   		var d301lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Stock Transfer Order - Overview"});
		var d301btnDel    = new sap.m.Button({id:'d301btnDel',icon:"sap-icon://delete",text:'Cancel',press:oCon.ui5Dispatch});
		var d301btnBck    = new sap.m.Button({id:'d301btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d301page = new sap.m.Page({
			id				: 'd301page',
			customHeader	: new sap.m.Bar({contentLeft:	[d301btnBck,d301btnDate],
											 contentMiddle:	[d301lblTitle],
											 contentRight:	[d301btnDel],}),
			content			: [d301pullMain,d301schMain,d301TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [d301page];
	}

});