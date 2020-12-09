sap.ui.jsview("zui5sd00e04.I.I107", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I107
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.I.I107";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I107
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Batch List
		//-------------------------------------------------------------------------------
		var i107RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : ''}),
					  new sap.m.ObjectIdentifier({title: '{charg}',
											      text : {path:"vfdat",formatter:oFmt.fmtDate}}),
					  new sap.m.ObjectIdentifier({title: '{menge_ckg}',
												  text : '{meins_kgx}'}),],
		}); 
   		var i107TblBat = new sap.m.Table({
   			id			: "i107TblBat",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','i107TblBat','matnr_in'),
   			       		   oCon.getCol('08','Batch','','','i107TblBat','charg'),
   			       		   oCon.getCol('02','Cnf-in')],
   			items		: {path:"/t_i_pcibat",template:i107RowIng},
   		});	
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var i107pullMain   = oCon.getSchMain('i107','i107TblBat',['matnr_fg','maktx_fg']);
   		var i107schMain  = oCon.getPullMain('i107','SAPEVT_I114','evt_i114');
   		
		var i107lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Actual Component"});
		var i107btnBck    = new sap.m.Button({id:'i107btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i107page = new sap.m.Page({
			id				: 'i107page',
			customHeader	: new sap.m.Bar({contentLeft:	[i107btnBck],
											 contentMiddle:	[i107lblTitle],
											 contentRight:	[],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [i107pullMain,i107schMain,i107TblBat]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i107page];
	}

});