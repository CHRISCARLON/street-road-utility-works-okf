---
type: Reference
title: Transfer File Format
description: CSV encoding, file naming, and record-ordering rules for an NSG DTF 8.1
  Full Supply transfer.
tags:
- nsg
- dtf-8.1
- csv
- transfer
- reference
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

LSG and ASD data is transferred as a **Comma Separated Value (CSV)** transfer file set using a **Unicode (UTF‑8)** character set, including the Welsh characters defined in ISO 8859‑14.

LSG and ASD data must be transferred using a Unicode character set (UTF - 8), including the Welsh characters as defined in ISO 8859 – 14, as a Comma Separated Value (CSV) transfer file set.

Each data transfer file must be a single file; the data transfer file must not be split into multiple files using volume numbers.

LSG submissions are Full Supply transfer files, containing the latest versions of Records for Streets, ESUs and ASD. Transfer of data using a change only update mechanism is not specified within this document.

The Street transfer file contains one Record type for each of the different LSG/NSG Records. These Records are described in detail in this document.

The ASD transfer file contains one Record type for each of the different types of ASD.

In each file the first Field of each Record is the Record identifier. The Record identifier determines the content and format of the remainder of the physical Record.

There must only be one Record per line in each file. Do not place a comma at the end of each row in the file.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
