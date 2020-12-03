sap.ui.jsview("zui5sd00e04.view.E.E402", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E402
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E402";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E402
	*/ 
	createContent : function(oController) {

	//	-------------------------------------------------------------------------------
	//	Table: Picking Order
	//	-------------------------------------------------------------------------------
		
		var e402RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_in} {maktx_in}',
												  text :{parts:[{path:'charg'},
												                {path:'vfdat',formatter:oFmt.fmtDate}]}}),
					  new sap.m.ObjectIdentifier({title:'{menge_npk}', 
				     		  					  text :'',}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}', 
			     		  						  text :'{menge_kpk}',}),
			     	  new sap.m.ObjectIdentifier({title:'{meins_pkx}',
				     		  					  text :''}),
				  //  -- 2018.02.13 : Picking Dummy V1.3
				      //new sap.m.ObjectIdentifier({title:'{tanum}', // TO number,item	
					  //   		  				  text :'{tapos}',
					  //   		  				  visible : false}),
					  new sap.m.ObjectIdentifier({title:'{tfrnr}',
						  				 		  text :'{pospk}'}),] 
		}); 
   		var e402TblOvw = new sap.m.Table({
   			id						: "e402TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','e402TblOvw','matnr_in'),
   			       		   oCon.getCol('02','Opn'),
   			       		   oCon.getCol('02','T/A.Pck'),
   			       		   oCon.getCol('03','UoM'),],
   			items		: {path:"/t_e_wpkbat",template:e402RowOvw},
   		});

   	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   		
   		var e402schMain   = oCon.getSchMain('e402','e402TblOvw',['matnr_in','maktx_in','charg']);
   		var e402pullMain  = oCon.getPullMain('e402','SAPEVT_E402','evt_e402');
		var e402lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Start/Continue Pick"});
		var e402btnRef    = new sap.m.Button({id:'e402btnRef',icon:"sap-icon://refresh",text:'',press:oCon.ui5Dispatch});	// ++ Picking Dummy V1.3
		var e402btnAcp    = new sap.m.Button({id:'e402btnAcp',icon:"sap-icon://accept",text:'',press:oCon.ui5Dispatch});
		var e402btnDis    = new sap.m.Button({id:'e402btnDis',icon:"sap-icon://display",text:'',press:oCon.ui5Dispatch});
		var e402btnBck    = new sap.m.Button({id:'e402btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e402btnHom    = new sap.m.Button({id:'e402btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		
		var e402page = new sap.m.Page({
			id				: 'e402page',
			customHeader	: new sap.m.Bar({contentLeft:	[e402btnBck],//e402btnHom],		Change on 2018.07.11 :: Hide button home
											 contentMiddle:	[e402lblTitle],
											 contentRight:	[e402btnRef,e402btnDis,e402btnAcp],}),
			content			: [e402pullMain,e402schMain,e402TblOvw]
		});	

	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [e402page];

	}

});