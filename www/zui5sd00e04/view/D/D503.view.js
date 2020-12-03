sap.ui.jsview("zui5sd00e04.view.D.D503", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.D.D503
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D503";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.D.D503
	*/ 
	createContent : function(oController) {
		
		//	-------------------------------------------------------------------------------
		//	Overview Table
		//	-------------------------------------------------------------------------------
		
			var d503btnOth    = new sap.m.Button({					// ++ 2018.01.16 :: TFR-NonPRD V1.6
				id		:'d503btnOth',
				text	:"Other",
				icon	:"sap-icon://add-product",
				press	:oCon.ui5Dispatch
			});			
			 
			var d503RowAdd = new sap.m.StandardListItem({			// Additional Requirement
			//	title			: "Add",
			//	icon			: "sap-icon://add",
			//	type 			: sap.m.ListType.Navigation,
			}); 
			
			var d503RowOvw = new sap.m.StandardListItem({
				title			: "{matnr}",
				info			: "{maktx}",
				icon			: "sap-icon://example",
				type 			: sap.m.ListType.Navigation,
			});
			
			var d503TblOvw = new sap.m.List({ 
				id				: 'd503TblOvw',
				mode			: sap.m.ListMode.SingleSelectMaster,
				itemPress		: oCon.ui5Dispatch, 
				items			: {path:"/t_d_xrsmat",template:d503RowOvw},
			});	
	   	
		//	-------------------------------------------------------------------------------
		// 	Dialog Add Material
	   	//	-------------------------------------------------------------------------------
	   		
	   		var d503FrmAdd = oCon.getForm(3);
	   		d503FrmAdd.addContent(new sap.m.Label({text:'Material'}));
	   		d503FrmAdd.addContent(new sap.m.Input({id:'d503inpMatnr',type:"Number"})); 
	   		d503FrmAdd.addContent(new sap.m.Label({text:'Qty'}));
	   		d503FrmAdd.addContent(new sap.m.Input({id:'d503inpMenge',type:"Number"}));
	   		d503FrmAdd.addContent(new sap.m.Label({text:'UOM'}));
	   		d503FrmAdd.addContent(new sap.m.Input({id:'d503inpMeins'}));
	   		var d503DiaAdd = new sap.m.Dialog({
	   			id				: 'd503DiaAdd',
	   			customHeader	: new sap.m.Bar({contentLeft:	[],
	   				 				             contentMiddle:	[new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Add Material"})],
	   				 				             contentRight:	[new sap.m.Button({icon:"sap-icon://decline",press:function(){d503DiaAdd.close();},})],}),
	   			contentWidth	: '550px',
	   		    beginButton		: new sap.m.Button({id:'d503btnAcp',icon:"sap-icon://accept",text:'Accept',press:oCon.ui5Dispatch}),
	   		    content			: [d503FrmAdd],
	   		});
	   		
		//	-------------------------------------------------------------------------------
		//	Page
		//	-------------------------------------------------------------------------------
	   		
	   		var d503schMain   = oCon.getSchMain('d503','d503TblOvw',['matnr','maktx']); 
			var d503lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Material List"});
			var d503btnBck    = new sap.m.Button({id:'d503btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
			var d503btnHom    = new sap.m.Button({id:'d503btnHom',icon:"sap-icon://home",press:oCon.ui5Dispatch});
			var d503page = new sap.m.Page({
				id				: 'd503page',
				customHeader	: new sap.m.Bar({contentLeft:	[d503btnBck, d503btnHom],
												 contentMiddle:	[d503lblTitle],
												 contentRight:	[d503btnOth],}),
				content			: [d503schMain, d503TblOvw, d503DiaAdd]
			});	
	   		
		//	-------------------------------------------------------------------------------	
		//	Return
		//	-------------------------------------------------------------------------------
			
			this.setDisplayBlock(true);
			return [d503page];
		}
	});