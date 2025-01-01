import ExamplePaletteProvider from "./PaletteProvider.js"
import ContextPadProvider from "./ContextPadProvider.js"

export default {
    __init__ : [
        'examplePaletteProvider',
        // 'popupMenuProvider',
        'contextPadProvider'
    ],
    examplePaletteProvider: ['type', ExamplePaletteProvider],
    // popupMenuProvider: ['type', PopupMenuProvider],
    contextPadProvider: ['type', ContextPadProvider]
}