---
type: Relationship
title: Subordinatenetworktorule
description: The Subordinatenetworktorule junction table linking MUDDI features via
  soft references.
resource: coredata.relationship_subordinatenetworktorule
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
| `networkid` | text | yes |  |
| `networktableid` | text | yes |  |
| `ruleid` | text | yes |  |
| `ruletablename` | text | yes |  |
| `dataproviderid_fk` | character varying(38) | yes | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |
