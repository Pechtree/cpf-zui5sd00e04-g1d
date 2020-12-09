sap.ui.jsview("zui5sd00e04.view.I.I201", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I201
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I201";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I201
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Confirm - in
		//-------------------------------------------------------------------------------
		var i201RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{ltxa1}',															// ++ 2018.12.17 :: Confirmation Overview V1.3.1
					  //new sap.m.ObjectIdentifier({title: '{charg}',														// -- 2018.12.17 :: Confirmation Overview V1.3.1
												  text : ''}),
					  new sap.m.ObjectIdentifier({title: '{matnr_fg} {maktx_fg}',
												  text : '{vornr} {bezei} {rueck}'}),
					  new sap.m.ObjectIdentifier({title: {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},{path:'aprio'}]},
				     		  				      text : {path:"gstrp",formatter:oFmt.fmtDate}}),
				      new sap.m.ObjectIdentifier({title: {path:"rueck",formatter:oFmt.fmtAlpha},
												  text : {path:"rmzhl",formatter:oFmt.fmtAlpha}}),
					  new sap.m.ObjectIdentifier({title: {path:"isdd",formatter:oFmt.fmtDate},
					                              text : {path:"isdz",formatter:oFmt.fmtTime}}),
					  new sap.m.ObjectIdentifier({title: '{menge_cst}',
												  text : '{meins_st}'}),],
		}); 
   		var i201TblCnf = new sap.m.Table({
   			id			: "i201TblCnf",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Cnf-in','','','i201TblCnf','cnfnr'),
   			       		   oCon.getCol('07','FG','','','i201TblCnf','matnr_fg'),
   			       		   oCon.getCol('08','Ord','','','i201TblCnf','aufnr'),
   			       		   oCon.getCol('08','Conf','','','i201TblCnf','rueck'),
   			       		   oCon.getCol('08','Start','','','i201TblCnf','isdd'),
   			       		   oCon.getCol('02','SET')],
   			items		: {path:"/t_i_pcicnf",template:i201RowIng},
   		});	
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var i201schMain   = oCon.getSchMain('i201','i201TblCnf',['matnr_fg','maktx_fg']);
   		var i201pullMain  = oCon.getPullMain('i201','SAPEVT_I201','evt_I201');
		var i201btnDate	  = oCon.getBtnDate('i201');
		var i201DiaDate   = oCon.getDialogDate('i201',"SAPEVT_I201","evt_i201");
		
		var i201lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Confirmation Overview"});
		var i201btnBck    = new sap.m.Button({id:'i201btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i201page = new sap.m.Page({
			id				: 'i201page',
			customHeader	: new sap.m.Bar({contentLeft:	[i201btnBck,i201btnDate],
											 contentMiddle:	[i201lblTitle],
											 contentRight:	[],}),
			content			: [i201pullMain,i201schMain,i201TblCnf]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i201page];
	}

});