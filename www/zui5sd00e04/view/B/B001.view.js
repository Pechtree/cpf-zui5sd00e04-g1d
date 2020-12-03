sap.ui.jsview("zui5sd00e04.view.B.B001", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.B.B001
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.B.B001";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.B.B001
	*/ 
	createContent : function(oController) { 	
		
	// 	-------------------------------------------------------------------------------
	// 	Overview Table
	// 	------------------------------------------------------------------------------- 
		
		var b001RowOvw = new sap.m.ColumnListItem({
			type					: sap.m.ListType.Active,
			cells					:[new sap.m.ObjectIdentifier({title:'{ebeln}',
												  				  text :''}),
									  new sap.m.ObjectIdentifier({title:'{lifnr}',
						  				  						  text  :'{name1}'}),
			     		  		      new sap.m.ObjectIdentifier({title:{path:"eindt",formatter:oFmt.fmtDate},
			     		  						  				  text :''}),]
		}); 
  		var b001TblOvw = new sap.m.Table({
  			id						: "b001TblOvw",
  			includeItemInSelection	: true, 
  			mode					: sap.m.ListMode.SingleSelectMaster,
  			itemPress				: oCon.ui5Dispatch,
  			columns					: [oCon.getCol('08','PO#','','','b001TblOvw','ebeln'),
  		       		   			   	   oCon.getCol('07','Vendor','','','b001TblOvw','lifnr'),
  		       		   			   	   oCon.getCol('08','Dlv Date','','','b001TblOvw','eindt'),],
  		    items					: {path:"/t_b_wgrovw",template:b001RowOvw},
	  	});
  		
 	// 	-------------------------------------------------------------------------------
 	// 	Dialog Date
 	// 	-------------------------------------------------------------------------------
  		   		
  		var inpDate1 = oCon.getDatePicker('b001inpEindt');	 
  		inpDate1.setValue(oCon.getDateIn()); 
  	 		
  		var b001frmSel = oCon.getForm(3);
  		b001frmSel.addContent(new sap.m.Label({text:'PO#'}));
  		b001frmSel.addContent(new sap.m.Input({id:'b001inpEbeln'}));
  		b001frmSel.addContent(new sap.m.Label({text:'Dlv Date'}));
  		b001frmSel.addContent(inpDate1); 
  		var b001DiaSel = new sap.m.Dialog({
  			id				: 'b001DiaSel',
  			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Button({icon:"sap-icon://eraser",press:function(){
  																oCon.getControl('b001inpEindt').setValue(); 
  																oCon.getControl('b001inpEbeln').setValue();
  															},})],
  				 				             contentMiddle:	[],
  				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){b001DiaSel.close();},})],}),
  			contentWidth	: '550px',
  			beginButton		: new sap.m.Button({id:'b001btnApply',icon:"sap-icon://accept",text:'Apply',press:oCon.ui5Dispatch}),
  		    content			: [b001frmSel],
  		}); 

	//	-------------------------------------------------------------------------------
	// 	Page
	//	-------------------------------------------------------------------------------
	
	  	var b001schMain   = oCon.getSchMain('b201','b001TblOvw',['ebeln','lifnr','eindt','lifnr','bsart']);
	  	var b001pullMain  = oCon.getPullMain('b201','SAPEVT_B201','evt_b201');
		var b001lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"PO List"});
		// var b001blFoot    = new sap.m.Label({id:'b001lblFoot',design:sap.m.LabelDesign.Bold,text:"{/head/ftitle}"}); 
		var b001btnSel    = new sap.m.Button({id:'b001btnSel',icon:"sap-icon://accelerated",press:oCon.ui5Dispatch});
		var b001btnBck    = new sap.m.Button({id:'b001btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var b001page = new sap.m.Page({
			id				: 'b001page',	
			customHeader	: new sap.m.Bar({contentLeft:	[b001btnBck,b001btnSel],
											 contentMiddle:	[b001lblTitle],
											 contentRight:	[],}),
			// footer		: new sap.m.Bar({contentLeft:	[],
			//							     contentMiddle:	[b001lblFoot],
			//								 contentRight:	[]}),
			content			: [b001pullMain,b001schMain,b001TblOvw]
		});
		
	//	-------------------------------------------------------------------------------
	// 	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [b001page]; 
	}
});