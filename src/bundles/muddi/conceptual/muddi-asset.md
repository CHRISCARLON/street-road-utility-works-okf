---
type: MUDDI Conceptual Class
title: MUDDIAsset
description: The parent class of built environment infrastructure that can be located,
  owned, operated, oriented, and consists of physical building material such as metal,
  plastic, or concrete.
tags:
- conceptual
- muddi
- core
timestamp: '2026-07-04T00:00:00Z'
---

**Abstract.** The parent class of built environment infrastructure that can be located, owned, operated, oriented, and consists of physical building material such as metal, plastic, or concrete.

Specialises [MUDDIObject](muddi-object.md).

# Attributes

| Attribute | Multiplicity | Type | Notes |
| --- | --- | --- | --- |
| `assetOwnerID` | [1..1] | [AbstractValueType](abstract-value-type.md) | Characteristic attribute of MUDDIAsset that identifies the present legal asset owner. Identifier maintenance and dereference mechanisms are implementation dependent. |

# Specialised by

* [Network](network.md) — Type of MUDDIAsset representing the collection of network components comprising one network, which may be a subnetwork or subordinate network to another network.
* [NetworkAsset](network-asset.md) — The parent class of network assets and components.
* [Structure](structure.md) — Type of built environment infrastructure that is not directly connected to a network but serves some structural role.

# Citations

[1] [OGC MUDDI — Model for Underground Data Definition and Integration (23-024)](https://docs.ogc.org/is/23-024/23-024.html)
