---
type: Reference
title: MUDDI UK Excavation Profile — Deep Dive
description: The concrete UK profile in full — schemas, codelists, the nine utility types, flattened inheritance and UK-specific attributes.
tags: ["reading", "uk-excavation"]
timestamp: '2026-07-04T00:00:00Z'
---

**Role in the three-layer model:** Logical model — the concrete UK implementation of the MUDDI Conceptual Model  
**Schema prefix:** `coredata`, `organisations`, `usercreateddata`, `custombackdrop`, `version`  
**Codelist schema:** `codelists_transformation`  
**Source files:** `01 - MUDDI UK Excavation Profile V2-1-3.sql`, `02 - ...Codelist Create.sql`, `03 - ...Codelist Populate.sql`

---

## What This Profile Does

The MUDDI Conceptual Model is intentionally abstract — no concrete types, no specific attributes. The UK Excavation Profile makes it concrete by:

1. **Defining 9 utility types** and creating a full set of feature tables for each
2. **Flattening the inheritance chain** into each table (no actual table inheritance — every attribute from every parent class is copied in)
3. **Adding utility-specific attributes** for gas, electricity, and sewer that don't exist in the generic model
4. **Adding UK-specific planning/environmental context layers**
5. **Adding operational schemas** for organisations, user-created annotations, and survey records
6. **Defining all codelist vocabularies**

---

## Schema Structure

```
coredata          ← all utility feature tables + relationship tables + context layers
codelists_transformation  ← 40 controlled vocabulary tables (separate schema)
organisations     ← organisation, contact details, proximity rules
usercreateddata   ← observations, surveys, wrongly-recorded objects
custombackdrop    ← custom spatial backdrop layers
version           ← data model versioning metadata
```

---

## The Feature Table Pattern

Every concrete feature table is a **fully flattened** copy of its entire inheritance chain. There is no PostgreSQL table inheritance — every attribute from MUDDIObject → MUDDIAsset → NetworkAsset → NetworkConveyance → NetworkConveyanceLink is repeated as columns in `gasnetworklink`.

### Column layers (using `gasnetworklink` as example)

**Layer 1 — System/lifecycle** (not in MUDDI, added by the profile):
```sql
systemid            varchar(38) PK       -- database primary key
lifecyclestatus     text NOT NULL        -- active, retired, superseded...
datelastupdated     timestamptz NOT NULL
dateoflastlifecyclestatuschange timestamptz
systemloaddate      timestamptz NOT NULL
```

**Layer 2 — MUDDIObject** (identity, provenance, geometry):
```sql
certification, dataproviderassigneduniqueid, dataproviderassigneduniqueidautoassigned (bool, default TRUE),
dataowner, dataownerassigneduniqueid, datasensitivitylevel,
datedatacollected (date), dateoflaststatuschange (date), description,
featuretype, horizontalcrs, operationalstatus,
originaldatedatacollected, version,
enhancedmeasures, enhancedmeasuresproximity_length, enhancedmeasuresproximity_unitofmeasure,
expectedrefreshperiod_period, expectedrefreshperiod_unitoftime, verticalcrs,
geometry geometry(GEOMETRY,27700),    -- the spatial column
sourcefeatureclass, localereference, localereferencetype,
objectname, objectowner, operator,
objectownerassigneduniqueid, operatorassigneduniqueid, additionalinformation,
dateofextract,
dataprovenance text DEFAULT 'Asset Owner Records'  -- mandatory, default set
```

**Layer 3 — MUDDIAsset** (physical characteristics):
```sql
azimuth (real), centroidxyz, azimuthmeasurementunits, colour,
depth_depth (real), depth_unitofmeasure,   -- composite type flattened
depthmethod,
horizontalaccuracy_length, horizontalaccuracy_unitofmeasure,
horizontalmeasurementmethod, installationmethod, installationmethodsubtype,
intendedpermanence, materialsubtype, locationtype, material, qualitylevel,
undergroundstatus, azimuthtype DEFAULT 'Geographic',
verticalaccuracy_length, verticalaccuracy_unitofmeasure
```

