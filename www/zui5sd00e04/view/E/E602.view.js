sap.ui.jsview("zui5sd00e04.view.E.E602", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E602
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E602";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E602
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	Picking Order Item
	//	-------------------------------------------------------------------------------
		
		var e602RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_in} {maktx_in}',
												  text :{parts:[{path:'charg'},
												                {path:'vfdat',formatter:oFmt.fmtDate}]}}),
					  new sap.m.ObjectIdentifier({title:'{menge_ikg}', 
				     		  					  text :'',}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_kkg}', 
			     		  						  text :'',}),
			     	  new sap.m.ObjectIdentifier({title:'{meins_kg}',
				     		  					  text :''}),]
		}); 
		
   		var e602TblOvw = new sap.m.Table({
   			id						: "e602TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress				: oCon.ui5Dispatch,
   			columns					: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','e602TblOvw','matnr_in'),
   									   oCon.getCol('02','Open'),
   									   oCon.getCol('02','Actual'),
   									   oCon.getCol('03','UoM'),],
   			items					: {path:"/t_e_wpkbat",template:e602RowOvw},
   		});
   		
   	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   		
   		var e602schMain   = oCon.getSchMain('e602','e602TblOvw',['matnr_in','maktx_in','charg']);
   		var e602pullMain  = oCon.getPullMain('e602','SAPEVT_E602','evt_e602');
		var e602lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Picking Order - Close"});
		var e602btnCls    = new sap.m.Button({id:'e602btnCls',icon:"sap-icon://accept",text:'Close',press:oCon.ui5Dispatch});
		var e602btnBck    = new sap.m.Button({id:'e602btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e602btnHom    = new sap.m.Button({id:'e602btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var e602page = new sap.m.Page({
			id				: 'e602page',
			customHeader	: new sap.m.Bar({contentLeft:	[e602btnBck, e602btnHom],
											 contentMiddle:	[e602lblTitle],
											 contentRight:	[e602btnCls],}),
			content			: [e602pullMain,e602schMain,e602TblOvw]
		});	
   		
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------

		this.setDisplayBlock(true);
		return [e602page];

	}
});