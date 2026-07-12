---
type: MUDDI Feature Type
title: Relationship Wronglyrecordedobject
description: The Relationship Wronglyrecordedobject feature table (usercreateddata.relationship_wronglyrecordedobject)
  in the MUDDI UK Excavation Profile.
resource: usercreateddata.relationship_wronglyrecordedobject
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
| `linkedwroid` | text | yes |  |
| `linkedobjectid` | text | yes |  |
| `linkedobjecttable` | text | yes |  |
| `targetproperty` | text | yes |  |
| `dataproviderid_fk` | character varying(38) | yes | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |

# Provenance

Every record is attributed to a data provider — see [organisation](/uk-excavation-profile/feature-types/shared/organisation.md).
