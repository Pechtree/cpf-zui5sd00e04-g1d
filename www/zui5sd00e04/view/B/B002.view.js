sap.ui.jsview("zui5sd00e04.view.B.B002", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.B002
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.B.B002";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.B.B002
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	Overview Table
	//	-------------------------------------------------------------------------------		
		
		var b002RowOvw = new sap.m.ObjectListItem({
			type			: sap.m.ListType.Active,
			title			: '{matnr_in} {maktx_in}',
			number			: '{menge_okg} {meins_kgx}', 
			firstStatus		: new sap.m.ObjectStatus({title:'Order',text:'{menge_rkg} {meins_kgx}'}),
			secondStatus	: new sap.m.ObjectStatus({title:'Rcv',text:'{menge_ckg} {meins_kgx}'}),
			attributes 		: [new sap.m.ObjectAttribute({title:'Vendor Batch',text:'{charg}',visible:false}),
							   new sap.m.ObjectAttribute({title:'Manu Dat',visible:false}),
							   new sap.m.ObjectAttribute({title:'GR',text:'{menge_skg} {meins_kgx}'}),
							   new sap.m.ObjectAttribute({title:'Manu Dat',text:'{hsdat}',visible:false})],
		});
		var b002TblOvw = new sap.m.List({
			id						: "b002TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress				: oCon.ui5Dispatch,
			items					: {path:"/t_b_wgritm",template:b002RowOvw},
		});
	
	//	-------------------------------------------------------------------------------
	//	Dialog Dlv Note & Post
	//	-------------------------------------------------------------------------------
	
		var b002FrmSav = oCon.getForm(3);
		b002FrmSav.addContent(new sap.m.Label({text:'Doc Date'}));
		b002FrmSav.addContent(oCon.getDatePicker('b002inpBldat'));
		b002FrmSav.addContent(new sap.m.Label({text:'Dlv Note'}));
		b002FrmSav.addContent(new sap.m.Input({id:'b002inpXblnr'}));
		var b002DiaSav = new sap.m.Dialog({
			id				: 'b002DiaSav',
			customHeader	: new sap.m.Bar({contentLeft:	[],
			 				             	 contentMiddle:	[],
			 				             	 contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){b002DiaSav.close();},})],}),
			contentWidth	: '550px',
			beginButton		: new sap.m.Button({id:'b002btnPost',icon:"sap-icon://accept",text:'Post GR',press:oCon.ui5Dispatch}),
			content			: [b002FrmSav],
		});
	
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
	
		var b002schMain   = oCon.getSchMain('b002','b002TblOvw',['matnr_in','maktx_in','ebelp','charg']);
		var b002lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"PO Item"});
		var b002btnSav    = new sap.m.Button({id:'b002btnSav',icon:"sap-icon://save",press:oCon.ui5Dispatch});
		var b002btnBck    = new sap.m.Button({id:'b002btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var b002btnHom    = new sap.m.Button({id:'b002btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var b002page = new sap.m.Page({
			id				: 'b002page',
			customHeader	: new sap.m.Bar({contentLeft:	[b002btnBck, b002btnHom],
										 	 contentMiddle:	[b002lblTitle],
										 	 contentRight:	[b002btnSav],}),
			content			: [b002schMain,b002TblOvw]
		});
	
	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------
	
		this.setDisplayBlock(true);
		return [b002page];

	}
});