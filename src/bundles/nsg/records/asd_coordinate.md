---
type: NSG DTF Record
title: ASD Coordinate Record (type 67)
description: Captures the individual coordinate points that define the geometry (line
  or polygon) of an ASD or PRoW Record.
record_type: 67
file: xxxx_AD.csv
status: Optional
tags:
- nsg
- dtf-8.1
- asd
- coordinate
- geometry
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The ASD Coordinate Record (type 67) captures the coordinate points that define the geometry of a type 61, 62, 63, 64 ASD Record or a type 66 PRoW Record. Each row holds a single sequential coordinate (level 3 capture) for the parent Record, expressed in British National Grid metres.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies the Record as an ASD_COORDINATE Record. | I2 | 67 | Man |
| 2 | `CHANGE_TYPE` | Change identifier. Must always be CHANGE_TYPE = “I” for insert. | T1 | “I”, “U”, “D” | Man |
| 3 | `PRO_ORDER` | Unique numerical value representing the order in which the Records in the Full Supply transfer file should be processed. | I 16 |  | Man |
| 4 | `ASD_GEOMETRY_TYPE` | Identifies the record type as a Line or Polygon. | T1 | “L”, “P” | Man[^85] |
| 5 | `ASD_RECORD_IDENTIFIER` | Identifies the Record Type to which these ASD_COORDINATEs applies. | I2 | 61, 62, 63, 64, 66 | Man |
| 6 | `ASD_USRN` | Identifies the USRN to which these ASD_COORDINATEs applies. | I8 |  | Man |
| 7 | `ASD_SEQ_NUM` | Identifies the ASD sequence number within each Record type (61-64) to which these ASD_COORDINATEs applies. | I3 | 1-999 | Con[^86] |
| 8 | `COORD_NUMBER` | Sequential counter of the coordinates for an ASD Record. Range starts at 1 and this is the start point of the ASD, number must be equal to or less than the value of ASD_COORDINATE_COUNT on the corresponding parent ASD Record. | I3 | 1-999 | Man |
| 9 | `ASD_X_COORDINATE` | The X (eastings) coordinate of a point on the ASD. Coordinates are defined in metres. | N 7.2 | 80000.00-656100.00 | Man |
| 10 | `ASD_Y_COORDINATE` | The Y (northings) coordinate of a point on the ASD. Coordinates are defined in metres. | N 7.2 | 5000.00-657700.00 | Man |

# Example

```
67,”I”,333,”L”,61,18104345,3,1,371939.55,164768.65
```

# Notes

- 1: Where ASD is not captured to the same extent as the Whole Road (WHOLE_ROAD = 0) (level 1), then any ASD may be captured by means of start and end points in the Record (level 2), or by means of the ASD Coordinate Record geometry i.e. level 3.
- 2: This Record captures the coordinate points of each Record for any of the type 61, 62, 63, 64 ASD and 66 PRoW Records.
- 3: This Record is Optional, but may become Mandatory if it is agreed by the community to capture all data at level 3.
- 4: The following table outlines the relationships between the type 67 ASD Coordinate Record and ASD type 61, 62, 63 and 64 Records where:
  | WHOLE_ROAD in type 61, 62, 63 and 64 Records | ASD_COORDINATE in type 61, 62, 63 and 64 Records | ASD_COORDINATE_COUNT in type 61, 62, 63 and 64 Records | XY Start and End Coordinates in ASD type 61, 62, 63 and 64 Records | Type 67 ASD Coordinate Record |
  | --- | --- | --- | --- | --- |
  | 1 | Null | Null | Null | Null |
  | 0 | 1 | Present | Optional* | Present |
  | 0 | 0 | Null | Present | Null |
  *Note – The DTF8.1 Specification does not restrict start and end coordinates being present in part road Records where type 61, 62, 63 and 64 ASD_Coordinate = 1 is present, although the assumption is that they will not be required where the type 67 ASD Coordinate Record is present. This means that where type 61, 62, 63 and 64 ASD_Coordinate = 1 is present, start and end coordinate Fields in each Record type can also be present and compliant. The purpose of this is to make allowances for software suppliers that have yet to develop their systems to transfer and accept type 67 ASD Coordinate Records.

# Footnotes

[^85]: If a Polygon “P” then the first and last Record coordinates for each Record must be the same.

[^86]: Only required if ASD_RECORD_IDENTIFIER is 61, 62, 63 or 64.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
