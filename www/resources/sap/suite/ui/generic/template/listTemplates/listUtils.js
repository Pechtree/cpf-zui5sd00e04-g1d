sap.ui.define(["sap/ui/core/library"],function(c){"use strict";var M=c.MessageType;var l="msg";function h(t,e){var b=e.getParameter("bindingParams");b.events=b.events||{};b.events.aggregatedDataStateChange=function(C){var B=t.oServices.oApplication.getBusyHelper();if(B.isBusy()||C.getSource().getLength()){return;}var d=C.getParameter("dataState");if(d.getChanges().messages){var m=d.getMessages();var E=[];for(var i=0;i<m.length;i++){var o=m[i];var T=o.getType();if(T===M.Error){E.push(o);}}if(E.length){var p,L,a;p=t.oCommonUtils.getDialogFragment("sap.suite.ui.generic.template.listTemplates.fragments.MessagesOnRetrieval",{itemSelected:function(){L.setProperty("/backbtnvisibility",true);},onBackButtonPress:function(){a.navigateBack();L.setProperty("/backbtnvisibility",false);},onReject:function(){p.close();}},l,function(f){a=f.getContent()[0];});L=p.getModel(l);L.setProperty("/messages",E);L.setProperty("/backbtnvisibility",false);p.open();}}};}return{handleErrorsOnTableOrChart:h};});
