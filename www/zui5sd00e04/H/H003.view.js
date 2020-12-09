sap.ui.jsview("zui5sd00e04.H.H003", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.H003
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.H.H003";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.H003
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//QR Field
		//-------------------------------------------------------------------------------
		var h003inpQr = new sap.m.Input({
			id			: 'h003inpQr',
			width 		: '100%',
		});
		sap.ui.getCore().byId("h003inpQr").onsapenter = function(oEvt){oCon.ui5DispatchFcode('h003inpQr');};
		//-------------------------------------------------------------------------------
		//Table - Item List
		//-------------------------------------------------------------------------------
		var h003RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
				 								  text : {parts:[{path:'piknr',formatter:oFmt.fmtAlpha},
				 								                 {path:'rsnum',formatter:oFmt.fmtAlpha},
				 								                 {path:'rspos',formatter:oFmt.fmtAlpha},
				 								                 {path:'seta' ,formatter:oFmt.fmtAlpha},],
				 								          formatter:oFmt.fmtResb},
				 								 }),
			     	  new sap.m.ObjectIdentifier({title: '{charg}',
			     			  				      text : {path:'vfdat',formatter:oFmt.fmtDate}}),
			     	  new sap.m.ObjectIdentifier({title: '{menge_tkg}',
			     		  						  text : '{meins_kgx}'}),
			     	  new sap.m.Button({press:oController.fcodeDel,icon:"sap-icon://delete",type:sap.m.ButtonType.Transparent}),]
		}); 
   		var h003TblIng = new sap.m.Table({
   			id			: "h003TblIng",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','h003TblIng','matnr_in'),
   			       		   oCon.getCol('08','Batch','','','h003TblIng','charg'),
   			       		   oCon.getCol('02','Qty'),
   			       		   oCon.getCol('03',''),],
   			items		: {path:"/t_h_xtring",template:h003RowIng},
   		});	
   		//-------------------------------------------------------------------------------
		//Hidden Field
		//-------------------------------------------------------------------------------
   		new sap.m.Input({id:'h003InpMatnr',visible:false});
   		new sap.m.Input({id:'h003InpCharg',visible:false});
   		new sap.m.Input({id:'h003InpMenge',visible:false});
   		new sap.m.Input({id:'h003InpMeins',visible:false});
   		new sap.m.Input({id:'h003InpQrcod',visible:false});
   		new sap.m.Input({id:'h003InpSeta',visible:false});
   		
   		
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var h003lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Premix/Ingredient Transfer to Production"});
		var h003btnCam	  = new sap.m.Button({id:'h003btnCam',icon:"sap-icon://camera",text:'Scan',press:oCon.ui5Dispatch});
		var h003btnSav    = new sap.m.Button({id:'h003btnSav',icon:"sap-icon://save",text:'Transfer',press:oCon.ui5Dispatch});
		var h003btnBck    = new sap.m.Button({id:'h003btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var h003page = new sap.m.Page({
			id				: 'h003page',
			customHeader	: new sap.m.Bar({contentLeft:	[h003btnBck],
											 contentMiddle:	[h003lblTitle],
											 contentRight:	[h003btnCam,h003btnSav],}),
			content			: [h003inpQr,h003TblIng]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [h003page];
	}

});