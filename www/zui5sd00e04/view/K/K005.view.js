sap.ui.jsview("zui5sd00e04.view.K.K005", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.K005
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.K.K005";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.K005
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var k005RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: {path:'mblnr',formatter:oFmt.fmtAlpha},
					  							  text : '{matnr_px} {maktx_px} ({seta})'}),
			     	  new sap.m.ObjectIdentifier({title: '{menge_pkg}',
			     		  						  text : ''}),
			     	  new sap.m.ObjectIdentifier({title: '{charg}',
			     		  					      text : {path:'vfdat',formatter:oFmt.fmtDate}}),
			     	  new sap.m.ObjectIdentifier({title: '{menge_ikg}',
			     		  						  text : '{meins_kgx}'}),]
		}); 
   		var k005TblBck = new sap.m.Table({
   			id						: "k005TblBck",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','MatDoc','','','g003TblBck','mblnr'),
   			       		   oCon.getCol('02','Kg/Set'),
   			       		   oCon.getCol('08','Batch','','','g003TblBck','charg'),
   			       		   oCon.getCol('02','Qty'),],
   			items		: {path:"/t_k_sckbck",template:k005RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   	
   		var k005diaPrint  = oApp.diaPrint('k005');
		var k005btnDate	  = oCon.getBtnDate('k005');
		var k005DiaDate   = oCon.getDialogDate('k005',"SAPEVT_K005","evt_k005");
   		var k005schMain   = oCon.getSchMain('k005','k005TblBck',['matnr_in','piknr']);
   		var k005pullMain  = oCon.getPullMain('k005','SAPEVT_K005','evt_k005');
   		
		var k005lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Premix Finishing"});
		var k005btnBck    = new sap.m.Button({id:'k005btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var k005page = new sap.m.Page({
			id				: 'k005page',
			customHeader	: new sap.m.Bar({contentLeft:	[k005btnBck,k005btnDate],
											 contentMiddle:	[k005lblTitle],
											 contentRight:	[],}),
			content			: [k005pullMain,k005schMain,k005TblBck]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [k005page];
	}

});