---
type: Reference
title: MUDDI Conceptual Model
description: The OGC 23-024 standard on its own — the abstract MUDDI class hierarchy, its attributes, associations and graph topology.
tags: ["reading", "conceptual"]
timestamp: '2026-07-04T00:00:00Z'
---

**Standard:** OGC 23-024 — Model for Underground Data Definition and Integration  
**Published:** July 2024  
**Source:** https://docs.ogc.org/is/23-024/23-024.html

This document describes the OGC MUDDI standard only. For how the UK Excavation Profile implements and extends it, see [muddi-uk-excavation-bridge.md](muddi-uk-excavation-bridge.md).

---

## Why MUDDI Exists

Underground utility networks are invisible. When a contractor digs, they rely on paper plans, fragmented PDFs from multiple utility owners, and manual phone calls to establish what is in the ground. In developed urban areas there are **30–40 excavations per mile per year**. A single utility strike can kill or injure workers, cut power/water/communications for thousands, and cost hundreds of thousands to repair.

Before MUDDI, every utility owner stored data differently — different field names, different geometry types, different coordinate systems, different file formats. Combining data from six utility owners into a single view required manual translation work every time.

MUDDI defines a **minimum common vocabulary** for underground asset data so that:
1. Any system can exchange data with any other without a custom mapping
2. Network connectivity can be analysed across utility type boundaries
3. Data quality and provenance are recorded consistently
4. The model can be extended for local use without breaking interoperability

The standard follows **FAIR principles**: Findable, Accessible, Interoperable, Reusable.

---

## Two Conformance Classes

The standard separates mandatory from optional. The reasoning is that most underground asset use cases centre on the network itself — the pipes, cables, ducts, valves, and junctions. Representing environmental context or complex compound facilities is a separate concern that not every implementer needs.

### Core (mandatory)

Ten classes must be implemented for a system to claim MUDDI conformance:

| Class | Role |
|-------|------|
| `MUDDIObject` | Root of every feature — identity and geometry |
| `MUDDIAsset` | Any man-made infrastructure object |
| `MUDDIEvent` | A time-bounded observation or activity on another object |
| `MUDDISpace` | A geographic/spatial context that is not itself an asset |
| `Network` | A named collection of assets conveying the same commodity |
| `NetworkAsset` | An individual component within a network |
| `NetworkConveyance` | An asset that directly transports the commodity |
| `NetworkLink` | An edge in the network graph — a pipe run, cable, duct |
| `NetworkNode` | A vertex in the network graph — a valve, junction, meter |
| `NetworkAccessory` | Supports or protects the network but does not convey |

These ten feature classes (plus the `AbstractValueType` type and the `LogicalName` helper, making 12 classes in the Core package) are enough to represent any utility network in a topology-aware, data-quality-aware, provenance-aware way. A minimal MUDDI implementation — say, a simple pipe register — only needs these.

### Extended (optional)

The Extended Conceptual Model package adds **17 classes** that may be omitted if the use case does not need them. They mostly hang off the Core abstract classes as concrete specialisations:

| Parent (Core) | Extended subclasses | Purpose |
|---------------|---------------------|---------|
| `NetworkAccessory` | `Access`, `Container`, `Protection`, `Sensor`, `Support` | Concrete accessory types that support or protect but do not convey |
| `MUDDIEvent` | `Action`, `Denotation`, `Observation` | Concrete time-bounded events on assets |
| `MUDDISpace` | `PlanningArea`, `ServiceArea`, `Site` | Concrete spatial contexts (note: `ServiceArea` lives in Extended, not Core) |
| `MUDDIEnvironmentUnit` | `ChemicalUnit`, `GeologicUnit`, `GeotechUnit`, `HydroUnit` | Concrete environmental/subsurface units under the abstract `MUDDIEnvironmentUnit` |
| `MUDDIAsset` | `Structure` | A compound facility — substation, pumping station, treatment works |

The full 17 are: Access, Action, ChemicalUnit, Container, Denotation, GeologicUnit, GeotechUnit, HydroUnit, MUDDIEnvironmentUnit, Observation, PlanningArea, Protection, Sensor, ServiceArea, Site, Structure, Support. Note that `MUDDIEnvironmentUnit` is itself **abstract** — it is the parent of the four concrete `*Unit` classes, not a leaf.

The UK Excavation Profile implements **both** Core and Extended. A lightweight utility-registry system could conform using Core only.

