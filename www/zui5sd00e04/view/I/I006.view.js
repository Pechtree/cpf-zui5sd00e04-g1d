sap.ui.jsview("zui5sd00e04.view.I.I006", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.I.I006
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I006";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.I.I006
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Confirm - in
		//-------------------------------------------------------------------------------
		var i006RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{ltxa1}',															// ++ 2018.12.12 :: Input Confirm - PREP V1.0.1
					  //new sap.m.ObjectIdentifier({title: '{charg}',					      								// -- 2018.12.12 :: Input Confirm - PREP V1.0.1
												  text : ''}),
					  new sap.m.ObjectIdentifier({title: '{ktext}',
					                              text : ''}),
					  new sap.m.ObjectIdentifier({title: {path:"isdd",formatter:oFmt.fmtDate},
												  text : {path:"isdz",formatter:oFmt.fmtTime}}),],
		}); 
   		var i006TblCnf = new sap.m.Table({
   			id			: "i006TblCnf",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Cnf-in','','','i006TblCnf','charg'),
   			       		   //oCon.getCol('07','FG','','','i006TblCnf','matnr_fg'),,
   			       		   oCon.getCol('08','Resource','','','i006TblCnf','ktext'),
   			       		   oCon.getCol('02','Time'),],
   			items		: {path:"/t_i_pcicnf",template:i006RowIng},
   		});	
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var i006schMain   = oCon.getSchMain('i006','i006TblCnf',['charg','arbpl']);
   		var i006pullMain  = oCon.getPullMain('i006','SAPEVT_I014','evt_i014');
   		
		var i006lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Confirmation-in"});
		var i006btnBck    = new sap.m.Button({id:'i006btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i006btnAdd    = new sap.m.Button({id:'i006btnAdd',icon:"sap-icon://add",press:oCon.ui5Dispatch});
		var i006DiaEdt    	= oCon.getDialogEditInp('i006','SET');
		var i006page = new sap.m.Page({
			id				: 'i006page',
			customHeader	: new sap.m.Bar({contentLeft:	[i006btnBck],
											 contentMiddle:	[i006lblTitle],
											 contentRight:	[i006btnAdd]}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [i006pullMain,i006schMain,i006TblCnf]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i006page];
	}

});