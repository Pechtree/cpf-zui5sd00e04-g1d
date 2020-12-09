sap.ui.jsview("zui5sd00e04.F.F102", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.F102
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.F.F102";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.F102
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Process Order
		//-------------------------------------------------------------------------------
		var f102RowAuf = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[ new sap.m.ObjectIdentifier({title: {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},{path:'aprio'}]},
					  							   text : {path:"gstrp",formatter:oFmt.fmtDate}}),					  
			     	   new sap.m.ObjectIdentifier({title: '{matnr_fg}',
			     		   						   text : '{maktx_fg}'}),
			     	   new sap.m.ObjectIdentifier({title: '{menge_rkg}',
			     		   						   text : ''}),]
		}); 
   		var f102TblAuf = new sap.m.Table({
   			id						: "f102TblAuf",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster, 
			itemPress				: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Order','','','f102TblAuf','aufnr'),
   			       		   oCon.getCol('07','FG','','','f102TblAuf','matnr_fg'),
   			       		   oCon.getCol('02','Req'),],
   			items		: {path:"/t_f_xwiauf",template:f102RowAuf},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------		
		var f102btnDate	  = oCon.getBtnDate('f102');
		var f102DiaDate   = oCon.getDialogDate('f102',"SAPEVT_F104","evt_f104");
   		var f102schMain   = oCon.getSchMain('f102','f102TblAuf',['aufnr','matnr_fg','maktx_fg']);
   		var f102pullMain  = oCon.getPullMain('f102','SAPEVT_F104','evt_f104');
   		
   		var f102lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Weight Ingredient : Process Order"});
		var f102btnBck    = new sap.m.Button({id:'f102btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var f102page = new sap.m.Page({
			id				: 'f102page',
			customHeader	: new sap.m.Bar({contentLeft:	[f102btnBck,f102btnDate],
											 contentMiddle:	[f102lblTitle],
											 contentRight:	[],}),
			content			: [f102pullMain,f102schMain,f102TblAuf]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [f102page];
	}

});