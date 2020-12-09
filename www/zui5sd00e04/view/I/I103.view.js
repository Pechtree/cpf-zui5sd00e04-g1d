sap.ui.jsview("zui5sd00e04.view.I.I103", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I.I103
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.I.I103";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I.I103
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Confirm - in
		//-------------------------------------------------------------------------------
		var i103RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{ltxa1}',															// ++ 2018.12.12 :: Output Confirm - PREP V1.0.1
				  	  //new sap.m.ObjectIdentifier({title: '{charg}',														// -- 2018.12.12 :: Output Confirm - PREP V1.0.1 	// +- 2018.11.07 :: Output Confirm - PREP V1.0.0 :: Display only charg
											      text : ''}),
					  new sap.m.ObjectIdentifier({title: '{ktext}',															// ++ 2018.11.07 :: Output Confirm - PREP V1.0.0
						                          text : ''}),
					  //new sap.m.ObjectIdentifier({title: '{matnr_fg} {maktx_fg}',
					  //						  text : '{vornr} {bezei}'}),
					  new sap.m.ObjectIdentifier({title: {path:"isdd",formatter:oFmt.fmtDate},
					                              text : {path:"isdz",formatter:oFmt.fmtTime}}),],
					  //new sap.m.ObjectIdentifier({title: '{menge_cst}',													// -- 2018.11.07 :: Output Confirm - PREP V1.0.0
					  //						  text : '{meins_st}'}),
					  //new sap.ui.core.Icon({src:'sap-icon://{icon}',color: '#95A5A6',size:'16px'}),],
		}); 
   		var i103TblCnf = new sap.m.Table({
   			id			: "i103TblCnf",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			includeItemInSelection	: true,
   			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Cnf-in','','','i103TblCnf','charg'),
   			       		   //oCon.getCol('07','FG','','','i103TblCnf','matnr_fg'),,
   			       		   oCon.getCol('08','Resource','','','i103TblCnf','ktext'),
   			       		   oCon.getCol('02','Start','','','i103TblCnf','isdd'),],
   			       		   //oCon.getCol('02','SET'),
   			       		   //oCon.getCol('99','','5%'),],
   			items		: {path:"/t_i_pcicnf",template:i103RowIng},
   		});	
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var i103schMain   = oCon.getSchMain('i103','i103TblCnf',['matnr_fg','maktx_fg']);
   		var i103pullMain  = oCon.getPullMain('i103','SAPEVT_I103','evt_i103');
   		
		var i103lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Select Confirmation-in"});
		var i103btnBck    = new sap.m.Button({id:'i103btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i103page = new sap.m.Page({
			id				: 'i103page',
			customHeader	: new sap.m.Bar({contentLeft:	[i103btnBck],
											 contentMiddle:	[i103lblTitle],
											 contentRight:	[],}),
			footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [i103pullMain,i103schMain,i103TblCnf]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i103page];
	}

});