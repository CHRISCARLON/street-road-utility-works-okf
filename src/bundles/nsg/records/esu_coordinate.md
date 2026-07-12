---
type: NSG DTF Record
title: ESU Coordinate Record (type 14)
description: Holds an individual coordinate point defining the geometry of an Elementary
  Street Unit.
record_type: 14
file: xxxx_LG.csv
status: Mandatory
tags:
- nsg
- dtf-8.1
- lsg
- esu
- coordinate
- geometry
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The Elementary Street Unit (ESU) Coordinates Record (type 14) holds a single coordinate point that contributes to the geometry of an ESU. Each record is a child of a type 13 Elementary Street Unit Record, cross referenced by ESUID, and is sequenced by its coordinate number.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies the Record as an ESU COORDINATES Record. | I2 | 14 | Man |
| 2 | `CHANGE_TYPE` | Change identifier. Must always be CHANGE_TYPE = "I" for insert. | T1 | "I", "U", "D" | Man |
| 3 | `PRO_ORDER` | Unique numerical value representing the order in which the Records in the Full Supply transfer file should be processed. | I 16 |  | Man |
| 4 | `ESUID` | Mid-point British National Grid coordinate of the ESU. The unique identifier for the ESU. | I 14 |  | Man |
| 5 | `ESU_VERSION_NUMBER` | A sequential number indicating the version of the Record. | I1 | 1 | Man |
| 6 | `COORD_NUMBER` | Sequential counter of the coordinates for an ESU. Range starts at 1 and must be less than or equal to the value of NUM_COORD on the corresponding parent Elementary Street Unit Record. Indicator as to the order of the coordinates for an ESU. | I3 | 1-999 | Man |
| 7 | `ESU_X_COORD` | The X (eastings) coordinate of a point on the ESU. Coordinates are defined in metres. | N 7.2 | 80000.00-656100.00 | Man |
| 8 | `ESU_Y_COORD` | The Y (northings) coordinate of a point on the ESU. Coordinates are defined in metres. | N 7.2 | 5000.00-657700.00 | Man |

# Example

```
14,"I",4,334560344444,1,1,371939.55,164768.65
```

# Notes

- 1: Each ESU Coordinates Record is a dependent, (that is child), of a type 13 Elementary Street Unit Record and is cross referenced using the ESUID.
- 2: All cross referenced Elementary Street Unit Records must be present in the Full Supply transfer file.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
