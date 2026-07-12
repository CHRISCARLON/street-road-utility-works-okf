---
type: Reference
title: Data Types
description: The field data types used across all NSG DTF 8.1 records, and the conventions
  for empty fields.
tags:
- nsg
- dtf-8.1
- data-types
- reference
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

All fields in every [record](../records/index.md) are defined using one of the following data types. In each record's `# Schema` table the **Type / Max Length** column combines the data type letter with the maximum field length, e.g. `I8` is an integer of up to 8 digits and `T40` is text of up to 40 characters.

All Fields in each of the Records are defined using one of the following data types:

| Data Type | Format | Comments |
| --- | --- | --- |
| Date | BS ISO 8601 | All dates shall be recorded consistently in the extended format CCYY-MM-DD |
| Process Time | HHMMSS | The 24 hour clock format is used where HH=hour, MM=minute and SS=seconds |
| Time | HHMM | The 24 hour clock format is used where HH=hour, MM=minute |
| Integer (I) | Contains any whole positive number value. | Fields do not need leading zeros. Leading zeros will be ignored if present. Fields must not have thousands separators. |
| Number (N) | May contain any positive numeric value | Fields do not need leading zeros. Leading zeros will be ignored if present. Fields must not have thousands separators. |
| Text (T) | All text Fields must be enclosed in double quotes (“xxx”) | The double quotes must be ignored as part of the text. |

All Fields specified as Mandatory (Man) must contain data. The inclusion of data in other Fields is either Optional (Opt) or Conditional (Con).

If a number Field has no value in a Record, two commas must be entered next to each other. The expected data will be - ,,.

If a text Field has no value in a Record, two double quotes must be entered next to each other. The expected data will be - ,””,.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
