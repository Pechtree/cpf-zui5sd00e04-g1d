sap.ui.jsview("zui5sd00e04.I.I204", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I204
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.I.I204";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I204
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Process Order
		//-------------------------------------------------------------------------------
		var i204RowAuf = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title : {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},{path:'aprio'}]},
					  							   text	: {path:"gstrp",formatter:oFmt.fmtDate}}),
			     	   new sap.m.ObjectIdentifier({title: '{matnr_fg}',
			     		   						   text : '{maktx_fg}'}),
			     	   new sap.m.ObjectIdentifier({title: '{menge_rkg}',
			     		   						   text : ''}),]
		}); 
   		var i204TblAuf = new sap.m.Table({
   			id						: "i204TblAuf",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster, 
			itemPress				: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Order','','','i204TblAuf','aufnr'),
   			       		   oCon.getCol('07','FG','','','i204TblAuf','matnr_fg'),
   			       		   oCon.getCol('02','Req'),],
   			items		: {path:"/t_i_pciovw",template:i204RowAuf},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   		
		var i204btnDate	  = oCon.getBtnDate('i204');
		var i204DiaDate   = oCon.getDialogDate('i204',"SAPEVT_I207","evt_i207");
   		var i204schMain   = oCon.getSchMain('i204','i204TblAuf',['matnr_fg','maktx_fg']);
   		var i204pullMain  = oCon.getPullMain('i204','SAPEVT_I207','evt_i207');
   		
		var i204lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Target Order"});
		var i204btnBck    = new sap.m.Button({id:'i204btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i204page = new sap.m.Page({
			id				: 'i204page',
			customHeader	: new sap.m.Bar({contentLeft:	[i204btnBck,i204btnDate],
											 contentMiddle:	[i204lblTitle],
											 contentRight:	[],}),
			content			: [i204pullMain,i204schMain,i204TblAuf]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i204page];
	}

});