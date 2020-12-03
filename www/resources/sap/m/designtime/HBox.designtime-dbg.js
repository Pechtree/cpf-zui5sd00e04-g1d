/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.m.HBox control
sap.ui.define([],
	function () {
		"use strict";

		return {
			name: {
				singular: "HBOX_NAME",
				plural: "HBOX_NAME_PLURAL"
			},
			palette: {
				group: "LAYOUT",
				icons: {
					svg: "sap/m/designtime/HBox.icon.svg"
				}
			},
			templates: {
				create: "sap/m/designtime/HBox.create.fragment.xml"
			}
		};
	}, /* bExport= */ false);