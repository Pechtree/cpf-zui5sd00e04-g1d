sap.ui.jsview("zui5sd00e04.view.L.L102", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.L.L102
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.L.L102";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.L.L102
	*/ 
	createContent : function(oController) {
		
		//-------------------------------------------------------------------------------
		//Table: Process Order
		//-------------------------------------------------------------------------------
		var l102RowAuf = new sap.m.ColumnListItem({
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
		
   		var l102TblAuf = new sap.m.Table({
   			id						: "l102TblAuf",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster, 
			itemPress				: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Order','','','l102TblAuf','aufnr'),
   			       		   oCon.getCol('07','FG','','','l102TblAuf','matnr_fg'),
   			       		   oCon.getCol('02','Req/GR'),
   			       		   oCon.getCol('03',''),
   			       		   ],
   			items		: {path:"/t_l_iroovw",template:l102RowAuf},
   		});

		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var l102btnBck    = new sap.m.Button({id:'l102btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
//   		var l102DiaEdt     = oCon.getDialogEditInp('l102','SET');
   		var l102DiaDate    = oCon.getDialogDate_S('l102',"SAPEVT_L102","evt_l102");
   		var l102btnDate	   = oCon.getBtnDate('l102');
   		var l102lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Process Order"});
   		
   		var l102pullMain   = oCon.getPullMain('l102','SAPEVT_L102','evt_l102');
   		
   		var l102schMain  = oCon.getSchMain('l102','l102TblAuf',['aufnr','matnr_fg','maktx_fg']);
   		
//		var l102lblFoot   = new sap.m.Label({id:'l102lblFoot',design:sap.m.LabelDesign.Bold,text:"{/head/ftitle}"});
		
		var l102page = new sap.m.Page({
			id				: 'l102page',
			enableScrolling	: true,
			customHeader	: new sap.m.Bar({contentLeft:	[l102btnBck,l102btnDate],
											 contentMiddle: [l102lblTitle],
											 contentRight:	[]}),
//			footer			: new sap.m.Bar({contentLeft:	[],
//										     contentMiddle:	[],
//											 contentRight:	[]}),
			content			: [l102pullMain,l102schMain,l102TblAuf]
		});
		
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [l102page];

	}

});