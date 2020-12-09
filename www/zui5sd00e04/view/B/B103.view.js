sap.ui.jsview("zui5sd00e04.view.B.B103", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.B.B103
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.B.B103";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.B.B103
	*/ 
	createContent : function(oController) {
		
	var b103inpBudat = new sap.m.Input({id:'b103inpBudat',value:'',visible:false}); 
   	var b103inpXblnr = new sap.m.Input({id:'b103inpXblnr',value:'',visible:false}); 
   	var b103inpBldat = new sap.m.Input({id:'b103inpBldat',value:'',visible:false}); 
   	var b103inpName  = new sap.m.Input({id:'b103inpName',value:'',visible:false});  
   	var b103inpCheck = new sap.m.Input({id:'b103inpCheck',value:'',visible:false}); 
   	var b103checkBck = new sap.m.Input({id:'b103checkBck',value:'',visible:false});
   	var b103inpEbeln = new sap.m.Input({id:'b103inpEbeln',value:'',visible:false}); 
   	var b103inpState = new sap.m.Input({id:'b103inpState',value:'',visible:true});  	
   		
   	// 	-------------------------------------------------------------------------------
	// 	Dialog Dlv Note & Post
	// 	-------------------------------------------------------------------------------
   		
   		var b103FrmGr = oCon.getForm_S(3);
   		b103FrmGr.addContent(new sap.m.Label({text:'Mat'}));
   		b103FrmGr.addContent(new sap.m.Input({id:'b103inpMatnr',editable:false}));
   		b103FrmGr.addContent(new sap.m.Label({text:'Mfg'}));
   		b103FrmGr.addContent(oCon.getDatePicker('b103inpHsdat'));
   		b103FrmGr.addContent(new sap.m.Label({text:'Exp'}));
   		b103FrmGr.addContent(oCon.getDatePicker('b103inpVfdat'));
   		b103FrmGr.addContent(new sap.m.Label({text:'Sup.Batch'}));
   		b103FrmGr.addContent(new sap.m.Input({id:'b103inpLicha'}));
   		b103FrmGr.addContent(new sap.m.Label({text:'SAP Batch'}));
   		b103FrmGr.addContent(new sap.m.Input({id:'b103inpCharg'})); 
   		b103FrmGr.addContent(new sap.m.Label({text:'Type'}));																// ++ 2018.01.16 :: GR - WM V1.9  
   		b103FrmGr.addContent(new sap.m.Input({id:'b103inpType'})); 															// ++ 2018.01.16 :: GR - WM V1.9  
   		b103FrmGr.addContent(new sap.m.Label({text:'Src'}));																// ++ 2018.01.16 :: GR - WM V1.9  
   		b103FrmGr.addContent(new sap.m.Input({id:'b103inpSource'})); 														// ++ 2018.01.16 :: GR - WM V1.9  
   		b103FrmGr.addContent(new sap.m.Label({text:'GR'}));
   		b103FrmGr.addContent(new sap.m.Input({id:'b103inpMenge',type:"Number"}));
   		//b103FrmGr.addContent(new sap.m.Label());
   		//b103FrmGr.addContent(new sap.ui.layout.HorizontalLayout());
   		b103FrmGr.addContent(new sap.m.Label({id:'b103lblDiffQty',text:'Diff'}));
   		b103FrmGr.addContent(new sap.m.Input({id:'b103inpDiffQty',type:"Number",color:'#FF0000'}));
   		b103FrmGr.addContent(new sap.m.Label({text:'Text'}));	 															// ++ 2018.10.09 :: GR - WM V2.7.2 :: Add input field 'Text'
   		b103FrmGr.addContent(new sap.m.Input({id:'b103inpText'})); 															// ++ 2018.10.09 :: GR - WM V2.7.2 :: Add input field 'Text'		
   		
	//	-------------------------------------------------------------------------------
	// 	Page
	//	-------------------------------------------------------------------------------

   		var b103lblTitle  = new sap.m.Label({id:'b103lblTitle',design:sap.m.LabelDesign.Bold});
		var b103btnAcp    = new sap.m.Button({id:'b103btnAcp',icon:"sap-icon://accept",press:oCon.ui5Dispatch});
		var b103btnDis    = new sap.m.Button({id:'b103btnDis',icon:"sap-icon://display",press:oCon.ui5Dispatch});
		var b103btnBck    = new sap.m.Button({id:'b103btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var b103btnCal    = new sap.m.Button({id:'b103btnCal',text:"Refresh",icon:"sap-icon://simulate",press:oCon.ui5Dispatch});
		var b103btnHom    = new sap.m.Button({id:'b103btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var b103page = new sap.m.Page({
			id				: 'b103page',
			customHeader	: new sap.m.Bar({contentLeft:	[b103btnBck, b103btnHom],
											 contentMiddle:	[b103lblTitle],
											 contentRight:	[b103btnDis,b103btnAcp],}),
			content			: [b103FrmGr]//,b103inpState,b103checkMFG,b103checkRMT,b103checkRMS]
		});
   		
	//	-------------------------------------------------------------------------------
	// 	Return
	//	-------------------------------------------------------------------------------

		this.setDisplayBlock(true);
		return [b103page];
	}
});