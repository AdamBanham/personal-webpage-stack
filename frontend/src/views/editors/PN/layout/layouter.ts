import BaseLayouter from "diagram-js/lib/layout/BaseLayouter";
import { makeRect, getAngleIntersection, checkPointInRect } from "../../base/utils/geometryUtils";
import { ShapeLike } from "diagram-js/lib/model/Types";
import { getMid } from "diagram-js/lib/layout/LayoutUtil";

const shapeOffset = 20

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

        var midpoints = waypoints.slice(1, -1);

        // make the interections and enlarge them
        let sourceRect = makeRect(source),
            targetRect = makeRect(target);
        for(let shape of [sourceRect, targetRect]){
            shape.x -= shapeOffset / 2 
            shape.y -= shapeOffset / 2 
            shape.width += shapeOffset
            shape.height += shapeOffset
        }

        // if the first/last waypoint is within the rect then recompute
        // otherwise is the use to move the intersection
        let justLeft, justRight
        if (waypoints.length <= 2){
            justLeft = waypoints[0], justRight = waypoints[waypoints.length-1];
        } else {
            justLeft = midpoints[0], justRight = midpoints[midpoints.length-1];
        }
        if (checkPointInRect(justLeft, sourceRect)){
            justLeft = this.makePoint(waypoints[1])
        }
        if (checkPointInRect(justRight, targetRect)){
            justRight = this.makePoint(waypoints[waypoints.length-2])
        }
        
        // find where the vertex is for the intersection
        let srcIntersection = getAngleIntersection(justLeft, sourceRect).vertex,
            tgtIntersection = getAngleIntersection(justRight, targetRect).vertex;

        // adjust waypoints so the first and last are not within or touching
        // the source and target shapes
        let ret = [
            srcIntersection,
            ...midpoints,
            tgtIntersection
        ]
        return ret
    }

}