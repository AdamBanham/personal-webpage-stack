import {
    query as domQuery,
} from 'min-dom';

import {
    innerSVG
} from 'tiny-svg';

class SvgSaver {

    constructor(canvas){
        this._canvas = canvas
    }

    save(){
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

export default SvgSaver