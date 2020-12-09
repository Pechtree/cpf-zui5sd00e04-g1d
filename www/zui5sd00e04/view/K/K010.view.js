sap.ui.jsview("zui5sd00e04.view.K.K010", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.K.K010
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.K.K010";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.K.K010
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Overview Table
		//-------------------------------------------------------------------------------
		var k010RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:{path:'mblnr',formatter:oFmt.fmtAlpha},
					  						      text :''}),
					  new sap.m.ObjectIdentifier({title:{path:'ebeln',formatter:oFmt.fmtAlpha},
									  			  text :'{matnr_in} {maktx_in}'}),
			     	  new sap.m.ObjectIdentifier({title:{parts:[{path:'menge_okg'},{path:'meins_kgx'}]},
			     		                          text :'',
//			     		                          text :{parts:[{path:'charg'},{path:'vfdat',formatter:oFmt.fmtDate}]},
			     		                         }),],
		}); 
   		var k010TblOvw = new sap.m.Table({
   			id						: "k010TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Mat Doc#','','','k010TblOvw','mblnr'),
   			       		   oCon.getCol('08','Doc#','','','k010TblOvw','matnr_in')],
//   			       		   oCon.getCol('08','Batch','','','k010TblOvw','charg'),],
   			items		: {path:"/t_k_sckgro",template:k010RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Dialog Date
		//-------------------------------------------------------------------------------
 		var inpDate1 = oCon.getDatePicker('k010inpBudat');	
   		inpDate1.setValue(oCon.getDateIn());
   		
   		var k010frmSel = oCon.getForm(3);
   		k010frmSel.addContent(new sap.m.Label({text:'PO#'}));
   		k010frmSel.addContent(new sap.m.Input({id:'k010inpEbeln'}));
   		k010frmSel.addContent(new sap.m.Label({text:'Post.Date'}));
   		k010frmSel.addContent(inpDate1);
		var k010DiaSel = new sap.m.Dialog({
			id				: 'k010DiaSel',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Button({icon:"sap-icon://eraser",press:function(){
													oCon.getControl('k010inpBudat').setValue();
													oCon.getControl('k010inpEbeln').setValue();
											},})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){k010DiaSel.close();},})],}),
			contentWidth	: '550px',
			beginButton		: new sap.m.Button({id:'k010btnApply',icon:"sap-icon://accept",text:'Apply',press:oCon.ui5Dispatch}),
		    content			: [k010frmSel],
		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   	
		var k010diaPrint  = oApp.diaPrint('k010');
		var k010btnSel    = new sap.m.Button({id:'k010btnSel',icon:"sap-icon://accelerated",press:oCon.ui5Dispatch});
   		var k010schMain   = oCon.getSchMain('k010','k010TblOvw',['matnr_in','mblnr','maktx_in']);
   		var k010pullMain  = oCon.getPullMain('k010','SAPEVT_K011','evt_k010');
   		
		var k010lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Print SU from GR"});
		var k010btnBck    = new sap.m.Button({id:'k010btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var k010page = new sap.m.Page({
			id				: 'k010page',
			customHeader	: new sap.m.Bar({contentLeft:	[k010btnBck,k010btnSel],
											 contentMiddle:	[k010lblTitle],
											 contentRight:	[],}),
			content			: [k010pullMain,k010schMain,k010TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [k010page];
	}

});