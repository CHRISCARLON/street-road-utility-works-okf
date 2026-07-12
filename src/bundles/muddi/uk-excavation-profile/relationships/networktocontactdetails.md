---
type: Relationship
title: Networktocontactdetails
description: The Networktocontactdetails junction table linking MUDDI features via
  soft references.
resource: coredata.relationship_networktocontactdetails
tags:
- relationship
- uk-excavation
timestamp: '2026-07-04T00:00:00Z'
---

# Schema

| Column | Type | Required | References |
| --- | --- | --- | --- |
| `_id` | bigserial | yes |  |
| `linkedobjectid` | text | yes |  |
| `linkedobjecttable` | text | yes |  |
| `linkedcontactdetailsid` | text | yes |  |
