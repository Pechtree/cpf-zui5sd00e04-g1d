sap.ui.jsview("zui5sd00e04.view.F.F101", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.F101
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.F.F101";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.F101
	*/ 
	createContent : function(oController) {
	
	//	-------------------------------------------------------------------------------
	//	Table: Total Determination
	//	-------------------------------------------------------------------------------
		var f101RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title : '{matnr_in} {maktx_in}',
					  							  text  : {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},
					  							                  {path:'phseq'},
					  							                  {path:'tfrnr',formatter:oFmt.fmtAlpha}]}
												}),
					  new sap.m.ObjectIdentifier({title : '{menge_pkg}',
					     		  				  text  : ''}),
					  new sap.m.ObjectIdentifier({title : '{menge_rst}',
				     		  				      text  : ''}),
					  new sap.m.ObjectIdentifier({title : '{menge_wst}',
							     		  		  text  : ''}),
					  new sap.m.ObjectIdentifier({title : '{menge_nst}',
								     		  	   text  : ''}),
					  new sap.m.Button({press 			: oController.fcodeDec,
										icon  			: "sap-icon://less",}),
					  //new sap.m.Link({text:"{menge_ost}",press:oController.fcodeEdt}),									// +- 2018.10.25 :: Weight-PROD V1.3.1
					  new sap.m.Link({text:"{menge_ost13_6}",press:oController.fcodeEdt}),									// Change 'menge_ost' to 6 digit
				      new sap.m.Button({press 			: oController.fcodeInc,
										icon  			: "sap-icon://add",}),]
		}); 
   		var f101TblOvw = new sap.m.Table({
   			id						: "f101TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectLeft,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','e302TblIng','matnr_in'),
   			       		   oCon.getCol('02','KG/Set'),
   			       		   oCon.getCol('02','Req'),
   			       	       oCon.getCol('02','WT'),
   			       	 	   oCon.getCol('02','Opn'),
   			       		   oCon.getCol('04',''),
			       		   oCon.getCol('05','Ord'),
			       		   oCon.getCol('04',''),],
   			items		: {path:"/t_f_xwiing",template:f101RowOvw},
   		});
   		
	//	-------------------------------------------------------------------------------
	//	Dialog Edit KG/SET
	//	------------------------------------------------------------------------------- 
   		var f101frmDiaKG = oCon.getForm(2);
   		f101frmDiaKG.addContent(new sap.m.Label({text:'Process Order'}));
   		f101frmDiaKG.addContent(new sap.m.Input({id:'f101inpAufnrKG',editable:false}));
   		f101frmDiaKG.addContent(new sap.m.Label({text:'Ingredient'}));
   		f101frmDiaKG.addContent(new sap.m.Input({id:'f101inpMatnrInKG',editable:false}));
  		f101frmDiaKG.addContent(new sap.m.Label({text:'KG/Set'}));
   		f101frmDiaKG.addContent(new sap.m.Input({id:'f101inpMengePkgKGO',editable:false}));
  		f101frmDiaKG.addContent(new sap.m.Label({text:'KG/Set'}));
   		f101frmDiaKG.addContent(new sap.m.Input({id:'f101inpMengePkgKG',type:"Number"}));
		var f101DiaKG = new sap.m.Dialog({
			id				: 'f101DiaKG',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Text({id:'f101txtTfrnrKG'})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){f101DiaKG.close();},})],}),
		    contentWidth	: '600px',
		    beginButton		: new sap.m.Button({id:'f101btnKGAcp',icon:"sap-icon://accept",text:'Accept',press:oCon.ui5Dispatch}),
			content			: [f101frmDiaKG],
		});
   		
	//	-------------------------------------------------------------------------------
	//	Dialog Edit SET 																				// ++ 2020.03.31 - F1 V2.0.0
	//	------------------------------------------------------------------------------- 
		var f101frmDiaSet = oCon.getForm(2);
		f101frmDiaSet.addContent(new sap.m.Label({text:'Process Order'}));
		f101frmDiaSet.addContent(new sap.m.Input({id:'f101inpAufnrSet',editable:false}));
		f101frmDiaSet.addContent(new sap.m.Label({text:'Ingredient'}));
		f101frmDiaSet.addContent(new sap.m.Input({id:'f101inpMatnrInSet',editable:false}));
		f101frmDiaSet.addContent(new sap.m.Label({text:'Set'}));
		f101frmDiaSet.addContent(new sap.m.Input({id:'f101inpMengeOstSetO',editable:false}));
		f101frmDiaSet.addContent(new sap.m.Label({text:'Set'}));
		f101frmDiaSet.addContent(new sap.m.Input({id:'f101inpMengeOstSet',type:"Number"}));
		var f101DiaSet = new sap.m.Dialog({
			id				: 'f101DiaSet',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Text({id:'f101txtTfrnrSet'})],
					 				         contentMiddle:	[],
					 				         contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){f101DiaSet.close();},})],}),
			contentWidth	: '600px',
			beginButton		: new sap.m.Button({id:'f101btnSetAcp',icon:"sap-icon://accept",text:'Accept',press:oCon.ui5Dispatch}),
			content			: [f101frmDiaSet],
		});
   		
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------  
   		var f101DiaWei    = oApp.diaWeight('f101');
   		var f101DiaEdt    = oCon.getDialogEditInp('f101','SET');
   		var f101schMain   = oCon.getSchMain('f101','f101TblIng',['matnr_in','maktx_in']);
   		var f101pullMain  = oCon.getPullMain('f101','SAPEVT_F101','evt_f101');

		var f101lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Weight Ingredient : Process Order"});
		var f101btnEdt    = new sap.m.Button({id:'f101btnEdt',
											  icon:"sap-icon://edit",
											  text:'KG/Set',
											  press:oCon.ui5Dispatch});
		var f101btnWei    = new sap.m.Button({id:'f101btnWei',
											  icon:"sap-icon://unwired",
											  text:'Start Weight',
											  press:oCon.ui5Dispatch});
		var f101btnBck    = new sap.m.Button({id:'f101btnBck',
											  icon:"sap-icon://nav-back",
											  press:oCon.ui5Dispatch});
		var f101btnSet    = new sap.m.Button({id:'f101btnSet',											// ++ 2020.03.31 - F1 V2.0.0
											  icon:"sap-icon://edit",
											  text:'Set',
											  press:oCon.ui5Dispatch});
		
		var f101page = new sap.m.Page({
			id				: 'f101page',
			customHeader	: new sap.m.Bar({contentLeft:	[f101btnBck],
											 contentMiddle:	[f101lblTitle],
											 contentRight:	[f101btnSet,f101btnEdt,f101btnWei],}),
			content			: [f101pullMain,f101schMain,f101TblOvw]
		});	
		
	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [f101page];
	}

});