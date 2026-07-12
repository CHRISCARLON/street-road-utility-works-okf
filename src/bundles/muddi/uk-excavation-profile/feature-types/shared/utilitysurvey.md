---
type: MUDDI Feature Type
title: Utilitysurvey
description: The Utilitysurvey feature table (usercreateddata.utilitysurvey) in the
  MUDDI UK Excavation Profile.
resource: usercreateddata.utilitysurvey
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
| `userid` | text | yes |  |
| `notes` | text |  |  |
| `expirydate` | timestamp with time zone |  |  |
| `originatingorganisationname` | text |  |  |
| `status` | text |  |  |
| `title` | text |  |  |
| `userreference` | text |  |  |
| `estimatedbackfilldate` | date |  |  |
| `impactonworks` | text |  |  |
| `observationcategory` | text |  |  |
| `visibilitystatus` | text | yes |  |
| `scopeofsharing` | text | yes |  |
| `dateoflastvisibilityscopechange` | timestamp with time zone |  |  |
| `potentialsensitivity` | boolean | yes |  |
| `completedbyorganisationid` | text | yes |  |
| `commisionedbyorganisationid` | text |  |  |
| `surveytype` | text |  |  |
| `pas128survey` | boolean | yes |  |
| `dataproviderid_fk` | character varying(38) | yes | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |
| `originatingorganisationid_fk` | character varying(38) | yes | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |
| `onbehalfoforganisationid_fk` | character varying(38) |  | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |

# Provenance

Every record is attributed to a data provider — see [organisation](/uk-excavation-profile/feature-types/shared/organisation.md).
