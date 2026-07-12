---
type: MUDDI Feature Type
title: Drainage Access Object
description: The Drainage Access Object feature table (coredata.drainageaccessobject)
  in the MUDDI UK Excavation Profile.
resource: coredata.drainageaccessobject
tags:
- drainage
- accessobject
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
| `azimuth` | real |  |  |
| `centroidxyz` | text |  |  |
| `azimuthmeasurementunits` | text |  |  |
| `colour` | text |  |  |
| `depth_depth` | real |  |  |
| `depth_unitofmeasure` | text |  |  |
| `depthmethod` | text |  | [depthmethodvalue](/uk-excavation-profile/codelists/depthmethodvalue.md) |
| `horizontalaccuracy_length` | real |  |  |
| `horizontalaccuracy_unitofmeasure` | text |  |  |
| `horizontalmeasurementmethod` | text |  | [horizontalmeasurementmethodvalue](/uk-excavation-profile/codelists/horizontalmeasurementmethodvalue.md) |
| `installationmethod` | text |  |  |
| `installationmethodsubtype` | text |  |  |
| `intendedpermanence` | text |  | [intendedpermanencevalue](/uk-excavation-profile/codelists/intendedpermanencevalue.md) |
| `materialsubtype` | text |  |  |
| `locationtype` | text |  | [locationtypevalue](/uk-excavation-profile/codelists/locationtypevalue.md) |
| `material` | text |  | [materialvalue](/uk-excavation-profile/codelists/materialvalue.md) |
| `qualitylevel` | text |  | [qualitylevelvalue](/uk-excavation-profile/codelists/qualitylevelvalue.md) |
| `undergroundstatus` | text |  | [undergroundstatusvalue](/uk-excavation-profile/codelists/undergroundstatusvalue.md) |
| `azimuthtype` | text |  |  |
| `verticalaccuracy_length` | real |  |  |
| `verticalaccuracy_unitofmeasure` | text |  |  |
| `container` | text |  |  |
| `dateofinstallation` | date |  |  |
| `insideheight_height` | real |  |  |
| `insideheight_unitofmeasure` | text |  |  |
| `insidelength_length` | real |  |  |
| `insidelength_unitofmeasure` | text |  |  |
| `insidewidth_width` | real |  |  |
| `insidewidth_unitofmeasure` | text |  |  |
| `isauxiliary` | boolean |  |  |
| `iscathodicprotected` | boolean |  |  |
| `isencased` | boolean |  |  |
| `isnps` | boolean |  |  |
| `outsideheight_height` | real |  |  |
| `outsideheight_unitofmeasure` | text |  |  |
| `outsidelength_length` | real |  |  |
| `outsidelength_unitofmeasure` | text |  |  |
| `outsidewidth_width` | real |  |  |
| `outsidewidth_unitofmeasure` | text |  |  |
| `protectivematerial` | text |  |  |
| `protectivematerialsubtype` | text |  |  |
| `utilitysubtype` | text |  | [utilitysubtypevalue](/uk-excavation-profile/codelists/utilitysubtypevalue.md) |
| `utilitytype` | text |  | [utilitytypevalue](/uk-excavation-profile/codelists/utilitytypevalue.md) |
| `wallthickness_width` | real |  |  |
| `wallthickness_unitofmeasure` | text |  |  |
| `accessorytype` | text |  |  |
| `accesstype` | text |  | [accesstypevalue](/uk-excavation-profile/codelists/accesstypevalue.md) |
| `accesssubtype` | text |  |  |
| `numberofcovers` | integer |  |  |
| `dataproviderid_fk` | character varying(38) | yes | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |

# Conceptual type

Specialises [Access Object](/conceptual/network-accessory.md) in the MUDDI conceptual model.

# Provenance

Every record is attributed to a data provider — see [organisation](/uk-excavation-profile/feature-types/shared/organisation.md).
