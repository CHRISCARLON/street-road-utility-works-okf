---
type: Relationship
title: Objecttoenclosingobject
description: The Objecttoenclosingobject junction table linking MUDDI features via
  soft references.
resource: coredata.relationship_objecttoenclosingobject
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
| `linkedenclosedobjectid` | text | yes |  |
| `linkedenclosedobjecttable` | text | yes |  |
| `linkedenclosingobjectid` | text | yes |  |
| `linkedenclosingobjecttable` | text | yes |  |
| `dataproviderid_fk` | character varying(38) | yes | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |
