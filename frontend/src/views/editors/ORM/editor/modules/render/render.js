
import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";

const RENDER_PRIORITY = 1500;

export default class TSRenderer extends  BaseRenderer {
    
    constructor(eventBus, styles, canvas, textRender) {
        super(eventBus, 1);
        const self = this;

        const renderPriority = RENDER_PRIORITY;

        const thedraw = super.drawShape;
        eventBus.on([ 'render.shape' ], renderPriority, function(evt, context) {
            const type = evt.type,
                element = context.element,
                visuals = context.gfx,
                attrs = context.attrs;

                return thedraw(visuals, element, attrs);
        });
        const theconection = super.drawConnection;
        eventBus.on(['render.connection' ], renderPriority - 50, function(evt, context) {
            const type = evt.type,
                element = context.element,
                visuals = context.gfx,
                attrs = context.attrs;

            return theconection(visuals, element, attrs);
        });
    }


}

TSRenderer.$inject = [
    'eventBus',
    'styles',
    'canvas',
];