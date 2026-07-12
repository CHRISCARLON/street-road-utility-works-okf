---
type: MUDDI Feature Type
title: Water Network Dimension
description: The Water Network Dimension feature table (coredata.waternetworkdimension)
  in the MUDDI UK Excavation Profile.
resource: coredata.waternetworkdimension
tags:
- water
- networkdimension
- uk-excavation
timestamp: '2026-07-04T00:00:00Z'
---

# Schema

| Column | Type | Required | References |
| --- | --- | --- | --- |
| `systemid` | character varying(38) | yes |  |
| `lifecyclestatus` | text | yes | [lifecyclestatusvalue](/uk-excavation-profile/codelists/lifecyclestatusvalue.md) |
| `datelastupdated` | timestamp with time zone | yes |  |
| `dateoflastlifecyclestatuschange` | timestamp with time zone |  |  |
| `systemloaddate` | timestamp with time zone | yes |  |
| `certification` | text |  |  |
| `dataproviderassigneduniqueid` | text |  |  |
| `dataproviderassigneduniqueidautoassigned` | boolean | yes |  |
| `dataowner` | text |  |  |
| `dataownerassigneduniqueid` | text |  |  |
| `datasensitivitylevel` | text |  |  |
| `datedatacollected` | date |  |  |
| `dateoflaststatuschange` | date |  |  |
| `description` | text |  |  |
| `featuretype` | text |  | [featuretypevalue](/uk-excavation-profile/codelists/featuretypevalue.md) |
| `horizontalcrs` | text |  |  |
| `operationalstatus` | text |  | [operationalstatusvalue](/uk-excavation-profile/codelists/operationalstatusvalue.md) |
| `originaldatedatacollected` | date |  |  |
| `version` | text |  |  |
| `enhancedmeasures` | text |  |  |
| `enhancedmeasuresproximity_length` | real |  |  |
| `enhancedmeasuresproximity_unitofmeasure` | text |  |  |
| `expectedrefreshperiod_period` | real |  |  |
| `expectedrefreshperiod_unitoftime` | text |  |  |
| `verticalcrs` | text |  |  |
| `geometry` | geometry(GEOMETRY,27700) |  |  |
| `sourcefeatureclass` | text |  |  |
| `localereference` | text |  |  |
| `localereferencetype` | text |  | [localereferencetypevalue](/uk-excavation-profile/codelists/localereferencetypevalue.md) |
| `objectname` | text |  |  |
| `objectowner` | text |  |  |
| `operator` | text |  |  |
| `objectownerassigneduniqueid` | text |  |  |
| `operatorassigneduniqueid` | text |  |  |
| `additionalinformation` | text |  |  |
| `dateofextract` | timestamp with time zone |  |  |
| `dataprovenance` | text | yes | [dataprovenancevalue](/uk-excavation-profile/codelists/dataprovenancevalue.md) |
| `associatedassets` | text |  |  |
| `associatedtext` | text |  |  |
| `descriptiontype` | text |  |  |
| `isqueryable` | boolean |  |  |
| `orientation` | real |  |  |
| `orientationmeasurementunits` | text |  |  |
| `utilitysubtype` | text |  | [utilitysubtypevalue](/uk-excavation-profile/codelists/utilitysubtypevalue.md) |
| `referencescale` | real |  |  |
| `utilitytype` | text |  | [utilitytypevalue](/uk-excavation-profile/codelists/utilitytypevalue.md) |
| `textcolour` | text | yes |  |
| `textplacementx` | real |  |  |
| `textplacementy` | real |  |  |
| `orientationtype` | text |  | [orientationtypevalue](/uk-excavation-profile/codelists/orientationtypevalue.md) |
| `dimensionline` | geometry(LINESTRING,27700) |  |  |
| `dimensionvalue_length` | real |  |  |
| `dimensionvalue_unitofmeasure` | text |  |  |
| `enddimensionlineextension` | geometry(LINESTRING,27700) |  |  |
| `enddimensionpoint` | geometry(POINT,27700) |  |  |
| `endextensionline` | geometry(LINESTRING,27700) |  |  |
| `propertyindicator` | text |  |  |
| `startdimensionlineextension` | geometry(LINESTRING,27700) |  |  |
| `startextensionline` | geometry(LINESTRING,27700) |  |  |
| `startdimensionpoint` | geometry(POINT,27700) |  |  |
| `fontname` | text | yes |  |
| `fontsize` | real | yes |  |
| `dataproviderid_fk` | character varying(38) | yes | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |

# Conceptual type

Specialises [Network Dimension](/conceptual/network-asset.md) in the MUDDI conceptual model.

# Provenance

Every record is attributed to a data provider — see [organisation](/uk-excavation-profile/feature-types/shared/organisation.md).
