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
            return super.layoutConnection(connection, hints);
        }

        waypoints = waypoints.slice(1, waypoints.length - 1);

        const justLeft = waypoints.length > 0 ? 
            waypoints[0] : this.makePoint(target),
            justRight = waypoints.length > 0 ? 
            waypoints[waypoints.length - 1] : this.makePoint(source);

        const sourceRect = makeRect(source),
            targetRect = makeRect(target);

        const srcIntersection = getAngleIntersection(justLeft, sourceRect).vertex,
            tgtIntersection = getAngleIntersection(justRight, targetRect).vertex;

        const ret = [
            srcIntersection,
            ...waypoints,
            tgtIntersection
        ]

        return ret
    }

}