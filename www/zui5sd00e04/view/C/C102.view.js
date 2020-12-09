sap.ui.jsview("zui5sd00e04.view.C.C102", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.C.C001
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.C.C102";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.C.C102
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Overview Table
		//-------------------------------------------------------------------------------
		var c102RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title  : {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},{path:'aprio'}]},
					  							 text	 : {path:"gstrp",formatter:oFmt.fmtDate}}),
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
   		var c102TblOvw = new sap.m.Table({
   			id						: "c102TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('08','Order','','','c102TblOvw','aufnr'),
   			       		   oCon.getCol('07','FG','','','c102TblOvw','matnr_fg'),
   			       		   oCon.getCol('07','Pmx','','','c102TblOvw','matnr_px'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Pln'),
   			       		   oCon.getCol('02','Bck'),
   			       		   oCon.getCol('02','Opn'),],
   			items		: {path:"/t_c_xorovw",template:c102RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var c102DiaDate   = oCon.getDialogDate('c102',"SAPEVT_C103","evt_c103");
   		var c102btnDate	  = oCon.getBtnDate('c102');
   		var c102schMain   = oCon.getSchMain('c102','c102TblOvw',['aufnr','pmxnr','matnr_fg','matnr_px','maktx_fg','maktx_px']);
   		var c102pullMain  = oCon.getPullMain('c102','SAPEVT_C103','evt_c103');
   		
		var c102lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Premix Orders Overview"});
		var c102btnCnc    = new sap.m.Button({id:'c102btnCnc',icon:"sap-icon://decline",text:'Cancel',press:oCon.ui5Dispatch});
		var c102btnBck    = new sap.m.Button({id:'c102btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var c102page = new sap.m.Page({
			id				: 'c102page',
			customHeader	: new sap.m.Bar({contentLeft:	[c102btnBck,c102btnDate],
											 contentMiddle:	[c102lblTitle],
											 contentRight:	[c102btnCnc],}),
			content			: [c102pullMain,c102schMain,c102TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [c102page];
	}

});