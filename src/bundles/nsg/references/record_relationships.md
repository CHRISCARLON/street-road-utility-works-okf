---
type: Reference
title: Record Relationships
description: How the DTF 8.1 record types reference each other — the Street/ESU/ASD
  linkage hierarchy from the §14 Logical View.
tags:
- nsg
- dtf-8.1
- relationships
- model
- reference
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

This concept covers **how the record types link to each other**. The per-file envelope (Header, Trailer, Metadata) is a separate concern — see [Required Records](required_records.md).

# Linkage

| Parent | Child | Cardinality |
|--------|-------|-------------|
| [Street (type 11)](../records/street.md) | [Street Descriptor (type 15)](../records/street_descriptor.md) | 1 → 1..* |
| [Street (type 11)](../records/street.md) | [Street Cross Reference (type 12)](../records/street_cross_reference.md) | 1 → 1..* |
| [Street Cross Reference (type 12)](../records/street_cross_reference.md) | [Elementary Street Unit (type 13)](../records/elementary_street_unit.md) | 1..* ↔ 1..* |
| [Elementary Street Unit (type 13)](../records/elementary_street_unit.md) | [ESU Coordinate (type 14)](../records/esu_coordinate.md) | 1 → 1..* |
| [Elementary Street Unit (type 13)](../records/elementary_street_unit.md) | [One Way Exemption (type 16)](../records/one_way_exemption.md) | 1 → 0..* |
| [Elementary Street Unit (type 13)](../records/elementary_street_unit.md) | [Highway Dedication (type 17)](../records/highway_dedication.md) | 1 → 1..* |
| [Street (type 11)](../records/street.md) | [Interest (type 61)](../records/interest.md) | 1 → 1..* |
| [Street (type 11)](../records/street.md) | [Construction (type 62)](../records/construction.md) | 1 → 1..* |
| [Street (type 11)](../records/street.md) | [Special Designation (type 63)](../records/special_designation.md) | 1 → 0..* |
| [Street (type 11)](../records/street.md) | [Height, Width and Weight Designation (type 64)](../records/height_width_weight_designation.md) | 1 → 0..* |
| [Street (type 11)](../records/street.md) | [PRoW (type 66)](../records/prow.md) | 1 → 0..* |
| [Interest (type 61)](../records/interest.md) | [ASD Coordinate (type 67)](../records/asd_coordinate.md) | 1 → 0..* |
| [Construction (type 62)](../records/construction.md) | [ASD Coordinate (type 67)](../records/asd_coordinate.md) | 1 → 0..* |
| [Special Designation (type 63)](../records/special_designation.md) | [ASD Coordinate (type 67)](../records/asd_coordinate.md) | 1 → 0..* |
| [Height, Width and Weight Designation (type 64)](../records/height_width_weight_designation.md) | [ASD Coordinate (type 67)](../records/asd_coordinate.md) | 1 → 0..* |
| [PRoW (type 66)](../records/prow.md) | [ASD Coordinate (type 67)](../records/asd_coordinate.md) | 1 → 0..* |

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
