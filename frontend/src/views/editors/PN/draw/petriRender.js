import {
    classes as svgClasses,
    append as svgAppend,
    attr as svgAttr,
    create as svgCreate,
    clone as svgClone
  } from 'tiny-svg';

import { assign } from 'min-dash';

import BaseRenderer from "diagram-js/lib/draw/BaseRenderer"
import {
    createLine
  } from 'diagram-js/lib/util/RenderUtil';

import { 
    isPlace,
    isTransition,
    isFlow
} from '../elements/pertiElementFactory';

import {
    transitionSize, placeRadius
} from "../elements/staticShapeDesc"
  


var RENDER_PRIORITY = 1500;
const LABEL_COLOUR = "#01031b"
const INNER_ICON_FILL_COLOUR = "#222222"
const MARKED_COLOR = "#ebdf3f"
const TEXT_STYLE = {
      fontFamily: 'Arial, sans-serif',
      fontSize: 8,
      fontWeight: 'normal',
      textLength: (transitionSize) - 10,
      textAnchor: 'middle',
      dominantBaseline: 'middle'
}
const PLACE_TEXT_STYLE = {
    fontFamily: 'Arial, sans-serif',
    fontSize: 8,
    fontWeight: 'normal',
    textAnchor: 'middle',
    dominantBaseline: 'middle'
}


export default class PetriRenderer extends  BaseRenderer {
    
    constructor(eventBus, styles, canvas, textRender) {
        super(eventBus, 1)
        var self = this;
        this._textRender = textRender

        var renderPriority = RENDER_PRIORITY;

        eventBus.on([ 'render.shape' ], renderPriority, function(evt, context) {
            var type = evt.type,
                element = context.element,
                visuals = context.gfx,
                attrs = context.attrs;

            if (self.canRender(element)) {
                return self.drawShape(visuals, element, attrs);
            }
        });
        eventBus.on(['render.connection' ], renderPriority - 50, function(evt, context) {
            var type = evt.type,
                element = context.element,
                visuals = context.gfx,
                attrs = context.attrs;

            if (self.canRender(element)) {
                return self.drawConnection(visuals, element, attrs);
            }
        });

        this.CONNECTION_STYLE = styles.style(
            { strokeWidth: 3, stroke: '#303c4a', strokeLinecap: 'round',
                strokeLinejoin: 'round', fill: 'none'});
        this.PLACE_STYLE = styles.style(
            { fill: '#f5f5f5', stroke: '#222222', strokeWidth: 2 }
        );
        this.TRANSITION_STYLE = styles.style(
            { fill: '#eea159', stroke: '#222222', strokeWidth: 2 }
        );
        this.SILENT_TRANSITION_STYLE = styles.style(
            { fill: '#404040', stroke: '#222222', strokeWidth: 2 }
        );

        var defs = svgCreate("defs", {})
        this._setupMarkers(defs)
        svgAppend(canvas.getActiveLayer(), defs)
    }

    _setupMarkers(defs){
        var xOffset = ((placeRadius+5) * 2) / 5.0
        var yOffset = (((placeRadius-4) / 2)) / 5
        var marker = svgCreate("marker", {
            id: 'src-place-arrow',
            viewbox: '0 0 10 10',
            refX: xOffset,
            refY: yOffset,
            markerWidth: 5,
            markerHeight: 5,
            strokeWidth: 0,
            orient: 'auto-start-reverse',
            stroke: '#303c4a',
            fill: '#303c4a'
        })
        xOffset = (((transitionSize/2)+8) * 2) / 5.0
        yOffset = ((((transitionSize/2)-8) / 2)) / 5
        var marker2 = svgCreate("marker", {
            id: 'src-trans-arrow',
            viewbox: '0 0 10 10',
            refX: xOffset,
            refY: yOffset,
            markerWidth: 5,
            markerHeight: 5,
            strokeWidth: 0,
            orient: 'auto-start-reverse',
            stroke: '#303c4a',
            fill: '#303c4a'
        })

        xOffset = (((transitionSize/4) * 2.0) / 5.0) * 2.1
        yOffset = (((transitionSize/2) / 2.0) / 5.0) * 0.9
        var marker3 = svgCreate("marker", {
            id: 'src-silent-trans-arrow',
            viewbox: '0 0 10 10',
            refX: xOffset,
            refY: yOffset,
            markerWidth: 5,
            markerHeight: 5,
            strokeWidth: 0,
            orient: 'auto-start-reverse',
            stroke: '#303c4a',
            fill: '#303c4a'
        })
        var marker4 = svgCreate("marker", {
            id: 'connect-hover-arrow',
            viewbox: '0 0 10 10',
            refX: 2.5,
            refY: 2.5,
            markerWidth: 5,
            markerHeight: 5,
            strokeWidth: 0,
            orient: 'auto-start-reverse',
            stroke: '#303c4a',
            fill: '#2f5274'
        })
        var markerPath = svgCreate("path", {
            d: "M 0 0 L 5 2.5 L 0 5 z"
        })
        svgAppend(marker, markerPath)
        markerPath = svgCreate("path", {
            d: "M 0 0 L 5 2.5 L 0 5 z"
        })
        svgAppend(marker2, markerPath)
        markerPath = svgCreate("path", {
            d: "M 0 0 L 5 2.5 L 0 5 z"
        })
        svgAppend(marker3, markerPath)
        markerPath = svgCreate("path", {
            d: "M 0 0 L 5 2.5 L 0 5 z"
        })
        svgAppend(marker4, markerPath)
        svgAppend(defs, marker)
        svgAppend(defs, marker2)
        svgAppend(defs, marker3)
        svgAppend(defs, marker4)
    }

