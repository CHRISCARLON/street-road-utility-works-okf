# MUDDI conceptual model

The abstract OGC **MUDDI** class model (OGC 23-024, *Model for Underground Data Definition and Integration*), generated from the published UML model. It prescribes semantics, not concrete data types — every attribute is an [Abstract Value Type](abstract-value-type.md), resolved to a concrete type by an implementing profile such as the [UK Excavation Profile feature types](/uk-excavation-profile/feature-types/index.md).

# Core Conceptual Model

* [AbstractValueType](abstract-value-type.md) - An abstract class used to represent an undetermined value type at the conceptual model level.
* [LogicalName](logical-name.md) - Mapping table for mapping entity / attribute names from target logical models back to those names used in the conceptual model.
* [MUDDIAsset](muddi-asset.md) - The parent class of built environment infrastructure that can be located, owned, operated, oriented, and consists of physical building material such as metal, plastic, or concrete.
* [MUDDIEvent](muddi-event.md) - The parent class of events (activities or tasks that take place in specific locations and time intervals with defined procedures and results) such as observations (e.g. surveys, inspections) of the real underground world, or executed updates such as changes to asset status.
* [MUDDIObject](muddi-object.md) - The root class in MUDDI of underground infrastructure, space, event, environmental unit, or other underground +/- surface features that are identified, located, typed, and about which data is maintained.
* [MUDDISpace](muddi-space.md) - The parent class of defined regions of space, typically represented by 2D polygon geometries, comprising the ground surface and/or underlying subsurface.
* [Network](network.md) - Type of MUDDIAsset representing the collection of network components comprising one network, which may be a subnetwork or subordinate network to another network.
* [NetworkAccessory](network-accessory.md) - The parent class of network accessories that play a supporting role for NetworkConveyances.
* [NetworkAsset](network-asset.md) - The parent class of network assets and components.
* [NetworkConveyance](network-conveyance.md) - Type of MUDDIAsset that participates directly in conveying a commodity.
* [NetworkLink](network-link.md) - Type of NetworkConveyance that forms a conveyance channel between two NetworkNodes.
* [NetworkNode](network-node.md) - Type of NetworkConveyance that serves as a junction and connects two or more NetworkNodes to each other.

# Extended Conceptual Model

* [Access](access.md) - Type of NetworkAccessory that provides access to NetworkConveyances.
* [Action](action.md) - Type of MUDDIEvent representing a task or other action such as a repair or calibration.
* [ChemicalUnit](chemical-unit.md) - Environmental unit pertaining to chemical properties of subsurface materials.
* [Container](container.md) - Type of NetworkAccessory that contains one or more NetworkConveyances.
* [Denotation](denotation.md) - Type of MUDDIEvent representing the assigning of a particular value to a feature property, such as a status or sensitivity property.
* [GeologicUnit](geologic-unit.md) - Environmental unit pertaining to geological characterizations of subsurface materials.
* [GeotechUnit](geotech-unit.md) - Environmental unit pertaining to geotechnical properties of subsurface materials.
* [HydroUnit](hydro-unit.md) - Environmental unit pertaining to hydrological and/or hydrogeological characteristics of subsurface materials.
* [MUDDIEnvironmentUnit](muddi-environment-unit.md) - The parent class of environmental units which represent regions of the subsurface exclusive of built assets.
* [Observation](observation.md) - Type of MUDDIEvent representing an observation of phenomena leading to estimation of the value of an observableProperty of some FeatureOfInterest.
* [PlanningArea](planning-area.md) - Represents the location and extent of region subject to specific policies, restrictions, and/or planning considerations.
* [Protection](protection.md) - Type of NetworkAccessory that provides protection such as cathodic protection to NetworkConveyances.
* [Sensor](sensor.md) - Type of NetworkAccessory comprising sensors or other ObservableProperty estimators.
* [ServiceArea](service-area.md) - Represents the typically 2D extent that is serviced by a particular network / subnetwork / subordinate network.
* [Site](site.md) - Represents the location and extent of a facility that is part of a network.
* [Structure](structure.md) - Type of built environment infrastructure that is not directly connected to a network but serves some structural role.
* [Support](support.md) - Type of NetworkAccessory that provides physical support to NetworkConveyances.
