sap.ui.jsview("zui5sd00e04.view.I.I101", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I.I101
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I101";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I.I101
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Process Order
		//-------------------------------------------------------------------------------
		var i101RowAuf = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[ new sap.m.ObjectIdentifier({title: {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},{path:'aprio'}]},
					  							  text	: {path:"gstrp",formatter:oFmt.fmtDate}}),
			     	   new sap.m.ObjectIdentifier({title: '{matnr_fg}',
			     		   						   text : '{maktx_fg}'}),
			     	   new sap.m.ObjectIdentifier({title: '{menge_rkg}',
			     		   						   text : ''}),]
		}); 
   		var i101TblAuf = new sap.m.Table({
   			id						: "i101TblAuf",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster, 
			itemPress				: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Order','','','i101TblAuf','aufnr'),
   			       		   oCon.getCol('07','FG','','','i101TblAuf','matnr_fg'),
   			       		   oCon.getCol('02','Req'),],
   			items		: {path:"/t_i_pciovw",template:i101RowAuf},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var i101btnDate	  = oCon.getBtnDate('i101');
		var i101DiaDate   = oCon.getDialogDate('i101',"SAPEVT_I101","evt_i101");
   		var i101schMain   = oCon.getSchMain('i101','i101TblAuf',['matnr_fg','maktx_fg','aufnr']);
   		var i101pullMain  = oCon.getPullMain('i101','SAPEVT_I101','evt_i101');
   		
		var i101lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Output Confirmation"});
		var i101btnBck    = new sap.m.Button({id:'i101btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i101page = new sap.m.Page({
			id				: 'i101page',
			customHeader	: new sap.m.Bar({contentLeft:	[i101btnBck,i101btnDate],
											 contentMiddle:	[i101lblTitle],
											 contentRight:	[],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [i101pullMain,i101schMain,i101TblAuf]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i101page];
	}

});