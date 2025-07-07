import ElementFactory from "diagram-js/lib/core/ElementFactory"

import {
    assign
} from "min-dash"

import {
    placeRadius, transitionSize
} from './staticShapeDesc';
import { getMid } from "diagram-js/lib/layout/LayoutUtil";

function isPlace(element) {
    if (!element.type) return false
    return element.type === 'place';
}

function isTransition(element) {
    if (!element.type) return false
    return element.type === 'transition';
}

function isFlow(element) {
    if (!element.type) {
        return element.id.startsWith('flow')
    }
    return element.type === 'flow';
}

class PetriElementFactory extends ElementFactory {

    constructor(eventBus,textRenderer){
        super()
        this._lastStateId = 0;
        this._lastConnectionId = 0;
        this._seen = []
        this._bus = eventBus
        this._textRenderer = textRenderer
    }

    logIdentifer(id){
        if (!this._seen.includes(id)){
            this._seen.push(id)
        }
    }

    releaseIdentifer(id){
        if (this._seen.includes(id)){
            this._seen = this._seen.filter((x) => x !== id)
        }
    }

    checkIdentifer(id){
        return !this._seen.includes(id)
    }

    getNextPlaceId(){
        var id = `place-${this._lastStateId++}`
        while (!this.checkIdentifer(id)){
            id = `place-${this._lastStateId++}`
        }
        this.logIdentifer(id)
        return id
    }

    getNextTransitionId(){
        var id = `transition-${this._lastStateId++}`
        while (!this.checkIdentifer(id)){
            id = `transition-${this._lastStateId++}`
        }
        this.logIdentifer(id)
        return id
    }

    getNextFlowId(){
        var id = `flow-${this._lastConnectionId++}`
        while (!this.checkIdentifer(id)){
            id = `flow-${this._lastConnectionId++}`
        }
        this.logIdentifer(id)
        return id
    }

    createPlace(context){
        var place = {
            id: context.id ? context.id : this.getNextPlaceId(),
            type: 'place',
            x: context.x,
            y: context.y,
            cx: placeRadius,
            cy: placeRadius,
            width: placeRadius * 2,
            height: placeRadius * 2,
            r: placeRadius
        }
        this._bus.fire('formal.create.place', {element: place})
        return place
    }

    createTransition(context, silent=false){
        var transition = {
            id: context.id ? context.id : this.getNextTransitionId(),
            type: 'transition',
            x: context.x,
            y: context.y,
            silent: silent,
            width: silent ? transitionSize/ 2 : transitionSize,
            height: transitionSize,
            labelText: context.labelText ? context.labelText : 'action'
        }
        this._bus.fire('formal.create.transition', {element: transition})
        return transition
    }

    createFlow(context){
        var flow = {
            id: context.id ? context.id : this.getNextFlowId(),
            type: 'flow',
            waypoints: context.waypoints || [
                getMid(context.source),
                getMid(context.target)
            ],
            source: context.source,
            target: context.target
        }
        this._bus.fire('formal.create.flow', {element: flow})
        return flow
    }

   
}

PetriElementFactory.$inject = [
    'eventBus',
    'textRenderer',
]

export default PetriElementFactory;

export {
    isPlace,
    isTransition,
    isFlow
}