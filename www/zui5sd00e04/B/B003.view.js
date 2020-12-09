sap.ui.jsview("zui5sd00e04.B.B003", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.B003
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.B.B003";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.B003
	*/ 
	createContent : function(oController) {
   		//-------------------------------------------------------------------------------
		//Dialog Dlv Note & Post
		//-------------------------------------------------------------------------------
   		var b003FrmGr = oCon.getForm(3);
   		b003FrmGr.addContent(new sap.m.Label({text:'Ing'}));
   		b003FrmGr.addContent(new sap.m.Input({id:'b003inpMatnr',editable:false}));
   		b003FrmGr.addContent(new sap.m.Label({text:'Manu Dat'}));
   		b003FrmGr.addContent(new sap.m.DatePicker({
			id				:'b003inpHsdat',
			displayFormat	:'dd.MM.YYYY',
			valueFormat		:'YYYYMMdd',
			value			:"",
		}));
   		b003FrmGr.addContent(new sap.m.Label({text:'V.Batch'}));
   		b003FrmGr.addContent(new sap.m.Input({id:'b003inpCharg',value:''}));
   		b003FrmGr.addContent(new sap.m.Label({text:'GR Qty'}));
   		b003FrmGr.addContent(new sap.m.Input({id:'b003inpMenge',type:"Number"}));
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var b003lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Confirm Receive"});
		var b003btnAcp    = new sap.m.Button({id:'b003btnAcp',icon:"sap-icon://accept",press:oCon.ui5Dispatch});
		var b003btnDis    = new sap.m.Button({id:'b003btnDis',icon:"sap-icon://display",press:oCon.ui5Dispatch});
		var b003btnBck    = new sap.m.Button({id:'b003btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var b003page = new sap.m.Page({
			id				: 'b003page',
			customHeader	: new sap.m.Bar({contentLeft:	[b003btnBck],
											 contentMiddle:	[b003lblTitle],
											 contentRight:	[b003btnDis,b003btnAcp],}),
			content			: [b003FrmGr]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [b003page];
	}

});