**Layer 4 — NetworkAsset** (network component characteristics):
```sql
container, dateofinstallation,
insideheight_height, insideheight_unitofmeasure,
insidelength_length, insidelength_unitofmeasure,
insidewidth_width, insidewidth_unitofmeasure,
isauxiliary (bool), iscathodicprotected (bool), isencased (bool), isnps (bool),
outsideheight_height, outsideheight_unitofmeasure,
outsidelength_length, outsidelength_unitofmeasure,
outsidewidth_width, outsidewidth_unitofmeasure,
protectivematerial, protectivematerialsubtype,
utilitysubtype, utilitytype,
wallthickness_width, wallthickness_unitofmeasure
```

**Layer 5 — NetworkConveyance** (operating properties):
```sql
conveyancecategory, conveyancemethod,
fillmaterial, isfilled (bool),
operatingconveyancelevel, operatingconveyanceleveltype, operatingconveyancelevelunits,
operatingtemperature, operatingtemperaturerange, operatingtemperatureunits,
outermaterial, outermaterialsubtype
```

**Layer 6 — NetworkConveyanceLink** (topology):
```sql
downstreamdepth_depth, downstreamdepth_unitofmeasure,
componenttype, componentsubtype,
startnodeid varchar(38),   -- reference to a networknode.systemid
endnodeid   varchar(38)    -- reference to a networknode.systemid
```

**Layer 7 — Utility-specific** (the columns that differ by utility type):
```sql
-- Gas & Fuel-and-Chemicals (same four columns on both):
materialgrade, slabbing boolean DEFAULT FALSE,
tape boolean DEFAULT FALSE, mahp boolean DEFAULT FALSE

-- Electricity only:
operatingvoltage_operatingvoltage real, operatingvoltage_unitofmeasure text

-- Sewer only:
backdrop boolean, startingdepthtype text, endingdepthtype text

-- Water, Telco, Thermal, Drainage, TransportSignal: no extra columns
```

**Final column — always last:**
```sql
dataproviderid_fk varchar(38) NOT NULL  -- FK to organisations.organisation
```

> **Note on composite types:** The profile flattens structured types like `MUDDIDepthType` into two columns: `depth_depth real` and `depth_unitofmeasure text`. Similarly `MUDDILengthType` → `_length` + `_unitofmeasure`. This is why column counts are high.

---

## The 9 Utility Types

| Utility type | Tables prefix | Notes |
|---|---|---|
| Drainage | `drainage*` | Surface water / stormwater |
| Electricity | `electricity*` | HV and LV cables |
| Fuel & Chemicals | `fuelandchemicals*` | Pipelines carrying oil, chemicals |
| Gas | `gas*` | Natural gas distribution and transmission |
| Sewer | `sewer*` | Foul water sewers |
| Telco | `telco*` | Telecoms cables and fibre |
| Thermal | `thermal*` | District heating/cooling networks |
| Transport Signal | `transportsignal*` | Traffic signals, rail signalling cables |
| Water | `water*` | Potable water supply |

---

## Feature Role Tables Per Utility Type

Each utility type has **up to 15 tables**, one per feature role:

| Role | Table suffix | MUDDI class | Geometry type |
|------|-------------|-------------|---------------|
| Network | `{type}network` | Network (extends NetworkConveyance*) | Polygon / none |
| Network link | `{type}networklink` | NetworkConveyanceLink | LineString |
| Network node | `{type}networknode` | NetworkConveyanceNode | Point |
| Network link zone of interest | `{type}networklinkzoneofinterest` | NetworkLinkZoneOfInterest | Polygon |
| Network node zone of interest | `{type}networknodezoneofinterest` | NetworkNodeZoneOfInterest | Polygon |
| Network annotation | `{type}networkannotation` | NetworkAnnotation | Point/Polygon |
| Network description object | `{type}networkdescriptionobject` | NetworkDescriptionObject | Point/Polygon |
| Network dimension | `{type}networkdimension` | NetworkDimension | Point/Line |
| Access object | `{type}accessobject` | NetworkAccessory | Point |
| Container object | `{type}containerobject` | NetworkAccessory | Point/Polygon |
| Support object | `{type}supportobject` | NetworkAccessory | Point |
| Physical protection object | `{type}physicalprotectionobject` | NetworkAccessory | LineString |
| Service area | `{type}servicearea` | MUDDISpace | Polygon |
| Site | `{type}site` | Structure | Polygon |
| Site zone of interest | `{type}sitezoneofinterest` | MUDDISpace | Polygon |

