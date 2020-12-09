sap.ui.jsview("zui5sd00e04.view.I.I205", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.I.I205
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I205";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.I.I205
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Process Order
		//-------------------------------------------------------------------------------
		var i205RowAuf = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title : {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},{path:'aprio'}]},
					  							   text	: {path:"gstrp",formatter:oFmt.fmtDate}}),
			     	   new sap.m.ObjectIdentifier({title: '{matnr_fg}',
			     		   						   text : '{maktx_fg}'}),
			     	   new sap.m.ObjectIdentifier({title: '{menge_rkg}',
			     		   						   text : ''}),]
		}); 
   		var i205TblAuf = new sap.m.Table({
   			id						: "i205TblAuf",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster, 
			itemPress				: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Order','','','i205TblAuf','aufnr'),
   			       		   oCon.getCol('07','FG','','','i205TblAuf','matnr_fg'),
   			       		   oCon.getCol('02','Req'),],
   			items		: {path:"/t_i_pciovw",template:i205RowAuf},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   		
		var i205btnDate	  = oCon.getBtnDate('i205');
		var i205DiaDate   = oCon.getDialogDate('i205',"SAPEVT_I209","evt_i209");
   		var i205schMain   = oCon.getSchMain('i205','i205TblAuf',['matnr_fg','maktx_fg']);
   		var i205pullMain  = oCon.getPullMain('i205','SAPEVT_I209','evt_i209');
   		
		var i205lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Confirmation Overview"});
		var i205btnBck    = new sap.m.Button({id:'i205btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i205page = new sap.m.Page({
			id				: 'i205page',
			customHeader	: new sap.m.Bar({contentLeft:	[i205btnBck,i205btnDate],
											 contentMiddle:	[i205lblTitle],
											 contentRight:	[],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [i205pullMain,i205schMain,i205TblAuf]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i205page];
	}

});