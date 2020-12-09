sap.ui.jsview("zui5sd00e04.L.L101", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.L.L101
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.L.L101";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.L.L101
	*/ 
	createContent : function(oController) {

		//-------------------------------------------------------------------------------
		//Table: Select IR Material
		//-------------------------------------------------------------------------------
		var l101RowMatIR = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	: [ 
				new sap.m.ObjectIdentifier({title: '{matnr_fg}'}),
			    new sap.m.ObjectIdentifier({title: '{maktx_fg}'}),
			],
		});
		
   		var l101TblMatIR = new sap.m.Table({
   			id						: "l101TblMatIR",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster, 
			itemPress				: oCon.ui5Dispatch,
   			columns		: [oController.getCol('01','Material Number','','','l101TblMatIR','aufnr'),
   			       		   oController.getCol('02','Name'),
   			       		   ],
   			items		: {path:"/t_l_irmovw",template:l101RowMatIR},
   		});
   		
   		new sap.m.Input({id:'l101InpMode',visible:false,value:"IR"}); //Hidden
		
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var l101btnBck    = new sap.m.Button({id:'l101btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
//   		var l101DiaEdt     = oCon.getDialogEditInp('l101','SET');
//   		var l101DiaDate    = oCon.getDialogDate('l101',"SAPEVT_L101","evt_l101");
//   		var l101btnDate	   = oCon.getBtnDate('l101');
   		var l101lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select IR Material"});
   		
   		var l101pullMain   = oCon.getPullMain('l101','SAPEVT_L101','evt_l101');
   		
   		var l101schMain    = oCon.getSchMain('l101','l101TblMatIR',['matnr_fg','maktx_fg']);
   		
//		var l101lblFoot   = new sap.m.Label({id:'l101lblFoot',design:sap.m.LabelDesign.Bold,text:"{/head/ftitle}"});
		
		var l101page = new sap.m.Page({
			id				: 'l101page',
			enableScrolling	: true,
			customHeader	: new sap.m.Bar({contentLeft:	[l101btnBck],
											 contentMiddle: [l101lblTitle],
											 contentRight:	[]}),
//			footer			: new sap.m.Bar({contentLeft:	[],
//										     contentMiddle:	[],
//											 contentRight:	[]}),
			content			: [l101pullMain,l101schMain,l101TblMatIR]
		});
		
		//Return 
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [l101page];

	}

});