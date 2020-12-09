sap.ui.jsview("zui5sd00e04.I.I105", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I105
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.I.I105";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I105
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Batch List
		//-------------------------------------------------------------------------------
		var i105RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : ''}),
					  new sap.m.ObjectIdentifier({title: '{charg}',
											      text : {path:"vfdat",formatter:oFmt.fmtDate}}),
					  new sap.m.ObjectIdentifier({title: '{menge_ckg}',
												  text : '{meins_kgx}'}),],
		}); 
   		var i105TblBat = new sap.m.Table({
   			id			: "i105TblBat",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','i105TblBat','matnr_in'),
   			       		   oCon.getCol('08','Batch','','','i105TblBat','charg'),
   			       		   oCon.getCol('02','Cnf-in')],
   			items		: {path:"/t_i_pcibat",template:i105RowIng},
   		});	
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var i105pullMain   = oCon.getSchMain('i105','i105TblBat',['matnr_fg','maktx_fg']);
   		var i105schMain  = oCon.getPullMain('i105','SAPEVT_I105','evt_i105');
   		
		var i105lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Actual Component"});
		var i105btnBck    = new sap.m.Button({id:'i105btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i105page = new sap.m.Page({
			id				: 'i105page',
			customHeader	: new sap.m.Bar({contentLeft:	[i105btnBck],
											 contentMiddle:	[i105lblTitle],
											 contentRight:	[],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [i105pullMain,i105schMain,i105TblBat]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i105page];
	}

});