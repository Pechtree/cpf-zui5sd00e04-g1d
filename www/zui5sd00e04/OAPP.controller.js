sap.ui.controller("zui5sd00e04.OAPP", {
	
	//--------------------------------------------------------------------------------
	//logon_PAI
	//--------------------------------------------------------------------------------
	deviceManager: function(fcode){
		
		if(fcode=='CON'){ //Normal Open
			oPrint2.dispatch('CLS');
			oPrint2.dispatch('CON');
		};
		
		if(fcode=='WON'){ //Weight Open
			oPrint2.dispatch('CLS');
			oPrint2.dispatch('CON');
		};
		
		if(fcode=='CLS'){ //Normal close
			oPrint2.dispatch('CLS');
		};
		
		if(fcode=='WLS'){ //Weight Close
			oPrint2.dispatch('CLS');
		};
		
	},
	//--------------------------------------------------------------------------------
	//logon_PAI
	//--------------------------------------------------------------------------------
	logon_PAI: function(fcode,oModela){
		
		//User Info
		oCTX.oData.session 	= oModela.oData.logon.session;
		oCTX.oData.rfcdest 	= oModela.oData.logon.rfcdest;
		oCTX.oData.debug 	= oModela.oData.logon.debug;

		//oCon.setRole(oModela.oData.head.rolepmx);
		oCon.getControl('a002InpSess').setValue(oModela.oData.logon.session);
		oCon.getControl('a002InpRfc').setValue(oModela.oData.logon.rfcdest);
		oCon.getControl('a002InpWerks').setValue(oModela.oData.head.werks);
		oCon.getControl('b103lblTitle').setText(oModela.oData.logon.uname);
		oCon.getControl('b003lblTitle').setText(oModela.oData.logon.uname);
		 
		//oCon.getControl('a003lblFoot').setModel(oModela);
		// oCon.getControl('a001lblFoot').setModel(oModela);
		oCon.getControl('a002InpUPrint').setSelectedKey(oModela.oData.logon.devprn_df);	
		oCon.getControl('a002InpWip').setModel(oModela);
		oCon.getControl('a002InpWPort').setModel(oModela);
		oCon.getControl('a002InpWRate').setModel(oModela);
		oCon.getControl('a002InpWTole').setModel(oModela);
		oCon.getControl('a002InpBMac').setModel(oModela);
		oCon.getControl('a002InpBMargin').setModel(oModela);
		oCon.getControl('a002InpBQrSize').setModel(oModela);
		oCon.getControl('a002InpPip').setModel(oModela);
		oCon.getControl('a002InpPPort').setModel(oModela);
		oCon.getControl('a002InpPMargin').setModel(oModela);
		oCon.getControl('a002InpPQrSize').setModel(oModela);
		oCon.getControl('a002InpBFont').setModel(oModela);		//++ 09.02.2018
		oCon.getControl('a002InpPFont').setModel(oModela);		//++ 09.02.2018
		
		oCon.getControl('a002selBth').setModel(oModela);
		oCon.getControl('a002selPrn').setModel(oModela);
		oCon.getControl('a002selWei').setModel(oModela);
		// oCon.getControl('b103lblHead').setText(oCon.getControl('a003lblFoot').getText());
		
		//Hardware
		if(oCTX.oData.hybrid=='X'){
			oPrint1.dispatch('CON');
			
			oWeight.dispatch('CLS');
			oWeight.dispatch('CON');
			
		    clearInterval(oCTX.oData.timer);
			oCTX.oData.timer  = null;
			jQuery.sap.delayedCall(400, this, function(){
				var vRate = parseInt(oCon.getControl("a002InpWRate").getValue());
				oCTX.oData.timer = setInterval(function(){
					oCTX.oData.wei_data  = 'q%';
					oWeight.dispatch('SND');
				}, vRate);
			});
		};
		
		//Menu: Tile
		oApp.setMenu('a003tilB000',oModela.oData.menu.m0101);
		oApp.setMenu('a003tilC100',oModela.oData.menu.m0201);
		oApp.setMenu('a003tilC200',oModela.oData.menu.m0202);
		oApp.setMenu('a003tilC103',oModela.oData.menu.m0301);
		oApp.setMenu('a003tilC300',oModela.oData.menu.m0401);
		oApp.setMenu('a003tilD400',oModela.oData.menu.m0501);
		oApp.setMenu('a003tilD200',oModela.oData.menu.m0601);
		oApp.setMenu('a003tilD104',oModela.oData.menu.m0501);
		oApp.setMenu('a003tilD300',oModela.oData.menu.m0801);
		oApp.setMenu('a003tilE300',oModela.oData.menu.m0901);
		oApp.setMenu('a003tilE200',oModela.oData.menu.m1001);
		oApp.setMenu('a003tilE100',oModela.oData.menu.m1101);
		oApp.setMenu('a003tilF000',oModela.oData.menu.m1201);
		oApp.setMenu('f001til01',oModela.oData.menu.m1202);
		oApp.setMenu('f001til03',oModela.oData.menu.m1203);
		oApp.setMenu('f001til05',oModela.oData.menu.m1204);
		oApp.setMenu('a003tilG000',oModela.oData.menu.m1301);
		oApp.setMenu('a003tilK000',oModela.oData.menu.m1401);
		oApp.setMenu('k001til01',oModela.oData.menu.m1402);
		oApp.setMenu('k001til02',oModela.oData.menu.m1403);
		oApp.setMenu('k001til03',oModela.oData.menu.m1404);
		oApp.setMenu('k001til04',oModela.oData.menu.m1405);
		oApp.setMenu('k001til05',oModela.oData.menu.m1406);
		oApp.setMenu('a003tilI200',oModela.oData.menu.m1501);
		oApp.setMenu('a003tilI000',oModela.oData.menu.m1601);
		oApp.setMenu('a003tilI100',oModela.oData.menu.m1701);
		oApp.setMenu('a003tilH000',oModela.oData.menu.m1801);
		oApp.setMenu('a003tilL000',oModela.oData.menu.m1901);
		oApp.setMenu('a003tilL100',oModela.oData.menu.m1902);
		
//		oApp.setMenu('a003tilB100',oModela.oData.menu.m2001);		// (+) GR From CPF		
//		oApp.setMenu('a003tilD500',oModela.oData.menu.m2101);		// (+) Stock Transfer Order for Non-Production
//		oApp.setMenu('a003tilD700',oModela.oData.menu.m2201);		// (+) Stock Transfer Order for Other Plant
//		oApp.setMenu('a003tilD600',oModela.oData.menu.m2301);		// (+) Stock Transfer Order Overview for Non-Production
//		oApp.setMenu('a003tilD800',oModela.oData.menu.m2401);		// (+) Stock Transfer Order Overview for Other Plant
//		//oApp.setMenu('a001tilE400',oModela.oData.menu.m2501);		// (+) Picking Order - Dummy Bin
//		oApp.setMenu('a003tilE400',oModela.oData.menu.m2601);		// (+) Picking Dummy Bin 
//		oApp.setMenu('a003tilE500',oModela.oData.menu.m2701);		// (+) Picking Multiple Bin 
//		oApp.setMenu('a003tilE600',oModela.oData.menu.m2801);		// (+) Close Picking Dummy Bin 
//		oApp.setMenu('a003tilE700',oModela.oData.menu.m2901);		// (+) Close Picking Multiple Bin 	
//		oApp.setMenu('k003til06',oModela.oData.menu.m1407);			// (+) Print SU From GR 	
//		oApp.setMenu('k003til07',oModela.oData.menu.m1408);			// (+) Print SU From WM 	
//		oApp.setMenu('a003tilH100',oModela.oData.menu.m3001);		// (+) Transfer 	
//		oApp.setMenu('a003tilM001',oModela.oData.menu.m3101);		// (+) Putaway 	
//		oApp.setMenu('a003tilM101',oModela.oData.menu.m3201);		// (+) Movebin 	
		
		//Menu: List
		oApp.setMenu('a001tilB000',oModela.oData.menu.m0101);		// GR From Vendor
		oApp.setMenu('a001tilC100',oModela.oData.menu.m0201);		// Premix Order for Process Order
		oApp.setMenu('a001tilC200',oModela.oData.menu.m0202);		// Premix Order for Safety Stock
		oApp.setMenu('a001tilC103',oModela.oData.menu.m0301);		// Premix Orders Overview for Production
		oApp.setMenu('a001tilC300',oModela.oData.menu.m0401);		// Premix Orders Overiew for Premix
		oApp.setMenu('a001tilD400',oModela.oData.menu.m0501);		// Stock Transfer Order for Premix
		oApp.setMenu('a001tilD200',oModela.oData.menu.m0601);		// Stock Transfer Order for Production
		oApp.setMenu('a001tilD104',oModela.oData.menu.m0701);		// Stock Transfer Order Overview for Premix
		oApp.setMenu('a001tilD300',oModela.oData.menu.m0801);		// Stock Transfer Order Overview for Production
		oApp.setMenu('a001tilE300',oModela.oData.menu.m0901);		// Picking Order - Multiple Bin
		oApp.setMenu('a001tilE200',oModela.oData.menu.m1001);		// Close Picking Order
		oApp.setMenu('a001tilE100',oModela.oData.menu.m1101);		// Picking
		oApp.setMenu('a001tilF000',oModela.oData.menu.m1201);		// Weighing
		oApp.setMenu('f001til01',oModela.oData.menu.m1202);
		oApp.setMenu('f001til02',oModela.oData.menu.m1202);			// Weight by Premix
		oApp.setMenu('f001til03',oModela.oData.menu.m1203);
		oApp.setMenu('f001til05',oModela.oData.menu.m1204);		
		oApp.setMenu('a001tilG000',oModela.oData.menu.m1301);		// Finishing
		oApp.setMenu('a001tilK000',oModela.oData.menu.m1401);		// Print Sticker
		oApp.setMenu('k001til01',oModela.oData.menu.m1402);
		oApp.setMenu('k001til02',oModela.oData.menu.m1403);
		oApp.setMenu('k001til03',oModela.oData.menu.m1404);
		oApp.setMenu('k001til04',oModela.oData.menu.m1405);
		oApp.setMenu('k001til05',oModela.oData.menu.m1406);		
		oApp.setMenu('a001tilI200',oModela.oData.menu.m1501);		// Confirmation Overview
		oApp.setMenu('a001tilI000',oModela.oData.menu.m1601);		// Input Confirmation
		oApp.setMenu('a001tilI100',oModela.oData.menu.m1701);		// Output Confirmation
		oApp.setMenu('a001tilH000',oModela.oData.menu.m1801);		// Stock Transfer/Return
		oApp.setMenu('a001tilL000',oModela.oData.menu.m1901);		// GR to FG Warehouse
		oApp.setMenu('a001tilL100',oModela.oData.menu.m1902);		// IR from Process Order

		oApp.setMenu('a001tilB100',oModela.oData.menu.m2001);		// (+) GR From CPF		
		oApp.setMenu('a001tilD500',oModela.oData.menu.m2101);		// (+) Stock Transfer Order for Non-Production
		oApp.setMenu('a001tilD700',oModela.oData.menu.m2201);		// (+) Stock Transfer Order for Other Plant
		oApp.setMenu('a001tilD600',oModela.oData.menu.m2301);		// (+) Stock Transfer Order Overview for Non-Production
		oApp.setMenu('a001tilD800',oModela.oData.menu.m2401);		// (+) Stock Transfer Order Overview for Other Plant
		oApp.setMenu('a001tilE800',oModela.oData.menu.m2501);		// (+) Picking Order - Dummy Bin
		oApp.setMenu('a001tilE400',oModela.oData.menu.m2601);		// (+) Picking Dummy Bin 
		oApp.setMenu('a001tilE500',oModela.oData.menu.m2701);		// (+) Picking Multiple Bin 
		oApp.setMenu('a001tilE600',oModela.oData.menu.m2801);		// (+) Close Picking Dummy Bin 
		oApp.setMenu('a001tilE700',oModela.oData.menu.m2901);		// (+) Close Picking Multiple Bin 	
		oApp.setMenu('k001til06',oModela.oData.menu.m1407);			// (+) Print SU From GR 	
		oApp.setMenu('k001til07',oModela.oData.menu.m1408);			// (+) Print SU From WM 	
		oApp.setMenu('k001til08',oModela.oData.menu.m1409);			// (+) Print LPN From GR 	// ++ 2018.06.25 	
		oApp.setMenu('a001tilH100',oModela.oData.menu.m3001);		// (+) Transfer 	
		oApp.setMenu('a001tilM001',oModela.oData.menu.m3101);		// (+) Putaway 	
		oApp.setMenu('a001tilM101',oModela.oData.menu.m3201);		// (+) Movebin 	

	},	
	
	
	//--------------------------------------------------------------------------------
	//setMenu
	//--------------------------------------------------------------------------------
	setMenu: function(id,flag){
		if(flag=='X'){
			oCon.getControl(id).setVisible(true);
		}else{
			oCon.getControl(id).setVisible(false);
		};
	},
	//--------------------------------------------------------------------------------
	//diaMeatList
	//--------------------------------------------------------------------------------
	diaMeatList: function(id){
		var RowMeat = new sap.m.ObjectListItem({
			type			: sap.m.ListType.Active,
			title			: '{matnr_in} {maktx_in}',
			number			: '{menge_rkg}',
			numberUnit		: '{meins_kgx}',
			firstStatus		: new sap.m.ObjectStatus({title:'KG/Set',text:'{menge_pkg}'}),
		});
		var LstMeat = new sap.m.List({
			id						: id+"LstMeat",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress				: oCon.ui5Dispatch,
			items					: {path:"/t_c_xoring",template:RowMeat},
		});
		var DiaMeat = new sap.m.Dialog({
			id				: id+'DiaMeat',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Label({text:'Select RAW Meat'})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){DiaMeat.close();},})],}),
			contentWidth	: '650px',
			content			: [LstMeat],
		});
		return DiaMeat;
	},
	
	//--------------------------------------------------------------------------------
	//diaMeatEdit
	//--------------------------------------------------------------------------------
	diaMeatEdit: function(id){
		
		var FrmCal = oCon.getForm(2);
		FrmCal.addContent(new sap.m.Label({text:'Order Set'}));
		FrmCal.addContent(new sap.m.Input({id:id+'inpMenge_ist',value:'',type:"Number"}));
		FrmCal.addContent(new sap.m.Label({text:'RM Qty/SET'}));
		FrmCal.addContent(new sap.m.Input({id:id+'inpMenge_pkg',editable:false}));
		FrmCal.addContent(new sap.m.Input({id:id+'inpMenge_tkg',editable:false}));
		FrmCal.addContent(new sap.m.Label({text:'RM Qty'}));
		FrmCal.addContent(new sap.m.Input({id:id+'inpMenge_ikg',type:"Number"}));
		FrmCal.addContent(new sap.m.Label({text:'Stock'}));
		FrmCal.addContent(new sap.m.Input({id:id+'inpMenge_hkg',editable:false}));   	
		
		var btnCal = new sap.m.Button({id:id+'btnCal',icon:"sap-icon://simulate",text:'Calculate',press:function(){
			var lv_menge_pkg = parseFloat(oCon.getControl(id+'inpMenge_pkg').getValue());
			var lv_menge_ikg = parseFloat(oCon.getControl(id+'inpMenge_ikg').getValue());
			var lv_menge_ist = lv_menge_ikg / lv_menge_pkg;
			//oCon.getControl(id+'inpMenge_ist').setValue(oCon.fmtDec(lv_menge_ist.toString(),3));							// +- 2018.10.16 :: TFR-PROD V1.2.0
			oCon.getControl(id+'inpMenge_ist').setValue(oCon.fmtDec(lv_menge_ist.toString(),6));							// Change 'd202inpMenge_ist' to 6 digit
			oCon.ui5DispatchFcode(id+'inpMenge_ikg');
		}});
		
		var c101DiaCal = new sap.m.Dialog({
			id				: id+'DiaCal',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Label({id:id+'lblMatnrRm'})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){c101DiaCal.close();},})],}),
			contentWidth	: '650px',
			beginButton		: btnCal,
			endButton		: new sap.m.Button({id:id+'btnCalOk',icon:"sap-icon://accept",text:'Apply',press:oCon.ui5Dispatch}),
		    content			: [FrmCal],
		});
		sap.ui.getCore().byId(id+"inpMenge_ikg").onsapenter = function(oEvt){
			var lv_menge_pkg = parseFloat(oCon.getControl(id+'inpMenge_pkg').getValue());
			var lv_menge_ikg = parseFloat(oCon.getControl(id+'inpMenge_ikg').getValue());
			var lv_menge_ist = lv_menge_ikg / lv_menge_pkg;
			oCon.getControl(id+'inpMenge_ist').setValue(oCon.fmtDec(lv_menge_ist.toString(),3));
			oCon.ui5DispatchFcode(id+'inpMenge_ikg');
		};
	},
	
	//--------------------------------------------------------------------------------
	//diaMeatEdit_PBO
	//--------------------------------------------------------------------------------
	diaMeatEdit_PBO: function(id,iTbl,menge_ist){
		
		var vSet = parseFloat(oCon.getProperty(iTbl,menge_ist));
		var vKg  = parseFloat(oCon.getProperty(iTbl,'menge_mkg'));
		var vRm  = vSet * vKg;

		oCon.getControl(id+'lblMatnrRm').setText(oCon.getProperty(iTbl,'maktx_rm'));
		oCon.getControl(id+'inpMenge_hkg').setValue(oCon.fmtDec(oCon.getProperty(iTbl,'menge_hkg'),3));
		oCon.getControl(id+'inpMenge_pkg').setValue(oCon.fmtDec(oCon.getProperty(iTbl,'menge_mkg'),3));
		oCon.getControl(id+'inpMenge_tkg').setValue(oCon.fmtDec(vRm.toString(),3));
		oCon.getControl(id+'inpMenge_ikg').setValue(parseFloat(oCon.getProperty(iTbl,'menge_hkg')));
		//oCon.getControl(id+'inpMenge_ist').setValue(oCon.fmtDec(oCon.getProperty(iTbl,menge_ist),3));						// +- 2018.10.16 :: TFR-PROD V1.2.0
		oCon.getControl(id+'inpMenge_ist').setValue(oCon.fmtDec(oCon.getProperty(iTbl,menge_ist),6));						// Change 'd202inpMenge_ist' to 6 digit
	},
	//--------------------------------------------------------------------------------
	//getDiaQrImg
	//--------------------------------------------------------------------------------
	getDiaQrImg: function(iData){
		var vData = '|MAT:'+iData.oData.matnr+
		   			'|BAT:'+iData.oData.charg+
		   			'|UOM:'+iData.oData.meins+
		   			'|QTY:'+iData.oData.menge+
		   			'|SET:'+iData.oData.sets+
		   			'|SUN:'+iData.oData.lenum+
		   			'|DAT:'+iData.oData.vfdat+
		   			'|TYP:'+iData.oData.type;
		var vSrc   = 'http://open.visualead.com/?data='+vData+'&size=110&type=png';
		//var vSrc   = 'http://bwipjs-api.metafloor.com/?bcid=code128&text='+vData+'&scale=1';		// ++ 2018.01.19 :: API for build Bar code
		//var vSrc   = 'http://www.barcodes4.me/barcode/c128b/'+vData+'.gif'; 						// !! Cannot use because BC type of API aren't support BC that contain various data type
		
		var DiaEdt = new sap.m.Dialog({
			customHeader	: new sap.m.Bar({contentLeft:	[],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){DiaEdt.close();},})],}),
			contentWidth	: '550px',
		    content			: [new sap.m.Image({src:vSrc}),
		           			   new sap.m.Text({text:iData.oData.matnr+' | '}),
		           			   new sap.m.Text({text:iData.oData.charg+' | '}),
		           			   new sap.m.Text({text:iData.oData.menge+' | '+iData.oData.meins+' | '}),
		           			   new sap.m.Text({text:iData.oData.vfdat+' | '+iData.oData.lenum+' | '+iData.oData.type})],
		});
		DiaEdt.open();
	},
	//-------------------------------------------------------------------------------
	//diaPrint
	//-------------------------------------------------------------------------------
	diaPrint: function(id){
   		var FrmPrn = oCon.getForm(2);
   		FrmPrn.addContent(new sap.m.Label({text:'Material'}));
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpMatnrTx',editable:false}));
   		FrmPrn.addContent(new sap.m.Label({text:'Batch/Expire'}));
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpChargDat',editable:false}));
   		FrmPrn.addContent(new sap.m.Label({text:'Qty'}));
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpMengeP',editable:false,fieldWidth:'75%'}));
   		FrmPrn.addContent(new sap.m.Label({text:'Bas Qty'}));
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpMengeB',editable:false,description:'{/stick/meins}',fieldWidth:'75%'}));
   		FrmPrn.addContent(new sap.m.Label({text:'Qty/Sticker'}));
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpMengeS',type:"Number",description:'{/stick/meins}',fieldWidth:'75%'}));
   		FrmPrn.addContent(new sap.m.Label({text:'No of Sticker'}));
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpMengeQ',type:"Number"}));
 		FrmPrn.addContent(new sap.m.Label({text:'SET#'}));
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpSeta',type:"Number"}));
   		FrmPrn.addContent(new sap.m.Label({text:'Picking',visible:false}));									// ++ 2018.09.18
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpPiknr',visible:false}));								// ++ 2018.09.18	
   		FrmPrn.addContent(new sap.m.Label({text:'Pck. Item',visible:false}));								// ++ 2018.09.18
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpPospk',visible:false}));								// ++ 2018.09.18	
   		FrmPrn.addContent(new sap.m.Label({text:'Pck. Count',visible:false}));								// ++ 2018.09.18
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpSeqpk',visible:false}));								// ++ 2018.09.18	   		
   		FrmPrn.addContent(new sap.m.Label({text:'Wei. No',visible:false}));									// ++ 2018.09.18
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpWeidat',visible:false,value:'{/stick/weidat}'}));		// ++ 2018.09.18	
   		FrmPrn.addContent(new sap.m.Label({text:'Allergen',visible:false}));								// ++ 2018.09.18
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpSptxt',visible:false,value:'{/stick/sptxt}'}));		// ++ 2018.09.18	


   		//new sap.m.Input({id:id+'InpSeta',visible:false}); //Set
   		new sap.m.Input({id:id+'InpBismt',visible:false,value:'{/stick/bismt}'});
   		new sap.m.Input({id:id+'InpVfdat',visible:false,value:'{/stick/vfdat}'});
   		new sap.m.Input({id:id+'InpCharg',visible:false});
   		new sap.m.Input({id:id+'InpMengeR',visible:false});
   		new sap.m.Input({id:id+'InpMeinsS',visible:false,value:'{/stick/meins}'});
   		new sap.m.Input({id:id+'InpMeinsP',visible:false});
   		new sap.m.Input({id:id+'InpMeinsB',visible:false,value:'{/stick/meins}'})
   		new sap.m.Input({id:id+'InpMaktx',visible:false,value:'{/stick/maktx}'});
   		new sap.m.Input({id:id+'InpMatnr',visible:false});
   		new sap.m.Input({id:id+'InpLifnr',visible:false,value:'{/stick/lifnr}'}); //Hidden
   		new sap.m.Input({id:id+'InpName1',visible:false,value:'{/stick/name1}'}); //Hidden
   		new sap.m.Input({id:id+'InpLicha',visible:false,value:'{/stick/licha}'}); //Hidden
   		new sap.m.Input({id:id+'InpHsdat',visible:false,value:'{/stick/hsdat}'}); //Hidden
   		new sap.m.Input({id:id+'InpQrcod',visible:false}); //Hidden
   		new sap.m.Input({id:id+'InpTcode',visible:false}); //Hidden
   		
   		//Print Preview
   		var btnPrv = new sap.m.Button({id:id+'btnPrv',icon:"sap-icon://bar-code",press:function(){
   			var oModel = oCon.qrPrintCtx();
   				oModel.oData.matnr = oCon.getControl(id+'InpMatnr').getValue();
   				oModel.oData.charg = oCon.getControl(id+'InpCharg').getValue();
   				oModel.oData.meins = oCon.getControl(id+'InpMengeB').getValue();
   				oModel.oData.menge = oCon.getControl(id+'InpMengeS').getValue();
   				oModel.oData.sets  = '';
   			oApp.getDiaQrImg(oModel);
   			oCon.ui5DispatchFcode(id+'btnPrv');
   		}});
   		
   		//Print Button
   		var btnPrint = new sap.m.Button({id:id+'btnPrint',icon:"sap-icon://print",text:'Print',press:function(){
   			
			//Calculate Print Qty
			var QtyL   = oCon.getFloat(oCon.getControl(id+'InpMengeB').getValue());
			var QtyR   = oCon.getFloat(oCon.getControl(id+'InpMengeS').getValue());
			var QtyS   = parseInt(QtyL/QtyR); 
			var QtyA   = parseInt(oCon.getControl(id+'InpMengeQ').getValue()); 
			
			oCon.getControl(id+'InpMengeR').setValue(QtyS.toString());
			if(QtyA<=0||oCon.getControl(id+'InpMengeQ').getValue()==""){
				oCon.getControl(id+'InpMengeQ').setValue(QtyS);
			};
			
			
			oCTX.oData.matnr 	= oCon.getControl(id+'InpMatnr').getValue();
			oCTX.oData.charg 	= oCon.getControl(id+'InpCharg').getValue();
			oCTX.oData.tcode 	= oCon.getControl(id+'InpTcode').getValue();
			oCTX.oData.mengeq 	= oCon.getControl(id+'InpMengeQ').getValue();
			oCTX.oData.menges 	= oCon.getControl(id+'InpMengeS').getValue();
			oCTX.oData.qrcod 	= oCon.getControl(id+'InpQrcod').getValue();	

			oCTX.oData.piknr  	= oCon.getControl(id+'InpPiknr').getValue();		// ++ 2018.09.18
			oCTX.oData.pospk  	= oCon.getControl(id+'InpPospk').getValue();		// ++ 2018.09.18
			oCTX.oData.seqpk  	= oCon.getControl(id+'InpSeqpk').getValue();		// ++ 2018.09.18
			oCTX.oData.weidat  	= oCon.getControl(id+'InpWeidat').getValue();		// ++ 2018.09.18
			oCTX.oData.sptxt  	= oCon.getControl(id+'InpSptxt').getValue();		// ++ 2018.09.18			
			
			oCon.ui5DispatchBackEnd("SAPEVT_K007","evt_k007","{i18n>MSG_PROCESS}");
					
   		}});
   		
   		//Calculate
   		var btnCal = new sap.m.Button({id:id+'btnCalP',icon:"sap-icon://simulate",text:'Calculate',press:function(){
			//Calculate Print Qty
			var QtyL   = oCon.getFloat(oCon.getControl(id+'InpMengeB').getValue());
			var QtyR   = oCon.getFloat(oCon.getControl(id+'InpMengeS').getValue());
			var QtyS   = parseInt(QtyL/QtyR); 
			var QtyA   = parseInt(oCon.getControl(id+'InpMengeQ').getValue()); 
			
			
			oCon.getControl(id+'InpMengeR').setValue(QtyS.toString());
			if(QtyA<=0||oCon.getControl(id+'InpMengeQ').getValue()==""){
				oCon.getControl(id+'InpMengeQ').setValue(QtyS);
			};
   		}});
   		
		//Close
   		var btnCls = new sap.m.Button({icon:"sap-icon://decline",press:function(){
   			oApp.deviceManager('CLS');
   			DiaPrint.close();
   		},})
		
		//Dialog
		var DiaPrint = new sap.m.Dialog({
			id				: id+'DiaPrint',
			customHeader	: new sap.m.Bar({contentLeft:	[btnPrv],
				 				             contentMiddle:	[],
				 				             contentRight:	[btnCls],}),
			contentWidth	: '750px',
			buttons			: [btnCal,btnPrint],
		    content			: [FrmPrn],
		});
		
		//Enter Key
		sap.ui.getCore().byId(id+'InpMengeS').onsapenter = function(oEvt){
			var QtyL = oCon.getFloat(oCon.getControl(id+'InpMengeB').getValue());
			var QtyR = oCon.getFloat(oCon.getControl(id+'InpMengeS').getValue());
			var QtyS = parseInt(QtyL/QtyR);
			oCon.getControl(id+'InpMengeR').setValue(oCon.fmtDec(QtyS.toString(),0));
			oCon.getControl(id+'InpMengeQ').setValue(QtyS);
			oCon.ui5DispatchFcode(id+'InpMengeS');
		};
		return DiaPrint;
	},
	//--------------------------------------------------------------------------------
	//diaPrint_PBO
	//--------------------------------------------------------------------------------
	diaPrint_PBO: function(id,tcode,matnr,charg,menge_opk,meins_pkx,menge_okg,qrcod,aufnr,seta,piknr,pospk,seqpk,weinr){
	//diaPrint_PBO: function(id,tcode,matnr,charg,menge_opk,meins_pkx,menge_okg,qrcod,aufnr,seta){
			//debugger;
			oCTX.oData.matnr = matnr;
			oCTX.oData.charg = charg;
			oCTX.oData.qrcod = qrcod;
			oCTX.oData.aufnr = aufnr;
			oCTX.oData.ui5id = id;
			oCTX.oData.piknr = piknr; 
			oCTX.oData.pospk = pospk;
			oCTX.oData.seqpk = seqpk;
			oCTX.oData.weinr = weinr;
			oCon.ui5DispatchBackEnd("SAPEVT_K006","evt_k006","{i18n>MSG_PROCESS}");
			
			//debugger;
			oCon.getControl(id+'InpMatnr').setValue(matnr);
			oCon.getControl(id+'InpCharg').setValue(charg);
			oCon.getControl(id+'InpMengeP').setValue(oCon.fmtDec(menge_opk,3));
			oCon.getControl(id+'InpMengeP').setDescription(meins_pkx);
			oCon.getControl(id+'InpMengeB').setValue(oCon.fmtDec(menge_okg,3));
			oCon.getControl(id+'InpMeinsP').setValue(meins_pkx);
			oCon.getControl(id+'InpMengeS').setValue();
			oCon.getControl(id+'InpMeinsS').setValue();
			oCon.getControl(id+'InpMengeR').setValue();
			oCon.getControl(id+'InpMengeQ').setValue();
			oCon.getControl(id+'InpTcode').setValue(tcode);
			oCon.getControl(id+'InpQrcod').setValue(qrcod);
			oCon.getControl(id+'InpSeta').setValue(seta);
			
			oCon.getControl(id+'InpPiknr').setValue(piknr);		// ++ 2018.09.18
			oCon.getControl(id+'InpPospk').setValue(pospk);		// ++ 2018.09.18
			oCon.getControl(id+'InpSeqpk').setValue(seqpk);		// ++ 2018.09.18
			
	},
	//--------------------------------------------------------------------------------
	//diaWeight_PBO2
	//--------------------------------------------------------------------------------
	diaWeight_PBO2: function(id,oModel,iOpen){
		
		//Connect Printer
		oApp.deviceManager('WON');
		oCTX.oData.ui5id = id;
		
		//Screen
		oCon.getControl(id+'TxtWei').setText();
		oCon.getControl(id+'TxtWStat').setText();
		oCon.getControl(id+'TxtWCharg').setText();
		oCon.getControl(id+'TxtWQrcod').setText(); 
		oCon.getControl(id+'lblMatnrIn').setModel(oModel);
		oCon.getControl(id+'TxtMengeSkgT').setModel(oModel);
		oCon.getControl(id+'TxtWSett').setModel(oModel); //Target Weight Set
		oCon.getControl(id+'TxtWSetw').setModel(oModel); //Running Set (All)
		oCon.getControl(id+'TxtTabix').setModel(oModel); //Tabix
		
		oCon.getControl(id+'btnWeiOk').setVisible(false);
		oCon.getControl(id+'btnWeiNex').setVisible(false);
		
		//Parameter
		oCon.getControl(id+'TxtWMatnr').setModel(oModel); //Material Code
		oCon.getControl(id+'TxtWSets').setModel(oModel);  //Current Weight Set
		oCon.getControl(id+'TxtMengeSkgL').setModel(oModel);
		oCon.getControl(id+'TxtMengeSkgU').setModel(oModel);
		
		//Open Dialog
		if(iOpen)
			oCon.getControl(id+'DiaWei').open();
		
		//Developer debug
		if(oCTX.oData.debug=='X'){ 
			oCon.getControl(id+'btnTest').setVisible(true);
			oCon.getControl(id+'btnTest2').setVisible(true);
		};

	},
	//--------------------------------------------------------------------------------
	//diaPrint_PAI
	//--------------------------------------------------------------------------------
	diaPrint_PAI: function(fcode,oModela){
		
		if(fcode=='SAPEVT_K006'){		

			oApp.deviceManager('CON');
			oCon.getControl(oCTX.oData.ui5id+'InpMengeB').setModel(oModela);
			oCon.getControl(oCTX.oData.ui5id+'InpMengeS').setModel(oModela);
			
			oCon.getControl(oCTX.oData.ui5id+'InpMeinsB').setModel(oModela);
			oCon.getControl(oCTX.oData.ui5id+'InpMeinsS').setModel(oModela);
			
			oCon.getControl(oCTX.oData.ui5id+'InpMaktx').setModel(oModela);
			oCon.getControl(oCTX.oData.ui5id+'InpLifnr').setModel(oModela);
			oCon.getControl(oCTX.oData.ui5id+'InpName1').setModel(oModela);			
			oCon.getControl(oCTX.oData.ui5id+'InpLicha').setModel(oModela);
			oCon.getControl(oCTX.oData.ui5id+'InpHsdat').setModel(oModela);
			oCon.getControl(oCTX.oData.ui5id+'InpVfdat').setModel(oModela);
			oCon.getControl(oCTX.oData.ui5id+'InpHsdat').setValue(oFmt.fmtDate(oCon.getControl(oCTX.oData.ui5id+'InpHsdat').getValue()));
			oCon.getControl(oCTX.oData.ui5id+'InpVfdat').setValue(oFmt.fmtDate(oCon.getControl(oCTX.oData.ui5id+'InpVfdat').getValue()));
			oCon.getControl(oCTX.oData.ui5id+'InpBismt').setModel(oModela);
			
			oCon.getControl(oCTX.oData.ui5id+'InpWeidat').setModel(oModela);		// ++ 2018.09.18
			oCon.getControl(oCTX.oData.ui5id+'InpSptxt').setModel(oModela);			// ++ 2018.09.18
			
			oCon.getControl(oCTX.oData.ui5id+'DiaPrint').open();
			
			var vMatnrTx = oCon.getControl(oCTX.oData.ui5id+'InpMatnr').getValue() + ' ' + 
						   oCon.getControl(oCTX.oData.ui5id+'InpMaktx').getValue();
			
			var vChargDat = oCon.getControl(oCTX.oData.ui5id+'InpCharg').getValue() + ' ' + 
			   			    oCon.getControl(oCTX.oData.ui5id+'InpVfdat').getValue();
			
			oCon.getControl(oCTX.oData.ui5id+'InpMatnrTx').setValue(vMatnrTx);
			oCon.getControl(oCTX.oData.ui5id+'InpChargDat').setValue(vChargDat);
		};
		
		if(fcode=='SAPEVT_K007'){
			
			//Set Print QR Data Protocal
			var oModel = oCon.qrPrintCtx();
			
			oModel.oData.matnr 	= oCon.getControl(oCTX.oData.ui5id+'InpMatnr').getValue();
			oModel.oData.maktx 	= oCon.getControl(oCTX.oData.ui5id+'InpMaktx').getValue();
			oModel.oData.charg 	= oCon.getControl(oCTX.oData.ui5id+'InpCharg').getValue();
			oModel.oData.licha 	= oCon.getControl(oCTX.oData.ui5id+'InpLicha').getValue();
			oModel.oData.vfdat 	= oCon.getControl(oCTX.oData.ui5id+'InpVfdat').getValue();
			oModel.oData.hsdat	= oCon.getControl(oCTX.oData.ui5id+'InpHsdat').getValue();
			oModel.oData.lifnr 	= oCon.getControl(oCTX.oData.ui5id+'InpLifnr').getValue();
			oModel.oData.name1	= oCon.getControl(oCTX.oData.ui5id+'InpName1').getValue();
			oModel.oData.menge	= oCon.getControl(oCTX.oData.ui5id+'InpMengeS').getValue();
			oModel.oData.meins	= oCon.getControl(oCTX.oData.ui5id+'InpMeinsB').getValue();
			oModel.oData.bismt	= oCon.getControl(oCTX.oData.ui5id+'InpBismt').getValue();
			oModel.oData.seta 	= oCon.getControl(oCTX.oData.ui5id+'InpSeta').getValue();			

			oModel.oData.piknr 	= oCon.getControl(oCTX.oData.ui5id+'InpPiknr').getValue();						// ++ 2018.09.18
			oModel.oData.pospk 	= oCon.getControl(oCTX.oData.ui5id+'InpPospk').getValue();						// ++ 2018.09.18
			oModel.oData.seqpk 	= oCon.getControl(oCTX.oData.ui5id+'InpSeqpk').getValue();						// ++ 2018.09.18
			oModel.oData.weidat	= oFmt.fmtDate(oCon.getControl(oCTX.oData.ui5id+'InpWeidat').getValue());		// ++ 2018.09.18
			oModel.oData.sptxt	= oCon.getControl(oCTX.oData.ui5id+'InpSptxt').getValue();						// ++ 2018.09.18
			
			//Print QR
			for(var i=0;i<oModela.oData.t_stick.length;i++){
				oModel.oData.qrcod = oModela.oData.t_stick[i].qrcod;
				oCTX.oData.qr_copy = 1;
				oCTX.oData.qr_data = oCon.qrPrintData(oModel);
				oCon.qrPrint();
				debugger;
			};
		};
	},
	
