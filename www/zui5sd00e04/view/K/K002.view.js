sap.ui.jsview("zui5sd00e04.view.K.K002", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.K.K002
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.K.K002";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.K.K002
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Overview Table
		//-------------------------------------------------------------------------------
		var k002RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:{path:'mblnr',formatter:oFmt.fmtAlpha},
					  						      text :''}),
					  new sap.m.ObjectIdentifier({title:{path:'ebeln',formatter:oFmt.fmtAlpha},
									  			  text :'{matnr_in} {maktx_in}'}),
			     	  new sap.m.ObjectIdentifier({title:{parts:[{path:'menge_okg'},{path:'meins_kgx'}]},
			     		                          text :{parts:[{path:'charg'},{path:'vfdat',formatter:oFmt.fmtDate}]},
			     		                         }),]
		}); 
   		var k002TblOvw = new sap.m.Table({
   			id						: "k002TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Mat Doc#','','','k002TblOvw','mblnr'),
   			       		   oCon.getCol('08','PO#','','','k002TblOvw','matnr_in'),
   			       		   oCon.getCol('08','Batch','','','k002TblOvw','charg'),],
   			items		: {path:"/t_k_sckgro",template:k002RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Dialog Date
		//-------------------------------------------------------------------------------
 		var inpDate1 = oCon.getDatePicker('k002inpBudat');	
   		inpDate1.setValue(oCon.getDateIn());
   		
   		var k002frmSel = oCon.getForm(3);
   		k002frmSel.addContent(new sap.m.Label({text:'PO#'}));
   		k002frmSel.addContent(new sap.m.Input({id:'k002inpEbeln'}));
   		k002frmSel.addContent(new sap.m.Label({text:'Post.Date'}));
   		k002frmSel.addContent(inpDate1);
		var k002DiaSel = new sap.m.Dialog({
			id				: 'k002DiaSel',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Button({icon:"sap-icon://eraser",press:function(){
													oCon.getControl('k002inpBudat').setValue();
													oCon.getControl('k002inpEbeln').setValue();
											},})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){k002DiaSel.close();},})],}),
			contentWidth	: '550px',
			beginButton		: new sap.m.Button({id:'k002btnApply',icon:"sap-icon://accept",text:'Apply',press:oCon.ui5Dispatch}),
		    content			: [k002frmSel],
		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   	
		var k002diaPrint  = oApp.diaPrint('k002');
		var k002btnSel    = new sap.m.Button({id:'k002btnSel',icon:"sap-icon://accelerated",press:oCon.ui5Dispatch});
   		var k002schMain   = oCon.getSchMain('k002','k002TblOvw',['matnr_in','mblnr','maktx_in']);
   		var k002pullMain  = oCon.getPullMain('k002','SAPEVT_K002','evt_k002');
   		
		var k002lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Print from GR"});
		var k002btnBck    = new sap.m.Button({id:'k002btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var k002page = new sap.m.Page({
			id				: 'k002page',
			customHeader	: new sap.m.Bar({contentLeft:	[k002btnBck,k002btnSel],
											 contentMiddle:	[k002lblTitle],
											 contentRight:	[],}),
			content			: [k002pullMain,k002schMain,k002TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [k002page];
	}

});