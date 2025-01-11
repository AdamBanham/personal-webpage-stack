
import TsXmlExporter from "../exporter.js"
import TsXmlImporter from "../importer.js";
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
      'create-ishape': {
        group: 'create',
        className: 'mdi-circle-outline mdi',
        title: 'Create Internal State',
        action: {
          click: function(event) {
            var shape = elementFactory.createInternalState({
              x: 0, y:0
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
              x: 0, y:0
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
              x: 0, y:0
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
            input.accept = '.tsxml'
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
                          var system = tree.getElementsByTagName("transition-system")
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
      'zoomview': {
        group: 'view',
        className: 'mdi-fit-to-page-outline mdi',
        title: 'zoom to fit',
        action: {
          click: function(event) {
            var scale;
            // reset the scale back to one
            const zoomedAndScrolledViewbox = canvas.viewbox();
            canvas.viewbox({
               x: 0,
               y: 0,
               width: zoomedAndScrolledViewbox.outer.width,
               height: zoomedAndScrolledViewbox.outer.height
            });
            // work out the best scale
            var outer = canvas.viewbox().outer 
            var inner = canvas.viewbox().inner 
            var hScale = 1; var vScale = 1;
            hScale = (outer.width * 0.9) / inner.width
            vScale = (outer.height * 0.9) / inner.height
            scale = Math.min(hScale, vScale)
            // find center
            var center = {
              x: inner.x,
              y: inner.y,
            }
            // set zoom
            canvas.zoom(scale, center)
          }
        }
      },
      'fitview': {
        group: 'view',
        className: 'mdi-overscan mdi',
        title: 'fit to screen',
        action: {
          click: function(event) {
            canvas.zoom('fit-viewpoint')
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
                modeling.removeElements(
                    els
                )
            }
          }
        }
      },
    };
  };