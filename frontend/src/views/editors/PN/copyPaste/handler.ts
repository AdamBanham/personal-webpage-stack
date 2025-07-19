import CopyPaste from "diagram-js/lib/features/copy-paste/CopyPaste";
import { isPlace, isTransition, isFlow } from "../elements/pertiElementFactory";

export default class CopyPasteHandler extends CopyPaste {

    static $inject = [
        'canvas',
        'create',
        'clipboard',
        'elementFactory',
        'eventBus',
        'modeling',
        'mouse',
        'rules'
    ];

    _elementFactory : any;

    constructor(canvas,
        create,
        clipboard,
        elementFactory,
        eventBus,
        modeling,
        mouse,
        rules) {
        super(canvas, create, clipboard, elementFactory, eventBus, modeling, mouse, rules);
        this._elementFactory = elementFactory;

        eventBus.on('copyPaste.copyElement', 750, this.copyElementData.bind(this));  
    }

    createShape(attrs: any): any {
        var newAttrs = Object.assign({}, attrs,);
        console.log('createShape', newAttrs);

        var shape;
        if (isPlace(attrs)) {
            newAttrs.id = this._elementFactory.getNextPlaceId();
            shape = this._elementFactory.createPlace(newAttrs);
        } else if (isTransition(attrs)) {
            newAttrs.id = this._elementFactory.getNextTransitionId();
            shape = this._elementFactory.createTransition(newAttrs, newAttrs.silent);
        } else {
            newAttrs.id = this._elementFactory.getNextFlowId();
            shape = this._elementFactory.createFlow(newAttrs);
        } 
        return shape;
    }

    copyElementData(context) {

        let descriptor = context.descriptor,
            element = context.element;
        
        descriptor.type = element.type;

        if (isTransition(element)) {
           descriptor.silent = element.silent;
           descriptor.labelText = element.labelText;    
        }
    }
}