sap.ui.jsview("zui5sd00e04.view.E.E808", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E808
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E808";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E808
	*/ 
	createContent : function(oController) {

	//	-------------------------------------------------------------------------------
	//	Table: Picking Order Item
	//	-------------------------------------------------------------------------------
			
		var e808RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_in}',
				  								  text :'{maktx_in}'}),
				  	  new sap.m.ObjectIdentifier({title:'{charg}',
		     		  						  	  text : {path:'vfdat',formatter:oFmt.fmtDate}}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}',
				     		  					  text :'{meins_pkx}'}),
				      new sap.m.ObjectIdentifier({title:'{tfrnr}',visible:false}),]
		}); 
	  		var e808TblOvw = new sap.m.Table({
	  			id						: "e808TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
	  			columns		: [oCon.getCol('07','Material','','','e808TblOvw','vlenr'),
	  			       		   oCon.getCol('08','Batch'),
	  			       		   oCon.getCol('02','Qty'),],
	  			items		: {path:"/t_e_wpkbat",template:e808RowOvw},
	  		});
	  	
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
	  	
		var e808schMain   = oCon.getSchMain('e808','e808TblOvw',['matnr_in','maktx_in','charg','vlenr']);
		var e808pullMain  = oCon.getPullMain('e808','SAPEVT_E808','evt_e808');
		var e808lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Conclusion"});
		var e808btnBck    = new sap.m.Button({id:'e808btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e808btnHom    = new sap.m.Button({id:'e808btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		
		var e808page = new sap.m.Page({
			id				: 'e808page',
			customHeader	: new sap.m.Bar({contentLeft:	[e808btnBck,e808btnHom],
											 contentMiddle:	[e808lblTitle],
											 contentRight:	[],}),
			content			: [e808schMain,e808TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e808page];
			
			
			
	}
});