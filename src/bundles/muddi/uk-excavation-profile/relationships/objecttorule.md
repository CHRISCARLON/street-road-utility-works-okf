---
type: Relationship
title: Objecttorule
description: The Objecttorule junction table linking MUDDI features via soft references.
resource: coredata.relationship_objecttorule
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
| `linkedobjectid` | text | yes |  |
| `linkedobjecttable` | text | yes |  |
| `ruleid` | text | yes |  |
| `ruletablename` | text | yes |  |
| `dataproviderid_fk` | character varying(38) | yes | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |
