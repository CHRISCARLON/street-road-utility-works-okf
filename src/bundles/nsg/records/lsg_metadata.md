---
type: NSG DTF Record
title: LSG Metadata Record (type 29)
description: Provides metadata describing the Local Street Gazetteer, including custodian,
  coordinate system, language, dates and content coverage percentages.
record_type: 29
file: xxxx_LG.csv
status: Mandatory
tags:
- nsg
- dtf-8.1
- lsg
- metadata
- gazetteer
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The LSG Metadata Record (type 29) describes the Local Street Gazetteer as a whole. It captures the geographic domain, custodian details, coordinate reference system, classification scheme, language and a set of content coverage percentages for the data present in GeoPlace.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies this Record as a LSG METADATA Record. | I2 | 29 | Man |
| 2 | `TER_OF_USE` | Geographic domain of the gazetteer. | T 60 |  | Man |
| 3 | `LINKED_DATA` | List of application dataset used to update the LSG. | T 100 |  | Opt |
| 4 | `NGAZ_FREQ` | Frequency with which LSG is maintained and sent to the NSG Custodian. | T1 | "M" | Man |
| 5 | `CUSTODIAN_NAME` | Organisation or department/function responsible for the compilation and maintenance of the data in the gazetteer that is a DCA Participating Authority. | T 40 |  | Man |
| 6 | `CUSTODIAN_UPRN` | UPRN of Authority Street Custodian location. | I 12 |  | Man |
| 7 | `AUTH_CODE` | Issued by NSG Custodian | I4 |  | Man |
| 8 | `CO_ORD_SYSTEM` | Co-ordinate reference system used in the gazetteer to describe position that is the British National Grid. | T 40 | "British National Grid" | Man |
| 9 | `CO_ORD_UNIT` | Measure of coordinates used within the gazetteer | T 10 | "Metres" | Man |
| 10 | `META_DATE` | Date metadata was last updated. | Date |  | Man |
| 11 | `CLASS_SCHEME` | Classification scheme used for all multiple value specified Fields for example DEC-NSG v8.1. | T 40 |  | Man |
| 12 | `GAZ_DATE` | Date at which the gazetteer can be considered to be current. | Date |  | Man |
| 13 | `LANGUAGE` | Language(s) used for descriptors within the gazetteer. | T3 | See Section 5.8.1 | Man |
| 14 | `CHARACTER_SET` | Textual description of character set used for the data present in the Full Supply transfer file. | T 30 |  | Man |
| 15 | `CONTENT_MOTORWAY_TRUNK_ROAD` | Percentage of Motorway / Trunk roads that are present in GeoPlace. | I3 | 0-100 | Man |
| 16 | `CONTENT_PRIVATE_STREET` | Percentage of private Streets that are present in GeoPlace. | I3 | 0-100 | Man |
| 17 | `CONTENT_PRN` | Percentage of the Primary Route Network that is present in GeoPlace. | I3 | 0-100 | Man |
| 18 | `CONTENT_CLASSIFIED_ROAD` | Percentage of Classified Roads that are present in GeoPlace. | I3 | 0-100 | Man |
| 19 | `CONTENT_PROW_FOOTPATH` | Percentage of PRoW defined Footpaths that are present in GeoPlace. | I3 | 0-100 | Man |
| 20 | `CONTENT_PROW_BRIDLEWAY` | Percentage of PRoW defined Bridleways that are present in GeoPlace. | I3 | 0-100 | Man |
| 21 | `CONTENT_PROW_RESTRICTED_BYWAY` | Percentage of PRoW defined Restricted Byways that are present in GeoPlace. | I3 | 0-100 | Man |
| 22 | `CONTENT_PROW_BOAT` | Percentage of PRoW defined Byways Open to All Traffic that are present in GeoPlace. | I3 | 0-100 | Man |
| 23 | `CONTENT_NATIONAL_CYCLE_ROUTE` | Percentage of National Cycle Routes that are present in GeoPlace. | I3 | 0-100 | Man |

# Code lists

## LSG METADATA RECORD Codes (5.8.1)

| Code | LANGUAGE |
|---|---|
| "ENG" | English |
| "BIL" | Bilingual using English and Welsh languages |

# Example

```
29,"Cornwall","","M","Highways",100041031005,840,"British National
Grid","Metres",2013-01-02,"DTF8.1",2013-01-
02,"ENG","English",100,80,50,100,80,100,0,80,80
```

# Notes

- 1: The language code of "BIL" must be used in the LSG Metadata Record only to show that both English and Welsh are fully represented on equal terms in the gazetteer.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
