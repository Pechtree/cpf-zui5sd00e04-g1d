sap.ui.jsview("zui5sd00e04.view.I.I407", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.I.I407
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I407";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.I.I407
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Batch List
		//-------------------------------------------------------------------------------
		var i407RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : ''}),
					  new sap.m.ObjectIdentifier({title: '{charg}',
											      text : {path:"vfdat",formatter:oFmt.fmtDate}}),
					  new sap.m.ObjectIdentifier({title: '{menge_ckg}',
												  text : '{meins_kgx}'}),],
		}); 
   		var i407TblBat = new sap.m.Table({
   			id			: "i407TblBat",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','i407TblBat','matnr_in'),
   			       		   oCon.getCol('08','Batch','','','i407TblBat','charg'),
   			       		   oCon.getCol('02','Cnf-in')],
   			items		: {path:"/t_i_pcibat",template:i407RowIng},
   		});	
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var i407pullMain   = oCon.getSchMain('i407','i407TblBat',['matnr_fg','maktx_fg']);
   		var i407schMain  = oCon.getPullMain('i407','SAPEVT_I414','evt_i414');
   		
		var i407lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Actual Component"});
		var i407btnBck    = new sap.m.Button({id:'i407btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i407page = new sap.m.Page({
			id				: 'i407page',
			customHeader	: new sap.m.Bar({contentLeft:	[i407btnBck],
											 contentMiddle:	[i407lblTitle],
											 contentRight:	[],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [i407pullMain,i407schMain,i407TblBat]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i407page];
	}

});