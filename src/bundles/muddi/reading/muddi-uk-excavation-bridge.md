---
type: Reference
title: "MUDDI → UK Excavation Profile: How the Bridge Works"
description: How the UK Excavation Profile is derived from and extends the MUDDI conceptual model — what changed, what was added, and why each change is permitted.
tags: ["reading", "bridge"]
timestamp: '2026-07-04T00:00:00Z'
---

This document explains how the **MUDDI UK Excavation Profile** (logical model, schema `coredata`) is derived from and extends the **OGC MUDDI Conceptual Model** (standard 23-024). It covers what changed, what was added, and—critically—why each change is permitted.

For the MUDDI standard in isolation, see [muddi-conceptual-model.md](muddi-conceptual-model.md).  
For the UK Excavation Profile in full detail, see [uk-excavation-profile.md](uk-excavation-profile.md).

---

## The Three Mechanisms That Allow Differences

The UK Excavation Profile looks quite different from bare MUDDI, but every difference is permitted by one of three mechanisms baked into the standard:

### 1. AbstractValueType — the standard owns no concrete types

Every attribute in the MUDDI conceptual model is typed `AbstractValueType`. This means the standard deliberately **does not say** whether `objectID` is a UUID or an integer, whether `sf_geometry` is a 2D linestring or a 3D solid, whether `assetOwnerID` is a text string or a foreign key.

The profile resolves all of these. The UK Excavation Profile's resolution (note: the conceptual identifiers do not survive as literal same-named columns — they resolve into the profile's `*assigneduniqueid` / `*_fk` column family, so do not grep for `objectid`/`recordid`/`assetownerid`):

| MUDDI abstract attribute | UK Profile concrete resolution |
|--------------------------|--------------------------------|
| `objectID` | resolved into the unique-id family, e.g. `dataproviderassigneduniqueid` (`text`) — no literal `objectid` column |
| `recordID` | resolved into the same unique-id family — no literal `recordid` column |
| `sf_geometry` | `geometry(Geometry, 27700)` — PostGIS geometry, EPSG:27700 |
| `assetOwnerID` | resolved via `dataownerassigneduniqueid` / `objectownerassigneduniqueid` plus a `dataproviderid_fk` FK to `organisations.organisation` — no literal `assetownerid` column |
| `validTime` on MUDDIEvent | `tstzrange` (PostgreSQL timestamp range) |

### 2. Conformance classes — Extended classes are optional

The standard has two conformance classes. A profile only needs to implement Core. Extended classes (`Structure`, `MUDDIEnvironmentalUnit`) are adopted only if the use case needs them.

The UK Excavation Profile implements both Core and Extended.

### 3. LogicalName — the formal renaming contract

Any MUDDI term can be renamed in a profile. The only requirement is that a `LogicalName` record is produced for every rename. This is the formal contract: a consuming tool looks up the `logicalName` in the LogicalName register to recover the original MUDDI concept.

The conformance record is published in:  
`MUDDI UK Excavation Profile/LogicalName - MUDDI UK Excavation Profile V2.1.3 - Conformance.ods`

---

## What Is Not Permitted

The profile cannot:
- Remove or ignore Core conformance classes
- Change the **semantic meaning** of a MUDDI attribute (renaming is fine; redefining what it means is not)
- Violate cardinality (a `[1..1]` attribute cannot be made optional)
- Remove the three-ID system (`objectID`, `recordID`, `assetOwnerID`)

---

## Class Names and LogicalName Mappings

A common misreading is that the profile *renames* MUDDI classes — for example, that a conceptual `NetworkConveyanceLink`/`NetworkConveyanceNode` is shortened to `NetworkLink`/`NetworkNode`. That is not what happens. The MUDDI conceptual model **already** names these classes `NetworkLink` and `NetworkNode` (there is no `NetworkConveyanceLink` or `NetworkConveyanceNode` anywhere in the model); `NetworkConveyance` is their shared parent class. So there is **no class rename** here.

The profile keeps MUDDI's class names. What `LogicalName` actually records is the mapping from each conceptual class to its concrete physical realisation — the `{type}networklink` / `{type}networknode` tables and their columns — not a rename of the class itself. A consuming tool looks up the `logicalName` register to recover which MUDDI concept a given physical table or column implements.

Extended-class names are likewise unchanged (`Structure`, `MUDDIEnvironmentalUnit`).

