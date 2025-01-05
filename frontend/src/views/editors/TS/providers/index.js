import ChangeSupportModule from 'diagram-js/lib/features/change-support';
import DirectEditingModule from 'diagram-js-direct-editing';

import ExamplePaletteProvider from "./PaletteProvider.js"
import ContextPadProvider from "./ContextPadProvider.js"
import LabelEditingProvider from "./StateLabelEditingProvider.js"
import OrderingProvider from "./OrderingProvider.js"

export default {
    __depends__:[
        ChangeSupportModule,
        DirectEditingModule
    ],
    __init__ : [
        'examplePaletteProvider',
        // 'popupMenuProvider',
        'contextPadProvider',
        'labelEditingProvider',
        'orderingProvidier'
    ],
    examplePaletteProvider: ['type', ExamplePaletteProvider],
    // popupMenuProvider: ['type', PopupMenuProvider],
    contextPadProvider: ['type', ContextPadProvider],
    labelEditingProvider: ['type', LabelEditingProvider],
    orderingProvidier: ['type', OrderingProvider]
}