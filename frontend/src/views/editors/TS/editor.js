import Diagram from 'diagram-js';

import ConnectModule from 'diagram-js/lib/features/connect';
import Clipboard from 'diagram-js/lib/features/clipboard';
import Rules from 'diagram-js/lib/features/rules';
import Mouse from 'diagram-js/lib/features/mouse';
import ConnectPreview from 'diagram-js/lib/features/connection-preview'
import ConnectionPreview from 'diagram-js/lib/features/connection-preview';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import CreateModule from 'diagram-js/lib/features/create';
import LassoToolModule from 'diagram-js/lib/features/lasso-tool';
import ModelingModule from 'diagram-js/lib/features/modeling';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import MoveModule from 'diagram-js/lib/features/move';
import OutlineModule from 'diagram-js/lib/features/outline';
import PaletteModule from 'diagram-js/lib/features/palette';
import BendingModule from 'diagram-js/lib/features/bendpoints';
import RulesModule from 'diagram-js/lib/features/rules';
import SelectionModule from 'diagram-js/lib/features/selection';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import SnappingModule from 'diagram-js/lib/features/snapping'
import LabelSupport from 'diagram-js/lib/features/label-support'
import ChangeSupport from 'diagram-js/lib/features/change-support'
import KeyboardSupport from 'diagram-js/lib/features/keyboard';
import CopyPasteSupport from 'diagram-js/lib/features/copy-paste';
import DistributeElements from 'diagram-js/lib/features/distribute-elements';
import GlobalConnect from 'diagram-js/lib/features/global-connect'; 
import EditorActions from 'diagram-js/lib/features/editor-actions';

// custom providers
import ProvidersModule from './providers';
import TSRenderer from './draw';
import elementFactory from './elements';
import customConnect from "./connect";
import gridModules from '../base/grid';
import customLayouter from './layout';
import tsKeyboardController from './keyboard';
import localStorage from './localStorage'
import tsRules from './rules';
import tsCopyPaste from './copyPaste';
import Importing from './importer';
import Exporting from './exporter';
import DocumentReflection from './document'

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
        additionalModules = [ TSRenderer,  ]
      } = options;

    

    // default modules provided by the toolbox
    const builtinModules = [
        Rules,
        Mouse,
        Clipboard,
        ConnectModule,
        ConnectPreview,
        ConnectionPreview,
        ContextPadModule,
        CreateModule,
        LassoToolModule,
        ModelingModule,
        MoveCanvasModule,
        BendingModule,
        MoveModule,
        OutlineModule,
        PaletteModule,
        RulesModule,
        SelectionModule,
        ZoomScrollModule,
        SnappingModule,
        LabelSupport,
        ChangeSupport,
        DistributeElements,
        GlobalConnect,
        EditorActions,
        KeyboardSupport,
    ];

    // our own modules, contributing controls, customizations, and more
    const customModules = [
      Importing,
      Exporting,
      ProvidersModule,
      customConnect,
      elementFactory,
      gridModules,
      customLayouter,
      tsKeyboardController,
      tsRules,
      tsCopyPaste,
      localStorage,
      DocumentReflection
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

    

    return diagram
}