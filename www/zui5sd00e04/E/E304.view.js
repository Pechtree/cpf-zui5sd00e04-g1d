sap.ui.jsview("zui5sd00e04.E.E304", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.E304
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.E.E304";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.E304
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Total Determination
		//-------------------------------------------------------------------------------
		var e304RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_in}',
												  text :'{maktx_in}'}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}',
			     		  						  text :'{meins_pkx}'}),]
		}); 
   		var e304TblIng = new sap.m.Table({
   			id						: "e304TblIng",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','e304TblIng','matnr_in'),
   			       		   oCon.getCol('02','Req'),],
   			items		: {path:"/t_e_wpking",template:e304RowIng},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   		
   		var e304schMain   = oCon.getSchMain('e304','e304TblIng',['matnr_in','maktx_in']);
   		var e304pullMain  = oCon.getPullMain('e304','SAPEVT_e304','evt_e304');
		var e304lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Ingredient Picking Total"});
		var e304btnBat    = new sap.m.Button({id:'e304btnBat',icon:"sap-icon://display",text:'Batch',press:oCon.ui5Dispatch});
		var e304btnBck    = new sap.m.Button({id:'e304btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e304page = new sap.m.Page({
			id				: 'e304page',
			customHeader	: new sap.m.Bar({contentLeft:	[e304btnBck],
											 contentMiddle:	[e304lblTitle],
											 contentRight:	[e304btnBat],}),
			content			: [e304pullMain,e304schMain,e304TblIng]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e304page];
	}

});