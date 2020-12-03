sap.ui.jsview("zui5sd00e04.view.E.E303", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.E303
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E303";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.E303
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Total Determination
		//-------------------------------------------------------------------------------
		var e303RowIng = new sap.m.ColumnListItem({
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
					  new sap.m.Link({text:"{menge_ist13_6}",press:oController.fcodeEdt}),									// ++ 2018.12.14 :: Picking Order - Multiple V1.6.0
					  //new sap.m.Link({text:"{menge_ist}",press:oController.fcodeEdt}),									// -- 2018.12.14 :: Picking Order - Multiple V1.6.0
				      new sap.m.Button({press 			: oController.fcodeInc,
										icon  			: "sap-icon://add",}),]
		}); 
   		var e303TblIng = new sap.m.Table({
   			id						: "e303TblIng",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('08','TfrOrd','','','e302TblIng','aufnr'),
   			       		   oCon.getCol('07','{i18n>COL_RAWMAT}','','','e302TblIng','matnr_in'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','{i18n>COL_KGETSET}'),
   			       		   oCon.getCol('04',''),
			       		   oCon.getCol('05','PckOrd'),
			       		   oCon.getCol('04',''),],
   			items		: {path:"/t_e_wpking",template:e303RowIng},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   
   		var e303DiaEdt    = oCon.getDialogEditInp('e303','Qty');
   		var e303schMain   = oCon.getSchMain('e303','e303TblIng',['matnr_in','maktx_in']);
   		var e303pullMain  = oCon.getPullMain('e303','SAPEVT_E313','evt_e313');
		var e303lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Ingredient Picking Total (SET)"});
		var e303btnTog    = new sap.m.Button({id:'e303btnTog',icon:"sap-icon://synchronize",text:'KG/SET',press:oCon.ui5Dispatch});
		var e303btnAct    = new sap.m.Button({id:'e303btnAct',icon:"sap-icon://accept",text:'Action',press:oCon.ui5Dispatch});
		var e303btnBck    = new sap.m.Button({id:'e303btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e303page = new sap.m.Page({
			id				: 'e303page',
			customHeader	: new sap.m.Bar({contentLeft:	[e303btnBck],
											 contentMiddle:	[e303lblTitle],
											 contentRight:	[e303btnTog,e303btnAct],}),
			content			: [e303pullMain,e303schMain,e303TblIng]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e303page];
	}

});