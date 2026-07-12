---
type: MUDDI Conceptual Class
title: MUDDISpace
description: The parent class of defined regions of space, typically represented by
  2D polygon geometries, comprising the ground surface and/or underlying subsurface.
tags:
- conceptual
- muddi
- core
timestamp: '2026-07-04T00:00:00Z'
---

**Abstract.** The parent class of defined regions of space, typically represented by 2D polygon geometries, comprising the ground surface and/or underlying subsurface.

Specialises [MUDDIObject](muddi-object.md).

# Attributes

| Attribute | Multiplicity | Type | Notes |
| --- | --- | --- | --- |
| `extent` | [1..1] | [AbstractValueType](abstract-value-type.md) | Characteristic attribute of MUDDISpace representing the typically 2D extent of each instance. |

# Specialised by

* [PlanningArea](planning-area.md) — Represents the location and extent of region subject to specific policies, restrictions, and/or planning considerations.
* [ServiceArea](service-area.md) — Represents the typically 2D extent that is serviced by a particular network / subnetwork / subordinate network.
* [Site](site.md) — Represents the location and extent of a facility that is part of a network.

# Realised in the profile

Realised in the UK Excavation Profile as flattened per-domain feature tables:

* **Network Link Zone of Interest** — e.g. [Drainage Network Link Zone of Interest](/uk-excavation-profile/feature-types/drainage/drainagenetworklinkzoneofinterest.md) (× 9 utility domains)
* **Network Node Zone of Interest** — e.g. [Drainage Network Node Zone of Interest](/uk-excavation-profile/feature-types/drainage/drainagenetworknodezoneofinterest.md) (× 9 utility domains)
* **Site Zone of Interest** — e.g. [Drainage Site Zone of Interest](/uk-excavation-profile/feature-types/drainage/drainagesitezoneofinterest.md) (× 9 utility domains)

# Citations

[1] [OGC MUDDI — Model for Underground Data Definition and Integration (23-024)](https://docs.ogc.org/is/23-024/23-024.html)
