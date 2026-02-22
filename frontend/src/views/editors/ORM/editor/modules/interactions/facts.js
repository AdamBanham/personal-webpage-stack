import EventBus from "diagram-js/lib/core/EventBus";
import Canvas from "diagram-js/lib/core/Canvas";

import OrmModeling from "../modeling/modeler";
import { isFact } from "../model/util";
import { transformToViewbox } from "../utils/canvasUtils";
import Debouncer from "../utils/debounce";


export default class FactInteractions {

    /**
     * 
     * @param {EventBus} eventBus 
     * @param {OrmModeling} modeling 
     * @param {Canvas} canvas
     */
    constructor(events, modeling, canvas){
        var that = this;

        // debouncer to prevent more than one refresh per 25 ms
        const updateDebouncer = new Debouncer((fact) => {
            modeling.sendUpdate(fact);
        }, 15);
        
        
        events.on('element.mousemove', 
            (event) => {
                if (isFact(event.element)) {
                    let transform = transformToViewbox(
                        canvas.viewbox(),
                        {
                            x: event.originalEvent.layerX,
                            y: event.originalEvent.layerY
                        }
                    );
                    // handle higlight hover for fact availablity
                    let fact = event.element;
                    let hovered = 
                    fact.findNearestRoleUsingPos(
                        transform.x, transform.y
                    );
                    
                    // debounce the update
                    if (!fact.hovered){
                        fact.hovered = true;
                        updateDebouncer.trigger(fact, fact);
                    }

                    if (hovered != fact.hoveredRole){
                        fact.hoveredRole = hovered
                        updateDebouncer.trigger(fact, fact);
                    }
                }
            },

        );

        events.on('element.out', 
            (event) => {
                if (isFact(event.element)) {
                    let fact = event.element;
                    
                    fact.hovered = false;
                }
            }
        );
    }
}

FactInteractions.$inject = ['eventBus', 'modeling', 'canvas'];