---

## Attribute Additions Per Class

MUDDI defines a minimal set of conceptual attributes. The UK Excavation Profile adds a large number of logical-level attributes at each class. This is not a modification of the standard — it is the profile's job to define *all* the attributes a UK excavation data record needs to carry.

> Caveat on the per-class "logical additions" counts below: these figures come from the profile's logical-model spreadsheet, not from the flat SQL DDL. Because every concrete table copies in the full inherited column set (see "Flattened Inheritance"), you cannot recover a clean per-class addition count by reading the DDL — e.g. `gasnetworklink` has 105 columns in total. Treat the per-class numbers as indicative of the logical model, not as directly countable in the physical tables.

### MUDDIObject — 4 conceptual → 29 logical additions

MUDDI gives: `objectID`, `recordID`, `sf_geometry`, `systemID`

UK profile adds (selected key fields):

| Added attribute | Type | Purpose |
|-----------------|------|---------|
| `geometry` | PostGIS geometry (EPSG:27700) | Concrete resolution of `sf_geometry` |
| `horizontalCRS` / `verticalCRS` | text | CRS declaration required by MUDDI |
| `operationalStatus` | codelist | In Use, Abandoned, Unknown, etc. |
| `dataOwner` / `objectOwner` / `operator` | text | Separate provenance roles |
| `dataProviderID` | FK → organisations | Which org submitted the data |
| `dataProvenance` | text (default: `"Asset Owner Records"`) | Origin of the data |
| `horizontalAccuracy` | MUDDILengthType | Positional accuracy |
| `qualityLevel` | codelist (PAS 128 A–D) | Survey quality classification |
| `dateDataCollected` / `dateOfExtract` | date/timestamptz | Temporal provenance |
| `dataSensitivityLevel` | text | Access control classification |
| `expectedRefreshPeriod` | MUDDITimePeriodType | Data currency lifecycle |
| `featureType` | codelist | Categorises the feature |
| `additionalInformation` | text | Free-text overflow |

Database-level additions (added by the SQL schema):

| Column | Type | Purpose |
|--------|------|---------|
| `systemid` | `character varying(38)` PRIMARY KEY | Concrete resolution of the conceptual `systemID` (a MUDDIObject attribute in the XMI, not a DB-only invention) — serves as the database primary key |
| `lifecyclestatus` | text NOT NULL | Record-level lifecycle (active, retired…) |
| `datelastupdated` | timestamptz NOT NULL | Last modification timestamp |
| `systemloaddate` | timestamptz NOT NULL | When loaded into the database |

### MUDDIAsset — 1 conceptual → 17 logical additions

MUDDI gives: `assetOwnerID`

UK profile adds:

| Added attribute | Type | Purpose |
|-----------------|------|---------|
| `depth` | MUDDIDepthType | Burial depth |
| `horizontalMeasurementMethod` | codelist | How position was established |
| `azimuth` | real + units | Orientation |
| `colour` | text | Physical colour |
| `material` / `materialSubType` | codelist + text | Primary structural material |
| `locationType` | codelist | Buried, Surface, Above Ground… |
| `undergroundStatus` | codelist | Whether actually underground |
| `intendedPermanence` | codelist | Permanent, Temporary, Unknown |
| `installationMethod` / `installationMethodSubType` | codelist + text | How it was installed |
| `verticalAccuracy` | MUDDILengthType | Vertical positional accuracy |
| `qualityLevel` | codelist (PAS 128 A–D) | Survey quality |

### NetworkAsset — 1 conceptual → 17 logical additions

MUDDI gives: `utilityType` (a conceptual attribute on NetworkAsset in the XMI; the class also marks the structural distinction from Network)

The profile resolves `utilityType` to a concrete codelist and adds:

| Added attribute | Type | Purpose |
|-----------------|------|---------|
| `utilityType` | codelist | Concrete resolution of the conceptual `utilityType`: Electricity, Gas, Water… (9 types) |
| `utilitySubType` | codelist | High Voltage, Low Pressure… |
| `dateOfInstallation` | date | Installation date |
| `insideHeight` / `insideWidth` / `insideLength` | MUDDIHeightType etc. | Internal dimensions |
| `outsideHeight` / `outsideWidth` / `outsideLength` | MUDDIHeightType etc. | External dimensions |
| `wallThickness` | MUDDIWidthType | Wall thickness |
| `isAuxiliary` / `isCathodicProtected` / `isEncased` / `isNPS` | boolean | Network context flags |
| `container` | text | Reference to enclosing structure |
| `protectiveMaterial` / `protectiveMaterialSubType` | codelist + text | Outer protection |

