---
type: NSG DTF Record
title: Special Designation Record (type 63)
description: Records Special Designations (such as Traffic Sensitive Streets, Special
  Engineering Difficulties or Special Events) applied to a Street.
record_type: 63
file: xxxx_AD.csv
status: Optional
tags:
- nsg
- dtf-8.1
- asd
- special-designation
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The Special Designation Record (type 63) captures Additional Street Data (ASD) identifying designations that apply to a Street, such as Protected Streets, Traffic Sensitive Streets, Special Engineering Difficulties and Special Events. Each Record is a dependent (child) of a type 11 Street Record and is cross referenced using the USRN.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies the Record as a SPECIAL DESIGNATION Record. | I2 | 63 | Man |
| 2 | `CHANGE_TYPE` | Change identifier. Must always be CHANGE_TYPE = "I" for insert. | T1 | "I", "U", "D" | Man |
| 3 | `PRO_ORDER` | Unique numerical value representing the order in which the Records in the Full Supply transfer file should be processed. | I 16 |  | Man |
| 4 | `USRN` | Unique Street Reference Number. | I8 |  | Man |
| 5 | `STREET_SPECIAL_DESIG_NUM` | Sequential number for each type 63 Record associated with USRN. | I3 |  | Man |
| 6 | `STREET_SPECIAL_DESIG_CODE` | Code to identify the type of Special Designation that the Record applies to (for example, Traffic Sensitive Street) | I2 | See Section 8.1 | Man |
| 7 | `WHOLE_ROAD` | Indicator as to whether the Special Designation applies to the Whole Road. 0 indicates that it does not apply to the WHOLE_ROAD, 1 indicates that it does. | I1 | 0,1 | Man |
| 8 | `RECORD_START_DATE` | Date when the Record started. | Date | 1990-01-01 to Present day | Man |
| 9 | `LAST_UPDATE_DATE` | Date when any attribute of the Record was changed. | Date | Greater than or equal to the RECORD_START_DATE and less than or equal to present day | Man |
| 10 | `RECORD_END_DATE` | Date when the Record ends. | Date | Present day or earlier | Con[^50] |
| 11 | `ASD_COORDINATE` | Where WHOLE_ROAD = 0 do ASD Coordinate Records (Type 67 Records) exist No = 0, Yes = 1. Where WHOLE_ROAD = 1 this Record must not be present. | I1 | 0,1 | Con[^51] [^52] |
| 12 | `ASD_COORDINATE_COUNT` | Where ASD_COORDINATEs are present in the Full Supply transfer file. This is the count of coordinates expected in the type 67 ASD Coordinate Record. | I3 | 1-999 | Con[^53] |
| 13 | `SPECIAL_DESIG_PERIODICITY_CODE` | Code to identify the periodicity of the restriction. | I2 | See Section 8.2 | Man |
| 14 | `SPECIAL_DESIG_LOCATION_TEXT` | Description of the location of the Special Designation within the Street. | T 250 |  | Con[^54] |
| 15 | `SPECIAL_DESIG_START_X` | The X (eastings) coordinate of the start point of the Special Designation. Coordinates are defined in metres. For part Street designations only where ASD_COORDINATE = 0. | N 7.2 | 80000.00-656100.00 | Con[^55] |
| 16 | `SPECIAL_DESIG_START_Y` | The Y (northings) coordinate of the start point of the Special Designation. Coordinates are defined in metres. For part Street designations only where ASD_COORDINATE = 0. | N 7.2 | 5000.00-657700.00 | Con[^56] |
| 17 | `SPECIAL_DESIG_END_X` | The X (eastings) coordinate of the end point of the Special Designation. Coordinates are defined in metres. For part Street designations only where ASD_COORDINATE = 0. | N 7.2 | 80000.00-656100.00 | Con[^57] |
| 18 | `SPECIAL_DESIG_END_Y` | The Y (northings) coordinate of the end point of the Special Designation. Coordinates are defined in metres. For part Street designations only where ASD_COORDINATE = 0. | N 7.2 | 5000.00-657700.00 | Con[^58] |
| 19 | `SPECIAL_DESIG_START_DATE` | Date when the Special Designation starts. | Date |  | Opt |
| 20 | `SPECIAL_DESIG_END_DATE` | Date when the Special Designation ends. | Date |  | Con[^59] |
| 21 | `SPECIAL_DESIG_START_TIME` | If the Special Designation has a specified time period, time when the Special Designation starts. | Time |  | Opt |
| 22 | `SPECIAL_DESIG_END_TIME` | If the Special Designation has a specified time period, time when the Special Designation ends. | Time |  | Con[^60] |
| 23 | `SPECIAL_DESIG_DESCRIPTION` | Description providing additional information for certain Special Designations. | T 250 |  | Con[^61] |
| 24 | `SWA_ORG_REF_CONSULTANT` | Code to identify the Street Authority which must be consulted about the Special Designation. | I4 | SWA_Code | Con |
| 25 | `DISTRICT_REF_CONSULTANT` | Code to identify the Operational District for the Street Authority which must be consulted about the Special Designation. | I3 |  | Con |
| 26 | `SOURCE_TEXT` | A brief textual summary of the department/function and/or organisation that is the source of this data. | T 120 |  | Opt |

