import CustomConnect from "./CustomConnect"
import SelectionModule from 'diagram-js/lib/features/selection';
import RulesModule from 'diagram-js/lib/features/rules';
import DraggingModule from 'diagram-js/lib/features/dragging';

export default {
    __depends__: [
        SelectionModule,
        RulesModule,
        DraggingModule
      ],
    __init__ : [
        'connect'
    ],
    connect: ['type', CustomConnect]
}