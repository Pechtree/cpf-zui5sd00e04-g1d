sap.ui.jsview("zui5sd00e04.view.E.E101", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.E.E101
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E101";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.E.E101
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var e101RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:{path:'piknr',formatter:oFmt.fmtAlpha},
												  text :'{ernam}'}),
			     	  new sap.m.ObjectIdentifier({title:{path:'erdat'},
			     		  						  text :{path:'erzet',formatter:oFmt.fmtTime}}),
			     	  new sap.ui.core.Icon({src:'sap-icon://{icon}',color: '#95A5A6',size:'16px'}),]
		}); 
   		var e101TblOvw = new sap.m.Table({
   			id						: "e101TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Picking','','','e101TblOvw','piknr'),
   			       		   oCon.getCol('08','Date/Time','','','e101TblOvw','erdat'),
   			       		   oCon.getCol('03',''),],
   			items		: {path:"/t_e_wpkpik",template:e101RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   		
		var e101btnDate	  = oCon.getBtnDate('e101');
		var e101DiaDate   = oCon.getDialogDate('e101',"SAPEVT_E101","evt_e101");
   		var e101schMain   = oCon.getSchMain('e101','e101TblOvw',['piknr','ernam','erdat']);
   		var e101pullMain  = oCon.getPullMain('e101','SAPEVT_E101','evt_e101');
		var e101lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Picking Order - Pick"});
		var e101btnBck    = new sap.m.Button({id:'e101btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e101page = new sap.m.Page({
			id				: 'e101page',
			customHeader	: new sap.m.Bar({contentLeft:	[e101btnBck,e101btnDate],
											 contentMiddle:	[e101lblTitle],
											 contentRight:	[],}),
			content			: [e101pullMain,e101schMain,e101TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e101page];
	}

});