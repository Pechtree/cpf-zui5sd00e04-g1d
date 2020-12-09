sap.ui.jsview("zui5sd00e04.G.G002", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.G.G002
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.G.G002";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.G.G002
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//QR Field
		//-------------------------------------------------------------------------------
		var g002inpQr = new sap.m.Input({
			id			: 'g002inpQr',
			width 		: '100%',
		});
		sap.ui.getCore().byId("g002inpQr").onsapenter = function(oEvt){oCon.ui5DispatchFcode('g002inpQr');};
		//-------------------------------------------------------------------------------
		//Table - Ingredient
		//-------------------------------------------------------------------------------
		var g002RowIng = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title: '{matnr_in}',
												  text : '{maktx_in}'}), 
			     	  new sap.m.ObjectIdentifier({title: '{sets_t}',
			     		                          text : '{menge_fkg}'}),
			     	  new sap.m.ObjectIdentifier({title: '{sets_c}',
			     		  						  text : '{menge_ikg}'}),
			     	  new sap.ui.core.Icon({src:'sap-icon://{icon}',color: '#26A65B',size:'16px'}),]
		}); 
   		var g002TblIng = new sap.m.Table({
   			id			: "g002TblIng",
   			mode		: sap.m.ListMode.SingleSelectMaster,
   			columns		: [oCon.getCol('07','Ingredient','','','g002TblIng','matnr_in'),
   			       		   oCon.getCol('02','Tar. Set'),
   			       		   oCon.getCol('02','Bck. Set'),
   			       		   oCon.getCol('02',''),],
   			items		: {path:"/t_g_xbfing",template:g002RowIng},
   		});		
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var g002lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Scan Ingredient"});
		var g002btnCam    = new sap.m.Button({id:'g002btnCam',icon:"sap-icon://camera",text:'Scan',press:oCon.ui5Dispatch})
		var g002btnBck    = new sap.m.Button({id:'g002btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var g002page = new sap.m.Page({
			id				: 'g002page',
			customHeader	: new sap.m.Bar({contentLeft:	[g002btnBck],
											 contentMiddle:	[g002lblTitle],
											 contentRight:	[g002btnCam],}),
			content			: [g002inpQr,g002TblIng]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [g002page];
	}

});