sap.ui.jsview("zui5sd00e04.view.D.D703", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.D.D703
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D703";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.D.D703
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	Overview Table
	//	-------------------------------------------------------------------------------
   		   		
		var d703RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[	new sap.m.ObjectIdentifier({title:'{matnr}',
				  								  text :'{maktx}'}),
				  		new sap.m.ObjectIdentifier({title:'{menge}',
					  							  text :'{meins}'})] 
		}); 
		
   		var d703TblOvw = new sap.m.Table({
   			id						: "d703TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('99','Material','','','d703TblOvw','matnr'),
   						   oCon.getCol('20','Order','','','d703TblOvw','menge')],
   			items		: {path:"/t_d_xrsmat",template:d703RowOvw},
   		});
   	
	//	-------------------------------------------------------------------------------
	// 	Dialog 
   	//	-------------------------------------------------------------------------------
   		
   		var d703FrmAdd = oCon.getForm(3);
   		d703FrmAdd.addContent(new sap.m.Label({text:'Material'}));
   		d703FrmAdd.addContent(new sap.m.Input({id:'d703inpMatnr',type:"Number"})); 
   		d703FrmAdd.addContent(new sap.m.Label({text:'Qty'}));
   		d703FrmAdd.addContent(new sap.m.Input({id:'d703inpMenge',type:"Number"}));
   		d703FrmAdd.addContent(new sap.m.Label({text:'UOM'}));
   		d703FrmAdd.addContent(new sap.m.Input({id:'d703inpMeins'}));
   		var d703DiaAdd = new sap.m.Dialog({
   			id				: 'd703DiaAdd',
   			customHeader	: new sap.m.Bar({contentLeft:	[],
   				 				             contentMiddle:	[new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Add Material"})],
   				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){d703DiaAdd.close();},})],}),
   			contentWidth	: '550px',
   		    beginButton		: new sap.m.Button({id:'d703btnAcp',icon:"sap-icon://accept",text:'Accept',press:oCon.ui5Dispatch}),
   		    content			: [d703FrmAdd],
   		});
   		
   	//	-------------------------------------------------------------------------------
   	// 	Dialog Input Transfer Remark
   	//	-------------------------------------------------------------------------------
   	  	  		
   		var d703FrmRemark = oCon.getForm(3);
   		d703FrmRemark.addContent(new sap.m.Input({id:'d703inpRemark',maxLength:15})); 
   	   	var d703DiaRemark = new sap.m.Dialog({
   	   		id				: 'd703DiaRemark',
   	   		customHeader	: new sap.m.Bar({contentLeft:	[],
   	   			 				             contentMiddle:	[new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Remark"})],
   	   			 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){d703DiaRemark.close();},})],}),
   	   		contentWidth	: '550px',
   	   	    beginButton		: new sap.m.Button({id:'d703btnRmk',icon:"sap-icon://accept",text:'ตกลง',press:oCon.ui5Dispatch}),
   	   	    content			: [d703FrmRemark],
   	   	});
   		
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   		
   		var d703schMain   = oCon.getSchMain('d703','d703TblOvw',['runno','licha','charg','menge_ikg']); 
		var d703lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Transfer Order"});
		var d703btnBck    = new sap.m.Button({id:'d703btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d703btnHom    = new sap.m.Button({id:'d703btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var d703btnAdd    = new sap.m.Button({id:'d703btnAdd',icon:"sap-icon://add",press:oCon.ui5Dispatch});
		var d703btnDel    = new sap.m.Button({id:'d703btnDel',icon:"sap-icon://delete",press:oCon.ui5Dispatch});
		var d703btnSav    = new sap.m.Button({id:'d703btnSav',icon:"sap-icon://save",press:oCon.ui5Dispatch});
		var d703page = new sap.m.Page({
			id				: 'd703page',
			customHeader	: new sap.m.Bar({contentLeft:	[d703btnBck, d703btnHom],
											 contentMiddle:	[d703lblTitle],
											 contentRight:	[d703btnAdd, d703btnDel, d703btnSav],}),
			content			: [d703schMain, d703TblOvw, d703DiaAdd, d703DiaRemark]
		});	
   		
	//	-------------------------------------------------------------------------------	
	//	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [d703page];
	}
});