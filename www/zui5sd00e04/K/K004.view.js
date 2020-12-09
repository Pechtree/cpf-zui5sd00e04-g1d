sap.ui.jsview("zui5sd00e04.K.K004", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.K004
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.K.K004";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.K004
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var k004RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title  : {parts:[{path:'aufnr',formatter:oFmt.fmtAlpha},{path:'aprio'}]},
					  							  text	 : {path:"gstrp",formatter:oFmt.fmtDate}}),
			     	  new sap.m.ObjectIdentifier({title:'{matnr_in} {maktx_in}',
			     		  						  text :'{matnr_fg} {maktx_fg}'}),
			     	  new sap.m.ObjectIdentifier({title:'{charg}',
			     		  						  text : {path:'vfdat',formatter:oFmt.fmtDate},}),
			     	  new sap.m.ObjectIdentifier({title:'{menge_pkg}',
			     			  					  text : '{seta}'}),]
		}); 
   		var k004TblWei = new sap.m.Table({
   			id						: "k004TblWei",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Order','','','k004TblWei','aufnr'),
   			       		   oCon.getCol('07','Ing','','','k004TblWei','matnr_in'),
   			       		   oCon.getCol('08','Batch','','','k004TblWei','charg'),
   			       	       oCon.getCol('02','Qty/SET'),],
   			items		: {path:"/t_k_sckwei",template:k004RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   
   		var k004diaPrint  = oApp.diaPrint('k004');
		var k004btnDate	  = oCon.getBtnDate('k004');
		var k004DiaDate   = oCon.getDialogDate('k004',"SAPEVT_K004","evt_k004");
   		var k004schMain   = oCon.getSchMain('k004','k004TblWei',['aufnr','matnr_in','maktx_in','charg']);
   		var k004pullMain  = oCon.getPullMain('k004','SAPEVT_K004','evt_k004');
   		
		var k004lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Weight Confirmation"});
		var k004btnBck    = new sap.m.Button({id:'k004btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var k004page = new sap.m.Page({
			id				: 'k004page',
			customHeader	: new sap.m.Bar({contentLeft:	[k004btnBck,k004btnDate],
											 contentMiddle:	[k004lblTitle],
											 contentRight:	[],}),
			content			: [k004pullMain,k004schMain,k004TblWei]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [k004page];
	}

});