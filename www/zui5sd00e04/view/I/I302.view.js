sap.ui.jsview("zui5sd00e04.view.I.I302", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.I.I302
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I302";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.I.I302
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	QR Field
	//	-------------------------------------------------------------------------------
		
		var i302inpQr = new sap.m.Input({
			id			: 'i302inpQr',
			width 		: '100%',
		});
		sap.ui.getCore().byId("i302inpQr").onsapenter = function(oEvt){oCon.ui5DispatchFcode('i302inpQr');};
	
	//	-------------------------------------------------------------------------------
	//	Table - Component Confirm - in
	//	-------------------------------------------------------------------------------
		
		var i302RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : ''}),
					  new sap.m.ObjectIdentifier({title: '{menge_rkg}',
												 text  : '{meins_kgx}'}),
					  new sap.m.Link({text:"{menge_ckg}",press:oController.fcodeAdj}),]
					  //new sap.m.ObjectIdentifier({title: '{menge_ckg}',
					  //							  text : '{meins_kgx}'}),]
		}); 
   		var i302TblIng = new sap.m.Table({
   			id			: "i302TblIng",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','i302TblIng','matnr_in'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Cnf-in'),],
   			items		: {path:"/t_i_pciing",template:i302RowIng},
   		});	
	
   	//	-------------------------------------------------------------------------------
	//	Table & Dialog - List Batch
	//	-------------------------------------------------------------------------------
   		
		var i302RowMeat = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{charg}',
												  text : {path:'vfdat',formatter:oFmt.fmtDate}}),
					  new sap.m.ObjectIdentifier({title: '{menge_hkg}',
												 text  : ''}),
					  new sap.m.Input({value:'{menge_ikg}',description:'{meins_kgx}',fieldWidth:'70%'}),]
		}); 
   		var i302TblMeat = new sap.m.Table({
   			id			: "i302TblMeat",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','Batch','','','i302TblMeat','charg'),
   			       		   oCon.getCol('02','Onh'),
   			       		   oCon.getCol('99','Qty','100px'),],
   			items		: {path:"/t_i_pcibat",template:i302RowMeat},
   		});	
		var i302DiaMeat = new sap.m.Dialog({
			id				: 'i302DiaMeat',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Label({id:"i302lblMengeRkg"})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){i302DiaMeat.close();},})]}),
			contentWidth	: '98%',
		    beginButton		: new sap.m.Button({id:'i302btnMSave',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch}),
		    content			: [i302TblMeat],
		});
		
	//	-------------------------------------------------------------------------------
	//	Table - Material Replacement
	//	-------------------------------------------------------------------------------
		
		var i302RowRep = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : {parts:[{path:'charg'},
												                 {path:'vfdat',formatter:oFmt.fmtDate}]}}),
					  new sap.m.ObjectIdentifier({title: '{menge_hkg}',
												 text  : ''}),
					  new sap.m.Input({value:'{menge_ikg}',description:'{meins_kgx}',fieldWidth:'70%'}),]
		}); 
   		var i302TblRep = new sap.m.Table({
   			id			: "i302TblRep",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','Batch','','','i302TblRep','charg'),
   			       		   oCon.getCol('02','Onh'),
   			       		   oCon.getCol('99','Qty','100px'),],
   			items		: {path:"/t_i_pcirep",template:i302RowRep},
   		});	
		var i302DiaRep = new sap.m.Dialog({
			id				: 'i302DiaRep',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Label({text:"Replacement Mat"})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){i302DiaRep.close();},})]}),
			contentWidth	: '98%',
		    beginButton		: new sap.m.Button({id:'i302btnRSave',icon:"sap-icon://accept",text:'Apply',press:oCon.ui5Dispatch}),
		    content			: [i302TblRep],
		});
		
	//	-------------------------------------------------------------------------------
	//	Dialog Scan
	//	-------------------------------------------------------------------------------
		
   		var i302FrmQr = oCon.getForm(3);
   		i302FrmQr.addContent(new sap.m.Label({text:'QR Data'}));
   		i302FrmQr.addContent(new sap.m.Input({id:'i302InpQrData'}));
	   	i302FrmQr.addContent(new sap.m.Label({text:'Component'}));
	   	i302FrmQr.addContent(new sap.m.Input({id:'i302inpMatnrTx',editable:false}));
	   	i302FrmQr.addContent(new sap.m.Label({text:'Batch'}));
	   	i302FrmQr.addContent(new sap.m.Input({id:'i302inpCharg'}));
	   	i302FrmQr.addContent(new sap.m.Label({text:'Cnf-in'}));
	   	i302FrmQr.addContent(new sap.m.Input({id:'i302inpMenge'}));
	   	i302FrmQr.addContent(new sap.m.Input({id:'i302inpMeins'}));
	   	i302FrmQr.addContent(new sap.m.Label({text:'Cnf-in'}));
	   	i302FrmQr.addContent(new sap.m.Input({id:'i302inpQrcod',visible:false})); // ++ 2018.01.19 :: Input Confirm V1.0 :: Prevent scanning confirmed sticker.
	   	
	   	new sap.m.Input({id:'i302inpMatnr',visible:false});
	   	new sap.m.Input({id:'i302inpMenge_rkg',visible:false});
	   	new sap.m.Input({id:'i302inpMeins_kg',visible:false});
	   	
		var i302DiaQr = new sap.m.Dialog({
			id				: 'i302DiaQr',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Button({id:'i302btnCam',icon:"sap-icon://camera",press:oCon.ui5Dispatch}),],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({id:'i302btnBat',icon:"sap-icon://dimension",text:'Choose Batch',press:oCon.ui5Dispatch}),
				 				                          	 new sap.m.Button({icon:"sap-icon://decline",press:function(){i302DiaQr.close();}}),]}),
			contentWidth	: '650px',
		    beginButton		: new sap.m.Button({id:'i302btnList',icon:"sap-icon://list",text:'Change Mat',press:oCon.ui5Dispatch}),
		    endButton		: new sap.m.Button({id:'i302btnQrAcp',icon:"sap-icon://accept",text:'Accept',press:oCon.ui5Dispatch}),
		    content			: [i302FrmQr],
		});
		sap.ui.getCore().byId("i302InpQrData").onsapenter = function(oEvt){oCon.ui5DispatchFcode('i302InpQrData');};
		
	//	-------------------------------------------------------------------------------
	//	Dialog adjust
	//	-------------------------------------------------------------------------------
		
		var i302RowAdj = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{charg}',
												  text : {path:'vfdat',formatter:oFmt.fmtDate}}),
					  new sap.m.Input({value:'{menge_ckg}',description:'{meins_kgx}',fieldWidth:'70%'}),]
		}); 
   		var i302TblAdj = new sap.m.Table({
   			id			: "i302TblAdj",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','Batch','','','i302TblAdj','charg'),
   			       		   oCon.getCol('99','Qty','100px'),],
   			items		: {path:"/t_i_pcibat",template:i302RowAdj},
   		});	
		var i302DiaAdj = new sap.m.Dialog({
			id				: 'i302DiaAdj',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Label({id:"i302lblAdj"})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){i302DiaAdj.close();},})]}),
			contentWidth	: '98%',
		    beginButton		: new sap.m.Button({id:'i302btnASave',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch}),
		    content			: [i302TblAdj],
		});
		
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   		
   		var i302inpWIP 		= new sap.m.Input({id:'i302inpWIP',value:''});	// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
   		
		var i302DiaCnf    	= oApp.diaCnfin('i302');
   		var i302schMain   	= oCon.getSchMain('i302','i302TblIng',['matnr_fg','matnr_in']);
   		//var i302pullMain  = oCon.getPullMain('i302','SAPEVT_I315','evt_i315');
		var i302lblTitle  	= new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Input Confirmation"});
		var i302btnCnf    	= new sap.m.Button({id:'i302btnCnf',icon:"sap-icon://save",text:'Confirm',press:oCon.ui5Dispatch});
		var i302btnDis    	= new sap.m.Button({id:'i302btnDis',icon:"sap-icon://display",text:'Component',press:oCon.ui5Dispatch});
		var i302btnBck    	= new sap.m.Button({id:'i302btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i302page = new sap.m.Page({
			id				: 'i302page',
			customHeader	: new sap.m.Bar({contentLeft:	[i302btnBck],
											 contentMiddle:	[i302lblTitle],
											 contentRight:	[i302btnDis,i302btnCnf],}),
			content			: [i302inpQr,i302TblIng]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i302page];
	}

});