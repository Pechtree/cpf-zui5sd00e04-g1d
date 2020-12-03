sap.ui.controller("zui5sd00e04.WEIGHT", {
	//--------------------------------------------------------------------------------
	//DISPATCHER
	//--------------------------------------------------------------------------------
	dispatch: function(fcode){
		
		if(oCTX.oData.hybrid!='X'){return;};
		
		//#3
		if(fcode=="INI"){
			oWeight.SOCK_INI();
		};
		if(fcode=="CON"){
			oWeight.SOCK_CON();	
		};
		if(fcode=="SND"){
			oWeight.SOCK_SND();
		};
		if(fcode=="CLS"){			
			window.tlantic.plugins.socket.disconnect(
					function(){oCon.getControl("a002InpWStat").setValue("Weight close Ok");},
					function(){oCon.getControl("a002InpWStat").setValue("Weight not connect");},
					oCon.getControl('a002InpWCon').getValue()
			);
		};
		if(fcode=="TAR"){
			oWeight.SOCK_TAR();
		};
	},
	//--------------------------------------------------------------------------------
	//SOCK_INI
	//--------------------------------------------------------------------------------
	SOCK_INI: function(){
		
		document.addEventListener(window.tlantic.plugins.socket.receiveHookName, function (ev){
			
			if(ev.metadata.data=='w1'){return;}; //Command not execute
			
			oCTX.oData.wei_rcv = ev.metadata.data;
			oCon.getControl('a002inpWDataI').setValue(ev.metadata.data);
			oCon.ui5DispatchFcode('WEIGHT_RCV');
			
			oApp.diaWeight_SOCK('f002',ev.metadata.data); //Mode #1
			oApp.diaWeight_SOCK('f101',ev.metadata.data); //Mode #2
			oApp.diaWeight_SOCK('f402',ev.metadata.data); //Mode #3 by Premix
			
			//Weight Print Sticker
			var oModelW = oCon.getWeiDataIshida(ev.metadata.data);
			var vWCurW  = parseFloat(oModelW.oData.wei);
			oCon.getControl('f301TxtWei').setText(oModelW.oData.wei);
			oCon.getControl('f301btnWeiOk').setVisible(false);
			if((oModelW.oData.stat1=='+'||oModelW.oData.stat1==',')&&(oModelW.oData.stat2=='!')&&(vWCurW>0)){
				oCon.getControl('f301btnWeiOk').setVisible(true);
			};
			
		});

	},
	//--------------------------------------------------------------------------------
	//SOCK_CON
	//--------------------------------------------------------------------------------
	SOCK_CON: function(){
		
		var vHost = oCon.getControl("a002InpWip").getValue();
		var vPort = parseInt(oCon.getControl("a002InpWPort").getValue());
		
		if(vHost==''){return;};
		
		window.tlantic.plugins.socket.connect(
				function(conid){
					oCon.getControl("a002InpWStat").setValue("Terminal connect OK");
					oCon.getControl('a002InpWCon').setValue(conid);
				},
				function(){
					oCon.getControl("a002InpWStat").setValue("Terminal connect Error");
				},
				vHost,
				vPort
		);
		
	},
	//--------------------------------------------------------------------------------
	//SOCK_SND
	//--------------------------------------------------------------------------------
	SOCK_SND: function(){
		
		var vTareCmd = "";
		var vTareWei = "";
		
		if(oCTX.oData.wei_tare!=''){
			if(oCTX.oData.wei_tare=='q#'){
				vTareCmd = 'q#';
			}else{
				vTareWei = oCTX.oData.wei_tare.replace(".",",");
				vTareCmd = 'qS' + vTareWei.padStart(8) + 'kg';
			}
			window.tlantic.plugins.socket.send(
					function(){oCon.getControl("a002InpWStat").setValue("Send data OK")},
					function(){oCon.getControl("a002InpWStat").setValue("Send data error")},
					oCon.getControl("a002InpWCon").getValue(),
					vTareCmd
				);
		}else{
			window.tlantic.plugins.socket.send(
				function(){oCon.getControl("a002InpWStat").setValue("Send data OK")},
				function(){oCon.getControl("a002InpWStat").setValue("Send data error")},
				oCon.getControl("a002InpWCon").getValue(),
				oCTX.oData.wei_data
			);
		};
		oCTX.oData.wei_tare = '';

	},
	//--------------------------------------------------------------------------------
	//SOCK_TAR  : TARE
	//--------------------------------------------------------------------------------
	SOCK_TAR: function(){
		window.tlantic.plugins.socket.send(
			function(){oCon.getControl("a002InpWStat").setValue("Send data OK")},
			function(){oCon.getControl("a002InpWStat").setValue("Send data error")},
			oCon.getControl("a002InpWCon").getValue(),
			oCTX.oData.wei_tare
		);

	},
	
});