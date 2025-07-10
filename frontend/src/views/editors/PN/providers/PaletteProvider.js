
import TsXmlExporter from "../exporter.js";
import TsXmlImporter from "../importer.js";
import {scaleToFitElements} from "../../base/utils/canvasUtils.js";
import SvgSaver from "../svgSaver.js";

/**
 * A example palette provider.
 */
export default function ExamplePaletteProvider(
    create, elementFactory, lassoTool, palette, connect, registry,
    modeling, canvas, eventBus, textRenderer) {
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
    'textRenderer'
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
        textRenderer = this._textRenderer;
  
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
            var parser = new TsXmlImporter(modeling,
              elementFactory, canvas, registry, bus, textRenderer)
            input.type = 'file';
            input.accept = '.pnml';
            input.onchange = _ => {
              // you can use this method to get file and perform respective operations
                      let xml =   Array.from(input.files)[0];
                      xml.text()
                        .then( content => 
                        {
                          input.remove()
                          URL.revokeObjectURL(input)
                          var tree = new DOMParser().parseFromString(
                            content, "text/xml"
                          )
                          
                          var errors = tree.getElementsByTagName("parsererror")
                          if (errors.length > 0){
                            alert(
                              "Parsing failed :: "
                              + errors[0].textContent
                            )
                            return
                          }
                          var system = tree.getElementsByTagName("page")
                          if (system.length > 0){
                            parser.import(system[0])
                          }
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
            const content = new TsXmlExporter(registry).export()

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
            const content = new SvgSaver(canvas).save()

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
          }
        }
      },
    };
  };