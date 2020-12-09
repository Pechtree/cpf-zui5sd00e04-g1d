sap.ui.jsview("zui5sd00e04.K.K003", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.K.K003
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.K.K003";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.K.K003
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var k003RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: {path:'piknr',formatter:oFmt.fmtAlpha},
												  text : '{matnr_in} {maktx_in}'}),
			     	  new sap.m.ObjectIdentifier({title: '{charg}', 
			     		  						  text : {path:'vfdat',formatter:oFmt.fmtDate}}),
			     	  new sap.m.ObjectIdentifier({title: '{menge_opk}', 
			     		  						  text : '{meins_pkx}'}),]
		}); 
   		var k003TblOvw = new sap.m.Table({
   			id						: "k003TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','Pick','','','k003TblOvw','piknr'),
   			       		   oCon.getCol('08','A.Batch','','','k003TblOvw','charg'),
   			       		   oCon.getCol('02','A.Qty'),],
   			items		: {path:"/t_k_sckbat",template:k003RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//------------------------------------------------------------------------------- 
   		var k003diaPrint  = oApp.diaPrint('k003');
   		var k003schMain   = oCon.getSchMain('k003','k003TblOvw',['matnr_in','piknr']);
   		var k003pullMain  = oCon.getPullMain('k003','SAPEVT_K003','evt_k003');
   		
		var k003lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Print from Picking"});
		var k003btnBck    = new sap.m.Button({id:'k003btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var k003page = new sap.m.Page({
			id				: 'k003page',
			customHeader	: new sap.m.Bar({contentLeft:	[k003btnBck],
											 contentMiddle:	[k003lblTitle],
											 contentRight:	[],}),
			content			: [k003pullMain,k003schMain,k003TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [k003page];
	}

});