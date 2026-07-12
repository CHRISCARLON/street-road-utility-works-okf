---
type: NSG DTF Record
title: Header Record (type 10)
description: Opening record of every DTF transfer file, identifying the supplying
  organisation, creation date and DTF version.
record_type: 10
file: All files
status: Mandatory
tags:
- nsg
- dtf-8.1
- header
- metadata
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The HEADER record is the first record in a DTF transfer file. It identifies the organisation providing the data, records when the file set was created and states the version of the DTF specification and the type of transfer.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies the Record as a HEADER Record. | I2 | 10 | Man |
| 2 | `SWA_ORG_NAME_TEXT` | Name of the organisation providing the data. | T 40 |  | Man |
| 3 | `SWA_ORG_REF` | A code to identify the user organisation. | I4 |  | Man |
| 4 | `PROCESS_DATE` | Date when the transfer file set was created. | Date | 1990-01-01 to present date | Man |
| 5 | `VOLUME_NUMBER` | Must always be VOLUME_NUMBER = 1. | I2 | 1 | Man |
| 6 | `ENTRY_DATE` | Most recent Record update date contained in this file (excluding the HEADER and TRAILER Records). | Date |  | Man |
| 7 | `TIME_STAMP` | Time when the transfer file set was created, format HHMMSS. | Process Time | HHMMSS | Man |
| 8 | `DTF_VERSION` | Version number of the DTF specification used. | T8 | “8.1.2.10”[^3] | Man |
| 9 | `FILE_TYPE` | Type of file transfer. “F”= Full Supply, “C” = Change Only. Must always be FILE_TYPE = “F” for Full Supply. | T1 | “F”, “C” | Man |

# Example

```
10,"HALTON",0650,2008-06-26,1,2008-06-26,162500,”8.1.2.10”,”F”
```

# Footnotes

[^3]: Only the “8.1” part of the version number will be validated.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
