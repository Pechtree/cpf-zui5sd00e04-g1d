(function(g){"use strict";sap.ui.define(['sap/ushell/renderers/fiori2/search/SearchHelper','sap/ushell/renderers/fiori2/search/SearchResultListFormatter','sap/ushell/renderers/fiori2/search/SearchFacetsFormatter','sap/ushell/renderers/fiori2/search/SearchTabStripsFormatter','sap/ushell/renderers/fiori2/search/suggestions/SuggestionHandler','sap/ushell/renderers/fiori2/search/SearchConfiguration','sap/ushell/renderers/fiori2/search/personalization/PersonalizationStorage','sap/ushell/renderers/fiori2/search/eventlogging/EventLogger','sap/ushell/renderers/fiori2/search/SearchUrlParser'],function(S,c,d,f,h,l,P,E,m){sap.ushell.renderers.fiori2.search.getModelSingleton=function(){if(!sap.ushell.renderers.fiori2.search.oModel){sap.ushell.renderers.fiori2.search.oModel=new sap.ushell.renderers.fiori2.search.SearchModel();}return sap.ushell.renderers.fiori2.search.oModel;};var n;var o=sap.ui.model.json.JSONModel.extend("sap.ushell.renderers.fiori2.search.SearchModel",{constructor:function(p){var t=this;p=p||{};sap.ui.model.json.JSONModel.prototype.constructor.apply(t,[]);t.config=l.getInstance();t.setSizeLimit(1000);t.suggestionHandler=new h({model:this});t.searchApplications=S.refuseOutdatedRequests(t.searchApplications,'search');t.pageSize=10;t.appTopDefault=20;t.boTopDefault=t.pageSize;t.setProperty('/isQueryInvalidated',true);t.setProperty('/isBusy',false);t.setProperty('/busyDelay',0);t.setProperty('/tableColumns',[]);t.setProperty('/tableSortableColumns',[]);t.setProperty('/tableResults',[]);t.setProperty('/results',[]);t.setProperty('/appResults',[]);t.setProperty('/boResults',[]);t.setProperty('/origBoResults',[]);t.setProperty('/count',0);t.setProperty('/boCount',0);t.setProperty('/appCount',0);t.setProperty('/facets',[]);t.setProperty('/dataSources',[t.allDataSource,t.appDataSource]);t.setProperty('/appSearchDataSource',null);t.setProperty('/currentPersoServiceProvider',null);t.setProperty('/businessObjSearchEnabled',true);t.setProperty('/initializingObjSearch',false);t.setProperty('/suggestions',[]);t.setProperty('/resultToDisplay',S.loadResultViewType());t.setProperty('/displaySwitchVisibility',false);t.setProperty('/documentTitle','Search');t.setProperty('/top',t.boTopDefault);t.setProperty('/orderBy',{});t.setProperty('/facetVisibility',false);t.setProperty('/focusIndex',0);t.setProperty('/errors',[]);t.setProperty('/isErrorPopovered',false);this.setProperty("/nlqSuccess",false);this.setProperty("/nlqDescription","");this.setProperty("/firstSearchWasExecuted",false);t.setProperty('/multiSelectionAvailable',false);t.setProperty('/multiSelectionEnabled',false);t.setProperty('/multiSelection/actions',[]);if(p.searchModel&&p.searchModel._initBusinessObjSearchProm){t._initBusinessObjSearchProm=p.searchModel._initBusinessObjSearchProm;t.oFacetFormatter=new sap.ushell.renderers.fiori2.search.SearchFacetsFormatter(t);}t.initBusinessObjSearch();t.searchUrlParser=new m({model:this});},createSina:function(){var s=new jQuery.Deferred();sap.ui.require(['sap/ushell/renderers/fiori2/search/sinaNext/sina/sinaFactory'],function(a){if(!this.config.searchBusinessObjects){a.createAsync('dummy').then(function(b){s.resolve(b);},function(e){s.reject(e);});return;}var t=[];if(window.location.href.indexOf("demo/FioriLaunchpad.")!==-1){t=['sample'];}else{t=['abap_odata','inav2','dummy'];}if(this.config.sinaConfiguration){t=[this.config.sinaConfiguration];}a.createByTrialAsync(t).then(function(b){s.resolve(b);},function(e){s.reject(e);});}.bind(this));return s;},initBusinessObjSearch:function(){var t=this;if(t._initBusinessObjSearchProm){return t._initBusinessObjSearchProm;}t.setProperty("/initializingObjSearch",true);t.setProperty("/isBusy",true);var a={label:sap.ushell.resources.i18n.getText("genericLoading"),labelPlural:sap.ushell.resources.i18n.getText("genericLoading"),enabled:false,id:'$$Loading$$'};t.setProperty("/dataSource",a);t.setProperty("/dataSources",[a]);t._initBusinessObjSearchProm=this.createSina().then(function(s){t.sinaNext=s;t.eventLogger=E.newInstance({sinaNext:t.sinaNext});t.eventLogger.logEvent({type:t.eventLogger.SESSION_START});t.createAllAndAppDataSource();t.setProperty('/defaultDataSource',t.allDataSource);if(s.provider.id==='dummy'){t.setProperty('/defaultDataSource',t.appDataSource);t.setProperty('/businessObjSearchEnabled',false);t.config.searchBusinessObjects=false;t.setProperty('/facetVisibility',false);}if(s.provider.id==='inav2'&&t.config.isLaunchpad()){sap.ushell.Container.addRemoteSystem(new sap.ushell.System({alias:"ENTERPRISE_SEARCH",platform:"abap",baseUrl:"/ENTERPRISE_SEARCH"}));}t.setProperty('/uiFilter',t.sinaNext.createFilter());t.loadDataSources();t.resetDataSource(false);t.resetFilterConditions(false);t.query=t.sinaNext.createSearchQuery();if(t.config.multiSelect){t.query.setMultiSelectFacets(true);}t.oFacetFormatter=new sap.ushell.renderers.fiori2.search.SearchFacetsFormatter(t);t.tabStripFormatter=new f.Formatter(t.allDataSource);t.dataSourceTree=t.tabStripFormatter.tree;t.setProperty("/initializingObjSearch",false);t.setProperty("/isBusy",false);},function(e){var b=sap.ushell.resources.i18n.getText('searchError');var i=sap.ushell.resources.i18n.getText('searchInitialError');if(e.message){i=i+" "+e.message;}sap.m.MessageBox.error(i,{icon:sap.m.MessageBox.Icon.NONE,title:b,actions:sap.m.MessageBox.Action.OK,onClose:null,styleClass:"",initialFocus:null,textDirection:sap.ui.core.TextDirection.Inherit});});return t._initBusinessObjSearchProm;},initPersonalization:function(){var t=this;if(this.initPersonalizationPromise){return this.initPersonalizationPromise;}this.initPersonalizationPromise=P.getInstance().then(function(p){var a=false;try{a=p.getItem('search-facet-panel-button-state');}catch(e){}t.setFacetVisibility(a,false);},function(){return jQuery.Deferred().resolve(true);});return this.initPersonalizationPromise;},isBusinessObjSearchConfigured:function(){try{var a=window['sap-ushell-config'].renderers.fiori2.componentData.config;return a.searchBusinessObjects!=='hidden';}catch(e){return true;}},isBusinessObjSearchEnabled:function(){return this.getProperty('/businessObjSearchEnabled');},setProperty:function(a,v,C,A){var t=this;var r=sap.ui.model.json.JSONModel.prototype.setProperty.apply(this,arguments);switch(a){case'/boResults':case'/appResults':t.calculateResultList();break;case'/appCount':case'/boCount':r=t.setProperty('/count',t.getProperty('/appCount')+t.getProperty('/boCount'));break;default:break;}return r;},getPersonalizationStorageInstance:function(){return P.getInstanceSync();},getSearchBoxTerm:function(){return this.getProperty('/uiFilter/searchTerm')||'';},setSearchBoxTerm:function(s,a){var t=this;var b=s.replace(/^\s+/,"");this.setProperty('/uiFilter/searchTerm',b);this.calculateSearchButtonStatus();if(b.length===0){return;}if(a||a===undefined){t._firePerspectiveQuery();}},getLastSearchTerm:function(){return this.query.getSearchTerm();},setFacetVisibility:function(v,a){if(sap.ui.Device.system.phone){v=false;}this.setProperty('/facetVisibility',v);try{this.getPersonalizationStorageInstance().setItem('search-facet-panel-button-state',v);}catch(e){}if((a||a===undefined)){this._firePerspectiveQuery({preserveFormerResults:true});}},getFacetVisibility:function(){return this.getProperty('/facetVisibility');},getTop:function(){return this.getProperty('/top');},setTop:function(t,a){this.setProperty('/top',t);if(a||a===undefined){this._firePerspectiveQuery({preserveFormerResults:true});}},resetTop:function(){this.setProperty('/focusIndex',0);if(this.isAppCategory()){this.setTop(this.appTopDefault,false);}else{this.setTop(this.boTopDefault,false);}},getOrderBy:function(){return this.getProperty('/orderBy');},setOrderBy:function(a,b){this.setProperty('/orderBy',a);if(b||b===undefined){this._firePerspectiveQuery({preserveFormerResults:true});}},resetOrderBy:function(a){this.setProperty('/orderBy',{});if(a||a===undefined){this._firePerspectiveQuery({preserveFormerResults:true});}},isEqualOrderBy:function(a,q){if(!a.orderBy){return q.length===0;}if(q.length!==1){return false;}var b=q[0];if(b.id!==a.orderBy){return false;}if(a.sortOrder==='ASC'){return b.order===this.sinaNext.SortOrder.Ascending;}return b.order===this.sinaNext.SortOrder.Descending;},getDocumentTitle:function(){var s=this.getSearchBoxTerm();var a=this.getDataSource().label;var t;if(this.getDataSource()===this.allDataSource){t=sap.ushell.resources.i18n.getText('searchTileTitleProposalAll',[s]);}else{t=sap.ushell.resources.i18n.getText('searchTileTitleProposal',[s,a]);}return t;},resetQuery:function(){if(this.getProperty('/initializingObjSearch')){return;}S.hasher.reset();this.resetTop();this.setSearchBoxTerm('');this.resetDataSource(false);this.resetFilterConditions(false);this.query.resetConditions();this.query.setSearchTerm('random-jgfhfdskjghrtekjhg');this.setProperty('/facets',[]);this.setProperty('/results',[]);this.setProperty('/appResults',[]);this.setProperty('/boResults',[]);this.setProperty('/origBoResults',[]);this.setProperty('/count',0);this.setProperty('/boCount',0);this.setProperty('/appCount',0);},createAllAndAppDataSource:function(){this.allDataSource=this.sinaNext.getAllDataSource();this.allDataSource.label=sap.ushell.resources.i18n.getText("label_all");this.allDataSource.labelPlural=sap.ushell.resources.i18n.getText("label_all");this.appDataSource=this.sinaNext._createDataSource({id:'$$APPS$$',label:sap.ushell.resources.i18n.getText("label_apps"),labelPlural:sap.ushell.resources.i18n.getText("label_apps"),type:this.sinaNext.DataSourceType.Category});},loadDataSources:function(){var t=this;var a=this.sinaNext.getBusinessObjectDataSources();a=a.slice();var b=[];a.forEach(function(e){if(!e.usage.appSearch){b.push(e);}else{t.setProperty("/appSearchDataSource",e);}});if(!this.config.odataProvider&&this.config.isLaunchpad()){b.splice(0,0,this.appDataSource);b.splice(0,0,this.allDataSource);}else{b.splice(0,0,this.allDataSource);}this.setProperty("/dataSources",b);this.setProperty("/searchTermPlaceholder",this.calculatePlaceholder());},resetDataSource:function(a){this.setDataSource(this.getDefaultDataSource(),a);},isAllCategory:function(){var a=this.getProperty("/uiFilter/dataSource");return a===this.allDataSource;},isOtherCategory:function(){var a=this.getProperty("/uiFilter/dataSource");return a.type===this.sinaNext.DataSourceType.Category&&!this.isAllCategory();},isAppCategory:function(){var a=this.getProperty("/uiFilter/dataSource");return a===this.appDataSource;},getDataSource:function(){return this.getProperty("/uiFilter/dataSource");},getDefaultDataSource:function(){return this.getProperty("/defaultDataSource");},setDataSource:function(a,b,r){if(this.getDataSource()!==a){this.eventLogger.logEvent({type:this.eventLogger.DATASOURCE_CHANGE,dataSourceId:a.id});}this.updateDataSourceList(a);this.getProperty("/uiFilter").setDataSource(a);if(r||r===undefined){this.resetTop();}this.setProperty("/searchTermPlaceholder",this.calculatePlaceholder());this.calculateSearchButtonStatus();if(b||b===undefined){this._firePerspectiveQuery();}},getServerDataSources:function(){var t=this;if(t.getDataSourcesDeffered){return t.getDataSourcesDeffered;}t.getDataSourcesDeffered=t.sina.getDataSources().then(function(a){return jQuery.grep(a,function(b){return b.getType()!=='Category';});});return t.getDataSourcesDeffered;},notifyFilterChanged:function(){jQuery.each(this.aBindings,function(i,b){if(b.sPath==='/uiFilter/rootCondition'){b.checkUpdate(true);}});},addFilterCondition:function(a,b){if(a.attribute||a.conditions){this.getProperty("/uiFilter").autoInsertCondition(a);}else{this.setDataSource(a,false);}if(b||b===undefined){this._firePerspectiveQuery({preserveFormerResults:false});}this.notifyFilterChanged();},removeFilterCondition:function(a,b){if(a.attribute||a.conditions){this.getProperty("/uiFilter").autoRemoveCondition(a);}else{this.setDataSource(a,false);}if(b||b===undefined){this._firePerspectiveQuery({preserveFormerResults:true});}this.notifyFilterChanged();},resetFilterConditions:function(a){this.getProperty("/uiFilter").resetConditions();if(a||a===undefined){this._firePerspectiveQuery();}this.notifyFilterChanged();},doSuggestion:function(){this.suggestionHandler.doSuggestion(this.getProperty('/uiFilter').clone());},abortSuggestions:function(){this.suggestionHandler.abortSuggestions();},autoSelectAppSuggestion:function(a){return this.suggestionHandler.autoSelectAppSuggestion(a);},_firePerspectiveQuery:function(a,p){var t=this;this.initBusinessObjSearch().then(function(){var b=function(){return t._doFirePerspectiveQuery(a,p);};t.initPersonalization().then(b);});},_doFirePerspectiveQuery:function(a,p){var t=this;var b,e;if(jQuery.isPlainObject(a)){b=a.deserialization;e=a.preserveFormerResults;}else{b=a||undefined;e=p||undefined;}var u=this.getProperty('/uiFilter');if(u.equals(this.query.filter)&&this.getTop()===this.query.top&&this.isEqualOrderBy(this.getOrderBy(),this.query.sortOrder)&&this.getCalculateFacetsFlag()===this.query.calculateFacets&&!this.getProperty('/isQueryInvalidated')){return(new jQuery.Deferred()).resolve();}if(S.getUrlParameter('nlq')==='true'){this.query.setNlq(true);}if((this.query.filter.dataSource&&u.dataSource!==this.query.filter.dataSource)||(this.query.filter.searchTerm&&u.searchTerm!==this.query.filter.searchTerm)){this.resetOrderBy(false);}if(!b&&!e){if(!u.equals(this.query.filter)){this.resetTop();}}if(u.searchTerm!==this.query.filter.searchTerm||!u.rootCondition.equals(this.query.filter.rootCondition)){this.tabStripFormatter.invalidate(this.getDataSource());}if(this.getProperty('/isQueryInvalidated')===true){this.query.resetResultSet();this.setProperty('/isQueryInvalidated',false);}this.query.setFilter(this.getProperty('/uiFilter').clone());this.query.setTop(this.getTop());this.query.setSortOrder(this.assembleSortOrder());this.query.setCalculateFacets(this.getCalculateFacetsFlag());this.cleanErrors();this.setProperty("/queryFilter",this.query.filter);sap.ui.getCore().getEventBus().publish("allSearchStarted");if(b){this.setProperty('/busyDelay',0);}else{this.setProperty('/busyDelay',600);}this.setProperty('/isBusy',true);this.abortSuggestions();this.calculateVisibility();this.updateSearchURLSilently(b);this.eventLogger.logEvent({type:this.eventLogger.SEARCH_REQUEST,searchTerm:this.getProperty('/uiFilter/searchTerm'),dataSourceKey:this.getProperty('/uiFilter/dataSource').id});return jQuery.when.apply(null,[this.normalSearch(e),this.appSearch()]).then(function(){t.setProperty('/tabStrips',t.tabStripFormatter.format(t.getDataSource(),t.perspective,t));return t.oFacetFormatter.getFacets(t.getDataSource(),t.perspective,t).then(function(i){if(i&&i.length>0){i[0].change=jQuery.sap.now();t.setProperty('/facets',i);}});}).always(function(){document.title=t.getDocumentTitle();sap.ui.getCore().getEventBus().publish("allSearchFinished");t.setProperty('/isBusy',false);t.setProperty("/firstSearchWasExecuted",true);t.notifyFilterChanged();});},assembleSortOrder:function(){var a=this.getOrderBy();if(!a.orderBy){return[];}var b=this.sinaNext.SortOrder.Ascending;if(a.sortOrder==='DESC'){b=this.sinaNext.SortOrder.Descending;}return[{id:a.orderBy,order:b}];},getCalculateFacetsFlag:function(){if(this.getDataSource().type===this.sinaNext.DataSourceType.Category||this.getFacetVisibility()){return true;}return false;},appSearch:function(){var t=this;this.setProperty("/appResults",[]);this.setProperty("/appCount",0);if(!this.isAllCategory()&&!this.isAppCategory()){return jQuery.when(true);}var a=this.query.filter.dataSource===this.allDataSource?this.appTopDefault:this.query.top;return this.searchApplications(this.query.filter.searchTerm,a,0).then(function(r){t.setProperty("/appCount",r.totalResults);t.setProperty("/appResults",r.getElements());},function(e){t.pushError({type:"error",title:e.name,description:e,keep:e.keep});return jQuery.when(true);});},searchApplications:function(s,t,a){return sap.ushell.Container.getService("Search").queryApplications({searchTerm:s,top:t,skip:a});},transferLog:function(a){var b=a.getMessages();for(var i=0;i<b.length;++i){var e=b[i];this.pushError({type:e.severity,title:e.text,description:''});}},normalSearch:function(p){var t=this;if(!p){t.resetAndDisableMultiSelection();}if(!t.isBusinessObjSearchEnabled()||t.isAppCategory()){this.setProperty("/boResults",[]);this.setProperty("/origBoResults",[]);this.setProperty("/boCount",0);this.setProperty("/nlqSuccess",false);this.setProperty("/nlqDescription","");return jQuery.when(true);}var q=new jQuery.Deferred();var s=function(a){t.transferLog(a.log);t.perspective=a;t.setProperty("/nlqSuccess",false);if(a.nlqSuccess){t.setProperty("/nlqSuccess",true);t.setProperty("/nlqDescription",a.title);}t._afterSearchPrepareResultList(t.perspective,p).then(function(){q.resolve();});};var e=function(a){t.normalSearchErrorHandling(a);t.perspective=null;q.resolve();};t.setDataSource(t.getDataSource(),false,false);t.query.setCalculateFacets(t.getCalculateFacetsFlag());t.query.getResultSetAsync().then(function(a){return s(a);},e);return q;},_prepareTableResults:function(r){var t=this;var i,j,k;var e=[];var p=this.sinaNext.dataSourceMap[this.getDataSource().id].attributesMetadata;for(i=0;i<p.length;i++){if(p[i].usage.Detail&&p[i].group===undefined&&p[i].type!=="GeoJson"&&p[i].id.match(/latitude|longitude/i)==null&&p[i].type!==t.sinaNext.AttributeType.ImageUrl){e.push(p[i]);}}var q=function(a,b){if(a.usage.Detail.displayOrder<b.usage.Detail.displayOrder){return-1;}if(a.usage.Detail.displayOrder>b.usage.Detail.displayOrder){return 1;}return 0;};e.sort(q);var s=r;var u="\u2013";for(i=0;i<r.length;i++){s[i].cells=[];for(j=0;j<e.length;j++){s[i].cells[j]={};}}for(i=0;i<r.length;i++){var v=r[i].itemattributes;for(j=0;j<e.length;j++){for(k=0;k<v.length;k++){if(e[j].id===v[k].key){s[i].cells[j]={value:v[k].value.trim().length!==0?v[k].value:u};}}}if(r[i].hasTitleDescription){s[i].cells.unshift({value:r[i].titleDescription.trim().length!==0?r[i].titleDescription:u});}s[i].cells.unshift({value:r[i].title.trim().length!==0?r[i].title:u,uri:r[i].uri,titleNavigation:r[i].titleNavigation,isTitle:true});if(r[i].navigationObjects!==undefined&&r[i].navigationObjects.length>0){s[i].cells.push({value:sap.ushell.resources.i18n.getText("intents"),navigationObjects:r[i].navigationObjects,isRelatedApps:true});}}t.setProperty("/tableResults",s);var w=[];var x=[];for(i=0;i<e.length;i++){if(e[i].id.match(/latitude|longitude/i)==null&&e[i].type!==t.sinaNext.AttributeType.ImageUrl){w.push({name:e[i].label,attributeId:e[i].id});}}if(r[0].hasTitleDescription){var y="";e.forEach(function(A){if(A.usage.TitleDescription){y=y+A.label+" ";}});y=y+"("+sap.ushell.resources.i18n.getText("titleDescription")+")";w.unshift({name:y,attributeId:"SEARCH_TABLE_TITLE_DESCRIPTION_COLUMN"});}w.unshift({name:t.getDataSource().label,attributeId:"SEARCH_TABLE_TITLE_COLUMN"});var z=s[0].cells.length-1;if(s[0].cells[z].isRelatedApps){w.push({name:sap.ushell.resources.i18n.getText("intents"),attributeId:"SEARCH_APPS_AS_ID"});}for(i=0;i<w.length;i++){w[i].key="searchColumnKey"+i;w[i].index=i;}t.setProperty("/tableColumns",w);for(i=0;i<p.length;i++){var A=p[i];if(A.isSortable){x.push({name:A.label,key:"searchSortableColumnKey"+i,attributeId:A.id,selected:t.getProperty("/orderBy").orderBy===A.id});}}var B=function(a,b){if(a.name<b.name){return-1;}if(a.name>b.name){return 1;}return 0;};x.sort(B);x.unshift({name:sap.ushell.resources.i18n.getText("defaultRank"),key:"searchSortableColumnKeyDefault",attributeId:"",selected:jQuery.isEmptyObject(t.getProperty("/orderBy"))});t.setProperty("/tableSortableColumns",x);},_afterSearchPrepareResultList:function(s,p){var t=this;t.setProperty("/boCount",s.totalCount);var i;t.setProperty("/boResults",[]);t.setProperty("/origBoResults",s.items);t.setProperty("/boCount",0);var a=new c();var b=a.format(s,t.query.filter.searchTerm);var e;var j=[];var k=[];for(i=0;i<b.length;i++){e=b[i];j.push(e.dataSource);k.push({isDocumentConnector:e.isDocumentConnector});}var q=t.config.loadCustomModulesForDataSourcesAsync(j,k);var r=$.Deferred();Promise.all([Promise.resolve(s),q]).then(function(u){var s=u[0];if(!t.isAllCategory()&&!t.isOtherCategory()&&!t.isAppCategory()&&s.totalCount>0){if(s.items[0].titleDescriptionAttributes.length>0){b.forEach(function(v){v.hasTitleDescription=true;});}t._prepareTableResults(b);}t.setProperty("/boCount",s.totalCount);t.setProperty("/boResults",b);t.enableOrDisableMultiSelection();r.resolve();});return r.promise();},resetAndDisableMultiSelection:function(){this.setProperty("/multiSelectionAvailable",false);this.setProperty("/multiSelectionEnabled",false);},enableOrDisableMultiSelection:function(){var a=this.getDataSource();var b=this.config.getDataSourceConfig(a);var s=new b.searchResultListSelectionHandlerControl();if(s){this.setProperty("/multiSelectionAvailable",s.isMultiSelectionAvailable());}else{this.setProperty("/multiSelectionAvailable",false);}},_endWith:function(s,a){return s.indexOf(a,s.length-a.length)!==-1;},calculatePlaceholder:function(){var t=this;if(t.isAllCategory()){return sap.ushell.resources.i18n.getText("search");}return sap.ushell.resources.i18n.getText("searchInPlaceholder",t.getDataSource().labelPlural);},updateDataSourceList:function(a){var b=this.getProperty('/dataSources');while(b.length>0&&b[0]!==this.allDataSource){b.shift();}if(a===this.allDataSource||a===this.appDataSource){return;}if(a&&a.id){if(a.id.indexOf('~')>=0){return;}}for(var i=0;i<b.length;++i){var e=b[i];if(e===a){return;}}b.unshift(a);this.setProperty('/dataSources',b);},invalidateQuery:function(){this.setProperty('/isQueryInvalidated',true);},autoStartApp:function(){var t=this;if(t.getProperty("/appCount")&&t.getProperty("/appCount")===1&&t.getProperty("/count")&&t.getProperty("/count")===1){var a=t.getProperty("/appResults");if(a&&a.length>0&&a[0]&&a[0].url&&t.getProperty('/uiFilter/searchTerm')&&a[0].tooltip&&t.getProperty('/uiFilter/searchTerm').toLowerCase().trim()===a[0].tooltip.toLowerCase().trim()){if(a[0].url[0]==='#'){window.location.href=a[0].url;}else{window.open(a[0].url,'_blank');}}}},getResultToDisplay:function(){return this.getProperty('/resultToDisplay');},setResultToDisplay:function(t){this.setProperty('/resultToDisplay',t);S.saveResultViewType(t);},calculateVisibility:function(){var t=this;if(t.isAppCategory()){t.setResultToDisplay("appSearchResult");t.setProperty('/displaySwitchVisibility',false);}else if(t.isAllCategory()||t.isOtherCategory()){t.setResultToDisplay("searchResultList");t.setProperty('/displaySwitchVisibility',false);}else{var r=t.getResultToDisplay();if(!(r==="searchResultList"||r==="searchResultTable"||r==="searchResultMap")){t.setResultToDisplay("searchResultList");}t.setProperty('/displaySwitchVisibility',true);}},calculateSearchButtonStatus:function(){if(this.getDataSource()===this.getProperty('/defaultDataSource')&&this.getSearchBoxTerm().length===0){this.setProperty('/searchButtonStatus','close');}else{this.setProperty('/searchButtonStatus','search');}},calculateResultList:function(){var t=this;var r=[];var b=t.getProperty('/boResults');if(b&&b.length){r.push.apply(r,b);}var a=t.getProperty('/appResults');if(a&&a.length>0){var e={type:'appcontainer',tiles:a};if(r.length>0){if(r.length>3){r.splice(3,0,e);}else{r.push(e);}}else{r=[e];}}sap.ui.model.json.JSONModel.prototype.setProperty.apply(this,['/results',r]);},getDebugInfo:function(){var t=[this.sinaNext.getDebugInfo()];return t.join('\n');},getErrors:function(){return this.getProperty('/errors');},cleanErrors:function(){this.setProperty('/errors',jQuery.grep(this.getProperty('/errors'),function(e){return e.keep;}));},pushError:function(e){var t=this;e.title=e.title==="[object Object]"?sap.ushell.resources.i18n.getText('searchError'):e.title;var a=this.getProperty('/errors');a.push(e);t.setProperty('/errors',a);},normalSearchErrorHandling:function(e){if(!e){return;}this.setProperty("/boResults",[]);this.setProperty("/origBoResults",[]);this.setProperty("/boCount",0);this.setProperty("/nlqSuccess",false);this.setProperty("/nlqDescription","");var s=function(t){return t.replace(/<(?:.|\n)*?>|[{}]/gm,'');};if(e instanceof this.sinaNext.core.Exception){this.pushError({type:"error",title:e.message,description:s(e.description)+'\n'+this.getDebugInfo(),keep:e.keep});return;}this.pushError({type:"error",title:e.toString(),description:e.toString()+'\n'+this.getDebugInfo(),keep:e.keep});},updateSearchURLSilently:function(a){if(a){S.hasher.init();}else{var H=this.renderSearchURL();S.hasher.setHash(H);}},renderSearchURL:function(){return this.searchUrlParser.render();},parseURL:function(){this.searchUrlParser.parse();}});o.injectSearchShellHelper=function(_){n=n||_;};return o;});})(window);
