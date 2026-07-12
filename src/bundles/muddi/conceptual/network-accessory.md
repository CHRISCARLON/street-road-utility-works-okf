---
type: MUDDI Conceptual Class
title: NetworkAccessory
description: The parent class of network accessories that play a supporting role for
  NetworkConveyances.
tags:
- conceptual
- muddi
- core
timestamp: '2026-07-04T00:00:00Z'
---

The parent class of network accessories that play a supporting role for NetworkConveyances.

Specialises [NetworkAsset](network-asset.md).

This class defines no attributes of its own; it carries only those it inherits.

# Associations

| Association | Target |
| --- | --- |
| `linkedTo` | [NetworkConveyance](network-conveyance.md) |

# Specialised by

* [Access](access.md) — Type of NetworkAccessory that provides access to NetworkConveyances.
* [Container](container.md) — Type of NetworkAccessory that contains one or more NetworkConveyances.
* [Protection](protection.md) — Type of NetworkAccessory that provides protection such as cathodic protection to NetworkConveyances.
* [Sensor](sensor.md) — Type of NetworkAccessory comprising sensors or other ObservableProperty estimators.
* [Support](support.md) — Type of NetworkAccessory that provides physical support to NetworkConveyances.

# Realised in the profile

Realised in the UK Excavation Profile as flattened per-domain feature tables:

* **Access Object** — e.g. [Drainage Access Object](/uk-excavation-profile/feature-types/drainage/drainageaccessobject.md) (× 9 utility domains)
* **Physical Protection Object** — e.g. [Drainage Physical Protection Object](/uk-excavation-profile/feature-types/drainage/drainagephysicalprotectionobject.md) (× 8 utility domains)
* **Support Object** — e.g. [Drainage Support Object](/uk-excavation-profile/feature-types/drainage/drainagesupportobject.md) (× 9 utility domains)

# Citations

[1] [OGC MUDDI — Model for Underground Data Definition and Integration (23-024)](https://docs.ogc.org/is/23-024/23-024.html)
