---
type: MUDDI Feature Type
title: Areasofspecialscientificinterestnorthernireland
description: The Areasofspecialscientificinterestnorthernireland feature table (coredata.areasofspecialscientificinterestnorthernireland)
  in the MUDDI UK Excavation Profile.
resource: coredata.areasofspecialscientificinterestnorthernireland
tags:
- shared
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
| `directive` | text |  |  |
| `planningareatype` | text |  | [planningareatypevalue](/uk-excavation-profile/codelists/planningareatypevalue.md) |
| `policydocumentation` | text |  |  |
| `policyname` | text |  |  |
| `reference` | text |  |  |
| `name` | text | yes |  |
| `county` | text |  |  |
| `map_scale` | text |  |  |
| `speciespt1` | text |  |  |
| `speciespt2` | text |  |  |
| `habitat` | text |  |  |
| `earth_sci` | text |  |  |
| `parties` | real |  |  |
| `declareday` | date |  |  |
| `declare_ha` | real |  |  |
| `confirmday` | date |  |  |
| `conmfirm_ha` | real |  |  |
| `hyperlink` | text |  |  |
| `dataproviderid_fk` | character varying(38) | yes | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |

# Provenance

Every record is attributed to a data provider — see [organisation](/uk-excavation-profile/feature-types/shared/organisation.md).
