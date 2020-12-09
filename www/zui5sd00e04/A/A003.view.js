sap.ui.jsview("zui5sd00e04.A.A003", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.A.A003
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.A.A003";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.A.A003
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Tile Menu
		//-------------------------------------------------------------------------------
		var a003til = new sap.m.TileContainer({id:'a003til'});
		
		//----------------------------------------------------------------- GR
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilB000',
            icon		: 'images/truck.png',
            title		: 'GR to Ingredient Warehouse',
            info		: '{i18n>TXT_WHOU}',
            infoState   : 'Success',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));
		
		//----------------------------------------------------------------- Premix Orders
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilC100',
            icon		: 'sap-icon://lab',
            title		: 'Premix Order For Process Order',
            info		: '{i18n>TXT_PROD}',
            infoState   : 'Error',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilC200',
            icon		: 'sap-icon://lab',
            title		: 'Premix Order For Safety Stock',
            info		: '{i18n>TXT_PRMX}',
            infoState   : 'Error',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilC103',
            icon		: 'sap-icon://display',
            title		: 'Premix Orders Overview for Production',
            info		: '{i18n>TXT_PROD}',
            infoState   : 'Error',
            press		: oCon.ui5Dispatch,
            type		: sap.m.StandardTileType.Monitor,
            visible		: false,
        }));
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilC300',
			 icon		: 'sap-icon://display',
			title		: 'Premix Orders Overiew for Premix',
			info		: '{i18n>TXT_PRMX}',
            infoState   : 'Warning',
            press		: oCon.ui5Dispatch,
            type		: sap.m.StandardTileType.Monitor,
            visible		: false,
        }));
		
		//----------------------------------------------------------------- Transfer Orders
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilD400',
            icon		: 'sap-icon://step',
            title		: 'Stock Transfer Order For Premix',
            info		: '{i18n>TXT_PRMX}',
            infoState   : 'Warning',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilD200',
            icon		: 'sap-icon://step',
            title		: 'Stock Transfer Order For Production',
            info		: '{i18n>TXT_PROD}',
            infoState   : 'Warning',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilD104',
            icon		: 'sap-icon://step',
            title		: 'Stock Transfer Order Overview for Premix',
            info		: '{i18n>TXT_PRMX}',
            infoState   : 'Warning',
            press		: oCon.ui5Dispatch,
            type		: sap.m.StandardTileType.Monitor,
            visible		: false,
        }));
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilD300',
            icon		: 'sap-icon://step',
            title		: 'Stock Transfer Order Overview for Production',
            info		: '{i18n>TXT_PROD}',
            infoState   : 'Warning',
            press		: oCon.ui5Dispatch,
            type		: sap.m.StandardTileType.Monitor,
            visible		: false,
        }));
		
		
		//----------------------------------------------------------------- Picking
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilE300',
            icon		: 'sap-icon://accept',
            title		: 'Picking Order',
            info		: '{i18n>TXT_WHOU}',
            infoState   : 'Success',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilE200',
	        icon		: 'sap-icon://accept',
	        title		: 'Close Picking Order',
	        info		: '{i18n>TXT_WHOU}',
	        infoState   : 'Success',
	        press		: oCon.ui5Dispatch,
	        type		: sap.m.StandardTileType.Monitor,
	        visible		: false,
		}));
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilE100',
            icon		: 'sap-icon://accept',
            title		: 'Picking',
            info		: '{i18n>TXT_WHOU}',
            infoState   : 'Success',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));
		//----------------------------------------------------------------- Premix
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilF000',
            icon		: 'sap-icon://unwired',
            title		: 'Weighing',
            info		: '{i18n>TXT_PRMX}',
            infoState   : 'Warning',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilG000',
            icon		: 'sap-icon://lab',
            title		: 'Finishing',
            info		: '{i18n>TXT_PRMX}',
            infoState   : 'Warning',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));	
		
		//----------------------------------------------------------------- Print Sticker
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilK000',
            icon		: 'sap-icon://print',
            title		: 'Print Sticker',
            //info		: '{i18n>TXT_WHOU}',
            infoState   : 'Success',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));
		//----------------------------------------------------------------- Confirm
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilI200',
            icon		: 'sap-icon://goal',
            title		: 'Confirmation Overview',
            info		: '{i18n>TXT_PROD}',
            infoState   : 'Error',
            press		: oCon.ui5Dispatch,
            visible		: false,
            type		: sap.m.StandardTileType.Monitor,
        }));
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilI000',
            icon		: 'sap-icon://goal',
            title		: 'Input Confirmation',
            info		: '{i18n>TXT_PROD}',
            infoState   : 'Error',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));		
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilI100',
            icon		: 'sap-icon://goal',
            title		: 'Output Confirmation',
            info		: '{i18n>TXT_PROD}',
            infoState   : 'Error',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));
		
		//----------------------------------------------------------------- Transfer
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilH000',
            icon		: 'sap-icon://step',
            title		: 'Stock Transfer/Return',
            info		: '',
            infoState   : 'Warning',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));
		
		//----------------------------------------------------------------- GR for Process Order
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilL000',
            icon		: 'sap-icon://table-view',
            title		: 'GR to FG Warehouse',
            info		: '{i18n>TXT_PROD}',
            infoState   : 'Warning',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));
		a003til.addTile(new sap.m.StandardTile({
			id      	: 'a003tilL100',
            icon		: 'sap-icon://grid',
            title		: 'IR from Process Order',
            info		: '{i18n>TXT_PROD}',
            infoState   : 'Warning',
            press		: oCon.ui5Dispatch,
            visible		: false,
        }));
		
		//-------------------------------------------------------------------------------
		//Main Menu
		//-------------------------------------------------------------------------------
		var a003lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"CPF-SAP"});
		var a003lblFoot   = new sap.m.Label({id:'a003lblFoot',design:sap.m.LabelDesign.Bold,text:"{/head/ftitle}"});
		var a003btnSet    = new sap.m.Button({id:'a003btnSet',text:"Settings",icon:"sap-icon://action-settings",press:oCon.ui5Dispatch});
		var a003btnLst    = new sap.m.Button({id:'a003btnLst',text:"List",icon:"sap-icon://menu",press:oCon.ui5Dispatch});
		var a003page = new sap.m.Page({
			id				: 'a003page',
			enableScrolling	: false,
			customHeader	: new sap.m.Bar({contentLeft:	[a003btnSet],
											 contentMiddle: [a003lblTitle],
											 contentRight:	[a003btnLst]}),
			footer			: new sap.m.Bar({contentLeft:	[],
										     contentMiddle:	[a003lblFoot],
											 contentRight:	[]}),
			content			: [a003til]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [a003page];
	}

});