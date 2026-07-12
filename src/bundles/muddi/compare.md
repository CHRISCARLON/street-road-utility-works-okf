---
type: Comparison
title: Conceptual model vs. logical profile
description: How the abstract MUDDI inheritance hierarchy collapses into the flat, standalone tables of the UK Excavation Profile.
tags: [comparison, muddi, uk-excavation]
timestamp: '2026-07-04T00:00:00Z'
---

The site describes the same underground-asset model at two levels. This page lines them up.

# Two levels of the model

| | [MUDDI conceptual model](/conceptual/index.md) | [UK Excavation Profile](/uk-excavation-profile/index.md) |
| --- | --- | --- |
| **What it is** | The abstract OGC standard (23-024) | The concrete PostGIS implementation (v2.1.3) |
| **Structure** | An **inheritance hierarchy** — a `Network` *is a* `MUDDIAsset` *is a* `MUDDIObject` | **Flattened** — every inherited attribute is copied inline |
| **Types** | Every attribute is an [AbstractValueType](/conceptual/abstract-value-type.md) | Concrete SQL types + [codelists](/uk-excavation-profile/codelists/index.md) |
| **A feature is…** | Spread across several abstract classes it inherits from | **One wide standalone table**, queried without joins |
| **Reuse** | Internationally reusable, type-agnostic | UK-specific: EPSG:27700 geometry, British vocabularies |

# The flattening

In the conceptual model, attributes live on whichever class introduces them, and
a concrete feature inherits the whole chain:

```
MUDDIObject      → objectID, recordID, geometry, lifecycle …
  └ MUDDIAsset   → assetOwnerID, data provider, provenance …
      └ Network  → (network-level attributes)
```

The UK Excavation Profile does **not** store this as three joined tables. It
**flattens** the chain: every attribute from every ancestor is written directly
onto the feature's own table. The trade-off is deliberate — wider tables, some
repetition, but no joins to reconstruct a single feature.

# Worked example — Gas Network

| Conceptual class | Contributes | Where it lands in the flat table |
| --- | --- | --- |
| [MUDDIObject](/conceptual/muddi-object.md) | identity, geometry, lifecycle | `systemid`, `geometry`, `lifecyclestatus`, … |
| [MUDDIAsset](/conceptual/muddi-asset.md) | ownership & provenance | `dataowner`, `dataprovenance`, `dataproviderid_fk` |
| [Network](/conceptual/network.md) | the network role | network attributes + associations |

All of the above is realised as the single flat table
[gasnetwork](/uk-excavation-profile/feature-types/gas/gasnetwork.md) — roughly
95 columns, no inheritance, no joins. The same collapse happens for every one of
the nine utility domains and their ~15 feature roles.

# Where the pieces map

| MUDDI conceptual class | Profile role | Example flat table |
| --- | --- | --- |
| [Network](/conceptual/network.md) | Network | [gasnetwork](/uk-excavation-profile/feature-types/gas/gasnetwork.md) |
| [NetworkLink](/conceptual/network-link.md) | Network Link | [gasnetworklink](/uk-excavation-profile/feature-types/gas/gasnetworklink.md) |
| [NetworkNode](/conceptual/network-node.md) | Network Node | [gasnetworknode](/uk-excavation-profile/feature-types/gas/gasnetworknode.md) |
| [NetworkConveyance](/conceptual/network-conveyance.md) | Container Object | [gascontainerobject](/uk-excavation-profile/feature-types/gas/gascontainerobject.md) |
| [NetworkAccessory](/conceptual/network-accessory.md) | Access / Support / Protection Object | [gasaccessobject](/uk-excavation-profile/feature-types/gas/gasaccessobject.md) |
| [Structure](/conceptual/structure.md) | Site | [gassite](/uk-excavation-profile/feature-types/gas/gassite.md) |
| [ServiceArea](/conceptual/service-area.md) | Service Area | [gasservicearea](/uk-excavation-profile/feature-types/gas/gasservicearea.md) |
| [AbstractValueType](/conceptual/abstract-value-type.md) | Codelist | [materialvalue](/uk-excavation-profile/codelists/materialvalue.md) |

The profile keeps MUDDI's own conceptual class names (`NetworkLink`,
`NetworkNode`) — it does **not** rename them. What the profile *does* introduce
is the mapping from a conceptual class to its concrete per-domain table
(`NetworkLink` → `gasnetworklink`) and physical column names; MUDDI's
[LogicalName](/conceptual/logical-name.md) mechanism is what exists to record
those conceptual-to-physical mappings.
