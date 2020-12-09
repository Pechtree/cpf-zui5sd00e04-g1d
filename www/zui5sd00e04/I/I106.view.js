sap.ui.jsview("zui5sd00e04.I.I106", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I106
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.I.I106";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I106
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//QR Field
		//-------------------------------------------------------------------------------
		var i106inpQr = new sap.m.Input({
			id			: 'i106inpQr',
			width 		: '100%',
		});
		sap.ui.getCore().byId("i106inpQr").onsapenter = function(oEvt){oCon.ui5DispatchFcode('i106inpQr');};
		//-------------------------------------------------------------------------------
		//Table - Component Confirm - in
		//-------------------------------------------------------------------------------
		var i106RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : ''}),
					  new sap.m.ObjectIdentifier({title: '{menge_rkg}',
												 text  : '{meins_kgx}'}),
					  new sap.m.ObjectIdentifier({title: '{menge_ckg}',
												  text : '{meins_kgx}'}),]
		}); 
   		var i106TblIng = new sap.m.Table({
   			id			: "i106TblIng",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','i106TblIng','matnr_in'),
   			       		   oCon.getCol('02','Req'),
   			       		   oCon.getCol('02','Cnf-in'),],
   			items		: {path:"/t_i_pciing",template:i106RowIng},
   		});	
		//-------------------------------------------------------------------------------
		//Table & Dialog - Raw Meat Confirm
		//-------------------------------------------------------------------------------
		var i106RowMeat = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{charg}',
				  				                  text : {path:'vfdat',formatter:oFmt.fmtDate}}),
					  new sap.m.ObjectIdentifier({title: '{menge_hkg}',
										 		  text : ''}),
					  new sap.m.Input({value:'{menge_ikg}',description:'{meins_kgx}',fieldWidth:'70%'}),]
		}); 
   		var i106TblMeat = new sap.m.Table({
   			id			: "i106TblMeat",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','Batch','','','i106TblMeat','charg'),
   			       		   oCon.getCol('02','Onh'),
   			       		   oCon.getCol('99','Qty','100px'),],
   			items		: {path:"/t_i_pcibat",template:i106RowMeat},
   		});	
		var i106DiaMeat = new sap.m.Dialog({
			id				: 'i106DiaMeat',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Label({id:"i106lblMengeRkg"})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){i106DiaMeat.close();},})]}),
			contentWidth	: '90%',
		    beginButton		: new sap.m.Button({id:'i106btnMSave',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch}),
		    content			: [i106TblMeat],
		});
		//-------------------------------------------------------------------------------
		//Table - Material Replacement
		//-------------------------------------------------------------------------------	
		var i106RowRep = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : {parts:[{path:'charg'},
												                 {path:'vfdat',formatter:oFmt.fmtDate}]}}),
					  new sap.m.ObjectIdentifier({title: '{menge_hkg}',
												 text  : ''}),
					  new sap.m.Input({value:'{menge_ikg}',description:'{meins_kgx}',fieldWidth:'70%'}),]
		}); 
   		var i106TblRep = new sap.m.Table({
   			id			: "i106TblRep",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','Batch','','','i106TblRep','charg'),
   			       		   oCon.getCol('02','Onh'),
   			       		   oCon.getCol('99','Qty','100px'),],
   			items		: {path:"/t_i_pcirep",template:i106RowRep},
   		});	
		var i106DiaRep = new sap.m.Dialog({
			id				: 'i106DiaRep',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Label({text:"Replacement Mat"})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){i106DiaRep.close();},})]}),
			contentWidth	: '98%',
		    beginButton		: new sap.m.Button({id:'i106btnRSave',icon:"sap-icon://accept",text:'Apply',press:oCon.ui5Dispatch}),
		    content			: [i106TblRep],
		});
		//-------------------------------------------------------------------------------
		//Dialog Scan
		//-------------------------------------------------------------------------------
   		var i106FrmQr = oCon.getForm(3);
   		i106FrmQr.addContent(new sap.m.Label({text:'QR Data'}));
   		i106FrmQr.addContent(new sap.m.Input({id:'i106InpQrData'}));
	   	i106FrmQr.addContent(new sap.m.Label({text:'Component'}));
	   	i106FrmQr.addContent(new sap.m.Input({id:'i106inpMatnrTx',editable:false}));
	   	i106FrmQr.addContent(new sap.m.Label({text:'Batch'}));
	   	i106FrmQr.addContent(new sap.m.Input({id:'i106inpCharg'}));
	   	i106FrmQr.addContent(new sap.m.Label({text:'Cnf-in'}));
	   	i106FrmQr.addContent(new sap.m.Input({id:'i106inpMenge'}));
	   	i106FrmQr.addContent(new sap.m.Input({id:'i106inpMeins'}));
	   	
	   	new sap.m.Input({id:'i106inpMatnr',visible:false});
	   	new sap.m.Input({id:'i106inpMenge_rkg',visible:false});
	   	new sap.m.Input({id:'i106inpMeins_kg',visible:false});
	   	
		var i106DiaQr = new sap.m.Dialog({
			id				: 'i106DiaQr',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Button({id:'i106btnCam',icon:"sap-icon://camera",press:oCon.ui5Dispatch}),],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({id:'i106btnBat',icon:"sap-icon://dimension",text:'Choose Batch',press:oCon.ui5Dispatch}),
				 				                          	 new sap.m.Button({icon:"sap-icon://decline",press:function(){i106DiaQr.close();}}),]}),
			contentWidth	: '650px',
			endButton		: new sap.m.Button({id:'i106btnQrAcp',icon:"sap-icon://accept",text:'Accept',press:oCon.ui5Dispatch}),
		    beginButton		: new sap.m.Button({id:'i106btnList',icon:"sap-icon://list",text:'Change Mat',press:oCon.ui5Dispatch}),
		    content			: [i106FrmQr],
		});
		sap.ui.getCore().byId("i106InpQrData").onsapenter = function(oEvt){oCon.ui5DispatchFcode('i106InpQrData');};
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var i106DiaCnf    = oApp.diaCnfin('i106');
   		var i106schMain   = oCon.getSchMain('i106','i106TblIng',['matnr_fg','matnr_in']);
   		var i106pullMain  = oCon.getPullMain('i106','SAPEVT_I108','evt_i108');
		var i106lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Edit Input Confirmation"});
		var i106btnCnf    = new sap.m.Button({id:'i106btnCnf',icon:"sap-icon://save",text:'Confirm',press:oCon.ui5Dispatch});
		var i106btnDis    = new sap.m.Button({id:'i106btnDis',icon:"sap-icon://display",text:'Component',press:oCon.ui5Dispatch});
		var i106btnBck    = new sap.m.Button({id:'i106btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i106page = new sap.m.Page({
			id				: 'i106page',
			customHeader	: new sap.m.Bar({contentLeft:	[i106btnBck],
											 contentMiddle:	[i106lblTitle],
											 contentRight:	[i106btnDis,i106btnCnf],}),
			content			: [i106inpQr,i106TblIng]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i106page];
	}

});