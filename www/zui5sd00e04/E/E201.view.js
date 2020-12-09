sap.ui.jsview("zui5sd00e04.E.E201", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.E201
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.E.E201";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.E201
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var e201RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:{path:'piknr',formatter:oFmt.fmtAlpha},
												  text :'{ernam}'}),
			     	  new sap.m.ObjectIdentifier({title:{path:'erdat'},
			     		  						  text :{path:'erzet',formatter:oFmt.fmtTime}}),
			     	  new sap.ui.core.Icon({src:'sap-icon://{icon}',color: '#95A5A6',size:'16px'}),]
		}); 
   		var e201TblOvw = new sap.m.Table({
   			id						: "e201TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Picking','','','e201TblOvw','piknr'),
   			       		   oCon.getCol('08','Date/Time','','','e201TblOvw','erdat'),
   			       		   oCon.getCol('03',''),],
   			items		: {path:"/t_e_wpkpik",template:e201RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   		
		var e201btnDate	  = oCon.getBtnDate('e201');
		var e201DiaDate   = oCon.getDialogDate('e201',"SAPEVT_E201","evt_e201");
   		var e201schMain   = oCon.getSchMain('e201','e201TblOvw',['piknr','ernam','erdat']);
   		var e201pullMain  = oCon.getPullMain('e201','SAPEVT_E201','evt_e201');
		var e201lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Picking Order - Close"});
		var e201btnBck    = new sap.m.Button({id:'e201btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e201page = new sap.m.Page({
			id				: 'e201page',
			customHeader	: new sap.m.Bar({contentLeft:	[e201btnBck,e201btnDate],
											 contentMiddle:	[e201lblTitle],
											 contentRight:	[],}),
			content			: [e201pullMain,e201schMain,e201TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e201page];
	}

});