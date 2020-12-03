sap.ui.jsview("zui5sd00e04.view.E.E103", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.E103
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E103";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.E103
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var e103RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : {parts:[{path:'charg'},
												                 {path:'vfdat',formatter:oFmt.fmtDate}]}}),
			     	  new sap.m.ObjectIdentifier({title: '{menge_kpk}',
			     		  						  text : ''}),
			     	  new sap.m.ObjectIdentifier({title: '{meins_pkx}',
				     		  				      text : ''}),]
		}); 
   		var e103TblOvw = new sap.m.Table({
   			id						: "e103TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','e103TblOvw','matnr_in'),
   			       		   oCon.getCol('06','Pck'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_e_wpkbat",template:e103RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var e103schMain   = oCon.getSchMain('e103','e103TblOvw',['matnr_in','maktx_in','charg']);
   		var e103pullMain  = oCon.getPullMain('e103','SAPEVT_E104','evt_e104');
		var e103lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Actual Pick Batch"});
		var e103btnBck    = new sap.m.Button({id:'e103btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e103page = new sap.m.Page({
			id				: 'e103page',
			customHeader	: new sap.m.Bar({contentLeft:	[e103btnBck],
											 contentMiddle:	[e103lblTitle],
											 contentRight:	[],}),
			content			: [e103pullMain,e103schMain,e103TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e103page];
	}

});