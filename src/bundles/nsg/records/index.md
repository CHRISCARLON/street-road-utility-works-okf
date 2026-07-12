# LSG records (`xxxx_LG.csv`)

* [Street Record (type 11)](street.md) - Defines a Street within the Local Street Gazetteer, including its identity, state, surface, extent and coordinates.
* [Street Cross Reference Record (type 12)](street_cross_reference.md) - Cross references a Street (USRN) to its associated Elementary Street Unit (ESU) Records.
* [Elementary Street Unit Record (type 13)](elementary_street_unit.md) - Defines an Elementary Street Unit, the atomic geometric section of a Street identified by its mid-point ESUID.
* [ESU Coordinate Record (type 14)](esu_coordinate.md) - Holds an individual coordinate point defining the geometry of an Elementary Street Unit.
* [Street Descriptor Record (type 15)](street_descriptor.md) - Provides the name, description and administrative context for a Street, cross referenced to a type 11 Street Record by USRN.
* [One Way Exemption Record (type 16)](one_way_exemption.md) - Records traffic types exempt from one way restrictions on an Elementary Street Unit, with applicable dates, times and periodicity.
* [Highway Dedication Record (type 17)](highway_dedication.md) - Records the type of highway dedication that applies to a section of Street (ESU), including legal dates, times and PRoW attributes.
* [LSG Metadata Record (type 29)](lsg_metadata.md) - Provides metadata describing the Local Street Gazetteer, including custodian, coordinate system, language, dates and content coverage percentages.

# ASD records (`xxxx_AD.csv`)

* [Interest Record (type 61)](interest.md) - Records an organisation's interest in a Street or part Street, its maintenance responsibility, street status and location extent.
* [Construction Record (type 62)](construction.md) - Records the construction and reinstatement characteristics of a Street or part Street as defined in the SROH codes of practice.
* [Special Designation Record (type 63)](special_designation.md) - Records Special Designations (such as Traffic Sensitive Streets, Special Engineering Difficulties or Special Events) applied to a Street.
* [Height, Width and Weight Designation Record (type 64)](height_width_weight_designation.md) - Records Height, Width and Weight (HWW) restrictions that apply to a Street, such as bridge height or weight limits.
* [PRoW Record (type 66)](prow.md) - Public Rights of Way record describing the dedication, access rights, status and definitive statement details of a PRoW linked to a numbered Street.
* [ASD Coordinate Record (type 67)](asd_coordinate.md) - Captures the individual coordinate points that define the geometry (line or polygon) of an ASD or PRoW Record.
* [ASD Metadata Record (type 69)](asd_metadata.md) - Provides gazetteer-level metadata for the ASD, including custodian details, coordinate system and the percentage completeness of each ASD data category present in GeoPlace.

# Common records

* [Header Record (type 10)](header.md) - Opening record of every DTF transfer file, identifying the supplying organisation, creation date and DTF version.
* [Trailer Record (type 99)](trailer.md) - Closing record of every DTF transfer file, giving the record count and confirming the last volume.
