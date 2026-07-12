---
type: NSG DTF Record
title: PRoW Record (type 66)
description: Public Rights of Way record describing the dedication, access rights,
  status and definitive statement details of a PRoW linked to a numbered Street.
record_type: 66
file: xxxx_AD.csv
status: Optional
tags:
- nsg
- dtf-8.1
- asd
- prow
- rights-of-way
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The PRoW Record (type 66) holds Public Rights of Way information for a numbered Street. It records the PRoW dedication and access rights, its lifecycle dates and status, any consultation or appeal details, and the descriptive location and details taken from the PRoW Definitive Statement.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies the Record as a PRoW Record. | I2 | 66 | Man |
| 2 | `CHANGE_TYPE` | Change identifier. Must always be CHANGE_TYPE = “I” for insert. | T1 | “I”, “U”, “D” | Man |
| 3 | `PRO_ORDER` | Unique numerical value representing the order in which the Records in the Full Supply transfer file should be processed. | I 16 |  | Man |
| 4 | `PROW_USRN` | Identifies RECORD_TYPE = 3 Street USRN to which the PRoW applies. | I8 |  | Man |
| 5 | `DEF_MAP_GEOMETRY_TYPE` | Does the PRoW follow the exact route described in the type 13 ESU Record No = 0, Yes = 1. Where if No a separate type 67 ASD Coordinate Record is required. | I1 | 0,1 | Con[^73] |
| 6 | `DEF_MAP_GEOMETRY_COUNT` | Present in the Full Supply transfer file only where DEF_MAP_GEOMETRY_TYPE = 0. This is the count of coordinates expected in the type 67 ASD Coordinate Record. | I3 | 1-999 | Con[^74] |
| 7 | `PROW_LENGTH` | Length in metres. | I5 | 0 – 99999 | Man |
| 8 | `PROW_RIGHTS` | PRoW Dedication. | I2 | See Section 10.1 | Man |
| 9 | `PED_ACCESS` | Rights for Pedestrian Access. | I1 | 0,1 | Man |
| 10 | `EQU_ACCESS` | Rights for Equestrian Access. | I1 | 0,1 | Man |
| 11 | `NONMOT_ACCESS` | Rights for Non Motorised Vehicle Access. | I1 | 0,1 | Man |
| 12 | `CYC_ACCESS` | Rights for Bicycle Access. | I1 | 0,1 | Man |
| 13 | `MOT_ACCESS` | Rights for Motorised Vehicle Access. | I1 | 0,1 | Man |
| 14 | `RECORD_ENTRY_DATE` | Date when the Record was entered or a new instance created. | Date | Present day or earlier | Man |
| 15 | `RECORD_START_DATE` | Date when the Record came into effect. | Date | Present day or earlier | Man |
| 16 | `LAST_UPDATE_DATE` | Date when any attribute of the Record was changed. | Date | Greater than or equal to the RECORD_ENTRY_DATE and less than or equal to present day | Man |
| 17 | `RELEVANT_START_DATE` | Date when the Record became Relevant (active) as defined by the legal order. | Date |  | Con[^75] |
| 18 | `RECORD_END_DATE` | Date when the Record was Extinguished. | Date | Present day or earlier | Con[^76] |
| 19 | `PROW_STATUS` | The status of the PRoW. | T1 | See Section 10.2 | Man |
| 20 | `CONSULT_START_DATE` | Date when the consultation starts. | Date |  | Con[^77] |
| 21 | `CONSULT_CLOSE_DATE` | Date when the consultation closes. | Date |  | Con[^78] |
| 22 | `CONSULT_REF` | Any formal reference for the consultation. | T 16 |  | Con[^79] |
| 23 | `CONSULT_DETAILS` | Brief summary of the consultation. | T 30 |  | Con[^80] |
| 24 | `APPEAL DATE` | Date the appeal was raised. | Date |  | Con[^81] |
| 25 | `APPEAL_REF` | Any formal reference for the appeal. | T 16 |  | Con[^82] |
| 26 | `APPEAL_DETAILS` | Brief summary of the consultation. | T 30 |  | Con[^83] |
| 27 | `DIV_RELATED_USRN` | RECORD_TYPE = 3 Street USRN for the PRoW that is being diverted. | I8 |  | Con[^84] |
| 28 | `PROW_LOCATION` | Descriptive location of the PRoW as defined in the PRoW Definitive Statement. | T 500 |  | Man |
| 29 | `PROW_DETAILS` | Official Reference of the PROW designation, followed by descriptive details of the PRoW as defined in the PRoW Definitive Statement. | T 500 |  | Man |
| 30 | `PROMOTED_ROUTE` | Route defined by the Surveying Authority as a recommended/promoted route. | I1 | 1,0 | Opt |
| 31 | `ACCESSIBLE_ROUTE` | Route defined by the Surveying Authority as an accessible route for elderly and disabled. | I1 | 1,0 | Opt |
| 32 | `SOURCE_TEXT` | A brief textual summary of the department/function and/or organisation that is the source of this data. | T 120 |  | Opt |
| 33 | `PROW_ORG_REF_CONSULTANT` | Code to identify the Surveying Authority which must be consulted about the PRoW. | I4 | SWA_Code | Opt |
| 34 | `PROW_DISTRICT_REF_CONSULTANT` | Code to identify the Operational District for the Surveying Authority which must be consulted about the PRoW. | I3 |  | Opt |

# Code lists

## - PRoW dedication (10.1)

| Code | PROW_RIGHTS |
| --- | --- |
| 1 | Footpath |
| 2 | Bridleway |
| 3 | Restricted Byway |
| 4 | Byway Open to All Traffic (BOAT) |
| 5 | Cycle Track or Cycle Way |
| 6 | Permissive Path |

## - PRoW Status (10.2)

| Code | PROW_STATUS |
| --- | --- |
| “O” | Open and approved |
| “C” | Under consultation |
| “A” | Under appeal |
| “E” | Extinguished |
| “D” | Temporary Diversion |
| “P” | Permissive |

# Example

```
66,”I”,1234,88855546,1,44,102,4,1,1,1,1,1,2008-01-10,2008-01-10,2008-01-10,2015-01-
10,,”O”,,,””,””,,””,””,,”Left of number 14 high road to back of the pub”,“2m to the
left of the main carriageway to the buildings”,1,1,"",,
```

# Notes

- 1: Record must only be present if a type 11 Street Records, RECORD_TYPE = 3 – Numbered Street Record is also present.

# Footnotes

[^73]: If DEF_MAP_GEOMETRY_TYPE = 0 then a type 67 ASD Coordinate Record is required.

[^74]: Required if PROW_COORDINATE = 1

[^75]: Required if the order becomes legal on a future date.

[^76]: Required if the Record is to be closed.

[^77]: Required if PROW_STATUS = “C”.

[^78]: Required if PROW_STATUS = “C”.

[^79]: Required if PROW_STATUS = ”C”.

[^80]: Required if PROW_STATUS = “C”.

[^81]: Required if PROW_STATUS = “A”.

[^82]: Required if PROW_STATUS = “A”.

[^83]: Required if PROW_STATUS = “A”.

[^84]: Required if PROW_STATUS = “D”.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
