sap.ui.jsview("zui5sd00e04.view.D.D704", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.D.D704
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D704";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.D.D704
	*/ 
	createContent : function(oController) {
		
		//	-------------------------------------------------------------------------------
		//	Overview Table
		//	-------------------------------------------------------------------------------
		
			var d704btnOth = new sap.m.Button({							// ++ 2018.01.16 :: TFR-OthPlant V1.7
				id				:'d704btnOth',
				text			:"Other",
				icon			:"sap-icon://add-product",
				press			:oCon.ui5Dispatch
			});			

			var d704RowOvw = new sap.m.StandardListItem({
				title			: "{matnr}",
				info			: "{maktx}",
				icon			: "sap-icon://example",
				type 			: sap.m.ListType.Navigation,
			});
			var d704TblOvw = new sap.m.List({
				id				: 'd704TblOvw',
				mode			: sap.m.ListMode.SingleSelectMaster,
				itemPress		: oCon.ui5Dispatch,
				items			: {path:"/t_d_xrsmat",template:d704RowOvw},
			});
	   	
		//	-------------------------------------------------------------------------------
		// 	Dialog Add Material
	   	//	-------------------------------------------------------------------------------
	   		
	   		var d704FrmAdd = oCon.getForm(3);
	   		d704FrmAdd.addContent(new sap.m.Label({text:'Material'}));
	   		d704FrmAdd.addContent(new sap.m.Input({id:'d704inpMatnr',type:"Number"})); 
	   		d704FrmAdd.addContent(new sap.m.Label({text:'Qty'}));
	   		d704FrmAdd.addContent(new sap.m.Input({id:'d704inpMenge',type:"Number"}));
	   		d704FrmAdd.addContent(new sap.m.Label({text:'UOM'}));
	   		d704FrmAdd.addContent(new sap.m.Input({id:'d704inpMeins'}));
	   		var d704DiaAdd = new sap.m.Dialog({
	   			id				: 'd704DiaAdd',
	   			customHeader	: new sap.m.Bar({contentLeft:	[],
	   				 				             contentMiddle:	[new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Add Material"})],
	   				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){d704DiaAdd.close();},})],}),
	   			contentWidth	: '550px',
	   		    beginButton		: new sap.m.Button({id:'d704btnAcp',icon:"sap-icon://accept",text:'Accept',press:oCon.ui5Dispatch}),
	   		    content			: [d704FrmAdd],
	   		});
	   		
		//	-------------------------------------------------------------------------------
		//	Page
		//	-------------------------------------------------------------------------------
	   		
	   		var d704schMain   = oCon.getSchMain('d704','d704TblOvw',['matnr','maktx']); 
			var d704lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Material List"});
			var d704btnBck    = new sap.m.Button({id:'d704btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
			var d704btnHom    = new sap.m.Button({id:'d704btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
			var d704btnAdd    = new sap.m.Button({id:'d704btnAdd',icon:"sap-icon://add",press:oCon.ui5Dispatch});
			var d704page = new sap.m.Page({
				id				: 'd704page',
				customHeader	: new sap.m.Bar({contentLeft:	[d704btnBck, d704btnHom],
												 contentMiddle:	[d704lblTitle],
												 contentRight:	[d704btnOth]}),
				content			: [d704schMain, d704TblOvw, d704DiaAdd]
			});	
	   		
		//	-------------------------------------------------------------------------------	
		//	Return
		//	-------------------------------------------------------------------------------
			
			this.setDisplayBlock(true);
			return [d704page];
		}
	});