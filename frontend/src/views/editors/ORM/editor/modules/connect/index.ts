import OrmConnect from './connect.js';
import OrmSubtyping from "./subtyping.js";
import OrmPreview from "./preview.js";
import SelectionModule from 'diagram-js/lib/features/selection';
import RulesModule from 'diagram-js/lib/features/rules';
import DraggingModule from 'diagram-js/lib/features/dragging';

export default {
    __depends__: [
        SelectionModule,
        RulesModule,
        DraggingModule
      ],
    __init__ : [ 'ormConnect', 'ormSubtyping', 'connectPreview' ],
    ormConnect: [ 'type', OrmConnect ],
    ormSubtyping : [ 'type', OrmSubtyping ],
    connectPreview: [ 'type', OrmPreview ]
};