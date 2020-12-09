sap.ui.jsview("zui5sd00e04.view.D.D801", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.view.D.D801
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.controller.D.D801";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.view.D.D801
	*/ 
	createContent : function(oController) {
		
		//	-------------------------------------------------------------------------------
		//	Table
		//	------------------------------------------------------------------------------- 
			
			var d801RowOvw = new sap.m.ColumnListItem({
				type	: sap.m.ListType.Active,
				cells	:[new sap.m.ObjectIdentifier({title:{path:'tfrnr',formatter:oFmt.fmtAlpha},
													  text :'{matnr_in} {maktx_in} ({vornr})'}),
				     	  new sap.m.ObjectIdentifier({title:'{menge_okg}',
				     		  						  text :'{menge_ost}'}),
				     	  new sap.m.ObjectIdentifier({title:'{menge_kkg}',
				     		  						  text :'{menge_kst}'}),
				     	  new sap.m.ObjectIdentifier({title:'{menge_tkg}',
				     		  						  text :'{menge_tst}'}),
				     	  new sap.m.ObjectIdentifier({title:'{menge_nkg}',
				     		  						  text :'{menge_nst}'}),
				     	  new sap.m.ObjectIdentifier({title:'{meins_kgx}',
					     		  					  text :'{meins_stx}'}),]
			}); 
	   		var d801TblOvw = new sap.m.Table({
	   			id						: "d801TblOvw",
				includeItemInSelection	: true, 
				mode					: sap.m.ListMode.SingleSelectMaster,
	   			columns		: [oCon.getCol('07','Tfr','','','d801TblOvw','matnr_in'),
	   			       		   oCon.getCol('02','Req'),
	   			       		   oCon.getCol('02','Pck'),
	   			       		   oCon.getCol('02','Tfr'),
	   			       		   oCon.getCol('02','Opn'),
	   			       		   oCon.getCol('03','UoM'),],
	   			items		: {path:"/t_d_xrstfr",template:d801RowOvw},
	   		});
			
				
		//	-------------------------------------------------------------------------------
		//	Page
		//	-------------------------------------------------------------------------------

	   		var d801DiaDate   = oCon.getDialogDate('d801',"SAPEVT_D801","evt_d801");
	   		var d801btnDate	  = oCon.getBtnDate('d801');
	   		var d801schMain   = oCon.getSchMain('d801','d801TblOvw',['tfrnr','matnr_in','maktx_in']);
	   		var d801pullMain  = oCon.getPullMain('d801','SAPEVT_D801','evt_d801');
	   		var d801lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Stock Transfer Order for Other Plant - Overview"});
			var d801btnDel    = new sap.m.Button({id:'d801btnDel',icon:"sap-icon://delete",text:'Cancel',press:oCon.ui5Dispatch});
			var d801btnBck    = new sap.m.Button({id:'d801btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
			var d801page = new sap.m.Page({
				id				: 'd801page',
				customHeader	: new sap.m.Bar({contentLeft:	[d801btnBck,d801btnDate],
												 contentMiddle:	[d801lblTitle],
												 contentRight:	[d801btnDel],}),
				content			: [d801pullMain,d801schMain,d801TblOvw]
			});	
			
		//	-------------------------------------------------------------------------------
		//	Return
		//	-------------------------------------------------------------------------------
		
			this.setDisplayBlock(true);
			return [d801page];
				
		}
	});