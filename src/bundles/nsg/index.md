---
okf_version: "0.1"
---

# National Street Gazetteer — Data Transfer Format 8.1

This bundle captures the **NSG Data Transfer Format 8.1 (DTF8.1)**, version
2.10 (June 2016), published by GeoPlace LLP. DTF8.1 defines the CSV file
format that Local Highway Authorities use to submit Local Street Gazetteer
(LSG) and Associated Street Data (ASD) to the National Street Gazetteer.

Data is exchanged as two Comma Separated Value (UTF‑8) transfer files per
authority:

* `xxxx_LG.csv` — the Local Street Gazetteer (Street records).
* `xxxx_AD.csv` — the Associated Street Data (interests, works, designations).

`xxxx` is the Street Works Authority (SWA) code of the submitting authority.
Every file begins with a [Header](records/header.md) record and ends with a
[Trailer](records/trailer.md) record.

# Subdirectories

* [records](records/index.md) - The 17 record types that make up an LSG/ASD transfer file set, one concept per record type.
* [references](references/index.md) - Shared format rules: data types, required-record matrix, transfer file format, and change types.

# Citations

[1] [NSG Data Transfer Format 8.1 (DTF8.1), v2.10, June 2016](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
[2] [GeoPlace](https://www.geoplace.co.uk/)
