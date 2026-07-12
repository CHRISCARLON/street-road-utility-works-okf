---
type: MUDDI Feature Type
title: Activityproximityrule
description: The Activityproximityrule feature table (organisations.activityproximityrule)
  in the MUDDI UK Excavation Profile.
resource: organisations.activityproximityrule
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
| `name` | text | yes |  |
| `description` | text |  |  |
| `enhancedmeasures` | text |  |  |
| `activitytype` | text | yes |  |
| `proximity_length` | real |  |  |
| `proximity_unitofmeasure` | text |  |  |
| `dataproviderid_fk` | character varying(38) | yes | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |

# Provenance

Every record is attributed to a data provider — see [organisation](/uk-excavation-profile/feature-types/shared/organisation.md).
