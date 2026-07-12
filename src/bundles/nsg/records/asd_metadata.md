---
type: NSG DTF Record
title: ASD Metadata Record (type 69)
description: Provides gazetteer-level metadata for the ASD, including custodian details,
  coordinate system and the percentage completeness of each ASD data category present
  in GeoPlace.
record_type: 69
file: xxxx_AD.csv
status: Mandatory
tags:
- nsg
- dtf-8.1
- asd
- metadata
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The ASD Metadata Record (type 69) describes the ASD gazetteer as a whole. It records custodian and coordinate-system details, maintenance and currency dates, language and character set, and a set of percentage measures indicating how complete each ASD data category is within GeoPlace.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies this Record as ASD metadata. | I2 | 69 | Man |
| 2 | `TER_OF_USE` | Geographic domain of the gazetteer. | T 60 |  | Man |
| 3 | `LINKED DATA` | List of application dataset used to update the ASD. | T 100 |  | Opt |
| 4 | `NGAZ_FREQ` | Frequency with which LSG is maintained and sent to the NSG Custodian. | T1 | “M” | Man |
| 5 | `CUSTODIAN_NAME` | Organisation or department/function responsible for the compilation and maintenance of the data that is a DCA Participating Authority or a National/Regional Highway Authority. | T 40 |  | Man |
| 6 | `CUSTODIAN_UPRN` | UPRN of Authority Street Custodian location. | I 12 |  | Man |
| 7 | `AUTH_CODE` | Issued by NSG Custodian | I4 |  | Man |
| 8 | `CO_ORD_SYSTEM` | Co-ordinate reference system used in the gazetteer to describe position that is the British National Grid. | T 40 | “British National Grid” | Man |
| 9 | `CO_ORD_UNIT` | Measure of coordinates used within the gazetteer. | T 10 | “Metres” | Man |
| 10 | `META_DATE` | Date metadata was last updated. | Date |  | Man |
| 11 | `CLASS_SCHEME` | Classification scheme used for all multiple value specified Fields for example DTF8.1. | T 40 |  | Man |
| 12 | `GAZ_DATE` | Date at which the gazetteer can be considered to be current. | Date |  | Man |
| 13 | `LANGUAGE` | Language(s) used for descriptors within the ASD. | T3 | See Section 12.1 | Man |
| 14 | `CHARACTER_SET` | Textual description of character set used for the data present in the Full Supply transfer file. | T 30 |  | Man |
| 15 | `MD_PROTECTED_STREET` | Percentage of Protected Streets that are present in GeoPlace. | I3 | 0-100 | Man |
| 16 | `MD_TRAFFIC_SENSITIVE` | Percentage Traffic Sensitive Streets that are present in GeoPlace. | I3 | 0-100 | Man |
| 17 | `MD_SED` | Percentage of Special Engineering Difficulties (SEDs) that are present in GeoPlace. | I3 | 0-100 | Man |
| 18 | `MD_PROPOSED_SED` | Percentage of proposed Special Engineering Difficulties that are present in GeoPlace. | I3 | 0-100 | Man |
| 19 | `MD_LEVEL_CROSSING` | Percentage of Level Crossing Safety Zone that are present in GeoPlace. | I3 | 0-100 | Opt |
| 20 | `MD_ENV_SENSITVE_AREA` | Percentage of Environmentally Sensitive Areas that are present in GeoPlace. | I3 | 0-100 | Man |
| 21 | `MD_STRUCTURES_NOT_SED` | Percentage of Structures that are not designated SEDs that are present in GeoPlace. | I3 | 0-100 | Man |
| 22 | `MD_PIPELINES_AND_CABLES` | Percentage of Pipelines and Specialist Cables that are present in GeoPlace. | I3 | 0-100 | Opt |
| 23 | `MD_PRIORITY_LANES` | Percentage of Priority Lanes that are present in GeoPlace. | I3 | 0-100 | Man |
| 24 | `MD_LANE_RENTAL` | Percentage of Lane Rental data that is present in GeoPlace. | I3 | 0-100 | Man |
| 25 | `MD_EARLY_NOTIFICATION` | Percentage of Street subject to early notification of immediate activities that are present in GeoPlace. | I3 | 0-100 | Opt |
| 26 | `MD_SPECIAL_EVENTS` | Percentage of Special Events that are present in GeoPlace. | I3 | 0-100 | Man |
| 27 | `MD_PARKING` | Percentage of this Parking Bays and restrictions that are present in GeoPlace. | I3 | 0-100 | Man |
| 28 | `MD_PED_CROSS_AND_SIGNALS` | Percentage of Pedestrian Crossings, Traffic Signals and Traffic Sensors that are present in GeoPlace. | I3 | 0-100 | Man |
| 29 | `MD_SPEED_LIMIT` | Percentage of Speed Limits that are present in GeoPlace. | I3 | 0-100 | Man |
| 30 | `MD_TRANS_AUTH_APP` | Percentage of Transport Authority Critical Apparatus that are present in GeoPlace. | I3 | 0-100 | Opt |
| 31 | `MD_STRATEGIC_ROUTE` | Percentage of Strategic Routes that are present in GeoPlace. | I3 | 0-100 | Man |
| 32 | `MD_STREET_LIGHT` | Percentage of Street Lighting that is present in GeoPlace. | I3 | 0-100 | Opt |
| 33 | `MD_DRAINAGE_AND_FLOOD` | Percentage of Drainage and Flood Risk areas that are present in GeoPlace. | I3 | 0-100 | Opt |
| 34 | `MD_UNUSUAL_LAYOUT` | Percentage of Streets that have an Unusual Traffic Layout that are present in GeoPlace. | I3 | 0-100 | Opt |
| 35 | `MD_LOCAL_CONSIDER` | Percentage of Streets with Local Considerations that are present in GeoPlace. | I3 | 0-100 | Opt |
| 36 | `MD_WINTER_MAIN_ROUTE` | Percentage of Streets with Winter Maintenance Routes that are present in GeoPlace. | I3 | 0-100 | Man |
| 37 | `MD_HGV_ROUTE` | Percentage of HGV Approved Routes that are present in GeoPlace. | I3 | 0-100 | Man |
| 38 | `HD_EMERGENCY_ROUTE` | Percentage of Emergency Services Routes that are present in GeoPlace. | I3 | 0-100 | Man |

# Code lists

## - ASD Metadata language codes (12.1)

| Code | LANGUAGE |
| --- | --- |
| “ENG” | English |
| “BIL” | Bilingual using English and Welsh languages |

# Example

```
69,”Cornwall”,””,”M”,”Highways Section”,100041031005, 0840,”British National
Grid”,“Metres”,2013-01-02,”DTF8.1”,2013-01-
02,”ENG”,”English”,100,100,100,100,50,80,80,10,20,0,100,100,0,0,0,100,60,0,100,0,0,0,
0,80
```

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