//CHATUPOM TEST XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
	
	//-------------------------------------------------------------------------------
	//diaPrintSU
	//-------------------------------------------------------------------------------
	diaPrintSU: function(id){
   		var FrmPrn = oCon.getForm(2);
   		FrmPrn.addContent(new sap.m.Label({text:'SU'})); 
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpLenumSU',editable:false}));

   		FrmPrn.addContent(new sap.m.Label({text:'Material'}));
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpMatnrSU',editable:false}));

   		FrmPrn.addContent(new sap.m.Label({text:'Batch/Expire'}));
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpChargSU',editable:false}));

   		FrmPrn.addContent(new sap.m.Label({text:'Qty'})); 
   		FrmPrn.addContent(new sap.m.Input({id:id+'InpMengeSU',editable:false,description:'{/t_k_sckfwm/0/meins}',fieldWidth:'75%'}));
   			
// 		FrmPrn.addContent(new sap.m.Label({text:'SET#'}));
//   	FrmPrn.addContent(new sap.m.Input({id:id+'InpSetSU',type:"Number"}));
   		
   		new sap.m.Input({id:id+'InpTcode',visible:false});
   		new sap.m.Input({id:id+'InpMatnr',visible:false});
   		new sap.m.Input({id:id+'InpMaktx',visible:false});
   		new sap.m.Input({id:id+'InpCharg',visible:false});
   		new sap.m.Input({id:id+'InpVfdat',visible:false});
   		new sap.m.Input({id:id+'InpMeins',visible:false,value:'{/t_k_sckfwm/0/meins}'});
   		
   		//Print Preview
   		 var btnPrv = new sap.m.Button({id:id+'btnPrv',icon:"sap-icon://bar-code",press:function(){
   		 	var oModel = oCon.qrPrintCtx();
//   		 		oModel.oData.matnr = oCon.getControl(id+'InpMatnrSU').getValue();
//   		 		oModel.oData.charg = oCon.getControl(id+'InpChargSU').getValue();
   		 		
   		 		oModel.oData.lenum = oCon.getControl(id+'InpLenumSU').getValue();
   		 		oModel.oData.matnr = oCon.getControl(id+'InpMatnr').getValue();
   		 		oModel.oData.vfdat = oCon.getControl(id+'InpVfdat').getValue();
   		 		//oModel.oData.maktx = oCon.getControl(id+'InpMaktx').getValue();
   		 		oModel.oData.charg = oCon.getControl(id+'InpCharg').getValue();
   		 		oModel.oData.meins = oCon.getControl(id+'InpMeins').getValue();
   		 		oModel.oData.menge = oCon.getControl(id+'InpMengeSU').getValue();
   		 		
   		 		//oModel.oData.meins = oCon.getControl(id+'InpMengeB').getValue();
   		 		//oModel.oData.menge = oCon.getControl(id+'InpMengeS').getValue();
   		 		//oModel.oData.sets  = oCon.getControl(id+'InpSetSU').getValue();;
   		 		oModel.oData.type  = 'SUN';
   		 		
   		 	oApp.getDiaQrImg(oModel);
   		 	oCon.ui5DispatchFcode(id+'btnPrv');
   		 }});
   		
   		//Print Button
   		var btnPrint = new sap.m.Button({id:id+'btnPrintSU',icon:"sap-icon://print",text:'Print',press:function(){
 //EDIT
   			
			//Calculate Print Qty
//			 var QtyL   = oCon.getFloat(oCon.getControl(id+'InpMengeSU').getValue());
//			 var QtyR   = oCon.getFloat(oCon.getControl(id+'InpMengeSU').getValue());
//			 var QtyS   = parseInt(QtyL/QtyR); 
//			 var QtyA   = parseInt(oCon.getControl(id+'InpMengeSU').getValue()); 
//			
//			 oCon.getControl(id+'InpMengeSU').setValue(QtyS.toString());
//			 if(QtyA<=0||oCon.getControl(id+'InpMengeSU').getValue()==""){
//			 	oCon.getControl(id+'InpMengeSU').setValue(QtyS);
//			 };
			 
			 oCTX.oData.matnr 	= oCon.getControl(id+'InpMatnr').getValue();
			 oCTX.oData.charg 	= oCon.getControl(id+'InpCharg').getValue();
			 //oCTX.oData.tcode 	= oCon.getControl(id+'InpTcode').getValue();
			 //oCTX.oData.mengeq 	= oCon.getControl(id+'InpMengeQ').getValue();
			 //oCTX.oData.menges 	= oCon.getControl(id+'InpMengeS').getValue();
			 //oCTX.oData.qrcod 	= oCon.getControl(id+'InpQrcod').getValue();
			 
			 oCTX.oData.tcode 	= "STK";
			 oCTX.oData.mengeq 	= "1";
			 oCTX.oData.menges 	= "1000";
			 oCTX.oData.qrcod 	= "";
			
			 //oCon.ui5DispatchBackEnd("SAPEVT_K007","evt_k007","{i18n>MSG_PROCESS}");
			 oCon.ui5DispatchBackEnd("SAPEVT_K107","evt_k107","{i18n>MSG_PROCESS}");		
   		}});
   		
  
   		
		//Close
   		var btnCls = new sap.m.Button({icon:"sap-icon://decline",press:function(){
   			oApp.deviceManager('CLS');
   			DiaPrintSU.close();
   		},})
		
		//Dialog
		var DiaPrintSU = new sap.m.Dialog({
			id				: id+'DiaPrintSU',
			customHeader	: new sap.m.Bar({contentLeft:	[btnPrv],
				 				             contentMiddle:	[],
				 				             contentRight:	[btnCls],}),
			contentWidth	: '750px',
			buttons			: [btnPrint],
		    content			: [FrmPrn],
		});
		//Enter Key
		// sap.ui.getCore().byId(id+'InpMengeS').onsapenter = function(oEvt){
		// 	var QtyL = oCon.getFloat(oCon.getControl(id+'InpMengeB').getValue());
		// 	var QtyR = oCon.getFloat(oCon.getControl(id+'InpMengeS').getValue());
		// 	var QtyS = parseInt(QtyL/QtyR);
		// 	oCon.getControl(id+'InpMengeR').setValue(oCon.fmtDec(QtyS.toString(),0));
		// 	oCon.getControl(id+'InpMengeQ').setValue(QtyS);
		// 	oCon.ui5DispatchFcode(id+'InpMengeS');
		// };
		return DiaPrintSU;
	},


	//--------------------------------------------------------------------------------
	//diaPrintSU_PBO
	//--------------------------------------------------------------------------------
		
	diaPrintSU_PBO: function(id,tcode,lenum,matnr,maktx,menge,meins,charg,vfdat){
		
		oCTX.oData.lenum = lenum;
		oCTX.oData.matnr = matnr;
		oCTX.oData.maktx = maktx;
		oCTX.oData.menge = menge;
		oCTX.oData.meins = meins;
		oCTX.oData.charg = charg;
		oCTX.oData.vfdat = vfdat;
	    oCTX.oData.ui5id = id;
	    
		//debugger;
		oCon.ui5DispatchBackEnd("SAPEVT_K105","evt_k105","{i18n>MSG_PROCESS}");
		
		oCon.getControl(id+'InpTcode').setValue(tcode);
		oCon.getControl(id+'InpMatnr').setValue(matnr);
		oCon.getControl(id+'InpMaktx').setValue(maktx);
		oCon.getControl(id+'InpCharg').setValue(charg);
		oCon.getControl(id+'InpVfdat').setValue(vfdat);
		
		oCon.getControl(id+'InpLenumSU').setValue(lenum);
		oCon.getControl(id+'InpMatnrSU').setValue(matnr);
		oCon.getControl(id+'InpChargSU').setValue(charg);
		oCon.getControl(id+'InpMengeSU').setValue(menge);
		
		if(tcode=='STKWH'){
			oCon.getControl(id+'InpMengeSU').setEditable(true);
		}
		
	},

	//--------------------------------------------------------------------------------
	//diaPrintSU_PAI
	//--------------------------------------------------------------------------------
	diaPrintSU_PAI: function(fcode,oModela){
		
		if(fcode=='SAPEVT_K105'){
			oApp.deviceManager('CON');
			
			
			oCon.getControl(oCTX.oData.ui5id+'InpLenumSU').setModel(oModela);
			oCon.getControl(oCTX.oData.ui5id+'InpMatnrSU').setModel(oModela);
			oCon.getControl(oCTX.oData.ui5id+'InpChargSU').setModel(oModela);
			oCon.getControl(oCTX.oData.ui5id+'InpMengeSU').setModel(oModela);
			oCon.getControl(oCTX.oData.ui5id+'InpMeins').setModel(oModela);
			
			oCon.getControl(oCTX.oData.ui5id+'InpVfdat').setValue(oFmt.fmtDate(oCon.getControl(oCTX.oData.ui5id+'InpVfdat').getValue()));
			
//			oCon.getControl(oCTX.oData.ui5id+'InpMengeB').setModel(oModela);
//			oCon.getControl(oCTX.oData.ui5id+'InpMengeS').setModel(oModela);
//			
//			oCon.getControl(oCTX.oData.ui5id+'InpMeinsB').setModel(oModela);
//			oCon.getControl(oCTX.oData.ui5id+'InpMeinsS').setModel(oModela);
//			oCon.getControl(oCTX.oData.ui5id+'InpMaktx').setModel(oModela);
//			oCon.getControl(oCTX.oData.ui5id+'InpLifnr').setModel(oModela);
//			oCon.getControl(oCTX.oData.ui5id+'InpName1').setModel(oModela);			
//			oCon.getControl(oCTX.oData.ui5id+'InpLicha').set3Model(oModela);
//			oCon.getControl(oCTX.oData.ui5id+'InpHsdat').setModel(oModela);
//			oCon.getControl(oCTX.oData.ui5id+'InpVfdat').setModel(oModela);
//			oCon.getControl(oCTX.oData.ui5id+'InpHsdat').setValue(oFmt.fmtDate(oCon.getControl(oCTX.oData.ui5id+'InpHsdat').getValue()));
//			oCon.getControl(oCTX.oData.ui5id+'InpVfdat').setValue(oFmt.fmtDate(oCon.getControl(oCTX.oData.ui5id+'InpVfdat').getValue()));
//			oCon.getControl(oCTX.oData.ui5id+'InpBismt').setModel(oModela);
			
			//debugger;
			oCon.getControl(oCTX.oData.ui5id+'DiaPrintSU').open();
			
			
			var vMatnrTx = oCon.getControl(oCTX.oData.ui5id+'InpMatnr').getValue() + '    ' + 
						   oCon.getControl(oCTX.oData.ui5id+'InpMaktx').getValue();
		
			var vChargDat = oCon.getControl(oCTX.oData.ui5id+'InpCharg').getValue() + '    ' + 
			   			    oCon.getControl(oCTX.oData.ui5id+'InpVfdat').getValue();
		
			oCon.getControl(oCTX.oData.ui5id+'InpMatnrSU').setValue(vMatnrTx);
			oCon.getControl(oCTX.oData.ui5id+'InpChargSU').setValue(vChargDat);
			
			//debugger;
			
		};
		
		
		if(fcode=='SAPEVT_K107'){
			//debugger;
			//Set Print QR Data Protocal
			var oModel = oCon.qrPrintCtx();
//			oModel.oData.lenum = oCon.getControl(oCTX.oData.ui5id+'InpLenumSU').getValue();
//			oModel.oData.matnr = oCon.getControl(oCTX.oData.ui5id+'InpMatnr').getValue();
//			oModel.oData.maktx = oCon.getControl(oCTX.oData.ui5id+'InpMaktx').getValue();
//			oModel.oData.charg = oCon.getControl(oCTX.oData.ui5id+'InpCharg').getValue();
//			oModel.oData.vfdat = oCon.getControl(oCTX.oData.ui5id+'InpVfdat').getValue();
//			oModel.oData.menge = oCon.getControl(oCTX.oData.ui5id+'InpMengeSU').getValue();
//			oModel.oData.meins = oCon.getControl(oCTX.oData.ui5id+'InpMeins').getValue();
			
//			oModel.oData.licha = oCon.getControl(oCTX.oData.ui5id+'InpLicha').getValue();
//			oModel.oData.vfdat = oCon.getControl(oCTX.oData.ui5id+'InpVfdat').getValue();
//			oModel.oData.hsdat = oCon.getControl(oCTX.oData.ui5id+'InpHsdat').getValue();
//			oModel.oData.lifnr = oCon.getControl(oCTX.oData.ui5id+'InpLifnr').getValue();
//			oModel.oData.name1 = oCon.getControl(oCTX.oData.ui5id+'InpName1').getValue();
//			oModel.oData.menge = oCon.getControl(oCTX.oData.ui5id+'InpMengeS').getValue();
//			oModel.oData.meins = oCon.getControl(oCTX.oData.ui5id+'InpMeinsB').getValue();
//			oModel.oData.bismt = oCon.getControl(oCTX.oData.ui5id+'InpBismt').getValue();
//			oModel.oData.seta  = oCon.getControl(oCTX.oData.ui5id+'InpSeta').getValue();
			
			//Print QR
			for(var i=0;i<oModela.oData.t_stick.length;i++){
				oModel.oData.qrcod = oModela.oData.t_stick[i].qrcod;				// QR Number
				oModel.oData.lenum = oModela.oData.t_stick[i].lenum;				// SU Number
				oModel.oData.charg = oModela.oData.t_stick[i].charg;				// Batch
				oModel.oData.vfdat = oFmt.fmtDate(oModela.oData.t_stick[i].vfdat);	// Exp. Date
				oModel.oData.menge = oModela.oData.t_stick[i].menge;				// Quantity
				oModel.oData.meins = oModela.oData.t_stick[i].meins;				// Unit
				oModel.oData.matnr = oModela.oData.t_stick[i].matnr;				// Mat. Number
				oModel.oData.maktx = oModela.oData.t_stick[i].maktx;				// Mat. Name
				oModel.oData.lifnr = oModela.oData.t_stick[i].lifnr;				// Vendor Number
				oModel.oData.name1 = oModela.oData.t_stick[i].name1;				// Vendor Name
				oModel.oData.hsdat = oFmt.fmtDate(oModela.oData.t_stick[i].hsdat);
				oModel.oData.menge_uoi = oModela.oData.t_stick[i].menge_uoi;
				oModel.oData.meins_uoi = oModela.oData.t_stick[i].meins_uoi;
				oModel.oData.sptxt = oModela.oData.t_stick[i].sptxt;				// Allergen
				oCTX.oData.qr_copy = 1;
				oCTX.oData.qr_data = oCon.qrPrintDataSU(oModel);
				oCon.qrPrint();
				debugger;
			};
			

		};
		
	},
	