```
  ┌─── Core (mandatory) ──────────────────────────────────────────┐
  │                                                               │
  │  MUDDIObject                                                  │
  │  ├── MUDDIAsset                                               │
  │  │   ├── Network                                              │
  │  │   ├── NetworkAsset                                         │
  │  │   │   ├── NetworkConveyance                                │
  │  │   │   │   ├── NetworkLink                                  │
  │  │   │   │   └── NetworkNode                                  │
  │  │   │   └── NetworkAccessory                                 │
  │  ├── MUDDIEvent                                               │
  │  └── MUDDISpace                                               │
  │                                                               │
  └───────────────────────────────────────────────────────────────┘

  ┌─── Extended (optional — graft onto Core if needed) ───────────┐
  │  NetworkAccessory → Access, Container, Protection, Sensor,    │
  │                     Support                                    │
  │  MUDDIEvent       → Action, Denotation, Observation           │
  │  MUDDISpace       → PlanningArea, ServiceArea, Site           │
  │  MUDDIEnvironmentUnit (abstract) → ChemicalUnit, GeologicUnit,│
  │                     GeotechUnit, HydroUnit                     │
  │  MUDDIAsset       → Structure                                 │
  └───────────────────────────────────────────────────────────────┘
```

---

## AbstractValueType — The Type System

Every attribute in the MUDDI conceptual model is typed as `AbstractValueType`. This is intentional: **the standard prescribes semantics, not concrete data types**. An implementer profile resolves abstract types to concrete ones (text, integer, geometry, codelist, FK…).

This design decision is what makes MUDDI internationally reusable. A UK profile can use EPSG:27700 geometry. A Dutch profile can use RD New. A US profile can use NAD83. The standard stays valid for all of them because it never hard-codes a type.

---

## How Geometry Works

`MUDDIObject.sf_geometry` is typed as `AbstractValueType`, with no concrete geometry type specified. This means:

- The geometry type (point, line, polygon, 3D solid…) is decided at the **logical model** level by the implementing profile
- Any OGC Simple Features geometry is permitted
- Multiple geometry representations of the same object are allowed (`[0..*]`)
- The standard requires every feature with geometry to declare its **Coordinate Reference System** — this is done at the logical level

Depth information is a separate attribute rather than a Z coordinate, giving more control over how depth uncertainty and measurement method are recorded.

---

## The Three-ID System

Every `MUDDIObject` carries three distinct identifiers — each answers a different question:

| ID | Question answered | Who assigns it |
|----|-------------------|----------------|
| `objectID` | What real-world thing is this? | The asset owner — stable, survives data transfers |
| `recordID` | What data record represents this thing? | The data provider — may change on re-extract |
| `systemID` | Which managing system assigned this? | The managing system — a first-class conceptual attribute `[1..1]`, typically realised as the system's primary key |

`systemID` is a genuine `[1..1]` attribute of `MUDDIObject` in the conceptual model, not merely an internal database key left out of exchange — it travels with the object and records which system minted the identifier. This three-way split enables update tracking: when a utility owner re-submits data, `objectID` stays the same but `recordID` may be new. A receiving system can detect update vs. new record without confusion.

```
  Real world:  ████  Gas pipe under High Street, installed 1987  ████
                     objectID = "OWNER-PIPE-001"   ← stable forever
                              │
               ┌──────────────┴──────────────────────────────────┐
               │  2023 initial submission                         │  2025 re-survey
               │  recordID = "EXTRACT-2023-001"                  │  recordID = "EXTRACT-2025-047"
               │  systemID = "sys-000123"                        │  systemID = "sys-000456"
               └─────────────────────────────────────────────────┘
               (objectID matches → system knows this is an update, not a new pipe)
```

---

## The LogicalName Mechanism

MUDDI explicitly allows implementers to **rename class and attribute terms** to match existing local vocabulary. The condition is that every renaming must be recorded in a `LogicalName` instance.

`LogicalName` is a standalone helper class (not in the class hierarchy). It acts as a translation table:

| Attribute | Multiplicity | Meaning |
|-----------|-------------|---------|
| `conceptName` | [1..1] | The original MUDDI term (e.g. `NetworkLink`) |
| `logicalName` | [1..1] | The renamed term in this profile (e.g. `GasPipe`) |
| `parentConceptName` | [1..1] | The parent class's MUDDI term |
| `parentLogicalName` | [1..1] | The parent class's renamed term in this profile |
| `defaultSymbol` | [1..1] | Default cartographic symbol for this feature type |
| `implementationName` | [1..1] | The physical table/column name in the database |

Any conforming profile that renames a MUDDI term must produce a `LogicalName` record for that renaming. A consuming tool can always recover the original MUDDI concept by looking up `logicalName` in the registry.

---

## Composite Types

The **conceptual** model here contains only one value type: `AbstractValueType`. The structured measurement types below — which wrap a value with its unit and (where relevant) measurement method — are **not part of this conceptual model**. They are introduced in the MUDDI PDF / logical layer, where the abstract type is resolved into concrete column structures, and are listed here only for orientation:

