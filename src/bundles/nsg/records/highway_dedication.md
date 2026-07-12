---
type: NSG DTF Record
title: Highway Dedication Record (type 17)
description: Records the type of highway dedication that applies to a section of Street
  (ESU), including legal dates, times and PRoW attributes.
record_type: 17
file: xxxx_LG.csv
status: Mandatory
tags:
- nsg
- dtf-8.1
- lsg
- highway-dedication
- esu
- prow
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The Highway Dedication Record (type 17) captures the type of highway dedication applying to a section of Street. It applies to each type 13 ESU Record and records legal start/end dates, seasonal and time restrictions, and a range of PRoW and obstruction attributes.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies the Record as a HIGHWAY DEDICATION Record. | I2 | 17 | Man |
| 2 | `CHANGE_TYPE` | Change identifier. Must always be CHANGE_TYPE = "I" for insert. | T1 | "I", "U", "D" | Man |
| 3 | `PRO_ORDER` | Unique numerical value representing the order in which the Records in the Full Supply transfer file should be processed. | I 16 |  | Man |
| 4 | `ESUID` | ESUID number. | I 14 |  | Man |
| 5 | `SEQUENCE_NUMBER` | Sequential number for each Highways Dedication that is applicable to an ESU. | I2 | 1-99 | Man[^14] |
| 6 | `HIGHWAY_DEDICATION_CODE` | The type of Highway Dedication that applies to this section of the Street. | I2 | See Section 5.7.1 | Man[^15] |
| 7 | `RECORD_ENTRY_DATE` | Date when the Record was entered or a new instance created. | Date | Present day or earlier | Man |
| 8 | `LAST_UPDATE_DATE` | Date when any attribute of the Record was changed. | Date | Greater than or equal to the RECORD_ENTRY_DATE and less than or equal to present day | Man |
| 9 | `RECORD_END_DATE` | Date when the Record ended. | Date | Present day or earlier | Con[^16] |
| 10 | `HD_START_DATE` | Date the Highway Dedication legally starts. | Date |  | Man[^17] |
| 11 | `HD_END_DATE` | Date the Highway Dedication legally ends. | Date |  | Opt |
| 12 | `HD_SEASONAL_START_DATE` | If the Highway Dedication is seasonal or periodical, date when the Highway Dedication starts. (Year should not be entered) | Date | DD-MM | Opt |
| 13 | `HD_SEASONAL_END_DATE` | If the Highway Dedication is seasonal or periodical, date when the Highway Dedication ends. (Year should not be entered) | Date | DD-MM | Con[^18] |
| 14 | `HD_START_TIME` | If the Highway Dedication has a specified time period, time when the designation starts. | Time |  | Opt |
| 15 | `HD_END_TIME` | If the Highway Dedication has a specified time period, time when the designation ends. | Time |  | Con[^19] |
| 16 | `HD_PROW` | ESU is subject to a PRoW, 0 = No, 1 = Yes. | I1 | 0,1 | Man[^20] |
| 17 | `HD_NCR` | ESU is subject to a formal cycle classification[^21] 0 = No, 1 = Yes. | I1 | 0,1 | Man[^22] |
| 18 | `HD_QUIET_ROUTE` | This ESU is a dedicated Quiet Route 0 = No, 1 = Yes | I1 | 0,1 | Opt |
| 19 | `HD_OBSTRUCTION` | ESU contains physical obstruction to vehicles 0 = No, 1 = Yes | I1 | 0,1 | Man[^23] |
| 20 | `HD_PLANNING_ORDER` | A pedestrian planning order applies to this ESU part of the Highway 0 = No, 1 = Yes | I1 | 0,1 | Opt |
| 21 | `HD_WORKS_PROHIBITED` | To be used when a TRO prohibit any works in the Highway at all times 0 = No, 1 = Yes | I1 | 0,1 | Opt |

# Code lists

## Highway Dedication Codes (5.7.1)

| Code | HIGHWAY_DEDICATION_CODE |
|---|---|
| 2 | Byway Open to All Traffic (BOAT) |
| 4 | Pedestrian way or footpath |
| 6 | Cycle Track or Cycle Way |
| 8 | All Vehicles |
| 9 | Restricted byway |
| 10 | Bridleway |
| 11 | Motorway |
| 12 | Neither[^24] 2, 4, 6, 8, 9, 10 nor 11[^25] |

# Example

```
17,"I",567,3768470166493,5,2,2004-03-15,2004-03-15,,2004-03-15,,01-07,01-
10,0730,1030,1,0,0,0,,
```

# Notes

- 1: Highway Dedication applies to each type 13 ESU Record.
- 2: Highway Dedication is Mandatory for all open ESUs where a corresponding type 11 Street Record STATE = 2 - Open.
- 3: ESUs where a corresponding type 11 Street Record STATE = 1 - Under construction, must have a Highway Dedication Record with HIGHWAY_DEDICATION_CODE = 12 – Neither 2, 4, 6, 8, 9, 10 nor 11.
- 4: ESUs where a corresponding type 11 Street Record STATE = 4 – Permanently closed, the Highway Dedication Field RECORD_END_DATE must be entered.

# Footnotes

[^14]: Only applicable where more than one Highway Dedication applies to the same ESU, for example when there are multiple times restrictions or seasonal dates.

[^15]: Where an ESU has a HIGHWAY_DEDICATION_CODE = 2, 4, 6, 9 or 10, and a type 66 PRoW Record is present, they must be the same.

[^16]: Required if the Record is to be closed. Only be entered where the Highway Dedication has been Extinguished.

[^17]: The point at which the ground is broken and construction commences. If the date is unknown, a default of 1st June 2015, must be used.

[^18]: End Date must be present when start date is present.

[^19]: End time must be present when start time is present.

[^20]: Records that are a PRoW should have a type 66 PRoW Record.

[^21]: Please refer to the National Cycle Route network.

[^22]: Records that are a National Cycle Route should have a type 66 PRoW Record.

[^23]: ESUs should not be split at points where the physical obstruction is temporary or moveable (e.g. rising bollards).

[^24]: This code must only be present on a Street defined as STREET_STATUS = 3 (Neither 1, 2, 4 nor 5) in Section 6.1 - Street Maintenance Responsibility (type 61 Interest Record)

[^25]: Streets with no public access fall under this category. Ref Section 232 (2) Highways Act. "…to be a private street, and thereupon the land is to be deemed to have been dedicated to the use of the public as a highway and to be a private street…"

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