*Note: `{type}network` inherits from `NetworkConveyance` in the profile, not just `Network`. This is intentional — a network as a whole can carry physical attributes.*

*Naming exception: for transport signal the physical-protection table is actually named `transportsignalprotectionobject` (no `physical`), whereas every other utility type follows `{type}physicalprotectionobject`. The 135-table count is unaffected.*

---

## Accessory Type — Unique Columns

Each accessory role adds its own specific columns on top of the shared NetworkAsset base:

**Access object** (`accessobject`):
```sql
accessorytype text     -- codelist: accessorytypevalue
accesstype text        -- codelist: accesstypevalue (e.g. Access Chamber, Pig Trap, Access Plate)
accesssubtype text     -- free text
numberofcovers integer -- how many covers/lids
```

**Container object** (`containerobject`):
```sql
accessorytype text      -- codelist: accessorytypevalue
containertype text      -- codelist: containertypevalue (e.g. Duct, Tunnel, Pit, Vault, Conduit)
containersubtype text   -- free text
```

**Support object** (`supportobject`):
```sql
accessorytype text    -- codelist: accessorytypevalue
supporttype text      -- codelist: supporttypevalue
```

**Physical protection object** (`physicalprotectionobject`):
```sql
accessorytype text           -- codelist: accessorytypevalue
physicalprotectiontype text  -- codelist: physicalprotectiontypevalue
```

---

## Cross-Cutting Tables in `coredata`

These tables are not tied to any single utility type. They apply across all features.

### `depth`
A separate depth record linked to any asset via a linear referencing system. Used when depth varies along the length of a pipe/cable and you need multiple depth readings at specific positions.

```sql
frommeasure numeric   -- start position along the link (e.g. metres from start node)
tomeasure   numeric   -- end position along the link
dateofcapture date
depth_depth real
depth_unitofmeasure text
depthmethod text
```

### `denotation`
A user-created annotation — a lightweight point note attached to any location, typically made by a field worker. Has full MUDDIObject provenance fields plus:
```sql
userid text NOT NULL
notes text
expirydate timestamptz
title text
userreference text
```

### `servicearea`
Generic service area polygon — the geographic coverage boundary of a network (applies to any utility type). Utility-specific service areas (`gasservicearea` etc.) have the same columns.
```sql
serviceareatype text
serviceareasubtype text
nationalorregionalcoverage text DEFAULT 'N/A'
buffered boolean DEFAULT FALSE
buffersize_width real, buffersize_unitofmeasure text
originalserviceareaid text     -- reference to the pre-buffered version
```

### `supplementaldatacoverage`
Records where a specific type of additional data coverage exists — e.g. "this area has been surveyed to PAS 128 QL-A". Used to flag areas where users can request more detailed data.
```sql
coveragetype text NOT NULL       -- codelist: what type of coverage
coveragedataservicetype text     -- how to access it (API, URL, file...)
coveragedataserviceuri text      -- link to the data service
drawingpriority integer DEFAULT 0  -- rendering order
```

### `subordinatenetworkdefinition`
Defines what constitutes a sub-network — which features from which table belong to it, and the criteria for membership.
```sql
linkednetworkid text NOT NULL
linkednetworktable text NOT NULL
memberfeaturestable text NOT NULL   -- which table the members come from
membershipcriteria text             -- e.g. a SQL predicate or description
```

