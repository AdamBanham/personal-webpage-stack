import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';
import { isPlace,isTransition } from '../elements/pertiElementFactory';

export default class PetriNetRuleProvider extends RuleProvider {

    static $inject = [
        'eventBus',
        'modeling',
        'selection'
    ];

    constructor(eventBus, modeling, selection) {
        super(eventBus);
        this.init();
    }

    init() {

        this.addRule('element.copy', (context) => {
            return true;
        });

        this.addRule('connection.create', this.connectionCreate.bind(this));
    }

    connectionCreate(context) : void | boolean{
        if (isPlace(context.source) && isTransition(context.target)){
            return true
        } else if (isTransition(context.source) && isPlace(context.target)){
            return true
        } else {
            return false
        }
    }

}