sap.ui.jsview("zui5sd00e04.view.E.E501", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E501
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E501";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E501
	*/ 
	createContent : function(oController) {
		
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var e501RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:{path:'piknr',formatter:oFmt.fmtAlpha},
												  text :'{tfrnr} {ernam}'}),
			     	  new sap.m.ObjectIdentifier({title:{path:'erdat'},
			     		  						  text :{path:'erzet',formatter:oFmt.fmtTime}}),
			     	  new sap.ui.core.Icon({src:'sap-icon://{icon}',color: '#95A5A6',size:'16px'}),
			     	 ]
		}); 
   		var e501TblOvw = new sap.m.Table({
   			id						: "e501TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Picking','','','e501TblOvw','piknr'),
   			       		   oCon.getCol('08','Date/Time','','','e501TblOvw','erdat'),
   			       		   oCon.getCol('03',''),
   			       		  ],
   			items		: {path:"/t_e_wpkpik",template:e501RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   		
		var e501btnDate	  = oCon.getBtnDate('e501');
		var e501DiaDate   = oCon.getDialogDate('e501',"SAPEVT_E501","evt_e501");
   		var e501schMain   = oCon.getSchMain('e501','e501TblOvw',['piknr','ernam','erdat']);
   		var e501pullMain  = oCon.getPullMain('e501','SAPEVT_E501','evt_e501');
		var e501lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"(1) Picking Order - Pick"});
		var e501btnBck    = new sap.m.Button({id:'e501btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e501page = new sap.m.Page({
			id				: 'e501page',
			customHeader	: new sap.m.Bar({contentLeft:	[e501btnBck,e501btnDate],
											 contentMiddle:	[e501lblTitle],
											 contentRight:	[],}),
			content			: [e501pullMain,e501schMain,e501TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e501page];
		
 		
 		
	}

});