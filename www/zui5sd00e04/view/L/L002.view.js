sap.ui.jsview("zui5sd00e04.view.L.L002", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.L.L002
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.L.L002";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.L.L002
	*/ 
	createContent : function(oController) {

   		var l002inpFlag = new sap.m.Input({id:'l002inpFlag',visible:true}); 												// ++ 2018.02.01 :: GR FG V1.6 [l003TblOvw Header Test]
   		
		//	-------------------------------------------------------------------------------
		//	Form Detail and GR Input
		//	-------------------------------------------------------------------------------
   		
	   		var l002FrmMain = oCon.getForm_S(3);
	   		
	   		l002FrmMain.addContent(new sap.m.Label({text:''}));
	   		l002FrmMain.addContent(new sap.m.Input({id:'l002InpAufnr',editable:false,value:'{/t_l_grwmat/0/aufnr}'}));
	   		
	   		l002FrmMain.addContent(new sap.m.Label({text:''}));
	   		l002FrmMain.addContent(new sap.m.Input({id:'l002InpMatnr',editable:false,value:'{/t_l_grwmat/0/matnr_fg}'}));
	   		l002FrmMain.addContent(new sap.m.Input({id:'l002InpMaktx',editable:false,value:'{/t_l_grwmat/0/maktx_fg}'}));
			
	   		l002FrmMain.addContent(new sap.m.Label({text:''}));
	   		l002FrmMain.addContent(new sap.m.Input({id:'l002InpWerks',editable:false,value:'{/head/werks}'}));
	   		l002FrmMain.addContent(new sap.m.Input({id:'l002InpWerksText',editable:false,value:'{/head/werksx}'}));
	   		
	   		l002FrmMain.addContent(new sap.m.Label({text:''}));
			var SlocList = new sap.ui.core.ListItem({key:'{lgort}',text:'{lgort} {bezei}'});
			l002FrmMain.addContent(new sap.m.Select({
				id					:"l002SelSlocNumber",
				change				: oCon.ui5Dispatch,
				items				: {path:"/t_l_grwslc",template:SlocList}, 
			}));
	   		//l002FrmMain.addContent(new sap.m.Input({id:'l002InpSlocNumber',visible:true,editable:false,value:'{/t_l_grwmat/0/lgort}'}));
	   		//l002FrmMain.addContent(new sap.m.Input({id:'l002InpSlocName',visible:true,editable:false,value:'{/t_l_grwmat/0/bezei}'}));
	   		
	   		l002FrmMain.addContent(new sap.m.Label({text:'Mfg.'}));
	   		l002FrmMain.addContent(oCon.getDatePicker('l002InpMfgDate','{/t_l_grwmat/0/hsdat}'));
	   		
	   		l002FrmMain.addContent(new sap.m.Label({text:'Qty'}));
	   		l002FrmMain.addContent(new sap.m.Input({id:'l002InpQTY',type:"Number"}));
	   		l002FrmMain.addContent(new sap.m.Input({id:'l002InpQTYUnit',value:'{/t_l_grwmat/0/meins_st}'}));
	   		
	   		l002FrmMain.addContent(new sap.m.Label({text:'SET'}));
	   		l002FrmMain.addContent(new sap.m.Input({id:'l002InpSet',maxLength:2}));
	   		
	   		l002FrmMain.addContent(new sap.m.Label({text:'Line'}));
	   		l002FrmMain.addContent(new sap.m.Input({id:'l002InpLine',maxLength:1}));
	   		
	   		l002FrmMain.addContent(new sap.m.Label({text:'HR',type:"Number"}));
	   		l002FrmMain.addContent(new sap.m.Input({id:'l002InpHR',maxLength:2,}));
	   		
	   		l002FrmMain.addContent(new sap.m.Label({text:'Soak'}));
	   		l002FrmMain.addContent(new sap.m.Input({id:'l002InpSoak',maxLength:2}));
	   		
	   		l002FrmMain.addContent(new sap.m.Label({text:'WIP'}));
	   		l002FrmMain.addContent(new sap.m.Input({id:'l002InpWIPReason',maxLength:2}));	   		
	   		
	   		l002FrmMain.addContent(new sap.m.Label({text:'Text'}));															// ++ 2018.01.30 :: GR FG V1.7 	
	   		l002FrmMain.addContent(new sap.m.Input({id:'l002InpText',maxLength:50}));
   		
//   		//Item Select for SET# [Prepare for Future Change]
//   		var oItemSet = new sap.ui.core.ListItem({
//			key: "{matnr_fg}",
//			text: "{maktx_fg}",
//			additionalText: "{matnr_fg}"
//		});
//   		
//   		l002FrmMain.addContent(new sap.m.Label({text:'SET Select TEST# *'}));
//   		l002FrmMain.addContent(new sap.m.Select({
//   			id:'l002SelSet',
//   			showSecondaryValues: true,
//   			forceSelection: false,
//			items: {
//				path: "/t_l_grwmat",
//				template: oItemSet
//			},	
//   		}));
   		
   		//	-------------------------------------------------------------------------------
		//	Dialog + Form in Dialog
		//	-------------------------------------------------------------------------------
	   		var l002FrmDia = oCon.getForm_S(3);
	   		
	   		var l002DiaTitle  = new sap.m.Label({id:'l002DiaTitle',design:sap.m.LabelDesign.Bold,text:""});
	   		
	   		l002FrmDia.addContent(new sap.m.Label({text:''}));
	   		l002FrmDia.addContent(new sap.m.Input({id:'l002DiaInpQTY',editable:false,value:'{/t_l_grwbat/0/menge_rst}'}));
	   		l002FrmDia.addContent(new sap.m.Input({id:'l002DiaInpQTYUnit',editable:false,value:'{/t_l_grwbat/0/meins_st}'}));
	   		
	   		//l002FrmDia.addContent(new sap.m.Label({text:''}));															// -- 2018.10.08 :: GR FG V2.2.2 :: delete 'l002DiaInpMfgExpDate'	
	   		//l002FrmDia.addContent(new sap.m.Input({id:'l002DiaInpMfgExpDate',editable:false,value:'{/t_l_grwbat/0/hsdat} - {/t_l_grwbat/0/vfdat}'}));
   		
   		//	InVisible Mfg.Date & Exp.Date Input
	   		l002FrmDia.addContent(new sap.m.Label({text:'',visible:true}));
	   		l002FrmDia.addContent(oCon.getDatePicker('l002DiaInpMfgDate','{/t_l_grwbat/0/hsdat}'));							// ++ 2018.10.08 :: GR FG V2.2.2 :: change 'l002DiaInpMfgDate' to DatePicker
	   		//l002FrmDia.addContent(new sap.m.Input({id:'l002DiaInpMfgDate',visible:true,value:'{/t_l_grwbat/0/hsdat}'}));	
	   		l002FrmDia.addContent(oCon.getDatePicker('l002DiaInpExpDate','{/t_l_grwbat/0/vfdat}'));							// ++ 2018.10.08 :: GR FG V2.2.2 :: change 'l002DiaInpExpDate' to DatePicker	
	   		//l002FrmDia.addContent(new sap.m.Input({id:'l002DiaInpExpDate',visible:true,value:'{/t_l_grwbat/0/vfdat}'}));
	   		
	   		l002FrmDia.addContent(new sap.m.Label({text:''}));
	   		l002FrmDia.addContent(new sap.m.Input({id:'l002DiaInpBatchNumber',editable:false,value:'{/t_l_grwbat/0/charg}'}));	   		
	   		
	   		l002FrmDia.addContent(new sap.m.Label({text:''}));																// ++ 2018.01.30 :: GR FG V1.7 
	   		l002FrmDia.addContent(new sap.m.Input({id:'l002DiaInpText',editable:false}));
	   		
	   		var l002DiabtnSav	= new sap.m.Button({id:'l002DiabtnSav',icon:"",text:'OK',press:oCon.ui5Dispatch});
	    	var l002DiabtnCanc	= new sap.m.Button({id:'l002DiabtnCanc',icon:"",text:'Cancel',press:oCon.ui5Dispatch});
	    	var l002DiabtnEdit	= new sap.m.Button({id:'l002DiabtnEdit',icon:"",text:'Edit',press:oCon.ui5Dispatch});

	    	// if(sap.ui.Device.system.tablet && window.innerWidth < 400){
	   			l002DiaTitle.addStyleClass("sapUiSmallMarginBegin");
	   			l002DiabtnCanc.addStyleClass("sapUiSmallMarginEnd");
	   		// };
   		
	   		var l002DiaSav = new sap.m.Dialog({
				id				: 'l002DiaSav',
				customHeader	: new sap.m.Bar({contentLeft:	[l002DiaTitle],
					 				             contentMiddle:	[],
					 				             contentRight:	[],}),
				contentWidth	: '550px',
			    buttons			: [l002DiabtnEdit,l002DiabtnSav,l002DiabtnCanc,],
			    content			: [l002FrmDia],
			});
   		
   		//	-------------------------------------------------------------------------------
		//	Check QTY, Set, Line, HR, Soak Dialog
		//	-------------------------------------------------------------------------------   		
	   		var l002DiaChkTitle  = new sap.m.Label({id:'l002DiaChkTitle',design:sap.m.LabelDesign.Bold,text:"Error"});
	   		
	   		var l002DiaChkQTY  		= new sap.m.Text({id:'l002DiaChkQTY',visible:false,text:"Please enter Qty greater than 0\n"});
	   		var l002DiaChkQTYUnit	= new sap.m.Text({id:'l002DiaChkQTYUnit',visible:false,text:"Please enter UOM\n"});
	   		var l002DiaChkSet 		= new sap.m.Text({id:'l002DiaChkSet',visible:false,text:"Please enter SET# in range 01 - 99\n"});
	   		var l002DiaChkLine  	= new sap.m.Text({id:'l002DiaChkLine',visible:false,text:"Please enter Line in range 1 - 9\n"});
	   		var l002DiaChkHR  		= new sap.m.Text({id:'l002DiaChkHR',visible:false,text:"Please enter HR in range  01 - 24\n"});
	   		var l002DiaChkSoak  	= new sap.m.Text({id:'l002DiaChkSoak',visible:false,text:"Please enter Soak# in range  01 - 99\n"});
	   		var l002DiaChkWIPReason = new sap.m.Text({id:'l002DiaChkWIPReason',visible:false,text:"Please enter WIP reason with 2 number / letter"});
	   		
	   		var l002DiaChkFlexBox = new sap.m.VBox({
				items : [l002DiaChkQTY,l002DiaChkQTYUnit,l002DiaChkSet,l002DiaChkLine,l002DiaChkHR,l002DiaChkSoak,l002DiaChkWIPReason]
			});
	   		
	   		var l002DiaChkbtnOK = new sap.m.Button({id:'l002DiaChkbtnOK',icon:"",text:'OK',press:oCon.ui5Dispatch})
   		
	   		// if(sap.ui.Device.system.tablet && window.innerWidth < 400){
	   			l002DiaChkTitle.addStyleClass("sapUiMediumMarginBegin");
	   		
	   			l002DiaChkQTY.addStyleClass("sapUiMediumMarginBegin");
	   	   		l002DiaChkQTYUnit.addStyleClass("sapUiMediumMarginBegin");
	   	   		l002DiaChkSet.addStyleClass("sapUiMediumMarginBegin");
	   	   		l002DiaChkLine.addStyleClass("sapUiMediumMarginBegin");
	   	   		l002DiaChkHR.addStyleClass("sapUiMediumMarginBegin");
	   	   		l002DiaChkSoak.addStyleClass("sapUiMediumMarginBegin");
	   	   		l002DiaChkWIPReason.addStyleClass("sapUiMediumMarginBegin");
	   	   		
	   	   		l002DiaChkbtnOK.addStyleClass("sapUiSmallMarginEnd");
	   	   	// };
	   		
	   		var l002DiaChk = new sap.m.Dialog({
				id				: 'l002DiaChk',
				customHeader	: new sap.m.Bar({contentLeft:	[l002DiaChkTitle],
					 				             contentMiddle:	[],
					 				             contentRight:	[],}),
				contentWidth	: '550px',
			    buttons			: [l002DiaChkbtnOK,],
			    content			: [l002DiaChkFlexBox],
			});
   		
   		//	-------------------------------------------------------------------------------
		//	After Post GR Dialog
		//	-------------------------------------------------------------------------------
	   		
	   		var l002DiaErrSuc	= oCon.popDialogErrSuc_S('l002','SAPEVT_L001','evt_l001');
	   		
	   		var l002InpState = new sap.m.Input({id:'l002InpState',visible:true,value:'{/t_l_grwmat/0/state}'}); 		//Hidden
	   		new sap.m.Input({id:'l002InpBatType',visible:true,value:'{/t_l_grwmat/0/sets}'}); 		//Hidden
	   		new sap.m.Input({id:'l002InpBaseUnit',visible:true,value:'{/t_l_grwmat/0/meins_kg}'}); 	//Hidden
		
		//	-------------------------------------------------------------------------------
		//	Page
		//	-------------------------------------------------------------------------------
	   		
	   		var l002btnBck    = new sap.m.Button({id:'l002btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
	   		var l002lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Goods Receipt"});
	   		var l002btnSav    = new sap.m.Button({id:'l002btnSav',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch});
	   		var l002btnAcp    = new sap.m.Button({id:'l002btnAcp',icon:"sap-icon://accept",press:oCon.ui5Dispatch});		// ++ 2018.01.30 :: GR FG V1.6
	   		var l002btnDis    = new sap.m.Button({id:'l002btnDis',icon:"sap-icon://display",press:oCon.ui5Dispatch});		// ++ 2018.01.30 :: GR FG V1.6
			var l002btnHom    = new sap.m.Button({id:'l002btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});			// ++ 2018.01.30 :: GR FG V1.6
	   		
	   		var l002pullMain  = oCon.getPullMain('l002','SAPEVT_L002','evt_l002');
			
	   		// var l002lblFoot   = new sap.m.Label({id:'l002lblFoot',design:sap.m.LabelDesign.Bold,text:"{/head/ftitle}"});
			
			var l002page = new sap.m.Page({
				id				: 'l002page',
				customHeader	: new sap.m.Bar({contentLeft:	[l002btnBck,l002btnHom],
												 contentMiddle: [l002lblTitle],
												 //contentRight:	[l002btnSav]}),											// -- 2018.02.01 :: GR FG V1.6
												 contentRight:	[l002btnDis,l002btnAcp]}),									// ++ 2018.01.30 :: GR FG V1.6
				content			: [l002pullMain,l002FrmMain]
			});
			
		//	-------------------------------------------------------------------------------
		//	Page
		//	-------------------------------------------------------------------------------
			
			this.setDisplayBlock(true);
			return [l002page];
	}
});