# Code lists

## Special Designation Codes (8.1)

| Code | STREET_SPECIAL_DESIG_CODE |
| --- | --- |
| 1 | Protected Street |
| 2 | Traffic Sensitive |
| 3 | Special Engineering Difficulty (SED) |
| 4 | Not used by NSG (Code specifically for EToN transaction) |
| 5 | Code no longer in use |
| 6 | Proposed Special Engineering Difficulty |
| 7 | Code no longer in use |
| 8 | Level Crossing Safety Zone |
| 9 | Environmentally Sensitive Areas |
| 10 | Structures (not designated Special Engineering Difficulty) |
| 11 | Code no longer in use |
| 12 | Pipelines and specialist cables |
| 13 | Priority Lanes |
| 14 | Code no longer in use |
| 15 | Code no longer in use |
| 16 | Lane Rental |
| 17 | Streets subject to early notification of immediate activities |
| 18 | Special Events |
| 19 | Parking Bays and Restrictions |
| 20 | Pedestrian Crossings, Traffic Signals and Traffic Sensors |
| 21 | Speed Limits |
| 22 | Transport Authority Critical Apparatus |
| 23 | Strategic Route |
| 24 | Street Lighting |
| 25 | Drainage and Flood Risk |
| 26 | Unusual Traffic Layout |
| 27 | Local Considerations |
| 28 | Winter Maintenance Routes |
| 29 | HGV Approved Routes |
| 30 | Emergency Services Routes |

## Special Designation Periodicity Codes (8.2)

| Code | SPECIAL_DESIG_PERIODICITY_CODE |
| --- | --- |
| 1 | Everyday |
| 2 | Working days only |
| 3 | Weekends |
| 4 | Code no longer used |
| 5 | Code no longer used |
| 6 | Code no longer used |
| 7 | Monday only |
| 8 | Tuesday only |
| 9 | Wednesday only |
| 10 | Thursday only |
| 11 | Friday only |
| 12 | Saturday only |
| 13 | Sunday only |
| 14 | Public and Bank Holidays |
| 15 | Continuous[^62] |
| 16 | Special Arrangements[^63] |

# Example

```
63,"I",580,62479000,4,18,1,2014-01-01,2014-01-01,,1,8,3,"",,,,,2014-07-
07,,1200,1800,"Carnival",0114,001,"Highway maintenance paper file ref CARN12"
```

# Notes

- 1: Each Special Designation Record is a dependent (that is child) of a type 11 Street Record and is cross referenced using the USRN.
- 2: All cross referenced type 11 Street Records must be present in the Full Supply transfer file, or in the case of ASD submitted by the Street Authority, where they are not the Local Highway Authority, type 11 Street Records must already be present in GeoPlace.
- 3: If WHOLE_ROAD = 0 then coordinates (SPECIAL_DESIG_START_X, SPECIAL_DESIG_START_Y, SPECIAL_DESIG_END_X, SPECIAL_DESIG_END_Y) and a textual description (SPECIAL_DESIG_LOCATION_TEXT) must be entered to provide location information.
- 4: STREET_SPECIAL_DESIG_CODE = 4, 5, 7, 11, 14 and 15 must not be used.
- 5: SOURCE_TEXT is an optional textual summary Field of the source of the data.

# Footnotes

[^50]: Required if the Record is to be closed.

[^51]: If WHOLE_ROAD = 0 then the ASD_COORDINATE field must not be null.

[^52]: ASD_COORDINATE must only be used where the feature is either a Polygon or Line. Where the Record is a Point, ASD_COORDINATE = 0 and no type 67 ASD Coordinate Record is present.

[^53]: Required if ASD_COORDINATE = 1.

[^54]: Required if WHOLE_ROAD = 0 and ASD_COORDINATE = 0.

[^55]: Required if WHOLE_ROAD = 0 and ASD_COORDINATE = 0.

[^56]: Required if WHOLE_ROAD = 0 and ASD_COORDINATE = 0.

[^57]: Required if WHOLE_ROAD = 0 and ASD_COORDINATE = 0.

[^58]: Coordinates required if WHOLE_ROAD = 0 and ASD_COORDINATE = 0.

[^59]: End Date must only be present where the Special Designation is no longer active.

[^60]: End time must only be present if start time is present.

[^61]: Mandatory for all new Records entered after 1st April 2015.

[^62]: SPECIAL_DESIG_START_DATE, SPECIAL_DESIG_END_DATE, SPECIAL_DESIG_START_TIME and SPECIAL_DESIG_END_TIME must also be present.

[^63]: Where Special Arrangements are in place, the details must be included within the SPECIAL_DESIG_DESCRIPTION Field.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
