import Exporting from './exporter';
import SvgExporting from './svgExporter';

export default {
    __init__: [ 'exporting' , 'svgExporting' ],
    exporting: [ 'type', Exporting ],
    svgExporting: [ 'type', SvgExporting ]
}