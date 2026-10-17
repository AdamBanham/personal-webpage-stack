import EventBus from 'diagram-js/lib/core/EventBus';
import { isState } from '../elements/TSElementFactory'

import { isKey } from 'diagram-js/lib/features/keyboard/KeyboardUtil';
import { isLabel } from 'diagram-js/lib/util/ModelUtil';

export default class KeyboardController {
    static $inject = [     
        'eventBus',
        'keyboard',
        'selection', 
        'mouse',
        'distributeElements',
        'modeling',
        'copyPaste',
        'globalConnect',
        'editorActions',
        'connect'
    ]
    _eventBus: EventBus;
    _keyboard: any;
    _selection: any;
    _mouse: any;
    _distributeElements: any;
    _modeling: any; 
    _copyPaste: any;
    _globalConnect: any;
    _actions: any;
    _connect: any;

    constructor(eventBus: EventBus, 
        keyboard: any, selection: any, 
        mouse: any, distributeElements: any,
        modeling: any, copyPaste: any, 
        globalConnect: any, actions: any,
        connect: any) {
        this._eventBus = eventBus;
        this._keyboard = keyboard;
        this._selection = selection;
        this._mouse = mouse;
        this._distributeElements = distributeElements;
        this._modeling = modeling;
        this._copyPaste = copyPaste;
        this._globalConnect = globalConnect;
        this._actions = actions;
        this._connect = connect;

        // listeners 
        keyboard.addListener(this.triggerDist.bind(this));
        keyboard.addListener(this.triggerDelete.bind(this));
        keyboard.addListener(this.triggerConnect.bind(this));

    }

    triggerDist(context:any){
        const event = context.keyEvent;

        if (isKey(['h', 'u'], event) && event.ctrlKey) {
            const orientation = isKey(['h'], event) ? 'horizontal' : 'vertical';
            let selectedElements = this._selection.get();
            selectedElements = selectedElements.filter((el) => 
                isState(el)
            );

            const changes = [];

            if (selectedElements.length > 1) {
                let elements = [...selectedElements]
                const num = selectedElements.length;
                const selector = orientation === 'horizontal' ? 'x' : 'y';
                const shapeSize = orientation === 'horizontal' ? 'width' : 'height';
                const centering = orientation === 'horizontal' ? 'y' : 'x';
                const padding = 50;
                const min = Math.min(...elements.map(el => el[selector] - el[shapeSize] / 2));
                const max = Math.max(...elements.map(el => el[selector] - el[shapeSize] / 2));
                const center = elements.reduce((acc, el) => acc + el[centering], 0) / num;
                elements = elements.sort((a, b) => a[selector] - b[selector]);
                const spacing = (Math.abs(max - min)) / (num - 1);
                let curr = min
                
                for (const element of elements) {
                    const pos = curr;
                    if (orientation === 'horizontal') {
                        element.x = pos + (element.width / 2);
                        element.y = center;
                    } else {
                        element.y = pos + (element.height / 2);
                        element.x = center;
                    }
                    changes.push(element);
                    if (element.incoming && element.incoming.length > 0) {
                        for(const incoming of element.incoming) {
                            this._modeling.layoutConnection(incoming);
                        }
                        changes.push(...element.incoming)
                    }
                    if (element.outgoing && element.outgoing.length > 0) {
                        for(const outgoing of element.outgoing) {
                            this._modeling.layoutConnection(outgoing);
                        }
                        changes.push(...element.outgoing)
                    }
                    curr += spacing;
                    }
                }

            this._eventBus.fire('elements.changed', {
                elements: changes
            });

            event.preventDefault();
            event.stopPropagation();
        }
    }

    triggerDelete(context:any) {
        const event = context.keyEvent;

        if (isKey(['Delete', 'Backspace'], event)) {
            const selectedElements = this._selection.get();

            if (selectedElements.length > 0) {
                this._modeling.removeElements(selectedElements);
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }

    triggerConnect(context:any) {
        const event = context.keyEvent;

        if (isKey(['c'], event) ) {
            const selectedElements = this._selection.get();
            if (selectedElements.length === 1) {
                const element = selectedElements[0];
                this._connect.start(this._mouse.getLastMoveEvent (), element, true);
            }
        }
    }

}