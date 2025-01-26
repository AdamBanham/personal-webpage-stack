import modeling from 'diagram-js/lib/features/modeling/Modeling';
import { isTransition } from '../elements/pertiElementFactory';

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

      element.silent = !element.silent;

      var context = {
        elements: [element].concat(element.incoming).concat(element.outgoing)
      }

      this._eventBus.fire('elements.changed', context)
    }

  }
}

PetriModeling.$inject = [ 'eventBus', 'elementFactory', 'commandStack' ];

export default PetriModeling;