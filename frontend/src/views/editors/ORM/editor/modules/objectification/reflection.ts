import EventBus from "diagram-js/lib/core/EventBus";
import { Fact } from "../model/facts";
import { isFact } from "../model/util";

export default class ObjectificationReflection {
    static $inject = ['eventBus', 'modeling'];
    private readonly _modeling:any;

    constructor(eventBus:EventBus, modeling:any) {

        this._modeling = modeling;  

        eventBus.on('shape.move.end', (event) => {
            const data = event as any;
            const shape = data.shape;
            if (this.checkFact(shape)) {
                setTimeout(() => this.processObjectification(shape), 5);
            }
            return event;
        });

        eventBus.on('constraint.builder.simple.end', (event) => {
            const data = event as any;
            const shape = data.source;
            if (this.checkFact(shape)) {
                setTimeout(() => this.processObjectification(shape), 5);
            }
            return event;
        });

        eventBus.on('elements.changed', (event) => {
            const data = event as any;
            for (const shape of data.elements) {
                if (this.checkFact(shape)) {
                    setTimeout( () => this.processObjectification(shape), 5);
                }
            }
            return event;
        });
    }

    checkFact(shape:any) : shape is Fact {
        if ( isFact(shape) && shape.objectified ) {
            return true;
        }
        return false;
    }

    processObjectification(fact:Fact) {
        if (fact.objectification){
            const that = this;
            setTimeout(
                () => {
                    const objectification = fact.objectification;
                    objectification!.update();
                    that._modeling.sendUpdate(objectification);
                    for(const out of objectification.incoming) {
                        setTimeout(() => {
                            that._modeling.layoutConnection(out);
                            that._modeling.sendUpdate(out);
                        }, 19);
                    }
                    for(const out of objectification.outgoing) {
                        setTimeout(() => {
                            that._modeling.layoutConnection(out);
                            that._modeling.sendUpdate(out);
                        }, 10);
                    }
                }
            , 5 );
        }
    }
}

ObjectificationReflection.$inject = ['eventBus', 'modeling'];