| Type (logical layer) | Fields | Purpose |
|------|--------|---------|
| `MUDDIDepthType` | value, measurement method, units | Burial depth with quality context |
| `MUDDILengthType` | value, units | Any linear measurement |
| `MUDDIHeightType` | value, units | Vertical dimension |
| `MUDDIWidthType` | value, units | Horizontal dimension or diameter |
| `MUDDITimePeriodType` | value, unit of time | Duration or time interval |

---

## Full Class Reference

### Class hierarchy

```
AbstractValueType  (the type of all attributes — not in the feature hierarchy)

MUDDIObject  (abstract — root of all features)
├── MUDDIAsset  (abstract — man-made infrastructure)
│   ├── Network
│   ├── NetworkAsset  (individual network component)
│   │   ├── NetworkConveyance  (transports the commodity)
│   │   │   ├── NetworkLink   ← an edge / pipe / cable run
│   │   │   └── NetworkNode   ← a vertex / valve / junction
│   │   └── NetworkAccessory  (supports but does not convey)
│   └── Structure                        ← Extended conformance class
├── MUDDIEvent  (abstract — time-bounded observation)
└── MUDDISpace  (abstract — geographic/spatial context, not an asset)
    └── MUDDIEnvironmentUnit  (abstract)  ← Extended conformance class
        ├── ChemicalUnit
        ├── GeologicUnit
        ├── GeotechUnit
        └── HydroUnit

LogicalName  (standalone — not in the feature hierarchy)
```

---

### MUDDIObject
*Abstract root. Every feature in the model is a MUDDIObject.*

| Attribute | Multiplicity | Type | Notes |
|-----------|-------------|------|-------|
| `objectID` | [1..1] | AbstractValueType | Stable real-world identifier |
| `recordID` | [1..1] | AbstractValueType | Data-record identifier |
| `systemID` | [1..1] | AbstractValueType | Unique identifier assigned by the managing system |
| `sf_geometry` | [0..*] | AbstractValueType | Any Simple Features geometry; multiple representations allowed |

---

### MUDDIAsset
*Abstract. Extends MUDDIObject. Represents man-made infrastructure.*

| Attribute | Multiplicity | Type | Notes |
|-----------|-------------|------|-------|
| `assetOwnerID` | [1..1] | AbstractValueType | Identity of the organisation that owns the physical asset |

---

### MUDDIEvent
*Abstract. Extends MUDDIObject. A time-bounded observation or activity attached to another object.*

| Attribute | Multiplicity | Type | Notes |
|-----------|-------------|------|-------|
| `targetObject` | [1..1] | AbstractValueType | The MUDDIObject this event describes |
| `targetProperty` | [1..1] | AbstractValueType | The specific property being observed or recorded |
| `validTime` | [1..1] | AbstractValueType | When this event occurred / was valid |

Also carries a `featureOfInterest` dependency association → `MUDDIObject`.

**Purpose:** Records things that happen to assets over time — surveys, maintenance, damage incidents, condition assessments. The core conceptual model intentionally under-specifies this class; profiles specialise it for their recording needs.

---

### MUDDISpace
*Abstract. Extends MUDDIObject. A geographic entity that is not itself an asset.*

| Attribute | Multiplicity | Type | Notes |
|-----------|-------------|------|-------|
| `extent` | [1..1] | AbstractValueType | The spatial extent of this space |

Meaning is further expressed through specialisations, all of which are **Extended** conformance classes:
- **MUDDIEnvironmentUnit** (Extended, abstract) — natural subsurface features (ChemicalUnit, GeologicUnit, GeotechUnit, HydroUnit)
- **ServiceArea** (Extended) — operational coverage area of a network
- **PlanningArea**, **Site** (Extended) — further spatial contexts

---

### Network
*Extends MUDDIAsset. A named collection of assets conveying the same commodity.*

| Attribute | Multiplicity | Type | Notes |
|-----------|-------------|------|-------|
| `commodityType` | [1..1] | AbstractValueType | The commodity this network conveys (gas, water, electricity…) |

A Network is further defined by its associations. The directed relations in the model are:

| Association | Direction | Notes |
|-------------|-----------|-------|
| `servicedBy` | ServiceArea → Network | The service area that this network serves |
| `SubNetwork` | Network → Network | Hierarchical subdivision |
| `SubordinateNetwork` | Network → Network | A network administered under this one |
| `partOf` | NetworkConveyance → Network | The conveyances that make up this network |

---

### NetworkAsset
*Extends MUDDIAsset. Any individual component within a network.*

