---
type: NSG DTF Record
title: Street Cross Reference Record (type 12)
description: Cross references a Street (USRN) to its associated Elementary Street
  Unit (ESU) Records.
record_type: 12
file: xxxx_LG.csv
status: Mandatory
tags:
- nsg
- dtf-8.1
- lsg
- street
- cross-reference
- esu
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The Street Cross Reference (XRef) Record (type 12) links a Street Record (type 11) to the Elementary Street Unit (ESU) Records (type 13) that make it up. Each type 11 Street Record may have one or more dependent type 12 records, referenced by USRN.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies the Record as a STREET XREF Record. | I2 | 12 | Man |
| 2 | `CHANGE_TYPE` | Change identifier. Must always be CHANGE_TYPE = “I” for insert. | T1 | “I”, “U”, “D” | Man |
| 3 | `PRO_ORDER` | Unique numerical value representing the order in which the Records in the Full Supply transfer file should be processed. | I 16 |  | Man |
| 4 | `USRN` | Unique Street Reference Number. | I8 |  | Man |
| 5 | `USRN_VERSION_NUMBER` | Version number of the parent Street Record. Must always be USRN_VERSION_NUMBER = 1 | I1 | 1 | Man |
| 6 | `ESUID` | ESUID of the cross referenced ESU | I 14 |  | Man |
| 7 | `ESU_VERSION_NUMBER` | A sequential number Version number of the Street XREF Record. Must always be ESU_VERSION_NUMBER = 1 | I1 | 1 | Man |

# Example

```
12,“I”,2,47900007,1,3334560344444,1
```

# Notes

- 1: Each type 11 Street Record may have one or more dependent (that is child) type 12 Street XREF Records which are referenced using the USRN.
- 2: Each Street XREF Record cross references a USRN to a type 13 Elementary Street Unit Record.
- 3: Each cross referenced Record must be present in the same Full Supply transfer file.
- 4: Every type 13 ESU Record must be cross referenced to either a type 11 Street Record, RECORD_TYPE = 1 or 2 Street.
- 5: Every type 13 ESU Record cross referenced to either a type 11 Street Record, RECORD_TYPE = 3 or 4, must also be cross referenced to either a type 11 Street Record, RECORD_TYPE = 1 or 2 Street.
- 6: A type 13 ESU Record must not be cross referenced to more than one type 11 Street Record, RECORD_TYPE = 1 or 2 Street unless one of the Streets has a Street STATE = 5 – Street for addressing purposes only.
- 7: Every type 11 Street Record, RECORD_TYPE = 3 Street must be cross referenced to at least one type 13 ESU Record.
- 8: Every type 11 Street Record, RECORD_TYPE = 4 Street must be cross referenced to at least one type 13 ESU Record.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
