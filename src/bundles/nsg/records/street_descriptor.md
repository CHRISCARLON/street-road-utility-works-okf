---
type: NSG DTF Record
title: Street Descriptor Record (type 15)
description: Provides the name, description and administrative context for a Street,
  cross referenced to a type 11 Street Record by USRN.
record_type: 15
file: xxxx_LG.csv
status: Mandatory
tags:
- nsg
- dtf-8.1
- lsg
- street
- descriptor
- record
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The Street Descriptor Record (type 15) holds the name, description or number of a Street together with its locality, town and administrative area. Each record is a dependent of a type 11 Street Record and is cross referenced using the USRN. A language code identifies whether the descriptor is the English or Welsh version.

# Schema

| # | Field | Description | Type / Max Length | Value range | Status |
|---|-------|-------------|-------------------|-------------|--------|
| 1 | `RECORD_IDENTIFIER` | Identifies the Record as a STREET DESCRIPTOR Record. | I2 | 15 | Man |
| 2 | `CHANGE_TYPE` | Change identifier. Must always be CHANGE_TYPE = "I" for insert. | T1 | "I", "U", "D" | Man |
| 3 | `PRO_ORDER` | Unique numerical value representing the order in which the Records in the Full Supply transfer file should be processed. | I 16 |  | Man |
| 4 | `USRN` | Unique Street Reference Number. | I8 |  | Man |
| 5 | `STREET_DESCRIPTOR` | Name, description or Street number. | T 100 | See Note 8. See Section 5.5.2 | Man |
| 6 | `LOCALITY_NAME` | Locality name. | T 35 |  | Con[^8] |
| 7 | `TOWN_NAME` | Administrative Town Village or defined Settlement name. | T 30 |  | Con[^9] |
| 8 | `ADMINISTRATIVE_AREA` | Local Highway Authority name. | T 30 |  | Man |
| 9 | `LANGUAGE` | A code to identify the language in use for the descriptive identifier. | T3 | See Section 5.5.1 | Man |

# Code lists

## Reserved prefixes for type 11 Street Record RECORD_TYPE = 3 Streets (5.5.2)

| Prefix | Highway class |
|---|---|
| A | A Road |
| B | B Road |
| C | C Road |
| LCR | Local Cycle Route |
| M | Motorway |
| NCR | National Cycle Route |
| Y | Public Right of Way |

# Example

```
15,"I",7,47900011,"GREAT CHARLES CLOSE","","ST STEPHEN","CORNWALL","ENG"
```

# Notes

- 1: Each Street Descriptor Record is a dependent of a type 11 Street Record and is cross referenced using the USRN.
- 2: All cross referenced type 11 Street Records must be present in the Full Supply transfer file.
- 3: TOWN_NAME is Mandatory for type 1 Streets and type 2 Streets. It is Optional for type 3 and 4 Streets.
- 4: ADMINISTRATIVE_AREA names are provided in Appendix B of the DEC-NSG v3.6 (under review) documentation. For Districts this name must be the name of the County Local Highway Authority and must exclude the phrase 'County Council' (see Appendix B of the DEC-NSG v3.6 (under review)). For all types of Unitary the name must be the name of the Local Highway Authority and exclude the words council, borough or metropolitan etc. (See Appendix B of the DEC-NSG v3.6 (under review)).
- 5: Welsh authorities must submit two Street Descriptor Records for each Street Record; one for the Welsh language (LANGUAGE = "CYM") and one for the English language (LANGUAGE = "ENG"). If the Street has not officially been translated into Welsh then the same description should be entered for both Welsh and English Records.
- 6: English authorities must only submit one Street Descriptor Record for each Street Record; this must be for the English language only (LANGUAGE = "ENG").
- 7: If a type 15 Street Descriptor Record relating to a Street changes or if additions are made then the LAST_UPDATE_DATE in the corresponding type 11 Street Record must reflect the date of the change.
- 8: Section 5.5.2 details the reserved prefixes for different classes type 11 Street Record RECORD_TYPE = 3 Streets.

# Footnotes

[^8]: Required where Street and town combination are not unique in LSG.

[^9]: Mandatory for type 1 and 2 Streets. Optional for type 3 and 4 Streets. Town name must be present when locality is present.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
