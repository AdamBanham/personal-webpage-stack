import {
    assign
} from 'min-dash';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import {
    getDistancePointPoint,
    rotateVector,
    getAngle
  } from 'diagram-js/lib/features/bendpoints/GeometricUtil'

import {
  getNewAttachPoint
} from 'diagram-js/lib/util/AttachUtil';

import {
  getMid,
  roundPoint
} from 'diagram-js/lib/layout/LayoutUtil';

import {
  delta
} from 'diagram-js/lib/util/PositionUtil';

import {
  sortBy
} from 'min-dash';

var sqrt = Math.sqrt,
    min = Math.min,
    max = Math.max,
    abs = Math.abs;

function sq(n) {
    return Math.pow(n, 2);
}

var EQUAL_THRESHOLD = 0.1;

class LabelBehaviour extends CommandInterceptor {

    constructor(eventBus, modeling, factory, textRenderer){
        super(eventBus)

        // have labels move around when connections move
        var self = this
        this.postExecute([
            'connection.layout',
            'connection.updateWaypoints'
          ], function(event) {
            var context = event.context,
                hints = context.hints || {};
        
            if (hints.labelBehavior === false) {
              return;
            }
        
            var connection = context.connection,
                label = connection.label,
                labelAdjustment;
        
            // handle missing label as well as the case
            // that the label parent does not exist (yet),
            // because it is being pasted / created via multi element create
            //
            // Cf. https://github.com/bpmn-io/bpmn-js/pull/1227
            if (!label || !label.parent) {
              return;
            }
        
            labelAdjustment = self.getVisibleLabelAdjustment(event);
        
            modeling.moveShape(label, labelAdjustment);
          });
    }

    getVisibleLabelAdjustment(event) {

        var context = event.context,
            connection = context.connection,
            label = connection.label,
            hints = assign({}, context.hints),
            newWaypoints = context.newWaypoints || connection.waypoints,
            oldWaypoints = context.oldWaypoints;
    
    
        if (typeof hints.startChanged === 'undefined') {
          hints.startChanged = !!hints.connectionStart;
        }
    
        if (typeof hints.endChanged === 'undefined') {
          hints.endChanged = !!hints.connectionEnd;
        }
    
        return this.getLabelAdjustment(label, newWaypoints, oldWaypoints, hints);
    }

    getLabelAdjustment(label, newWaypoints, oldWaypoints, hints) {
        var labelPosition = getMid(label);
      
        return this.getAnchorPointAdjustment(labelPosition, newWaypoints, oldWaypoints, hints).delta;
    }

    findNewLineStartIndex(oldWaypoints, newWaypoints, attachment, hints) {

        var index = attachment.segmentIndex;
      
        var offset = newWaypoints.length - oldWaypoints.length;
      
        // segmentMove happened
        if (hints.segmentMove) {
      
          var oldSegmentStartIndex = hints.segmentMove.segmentStartIndex,
              newSegmentStartIndex = hints.segmentMove.newSegmentStartIndex;
      
          // if point was on moved segment return new segment index
          if (index === oldSegmentStartIndex) {
            return newSegmentStartIndex;
          }
      
          // point is after new segment index
          if (index >= newSegmentStartIndex) {
            return (index + offset < newSegmentStartIndex) ? newSegmentStartIndex : index + offset;
          }
      
          // if point is before new segment index
          return index;
        }
      
        // bendpointMove happened
        if (hints.bendpointMove) {
      
          var insert = hints.bendpointMove.insert,
              bendpointIndex = hints.bendpointMove.bendpointIndex,
              newIndex;
      
          // waypoints length didnt change
          if (offset === 0) {
            return index;
          }
      
          // point behind new/removed bendpoint
          if (index >= bendpointIndex) {
            newIndex = insert ? index + 1 : index - 1;
          }
      
          // point before new/removed bendpoint
          if (index < bendpointIndex) {
      
            newIndex = index;
      
            // decide point should take right or left segment
            if (insert && attachment.type !== 'bendpoint' && bendpointIndex - 1 === index) {
      
              var rel = relativePositionMidWaypoint(newWaypoints, bendpointIndex);
      
              if (rel < attachment.relativeLocation) {
                newIndex++;
              }
            }
          }
      
          return newIndex;
        }
      
        // start/end changed
        if (offset === 0) {
          return index;
        }
      
        if (hints.connectionStart && index === 0) {
          return 0;
        }
      
        if (hints.connectionEnd && index === oldWaypoints.length - 2) {
          return newWaypoints.length - 2;
        }
      
        // if nothing fits, take the middle segment
        return Math.floor((newWaypoints.length - 2) / 2);
      }
      

    getAnchorPointAdjustment(position, newWaypoints, oldWaypoints, hints) {
        var dx = 0,
            dy = 0;
      
        var oldPosition = {
          point: position,
          delta: { x: 0, y: 0 }
        };
      
        // get closest attachment
        var attachment = getAttachment(position, oldWaypoints),
            oldLabelLineIndex = attachment.segmentIndex,
            newLabelLineIndex = findNewLineStartIndex(oldWaypoints, newWaypoints, attachment, hints);
      
      
        // should never happen
        // TODO(@janstuemmel): throw an error here when connectionSegmentMove is refactored
        if (newLabelLineIndex < 0 ||
            newLabelLineIndex > newWaypoints.length - 2 ||
            newLabelLineIndex === null) {
          return oldPosition;
        }
      
        var oldLabelLine = getLine(oldWaypoints, oldLabelLineIndex),
            newLabelLine = getLine(newWaypoints, newLabelLineIndex),
            oldFoot = attachment.position;
      
        var relativeFootPosition = getRelativeFootPosition(oldLabelLine, oldFoot),
            angleDelta = getAngleDelta(oldLabelLine, newLabelLine);
      
        // special rule if label on bendpoint
        if (attachment.type === 'bendpoint') {
      
          var offset = newWaypoints.length - oldWaypoints.length,
              oldBendpointIndex = attachment.bendpointIndex,
              oldBendpoint = oldWaypoints[oldBendpointIndex];
      
          // bendpoint position hasn't changed, return same position
          if (newWaypoints.indexOf(oldBendpoint) !== -1) {
            return oldPosition;
          }
      
          // new bendpoint and old bendpoint have same index, then just return the offset
          if (offset === 0) {
            var newBendpoint = newWaypoints[oldBendpointIndex];
      
            dx = newBendpoint.x - attachment.position.x,
            dy = newBendpoint.y - attachment.position.y;
      
            return {
              delta: {
                x: dx,
                y: dy
              },
              point: {
                x: position.x + dx,
                y: position.y + dy
              }
            };
          }
      
          // if bendpoints get removed
          if (offset < 0 && oldBendpointIndex !== 0 && oldBendpointIndex < oldWaypoints.length - 1) {
            relativeFootPosition = relativePositionMidWaypoint(oldWaypoints, oldBendpointIndex);
          }
        }
      
        var newFoot = {
          x: (newLabelLine[1].x - newLabelLine[0].x) * relativeFootPosition + newLabelLine[0].x,
          y: (newLabelLine[1].y - newLabelLine[0].y) * relativeFootPosition + newLabelLine[0].y
        };
      
        // the rotated vector to label
        var newLabelVector = rotateVector({
          x: position.x - oldFoot.x,
          y: position.y - oldFoot.y
        }, angleDelta);
      
        // the new relative position
        dx = newFoot.x + newLabelVector.x - position.x;
        dy = newFoot.y + newLabelVector.y - position.y;
      
        return {
          point: roundPoint(newFoot),
          delta: roundPoint({
            x: dx,
            y: dy
          })
        };
    }
}

function getRelativeFootPosition(line, foot) {

    var length = getDistancePointPoint(line[0], line[1]),
        lengthToFoot = getDistancePointPoint(line[0], foot);
  
    return length === 0 ? 0 : lengthToFoot / length;
}

function getAngleDelta(l1, l2) {
    var a1 = getAngle(l1),
        a2 = getAngle(l2);
    return a2 - a1;
  }

function relativePositionMidWaypoint(waypoints, idx) {

    var distanceSegment1 = getDistancePointPoint(waypoints[idx - 1], waypoints[idx]),
        distanceSegment2 = getDistancePointPoint(waypoints[idx], waypoints[idx + 1]);
  
    var relativePosition = distanceSegment1 / (distanceSegment1 + distanceSegment2);
  
    return relativePosition;
  }

function getLine(waypoints, idx) {
    return [ waypoints[idx], waypoints[idx + 1] ];
}

function getDistance(p1, p2) {
    return sqrt(sq(p1.x - p2.x) + sq(p1.y - p2.y));
}

function pointsEqual(p1, p2) {
    return (
        abs(p1.x - p2.x) <= EQUAL_THRESHOLD &&
        abs(p1.y - p2.y) <= EQUAL_THRESHOLD
    );
}

function isPointInSegment(p, segmentStart, segmentEnd) {
    return (
      fenced(p.x, segmentStart.x, segmentEnd.x) &&
      fenced(p.y, segmentStart.y, segmentEnd.y)
    );
}

function fenced(n, rangeStart, rangeEnd) {
    // use matching threshold to work around
    // precision errors in intersection computation
  
    return (
      n >= min(rangeStart, rangeEnd) - EQUAL_THRESHOLD &&
      n <= max(rangeStart, rangeEnd) + EQUAL_THRESHOLD
    );
}

function mid(p1, p2) {

    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2
    };
}

