sap.ui.jsview("zui5sd00e04.F.F402", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.F.F402
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.F.F402";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.F.F402
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Ingredient
		//-------------------------------------------------------------------------------
		var f402RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in} ({menge_pkg})',
												  text : '{matnr_px} {maktx_px}'}), 
			     	  new sap.m.ObjectIdentifier({title: '{sets_t}',
			     		                          text : '{menge_rkg}'}),
			     	  new sap.m.ObjectIdentifier({title: '{seta}',
			     		  						  text : '{menge_wkg}'}),
			     	  new sap.m.ObjectIdentifier({title: '{sets_c}',
				     		  				      text : '{menge_ikg}'}), 
			     	  new sap.ui.core.Icon({src:'sap-icon://{icon}',color: '#26A65B',size:'16px'}),]
		}); 
   		var f402TblIng = new sap.m.Table({
   			id			: "f402TblIng",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','Ingredient','','','f402TblIng','matnr_in'),
   			       		   oCon.getCol('02','Total'),
   			       		   oCon.getCol('02','Target'),
   			       		   oCon.getCol('02','Input'),
   			       		   oCon.getCol('02',''),],
   			items		: {path:"/t_f_xwiing",template:f402RowIng},
   		});	
   		//-------------------------------------------------------------------------------
		//Dialog Edit KG/SET
		//------------------------------------------------------------------------------- 
   		var f402frmDiaKG = oCon.getForm(2);
   		f402frmDiaKG.addContent(new sap.m.Label({text:'Premix'}));
   		f402frmDiaKG.addContent(new sap.m.Input({id:'f402inpMatnrPxKG',editable:false}));
   		f402frmDiaKG.addContent(new sap.m.Label({text:'Ingredient'}));
   		f402frmDiaKG.addContent(new sap.m.Input({id:'f402inpMatnrInKG',editable:false}));
   		f402frmDiaKG.addContent(new sap.m.Label({text:'KG/Set'}));
   		f402frmDiaKG.addContent(new sap.m.Input({id:'f402inpMengePkgKGO',editable:false}));
  		f402frmDiaKG.addContent(new sap.m.Label({text:'KG/Set'}));
   		f402frmDiaKG.addContent(new sap.m.Input({id:'f402inpMengePkgKG',type:"Number"}));
		var f402DiaKG = new sap.m.Dialog({
			id				: 'f402DiaKG',
			customHeader	: new sap.m.Bar({contentLeft:	[new sap.m.Text({id:'f402txtPmxnrKG'})],
				 				             contentMiddle:	[],
				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){f402DiaKG.close();},})],}),
		    contentWidth	: '600px',
		    beginButton		: new sap.m.Button({id:'f402btnKGAcp',icon:"sap-icon://accept",text:'Accept',press:oCon.ui5Dispatch}),
			content			: [f402frmDiaKG],
		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var f402txtTot	  = new sap.m.Text({id:'f402txtTot',visible:false});
   		var f402DiaWei    = oApp.diaWeight('f402');
   		var f402DiaEdt    = oCon.getDialogEditInp('f402','SET');
		var f402lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Weight Ingredient"});
		var f402btnEdt    = new sap.m.Button({id:'f402btnEdt',icon:"sap-icon://edit",text:'KG/Set',press:oCon.ui5Dispatch});
		var f402btnWei    = new sap.m.Button({id:'f402btnWei',icon:"sap-icon://unwired",text:'Start Weight',press:oCon.ui5Dispatch});
		var f402btnBck    = new sap.m.Button({id:'f402btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var f402page = new sap.m.Page({
			id				: 'f402page',
			customHeader	: new sap.m.Bar({contentLeft:	[f402btnBck],
											 contentMiddle:	[f402lblTitle],
											 contentRight:	[f402btnEdt,f402btnWei],}),
			content			: [f402TblIng]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [f402page];
	}

});