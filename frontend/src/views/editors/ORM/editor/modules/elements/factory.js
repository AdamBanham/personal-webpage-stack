import ElementFactory from "diagram-js/lib/core/ElementFactory";

import { createEntity, ValueEntity, Entity} from "../model/entities";
import { createFact, Fact } from "../model/facts";
import { createConstraint } from "../model/constraints";
import { createConnection } from "../model/connections";
import { SUBTYPE_NAME, createSubtype } from "../model/subtypes";
import { OBJECTIFICATION_TYPE, createObjectification } from "../model/objectifiedRole";
import { TYPE as VALUE_CONSTRAINT_TYPE, createValueConstraint } from "../constraints/model/valueConstraint";

import { unitHeight as entityHeight, unitWidth as entityWidth } from "../model/entities";
import { unitHeight as factHeight, unitWidth as factWidth } from "../model/facts";

/**
 * @type ElementFactory
 */
export default class OrmElementFactory extends ElementFactory{
    constructor(eventBus) {
        super();
        this._eventBus = eventBus;
    }

    /**
     * 
     * @param {string} type 
     * @param {Obejct} attrs 
     * @returns {Entity | Fact}
     */
    create(type, attrs)
    {
        type = attrs.type || type;
        if (type === 'entity') {
            let el = createEntity(attrs.label, attrs.ref, 
                attrs.type, attrs.width, attrs.height, 
                attrs.x, attrs.y);
            el = Object.assign(el, attrs);
            this._eventBus.fire('factory.create', { element: el });
            return el;
        }
        if (type === 'value') {
            let el = createEntity(attrs.label, attrs.ref, 
                attrs.type, attrs.width, attrs.height, 
                attrs.x, attrs.y);
            el = Object.assign(el, attrs);
            this._eventBus.fire('factory.create', { element: el });
            return el;
        }
        if (type === 'fact') {
            let el = createFact(attrs.factors, attrs.x, attrs.y);
            el = Object.assign(el, attrs);
            this._eventBus.fire('factory.create', { element: el });
            return el;
        }
        if (type === 'constraint'){
            attrs['type'] = 'constraint';
            let el = createConstraint(
                attrs.x, attrs.y, 
                attrs.width, attrs.height,
                attrs.over, attrs.roles
            );
            this._eventBus.fire('factory.create', { element: el });
            return el;
        }
        if (type === 'connection'){
            attrs['type'] = 'connection';
            let el = createConnection(attrs.role, attrs.mandatory);
            el.setByAttributes(attrs);
            this._eventBus.fire('factory.create', { element: el });
            return el; 
        }
        if (type === SUBTYPE_NAME){
            attrs['type'] = SUBTYPE_NAME;
            let el = createSubtype();
            el.setByAttributes(attrs);
            this._eventBus.fire('factory.create', { element: el });
            return el; 
        }
        if (type === OBJECTIFICATION_TYPE){
            attrs['type'] = OBJECTIFICATION_TYPE;
            let el = createObjectification(attrs.fact);
            this._eventBus.fire('factory.create', { element: el });
            return el; 
        }
        if (type === VALUE_CONSTRAINT_TYPE){
            attrs['type'] = VALUE_CONSTRAINT_TYPE;
            let el = createValueConstraint(attrs.x, attrs.y, attrs.source);
            return el;
        }
        if (type === 'label'){
            attrs['type'] = 'label';
            return super.create(type, attrs);
        }
       
        throw new Error('Unknown element type: ' + type);
    }

    /**
     * creates dummy attributes for an entity or value.
     * @param {"entity" | "value"} type
     * @return a dummy set of attributes
     */
    createDummyAttributesForEntities(type){
        return {
            label: 'Foobar',
            ref: 'id',
            type: type,
            width: entityWidth,
            height: entityHeight,
            x: 0,
            y: 0
        };
    }

    /**
     * creates dummy attributes for a fact.
     * @returns {fact}
     */
    createDummyAttributesForFacts(){
        return {
            factors: [null],
            width: factWidth,
            height: factHeight,
            type: 'fact',
            x: 0,
            y: 0
        };
    }

    /**
     * creates dummy attributes for a label.
     * @returns {label}
     */
    createDummyAttributesForLabel(){
        return {
            content: "..."
        };
    }

    createDummyAttributesForDerivedLabel(){
        return {
            content: "*...",
            derived: true,
        };
    }

    /**
     * creates dummy attributes for a constraint over a fact.
     * @param {Fact} fact 
     * @returns 
     */
    createDummyAttributesForConstraintOverFact(fact){
        let pos = fact.getNextFreeContraintPosition();
        return {
            type: 'constraint',
            width: fact.width,
            height: 3,
            x: pos.x,
            y: pos.y,
            over: [],
            roles: fact.roles, 
        };
    }

    /**
     * Makes a dummy set of attributes for connections.
     * @param {number} role the position of the fact type 
     * @returns {object} a mapping of attributes
     */
    createDummyAttributesForConnection(role){
        return {
            mandatory: false,
            role: role
        };
    }

    /**
     * Makes a dummy set of attributes for objectification.
     * @param {Fact} fact 
     * @returns 
     */
    createDummyAttributesForObjectification(fact){
        return {
            type: OBJECTIFICATION_TYPE,
            fact: fact,
        };
    }

    /**
     * Makes a dummy set of attributes for a value constraints.
     * @param {Entity | ValueEntity | Fact} source what the constraint is over 
     * @returns 
     */
    createDummyAttributesForValueConstraint(source) {
        return {
            type: VALUE_CONSTRAINT_TYPE,
            source: source,
            x: source.x + source.width + 10,
            y: source.y + source.height / 2,
        };
    }
}

OrmElementFactory.$inject = [
    'eventBus',
];