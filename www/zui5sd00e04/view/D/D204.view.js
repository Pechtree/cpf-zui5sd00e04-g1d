sap.ui.jsview("zui5sd00e04.view.D.D204", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.D.D204
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D204";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.D.D204
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table
		//-------------------------------------------------------------------------------
		var d204RowPmx = new sap.m.ColumnListItem({
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
   		var d204TblPmx = new sap.m.Table({
   			id			: "d204TblPmx",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','d204TblPmx','matnr_in'),
   			       		   oCon.getCol('02','Ord'),
   			       		   oCon.getCol('02','Onh'),
   			       		   oCon.getCol('04',''),
   			       		   oCon.getCol('02','Confirm'),
   			       		   oCon.getCol('04',''),
   			               oCon.getCol('03','UoM'),],
   			items		: {path:"/t_d_xrsing",template:d204RowPmx},
   		});
   		
	//	-------------------------------------------------------------------------------
	// 	Dialog Input Transfer Remark
	//	-------------------------------------------------------------------------------
   		
   		var d204FrmRemark = oCon.getForm(3);
   	   	d204FrmRemark.addContent(new sap.m.Input({id:'d204inpRemark',maxLength:15})); 
   	   	var d204DiaRemark = new sap.m.Dialog({
   	   		id				: 'd204DiaRemark',
   	   		customHeader	: new sap.m.Bar({contentLeft:	[],
   	   			 				             contentMiddle:	[new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Remark"})],
   	   			 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){d204DiaRemark.close();},})],}),
   	   		contentWidth	: '550px',
   	   	    beginButton		: new sap.m.Button({id:'d204btnRmk',icon:"sap-icon://accept",text:'ตกลง',press:oCon.ui5Dispatch}),
   	   	    content			: [d204FrmRemark],
   	   	});
   	   	
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var d204schMain   = oCon.getSchMain('d204','d204TblPmx',['matnr_in','maktx_in']);
   		// var d204pullMain  = oCon.getPullMain('d204','SAPEVT_D205','evt_d205');
   		var d204pullMain  = oCon.getPullMain('d204','SAPEVT_D215','evt_d215');
   		var d204DiaEdt    = oCon.getDialogEditInp('d204','Order');
   		
		var d204lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Stock Transfer Orders - Process Order"});
		var d204btnSav    = new sap.m.Button({id:'d204btnSav',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch});
		var d204btnBck    = new sap.m.Button({id:'d204btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d204page = new sap.m.Page({
			id				: 'd204page',
			customHeader	: new sap.m.Bar({contentLeft:	[d204btnBck],
											 contentMiddle:	[d204lblTitle],
											 contentRight:	[d204btnSav],}),
			content			: [d204pullMain,d204schMain,d204TblPmx, d204DiaRemark]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [d204page];
	}

});