### `generalplanningarea` / `restrictedplanningarea`
UK statutory planning designations affecting excavation (e.g. conservation areas, TPO zones). Both extend the full MUDDIObject base with:
```sql
planningareatype text
policydocumentation text
policyname text
directive text
```

### `planningareanetwork`
A network-level planning designation (e.g. a gas high-pressure pipeline has a specific planning zone around its route). Links a planning area concept to a specific network.

### Environmental layers (all extend MUDDIObject):
| Table | Content |
|-------|---------|
| `archaeologicalsite` | Designated archaeological sites |
| `areasofspecialscientificinterestnorthernireland` | ASSI (NI equivalent of SSSI) |
| `sitesofspecialscientificinterestengland` | SSSIs in England |
| `sitesofspecialscientificinterestscotland` | SSSIs in Scotland |
| `sitesofspecialscientificinterestwales` | SSSIs in Wales |
| `conservationarea` | Conservation areas |
| `siteofpreviousindustrialuse` | Brownfield/contaminated land |
| `muddienvironmentalunit` | Generic MUDDI environmental feature |
| `treelocation` | Individual tree locations (relevant for root protection zones) |
| `nonutilityobject` | Non-utility buried objects (e.g. found cables with no owner) |

### `guidance`
A document or instruction associated with an asset or area — e.g. "special excavation requirements here". Linked to any object via `relationship_guidance`.
```sql
-- extended MUDDIObject columns plus document reference fields
```

### `linkedfile`
A file attachment (drawing, photo, report) linked to any object via `relationship_linkedfile`.

### `qualitylevel` / `horizontalmeasurementmethod`
Standalone lookup-style records providing extended metadata about data quality, linked to assets.

---

## The Relationship Tables

The profile implements all model associations as **explicit junction tables**, not foreign keys. Every relationship table follows the same pattern:

```sql
systemid varchar(38) PK
lifecyclestatus text NOT NULL
datelastupdated timestamptz NOT NULL
dateoflastlifecyclestatuschange timestamptz
systemloaddate timestamptz NOT NULL
linked{thingA}id text NOT NULL       -- the ID of entity A
linked{thingA}table text NOT NULL    -- the TABLE NAME of entity A
linked{thingB}id text NOT NULL       -- the ID of entity B
linked{thingB}table text NOT NULL    -- the TABLE NAME of entity B
dataproviderid_fk varchar(38) NOT NULL
```

The critical design choice: **ID + table name pairs, not FK constraints**. This is how polymorphic associations work — `relationship_objecttosurvey.linkedobjecttable` might be `gasnetworklink` or `electricitynetworknode`. You can't do that with a conventional FK.

### Full relationship table inventory

These are the **21 `relationship_*` tables in the `coredata` schema**. Five more live in other schemas — 4 in `organisations` and 1 in `usercreateddata` (`relationship_wronglyrecordedobject`).

| Table | Connects |
|-------|---------|
| `relationship_networktonetworkconveyance` | Network → any networklink/networknode/network table |
| `relationship_networktoservicearea` | Network → servicearea |
| `relationship_networktosite` | Network → site |
| `relationship_networktosubnetwork` | Network → sub-network (same utility type) |
| `relationship_networktosubordinatenetwork` | Network → subordinate network (cross-utility) |
| `relationship_networktocontactdetails` | Network → contact details record |
| `relationship_networkconveyancetonetworkaccessory` | Link/node → accessory (access, container, support, protection) |
| `relationship_linktolinkzoneofinterest` | NetworkLink → its zone of interest polygon |
| `relationship_nodetonodezoneofinterest` | NetworkNode → its zone of interest polygon |
| `relationship_sitetoasset` | Site → any asset inside it |
| `relationship_sitetositezoneofinterest` | Site → its zone of interest polygon |
| `relationship_objecttoenclosingobject` | Any object → enclosing container/structure |
| `relationship_objecttosurvey` | Any object → utilitysurvey record |
| `relationship_objecttorule` | Any object → activityproximityrule |
| `relationship_objecttocontactdetails` | Any object → contact details |
| `relationship_linkedfile` | Any object → file attachment |
| `relationship_guidance` | Any object → guidance document |
| `relationship_supplementaldatacoveragetoobject` | Coverage area → specific assets it applies to |
| `relationship_variableobjectvaluetoasset` | Variable sensor reading → asset |
| `relationship_subordinatenetworktorule` | Sub-network → proximity rule |
| `relationship_coveragetobackdropobject` | Coverage → custom backdrop feature |

