---
type: Relationship
title: Sitetositezoneofinterest
description: The Sitetositezoneofinterest junction table linking MUDDI features via
  soft references.
resource: coredata.relationship_sitetositezoneofinterest
tags:
- relationship
- uk-excavation
timestamp: '2026-07-04T00:00:00Z'
---

# Schema

| Column | Type | Required | References |
| --- | --- | --- | --- |
| `systemid` | character varying(38) | yes |  |
| `lifecyclestatus` | text | yes |  |
| `datelastupdated` | timestamp with time zone | yes |  |
| `dateoflastlifecyclestatuschange` | timestamp with time zone |  |  |
| `systemloaddate` | timestamp with time zone | yes |  |
| `linkedsiteid` | text | yes |  |
| `linkedsitetable` | text | yes |  |
| `linkedsitezoneid` | text | yes |  |
| `linkedsitezonetable` | text | yes |  |
| `dataproviderid_fk` | character varying(38) | yes | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |
