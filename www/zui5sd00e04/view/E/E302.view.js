sap.ui.jsview("zui5sd00e04.view.E.E302", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.E302
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E302";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.E302
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Total Determination
		//-------------------------------------------------------------------------------
		var e302RowIng = new sap.m.ColumnListItem({
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
   		var e302TblIng = new sap.m.Table({
   			id						: "e302TblIng",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('08','TfrOrd','','','e302TblIng','aufnr'),
   			       		   oCon.getCol('07','{i18n>COL_RAWMAT}','','','e302TblIng','matnr_in'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('04',''),
			       		   oCon.getCol('05','PckOrd'),
			       		   oCon.getCol('04',''),
			       		   oCon.getCol('02','{i18n>COL_UOM}'),],
   			items		: {path:"/t_e_wpking",template:e302RowIng},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   
   		var e302DiaEdt    = oCon.getDialogEditInp('e302','Qty');
   		var e302schMain   = oCon.getSchMain('e302','e302TblIng',['matnr_in','maktx_in']);
   		//var e302pullMain  = oCon.getPullMain('e302','SAPEVT_E302','evt_e302');
   		var e302pullMain  = oCon.getPullMain('e312','SAPEVT_E312','evt_e312');
		var e302lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Ingredient Picking Total"});
		var e302btnTog    = new sap.m.Button({id:'e302btnTog',icon:"sap-icon://synchronize",text:'KG/SET',press:oCon.ui5Dispatch});
		var e302btnAct    = new sap.m.Button({id:'e302btnAct',icon:"sap-icon://accept",text:'Action',press:oCon.ui5Dispatch});
		var e302btnBck    = new sap.m.Button({id:'e302btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e302page = new sap.m.Page({
			id				: 'e302page',
			customHeader	: new sap.m.Bar({contentLeft:	[e302btnBck],
											 contentMiddle:	[e302lblTitle],
											 contentRight:	[e302btnTog,e302btnAct],}),
			content			: [e302pullMain,e302schMain,e302TblIng]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e302page];
	}

});