---

## The Full 135-Table Grid

9 utility types × 15 feature roles = 135 concrete tables. Every cell is `{utilitytype}{featurerole}`.

| Feature role | drainage | electricity | fuelandchemicals | gas | sewer | telco | thermal | transportsignal | water |
|---|---|---|---|---|---|---|---|---|---|
| `network` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `networklink` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `networknode` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `accessobject` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `containerobject` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `supportobject` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `physicalprotectionobject` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `servicearea` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `site` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `sitezoneofinterest` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `networklinkzoneofinterest` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `networknodezoneofinterest` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `networkannotation` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `networkdescriptionobject` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `networkdimension` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

None of these 135 tables have a corresponding abstract parent table in the database. `muddiobject`, `networkasset`, `networkconveyance` etc. do not exist as tables — their columns are copied into each concrete table instead.

---

## How Objects Connect — A Concrete Scenario

Take a simple gas distribution stretch: three pipe sections, four connection points, one manhole.

```
  [pressure         [tee              [isolation        [service
   regulator]        junction]         valve]            tee]
      A ─────────────── B ─────────────── C ─────────────── D
                                          │
                                    (manhole above)
         pipe A→B           pipe B→C           pipe C→D
```

### Rows in the database

| Physical thing | Table | systemid |
|---------------|-------|---------|
| "National Grid Zone B47" | `gasnetwork` | `NET-B47` |
| Pipe A→B | `gasnetworklink` | `link-AB` |
| Pipe B→C | `gasnetworklink` | `link-BC` |
| Pipe C→D | `gasnetworklink` | `link-CD` |
| Pressure regulator A | `gasnetworknode` | `node-A` |
| Tee junction B | `gasnetworknode` | `node-B` |
| Isolation valve C | `gasnetworknode` | `node-C` |
| Service tee D | `gasnetworknode` | `node-D` |
| Manhole above C | `gasaccessobject` | `access-C` |
| Zone B47 coverage polygon | `gasservicearea` | `area-B47` |

### How the topology is stored

Link→Node connectivity is stored directly on the link row — no join needed:

```sql
-- gasnetworklink row for pipe B→C:
systemid    = 'link-BC'
startnodeid = 'node-B'    ← tee junction
endnodeid   = 'node-C'    ← isolation valve
geometry    = LINESTRING(...)
```

### How network membership is stored

Everything belonging to Zone B47 is recorded in `relationship_networktonetworkconveyance` — one row per member:

```
relationship_networktonetworkconveyance:
  linkednetworkid='NET-B47'  linkednetworktable='gasnetwork'  linkedconveyanceid='link-AB'   linkedconveyancetable='gasnetworklink'
  linkednetworkid='NET-B47'  linkednetworktable='gasnetwork'  linkedconveyanceid='link-BC'   linkedconveyancetable='gasnetworklink'
  linkednetworkid='NET-B47'  linkednetworktable='gasnetwork'  linkedconveyanceid='link-CD'   linkedconveyancetable='gasnetworklink'
  linkednetworkid='NET-B47'  linkednetworktable='gasnetwork'  linkedconveyanceid='node-A'    linkedconveyancetable='gasnetworknode'
  linkednetworkid='NET-B47'  linkednetworktable='gasnetwork'  linkedconveyanceid='node-B'    linkedconveyancetable='gasnetworknode'
  linkednetworkid='NET-B47'  linkednetworktable='gasnetwork'  linkedconveyanceid='node-C'    linkedconveyancetable='gasnetworknode'
  linkednetworkid='NET-B47'  linkednetworktable='gasnetwork'  linkedconveyanceid='node-D'    linkedconveyancetable='gasnetworknode'
```

