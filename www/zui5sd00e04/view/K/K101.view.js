sap.ui.jsview("zui5sd00e04.view.K.K101", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.K.K101
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.K.K101";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.K.K101
	*/ 
	createContent : function(oController) {
	//-------------------------------------------------------------------------------
	//Overview Table
	//-------------------------------------------------------------------------------
		var k101RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:{path:'mblnr',formatter:oFmt.fmtAlpha},
					  						      text :''}),
					  new sap.m.ObjectIdentifier({title:{parts:[{path:'docnum',formatter:oFmt.fmtAlpha}, 
						  										{path:'matnr'},
						  										{path:'maktx'}]}, 		// 2018.05.14 :: Change 'ebeln' to 'docnum' & add 'matnr', 'maktx' [Print SU from GR V1.1]	
									  			  //text :'{matnr_in} {maktx_in}'})],
									  			  text :''})],
		}); 
   		var k101TblOvw = new sap.m.Table({
   			id						: "k101TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Mat Doc#','','','k101TblOvw','mblnr'),
   			       		   oCon.getCol('08','Doc#','','','k101TblOvw','matnr_in')], 
   			items		: {path:"/t_k_sckgro",template:k101RowOvw},
   		});
	//-------------------------------------------------------------------------------
	//Dialog Date
	//-------------------------------------------------------------------------------
 		var inpDate1 = oCon.getDatePicker('k101inpBudat');	
   		inpDate1.setValue(oCon.getDateIn());
   		
   		var k101frmSel = oCon.getForm(3);
   		k101frmSel.addContent(new sap.m.Label({text:'PO#'}));
   		k101frmSel.addContent(new sap.m.Input({id:'k101inpEbeln'}));
   		k101frmSel.addContent(new sap.m.Label({text:'Post.Date'}));
   		k101frmSel.addContent(inpDate1);
		var k101DiaSel = new sap.m.Dialog({
			id				: 'k101DiaSel',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Button({icon:"sap-icon://eraser",press:function(){
													oCon.getControl('k101inpBudat').setValue();
													oCon.getControl('k101inpEbeln').setValue();
											},})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){k101DiaSel.close();},})],}),
			contentWidth	: '550px',
			beginButton		: new sap.m.Button({id:'k101btnApply',icon:"sap-icon://accept",text:'Apply',press:oCon.ui5Dispatch}),
		    content			: [k101frmSel],
		});
	//-------------------------------------------------------------------------------
	//Page
	//-------------------------------------------------------------------------------   	
		var k101diaPrint  = oApp.diaPrint('k101');
		var k101btnSel    = new sap.m.Button({id:'k101btnSel',icon:"sap-icon://accelerated",press:oCon.ui5Dispatch});
   		var k101schMain   = oCon.getSchMain('k101','k101TblOvw',['mblnr','ebeln','matnr','maktx']);
   		var k101pullMain  = oCon.getPullMain('k101','SAPEVT_K101','evt_k101');
   		
		var k101lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Print SU from GR"});
		var k101btnBck    = new sap.m.Button({id:'k101btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var k101page = new sap.m.Page({
			id				: 'k101page',
			customHeader	: new sap.m.Bar({contentLeft:	[k101btnBck,k101btnSel],
											 contentMiddle:	[k101lblTitle],
											 contentRight:	[],}),
			content			: [k101pullMain,k101schMain,k101TblOvw]
		});	
	//Return
	//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [k101page];
	}

});