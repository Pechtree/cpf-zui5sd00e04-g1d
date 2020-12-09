sap.ui.jsview("zui5sd00e04.view.E.E306", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.E306
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E306";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.E306
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Batch Determination
		//-------------------------------------------------------------------------------
		var e306RowBat = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_in}',
												  text :'{maktx_in}'}),
			     	  new sap.m.ObjectIdentifier({title:'{charg}',
			     		  						  text : {path:'vfdat',formatter:oFmt.fmtDate}}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}',
			     		  						  text :'{meins_pkx}'}),]
		}); 
   		var e306TblBat = new sap.m.Table({
   			id						: "e306TblBat",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','e306TblBat','matnr_in'),
   			       		   oCon.getCol('08','Batch','','','e306TblBat','vfdat'),
   			       		   oCon.getCol('02','Req'),],
   			items		: {path:"/t_e_wpkbat",template:e306RowBat},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var e306schMain   = oCon.getSchMain('e306','e306TblBat',['matnr_in','maktx_in','charg']);
   		//var e306pullMain  = oCon.getPullMain('e306','SAPEVT_E306','evt_e306');
   		var e306pullMain  = oCon.getPullMain('e316','SAPEVT_E316','evt_e316');
		var e306lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Ingredient Picking Batch"});
		var e306btnSav    = new sap.m.Button({id:'e306btnSav',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch});
		var e306btnBck    = new sap.m.Button({id:'e306btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e306page = new sap.m.Page({
			id				: 'e306page',
			customHeader	: new sap.m.Bar({contentLeft:	[e306btnBck],
											 contentMiddle:	[e306lblTitle],
											 contentRight:	[e306btnSav],}),
			content			: [e306pullMain,e306schMain,e306TblBat]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e306page];
	}

});