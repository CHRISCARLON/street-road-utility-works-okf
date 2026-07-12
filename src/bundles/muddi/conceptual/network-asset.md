---
type: MUDDI Conceptual Class
title: NetworkAsset
description: The parent class of network assets and components.
tags:
- conceptual
- muddi
- core
timestamp: '2026-07-04T00:00:00Z'
---

The parent class of network assets and components.

Specialises [MUDDIAsset](muddi-asset.md).

# Attributes

| Attribute | Multiplicity | Type | Notes |
| --- | --- | --- | --- |
| `utilityType` | [1..1] | [AbstractValueType](abstract-value-type.md) | Characteristic attribute of NetworkAsset that indicates the type of utility it forms a part of or commodity that it distributes. |

# Specialised by

* [NetworkAccessory](network-accessory.md) — The parent class of network accessories that play a supporting role for NetworkConveyances.
* [NetworkConveyance](network-conveyance.md) — Type of MUDDIAsset that participates directly in conveying a commodity.

# Realised in the profile

Realised in the UK Excavation Profile as flattened per-domain feature tables:

* **Network Annotation** — e.g. [Drainage Network Annotation](/uk-excavation-profile/feature-types/drainage/drainagenetworkannotation.md) (× 9 utility domains)
* **Network Description Object** — e.g. [Drainage Network Description Object](/uk-excavation-profile/feature-types/drainage/drainagenetworkdescriptionobject.md) (× 9 utility domains)
* **Network Dimension** — e.g. [Drainage Network Dimension](/uk-excavation-profile/feature-types/drainage/drainagenetworkdimension.md) (× 9 utility domains)

# Citations

[1] [OGC MUDDI — Model for Underground Data Definition and Integration (23-024)](https://docs.ogc.org/is/23-024/23-024.html)
