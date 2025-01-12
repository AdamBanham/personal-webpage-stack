import ElementFactory from "diagram-js/lib/core/ElementFactory"

import {
    assign
} from "min-dash"

import {
    stateRadius
} from './staticShapeDesc';

import {
    getConnectionMid
  } from "diagram-js/lib/layout/LayoutUtil"

const INTERNAL = "internal";
const ENDING = "ending";
const STARTING = "starting"


export function isInternalState(attrs){
    if (attrs.stateType != null){
        if(attrs.stateType == INTERNAL){
            return true;
        }
    }
    return false;
} 

export function isStartingState(attrs){
    if (attrs.stateType != null){
        if(attrs.stateType == STARTING){
            return true;
        }
    }
    return false;
} 

export function isEndingState(attrs){
    if (attrs.stateType != null){
        if(attrs.stateType == ENDING){
            return true;
        }
    }
    return false;
} 

export function isState(attrs){
    return isStartingState(attrs)
        || isInternalState(attrs)
        || isEndingState(attrs)
}

export function toggleStateType(element){

    if (isStartingState(element)){
        return INTERNAL
    } else if (isInternalState(element)){
        return ENDING
    } else {
        return STARTING
    }
}

export class TSElementFactory extends ElementFactory {

    constructor(eventBus,textRenderer){
        super()
        this._lastStateId = 0;
        this._lastConnectionId = 0;
        this._seen = []
        this._bus = eventBus
        this._textRenderer = textRenderer
    }

    fireCreateState(element){
        this._bus.fire(
            'state.create',
            {element: element}
        )
    }

    fireCreateTransition(element){
        this._bus.fire(
            'transition.create',
            {element: element}
        )
    }

    logIdentifer(id){
        if (!this._seen.includes(id)){
            this._seen.push(id)
        }
    }

    checkIdentifer(id){
        return !this._seen.includes(id)
    }

    getNextStateId(){
        this._lastStateId += 1;
        var id = "b"+this._lastStateId;
        if (this.checkIdentifer(id)){
            return id
        }
        return this.getNextStateId()
    }

    getNextConnectionId(){
        this._lastConnectionId += 1
        var id = "a"+this._lastConnectionId;
        if (this.checkIdentifer(id)){
            return id
        }
        return this.getNextConnectionId()
    }

    createInternalState(attrs) {
        return this.createState(attrs,INTERNAL)
    }

    createStartingState(attrs){
        return this.createState(attrs,STARTING)
    }

    createEndingState(attrs){
        return this.createState(attrs,ENDING)
    }

    createState(attrs, type){
        attrs = assign(
            {},
            attrs
        );
        attrs.r = stateRadius
        attrs.cx = stateRadius
        attrs.cy = stateRadius
        attrs.width = stateRadius * 2
        attrs.height = stateRadius * 2
        attrs.stateType = type
        attrs.group = "states"
        attrs.selected = false
        var ret = this.createShape(attrs)
        this.fireCreateState(ret)
        return ret
    }

    createConnectionBetweenStates(id,src,tgt,label){
        if (!label){
            label = ''
        }
        var selfLoop = src.id == tgt.id;
        var waypoints;
        if (selfLoop){
            waypoints = [
                { x: src.x + src.r, y: src.y + src.r },
                { x: src.x + src.r + (stateRadius * 0.5), 
                  y: src.y + src.r - (stateRadius * 1.5) }, // go up
                { x: src.x + src.r + (stateRadius * 1.5), 
                  y: src.y + src.r - (stateRadius * 1.5) }, // go right
                { x: src.x + src.r + (stateRadius * 1.5), 
                  y: src.y + src.r + (stateRadius * 1.5) }, // go down
                { x: src.x + src.r + (stateRadius * 0.5), 
                  y: src.y + src.r + (stateRadius * 1.5) },  // go left
                { x: tgt.x + tgt.r, y: tgt.y + src.r}
            ]
        } else {
            waypoints = [
                { x: src.x + src.r, y: src.y + src.r },
                { x: tgt.x + tgt.r, y: tgt.y + src.r}
            ]
        }
        var attrs = {
            id: id,
            source: src,
            target: tgt,
            selfLoop: selfLoop,
            waypoints: waypoints,
            arcLabel: label,
            group: "connections"
        }
        var ret = this.createConnection(attrs)
        this.fireCreateTransition(ret)
        return ret
    }
}

TSElementFactory.$inject = [
    'eventBus',
    'textRenderer',
]