| Attribute | Multiplicity | Type | Notes |
|-----------|-------------|------|-------|
| `utilityType` | [1..1] | AbstractValueType | The utility sector this asset belongs to (gas, water, electricity…) |

The class marks the distinction between a Network (the whole) and its individual components (NetworkAssets). Profiles add further physical and operational attributes here.

---

### NetworkConveyance
*Extends NetworkAsset. An asset that directly transports the commodity (fluid, energy, data).*

No additional attributes at the conceptual level. The class marks the semantic split between assets that convey (pipes, cables, ducts) and accessories that only support (brackets, markers). Profiles add operating characteristics here.

---

### NetworkLink
*Extends NetworkConveyance. An edge in the network topology — a pipe run, cable section, duct.*

No additional attributes at the conceptual level, but carries explicit **topology associations**. In the conceptual model the role names are lowercase `from`/`to`, both target `NetworkNode`, and carry **no multiplicity**:

| Association | Target | Notes |
|-------------|--------|-------|
| `from` | NetworkNode | Start node of this link |
| `to` | NetworkNode | End node of this link |

(Any `[0..1]` multiplicity on these roles is a profile/PDF detail, not part of the conceptual model.) These associations make the graph structure explicit and traversable without GIS processing.

```
  A simple gas network stretch:

  [valve]────── pipe ──────[junction]────── pipe ──────[meter]
  NetworkNode   NetworkLink  NetworkNode    NetworkLink  NetworkNode
     (V1)          (L1)         (J1)           (L2)        (M1)

  L1.from = V1      L1.to = J1
  L2.from = J1      L2.to = M1

  To trace downstream from valve V1: follow L1.to → J1, then L2.to → M1.
  No geometry processing needed — the model carries the topology directly.
```

---

### NetworkNode
*Extends NetworkConveyance. A vertex in the network topology — a junction, valve, meter, fitting.*

No additional attributes at the conceptual level. A node's connectivity is entirely defined by which links reference it via their `from`/`to` associations — there are no outgoing topology attributes on the node itself.

---

### NetworkAccessory
*Extends NetworkAsset. Supports or protects the network but does not convey the commodity.*

No additional attributes at the conceptual level. Examples: access chambers, cable troughs, mounting brackets, protective casings. In the Extended model this class is specialised into the concrete accessory types Access, Container, Protection, Sensor and Support; profiles may define further sub-types via codelists.

---

### Structure
*Extends MUDDIAsset. Extended conformance class.*

Represents compound or facility-level features — substations, pumping stations, treatment works — that are associated with a network but are not themselves conveyance elements. Only required for implementations that need to represent these compound facilities.

| Attribute | Multiplicity | Type | Notes |
|-----------|-------------|------|-------|
| `role` | [1..1] | AbstractValueType | The role this structure plays in the network |

---

### MUDDIEnvironmentUnit
*Abstract. Extends MUDDISpace. Extended conformance class.*

Natural or environmental subsurface features — geological units, groundwater zones, contaminated land, archaeological sensitivity areas. Only required for implementations that need to record environmental context alongside utility data. This class is **abstract**; it is realised through four concrete subclasses: `ChemicalUnit`, `GeologicUnit`, `GeotechUnit`, `HydroUnit`.

| Attribute | Multiplicity | Type | Notes |
|-----------|-------------|------|-------|
| `boundary` | [1..1] | AbstractValueType | The boundary of this environmental unit |

---

## Key Design Principles

**1. Abstract everything at the conceptual level.**
The OGC standard deliberately provides no concrete feature types — not even "gas pipe." All concrete types are defined at the logical (profile) level. This is what makes the standard internationally reusable across different utility sectors, countries, and purposes.

**2. AbstractValueType means profiles own the type system.**
No concrete data type appears in the standard. A profile decides whether `objectID` is a UUID, an integer, or a text string; whether `sf_geometry` is a 2D linestring or a 3D solid. The standard only says what the attribute *means*.

**3. The graph topology is explicit.**
The Link→Node association structure is part of the standard, not a convention. NetworkLink has formal `from` and `to` associations to NetworkNode. This makes network tracing possible at the data model level.

**4. Extension without breaking conformance.**
The LogicalName mechanism allows renaming, the conformance class structure allows omitting Extended classes, and AbstractValueType allows concrete type choices — all without violating the standard. A profile that follows these rules is fully conformant even if it looks quite different from bare MUDDI.

**5. Provenance is a first-class concern.**
`objectID`, `recordID`, and `assetOwnerID` are in the *conceptual* model — not left for profiles to invent. The standard assumes that data will cross organisational boundaries repeatedly, and that you always need to know what real-world thing you are describing and who owns it.
