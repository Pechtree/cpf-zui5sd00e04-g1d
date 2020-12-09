sap.ui.jsview("zui5sd00e04.view.I.I406", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.I.I406
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I406";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.I.I406
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//QR Field
		//-------------------------------------------------------------------------------
		var i406inpQr = new sap.m.Input({
			id			: 'i406inpQr',
			width 		: '100%',
		});
		sap.ui.getCore().byId("i406inpQr").onsapenter = function(oEvt){oCon.ui5DispatchFcode('i406inpQr');};
		//-------------------------------------------------------------------------------
		//Table - Component Confirm - in
		//-------------------------------------------------------------------------------
		var i406RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : ''}),
					  new sap.m.ObjectIdentifier({title: '{menge_rkg}',
												 text  : '{meins_kgx}'}),
					  new sap.m.ObjectIdentifier({title: '{menge_ckg}',
												  text : '{meins_kgx}'}),]
		}); 
   		var i406TblIng = new sap.m.Table({
   			id			: "i406TblIng",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','i406TblIng','matnr_in'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Cnf-in'),],
   			items		: {path:"/t_i_pciing",template:i406RowIng},
   		});	
		//-------------------------------------------------------------------------------
		//Table & Dialog - Raw Meat Confirm
		//-------------------------------------------------------------------------------
		var i406RowMeat = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{charg}',
				  				                  text : {path:'vfdat',formatter:oFmt.fmtDate}}),
					  new sap.m.ObjectIdentifier({title: '{menge_hkg}',
										 		  text : ''}),
					  new sap.m.Input({value:'{menge_ikg}',description:'{meins_kgx}',fieldWidth:'70%'}),]
		}); 
   		var i406TblMeat = new sap.m.Table({
   			id			: "i406TblMeat",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','Batch','','','i406TblMeat','charg'),
   			       		   oCon.getCol('02','Onh'),
   			       		   oCon.getCol('99','Qty','100px'),],
   			items		: {path:"/t_i_pcibat",template:i406RowMeat},
   		});	
		var i406DiaMeat = new sap.m.Dialog({
			id				: 'i406DiaMeat',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Label({id:"i406lblMengeRkg"})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){i406DiaMeat.close();},})]}),
			contentWidth	: '90%',
		    beginButton		: new sap.m.Button({id:'i406btnMSave',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch}),
		    content			: [i406TblMeat],
		});
		//-------------------------------------------------------------------------------
		//Table - Material Replacement
		//-------------------------------------------------------------------------------	
		var i406RowRep = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : {parts:[{path:'charg'},
												                 {path:'vfdat',formatter:oFmt.fmtDate}]}}),
					  new sap.m.ObjectIdentifier({title: '{menge_hkg}',
												 text  : ''}),
					  new sap.m.Input({value:'{menge_ikg}',description:'{meins_kgx}',fieldWidth:'70%'}),]
		}); 
   		var i406TblRep = new sap.m.Table({
   			id			: "i406TblRep",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','Batch','','','i406TblRep','charg'),
   			       		   oCon.getCol('02','Onh'),
   			       		   oCon.getCol('99','Qty','100px'),],
   			items		: {path:"/t_i_pcirep",template:i406RowRep},
   		});	
		var i406DiaRep = new sap.m.Dialog({
			id				: 'i406DiaRep',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Label({text:"Replacement Mat"})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){i406DiaRep.close();},})]}),
			contentWidth	: '98%',
		    beginButton		: new sap.m.Button({id:'i406btnRSave',icon:"sap-icon://accept",text:'Apply',press:oCon.ui5Dispatch}),
		    content			: [i406TblRep],
		});
		//-------------------------------------------------------------------------------
		//Dialog Scan
		//-------------------------------------------------------------------------------
   		var i406FrmQr = oCon.getForm(3);
   		i406FrmQr.addContent(new sap.m.Label({text:'QR Data'}));
   		i406FrmQr.addContent(new sap.m.Input({id:'i406InpQrData'}));
	   	i406FrmQr.addContent(new sap.m.Label({text:'Component'}));
	   	i406FrmQr.addContent(new sap.m.Input({id:'i406inpMatnrTx',editable:false}));
	   	i406FrmQr.addContent(new sap.m.Label({text:'Batch'}));
	   	i406FrmQr.addContent(new sap.m.Input({id:'i406inpCharg'}));
	   	i406FrmQr.addContent(new sap.m.Label({text:'Cnf-in'}));
	   	i406FrmQr.addContent(new sap.m.Input({id:'i406inpMenge'}));
	   	i406FrmQr.addContent(new sap.m.Input({id:'i406inpMeins'}));
	   	
	   	new sap.m.Input({id:'i406inpMatnr',visible:false});
	   	new sap.m.Input({id:'i406inpMenge_rkg',visible:false});
	   	new sap.m.Input({id:'i406inpMeins_kg',visible:false});
	   	
		var i406DiaQr = new sap.m.Dialog({
			id				: 'i406DiaQr',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Button({id:'i406btnCam',icon:"sap-icon://camera",press:oCon.ui5Dispatch}),],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({id:'i406btnBat',icon:"sap-icon://dimension",text:'Choose Batch',press:oCon.ui5Dispatch}),
				 				                          	 new sap.m.Button({icon:"sap-icon://decline",press:function(){i406DiaQr.close();}}),]}),
			contentWidth	: '650px',
			endButton		: new sap.m.Button({id:'i406btnQrAcp',icon:"sap-icon://accept",text:'Accept',press:oCon.ui5Dispatch}),
		    beginButton		: new sap.m.Button({id:'i406btnList',icon:"sap-icon://list",text:'Change Mat',press:oCon.ui5Dispatch}),
		    content			: [i406FrmQr],
		});
		sap.ui.getCore().byId("i406InpQrData").onsapenter = function(oEvt){oCon.ui5DispatchFcode('i406InpQrData');};
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var i406DiaCnf    = oApp.diaCnfin('i406');
   		var i406schMain   = oCon.getSchMain('i406','i406TblIng',['matnr_fg','matnr_in']);
   		var i406pullMain  = oCon.getPullMain('i406','SAPEVT_I408','evt_i408');
		var i406lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Edit Input Confirmation"});
		var i406btnCnf    = new sap.m.Button({id:'i406btnCnf',icon:"sap-icon://save",text:'Confirm',press:oCon.ui5Dispatch});
		var i406btnDis    = new sap.m.Button({id:'i406btnDis',icon:"sap-icon://display",text:'Component',press:oCon.ui5Dispatch});
		var i406btnBck    = new sap.m.Button({id:'i406btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i406page = new sap.m.Page({
			id				: 'i406page',
			customHeader	: new sap.m.Bar({contentLeft:	[i406btnBck],
											 contentMiddle:	[i406lblTitle],
											 contentRight:	[i406btnDis,i406btnCnf],}),
			content			: [i406inpQr,i406TblIng]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i406page];
	}

});