import provider from './provider';
import SpaceTool2 from './spaceTool';

export default {
    __depends__: [ ],
    __init__: [ 'paletteProvider', 'spaceToolPreview', 'spaceTool' ],
    paletteProvider: [ 'type', provider ],
    spaceTool: ['type', SpaceTool2]
};