sap.ui.jsview("zui5sd00e04.view.E.E503", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E503
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E503";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E503
	*/ 
	createContent : function(oController) {
		

		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var e503RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{tfrnr}',
												  text :{parts:[{path:'vlenr'},{path:'vlpla'},{path:'charg'},
												                {path:'vfdat',formatter:oFmt.fmtDate}]}}),
					  new sap.m.ObjectIdentifier({title:'{menge_npk}', 
				     		  					  text :'',}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}', 
			     		  						  text :'{menge_kpk}',}),
			     	  new sap.m.ObjectIdentifier({title:'{meins_pkx}',
				     		  					  text :''}),]
		}); 
   		var e503TblOvw = new sap.m.Table({
   			id						: "e503TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>Tfr Order}','','','e503TblOvw','tfrnr'),
   			       		   oCon.getCol('02','Opn'),
   			       		   oCon.getCol('02','T/A.Pck'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_e_wpktfr",template:e503RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var e503schMain   = oCon.getSchMain('e503','e503TblOvw',['matnr_in','maktx_in','charg','tfrnr']);
   		var e503pullMain  = oCon.getPullMain('e503','SAPEVT_E503','evt_e503');
		var e503lblTitle  = new sap.m.Label({id:'e503lblTitle',design:sap.m.LabelDesign.Bold,text:"{/t_e_wpktfr/0/matnr_in} {/t_e_wpktfr/0/maktx_in}"});
		//var e503btnDis    = new sap.m.Button({id:'e503btnAcc',icon:"sap-icon://accept",text:'',press:oCon.ui5Dispatch});
		//var e503btnDet    = new sap.m.Button({id:'e503btnDis',icon:"sap-icon://display",text:'',press:oCon.ui5Dispatch});
		var e503btnBck    = new sap.m.Button({id:'e503btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e503btnHom    = new sap.m.Button({id:'e503btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		
		var e503page = new sap.m.Page({
			id				: 'e503page',
			customHeader	: new sap.m.Bar({contentLeft:	[e503btnBck,e503btnHom],
											 contentMiddle:	[e503lblTitle],
											 contentRight:	[],}),
			content			: [e503pullMain,e503schMain,e503TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e503page];
 		
 		
	}

});