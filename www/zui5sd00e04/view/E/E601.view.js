sap.ui.jsview("zui5sd00e04.view.E.E601", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E601
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E601";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E601
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	Picking Order Header
	//	-------------------------------------------------------------------------------
		
		var e601RowOvw = new sap.m.ColumnListItem({
			type		: sap.m.ListType.Active,
			cells		:[new sap.m.ObjectIdentifier({title:{path:'piknr',formatter:oFmt.fmtAlpha},
												  	  text :'{tfrnr} {f_sep} {ernam}'}),
						  new sap.m.ObjectIdentifier({title:{path:'erdat'},
			     		  						  	  text :{path:'erzet',formatter:oFmt.fmtTime}}),]
   	  					  //new sap.ui.core.Icon({src:'sap-icon://{icon}',color: '#95A5A6',size:'16px'}),]
		}); 
		
   		var e601TblOvw = new sap.m.Table({
   			id						: "e601TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress				: oCon.ui5Dispatch,
   			columns					: [oCon.getCol('08','Picking','','','e601TblOvw','piknr'),
   			       		   			   oCon.getCol('08','Date/Time','','','e601TblOvw','erdat'),],
   			   			       		   // oCon.getCol('03',''),],
   			items					: {path:"/t_e_wpkpik",template:e601RowOvw},
   		});
   		
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   		
		var e601btnDate	  = oCon.getBtnDate('e601');
		var e601DiaDate   = oCon.getDialogDate('e601',"SAPEVT_E601","evt_e601");
   		var e601schMain   = oCon.getSchMain('e601','e601TblOvw',['piknr','ernam','erdat']);
   		var e601pullMain  = oCon.getPullMain('e601','SAPEVT_E601','evt_e601');
		var e601lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Picking Order - Close"});
		var e601btnBck    = new sap.m.Button({id:'e601btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		// var e601btnNxt    = new sap.m.Button({id:'e601btnNxt',icon:"sap-icon://navigation-right-arrow",press:oCon.ui5Dispatch});
		var e601page = new sap.m.Page({
			id				: 'e601page',
			customHeader	: new sap.m.Bar({contentLeft:	[e601btnBck,e601btnDate],
											 contentMiddle:	[e601lblTitle],
											 contentRight:	[],}),
			content			: [e601pullMain,e601schMain,e601TblOvw]
		});	
		
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------		
		
		this.setDisplayBlock(true);
		return [e601page];
		
	}
});