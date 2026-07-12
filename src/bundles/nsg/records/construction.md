---
type: NSG DTF Record
title: Construction Record (type 62)
description: Records the construction and reinstatement characteristics of a Street
  or part Street as defined in the SROH codes of practice.
record_type: 62
file: xxxx_AD.csv
status: Mandatory
tags:
- nsg
- dtf-8.1
- asd
- construction
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The Construction Record (type 62) is an Associated Street Data (ASD) record describing the construction type, reinstatement type and material properties of a Street or part Street, cross referenced to a type 11 Street Record via the USRN. It captures values defined in the Specification for the Reinstatement of Openings in the Highway (SROH) codes of practice together with the location extent to which they apply.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies the Record as a CONSTRUCTION Record. | I2 | 62 | Man |
| 2 | `CHANGE_TYPE` | Change identifier. Must always be CHANGE_TYPE = "I" for insert. | T1 | "I", "U", "D" | Man |
| 3 | `PRO_ORDER` | Unique numerical value representing the order in which the Records in the Full Supply transfer file should be processed. | I 16 |  | Man |
| 4 | `USRN` | Unique Street Reference Number. | I8 |  | Man |
| 5 | `RECORD_START_DATE` | Date when the Record started. | Date | 1990-01-01 to Present day | Man |
| 6 | `LAST_UPDATE_DATE` | Date when any attribute of the Record was changed. | Date | Greater than or equal to the RECORD_START_DATE and less than or equal to present day | Man |
| 7 | `RECORD_END_DATE` | Date when the Record ends. | Date | Present day or earlier | Con[^40] |
| 8 | `CONSTRUCTION_TYPE_SEQ_NUM` | Sequential number for each type 62 Record associated with USRN. | I3 |  | Man |
| 9 | `CONSTRUCTION_TYPE` | The type of Construction that the Record applies to. | I1 | See Section 7.1 | Man |
| 10 | `REINSTATEMENT_TYPE_CODE` | Reinstatement as defined in the SROH codes of practice. | I2 | See Section 7.2 | Con[^41] |
| 11 | `AGGREGATE_ABRASION_VALUE` | Value as defined in the SROH codes of practice. | I2 | See Section 7.3 | Opt |
| 12 | `POLISHED_STONE_VALUE` | Value as defined in the SROH codes of practice. | I2 | See Section 7.4 | Opt |
| 13 | `FROST_HEAVE_SUSCEPTIBILITY` | No = 0, Yes = 1 | I1 | 0,1 | Opt |
| 14 | `STEPPED_JOINT` | No = 0, Yes = 1 | I1 | 0,1 | Opt |
| 15 | `WHOLE_ROAD` | Indicator as to whether the Construction Record applies to the Whole Road. 0 indicates that is does not apply to the WHOLE_ROAD, 1 indicates that it does. | I1 | 0,1 | Man |
| 16 | `ASD_COORDINATE` | Where WHOLE_ROAD = 0 do type 67 ASD Coordinate Records exist No = 0, Yes = 1. Where WHOLE_ROAD = 1 this Record must not be present. | I1 | 0,1 | Con[^42] [^43] |
| 17 | `ASD_COORDINATE_COUNT` | Where ASD_COORDINATEs are present in the Full Supply transfer file. This is the count of coordinates expected in the type 67 ASD Coordinate Record. | I3 | 1-999 | Con[^44] |
| 18 | `CONSTRUCTION_LOCATION_TEXT` | Description of location of the part or parts of the Street for which this Construction type is applicable. | T 250 |  | Con[^45] |
| 19 | `CONSTRUCTION_START_X` | The X (eastings) coordinate of the start point of the Construction type. For part Street definitions only where ASD_COORDINATE = 0. | N 7.2 | 80000.00-656100.00 | Con[^46] |
| 20 | `CONSTRUCTION_START_Y` | The Y (eastings) coordinate of the start point of the Construction type. For part Street definitions only where ASD_COORDINATE = 0. | N 7.2 | 5000.00-657700.00 | Con[^47] |
| 21 | `CONSTRUCTION_END_X` | The X (northings) coordinate of the end point of the Construction type. Coordinates are defined in metres. For part Street definitions only where ASD_COORDINATE = 0. | N 7.2 | 80000.00-656100.00 | Con[^48] |
| 22 | `CONSTRUCTION_END_Y` | The Y (northings) coordinate of the end point of the Construction type. For part Street definitions only where ASD_COORDINATE = 0. | N 7.2 | 5000.00-657700.00 | Con[^49] |
| 23 | `CONSTRUCTION_DESCRIPTION` | Description providing additional Construction information for certain definitions. | T 250 |  | Opt |
| 24 | `SWA_ORG_REF_CONSULTANT` | Code to identify the Highway Authority which must be consulted about the Construction. | I4 | SWA_Code | Opt |
| 25 | `DISTRICT_REF_CONSULTANT` | Code to identify the Operational District of the Highway Authority which must be consulted about the Construction. | I3 |  | Opt |

