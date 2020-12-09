sap.ui.jsview("zui5sd00e04.view.D.D502", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.D.D502
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D502";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.D.D502
	*/ 
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	//	Overview Table
	//	-------------------------------------------------------------------------------
   		   		
		var d502RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[	new sap.m.ObjectIdentifier({title:'{matnr}',
				  								  text :'{maktx}'}),
				  		new sap.m.ObjectIdentifier({title:'{menge}',
					  							  text :'{meins}'})] 
		}); 
		
   		var d502TblOvw = new sap.m.Table({
   			id						: "d502TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('99','Material','','','d502TblOvw','matnr'),
   						   oCon.getCol('20','Order','','','d502TblOvw','menge')],
   			items		: {path:"/t_d_xrsmat",template:d502RowOvw},
   		});
   	
	//	-------------------------------------------------------------------------------
	// 	Dialog Add Material
   	//	-------------------------------------------------------------------------------
   		
   		var d502FrmAdd = oCon.getForm(3);
   		d502FrmAdd.addContent(new sap.m.Label({text:'Material'}));
   		d502FrmAdd.addContent(new sap.m.Input({id:'d502inpMatnr',type:"Number"})); 
   		d502FrmAdd.addContent(new sap.m.Label({text:'Qty'}));
   		d502FrmAdd.addContent(new sap.m.Input({id:'d502inpMenge',type:"Number"}));
   		d502FrmAdd.addContent(new sap.m.Label({text:'UOM'}));
   		d502FrmAdd.addContent(new sap.m.Input({id:'d502inpMeins'}));
   		var d502DiaAdd = new sap.m.Dialog({
   			id				: 'd502DiaAdd',
   			customHeader	: new sap.m.Bar({contentLeft:	[],
   				 				             contentMiddle:	[new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Add Material"})],
   				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){d502DiaAdd.close();},})],}),
   			contentWidth	: '550px',
   		    beginButton		: new sap.m.Button({id:'d502btnAcp',icon:"sap-icon://accept",text:'Accept',press:oCon.ui5Dispatch}),
   		    content			: [d502FrmAdd],
   		});
   		
   	//	-------------------------------------------------------------------------------
   	// 	Dialog Input Transfer Remark
   	//	-------------------------------------------------------------------------------
   	  		
   		var d502FrmRemark = oCon.getForm(3);
   		d502FrmRemark.addContent(new sap.m.Input({id:'d502inpRemark',maxLength:15})); 
   	   	var d502DiaRemark = new sap.m.Dialog({
   	   		id				: 'd502DiaRemark',
   	   		customHeader	: new sap.m.Bar({contentLeft:	[],
   	   			 				             contentMiddle:	[new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Remark"})],
   	   			 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){d502DiaRemark.close();},})],}),
   	   		contentWidth	: '550px',
   	   	    beginButton		: new sap.m.Button({id:'d502btnNot',icon:"sap-icon://accept",text:'ตกลง',press:oCon.ui5Dispatch}),
   	   	    content			: [d502FrmRemark],
   	   	});
   		
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
   		
   		var d502schMain   = oCon.getSchMain('d502','d502TblOvw',['runno','licha','charg','menge_ikg']); 
		var d502lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Create Transfer Order"});
		var d502btnBck    = new sap.m.Button({id:'d502btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var d502btnHom    = new sap.m.Button({id:'d502btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var d502btnAdd    = new sap.m.Button({id:'d502btnAdd',icon:"sap-icon://add",press:oCon.ui5Dispatch});
		var d502btnDel    = new sap.m.Button({id:'d502btnDel',icon:"sap-icon://delete",press:oCon.ui5Dispatch});
		var d502btnSav    = new sap.m.Button({id:'d502btnSav',icon:"sap-icon://save",press:oCon.ui5Dispatch});
		var d502page = new sap.m.Page({
			id				: 'd502page',
			customHeader	: new sap.m.Bar({contentLeft:	[d502btnBck, d502btnHom],
											 contentMiddle:	[d502lblTitle],
											 contentRight:	[d502btnAdd, d502btnDel, d502btnSav],}),
			content			: [d502schMain, d502TblOvw, d502DiaAdd, d502DiaRemark]
		});	
   		
	//	-------------------------------------------------------------------------------	
	//	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [d502page];
	}
});