### NetworkConveyance — 0 conceptual additions → 12 logical additions

MUDDI gives: nothing (class marks the conveyance/accessory distinction)

UK profile adds operating characteristics:

| Added attribute | Type | Purpose |
|-----------------|------|---------|
| `conveyanceCategory` | codelist | Main, Service, Rising, Distribution… |
| `conveyanceMethod` | codelist | Gravity, Pressurised, Pumped… |
| `operatingConveyanceLevel` | real + type + units | Operating pressure, voltage, or capacity |
| `operatingTemperature` | real + range + units | Operating temperature |
| `outerMaterial` / `outerMaterialSubType` | codelist + text | Outer surface material |
| `fillMaterial` | codelist | Fill material (if filled) |
| `isFilled` | boolean | Currently filled? |

### NetworkLink — topology formalized

MUDDI gives: `From` → NetworkNode, `To` → NetworkNode associations

UK profile adds:

| Added attribute | Type | Purpose |
|-----------------|------|---------|
| `componentType` | codelist | Pipe, Cable, Duct… |
| `componentSubType` | text | Sub-classification |
| `startNodeID` / `endNodeID` | text | Denormalised FK to start/end node (mirrors From/To) |
| `downstreamDepth` | MUDDIDepthType | Depth at the downstream end |

### NetworkNode — minimal additions

UK profile adds:

| Added attribute | Type | Purpose |
|-----------------|------|---------|
| `componentType` | codelist | Valve, Junction, Meter, Tee… |
| `componentSubType` | text | Sub-classification |

### NetworkAccessory — sub-type differentiation

MUDDI gives: abstract class, no attributes beyond NetworkAsset

UK profile maps four sub-roles via component type codelists:

| UK sub-role | MUDDI class | Examples |
|-------------|------------|---------|
| `{type}accessobject` | NetworkAccessory | Manhole, inspection chamber, rodding eye |
| `{type}containerobject` | NetworkAccessory | Jointing chamber, cable trough |
| `{type}supportobject` | NetworkAccessory | Mounting bracket, marker post |
| `{type}physicalprotectionobject` | NetworkAccessory | Duct, conduit, sleeve |

Each sub-role adds specific attributes, e.g. `accessobject` adds `accesstype`, `accesssubtype`, `numberofcovers`.

> Naming exception: 8 of the 9 utility types follow the `{type}physicalprotectionobject` pattern, but transport-signal's table is `transportsignalprotectionobject` (no `physical` infix).

---

## New Classes Added by the Profile

These classes have **no MUDDI counterpart** — they are UK Excavation Profile additions, with LogicalName entries documenting that they are profile extensions:

| New class | Extends | Purpose |
|-----------|---------|---------|
| `NetworkAnnotation` | NetworkAccessory | Text labels or notation attached to network features |
| `NetworkDescriptionObject` | NetworkAccessory | Associated descriptive object (e.g. specification document) |
| `NetworkDimension` | NetworkAccessory | A measured dimension associated with a network asset |
| `NetworkLinkZoneOfInterest` | MUDDISpace | Buffer/proximity zone around a NetworkLink |
| `NetworkNodeZoneOfInterest` | MUDDISpace | Buffer/proximity zone around a NetworkNode |

Each utility type gets its own version of these: `{type}networkannotation`, `{type}networkdimension`, etc.

---

## The 9-Utility-Type Table Strategy

MUDDI has no concept of "utility type" at the class level — it has abstract NetworkAssets. The UK Excavation Profile introduces the `utilityType` attribute on NetworkAsset and then **creates a separate set of tables for each utility type**:

