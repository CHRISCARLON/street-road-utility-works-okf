---
type: MUDDI Conceptual Class
title: LogicalName
description: Mapping table for mapping entity / attribute names from target logical
  models back to those names used in the conceptual model.
tags:
- conceptual
- muddi
- core
timestamp: '2026-07-04T00:00:00Z'
---

Mapping table for mapping entity / attribute names from target logical models back to those names used in the conceptual model. Implementing and completing this table is a requirement for target MUDDI logical models

# Attributes

| Attribute | Multiplicity | Type | Notes |
| --- | --- | --- | --- |
| `conceptName` | [1..1] | [AbstractValueType](abstract-value-type.md) |  |
| `logicalName` | [1..1] | [AbstractValueType](abstract-value-type.md) |  |
| `parentConceptName` | [1..1] | [AbstractValueType](abstract-value-type.md) |  |
| `parentLogicalName` | [1..1] | [AbstractValueType](abstract-value-type.md) |  |
| `defaultSymbol` | [1..1] | [AbstractValueType](abstract-value-type.md) |  |
| `implementationName` | [1..1] | [AbstractValueType](abstract-value-type.md) |  |

# Citations

[1] [OGC MUDDI — Model for Underground Data Definition and Integration (23-024)](https://docs.ogc.org/is/23-024/23-024.html)
