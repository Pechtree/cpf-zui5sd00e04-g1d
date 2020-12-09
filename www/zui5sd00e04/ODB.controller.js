sap.ui.controller("zui5sd00e04.ODB", {
	
	//--------------------------------------------------------------------------------
	//DISPATCHER
	//--------------------------------------------------------------------------------
	dispatch: function(fcode){
		
		var dbObj = window.openDatabase("SAPUI5DB", "1.0", "CPF-SAP", 200000);
		
		if(fcode=='READ'){dbObj.transaction(oDb.DB_READ, oCon.DB_ERR);};
		if(fcode=='SAVE'){dbObj.transaction(oDb.DB_SAVE, oCon.DB_ERR);};
		
	},
	//--------------------------------------------------------------------------------
	//DB_READ
	//--------------------------------------------------------------------------------
	DB_READ: function(oEvt){
		
		var sqlR   = 'SELECT * FROM PMX_CFG WHERE sid = "DEFAULT"';
		var sqlC   = 'CREATE TABLE IF NOT EXISTS PMX_CFG (' +
		   'sid unique,' +
		   'wip, '       +
		   'wport, '     +
		   'wrate, '     +
		   'p1mac, '     +
		   'p1margin, '  +
		   'p1qrsize, '  +
		   'p2ip, '      +
		   'p2port, '    +
		   'p2margin, '  +
		   'p2qrsize )';
		
		//oEvt.executeSql(sqlC);
		oEvt.executeSql(sqlR, [], 
			function(tx, results){
				if(results.rows.length>0){
					oCon.getControl('a002InpWip').setValue(results.rows.item(0).wip);
					oCon.getControl('a002InpWPort').setValue(results.rows.item(0).wport);
					oCon.getControl('a002InpWRate').setValue(results.rows.item(0).wrate);
					
					oCon.getControl('a002InpBMac').setValue(results.rows.item(0).p1mac);
					oCon.getControl('a002InpBMargin').setValue(results.rows.item(0).p1margin);
					oCon.getControl('a002InpBQrSize').setValue(results.rows.item(0).p1qrsize);
					
					oCon.getControl('a002InpPip').setValue(results.rows.item(0).p2ip);
					oCon.getControl('a002InpPPort').setValue(results.rows.item(0).p2port);
					oCon.getControl('a002InpPMargin').setValue(results.rows.item(0).p2margin);	
					oCon.getControl('a002InpPQrSize').setValue(results.rows.item(0).p2qrsize);	
					//oCon.ui5DispatchFcode("GAP.INIT.SUC");
				};
			},
			function(){
				//oCon.popMsgbox("Setting read error");
			}
		);

	},
	
	//--------------------------------------------------------------------------------
	//DB_SAVE
	//--------------------------------------------------------------------------------
	DB_SAVE: function(oEvt){
		
		var sqlD   = 'DELETE FROM PMX_CFG WHERE sid = "DEFAULT"';
		var sqlC   = 'CREATE TABLE IF NOT EXISTS PMX_CFG (' +
		   'sid unique,' +
		   'wip, '       +
		   'wport, '     +
		   'wrate, '     +
		   'p1mac, '     +
		   'p1margin, '  +
		   'p1qrsize, '  +
		   'p2ip, '      +
		   'p2port, '    +
		   'p2margin, '  +
		   'p2qrsize )';
		
		var sqlI   = 'INSERT INTO PMX_CFG (' +
		   'sid,' +
		   'wip, '       +
		   'wport, '     +
		   'wrate, '     +
		   'p1mac, '     +
		   'p1margin, '  +
		   'p1qrsize, '  +
		   'p2ip, '      +
		   'p2port, '    +
		   'p2margin, '  +
		   'p2qrsize) VALUES ('+
		   '"DEFAULT"' +
		   '"' + oCon.getControl('a002InpWip').getValue() 		+ '",' +
		   '"' + oCon.getControl('a002InpWPort').getValue() 	+ '",' +
		   '"' + oCon.getControl('a002InpWRate').getValue() 	+ '",' +
		   '"' + oCon.getControl('a002InpBMac').getValue() 		+ '",' +
		   '"' + oCon.getControl('a002InpBMargin').getValue() 	+ '",' +
		   '"' + oCon.getControl('a002InpBQrSize').getValue() 	+ '",' +
		   '"' + oCon.getControl('a002InpPip').getValue() 		+ '",' +
		   '"' + oCon.getControl('a002InpPPort').getValue() 	+ '",' +
		   '"' + oCon.getControl('a002InpPMargin').getValue() 	+ '",' +
		   '"' + oCon.getControl('a002InpPQrSize').getValue() 	+ '")';
		oEvt.executeSql(sqlC);
		oEvt.executeSql(sqlD);
		oEvt.executeSql(sqlI, [], 
			function(oEvt){
				oCon.popMsgbox("Setting save success");
				//oCon.ui5DispatchFcode("GAP.INIT.ERR");
			},
			function(){
				oCon.popMsgbox("Setting save error");
				//oCon.ui5DispatchFcode("GAP.INIT.ERR");
			}
		);
	},
	
	//--------------------------------------------------------------------------------
	//DEVICE-DATABASE
	//--------------------------------------------------------------------------------
	DB_ERR: function(oEvt){
		oCon.popMsgbox("Error processing SQL: "+oEvt.code);
	},
	
});