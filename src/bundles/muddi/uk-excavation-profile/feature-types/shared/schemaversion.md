---
type: MUDDI Feature Type
title: Schemaversion
description: The Schemaversion feature table (version.schemaversion) in the MUDDI
  UK Excavation Profile.
resource: version.schemaversion
tags:
- shared
- uk-excavation
timestamp: '2026-07-04T00:00:00Z'
---

# Schema

| Column | Type | Required | References |
| --- | --- | --- | --- |
| `systemid` | character varying(38) | yes |  |
| `schemaname` | text | yes |  |
| `versiondate` | date | yes |  |
| `versionnumber` | text | yes |  |
