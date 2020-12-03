sap.ui.jsview("zui5sd00e04.view.E.E308", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.E.E308
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.E.E308";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.E.E308
	*/ 
	createContent : function(oController) {

	//	-------------------------------------------------------------------------------
	//	Table: Picking Order Item
	//	-------------------------------------------------------------------------------
		
		var e308RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{vlenr} {vlpla}',
									  			  text :'{matnr_in} {maktx_in}',}),							                
					  new sap.m.ObjectIdentifier({title:'{charg}', 
						  						  text : {path:'vfdat',formatter:oFmt.fmtDate}}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}',
				     		  					  text :'{meins_pkx}'}),
				      new sap.m.ObjectIdentifier({title:'{tfrnr}',visible:false}),]
		}); 
   		var e308TblOvw = new sap.m.Table({
   			id						: "e308TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','Material','','','e308TblOvw','vlenr'),
   			       		   oCon.getCol('08','Qty'),
   			       		   oCon.getCol('02','UoM'),],
   			items		: {path:"/t_e_wpkbat",template:e308RowOvw},
   		});
   	
   	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   	
   		var e308schMain   = oCon.getSchMain('e308','e308TblOvw',['matnr_in','maktx_in','charg','vlenr']);
		var e308lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Conclusion"});
		var e308btnBck    = new sap.m.Button({id:'e308btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var e308btnHom    = new sap.m.Button({id:'e308btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		
		var e308page = new sap.m.Page({
			id				: 'e308page',
			customHeader	: new sap.m.Bar({contentLeft:	[e308btnBck,e308btnHom],
											 contentMiddle:	[e308lblTitle],
											 contentRight:	[],}),
			content			: [e308schMain,e308TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [e308page];
 		
 		
 		
	}

});