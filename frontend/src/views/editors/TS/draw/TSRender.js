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
    isInternalState, 
    isEndingState, 
    isStartingState,
    isState } from '../elements/TSElementFactory';

import {
    stateRadius
} from "../elements/staticShapeDesc"
  


var RENDER_PRIORITY = 1500;
const LABEL_COLOUR = "#01031b"
const INNER_ICON_FILL_COLOUR = "#222222"
const MARKED_COLOR = "#ebdf3f"
const TEXT_STYLE = {
      fontFamily: 'Arial, sans-serif',
      fontSize: 8,
      fontWeight: 'normal',
      textLength: (stateRadius * 2) - 10,
      textAnchor: 'middle',
      dominantBaseline: 'middle'
}

export default class TSRenderer extends  BaseRenderer {
    
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
            { strokeWidth: 3, stroke: '#000000', strokeLinecap: 'round',
                strokeLinejoin: 'round', fill: 'none'});
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
            refX: 4,
            refY: 2.5,
            markerWidth: 5,
            markerHeight: 5,
            strokeWidth: 0,
            orient: 'auto-start-reverse',
            stroke: '#000000',
            fill: '#000000'
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
                if (!isState(element.labelTarget)){
                    var labelAttrs = assign({
                        x: 0,
                        fitBox: true
                    }, element)
                    labelAttrs.x = labelAttrs.x - labelAttrs.width
                    var text = this._textRender.createText(
                        element.text || '', labelAttrs)
                    svgClasses(text).add('djs-label');
                    svgAppend(visuals, text);
                    return [text]
                }
                return []
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
                x: stateRadius,
                y: stateRadius,
                fill: LABEL_COLOUR,
            }, TEXT_STYLE)
        )

        if (!isInternalState(element)){
            svgAttr(text,
                {
                fill: "#F8F8FF"
            })
        }
        if (element.stateLabel.length > 0)
            text.textContent = element.stateLabel
        else 
        text.textContent = element.id
        return text
    }

    _drawSimpleConnection(visuals, connection, attrs){
        var line = createLine(
            connection.waypoints, assign({
                id: connection.id
            }, 
            this.CONNECTION_STYLE, attrs || {}),
            5
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
        
        svgAttr(
            line,
            {'marker-end' : "url(#arrow)",}
        )
        var text = svgCreate('text', {})
        var textPath = svgCreate('textPath', assign({
            href: "#d"+connection.id,
            startOffset: "50%",
            side: "right",
            fill: '#303c4a',
        }, TEXT_STYLE))
        textPath.textContent = connection.arcLabel
        svgAppend(visuals, pather);
        svgAppend(visuals, line);
        // svgAppend(text, textPath)
        svgAppend(visuals, text)
        return line;
    }

    _drawSelfLoopConnection(visuals, connection, attrs){
        // work out self loop from the src 
        var d = "M "
        var src = connection.source
        //console.log(src)
        // add src
        d += "" + (src.x + src.cx)
        d += " " + (src.y + src.cy)
        // work out equal right sides
        //((src.r) ^ 2) .  sqrt(2) = s
        var side = (src.r / 2.0) * Math.sqrt(2)
        //console.log(side)
        d += " L "
        d += "" + (src.x + src.cx + side)
        d += " " + (src.y + src.cy - side)
        d += " Q "
        d += "" + (src.x + src.cx + (src.r * 4))
        d += " " + (src.y + src.cy)
        d += " " + (src.x + src.cx + side)
        d += " " + (src.y + src.cy + side)
        d += " Z"
        //console.log(d)
        // construct line
        var line = svgCreate('path',
            {
                id: connection.id,
                d: d
            }
        )
        svgAttr(line, this.CONNECTION_STYLE)
        svgAttr(line, attrs)
        // var waypoints = [
        //     connection.waypoints[0],
        //     {},
        //     connection.waypoints[1]
        // ]
        // var line = createLine(
        //     waypoints, assign({
        //         id: connection.id
        //     }, 
        //     this.CONNECTION_STYLE, attrs || {})
        // );
        // var waypoints = connection.waypoints.slice(0,2).map(p => {
        //     return {x:p.x+5, y:p.y-5}
        // })
        // waypoints.sort(
        //     (a,b) => a.x - b.x
        // )
        // var pather = createLine(
        //     waypoints, {
        //         id: "d"+connection.id
        //     })
        var xOffset = ((side - 5) * 2.5) / 5.0
        var yOffset = (((side + side + 10) / 2) / 5) * -1.0
        var viewbox = "" + (src.x + src.cx + side)
        viewbox += " " + (src.y + src.cy + side)
        viewbox += " " + (src.x + src.cx + side + 10)
        viewbox += " " + (src.y + src.cy + side + 10)
        var marker = svgCreate("marker", {
            id: 'newArrow',
            viewbox: viewbox,
            refX: xOffset,
            refY: yOffset,
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
        svgAttr(
            line,
            {'marker-end' : "url(#newArrow)", 'stroke' : "#ba3d23"}
        )
        var text = svgCreate('text', {})
        var textPath = svgCreate('textPath', assign({
            href: "#d"+connection.id,
            startOffset: "50%",
            side: "right",
            fill: '#ba3d23',
        }, TEXT_STYLE))
        textPath.textContent = connection.arcLabel
        svgAppend(visuals, marker);
        svgAppend(visuals, line);
        svgAppend(text, textPath)
        svgAppend(visuals, text)
        return line;
    }

    drawConnection(visuals, connection, attrs) {
        return this._drawSimpleConnection(
            visuals, connection, attrs
        )
    };

    
}

TSRenderer.$inject = [
    'eventBus',
    'styles',
    'canvas',
    'textRenderer'
]