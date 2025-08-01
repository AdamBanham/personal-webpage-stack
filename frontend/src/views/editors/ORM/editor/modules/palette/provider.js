import SvgExporter from "../exporters/svgExporter";
import { scaleToFitElements } from "../utils/canvasUtils";
import system from "../exporter/defaultSystem";

export default function ExamplePaletteProvider(
    create, elementFactory, lassoTool, spaceTool, palette, connect, registry,
    modeling, canvas, eventBus, vscodeMessager, importer) {
    this._create = create;
    this._elementFactory = elementFactory;
    this._lassoTool = lassoTool;
    this._spaceTool = spaceTool;
    this._palette = palette;
    this._connect = connect;
    this._registry = registry;
    this._modeling = modeling;
    this._canvas = canvas;
    this._bus = eventBus;
    this._vscodeMessager = vscodeMessager;
    this._importer = importer
  
    palette.registerProvider(this);
  }
  
  ExamplePaletteProvider.$inject = [
    'create',
    'elementFactory',
    'lassoTool',
    'spaceTool',
    'palette',
    'ormConnect',
    'elementRegistry',
    'modeling',
    'canvas',
    'eventBus',
    'vscodeMessager',
    'importSchema'
  ];
  
  
  ExamplePaletteProvider.prototype.getPaletteEntries = function() {
    var create = this._create,
        factory = this._elementFactory,
        lassoTool = this._lassoTool,
        spaceTool = this._spaceTool,
        registry = this._registry,
        modeling = this._modeling,
        canvas = this._canvas,
        bus = this._bus,
        vscodeMessager = this._vscodeMessager,
        importer = this._importer;
  
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
      'space-tool': {
        group: 'tools',
        className: 'mdi-cursor-move mdi',
        title: 'Activate Space Tool',
        action: {
          click: function(event) {
            spaceTool.activateSelection(event);
          }
        }
      },
      'tool-separator': {
        group: 'tools',
        separator: true
      },
      'create-entity': {
        group: 'create',
        className: 'mdi-alpha-e-box-outline mdi',
        title: 'Create Entity Type',
        action: {
          click: function(event) {
            var s = Object.assign(
              factory.createDummyAttributesForEntities("entity"),
              { x: 200, y: 100,}
            );
            create.start(event, s);
          }
        }
      },
      'create-value': {
        group: 'create',
        className: 'mdi-alpha-v-box-outline mdi',
        title: 'Create Value Type',
        action: {
          click: function(event) {
            var s = Object.assign(
              factory.createDummyAttributesForEntities("value"),
              { x: 200, y: 100,}
            );

            create.start(event, s);
          }
        }
      },
      'create-fact': {
        group: 'create',
        className: 'mdi-alpha-f-box-outline mdi',
        title: 'Create Fact type',
        action: {
          click: function(event) {
            var s = Object.assign(
              factory.createDummyAttributesForFacts(),
              { x: 200, y: 100,}
            );

            create.start(event, s);
          }
        }
      },
      'create-separator': {
        group: 'create',
        separator: true
      },
      'import' : {
        group: 'model',
        className: 'mdi-import mdi',
        title: 'Import schema',
        action: {
          click: function(event) {
            bus.fire('document.import.start');
          }
        }
      },
      'save': {
        group: 'model',
        className: 'mdi-content-save-outline mdi',
        title: 'Save Schema',
        action: {
          click: function(event) {
            bus.fire('document.download', {});
          }
        }
      },
      'export-svg': {
        group: 'model',
        className: 'mdi-export mdi',
        title: 'Export SVG',
        action: {
          click: function(event) {
            // Generate the content you want to download as a string
            const content = new SvgExporter(canvas).save();

            // Create a Blob (Binary Large Object) from the content
            const blob = new Blob([content], { type: 'text/plain' });

            // Create a link element for downloading the file
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'orm_schema.svg'; // Specify the default filename

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
        title: 'Fit to screen',
        action: {
          click: function(event) {
            scaleToFitElements(canvas);
          }
        }
      },
      'fullscreen': {
        group: 'view',
        className: 'mdi-fullscreen mdi',
        title: 'Toggle fullscreen',
        action: {
          click: function(event) {
            bus.fire('editor.fullscreen.toggle');
            setTimeout(() => {
              // After toggling fullscreen, fit the view to the screen
              scaleToFitElements(canvas);
            }, 50);
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
                    return !v.id.includes("implicitroot");
                }
            );
            if (els.length > 0){
                modeling.removeElements(
                    els
                );
            }
          }
        }
      },
      'load-default': {
        group: 'clear',
        className: 'mdi-restore mdi',
        title: 'Load default system',
        action: {
          click: function(event) {
            importer.attemptToLoadDocument(system, "medals.orm");
            setTimeout(() => {
              // After toggling fullscreen, fit the view to the screen
              scaleToFitElements(canvas);
            }, 100);
          }
        }
      },
    };
};