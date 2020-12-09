sap.ui.jsview("zui5sd00e04.view.E.E504", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E504
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E504";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E504
	*/ 
	createContent : function(oController) {
		
		
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var e504RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{vlenr} {vlpla}',
												  text :{parts:[{path:'charg'},
												                {path:'vfdat',formatter:oFmt.fmtDate}]}}),
					  new sap.m.ObjectIdentifier({title:'{verme}', 
				     		  					  text :'',}),
				     		  					  
//			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}', 
//			     		  						  text :'{menge_kpk}',}),
				     		  					  
				      new sap.m.Input({value:'{menge_opk}',type:'Number'}),
			     		  						  
			     	  new sap.m.ObjectIdentifier({title:'{meins_pkx}',
				     		  					  text :''}),]
		}); 
   		var e504TblOvw = new sap.m.Table({
   			id						: "e504TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>Stock}','','','e504TblOvw','matnr'),
   			       		   oCon.getCol('02','Stock'),
   			       		   oCon.getCol('02','T Pck'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_e_wpkchg",template:e504RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var e504schMain   = oCon.getSchMain('e504','e504TblOvw',['matnr_in','maktx_in','charg','vlenr']);
   		var e504pullMain  = oCon.getPullMain('e504','SAPEVT_E504','evt_e504');
		var e504lblTitle  = new sap.m.Label({id:'e504lblTitle',design:sap.m.LabelDesign.Bold,text:"{/t_e_wpkchg/0/matnr_in} {/t_e_wpkchg/0/maktx_in} (Target {/t_e_wpkchg/0/menge})"});
		var e504btnAcp    = new sap.m.Button({id:'e504btnAcp',icon:"sap-icon://accept",text:'',press:oCon.ui5Dispatch});
		var e504btnBck    = new sap.m.Button({id:'e504btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e504btnHom    = new sap.m.Button({id:'e504btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		
		var e504page = new sap.m.Page({
			id				: 'e504page',
			customHeader	: new sap.m.Bar({contentLeft:	[e504btnBck,e504btnHom],
											 contentMiddle:	[e504lblTitle],
											 contentRight:	[e504btnAcp],}),
			content			: [e504pullMain,e504schMain,e504TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e504page];
 		
 		
 		
	}

});