import {
    append as svgAppend,
    attr as svgAttr,
    create as svgCreate
  } from 'tiny-svg';

import { assign } from 'min-dash';

import BaseRenderer from "diagram-js/lib/draw/BaseRenderer"
import {
    componentsToPath,
    createLine
  } from 'diagram-js/lib/util/RenderUtil';

import { 
    isInternalState, 
    isEndingState, 
    isStartingState } from '../elements/TSElementFactory';
  


var RENDER_PRIORITY = 1500;

const INNER_ICON_FILL_COLOUR = "#222222"

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
            
            var circle = null; 
            var dummyCircle = null;
            var innerIcon = null;
            var w = (element.r/ 2.0)
            
            if (isStartingState(element)){
                circle = svgCreate('circle', this.STARTING_SHAPE_STYLE);
                dummyCircle = svgCreate('circle', this.STARTING_SHAPE_STYLE);
                innerIcon = svgCreate('polygon', 
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
            } else if (isInternalState(element)){
                circle = svgCreate('circle', this.INTERNAL_SHAPE_STYLE);
                dummyCircle = svgCreate('circle', this.INTERNAL_SHAPE_STYLE);
            } else if (isEndingState(element)){
                circle = svgCreate('circle', this.ENDING_SHAPE_STYLE);
                dummyCircle = svgCreate('circle', this.ENDING_SHAPE_STYLE);
                innerIcon = svgCreate('polygon', 
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
            } else {
                console.log("could not identify state while drawing.")
                circle = svgCreate('circle', this.INTERNAL_SHAPE_STYLE);
                dummyCircle = svgCreate('circle', this.INTERNAL_SHAPE_STYLE);
            }
            
            svgAttr(dummyCircle, 
                {
                    cx: element.cx+2.25,
                    cy: element.cy+5,
                    r: element.r,
                    fill: circle.fill,
                    opacity: 0.25
                }
            );
            svgAttr(circle, 
                {
                    cx: element.cx,
                    cy: element.cy,
                    r: element.r,
                    fill: circle.fill
                }
            );
            svgAppend(visuals, dummyCircle);
            svgAppend(visuals, circle);
            if (innerIcon != null){
                svgAppend(visuals, innerIcon)
            }
            return circle;
    };

    drawConnection(visuals, connection, attrs) {
            var line = createLine(
                connection.waypoints, assign({}, 
                this.CONNECTION_STYLE, attrs || {})
            );
            svgAttr(
                line,
                {'marker-end' : "url(#arrow)"}
            )
            svgAppend(visuals, line);
            return line;
    };
}

TSRenderer.$inject = [
    'eventBus',
    'styles',
    'canvas'
]