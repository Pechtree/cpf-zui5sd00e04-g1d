sap.ui.jsview("zui5sd00e04.view.L.L103", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.L.L103
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.L.L103";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.L.L103
	*/ 
	createContent : function(oController) {

		//-------------------------------------------------------------------------------
		//Form Detail and GR Input
		//-------------------------------------------------------------------------------
   		var l103FrmMain = oCon.getForm_S(3);
   		
   		l103FrmMain.addContent(new sap.m.Label({text:''}));
   		l103FrmMain.addContent(new sap.m.Input({id:'l103InpIR',editable:false,value:''}));
   		l103FrmMain.addContent(new sap.m.Input({id:'l103InpIRtx',editable:false,value:''}));
   		
   		l103FrmMain.addContent(new sap.m.Label({text:''}));
   		l103FrmMain.addContent(new sap.m.Input({id:'l103InpAufnr',editable:false,value:'{/t_l_iromat/0/aufnr}'}));
   		
   		l103FrmMain.addContent(new sap.m.Label({text:''}));
   		l103FrmMain.addContent(new sap.m.Input({id:'l103InpMatnr',editable:false,value:'{/t_l_iromat/0/matnr_fg}'}));
   		l103FrmMain.addContent(new sap.m.Input({id:'l103InpMaktx',editable:false,value:'{/t_l_iromat/0/maktx_fg}'}));
		
   		l103FrmMain.addContent(new sap.m.Label({text:''}));
   		l103FrmMain.addContent(new sap.m.Input({id:'l103InpWerks',editable:false,value:'{/head/werks}'}));
   		l103FrmMain.addContent(new sap.m.Input({id:'l103InpWerksText',editable:false,value:'{/head/werksx}'}));
   		
   		l103FrmMain.addContent(new sap.m.Label({text:''}));
   		l103FrmMain.addContent(new sap.m.Input({id:'l103InpSlocNumber',editable:true,value:'{/t_l_iromat/0/lgort}'}));
   		//l103FrmMain.addContent(new sap.m.Input({id:'l103InpSlocName',editable:false,value:'{/t_l_iromat/0/bezei}'}));
   		
   		l103FrmMain.addContent(new sap.m.Label({text:'Mfg. Date *'}));
   		l103FrmMain.addContent(oCon.getDatePicker('l103InpMfgDate','{/t_l_iromat/0/hsdat}'));
   		
   		l103FrmMain.addContent(new sap.m.Label({text:'Qty *'}));
   		l103FrmMain.addContent(new sap.m.Input({id:'l103InpQTY',type:"Number"}));
   		l103FrmMain.addContent(new sap.m.Input({id:'l103InpQTYUnit',value:'{/t_l_iromat/0/meins_kg}'}));
		
		//-------------------------------------------------------------------------------
		//Dialog + Form in Dialog
		//-------------------------------------------------------------------------------
   		var l103FrmDia = oCon.getForm_S(2);
   		
   		var l103DiaTitle  = new sap.m.Label({id:'l103DiaTitle',design:sap.m.LabelDesign.Bold,text:""});
   		
   		l103FrmDia.addContent(new sap.m.Label({text:''}));
   		l103FrmDia.addContent(new sap.m.Input({id:'l103DiaInpQTY',editable:false,value:'{/t_l_irobat/0/menge_rst}'}));
   		l103FrmDia.addContent(new sap.m.Input({id:'l103DiaInpQTYUnit',editable:false,value:'{/t_l_irobat/0/meins_st}'}));
   		
   		l103FrmDia.addContent(new sap.m.Label({text:''}));
   		l103FrmDia.addContent(new sap.m.Input({id:'l103DiaInpMfgExpDate',editable:false,value:'{/t_l_irobat/0/hsdat} - {/t_l_irobat/0/vfdat}'}));
   		
   		//InVisible Mfg.Date & Exp.Date Input
   		l103FrmDia.addContent(new sap.m.Label({text:'',visible:false}));
   		l103FrmDia.addContent(new sap.m.Input({id:'l103DiaInpMfgDate',visible:false,value:'{/t_l_irobat/0/hsdat}'}));
   		l103FrmDia.addContent(new sap.m.Input({id:'l103DiaInpExpDate',visible:false,value:'{/t_l_irobat/0/vfdat}'}));
   		
   		var l103DiabtnSav	= new sap.m.Button({id:'l103DiabtnSav',icon:"",text:'OK',press:oCon.ui5Dispatch});
   		var l103DiabtnCanc 	= new sap.m.Button({id:'l103DiabtnCanc',icon:"",text:'Cancel',press:oCon.ui5Dispatch});
   		
//   	if(sap.ui.Device.system.tablet && window.innerWidth < 400){
			l103DiaTitle.addStyleClass("sapUiSmallMarginBegin");
			l103DiabtnCanc.addStyleClass("sapUiSmallMarginEnd");
//	};
   		
   		var l103DiaSav = new sap.m.Dialog({
			id				: 'l103DiaSav',
			customHeader	: new sap.m.Bar({contentLeft:	[l103DiaTitle],
				 				             contentMiddle:	[],
				 				             contentRight:	[],}),
			contentWidth	: '550px',
		    buttons			: [l103DiabtnSav,l103DiabtnCanc,],
		    content			: [l103FrmDia],
		});
   		
   		//-------------------------------------------------------------------------------
		//Check QTY Dialog
		//-------------------------------------------------------------------------------
   		var l103DiaChkTitle  = new sap.m.Label({id:'l103DiaChkTitle',design:sap.m.LabelDesign.Bold,text:"Error"});
   		
   		var l103DiaChkQTY  		= new sap.m.Text({id:'l103DiaChkQTY',visible:false,text:"Please enter Qty greater than 0\n"});
   		var l103DiaChkQTYUnit	= new sap.m.Text({id:'l103DiaChkQTYUnit',visible:false,text:"Please enter UOM\n"});
   		
   		var l103DiaChkFlexBox = new sap.m.VBox({
			items : [l103DiaChkQTY,l103DiaChkQTYUnit]
		});
   		
   		var l103DiaChkbtnOK	= new sap.m.Button({id:'l103DiaChkbtnOK',icon:"",text:'OK',press:oCon.ui5Dispatch})
   		
//   	if(sap.ui.Device.system.tablet && window.innerWidth < 400){
			l103DiaChkTitle.addStyleClass("sapUiMediumMarginBegin");
   		
			l103DiaChkQTY.addStyleClass("sapUiMediumMarginBegin");
	   		l103DiaChkQTYUnit.addStyleClass("sapUiMediumMarginBegin");

	   		l103DiaChkbtnOK.addStyleClass("sapUiSmallMarginEnd");
//	};
   
   		var l103DiaChk = new sap.m.Dialog({
			id				: 'l103DiaChk',
			customHeader	: new sap.m.Bar({contentLeft:	[l103DiaChkTitle],
				 				             contentMiddle:	[],
				 				             contentRight:	[],}),
			contentWidth	: '550px',
		    buttons			: [l103DiaChkbtnOK,],
		    content			: [l103DiaChkFlexBox],
		});
   		
   		//-------------------------------------------------------------------------------
		//After Post GR Dialog
		//-------------------------------------------------------------------------------
   		var l103DiaErrSuc	= oCon.popDialogErrSuc_S('l103','SAPEVT_L102','evt_l102');
		
		new sap.m.Input({id:'l103InpState',visible:false,value:'{/t_l_grwmat/0/state}'}); //Hidden
		
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var l103btnBck    = new sap.m.Button({id:'l103btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var l103lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Goods Receipt"});
		var l103btnSav    = new sap.m.Button({id:'l103btnSav',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch});
		
		var l103pullMain  = oCon.getPullMain('l103','SAPEVT_L103','evt_l103');
		
//		var l103lblFoot   = new sap.m.Label({id:'l103lblFoot',design:sap.m.LabelDesign.Bold,text:"{/head/ftitle}"});
		
		var l103page = new sap.m.Page({
			id				: 'l103page',
			customHeader	: new sap.m.Bar({contentLeft:	[l103btnBck],
											 contentMiddle: [l103lblTitle],
											 contentRight:	[l103btnSav]}),
//			footer			: new sap.m.Bar({contentLeft:	[],
//										     contentMiddle:	[],
//											 contentRight:	[]}),
			content			: [l103pullMain,l103FrmMain]
		});
		
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [l103page];

	}

});