    canRender(element){
        return true;
    }

    trimId(id){
        return id.split('-')[0][0] + id.split('-')[1]
    }

    drawShape(visuals, element, attrs) {
            // init
            var svgElements = [];
            var group = svgCreate("g", {})
            
            // construct the svg elements for the state
            if (isPlace(element)){
                var place = this.createCircleForState(element, this.PLACE_STYLE)
                svgElements.push(
                    this.createShadowForState(place)
                )
                svgElements.push(
                    place
                )
                svgElements.push(
                    this.drawPlaceLabel(element)
                )
            } else if (isTransition(element)){
                var trans = this.drawTransition(element, this.TRANSITION_STYLE)
                svgElements.push(
                    this.drawTransitionShadow(trans)
                )
                svgElements.push(
                    trans
                )
                if (!element.silent){
                    svgElements.push(
                        this.drawTransitionLabel(element)
                    )
                } else {
                    svgElements.push(
                        this.drawPlaceLabel(element)
                    )
                }
            } else if (isFlow(element)){
                svgElements.push(
                    this._drawSimpleConnection(visuals, element, attrs)
                )
            }

            // check for label
            
            
            // append svgs and return the svg group
            for(var svg of svgElements){
                svgAppend(group, svg)
            }
            svgAppend(visuals, group)
            return group;
    };

    createCircleForState(element, style){
        var svg = svgCreate("circle", style || {})
        svgAttr(svg, 
            {
                cx: element.cx,
                cy: element.cy,
                r: element.r,
                fill: svg.fill
            }
        );
        if (element.selected) {
            svgAttr(svg,
                {fill: MARKED_COLOR}
            )
        }
        return svg
    }
    
    createShadowForState(svgElement){
        var svg = svgClone(svgElement)
        svgAttr(svg,{
            opacity: 0.25,
            cx: parseFloat(svgElement.attributes.cx.nodeValue) + (placeRadius * 0.1),
            cy: parseFloat(svgElement.attributes.cy.nodeValue) + (placeRadius * 0.1)
        })
        return svg
    }

    drawPlaceLabel(element){
        var text = svgCreate('text',
            assign({
                opacity: 0.75,
                x: -1 * placeRadius * 0.05,
                y: placeRadius * 2,
                fill: LABEL_COLOUR,
            }, PLACE_TEXT_STYLE)
        )
        text.textContent = this.trimId(element.id)
        return text
    }

    drawTransition(element, style){
        var rect = svgCreate('rect', style || {});
        svgAttr(rect,
            {x:0, y:0})
        if (element.silent){
            svgAttr(rect, 
                {
                    x: element.width / 4,
                    width: element.width /2,
                    height: element.height,
                    rx: 10
                }
            );
            svgAttr(rect, this.SILENT_TRANSITION_STYLE)
        } else {
            svgAttr(rect, 
                {
                    width: element.width,
                    height: element.height,
                    rx: 10
                }
            );
        }
        return rect
    }

    drawTransitionLabel(element){
        var text = svgCreate('text',
            assign({
                x: transitionSize/2,
                y: transitionSize/2,
                fill: LABEL_COLOUR,
            }, TEXT_STYLE)
        )
        if (element.labelText.length > 0)
            text.textContent = element.labelText
        else 
        text.textContent = element.id
        return text
    }

    drawTransitionShadow(svgElement){
        var svg = svgClone(svgElement)
        svgAttr(svg,{
            opacity: 0.25,
            x: parseFloat(svgElement.attributes.x.nodeValue) 
            + transitionSize * 0.05,
            y: parseFloat(svgElement.attributes.y.nodeValue) 
            + transitionSize * 0.05
        })
        return svg
    }

    _drawSimpleConnection(visuals, connection, attrs){
        var line = createLine(
            connection.waypoints, assign({
                id: connection.id
            }, 
            this.CONNECTION_STYLE, attrs || {})
        );
        var waypoints = connection.waypoints.slice(0,2).map(p => {
            return {x:p.x+5, y:p.y-5}
        })
        waypoints.sort(
            (a,b) => a.x - b.x
        )
        var pather = createLine(
            waypoints, {
                id: "d"+connection.id
            })
        if (!connection.target){
            svgAttr(
                line,
                {'marker-end' : "url(#connect-hover-arrow)",}
            )
        } else if (isPlace(connection.target)){
            svgAttr(
                line,
                {'marker-end' : "url(#src-place-arrow)",}
            )
        } else if (isTransition(connection.target)){
            if (connection.target.silent){
                svgAttr(
                    line,
                    {'marker-end' : "url(#src-silent-trans-arrow"}
                )
            } else
                svgAttr(
                    line,
                    {'marker-end' : "url(#src-trans-arrow)",}
                )
        }
        svgAppend(visuals, pather);
        svgAppend(visuals, line);
        return line;
    }

    drawConnection(visuals, connection, attrs) {
        return this._drawSimpleConnection(
            visuals, connection, attrs
        )
    };

    
}

PetriRenderer.$inject = [
    'eventBus',
    'styles',
    'canvas',
    'textRenderer'
]