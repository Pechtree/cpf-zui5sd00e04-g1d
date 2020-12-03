sap.ui.jsview("zui5sd00e04.view.E.E405", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E405
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E405";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E405
	*/ 
	createContent : function(oController) {
		
		
		//-------------------------------------------------------------------------------
		//Table: Picking Dummy Bin
		//-------------------------------------------------------------------------------
		var e405RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_in} {maktx_in}',
												  text :{parts:[{path:'charg'},
												                {path:'vfdat',formatter:oFmt.fmtDate}]}}),
					  new sap.m.ObjectIdentifier({title:'', 
				     		  					  text :'',}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_kpk}', 
			     		  						  text :'',}),
			     	  new sap.m.ObjectIdentifier({title:'{meins_pkx}',
				     		  					  text :''}),]
		}); 
   		var e405TblOvw = new sap.m.Table({
   			id						: "e405TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','e405TblOvw','matnr_in'),
   			       		   //oCon.getCol('02','Opn'),
   						   oCon.getCol('02',''),
   			       		   oCon.getCol('02','Pick'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_e_wpkbat",template:e405RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var e405schMain   = oCon.getSchMain('e405','e405TblOvw',['matnr_in','maktx_in','charg']);
   		var e405pullMain  = oCon.getPullMain('e405','SAPEVT_E405','evt_e405');
		var e405lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Start/Continue Pick"});
		var e405btnBck    = new sap.m.Button({id:'e405btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e405btnHom    = new sap.m.Button({id:'e405btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		
		var e405page = new sap.m.Page({
			id				: 'e405page',
			customHeader	: new sap.m.Bar({contentLeft:	[e405btnBck,e405btnHom],
											 contentMiddle:	[e405lblTitle],
											 contentRight:	[],}),
			content			: [e405pullMain,e405schMain,e405TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e405page];
		
 		
 		
	}

});