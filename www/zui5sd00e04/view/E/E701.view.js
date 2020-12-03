sap.ui.jsview("zui5sd00e04.view.E.E701", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E701
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E701";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E701
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	Picking Order Header
	//	-------------------------------------------------------------------------------
		
		var e701RowOvw = new sap.m.ColumnListItem({
			type		: sap.m.ListType.Active,
			cells		:[new sap.m.ObjectIdentifier({title:{path:'piknr',formatter:oFmt.fmtAlpha},
												  	  text :'{tfrnr} {ernam}'}),
						  new sap.m.ObjectIdentifier({title:{path:'erdat'},
			     		  						  	  text :{path:'erzet',formatter:oFmt.fmtTime}}),]
			     		  //new sap.ui.core.Icon({src:'sap-icon://{icon}',color: '#95A5A6',size:'16px'}),]
		}); 
		
	  	var e701TblOvw = new sap.m.Table({
	  		id						: "e701TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress				: oCon.ui5Dispatch,
	  		columns					: [oCon.getCol('08','Picking','','','e701TblOvw','piknr'),
	  		       		   			   oCon.getCol('08','Date/Time','','','e701TblOvw','erdat'),],
	  		   			       		   //oCon.getCol('03',''),],
	  		items					: {path:"/t_e_wpkpik",template:e701RowOvw},
	  	});
	  		
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
	  		
		var e701btnDate	  = oCon.getBtnDate('e701');
		var e701DiaDate   = oCon.getDialogDate('e701',"SAPEVT_E701","evt_e701");
	  	var e701schMain   = oCon.getSchMain('e701','e701TblOvw',['piknr','ernam','erdat']);
	  	var e701pullMain  = oCon.getPullMain('e701','SAPEVT_E701','evt_e701');
		var e701lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Picking Order - Close"});
		var e701btnBck    = new sap.m.Button({id:'e701btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e701btnNxt    = new sap.m.Button({id:'e701btnNxt',icon:"sap-icon://navigation-right-arrow",press:oCon.ui5Dispatch});
		var e701page = new sap.m.Page({
			id				: 'e701page',
			customHeader	: new sap.m.Bar({contentLeft:	[e701btnBck,e701btnDate],
											 contentMiddle:	[e701lblTitle],
											 contentRight:	[e701btnNxt],}),
			content			: [e701pullMain,e701schMain,e701TblOvw]
		});	
		
	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------		
		
		this.setDisplayBlock(true);
		return [e701page];
			
	}
});