function findNewLineStartIndex(oldWaypoints, newWaypoints, attachment, hints) {

    var index = attachment.segmentIndex;
  
    var offset = newWaypoints.length - oldWaypoints.length;
  
    // segmentMove happened
    if (hints.segmentMove) {
  
      var oldSegmentStartIndex = hints.segmentMove.segmentStartIndex,
          newSegmentStartIndex = hints.segmentMove.newSegmentStartIndex;
  
      // if point was on moved segment return new segment index
      if (index === oldSegmentStartIndex) {
        return newSegmentStartIndex;
      }
  
      // point is after new segment index
      if (index >= newSegmentStartIndex) {
        return (index + offset < newSegmentStartIndex) ? newSegmentStartIndex : index + offset;
      }
  
      // if point is before new segment index
      return index;
    }
  
    // bendpointMove happened
    if (hints.bendpointMove) {
  
      var insert = hints.bendpointMove.insert,
          bendpointIndex = hints.bendpointMove.bendpointIndex,
          newIndex;
  
      // waypoints length didnt change
      if (offset === 0) {
        return index;
      }
  
      // point behind new/removed bendpoint
      if (index >= bendpointIndex) {
        newIndex = insert ? index + 1 : index - 1;
      }
  
      // point before new/removed bendpoint
      if (index < bendpointIndex) {
  
        newIndex = index;
  
        // decide point should take right or left segment
        if (insert && attachment.type !== 'bendpoint' && bendpointIndex - 1 === index) {
  
          var rel = relativePositionMidWaypoint(newWaypoints, bendpointIndex);
  
          if (rel < attachment.relativeLocation) {
            newIndex++;
          }
        }
      }
  
      return newIndex;
    }
  
    // start/end changed
    if (offset === 0) {
      return index;
    }
  
    if (hints.connectionStart && index === 0) {
      return 0;
    }
  
    if (hints.connectionEnd && index === oldWaypoints.length - 2) {
      return newWaypoints.length - 2;
    }
  
    // if nothing fits, take the middle segment
    return Math.floor((newWaypoints.length - 2) / 2);
}
  

function getCircleSegmentIntersections(s1, s2, cc, cr) {

    var baX = s2.x - s1.x;
    var baY = s2.y - s1.y;
    var caX = cc.x - s1.x;
    var caY = cc.y - s1.y;
  
    var a = baX * baX + baY * baY;
    var bBy2 = baX * caX + baY * caY;
    var c = caX * caX + caY * caY - cr * cr;
  
    var pBy2 = bBy2 / a;
    var q = c / a;
  
    var disc = pBy2 * pBy2 - q;
  
    // check against negative value to work around
    // negative, very close to zero results (-4e-15)
    // being produced in some environments
    if (disc < 0 && disc > -0.000001) {
      disc = 0;
    }
  
    if (disc < 0) {
      return [];
    }
  
    // if disc == 0 ... dealt with later
    var tmpSqrt = sqrt(disc);
    var abScalingFactor1 = -pBy2 + tmpSqrt;
    var abScalingFactor2 = -pBy2 - tmpSqrt;
  
    var i1 = {
      x: s1.x - baX * abScalingFactor1,
      y: s1.y - baY * abScalingFactor1
    };
  
    if (disc === 0) { // abScalingFactor1 == abScalingFactor2
      return [ i1 ];
    }
  
    var i2 = {
      x: s1.x - baX * abScalingFactor2,
      y: s1.y - baY * abScalingFactor2
    };
  
    // return only points on line segment
    return [ i1, i2 ].filter(function(p) {
      return isPointInSegment(p, s1, s2);
    });
  }
  

function getAttachment(point, line) {

    var idx = 0,
        segmentStart,
        segmentEnd,
        segmentStartDistance,
        segmentEndDistance,
        attachmentPosition,
        minDistance,
        intersections,
        attachment,
        attachmentDistance,
        closestAttachmentDistance,
        closestAttachment;
  
    for (idx = 0; idx < line.length - 1; idx++) {
  
      segmentStart = line[idx];
      segmentEnd = line[idx + 1];
  
      if (pointsEqual(segmentStart, segmentEnd)) {
        intersections = [ segmentStart ];
      } else {
        segmentStartDistance = getDistance(point, segmentStart);
        segmentEndDistance = getDistance(point, segmentEnd);
  
        minDistance = min(segmentStartDistance, segmentEndDistance);
  
        intersections = getCircleSegmentIntersections(segmentStart, segmentEnd, point, minDistance);
      }
  
      if (intersections.length < 1) {
        throw new Error('expected between [1, 2] circle -> line intersections');
      }
  
      // one intersection -> bendpoint attachment
      if (intersections.length === 1) {
        attachment = {
          type: 'bendpoint',
          position: intersections[0],
          segmentIndex: idx,
          bendpointIndex: pointsEqual(segmentStart, intersections[0]) ? idx : idx + 1
        };
      }
  
      // two intersections -> segment attachment
      if (intersections.length === 2) {
  
        attachmentPosition = mid(intersections[0], intersections[1]);
  
        attachment = {
          type: 'segment',
          position: attachmentPosition,
          segmentIndex: idx,
          relativeLocation: getDistance(segmentStart, attachmentPosition) / getDistance(segmentStart, segmentEnd)
        };
      }
  
      attachmentDistance = getDistance(attachment.position, point);
  
      if (!closestAttachment || closestAttachmentDistance > attachmentDistance) {
        closestAttachment = attachment;
        closestAttachmentDistance = attachmentDistance;
      }
    }
  
    return closestAttachment;
  }
  

LabelBehaviour.$inject = [
    'eventBus',
    'modeling',
    'elementFactory',
    'textRenderer'
]

export default LabelBehaviour