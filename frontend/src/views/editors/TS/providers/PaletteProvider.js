import { scaleToFitElements } from '../../base/utils/canvasUtils.js';

/**
 * A example palette provider.
 */
export default function ExamplePaletteProvider(
    create, elementFactory, lassoTool, palette, connect, registry,
    modeling, canvas, eventBus, textRenderer, 
    importing, exporting, svgExporting,
    localSessionStorage) {
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
    this._local = localSessionStorage;
  
    palette.registerProvider(this);
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
    'svgExporting',
    'localSessionStorage'
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
        svgExporting = this._svgExporting,
        local = this._local;
  
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
      'create-ishape': {
        group: 'create',
        className: 'mdi-circle-outline mdi',
        title: 'Create Internal State',
        action: {
          click: function(event) {
            var shape = elementFactory.createInternalState({
              x: 0, y:0, stateLabel: "",
              id: elementFactory.getNextStateId()
            });
  
            create.start(event, shape);
          }
        }
      },
      'create-sshape': {
        group: 'create',
        className: 'mdi-play-circle-outline mdi',
        title: 'Create Starting State',
        action: {
          click: function(event) {
            var shape = elementFactory.createStartingState({
              x: 0, y:0, stateLabel: "", 
              id: elementFactory.getNextStateId()
            });
  
            create.start(event, shape);
          }
        }
      },
      'create-eshape': {
        group: 'create',
        className: 'mdi-stop-circle-outline mdi',
        title: 'Create Ending State',
        action: {
          click: function(event) {
            var shape = elementFactory.createEndingState({
              x: 0, y:0, stateLabel: "",
              id: elementFactory.getNextStateId()
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
            input.accept = '.tsxml'
            input.onchange = _ => {
              let xml =   Array.from(input.files)[0];
              xml.text()
                .then( content => 
                {
                  importing.fire('importing.load', { text: content });
                }
              )
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
            const content = exporting.fire('exporting.export');

            // Create a Blob (Binary Large Object) from the content
            const blob = new Blob([content], { type: 'text/plain' });

            // Create a link element for downloading the file
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'transition_system.tsxml'; // Specify the default filename

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
            a.download = 'transition_system.svg'; // Specify the default filename

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
        title: 'fit to screen',
        action: {
          click: function(event) {
            scaleToFitElements(canvas)
          }
        }
      },
      'fullscreen' : {
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
                modeling.removeElements(
                    els
                )
            }
          }
        }
      },
      'reset-model' : {
        group: 'clear',
        className: 'mdi-restore mdi',
        title: 'Reset to Default Model',
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
                modeling.removeElements(
                    els
                )
            }
            local.fire('local.storage.clear');
            let system = bus.fire('local.storage.find');
            importing.fire('importing.load', { text: system });
          }
        }
      }
    };
  };