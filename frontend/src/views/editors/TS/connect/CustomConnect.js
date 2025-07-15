import {
    getMid
  } from 'diagram-js/lib/layout/LayoutUtil';
  
  import {
    isNil,
    isObject
  } from 'min-dash';
import connect from '.';
import layout from '../layout';

var MARKER_OK = 'connect-ok',
MARKER_NOT_OK = 'connect-not-ok';
  
export default function Connect(eventBus, dragging, modeling, rules, 
    factory, canvas) {
  

    this._factory = factory
    // rules
  
    function canConnect(source, target) {
      return rules.allowed('connection.create', {
        source: source,
        target: target
      });
    }
  
    function canConnectReverse(source, target) {
      return canConnect(target, source);
    }

    function removeMarkers(element) {
      if (!element) {
        return;
      }
      canvas.removeMarker(element, MARKER_OK);
      canvas.removeMarker(element, MARKER_NOT_OK);
    }

    function updateMarkers(start, canExecute) {
      if (!start) {
        return;
      }
      removeMarkers(start);
      if (canExecute) {
        canvas.addMarker(start, MARKER_OK);
      } else {
        canvas.addMarker(start, MARKER_NOT_OK);
      }
    }

    function hasMarkers(element){
      if (!element) {
        return false;
      }
      return canvas.hasMarker(element, MARKER_OK) ||
        canvas.hasMarker(element, MARKER_NOT_OK);
    }

    function recuriseRemoveMarkers(element) {
      if (!element) {
        return;
      }
      while (hasMarkers(element)) {
        removeMarkers(element);
        element = element.parent;
        if (!element) {
          break;
        }
      }
    }
  
  
    // event handlers
  
    eventBus.on('connect.hover', function(event) {
      var context = event.context,
          start = context.start,
          hover = event.hover,
          canExecute;
  
      // cache hover state
      context.hover = hover;
  
      canExecute = context.canExecute = canConnect(start, hover);
      updateMarkers(start, canExecute);
      // ignore hover
      if (isNil(canExecute)) {
        return;
      }
  
      if (canExecute !== false) {
        context.source = start;
        context.target = hover;
  
        return;
      }
  
    });
  
    eventBus.on([ 'connect.out', ], function(event) {
      var context = event.context;
  
      context.hover = null;
      context.target = null;
  
      context.canExecute = false;

      updateMarkers(context.start, context.canExecute);
    });

    eventBus.on(['connect.move'], function(event) {
      var context = event.context;
      context.connectionEnd = {
        x: event.x,
        y: event.y
      }
      console.log(context.canExecute);
    });

    eventBus.on(['connect.cleanup'], function(event) {
      var context = event.context;
  
      context.hover = null;
      context.target = null;
  
      context.canExecute = false;

      let connection = context.getConnection();
      console.log("connect cleanup", connection);
      if (connection) {
        modeling.removeElements([connection]);
      }
      removeMarkers(context.start);
    });
  
    eventBus.on('connect.end', function(event) {
      var context = event.context,
          canExecute = context.canExecute,
          connectionStart = context.connectionStart,
          connectionEnd = context.connectionEnd,
          source = context.source,
          target = context.target;
  
      if (!canExecute) {
        return false;
      }
  
      var attrs = {
            id: context.id
          },
          hints = {
            connectionStart: isReverse(context) ? connectionEnd : connectionStart,
            connectionEnd: isReverse(context) ? connectionStart : connectionEnd,
          };
  
      if (isObject(canExecute)) {
        attrs = canExecute;
      }
      let connection = modeling.connect(source, target, attrs, hints);
      modeling.layoutConnection(connection);

      eventBus.fire('elements.changed', {
        elements: [source,target,connection],
        layout: true
      })
      modeling.moveElements([source, target, connection], { x: 0.1, y: 0.1 }, );
      modeling.moveElements([source, target, connection], { x: -0.1, y: -0.1 }, );

    });
  
  
    // API
  
    /**
     * Start connect operation.
     *
     * @param {MouseEvent|TouchEvent} event
     * @param {Element} start
     * @param {Point} [connectionStart]
     * @param {boolean} [autoActivate=false]
     */
    this.start = function(event, start, connectionStart, autoActivate) {
      if (!isObject(connectionStart)) {
        autoActivate = connectionStart;
        connectionStart = getMid(start);
      }
  
      dragging.init(event, 'connect', {
        autoActivate: autoActivate,
        data: {
          shape: {},
          context: {
            start: start,
            connectionStart: connectionStart,
            connectionEnd: connectionStart,
            canExecute: false,
            id: this._factory.getNextConnectionId()
          }
        }
      });
    };
  }
  
Connect.$inject = [
    'eventBus',
    'dragging',
    'modeling',
    'rules',
    'elementFactory',
    'canvas'
  ];
  
  
// helpers //////////
  
export function isReverse(context) {
var hover = context.hover,
    source = context.source,
    target = context.target;

return hover && source && hover === source && source !== target;
}