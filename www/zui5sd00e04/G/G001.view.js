sap.ui.jsview("zui5sd00e04.G.G001", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.G.G001
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.G.G001";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.G.G001
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Premix Order
		//-------------------------------------------------------------------------------
		var g001RowOvw = new sap.m.ColumnListItem({
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
			     		   	press			: oController.fcodeDec,
			     		   	icon			: "sap-icon://less",}),
			     		   new sap.m.Link({text:"{menge_ist}",press:oController.fcodeEdt}),
			     	  new sap.m.Button({
				     		press			: oController.fcodeInc,
				     		icon			: "sap-icon://add",}),] 
		}); 
   		var g001TblOvw = new sap.m.Table({
   			id			: "g001TblOvw",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			columns		: [oCon.getCol('07','Premix','','','g001TblOvw','matnr_px'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Bck'),
   			       		   oCon.getCol('04',''),
   			       		   oCon.getCol('05','Ord'),
   			       		   oCon.getCol('04',''),],
   			items		: {path:"/t_g_xbfovw",template:g001RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var g001btnDate	  = oCon.getBtnDate('g001');
		var g001DiaDate   = oCon.getDialogDate('g001',"SAPEVT_G001","evt_g001");
   		var g001schMain   = oCon.getSchMain('g001','g001TblOvw',['pmxnr','matnr_px','maktx_px',]);
   		var g001pullMain  = oCon.getPullMain('g001','SAPEVT_G001','evt_g001');
   		var g001DiaEdt    = oCon.getDialogEditInp('g001','SET');
   		
		var g001lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Premix Finishing"});
		var g001btnDis    = new sap.m.Button({id:'g001btnDis',icon:"sap-icon://display",text:"Mat Doc",press:oCon.ui5Dispatch});
		var g001btnCnf    = new sap.m.Button({id:'g001btnCnf',icon:"sap-icon://accept",text:"Action",press:oCon.ui5Dispatch});
		var g001btnBck    = new sap.m.Button({id:'g001btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var g001page = new sap.m.Page({
			id				: 'g001page',
			customHeader	: new sap.m.Bar({contentLeft:	[g001btnBck,g001btnDate],
											 contentMiddle:	[g001lblTitle],
											 contentRight:	[g001btnDis,g001btnCnf],}),
			content			: [g001pullMain,g001schMain,g001TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [g001page];
	}

});