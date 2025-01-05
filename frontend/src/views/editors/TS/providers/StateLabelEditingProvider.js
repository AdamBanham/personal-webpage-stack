import {
    assign
} from 'min-dash';


import {
isInternalState,
isStartingState,
isEndingState
} from '../elements/TSElementFactory'

// helpers //////////
function isEmptyText(label) {
    return !label || !label.trim();
}

function isState(element) {
    return isInternalState(element) || isStartingState(element)
        || isEndingState(element)
}

function getLabel(element){
  if (isState(element))
    return element.stateLabel || null
  return element.arcLabel || null
}
  
var HIGH_PRIORITY = 2000;
  
export default function LabelEditingProvider(
      eventBus, factory, canvas, directEditing,
      modeling, textRenderer) {
  
    this._factory = factory;
    this._canvas = canvas;
    this._modeling = modeling;
    this._textRenderer = textRenderer;
  
    directEditing.registerProvider(this);
  
    // listen to dblclick on non-root elements
    eventBus.on('element.dblclick', function(event) {
      activateDirectEdit(event.element, true);
    });
  
    // complete on followup canvas operation
    eventBus.on([
      'autoPlace.start',
      'canvas.viewbox.changing',
      'drag.init',
      'element.mousedown',
      'popupMenu.open',
      'root.set',
      'selection.changed'
    ], function() {
      if (directEditing.isActive()) {
        directEditing.complete();
      }
    });
  
    eventBus.on([
      'shape.remove',
      'connection.remove'
    ], HIGH_PRIORITY, function(event) {
  
      if (directEditing.isActive(event.element)) {
        directEditing.cancel();
      }
    });
  
    // cancel on command stack changes
    eventBus.on([ 'commandStack.changed' ], function(e) {
      if (directEditing.isActive()) {
        directEditing.cancel();
      }
    });
  
  
    eventBus.on('directEditing.activate', function(event) {
    //   resizeHandles.removeResizers();
    });
  
    eventBus.on('create.end', 500, function(event) {
  
      var context = event.context,
          element = context.shape,
          canExecute = event.context.canExecute,
          isTouch = event.isTouch;
  
      if (isTouch) {
        return;
      }
  
      if (!canExecute) {
        return;
      }
  
      if (context.hints && context.hints.createElementsBehavior === false) {
        return;
      }
  
      activateDirectEdit(element);
    });
  
    eventBus.on('autoPlace.end', 500, function(event) {
      activateDirectEdit(event.shape);
    });
  
  
    function activateDirectEdit(element, force) {
        directEditing.activate(element);
    }
  
  }
  
  LabelEditingProvider.$inject = [
    'eventBus',
    'elementFactory',
    'canvas',
    'directEditing',
    'modeling',
    // 'resizeHandles',
    'textRenderer'
  ];
  
  
  /**
   * Activate direct editing for activities and text annotations.
   *
   * @param {Element} element
   *
   * @return { {
   *   text: string;
   *   options?: {
   *     autoResize?: boolean;
   *     centerVertically?: boolean;
   *     resizable?: boolean;
   *   }
   * } & DirectEditingContext }
   */
  LabelEditingProvider.prototype.activate = function(element) {
  
    // text
    var text = getLabel(element);
  
    if (text === undefined) {
      return;
    }
  
    var context = {
      text: text
    };
  
    // bounds
    var bounds = this.getEditingBBox(element);
  
    assign(context, bounds);
  
    var options = {};
    var style = context.style || {};
  
    // Remove background and border
    assign(style, {
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: '3px',
      'border-radius': '5px',
      color: 'red',
      border: null
    });
  
    assign(context, {
      options: options,
      style: style
    });
  
    return context;
  };
  
  
  /**
   * Get the editing bounding box based on the element's size and position.
   *
   * @param {Element} element
   *
   * @return {DirectEditingContext}
   */
  LabelEditingProvider.prototype.getEditingBBox = function(element) {
    var canvas = this._canvas;
  
    var target = element.label || element;
  
    var bbox = canvas.getAbsoluteBBox(target);
  
    var mid = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };
  
    // default position
    var bounds = { x: bbox.x, y: bbox.y };
  
    var zoom = canvas.zoom();
  
    var defaultStyle = this._textRenderer.getDefaultStyle(),
        externalStyle = this._textRenderer.getExternalStyle();
  
    // take zoom into account
    var externalFontSize = externalStyle.fontSize * zoom,
        externalLineHeight = externalStyle.lineHeight,
        defaultFontSize = defaultStyle.fontSize * zoom,
        defaultLineHeight = defaultStyle.lineHeight;
  
    var style = defaultStyle;

    return { bounds: bounds, style: style };
  };
  
  
  LabelEditingProvider.prototype.update = function(
      element, newLabel,
      activeContextText, bounds) {
  
    var newBounds,
        bbox;
  
    if (isEmptyText(newLabel)) {
      newLabel = null;
    }
    if (isState(element)){
      element.stateLabel = newLabel
      this._modeling.moveShape(element, {x:0,y:0})
    } else {
      element.arcLabel = newLabel
      this._modeling.moveShape(element, {x:0,y:0})
      this._modeling.moveShape(element.source, {x:0,y:0})
      this._modeling.moveShape(element.target, {x:0,y:0})
    }
  };