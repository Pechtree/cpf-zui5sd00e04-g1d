sap.ui.controller("zui5sd00e04.controller.L.L001", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zui5sd00e04.L.L001
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zui5sd00e04.L.L001
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zui5sd00e04.L.L001
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zui5sd00e04.L.L001
*/
//	onExit: function() {
//
//	},
	
	//--------------------------------------------------------------------------------
	//getSch
	//--------------------------------------------------------------------------------
	getSch: function(id,tab,columns,exId){
		SchMain = new sap.m.SearchField({
			id			: id+'schMain'+exId,
			width 		: '100%',
			liveChange : function(){
				oCon.ui5DispatchFcode(id+'schMain'+exId);
				for(i=0;i<columns.length;i++){
					oCon.liveSearchMulti(id+'schMain'+exId,tab,columns[i],i.toString());
				};
			},
		});
		return SchMain;
	},

});