The manhole connects to the valve via `relationship_networkconveyancetonetworkaccessory`:

```
  linkedconveyanceid='node-C'    linkedconveyancetable='gasnetworknode'
  linkedaccessoryid='access-C'   linkedaccessorytable='gasaccessobject'
```

### Common queries

```sql
-- All pipes and valves in Zone B47:
SELECT 'link' AS type, l.systemid, l.geometry, l.componenttype
FROM coredata.gasnetworklink l
JOIN coredata.relationship_networktonetworkconveyance r
  ON r.linkedconveyanceid = l.systemid AND r.linkedconveyancetable = 'gasnetworklink'
WHERE r.linkednetworkid = 'NET-B47'
UNION ALL
SELECT 'node', n.systemid, n.geometry, n.componenttype
FROM coredata.gasnetworknode n
JOIN coredata.relationship_networktonetworkconveyance r
  ON r.linkedconveyanceid = n.systemid AND r.linkedconveyancetable = 'gasnetworknode'
WHERE r.linkednetworkid = 'NET-B47';

-- What is at the downstream end of pipe B→C?
SELECT n.* FROM coredata.gasnetworknode n
JOIN coredata.gasnetworklink l ON l.endnodeid = n.systemid
WHERE l.systemid = 'link-BC';

-- What manhole sits above valve C?
SELECT a.* FROM coredata.gasaccessobject a
JOIN coredata.relationship_networkconveyancetonetworkaccessory r
  ON r.linkedaccessoryid = a.systemid AND r.linkedaccessorytable = 'gasaccessobject'
WHERE r.linkedconveyanceid = 'node-C';
```

---

## How the Hierarchy Manifests Across Tables

Three gas tables from the same utility type — `gasnetwork`, `gasnetworknode`, `gasnetworklink` — share an identical base but diverge at the bottom based on where they sit in the inheritance chain.

```
  Columns shared by all three (MUDDIObject → NetworkConveyance):
  systemid ... outermaterialsubtype   ← identical in gasnetwork, gasnetworknode, gasnetworklink

  Then each table adds only its own level's columns:

  ┌──────────────────┬──────────────────────┬──────────────────────────────┐
  │  gasnetwork      │  gasnetworknode      │  gasnetworklink              │
  │  (Network)       │  (NetworkNode)       │  (NetworkLink)               │
  ├──────────────────┼──────────────────────┼──────────────────────────────┤
  │  (nothing more)  │  componenttype       │  downstreamdepth_depth       │
  │                  │  componentsubtype    │  downstreamdepth_unitofmeasure│
  │                  │                      │  componenttype               │
  │                  │                      │  componentsubtype            │
  │                  │                      │  startnodeid                 │
  │                  │                      │  endnodeid                   │
  │                  │                      │  materialgrade  ← gas+fuel   │
  │                  │                      │  slabbing       ← gas+fuel   │
  │                  │                      │  tape           ← gas+fuel   │
  │                  │                      │  mahp           ← gas+fuel   │
  ├──────────────────┼──────────────────────┼──────────────────────────────┤
  │  95 cols total   │  97 cols total       │  105 cols total              │
  └──────────────────┴──────────────────────┴──────────────────────────────┘
```

`gasnetwork` stops at NetworkConveyance — it has no Link or Node columns because Network does not descend from NetworkConveyanceLink or Node.

`gasnetworknode` adds `componenttype` and `componentsubtype` only — those are the two columns NetworkConveyanceNode contributes.

`gasnetworklink` adds the full NetworkConveyanceLink set (downstream depth + `startnodeid`/`endnodeid`) and then the gas-specific columns at the very bottom.

---

## The `organisations` Schema

Sits outside `coredata` — not utility data, but the **who** that owns and operates utility data.

