import Diagram from 'diagram-js/lib/Diagram';

// builtin modules
import ConnectModule from 'diagram-js/lib/features/connect';
import ConnectPreview from 'diagram-js/lib/features/connection-preview';
import CreateModule from 'diagram-js/lib/features/create';
import ModelingModule from 'diagram-js/lib/features/modeling';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import MoveModule from 'diagram-js/lib/features/move';
import PaletteModule from 'diagram-js/lib/features/palette';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import SnappingModule from 'diagram-js/lib/features/snapping';
import LassoToolModule from 'diagram-js/lib/features/lasso-tool';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import KeyBoardModule from 'diagram-js/lib/features/keyboard';
import LabelSupportModule from 'diagram-js/lib/features/label-support';
import BendpointsModule from 'diagram-js/lib/features/bendpoints';
import SelectionModule from 'diagram-js/lib/features/selection';
import SpacerToolModule from 'diagram-js/lib/features/space-tool';

// additionals modules
import gridModule from './modules/grid';
import paletteProvider from './modules/palette';
import ormFactory from './modules/elements';
import ormRenderer from './modules/render';
import ormModeling from "./modules/modeling";
import ordering from "./modules/ordering";
import ormContextPads from "./modules/contextPad";
import ormConnect from "./modules/connect";
import ormRules from "./modules/rules";
import placementService from "./modules/placement";
import ormInteractions from "./modules/interactions";   
import ormLayouter from "./modules/layout";
import ormLabelEditing from "./modules/labels";
import customBendpoints from "./modules/bendpoints";
import ormConstraints from "./modules/constraints";
import ormKeyboard from "./modules/keyboard";
import ormVscodeHandler from "./modules/vscode";
import ormDragging from "./modules/dragging";
import ormObjectification from "./modules/objectification";
import ormMoving from "./modules/move";
import OrmInteractionEvents from './modules/interaction-events';
import OrmHelpInteractions from './modules/help-interactions';
import OrmRenderingOptions from './modules/renderOptions';
import OrmTabModel from './modules/tab-model';
import OrmLocalExporter from './modules/exporter';
import OrmFileImporter from './modules/importers';

import { scaleToFitElements } from './modules/utils/canvasUtils';

export default function ORMEditor(container: HTMLElement): Diagram<null> {

    // default modules provided by the toolbox
    const builtinModules = [
        ConnectModule,
        ConnectPreview,
        CreateModule,
        ModelingModule,
        MoveCanvasModule,
        MoveModule,
        LassoToolModule,
        PaletteModule,
        ZoomScrollModule,
        SnappingModule,
        ContextPadModule,
        KeyBoardModule,
        LabelSupportModule,
        BendpointsModule,
        SelectionModule,
        SpacerToolModule
    ];

    // additiona modules for the orm-editor
    const additionalModules = [
        ormConnect,
        ormRules,
        gridModule,
        paletteProvider,
        ormFactory,
        OrmRenderingOptions,
        ormRenderer,
        ormModeling,
        ordering,
        ormContextPads,
        placementService,
        ormInteractions,
        ormLayouter,
        ormLabelEditing,
        customBendpoints,
        ormConstraints,
        ormKeyboard,
        ormVscodeHandler,
        ormDragging,
        ormObjectification,
        ormMoving,
        OrmInteractionEvents,
        OrmHelpInteractions,
        OrmTabModel,
        OrmLocalExporter,
        OrmFileImporter
    ];

    var diagram =  new Diagram({
        canvas: {
            container
        },
        modules: [
            ...builtinModules,
            ...additionalModules
        ],
        'keyboard.bind' : true
    });

    setTimeout(
        () => {
            let canvas = (diagram.get('canvas') as any);
            scaleToFitElements(canvas);
        }, 50
    );

    return diagram;
}