sap.ui.jsview("zui5sd00e04.view.K.K006", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.K006
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.K.K006";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.K006
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------

		var k006inpCheck = new sap.m.Input({id:'k006inpCheck',value:'',visible:false});
		var k006inpSeqpk = new sap.m.Input({id:'k006inpSeqpk',value:'',visible:false});
		var k006inpPospk = new sap.m.Input({id:'k006inpPospk',value:'',visible:false});
		
		var k006RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:{path:'piknr',formatter:oFmt.fmtAlpha},
												  text :'{ernam}'}),
			     	  new sap.m.ObjectIdentifier({title:{path:'erdat'},
			     		  						  text :{path:'erzet',formatter:oFmt.fmtTime}}),
			     	  new sap.ui.core.Icon({src:'sap-icon://{icon}',color: '#95A5A6',size:'16px'}),
			     	  new sap.m.ObjectIdentifier({title:'{pospk}',
	  						  					  text :''}),]
		}); 
   		var k006TblOvw = new sap.m.Table({
   			id						: "k006TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('08','Picking','','','k006TblOvw','piknr'),
   			       		   oCon.getCol('08','Date/Time','','','k006TblOvw','erdat'),
   			       		   oCon.getCol('03',''),],
   			items		: {path:"/t_k_sckpik",template:k006RowOvw},
   		});
		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------   

		var k006btnDate	  = oCon.getBtnDate('k006');
		var k006DiaDate   = oCon.getDialogDate('k006',"SAPEVT_K008","evt_k008");
   		var k006schMain   = oCon.getSchMain('k006','k006TblOvw',['piknr','ernam','erdat']);
   		var k006pullMain  = oCon.getPullMain('k006','SAPEVT_K008','evt_k008');
		var k006lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Picking Order - Print"});
		var k006btnBck    = new sap.m.Button({id:'k006btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var k006page = new sap.m.Page({
			id				: 'k006page',
			customHeader	: new sap.m.Bar({contentLeft:	[k006btnBck,k006btnDate],
											 contentMiddle:	[k006lblTitle],
											 contentRight:	[],}),
			content			: [k006pullMain,k006schMain,k006TblOvw]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [k006page];
	}

});