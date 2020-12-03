sap.ui.jsview("zui5sd00e04.view.K.K001", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.K.K001
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.K.K001";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.K.K001
	*/ 
	createContent : function(oController) {
		//Login Form: iOrder URL
		//-------------------------------------------------------------------------------		
		//Tile Menu
		var k001til = new sap.m.TileContainer({id:'k001til'});
		k001til.addTile(new sap.m.StandardTile({
			id      	: 'k001til01',
            //icon		: 'sap-icon://shipping-status',
            icon		: 'sap-icon://print',
            title		: 'Print Sticker From GR',
            info		: '',
            infoState   : 'Success',
            press		: oCon.ui5Dispatch,
        }));
		k001til.addTile(new sap.m.StandardTile({
			id      	: 'k001til02',
            //icon		: 'sap-icon://time-entry-request',
            icon		: 'sap-icon://print',
            title		: 'Print Sticker From Picking Confirmation',
            info		: '',
            infoState   : 'Success',
            press		: oCon.ui5Dispatch,
        }));
		k001til.addTile(new sap.m.StandardTile({
			id      	: 'k001til03',
            //icon		: 'sap-icon://unwired',
            icon		: 'sap-icon://print',
            title		: 'Print Sticker From Weight Confirmation',
            info		: '',
            infoState   : 'Success',
            press		: oCon.ui5Dispatch,
        }));
		k001til.addTile(new sap.m.StandardTile({
			id      	: 'k001til04',
            //icon		: 'sap-icon://lab',
            icon		: 'sap-icon://print',
            title		: 'Print Sticker From Premix Finishing',
            info		: '',
            infoState   : 'Success',
            press		: oCon.ui5Dispatch,
        }));
		k001til.addTile(new sap.m.StandardTile({
			id      	: 'k001til05',
            //icon		: 'sap-icon://product',
            icon		: 'sap-icon://print',
            title		: 'Print Sticker from Stock',
            info		: '',
            infoState   : 'Success',
            press		: oCon.ui5Dispatch,
        }));
		k001til.addTile(new sap.m.StandardTile({
			id      	: 'k001til06',
            //icon		: 'sap-icon://shipping-status',
            icon		: 'sap-icon://print',
            title		: 'Print SU From GR',
            info		: '',
            infoState   : 'Success',
            press		: oCon.ui5Dispatch,
        }));
		k001til.addTile(new sap.m.StandardTile({
			id      	: 'k001til07',
            //icon		: 'sap-icon://shipping-status',
            icon		: 'sap-icon://print',
            title		: 'Print SU From WM',
            info		: '',
            infoState   : 'Success',
            press		: oCon.ui5Dispatch,
        }));
		k001til.addTile(new sap.m.StandardTile({
			id      	: 'k001til08',
            //icon		: 'sap-icon://shipping-status',
            icon		: 'sap-icon://print',
            title		: 'Print LPN From GR',
            info		: '',
            infoState   : 'Success',
            press		: oCon.ui5Dispatch,
        }));
		//Page
		//-------------------------------------------------------------------------------
		var k001lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Print Sticker"});
		var k001btnBck    = new sap.m.Button({id:'k001btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var k001page = new sap.m.Page({
			id				: 'k001page',
			enableScrolling	: false,
			customHeader	: new sap.m.Bar({contentLeft:	[k001btnBck],
											 contentMiddle:	[k001lblTitle],
											 contentRight:	[],}),
			//footer			: new sap.m.Bar({contentMiddle:	[]}),
			content			: [k001til]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [k001page];
	}

});