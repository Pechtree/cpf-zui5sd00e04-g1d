sap.ui.jsview("zui5sd00e04.F.F401", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.F.F401
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.F.F401";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.F.F401
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Premix Order
		//-------------------------------------------------------------------------------
		var f401RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_px} {maktx_px}',
			     		  						  text : {parts:[{path:'pmxnr',formatter:oFmt.fmtAlpha},
			     		  						                 {path:'maktx_fg'}]}
					                              }),
			     	  new sap.m.ObjectIdentifier({title:'{menge_rst}',
			     		  						  text :''}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_fst}',
			     		  						  text :''}),
			     	   new sap.m.Button({
			     		    visible			: false,
			     		   	press			: oController.fcodeDec,
			     		   	icon			: "sap-icon://less",}),
			     		   new sap.m.Link({text:"{menge_ist}",press:oController.fcodeEdt}),
			     	  new sap.m.Button({
			     		  	visible			: false,
				     		press			: oController.fcodeInc,
				     		icon			: "sap-icon://add",}),] 
		}); 
   		var f401TblOvw = new sap.m.Table({
   			id			: "f401TblOvw",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			columns		: [oCon.getCol('07','Premix','','','f401TblOvw','matnr_px'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Bck'),
   			       		   oCon.getCol('04',''),
   			       		   oCon.getCol('05','Ord'),
   			       		   oCon.getCol('04',''),],
   			items		: {path:"/t_f_xwiovw",template:f401RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var f401btnDate	  = oCon.getBtnDate('f401');
		var f401DiaDate   = oCon.getDialogDate('f401',"SAPEVT_F401","evt_f401");
   		var f401schMain   = oCon.getSchMain('f401','f401TblOvw',['aufnr','pmxnr','matnr_fg','maktx_fg','matnr_px','maktx_px']);
   		var f401pullMain  = oCon.getPullMain('f401','SAPEVT_F401','evt_f401');
   		
		var f401lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Weight by Premix"});
		var f401btnCnf    = new sap.m.Button({id:'f401btnCnf',icon:"sap-icon://accept",text:"Action",press:oCon.ui5Dispatch});
		var f401btnBck    = new sap.m.Button({id:'f401btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var f401page = new sap.m.Page({
			id				: 'f401page',
			customHeader	: new sap.m.Bar({contentLeft:	[f401btnBck,f401btnDate],
											 contentMiddle:	[f401lblTitle],
											 contentRight:	[f401btnCnf],}),
			content			: [f401pullMain,f401schMain,f401TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [f401page];
	}

});