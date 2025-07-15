import CopyPaste from "diagram-js/lib/features/copy-paste/CopyPaste";


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
        var id = this._elementFactory.getNextStateId();
        var newAttrs = Object.assign({}, attrs, { id: id });
        var shape = this._elementFactory.createState(newAttrs, newAttrs.stateType);
        return shape;
    }

    copyElementData(context) {

        let descriptor = context.descriptor,
            element = context.element;
        
        if (element.stateType){
            descriptor.stateType = element.stateType;
        }

        if (element.stateLabel) {
            descriptor.stateLabel = element.stateLabel;
        }

        if (element.text) {
            descriptor.text = element.text;
        }
    }
}