import EventBus from "diagram-js/lib/core/EventBus";
import Exporting from "../exporter/exporter";
import LocalSessionStorage from "../localStorage/localSession";

export default class CacheReflection {

    static $inject = ["eventBus", "exporting", "localSessionStorage" ];

    _bus:EventBus
    _exporting: Exporting
    _local: LocalSessionStorage

    constructor(eventBus, exporting, local) {
        this._bus = eventBus;
        this._exporting = exporting;
        this._local = local;

        // we want this low priority so it is called after everything else
        this._bus.on("elements.changed", 250, this.reflect.bind(this));
    }

    reflect(context) {
        let system = this._exporting.fire("exporting.export");

        this._local.fire("local.storage.set", { content : system });
    }

}