---
type: NSG DTF Record
title: Street Record (type 11)
description: Defines a Street within the Local Street Gazetteer, including its identity,
  state, surface, extent and coordinates.
record_type: 11
file: xxxx_LG.csv
status: Mandatory
tags:
- nsg
- dtf-8.1
- lsg
- street
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The Street Record (type 11) is the core record of the Street File, identifying a Street by its Unique Street Reference Number (USRN). It captures the Street type, current state, surface finish, key dates, and the start/end coordinates and tolerance of the Street.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies the Record as a STREET Record. | I2 | 11 | Man |
| 2 | `CHANGE_TYPE` | Change identifier. Must always be CHANGE_TYPE = “I” for insert. | T1 | “I”, “U”, D | Man |
| 3 | `PRO_ORDER` | Unique numerical value representing the order in which the Records in the Full Supply transfer file should be processed. | I 16 |  | Man |
| 4 | `USRN` | Unique Street Reference Number. | I8 |  | Man |
| 5 | `RECORD_TYPE` | Street type | I1 | See Section 5.1.1 | Man |
| 6 | `SWA_ORG_REF_NAMING` | The SWA Data Capture Code to identify the Street Naming Authority, or if a numbered Street, the Local Highway Authority or the National/Regional Highway Authority. | I4 |  | Man |
| 7 | `STATE` | A code to identify the current state of the Street. | I1 | See Section 5.1.2 | Man |
| 8 | `STATE_DATE` | Date when the Street achieved its current state in the real-world. | Date | Present day or earlier | Man |
| 9 | `STREET_SURFACE` | A code to identify the surface finish of the Street. | I1 | See Section 5.1.3 | Man |
| 10 | `VERSION` | Version number of the Street Record. Must always be VERSION = 1. | I1 | 1 | Man |
| 11 | `RECORD_ENTRY_DATE` | Date when the Record was entered into the LSG. | Date | 1990-01-01 to Present day | Man |
| 12 | `LAST_UPDATE_DATE` | Date when any attribute of the Record was changed. | Date | Greater than or equal to the RECORD_ENTRY_DATE and less than or equal to present day | Man |
| 13 | `STREET_START_DATE` | Date when the Street started to exist or is planned to start in the real world. | Date |  | Man[^4] |
| 14 | `STREET_END_DATE` | Date when the Street ceased to exist in the real world (that is the date when the Street was Permanently Stopped Up or no longer existed in the ‘real world’ and STATE = 4). | Date | Greater than or equal to STREET_START_DATE and less than or equal to present day | Con[^5] |
| 15 | `STREET_START_X` | The X (easting) co-ordinate of the start point of the Street. | N 7.2 | 80000.00-656100.00 | Man |
| 16 | `STREET_START_Y` | The Y (northing) co-ordinate of the start point of the Street. | N 7.2 | 5000.00-657700.00 | Man |
| 17 | `STREET_END_X` | The X (easting) co-ordinate of the end point of the Street. | N 7.2 | 80000.00-656100.00 | Man |
| 18 | `STREET_END_Y` | The Y (northing) co-ordinate of the end point of the Street. | N 7.2 | 5000.00-657700.00 | Man |
| 19 | `STREET_TOLERANCE` | The tolerance of the start and end co-ordinates (in metres). | I2 | 0-99 | Man |
| 20 | `ESU_COUNT` | Number of ESUs associated with the USRN | I3 | 0-999 | Man |

# Code lists

## Street Types (5.1.1)

| Type | Definition |
| --- | --- |
| 1 | Designated Street Name |
| 2 | Officially Described Street |
| 3 | Numbered Street |
| 4 | Unofficial Street name |

## Street State Code (5.1.2)

| Code | STATE | Maximum Permitted Tolerance Value |
| --- | --- | --- |
| 1 | Under construction | 50m |
| 2 | Open | 10m or half the carriageway width which is the smaller |
| 4 | Permanently closed[^6] | 10m if closed date is later than 1st October 2013 |
| 5 | Street for addressing purposes only | 10m |

## Street Surface Code (5.1.3)

| Code | STREET_SURFACE |
| --- | --- |
| 1 | Metalled |
| 2 | Unmetalled |
| 3 | Mixed |

# Example

```
11, ”I”,1,47900007,1,650,2,2008-04-01,1,1,2008-01-10,2008-06-01,2008-04-01,,94325.00,
372449.11,164812.12,375070.89,5,5
```

# Notes

- 1: If a Street is Permanently Stopped Up and no longer exists in the ‘real world’ the STATE = 4 - Permanently closed, with an appropriate STATE_DATE must be present in the Full Supply transfer file.
- 2: STATE = 1 - Under construction, should only be used for Streets under construction. As soon as construction has started, a USRN should be assigned in the LSG.
- 3: VERSION = 1 must be used. Only the most recent version of a USRN must be present in the Full Supply transfer file.
- 4: Where a Street is closed (STATE = 4 - Permanently closed) no associated type 16 One Way Exemption and ASD Records (type 61, 62, 63, 64, 66, 67) must be present in the Full Supply transfer file.
- 5: Where a Street is closed (STATE = 4 - Permanently closed) only closed type 13 ESU Records can be associated with the Street.
- 6: Where STATE = 5 – Street for addressing purposes only, then:
  - STREET_STATUS = 5 – Street outside scope of EToN – see Section 6.1 - Street Maintenance Responsibility Codes (type 61 Interest Record) must be used; and
  - REINSTATEMENT_TYPE_CODE = 12 – Street outside scope of EToN – see Section 7.2 – Reinstatement type codes (type 62 Construction Record), must be used.

# Footnotes

[^4]: The point at which the ground is broken and construction commences. If the date is unknown, a default of 1st June 2015, must be used.

[^5]: Required if Street Record is to be closed.

[^6]: A permanently closed Street is one that no longer exists in the real world. These are Streets that have been physically removed.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
