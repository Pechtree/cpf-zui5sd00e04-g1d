sap.ui.jsview("zui5sd00e04.view.E.E802", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E802
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E802";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E802
	*/ 
	createContent : function(oController) {
		
		var e802TestText = new sap.m.Input({id:'e802TestText',text:'Test'})
		
	//	-------------------------------------------------------------------------------
	//	Table: Total Determination
	//	-------------------------------------------------------------------------------
		
		var e802RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title : {path:'tfrnr',formatter:oFmt.fmtAlpha},
				  								 text	: ''}),
		     	  	  new sap.m.ObjectIdentifier({title : '{matnr_in} {maktx_in}',
					  							  text  : {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},
					  							                  {path:'phseq'},
					  							                  {path:'pmxnr',formatter:oFmt.fmtAlpha}]}
												}),
					  new sap.m.ObjectIdentifier({title :'{menge_opk}',
				     		  				     text   :''}),
					  new sap.m.Button({press 			: oController.fcodeDec,
										icon  			: "sap-icon://less",}),
					  new sap.m.Link({text:"{menge_ipk}",press:oController.fcodeEdt}),
				      new sap.m.Button({press 			: oController.fcodeInc,
										icon  			: "sap-icon://add",}),
			     	  new sap.m.ObjectIdentifier({title :'{meins_pkx}',
			     		  						  text  :''}),]
		}); 
   		var e802TblIng = new sap.m.Table({
   			id						: "e802TblIng",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('08','TfrOrd','','','e802TblIng','aufnr'),
   			       		   oCon.getCol('07','{i18n>COL_RAWMAT}','','','e802TblIng','matnr_in'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('04',''),
			       		   oCon.getCol('05','PckOrd'),
			       		   oCon.getCol('04',''),
			       		   oCon.getCol('02','{i18n>COL_UOM}'),],
   			items		: {path:"/t_e_wpking",template:e802RowIng},
   		});
   	
   	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   		
   		var e802DiaEdt    = oCon.getDialogEditInp('e802','Qty');
   		var e802schMain   = oCon.getSchMain('e802','e802TblIng',['matnr_in','maktx_in']);
   		var e802pullMain  = oCon.getPullMain('e802','SAPEVT_E802','evt_e802');
		var e802lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Ingredient Picking Total"});
		var e802btnTog    = new sap.m.Button({id:'e802btnTog',icon:"sap-icon://synchronize",text:'KG/SET',press:oCon.ui5Dispatch});
		var e802btnAct    = new sap.m.Button({id:'e802btnAct',icon:"sap-icon://accept",text:'Action',press:oCon.ui5Dispatch});
		var e802btnBck    = new sap.m.Button({id:'e802btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e802btnHom    = new sap.m.Button({id:'e802btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var e802page = new sap.m.Page({
			id				: 'e802page',
			customHeader	: new sap.m.Bar({contentLeft:	[e802btnBck,e802btnHom],
											 contentMiddle:	[e802lblTitle],
											 contentRight:	[e802btnTog,e802btnAct],}),
			content			: [e802pullMain,e802schMain,e802TblIng]
		});
	   	
	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------

		this.setDisplayBlock(true);
		return [e802page];
	}

});