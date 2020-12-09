sap.ui.jsview("zui5sd00e04.D.D402", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.D402
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.D.D402";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.D402
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Overview
		//-------------------------------------------------------------------------------
		var d402RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title : '{matnr_px} {maktx_px}',
                 								  text  : {path:'pmxnr',formatter:oFmt.fmtAlpha}}),
			     	  new sap.m.ObjectIdentifier({title : '{matnr_fg} {maktx_fg}',
												  text  : {parts:[{path:'aufnr'},
												                  {path:'gstrp',formatter:oFmt.fmtDate},
												                  {path:'aprio'}]}}),
			     	  new sap.m.ObjectIdentifier({title : '{menge_rst}',
			     		  					 	  text  : ''}),
			     	  new sap.m.ObjectIdentifier({title : '{menge_lst}',
				     		  					 text  : ''}),
				      new sap.m.ObjectIdentifier({title : '{menge_bst}',
					     		  				  text  : ''}),
			     	  new sap.m.Button({press			: oController.fcodeDec,
			     					    icon			: "sap-icon://less",}),
			     	  new sap.m.Link({text:"{menge_ist}",press:oController.fcodeEdt}),
			     	  new sap.m.Button({press			: oController.fcodeInc,
			     					    icon			: "sap-icon://add",}),]
		}); 
   		var d402TblOvw = new sap.m.Table({
   			id						: "d402TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster, 
   			columns		: [oCon.getCol('07','Pmx','','','d402TblOvw','pmxnr'),
   			       		   oCon.getCol('07','FG','','','d402TblOvw','matnr_fg'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Plan'),
   			       		   oCon.getCol('02','Bal'),
   			       		   oCon.getCol('04',''),
   			               oCon.getCol('05','Order'),
   			               oCon.getCol('04',''),],
   			items		: {path:"/t_d_xrsovw",template:d402RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var d402schMain   = oCon.getSchMain('d402','d402TblOvw',['aufnr','pmxnr','matnr_fg','maktx_fg','matnr_px','maktx_px']);
   		var d402pullMain  = oCon.getPullMain('d402','SAPEVT_D402','evt_d402');
   		var d402DiaEdt    = oCon.getDialogEditInp('d402','SET');
   		
		var d402lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Stock Transfer Orders - Premix Order"});
		var d402btnDis    = new sap.m.Button({id:'d402btnDis',icon:"sap-icon://display",text:'Display',press:oCon.ui5Dispatch});
		var d402btnAct    = new sap.m.Button({id:'d402btnAct',icon:"sap-icon://accept",text:'Action',press:oCon.ui5Dispatch});
		var d402btnBck    = new sap.m.Button({id:'d402btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d402page = new sap.m.Page({
			id				: 'd402page',
			customHeader	: new sap.m.Bar({contentLeft:	[d402btnBck],
											 contentMiddle:	[d402lblTitle],
											 contentRight:	[d402btnDis,d402btnAct],}),
			content			: [d402pullMain,d402schMain,d402TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [d402page];
	}

});