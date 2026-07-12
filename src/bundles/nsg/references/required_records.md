---
type: Reference
title: Required Records
description: The Mandatory/Optional status of each NSG DTF 8.1 record type, which
  transfer file it belongs to, and the per-file record envelope.
tags:
- nsg
- dtf-8.1
- required-records
- reference
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The [Header](../records/header.md) and [Trailer](../records/trailer.md) records are mandatory for all transfer file sets. The table below shows which record types must be submitted to the NSG with all **Full Supply** transfer files. If an Optional record is entered, the Mandatory fields in that record must still be included.

# Record matrix

| Type | Record | Status | Transfer file |
|------|--------|--------|---------------|
| 10 | [Header (type 10)](../records/header.md) | Mandatory | `All files` |
| 11 | [Street (type 11)](../records/street.md) | Mandatory | `xxxx_LG.csv` |
| 12 | [Street Cross Reference (type 12)](../records/street_cross_reference.md) | Mandatory | `xxxx_LG.csv` |
| 13 | [Elementary Street Unit (type 13)](../records/elementary_street_unit.md) | Mandatory | `xxxx_LG.csv` |
| 14 | [ESU Coordinate (type 14)](../records/esu_coordinate.md) | Mandatory | `xxxx_LG.csv` |
| 15 | [Street Descriptor (type 15)](../records/street_descriptor.md) | Mandatory | `xxxx_LG.csv` |
| 16 | [One Way Exemption (type 16)](../records/one_way_exemption.md) | Optional | `xxxx_LG.csv` |
| 17 | [Highway Dedication (type 17)](../records/highway_dedication.md) | Mandatory | `xxxx_LG.csv` |
| 29 | [LSG Metadata (type 29)](../records/lsg_metadata.md) | Mandatory | `xxxx_LG.csv` |
| 61 | [Interest (type 61)](../records/interest.md) | Mandatory | `xxxx_AD.csv` |
| 62 | [Construction (type 62)](../records/construction.md) | Mandatory | `xxxx_AD.csv` |
| 63 | [Special Designation (type 63)](../records/special_designation.md) | Optional | `xxxx_AD.csv` |
| 64 | [Height, Width and Weight Designation (type 64)](../records/height_width_weight_designation.md) | Optional | `xxxx_AD.csv` |
| 66 | [PRoW (type 66)](../records/prow.md) | Optional | `xxxx_AD.csv` |
| 67 | [ASD Coordinate (type 67)](../records/asd_coordinate.md) | Optional | `xxxx_AD.csv` |
| 69 | [ASD Metadata (type 69)](../records/asd_metadata.md) | Mandatory | `xxxx_AD.csv` |
| 99 | [Trailer (type 99)](../records/trailer.md) | Mandatory | `All files` |

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
