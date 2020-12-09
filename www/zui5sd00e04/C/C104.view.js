sap.ui.jsview("zui5sd00e04.C.C104", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.C104
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.C.C104";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.C104
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Process Order
		//-------------------------------------------------------------------------------
		var c104RowPmx = new sap.m.ColumnListItem({
			cells	:[ new sap.m.ObjectIdentifier({title : '{matnr_fg}',
			     		   						   text  : '{maktx_fg}' }),
			     	   new sap.m.Input({value:'{menge_pkg}',type:"Number"}),
			     	   new sap.m.ObjectIdentifier({title : '{meins_kgx}'}),
			     	 ]
		}); 
   		var c104TblPmx = new sap.m.Table({
   			id						: "c104TblPmx",
   			columns		: [oCon.getCol('07','FG','','','c104TblPmx','matnr_fg'),
   			       		   oCon.getCol('99','KG/Set','100px'),
   			       		   oCon.getCol('02','UoM'),],
   			items		: {path:"/t_c_xoring",template:c104RowPmx},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var c104schMain   = oCon.getSchMain('c104','c104TblPmx',['matnr_fg','maktx_fg']);
   		var c104pullMain  = oCon.getPullMain('c104','SAPEVT_C107','evt_c107');
   		
		var c104lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Edit KG/Set"});
		var c104btnSav    = new sap.m.Button({id:'c104btnSav',icon:"sap-icon://save",text:'Save',press:oCon.ui5Dispatch});
		var c104btnBck    = new sap.m.Button({id:'c104btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var c104page = new sap.m.Page({
			id				: 'c104page',
			customHeader	: new sap.m.Bar({contentLeft:	[c104btnBck],
											 contentMiddle:	[c104lblTitle],
											 contentRight:	[c104btnSav],}),
			content			: [c104pullMain,c104schMain,c104TblPmx]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [c104page];
	}

});