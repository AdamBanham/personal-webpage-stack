import OrderingProvider from "diagram-js/lib/features/ordering/OrderingProvider.js"

import { 
    isState } from '../elements/TSElementFactory';

class CustomOrderingProvider extends OrderingProvider{

    constructor(eventbus){
        super(eventbus)
    }

    getOrdering(element, newParent){
        if (isState(element)){
            return {
                index: -1,
                parent: newParent
            }
        } else {
            return {
                index: 1,
                parent: newParent
            }
        }
    }
}

CustomOrderingProvider.$inject = ['eventBus']

export default CustomOrderingProvider