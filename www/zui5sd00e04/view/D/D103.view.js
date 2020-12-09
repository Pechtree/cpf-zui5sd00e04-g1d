sap.ui.jsview("zui5sd00e04.view.D.D103", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.D.D103
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D103";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.D.D103
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Transfer Order
		//-------------------------------------------------------------------------------
		var d103RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:{path:'tfrnr',formatter:oFmt.fmtAlpha},
												  text :'{matnr_in} {maktx_in}'}),
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
   		var d103TblOvw = new sap.m.Table({
   			id						: "d103TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('08','Tfr','','','d103TblOvw','matnr_in'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Pck'),
   			       		   oCon.getCol('02','Tfr'),
   			       		   oCon.getCol('02','Opn'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_d_xrstfr",template:d103RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
  		var d103DiaDate   = oCon.getDialogDate('d103',"SAPEVT_D104","evt_d104");
   		var d103btnDate	  = oCon.getBtnDate('d103');
   		
   		var d103schMain   = oCon.getSchMain('d103','d103TblOvw',['tfrnr','matnr_in','maktx_in']);
   		var d103pullMain  = oCon.getPullMain('d103','SAPEVT_D104','evt_d104');
   		
   		var d103lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Stock Transfer Order - Overview"});
		var d103btnDel    = new sap.m.Button({id:'d103btnDel',icon:"sap-icon://delete",text:'Cancel',press:oCon.ui5Dispatch});
		var d103btnBck    = new sap.m.Button({id:'d103btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d103page = new sap.m.Page({
			id				: 'd103page',
			customHeader	: new sap.m.Bar({contentLeft:	[d103btnBck,d103btnDate],
											 contentMiddle:	[d103lblTitle],
											 contentRight:	[d103btnDel],}),
			//footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [d103pullMain,d103schMain,d103TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [d103page];
	}

});