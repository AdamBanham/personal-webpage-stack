import OrmShortcuts from "./ormShortcuts.js";
import ormKeyboardHelp from "./helpProvider.js";

export default {
    __depends__ : ['keyboard', 'selection'],
    __init__ : ['ormShortcuts', 'ormKeyboardHelp'],
    ormShortcuts : ['type', OrmShortcuts],
    ormKeyboardHelp : ['type', ormKeyboardHelp]
};