# Code lists

## Construction Type (7.1)

| Code | CONSTRUCTION_TYPE |
| --- | --- |
| 1 | Street Reinstatement |
| 2 | Special Surface |
| 3 | Special Construction Needs |

## Reinstatement Type Codes (7.2)

| Code | REINSTATEMENT_TYPE_CODE |
| --- | --- |
| 1 | Carriageway type 1 (10 to 30 MSA) |
| 2 | Carriageway type 2 (2.5 to 10 MSA) |
| 3 | Carriageway type 3 (0.5 to 2.5 MSA) |
| 4 | Carriageway type 4 (up to 0.5 MSA) |
| 5 | Carriageway type 0 (30 to 125 MSA) |
| 6 | High Duty Footway |
| 7 | High Amenity Footway |
| 8 | Other Footways |
| 9 | Private Street – No definition information held by Street Authority |
| 10 | Carriageway type 6 (over 125 MSA) |
| 11 | Street maintained by another Highway Authority |
| 12 | Street outside scope of EToN |

## Aggregate Abrasion Value (7.3)

| Street Reinstatement type code | All Pre Coated Chippings | SMA, Material to PD6691 Surface Courses |
| --- | --- | --- |
| 5 | 10 | 12 |
| 1 | 12 | 14 |
| 2 | 12 | 14 |
| 3 | 14 | 16 |
| 4 | 14 | 16 |

## Polished Stone Value (7.4)

| Street Reinstatement type code | Site A Potentially High Risk | Site B Average or Low Risk |
| --- | --- | --- |
| 5 | 68 | 68 |
| 1 | 68 | 65 |
| 2 | 65 | 60 |
| 3 | 65 | 55 |
| 4 | 65 | 55 |

# Example

```
62,"I",578,62479000,1990-01-01,1997-01-01,,1,1,4,12,68,0,0,0,1,22,"100m from Kings
Road",,,,,"",0114,001
```

# Notes

- 1: Each Construction Record is a dependent (that is child) of a type 11 Street Record and is cross referenced using the USRN.
- 2: All cross referenced type 11 Street Records must be present in the Full Supply transfer file, or in the case of ASD submitted by the Street Authority, where they are not the Local Highway Authority, type 11 Street Records must already be present in GeoPlace.
- 3: If WHOLE_ROAD = 0, then coordinates (CONSTRUCTION_START_X, CONSTRUCTION_START_Y, CONSTRUCTION_END_X, CONSTRUCTION_END_Y) and a textual description (CONSTRUCTION_LOCATION_TEXT) must be entered to provide location information.
- 4: Where REINSTATEMENT_TYPE_CODE = 12 – Street outside scope of EToN, then STREET_STATUS = 5 – Street outside scope of EToN – see Section 6.1 - Street Maintenance Responsibility Codes (type 61 Interest Record), must be used.

# Footnotes

[^40]: Required if the Record is to be closed.

[^41]: Mandatory when STREET_CONSTRUCTION_TYPE = 1.

[^42]: If WHOLE_ROAD = 0 then the ASD_COORDINATE field must not be null.

[^43]: ASD_COORDINATE = 1 if the feature is either a Polygon or Line.

[^44]: Required if ASD_COORDINATE = 1.

[^45]: Required if WHOLE_ROAD = 0.

[^46]: Coordinates required if WHOLE_ROAD = 0 and ASD_COORDINATE = 0.

[^47]: Coordinates required if WHOLE_ROAD = 0 and ASD_COORDINATE = 0.

[^48]: Coordinates required if WHOLE_ROAD = 0 and ASD_COORDINATE = 0.

[^49]: Coordinates required if WHOLE_ROAD = 0 and ASD_COORDINATE = 0.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
