sap.ui.jsview("zui5sd00e04.D.D401", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.D401
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.D.D401";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.D401
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Overview
		//-------------------------------------------------------------------------------
		var d401RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title : {path:'pmxnr',formatter:oFmt.fmtAlpha},
                 								  text  : ''}),
			     	  new sap.m.ObjectIdentifier({title : '{matnr_fg} {maktx_fg}',
												  text  : {parts:[{path:'aufnr'},
												                  {path:'gstrp',formatter:oFmt.fmtDate},
												                  {path:'aprio'}]}
			     	  							}),
			     	  new sap.m.ObjectIdentifier({title : '{menge_rst}',
			     		  					 	  text  : ''}),]
		}); 
   		var d401TblOvw = new sap.m.Table({
   			id						: "d401TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.MultiSelect, 
   			columns		: [oCon.getCol('08','Pmx','','','d401TblOvw','pmxnr'),
   			       		   oCon.getCol('07','FG','','','d401TblOvw','matnr_fg'),
   			       		   oCon.getCol('02','Req'),],
   			items		: {path:"/t_d_xrsovw",template:d401RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var d401btnDate	   = oCon.getBtnDate('d401');
		var d401DiaDate   = oCon.getDialogDate('d401',"SAPEVT_D401","evt_d401");
   		var d401schMain   = oCon.getSchMain('d401','d401TblOvw',['aufnr','pmxnr','matnr_fg','maktx_fg','matnr_px','maktx_px']);
   		var d401pullMain  = oCon.getPullMain('d401','SAPEVT_D401','evt_d401');
   		
   		
		var d401lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Stock Transfer Orders - Premix Order"});
		var d401btnAct    = new sap.m.Button({id:'d401btnAct',icon:"sap-icon://accept",text:'Action',press:oCon.ui5Dispatch});
		var d401btnBck    = new sap.m.Button({id:'d401btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d401page = new sap.m.Page({
			id				: 'd401page',
			customHeader	: new sap.m.Bar({contentLeft:	[d401btnBck,d401btnDate],
											 contentMiddle:	[d401lblTitle],
											 contentRight:	[d401btnAct],}),
			content			: [d401pullMain,d401schMain,d401TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [d401page];
	}

});