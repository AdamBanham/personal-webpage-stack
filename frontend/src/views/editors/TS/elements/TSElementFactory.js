import ElementFactory from "diagram-js/lib/core/ElementFactory"

import {
    assign
} from "min-dash"

import {
    stateRadius
} from './staticShapeDesc';

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

    constructor(){
        super()
        this._lastStateId = 0;
        this._lastConnectionId = 0;
    }

    getNextStateId(){
        this._lastStateId += 1;
        return "b"+this._lastStateId;
    }

    getNextConnectionId(){
        this._lastConnectionId += 1
        return "a"+this._lastConnectionId;
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
        attrs.label = ''
        attrs.stateType = type
        attrs.group = "states"
        return this.createShape(attrs)
    }

    createConnectionBetweenStates(id,src,tgt){
        var attrs = {
            id: id,
            source: src,
            target: tgt,
            waypoints: [
                { x: src.x + src.r, y: src.y + src.r },
                { x: tgt.x + tgt.r, y: tgt.y + src.r}
            ],
            group: "connections"
        }
        var ret = this.createConnection(attrs)
        
        return ret
    }
}