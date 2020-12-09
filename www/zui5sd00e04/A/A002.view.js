sap.ui.jsview("zui5sd00e04.A.A002", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.A.A002
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.A.A002";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.A.A002
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//TAB 1: User Info
		//-------------------------------------------------------------------------------
		var a002frm01 = oCon.getForm(3);
		a002frm01.addContent(new sap.m.Label({text:"User",design:sap.m.LabelDesign.Bold}));
		a002frm01.addContent(new sap.m.Input({id:"a002InpVname",editable:true}));
		a002frm01.addContent(new sap.m.Label({text:"Alt User",design:sap.m.LabelDesign.Bold}));
		var ItmUsr = new sap.ui.core.ListItem({key:'{key}',text:'{text}',additionalText:'{addi}'});
		a002frm01.addContent(new sap.m.Select({
			id					:"a002SelVname",
			change				: oCon.ui5Dispatch,
			items				: {path:"/t_vname",template:ItmUsr},
		}));
		
		a002frm01.addContent(new sap.m.Label({text:"UUID",design:sap.m.LabelDesign.Bold}));
		a002frm01.addContent(new sap.m.Input({id:"a002InpUUID",editable:false}));
		a002frm01.addContent(new sap.m.Label({text:"Session",design:sap.m.LabelDesign.Bold}));
		a002frm01.addContent(new sap.m.Input({id:"a002InpSess",editable:false}));
		a002frm01.addContent(new sap.m.Label({text:"RFC",design:sap.m.LabelDesign.Bold}));
		a002frm01.addContent(new sap.m.Input({id:"a002InpRfc",editable:false}));
		a002frm01.addContent(new sap.m.Label({text:"Plant",design:sap.m.LabelDesign.Bold}));
		a002frm01.addContent(new sap.m.Input({id:"a002InpWerks",editable:false}));
		a002frm01.addContent(new sap.m.Label({text:""}));
		a002frm01.addContent(new sap.m.Button({id:'a002btnUCon',text:"Connect",press:oCon.ui5Dispatch}));
		//a002frm01.addContent(new sap.m.Button({id:'a002btnUDis',text:"Disconnect",press:oCon.ui5Dispatch}));
//		a002frm01.addContent(new sap.m.Label({text:"Default Printer",design:sap.m.LabelDesign.Bold}));
//		a002frm01.addContent(new sap.m.Select({
//			id		:"a002InpUPrint",
//			showSecondaryValues : true,
//			selectedKey	: 'P1',
//			items	: [new sap.ui.core.ListItem({key:'P1',text:'Bluetooth Printer',additionalText:'QLn220'}),
//			     	   new sap.ui.core.ListItem({key:'P2',text:'Network Printer',additionalText:'GK420t'}),]
//		}));
		//a002frm01.addContent(new sap.m.Label({text:"Role",design:sap.m.LabelDesign.Bold}));
		//a002frm01.addContent(new sap.m.Input({id:"a002InpRole",editable:false}));
		a002frm01.addContent(new sap.m.Label({text:"Host",design:sap.m.LabelDesign.Bold}));
		a002frm01.addContent(new sap.m.Input({id:"a002InpHost",editable:false}));
		new sap.m.Input({id:"a002InpRole",visible:false});
		//-------------------------------------------------------------------------------
		//TAB 2: Weight
		//-------------------------------------------------------------------------------
		var a002frm02 = oCon.getForm(3);
		a002frm02.addContent(new sap.m.Label({text:"Connection",design:sap.m.LabelDesign.Bold}));
		a002frm02.addContent(new sap.m.Input({id:"a002InpWCon",value:"",editable:false})); 
		a002frm02.addContent(new sap.m.Label({text:"IP/Port.",design:sap.m.LabelDesign.Bold}));
		a002frm02.addContent(new sap.m.Input({id:"a002InpWip",value:'{/dev_wei/ipadr}',editable:false}));
		a002frm02.addContent(new sap.m.Input({id:"a002InpWPort",value:'{/dev_wei/dport}',editable:false}));
		a002frm02.addContent(new sap.m.Label({text:"Rate/Tole",design:sap.m.LabelDesign.Bold}));
		a002frm02.addContent(new sap.m.Input({id:"a002InpWRate",value:'{/dev_wei/wrate}',editable:false}));
		a002frm02.addContent(new sap.m.Input({id:"a002InpWTole",value:'{/dev_wei/wtole}',editable:false}));
		a002frm02.addContent(new sap.m.Label({text:"Data Rcv",design:sap.m.LabelDesign.Bold}));
		a002frm02.addContent(new sap.m.TextArea({id:'a002inpWDataI',rows:5,value:"",editable:false}));
		a002frm02.addContent(new sap.m.Label({text:"Data Send",design:sap.m.LabelDesign.Bold}));
		a002frm02.addContent(new sap.m.TextArea({id:'a002inpWDataO',rows:2,value:"",editable:false}));
		a002frm02.addContent(new sap.m.Label({text:""}));
		a002frm02.addContent(new sap.m.Button({id:'a002btnWCon',text:"Connect",press:oCon.ui5Dispatch,visible:false}));
		a002frm02.addContent(new sap.m.Button({id:'a002btnWSnd',text:"Send",press:oCon.ui5Dispatch,visible:false}));
		a002frm02.addContent(new sap.m.Button({id:'a002btnWDis',text:"Disconnect",press:oCon.ui5Dispatch,visible:false}));
		a002frm02.addContent(new sap.m.Label({text:"Status",design:sap.m.LabelDesign.Bold}));
		a002frm02.addContent(new sap.m.Input({id:"a002InpWStat",value:"",editable:false}));
		//-------------------------------------------------------------------------------
		//TAB 3: Printer - Bluetooth
		//-------------------------------------------------------------------------------
		var a002frm03 = oCon.getForm(3);
		a002frm03.addContent(new sap.m.Label({text:"MAC",design:sap.m.LabelDesign.Bold}));
		a002frm03.addContent(new sap.m.Input({id:"a002InpBMac",value:'{/dev_bth/dmac}',editable:false}));
		a002frm03.addContent(new sap.m.Label({text:"Margin/QR Size",design:sap.m.LabelDesign.Bold}));
		a002frm03.addContent(new sap.m.Input({id:"a002InpBMargin",value:'{/dev_bth/margin}',editable:false}));
		a002frm03.addContent(new sap.m.Input({id:"a002InpBQrSize",value:'{/dev_bth/qrsize}',editable:false}));
		a002frm03.addContent(new sap.m.Label({text:"Data",design:sap.m.LabelDesign.Bold}));
		a002frm03.addContent(new sap.m.TextArea({id:'a002inpBData',rows:10,value:"",editable:false}));
		a002frm03.addContent(new sap.m.Label({text:""}));
		a002frm03.addContent(new sap.m.Button({id:'a002btnBCon',text:"Connect",press:oCon.ui5Dispatch,visible:false}));
		a002frm03.addContent(new sap.m.Button({id:'a002btnBSnd',text:"Send",press:oCon.ui5Dispatch,visible:false}));
		a002frm03.addContent(new sap.m.Button({id:'a002btnBClr',text:"Clear",press:oCon.ui5Dispatch,visible:false}));
		a002frm03.addContent(new sap.m.Label({text:"Status",design:sap.m.LabelDesign.Bold}));
		a002frm03.addContent(new sap.m.Input({id:"a002InpBSta",value:"",editable:false}));
		
		//-------------------------------------------------------------------------------
		//TAB 4: Printer - Network
		//-------------------------------------------------------------------------------
		var a002frm04 = oCon.getForm(3);
		a002frm04.addContent(new sap.m.Label({text:"Connection",design:sap.m.LabelDesign.Bold}));
		a002frm04.addContent(new sap.m.Input({id:"a002InpPConn",value:"",editable:false}));
		a002frm04.addContent(new sap.m.Label({text:"IP Address/Port",design:sap.m.LabelDesign.Bold}));
		a002frm04.addContent(new sap.m.Input({id:"a002InpPip",value:'{/dev_prn/ipadr}',editable:false}));
		a002frm04.addContent(new sap.m.Input({id:"a002InpPPort",value:'{/dev_prn/dport}',editable:false}));
		a002frm04.addContent(new sap.m.Label({text:"Margin/QR Size",design:sap.m.LabelDesign.Bold}));
		a002frm04.addContent(new sap.m.Input({id:"a002InpPMargin",value:'{/dev_prn/margin}',editable:false}));
		a002frm04.addContent(new sap.m.Input({id:"a002InpPQrSize",value:'{/dev_prn/qrsize}',editable:false}));
		a002frm04.addContent(new sap.m.Label({text:"Data",design:sap.m.LabelDesign.Bold}));
		a002frm04.addContent(new sap.m.TextArea({id:'a002inpPData',rows:10,value:"",editable:false}));
		a002frm04.addContent(new sap.m.Label({text:""}));
		a002frm04.addContent(new sap.m.Button({id:'a002btnPCon',text:"Connect",press:oCon.ui5Dispatch,visible:false}));
		a002frm04.addContent(new sap.m.Button({id:'a002btnPSnd',text:"Send",press:oCon.ui5Dispatch,visible:false}));
		a002frm04.addContent(new sap.m.Button({id:'a002btnPDis',text:"Disconnect",press:oCon.ui5Dispatch,visible:false}));
		a002frm04.addContent(new sap.m.Button({id:'a002btnPRst',text:"Reset",press:oCon.ui5Dispatch,visible:false}));
		a002frm04.addContent(new sap.m.Label({text:"Status",design:sap.m.LabelDesign.Bold}));
		a002frm04.addContent(new sap.m.Input({id:"a002InpPSta",value:"",editable:false}));
		//-------------------------------------------------------------------------------
		//ICON TAB
		//-------------------------------------------------------------------------------
		var a002TabMain = new sap.m.IconTabBar({
			id		: 'a002TabMain',
			items 	: [new sap.m.IconTabFilter({icon:'sap-icon://business-card',text:'User Info',content:[a002frm01],}),
					   new sap.m.IconTabFilter({icon:'sap-icon://unwired',text:'Weight',content:[a002frm02],}),
					   new sap.m.IconTabFilter({icon:'sap-icon://print',text:'Network',content:[a002frm04],}),
					   new sap.m.IconTabFilter({icon:'sap-icon://print',text:'Bluetooth',content:[a002frm03],}),],
		    content	: [],
		});
		//-------------------------------------------------------------------------------
		//Dialog H/W
		//-------------------------------------------------------------------------------
		var ItmBth = new sap.ui.core.ListItem({key:'{key}',text:'{text}',additionalText:'{addi}'});
		var ItmPrn = new sap.ui.core.ListItem({key:'{key}',text:'{text}',additionalText:'{addi}'});
		var ItmWei = new sap.ui.core.ListItem({key:'{key}',text:'{text}',additionalText:'{addi}'});
		
		var a002frmHw = oCon.getForm(3);
		a002frmHw.addContent(new sap.m.Label({text:'Bluetooth Print',design:sap.m.LabelDesign.Bold}));
		a002frmHw.addContent(new sap.m.Select({
			id					:"a002selBth",
			showSecondaryValues : true,
			selectedKey			: '{/logon/devbth_id}',
			items				: {path:"/t_devbth",template:ItmBth},
		}));
		a002frmHw.addContent(new sap.m.Label({text:'Network Print',design:sap.m.LabelDesign.Bold}));
		a002frmHw.addContent(new sap.m.Select({
			id					:"a002selPrn",
			showSecondaryValues : true,
			selectedKey			: '{/logon/devprn_id}',
			items				: {path:"/t_devprn",template:ItmBth},
		}));
		a002frmHw.addContent(new sap.m.Label({text:'Weight',design:sap.m.LabelDesign.Bold}));
		a002frmHw.addContent(new sap.m.Select({
			id					:"a002selWei",
			showSecondaryValues : true,
			selectedKey			: '{/logon/devwei_id}',
			items				: {path:"/t_devwei",template:ItmWei},
		}));
		a002frmHw.addContent(new sap.m.Label({text:"Print to",design:sap.m.LabelDesign.Bold}));
		a002frmHw.addContent(new sap.m.Select({
			id		:"a002InpUPrint",
			showSecondaryValues : true,
			selectedKey	: 'P1',
			items	: [new sap.ui.core.ListItem({key:'P1',text:'Bluetooth Print',additionalText:'QLn220'}),
			     	   new sap.ui.core.ListItem({key:'P2',text:'Network Print',additionalText:'GK420t'}),]
		}));
		var a002DiaHW = new sap.m.Dialog({
			id				: 'a002DiaHW',
			customHeader	: new sap.m.Bar({contentLeft:	[],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){a002DiaHW.close();}}),]}),
			contentWidth	: '650px',
		    beginButton		: new sap.m.Button({id:'a002btnAcv',icon:"sap-icon://save",text:'Save & Accept',press:oCon.ui5Dispatch}),
		    endButton		: new sap.m.Button({id:'a002btnAcp',icon:"sap-icon://accept",text:'Accept',press:oCon.ui5Dispatch}),
		    content			: [a002frmHw],
		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var a002lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Settings"});
		var a002btnBck    = new sap.m.Button({id:'a002btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var a002btnSav    = new sap.m.Button({id:'a002btnSav',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch});
		var a002btnLoa    = new sap.m.Button({id:'a002btnLoa',icon:"sap-icon://complete",text:'Load',press:oCon.ui5Dispatch});
		var a002btnDef    = new sap.m.Button({id:'a002btnDef',icon:"sap-icon://action",text:'Select H/W',press:oCon.ui5Dispatch});
		
		var a002page = new sap.m.Page({
			id				: 'a002page',
			customHeader	: new sap.m.Bar({contentLeft:	[a002btnBck],
											 contentMiddle:	[a002lblTitle],
											 contentRight:	[a002btnDef],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [a002TabMain]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [a002page];
	}

});