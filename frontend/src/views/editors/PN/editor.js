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
import BendingModule from 'diagram-js/lib/features/bendpoints';
import RulesModule from 'diagram-js/lib/features/rules';
import SelectionModule from 'diagram-js/lib/features/selection';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import SnappingModule from 'diagram-js/lib/features/snapping';
import LabelSupport from 'diagram-js/lib/features/label-support';
import ChangeSupport from 'diagram-js/lib/features/change-support';
import Rules from 'diagram-js/lib/features/rules';
import KeyboardSupport from 'diagram-js/lib/features/keyboard';
import EditorActions from 'diagram-js/lib/features/editor-actions';
import CopyPaste from 'diagram-js/lib/features/copy-paste';
import GlobalConnect from 'diagram-js/lib/features/global-connect'; 

// custom providers
import ProvidersModule from './providers';
import TSRenderer from './draw';
import elementFactory from './elements';
import customModeling from './modeling';
import PetriRules from './rules';
import customConnect from './connect';
import GridModule from '../base/grid';
import PetriLayout from './layout';
import ImportingPetriNets from './importer';
import ExportingPetriNets from './exporter';
import LocalSessionStorage from './localStorage';
import DocumentReflection from './document';
import CustomCopyPaste from './copyPaste';
import CustomBendingModule from "./bendpoints"

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
        KeyboardSupport,
        ConnectModule,
        ConnectPreview,
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
        Rules,
        GlobalConnect,
        EditorActions,
        CopyPaste
    ];

    // our own modules, contributing controls, customizations, and more
    const customModules = [
        ProvidersModule,
        customConnect,
        elementFactory,
        customModeling,
        PetriRules,
        GridModule,
        PetriLayout,
        ImportingPetriNets,
        ExportingPetriNets,
        LocalSessionStorage,
        DocumentReflection,
        CustomCopyPaste,
        CustomBendingModule
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