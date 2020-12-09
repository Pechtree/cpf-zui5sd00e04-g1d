sap.ui.jsview("zui5sd00e04.E.E307", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.E307
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.E.E307";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.E307
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Batch Determination
		//-------------------------------------------------------------------------------
		var e307RowBat = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_in}',
												  text :'{maktx_in}'}),
			     	  new sap.m.ObjectIdentifier({title:'{charg}',
			     		  						  text : {path:'vfdat',formatter:oFmt.fmtDate}}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}',
			     		  						  text :'{meins_pkx}'}),]
		}); 
   		var e307TblBat = new sap.m.Table({
   			id						: "e307TblBat",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','e307TblBat','matnr_in'),
   			       		   oCon.getCol('08','Batch','','','e307TblBat','vfdat'),
   			       		   oCon.getCol('02','Req'),],
   			items		: {path:"/t_e_wpkbat",template:e307RowBat},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var e307schMain   = oCon.getSchMain('e307','e307TblBat',['matnr_in','maktx_in','charg']);
   		var e307pullMain  = oCon.getPullMain('e307','SAPEVT_e307','evt_e307');
		var e307lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Ingredient Picking Batch"});
		var e307btnSav    = new sap.m.Button({id:'e307btnSav',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch});
		var e307btnBck    = new sap.m.Button({id:'e307btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e307page = new sap.m.Page({
			id				: 'e307page',
			customHeader	: new sap.m.Bar({contentLeft:	[e307btnBck],
											 contentMiddle:	[e307lblTitle],
											 contentRight:	[e307btnSav],}),
			content			: [e307pullMain,e307schMain,e307TblBat]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e307page];
	}

});