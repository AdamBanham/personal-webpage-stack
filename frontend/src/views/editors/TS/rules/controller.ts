import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

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
    }

}