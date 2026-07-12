---
type: MUDDI Feature Type
title: Observationorganisationvisibilityscope
description: The Observationorganisationvisibilityscope feature table (usercreateddata.observationorganisationvisibilityscope)
  in the MUDDI UK Excavation Profile.
resource: usercreateddata.observationorganisationvisibilityscope
tags:
- shared
- uk-excavation
timestamp: '2026-07-04T00:00:00Z'
---

# Schema

| Column | Type | Required | References |
| --- | --- | --- | --- |
| `systemid` | character varying(38) | yes |  |
| `scopeofsharing` | text | yes |  |
| `potentialsensitivity` | boolean | yes |  |
| `observationid_fk` | character varying(38) | yes | [observation](/uk-excavation-profile/feature-types/shared/observation.md) |
