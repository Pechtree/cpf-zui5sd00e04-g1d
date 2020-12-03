sap.ui.jsview("zui5sd00e04.view.F.F002", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.F.F002
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.F.F002";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.F.F002
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	Table - Premix Order
	//	-------------------------------------------------------------------------------
		var f002RowOvw = new sap.m.ColumnListItem({ 
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title : {path:'pmxnr',formatter:oFmt.fmtAlpha},
												  text  : '{matnr_px} {maktx_px}'}),
			     	  new sap.m.ObjectIdentifier({title : '{matnr_in} {maktx_in}',
			     		  						  text  : '{menge_pkg}'}),
					  new sap.m.ObjectIdentifier({title : '{menge_rst}',
 		  				                          text  : ''}),
 		  			  new sap.m.ObjectIdentifier({title : '{menge_wst}',
					     		  				  text  : ''}),
					  new sap.m.ObjectIdentifier({title : '{menge_nst}',
						     		  		      text  : ''}),
			     	  new sap.m.Button({press : oController.fcodeDec,
			     		   				icon  : "sap-icon://less",}),
			          //new sap.m.Link({text:"{menge_ost}",
			     	  //   				press:oController.fcodeEdt}),									// -- 2018.10.25 :: F0 V1.3.1
			          new sap.m.Link({text  :"{menge_ost13_6}",
			        	  			  press :oController.fcodeEdt}),									// ++ 2018.10.25 :: F0 V1.3.1
			     	  new sap.m.Button({press:oController.fcodeInc,
			     		   				icon:"sap-icon://add"})]
		}); 
   		var f002TblOvw = new sap.m.Table({
   			id			: "f002TblOvw",
   			mode		: sap.m.ListMode.SingleSelectLeft,
   			includeItemInSelection	: true,
   			columns		: [oCon.getCol('07','Pmx Ord','','','f002TblOvw','pmxnr'),
   			       		   oCon.getCol('07','Ing','','','f002TblOvw','matnr_in'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','WT'),
   			       		   oCon.getCol('02','Opn'),
   			       		   oCon.getCol('04',''),
   			       		   oCon.getCol('05','Ord'),
   			       		   oCon.getCol('04','')],
   			items		: {path:"/t_f_xwipmx",template:f002RowOvw},
   		});
   		
   	//	-------------------------------------------------------------------------------
	//	Dialog Edit KG/SET
	//	------------------------------------------------------------------------------- 
   		var f002frmDiaKG = oCon.getForm(2);
   		f002frmDiaKG.addContent(new sap.m.Label({text:'Premix'}));
   		f002frmDiaKG.addContent(new sap.m.Input({id:'f002inpMatnrPxKG',
   												 editable:false}));
   		f002frmDiaKG.addContent(new sap.m.Label({text:'Ingredient'}));
   		f002frmDiaKG.addContent(new sap.m.Input({id:'f002inpMatnrInKG',
   												 editable:false}));
   		f002frmDiaKG.addContent(new sap.m.Label({text:'KG/Set'}));
   		f002frmDiaKG.addContent(new sap.m.Input({id:'f002inpMengePkgKGO',
   												 editable:false}));
  		f002frmDiaKG.addContent(new sap.m.Label({text:'KG/Set'}));
   		f002frmDiaKG.addContent(new sap.m.Input({id:'f002inpMengePkgKG',
   												 type:"Number"}));
		var f002DiaKG = new sap.m.Dialog({
			id				: 'f002DiaKG',
			customHeader	: new sap.m.Bar({
								contentLeft	  : [new sap.m.Text({id:'f002txtPmxnrKG'})],
								contentMiddle : [],
								contentRight  : [new sap.m.Button({icon:"sap-icon://decline",
												  				   press:function(){
												  					  f002DiaKG.close()
												  				   }})]
							  }),
		    contentWidth	: '600px',
		    beginButton		: new sap.m.Button({id:'f002btnKGAcp',
		    									icon:"sap-icon://accept",
		    									text:'Accept',
		    									press:oCon.ui5Dispatch}),
			content			: [f002frmDiaKG],
		});
   		
	//	-------------------------------------------------------------------------------
	//	Dialog Edit Set (Mass Capacity)																	// ++ 2018.01.03 - F0 V1.0
	//	------------------------------------------------------------------------------- 		
		var f002frmDiaCap = oCon.getForm(2);
   		f002frmDiaCap.addContent(new sap.m.Label({text:'Premix'}));
   		f002frmDiaCap.addContent(new sap.m.Input({id:'f002inpCapMatnrPxKG',
   												  editable:false}));
   		f002frmDiaCap.addContent(new sap.m.Label({text:'KG/SET'}));
   		f002frmDiaCap.addContent(new sap.m.Input({id:'f002inpCapMengePkgKGO',
   												  editable:false,
   												  value:'{/t_f_xwipmx/0/menge_ikg}'}));
   		f002frmDiaCap.addContent(new sap.m.Input({id:'f002inpCapMeinsPkgKGO',
   												  editable:false,
   												  value:'{/t_f_xwipmx/0/meins}'}));
   		f002frmDiaCap.addContent(new sap.m.Label({text:'SET'}));
   		f002frmDiaCap.addContent(new sap.m.Input({id:'f002inpCapMengeSet',
   												  value:'{/t_f_xwipmx/0/menge_rst}'}));
   		f002frmDiaCap.addContent(new sap.m.Label({text:'Cap'}));										// ++ 2019.10.29 - F0 V2.0.0
   		f002frmDiaCap.addContent(new sap.m.Input({id:'f002inpCapBmsch',
   												  editable:true,
   												  value:'{/t_f_xwipmx/0/bmsch}'}));						// ++ 2019.10.29 - F0 V2.0.0
   		
   		var f002frmDiaCap = new sap.m.Dialog({
			id				: 'f002DiaCap',
			customHeader	: new sap.m.Bar({
								contentLeft		: [new sap.m.Label({id:'f002txtCapPmxnrKG'})],
				 				contentMiddle	: [],
				 				contentRight	: [new sap.m.Button({id:'f002btnCapKGCls',
				 												     icon:"sap-icon://decline",
				 												     press:oCon.ui5Dispatch})]
							  }),
		    contentWidth	: '600px',
		    buttons			: [new sap.m.Button({id:'f002btnCapKgEdt',
		    									 icon:"sap-icon://edit",
		    									 text:'Edit Cap',		
		    									 press:oCon.ui5Dispatch}),								// ++ 2019.10.29 - F0 V2.0.0
		    				   new sap.m.Button({id:'f002btnCapKGCal',
		    					   				 icon:"sap-icon://simulate",
		    					   				 text:'Calculate',
		    					   				 press:oCon.ui5Dispatch}),
				   			   new sap.m.Button({id:'f002btnCapKGAcp',
				   				   				 icon:"sap-icon://accept",
				   				   				 text:'Accept',
				   				   				 press:oCon.ui5Dispatch})],		    				
			content			: [f002frmDiaCap],
		});
		
   	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------  
   		//var f005DiaWei  = oCon.getDiaWei('f002');
   		var f002DiaWei    = oApp.diaWeight('f002');
   		var f002DiaEdt    = oCon.getDialogEditInp('f002','SET');
		var f002btnDate	  = oCon.getBtnDate('f002');
		var f002DiaDate   = oCon.getDialogDate('f002',"SAPEVT_F002","evt_f002");
   		var f002schMain   = oCon.getSchMain('f002','f002TblOvw',['pmxnr','maktx_px','maktx_fg']);
   		var f002pullMain  = oCon.getPullMain('f002','SAPEVT_F002','evt_f002');
   		
		var f002lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Weight Premix"});
		var f002btnEdtCap = new sap.m.Button({id:'f002btnEdtCap',		
											  icon:"sap-icon://edit",
											  text:'Set',
											  press:oCon.ui5Dispatch});									// ++ 2018.01.03 - F0 V1.0
		var f002btnEdt    = new sap.m.Button({id:'f002btnEdt',
											  icon:"sap-icon://edit",
											  text:'KG/Set',
											  press:oCon.ui5Dispatch});
		var f002btnWei    = new sap.m.Button({id:'f002btnWei',
											  icon:"sap-icon://unwired",
											  text:'Start Weight',
											  press:oCon.ui5Dispatch});
		var f002btnBck    = new sap.m.Button({id:'f002btnBck',
											  icon:"sap-icon://nav-back",
											  press:oCon.ui5Dispatch});
		var f002page = new sap.m.Page({
			id				: 'f002page',
			customHeader	: new sap.m.Bar({contentLeft:	[f002btnBck,f002btnDate],
											 contentMiddle:	[f002lblTitle],
											 contentRight:	[f002btnEdtCap,
												 			 f002btnEdt,
												 			 f002btnWei]}), 	// ++ (1)
			content			: [f002pullMain,f002schMain,f002TblOvw]
		});	
		
	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------  
		this.setDisplayBlock(true);
		return [f002page];
	}

});