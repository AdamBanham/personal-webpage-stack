
import {stateRadius} from "../elements/staticShapeDesc.js"

/**
 * A example palette provider.
 */
export default function ExamplePaletteProvider(
    create, elementFactory, lassoTool, palette, connect) {
    this._create = create;
    this._elementFactory = elementFactory;
    this._lassoTool = lassoTool;
    this._palette = palette;
    this._connect = connect;
  
    palette.registerProvider(this);
  }
  
  ExamplePaletteProvider.$inject = [
    'create',
    'elementFactory',
    'lassoTool',
    'palette',
    'connect',
  ];
  
  
  ExamplePaletteProvider.prototype.getPaletteEntries = function() {
    var create = this._create,
        elementFactory = this._elementFactory,
        lassoTool = this._lassoTool,
        connect = this._connect;
  
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
          click: function() {
            var shape = elementFactory.createInternalState({
              x: 0, y:0
            });
  
            create.start(event, shape);
          }
        }
      },
      'create-sshape': {
        group: 'create',
        className: 'mdi-play-circle-outline mdi palette-green',
        title: 'Create Starting State',
        action: {
          click: function() {
            var shape = elementFactory.createStartingState({
              x: 0, y:0
            });
  
            create.start(event, shape);
          }
        }
      },
      'create-eshape': {
        group: 'create',
        className: 'mdi-stop-circle-outline mdi palette-red',
        title: 'Create Ending State',
        action: {
          click: function() {
            var shape = elementFactory.createEndingState({
              x: 0, y:0
            });
  
            create.start(event, shape);
          }
        }
      },
      // 'create-connection': {
      //   group: 'create',
      //   className: 'mdi-arrow-right-thick mdi',
      //   title: 'Connect States',
      //   action: {
      //     click: function() {
      //       var shape = elementFactory.createConnection({
      //       });
  
      //       connect.start(event, shape);
      //     }
      //   }
      // }
    };
  };