
import {
    isPlace, isTransition, isFlow
} from "../elements/pertiElementFactory"

import  {
    isLabel, isConnection
} from "diagram-js/lib/util/ModelUtil"

import {
    findFreePosition,
    generateGetNextPosition,
    getConnectedDistance
} from 'diagram-js/lib/features/auto-place/AutoPlaceUtil.js';
  

export default function ContextPadProvider(
    create, elementFactory, connect, contextPad, modeling, eventBus, registry
) {
    this._create = create;
    this._elementFactory = elementFactory;
    this._connect = connect;
    this._modeling = modeling;
    this._eventBus = eventBus;
    this._registry = registry
    // debugger;
    contextPad.registerProvider(this);
}

    ContextPadProvider.$inject = [
        'create',
        'elementFactory',
        'connect',
        'contextPad',
        'modeling',
        'eventBus',
        'elementRegistry'

    ];

    ContextPadProvider.prototype.getContextPadEntries = function(element){
        
        var connect = this._connect,
            modeling = this._modeling,
            factory = this._elementFactory,
            create = this._create,
            registry = this._registry,
            bus = this._eventBus;

        function removeElement(event, target, autoActivate) {
            bus.fire('pad.delete', {
                elements: [element]
            })
            modeling.removeElements([ element ]);
        }
            

        function startConnect(event, element, autoActivate) {
            connect.start(event, element, autoActivate);
        }

        function switchStateType(event, element, autoActivate){
            modeling.toggleTransitionType(element)
        }

        function flipConnection(event, element){
            var src = element.source
            var tgt = element.target
            var waypoints = [
                {x: tgt.x, y: tgt.y},
                {x: src.x, y: src.y}
            ]
            element.source = tgt 
            element.target = src 
            element.waypoints = waypoints
            modeling.removeConnection(element)
            var connect = modeling.createConnection(tgt, src, element, src.parent)
            modeling.layoutConnection (
                connect,
            )
            bus.fire('elements.changed', {
                elements: [connect, element, tgt, src]})
        }

        function createConnectedTransition(event, element, silent=false){
            var trans = factory.createTransition({
                x: element.x+100,
                y: element.y+100
            }, silent)
            trans = modeling.createShape(
                trans, {x:trans.x, y:trans.y}, element.parent, 1
            )
            var connect = factory.createFlow({
                source: element,
                target: trans})
            modeling.createConnection(
                element, trans, connect, element.parent)
            bus.fire('elements.changed', {
                elements: [trans,element, connect]}
            )            
        }

        function createConnectedPlace(event, element){
            var place = factory.createPlace({
                x: element.x+100,
                y: element.y+100
            })
            place = modeling.createShape(
                place, {x:place.x, y:place.y}, element.parent, 1
            )
            var connect = factory.createFlow({
                source: element,
                target: place})
            modeling.createConnection(
                element, place, connect, element.parent)
            bus.fire('elements.changed', {
                elements: [place,element, connect]}
            )
        }

        var contextPadOptions = {}

        // alaways present
        contextPadOptions['delete'] = {
            action: {
                click: removeElement,
            },
            className: 'context-pad-delete',
            html: '<div class="entry mdi-delete mdi editor-hover"/>',
            title: 'delete',
            group: 'edit'
        }

        if (isLabel(element)){
            return contextPadOptions
        }

        if (isFlow(element)){

            contextPadOptions['flip'] = {
                action: {
                    click: flipConnection
                },
                class: 'context-pad-flip',
                html: '<div class="entry mdi mdi-arrow-left-right editor-hover"/>',
                title: 'flip direction',
                group: 'edit'
            }

            return contextPadOptions
        }

        if (isTransition(element)){
            contextPadOptions['switch'] = {
                action: {
                    click: switchStateType
                },
                class: 'context-pad-switch',
                html: '<div class="entry mdi mdi-toggle-switch mdi editor-hover"/>',
                title: element.silent ? 'make visible' : 'make silent',
                group: 'edit'
            }

        }

        if (isPlace(element)){
            contextPadOptions['create-trans'] = {
                action: {
                    click: createConnectedTransition
                },
                class: 'context-pad-create-trans',
                html: '<div class="entry mdi mdi-square-rounded-outline editor-hover"/>',
                title: 'add transition',
                group: 'add'
            }
            contextPadOptions['create-sil-trans'] = {
                action: {
                    click: (ev,el) => createConnectedTransition(ev, el, true)
                },
                class: 'context-pad-create-sil-trans',
                html: '<div class="entry mdi mdi-square-rounded editor-hover"/>',
                title: 'add silent transition',
                group: 'add'
            }
        }

        if (isTransition(element)){
            contextPadOptions['create-place'] = {
                action: {
                    click: createConnectedPlace
                },
                class: 'context-pad-create-place',
                html: '<div class="entry mdi mdi-circle-outline editor-hover"/>',
                title: 'add place',
                group: 'add'
            }
        }

        contextPadOptions['connect'] = {
            action: {
                click: startConnect,
                dragstart: startConnect
            },
            className: 'context-pad-contect',
            html: '<div class="entry mdi-arrow-right-thick mdi editor-hover"/>',
            title: 'connect',
            group: 'join'
        }
        

        return contextPadOptions
    }