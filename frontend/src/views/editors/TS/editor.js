import Diagram from 'diagram-js';

import ConnectModule from 'diagram-js/lib/features/connect';
import ConnectPreview from 'diagram-js/lib/features/connection-preview'
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import CreateModule from 'diagram-js/lib/features/create';
import LassoToolModule from 'diagram-js/lib/features/lasso-tool';
import ModelingModule from 'diagram-js/lib/features/modeling';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import MoveModule from 'diagram-js/lib/features/move';
import OutlineModule from 'diagram-js/lib/features/outline';
import PaletteModule from 'diagram-js/lib/features/palette';
import ResizeModule from 'diagram-js/lib/features/resize';
import RulesModule from 'diagram-js/lib/features/rules';
import SelectionModule from 'diagram-js/lib/features/selection';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import SnappingModule from 'diagram-js/lib/features/snapping'

// custom providers
import ProvidersModule from './providers';

// custom renderers
import TSRenderer from './draw';

// custom element factory
import elementFactory from './elements'

// custom connect
import customConnect from "./connect"

/**
 * A module that changes the default diagram look.
 */
const ElementStyleModule = {
    __init__: [
      [ 'defaultRenderer', function(defaultRenderer) {
        // override default styles
        defaultRenderer.CONNECTION_STYLE = { fill: 'none', strokeWidth: 5, stroke: '#000' };
        defaultRenderer.SHAPE_STYLE = { fill: '#303c4a', stroke: '#000', strokeWidth: 2 };
        // defaultRenderer.FRAME_STYLE = { fill: 'none', stroke: '#000', strokeDasharray: 4, strokeWidth: 2 };
      } ]
    ]
  };

export default function TSEditor(options) {

    const {
        container,
        additionalModules = [ TSRenderer, elementFactory ]
      } = options;

    

    // default modules provided by the toolbox
    const builtinModules = [
        ConnectModule,
        ConnectPreview,
        ContextPadModule,
        CreateModule,
        LassoToolModule,
        ModelingModule,
        MoveCanvasModule,
        // ResizeModule,
        MoveModule,
        OutlineModule,
        PaletteModule,
        RulesModule,
        SelectionModule,
        ZoomScrollModule,
        SnappingModule
    ];

    // our own modules, contributing controls, customizations, and more
    const customModules = [
        ProvidersModule,
        customConnect
    ];

    var diagram =  new Diagram({
        canvas: {
            container
        },
        modules: [
        ...builtinModules,
        ...customModules,
        ...additionalModules
        ],
        defaultRenderer: ['type', TSRenderer]
    });

    // diagram.get('canvas').addMarker('arrow', ```<marker
    //   id="arrow"
    //   viewBox="0 0 10 10"
    //   refX="5"
    //   refY="5"
    //   markerWidth="6"
    //   markerHeight="6"
    //   orient="auto-start-reverse">
    //   <path d="M 0 0 L 10 5 L 0 10 z" />
    // </marker>```)

    return diagram
}