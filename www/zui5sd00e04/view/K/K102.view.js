sap.ui.jsview("zui5sd00e04.view.K.K102", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.K.K102
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.K.K102";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.K.K102
	*/
	createContent : function(oController) {
		
	//	-------------------------------------------------------------------------------
	// 	Edit Table
	//	-------------------------------------------------------------------------------

		var k102chkPrn = new sap.m.Input({id:'k102chkPrn',value:'',visible:false}); 
		
		var k102RowOvw = new sap.m.ColumnListItem({
			cells	:[ new sap.m.ObjectIdentifier({title:'{lenum}',
											   	   text :'{matnr} {maktx}'}),
					   new sap.m.ObjectIdentifier({title:'{menge} {meins}',
		     		   						       text :'{charg} {vfdat}'}),
		     		   // new sap.m.Link({text:'{menge}',press:oController.fcodeEdt}),
		     		   new sap.m.Input({value:'{menge_n}',type:'Number'})]
					   // new sap.m.ObjectIdentifier({title:'{meins}',
		     		   //						   text :''})]
		}); 
		var k102TblOvw = new sap.m.Table({
			id						: "k102TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.MultiSelect,
			columns					: [oCon.getCol('30','SU','','','k102TblOvw','lenum'),
			       		   			   oCon.getCol('35','Qty','','','k102TblOvw','matnr'),
			       		   			   oCon.getCol('35','Adjust Qty','','','k102TblOvw','menge')],
			       		   			   // oCon.getCol('15','','','','k102TblOvw','meins')],
			items					: {path:"/t_k_sckgro",template:k102RowOvw},
		});
		
		
	//	-------------------------------------------------------------------------------
	//	Page
	//	-------------------------------------------------------------------------------
		
   		var k102DiaEdt    	= oCon.getDialogEditInp('k102','New SU Qty');
	
	   	var k102schMain   	= oCon.getSchMain('k102','k102TblOvw',['lenum','charg','matnr']);
	   	var k102pullMain  	= oCon.getPullMain('k102','SAPEVT_K102','evt_k102');
		var k102lblTitle  	= new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Print SU from GR"});
		var k102btnBck    	= new sap.m.Button({id:'k102btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var k102btnHom    	= new sap.m.Button({id:'k102btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
		var k102diaPrint    = new sap.m.Button({id:'k102diaPrint',text:"Print",icon:"sap-icon://print",press:oCon.ui5Dispatch});
		var k102page 		= new sap.m.Page({
			id				: 'k102page',
			customHeader	: new sap.m.Bar({contentLeft:	[k102btnBck, k102btnHom],
											 contentMiddle:	[k102lblTitle],
											 contentRight:	[k102diaPrint],}),
			content			: [k102pullMain,k102schMain,k102TblOvw]
		});
   		
	// 	-------------------------------------------------------------------------------
	// 	Return
	//	-------------------------------------------------------------------------------
		
		this.setDisplayBlock(true);
		return [k102page];
	}
});   