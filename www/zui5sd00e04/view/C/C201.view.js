sap.ui.jsview("zui5sd00e04.view.C.C201", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.C201
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.C.C201";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.C201
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: BOM
		//-------------------------------------------------------------------------------
		var c201RowPmx = new sap.m.ColumnListItem({
			cells	:[ new sap.m.ObjectIdentifier({title : '{matnr_px} {maktx_px}',
			     		   						   text  : '{matnr_fg} {maktx_fg}'}),
			     	   new sap.m.ObjectIdentifier({title : {path:"menge_pkg",formatter:oFmt.fmtAmt},
			     		   						   text  : ''}),
//			     	   new sap.m.Button({
//			     		   	press			: oController.fcodeDec,
//			     		   	icon			: "sap-icon://less",}),
			     	   new sap.m.Link({text:"{menge_ist}"}),
//			     	   new sap.m.Button({
//			     		   press			: oController.fcodeInc,
//			     		   icon				: "sap-icon://add",}),
			     	 ]
		}); 
   		var c201TblPmx = new sap.m.Table({
   			id						: "c201TblPmx",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.MultiSelect,
   			columns		: [oCon.getCol('07','Pmx','','','c101TblPmx','matnr_fg'),
   			       		   oCon.getCol('02','KG/Set'),
   			       		   //oCon.getCol('04',''),
   			       		   oCon.getCol('05','Order'),
   			       		   //oCon.getCol('04',''),
   			       		   ],
   			items		: {path:"/t_c_xorauf",template:c201RowPmx},
   		});
		//-------------------------------------------------------------------------------
		//Dialog : FG
		//-------------------------------------------------------------------------------
		var c201frmFg = oCon.getForm(3);		
		c201frmFg.addContent(new sap.m.Label({text:'FG'}));
		c201frmFg.addContent(new sap.m.Input({id:'c201inpMatnrFg'}));
//		c201frmFg.addContent(new sap.m.Label({text:'Qty'}));
//		c201frmFg.addContent(new sap.m.Input({id:'c201inpMengeIkg',type:"Number"}));
		c201frmFg.addContent(new sap.m.Label({text:'SET'}));
		c201frmFg.addContent(new sap.m.Input({id:'c201inpMengeIst',type:"Number"}));
		var c201diaFg = new sap.m.Dialog({
			id				: 'c201diaFg',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Label({text:"FG"})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){c201diaFg.close();},})],}),
			contentWidth	: '550px',
			beginButton		: new sap.m.Button({id:'c201btnApply',icon:"sap-icon://accept",text:'Apply',press:oCon.ui5Dispatch}),
		    content			: [c201frmFg],
		});
		sap.ui.getCore().byId("c201inpMatnrFg").onsapenter = function(oEvt){oCon.ui5DispatchFcode('c201btnApply');};
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		//var c201DiaEdt    	= oCon.getDialogEditInp('c201','SET');
   		var c201schMain   	= oCon.getSchMain('c201','c201TblPmx',['aufnr','matnr_fg','maktx_fg']);

		var c201lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Premix Orders for Safety Stock"});
		var c201btnAdd    = new sap.m.Button({id:'c201btnAdd',icon:"sap-icon://add",text:'FG',press:oCon.ui5Dispatch});
		var c201btnSav    = new sap.m.Button({id:'c201btnSav',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch});
		var c201btnBck    = new sap.m.Button({id:'c201btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var c201page = new sap.m.Page({
			id				: 'c201page',
			customHeader	: new sap.m.Bar({contentLeft:	[c201btnBck],
											 contentMiddle:	[c201lblTitle],
											 contentRight:	[c201btnAdd,c201btnSav],}),
			content			: [c201schMain,c201TblPmx]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [c201page];
	}

});