sap.ui.jsview("zui5sd00e04.view.B.B101", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.B.B101
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.B.B101";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.B.B101
	*/ 
	createContent : function(oController) {
		
	//var b101Complete 	= new sap.m.Input({id:'b101Complete',value:'Complete',visible:false}); 
	var b101btnTest 	= new sap.m.Button({id:'b101btnTest',text:'Complete',visible:true}); 

	//var a003lblFoot  = new sap.m.Label({id:'a003lblFoot',design:sap.m.LabelDesign.Bold,text:"{/head/ftitle}"});
			
	//	-------------------------------------------------------------------------------
	// 	Overview Table
	//	------------------------------------------------------------------------------- 
		
		var b101RowOvw = new sap.m.ColumnListItem({
			type					: sap.m.ListType.Active, 
			cells					:[new sap.m.ObjectStatus({title	:'{docnum}', 
															  text 	:'{status}',}), 
									  new sap.m.ObjectIdentifier({title	:'{werks}',
						  				  						  text  :'{werksx}'}),
			     		  		      new sap.m.ObjectIdentifier({title	:{path:"eindt",formatter:oFmt.fmtDate},
			     		  						  				  text 	:''}),
			     		  			  new sap.m.ObjectIdentifier({title	:'{xblnr}',
							  				  					  text  :''})]
		}); 
   		var b101TblOvw = new sap.m.Table({
   			id						: "b101TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			itemPress				: oCon.ui5Dispatch,
   			columns					: [oCon.getCol('08','Doc#','','','b101TblOvw','docnum'),
   			       		   			   oCon.getCol('07','Vendor','','','b101TblOvw','werks'),
   			       		   			   oCon.getCol('08','Dlv Date','','','b101TblOvw','eindt'),],
   			items					: {path:"/t_b_wgrovw",template:b101RowOvw},
   		});   		
   		
	//	-------------------------------------------------------------------------------
	// 	Dialog Date
	//	-------------------------------------------------------------------------------
   		
   		var inpDate1 = oCon.getDatePicker('b101inpEindt');	 
   		inpDate1.setValue(oCon.getDateIn()); 
   		
   		var b101frmSel = oCon.getForm(3);
   		b101frmSel.addContent(new sap.m.Label({text:'Doc#'}));
   		b101frmSel.addContent(new sap.m.Input({id:'b101inpDocNum'}));
   		b101frmSel.addContent(new sap.m.Label({text:'Dlv Date'}));
   		b101frmSel.addContent(inpDate1); 
		var b101DiaSel = new sap.m.Dialog({
			id				: 'b101DiaSel',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Button({icon:"sap-icon://eraser",press:function(){
																oCon.getControl('b101inpEindt').setValue(); 
																oCon.getControl('b101inpEbeln').setValue();
															},})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){b101DiaSel.close();},})],}),
			contentWidth	: '550px',
			beginButton		: new sap.m.Button({id:'b101btnApply',icon:"sap-icon://accept",text:'Apply',press:oCon.ui5Dispatch}),
		    content			: [b101frmSel],
		});

	//	-------------------------------------------------------------------------------
	// 	Page
	//	-------------------------------------------------------------------------------
	
   		var b101schMain   = oCon.getSchMain('b101','b101TblOvw',['docnum','werks','eindt','werksx','bsart']);
   		var b101pullMain  = oCon.getPullMain('b101','SAPEVT_B101','evt_b101');
		var b101lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Document List"});
		//var b101lblFoot   = new sap.m.Label({id:'b101lblFoot',design:sap.m.LabelDesign.Bold,text:"{/head/ftitle}"}); 
		var b101btnSel    = new sap.m.Button({id:'b101btnSel',icon:"sap-icon://accelerated",press:oCon.ui5Dispatch});
		var b101btnBck    = new sap.m.Button({id:'b101btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var b101page = new sap.m.Page({
			id				: 'b101page',	
			customHeader	: new sap.m.Bar({contentLeft:	[b101btnBck,b101btnSel],
											 contentMiddle:	[b101lblTitle],
											 contentRight:	[],}),
			//footer			: new sap.m.Bar({contentLeft:	[],
			//							     contentMiddle:	[b101lblFoot],
			//								 contentRight:	[]}),
			content			: [b101pullMain,b101schMain,b101TblOvw]
		});		
		
	//	-------------------------------------------------------------------------------
	// 	Return
	//	-------------------------------------------------------------------------------

		this.setDisplayBlock(true);
		return [b101page];
	}
});