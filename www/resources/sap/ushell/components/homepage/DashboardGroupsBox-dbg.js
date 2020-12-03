// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
/**
 * @fileOverview A module that is responsible for creating the groups part (i.e. box) of the dashboard.<br>
 * Extends <code>sap.ui.base.Object</code><br>
 * Exposes the public function <code>createGroupsBox</code>
 * @see sap.ushell.components.homepage.DashboardContent.view
 *
 * @version 1.65.1
 * @name sap.ushell.components.homepage.DashboardGroupsBox
 * @since 1.35.0
 * @private
 */
sap.ui.define([
    "sap/ushell/Layout",
    "sap/ui/base/Object",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ushell/ui/launchpad/Tile",
    "sap/ushell/ui/launchpad/DashboardGroupsContainer",
    "sap/ushell/EventHub",
    "sap/ushell/Config",
    "sap/ui/core/Component",
    "sap/m/GenericTile",
    "sap/base/Log",
    "sap/ui/Device",
    "sap/ui/integration/widgets/Card"
], function (
    Layout,
    baseObject,
    Filter,
    FilterOperator,
    LaunchpadTile,
    DashboardGroupsContainer,
    EventHub,
    Config,
    Component,
    GenericTile,
    Log,
    Device,
    Card
) {
    "use strict";

    /*global jQuery, sap */
    /*jslint nomen: true */
    var DashboardGroupsBox = baseObject.extend("sap.ushell.components.homepage.DashboardGroupsBox", {
        metadata: {
            publicMethods: ["createGroupsBox"]
        },
        constructor: function (sId, mSettings) {
            // Make this class only available once
            if (sap.ushell.components.homepage.getDashboardGroupsBox && sap.ushell.components.homepage.getDashboardGroupsBox()) {
                return sap.ushell.components.homepage.getDashboardGroupsBox();
            }
            sap.ushell.components.homepage.getDashboardGroupsBox = jQuery.sap.getter(this.getInterface());

            this.oController = undefined;
            this.oGroupsContainer = undefined;
            this.isLinkPersonalizationSupported = sap.ushell.Container.getService("LaunchPage").isLinkPersonalizationSupported();

            sap.ui.getCore().getEventBus().subscribe("launchpad", "actionModeActive", this._handleActionModeChange, this);
            sap.ui.getCore().getEventBus().subscribe("launchpad", "actionModeInactive", this._handleActionModeChange, this);
            sap.ui.getCore().getEventBus().subscribe("launchpad", "GroupHeaderVisibility", this._updateGroupHeaderVisibility, this);
        },
        destroy: function () {
            sap.ui.getCore().getEventBus().unsubscribe("launchpad", "actionModeActive", this._handleActionModeChange, this);
            sap.ui.getCore().getEventBus().unsubscribe("launchpad", "actionModeInactive", this._handleActionModeChange, this);
            sap.ui.getCore().getEventBus().unsubscribe("launchpad", "GroupHeaderVisibility", this._updateGroupHeaderVisibility, this);
            sap.ushell.components.homepage.getDashboardGroupsBox = undefined;
        },

        calculateFilter: function () {
            // get the homeGroupDisplayMode and do the filter accordingly
            var filters = [];
            var oFilter;
            var sGroupsMode = this.oModel.getProperty("/homePageGroupDisplay"),
                bEditMode = this.oModel.getProperty("/tileActionModeActive");

            if (!bEditMode) {
                if (sGroupsMode && sGroupsMode === "tabs") {
                    oFilter = new Filter("isGroupSelected", FilterOperator.EQ, true);
                } else {
                    oFilter = new Filter("isGroupVisible", FilterOperator.EQ, true);
                }
                filters.push(oFilter);
            }

            return filters;
        },

        /**
         * Creating the groups part (i.e. box) of the dashboard
         */
        createGroupsBox: function (oController, oModel) {
            this.oController = oController;
            var that = this,
                fAfterLayoutInit,
                fGroupsContainerAfterRenderingHandler,
                getPlusTileFromGroup = function (oGroup) {
                    var groupDomRef,
                        plusTileDomRef;
                    if (oGroup && (groupDomRef = oGroup.getDomRef())) {
                        plusTileDomRef = groupDomRef.querySelector(".sapUshellPlusTile");
                        if (plusTileDomRef) {
                            return plusTileDomRef;
                        }
                    }
                    return null;
                },
                reorderTilesCallback = function (layoutInfo) {
                    var plusTileStartGroup = getPlusTileFromGroup(layoutInfo.currentGroup),
                        plusTileEndGroup = getPlusTileFromGroup(layoutInfo.endGroup),
                        isPlusTileVanishRequired = (layoutInfo.tiles[layoutInfo.tiles.length - 2] === layoutInfo.item) || (layoutInfo.endGroup.getTiles().length === 0);
                    if (isPlusTileVanishRequired) {
                        that._hidePlusTile(plusTileEndGroup);
                    } else {
                        that._showPlusTile(plusTileEndGroup);
                    }

                    if (layoutInfo.currentGroup !== layoutInfo.endGroup) {
                        that._showPlusTile(plusTileStartGroup);
                    }
                };

            //Since the layout initialization is async, we need to execute the below function after initialization is done
            fAfterLayoutInit = function () {
                //Prevent Plus Tile influence on the tiles reordering by exclude it from the layout matrix calculations
                Layout.getLayoutEngine().setExcludedControl(sap.ushell.ui.launchpad.PlusTile);
                //Hide plus tile when collision with it
                Layout.getLayoutEngine().setReorderTilesCallback.call(Layout.layoutEngine, reorderTilesCallback);
            };

            fGroupsContainerAfterRenderingHandler = function () {

                if (!Layout.isInited) {
                    Layout.init({
                        getGroups: this.getGroups.bind(this),
                        getAllGroups: that.getAllGroupsFromModel.bind(that),
                        isTabBarActive: that.isTabBarActive.bind(that),
                        animationsEnabled: (that.oModel.getProperty("/animationMode") === "full")
                    }).done(fAfterLayoutInit);

                    //when media is changed we need to rerender Layout
                    //media could be changed by SAPUI5 without resize, or any other events. look for internal Incident ID: 1580000668
                    Device.media.attachHandler(function () {
                        if (!this.bIsDestroyed) {
                            Layout.reRenderGroupsLayout(null);
                        }
                    }, this, Device.media.RANGESETS.SAP_STANDARD);

                    var oDomRef = this.getDomRef();
                    oController.getView().sDashboardGroupsWrapperId = !jQuery.isEmptyObject(oDomRef) && oDomRef.parentNode ? oDomRef.parentNode.id : "";
                }
                Layout.reRenderGroupsLayout(null);

                if (this.getGroups().length) {
                    if (oController.bModelInitialized) {
                        oController._initializeUIActions();
                    }

                    oController._addBottomSpace();

                    //Tile opacity is enabled by default, therefore we handle tile opacity in all cases except
                    //case where flag is explicitly set to false
                    if (this.getModel().getProperty("/enableTilesOpacity")) {
                        sap.ushell.utils.handleTilesOpacity(this.getModel());
                    }
                    //the calculation of tiles visibility is called in DashboardContent.view.js
                }
                EventHub.emit("CenterViewPointContentRendered", {"groups": this.getGroups().length});
                sap.ui.getCore().getEventBus().publish("launchpad", "contentRendered");
                sap.ui.getCore().getEventBus().publish("launchpad", "contentRefresh");
                this.getBinding("groups").filter(that.calculateFilter());
            };

            this.isTabBarActive = function () {
                return this.oModel.getProperty("/homePageGroupDisplay") === "tabs";
            };

            this.oModel = oModel;
            var filters = this.calculateFilter(),
                bUseGridContainer = Config.last("/core/home/gridContainer");

            this.oGroupsContainer = new DashboardGroupsContainer("dashboardGroups", {
                accessibilityLabel: sap.ushell.resources.i18n.getText("DashboardGroups_label"),
                displayMode: "{/homePageGroupDisplay}",
                afterRendering: fGroupsContainerAfterRenderingHandler
            });

            if (bUseGridContainer) {
                sap.ui.require(["sap/ushell/ui/launchpad/GridContainer"], function (GridContainer) {
                    that.oGroupsContainer.bindAggregation("groups", {
                        filters: filters,
                        path: "/groups",
                        factory: function () {
                            return that._createGridContainer(oController, oModel);
                        }
                    });
                });
            } else {
                this.oGroupsContainer.bindAggregation("groups", {
                    filters: filters,
                    path: "/groups",
                    factory: function () {
                        return that._createTileContainer(oController, oModel);
                    }
                });
            }


            this.oGroupsContainer.addEventDelegate({
                onsapskipback: function (oEvent) {
                    oEvent.preventDefault();
                    sap.ushell.renderers.fiori2.AccessKeysHandler.setIsFocusHandledByAnotherHandler(true);

                    if (jQuery(".sapUshellAnchorItem:visible:first").length) {
                        sap.ushell.components.homepage.ComponentKeysHandler.goToSelectedAnchorNavigationItem();
                    } else {
                        sap.ushell.renderers.fiori2.AccessKeysHandler.sendFocusBackToShell(oEvent);
                    }
                },
                onsapskipforward: function (oEvent) {
                    oEvent.preventDefault();
                    var floatingFooterDoneBtn = jQuery("#sapUshellDashboardFooterDoneBtn:visible");
                    if (floatingFooterDoneBtn.length) {
                        floatingFooterDoneBtn.focus();
                    } else if (jQuery("#sapUshellFloatingContainerWrapper:visible").length && oEvent.originalEvent.srcElement.id !== "") {
                        // if co-pilot exists and we came from tile - need to focus on copilot - otherwise - on the shell header
                        sap.ui.getCore().getEventBus().publish("launchpad", "shellFloatingContainerIsAccessible");
                    } else {
                        sap.ushell.renderers.fiori2.AccessKeysHandler.setIsFocusHandledByAnotherHandler(true);
                        sap.ushell.renderers.fiori2.AccessKeysHandler.sendFocusBackToShell(oEvent);
                    }
                },
                onsaptabnext: function (oEvent) {
                    if (that.oModel.getProperty("/tileActionModeActive")) {
                        if (jQuery(document.activeElement).closest(".sapUshellTileContainerHeader").length) {
                            // We are inside the header.
                            // ONLY focused element is last before the tiles-list we call to set focus on tiles list.
                            // otherwise - let the browser handle it.

                            var jqCurrentTileContainer = jQuery(document.activeElement).closest(".sapUshellTileContainer");

                            // Inside header we can be on 2 section elements - title OR on a header action button
                            // check if we are on the title itself
                            var isCurrentElementTitle = jQuery(document.activeElement).hasClass("sapUshellContainerTitle");

                            // Search for actions inside the header title element
                            var jqChildActions = jqCurrentTileContainer.find(".sapUshellHeaderActionButton");

                            if (isCurrentElementTitle && !jqChildActions.length || document.activeElement.id === jqChildActions.last()[0].id) {
                                if (jqCurrentTileContainer.find(".sapUshellTile:visible, .sapUshellLink:visible, .sapFCard:visible").length) {
                                    oEvent.preventDefault();
                                    sap.ushell.components.homepage.ComponentKeysHandler.goToLastVisitedTile(jqCurrentTileContainer, true);
                                    return;
                                }
                            }

                            if (jqChildActions.length && document.activeElement.id !== jqChildActions.last()[0].id) {
                                return;
                            }
                        }

                        var floatingFooterDoneBtn = jQuery("#sapUshellDashboardFooterDoneBtn:visible");
                        if (floatingFooterDoneBtn.length) {
                            oEvent.preventDefault();
                            floatingFooterDoneBtn.focus();
                            return;
                        }
                    }

                    oEvent.preventDefault();
                    if (jQuery("#sapUshellFloatingContainerWrapper:visible").length && (oEvent.originalEvent.srcElement.id) !== "") {
                        sap.ui.getCore().getEventBus().publish("launchpad", "shellFloatingContainerIsAccessible");
                    } else {
                        sap.ushell.renderers.fiori2.AccessKeysHandler.setIsFocusHandledByAnotherHandler(true);
                        sap.ushell.renderers.fiori2.AccessKeysHandler.sendFocusBackToShell(oEvent);
                    }
                },
                onsaptabprevious: function (oEvent) {
                    sap.ushell.renderers.fiori2.AccessKeysHandler.setIsFocusHandledByAnotherHandler(true);
                    var jqFocused = jQuery(":focus");
                    if (!that.oModel.getProperty("/tileActionModeActive") || jqFocused.hasClass("sapUshellTileContainerHeader")) {
                        oEvent.preventDefault();
                        var jqElement = jQuery(".sapUshellAnchorItem:visible:first"),
                            jqOverflowElement = jQuery(".sapUshellAnchorItemOverFlow");
                        if (!jqElement.length) {
                            sap.ushell.renderers.fiori2.AccessKeysHandler.sendFocusBackToShell(oEvent);
                        }
                        if (jqOverflowElement.hasClass("sapUshellShellHidden")) {
                            sap.ushell.components.homepage.ComponentKeysHandler.goToSelectedAnchorNavigationItem();
                        } else {
                            jqOverflowElement.find("button").focus();
                        }
                        // only in case we in edit mode
                    } else if (that.oModel.getProperty("/tileActionModeActive")) {
                        var jqActiveElement = jQuery(document.activeElement);

                        // only in case focus is on a tile we need custom behavior upon shift-tab
                        // otherwise let the browser handle it
                        if (jqActiveElement.hasClass("sapUshellTile")) {
                            oEvent.preventDefault();

                            // take reference to current tile container
                            var jqCurrentTileContainer = jqActiveElement.closest(".sapUshellTileContainer");

                            //  search for actions inside the header title element
                            var jqLastAction = jqCurrentTileContainer.find(".sapUshellHeaderActionButton:visible").last();

                            // check if actions exist on header title element
                            // if there are actions of tile container header - focus on last one
                            if (jqLastAction.length > 0) {
                                jqLastAction.focus();
                            } else {
                                // else focus on title
                                jqCurrentTileContainer.find(".sapUshellContainerTitle").focus();
                            }
                        }
                    }
                }
            });
            return this.oGroupsContainer;
        },
        getAllGroupsFromModel: function () {
            return this.oModel.getProperty("/groups");
        },

        _createTileContainer: function (oController, oModel) {
            var that = this,
                oFilter = new Filter("isTileIntentSupported", FilterOperator.EQ, true),
                oTilesContainer = new sap.ushell.ui.launchpad.TileContainer({
                    headerText: "{title}",
                    showEmptyLinksArea: {
                        parts: ["/tileActionModeActive", "links/length", "isGroupLocked", "/isInDrag", "/homePageGroupDisplay"],
                        formatter: function (tileActionModeActive, numOfLinks, isGroupLocked, bIsInDrag, sAnchorbarMode) {
                            if (numOfLinks) {
                                return true;
                            } else if (isGroupLocked) {
                                return false;
                            }
                                return tileActionModeActive || bIsInDrag && sAnchorbarMode === "tabs";

                        }
                    },
                    showMobileActions: {
                        parts: ["/tileActionModeActive"],
                        formatter: function (bIsActionModeActive) {
                            return bIsActionModeActive && !this.getDefaultGroup();
                        }
                    },
                    showIcon: {
                        parts: ["/isInDrag", "/tileActionModeActive"],
                        formatter: function (bIsInDrag, bIsActionModeActive) {
                            return (this.getIsGroupLocked() && (bIsInDrag || bIsActionModeActive));
                        }
                    },
                    deluminate: {
                        parts: ["/isInDrag"],
                        formatter: function (bIsInDrag) {
                            //  return oEvent.oSource.getIsGroupLocked() && bIsInDrag;
                            return this.getIsGroupLocked() && bIsInDrag;
                        }
                    },
                    transformationError: {
                        parts: ["/isInDrag", "/draggedTileLinkPersonalizationSupported"],
                        formatter: function (bIsInDrag, bDraggedTileLinkPersonalizationSupported) {
                            return bIsInDrag && !bDraggedTileLinkPersonalizationSupported;
                        }

                    },
                    showBackground: "{/tileActionModeActive}",
                    tooltip: "{title}",
                    tileActionModeActive: "{/tileActionModeActive}",
                    ieHtml5DnD: oController.getView().ieHtml5DnD,
                    enableHelp: "{/enableHelp}",
                    groupId: "{groupId}",
                    defaultGroup: "{isDefaultGroup}",
                    isLastGroup: "{isLastGroup}",
                    isGroupLocked: "{isGroupLocked}",
                    isGroupSelected: "{isGroupSelected}",
                    showHeader: true,
                    showGroupHeader: "{showGroupHeader}",
                    homePageGroupDisplay: "{/homePageGroupDisplay}",
                    editMode: "{editMode}",
                    supportLinkPersonalization: this.isLinkPersonalizationSupported,
                    titleChange: function (oEvent) {
                        sap.ui.getCore().getEventBus().publish("launchpad", "changeGroupTitle", {
                            groupId: oEvent.getSource().getGroupId(),
                            newTitle: oEvent.getParameter("newTitle")
                        });
                    },
                    showEmptyLinksAreaPlaceHolder: {
                        parts: ["links/length", "/isInDrag", "/homePageGroupDisplay"],
                        formatter: function (numOfLinks, bIsInDrag, sAnchorbarMode) {
                            return bIsInDrag && sAnchorbarMode === "tabs" && !numOfLinks;
                        }
                    },
                    showPlaceholder: {
                        parts: ["/tileActionModeActive", "tiles/length"],
                        formatter: function (tileActionModeActive) {
                            return tileActionModeActive && !this.getIsGroupLocked();
                        }
                    },
                    visible: {
                        parts: ["/tileActionModeActive", "isGroupVisible", "visibilityModes"],
                        formatter: function (tileActionModeActive, isGroupVisible, visibilityModes) {
                            //Empty groups should not be displayed when personalization is off or if they are locked or default group not in action mode
                            if (!visibilityModes[tileActionModeActive ? 1 : 0]) {
                                return false;
                            }
                            return isGroupVisible || tileActionModeActive;
                        }
                    },
                    hidden: {
                        parts: ["/tileActionModeActive", "isGroupVisible"],
                        formatter: function (bIsActionModeActive, bIsGroupVisible) {
                            return bIsActionModeActive && !bIsGroupVisible;
                        }
                    },
                    links: this._getLinkTemplate(),
                    tiles: {
                        path: "tiles",
                        factory: this._itemFactory.bind(this),
                        filters: [oFilter]
                    },
                    add: /*oController._addTileContainer,*/ function (oEvent) {
                        //Fix internal incident #1780370222 2017
                        if (document.toDetail) {
                            document.toDetail();
                        }
                        Component.getOwnerComponentFor(that.oController.getView().parentComponent).getRouter().navTo("appfinder", {
                            "innerHash*": "catalog/" + JSON.stringify({
                                targetGroup: encodeURIComponent(oEvent.getSource().getBindingContext().sPath)
                            })
                        });
                    }
                });
            return oTilesContainer;
        },

        _createGridContainer: function (oController, oModel) {
            var GridContainer = sap.ui.require("sap/ushell/ui/launchpad/GridContainer"),
                oFilter = new Filter("isTileIntentSupported", FilterOperator.EQ, true);
            return new GridContainer({
                groupId: "{groupId}",
                showHeader: true,
                defaultGroup: "{isDefaultGroup}",
                isLastGroup: "{isLastGroup}",
                headerText: "{title}",
                showGroupHeader: "{showGroupHeader}",
                homePageGroupDisplay: "{/homePageGroupDisplay}",
                visible: {
                    parts: ["/tileActionModeActive", "isGroupVisible", "visibilityModes"],
                    formatter: function (tileActionModeActive, isGroupVisible, visibilityModes) {
                        //Empty groups should not be displayed when personalization is off or if they are locked or default group not in action mode
                        if (!visibilityModes[tileActionModeActive ? 1 : 0]) {
                            return false;
                        }
                        return isGroupVisible || tileActionModeActive;
                    }
                },
                isGroupLocked: "{isGroupLocked}",
                isGroupSelected: "{isGroupSelected}",
                editMode: "{editMode}",
                showBackground: "{/tileActionModeActive}",
                showIcon: {
                    parts: ["/isInDrag", "/tileActionModeActive"],
                    formatter: function (bIsInDrag, bIsActionModeActive) {
                        return (this.getIsGroupLocked() && (bIsInDrag || bIsActionModeActive));
                    }
                },
                tileActionModeActive: "{/tileActionModeActive}",
                supportLinkPersonalization: this.isLinkPersonalizationSupported,
                ieHtml5DnD: oController.getView().ieHtml5DnD,
                enableHelp: "{/enableHelp}",
                showEmptyLinksAreaPlaceHolder: {
                    parts: ["links/length", "/isInDrag", "/homePageGroupDisplay"],
                    formatter: function (numOfLinks, bIsInDrag, sAnchorbarMode) {
                        return bIsInDrag && sAnchorbarMode === "tabs" && !numOfLinks;
                    }
                },
                showEmptyLinksArea: {
                    parts: ["/tileActionModeActive", "links/length", "isGroupLocked", "/isInDrag", "/homePageGroupDisplay"],
                    formatter: function (tileActionModeActive, numOfLinks, isGroupLocked, bIsInDrag, sAnchorbarMode) {
                        if (numOfLinks) {
                            return true;
                        } else if (isGroupLocked) {
                            return false;
                        }
                            return tileActionModeActive || bIsInDrag && sAnchorbarMode === "tabs";

                    }
                },
                titleChange: function (oEvent) {
                    sap.ui.getCore().getEventBus().publish("launchpad", "changeGroupTitle", {
                        groupId: oEvent.getSource().getGroupId(),
                        newTitle: oEvent.getParameter("newTitle")
                    });
                },
                tooltip: "{title}",
                links: this._getLinkTemplate(),
                tiles: {
                    path: "tiles",
                    factory: this._itemFactory.bind(this),
                    filters: [oFilter]
                }
            });
        },

        _getLinkTemplate: function () {
            var oFilter = new Filter("isTileIntentSupported", FilterOperator.EQ, true);

            if (!this.isLinkPersonalizationSupported) {
                return {
                    path: "links",
                    templateShareable: true,
                    template: new sap.ushell.ui.launchpad.LinkTileWrapper({
                        uuid: "{uuid}",
                        tileCatalogId: "{tileCatalogId}",
                        target: "{target}",
                        isLocked: "{isLocked}",
                        tileActionModeActive: "{/tileActionModeActive}",
                        animationRendered: false,
                        debugInfo: "{debugInfo}",
                        ieHtml5DnD: this.oController.getView().ieHtml5DnD,
                        tileViews: {
                            path: "content",
                            factory: function (sId, oContext) {
                                return oContext.getObject();
                            }
                        },
                        afterRendering: function (oEvent) {
                            var jqHrefElement = jQuery(this.getDomRef().getElementsByTagName("a"));
                            // Remove tabindex from links
                            //  so that the focus will not be automatically set on the focusable link when returning to the launchpad
                            jqHrefElement.attr("tabindex", -1);
                        }
                    }),
                    filters: [oFilter]
                };
            }
            return {
                path: "links",
                factory: function (sId, oContext) {
                    var oControl = oContext.getObject().content[0];
                    if (oControl && oControl.bIsDestroyed) {
                        oControl = oControl.clone();
                        oContext.getModel().setProperty(oContext.getPath() + "/content/0", oControl);
                    }
                    return oControl;

                },
                filters: [oFilter]
            };

        },

        _itemFactory: function (sId, oContext) {
            var oTileOrCard = oContext.getProperty(oContext.sPath),
                aContent,
                oContent,
                oControl,
                oManifest;

            if (oTileOrCard) {
                if (oTileOrCard.isCard) {
                    aContent = oTileOrCard && oTileOrCard.content;
                    oContent = aContent && aContent.length && aContent[0];
                    if (oContent && oContent["sap.card"]) {
                        oManifest = oContent;
                    } else {
                        // Placeholder manifest for blind loading
                        oManifest = {
                            "sap.flp": oTileOrCard.manifest && oTileOrCard.manifest["sap.flp"],
                            "sap.card": {
                                "type": "List"
                            }
                        };
                    }

                    oControl = new Card({
                        manifest: oManifest
                    });
                } else {
                    oControl = this._createTile();
                }
                oTileOrCard.controlId = oControl && oControl.getId && oControl.getId();
            }
            return oControl;
        },

        /**
         * Creates a generic error tile. It will be displayed with a generic "Cannot load tile" subheader.
         *
         * @returns {sap.ushell.ui.launchpad.Tile} The Launchpad Tile containing a GenericTile in error mode
         *
         * @private
         */
        _createErrorTile: function () {
            return new LaunchpadTile({
                tileViews: {
                    path: "content",
                    factory: function () {
                        return new GenericTile({
                            state: "Failed"
                        });
                    }
                }
            });
        },

        _createTile: function () {
            var oTile = new LaunchpadTile({
                "long": "{long}",
                // The model flag draggedInTabBarToSourceGroup was set for the tile in when it was dragged on TabBar between groups
                isDraggedInTabBarToSourceGroup: "{draggedInTabBarToSourceGroup}",
                uuid: "{uuid}",
                tileCatalogId: "{tileCatalogId}",
                isCustomTile: "{isCustomTile}",
                target: "{target}",
                isLocked: "{isLocked}",
                navigationMode: "{navigationMode}",
                tileActionModeActive: "{/tileActionModeActive}",
                showActionsIcon: "{showActionsIcon}",
                rgba: "{rgba}",
                animationRendered: false,
                debugInfo: "{debugInfo}",
                ieHtml5DnD: this.oController.getView().ieHtml5DnD,
                tileViews: {
                    path: "content",
                    factory: function (sId, oContext) {
                        return oContext.getObject();
                    }
                },
                coverDivPress: function (oEvent) {
                    // if this tile had just been moved and the move itself did not finish refreshing the tile's view
                    // we do not open the actions menu to avoid inconsistencies
                    if (!oEvent.oSource.getBindingContext().getObject().tileIsBeingMoved) {
                        sap.ushell.components.homepage.ActionMode._openActionsMenu(oEvent);
                    }
                },
                showActions: function (oEvent) {
                    sap.ushell.components.homepage.ActionMode._openActionsMenu(oEvent);
                },
                deletePress: function (oEvent) {
                    var oTileControl = oEvent.getSource(), oTile = oTileControl.getBindingContext().getObject().object,
                        oData = {originalTileId: sap.ushell.Container.getService("LaunchPage").getTileId(oTile)};

                    sap.ui.getCore().getEventBus().publish("launchpad", "deleteTile", oData, this);
                }, // TODO Call this controller function: this.oController._dashboardDeleteTileHandler,
                press: [ this.oController.dashboardTilePress, this.oController ]
            });
            var oViewPortContainer = sap.ui.getCore().byId("viewPortContainer");
            oTile.addEventDelegate({
                onclick: function (oEvent) {
                    jQuery.sap.measure.start("FLP:DashboardGroupsBox.onclick", "Click on tile", "FLP");
                    jQuery.sap.measure.start("FLP:OpenApplicationonClick", "Open Application", "FLP");
                    function endTileMeasurement () {
                        jQuery.sap.measure.end("FLP:DashboardGroupsBox.onclick");
                        oViewPortContainer.detachAfterNavigate(endTileMeasurement);
                    }
                    oViewPortContainer.attachAfterNavigate(endTileMeasurement);
                }
            });
            return oTile;
        },
        _updateGroupHeaderVisibility: function (oA, oB, oGroup) {
            this._updateFirstGroupHeaderVisibility(
                oGroup.group.getModel().getProperty("/tileActionModeActive"),
                this.oModel.getProperty("/homePageGroupDisplay") !== "tabs");
        },
        _updateFirstGroupHeaderVisibility: function (bIsEditMode, bEnableAnchorBar) {
            var aGroups = this.oGroupsContainer.getGroups(),
                iFirstVisible = undefined,
                iVisibleGroups = 0;

            for (var i = 0; i < aGroups.length; i++) {
                if (aGroups[i].getProperty("visible")) {
                    iVisibleGroups++;

                    if (iFirstVisible === undefined) {
                        iFirstVisible = i;
                    } else {
                        aGroups[i].setShowGroupHeader(bIsEditMode || bEnableAnchorBar);
                    }
                }
            }

            if (iFirstVisible !== undefined) {
                var sGroupsMode = this.oModel.getProperty("/homePageGroupDisplay"),
                    bVisible = bIsEditMode || (iVisibleGroups == 1 && bEnableAnchorBar),
                    bFirstGroup = aGroups.length > 1 || sGroupsMode === "tabs";
                aGroups[iFirstVisible].setShowGroupHeader(bVisible, bFirstGroup);
            }
        },
        _handleActionModeChange: function () {
            var bActiveMode = this.oModel.getProperty("/tileActionModeActive");
            if (bActiveMode) {
                this._addTileContainersContent();
            } else {
                // in order to set groups again to their right position after closing edit mode, we will need to re-render
                // the groups layout. We need it for the Locked Groups Compact Layout feature
                Layout.reRenderGroupsLayout(null);
            }
        },

        _addTileContainersContent: function () {
            var aGroups = this.oGroupsContainer.getGroups();
            for (var i = 0; i < aGroups.length; i++) {
                var oGroup = aGroups[i];

                if (!oGroup.getBeforeContent().length) {
                    oGroup.addBeforeContent(this._getBeforeContent());
                }

                if (!oGroup.getAfterContent().length) {
                    oGroup.addAfterContent(this._getAfterContent());
                }

                if (!oGroup.getHeaderActions().length) {
                    oGroup.addHeaderAction(this._getGroupHeaderAction());
                }
            }
        },

        _handleAddGroupButtonPress: function (oData) {
            this.oController._addGroupHandler(oData);
            this._addTileContainersContent();
        },

        _getBeforeContent: function () {
            var oAddGroupButton = new sap.m.Button({
                icon: "sap-icon://add",
                text: sap.ushell.resources.i18n.getText("add_group_at"),
                visible: "{= !${isGroupLocked} && !${isDefaultGroup} && ${/tileActionModeActive}}",
                enabled: "{= !${editTitle}}",
                press: [this._handleAddGroupButtonPress.bind(this)]
            });
            oAddGroupButton.addStyleClass("sapUshellAddGroupButton");
            oAddGroupButton.addCustomData(new sap.ushell.ui.launchpad.AccessibilityCustomData({
                key: "tabindex",
                value: "-1",
                writeToDom: true
            }));

            return oAddGroupButton;
        },
        _getAfterContent: function () {
            var oAddGroupButton = new sap.m.Button({
                icon: "sap-icon://add",
                text: sap.ushell.resources.i18n.getText("add_group_at"),
                visible: "{= ${isLastGroup} && ${/tileActionModeActive}}",
                enabled: "{= !${editTitle}}",
                press: [this._handleAddGroupButtonPress.bind(this)]
            }).addStyleClass("sapUshellAddGroupButton");
            oAddGroupButton.addStyleClass("sapUshellAddGroupButton");
            oAddGroupButton.addCustomData(new sap.ushell.ui.launchpad.AccessibilityCustomData({
                key: "tabindex",
                value: "-1",
                writeToDom: true
            }));

            return oAddGroupButton;
        },

        _getGroupHeaderAction: function () {
            return new sap.ushell.ui.launchpad.GroupHeaderActions({
                content: this._getHeaderActions(),
                tileActionModeActive: "{/tileActionModeActive}",
                isOverflow: "{/isPhoneWidth}"
            }).addStyleClass("sapUshellOverlayGroupActionPanel");
        },

        _getHeaderActions: function () {
            var aHeaderButtons = [];

            if (Config.last("/core/home/gridContainer")) {
                var oAddTileButton = new sap.m.Button({
                    text: sap.ushell.resources.i18n.getText("AddTileBtn"),
                    visible: "{= !${isGroupLocked}}",
                    enabled: "{= !${editTitle}}",
                    press: this._handleAddTileToGroup.bind(this)
                }).addStyleClass("sapUshellHeaderActionButton");

                if (Device.system.phone) {
                    oAddTileButton.setIcon("sap-icon://add");
                }

                aHeaderButtons.push(oAddTileButton);
            }

            aHeaderButtons.push(new sap.m.Button({
                text: {
                    path: "isGroupVisible",
                    formatter: function (bIsGroupVisible) {
                        return sap.ushell.resources.i18n.getText(bIsGroupVisible ? "HideGroupBtn" : "ShowGroupBtn");
                    }
                },
                icon: {
                    path: "isGroupVisible",
                    formatter: function (bIsGroupVisible) {
                        if (Device.system.phone) {
                            return bIsGroupVisible ? "sap-icon://hide" : "sap-icon://show";
                        }
                        return "";
                    }
                },
                visible: "{= ${/enableHideGroups} && !${isGroupLocked} && !${isDefaultGroup}}",
                enabled: "{= !${editTitle}}",
                press: function (oEvent) {
                    var oSource = oEvent.getSource(),
                        oGroupBindingCtx = oSource.getBindingContext();
                    this.oController._changeGroupVisibility(oGroupBindingCtx);
                }.bind(this)
            }).addStyleClass("sapUshellHeaderActionButton"));

            aHeaderButtons.push(new sap.m.Button({
                text: {
                    path: "removable",
                    formatter: function (bIsRemovable) {
                        return sap.ushell.resources.i18n.getText(bIsRemovable ? "DeleteGroupBtn" : "ResetGroupBtn");
                    }
                },
                icon: {
                    path: "removable",
                    formatter: function (bIsRemovable) {
                        if (Device.system.phone) {
                            return bIsRemovable ? "sap-icon://delete" : "sap-icon://refresh";
                        }
                        return "";
                    }
                },
                visible: "{= !${isDefaultGroup}}",
                enabled: "{= !${editTitle}}",
                press: function (oEvent) {
                    var oSource = oEvent.getSource(),
                        oGroupBindingCtx = oSource.getBindingContext();
                    this.oController._handleGroupDeletion(oGroupBindingCtx);
                }.bind(this)
            }).addStyleClass("sapUshellHeaderActionButton"));

            return aHeaderButtons;
        },
        _handleAddTileToGroup: function (oEvent) {
            if (document.toDetail) {
                document.toDetail();
            }
            Component.getOwnerComponentFor(this.oController.getView().parentComponent).getRouter().navTo("appfinder", {
                "innerHash*": "catalog/" + JSON.stringify({
                    targetGroup: encodeURIComponent(oEvent.getSource().getBindingContext().sPath)
                })
            });
        },
        _hidePlusTile: function (plusTileDomRef) {
            if (plusTileDomRef) {
                plusTileDomRef.classList.add("sapUshellHidePlusTile");
            }
        },
        _showPlusTile: function (plusTileDomRef) {
            if (plusTileDomRef) {
                plusTileDomRef.classList.remove("sapUshellHidePlusTile");
            }
        }
    });


	return DashboardGroupsBox;

});
