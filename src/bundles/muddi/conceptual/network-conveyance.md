---
type: MUDDI Conceptual Class
title: NetworkConveyance
description: Type of MUDDIAsset that participates directly in conveying a commodity.
tags:
- conceptual
- muddi
- core
timestamp: '2026-07-04T00:00:00Z'
---

Type of MUDDIAsset that participates directly in conveying a commodity.

Specialises [NetworkAsset](network-asset.md).

This class defines no attributes of its own; it carries only those it inherits.

# Associations

| Association | Target |
| --- | --- |
| `partOf` | [Network](network.md) |

# Specialised by

* [NetworkLink](network-link.md) — Type of NetworkConveyance that forms a conveyance channel between two NetworkNodes.
* [NetworkNode](network-node.md) — Type of NetworkConveyance that serves as a junction and connects two or more NetworkNodes to each other.

# Realised in the profile

Realised in the UK Excavation Profile as flattened per-domain feature tables:

* **Container Object** — e.g. [Drainage Container Object](/uk-excavation-profile/feature-types/drainage/drainagecontainerobject.md) (× 9 utility domains)

# Citations

[1] [OGC MUDDI — Model for Underground Data Definition and Integration (23-024)](https://docs.ogc.org/is/23-024/23-024.html)
