
import {scaleToFitElements} from "../../base/utils/canvasUtils.js";

/**
 * A example palette provider.
 */
export default function ExamplePaletteProvider(
    create, elementFactory, lassoTool, palette, connect, registry,
    modeling, canvas, eventBus, textRenderer, 
    importing, exporting, svgExporting) {
    this._create = create;
    this._elementFactory = elementFactory;
    this._lassoTool = lassoTool;
    this._palette = palette;
    this._connect = connect;
    this._registry = registry;
    this._modeling = modeling
    this._canvas = canvas
    this._bus = eventBus
    this._textRenderer = textRenderer
    this._importer = importing;
    this._exporting = exporting; 
    this._svgExporting = svgExporting;
  
    palette.registerProvider(this);

    this._bus.on('diagram.init', (event) => {
      setTimeout(() => {scaleToFitElements(canvas)},100);
      setTimeout(() => {scaleToFitElements(canvas)},150);
    });
  }
  
  ExamplePaletteProvider.$inject = [
    'create',
    'elementFactory',
    'lassoTool',
    'palette',
    'connect',
    'elementRegistry',
    'modeling',
    'canvas',
    'eventBus',
    'textRenderer',
    'importing',
    'exporting',
    'svgExporting'
  ];
  
  
  ExamplePaletteProvider.prototype.getPaletteEntries = function() {
    var create = this._create,
        elementFactory = this._elementFactory,
        lassoTool = this._lassoTool,
        registry = this._registry,
        modeling = this._modeling,
        canvas = this._canvas,
        bus = this._bus,
        connect = this._connect,
        textRenderer = this._textRenderer,
        importing = this._importer,
        exporting = this._exporting,
        svgExporting = this._svgExporting;
  
    return {
      'lasso-tool': {
        group: 'tools',
        className: 'mdi-lasso mdi',
        title: 'Activate Lasso Tool',
        action: {
          click: function(event) {
            lassoTool.activateSelection(event);
          }
        }
      },
      'tool-separator': {
        group: 'tools',
        separator: true
      },
      'create-place': {
        group: 'create',
        className: 'mdi-circle-outline mdi',
        title: 'Add Place',
        action: {
          click: function(event) {
            var shape = elementFactory.createPlace({
              x: 0, y:0,
            });
            create.start(event, shape);
          }
        }
      },
      'create-transition': {
        group: 'create',
        className: 'mdi-square-rounded-outline mdi',
        title: 'Add Transition',
        action: {
          click: function(event) {
            var shape = elementFactory.createTransition({
              x: 0, y:0,
            });
            create.start(event, shape);
          }
        }
      },
      'create-separator': {
        group: 'create',
        separator: true
      },
      'import-model': {
        group: 'model',
        className: 'mdi-import mdi',
        title: 'Import Model',
        action: {
          click: function(event) {
            let input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pnml';
            input.onchange = _ => {
              // you can use this method to get file and perform respective operations
              let xml =   Array.from(input.files)[0];
              xml.text()
                .then( text => 
                {
                  importing.fire('importing.load', { text });
                  setTimeout(() => {
                    scaleToFitElements(canvas)
                    scaleToFitElements(canvas)
                  }, 75);
                }
                );
              };
            input.click();
          }
        }
      },
      'export-model': {
        group: 'model',
        className: 'mdi-export mdi',
        title: 'Export Model',
        action: {
          click: function(event) {
            // Generate the content you want to download as a string
            const content = exporting.fire('exporting.export')

            // Create a Blob (Binary Large Object) from the content
            const blob = new Blob([content], { type: 'text/plain' });

            // Create a link element for downloading the file
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'petri_net.pnml'; // Specify the default filename

            // Trigger a click event on the link to initiate the download
            a.click();

            // Clean up resources (revoke the URL to free up memory)
            URL.revokeObjectURL(blob);
            a.remove()
          }
        }
      },
      'export-svg': {
        group: 'model',
        className: 'mdi-content-save-move-outline mdi',
        title: 'Export SVG',
        action: {
          click: function(event) {
            // Generate the content you want to download as a string
            const content = svgExporting.fire('exporting.svg.export')
            // Create a Blob (Binary Large Object) from the content
            const blob = new Blob([content], { type: 'text/plain' });

            // Create a link element for downloading the file
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'petir_net.svg'; // Specify the default filename

            // Trigger a click event on the link to initiate the download
            a.click();

            // Clean up resources (revoke the URL to free up memory)
            URL.revokeObjectURL(blob);
            a.remove()
          }
        }
      },
      'model-separator': {
        group: 'model',
        separator: true
      },
      'fitview': {
        group: 'view',
        className: 'mdi-overscan mdi',
        title: 'Fit to Screen',
        action: {
          click: function(event) {
            scaleToFitElements(canvas)
          }
        }
      },
      'fullscreen': {
        group: 'view',
        className: 'mdi-fullscreen mdi',
        title: 'Toggle Fullscreen',
        action: {
          click: function(event) {
            bus.fire('editor.fullscreen.toggle', {})
            setTimeout(() => {
              scaleToFitElements(canvas)
              scaleToFitElements(canvas)
            }, 75);
          }
        }
      },
      'view-separator': {
        group: 'view',
        separator: true
      },
      'clear-model': {
        group: 'clear',
        className: 'mdi-trash-can-outline mdi',
        title: 'clear all elements',
        action: {
          click: function(event) {
            // clear the system, except for root
            var els = registry.getAll().filter(
                (v) => {
                    return !v.id.includes("implicitroot")
                }
            )
            if (els.length > 0){
                bus.fire('formal.clear', {})
                els.forEach(
                  (el) => elementFactory.releaseIdentifer(el)
                )
                modeling.removeElements(
                    els
                )
            }
            bus.fire('local.storage.clear');
          }
        }
      },
      'reset-model' : {
        group: 'clear',
        className: 'mdi-restore mdi',
        title: 'Reset to Default Model',
        action: {
          click: function(event) {
            bus.fire('local.storage.clear');
            let system = bus.fire('local.storage.find');
            if (system) {
              importing.fire('importing.load', { text: system });
            }
            setTimeout(() => {
              scaleToFitElements(canvas)
              scaleToFitElements(canvas)
            }, 75);
          }
        }
      }
    };
  };