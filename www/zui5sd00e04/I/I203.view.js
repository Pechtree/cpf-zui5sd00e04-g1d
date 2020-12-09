sap.ui.jsview("zui5sd00e04.I.I203", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I203
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.I.I203";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I203
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Form
		//-------------------------------------------------------------------------------
   		var i203FrmMain = oCon.getForm(3);   	
   		i203FrmMain.addContent(new sap.m.Label({text:'Frm=>To'}));
   		i203FrmMain.addContent(new sap.m.Input({id:'i203InpAufnrF',editable:false}));
   		i203FrmMain.addContent(new sap.m.Input({id:'i203InpAufnrT',editable:false}));
   		i203FrmMain.addContent(new sap.m.Label({text:'O.Yield=>N.Yield'}));
   		i203FrmMain.addContent(new sap.m.Input({id:'i203InpYieldN',editable:false}));
   		i203FrmMain.addContent(new sap.m.Input({id:'i203InpYieldT',editable:false}));
   		i203FrmMain.addContent(new sap.m.Label({text:'By'}));
   		i203FrmMain.addContent(new sap.m.Select({
			id		:"i203Selcal",
			showSecondaryValues : true,
			selectedKey	: 'P3',
			items	: [new sap.ui.core.ListItem({key:'P3',text:'by SET', additionalText:'SET'}),
			     	   new sap.ui.core.ListItem({key:'P1',text:'by Percent', additionalText:'%'}),
			     	   new sap.ui.core.ListItem({key:'P2',text:'by Quantity',additionalText:'Qty'}),]
		}));
   		i203FrmMain.addContent(new sap.m.Input({id:'i203InpMengeCstF',editable:false,description:'SET'}));
   		i203FrmMain.addContent(new sap.m.Label({text:'Qty/%'}));
   		i203FrmMain.addContent(new sap.m.Input({id:'i203InpYieldF',editable:false,value:'{/head/yield}'}));
   		i203FrmMain.addContent(new sap.m.Input({id:'i203InpMenge',type:"Number"}));
		//-------------------------------------------------------------------------------
		//Table - Batch List
		//-------------------------------------------------------------------------------
		var i203RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : '{matnr_fg} {maktx_fg}'}),
					  new sap.m.ObjectIdentifier({title: '{charg}',
											      text : {path:"vfdat",formatter:oFmt.fmtDate}}),
					  new sap.m.ObjectIdentifier({title: '{menge_ckg}',
												  text : '{meins_kgx}'}),
					  new sap.m.ObjectIdentifier({title: '{menge_ikg}',
												  text : '{meins_kgx}'}),],
		}); 
   		var i203TblBat = new sap.m.Table({
   			id			: "i203TblBat",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','i203TblBat','matnr_in'),
   			       		   oCon.getCol('08','Batch','','','i203TblBat','charg'),
   			       		   oCon.getCol('02','Order #1'),
   			       		   oCon.getCol('02','Order #2')],
   			items		: {path:"/t_i_pcibat",template:i203RowIng},
   		});	

		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var i203lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:""});
		var i203btnCnf    = new sap.m.Button({id:'i203btnCnf',icon:"sap-icon://save",text:'Confirm',press:oCon.ui5Dispatch});
		var i203btnCal    = new sap.m.Button({id:'i203btnCal',icon:"sap-icon://simulate",text:'Calculate',press:oCon.ui5Dispatch});
		var i203btnBck    = new sap.m.Button({id:'i203btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i203page = new sap.m.Page({
			id				: 'i203page',
			customHeader	: new sap.m.Bar({contentLeft:	[i203btnBck],
											 contentMiddle:	[i203lblTitle],
											 contentRight:	[i203btnCal,i203btnCnf],}),
			content			: [i203FrmMain,i203TblBat]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i203page];
	}

});