### `organisation`
```sql
actortype text         -- Data Owner, Object Owner, Data Provider, Operator...
name text
address_*              -- full address flattened (7 fields)
swacode text           -- Street Works Act code (UK utility street works ID)
copyrighttext text
corporateemaildomains text
organisationtype text
displayname text, shortname text
parentorganisationid text, parentorganisationname text
administeredbyparent boolean DEFAULT FALSE
standardguidance varchar(255)
websiteurl text
```
Note: no `dataproviderid_fk` — this table *is* the provider.

### `contactdetails`
Individual contact point (email, phone, address) for a specific purpose (emergency, planning, asset protection). Linked to organisations and assets via relationship tables.

### `activityproximityrule`
Defines when an activity near an asset triggers an enhanced safety requirement — e.g. "any excavation within 3m of a high-pressure gas main requires CAT scan survey".
```sql
name text NOT NULL
activitytype text NOT NULL    -- what activity triggers the rule
proximity_length real          -- the trigger distance
proximity_unitofmeasure text
enhancedmeasures text          -- what enhanced measure is required
```

---

## The `usercreateddata` Schema

Data created by platform users (field workers, planners), not by data providers (utility owners).

### `observation`
The main user annotation. Extends MUDDIObject with:
```sql
userid text NOT NULL                      -- who created it
notes text
expirydate timestamptz
title text, userreference text
estimatedbackfilldate date
impactonworks text
observationcategory text
visibilitystatus text NOT NULL            -- who can see it
scopeofsharing text NOT NULL              -- sharing scope
potentialsensitivity boolean DEFAULT FALSE
originatingorganisationid_fk varchar(38)  -- which org the user belongs to
onbehalfoforganisationid_fk varchar(38)   -- if acting for another org
```

Supporting tables: `observationfeedback` (ratings), `observationorganisationvisibilityscope`, `observationupdatehistory`.

### `wronglyrecordedobject`
Flags that a specific asset record is incorrect. The `wronglyrecordedobject` table itself is observation-shaped — it carries the same user-annotation fields as `observation`:
```sql
userid text NOT NULL
notes text
observationcategory text
visibilitystatus text NOT NULL
scopeofsharing text NOT NULL
-- ...plus the rest of the observation base
```
The link to the problematic object lives on a separate junction table, `relationship_wronglyrecordedobject`, which records what's wrong and which property:
```sql
linkedwroid text NOT NULL           -- the wronglyrecordedobject record
linkedobjectid, linkedobjecttable   -- what's wrong (polymorphic id + table)
targetproperty text NOT NULL        -- which attribute is wrong
```

### `unidentifiedburiedobject`
Records a buried object encountered during excavation that couldn't be matched to any known asset. Full MUDDIObject base plus extended survey fields including geometry.

### `utilitysurvey` / `utilitysurveysite`
Records of utility survey activities. `utilitysurvey` captures the survey event; `utilitysurveysite` records individual site locations within a survey. Both linked to assets via `relationship_objecttosurvey`.

---

## The `custombackdrop` Schema

Five generic tables for custom spatial context layers that don't fit the utility data model — e.g. custom map annotations, imported raster imagery, local backdrop geometry.

| Table | Geometry |
|-------|---------|
| `backdroparea` | Polygon |
| `backdropline` | LineString |
| `backdroppoint` | Point |
| `backdropraster` | Raster reference |
| `backdroptext` | Text label with location |

---

## The 40 Codelists

All controlled vocabularies live in the `codelists_transformation` schema. Every codelist table has the same shape:
```sql
systemid varchar(38) PK
systemloaddate timestamptz NOT NULL
datelastupdated timestamptz NOT NULL
versionnumber text       -- which model version this value was introduced in
versiondate timestamptz  -- when it was last updated
value text NOT NULL      -- the actual string value
```
Some codelists have an additional `applicabledomains` column (e.g. `conveyancecategoryvalue`) that restricts which utility types can use each value.

