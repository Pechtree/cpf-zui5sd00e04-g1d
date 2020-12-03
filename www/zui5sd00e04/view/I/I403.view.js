sap.ui.jsview("zui5sd00e04.view.I.I403", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.I.I403
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I403";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.I.I403
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Confirm - in
		//-------------------------------------------------------------------------------
		var i403RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{ltxa1}',															// ++ 2018.12.12 :: Output Confirm - COOK V1.0.1
					  //new sap.m.ObjectIdentifier({title: '{charg}',					      								// -- 2018.12.12 :: Output Confirm - COOK V1.0.1
											      text : ''}),
					  new sap.m.ObjectIdentifier({title: '{ktext}',
					                              text : {path:"iedz",formatter:oFmt.fmtTime}}),
					  new sap.m.ObjectIdentifier({title: {path:"isdz",formatter:oFmt.fmtTime},
												  text : {path:"iedz_cook",formatter:oFmt.fmtTime}}),],
		}); 
   		var i403TblCnf = new sap.m.Table({
   			id			: "i403TblCnf",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Cnf-in','','','i403TblCnf','charg'),
   			       		   //oCon.getCol('07','FG','','','i403TblCnf','matnr_fg'),,
   			       		   oCon.getCol('08','Preparing','','','i403TblCnf','ktext'),
   			       		   oCon.getCol('08','Cooking','','','i403TblCnf','isdz'),],
   			items		: {path:"/t_i_pcicnf",template:i403RowIng},
   		});	
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var i403schMain   = oCon.getSchMain('i403','i403TblCnf',['charg','arbpl']);
   		var i403pullMain  = oCon.getPullMain('i403','SAPEVT_I403','evt_i403');
   		
		var i403lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Confirmation-in"});
		var i403btnBck    = new sap.m.Button({id:'i403btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i403DiaEdt    	= oCon.getDialogEditInp('i403','SET');
		var i403page = new sap.m.Page({
			id				: 'i403page',
			customHeader	: new sap.m.Bar({contentLeft:	[i403btnBck],
											 contentMiddle:	[i403lblTitle],
											 contentRight:	[]}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [i403pullMain,i403schMain,i403TblCnf]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i403page];
	}

});