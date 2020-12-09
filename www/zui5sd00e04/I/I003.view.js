sap.ui.jsview("zui5sd00e04.I.I003", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I.I003
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.I.I003";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I.I003
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Batch List
		//-------------------------------------------------------------------------------
		var i003RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : '{matnr_fg} {maktx_fg}'}),
					  new sap.m.ObjectIdentifier({title: '{charg}',
											      text : {path:"vfdat",formatter:oFmt.fmtDate}}),
					  new sap.m.ObjectIdentifier({title: '{menge_ckg}',
												  text : '{meins_kgx}'}),],
		}); 
   		var i003TblBat = new sap.m.Table({
   			id			: "i003TblBat",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','i003TblBat','matnr_in'),
   			       		   oCon.getCol('08','Batch','','','i003TblBat','charg'),
   			       		   oCon.getCol('02','Cnf-in')],
   			items		: {path:"/t_i_pcibat",template:i003RowIng},
   		});	
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var i003lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Actual Component"});
		var i003btnBck    = new sap.m.Button({id:'i003btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i003page = new sap.m.Page({
			id				: 'i003page',
			customHeader	: new sap.m.Bar({contentLeft:	[i003btnBck],
											 contentMiddle:	[i003lblTitle],
											 contentRight:	[],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [i003TblBat]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i003page];
	}

});