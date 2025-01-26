import Rules from 'diagram-js/lib/features/rules/Rules';
import { isPlace,isTransition } from '../elements/pertiElementFactory';

class PetriRules extends Rules {
    constructor(eventBus) {
        super(eventBus);
    }

    allowed(action, context){
        if (action === 'connection.create'){
            if (isPlace(context.source) && isTransition(context.target)){
                return true
            } else if (isTransition(context.source) && isPlace(context.target)){
                return true
            } else {
                return false
            }
        } else {
            return super.allowed(action, context)
        }
    }

}

export default PetriRules;