| Utility type | Table prefix | Example tables |
|--------------|-------------|----------------|
| Electricity | `electricity` | `electricitynetworklink`, `electricitynetworknode`, `electricitynetwork`… |
| Gas | `gas` | `gasnetworklink`, `gasnetworknode`, `gasnetwork`… |
| Water | `water` | `waternetworklink`, `waternetworknode`, `waternetwork`… |
| Sewer | `sewer` | `sewernetworklink`, `sewernetworknode`, `sewernetwork`… |
| Drainage | `drainage` | `drainagenetworklink`, `drainagenetworknode`, `drainagenetwork`… |
| Telecommunications | `telco` | `telconetworklink`, `telconetworknode`, `telconetwork`… |
| Thermal | `thermal` | `thermalnetworklink`, `thermalnetworknode`, `thermalnetwork`… |
| Fuel & Chemicals | `fuelandchemicals` | `fuelandchemicalsnetworklink`, … |
| Transport Signal | `transportsignal` | `transportsignalnetworklink`, … |

MUDDI has one abstract `NetworkLink` class. The UK profile creates a concrete table per utility type per feature role:

```
  MUDDI (abstract)          UK Excavation Profile (concrete tables)
                            ┌─────────────────────────────────┐
                            │ gasnetworklink                  │
  NetworkLink ────────────▶│ waternetworklink                │
  (one abstract class)      │ electricitynetworklink          │
                            │ sewernetworklink                │
                            │ drainagenetworklink             │
                            │ telconetworklink                │
                            │ thermalnetworklink              │
                            │ fuelandchemicalsnetworklink     │
                            │ transportsignalnetworklink      │
                            └─────────────────────────────────┘
  Same explosion for networknode, network, accessobject, etc.
  Result: ~135 concrete tables from ~12 abstract MUDDI classes.
```

**Why split by utility type rather than having one generic table?**

Some utilities need columns that make no sense for others. A gas pipe needs `mahp` (Maximum Allowable Hazard Pressure), `materialgrade`, `slabbing`, `tape`. An electricity cable needs `operatingvoltage`. A sewer link needs `backdrop`, `startingdepthtype`, `endingdepthtype`.

A single generic `networklink` table would either carry 200 nullable columns or require a type-discriminated EAV pattern. The utility-type table approach keeps each table clean and queryable without filtering on a type discriminator.

---

## Flattened Inheritance

MUDDI's class hierarchy is deep. A concrete feature like `gasnetworklink` sits at the bottom of a five-level chain:

```
  MUDDIObject               (4 conceptual attrs  + 29 logical additions)
    └── MUDDIAsset           (1 conceptual attr   + 17 logical additions)
          └── NetworkAsset   (1 conceptual attr   + 17 logical additions)
                └── NetworkConveyance  (0 + 12)
                      └── NetworkLink  (0 + 5)
                                └── gasnetworklink  (gas-specific)
```

