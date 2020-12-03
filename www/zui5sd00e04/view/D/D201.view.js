sap.ui.jsview("zui5sd00e04.view.D.D201", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.D.D201
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D201";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.D.D201
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Process Order
		//-------------------------------------------------------------------------------
		var d201RowAuf = new sap.m.ColumnListItem({
			cells	:[ new sap.m.ObjectIdentifier({title: {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},{path:'aprio'}]},
					  							   text : {path:"gstrp",formatter:oFmt.fmtDate}}),					  
			     	   new sap.m.ObjectIdentifier({title: '{matnr_fg} ({meins_kg})',
			     		   						   text : '{maktx_fg}'}),
			     	   new sap.m.ObjectIdentifier({title: '{menge_rkg}',
			     		   						   text : ''}),]
		}); 
   		var d201TblAuf = new sap.m.Table({
   			id						: "d201TblAuf",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.MultiSelect, 
   			columns		: [oCon.getCol('08','Order','','','d201TblAuf','aufnr'),
   			       		   oCon.getCol('07','FG','','','d201TblAuf','matnr_fg'),
   			       		   oCon.getCol('02','Req'),],
   			items		: {path:"/t_d_xrsauf",template:d201RowAuf},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------		
		var d201btnDate	  = oCon.getBtnDate('d201');
		var d201DiaDate   = oCon.getDialogDate('d201',"SAPEVT_D211","evt_d211");
   		var d201schMain   = oCon.getSchMain('d201','d201TblAuf',['aufnr','matnr_fg','maktx_fg']);
   		var d201pullMain  = oCon.getPullMain('d201','SAPEVT_D211','evt_d211');
   		
   		var d201lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Transfer Orders - Process Order"});
		var d201btnAct    = new sap.m.Button({id:'d201btnAct',icon:"sap-icon://accept",text:'Action',press:oCon.ui5Dispatch});
		var d201btnBck    = new sap.m.Button({id:'d201btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d201page = new sap.m.Page({
			id				: 'd201page',
			customHeader	: new sap.m.Bar({contentLeft:	[d201btnBck,d201btnDate],
											 contentMiddle:	[d201lblTitle],
											 contentRight:	[d201btnAct],}),
			content			: [d201pullMain,d201schMain,d201TblAuf]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [d201page];
	}

});