---
type: MUDDI Feature Type
title: Observationfeedback
description: The Observationfeedback feature table (usercreateddata.observationfeedback)
  in the MUDDI UK Excavation Profile.
resource: usercreateddata.observationfeedback
tags:
- shared
- uk-excavation
timestamp: '2026-07-04T00:00:00Z'
---

# Schema

| Column | Type | Required | References |
| --- | --- | --- | --- |
| `systemid` | character varying(38) | yes |  |
| `feedbackuserid` | text | yes |  |
| `feedbackrating` | text |  |  |
| `feedbackpercentage` | real | yes |  |
| `observationreported` | boolean | yes |  |
| `notes` | character varying(200) | yes |  |
| `observationid_fk` | character varying(38) | yes | [observation](/uk-excavation-profile/feature-types/shared/observation.md) |
