sap.ui.jsview("zui5sd00e04.view.F.F401", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.F.F401
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.F.F401";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.F.F401
	*/ 
	createContent : function(oController) {
	
	//	-------------------------------------------------------------------------------
	//	Table - Premix Order
	//	-------------------------------------------------------------------------------
		var f401RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_px} {maktx_px}',
			     		  						  text : {parts:[{path:'pmxnr',formatter:oFmt.fmtAlpha},
			     		  						                 {path:'maktx_fg'}]}
					                              }),
			     	  new sap.m.ObjectIdentifier({title:'{menge_rst}',
			     		  						  text :''}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_fst}',
			     		  						  text :''}),
			     	  new sap.m.Button({visible	: false,
			     		   				press	: oController.fcodeDec,
			     		   				icon	: "sap-icon://less",}),
			          new sap.m.Link({text:"{menge_ist}",press:oController.fcodeEdt}),
			     	  new sap.m.Button({visible	: false,
				     					press	: oController.fcodeInc,
				     					icon	: "sap-icon://add",}),] 
		}); 
   		var f401TblOvw = new sap.m.Table({
   			id			: "f401TblOvw",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			columns		: [oCon.getCol('07','Premix','','','f401TblOvw','matnr_px'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Bck'),
   			       		   oCon.getCol('04',''),
   			       		   oCon.getCol('05','Ord'),
   			       		   oCon.getCol('04',''),],
   			items		: {path:"/t_f_xwiovw",template:f401RowOvw},
   		});
   		
   	//	-------------------------------------------------------------------------------
   	//	Dialog Edit Bag																					// ++ 2019.12.04 - F4 V3.0.0
   	//	------------------------------------------------------------------------------- 
   		var f401frmDiaBag = oCon.getForm(2);
   		f401frmDiaBag.addContent(new sap.m.Label({text:'Bag'}));
   		f401frmDiaBag.addContent(new sap.m.Input({id:'f401inpBag',
   	   											 editable:true}));
   		var f401DiaBag = new sap.m.Dialog({
   			id				: 'f401DiaBag',
   			customHeader	: new sap.m.Bar({
   								contentLeft	  : [new sap.m.Text({id:'f401txtPmxnr'})],
   								contentMiddle : [],
   								contentRight  : [new sap.m.Button({icon:"sap-icon://decline",
   													  			   press:function(){
   													  				   f401DiaBag.close()
   													  			   }})]
   							  }),
   			contentWidth	: '600px',
   			beginButton		: new sap.m.Button({id:'f401btnBagAcp',
   			    								icon:"sap-icon://accept",
   			    								text:'Accept',
   			    								press:oCon.ui5Dispatch}),
   			content			: [f401frmDiaBag],
   		});
	
   	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
		var f401btnDate	  = oCon.getBtnDate('f401');
		var f401DiaDate   = oCon.getDialogDate('f401',"SAPEVT_F401","evt_f401");
   		var f401schMain   = oCon.getSchMain('f401','f401TblOvw',['aufnr','pmxnr','matnr_fg','maktx_fg','matnr_px','maktx_px']);
   		var f401pullMain  = oCon.getPullMain('f401','SAPEVT_F401','evt_f401');
   		
		var f401lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Weight by Premix"});
		var f401btnBag    = new sap.m.Button({id:'f401btnBag',
											  icon:"sap-icon://edit",
											  text:"Bag",
											  press:oCon.ui5Dispatch});									// ++ 2019.12.04 - F4 V3.0.0
		var f401btnCnf    = new sap.m.Button({id:'f401btnCnf',
											  icon:"sap-icon://accept",
											  text:"Action",
											  press:oCon.ui5Dispatch});
		var f401btnBck    = new sap.m.Button({id:'f401btnBck',
											  icon:"sap-icon://nav-back",
											  press:oCon.ui5Dispatch});
		var f401page = new sap.m.Page({
			id				: 'f401page',
			customHeader	: new sap.m.Bar({contentLeft:	[f401btnBck,f401btnDate],
											 contentMiddle:	[f401lblTitle],
											 contentRight:	[f401btnBag, 								// ++ 2019.12.04 - F4 V3.0.0
												 			 f401btnCnf],}),
			content			: [f401pullMain,f401schMain,f401TblOvw]
		});
		
	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [f401page];
	}

});