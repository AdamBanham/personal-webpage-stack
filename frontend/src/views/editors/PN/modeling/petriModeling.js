import modeling from 'diagram-js/lib/features/modeling/Modeling';
import { isTransition } from '../elements/pertiElementFactory';

import {
    placeRadius, transitionSize
} from '../elements/staticShapeDesc';

class PetriModeling extends modeling {
  
  constructor(eventBus, elementRegistry, commandStack) {
    super(
      eventBus, 
      elementRegistry, 
      commandStack
    );
  }

  getHandlers() {
    var handlers = super.getHandlers();
    return handlers;
  }

  toggleTransitionType(element) {
    if (isTransition(element)) {

      

      if (element.silent) {
        element.width = transitionSize;
      } else {
        element.width = transitionSize/2;
      }

      element.silent = !element.silent;

      var context = {
        elements: [element].concat(element.incoming).concat(element.outgoing)
      }

      this._eventBus.fire('elements.changed', context)
      this.moveElements(context.elements, {
        x: 0,
        y: 0
      });
    }

  }

  removeElements(elements) {
    this._eventBus.fire('elements.delete', {
      elements: elements
    });
    return super.removeElements(elements);
  }
  
}

PetriModeling.$inject = [ 'eventBus', 'elementFactory', 'commandStack' ];

export default PetriModeling;