(Column figures are omitted here deliberately: the logical additions come from the profile's spreadsheet, and the flat physical table copies in the whole chain — `gasnetworklink` ends up with 105 columns in total, not a figure you can add up class-by-class from the DDL.)

A relational database has two main options for implementing this hierarchy.

### Option A — Joined tables (one table per class)

Each class in the hierarchy gets its own table containing only that class's own columns. To read a complete gas pipe record you must JOIN all five parent tables:

```
  muddiobject          muddiasset           networkasset
  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
  │ systemid PK │◄─────│ systemid FK │◄─────│ systemid FK │
  │ objectid    │      │ assetownerid│      │ utilitytype │
  │ recordid    │      │ depth_depth │      │ dateinstall │
  │ geometry    │      │ material    │      │ ...16 cols  │
  │ ...28 cols  │      │ ...16 cols  │      └─────────────┘
  └─────────────┘      └─────────────┘               ▲
                                          networkconveyance
                                          ┌─────────────┐
                                          │ systemid FK │
                                          │ conveycat   │
                                          │ ...11 cols  │
                                          └─────────────┘
                                                   ▲
                                      networklink
                                      ┌─────────────────┐
                                      │ systemid FK     │
                                      │ componenttype   │
                                      │ startnodeid     │
                                      └─────────────────┘
                                                   ▲
                                        gasnetworklink
                                        ┌─────────────────┐
                                        │ systemid FK     │  ← gas-specific only
                                        │ materialgrade   │
                                        │ slabbing        │
                                        │ mahp            │
                                        └─────────────────┘

  To read one gas pipe:
  SELECT * FROM gasnetworklink g
  JOIN networklink nl ON nl.systemid = g.systemid
  JOIN networkconveyance nc ON nc.systemid = nl.systemid
  JOIN networkasset na ON na.systemid = nc.systemid
  JOIN muddiasset a ON a.systemid = na.systemid
  JOIN muddiobject o ON o.systemid = a.systemid
  WHERE g.systemid = '...';
```

### Option B — Flat table (what the UK Excavation Profile actually does)

Every concrete table contains **all columns from the entire inheritance chain** copied directly into it. There is no `networkasset` table. There is no `muddiobject` table. Every column from every ancestor class lives in the one concrete table.

```
  gasnetworklink  (single table — 105 columns total)
  ┌────────────────────────────────────────────────────────┐
  │  ── inherited from MUDDIObject (DB level) ──           │
  │  systemid            objectid          recordid        │
  │  geometry            operationalstatus lifecyclestatus │
  │  dataproviderid      datasensitivitylvl  ...25 more    │
  ├────────────────────────────────────────────────────────┤
  │  ── inherited from MUDDIAsset ──                       │
  │  assetownerid        depth_depth       material        │
  │  locationType        qualitylevel      azimuth  ...15  │
  ├────────────────────────────────────────────────────────┤
  │  ── inherited from NetworkAsset ──                     │
  │  utilitytype         dateofinstallation  isencased     │
  │  insidewidth_width   outsidewidth_width  ...13 more    │
  ├────────────────────────────────────────────────────────┤
  │  ── inherited from NetworkConveyance ──                │
  │  conveyancecategory  conveyancemethod   outermaterial  │
  │  operatingconveyancelevel  ...8 more                   │
  ├────────────────────────────────────────────────────────┤
  │  ── inherited from NetworkLink ──                      │
  │  componenttype       startnodeid        endnodeid      │
  │  downstreamdepth_depth                                 │
  ├────────────────────────────────────────────────────────┤
  │  ── gas-specific ──                                    │
  │  materialgrade       slabbing           tape    mahp   │
  └────────────────────────────────────────────────────────┘

  To read one gas pipe:
  SELECT * FROM coredata.gasnetworklink WHERE systemid = '...';
```

### Why the UK profile chose flat

- No joins needed for any routine read or spatial query
- PostGIS queries hit a single `geometry` column in a single table — no join required before spatial filtering
- Partitioning by utility type is natural: each utility type owns its own tables
- No orphaned parent rows when a child record is deleted

The cost: column definitions are duplicated across all ~135 concrete tables. If a parent-class column needs to be added or changed, all ~135 tables need updating. That is a real maintenance overhead, and it is a deliberate trade-off made in the profile design.

The same pattern applies to `waternetworklink`, `electricitynetworknode`, `telcoaccessobject`, and every other concrete feature table — each is a self-contained flat table with the full column set inherited from its MUDDI ancestor chain.

---

## Soft-Reference Junction Tables

MUDDI's associations (Network → NetworkConveyance, NetworkLink → NetworkNode, etc.) could be implemented as foreign keys. The UK Excavation Profile uses **soft-reference junction tables** instead:

```sql
CREATE TABLE coredata.relationship_networktonetworkconveyance (
    systemid              character varying(38) PRIMARY KEY,
    lifecyclestatus       text NOT NULL,
    datelastupdated       timestamptz NOT NULL,
    systemloaddate        timestamptz NOT NULL,
    linkednetworkid       text NOT NULL,    -- the Network's identifier
    linkednetworktable    text NOT NULL,    -- which table the Network row lives in
    linkedconveyanceid    text NOT NULL,    -- the Conveyance's identifier
    linkedconveyancetable text NOT NULL,    -- which table the Conveyance row lives in
    dataproviderid_fk     character varying(38) NOT NULL
);
```

The `{thing}table` column identifies which of the ~135 concrete tables holds the referenced row.

A conventional FK cannot point at "whichever of the 135 tables this row happens to live in." You would need a separate junction table for every pair of tables that can be associated — hundreds of tables just to represent the Network → NetworkConveyance relationship. The soft-reference approach handles the polymorphic relationship with one junction table per association type:

```
  relationship_networktonetworkconveyance  (one table handles all utility type combinations)
  ┌──────────────────────────────────────────────────────────────────────────┐
  │ linkednetworkid = "NET-001"    linkednetworktable = "gasnetwork"          │
  │ linkedconveyanceid = "L-001"   linkedconveyancetable = "gasnetworklink"   │
  ├──────────────────────────────────────────────────────────────────────────┤
  │ linkednetworkid = "NET-002"    linkednetworktable = "waternetwork"        │
  │ linkedconveyanceid = "L-005"   linkedconveyancetable = "waternetworklink" │
  ├──────────────────────────────────────────────────────────────────────────┤
  │ linkednetworkid = "NET-002"    linkednetworktable = "waternetwork"        │
  │ linkedconveyanceid = "N-003"   linkedconveyancetable = "waternetworknode" │
  └──────────────────────────────────────────────────────────────────────────┘

  Trade-off: no DB-enforced referential integrity — the database cannot check
  that linkedconveyanceid actually exists in linkedconveyancetable.
  Application layer must enforce consistency instead.
```

---

## The Three SQL Files Pattern

The UK Excavation Profile is encoded in three SQL files (same pattern for NUAR Harmonised Data Model):

| File | Contents | Purpose |
|------|----------|---------|
| `01 - ... .sql` | Feature table `CREATE TABLE` statements | The data model DDL — schemas, columns, geometry types |
| `02 - ... Codelist Create.sql` | Codelist table `CREATE TABLE` statements | Schema `codelists_transformation` with 40 tables |
| `03 - ... Codelist Populate.sql` | `INSERT INTO` statements | Populates the 40 codelist tables with all permitted values |

Files 02 and 03 are separated so that schema creation (DDL) and data loading (DML) can be run independently — useful when re-loading codelist values after an update without recreating tables.

---

## CRS and Geometry

| MUDDI standard | UK Excavation Profile |
|----------------|----------------------|
| CRS is AbstractValueType — not specified | Default CRS: EPSG:27700 (British National Grid) |
| Geometry type is AbstractValueType | PostGIS `geometry(Geometry, 27700)` — any Simple Features type |
| Multi-geometry allowed `[0..*]` | Single `geometry` column per table |
| Depth as separate attribute | `depth_depth real` + `depth_unitofmeasure text` (composite type flattened) |

---

## Composite Type Flattening

MUDDI defines composite types like `MUDDIDepthType` (value + method + units). In a relational table, the UK profile flattens these into prefixed column pairs:

| MUDDI composite type | Flattened columns in SQL |
|---------------------|--------------------------|
| `depth: MUDDIDepthType` | `depth_depth real`, `depth_unitofmeasure text` |
| `horizontalAccuracy: MUDDILengthType` | `horizontalaccuracy_length real`, `horizontalaccuracy_unitofmeasure text` |
| `insideWidth: MUDDIWidthType` | `insidewidth_width real`, `insidewidth_unitofmeasure text` |
| `operatingTemperature` | `operatingtemperature real`, `operatingtemperaturerange text`, `operatingtemperatureunits text` |

For the `_length` / `_width` / `_depth` / `_unitofmeasure` composites the rule is: prefix = attribute name, suffix (after an underscore) = the component field name from the composite type definition. Note that this underscore-suffix convention does **not** hold universally — the `operatingtemperature` triple flattens without the `_`-suffix pattern (`operatingtemperature` / `operatingtemperaturerange` / `operatingtemperatureunits`, no `_operatingtemperature` or `_unitofmeasure` components).

---

## Summary: What Changed and Why

| Difference | Change | Permitted by |
|-----------|--------|-------------|
| Conceptual-class → physical-table/column mappings (`NetworkLink` → `{type}networklink`, etc.) | LogicalName entries (not class renames — MUDDI already names these classes `NetworkLink`/`NetworkNode`) | LogicalName mechanism |
| Concrete types (geometry, text, FK) | AbstractValueType resolution | AbstractValueType |
| EPSG:27700 CRS | CRS declaration | AbstractValueType |
| 9 utility type tables instead of generic classes | Table naming strategy | Profile design freedom |
| 17+ extra attributes on NetworkAsset etc. | Attribute additions | Profile design freedom |
| New classes (NetworkAnnotation etc.) | Profile extensions with LogicalName | Profile design freedom |
| Soft-reference junction tables instead of FKs | Implementation choice | Profile design freedom |
| Flattened inheritance (no joined tables) | Implementation choice | Profile design freedom |
| 40 concrete codelists | AbstractValueType resolution | AbstractValueType |
| organisations, usercreateddata schemas | Operational additions | Profile design freedom |
