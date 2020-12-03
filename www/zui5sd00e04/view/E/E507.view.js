sap.ui.jsview("zui5sd00e04.view.E.E507", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E507
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E507";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E507
	*/ 
	createContent : function(oController) {
		
		
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var e507RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,												                
			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_in} {maktx_in}',
												  text :{parts:[{path:'lenum'},{path:'lgpla'},{path:'charg'},
														  		{path:'vfdat',formatter:oFmt.fmtDate}]}}),		
														  							
					  new sap.m.ObjectIdentifier({title:'{menge_kpk}', 
				     		  					  text :'',}),
//			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}', 
//			     		  						  text :'{menge_kpk}',}),
			     	  new sap.m.ObjectIdentifier({title:'{meins_pkx}',
				     		  					  text :''}),]
		}); 
   		var e507TblOvw = new sap.m.Table({
   			id						: "e507TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>Raw Mat}','','','e507TblOvw','matnr_in'),
   			       		   oCon.getCol('02','Pick'),
//   			       		   oCon.getCol('02','T/A.Pck'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_e_wpkbat",template:e507RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var e507schMain   = oCon.getSchMain('e507','e507TblOvw',['matnr_in','maktx_in','charg']);
   		var e507pullMain  = oCon.getPullMain('e511','SAPEVT_E511','evt_e511');
		var e507lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"(3) Start/Continue Pick"});
		//var e507btnDis    = new sap.m.Button({id:'e507btnAcc',icon:"sap-icon://accept",text:'',press:oCon.ui5Dispatch});
		//var e507btnDet    = new sap.m.Button({id:'e507btnDis',icon:"sap-icon://display",text:'',press:oCon.ui5Dispatch});
		var e507btnBck    = new sap.m.Button({id:'e507btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e507btnHom    = new sap.m.Button({id:'e507btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		
		var e507page = new sap.m.Page({
			id				: 'e507page',
			customHeader	: new sap.m.Bar({contentLeft:	[e507btnBck,e507btnHom],
											 contentMiddle:	[e507lblTitle],
											 contentRight:	[],}),
			content			: [e507pullMain,e507schMain,e507TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e507page];

 		
 		
 		
	}

});