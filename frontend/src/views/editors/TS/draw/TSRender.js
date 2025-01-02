import {
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
    isInternalState, 
    isEndingState, 
    isStartingState } from '../elements/TSElementFactory';
  


var RENDER_PRIORITY = 1500;
const LABEL_COLOUR = "#01031b"
const INNER_ICON_FILL_COLOUR = "#222222"
const TEXT_STYLE = {
      fontFamily: 'Arial, sans-serif',
      fontSize: 8,
      fontWeight: 'normal',
      textLength: 30,
      textAnchor: 'middle',
      dominantBaseline: 'middle'
}

export default class TSRenderer extends  BaseRenderer {
    
    constructor(eventBus, styles, canvas) {
        super(eventBus, 1)
        var self = this;

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
                strokeLinejoin: 'round',});
        this.INTERNAL_SHAPE_STYLE = styles.style(
            { fill: '#f5f5f5', stroke: '#222222', strokeWidth: 2 }
        );
        this.STARTING_SHAPE_STYLE = styles.style(
            { fill: '#67f5a9', stroke: '#222222', strokeWidth: 2 }
        );
        this.ENDING_SHAPE_STYLE = styles.style(
            { fill: '#f58867', stroke: '#222222', strokeWidth: 2 }
        );

        var defs = svgCreate("defs", {})
        var marker = svgCreate("marker", {
            id: 'arrow',
            viewbox: '0 0 10 10',
            refX: 11,
            refY: 2.5,
            markerWidth: 5,
            markerHeight: 5,
            strokeWidth: 0,
            orient: 'auto-start-reverse',
            stroke: '#303c4a',
            fill: '#303c4a'
        })
        var markerPath = svgCreate("path", {
            d: "M 0 0 L 5 2.5 L 0 5 z"
        })
        svgAppend(marker, markerPath)
        svgAppend(defs, marker)
        svgAppend(canvas.getActiveLayer(), defs)
    }

    canRender(element){
        return true;
    }

    drawShape(visuals, element, attrs) {
            // init
            var svgElements;
            var group = svgCreate("g", {})
            
            // construct the svg elements for the state
            if (isStartingState(element)){
                svgElements = this.drawStartingState(element)
            } else if (isInternalState(element)){
                svgElements = this.drawInternalState(element)
            } else if (isEndingState(element)){
                svgElements = this.drawEndingState(element)
            } else {
                console.log("could not identify state while drawing.")
                svgElements = this.drawInternalState(element)
            }

            // check for label
            if (element.stateLabel != null){
                svgElements.push(
                    this.drawStateLabel(element)
                )
            }
            
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
        return svg
    }
    
    createShadowForState(svgElement){
        var svg = svgClone(svgElement)
        svgAttr(svg,{
            opacity: 0.25,
            cx: parseFloat(svgElement.attributes.cx.nodeValue) + 2.5,
            cy: parseFloat(svgElement.attributes.cy.nodeValue) + 2.5
        })
        return svg
    }

    drawInternalState(element){
        var state = this.createCircleForState(
            element, this.INTERNAL_SHAPE_STYLE)
        var shadow = this.createShadowForState(state)

        return [shadow, state]
    }

    drawStartingState(element){
        var state = this.createCircleForState(
            element, this.STARTING_SHAPE_STYLE)
        var shadow = this.createShadowForState(state)
        var icon = this.createStartingIcon(element)

        return [shadow, state, icon]
    }

    createStartingIcon(element){
        var w = (element.r/ 2.0)
        var svg = svgCreate('polygon', 
            {
                points: [
                    {x: element.cx + 2.5 - w, y: element.cy- w},
                    {x: element.cx + 2.5 + w, y:element.cy},
                    {x: element.cx + 2.5 - w, y: element.cy + w}
                ].reduce((pv,cv) => {
                    return "" + pv + cv.x + "," + cv.y + " "
                }, ""), 
                fill: INNER_ICON_FILL_COLOUR
            }
        )
        return svg
    }

    drawEndingState(element){
        var inner = this.createCircleForState(
            element, this.ENDING_SHAPE_STYLE)
        var outer = svgClone(inner)
        svgAttr(outer, {
            r: element.r + 4
        })
        var shadow = this.createShadowForState(outer)
        var icon = this.createEndingIcon(element)

        return [shadow, outer, inner , icon]
    }

    createEndingIcon(element){
        var w = (element.r/ 2.0)
        var svg = svgCreate('polygon', 
            {
                points: [
                    {x: element.cx - w, y: element.cy - w},
                    {x: element.cx + w, y: element.cy - w},
                    {x: element.cx + w, y: element.cy + w},
                    {x: element.cx - w, y: element.cy + w}
                ].reduce((pv,cv) => {
                    return "" + pv + cv.x + "," + cv.y + " "
                }, ""), 
                fill: INNER_ICON_FILL_COLOUR
            }
        )
        return svg
    }

    drawStateLabel(element){
        var text = svgCreate('text',
            assign({
                x: 20,
                y: 20,
                fill: LABEL_COLOUR,
            }, TEXT_STYLE)
        )

        if (!isInternalState(element)){
            svgAttr(text,
                {
                fill: "#F8F8FF"
            })
        }

        text.textContent = element.stateLabel
        return text
    }

    drawConnection(visuals, connection, attrs) {
            var line = createLine(
                connection.waypoints, assign({
                    id: connection.id
                }, 
                this.CONNECTION_STYLE, attrs || {})
            );
            var pather = createLine(
                connection.waypoints.map(p => {
                    return {x:p.x+5, y:p.y-5}
                }), {
                    id: "d"+connection.id
                })
            
            svgAttr(
                line,
                {'marker-end' : "url(#arrow)"}
            )
            var text = svgCreate('text', {})
            var textPath = svgCreate('textPath', assign({
                href: "#d"+connection.id,
                startOffset: "50%",
                fill: '#303c4a',
            }, TEXT_STYLE))
            textPath.textContent = connection.arcLabel
            svgAppend(visuals, pather);
            svgAppend(visuals, line);
            svgAppend(text, textPath)
            svgAppend(visuals, text)
            return line;
    };

    
}

TSRenderer.$inject = [
    'eventBus',
    'styles',
    'canvas'
]