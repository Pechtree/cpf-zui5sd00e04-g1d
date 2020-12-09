sap.ui.jsview("zui5sd00e04.G.G005", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.G005
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.G.G005";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.G005
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table - Ingredient
		//-------------------------------------------------------------------------------
		var g005RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in}',text:'{maktx_in}'}), 
			     	  new sap.m.ObjectIdentifier({title: '{charg}',
	  						  				      text : {path:'vfdat',formatter:oFmt.fmtDate}}),
	  				  new sap.m.ObjectIdentifier({title: '{menge_ikg}',
				     		  				      text : '{meins_kgx}'}),]
		}); 
   		var g005TblIng = new sap.m.Table({
   			id			: "g005TblIng",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','Ingredient','','','g005TblIng','matnr_in'),
   			       		   oCon.getCol('08','Batch','','','g005TblIng','charg'),
   			       		   oCon.getCol('02','Qty'),],
   			items		: {path:"/t_g_xbfing",template:g005RowIng},
   		});		
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var g005lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Confirm Backflush"});
		var g005btnBfk	  = new sap.m.Button({id:'g005btnBfk',icon:"sap-icon://lab",text:'Backflush',press:oCon.ui5Dispatch});
		var g005btnBck    = new sap.m.Button({id:'g005btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var g005page = new sap.m.Page({
			id				: 'g005page',
			customHeader	: new sap.m.Bar({contentLeft:	[g005btnBck],
											 contentMiddle:	[g005lblTitle],
											 contentRight:	[g005btnBfk],}),
			content			: [g005TblIng]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [g005page];
	}

});