sap.ui.jsview("zui5sd00e04.view.I.I001", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I.I001
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I001";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I.I001
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Process Order
		//-------------------------------------------------------------------------------
		var i001RowAuf = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title : {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},{path:'aprio'}]},
					  							   text	: {path:"gstrp",formatter:oFmt.fmtDate}}),
			     	   new sap.m.ObjectIdentifier({title: '{matnr_fg}',
			     		   						   text : '{maktx_fg}'}),
			     	   new sap.m.ObjectIdentifier({title: '{menge_rkg}',
			     		   						   text : ''}),]
		}); 
   		var i001TblAuf = new sap.m.Table({
   			id						: "i001TblAuf",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster, 
			itemPress				: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Order','','','i001TblAuf','aufnr'),
   			       		   oCon.getCol('07','FG','','','i001TblAuf','matnr_fg'),
   			       		   oCon.getCol('02','Req'),],
   			items		: {path:"/t_i_pciovw",template:i001RowAuf},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   		
		var i001btnDate	  = oCon.getBtnDate('i001');
		var i001DiaDate   = oCon.getDialogDate('i001',"SAPEVT_I001","evt_i001");
   		var i001schMain   = oCon.getSchMain('i001','i001TblAuf',['matnr_fg','maktx_fg','aufnr']);
   		var i001pullMain  = oCon.getPullMain('i001','SAPEVT_I001','evt_i001');
   		
		var i001lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Input Confirmation"});
		var i001btnBck    = new sap.m.Button({id:'i001btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i001page = new sap.m.Page({
			id				: 'i001page',
			customHeader	: new sap.m.Bar({contentLeft:	[i001btnBck,i001btnDate],
											 contentMiddle:	[i001lblTitle],
											 contentRight:	[],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [i001pullMain,i001schMain,i001TblAuf]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i001page];
	}

});