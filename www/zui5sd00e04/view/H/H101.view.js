sap.ui.jsview("zui5sd00e04.view.H.H101", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.H.H101
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.H.H101";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.H.H101
	*/ 
	createContent : function(oController) {
		
		
		//-------------------------------------------------------------------------------
		//Table: Picking Order
		//-------------------------------------------------------------------------------
		var h101InpQrData = new sap.m.Input({id:'h101InpQrData',visible:true});
		sap.ui.getCore().byId("h101InpQrData").onsapenter = function(oEvt){oCon.ui5DispatchFcode('h101InpQrData');};
		
		var h101InpQrID = new sap.m.Input({id:'h101InpQrID',visible:false});
		var h101InpPiknr = new sap.m.Input({id:'h101InpPiknr',visible:false,value:'Picking Order'});
		var h101InpPospk = new sap.m.Input({id:'h101InpPospk',visible:false,value:'Item'});
		var h101InpSeqpk = new sap.m.Input({id:'h101InpSeqpk',visible:false,value:'Counter'});
		var h101InpMenge = new sap.m.Input({id:'h101InpMenge',visible:false,value:'QTY'});
		var h101InpMeins = new sap.m.Input({id:'h101InpMeins',visible:false,value:'UOM'});
		var h101InpSeta = new sap.m.Input({id:'h101InpSeta',visible:false,value:'Set'});	// ++ 2018.07.09 :: Log 133
		
		var h101InpFlag = new sap.m.Input({id:'h101InpFlag',visible:false});
		
		var h101RowOvw = new sap.m.ColumnListItem({
			type	: sap.m.ListType.Active,
			cells	:[new sap.m.ObjectIdentifier({title:'{matnr_in} {maktx_in} ',
												  text :'{werks} {lgortt} {mvtim} {seta}'}), 
					  new sap.m.ObjectIdentifier({title:'{charg}', 
				     		  					 // text :{parts:[{path:'vfdat',formatter:oFmt.fmtDate},]}}),
			     		  						  text : {path:'vfdat',formatter:oFmt.fmtDate}}), // Edit date format 2018.07.10
			     	  new sap.m.ObjectIdentifier({title:'{menge_opk}', 
			     		  						  text :'{meins_pkx}',}),]
		}); 
   		var h101TblOvw = new sap.m.Table({
   			id						: "h101TblOvw",
			includeItemInSelection	: true, 
			mode					: sap.m.ListMode.SingleSelectMaster,
			itemPress	: oCon.ui5Dispatch,
   			columns		: [oCon.getCol('07','{i18n>COL_RAWMAT}','','','h101TblOvw','matnr_in'),
   			       		   oCon.getCol('06','Batch'),
   			       		   oCon.getCol('02','Qty'),],
   			items		: {path:"/t_h_xtfrim",template:h101RowOvw},
   		});
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
   		var h101schMain   = oCon.getSchMain('h101','h101TblOvw',['matnr_in','maktx_in','charg']);
   		var h101pullMain  = oCon.getPullMain('h101','SAPEVT_H101','evt_h101');
		var h101lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Transfer"});
		var h101btnSav    = new sap.m.Button({id:'h101btnSav',icon:"sap-icon://save",text:'',press:oCon.ui5Dispatch});
		var h101btnCam    = new sap.m.Button({id:'h101btnCam',icon:"sap-icon://camera",text:'',press:oCon.ui5Dispatch});
		var h101btnBck    = new sap.m.Button({id:'h101btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var h101btnDel    = new sap.m.Button({id:'h101btnDel',icon:"sap-icon://delete",press:oCon.ui5Dispatch});
		
		var h101btnTest    = new sap.m.Button({id:'h101btnTest',icon:"sap-icon://bookmark",press:oCon.ui5Dispatch,visible:false});
		
		var h101page = new sap.m.Page({
			id				: 'h101page',
			customHeader	: new sap.m.Bar({contentLeft:	[h101btnBck],
											 contentMiddle:	[h101lblTitle],
											 contentRight:	[h101btnTest,h101btnCam,h101btnDel,h101btnSav],}),
			content			: [h101pullMain,h101InpQrData,h101InpPiknr,h101InpPospk,h101schMain,h101TblOvw,h101InpFlag,
							   h101InpQrID,h101InpMenge,h101InpMeins]

		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [h101page];
 		
 		
	}

});