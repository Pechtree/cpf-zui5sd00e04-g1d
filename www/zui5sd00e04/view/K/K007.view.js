sap.ui.jsview("zui5sd00e04.view.K.K007", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.K007
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.K.K007";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.K007
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Stock
		//-------------------------------------------------------------------------------
		var k007RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in} {maktx_in}',
												  text : ''}),
			     	  new sap.m.ObjectIdentifier({title: '{charg}', 
			     		  						  text : {path:'vfdat',formatter:oFmt.fmtDate}}),
			     	  new sap.m.ObjectIdentifier({title: '{menge_opk}', 
			     		  						  text : '{meins_pkx}'}),]
		}); 
   		var k007TblOvw = new sap.m.Table({
   			id						: "k007TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','RawMat','','','k007TblOvw','matnr_in'),
   			       		   oCon.getCol('08','A.Batch','','','k007TblOvw','charg'),
   			       		   oCon.getCol('02','A.Qty'),],
   			items		: {path:"/t_k_sckbat",template:k007RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//------------------------------------------------------------------------------- 
   		var k007diaPrint  = oApp.diaPrint('k007');
   		var k007schMain   = oCon.getSchMain('k007','k007TblOvw',['matnr_in','maktx_in','charg','vfdat']);
   		var k007pullMain  = oCon.getPullMain('k007','SAPEVT_K009','evt_k009');
   		
		var k007lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Print from Stock"});
		var k007btnBck    = new sap.m.Button({id:'k007btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var k007btnHom    = new sap.m.Button({id:'k007btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var k007page = new sap.m.Page({
			id				: 'k007page',
			customHeader	: new sap.m.Bar({contentLeft:	[k007btnBck, k007btnHom],
											 contentMiddle:	[k007lblTitle],
											 contentRight:	[],}),
			content			: [k007pullMain,k007schMain,k007TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [k007page];
	}

});