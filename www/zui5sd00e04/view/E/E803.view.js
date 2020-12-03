sap.ui.jsview("zui5sd00e04.view.E.E803", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E803
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E803";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E803
	*/ 
	createContent : function(oController) {
	
	//	-------------------------------------------------------------------------------
	//	Table: Total Determination
	//	-------------------------------------------------------------------------------
	
		var e803RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title : {path:'tfrnr',formatter:oFmt.fmtAlpha},
					 							  text	: ''}),
		     	  	  new sap.m.ObjectIdentifier({title : '{matnr_in} {maktx_in}',
					  							  text  : {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},
					  							                  {path:'phseq'},
					  							                  {path:'pmxnr',formatter:oFmt.fmtAlpha}]}
												}),
					  new sap.m.ObjectIdentifier({title : '{menge_ost}',
				     		  				      text  : ''}),
				      new sap.m.ObjectIdentifier({title : '{menge_pkg}',
						     		  		      text  : ''}),
					  new sap.m.Button({press 			: oController.fcodeDec,
										icon  			: "sap-icon://less",}),
					  new sap.m.Link({text:"{menge_ist13_6}",press:oController.fcodeEdt}),									// ++ 2018.12.14 :: Picking Order - Dummy V1.2.0
					  //new sap.m.Link({text:"{menge_ist}",press:oController.fcodeEdt}),									// -- 2018.12.14 :: Picking Order - Dummy V1.2.0
				      new sap.m.Button({press 			: oController.fcodeInc,
										icon  			: "sap-icon://add",}),
					  new sap.m.ObjectIdentifier({title : '{meins_pk}',
					     		  		      	  text  : ''}),]
		}); 
   		var e803TblIng = new sap.m.Table({
   			id						: "e803TblIng",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('08','TfrOrd','','','e802TblIng','aufnr'),
   			       		   oCon.getCol('07','{i18n>COL_RAWMAT}','','','e802TblIng','matnr_in'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','{i18n>COL_KGETSET}'),
   			       		   oCon.getCol('04',''),
			       		   oCon.getCol('05','PckOrd'),
			       		   oCon.getCol('04',''),],
   			items		: {path:"/t_e_wpking",template:e803RowIng},
   		});
   	
   	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   		
   		var e803DiaEdt    = oCon.getDialogEditInp('e803','Qty');
   		var e803schMain   = oCon.getSchMain('e803','e803TblIng',['matnr_in','maktx_in']);
   		var e803pullMain  = oCon.getPullMain('e803','SAPEVT_E803','evt_e803');
		var e803lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Ingredient Picking Total (SET)"});
		var e803btnTog    = new sap.m.Button({id:'e803btnTog',icon:"sap-icon://synchronize",text:'KG/SET',press:oCon.ui5Dispatch});
		var e803btnAct    = new sap.m.Button({id:'e803btnAct',icon:"sap-icon://accept",text:'Action',press:oCon.ui5Dispatch});
		var e803btnBck    = new sap.m.Button({id:'e803btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e803btnHom    = new sap.m.Button({id:'e803btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var e803page = new sap.m.Page({
			id				: 'e803page',
			customHeader	: new sap.m.Bar({contentLeft:	[e803btnBck,e803btnHom],
											 contentMiddle:	[e803lblTitle],
											 contentRight:	[e803btnTog,e803btnAct],}),
			content			: [e803pullMain,e803schMain,e803TblIng]
		});
	   	
	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------
	   		
		this.setDisplayBlock(true);
		return [e803page];
	}

});