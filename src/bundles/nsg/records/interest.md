---
type: NSG DTF Record
title: Interest Record (type 61)
description: Records an organisation's interest in a Street or part Street, its maintenance
  responsibility, street status and location extent.
record_type: 61
file: xxxx_AD.csv
status: Mandatory
tags:
- nsg
- dtf-8.1
- asd
- interest
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The Interest Record (type 61) is an Associated Street Data (ASD) record identifying an organisation that has an interest in a Street or part of a Street, cross referenced to a type 11 Street Record via the USRN. It captures the interested authority, the nature of that interest, the street maintenance status, and the extent of the interest along the Street.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies the Record as an INTEREST Record. | I2 | 61 | Man |
| 2 | `CHANGE_TYPE` | Change identifier. Must always be CHANGE_TYPE = "I" for insert. | T1 | "I", "U", "D" | Man |
| 3 | `PRO_ORDER` | Unique numerical value representing the order in which the Records in the Full Supply transfer file should be processed. | I 16 |  | Man |
| 4 | `USRN` | Unique Street Reference Number. | I8 |  | Man |
| 5 | `ADDITIONAL_STREET_SEQUENCE_NUM` | Sequential number for each Street for each additional Street information Record. | I3 |  | Man |
| 6 | `SWA_ORG_REF_AUTHORITY` | Code to identify the authority which has an interest in the Street. | I4 |  | Man |
| 7 | `DISTRICT_REF_AUTHORITY` | Code to identify the Operational District within the authority. | I3 | District_Ref | Man |
| 8 | `RECORD_START_DATE` | Date when the Record started. | Date | 1990-01-01 to present day | Man |
| 9 | `LAST_UPDATE_DATE` | Date when any attribute of the Record was changed. | Date | Greater than or equal to the RECORD_START_DATE and less than or equal to present day | Man |
| 10 | `RECORD_END_DATE` | Date when the Record ends | Date | Present day or earlier | Con[^26] |
| 11 | `WHOLE_ROAD` | Indicator as to whether the additional Street information applies to the Whole Road. 0 indicates that it does not apply to the WHOLE_ROAD. | I1 | 0,1 | Man |
| 12 | `ASD_COORDINATE` | Where WHOLE_ROAD = 0 do ASD Coordinate Records (type 67 Records) exist No = 0, Yes = 1. Where WHOLE_ROAD = 1 this Record must not be present. | I1 | 0,1 | Con[^27] [^28] |
| 13 | `ASD_COORDINATE_COUNT` | Where ASD_COORDINATEs are present in the Full Supply transfer file. This is the count of coordinates expected in the type 67 ASD Coordinate Record. | I3 | 1-999 | Con[^29] |
| 14 | `ADDITIONAL_STREET_LOCATION_TEXT` | Description of the location of the parts of the Street to which this additional Street Record applies. For part Street Records only. | T 250 |  | Con[^30] |
| 15 | `SWA_ORG_REF_MAINTAINING` | Code to identify the Street Authority that is legally responsible for maintaining the street where this is not the Local Highway Authority. For example, TfL, Highways England and Welsh Government.[^31] | I4 | 0011, 0016, 0020, 709332[^32] | Con[^33] |
| 16 | `STREET_STATUS` | Street status as defined within the Street Maintenance Responsibility table. | I2 | See Section 6.1 | Con[^34] |
| 17 | `INTEREST_TYPE` | Code to identify the nature of the interest that the organisation has in the Street. Defined within the SWA Data Capture Codes. | I2 | See Section 6.2 | Man |
| 18 | `START_X` | The X (eastings) coordinate of the start point. For part Street definitions only where ASD_COORDINATE = 0 | N 7.2 | 80000.00-656100.00 | Con[^35] |
| 19 | `START_Y` | The Y (northings) coordinate of the start point. For part Street definitions only where ASD_COORDINATE = 0 | N 7.2 | 5000.00-657700.00 | Con[^36] |
| 20 | `END_X` | The X (eastings) coordinate of the end point. For part Street definitions only where ASD_COORDINATE = 0 | N 7.2 | 80000.00-656100.00 | Con[^37] |
| 21 | `END_Y` | The Y (northings) coordinate of the end point. For part Street definitions only where ASD_COORDINATE = 0 | N 7.2 | 5000.00-657700.00 | Con[^38] |

