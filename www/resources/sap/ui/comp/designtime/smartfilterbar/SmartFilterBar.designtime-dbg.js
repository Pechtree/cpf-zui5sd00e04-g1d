/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */

// Provides the Design Time Metadata for the sap.ui.comp.smartfilterbar.SmartFilterBar control.
sap.ui.define([], function() {
	"use strict";
	return {
		annotations: {
			/**
			 * NonFilterableProperties defines whether a <code>Property</code> can be used for filtering data. All properties are filterable by
			 * default. In order to disable filtering capability, these properties must be excluded.
			 *
			 * <i>Example in OData V4 notation with Excluded Customer and CompanyCode Properties</i>
			 *
			 * <pre>
			 *    &lt;Annotation Term=&quot;Org.OData.Capabilities.V1.FilterRestrictions&quot;&gt;
			 *      &lt;PropertyValue Property=&quot;NonFilterableProperties&quot;&gt;
			 *        &lt;Collection&gt;
			 *          &lt;PropertyPath&gt;Customer&lt;/PropertyPath&gt;
			 *          &lt;PropertyPath&gt;CompanyCode&lt;/PropertyPath&gt;
			 *        &lt;/Collection&gt;
			 *      &lt;/PropertyValue&gt;
			 *    &lt;/Annotation&gt;
			 * </pre>
			 *
			 * For OData v2 the <code>sap:filterable</code> annotation on the <code>Property</code> can be used to exclude properties from
			 * filtering.
			 *
			 * <pre>
			 *    &lt;Property Name=&quot;Customer&quot; ... sap:filterable=&quot;false&quot;/&gt;
			 *    &lt;Property Name=&quot;CompanyCode&quot; ... sap:filterable=&quot;false&quot;/&gt;
			 * </pre>
			 *
			 * RequiredProperties defines the filter field as mandatory filter. Filter fields having this annotation must be a part of the
			 * <code>$filter</code> request sent to the back-end. <b>Note:</b> Support for V4 annotation is added since SAPUI5 version 1.40. <i>XML
			 * Example of OData V4 with Required CompanyCode Filter</i>
			 *
			 * <pre>
			 *    &lt;Annotation Term=&quot;Org.OData.Capabilities.V1.FilterRestrictions&quot;&gt;
			 *      &lt;Record&gt;
			 *          &lt;PropertyValue Property=&quot;RequiresFilter&quot; Bool=&quot;true&quot;/&gt;
			 *          &lt;PropertyValue Property=&quot;RequiredProperties&quot;&gt;
			 *           &lt;Collection&gt;
			 *              &lt;PropertyPath&gt;CompanyCode&lt;/PropertyPath&gt;
			 *           &lt;/Collection&gt;
			 *        &lt;/PropertyValue&gt;
			 *      &lt;/Record&gt;
			 *    &lt;/Annotation&gt;
			 * </pre>
			 *
			 * For OData v2 the <code>sap:required-in-filter</code> annotation on the <code>Property</code> can be used for setting the filter as
			 * a mandatory filter field.
			 *
			 * <pre>
			 *    &lt;Property Name=&quot;Customer&quot; ... sap:required-in-filter=&quot;true&quot;/&gt;
			 *    &lt;Property Name=&quot;CompanyCode&quot; ... sap:required-in-filter=&quot;true&quot;/&gt;
			 * </pre>
			 */
			filterRestrictions: {
				namespace: "Org.OData.Capabilities.V1",
				annotation: "FilterRestrictions",
				target: [
					"EntitySet"
				],
				whiteList: {
					properties: [
						"NonFilterableProperties", "RequiredProperties"
					]
				},
				defaultValue: true,
				appliesTo: [
					"filterItem/#/value"
				],
				group: [
					"Behavior"
				],
				since: "1.28.1"
			},

			/**
			 * Defines a group with filter fields. The filter fields are listed as {@link sap.ui.comp.smartfilterbar.SmartFilterBar#DataField DataField}
			 * records that reference other properties within the same EntityType.
			 *
			 * <i>Example in OData V4 notation with properties <code>CompanyName</code> and <code>CompanyIndustry</code></i>
			 *
			 * <pre>
			 *    &lt;Annotation Term=&quot;com.sap.vocabularies.UI.v1.FieldGroup&quot; Qualifier=&quot;FieldGroup1&quot;&gt;
			 *      &lt;Record&gt;
			 *        &lt;PropertyValue Property=&quot;Label&quot; String=&quot;Custom Field Group 1&quot; /&gt;
			 *        &lt;PropertyValue Property=&quot;Data&quot;&gt;
			 *          &lt;Collection&gt;
			 * 				&lt;Record Type=&quot;com.sap.vocabularies.UI.v1.DataField&quot;&gt;
			 *					&lt;PropertyValue Property=&quot;Value&quot; Path=&quot;CompanyName&quot; /&gt;
			 *					&lt;PropertyValue Property=&quot;Label&quot; String=&quot;Customer Name&quot; /&gt;
			 *				&lt;/Record&gt;
			 * 				&lt;Record Type=&quot;com.sap.vocabularies.UI.v1.DataField&quot; &gt;
			 *					&lt;PropertyValue Property=&quot;Value&quot; Path=&quot;CompanyIndustry&quot; /&gt;
			 *					&lt;PropertyValue Property=&quot;Label&quot; String=&quot;Industry&quot; /&gt;
			 *				&lt;/Record&gt;
			 *            &lt;PropertyPath&gt;CompanyName&lt;/PropertyPath&gt;
			 *            &lt;PropertyPath&gt;CompanyCode&lt;/PropertyPath&gt;
			 *          &lt;/Collection&gt;
			 *        &lt;/PropertyValue&gt;
			 *      &lt;/Record&gt;
			 *    &lt;/Annotation&gt;
			 * </pre>
			 */
			fieldGroup: {
				namespace: "com.sap.vocabularies.UI.v1",
				annotation: "FieldGroup",
				target: [
					"EntityType"
				],
				defaultValue: null,
				appliesTo: [
					"filterGroupItem"
				],
				group: [
					"Behavior"
				],
				since: "1.28.1"
			},

			/**
			 * Defines the relevant field groups by referencing them as <code>ReferenceFacet</code>. If a filter facet has been defined,
			 * only the referenced field groups are displayed in the <i>Adapt Filters</i> dialog, the other filters are omitted. <br>
			 * If you don't define any filter facets all field groups are displayed.
			 *
			 * <i>Example in OData V4 notation with two relevant field groups with qualifiers <code>FieldGroup1</code> and <code>FieldGroup2</code>
			 * (see also annotation {@link sap.ui.comp.smartfilterbar.SmartFilterBar#FieldGroup FieldGroup} for reference)</i>
			 *
			 * <pre>
			 *    &lt;Annotation Term=&quot;com.sap.vocabularies.UI.v1.FilterFacets&quot; &gt;
			 *      &lt;Collection&gt;
			 *        &lt;Record Type=&quot;com.sap.vocabularies.UI.v1.ReferenceFacet&quot; &gt;
			 *          &lt;PropertyValue Property=&quot;Target&quot; AnnotationPath=&quot;com.sap.vocabularies.UI.v1.FieldGroup#FieldGroup1&quot; /&gt;
			 *          &lt;PropertyValue Property=&quot;Label&quot; String=&quot;Field Group 1&quot; /&gt;
			 *      &lt;/Record&gt;
			 *        &lt;Record Type=&quot;com.sap.vocabularies.UI.v1.ReferenceFacet&quot; &gt;
			 *          &lt;PropertyValue Property=&quot;Target&quot; AnnotationPath=&quot;com.sap.vocabularies.UI.v1.FieldGroup#FieldGroup2&quot; /&gt;
			 *          &lt;PropertyValue Property=&quot;Label&quot; String=&quot;Field Group 2&quot; /&gt;
			 *      &lt;/Record&gt;
			 *      &lt;/Collection&gt;
			 *    &lt;/Annotation&gt;
			 * </pre>
			 */
			filterFacet: {
				namespace: "com.sap.vocabularies.UI.v1",
				annotation: "FilterFacets",
				target: [
					"EntityType"
				],
				defaultValue: null,
				appliesTo: [
					"filterGroupItem"
				],
				group: [
					"Behavior"
				],
				since: "1.48"
			},

			/**
			 * Describes the arrangement of a code value and its text. The value can be provided as a fixed or dynamic value of an enumeration by
			 * referencing another <code>Property</code> within the same <code>EntityType</code>. The enumeration members can have the following
			 * values:
			 * <ul>
			 * <li><code>com.sap.vocabularies.UI.v1.TextArrangementType/TextFirst</code><br>
			 * The underlying control is represented with the specified description followed by its ID. </li>
			 * <li><code>com.sap.vocabularies.UI.v1.TextArrangementType/TextOnly</code><br>
			 * The underlying control is represented with the specified description only. </li>
			 * </ul>
			 * <i>Example in OData V4 notation with EntityType "ProductType"</i>
			 *
			 * <pre>
			 *     &lt;Annotations Target=&quot;ProductType&quot;&gt;
			 *         &lt;Annotation Term=&quot;com.sap.vocabularies.UI.v1.TextArrangement&quot; EnumMember=&quot;com.sap.vocabularies.UI.v1.TextArrangementType/TextFirst&quot;/&gt;
			 *     &lt;/Annotations&gt;
			 * </pre>
			 */
			textArrangement: {
				namespace: "com.sap.vocabularies.UI.v1",
				annotation: "TextArrangement",
				target: [
					"EntityType"
				],
				defaultValue: null,
				appliesTo: [
					"text"
				],
				group: [
					"Appearance", "Behavior"
				],
				since: "1.32.1"
			},

			/**
			 * Contains annotations that provide information for rendering a <code>ValueHelpList</code> that are set on the <code>Property</code>.
			 * Each Parameter on the <code>ValueList</code> annotation has maximum of two properties:
			 * <ol>
			 * <li>LocalDataProperty - Path to the property on the local entity that triggered the ValueList.</li>
			 * <li>ValueListProperty - Path to property in on the ValueList entity.</li>
			 * </ol>
			 * <i>Example in OData V4 notation with property "Category" having ValueList</i>
			 *
			 * <pre>
			 *    &lt;Annotation Term=&quot;com.sap.vocabularies.Common.v1.ValueList&quot;&gt;
			 *      &lt;Record&gt;
			 *        &lt;PropertyValue Property=&quot;Label&quot; String=&quot;Category&quot; /&gt;
			 *        &lt;PropertyValue Property=&quot;CollectionPath&quot; String=&quot;Category&quot; /&gt;
			 *        &lt;PropertyValue Property=&quot;SearchSupported&quot; Bool=&quot;true&quot; /&gt;
			 *        &lt;PropertyValue Property=&quot;Parameters&quot;&gt;
			 *        &lt;Collection&gt;
			 *          &lt;Record Type=&quot;com.sap.vocabularies.Common.v1.ValueListParameterOut&quot;&gt;
			 *            &lt;PropertyValue Property=&quot;LocalDataProperty&quot; PropertyPath=&quot;Category&quot; /&gt;
			 *            &lt;PropertyValue Property=&quot;ValueListProperty&quot; String=&quot;Description&quot; /&gt;
			 *          &lt;/Record&gt;
			 *          &lt;Record Type=&quot;com.sap.vocabularies.Common.v1.ValueListParameterDisplayOnly&quot;&gt;
			 *            &lt;PropertyValue Property=&quot;ValueListProperty&quot; String=&quot;CategoryName&quot; /&gt;
			 *          &lt;/Record&gt;
			 *        &lt;/Collection&gt;
			 *      &lt;/Record&gt;
			 *    &lt;/Annotation&gt;
			 * </pre>
			 */
			valueList: {
				namespace: "com.sap.vocabularies.Common.v1",
				annotation: "ValueList",
				target: [
					"Property", "Parameter"
				],
				defaultValue: null,
				appliesTo: [
					"filterItem/#/fieldHelp"
				],
				group: [
					"Behavior"
				],
				since: "1.28.1"
			},

			/**
			 * If specified as <code>true</code>, there's only one value list mapping and its value list
			 * consists of a small number of fixed values.
			 * The value list will be rendered as pick list containing all possible values.
			 *
			 * <i>Example in OData V4 notation Value List on Category Property</i>
			 *
			 * <pre>
			 *     &lt;Annotation Term=&quot;com.sap.vocabularies.Common.v1.ValueListWithFixedValues&quot; Bool=&quot;true&quot;/&gt;
			 * </pre>
			 */
			valueListWithFixedValues: {
				namespace: "com.sap.vocabularies.Common.v1",
				annotation: "ValueListWithFixedValues",
				target: [
					"Property", "Parameter"
				],
				defaultValue: null,
				appliesTo: [
					"field/#/fieldHelp"
				],
				group: [
					"Behavior"
				],
				since: "1.48.1"
			},

			/**
			 * A short, human-readable text suitable for the filter's name. The <code>com.sap.vocabularies.Common.v1.Label</code> annotation is
			 * defined on the <code>Property</code>. If the <code>com.sap.vocabularies.Common.v1.Label</code> annotation is given, it has
			 * precedence. If none of the annotations are given, then the label will be the Property name.
			 *
			 * <i>Example in OData V4 notation where property "CustomerName" contains the label assigned to property "CustomerId"</i>
			 *
			 * <pre>
			 *     &lt;Annotations Target=&quot;CustomerId&quot;&gt;
			 *         &lt;Annotation Term=&quot;com.sap.vocabularies.Common.v1.Label&quot; Path=&quot;Customer&quot; String=&quot;Customer Name&quot;/&gt;
			 *     &lt;/Annotations&gt;
			 * </pre>
			 *
			 * For OData v2 the <code>sap:label</code> annotation on the <code>Property</code> can be used to define the label of the column.
			 *
			 * <pre>
			 *    &lt;Property Name=&quot;Customer&quot; ... sap:label=&quot;Customer Name&quot;/&gt;
			 * </pre>
			 */
			filterLabelOnProperty: {
				namespace: "com.sap.vocabularies.Common.v1",
				annotation: "Label",
				target: [
					"Property", "PropertyPath"
				],
				defaultValue: null,
				appliesTo: [
					"filterItem/label"
				],
				group: [
					"Behavior"
				],
				since: "1.28.1"
			},

			/**
			 * A short, human-readable text suitable for the filter's name. The <code>Label</code> annotation of
			 * <code>com.sap.vocabularies.UI.v1.DataField</code> is defined within <code>com.sap.vocabularies.UI.v1.LineItem</code> annotation.
			 * If the <code>com.sap.vocabularies.Common.v1.Label</code> annotation is given, it has precedence.
			 * If none of the annotations are given, then the label will be the Property name of the column.
			 *
			 * <i>Example in OData V4 notation where property "CustomerName" contains the label assigned to "Customer"</i>
			 * <pre>
			 *     &lt;Record Type=&quot;com.sap.vocabularies.UI.v1.DataField&quot;&gt;
			 *         &lt;PropertyValue Property=&quot;Value&quot; Path=&quot;Customer&quot; /&gt;
			 *         &lt;PropertyValue Property=&quot;Label&quot; Path=&quot;CustomerName&quot; /&gt;
			 *     &lt;/Record&gt;
			 * </pre>
			 */
			filterLabelOnLineItem: {
				namespace: "com.sap.vocabularies.UI.v1",
				annotation: "DataField",
				target: [
					"Property", "Parameter"
				],
				whiteList: {
					properties: [
						"Label"
					]
				},
				appliesTo: [
					"filterItem/label"
				],
				group: [
					"Behavior"
				],
				since: "1.28.1"
			},

			/**
			 * <b>Note:</b> The annotation com.sap.vocabularies.Common.v1.FilterExpressionRestrictions has been deprecated and replaced by
			 * Org.OData.Capabilities.V1.FilterRestrictions - FilterExpressionRestrictions.
			 *
			 * Enum member MultiValue defines whether multiple values can be used in a single filter. With multi-value filtering, more that one
			 * "equals" condition can be defined for filtering the data.
			 * <i>Example in OData V4 notation with multi-value properties "Customer" and "CompanyCode"</i>
			 *
			 * <pre>
			 *    &lt;Annotation Term=&quot;com.sap.vocabularies.Common.v1.FilterExpressionRestrictions&quot; &gt;
			 *       &lt;Collection&gt;
			 *          &lt;Record&gt;
			 *             &lt;PropertyValue Property=&quot;Property&quot; PropertyPath=&quot;Customer&quot; /&gt;
			 *             &lt;PropertyValue Property=&quot;AllowedExpressions&quot; EnumMember=&quot;com.sap.vocabularies.Common.v1.FilterExpressionType/MultiValue&quot; /&gt;
			 *          &lt;/Record&gt;
			 *          &lt;Record&gt;
			 *             &lt;PropertyValue Property=&quot;Property&quot; PropertyPath=&quot;CompanyCode&quot; /&gt;
			 *             &lt;PropertyValue Property=&quot;AllowedExpressions&quot;
			 *             EnumMember=&quot;com.sap.vocabularies.Common.v1.FilterExpressionType/MultiValue&quot; /&gt;
			 *          &lt;/Record&gt;
			 *       &lt;/Collection&gt;
			 *    &lt;/Annotation&gt;
			 * </pre>
			 *
			 * For OData v2 the <code>sap:filter-restriction="multi-value"</code> annotation on the <code>Property</code> can be used for
			 * rendering multi-value filter field.
			 *
			 * <pre>
			 *    &lt;Property Name=&quot;Customer&quot; ... sap:filter-restriction=&quot;multi-value&quot;/&gt;
			 *    &lt;Property Name=&quot;CompanyCode&quot; ... sap:filter-restriction=&quot;multi-value&quot;/&gt;
			 * </pre>
			 *
			 * Enum member SingleValue restricts the filter to only <b>one</b> single value entry. With single-value filtering, you cannot define
			 * more than one "equals" condition for filtering the data. <b>Note:</b> Support for V4 annotation is added since SAPUI5 version 1.40.
			 * <i>Example in OData V4 notation with single-value properties "Customer" and "CompanyCode"</i>
			 *
			 * <pre>
			 *    &lt;Annotation Term=&quot;com.sap.vocabularies.Common.v1.FilterExpressionRestrictions&quot; &gt;
			 *       &lt;Collection&gt;
			 *          &lt;Record&gt;
			 *             &lt;PropertyValue Property=&quot;Property&quot; PropertyPath=&quot;Customer&quot; /&gt;
			 *             &lt;PropertyValue Property=&quot;AllowedExpressions&quot; EnumMember=&quot;com.sap.vocabularies.Common.v1.FilterExpressionType/SingleValue&quot; /&gt;
			 *          &lt;/Record&gt;
			 *          &lt;Record&gt;
			 *             &lt;PropertyValue Property=&quot;Property&quot; PropertyPath=&quot;CompanyCode&quot; /&gt;
			 *             &lt;PropertyValue Property=&quot;AllowedExpressions&quot; EnumMember=&quot;com.sap.vocabularies.Common.v1.FilterExpressionType/SingleValue&quot; /&gt;
			 *          &lt;/Record&gt;
			 *       &lt;/Collection&gt;
			 *    &lt;/Annotation&gt;
			 * </pre>
			 *
			 * For OData v2 the <code>sap:filter-restriction="single-value"</code> annotation on the <code>Property</code> can be used for
			 * rendering a single-value filter field.
			 *
			 * <pre>
			 *    &lt;Property Name=&quot;Customer&quot; ... sap:filter-restriction=&quot;single-value&quot;/&gt;
			 *    &lt;Property Name=&quot;CompanyCode&quot; ... sap:filter-restriction=&quot;single-value&quot;/&gt;
			 * </pre>
			 *
			 * Enum member SingleInterval restricts the filter to specify an interval, for example, a date interval for filtering
			 * the data present between the given dates.
			 * <i>Example in OData V4 notation with Interval Restriction on "DocumentDate" property</i>
			 *
			 * <pre>
			 *    &lt;Annotation Term=&quot;com.sap.vocabularies.Common.v1.FilterExpressionRestrictions&quot; &gt;
			 *      &lt;Collection&gt;
			 *         &lt;Record&gt;
			 *            &lt;PropertyValue Property=&quot;Property&quot; PropertyPath=&quot;DocumentDate&quot; /&gt;
			 *            &lt;PropertyValue Property=&quot;AllowedExpressions&quot; EnumMember=&quot;com.sap.vocabularies.Common.v1.FilterExpressionType/SingleInterval&quot; /&gt;
			 *         &lt;/Record&gt;
			 *      &lt;/Collection&gt;
			 *    &lt;/Annotation&gt;
			 * </pre>
			 *
			 * For OData v2 the <code>sap:filter-restriction="interval"</code> annotation on the <code>Property</code> can be used for rendering
			 * an interval filter field.
			 *
			 * <pre>
			 *    &lt;Property Name=&quot;DocumentDate&quot; ... sap:filter-restriction=&quot;interval&quot;/&gt;
			 * </pre>
			 */
			filterExpression: {
				namespace: "com.sap.vocabularies.Common.v1",
				annotation: "FilterExpressionType",
				target: [
					"EntitySet"
				],
				whiteList: {
					values: [
						"MultiValue", "SingleValue", "SingleInterval"
					]
				},
				defaultValue: null,
				appliesTo: [
					"filterItem/#/input"
				],
				group: [
					"Behavior"
				],
				since: "1.28.1"
			},

			/**
			 * The filter expression restriction "MultiValue" defines whether multiple filter clauses can be defined in a filter statement.
			 * When the expression "MultiValue" is present, multiple filter clauses that use the "equals" operator can be defined by a user.
			 *
			 * <i>XML Example of OData V4 with expression "MutliValue" for properties "Customer" and "CompanyCode"</i>
			 * <pre>
			 *    &lt;Annotation Term=&quot;Org.OData.Capabilities.V1.FilterRestrictions&quot; &gt;
			 *    	&lt;Record&gt;
			 *    		&lt;PropertyValue Property=&quot;FilterExpressionRestrictions&quot; &gt;
			 *       		&lt;Collection&gt;
			 *          		&lt;Record&gt;
			 *            			&lt;PropertyValue Property=&quot;Property&quot; PropertyPath=&quot;Customer&quot; /&gt;
			 *            			&lt;PropertyValue Property=&quot;AllowedExpressions&quot; String=&quot;MultiValue&quot; /&gt;
			 *         		 	&lt;/Record&gt;
			 *          		&lt;Record&gt;
			 *             			&lt;PropertyValue Property=&quot;Property&quot; PropertyPath=&quot;CompanyCode&quot; /&gt;
			 *            			&lt;PropertyValue Property=&quot;AllowedExpressions&quot; String=&quot;MultiValue&quot; /&gt;
			 *          		&lt;/Record&gt;
			 *       		&lt;/Collection&gt;
			 *       	&lt;/PropertyValue&gt;
			 *       &lt;/Record&gt;
			 *    &lt;/Annotation&gt;
			 * </pre>
			 *
			 * For OData v2 the <code>sap:filter-restriction="multi-value"</code> annotation on the <code>property</code> can be used for
			 * rendering a multi-value filter field.
			 *
			 * <pre>
			 *    &lt;Property Name=&quot;Customer&quot; ... sap:filter-restriction=&quot;multi-value&quot;/&gt;
			 *    &lt;Property Name=&quot;CompanyCode&quot; ... sap:filter-restriction=&quot;multi-value&quot;/&gt;
			 * </pre>
			 *
			 * The filter expression restriction "SingleValue" restricts the number of filter clauses for the given property to only one in the filter statement.
			 * When the expression "SingleValue" is present, a user cannot define more than one "equals" condition for filtering the data.
			 *
			 * <i>XML Example of OData V4 with expression "SingleValue" for properties "Customer" and "CompanyCode"</i>
			 * <pre>
			 *    &lt;Annotation Term=&quot;Org.OData.Capabilities.V1.FilterRestrictions&quot; &gt;
			 *    	&lt;Record&gt;
			 *    		&lt;PropertyValue Property=&quot;FilterExpressionRestrictions&quot; &gt;
			 *       		&lt;Collection&gt;
			 *          		&lt;Record&gt;
			 *            			&lt;PropertyValue Property=&quot;Property&quot; PropertyPath=&quot;Customer&quot; /&gt;
			 *            			&lt;PropertyValue Property=&quot;AllowedExpressions&quot; String=&quot;SingleValue&quot; /&gt;
			 *         		 	&lt;/Record&gt;
			 *          		&lt;Record&gt;
			 *             			&lt;PropertyValue Property=&quot;Property&quot; PropertyPath=&quot;CompanyCode&quot; /&gt;
			 *            			&lt;PropertyValue Property=&quot;AllowedExpressions&quot; String=&quot;SingleValue&quot; /&gt;
			 *          		&lt;/Record&gt;
			 *       		&lt;/Collection&gt;
			 *       	&lt;/PropertyValue&gt;
			 *       &lt;/Record&gt;
			 *    &lt;/Annotation&gt;
			 * </pre>
			 *
			 * For OData v2 the <code>sap:filter-restriction="single-value"</code> annotation on the <code>Property</code> can be used for
			 * rendering a single-value filter field.
			 *
			 * <pre>
			 *    &lt;Property Name=&quot;Customer&quot; ... sap:filter-restriction=&quot;single-value&quot;/&gt;
			 *    &lt;Property Name=&quot;CompanyCode&quot; ... sap:filter-restriction=&quot;single-value&quot;/&gt;
			 * </pre>
			 *
			 * <b>Note:</b> When the restriction "SingleVale" / "single-value" is used, the "Is Empty" operator cannot be used.
			 *
			 * The filter expression restriction" SingleRange" restricts the filter to specify an interval, for example, a date interval for filtering the data present
			 * between the given dates.
			 * <i>XML Example of OData V4 with expression "SingleRange" for property "DocumentDate"</i>
			 *
			 * <pre>
			 *    &lt;Annotation Term=&quot;Org.OData.Capabilities.V1.FilterRestrictions&quot; &gt;
			 *    	&lt;Record&gt;
			 *    		&lt;PropertyValue Property=&quot;FilterExpressionRestrictions&quot; &gt;
			 *       		&lt;Collection&gt;
			 *          		&lt;Record&gt;
			 *            			&lt;PropertyValue Property=&quot;Property&quot; PropertyPath=&quot;DocumentDate&quot; /&gt;
			 *            			&lt;PropertyValue Property=&quot;AllowedExpressions&quot; String=&quot;SingleRange&quot; /&gt;
			 *         		 	&lt;/Record&gt;
			 *       		&lt;/Collection&gt;
			 *       	&lt;/PropertyValue&gt;
			 *       &lt;/Record&gt;
			 *    &lt;/Annotation&gt;
			 * </pre>
			 *
			 * For OData v2 the <code>sap:filter-restriction="interval"</code> annotation on the <code>Property</code> can be used for rendering
			 * an interval/range filter field.
			 *
			 * <pre>
			 *    &lt;Property Name=&quot;DocumentDate&quot; ... sap:filter-restriction=&quot;interval&quot;/&gt;
			 * </pre>
			 */
			FilterRestrictions: {
				namespace: "Org.OData.Capabilities.V1",
				annotation: "FilterRestrictions",
				target: [
					"EntitySet"
				],
				whiteList: {
					values: [
						"FilterExpressionRestrictions"
					]
				},
				defaultValue: null,
				appliesTo: [
					"filterItem/#/input"
				],
				group: [
					"Behavior"
				],
				since: "1.64"
			},

			/**
			 * Defines whether certain fields should be initially visible in the <code>SmartFilterBar</code> control. The fields will be rendered in
			 * the order that is specified in this annotation. <b>Note:</b> This annotation is supported since SAPUI5 version 1.40.
			 *
			 * <i>Example in OData V4 notation with SelectionFields annotation.</i>
			 *
			 * <pre>
			 *   &lt;Annotations Target=&quot;Product&quot;&gt;
			 *     &lt;Annotation Term=&quot;com.sap.vocabularies.UI.v1.SelectionFields&quot;&gt;
			 *       &lt;Collection&gt;
			 *         &lt;PropertyPath&gt;ProductCategory&lt;/PropertyPath&gt;
			 *         &lt;PropertyPath&gt;Supplier&lt;/PropertyPath&gt;
			 *         &lt;PropertyPath&gt;Product&lt;/PropertyPath&gt;
			 *       &lt;/Collection&gt;
			 *     &lt;/Annotation&gt;
			 *   &lt;/Annotations&gt;
			 * </pre>
			 */
			selectionFields: {
				namespace: "com.sap.vocabularies.UI.v1",
				annotation: "SelectionFields",
				target: [
					"EntityType"
				],
				defaultValue: null,
				appliesTo: [
					"filterItem/#/value"
				],
				group: [
					"Behavior"
				],
				since: "1.40.1"
			},

			/**
			 * Defines whether a filter is visible. The <code>SmartFilterBar</code> control interprets the <code>EnumMembers</code>
			 * <code>FieldControlType/Inapplicable</code> and <code>FieldControlType/Hidden</code> (deprecated) of the <code>FieldControl</code>
			 * annotation to set the visibility.
			 * <b>Note:</b>The <code>FieldControlType/Inapplicable</code> annotation is only supported if you want to statically hide the filter fields.
			 *
			 *
			 * <i>Example in OData V4 notation with hidden properties "Customer" and "CompanyCode"</i>
			 *
			 * <pre>
			 *     &lt;Annotations Target=&quot;.../Customer&quot;&gt;
			 *         &lt;Annotation Term=&quot;com.sap.vocabularies.Common.v1.FieldControl&quot; EnumMember=&quot;com.sap.vocabularies.Common.v1.FieldControlType/Hidden&quot;/&gt;
			 *     &lt;/Annotations&gt;
			 *     &lt;Annotations Target=&quot;.../CompanyCode&quot;&gt;
			 *         &lt;Annotation Term=&quot;com.sap.vocabularies.Common.v1.FieldControl&quot; EnumMember=&quot;com.sap.vocabularies.Common.v1.FieldControlType/Inapplicable&quot;/&gt;
			 *     &lt;/Annotations&gt;
			 * </pre>
			 *
			 * For OData v2 the <code>sap:visible</code> annotation on the <code>Property</code> can be used to assign visibility.
			 *
			 * <pre>
			 *    &lt;Property Name=&quot;Customer&quot; ... sap:visible=&quot;false&quot;/&gt;
			 *    &lt;Property Name=&quot;CompanyCode&quot; ... sap:visible=&quot;false&quot;/&gt;
			 * </pre>
			 */
			filterVisible: {
				namespace: "com.sap.vocabularies.Common.v1",
				annotation: "FieldControlType",
				target: [
					"Property"
				],
				whiteList: {
					values: [
						"Hidden", "Inapplicable"
					]
				},
				defaultValue: false,
				appliesTo: [
					"property/#/visible"
				],
				group: [
					"Behavior"
				],
				since: "1.32.1"
			},

			/**
			 * Defines that certain fields are not rendered in the <code>SmartFilterBar</code> control, but still used as filters that can be set by the application code.
			 * <b>Note:</b>While properties annotated with <code>HiddenFilter</code> are considered during filtering, properties annotated with <code>Hidden</code>
			 * are ignored completely. If both annotations exist, <code>Hidden</code> is taken into consideration.
			 *
			 * <i>Example in OData V4 notation with invisible, filterable property "LocationName"</i>
			 * <pre>
			 *     &lt;Annotations Target=&quot;LocationName&quot; &gt;
			 *         &lt;Annotation Term=&quot;com.sap.vocabularies.UI.v1.HiddenFilter&quot;/&gt;
			 *     &lt;/Annotations&gt;
			 * </pre>
			 */
			hiddenFilter: {
				namespace: "com.sap.vocabularies.UI.v1",
				annotation: "HiddenFilter",
				target: [
					"Property"
				],
				appliesTo: [
					"filterItem/hiddenFilter"
				],
				group: [
					"Behavior"
				],
				since: "1.44.0"
			},

			/**
			 * Defines that certain properties are not rendered in an application and also not used in the<code>SmartFilterBar</code> control.
			 * In contrast to <code>HiddenFilter</code>, a property annotated with <code>Hidden</code> is not used as a filter.
			 * <b>Note:</b>The annotations <code>com.sap.vocabularies.Common.v1.FieldControlType/Inapplicable</code> and <code>Hidden</code> are interchangeable.
			 *
			 * <i>Example in OData V4 notation with hidden ProductPictureURL</i>
			 *
			 * <pre>
			 *     &lt;Annotations Target=&quot;ProductPictureURL&quot; &gt;
			 *         &lt;Annotation Term=&quot;com.sap.vocabularies.UI.v1.Hidden&quot;/&gt;
			 *     &lt;/Annotations&gt;
			 * </pre>
			 */
			hidden: {
				namespace: "com.sap.vocabularies.UI.v1",
				annotation: "Hidden",
				target: [
					"Property"
				],
				appliesTo: [
					"filterItem/hidden",
					"property/visible"
				],
				group: [
					"Behavior"
				],
				since: "1.54"
			},

			/**
			 * Defines variant items, based on SelectionVariant annotation. SelectionVariants with a qualifier will be added as variants to the
			 * <code>VariantManagement</code> control.
			 * A SelectionVariant annotation <bold>without<bold> a qualifier will define the Standard variant, in case no vendor Standard variant exists.
			 * All mentioned filters will be treated as at least <code>partOfCurrentVariant</code>.
			 *
			 * <pre>
			 *     &lt;Annotations Target=&quot;Product&quot;&gt;
			 *         &lt;Annotation Qualifier=&quot;Group&quot; Term=&quot;com.sap.vocabularies.UI.v1.SelectionVariant&quot;&gt;
			 *             &lt;Record&gt;
			 *                 &lt;PropertyValue Text=&quot;SelectionVariant from Annotations&quot;/&gt;
			 *                 &lt;PropertyValue Property=&quot;SelectOptions&quot;&gt;
			 *                     &lt;Collection&gt;
			 *         			       &lt;Record Type=&quot;UI.SelectOptionType&quot;&gt;
			 *            			       &lt;PropertyValue Property=&quot;PropertyName&quot; PropertyPath=&quot;Bukrs&quot;/&gt;
			 *                             &lt;PropertyValue Property=&quot;Ranges&quot; &gt;
			 *                      	       &lt;Collection&gt;
			 *                          	       &lt;Record Type=&quot;UI.SelectionRangeType&quot;&gt;
			 *            						       &lt;PropertyValue Property=&quot;Sign&quot; EnumMember=&quot;UI.SelectionRangeSignType/I&quot;/&gt;
			 *            						       &lt;PropertyValue Property=&quot;Option&quot; EnumMember=&quot;UI.SelectionRangeOptionType/EQ&quot;/&gt;
			 *            						       &lt;PropertyValue Property=&quot;Low&quot; String=&quot;0001&quot;/&gt;
			 *                          	       &lt;/Record&gt;
			 *                                 &lt;/Collection&gt;
			 *                             &lt;/PropertyValue&gt;
			 *                         &lt;/Record&gt;
			 *                     &lt;/Collection&gt;
			 *                 &lt;/PropertyValue&gt;
			 *             &lt;/Record&gt;
			 *         &lt;Annotation&gt;
			 *     &lt;/Annotations&gt;
			 * </pre>
			 */
			selectionBVariant: {
				namespace: "com.sap.vocabularies.UI.v1",
				annotation: "SelectionVariant",
				target: [
					"EntityType"
				],
				appliesTo: [
					"SmartVariantManagement"
				],
				group: [
					"Behavior"
				],
				since: "1.48.0"
			},

			/**
			 * Defines a default value for the property to be used in filter expressions.
			 * A <code>FilterDefaultValue</code> is ignored when another source for filter initialization is available, like a
			 * <code>com.sap.vocabularies.UI.v1.SelectionVariant</code> or a variant saved with the
			 * {@link sap.ui.comp.smartvariants.SmartVariantManagement SmartVariantManagement} control.
			 *
			 * <b>Note</b>: Analytical parameters (see {@link sap.ui.comp.smartfilterbar.SmartFilterBar#setConsiderAnalyticalParameters considerAnalyticalParameters}) are
			 * technically no filters. To initialize these fields use the <code>DefaultValue</code> attribute of the repsective property in the service's
			 * OData metadata.
			 *
			 * <i>Example in OData V4 notation for a string-typed property "ContactID"</i>
			 *
			 * <pre>
			 *     &lt;Annotations Target=&quot;ContactID&quot; &gt;
			 *         &lt;Annotation Term=&quot;com.sap.vocabularies.Common.v1.FilterDefaultValue&quot; String=&quot;A0328&quot; /&gt;
			 *     &lt;/Annotations&gt;
			 * </pre>
			 */
			FilterDefaultValue: {
				namespace: "com.sap.vocabularies.Common.v1",
				annotation: "FilterDefaultValue",
				target: [
					"Property"
				],
				appliesTo: [
					"filterItem"
				],
				group: [
					"Behavior"
				],
				since: "1.48.0"
			}
		},
		properties: {
			entitySet: {
				ignore: true
			},
			entityType: {
				ignore: true
			},
			// deprecated
			resourceUri: {
				ignore: true
			},
			basicSearchFieldName: {
				ignore: true
			},
			enableBasicSearch: {
				ignore: true
			},
			considerAnalyticalParameters: {
				ignore: true
			},
			liveMode: {
				ignore: false
			},
			showMessages: {
				ignore: false
			},
			useDateRangeType: {
				ignore: true
			},
			suppressSelection: {
				ignore: false
			},
			considerSelectionVariants: {
				ignore: true
			},
			defaultSelectionVariantName: {
				ignore: true
			},
			useProvidedNavigationProperties: {
				ignore: true
			},
			navigationProperties: {
				ignore: true
			}
		},
		customData: {
			/**
			 * Used for properties that has an additional sap:text annotation for further description and are displayed in a dropdown selection. For
			 * more information see {@link sap.ui.comp.smartfilterbar.DisplayBehaviour} <b>Note</b> Use the annotation UI.TextArrangement instead.
			 */
			defaultDropDownDisplayBehaviour: {
				type: "sap.ui.comp.smartfilterbar.DisplayBehaviour",
				defaultValue: "",
				since: "1.28.1"
			},
			/**
			 * Used for properties that has an additional sap:text annotation for further description and are displayed as a token.
			 *
			 * @see sap.ui.comp.smartfilterbar.DisplayBehaviour <b>Note</b> Use the annotation UI.TextArrangement instead.
			 */
			defaultTokenDisplayBehaviour: {
				type: "sap.ui.comp.smartfilterbar.DisplayBehaviour",
				defaultValue: "",
				since: "1.28.1"
			},
			/**
			 * Overrides the default settings for formatting dates. For more information see {@link sap.ui.model.type.Date}
			 */
			dateFormatSettings: {
				type: "string",
				defaultValue: "\{'UTC':'true'\}",
				group: [
					"Appearance"
				],
				since: "1.28.1"
			},
			/**
			 * If set to <code>true</code> the contains filter operator will be used as default filter. For more information see
			 * {@link sap.ui.model.FilterOperator}
			 */
			useContainsAsDefaultFilter: {
				type: "boolean",
				defaultValue: false,
				since: "1.28.1"
			},
			/**
			 * If set to <code>true</true> the standard variant of the variant management is executed on selection.
			 */
			executeStandardVariantOnSelect: {
				type: "boolean",
				defaultValue: false,
				since: "1.28.1"
			}
		},
		actionsEffectiveAfter : "RECREATE", //changes need to be done before SmartFilterBar is initialized
		aggregations: {

			content: {
				propagateMetadata : function(oElement){
					return {
						actions: null
					};
				}
			},

			controlConfiguration : {
				specialIndexHandling : true
			},

			filterGroupItems: {
				ignore: true
			}

		}
	};
}, /* bExport= */false);