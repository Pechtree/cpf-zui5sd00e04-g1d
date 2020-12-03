sap.ui.jsview("zui5sd00e04.view.C.C101", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.C.C101
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.C.C101";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.C.C101
	*/ 
	createContent : function(oController) {	
		//-------------------------------------------------------------------------------
		//Table: Process Order
		//-------------------------------------------------------------------------------
		var c101RowPmx = new sap.m.ColumnListItem({
			cells	:[new sap.m.ObjectIdentifier({title  : {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},{path:'aprio'}]},
			     		  						  text	 : {path:"gstrp",formatter:oFmt.fmtDate}}),
			     	   new sap.m.ObjectIdentifier({title : '{matnr_fg}',
			     		   						   text  : '{maktx_fg}'}),
			     	   new sap.m.ObjectIdentifier({title : {path:"menge_rst",formatter:oFmt.fmtAmt},
			     		   						   text  : {path:"menge_rkg",formatter:oFmt.fmtInt}}),
			     	   new sap.m.ObjectIdentifier({title : {path:"menge_lst",formatter:oFmt.fmtAmt},
			     		   						   text  : ''}),
			     	   new sap.m.ObjectIdentifier({title : {path:"menge_bst",formatter:oFmt.fmtAmt},
			     		   						   text  : ''}),
			     	   new sap.m.Button({
			     		   	press			: oController.fcodeDec,
			     		   	icon			: "sap-icon://less",}),
			     	   new sap.m.Link({text:"{menge_ist13_6}",press:oController.fcodeEdt}),									// ++ 2018.12.13 :: Premix Order V1.0.2
			     	   //new sap.m.Link({text:"{menge_ist}",press:oController.fcodeEdt}),									// -- 2018.12.13 :: Premix Order V1.0.2
			     	   new sap.m.Button({
			     		   press			: oController.fcodeInc,
			     		   icon				: "sap-icon://add",}),]
		}); 
   		var c101TblPmx = new sap.m.Table({
   			id						: "c101TblPmx",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('08','Order','','','c101TblPmx','aufnr'),
   			       		   oCon.getCol('07','FG','','','c101TblPmx','matnr_fg'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Plan'),
   			       		   oCon.getCol('02','Bal'),
   			       		   oCon.getCol('04',''),
   			       		   oCon.getCol('05','Order'),
   			       		   oCon.getCol('04',''),],
   			items		: {path:"/t_c_xorauf",template:c101RowPmx},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var c101DiaMeatLst 	= oApp.diaMeatList('c101');
   		var c101DiaMeatEdt 	= oApp.diaMeatEdit('c101');
		var c101DiaEdt    	= oCon.getDialogEditInp('c101','SET');
   		var c101schMain   	= oCon.getSchMain('c101','c101TblPmx',['aufnr','matnr_fg','maktx_fg']);
   		var c101pullMain  	= oCon.getPullMain('c101','SAPEVT_C101','evt_c101');
   		
		var c101lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Premix Orders"});
		var c101btnDis    = new sap.m.Button({id:'c101btnDis',icon:"sap-icon://display",text:'Raw Meat',press:oCon.ui5Dispatch});
		var c101btnSav    = new sap.m.Button({id:'c101btnSav',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch});
		var c101btnBck    = new sap.m.Button({id:'c101btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var c101page = new sap.m.Page({
			id				: 'c101page',
			customHeader	: new sap.m.Bar({contentLeft:	[c101btnBck],
											 contentMiddle:	[c101lblTitle],
											 contentRight:	[c101btnDis,c101btnSav],}),
			content			: [c101pullMain,c101schMain,c101TblPmx]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [c101page];
	}

});