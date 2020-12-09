sap.ui.jsview("zui5sd00e04.view.E.E505", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E505
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E505";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E505
	*/ 
	createContent : function(oController) {
		
		
		//-------------------------------------------------------------------------------
		//Table: Picking Order (Old)
		//-------------------------------------------------------------------------------
		var e505RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{vlenr} {vlpla}',
												  text :{parts:[{path:'charg'},
												                {path:'vfdat',formatter:oFmt.fmtDate}]}}),
					  new sap.m.ObjectIdentifier({title:'{verme}', 
				     		  					  text :'',}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}'}),
			     	  new sap.m.ObjectIdentifier({title:'{meins_pkx}',
				     		  					  text :''}),]
		}); 
   		var e505TblOvw = new sap.m.Table({
   			id						: "e505TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>Old}','','','e505TblOvw','matnr_in'),
   			       		   oCon.getCol('02','Stock'),
   			       		   oCon.getCol('02','T Pck'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_e_wpkold",template:e505RowOvw},
   		});
   		
		//-------------------------------------------------------------------------------
		//Table: Picking Order (New)
		//-------------------------------------------------------------------------------
		var e505RowOvwN = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{vlenr} {vlpla}',
												  text :{parts:[{path:'charg'},
												                {path:'vfdat',formatter:oFmt.fmtDate}]}}),
					  new sap.m.ObjectIdentifier({title:'{verme}', 
				     		  					  text :'',}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}'}),
			     	  new sap.m.ObjectIdentifier({title:'{meins_pkx}',
				     		  					  text :''}),]
		}); 
   		var e505TblOvwN = new sap.m.Table({
   			id						: "e505TblOvwN",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>New}','','','e505TblOvwN','matnr_in'),
   			       		   oCon.getCol('02','Stock'),
   			       		   oCon.getCol('02','T Pck'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_e_wpknew",template:e505RowOvwN},
   		});
   		
   		
   		
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var e505schMain   = oCon.getSchMain('e505','e505TblOvw',['matnr_in','maktx_in','charg']);
   		var e505pullMain  = oCon.getPullMain('e505','SAPEVT_E505','evt_e505');
		var e505lblTitle  = new sap.m.Label({id:'e505lblTitle',design:sap.m.LabelDesign.Bold,text:"{/t_e_wpkold/0/matnr_in} {/t_e_wpkold/0/maktx_in} (Target {/t_e_wpkold/0/menge_opk})"});
		var e505btnAcp    = new sap.m.Button({id:'e505btnAcp',icon:"sap-icon://accept",text:'',press:oCon.ui5Dispatch});
		var e505btnBck    = new sap.m.Button({id:'e505btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e505btnHom    = new sap.m.Button({id:'e505btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		
		var e505page = new sap.m.Page({
			id				: 'e505page',
			customHeader	: new sap.m.Bar({contentLeft:	[e505btnBck,e505btnHom],
											 contentMiddle:	[e505lblTitle],
											 contentRight:	[e505btnAcp],}),
			content			: [e505pullMain,e505TblOvw,e505TblOvwN] // - e505schMain
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e505page];

 		
 		
	}

});