---
type: MUDDI Feature Type
title: Relationship Organisationtoservicearea
description: The Relationship Organisationtoservicearea feature table (organisations.relationship_organisationtoservicearea)
  in the MUDDI UK Excavation Profile.
resource: organisations.relationship_organisationtoservicearea
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
| `organisationid` | text | yes |  |
| `serviceareaid` | text | yes |  |
| `serviceareapurpose` | text | yes |  |
| `serviceareaname` | text |  |  |
| `utilitytype` | text |  | [utilitytypevalue](/uk-excavation-profile/codelists/utilitytypevalue.md) |
| `dataproviderid_fk` | character varying(38) | yes | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |

# Provenance

Every record is attributed to a data provider — see [organisation](/uk-excavation-profile/feature-types/shared/organisation.md).