| Codelist | Example values |
|----------|---------------|
| `accesstypevalue` | Access Chamber, Access Plate, Pig Trap, Other |
| `containertypevalue` | Duct, Tunnel, Pit, Vault, Conduit, Trench, Utilidor, Vent... |
| `conveyancecategoryvalue` | Distribution, Transmission, Collection, Auxiliary, Fire... |
| `conveyancemethodvalue` | Gravity, Pressurised, Pumped... |
| `depthmethodvalue` | Surveyed, Estimated, Calculated, Unknown... |
| `enhancedmeasurestypevalue` | CAT Scan, GPR, Vacuum Excavation... |
| `featuretypevalue` | Classifies what kind of feature this row represents |
| `horizontalmeasurementmethodvalue` | Surveyed, GPS, Estimated, Digitised... |
| `installationmethodtypevalue` | Open Cut, Directional Drill, Moling, Pipe Bursting... |
| `lifecyclestatusvalue` | Active, Retired, Superseded, Unknown |
| `materialvalue` | Steel, HDPE, PVC-U, Copper, Concrete, Cast Iron... |
| `materialgradevalue` | Steel grades (Gas-specific) |
| `networkaccessorytypevalue` | Access, Container, Support, Physical Protection |
| `networklinkcomponenttypevalue` | Pipe, Cable, Duct, Channel, Sewer... |
| `networknodecomponenttypevalue` | Valve, Junction, Meter, Fitting, Manhole... |
| `nonutilityobjecttypevalue` | Drain, Foundation, Culvert, Unknown Object... |
| `operationalstatusvalue` | In Use, Abandoned, Proposed, Under Construction... |
| `physicalprotectiontypevalue` | Sleeve, Casing, Concrete Surround... |
| `qualitylevelvalue` | A (highest), B, C, D (lowest) — based on PAS 128 |
| `sewerdepthtypevalue` | Invert, Crown, Obvert (Sewer-specific) |
| `sitetypevalue` | Substation, Pumping Station, Treatment Works... |
| `supporttypevalue` | Marker Post, Cathodic Protection Post... |
| `undergroundstatusvalue` | Underground, Surface, Above Ground, Unknown |
| `utilitytypevalue` | Electricity, Gas, Water, Sewer, Drainage, Telco, Thermal, Fuel And Chemicals, Transport Signalling |
| `utilitysubtypevalue` | High Voltage, Low Voltage, Low Pressure, Medium Pressure... |
| `utilitysurveytypevalue` | Types of survey (PAS 128 levels) |

---

## Key Design Patterns to Understand

### 1. Flattened inheritance, not table inheritance
The model does not use PostgreSQL's `INHERITS` feature. Every concrete table is a standalone flat table with all columns copied in. This means:
- Simple queries — no joins needed to get all attributes
- Redundancy — ~135 tables with the same ~93-column base repeated
- Easy to export/import a single table as a complete record

### 2. Soft references in relationship tables
No database foreign key constraints on the relationship tables' `linkedXXXid` / `linkedXXXtable` pairs. The `table` column makes associations polymorphic — one relationship table can link objects across any pair of feature tables. The trade-off is that referential integrity is enforced by application logic, not the database.

### 3. Utility-specific columns are minimal
The 9 utility types are nearly identical in structure. Only gas and fuel-and-chemicals (the same four pipeline safety flags — `materialgrade, slabbing, tape, mahp`), electricity (operating voltage), and sewer (depth type, backdrop flag) have extra columns. Everything else is captured in the generic shared vocabulary via codelists.

### 4. `dataproviderid_fk` is mandatory on everything
The single most important FK in the model — every record must know which organisation submitted it. This is the anchor for data governance and access control. `organisations.organisation` has no `dataproviderid_fk` itself (it *is* the provider).

### 5. Composite types are flattened to column pairs
`depth_depth real` + `depth_unitofmeasure text` = one `MUDDIDepthType`. This is consistent throughout — always `{attribute}_{field}`. Makes the tables wide but keeps them relational.
