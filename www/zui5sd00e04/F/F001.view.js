sap.ui.jsview("zui5sd00e04.F.F001", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.F.F001
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.F.F001";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.F.F001
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Login Form: iOrder URL
		//-------------------------------------------------------------------------------		
		//Tile Menu
		var f001til = new sap.m.TileContainer({id:'f001til'});
		f001til.addTile(new sap.m.StandardTile({
			id      	: 'f001til01',
            icon		: 'sap-icon://shipping-status',
            title		: 'Weight by Ingredient for Premix',
            info		: '',
            infoState   : 'Success',
            type		: sap.m.StandardTileType.Monitor,
            press		: oCon.ui5Dispatch,
        }));
		f001til.addTile(new sap.m.StandardTile({
			id      	: 'f001til02',
            icon		: 'sap-icon://lab',
            title		: 'Weight by Premix',
            info		: '',
            infoState   : 'Success',
            type		: sap.m.StandardTileType.Monitor,
            press		: oCon.ui5Dispatch,
        }));
		f001til.addTile(new sap.m.StandardTile({
			id      	: 'f001til03',
            icon		: 'sap-icon://cart-3',
            title		: 'Weight by Ingredient for Production',
            info		: '',
            infoState   : 'Success',
            press		: oCon.ui5Dispatch,
            type		: sap.m.StandardTileType.Monitor,
        }));
		f001til.addTile(new sap.m.StandardTile({
			id      	: 'f001til05',
            icon		: 'sap-icon://bar-code',
            title		: 'Weight and Print Sticker',
            info		: '',
            infoState   : 'Success',
            press		: oCon.ui5Dispatch,
            type		: sap.m.StandardTileType.Monitor,
        }));
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var f001lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Ingredient Weighing"});
		var f001btnBck    = new sap.m.Button({id:'f001btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var f001page = new sap.m.Page({
			id				: 'f001page',
			enableScrolling	: false,
			customHeader	: new sap.m.Bar({contentLeft:	[f001btnBck],
											 contentMiddle:	[f001lblTitle],
											 contentRight:	[],}),
			content			: [f001til]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [f001page];
	}

});