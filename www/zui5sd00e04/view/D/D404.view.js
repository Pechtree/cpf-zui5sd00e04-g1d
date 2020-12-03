sap.ui.jsview("zui5sd00e04.view.D.D404", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.D404
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D404";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.D404
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table
		//-------------------------------------------------------------------------------
		var d404RowPmx = new sap.m.ColumnListItem({
			cells	:[ new sap.m.ObjectIdentifier({title: '{matnr_in}',
												   text : '{maktx_in}'}),
				       new sap.m.ObjectIdentifier({title: '{menge_rkg}',
				    	   						   text : ''}),
				       new sap.m.ObjectIdentifier({title: '{menge_hkg}',
				    	   						   text : ''}),
					   new sap.m.Button({press			: oController.fcodeDec,
					    				 icon			: "sap-icon://less",}),
					   new sap.m.Link({text:"{menge_ikg}",press:oController.fcodeEdt}),
					   new sap.m.Button({press			: oController.fcodeInc,
					    				 icon			: "sap-icon://add",}),
			     	   new sap.m.ObjectIdentifier({title:'{meins_kgx}',text:''}),]
		}); 
   		var d404TblPmx = new sap.m.Table({
   			id			: "d404TblPmx",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','d404TblPmx','matnr_in'),
   			       		   oCon.getCol('02','Ord'),
   			       		   oCon.getCol('02','Onh'),
   			       		   oCon.getCol('04',''),
   			       		   oCon.getCol('05','Confirm'),
   			       		   oCon.getCol('04',''),
   			               oCon.getCol('03','UoM'),],
   			items		: {path:"/t_d_xrsing",template:d404RowPmx},
   		});

   		
   	//	-------------------------------------------------------------------------------
   	// 	Dialog Input Transfer Remark
   	//	-------------------------------------------------------------------------------
   	  		
   	  	var d404FrmRemark = oCon.getForm(3);
   	  	d404FrmRemark.addContent(new sap.m.Input({id:'d404inpRemark',maxLength:15})); 
   	  	var d404DiaRemark = new sap.m.Dialog({
   	  	   	id				: 'd404DiaRemark',
   	  	   	customHeader	: new sap.m.Bar({contentLeft:	[],
   	  	   		 				             contentMiddle:	[new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Remark"})],
   	  	   		 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){d404DiaRemark.close();},})],}),
   	  	   	contentWidth	: '550px',
   	  	   	beginButton		: new sap.m.Button({id:'d404btnRmk',icon:"sap-icon://accept",text:'ตกลง',press:oCon.ui5Dispatch}),
   	  	   	content			: [d404FrmRemark],
   	   	});
   	  	   	
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var d404schMain   = oCon.getSchMain('d404','d404TblPmx',['matnr_in','maktx_in']);
   		// var d404pullMain  = oCon.getPullMain('d404','SAPEVT_D403','evt_d403');
   		var d404pullMain  = oCon.getPullMain('d404','SAPEVT_D413','evt_d413');
   		var d404DiaEdt    = oCon.getDialogEditInp('d404','Order');
		var d404lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Stock Transfer Orders - Premix Order"});
		var d404btnDis    = new sap.m.Button({id:'d404btnDis',icon:"sap-icon://display",text:'Display',press:oCon.ui5Dispatch});
		var d404btnSav    = new sap.m.Button({id:'d404btnSav',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch});
		var d404btnBck    = new sap.m.Button({id:'d404btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d404page = new sap.m.Page({
			id				: 'd404page',
			customHeader	: new sap.m.Bar({contentLeft:	[d404btnBck],
											 contentMiddle:	[d404lblTitle],
											 contentRight:	[d404btnSav],}),
			content			: [d404pullMain,d404schMain,d404TblPmx, d404DiaRemark]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [d404page];
	}

});