import ChangeSupportModule from 'diagram-js/lib/features/change-support';
import DirectEditingModule from 'diagram-js-direct-editing';

import editingProvider from './editing';
import ormEditingService from './ormEditor.js';

export default {
    __depends__: [
        ChangeSupportModule,
        DirectEditingModule
    ],
    __init__: [ 'directEditing', 'labelEditingProvider' ],
    directEditing: [ 'type', ormEditingService ],
    labelEditingProvider: [ 'type', editingProvider ],
};