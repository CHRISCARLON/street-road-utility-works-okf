---
type: MUDDI Conceptual Class
title: MUDDIObject
description: The root class in MUDDI of underground infrastructure, space, event,
  environmental unit, or other underground +/- surface features that are identified,
  located, typed, and about which data is maintained.
tags:
- conceptual
- muddi
- core
timestamp: '2026-07-04T00:00:00Z'
---

**Abstract.** The root class in MUDDI of underground infrastructure, space, event, environmental unit, or other underground +/- surface features that are identified, located, typed, and about which data is maintained.

# Attributes

| Attribute | Multiplicity | Type | Notes |
| --- | --- | --- | --- |
| `objectID` | [1..1] | [AbstractValueType](abstract-value-type.md) | Characteristic attribute of MUDDIObject, providing a persistent, unique identifier of the real world object represented by a MUDDIObject instance. Identifier maintenance and dereference mechanisms are implementation dependent but preference will be for global uniqueness. |
| `recordID` | [1..1] | [AbstractValueType](abstract-value-type.md) | Characteristic attribute of MUDDIObject, providing a persistent, unique identifier of the MUDDIObject object instance in a dataset or data product. Identifier maintenance and dereference mechanisms are implementation dependent but preference will be for global uniqueness. |
| `sf_geometry` | [0..*] | [AbstractValueType](abstract-value-type.md) | Abstract spatial representation and geolocation attribute of a feature entity in conformance with ISO 19107 and OGC Simple Features. |
| `systemID` | [1..1] | [AbstractValueType](abstract-value-type.md) | Characteristic attribute of MUDDIObject, providing a unique identifier of the MUDDIObject object instance assigned by the system that manages it. Identifier maintenance, persistence, and dereference mechanisms are system dependent but preference will be for global uniqueness. |

# Associations

| Association | Target |
| --- | --- |
| `enclosedBy` | [MUDDIObject](muddi-object.md) |

# Specialised by

* [MUDDIAsset](muddi-asset.md) — The parent class of built environment infrastructure that can be located, owned, operated, oriented, and consists of physical building material such as metal, plastic, or concrete.
* [MUDDIEnvironmentUnit](muddi-environment-unit.md) — The parent class of environmental units which represent regions of the subsurface exclusive of built assets.
* [MUDDIEvent](muddi-event.md) — The parent class of events (activities or tasks that take place in specific locations and time intervals with defined procedures and results) such as observations (e.g. surveys, inspections) of the real underground world, or executed updates such as changes to asset status.
* [MUDDISpace](muddi-space.md) — The parent class of defined regions of space, typically represented by 2D polygon geometries, comprising the ground surface and/or underlying subsurface.

# Citations

[1] [OGC MUDDI — Model for Underground Data Definition and Integration (23-024)](https://docs.ogc.org/is/23-024/23-024.html)
