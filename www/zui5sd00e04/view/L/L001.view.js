sap.ui.jsview("zui5sd00e04.view.L.L001", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.L.L001
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.L.L001";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.L.L001
	*/ 
	createContent : function(oController) {

		//-------------------------------------------------------------------------------
		//Table: Process Order
		//-------------------------------------------------------------------------------
		var l001RowAuf = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	: [ 
				new sap.m.ObjectIdentifier({title: {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},{path:'aprio'}]},
					  						text : {path:"gstrp",formatter:oFmt.fmtDate}}),
				new sap.m.ObjectIdentifier({title: '{matnr_fg}',
			     		   					text : '{maktx_fg}'}),
			    new sap.m.ObjectIdentifier({title: '{menge_fkg}',
			     		   					text : '{menge_rkg}'}),
			    new sap.m.ObjectIdentifier({title: '{meins_kgx}',
			     		   					text : '{meins_kgx}'}),
			],
		});
		
   		var l001TblAufFG = new sap.m.Table({
   			id						: "l001TblAufFG",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster, 
			itemPress				: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Order','','','l001TblAufFG','aufnr'),
   			       		   oCon.getCol('07','FG','','','l001TblAufFG','matnr_fg'),
   			       		   oCon.getCol('02','Req/GR'),
   			       		   oCon.getCol('03',''),
   			       		   ],
   			items		: {path:"/t_l_grwovw",template:l001RowAuf},
   		});
   		
   		var l001TblAufWIP = new sap.m.Table({
   			id						: "l001TblAufWIP",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster, 
			itemPress				: oCon.ui5Dispatch,
			visible					: false,
   			columns		: [oCon.getCol('08','Order','','','l001TblAufWIP','aufnr'),
   			       		   oCon.getCol('07','WIP','','','l001TblAufWIP','matnr_fg'),
   			       		   oCon.getCol('02','Req/GR'),
			       		   oCon.getCol('03',''),
			       		   ],
   			items		: {path:"/t_l_grwovw",template:l001RowAuf},
   		});

   		var l001InpMode = new sap.m.Input({id:'l001InpMode',visible:true,value:"FG"}); //Hidden
   		
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var l001btnBck		= new sap.m.Button({id:'l001btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
//   		var l001DiaEdt		= oCon.getDialogEditInp('l001','SET');
   		var l001DiaDate		= oCon.getDialogDate_S('l001',"SAPEVT_L001","evt_l001");
   		var l001btnDate		= oCon.getBtnDate('l001');
   		var l001lblTitle	= new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Process Order"});
   		var l001btnFGWIP	= new sap.m.Button({id:'l001btnFGWIP',text: "FG / WIP",press:oCon.ui5Dispatch});
   		
   		var l001pullMain	= oCon.getPullMain('l001','SAPEVT_L001','evt_l001');
   		
   		var l001schMainFG	= oController.getSch('l001','l001TblAufFG',['aufnr','matnr_fg','maktx_fg'],'FG');
   		var l001schMainWIP	= oController.getSch('l001','l001TblAufWIP',['aufnr','matnr_fg','maktx_fg'],'WIP');
   		
//		var l001lblFoot   = new sap.m.Label({id:'l001lblFoot',design:sap.m.LabelDesign.Bold,text:"{/head/ftitle}"});
		
		var l001page = new sap.m.Page({
			id				: 'l001page',
			enableScrolling	: true,
			customHeader	: new sap.m.Bar({contentLeft:	[l001btnBck,l001btnDate],
											 contentMiddle: [l001lblTitle],
											 contentRight:	[l001btnFGWIP]}),
//			footer			: new sap.m.Bar({contentLeft:	[],
//										     contentMiddle:	[],
//											 contentRight:	[]}),
			content			: [l001pullMain,l001schMainFG,l001schMainWIP,l001TblAufFG,l001TblAufWIP]
		});
		
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [l001page];

	}

});