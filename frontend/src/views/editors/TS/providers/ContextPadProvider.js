
import {
    isInternalState,
    isStartingState,
    toggleStateType
} from "../elements/TSElementFactory"

export default function ContextPadProvider(
    create, elementFactory, connect, contextPad, modeling, eventBus
) {
    this._create = create;
    this._elementFactory = elementFactory;
    this._connect = connect;
    this._modeling = modeling;
    this._eventBus = eventBus;
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

    ];

    ContextPadProvider.prototype.getContextPadEntries = function(element){
        
        var connect = this._connect,
            modeling = this._modeling,
            factory = this._elementFactory,
            create = this._create,
            bus = this._eventBus;

        function removeElement() {
            modeling.removeElements([ element ]);
            }

        function startConnect(event, element, autoActivate) {
            connect.start(event, element, autoActivate);
        }

        function switchStateType(event, element, autoActivate){
            var newType = toggleStateType(element)
            element.stateType = newType;
            modeling.moveShape(element, {x:0, y:0})
        }

        function jumpToInternal(event, element){
            var ns = factory.createInternalState({
                id: factory.getNextStateId(),
                x: element.x + 100,
                y: element.y + 100
            })
            var nc = factory.createConnectionBetweenStates(
                factory.getNextConnectionId(), 
                element, 
                ns
            )
            modeling.createShape(ns, {x: ns.x, y:ns.y} ,element.parent)
            modeling.createConnection(element, ns, nc, element.parent)
            modeling.moveShape(element, {x:0, y:0})
            modeling.moveShape(ns, {x:0, y:0})
        }

        function jumpToEnding(event, element){
            var ns = factory.createEndingState({
                id: factory.getNextStateId(),
                x: element.x + 100,
                y: element.y + 100
            })
            var nc = factory.createConnectionBetweenStates(
                factory.getNextConnectionId(), 
                element, 
                ns
            )
            modeling.createShape(ns, {x: ns.x, y:ns.y} ,element.parent)
            modeling.createConnection(element, ns, nc, element.parent)
            modeling.moveShape(element, {x:0, y:0})
            modeling.moveShape(ns, {x:0, y:0})
        }

        function flipConnection(event, element){
            console.log(element)
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
            modeling.createConnection(tgt, src, element, src.parent)
            modeling.moveShape(tgt, {x:0, y:0})
            modeling.moveShape(src, {x:0, y:0})
        }

        var contextPadOptions = {}

        // alaways present
        contextPadOptions['delete'] = {
            action: {
                click: removeElement,
                dragstart: removeElement
            },
            className: 'context-pad-delete',
            html: '<div class="entry mdi-delete mdi editor-hover"/>',
            title: 'delete',
            group: 'edit'
        }

        if (element.id.startsWith("a") || element.id.startsWith("connection")){

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

        contextPadOptions['edit'] = {
            action: {
                click: switchStateType,
            },
            className: 'context-pad-edit',
            html: '<div class="entry mdi-circle mdi editor-hover"/>',
            title: 'change',
            group: 'edit'
        }

        if (isStartingState(element) || isInternalState(element)){
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
            contextPadOptions['connect-to-internal'] = {
                action: {
                    click: jumpToInternal
                },
                className: 'context-pad-contect',
                html: '<div class="entry mdi-circle-outline mdi editor-hover"/>',
                title: 'jump to internal',
                group: 'jump'
            }
            contextPadOptions['connect-to-ending'] = {
                action: {
                    click: jumpToEnding
                },
                className: 'context-pad-contect',
                html: '<div class="entry mdi-stop-circle-outline mdi editor-hover"/>',
                title: 'jump to ending',
                group: 'jump'
            }
        }

        return contextPadOptions
    }