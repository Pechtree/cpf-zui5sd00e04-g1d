sap.ui.jsview("zui5sd00e04.view.D.D601", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.D.D601
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D601";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.D.D601
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	Table
	//	------------------------------------------------------------------------------- 
		
		var d601RowOvw = new sap.m.ColumnListItem({
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
   		var d601TblOvw = new sap.m.Table({
   			id						: "d601TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','Tfr','','','d601TblOvw','matnr_in'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Pck'),
   			       		   oCon.getCol('02','Tfr'),
   			       		   oCon.getCol('02','Opn'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_d_xrstfr",template:d601RowOvw},
   		});
		
			
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------

   		var d601DiaDate   = oCon.getDialogDate('d601',"SAPEVT_D601","evt_d601");
   		var d601btnDate	  = oCon.getBtnDate('d601');
   		var d601schMain   = oCon.getSchMain('d601','d601TblOvw',['tfrnr','matnr_in','maktx_in']);
   		var d601pullMain  = oCon.getPullMain('d601','SAPEVT_D601','evt_d601');
   		var d601lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Stock Transfer Order for Non-PRD - Overview"});
		var d601btnDel    = new sap.m.Button({id:'d601btnDel',icon:"sap-icon://delete",text:'Cancel',press:oCon.ui5Dispatch});
		var d601btnBck    = new sap.m.Button({id:'d601btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d601page = new sap.m.Page({
			id				: 'd601page',
			customHeader	: new sap.m.Bar({contentLeft:	[d601btnBck,d601btnDate],
											 contentMiddle:	[d601lblTitle],
											 contentRight:	[d601btnDel],}),
			content			: [d601pullMain,d601schMain,d601TblOvw]
		});	
		
	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------
	
		this.setDisplayBlock(true);
		return [d601page];
			
	}
});