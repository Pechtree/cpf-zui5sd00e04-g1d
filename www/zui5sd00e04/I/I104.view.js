sap.ui.jsview("zui5sd00e04.I.I104", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5sd00e04.I104
	*/ 
	getControllerName : function() {
		return "zui5sd00e04.I.I104";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5sd00e04.I104
	*/ 
	createContent : function(oController) {
		//-------------------------------------------------------------------------------
		//Form
		//-------------------------------------------------------------------------------
   		var i104FrmMain = oCon.getForm(3);   	
 		i104FrmMain.addContent(new sap.m.Label({text:'Order'}));
   		i104FrmMain.addContent(new sap.m.Input({id:'i104InpAufnr',editable:false,value:'{/head/aufnr}'}));
   		
 		i104FrmMain.addContent(new sap.m.Label({text:'FG'}));
 		i104FrmMain.addContent(new sap.m.Input({id:'i104InpMatnr',editable:false,value:'{/head/matnr_fg}'}));
 		i104FrmMain.addContent(new sap.m.Input({id:'i104InpMaktx',editable:false,value:'{/head/maktx_fg}'}));
   		
 		i104FrmMain.addContent(new sap.m.Label({text:'Tumb Batch'}));
 		i104FrmMain.addContent(new sap.m.Input({id:'i104InpCharg',editable:false,value:'{/head/charg}'}));
   
 		
 		i104FrmMain.addContent(new sap.m.Label({text:'Phase'}));
 		i104FrmMain.addContent(new sap.m.Input({id:'i104InVornr',editable:false,value:'{/head/vornr}'}));
 		i104FrmMain.addContent(new sap.m.Input({id:'i104Bezei',editable:false,value:'{/head/bezei}'}));
 		
   		i104FrmMain.addContent(new sap.m.Label({text:'Yield'}));
   		i104FrmMain.addContent(new sap.m.Input({id:'i104InpYield',type:"Number"}));
   		i104FrmMain.addContent(new sap.m.Input({id:'i104InpMeins',value:'{/head/meins}'}));
   		sap.ui.getCore().byId("i104InpYield").onsapenter = function(oEvt){oCon.ui5DispatchFcode('i104InpYield');};
   		
   		i104FrmMain.addContent(new sap.m.Label({text:'Start'}));
   		i104FrmMain.addContent(oCon.getDatePicker('i104InpSDate','{/head/isdd}'));
   		i104FrmMain.addContent(oCon.getTimePicker('i104InpSTime','{/head/isdz}'));
   		
   		i104FrmMain.addContent(new sap.m.Label({text:'Finished'}));
   		i104FrmMain.addContent(oCon.getDatePicker('i104InpFDate'));
   		i104FrmMain.addContent(oCon.getTimePicker('i104InpFTime'));
   		
   		i104FrmMain.addContent(new sap.m.Label({text:'No of Employee'}));
   		i104FrmMain.addContent(new sap.m.Input({id:'i104InpAnzma',type:"Number",value:'{/head/anzma}'}));
   		
  		i104FrmMain.addContent(new sap.m.Label({text:'Labour Time'}));
   		i104FrmMain.addContent(new sap.m.Input({id:'i104InpLaborQ',type:"Number",value:'{/head/menge1}'}));
   		i104FrmMain.addContent(new sap.m.Input({id:'i104InpLaborU',value:'{/head/meins1}',editable:false}));

   		i104FrmMain.addContent(new sap.m.Label({text:'Machine Time 1'}));
   		i104FrmMain.addContent(new sap.m.Input({id:'i104InpMech1Q',type:"Number",value:'{/head/menge2}'}));
   		i104FrmMain.addContent(new sap.m.Input({id:'i104InpMech1U',value:'{/head/meins2}',editable:false}));
   		
   		i104FrmMain.addContent(new sap.m.Label({text:'Machine Time 2'}));
   		i104FrmMain.addContent(new sap.m.Input({id:'i104InpMech2Q',type:"Number",value:'{/head/menge3}'}));
   		i104FrmMain.addContent(new sap.m.Input({id:'i104InpMech2U',value:'{/head/meins3}',editable:false}));
   		
//   		new sap.m.Input({id:'i104InpLaborQ',value:'{/head/menge1}',visible:false}); //Hidden
//   		new sap.m.Input({id:'i104InpLaborU',value:'{/head/meins1}',visible:false}); //Hidden
//   		new sap.m.Input({id:'i104InpMech1Q',value:'{/head/menge2}',visible:false}); //Hidden
//   		new sap.m.Input({id:'i104InpMech1U',value:'{/head/meins2}',visible:false}); //Hidden
//   		new sap.m.Input({id:'i104InpMech2Q',value:'{/head/menge3}',visible:false}); //Hidden
//   		new sap.m.Input({id:'i104InpMech2U',value:'{/head/meins3}',visible:false}); //Hidden
   		//-------------------------------------------------------------------------------
		//Page
		//-------------------------------------------------------------------------------
		var i104lblTitle  = new sap.m.Label({design:sap.m.LabelDesign.Bold,text:"Confirmation Out"});
		var i104btnBck    = new sap.m.Button({id:'i104btnBck',icon:"sap-icon://nav-back",press:oCon.ui5Dispatch});
		var i104btnDis    = new sap.m.Button({id:'i104btnDis',icon:"sap-icon://display",text:'Component',press:oCon.ui5Dispatch});
		var i104btnRfh    = new sap.m.Button({id:'i104btnRfh',icon:"sap-icon://simulate",text:'Refresh',press:oCon.ui5Dispatch});
		var i104btnSav    = new sap.m.Button({id:'i104btnSav',icon:"sap-icon://save",text:'Confirm',press:oCon.ui5Dispatch});
		var i104page = new sap.m.Page({
			id				: 'i104page',
			customHeader	: new sap.m.Bar({contentLeft:	[i104btnBck,i104btnDis],
											 contentMiddle:	[i104lblTitle],
											 contentRight:	[i104btnRfh,i104btnSav],}),
			content			: [i104FrmMain]
		});	
		//Return
		//-------------------------------------------------------------------------------
		this.setDisplayBlock(true);
		return [i104page];
	}

});