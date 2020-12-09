sap.ui.jsview("zui5sd00e04.view.D.D406", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.D406
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D406";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.D406
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//TABLE: Overview
		//-------------------------------------------------------------------------------
		var d406RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.Text({text:'{stlal}'}),
			     	  new sap.m.ObjectIdentifier({title:'{matnr_px}',text:'{maktx_px}'}),
			     	  new sap.m.ObjectIdentifier({title:'{matnr_in}',text:'{maktx_in}'}),]
		}); 
   		var d406TblIng = new sap.m.Table({
   			id						: "d406TblBom",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectLeft,
   			columns		: [oCon.getCol('09','Alt','','','d406TblBom','stlal'),
   			       		   oCon.getCol('07','Pmx','','','d406TblBom','matnr_px'),
   			       		   oCon.getCol('01','{i18n>COL_RAWMAT}','','','d406TblBom','matnr_in'),],
   			items		: {path:"/t_d_xrsalt",template:d406RowIng},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var d406schMain   = oCon.getSchMain('d406','d406TblBom',['stlal','matnr_px','maktx_px','matnr_in','maktx_in']);
   		// var d406pullMain  = oCon.getPullMain('d406','SAPEVT_D407','evt_d407');
   		var d406pullMain  = oCon.getPullMain('d406','SAPEVT_D417','evt_d417');
		var d406lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Change Alt.BOM"});
		var d406btnSav    = new sap.m.Button({id:'d406btnSav',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch});
		var d406btnBck    = new sap.m.Button({id:'d406btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d406page = new sap.m.Page({
			id				: 'd406page',
			customHeader	: new sap.m.Bar({contentLeft:	[d406btnBck],
											 contentMiddle:	[d406lblTitle],
											 contentRight:	[d406btnSav],}),
			content			: [d406pullMain,d406schMain,d406TblIng]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [d406page];
	}

});