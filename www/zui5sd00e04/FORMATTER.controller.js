sap.ui.controller("zui5sd00e04.FORMATTER", {
	
	//fmtTfr
	//--------------------------------------------------------------------------------
	fmtTfr: function(tfrnr,postr){
		return tfrnr + '/' + postr;
	},
	//fmtResb
	//--------------------------------------------------------------------------------
	fmtResb: function(piknr,rsnum,rspos,seta){
		return piknr + ' ' + rsnum + ' ' + rspos + ' ' + seta;
	},
	//fmtPkg
	//--------------------------------------------------------------------------------
	fmtPkg: function(maktx_fg,menge_pkg){
		if(menge_pkg=='')
			return maktx_fg;
		
		return maktx_fg + ' (' + menge_pkg + ')';
	},
	//fmtBool
	//--------------------------------------------------------------------------------
	fmtBool: function(oEvt){
		if(oEvt=='X'){
			return true;
		}else{
			//return false;
		};
	},
	//fmtAlpha
	//--------------------------------------------------------------------------------
	fmtAlpha: function(oEvt){
		if(oEvt==undefined)				{return '';};
		if(oEvt==null)					{return '';};
		if(oEvt=='')					{return '';};
		
		var vInt = parseInt(oEvt);
		if(vInt==0)						{return '';};
		
		
		var r = parseInt(oEvt,10);
		if(r.toString()=='undefined')	{return '';};
		return r;
		//return parseInt(oEvt,10);
	},
	//fmtDate
	//--------------------------------------------------------------------------------
	fmtDate: function(oEvt){
		if(oEvt==undefined){return;};
		return oEvt.substring(6,8)+'.'+
		       oEvt.substring(4,6)+'.'+
		       oEvt.substring(0,4);
	},	
	//fmtTime
	//--------------------------------------------------------------------------------
	fmtTime: function(oEvt){
		if(oEvt==undefined){return;};
		return oEvt.substring(0,2)+':'+
		       oEvt.substring(2,4)+':'+
		       oEvt.substring(4,6);
	},
	//fmtAmt
	//--------------------------------------------------------------------------------
	fmtAmt: function(oEvt){
		if((oEvt=='')||(!oEvt))
			return '0.000';
		
		var n 	= oEvt.search('-');
		var amt = parseFloat(oEvt.replace(',',''));

		if(n>=0){
			amt = Math.abs(amt) * -1;
		};
		
		jQuery.sap.require("sap.ui.core.format.NumberFormat");
		var oNumberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
			maxFractionDigits 	: 3,
			minFractionDigits   : 3,
			groupingEnabled		: true,
			groupingSeparator	: ",",
			decimalSeparator	: ".",
			minusSign           : "-",
		}); 
		return oNumberFormat.format(amt);
	},
	//fmtInt
	//--------------------------------------------------------------------------------
	fmtInt: function(oEvt){
		if((oEvt=='')||(!oEvt))
			return '0';
		
		var n 	= oEvt.search('-');
		var amt = parseFloat(oEvt.replace(',',''));

		if(n>=0){
			amt = Math.abs(amt) * -1;
		};
		
		jQuery.sap.require("sap.ui.core.format.NumberFormat");
		var oNumberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
			maxFractionDigits 	: 0,
			minFractionDigits   : 0,
			groupingEnabled		: true,
			groupingSeparator	: ",",
			decimalSeparator	: ".",
			minusSign           : "-",
		}); 
		return oNumberFormat.format(amt);
	}, 
	
	
	fmtZplTH: function(oEvt){
		
//		oEvt = oEvt.replace(/ก/g,"_e0_b8_81");
//		oEvt = oEvt.replace(/ข/g,"_e0_b8_82");
//		oEvt = oEvt.replace(/ฃ/g,"_e0_b8_83");
//		oEvt = oEvt.replace(/ค/g,"_e0_b8_84");
//		oEvt = oEvt.replace(/ฅ/g,"_e0_b8_85");
//		oEvt = oEvt.replace(/ฆ/g,"_e0_b8_86");
//		oEvt = oEvt.replace(/ง/g,"_e0_b8_87");
//		oEvt = oEvt.replace(/จ/g,"_e0_b8_88");
//		oEvt = oEvt.replace(/ฉ/g,"_e0_b8_89");
//		oEvt = oEvt.replace(/ช/g,"_e0_b8_8a");
//		oEvt = oEvt.replace(/ซ/g,"_e0_b8_8b");
//		oEvt = oEvt.replace(/ฌ/g,"_e0_b8_8c");
//		oEvt = oEvt.replace(/ญ/g,"_e0_b8_8d");
//		oEvt = oEvt.replace(/ฎ/g,"_e0_b8_8e");
//		oEvt = oEvt.replace(/ฏ/g,"_e0_b8_8f");
//		oEvt = oEvt.replace(/ฐ/g,"_e0_b8_90");
//		oEvt = oEvt.replace(/ฑ/g,"_e0_b8_91");
//		oEvt = oEvt.replace(/ฒ/g,"_e0_b8_92");
//		oEvt = oEvt.replace(/ณ/g,"_e0_b8_93");
//		oEvt = oEvt.replace(/ด/g,"_e0_b8_94");
//		oEvt = oEvt.replace(/ต/g,"_e0_b8_95");
//		oEvt = oEvt.replace(/ถ/g,"_e0_b8_96");
//		oEvt = oEvt.replace(/ท/g,"_e0_b8_97");
//		oEvt = oEvt.replace(/ธ/g,"_e0_b8_98");
//		oEvt = oEvt.replace(/น/g,"_e0_b8_99");
//		oEvt = oEvt.replace(/บ/g,"_e0_b8_9a");
//		oEvt = oEvt.replace(/ป/g,"_e0_b8_9b");
//		oEvt = oEvt.replace(/ผ/g,"_e0_b8_9c");
//		oEvt = oEvt.replace(/ฝ/g,"_e0_b8_9d");
//		oEvt = oEvt.replace(/พ/g,"_e0_b8_9e");
//		oEvt = oEvt.replace(/ฟ/g,"_e0_b8_9f");
//		oEvt = oEvt.replace(/ภ/g,"_e0_b8_a0");
//		oEvt = oEvt.replace(/ม/g,"_e0_b8_a1");
//		oEvt = oEvt.replace(/ย/g,"_e0_b8_a2");
//		oEvt = oEvt.replace(/ร/g,"_e0_b8_a3");
//		oEvt = oEvt.replace(/ฤ/g,"_e0_b8_a4");
//		oEvt = oEvt.replace(/ล/g,"_e0_b8_a5");
//		oEvt = oEvt.replace(/ฦ/g,"_e0_b8_a6");
//		oEvt = oEvt.replace(/ว/g,"_e0_b8_a7");
//		oEvt = oEvt.replace(/ศ/g,"_e0_b8_a8");
//		oEvt = oEvt.replace(/ษ/g,"_e0_b8_a9");
//		oEvt = oEvt.replace(/ส/g,"_e0_b8_aa");
//		oEvt = oEvt.replace(/ห/g,"_e0_b8_ab");
//		oEvt = oEvt.replace(/ฬ/g,"_e0_b8_ac");
//		oEvt = oEvt.replace(/อ/g,"_e0_b8_ad");
//		oEvt = oEvt.replace(/ฮ/g,"_e0_b8_ae");
//		oEvt = oEvt.replace(/ฯ/g,"_e0_b8_af");
//		oEvt = oEvt.replace(/ะ/g,"_e0_b8_b0");
//		oEvt = oEvt.replace(/ั/g,"_e0_b8_b1");
//		oEvt = oEvt.replace(/า/g,"_e0_b8_b2");
//		oEvt = oEvt.replace(/ำ/g,"_e0_b8_b3");
//		oEvt = oEvt.replace(/ิ/g,"_e0_b8_b4");
//		oEvt = oEvt.replace(/ี/g,"_e0_b8_b5");
//		oEvt = oEvt.replace(/ึ/g,"_e0_b8_b6");
//		oEvt = oEvt.replace(/ื/g,"_e0_b8_b7");
//		oEvt = oEvt.replace(/ุ/g,"_e0_b8_b8");
//		oEvt = oEvt.replace(/ู/g,"_e0_b8_b9");
//		oEvt = oEvt.replace(/เ/g,"_e0_b9_80");
//		oEvt = oEvt.replace(/แ/g,"_e0_b9_81");
//		oEvt = oEvt.replace(/โ/g,"_e0_b9_82");
//		oEvt = oEvt.replace(/ใ/g,"_e0_b9_83");
//		oEvt = oEvt.replace(/ไ/g,"_e0_b9_84");
//		oEvt = oEvt.replace(/ๅ/g,"_e0_b9_85");
//		oEvt = oEvt.replace(/ๆ/g,"_e0_b9_86");
//		oEvt = oEvt.replace(/็/g,"_e0_b9_87");
//		oEvt = oEvt.replace(/่/g,"_e0_b9_88");
//		oEvt = oEvt.replace(/้/g,"_e0_b9_89");
//		oEvt = oEvt.replace(/๊/g,"_e0_b9_8a");
//		oEvt = oEvt.replace(/๋/g,"_e0_b9_8b");
//		oEvt = oEvt.replace(/์/g,"_e0_b9_8c");
//		oEvt = oEvt.replace(/ํ/g,"_e0_b9_8d");
//		oEvt = oEvt.replace(/๑/g,"_e0_b9_91");
//		oEvt = oEvt.replace(/๒/g,"_e0_b9_92");
//		oEvt = oEvt.replace(/๓/g,"_e0_b9_93");
//		oEvt = oEvt.replace(/๔/g,"_e0_b9_94");
//		oEvt = oEvt.replace(/๕/g,"_e0_b9_95");
//		oEvt = oEvt.replace(/๖/g,"_e0_b9_96");
//		oEvt = oEvt.replace(/๗/g,"_e0_b9_97");
//		oEvt = oEvt.replace(/๘/g,"_e0_b9_98");
//		oEvt = oEvt.replace(/๙/g,"_e0_b9_99");
//		oEvt = oEvt.replace(/๚/g,"_e0_b9_9a");
		
		oEvt = oEvt.replace(/ก/g,"|e0|b8|81");
		oEvt = oEvt.replace(/ข/g,"|e0|b8|82");
		oEvt = oEvt.replace(/ฃ/g,"|e0|b8|83");
		oEvt = oEvt.replace(/ค/g,"|e0|b8|84");
		oEvt = oEvt.replace(/ฅ/g,"|e0|b8|85");
		oEvt = oEvt.replace(/ฆ/g,"|e0|b8|86");
		oEvt = oEvt.replace(/ง/g,"|e0|b8|87");
		oEvt = oEvt.replace(/จ/g,"|e0|b8|88");
		oEvt = oEvt.replace(/ฉ/g,"|e0|b8|89");
		oEvt = oEvt.replace(/ช/g,"|e0|b8|8a");
		oEvt = oEvt.replace(/ซ/g,"|e0|b8|8b");
		oEvt = oEvt.replace(/ฌ/g,"|e0|b8|8c");
		oEvt = oEvt.replace(/ญ/g,"|e0|b8|8d");
		oEvt = oEvt.replace(/ฎ/g,"|e0|b8|8e");
		oEvt = oEvt.replace(/ฏ/g,"|e0|b8|8f");
		oEvt = oEvt.replace(/ฐ/g,"|e0|b8|90");
		oEvt = oEvt.replace(/ฑ/g,"|e0|b8|91");
		oEvt = oEvt.replace(/ฒ/g,"|e0|b8|92");
		oEvt = oEvt.replace(/ณ/g,"|e0|b8|93");
		oEvt = oEvt.replace(/ด/g,"|e0|b8|94");
		oEvt = oEvt.replace(/ต/g,"|e0|b8|95");
		oEvt = oEvt.replace(/ถ/g,"|e0|b8|96");
		oEvt = oEvt.replace(/ท/g,"|e0|b8|97");
		oEvt = oEvt.replace(/ธ/g,"|e0|b8|98");
		oEvt = oEvt.replace(/น/g,"|e0|b8|99");
		oEvt = oEvt.replace(/บ/g,"|e0|b8|9a");
		oEvt = oEvt.replace(/ป/g,"|e0|b8|9b");
		oEvt = oEvt.replace(/ผ/g,"|e0|b8|9c");
		oEvt = oEvt.replace(/ฝ/g,"|e0|b8|9d");
		oEvt = oEvt.replace(/พ/g,"|e0|b8|9e");
		oEvt = oEvt.replace(/ฟ/g,"|e0|b8|9f");
		oEvt = oEvt.replace(/ภ/g,"|e0|b8|a0");
		oEvt = oEvt.replace(/ม/g,"|e0|b8|a1");
		oEvt = oEvt.replace(/ย/g,"|e0|b8|a2");
		oEvt = oEvt.replace(/ร/g,"|e0|b8|a3");
		oEvt = oEvt.replace(/ฤ/g,"|e0|b8|a4");
		oEvt = oEvt.replace(/ล/g,"|e0|b8|a5");
		oEvt = oEvt.replace(/ฦ/g,"|e0|b8|a6");
		oEvt = oEvt.replace(/ว/g,"|e0|b8|a7");
		oEvt = oEvt.replace(/ศ/g,"|e0|b8|a8");
		oEvt = oEvt.replace(/ษ/g,"|e0|b8|a9");
		oEvt = oEvt.replace(/ส/g,"|e0|b8|aa");
		oEvt = oEvt.replace(/ห/g,"|e0|b8|ab");
		oEvt = oEvt.replace(/ฬ/g,"|e0|b8|ac");
		oEvt = oEvt.replace(/อ/g,"|e0|b8|ad");
		oEvt = oEvt.replace(/ฮ/g,"|e0|b8|ae");
		oEvt = oEvt.replace(/ฯ/g,"|e0|b8|af");
		oEvt = oEvt.replace(/ะ/g,"|e0|b8|b0");
		oEvt = oEvt.replace(/ั/g,"|e0|b8|b1");
		oEvt = oEvt.replace(/า/g,"|e0|b8|b2");
		oEvt = oEvt.replace(/ำ/g,"|e0|b8|b3");
		oEvt = oEvt.replace(/ิ/g,"|e0|b8|b4");
		oEvt = oEvt.replace(/ี/g,"|e0|b8|b5");
		oEvt = oEvt.replace(/ึ/g,"|e0|b8|b6");
		oEvt = oEvt.replace(/ื/g,"|e0|b8|b7");
		oEvt = oEvt.replace(/ุ/g,"|e0|b8|b8");
		oEvt = oEvt.replace(/ู/g,"|e0|b8|b9");
		oEvt = oEvt.replace(/เ/g,"|e0|b9|80");
		oEvt = oEvt.replace(/แ/g,"|e0|b9|81");
		oEvt = oEvt.replace(/โ/g,"|e0|b9|82");
		oEvt = oEvt.replace(/ใ/g,"|e0|b9|83");
		oEvt = oEvt.replace(/ไ/g,"|e0|b9|84");
		oEvt = oEvt.replace(/ๅ/g,"|e0|b9|85");
		oEvt = oEvt.replace(/ๆ/g,"|e0|b9|86");
		oEvt = oEvt.replace(/็/g,"|e0|b9|87");
		oEvt = oEvt.replace(/่/g,"|e0|b9|88");
		oEvt = oEvt.replace(/้/g,"|e0|b9|89");
		oEvt = oEvt.replace(/๊/g,"|e0|b9|8a");
		oEvt = oEvt.replace(/๋/g,"|e0|b9|8b");
		oEvt = oEvt.replace(/์/g,"|e0|b9|8c");
		oEvt = oEvt.replace(/ํ/g,"|e0|b9|8d");
		oEvt = oEvt.replace(/๑/g,"|e0|b9|91");
		oEvt = oEvt.replace(/๒/g,"|e0|b9|92");
		oEvt = oEvt.replace(/๓/g,"|e0|b9|93");
		oEvt = oEvt.replace(/๔/g,"|e0|b9|94");
		oEvt = oEvt.replace(/๕/g,"|e0|b9|95");
		oEvt = oEvt.replace(/๖/g,"|e0|b9|96");
		oEvt = oEvt.replace(/๗/g,"|e0|b9|97");
		oEvt = oEvt.replace(/๘/g,"|e0|b9|98");
		oEvt = oEvt.replace(/๙/g,"|e0|b9|99");
		oEvt = oEvt.replace(/๚/g,"|e0|b9|9a");

		return oEvt;
	},
});