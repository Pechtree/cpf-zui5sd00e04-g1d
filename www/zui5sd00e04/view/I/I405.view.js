sap.ui.jsview("zui5sd00e04.view.I.I405", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.I.I405
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I405";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.I.I405
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Batch List
		//-------------------------------------------------------------------------------
		var i405RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : ''}),
					  new sap.m.ObjectIdentifier({title: '{charg}',
											      text : {path:"vfdat",formatter:oFmt.fmtDate}}),
					  new sap.m.ObjectIdentifier({title: '{menge_ckg}',
												  text : '{meins_kgx}'}),],
		}); 
   		var i405TblBat = new sap.m.Table({
   			id			: "i405TblBat",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','i405TblBat','matnr_in'),
   			       		   oCon.getCol('08','Batch','','','i405TblBat','charg'),
   			       		   oCon.getCol('02','Cnf-in')],
   			items		: {path:"/t_i_pcibat",template:i405RowIng},
   		});	
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var i405pullMain   = oCon.getSchMain('i405','i405TblBat',['matnr_fg','maktx_fg']);
   		var i405schMain  = oCon.getPullMain('i405','SAPEVT_I405','evt_i405');
   		
		var i405lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Actual Component"});
		var i405btnBck    = new sap.m.Button({id:'i405btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i405page = new sap.m.Page({
			id				: 'i405page',
			customHeader	: new sap.m.Bar({contentLeft:	[i405btnBck],
											 contentMiddle:	[i405lblTitle],
											 contentRight:	[],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [i405pullMain,i405schMain,i405TblBat]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i405page];
	}

});