sap.ui.jsview("zui5sd00e04.view.C.C103", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.C103
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.C.C103";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.C103
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Process Order
		//-------------------------------------------------------------------------------
		var c103RowPmx = new sap.m.ColumnListItem({
			cells	:[new sap.m.ObjectIdentifier({title  : {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},{path:'aprio'}]},
			     		  						  text	 : {path:"gstrp",formatter:oFmt.fmtDate}}),
			     	   new sap.m.ObjectIdentifier({title : '{matnr_fg} ({meins_kg})',
			     		   						   text  : {parts:[{path:'maktx_fg'},
			     		   						                   {path:'menge_pkg',formatter:oFmt.fmtAmt}],
			     		   						            formatter:oFmt.fmtPkg}
			     	   							 }),
			     	   new sap.m.ObjectIdentifier({title : {path:"menge_rst",formatter:oFmt.fmtAmt},
			     		   						   text  : {path:"menge_rkg",formatter:oFmt.fmtInt}}),
			     	   new sap.m.ObjectIdentifier({title : {path:"menge_lst",formatter:oFmt.fmtAmt},
			     		   						   text  : ''}),
			     	   new sap.m.ObjectIdentifier({title : {path:"menge_bst",formatter:oFmt.fmtAmt},
			     		   						   text  : ''}),]
		}); 
   		var c103TblPmx = new sap.m.Table({
   			id						: "c103TblPmx",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.MultiSelect,
   			columns		: [oCon.getCol('08','Order','','','c103TblPmx','aufnr'),
   			       		   oCon.getCol('07','FG','','','c103TblPmx','matnr_fg'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Plan'),
   			       		   oCon.getCol('02','Bal'),],
   			items		: {path:"/t_c_xorauf",template:c103RowPmx},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var c103DiaEdt    = oCon.getDialogEditInp('c103','SET');
   		var c103DiaDate   = oCon.getDialogDate('c103',"SAPEVT_C105","evt_c105");
   		var c103btnDate	  = oCon.getBtnDate('c103');
   		var c103schMain   = oCon.getSchMain('c103','c103TblPmx',['aufnr','matnr_fg','maktx_fg']);
   		var c103pullMain  = oCon.getPullMain('c103','SAPEVT_C105','evt_c105');
   		
		var c103lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Process Orders"});
		var c103btnAct    = new sap.m.Button({id:'c103btnAct',icon:"sap-icon://accept",text:'Action',press:oCon.ui5Dispatch});
		var c103btnEdt    = new sap.m.Button({id:'c103btnEdt',icon:"sap-icon://edit",text:'KG Set',press:oCon.ui5Dispatch});
		var c103btnBck    = new sap.m.Button({id:'c103btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var c103page = new sap.m.Page({
			id				: 'c103page',
			customHeader	: new sap.m.Bar({contentLeft:	[c103btnBck,c103btnDate],
											 contentMiddle:	[c103lblTitle],
											 contentRight:	[c103btnEdt,c103btnAct],}),
			content			: [c103pullMain,c103schMain,c103TblPmx]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [c103page];
	}

});