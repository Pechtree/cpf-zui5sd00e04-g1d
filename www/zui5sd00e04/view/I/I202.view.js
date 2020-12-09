sap.ui.jsview("zui5sd00e04.view.I.I202", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I202
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I202";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I202
	*/ 
	createContent : function(oController) {
	
	//	-------------------------------------------------------------------------------
	//	Table - Batch List
	//	-------------------------------------------------------------------------------
		
		var i202RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},{path:'aprio'}]},
												  text : {path:"gstrp",formatter:oFmt.fmtDate}}),
					  new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : '{matnr_fg} {maktx_fg}'}),
					  new sap.m.ObjectIdentifier({title: '{charg}',
											      text : {path:"vfdat",formatter:oFmt.fmtDate}}),
					  new sap.m.ObjectIdentifier({title: '{menge_ckg}',
												  text : '{meins_kgx}'}),],
		}); 
   		var i202TblBat = new sap.m.Table({
   			id			: "i202TblBat",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Order','','','i202TblBat','aufnr'),
   			       		   oCon.getCol('07','{i18n>COL_RAWMAT}','','','i202TblBat','matnr_in'),
   			       		   oCon.getCol('08','Batch','','','i202TblBat','charg'),
   			       		   oCon.getCol('02','Cnf-in')],
   			items		: {path:"/t_i_pcibat",template:i202RowIng},
   		});	
   		
   	//	-------------------------------------------------------------------------------
	//	Dialog Confirm
	//	-------------------------------------------------------------------------------
   		
   		var i202FrmCnf = oCon.getForm(2);
   		i202FrmCnf.addContent(new sap.m.Label({text:'Order'}));
   		i202FrmCnf.addContent(new sap.m.Input({id:'i202InpAufnrB',editable:false}));
   		i202FrmCnf.addContent(new sap.m.Label({text:'New Order'}));
   		i202FrmCnf.addContent(new sap.m.Input({id:'i202InpAufnrT'}));
		var i202DiaCnf = new sap.m.Dialog({
			id				: 'i202DiaCnf',
			customHeader	: new sap.m.Bar({contentLeft:	[],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){i202DiaCnf.close();},})]}),
			contentWidth	: '650px',
		    beginButton		: new sap.m.Button({id:'i202btnSave',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch}),
		    content			: [i202FrmCnf],
		});
   		
	//	-------------------------------------------------------------------------------
	//	Dialog Edit
	//	-------------------------------------------------------------------------------

		var i202FrmEdt = oCon.getForm(2);
		var ItmArbpl = new sap.ui.core.ListItem({key:'{key}',text:'{value}',additionalText:'{key}'});
		i202FrmEdt.addContent(new sap.m.Label({text:'Resource'}));	
		i202FrmEdt.addContent(new sap.m.Select({
			id		:"i202InpArbpl",
			showSecondaryValues : true,
			selectedKey	: '{/head/arbpl}',
			items	: {path:"/t_crhd",template:ItmArbpl},
		}));
		i202FrmEdt.addContent(new sap.m.Label({text:'Yield'}));
		i202FrmEdt.addContent(new sap.m.Input({id:'i202InpYield',value:'{/t_i_pcicnf/0/lmnga}'}));
		i202FrmEdt.addContent(new sap.m.Input({id:'i202InpMeins',value:'{/t_i_pcicnf/0/meinh}'}));
		i202FrmEdt.addContent(new sap.m.Label({text:'Start'}));
		i202FrmEdt.addContent(oCon.getDatePicker('i202InpSDate'));
		i202FrmEdt.addContent(oCon.getTimePicker('i202InpSTime'));
		i202FrmEdt.addContent(new sap.m.Label({text:'Finish'}));
		i202FrmEdt.addContent(oCon.getDatePicker('i202InpFDate'));
		i202FrmEdt.addContent(oCon.getTimePicker('i202InpFTime'));
		i202FrmEdt.addContent(new sap.m.Label({text:'Employee'}));
		i202FrmEdt.addContent(new sap.m.Input({id:'i202InpAnzma',value:'{/t_i_pcicnf/0/anzma}'}));
		i202FrmEdt.addContent(new sap.m.Label({text:'Labour'}));
		i202FrmEdt.addContent(new sap.m.Input({id:'i202InpLaborQ',type:"Number",value:'{/t_i_pcicnf/0/ism01}'}));
		i202FrmEdt.addContent(new sap.m.Input({id:'i202InpLaborU',value:'{/t_i_pcicnf/0/ile02}',editable:false}));
		i202FrmEdt.addContent(new sap.m.Label({text:'Machine'}));
		i202FrmEdt.addContent(new sap.m.Input({id:'i202InpMech1Q',type:"Number",value:'{/t_i_pcicnf/0/ism02}'}));
		i202FrmEdt.addContent(new sap.m.Input({id:'i202InpMech1U',value:'{/t_i_pcicnf/0/ile02}',editable:false}));
		var i202DiaEdt = new sap.m.Dialog({
			id				: 'i202DiaEdt',
			customHeader	: new sap.m.Bar({contentLeft:	[],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){i202DiaEdt.close();},})]}),
			contentWidth	: '650px',
		    beginButton		: new sap.m.Button({id:'i202btnEdtRfh',icon:"sap-icon://simulate",text:'Refresh',press:oCon.ui5Dispatch}),
		    endButton		: new sap.m.Button({id:'i202btnEdtSave',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch}),
		    content			: [i202FrmEdt],
		});
	
   	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
		
   		var i202pullMain   = oCon.getSchMain('i202','i202TblBat',['matnr_fg','maktx_fg']);
   		var i202schMain  = oCon.getPullMain('i202','SAPEVT_I202','evt_i202');
   		
		var i202lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Actual Component"});
		var i202btnDel    = new sap.m.Button({id:'i202btnDel',icon:"sap-icon://decline",text:"Cancel",press:oCon.ui5Dispatch});
		var i202btnOrd    = new sap.m.Button({id:'i202btnOrd',icon:"sap-icon://cancel-share",text:"Cancel to Ord",press:oCon.ui5Dispatch});
		var i202btnCan    = new sap.m.Button({id:'i202btnCan',icon:"sap-icon://decline",text:"Conf. In",press:oCon.ui5Dispatch});
		var i202btnEdt    = new sap.m.Button({id:'i202btnEdt',icon:"sap-icon://edit",text:"Edit",press:oCon.ui5Dispatch});		// ++ 2018.11.15 :: Confirmation Overview V1.3.0
		var i202btnBck    = new sap.m.Button({id:'i202btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i202page = new sap.m.Page({
			id				: 'i202page',
			customHeader	: new sap.m.Bar({contentLeft:	[i202btnBck],
											 contentMiddle:	[i202lblTitle],
											 contentRight:	[i202btnEdt,i202btnDel,i202btnOrd,i202btnCan],}),
			content			: [i202pullMain,i202schMain,i202TblBat]
		});	
	//	-------------------------------------------------------------------------------
	//	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [i202page];
	}

});