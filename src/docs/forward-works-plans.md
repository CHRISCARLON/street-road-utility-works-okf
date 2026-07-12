---
type: Reference
title: "Forward Works Plans: The Case for a Standard"
description: Why NRSWA street-works coordination depends on shared forward planning, why that sharing stays voluntary today, and how a standardised exchange format — following the NUAR precedent — could unlock it.
tags: ["reading", "nrswa", "forward-plans"]
---

The UK has a track record of using **data standards** to deliver the provisions of
the [New Roads and Street Works Act 1991 (NRSWA)](https://www.legislation.gov.uk/ukpga/1991/22/contents),
improving how street and road works are managed. This note sets out that track
record, the coordination duties NRSWA creates, and the gap that a standardised
**forward works plan** exchange could fill — the gap the forthcoming MUDDI
extension is aimed at.

---

## Standards already underpin NRSWA

Two standards-based data sources already do heavy lifting under NRSWA:

- **The National Underground Asset Register (NUAR)** improves how undertakers
  fulfil provisions such as **NRSWA s.79** (*Information in relation to
  apparatus*) and **NRSWA s.80** (*Duties to report missing or incorrect
  information in relation to apparatus*) — both centred on the recording and
  location of apparatus. Evidence of this is in the NRSWA amendments made in
  [part 3 of the Data Use and Access Act 2025](https://www.legislation.gov.uk/ukpga/2025/18/part/3),
  which puts NUAR on a statutory footing: undertakers must record prescribed
  apparatus information, upload existing records during an initial upload period,
  keep NUAR updated within prescribed timeframes, and report missing or incorrect
  data — with access, licensing and penalties set by regulation.

- **The National Street Gazetteer (NSG)** — and the **BS7666** standard it
  implements, with its **Unique Street Reference Numbers (USRNs)** — was defined
  as an essential data source supporting many NRSWA provisions. **Section 53**
  (*The street works register*) is particularly important, as it concerns the
  provision of a register of street works. Concrete evidence is in
  [SI 2007/1951 Reg. 4(3)](https://www.legislation.gov.uk/uksi/2007/1951/regulation/4/made),
  where BS7666 is named directly as the standard to be respected when referencing
  streets. The NSG was
  [confirmed as the required data source](https://www.geoplace.co.uk/press/2006/nsg-confirmed-as-the-required-data-source-for-notification-of-street-works)
  for notification of street works. The [NSG bundle](/bundles/nsg/) in this
  catalogue captures the DTF 8.1 format that Local Highway Authorities use to
  submit exactly this street data.

## NRSWA's coordination duties

NRSWA also provides a legal basis for coordinating street works:

- **Section 59** (*General duty of street authority to co-ordinate works*) —
  street authorities must use best endeavours to **co-ordinate** street works of
  all kinds in their area.
- **Section 60** (*General duty of undertakers to co-operate*) — undertakers must
  use best endeavours to **co-operate** with the street authority and with each
  other.

Coordination and cooperation both depend on parties knowing what others *plan* to
do. That is where the current arrangements fall short.

## The forward-planning gap

**Recommendation 9** from the UK Department for Transport's recent select committee
on managing the impact of street works focused on the difficulties of
collaboration and how future work plans are shared. The government's response
acknowledged the problem and set out why sharing remains limited:

- Sharing forward planning information on **Street Manager is encouraged, not
  mandatory**.
- The non-mandatory status stems from reliance on **voluntary cooperation** and
  **commercial sensitivity**.
- **Broadband/telco operators** are particularly reluctant, as forward plans could
  disclose expansion plans to competitors.
- Forward plans are **inherently unstable** — funding cycles, customer demand and
  planning approvals cause frequent change.

So the coordination duties in ss.59–60 exist, but the information that would make
them effective is shared only voluntarily, held back by commercial risk and the
volatile nature of the plans themselves.

## What a standard could unlock

An **approved, standardised form for exchanging forward works plans** could help
address both blockers at once:

- **Commercial sensitivity** — a shared schema can carry access controls and
  agreed levels of disclosure, so operators reveal what coordination needs without
  exposing competitive strategy.
- **Instability** — a standard model can represent plans as **provisional and
  versioned**, with confidence and change semantics built in, rather than treating
  a forward plan as a firm commitment.

**NUAR is the precedent.** It is a successful example of a similar intervention in
the same sector: it proved that sensitive infrastructure data can be collected and
shared **at scale**, with access controls that satisfy both commercial and security
concerns. A forward-works-plan standard would apply the same pattern to the *when*
and *what next* of works, complementing NUAR's *where*.

## Not just plans — capacity too

Forward plans are one half of a broader **Coordination and Capacity** theme. The
other half is **capacity**: the standard, controlled sharing of what assets and
networks can *accommodate*. Two senses matter:

- **Asset-hosting capacity** — whether a specific asset can host or contain
  another. For example, whether a streetlight can carry telecoms equipment, or a
  conduit (a duct or an abandoned pipe) can take another cable or sub-conduit.
- **Network-serving capacity** — the current or future ability of a
  telecommunications, utility or transport network to serve **additional demand**,
  such as a new housing development.

Crucially, **capacity is not a static property**. It varies over time and with the
question being asked, so a data model has to represent capacity as something
*calculated, estimated or inferred* — and, critically, **linked to physical
locations and assets**. Tying capacity information to real assets is exactly the
gap that interoperability with a model like MUDDI can close.

## Coming soon: the MUDDI extension

A **MUDDI model extension for forward plans and capacity reporting** is in
development, addressing the Coordination **and** Capacity theme together. It will
extend the [MUDDI conceptual model](/bundles/muddi/conceptual/) to represent both
**planned and future works** that may impact the subsurface *and* the information
needed to **calculate, estimate or infer the capacity** of assets and networks —
in a standard, shareable form, carrying the versioning and access-control semantics
that commercial sensitivity and plan instability demand. When published, it will
appear in this catalogue as an OKF bundle.

---

## Sources

- [New Roads and Street Works Act 1991](https://www.legislation.gov.uk/ukpga/1991/22/contents)
- [Data Use and Access Act 2025, part 3](https://www.legislation.gov.uk/ukpga/2025/18/part/3)
- [SI 2007/1951 Reg. 4(3)](https://www.legislation.gov.uk/uksi/2007/1951/regulation/4/made)
- [GeoPlace: NSG confirmed as the required data source for notification of street works](https://www.geoplace.co.uk/press/2006/nsg-confirmed-as-the-required-data-source-for-notification-of-street-works)
