---
type: NSG DTF Record
title: Trailer Record (type 99)
description: Closing record of every DTF transfer file, giving the record count and
  confirming the last volume.
record_type: 99
file: All files
status: Mandatory
tags:
- nsg
- dtf-8.1
- trailer
- metadata
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The TRAILER record is the final record in a DTF transfer file. It confirms that this is the last volume, reports the count of records in the volume and records when the file set was created.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies the Record as a TRAILER Record. | I2 | 99 | Man |
| 2 | `NEXT_VOLUME_NUMBER` | Must always be NEXT_VOLUME_NUMBER = 0 to indicate the last volume. | I2 | 0 | Man |
| 3 | `RECORD_COUNT` | Count of the number of Records in the volume (excluding the HEADER and TRAILER Records). | I 12 |  | Man |
| 4 | `ENTRY_DATE` | Most recent Record update date contained in this transfer file (excluding the HEADER and TRAILER Records). | Date |  | Man |
| 5 | `TIME_STAMP` | Time when the transfer file set was created, format HHMMSS. | Process Time | HHMMSS | Man |

# Example

```
99,0,239223,2006-07-04,162500
```

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
