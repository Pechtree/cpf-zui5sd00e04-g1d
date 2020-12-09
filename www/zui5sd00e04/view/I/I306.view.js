sap.ui.jsview("zui5sd00e04.view.I.I306", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.I.I306
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I306";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.I.I306
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Confirm - in
		//-------------------------------------------------------------------------------
		var i306RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{ltxa1}',															// ++ 2018.12.12 :: Input Confirm - COOK V1.0.1
					  //new sap.m.ObjectIdentifier({title: '{charg}',					      								// -- 2018.12.12 :: Input Confirm - COOK V1.0.1
											      text : '{cnfnr}'}),
					  new sap.m.ObjectIdentifier({title: '{ktext}',
					                              text : {path:"iedz",formatter:oFmt.fmtTime}}),
					  new sap.m.ObjectIdentifier({title: {path:"isdz",formatter:oFmt.fmtTime},
												  text : {path:"iedz_cook",formatter:oFmt.fmtTime}}),],
		}); 
   		var i306TblCnf = new sap.m.Table({
   			id			: "i306TblCnf",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Cnf-in','','','i306TblCnf','charg'),
   			       		   //oCon.getCol('07','FG','','','i306TblCnf','matnr_fg'),,
   			       		   oCon.getCol('08','Preparing','','','i306TblCnf','ktext'),
   			       		   oCon.getCol('08','Cooking','','','i306TblCnf','isdz'),],
   			items		: {path:"/t_i_pcicnf",template:i306RowIng},
   		});	
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var i306schMain   = oCon.getSchMain('i306','i306TblCnf',['charg','arbpl']);
   		var i306pullMain  = oCon.getPullMain('i306','SAPEVT_I314','evt_i314');
   		
		var i306lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Confirmation-in"});
		var i306btnBck    = new sap.m.Button({id:'i306btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i306DiaEdt    	= oCon.getDialogEditInp('i306','SET');
		var i306page = new sap.m.Page({
			id				: 'i306page',
			customHeader	: new sap.m.Bar({contentLeft:	[i306btnBck],
											 contentMiddle:	[i306lblTitle],
											 contentRight:	[]}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [i306pullMain,i306schMain,i306TblCnf]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i306page];
	}

});