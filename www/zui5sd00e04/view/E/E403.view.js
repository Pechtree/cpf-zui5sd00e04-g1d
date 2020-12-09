sap.ui.jsview("zui5sd00e04.view.E.E403", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E403
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E403";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E403
	*/ 
	createContent : function(oController) {
		
		
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var e403RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{tfrnr}',
				  								  text :{parts:[{path:'matnr_in'},{path:'maktx_in'},{path:'charg'},
				  								  {path:'vfdat',formatter:oFmt.fmtDate}]}}),
		
//					  new sap.m.ObjectIdentifier({title:'{tfrnr} {matnr_in} {maktx_in}',
//												  text :{parts:[{path:'charg'},
//												                {path:'vfdat',formatter:oFmt.fmtDate}]}}),
					  new sap.m.ObjectIdentifier({title:'{menge_npk}', 
				     		  					  text :'',}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}', 
			     		  						  text :'{menge_kpk}',}),
			     	  new sap.m.ObjectIdentifier({title:'{meins_pkx}',
				     		  					  text :''}),]
		}); 
   		var e403TblOvw = new sap.m.Table({
   			id						: "e403TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>Tfr Order}','','','e403TblOvw','tfrnr'),
   			       		   oCon.getCol('02','Opn'),
   			       		   oCon.getCol('02','T/A.Pck'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_e_wpktfr",template:e403RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var e403schMain   = oCon.getSchMain('e403','e403TblOvw',['matnr_in','maktx_in','charg','tfrnr']);
   		var e403pullMain  = oCon.getPullMain('e403','SAPEVT_E403','evt_e403');
		var e403lblTitle  = new sap.m.Label({id:'e403lblTitle',design:sap.m.LabelDesign.Bold,text:"{/t_e_wpktfr/0/matnr_in} {/t_e_wpktfr/0/maktx_in}"});
		//var e403btnDis    = new sap.m.Button({id:'e403btnAcc',icon:"sap-icon://accept",text:'',press:oCon.ui5Dispatch});
		//var e403btnDet    = new sap.m.Button({id:'e403btnDis',icon:"sap-icon://display",text:'',press:oCon.ui5Dispatch});
		var e403btnBck    = new sap.m.Button({id:'e403btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e403btnHom    = new sap.m.Button({id:'e403btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		
		var e403page = new sap.m.Page({
			id				: 'e403page',
			customHeader	: new sap.m.Bar({contentLeft:	[e403btnBck,e403btnHom],
											 contentMiddle:	[e403lblTitle],
											 contentRight:	[],}),
			content			: [e403pullMain,e403schMain,e403TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e403page];
 		
 		
	}

});