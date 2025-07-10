import { scaleToFitElements } from "@/views/editors/base/utils/canvasUtils";
import { set } from "diagram-js/lib/util/Cursor";

export default class CustomPaletteProvider {

    static $inject = [ 'eventBus', 'palette', 'canvas' ];
    _eventBus;
    _palette;
    _canvas; 

    constructor(eventBus, palette, canvas) {
        this._eventBus = eventBus;
        this._palette = palette;
        this._canvas = canvas;  

        palette.registerProvider(this);
    }

    getPaletteEntries() {
        return {
            'editor-separator': {
                group: 'editor',
                separator: true
            },
            'custom.fullscreen': {
                group: 'editor',
                className: 'mdi mdi-fullscreen',
                title: 'Toggle Fullscreen',
                action: {
                    click: () => {
                        this._eventBus.fire('editor.toggle.fullScreen',{ });
                        setTimeout(() => {
                            scaleToFitElements(this._canvas);
                        }, 150);
                        setTimeout(() => {
                            scaleToFitElements(this._canvas);
                        }, 175);
                    }
                }
            },
            'custom.fitScreen': {
                group: 'editor',
                className: 'mdi mdi-overscan',
                title: 'Fit to Screen',
                action: {
                    click: () => {
                        scaleToFitElements(this._canvas);    
                        setTimeout(() => {
                            scaleToFitElements(this._canvas);
                        }, 25);
                    }                    
                }
            },
            'file-separator': {
                group: 'file',
                separator: true
            },
            'custom.export': {
                group: 'file',
                className: 'mdi mdi-export',
                title: 'Export BPMN 2.0 file',
                action: {
                    click: () => {
                        this._eventBus.fire('editor.export', { });
                    }
                }
            },
            'custom.import': {
                group: 'file',
                className: 'mdi mdi-import',
                title: 'Import BPMN 2.0 file',
                action: {
                    click: () => {
                        this._eventBus.fire('editor.import', { });
                    }
                }
            }
        };
    }

}