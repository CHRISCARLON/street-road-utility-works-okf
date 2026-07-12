---
type: MUDDI Feature Type
title: Organisation
description: The Organisation feature table (organisations.organisation) in the MUDDI
  UK Excavation Profile.
resource: organisations.organisation
tags:
- shared
- uk-excavation
timestamp: '2026-07-04T00:00:00Z'
---

# Schema

| Column | Type | Required | References |
| --- | --- | --- | --- |
| `systemid` | character varying(38) | yes |  |
| `lifecyclestatus` | text | yes | [lifecyclestatusvalue](/uk-excavation-profile/codelists/lifecyclestatusvalue.md) |
| `datelastupdated` | timestamp with time zone | yes |  |
| `dateoflastlifecyclestatuschange` | timestamp with time zone |  |  |
| `systemloaddate` | timestamp with time zone | yes |  |
| `actortype` | text |  |  |
| `name` | text |  |  |
| `address_singlelineaddress` | text |  |  |
| `address_subbuilding` | text |  |  |
| `address_buildingname` | text |  |  |
| `address_buildingnumber` | text |  |  |
| `address_streetname` | text |  |  |
| `address_locality` | text |  |  |
| `address_townname` | text |  |  |
| `address_postcode` | text |  |  |
| `address_uprn` | text |  |  |
| `swacode` | text |  |  |
| `copyrighttext` | text |  |  |
| `corporateemaildomains` | text |  |  |
| `organisationtype` | text |  |  |
| `disclaimertext` | text |  |  |
| `parentorganisationname` | text |  |  |
| `displayname` | text |  |  |
| `reference` | text |  |  |
| `websiteurl` | text |  |  |
| `parentorganisationid` | text |  |  |
| `standardguidance` | character varying(255) |  |  |
| `administeredbyparent` | boolean |  |  |
| `shortname` | text |  |  |
