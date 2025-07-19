import EventBus from 'diagram-js/lib/core/EventBus';
import {
    query as domQuery,
} from 'min-dom';

import {
    innerSVG
} from 'tiny-svg';

export type PREFIX = "exporting.svg."
export type SUFFIX = "export"
export type EVENTS = `${PREFIX}${SUFFIX}`

export default class SvgExporting {

    static $inject = [ 
        'eventBus',
        'canvas'
    ];

    _bus: EventBus<any>;
    _canvas: any;

    constructor(eventBus: EventBus<any>, canvas: any) {
        this._bus = eventBus;
        this._canvas = canvas;

        this._bus.on('exporting.svg.export', this.export.bind(this));
    }

    fire(event: EVENTS) {
        return this._bus.fire(event);
    }

    export() : string {
        var svg;
        try {        
            const contentNode = this._canvas.getActiveLayer(),
                  defsNode = domQuery(':scope > defs', this._canvas._svg);
        
            const contents = innerSVG(contentNode),
                  defs = defsNode ? '<defs>' + innerSVG(defsNode) + '</defs>' : '';
        
            const bbox = contentNode.getBBox();
        
            svg =
              '<?xml version="1.0" encoding="utf-8"?>\n' +
              '<!-- created with the help of adam banham / http://adambanham.io -->\n' +
              '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
              '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
              'width="' + bbox.width + '" height="' + bbox.height + '" ' +
              'viewBox="' + bbox.x + ' ' + bbox.y + ' ' + bbox.width + ' ' + bbox.height + '" version="1.1">' +
              defs + contents +
              '</svg>';
          } catch (err) {
            alert("Unable to serialise svg :: " +
                err
            )
            return null
          }
          return svg
    }

}