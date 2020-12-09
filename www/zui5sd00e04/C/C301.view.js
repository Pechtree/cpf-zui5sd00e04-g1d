sap.ui.jsview("zui5sd00e04.C.C301", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.C.C301
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.C.C301";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.C.C301
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Overview Table
		//-------------------------------------------------------------------------------
		var c301RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title : {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},{path:'aprio'}]},
					 							 text	: {path:"gstrp",formatter:oFmt.fmtDate}}),
					  new sap.m.ObjectIdentifier({title : '',
				     		   					  text  : '{matnr_fg} {maktx_fg}'}),
					  new sap.m.ObjectIdentifier({title : '{pmxnr}',
											      text  : '{matnr_px} {maktx_px}'}),
					  new sap.m.ObjectIdentifier({title : '{menge_rst}',
						  						  text  : ''}),
					  new sap.m.ObjectIdentifier({title : '{menge_lst}',
						                          text  : ''}),
					  new sap.m.ObjectIdentifier({title : '{menge_fst}',
						                          text  : ''}),
					  new sap.m.ObjectIdentifier({title : '{menge_nst}',
						                          text  : ''}),]
		}); 
   		var c301TblOvw = new sap.m.Table({
   			id						: "c301TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','Order','','','c301TblOvw','aufnr'),
   			       		   oCon.getCol('07','FG','','','c301TblOvw','matnr_fg'),
   			       		   oCon.getCol('07','Pmx','','','c301TblOvw','matnr_px'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Pln'),
   			       		   oCon.getCol('02','Bck'),
   			       		   oCon.getCol('02','Opn'),],
   			items		: {path:"/t_c_xorovw",template:c301RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var c301btnDate	  = oCon.getBtnDate('c301');
		var c301DiaDate   = oCon.getDialogDate('c301',"SAPEVT_C301","evt_c301");
   		var c301schMain   = oCon.getSchMain('c301','c301TblOvw',['aufnr','pmxnr','matnr_fg','maktx_fg','matnr_px','maktx_px']);
   		var c301pullMain  = oCon.getPullMain('c301','SAPEVT_C301','evt_c301');
   		
		var c301lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Premix Orders Overview"});
		var c301btnDis    = new sap.m.Button({id:'c301btnDis',icon:"sap-icon://display",text:'Display Ing',press:oCon.ui5Dispatch});
		var c301btnBck    = new sap.m.Button({id:'c301btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var c301page = new sap.m.Page({
			id				: 'c301page',
			customHeader	: new sap.m.Bar({contentLeft:	[c301btnBck,c301btnDate],
											 contentMiddle:	[c301lblTitle],
											 contentRight:	[c301btnDis],}),
			content			: [c301pullMain,c301schMain,c301TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [c301page];
	}

});