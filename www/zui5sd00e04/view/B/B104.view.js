sap.ui.jsview("zui5sd00e04.view.B.B104", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.B.B104
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.B.B104";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.B.B104
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	Overview Table
	//	-------------------------------------------------------------------------------
		
   		var b104inpInd = new sap.m.Input({id:'b104inpInd',visible:true}); 
   		var b104inpQty = new sap.m.Input({id:'b104inpQty',visible:true}); 
   		   		
		var b104RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[	new sap.m.ObjectIdentifier({title:'{runno}',
				  								  text :''}), 
				  		new sap.m.ObjectIdentifier({title:'{licha}',
												  //text :'{charg}'}),
												  text :{parts:[{path:'charg'},{path:'text',formatter:oController.fcodeFmtText}]}}),
						new sap.m.ObjectIdentifier({title:{path:"hsdat",formatter:oFmt.fmtDate},
			     		  						  text :{path:"vfdat",formatter:oFmt.fmtDate}}),
			     		new sap.m.ObjectIdentifier({title:'{menge_ikg}',
					     		  				  text :'{meins_kg}'}),  
					    new sap.ui.core.Icon({src:'sap-icon://{flag}'}),
					    // new sap.m.Button({press:oController.fcodeDelete,icon:"sap-icon://decline"}), 
					    new sap.m.ObjectIdentifier({title:'{index}',
  						  						  text :'',visible:false})] 
		}); 
		
   		var b104TblOvw = new sap.m.Table({
   			id						: "b104TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('10',''), 
   			       		   oCon.getCol('30','Batch','','','b104TblOvw','licha'),
   			       		   oCon.getCol('25','Mfg Date','','','b104TblOvw','hsdat'),
   			       		   oCon.getCol('20','Rcv','','','b104TblOvw','menge_ikg'),
   			       		   oCon.getCol('15','')],
   			items		: {path:"/t_b_wgrbat",template:b104RowOvw},
   		});
   		
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   		
   		var b104schMain   = oCon.getSchMain('b104','b104TblOvw',['runno','licha','charg','menge_ikg']); 
		var b104lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Listing Confirm GR"});
		var b104btnBck    = new sap.m.Button({id:'b104btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var b104btnHom    = new sap.m.Button({id:'b104btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var b104btnDel    = new sap.m.Button({id:'b104btnDel',icon:"sap-icon://delete",press:oCon.ui5Dispatch});
		var b104page = new sap.m.Page({
			id				: 'b104page',
			customHeader	: new sap.m.Bar({contentLeft:	[b104btnBck, b104btnHom],
											 contentMiddle:	[b104lblTitle],
											 contentRight:	[b104btnDel],}),
			content			: [b104schMain,b104TblOvw]
		});	
   		
	//	-------------------------------------------------------------------------------	
	//	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [b104page];
	}

});