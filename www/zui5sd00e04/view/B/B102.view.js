sap.ui.jsview("zui5sd00e04.view.B.B102", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.B.B102
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.B.B102";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.B.B102
	*/ 
	createContent : function(oController) {		
		
	//	-------------------------------------------------------------------------------
	// 	Overview Table
	//	------------------------------------------------------------------------------- 
		
		var b102InpDoc = new sap.m.Input({id:'b102InpDoc',visible:false}); 
   		
		var b102RowOvw = new sap.m.ObjectListItem({ 
			type			: sap.m.ListType.Active, 
			title			: '{matnr} {maktx}',
			number			: '{menge_okg} {meins_kg}', 
			firstStatus	: new sap.m.ObjectStatus({title:'Order',text:'{menge_rkg} {meins_kg}'}),
			secondStatus	: new sap.m.ObjectStatus({title:'Rcv',text:'{menge_ckg} {meins_kg}'}),
			attributes 		: [new sap.m.ObjectAttribute({title:'Batch',text:'{licha}',visible:false}),								// Vendor				
							   // ++ 2018.08.21 :: GR From CPF V2.6 :: add EBELP after CHARG	
				   			   new sap.m.ObjectAttribute({title:'Batch',text:{parts:[{path:'charg'},{path:'text',formatter:oController.fcodeFmtBatch}]}}),
							   new sap.m.ObjectAttribute({title:'GR',text:'{menge_skg} {meins_kg}'}),
			           	       new sap.m.ObjectAttribute({title:'MfgDate',text:'{hsdat}',visible:false}),
			           		   new sap.m.ObjectAttribute({title:'ExpDate',text:'{vfdat}',visible:false}), 
    	       				   new sap.m.ObjectAttribute({title:'Posting date',text:'{budat}',visible:false}),
    	       				   new sap.m.ObjectAttribute({title:'Reference Doc',text:'{xblnr}',visible:false}),
    	       				   new sap.m.ObjectAttribute({title:'Doc Date',text:'{bldat}',visible:false}), 
    	       				   new sap.m.ObjectAttribute({title:'State',text:'{state}',visible:false}), 
    	       				   		// State 0 :: Case Raw Meat, State 1 :: Case STO
    	       				   new sap.m.ObjectAttribute({title:'',text:'{ebeln}',visible:false}), 
    	       				   new sap.m.ObjectAttribute({title:'',text:'{rm_type} {rm_source}',visible:false}),					// ++ 2018.01.16 :: GR - WM V1.9
    	       				   new sap.m.ObjectAttribute({title:'NSS_MFG',text:'{nss_mfg}',visible:false}),   						// ++ 2018.02.07 :: GR - WM V2.1
    	       				   new sap.m.ObjectAttribute({title:'NSS_RMT',text:'{nss_rmt}',visible:false}),   						// ++ 2018.02.07 :: GR - WM V2.1
    	       				   new sap.m.ObjectAttribute({title:'NSS_RMS',text:'{nss_rms}',visible:false}),   						// ++ 2018.02.07 :: GR - WM V2.1
			],
		});
		var b102TblOvw = new sap.m.List({
			id						: "b102TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress				: oCon.ui5Dispatch,
			items					: {path:"/t_b_wgritm",template:b102RowOvw},
		});
		
	//	-------------------------------------------------------------------------------
	// 	Dialog Dlv Note & Post
	//	-------------------------------------------------------------------------------
		
		var b102FrmSav = oCon.getForm(3);
		b102FrmSav.addContent(new sap.m.Label({text:'Doc Date'}));
		b102FrmSav.addContent(oCon.getDatePicker('b102inpBldat'));
		b102FrmSav.addContent(new sap.m.Label({text:'Dlv Note'}));
		b102FrmSav.addContent(new sap.m.Input({id:'b102inpXblnr'}));
		var b102DiaSav = new sap.m.Dialog({
			id				: 'b102DiaSav',
			customHeader	: new sap.m.Bar({contentLeft:	[],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){b102DiaSav.close();},})],}),
			contentWidth	: '550px',
		    beginButton		: new sap.m.Button({id:'b102btnPost',icon:"sap-icon://accept",text:'Post GR',press:oCon.ui5Dispatch}),
		    content			: [b102FrmSav],
		});
		
	//	-------------------------------------------------------------------------------
	// 	Page
	//	-------------------------------------------------------------------------------
		
   		var b102schMain   = oCon.getSchMain('b102','b102TblOvw',['matnr_in','maktx_in','ebelp','charg']);    		
		var b102lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Document Item"});
		var b102btnSav    = new sap.m.Button({id:'b102btnSav',icon:"sap-icon://save",press:oCon.ui5Dispatch});
		var b102btnBck    = new sap.m.Button({id:'b102btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var b102btnHom    = new sap.m.Button({id:'b102btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var b102page = new sap.m.Page({
			id				: 'b102page',
			customHeader	: new sap.m.Bar({contentLeft:	[b102btnBck, b102btnHom],
											 contentMiddle:	[b102lblTitle],
											 contentRight:	[b102btnSav],}),
			content			: [b102schMain,b102TblOvw]
		});
		
	//	-------------------------------------------------------------------------------
	// 	Return
	//	-------------------------------------------------------------------------------

		this.setDisplayBlock(true);
		return [b102page];
	}
});