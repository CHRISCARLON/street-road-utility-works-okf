---
type: NSG DTF Record
title: Height, Width and Weight Designation Record (type 64)
description: Records Height, Width and Weight (HWW) restrictions that apply to a Street,
  such as bridge height or weight limits.
record_type: 64
file: xxxx_AD.csv
status: Optional
tags:
- nsg
- dtf-8.1
- asd
- hww
- restriction
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The Height, Width and Weight Designation Record (type 64) captures Additional Street Data (ASD) describing HWW restrictions applied to a Street, such as height, width or weight limits. Each Record is a dependent (child) of a Street Record and is cross referenced using the USRN.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies this Record as an HWW_DESIGNATION Record. | I2 | 64 | Man |
| 2 | `CHANGE_TYPE` | Change identifier. Must always be CHANGE_TYPE = "I" for insert. | T1 | "I", "U", "D" | Man |
| 3 | `PRO_ORDER` | Unique numerical value representing the order in which the Records in the Full Supply transfer file should be processed. | I 16 |  | Man |
| 4 | `USRN` | Unique Street Reference Number. | I8 |  | Man |
| 5 | `HWW_SEQUENCE_NUMBER` | Sequential number for each type 64 Record associated with the USRN. | I3 |  | Man |
| 6 | `HWW_RESTRICTION_CODE` | The type of restriction that the Record applies to. | I1 | See Section 9.1 | Man |
| 7 | `RECORD_ENTRY_DATE` | Date when the Record was entered or a new instance created. | Date | Present day or earlier | Man |
| 8 | `RECORD_START_DATE` | Date when the HWW Restriction came into effect. | Date | Present day or earlier | Man |
| 9 | `LAST_UPDATE_DATE` | Date when any attribute of the Record was changed. | Date | Greater than or equal to the RECORD_START_DATE and less than or equal to present day | Man |
| 10 | `RECORD_END_DATE` | Date when the Record ceased to exist. | Date | Present day or earlier | Con[^64] |
| 11 | `WHOLE_ROAD` | Indicator as to whether the HWW Restriction applies to the Whole Road. 0 indicates that is does not apply to the WHOLE_ROAD, 1 indicates that it does. | I1 | 1,0 | Man |
| 12 | `ASD_COORDINATE` | Where WHOLE_ROAD = 0 do ASD Coordinate Records (type 67 Records) exist No = 0, Yes = 1. Where WHOLE_ROAD = 1 this Record must not be present. | I1 | 0,1 | Con[^65] [^66] |
| 13 | `ASD_COORDINATE_COUNT` | Where ASD_COORDINATEs are present in the Full Supply transfer file. This is the count of coordinates expected in the type 67 ASD Coordinate Record. | I3 | 1-999 | Con[^67] |
| 14 | `HWW_START_X` | The X (eastings) coordinate of the start point of the HWW Restriction. Coordinates are defined in metres. (For Streets that are not Whole Road where ASD_COORDINATE = 0) | N 7.2 | 80000.00-656100.00 | Con |
| 15 | `HWW_START_Y` | The Y (northings) coordinate of the start point of the HWW Restriction. Coordinates are defined in metres. (For Streets that are not Whole Road where ASD_COORDINATE = 0) | N 7.2 | 5000.00-657700.00 | Con |
| 16 | `HWW_END_X` | The X (eastings) coordinate of the end point of the HWW Restriction. Co-ordinates are defined in metres. (For Streets that are not Whole Road where ASD_COORDINATE = 0) | N 7.2 | 80000.00-656100.00 | Con |
| 17 | `HWW_END_Y` | The Y (northings) coordinate of the end point of the HWW Restriction. Co-ordinates are defined in metres. (For Streets that are not Whole Road where ASD_COORDINATE = 0) | N 7.2 | 5000.00-657700.00 | Con[^68] |
| 18 | `HWW_LOCATION_TEXT` | Description of the location of the HWW Restriction within the Street. | T 250 |  | Con[^69] |
| 19 | `VALUE_METRIC` | Value in metric for the HWW Restriction. Metres or tonnes. | N 2.1 |  | Man |
| 20 | `TRO_TEXT` | Official TRO reference followed by a summary of wording of the restriction if it is the result of a TRO. This should include the imperial value of the restriction if specified in the TRO. | T 250 |  | Con[^70] |
| 21 | `FEATURE_DESCRIPTION` | Description providing additional information. | T 250 |  | Opt |
| 22 | `SOURCE_TEXT` | A brief textual summary of the department/function and/or organisation that is the source of this data. | T 120 |  | Opt |
| 23 | `SWA_ORG_REF_CONSULTANT` | Code to identify the Street Authority which must be consulted about the HWW Restriction. | I4 | SWA_Code | Con[^71] |
| 24 | `DISTRICT_REF_CONSULTANT` | Code to identify the Operational District for the Street Authority which must be consulted about the HWW Restriction. | I3 |  | Con[^72] |

# Code lists

## Height, Width and Weight Restriction Codes (9.1)

| Code | HWW_RESTRICTION_CODE |
| --- | --- |
| 1 | Height Restriction |
| 2 | Width Restriction |
| 3 | Weight Restriction |

# Example

```
64,"I",5554,47900011,1,1,2008-01-10,2008-01-10,2008-01-10,,1,1,18,,,,,"",1.2,"Height
restriction of 9 feet 8 inches","Hump back bridge","Bridge department",0114,001
```

# Notes

- 1: Each Street Height, Width and Weight Restriction Record is a dependent (that is child) of a Street Record and is cross referenced using the USRN.
- 2: All cross referenced Street Records must be present in the same transfer file set, or in the case of ASD submitted by the Street Authority, where they are not the Local Highway Authority, Street Records must already be present in GeoPlace.
- 3: If WHOLE_ROAD = 0, then coordinates (HWW_START_X, HWW_START_Y, HWW_END_X, HWW_END_Y) and a textual description (HWW_LOCATION_TEXT) must be entered to provide location information.
- 4: RECORD_ENTRY_DATE can be any date on or before the present day. However if the date the Record was created is unknown (during the transition period) then the user should enter a default of the present date.

# Footnotes

[^64]: Required if the Record is to be closed.

[^65]: If WHOLE_ROAD = 0 then the ASD_COORDINATE field must not be null.

[^66]: ASD_COORDINATE must only be used where the feature is either a Polygon or Line. Where the Record is a Point, ASD_COORDINATE = 0 and no type 67 ASD Coordinate Record is present.

[^67]: Required if ASD_COORDINATE = 1 and WHOLE_ROAD = 0.

[^68]: Coordinates required if WHOLE_ROAD = 0* and ASD_COORDINATE = 0. *Mandatory if ASD_COORDINATE = 1.

[^69]: Required if WHOLE_ROAD = 0.

[^70]: TRO_TEXT must be present if the restriction is the subject of a Traffic Regulation Order. Cannot be present for advisory restrictions.

[^71]: Required if DISTRICT_REF_CONSULTANT present.

[^72]: Required if SWA_ORG_REF_CONSULTANT present.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
