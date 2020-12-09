sap.ui.jsview("zui5sd00e04.view.D.D202", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.D202
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D202";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.D202
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Edit Table
		//-------------------------------------------------------------------------------
		var d202RowPmx = new sap.m.ColumnListItem({
			cells	:[ new sap.m.ObjectIdentifier({title:'{matnr_fg} {maktx_fg}',
												   text :'{aufnr}'}),
			     	   new sap.m.ObjectIdentifier({title:'{matnr_in} {maktx_in}',
			     		   						   text :'{phseq}'}),
				       new sap.m.ObjectIdentifier({title:'{menge_rkg}',
				    	   						   text :''}),
				       new sap.m.ObjectIdentifier({title:'{menge_lkg}',
				    	   						   text :''}),
				       new sap.m.ObjectIdentifier({title:'{menge_bkg}',
				    	   						   text :''}),
			     	   new sap.m.Button({
			     		   	press			: oController.fcodeDec,
			     		   	icon			: "sap-icon://less",}),
				       new sap.m.Link({text:"{menge_ikg13_6}",press:oController.fcodeEdt}),									// ++ 2018.12.13 :: TFR-PROD V1.2.1
				       //new sap.m.Link({text:"{menge_ikg}",press:oController.fcodeEdt}),									// -- 2018.12.13 :: TFR-PROD V1.2.1
			     	   new sap.m.Button({
			     		   press			: oController.fcodeInc,
			     		   icon				: "sap-icon://add",}),
			     	   new sap.m.ObjectIdentifier({title:'{meins_kgx}',text:''}),]
		}); 
   		var d202TblPmx = new sap.m.Table({
   			id			: "d202TblPmx",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','Ord','','','d202TblPmx','aufnr'),
   			       		   oCon.getCol('07','{i18n>COL_RAWMAT}','','','d202TblPmx','matnr_in'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Plan'),
   			       		   oCon.getCol('02','Bal'),
   			       		   oCon.getCol('04',''),
   			               oCon.getCol('05','Order'),
   			               oCon.getCol('04',''),
   			               oCon.getCol('03','UoM'),],
   			items		: {path:"/t_d_xrsing",template:d202RowPmx},
   		});
   		new sap.m.Input({id:'d202InpMode',visible:false}); //Hidden
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var d202DiaMeatLst 	= oApp.diaMeatList('d202');
   		var d202DiaMeatEdt 	= oApp.diaMeatEdit('d202');
   		var d202schMain   	= oCon.getSchMain('d202','d202TblPmx',['aufnr','matnr_fg','maktx_fg','matnr_in','maktx_in']);
   		// var d202pullMain  	= oCon.getPullMain('d202','SAPEVT_D202','evt_d202');
   		var d202pullMain  	= oCon.getPullMain('d202','SAPEVT_D212','evt_d212');
   		var d202DiaEdt    	= oCon.getDialogEditInp('d202','Order');
		var d202lblTitle  	= new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Stock Transfer Orders - Process Order"});
		var d202btnSum    	= new sap.m.Button({id:'d202btnSum',icon:"sap-icon://simulate",text:'Sum',press:oCon.ui5Dispatch});
		var d202btnDis    	= new sap.m.Button({id:'d202btnDis',icon:"sap-icon://display",text:'Raw Meat',press:oCon.ui5Dispatch});
		var d202btnTog    = new sap.m.Button({id:'d202btnTog',icon:"sap-icon://synchronize",text:'KG/SET',press:oCon.ui5Dispatch});
		var d202btnBck    	= new sap.m.Button({id:'d202btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d202page = new sap.m.Page({
			id				: 'd202page',
			customHeader	: new sap.m.Bar({contentLeft:	[d202btnBck,d202btnTog],
											 contentMiddle:	[d202lblTitle],
											 contentRight:	[d202btnDis,d202btnSum],}),
			content			: [d202pullMain,d202schMain,d202TblPmx]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [d202page];
	}

});