---
type: NSG DTF Record
title: Elementary Street Unit Record (type 13)
description: Defines an Elementary Street Unit, the atomic geometric section of a
  Street identified by its mid-point ESUID.
record_type: 13
file: xxxx_LG.csv
status: Mandatory
tags:
- nsg
- dtf-8.1
- lsg
- esu
- street
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The Elementary Street Unit (ESU) Record (type 13) represents an individual geometric section of a Street. Each ESU is uniquely identified by its ESUID, derived from the British National Grid coordinate at the mid-point of the unit, and holds the coordinate count and direction of traffic flow.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies the Record as an ESU Record. | I2 | 13 | Man |
| 2 | `CHANGE_TYPE` | Change identifier. Must always be CHANGE_TYPE = “I” for insert. | T1 | “I”, “U”, “D” | Man |
| 3 | `PRO_ORDER` | Unique numerical value representing the order in which the Records in the Full Supply transfer file should be processed. | I 16 |  | Man |
| 4 | `ESUID` | Mid-point British National Grid coordinate of the ESU. A unique identifier for the ESU. | I 14 |  | Man |
| 5 | `ESU_VERSION_NUMBER` | A sequential number indicating the version of the Record. | I1 | 1 | Man |
| 6 | `NUM_COORD_COUNT` | The total number of coordinates counted that define the Street’s geometry. This number includes the start and end coordinate held in the ESU Record and any additional ESU_COORDS Records. Also known as the number of shaping vertices. | I3 | 2-999 | Man |
| 7 | `ESU_TOLERANCE` | The tolerance of all coordinate points. Tolerance is defined in metres. | I2 | Value 1, 5 10 or 50 | Man |
| 8 | `ESU_ENTRY_DATE` | Date when the Record was entered or a new instance created. | Date | 1990-01-01 to present date | Man |
| 9 | `ESU_START_DATE` | Date when the section of the Street represented by the ESU was created in the real world or planned to start. | Date |  | Man |
| 10 | `ESU_LAST_UPDATE_DATE` | Date when any attribute of the ESU Record was changed. | Date | Greater than or equal to the ESU_ENTRY_DATE and less than or equal to present day | Man |
| 11 | `ESU_END _DATE` | Date when the ESU ceased to exist in the real world or the date when the Elementary Street Unit Record was closed. | Date | Greater than or equal to ESU_START_DATE and less than or equal to present day | Con[^7] |
| 12 | `ESU_DIRECTION` | Indicates whether traffic flow is restricted in a particular direction. | I1 | See Section 5.3.1 | Man |

# Code lists

## ESU Direction Codes (5.3.1)

| Code | ESU_DIRECTION |
| --- | --- |
| 1 | Two Way |
| 2 | One way in direction from Start to End coordinate. |
| 3 | One way in direction from End to Start coordinate. |

# Example

```
13,”I”,3,3334560344444,1,5,5,2004-04-01,2004-04-01,2004-04-04,2004-04-04,1
```

# Notes

- 1: ESUIDs should be initially constructed by combining the easting and northing at the mid-point of the ESU.
- 2: Note that the zero filling of the easting may disappear when the ESUID is converted to a numeric value. For example an ESU with a centre of 81237, 657700 has an ESUID of 00812370657700. However the Full Supply transfer file has the value 812370657700.
- 3: It is possible that ESUIDs are duplicated in other LSGs. When compiling more than one LSG into a user defined combined database the ESUID must be used with the SWA_ORG_REF_NAMING code (LAID) of the SNN Authority as the unique identifier. This is to ensure a nationally unique and persistent identifier is used in that user defined combined database.
- 4: Each Elementary Street Unit Record is a dependent (that is child) of a type 12 Street XREF Record and is cross referenced using the ESUID.
- 5: If an ESU is closed, it is not necessary to delete all ESU coordinates from the Full Supply transfer file.
- 6: Only the most recent version of an ESU must be present in the Full Supply transfer file.

# Footnotes

[^7]: Required if ESU Record is closed.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
