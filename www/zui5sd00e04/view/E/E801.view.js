sap.ui.jsview("zui5sd00e04.view.E.E801", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E801
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E801";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E801
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	Table: Transfer Order
	//	-------------------------------------------------------------------------------
		
		var e801RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
			     		  						  text : {parts:[{path:'tfrnr',formatter:oFmt.fmtAlpha},
			     		  							  			 {path:'werks'},
			     		  							  		     {path:'lgort'},
			     		  						                 {path:'remark'}]} 
											      }),
			     	  new sap.m.ObjectIdentifier({title: '{menge_opk}',
			     		  						  text : '{meins_pkx}'}),]
		}); 
   		var e801TblOvw = new sap.m.Table({
   			id						: "e801TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.MultiSelect,
   			columns		: [oCon.getCol('07','TfrOrd','','','e801TblOvw','matnr_in'),
   			       		   oCon.getCol('02','Req'),],
   			items		: {path:"/t_e_wpkovw",template:e801RowOvw},
   		});
   		
   	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   		
		var e801btnDate	  = oCon.getBtnDate('e801'); 
		var e801DiaDate   = oCon.getDialogDate('e801',"SAPEVT_E801","evt_e801");
   		var e801schMain   = oCon.getSchMain('e801','e801TblOvw',['tfrnr','matnr_in','maktx_in']);
   		var e801pullMain  = oCon.getPullMain('e801','SAPEVT_E801','evt_e801');
   		
		var e801lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Ingredient Picking"});
		var e801btnAct    = new sap.m.Button({id:'e801btnAct',icon:"sap-icon://accept",text:'Action',press:oCon.ui5Dispatch});
		var e801btnBck    = new sap.m.Button({id:'e801btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e801page = new sap.m.Page({
			id				: 'e801page',
			customHeader	: new sap.m.Bar({contentLeft:	[e801btnBck,e801btnDate],
											 contentMiddle:	[e801lblTitle],
											 contentRight:	[e801btnAct],}),
			content			: [e801pullMain,e801schMain,e801TblOvw]
		});	
   		
	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------
	   		
		this.setDisplayBlock(true);
		return [e801page];
	}

});