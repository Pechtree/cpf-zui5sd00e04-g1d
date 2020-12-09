sap.ui.jsview("zui5sd00e04.view.E.E401", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E401
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E401";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E401
	*/ 
	createContent : function(oController) {
		
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var e401RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:{path:'piknr',formatter:oFmt.fmtAlpha},
												  text :'{tfrnr} {ernam}'}),
			     	  new sap.m.ObjectIdentifier({title:{path:'erdat'},
			     		  						  text :{path:'erzet',formatter:oFmt.fmtTime}}),
			     	  new sap.ui.core.Icon({src:'sap-icon://{icon}',color: '#95A5A6',size:'16px'}),
			     	 ]
		}); 
   		var e401TblOvw = new sap.m.Table({
   			id						: "e401TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Picking','','','e401TblOvw','piknr'),
   			       		   oCon.getCol('08','Date/Time','','','e401TblOvw','erdat'),
   			       		   oCon.getCol('03',''),
   			       		  ],
   			items		: {path:"/t_e_wpkpik",template:e401RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   		
		var e401btnDate	  = oCon.getBtnDate('e401');
		var e401DiaDate   = oCon.getDialogDate('e401',"SAPEVT_E401","evt_e401");
   		var e401schMain   = oCon.getSchMain('e401','e401TblOvw',['piknr','ernam','erdat']);
   		var e401pullMain  = oCon.getPullMain('e401','SAPEVT_E401','evt_e401');
		var e401lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Picking Order - Pick"});
		var e401btnBck    = new sap.m.Button({id:'e401btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e401page = new sap.m.Page({
			id				: 'e401page',
			customHeader	: new sap.m.Bar({contentLeft:	[e401btnBck,e401btnDate],
											 contentMiddle:	[e401lblTitle],
											 contentRight:	[],}),
			content			: [e401pullMain,e401schMain,e401TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e401page];
	
	
	}

});