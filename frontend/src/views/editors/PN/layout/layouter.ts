import BaseLayouter from "diagram-js/lib/layout/BaseLayouter";
import { makeRect, getAngleIntersection } from "../../base/utils/geometryUtils";
import { ShapeLike } from "diagram-js/lib/model/Types";
import { getMid } from "diagram-js/lib/layout/LayoutUtil";

export default class Layouter extends BaseLayouter {

    constructor() {
        super();
    }

    makePoint(shape:ShapeLike) {
        return getMid(shape);
    }

    layoutConnection(connection, hints) {

        let source = connection.source,
            target = connection.target,
            waypoints = connection.waypoints || [];

        if (!source || !target) {
            return;
        }

        waypoints = waypoints.slice(1, waypoints.length - 1);

        console.log("layoutConnection called", {
            source: source,
            target: target,
            waypoints: waypoints
        });

        let justLeft = waypoints.length > 0 ? 
            waypoints[0] : this.makePoint(target),
            justRight = waypoints.length > 0 ? 
            waypoints[waypoints.length - 1] : this.makePoint(source);

        let sourceRect = makeRect(source),
            targetRect = makeRect(target);

        let srcIntersection = getAngleIntersection(justLeft, sourceRect).vertex,
            tgtIntersection = getAngleIntersection(justRight, targetRect).vertex;

        let ret = [
            srcIntersection,
            ...waypoints,
            tgtIntersection
        ]

        console.log("layout completed", ret);

        return ret
    }

}