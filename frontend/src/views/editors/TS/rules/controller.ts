import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';
import { isState } from '../elements/TSElementFactory';

export default class TSRules extends RuleProvider {

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

        this.addRule('connection.create', (context) => {
            //console.log("TSRules connection.create", context);
            const { source, target } = context;
            if (!source || !target) {
                return false;
            }
            // Allow connection creation only if both source and target are valid
            let ret = isState(source) && isState(target);
            //console.log("TSRules connection.create", ret);
            return ret
        });
    }

}