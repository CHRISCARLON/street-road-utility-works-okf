---
type: NSG DTF Record
title: One Way Exemption Record (type 16)
description: Records traffic types exempt from one way restrictions on an Elementary
  Street Unit, with applicable dates, times and periodicity.
record_type: 16
file: xxxx_LG.csv
status: Optional
tags:
- nsg
- dtf-8.1
- lsg
- one-way-exemption
- esu
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The One Way Exemption Record (type 16) identifies the types of traffic that are exempt from one way restrictions on an Elementary Street Unit. Each record is a dependent (child) of a type 13 Elementary Street Unit Record and is cross referenced by the ESUID. Records are only submitted where the ESU has ESU_DIRECTION = 2 or 3.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies the Record as a ONE WAY EXEMPTION Record. | I2 | 16 | Man |
| 2 | `CHANGE_TYPE` | Change identifier. Must always be CHANGE_TYPE = "I" for insert. | T1 | "I", "U", "D" | Man |
| 3 | `PRO_ORDER` | Unique numerical value representing the order in which the Records in the Full Supply transfer file should be processed. | I 16 |  | Man |
| 4 | `ESUID` | ESUID number. | I 14 |  | Man |
| 5 | `SEQUENCE_NUMBER` | Sequential number for each one way Record applicable to an ESU. | I3 |  | Man |
| 6 | `ONE_WAY_EXEMPTION_TYPE` | Type of traffic which is exempt from one way restrictions. | I1 | See Section 5.6.1 | Man |
| 7 | `RECORD_ENTRY_DATE` | Date when the Record was entered or a new instance created. | Date | Present day or earlier | Man |
| 8 | `LAST_UPDATE_DATE` | Date when any attribute of the Record was changed. | Date | Greater than or equal to the RECORD_ENTRY_DATE and less than or equal to present day | Man |
| 9 | `RECORD_END_DATE` | Date when the Record ceased to exist. | Date | Present day or earlier | Con[^10] |
| 10 | `ONE_WAY_EXEMPTION_START_DATE` | Date when the Exemption starts. | Date |  | Opt |
| 11 | `ONE_WAY_EXEMPTION_END_DATE` | Date when the Exemption ends. | Date |  | Con[^11] |
| 12 | `ONE_WAY_EXEMPTION_START_TIME` | If the Special Designation has a specified time period, time when the Special Designation starts. | Time |  | Opt |
| 13 | `ONE_WAY_EXEMPTION_END_TIME` | If the Special Designation has a specified time period, time when the Special Designation ends. | Time |  | Con[^12] |
| 14 | `ONE_WAY_EXEMPTION_PERIODICITY_CODE` | Code to identify the periodicity of the restriction. | I2 | See Section 5.6.2 | Man |

# Code lists

## One Way Exemption types (5.6.1)

| Code | ONE_WAY_EXEMPTION_CODE |
|---|---|
| 1 | Buses |
| 2 | Cycles |
| 3 | Taxis |
| 4 | Emergency vehicles |
| 5 | HGVs and Vans |

## One Way Exemption Periodicity (5.6.2)

| Code | ONE_WAY_EXCEPTION_PERIODICITY_CODE |
|---|---|
| 1 | Everyday |
| 2 | Working days only |
| 3 | Weekends |
| 4 | Code not used |
| 5 | Code not used |
| 6 | Code not used |
| 7 | Monday only |
| 8 | Tuesday only |
| 9 | Wednesday only |
| 10 | Thursday only |
| 11 | Friday only |
| 12 | Saturday only |
| 13 | Sunday only |
| 14 | Public and Bank Holidays |
| 15 | Continuous[^13] |

# Example

```
16,"I",456,3768470166493,1,2,2004-03-15,2004-03-15,2008-10-02,,,0730,1030,1
```

# Notes

- 1: Each One Way Exemption Record is a dependent (that is child) of a type 13 Elementary Street Unit Record and is cross referenced by the ESUID.
- 2: All cross referenced type 13 Elementary Street Unit Records must be present in the Full Supply transfer file and have either ESU_DIRECTION = 2 or 3.
- 3: One Way Exception Records must be submitted for a Street only if the ESU_DIRECTION = 2 or 3.
- 4: Where ONE_WAY_EXEMPTION_START_DATE is completed, ONE_WAY_EXEMPTION_END_DATE must also be completed.
- 5: Where ONE_WAY_EXEMPTION_START_TIME is completed, ONE_WAY_EXEMPTION_END_TIME must also be completed.

# Footnotes

[^10]: Required if the Record is to be closed.

[^11]: End Date must only be present where the exception is no longer active.

[^12]: End time must only be present if start time present.

[^13]: ONE_WAY_EXEMPTION_START_DATE, ONE_WAY_EXEMPTION_END_DATE, ONE_WAY_EXEMPTION_START_TIME and ONE_WAY_EXEMPTION_END_TIME must also be present.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
