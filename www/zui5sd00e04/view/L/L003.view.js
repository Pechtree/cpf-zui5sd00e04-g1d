sap.ui.jsview("zui5sd00e04.view.L.L003", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.L.L003
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.L.L003";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.L.L003
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	Overview Table
	//	-------------------------------------------------------------------------------
			
		var l003inpInd = new sap.m.Input({id:'l003inpInd',visible:true}); 
	 		   		
		var l003RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[	new sap.m.ObjectIdentifier({title:'{runno}',
				  								  text :''}), 
				  		new sap.m.ObjectIdentifier({title:'{charg}',
												  text :'{text}'}),
						new sap.m.ObjectIdentifier({title:{path:"hsdat",formatter:oFmt.fmtDate},
			     		  						  text :{path:"vfdat",formatter:oFmt.fmtDate}}),
			     		new sap.m.ObjectIdentifier({title:'{menge}',
					     		  				  text :'{meins_kgx}'}),  
					    new sap.m.ObjectIdentifier({title:'{index}',
	  					  						  text :'',visible:false})] 
		}); 
			
	   	var l003TblOvw = new sap.m.Table({
	   		id						: "l003TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
	   		itemPress	: oCon.ui5Dispatch,
	   		columns		: [oCon.getCol('10',''), 
	   		       		   oCon.getCol('30','Batch','','','l003TblOvw','licha'),
	   		       		   oCon.getCol('25','Mfg Date','','','l003TblOvw','hsdat'),
	   		       		   oCon.getCol('20','Rcv','','','l003TblOvw','menge_ikg')],
	   		items		: {path:"/t_l_grwbat",template:l003RowOvw},
	   	});
	   		
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
	   		
		var l003schMain   = oCon.getSchMain('l003','l003TblOvw',['runno','licha','charg','menge_ikg']); 
		var l003lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Confirm GR"});
		var l003btnBck    = new sap.m.Button({id:'l003btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var l003btnHom    = new sap.m.Button({id:'l003btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var l003btnDel    = new sap.m.Button({id:'l003btnDel',icon:"sap-icon://delete",press:oCon.ui5Dispatch});
		var l003btnSav    = new sap.m.Button({id:'l003btnSav',icon:"sap-icon://save",press:oCon.ui5Dispatch});
		var l003page = new sap.m.Page({
			id				: 'l003page',
			customHeader	: new sap.m.Bar({contentLeft:	[l003btnBck, l003btnHom],
											 contentMiddle:	[l003lblTitle],
											 contentRight:	[l003btnDel,l003btnSav],}),
			content			: [l003schMain,l003TblOvw]
		});	
	  		
	//	-------------------------------------------------------------------------------	
	//	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [l003page];
	}
});