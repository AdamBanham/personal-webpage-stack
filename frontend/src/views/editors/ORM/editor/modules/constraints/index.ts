import ConstraintsModule from './constraints';
import ConstraintsBuilderModule from './builder';
import ConstraintWatcher from './updater';

export default {
    __init__: [ 'constraints', 'constraintsBuilder', 'ConstraintWatcher' ],
    constraintsBuilder: [ 'type', ConstraintsBuilderModule ],
    constraints: [ 'type', ConstraintsModule ],
    ConstraintWatcher: [ 'type', ConstraintWatcher ]
};