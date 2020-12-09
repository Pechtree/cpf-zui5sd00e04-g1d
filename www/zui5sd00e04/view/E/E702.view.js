sap.ui.jsview("zui5sd00e04.view.E.E702", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E702
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E702";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E702
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	Picking Order Item
	//	-------------------------------------------------------------------------------
		
		var e702RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_in} {maktx_in}',
				  								  text :{parts:[{path:'lenum'},
				  									  			{path:'lgpla'}]},
												  text :{parts:[{path:'charg'},
												                {path:'vfdat',formatter:oFmt.fmtDate}]}}),
					  new sap.m.ObjectIdentifier({title:'{menge_npk}', 
				     		  					  text :'',}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}', 
			     		  						  text :'{menge_kpk}',}),
			     	  new sap.m.ObjectIdentifier({title:'{meins_pkx}',
				     		  					  text :''}),]
		}); 
		
   		var e702TblOvw = new sap.m.Table({
   			id						: "e702TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress				: oCon.ui5Dispatch,
   			columns					: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','e702TblOvw','matnr_in'),
   									   oCon.getCol('02','Open'),
   									   oCon.getCol('02','Actual'),
   									   oCon.getCol('03','UoM'),],
   			items					: {path:"/t_e_wpkbat",template:e702RowOvw},
   		});
   		
   	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   		
   		var e702schMain   = oCon.getSchMain('e702','e702TblOvw',['matnr_in','maktx_in','charg']);
   		var e702pullMain  = oCon.getPullMain('e702','SAPEVT_E702','evt_e702');
		var e702lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Picking Order - Close"});
		var e702btnCls    = new sap.m.Button({id:'e702btnCls',icon:"sap-icon://accept",text:'Close',press:oCon.ui5Dispatch});
		var e702btnBck    = new sap.m.Button({id:'e702btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e702btnHom    = new sap.m.Button({id:'e702btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var e702page = new sap.m.Page({
			id				: 'e702page',
			customHeader	: new sap.m.Bar({contentLeft:	[e702btnBck, e702btnHom],
											 contentMiddle:	[e702lblTitle],
											 contentRight:	[e702btnCls],}),
			content			: [e702pullMain,e702schMain,e702TblOvw]
		});	
   		
	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [e702page];
		
	}
});