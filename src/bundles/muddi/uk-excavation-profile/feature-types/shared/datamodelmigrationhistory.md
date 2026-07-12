---
type: MUDDI Feature Type
title: Datamodelmigrationhistory
description: The Datamodelmigrationhistory feature table (version.datamodelmigrationhistory)
  in the MUDDI UK Excavation Profile.
resource: version.datamodelmigrationhistory
tags:
- shared
- uk-excavation
timestamp: '2026-07-04T00:00:00Z'
---

# Schema

| Column | Type | Required | References |
| --- | --- | --- | --- |
| `systemid` | character varying(38) | yes |  |
| `dateofmigration` | date | yes |  |
| `fromversionnumber` | text | yes |  |
| `toversionnumber` | text | yes |  |
| `appliedby` | text |  |  |