# Code lists

## Street Maintenance Responsibility Codes (6.1)

| Code | STREET_STATUS |
| --- | --- |
| 1 | Maintainable at Public Expense |
| 2 | Prospectively Maintainable at Public Expense |
| 3 | Neither 1, 2, 4 nor 5[^39] |
| 4 | Maintenance responsibility is to another Highway Authority |
| 5 | Street outside scope of EToN |

## Organisation Interest Type (6.2)

| Code | INTEREST_TYPE | Description |
| --- | --- | --- |
| 1 | Primary Notice Authority | The Street Authority or Permit Authority for the Street. |
| 8 | All notices | Used when an organisation has an interest in a Street or part Street but is not the Street Authority and wishes to receive all NRSWA notices. |
| 9 | Restrictions or licences | Used when an organisation has an interest in a Street or part Street but only wishes to receive details of restriction notices or proposed Street works licences. |

# Example

```
61,"I",444,47900011,1,0114,1,1990-01-01,1997-01-01,,0,0,,"North End of
Road",0114,1,1,0121212.00,0067670.50,0121313.75,0067680.25
```

# Notes

- 1: Each ASD Interest Record is a dependent (that is child) of a type 11 Street Record and is cross referenced using the USRN.
- 2: All cross referenced type 11 Street Records must be present in the Full Supply transfer file, or in the case when another Street Authority submits data separately from the LSG file (sometimes referred to as uncoupled ASD) the type 11 Street Records must already be present in GeoPlace.
- 3: If WHOLE_ROAD = 0 then coordinates (START_X, START_Y, END_X, END_Y) and a textual description (ADDITIONAL_STREET_LOCATION_TEXT) must be entered to provide location information.
- 4: Where STREET_STATUS = 5 – Street outside scope of EToN, then REINSTATEMENT_TYPE_CODE = 12 – Street outside scope of EToN – see Section 7.2 - Reinstatement type codes (type 62 Construction Record), must be used.

# Footnotes

[^26]: Required if the Record is to be closed.

[^27]: If WHOLE_ROAD = 0 then the ASD_COORDINATE field must not be null.

[^28]: ASD_COORDINATE = 1 if the feature is either a Polygon or Line.

[^29]: Required if ASD_COORDINATE = 1.

[^30]: Required if WHOLE_ROAD = 0 and ASD_COORDINATE = 0.

[^31]: Where there is a Local Maintenance Agreement this must not be included.

[^32]: Current as of 1st June 2016. Subject to change, refer to NSG DTF8.1 Compliance Check Specification.

[^33]: Must only be entered where STREET_STATUS = 4 (Maintenance responsibility is to another Highway Authority).

[^34]: STREET_STATUS = 1, 2, 3 or 5 required when INTEREST_TYPE = 1.

[^35]: Coordinates required if WHOLE_ROAD = 0 and ASD_COORDINATE = 0.

[^36]: Coordinates required if WHOLE_ROAD = 0 and ASD_COORDINATE = 0.

[^37]: Coordinates required if WHOLE_ROAD = 0 and ASD_COORDINATE = 0.

[^38]: Coordinates required if WHOLE_ROAD = 0 and ASD_COORDINATE = 0.

[^39]: This code should be used for a private Street. Note: Private Streets with no public access must have associated HIGHWAY_DEDICATION_CODE = 12 – Neither 2, 4, 6, 8, 9, 10 nor 11 – see Section 5.6.1 - Highway Dedication codes (type 17 Highway Dedication Record).

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
