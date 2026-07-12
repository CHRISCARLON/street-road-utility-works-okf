---
type: MUDDI Feature Type
title: Observationupdatehistory
description: The Observationupdatehistory feature table (usercreateddata.observationupdatehistory)
  in the MUDDI UK Excavation Profile.
resource: usercreateddata.observationupdatehistory
tags:
- shared
- uk-excavation
timestamp: '2026-07-04T00:00:00Z'
---

# Schema

| Column | Type | Required | References |
| --- | --- | --- | --- |
| `systemid` | character varying(38) | yes |  |
| `observationid` | text | yes |  |
| `message` | text |  |  |
| `observationstatus` | text |  |  |
| `userid` | text | yes |  |
| `dateofupdate` | timestamp with time zone | yes |  |
