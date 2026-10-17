import {
    assign
} from 'min-dash';

import  {
  isLabel
} from "diagram-js/lib/util/ModelUtil"

import {
  isTransition
} from '../elements/pertiElementFactory'

// helpers //////////
function isEmptyText(label) {
    return !label || !label.trim();
}

function isState(element) {
    return isTransition(element) 
}

function getLabel(element){
  if (isState(element))
    return element.stateLabel || null
  else if (isLabel(element))
    return element.text || null
  return element.arcLabel || null
}
  
const HIGH_PRIORITY = 2000;
  
export default function LabelEditingProvider(
      eventBus, factory, canvas, directEditing,
      modeling, textRenderer) {
  
    this._factory = factory;
    this._canvas = canvas;
    this._modeling = modeling;
    this._textRenderer = textRenderer;
    this._bus = eventBus
  
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
  
      const context = event.context,
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

    // only allow label editing on transitions
    if (!isTransition(element)){return}
    // allow allow label editing on non silent
    if(element.silent){return}
  
    // text
    const text = getLabel(element);
  
    if (text === undefined) {
      return;
    }
  
    const context = {
      text: text
    };
  
    // bounds
    const bounds = this.getEditingBBox(element);
  
    assign(context, bounds);
  
    const options = {};
    const style = context.style || {};
  
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
    const canvas = this._canvas;
  
    const target = element.label || element;
  
    const bbox = canvas.getAbsoluteBBox(target);
  
    const mid = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };
  
    // default position
    const bounds = { x: bbox.x, y: bbox.y };
  
    const zoom = canvas.zoom();
  
    const defaultStyle = this._textRenderer.getDefaultStyle(),
        externalStyle = this._textRenderer.getExternalStyle();
  
    // take zoom into account
    const externalFontSize = externalStyle.fontSize * zoom,
        externalLineHeight = externalStyle.lineHeight,
        defaultFontSize = defaultStyle.fontSize * zoom,
        defaultLineHeight = defaultStyle.lineHeight;
  
    const style = defaultStyle;

    return { bounds: bounds, style: style };
  };
  
  
  LabelEditingProvider.prototype.update = function(
      element, newLabel,
      activeContextText, bounds) {
  
    if (isEmptyText(newLabel)) {
      newLabel = "";
      return
    }
    let position;
    if (isState(element)){
      element.labelText = newLabel
      this._bus.fire('elements.changed', {elements: [element]})
      return
    } 
   
  };