//CHATUPOM TEST XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
	
	//--------------------------------------------------------------------------------
	//diaWeight
	//--------------------------------------------------------------------------------
	diaWeight: function(id){
		
		//QR Code Scanner
		var FrmScn = new sap.ui.layout.form.SimpleForm({
			layout		: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			editable	: true,
			content		: [new sap.m.Label({text:'QR Data'}),
			       		   new sap.m.Input({id:id+'InpQrData'}),],
		}); 
		sap.ui.getCore().byId(id+"InpQrData").onsapenter = function(oEvt){
			oCon.ui5DispatchFcode(id+'InpQrData');
		};
		
		//Camera Scan
		var btnCam = new sap.m.Button({id:id+'btnCam',icon:"sap-icon://camera",text:'Scan',press:function(oEvt){
			oCon.scanCam(id+'InpQrData',id+'InpQrData'); 
		}})
		
		//Layout
		var FrmWeiL = new sap.ui.layout.form.SimpleForm({
			layout		: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			editable	: true,	
			content		: [new sap.m.Label({text:'Batch'}),
			       		   new sap.m.Text({id:id+'TxtWCharg',text:""}).addStyleClass("Wei2Ok"),
			       		   new sap.m.Label({text:'Target Weight'}),
			       		   new sap.m.Text({id:id+'TxtMengeSkgT',text:"{/wei/menge_tkg}"}).addStyleClass("Wei2Ok"),
						   new sap.m.Label({text:'Target Set'}),
						   new sap.m.Text({id:id+'TxtWSett',text:"{/wei/sett}"}).addStyleClass("Wei2Ok"),

						   new sap.m.Text({id:id+'TxtWPiknr',visible:false}),			// ++ 2018.01.11 :: Add PIKNR to Weight Sticker
						   new sap.m.Text({id:id+'TxtWPospk',visible:false}),			// ++ 2018.01.11 :: Add POSPK to Weight Sticker
						   new sap.m.Text({id:id+'TxtWSeqpk',visible:false}),],			// ++ 2018.01.11 :: Add SEQPK to Weight Sticker
						   
		});
		var FrmWeiR = new sap.ui.layout.form.SimpleForm({
			layout		: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			editable	: true,	
			content		: [new sap.m.Label({text:'Weight'}),
			       		   new sap.m.Text({id:id+'TxtWei',text:""}).addStyleClass("Wei4Nok"),
						   new sap.m.Label({text:'Set#'}),
						   new sap.m.Text({id:id+'TxtWSetw',text:"{/wei/setw}"}).addStyleClass("Wei2Nok"),
						   new sap.m.Label({text:'Status'}),
						   new sap.m.Text({id:id+'TxtWStat',text:""}).addStyleClass("Wei2Nok"),],
		});	
		//Parameter
		new sap.m.Text({id:id+'TxtMengeSkgW',visible:false}); //Weight to Send to Backend
		var FrmWeiP = new sap.ui.layout.form.SimpleForm({
			layout		: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			content		: [new sap.m.Label({text:'QR ID'}),
			       		   new sap.m.Text({id:id+'TxtWQrcod'}),
			       		   new sap.m.Label({text:'Matnr'}),
			       		   new sap.m.Text({id:id+'TxtWMatnr',text:"{/wei/matnr_in}"}),
			       		   new sap.m.Label({text:'SET Cur'}),
			       		   new sap.m.Text({id:id+'TxtWSets',text:"{/wei/sets}"}),
			       		   new sap.m.Label({text:'Upper'}),
			       		   new sap.m.Text({id:id+'TxtMengeSkgU',text:"{/wei/menge_ukg}"}),
			       		   new sap.m.Label({text:'Lower'}),
			       		   new sap.m.Text({id:id+'TxtMengeSkgL',text:"{/wei/menge_lkg}"}),],
		});	
		var FlxWei = new sap.m.FlexBox({
				alignItems		: sap.m.FlexAlignItems.Start,
				justifyContent	: sap.m.FlexJustifyContent.Start,
				height			: '300px',
				items			: [FrmWeiL,FrmWeiR],
			});
		
		//Button: Test Weight
		var btnTest = new sap.m.Button({id:id+'btnTest',icon:"sap-icon://accept",text:'Test Weight',visible:false,press:function(oEvt){
	    	oCon.getControl(id+'TxtWei').setText(oCon.getControl(id+'TxtMengeSkgT').getText());
	    	oCon.getControl(id+'btnWeiOk').setVisible(true);
			oCon.getControl(id+'TxtWStat').setText('OK');
	    	oCon.ui5DispatchFcode(id+'btnTest');
	    },});
		//Button: Test Change Batch
		var btnTest2 = new sap.m.Button({id:id+'btnTest2',icon:"sap-icon://accept",text:'Test Batch',visible:false,press:function(oEvt){
	    	oCon.getControl(id+'TxtWei').setText(oCon.getControl(id+'InpQrData').getValue());
	    	oCon.getControl(id+'btnWeiNex').setVisible(true);
	    },});
		
		//Button: Weight OK
		var btnWeiOK = new sap.m.Button({id:id+'btnWeiOk',icon:"sap-icon://bar-code",text:'Confirm and Print',press:function(oEvt){
			if(oCon.getControl(id+'TxtWCharg').getText()==''){
				oCon.popMsgbox('Please scan batch'); return;
			}
			
			if(oApp.getWeiOK(id)!='X'){
				oCon.popMsgbox('Weight not valid'); return;
			};
			oCon.getControl(id+'TxtMengeSkgW').setText(oCon.getControl(id+'TxtMengeSkgT').getText());
			oCon.ui5DispatchFcode(id+'btnWeiOk');
		 },});
		//Button: Change Batch
		var btnWeiNex = new sap.m.Button({id:id+'btnWeiNex',icon:"sap-icon://add-process",text:'Change Batch',press:function(oEvt){
			if(oCon.getControl(id+'TxtWCharg').getText()==''){
				oCon.popMsgbox('Please scan batch'); return;
			};
			oCon.getControl(id+'TxtMengeSkgW').setText(oCon.getControl(id+'TxtWei').getText());
			oCon.ui5DispatchFcode(id+'btnWeiNex');
		 },});
		
		//Button: Weight Close
		var btnCls = new sap.m.Button({id:id+'btnCls',icon:"sap-icon://decline",press:function(oEvt){
			//Close
			oApp.deviceManager('WLS');
			oCon.getControl(id+'DiaWei').close();
			oCon.ui5DispatchFcode(id+'btnCls');
		}});
		//Dialog
		var DiaWei = new sap.m.Dialog({
			id				: id+'DiaWei',
			subHeader 		: new sap.m.Bar({contentLeft:	[new sap.m.Label({id:id+'lblMatnrIn',text:'{/wei/matnr_in} {/wei/maktx_in}'})],
	             							 contentMiddle:	[],
	             							 contentRight:	[],}),
			customHeader	: new sap.m.Bar({contentLeft:	[btnCam],
				 				             contentMiddle:	[],
				 				             contentRight:	[btnCls],}),
		    contentWidth	: '600px',
		    buttons 		: [btnTest2,btnTest,btnWeiNex,btnWeiOK],
			content			: [FrmScn,FlxWei],
		});
		return DiaWei;
	},
	
	//--------------------------------------------------------------------------------
	//diaWeight_PBO
	//--------------------------------------------------------------------------------
	diaWeight_PBO: function(id,oModel){
		
		//Connect Printer
		oApp.deviceManager('WON');
		oCTX.oData.ui5id = id;
		
		//Screen
		oCon.getControl(id+'TxtWei').setText();
		oCon.getControl(id+'TxtWStat').setText();
		oCon.getControl(id+'TxtWCharg').setText();
		oCon.getControl(id+'TxtWQrcod').setText(); 
		oCon.getControl(id+'lblMatnrIn').setModel(oModel);
		oCon.getControl(id+'TxtMengeSkgT').setModel(oModel);
		oCon.getControl(id+'TxtWSett').setModel(oModel); //Target Weight Set
		oCon.getControl(id+'TxtWSetw').setModel(oModel); //Running Set (All)

		oCon.getControl(id+'btnWeiOk').setVisible(false);
		oCon.getControl(id+'btnWeiNex').setVisible(false);
		
		//Parameter
		oCon.getControl(id+'TxtWMatnr').setModel(oModel); //Material Code
		oCon.getControl(id+'TxtWSets').setModel(oModel);  //Current Weight Set
		oCon.getControl(id+'TxtMengeSkgL').setModel(oModel);
		oCon.getControl(id+'TxtMengeSkgU').setModel(oModel);
		
		//Open Dialog
		oCon.getControl(id+'DiaWei').open();
		
		//Developer debug
		if(oCTX.oData.debug=='X'){ 
			oCon.getControl(id+'btnTest').setVisible(true);
			oCon.getControl(id+'btnTest2').setVisible(true);
		};

	},
	//--------------------------------------------------------------------------------
	//diaWeight_PAI
	//--------------------------------------------------------------------------------
	diaWeight_PAI: function(id,fcode,oModela){
		debugger;
		//Calculate Print Qty
		var oModel = oCon.qrPrintCtx();
		
		//Set Print QR Data Protocal
		oModel.oData.aufnr 	= oCTX.oData.aufnr;
		oModel.oData.qrcod 	= oModela.oData.stick.qrcod;
		oModel.oData.matnr 	= oModela.oData.stick.matnr;
		oModel.oData.maktx 	= oModela.oData.stick.maktx;
		oModel.oData.charg 	= oModela.oData.stick.charg;
		oModel.oData.licha 	= oModela.oData.stick.licha;
		oModel.oData.vfdat 	= oFmt.fmtDate(oModela.oData.stick.vfdat);
		oModel.oData.hsdat 	= oFmt.fmtDate(oModela.oData.stick.hsdat);
		oModel.oData.lifnr 	= oModela.oData.stick.lifnr;
		oModel.oData.name1 	= oModela.oData.stick.name1;
		oModel.oData.menge 	= oCon.getControl(id+'TxtMengeSkgW').getText();
		oModel.oData.meins 	= 'KG';
		oModel.oData.seta  	= oModela.oData.stick.seta;
		oModel.oData.bismt 	= oModela.oData.stick.bismt;
		
		oModel.oData.piknr 	= oModela.oData.stick.piknr;					// ++ 2018.01.11 :: Add PIKNR to Weight Sticker
		oModel.oData.pospk 	= oModela.oData.stick.pospk;					// ++ 2018.01.11 :: Add POSPK to Weight Sticker
		oModel.oData.seqpk 	= oModela.oData.stick.seqpk;					// ++ 2018.01.15 :: Add SEQPK to Weight Sticker
		oModel.oData.weidat = oFmt.fmtDate(oModela.oData.stick.weidat);		// ++ 2018.09.18
		oModel.oData.sptxt 	= oModela.oData.stick.sptxt;					// ++ 2018.09.18
		
		//Generate QR Data
		oCTX.oData.qr_copy = 1;
		oCTX.oData.qr_data = oCon.qrPrintData(oModel);
		oCon.qrPrint();	
		
		//Binding Model Screen
		oCon.getControl(id+'TxtMengeSkgT').setModel(oModela);
		oCon.getControl(id+'TxtMengeSkgU').setModel(oModela);
		oCon.getControl(id+'TxtMengeSkgL').setModel(oModela);
		oCon.getControl(id+'TxtWSetw').setModel(oModela);
		oCon.getControl(id+'TxtWSets').setModel(oModela);
		
		//Close Dialog
		if(oModela.oData.head.weiok=='X'){
			oApp.deviceManager('WLS');
			oCon.getControl(id+'DiaWei').close();
		};
		
	},
	//--------------------------------------------------------------------------------
	//diaWeight_SOCK : Socket Receive
	//--------------------------------------------------------------------------------
	diaWeight_SOCK: function(id,iData){
		
		//Premix Weight Console
		var oModel = oCon.getWeiDataIshida(iData);
		oCon.getControl(id+'TxtWei').setText(oModel.oData.wei);
		
		if((oModel.oData.stat1=='+'||oModel.oData.stat1==',')&&
		   (oModel.oData.stat2=='!'||oModel.oData.stat2==')')&&(oApp.getWeiOK(id)=='X')){
			oCon.getControl(id+'btnWeiOk').setVisible(true);
			oCon.getControl(id+'btnWeiNex').setVisible(false);
			oCon.getControl(id+'TxtWStat').setText('OK');
			return;
		}else{
			oCon.getControl(id+'btnWeiOk').setVisible(false);
			oCon.getControl(id+'TxtWStat').setText();
		};
		
		//Change Batch
		var vWTar  = parseFloat(oCon.getControl(id+'TxtMengeSkgT').getText());
		var vWCur  = parseFloat(oCon.getControl(id+'TxtWei').getText());
		if((vWTar>vWCur)&&(vWCur>0)&&
	       (oModel.oData.stat1=='+'||oModel.oData.stat1==',')&&
	       (oModel.oData.stat2=='!'||oModel.oData.stat2==')')){
			oCon.getControl(id+'btnWeiNex').setVisible(true);
		}else{
			oCon.getControl(id+'btnWeiNex').setVisible(false);
		};
		
	},
	//--------------------------------------------------------------------------------
	//diaWeight_SOCK : Socket Receive
	//--------------------------------------------------------------------------------
	getWeiOK: function(id){
		var vWTar  = parseFloat(oCon.getControl(id+'TxtMengeSkgT').getText());
		var vWCur  = parseFloat(oCon.getControl(id+'TxtWei').getText());
		var vWTarL = parseFloat(oCon.getControl(id+'TxtMengeSkgL').getText());
		var vWTarU = parseFloat(oCon.getControl(id+'TxtMengeSkgU').getText());
		
		if(vWCur==vWTar) {return 'X';};
		if(vWCur==vWTarL){return 'X';};
		if(vWCur==vWTarU){return 'X';};
		if(vWTarL<=vWCur&&vWCur<=vWTarU){return 'X';};
	},
	//--------------------------------------------------------------------------------
	//diaCnfin : Confirm-in Dialog
	//--------------------------------------------------------------------------------
	diaCnfin: function(id){
   		var FrmCnf = oCon.getForm(2);
   		var ItmTbl = new sap.ui.core.ListItem({key:'{key}',text:'{value}',additionalText:'{key}'});
   		FrmCnf.addContent(new sap.m.Label({text:'Resource'}));
   		FrmCnf.addContent(new sap.m.Select({
			id		:id+"InpTTumbl",
			showSecondaryValues : true,
			selectedKey	: '{/head/arbpl}',
			items	: {path:"/t_crhd",template:ItmTbl},
		}));
   		FrmCnf.addContent(new sap.m.Label({text:'Cnf-Text'}));
   		//FrmCnf.addContent(new sap.m.Input({id:id+'InpTCharg',value:'{/head/charg}',maxLength:40,editable:false}));		// -- 2018.12.07 :: Input Confirm - PREP V1.0.1
   		FrmCnf.addContent(new sap.m.Input({id:id+'InpTCharg',value:'{/head/ltxa1}',maxLength:40,editable:false}));			// ++ 2018.12.07 :: Input Confirm - PREP V1.0.1
   		FrmCnf.addContent(new sap.m.Label({text:'Set'}));																	// ++ 2018.10.04 :: Input Confirm V1.2.2
   		FrmCnf.addContent(new sap.m.Input({id:id+'InpTCharg2',value:'',visible:false}));									// Add input field 'InpTCharg2' for edit set no.
   		FrmCnf.addContent(new sap.m.Label({text:'Prd. Date'}));
   		FrmCnf.addContent(new sap.m.Input({id:id+'InpTJuldat',value:'{/head/juldat}',maxLength:3}));
   		FrmCnf.addContent(new sap.m.Input({id:id+'InpTAprio',value:'{/head/aprio}',maxLength:1}));	
   		FrmCnf.addContent(new sap.m.Label({text:'Start'}));
   		FrmCnf.addContent(oCon.getDatePicker(id+'InpTDate'));
   		FrmCnf.addContent(oCon.getTimePicker(id+'InpTTime'));
		var DiaCnf = new sap.m.Dialog({
			id				: id+'DiaCnf',
			customHeader	: new sap.m.Bar({contentLeft:	[],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){DiaCnf.close();},})]}),
			contentWidth	: '650px',
			// ++ 2018.10.04 :: Input Confirm V1.2.2 :: Change beginButton & endButton to button / add button 'btnTEdit'
			//beginButton		: new sap.m.Button({id:id+'btnTRfh',icon:"sap-icon://refresh",text:'Tmb. Batch',press:oCon.ui5Dispatch}),
			//endButton		: new sap.m.Button({id:id+'btnTSave',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch}),
		    buttons			: [new sap.m.Button({id:id+'btnTEdit',icon:"sap-icon://edit",text:'Edit',press:oCon.ui5Dispatch}),
		    				   new sap.m.Button({id:id+'btnTRfh',icon:"sap-icon://refresh",text:'Cnf-Text',press:oCon.ui5Dispatch}),
		    				   new sap.m.Button({id:id+'btnTSave',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch}),],
		    content			: [FrmCnf],
		});
		return DiaCnf;
	},
	
	
});