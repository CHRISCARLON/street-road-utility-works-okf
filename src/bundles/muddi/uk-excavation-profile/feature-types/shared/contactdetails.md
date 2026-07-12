---
type: MUDDI Feature Type
title: Contactdetails
description: The Contactdetails feature table (organisations.contactdetails) in the
  MUDDI UK Excavation Profile.
resource: organisations.contactdetails
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
| `organisationname` | text |  |  |
| `address_singlelineaddress` | text |  |  |
| `address_subbuilding` | text |  |  |
| `address_buildingname` | text |  |  |
| `address_buildingnumber` | text |  |  |
| `address_streetname` | text |  |  |
| `address_locality` | text |  |  |
| `address_townname` | text |  |  |
| `address_postcode` | text |  |  |
| `address_uprn` | text |  |  |
| `contactdetailstype` | text |  | [contactdetailstypevalue](/uk-excavation-profile/codelists/contactdetailstypevalue.md) |
| `departmentname` | text |  |  |
| `emailaddress` | text |  |  |
| `telephonenumber` | text |  |  |
| `webform` | text |  |  |
| `dataproviderid_fk` | character varying(38) | yes | [organisation](/uk-excavation-profile/feature-types/shared/organisation.md) |

# Provenance

Every record is attributed to a data provider — see [organisation](/uk-excavation-profile/feature-types/shared/organisation.md).
