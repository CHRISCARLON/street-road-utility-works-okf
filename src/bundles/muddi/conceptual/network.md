---
type: MUDDI Conceptual Class
title: Network
description: Type of MUDDIAsset representing the collection of network components
  comprising one network, which may be a subnetwork or subordinate network to another
  network.
tags:
- conceptual
- muddi
- core
timestamp: '2026-07-04T00:00:00Z'
---

Type of MUDDIAsset representing the collection of network components comprising one network, which may be a subnetwork or subordinate network to another network.

Specialises [MUDDIAsset](muddi-asset.md).

# Attributes

| Attribute | Multiplicity | Type | Notes |
| --- | --- | --- | --- |
| `commodityType` | [1..1] | [AbstractValueType](abstract-value-type.md) | Characteristic attribute of Network that indicates the commodity being distributed by that Network instance. |

# Associations

| Association | Target |
| --- | --- |
| `SubNetwork` | [Network](network.md) |
| `SubordinateNetwork` | [Network](network.md) |

# Realised in the profile

Realised in the UK Excavation Profile as flattened per-domain feature tables:

* **Network** — e.g. [Drainage Network](/uk-excavation-profile/feature-types/drainage/drainagenetwork.md) (× 9 utility domains)

# Citations

[1] [OGC MUDDI — Model for Underground Data Definition and Integration (23-024)](https://docs.ogc.org/is/23-024/23-024.html)
