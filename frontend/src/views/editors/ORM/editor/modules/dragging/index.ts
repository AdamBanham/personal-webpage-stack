import OrmDragging from './dragger.js';
import HoverFixModule from "diagram-js/lib/features/hover-fix";
import SelectionModule from "diagram-js/lib/features/selection";

export default {
    __depends__: [
    HoverFixModule,
    SelectionModule,
  ],
    __init__: [ 'dragging' ],
  dragging: [ 'type', OrmDragging ],
};