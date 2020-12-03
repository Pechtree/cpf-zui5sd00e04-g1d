sap.ui.jsview("zui5sd00e04.view.K.K104", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.K.K104
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.K.K104";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.K.K104
	*/ 
	createContent : function(oController) {
 	
		
		//-------------------------------------------------------------------------------
		//Table: Stock
		//-------------------------------------------------------------------------------
		var k104RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{lenum}',
												  text : '{lgpla}'}),
												  
			     	  new sap.m.ObjectIdentifier({title: '{matnr}', 
			     		  						  text : '{maktx}'}),
			     		  						  
			     	  new sap.m.ObjectIdentifier({title: '{menge} {meins}', 
			     		  						  text :  {parts:[{path:'charg'},
										                  {path:'vfdat',formatter:oFmt.fmtDate}]}}),]
		}); 										
   		var k104TblOvw = new sap.m.Table({
   			id						: "k104TblOvw",
			includeItemInSelection	: true, 
			//mode					: sap.m.ListMode.SingleSelectMaster,
			mode					: sap.m.ListMode.MultiSelect,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','SU#','','','k104TblOvw','lenum'),
   			       		   oCon.getCol('08','Material','','','k104TblOvw','matnr'),
   			       		   oCon.getCol('02','Qty'),],
   			items		: {path:"/t_k_sckfwm",template:k104RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//------------------------------------------------------------------------------- 
   		var k104diaPrint  = oApp.diaPrintSU('k104');
   		var k104schMain   = oCon.getSchMain('k104','k104TblOvw',['lenum','matnr','charg','vfdat']);
   		var k104pullMain  = oCon.getPullMain('k104','SAPEVT_K104','evt_k104');
   		
		var k104lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Print from Stock (WM)"});
		var k104btnBck    = new sap.m.Button({id:'k104btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var k104btnPrint    = new sap.m.Button({id:'k104btnPrint',text:"Print",icon:"sap-icon://print",press:oCon.ui5Dispatch});
		var k104page = new sap.m.Page({
			id				: 'k104page',
			customHeader	: new sap.m.Bar({contentLeft:	[k104btnBck],
											 contentMiddle:	[k104lblTitle],
											 contentRight:	[k104btnPrint],}),
			content			: [k104pullMain,k104schMain,k104TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [k104page];
		
		
	}

});