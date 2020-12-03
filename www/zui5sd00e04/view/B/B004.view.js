sap.ui.jsview("zui5sd00e04.view.B.B004", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.B004
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.B.B004";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.B004
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	Overview Table
	//	-------------------------------------------------------------------------------
		
   		var b004inpInd = new sap.m.Input({id:'b004inpInd',visible:true}); 
   		var b004inpQty = new sap.m.Input({id:'b004inpQty',visible:true}); 
   		   		
		var b004RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[	new sap.m.ObjectIdentifier({title:'{runno}',
				  								  text :''}), 
				  		new sap.m.ObjectIdentifier({title:'{licha}',
												  text :''}),
						new sap.m.ObjectIdentifier({title:{path:"hsdat",formatter:oFmt.fmtDate},
			     		  						  text :{path:"vfdat",formatter:oFmt.fmtDate}}),
			     		new sap.m.ObjectIdentifier({title:'{menge_ikg}',
					     		  				  text :'{meins_kg}'}), 
					    new sap.m.ObjectIdentifier({title:'{index}',
  						  						  text :'',visible:false})] 
		}); 
		
   		var b004TblOvw = new sap.m.Table({
   			id						: "b004TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('10',''), 
	       		   		   oCon.getCol('35','Batch','','','b004TblOvw','licha'),
	       		   		   oCon.getCol('35','Mfg Date','','','b004TblOvw','hsdat'),
	       		   		   oCon.getCol('20','Rcv','','','b004TblOvw','menge_ikg')],
   			items		: {path:"/t_b_wgrbat",template:b004RowOvw},
   		});
   		
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   		
   		var b004schMain   = oCon.getSchMain('b004','b004TblOvw',['runno','licha','charg','menge_ikg']); 
		var b004lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Listing Confirm GR"});
		var b004btnBck    = new sap.m.Button({id:'b004btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var b004btnHom    = new sap.m.Button({id:'b004btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var b004btnDel    = new sap.m.Button({id:'b004btnDel',icon:"sap-icon://delete",press:oCon.ui5Dispatch});
		var b004page = new sap.m.Page({
			id				: 'b004page',
			customHeader	: new sap.m.Bar({contentLeft:	[b004btnBck, b004btnHom],
											 contentMiddle:	[b004lblTitle],
											 contentRight:	[b004btnDel],}),
			content			: [b004schMain,b004TblOvw]
		});	
   		
	//	-------------------------------------------------------------------------------	
	//	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [b004page];
	}
});