sap.ui.jsview("zui5sd00e04.view.E.E502", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E502
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E502";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E502
	*/ 
	createContent : function(oController) {
		
		
		
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var e502RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
//			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_in} {maktx_in}',
//												  text :{parts:[{path:'charg'},
//												                {path:'vfdat',formatter:oFmt.fmtDate}]}}),
												                
			cells	:[new sap.m.ObjectIdentifier({title:'{vlenr} {vlpla}',
									  			  text :{parts:[{path:'matnr_in'},{path:'maktx_in'},{path:'charg'},
									  							{path:'vfdat',formatter:oFmt.fmtDate}]}}),							                
					  new sap.m.ObjectIdentifier({title:'{menge_npk}', 
				     		  					  text :'',}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}', 
			     		  						  text :'{menge_kpk}',}),
			     	  new sap.m.ObjectIdentifier({title:'{meins_pkx}',
				     		  					  text :''}),
				      new sap.m.ObjectIdentifier({title:'{tfrnr}',visible:false}),
				      new sap.m.ObjectIdentifier({title:{path:'pospk'},visible:false}),]
		}); 
   		var e502TblOvw = new sap.m.Table({
   			id						: "e502TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','Material','','','e502TblOvw','vlenr'),
   			       		   oCon.getCol('02','Opn'),
   			       		   oCon.getCol('02','T/A.Pck'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_e_wpkbat",template:e502RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var e502schMain   = oCon.getSchMain('e502','e502TblOvw',['matnr_in','maktx_in','charg','vlenr']);
   		var e502pullMain  = oCon.getPullMain('e502','SAPEVT_E502','evt_e502');
		var e502lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"(2) Start/Continue Pick"});
		var e502btnAcp    = new sap.m.Button({id:'e502btnAcp',icon:"sap-icon://accept",text:'',press:oCon.ui5Dispatch});
		var e502btnDis    = new sap.m.Button({id:'e502btnDis',icon:"sap-icon://display",text:'',press:oCon.ui5Dispatch});
		var e502btnBck    = new sap.m.Button({id:'e502btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e502btnEdt   = new sap.m.Button({id:'e502btnEdt',icon:"sap-icon://edit",press:oCon.ui5Dispatch});
		var e502btnDel    = new sap.m.Button({id:'e502btnDel',icon:"sap-icon://delete",press:oCon.ui5Dispatch});
		var e502btnHom    = new sap.m.Button({id:'e502btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		
		var e502page = new sap.m.Page({
			id				: 'e502page',
			customHeader	: new sap.m.Bar({contentLeft:	[e502btnBck,e502btnHom],
											 contentMiddle:	[e502lblTitle],
											 contentRight:	[e502btnDis,e502btnDel,e502btnEdt,e502btnAcp],}),
			content			: [e502pullMain,e502schMain,e502TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e502page];
 		
 		
 		
	}

});