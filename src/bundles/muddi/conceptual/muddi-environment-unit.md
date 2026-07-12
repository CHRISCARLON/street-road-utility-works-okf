---
type: MUDDI Conceptual Class
title: MUDDIEnvironmentUnit
description: The parent class of environmental units which represent regions of the
  subsurface exclusive of built assets.
tags:
- conceptual
- muddi
- extended
timestamp: '2026-07-04T00:00:00Z'
---

**Abstract.** The parent class of environmental units which represent regions of the subsurface exclusive of built assets.

Specialises [MUDDIObject](muddi-object.md).

# Attributes

| Attribute | Multiplicity | Type | Notes |
| --- | --- | --- | --- |
| `boundary` | [1..1] | [AbstractValueType](abstract-value-type.md) | Characteristic attribute of MUDDIEnvironmentalUnit that represents the boundary in 2 or 3 dimensions delimiting each unit instance. |

# Specialised by

* [ChemicalUnit](chemical-unit.md) — Environmental unit pertaining to chemical properties of subsurface materials.
* [GeologicUnit](geologic-unit.md) — Environmental unit pertaining to geological characterizations of subsurface materials.
* [GeotechUnit](geotech-unit.md) — Environmental unit pertaining to geotechnical properties of subsurface materials.
* [HydroUnit](hydro-unit.md) — Environmental unit pertaining to hydrological and/or hydrogeological characteristics of subsurface materials.

# Citations

[1] [OGC MUDDI — Model for Underground Data Definition and Integration (23-024)](https://docs.ogc.org/is/23-024/23-024.html)
