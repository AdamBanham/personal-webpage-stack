import LocalSessionStorage from "./localSession"
import FileExporter from "./fileExporter"

export default {
    __init__: [ 'localStorage', 'fileExporter' ],
    localStorage: [ 'type', LocalSessionStorage ],
    fileExporter: [ 'type', FileExporter ]
}