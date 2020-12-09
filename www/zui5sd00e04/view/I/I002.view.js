sap.ui.jsview("zui5sd00e04.view.I.I002", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I.I002
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I002";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I.I002
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//QR Field
		//-------------------------------------------------------------------------------
		var i002inpQr = new sap.m.Input({
			id			: 'i002inpQr',
			width 		: '100%',
		});
		sap.ui.getCore().byId("i002inpQr").onsapenter = function(oEvt){oCon.ui5DispatchFcode('i002inpQr');};
		//-------------------------------------------------------------------------------
		//Table - Component Confirm - in
		//-------------------------------------------------------------------------------
		var i002RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : ''}),
					  new sap.m.ObjectIdentifier({title: '{menge_rkg}',
												 text  : '{meins_kgx}'}),
					  new sap.m.ObjectIdentifier({title: '{menge_ckg}',
												  text : '{meins_kgx}'}),]
		}); 
   		var i002TblIng = new sap.m.Table({
   			id			: "i002TblIng",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','i002TblIng','matnr_in'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Cnf-in'),],
   			items		: {path:"/t_i_pciing",template:i002RowIng},
   		});	
		//-------------------------------------------------------------------------------
		//Table & Dialog - List Batch
		//-------------------------------------------------------------------------------
		var i002RowMeat = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{charg}',
												  text : {path:'vfdat',formatter:oFmt.fmtDate}}),
					  new sap.m.ObjectIdentifier({title: '{menge_hkg}',
												 text  : ''}),
					  new sap.m.Input({value:'{menge_ikg}',description:'{meins_kgx}',fieldWidth:'70%'}),]
		}); 
   		var i002TblMeat = new sap.m.Table({
   			id			: "i002TblMeat",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','Batch','','','i002TblMeat','charg'),
   			       		   oCon.getCol('02','Onh'),
   			       		   oCon.getCol('99','Qty','100px'),],
   			items		: {path:"/t_i_pcibat",template:i002RowMeat},
   		});	
		var i002DiaMeat = new sap.m.Dialog({
			id				: 'i002DiaMeat',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Label({id:"i002lblMengeRkg"})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){i002DiaMeat.close();},})]}),
			contentWidth	: '98%',
		    beginButton		: new sap.m.Button({id:'i002btnMSave',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch}),
		    content			: [i002TblMeat],
		});
		//-------------------------------------------------------------------------------
		//Table - Material Replacement
		//-------------------------------------------------------------------------------	
		var i002RowRep = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : {parts:[{path:'charg'},
												                 {path:'vfdat',formatter:oFmt.fmtDate}]}}),
					  new sap.m.ObjectIdentifier({title: '{menge_hkg}',
												 text  : ''}),
					  new sap.m.Input({value:'{menge_ikg}',description:'{meins_kgx}',fieldWidth:'70%'}),]
		}); 
   		var i002TblRep = new sap.m.Table({
   			id			: "i002TblRep",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','Batch','','','i002TblRep','charg'),
   			       		   oCon.getCol('02','Onh'),
   			       		   oCon.getCol('99','Qty','100px'),],
   			items		: {path:"/t_i_pcirep",template:i002RowRep},
   		});	
		var i002DiaRep = new sap.m.Dialog({
			id				: 'i002DiaRep',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Label({text:"Replacement Mat"})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){i002DiaRep.close();},})]}),
			contentWidth	: '98%',
		    beginButton		: new sap.m.Button({id:'i002btnRSave',icon:"sap-icon://accept",text:'Apply',press:oCon.ui5Dispatch}),
		    content			: [i002TblRep],
		});
		//-------------------------------------------------------------------------------
		//Dialog Scan
		//-------------------------------------------------------------------------------
   		var i002FrmQr = oCon.getForm(3);
   		i002FrmQr.addContent(new sap.m.Label({text:'QR Data'}));
   		i002FrmQr.addContent(new sap.m.Input({id:'i002InpQrData'}));
	   	i002FrmQr.addContent(new sap.m.Label({text:'Component'}));
	   	i002FrmQr.addContent(new sap.m.Input({id:'i002inpMatnrTx',editable:false}));
	   	i002FrmQr.addContent(new sap.m.Label({text:'Batch'}));
	   	i002FrmQr.addContent(new sap.m.Input({id:'i002inpCharg'}));
	   	i002FrmQr.addContent(new sap.m.Label({text:'Cnf-in'}));
	   	i002FrmQr.addContent(new sap.m.Input({id:'i002inpMenge'}));
	   	i002FrmQr.addContent(new sap.m.Input({id:'i002inpMeins'}));
	   	i002FrmQr.addContent(new sap.m.Label({text:'Cnf-in'}));
	   	i002FrmQr.addContent(new sap.m.Input({id:'i002inpQrcod',visible:false})); // ++ 2018.01.19 :: Input Confirm V1.0 :: Prevent scanning confirmed sticker.
	   	
	   	new sap.m.Input({id:'i002inpMatnr',visible:false});
	   	new sap.m.Input({id:'i002inpMenge_rkg',visible:false});
	   	new sap.m.Input({id:'i002inpMeins_kg',visible:false});
	   	
		var i002DiaQr = new sap.m.Dialog({
			id				: 'i002DiaQr',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Button({id:'i002btnCam',icon:"sap-icon://camera",press:oCon.ui5Dispatch}),],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({id:'i002btnBat',icon:"sap-icon://dimension",text:'Choose Batch',press:oCon.ui5Dispatch}),
				 				                          	 new sap.m.Button({icon:"sap-icon://decline",press:function(){i002DiaQr.close();}}),]}),
			contentWidth	: '650px',
		    beginButton		: new sap.m.Button({id:'i002btnList',icon:"sap-icon://list",text:'Change Mat',press:oCon.ui5Dispatch}),
		    endButton		: new sap.m.Button({id:'i002btnQrAcp',icon:"sap-icon://accept",text:'Accept',press:oCon.ui5Dispatch}),
		    content			: [i002FrmQr],
		});
		sap.ui.getCore().byId("i002InpQrData").onsapenter = function(oEvt){oCon.ui5DispatchFcode('i002InpQrData');};
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		
   		var i002inpWIP 		= new sap.m.Input({id:'i002inpWIP',value:''});	// ++ 2018.08.02 :: Input Confirm V1.2 [Selection Confirm]
   		
		var i002DiaCnf    = oApp.diaCnfin('i002');
   		var i002schMain   = oCon.getSchMain('i002','i002TblIng',['matnr_fg','matnr_in']);
   		//var i002pullMain  = oCon.getPullMain('i002','SAPEVT_I003','evt_i003');
		var i002lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Input Confirmation"});
		var i002btnCnf    = new sap.m.Button({id:'i002btnCnf',icon:"sap-icon://save",text:'Confirm',press:oCon.ui5Dispatch});
		var i002btnDis    = new sap.m.Button({id:'i002btnDis',icon:"sap-icon://display",text:'Component',press:oCon.ui5Dispatch});
		var i002btnBck    = new sap.m.Button({id:'i002btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i002page = new sap.m.Page({
			id				: 'i002page',
			customHeader	: new sap.m.Bar({contentLeft:	[i002btnBck],
											 contentMiddle:	[i002lblTitle],
											 contentRight:	[i002btnDis,i002btnCnf],}),
			content			: [i002inpQr,i002TblIng]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i002page];
	}

});