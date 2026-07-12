---
type: MUDDI Conceptual Class
title: MUDDIEvent
description: The parent class of events (activities or tasks that take place in specific
  locations and time intervals with defined procedures and results) such as observations
  (e.g. surveys, inspections) of the real underground world, or executed updates such
  as changes to asset status.
tags:
- conceptual
- muddi
- core
timestamp: '2026-07-04T00:00:00Z'
---

**Abstract.** The parent class of events (activities or tasks that take place in specific locations and time intervals with defined procedures and results) such as observations (e.g. surveys, inspections) of the real underground world, or executed updates such as changes to asset status. Typically an event also leads to a change / update to one or more attributes of a MUDDIobject such as dimensional parameters.

Specialises [MUDDIObject](muddi-object.md).

# Attributes

| Attribute | Multiplicity | Type | Notes |
| --- | --- | --- | --- |
| `targetObject` | [1..1] | [AbstractValueType](abstract-value-type.md) |  |
| `targetProperty` | [1..1] | [AbstractValueType](abstract-value-type.md) |  |
| `validTime` | [1..1] | [AbstractValueType](abstract-value-type.md) | Characteristic attribute of MUDDIEvent that represents the time interval during or instance at which the result of the event is valid. Usually but not always this is the same as or begins with the event occurrence. |

# Associations

| Association | Target |
| --- | --- |
| `featureOfInterest` | [MUDDIObject](muddi-object.md) |

# Specialised by

* [Action](action.md) — Type of MUDDIEvent representing a task or other action such as a repair or calibration.
* [Denotation](denotation.md) — Type of MUDDIEvent representing the assigning of a particular value to a feature property, such as a status or sensitivity property.
* [Observation](observation.md) — Type of MUDDIEvent representing an observation of phenomena leading to estimation of the value of an observableProperty of some FeatureOfInterest.

# Citations

[1] [OGC MUDDI — Model for Underground Data Definition and Integration (23-024)](https://docs.ogc.org/is/23-024/23-024.html)
