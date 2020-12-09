sap.ui.jsview("zui5sd00e04.view.B.B003", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.B003
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.B.B003";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.B003
	*/ 
	createContent : function(oController) {

   	var b003inpBudat = new sap.m.Input({id:'b003inpBudat',value:'',visible:false}); 
   	var b003inpXblnr = new sap.m.Input({id:'b003inpXblnr',value:'',visible:false}); 
   	var b003inpBldat = new sap.m.Input({id:'b003inpBldat',value:'',visible:false}); 
   	var b003inpName  = new sap.m.Input({id:'b003inpName',value:'',visible:false}); 
   	var b003inpCheck = new sap.m.Input({id:'b003inpCheck',value:'',visible:false}); 
   	var b003checkBck = new sap.m.Input({id:'b003checkBck',value:'',visible:false}); 
   		
   	// 	-------------------------------------------------------------------------------
	// 	Dialog Dlv Note & Post
	// 	-------------------------------------------------------------------------------
   		
   		var b003FrmGr = oCon.getForm_S(3);
   		b003FrmGr.addContent(new sap.m.Label({text:'Mat'}));
   		b003FrmGr.addContent(new sap.m.Input({id:'b003inpMatnr',editable:false}));  
   		b003FrmGr.addContent(new sap.m.Label({text:'Mfg. Date'}));
   		b003FrmGr.addContent(new sap.m.DatePicker({
   			id				:'b003inpHsdat',
   			displayFormat	:'dd.MM.yyyy',
   			valueFormat		:'yyyyMMdd',
   			value			:'',
   			change			: oCon.ui5Dispatch
   		}));
   		b003FrmGr.addContent(new sap.m.Label({text:'Exp. Date'}));
   		b003FrmGr.addContent(new sap.m.DatePicker({
   			id				:'b003inpVfdat',
   			displayFormat	:'dd.MM.yyyy',
   			valueFormat		:'yyyyMMdd',
   			value			:'{/t_b_wgritm/0/vfdat}'	,
   		}));
   		b003FrmGr.addContent(new sap.m.Label({text:'V. Batch'}));
   		b003FrmGr.addContent(new sap.m.Input({id:'b003inpCharg'}));
   		b003FrmGr.addContent(new sap.m.Label({text:'GR Qty'}));
   		b003FrmGr.addContent(new sap.m.Input({id:'b003inpMenge',type:"Number"}));
   		
	//	-------------------------------------------------------------------------------
	// 	Page
	//	-------------------------------------------------------------------------------
   		
		var b003lblTitle  = new sap.m.Label({id:'b003lblTitle',design:sap.m.LabelDesign.Bold});
		var b003btnAcp    = new sap.m.Button({id:'b003btnAcp',icon:"sap-icon://accept",press:oCon.ui5Dispatch});
		var b003btnDis    = new sap.m.Button({id:'b003btnDis',icon:"sap-icon://display",press:oCon.ui5Dispatch});
		var b003btnBck    = new sap.m.Button({id:'b003btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var b003btnCal    = new sap.m.Button({id:'b003btnCal',text:"Refresh",icon:"sap-icon://simulate",press:oCon.ui5Dispatch});
		var b003btnHom    = new sap.m.Button({id:'b003btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var b003page = new sap.m.Page({
			id				: 'b003page',
			customHeader	: new sap.m.Bar({contentLeft:	[b003btnBck, b003btnHom],
											 contentMiddle:	[b003lblTitle],
											 contentRight:	[b003btnDis,b003btnAcp],}),
			content			: [b003FrmGr]
		});
   		
	//	-------------------------------------------------------------------------------
	// 	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [b003page];
	}
}); 