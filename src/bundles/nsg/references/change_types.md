---
type: Reference
title: Change Types
description: The CHANGE_TYPE field values used across NSG DTF 8.1 record types.
tags:
- nsg
- dtf-8.1
- change-type
- reference
source: https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf
timestamp: '2026-07-04T00:00:00Z'
---

The `CHANGE_TYPE` field appears on most record types to indicate the kind of change a record represents.

3.5.6 Change Type.

| Type | CHANGE_TYPE |
| --- | --- |
| I | Insert |
| U | Update |
| D | Delete |

Change types should all be “I” for insert. The other change types may be used in future iterations of the DTF.

# Citations

[1] [NSG DTF 8.1 specification](https://static.geoplace.co.uk/downloads/NSG-Data-Transfer-Format-DTF-8.1.pdf)
