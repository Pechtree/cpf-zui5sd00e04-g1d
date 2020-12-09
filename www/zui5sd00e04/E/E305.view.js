sap.ui.jsview("zui5sd00e04.E.E305", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.E305
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.E.E305";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.E305
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Total Determination
		//-------------------------------------------------------------------------------
		var e305RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_in}',
												  text :'{maktx_in}'}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}',
			     		  						  text :'{meins_pkx}'}),]
		}); 
   		var e305TblIng = new sap.m.Table({
   			id						: "e305TblIng",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','e305TblIng','matnr_in'),
   			       		   oCon.getCol('02','Req'),],
   			items		: {path:"/t_e_wpking",template:e305RowIng},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   		
   		var e305schMain   = oCon.getSchMain('e305','e305TblIng',['matnr_in','maktx_in']);
   		var e305pullMain  = oCon.getPullMain('e305','SAPEVT_E305','evt_e305');
		var e305lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Ingredient Picking Total"});
		var e305btnBat    = new sap.m.Button({id:'e305btnBat',icon:"sap-icon://display",text:'Batch',press:oCon.ui5Dispatch});
		var e305btnBck    = new sap.m.Button({id:'e305btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e305page = new sap.m.Page({
			id				: 'e305page',
			customHeader	: new sap.m.Bar({contentLeft:	[e305btnBck],
											 contentMiddle:	[e305lblTitle],
											 contentRight:	[e305btnBat],}),
			content			: [e305pullMain,e305schMain,e305TblIng]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e305page];
	}

});