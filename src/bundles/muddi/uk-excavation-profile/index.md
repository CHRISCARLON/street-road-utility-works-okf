# UK Excavation Profile — logical model

The **logical implementation** of the OGC [MUDDI conceptual model](/conceptual/index.md) for the NUAR programme (v2.1.3), presented as it is actually implemented in the PostGIS schema.

Where the conceptual model uses **inheritance** (a `Network` is a `MUDDIAsset` is a `MUDDIObject`), the logical profile **flattens** that hierarchy: every inherited attribute is copied inline, so each feature type is a single wide standalone table that can be queried without joins. See how the two line up in the [comparison](/compare.md).

* [Feature types](feature-types/index.md) - the flattened feature tables, grouped by utility domain
* [Codelists](codelists/index.md) - controlled vocabularies that fill the value columns
* [Relationships](relationships/index.md) - junction tables linking features together
