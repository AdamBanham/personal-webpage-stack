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
            let orientation = isKey(['h'], event) ? 'horizontal' : 'vertical';
            let selectedElements = this._selection.get();
            selectedElements = selectedElements.filter((el) => 
                isState(el)
            );

            let changes = [];

            if (selectedElements.length > 1) {
                let elements = [...selectedElements]
                let num = selectedElements.length;
                let selector = orientation === 'horizontal' ? 'x' : 'y';
                let shapeSize = orientation === 'horizontal' ? 'width' : 'height';
                let centering = orientation === 'horizontal' ? 'y' : 'x';
                let padding = 50;
                let min = Math.min(...elements.map(el => el[selector] - el[shapeSize] / 2));
                let max = Math.max(...elements.map(el => el[selector] - el[shapeSize] / 2));
                let center = elements.reduce((acc, el) => acc + el[centering], 0) / num;
                elements = elements.sort((a, b) => a[selector] - b[selector]);
                let spacing = (Math.abs(max - min)) / (num - 1);
                let curr = min
                
                for (const element of elements) {
                    let pos = curr;
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
            let selectedElements = this._selection.get();

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
            let selectedElements = this._selection.get();
            if (selectedElements.length === 1) {
                let element = selectedElements[0];
                this._connect.start(this._mouse.getLastMoveEvent (), element, true);
            }
        }
    }

}