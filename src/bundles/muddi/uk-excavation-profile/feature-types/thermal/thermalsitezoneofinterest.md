---
type: MUDDI Feature Type
title: Thermal Site Zone of Interest
description: The Thermal Site Zone of Interest feature table (coredata.thermalsitezoneofinterest)
  in the MUDDI UK Excavation Profile.
resource: coredata.thermalsitezoneofinterest
tags:
- thermal
- sitezoneofinterest
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
| `sitetype` | text |  | [sitetypevalue](/uk-excavation-profile/codelists/sitetypevalue.md) |
| `sitesubtype` | text |  |  |
| `parentfeatureid` | text |  |  |
| `dataproviderid_fk` | character varying(38) | yes | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |

# Conceptual type

Specialises [Site Zone of Interest](/conceptual/muddi-space.md) in the MUDDI conceptual model.

# Provenance

Every record is attributed to a data provider — see [organisation](/uk-excavation-profile/feature-types/shared/organisation.md).
