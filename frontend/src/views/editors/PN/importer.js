import {
    assign
} from 'min-dash'

import {
    getConnectionMid
} from "diagram-js/lib/layout/LayoutUtil"
import PetriElementFactory from './elements/pertiElementFactory'
import PetriModeling from './modeling/petriModeling'

const XML_ILLEGALS = {
    '<' : '&lt;',
    '>' : '&gt;',
    "'" : '&apos;',
    '"' : '&quot;',
    '&' : '&amp;',
}


class TsXmlImporter {

    /**
     * 
     * @param {PetriModeling} modeling 
     * @param {PetriElementFactory} factory 
     * @param {*} canvas 
     * @param {*} registry 
     * @param {*} bus 
     * @param {*} txRenderer 
     */
    constructor(modeling, factory, canvas, registry, bus, txRenderer){
        this._modeling = modeling 
        this._factory = factory
        this._canvas = canvas
        this._registry = registry
        this._bus = bus
        this._txRender = txRenderer
    }

    decode(text){
        var ret = text
        for(const illegal in XML_ILLEGALS){
            ret = ret.replace(
                XML_ILLEGALS[illegal], illegal
            )
        }
        return ret
    }

    import(system){
        try {
            this._import(system)
        } catch (error){
            alert("Failed to parse and load in system :: "
                + error
            )
            throw error
        }
    }

    _import(system){
        // clear the system, except for root
        var that = this
        var els = this._registry.getAll().filter(
            (v) => {
                return !v.id.includes("implicitroot")
            }
        )
        if (els.length > 0){
            this._bus.fire('formal.clear', {})
            els.forEach(
                (el) => this._factory.releaseIdentifer(el)
            )
            this._modeling.removeElements(
                els
            )
        }
        // parse states
        var named_els = {}
        
        var places = system.getElementsByTagName("place")
        for (var place of places){
            var attrs = place.attributes
            var pos = place.getElementsByTagName("graphics")[0]
                .getElementsByTagName("position")[0]
            var context = {
                id: attrs.id.value,
                x: parseInt(pos.attributes.x.value),
                y: parseInt(pos.attributes.y.value),
            }
            var shape = this._factory.createPlace(
                context
            )
            this._factory.logIdentifer(shape.id)
            const mshape = this._modeling.createShape(
                shape, {x: shape.x+shape.width/2, y:shape.y + shape.height/2}, 
                this._canvas.getRootElement(),
                1
            )
            named_els[mshape.id] = mshape
        }
        // parse transitions 
        var trans = system.getElementsByTagName("transition")
        for (var tran of trans){
            var attrs = tran.attributes
            console.log(trans)
            var pos = tran.getElementsByTagName("graphics")[0]
                .getElementsByTagName("position")[0]
            var label = this.decode(tran.getElementsByTagName("name")[0]
                .textContent).trim()
            var context = {
                id: attrs.id.value,
                x: parseInt(pos.attributes.x.value),
                y: parseInt(pos.attributes.y.value),
                labelText: label
            }
            var shape = this._factory.createTransition(
                context, attrs.invisible.value == "true"
            )
            this._factory.logIdentifer(shape.id)
            const mshape = this._modeling.createShape(
                shape, {x: shape.x + shape.width/2, y:shape.y + shape.height/2}, 
                this._canvas.getRootElement(),
                1
            )
            named_els[mshape.id] = mshape
        }
        // parse flows
        var arcs = system.getElementsByTagName("arc")
        for (var arc of arcs){
            var attrs = arc.attributes
            var src = named_els[attrs.source.value]
            var tgt = named_els[attrs.target.value]
            if (arc.getElementsByTagName("graphics").length > 0){
                var points = []
                var tmp = arc.getElementsByTagName("graphics")[0]
                .getElementsByTagName("position");
                for(var pos of tmp){
                    points.push({
                        x: parseInt(pos.attributes.x.value),
                        y: parseInt(pos.attributes.y.value)
                    });
                }
                points = points.map((p) => {
                    return {
                        x: p.x,
                        y: p.y
                    }
                })
            } else {
                var points = [
                    {x: src.x, y: src.y},
                    {x: tgt.x, y: tgt.y}
                ]
            }
            
            var context = {
                id: attrs.id.value,
                source: src,
                target: tgt,
                waypoints: points
            }
            var shape = this._factory.createFlow(
                context
            )
            this._factory.logIdentifer(shape.id)
            const mshape = this._modeling.createConnection(
                src, tgt, 
                shape,
                this._canvas.getRootElement()
            )
            this._modeling.layoutConnection(
                mshape
            )
            named_els[shape.id] = mshape
            // this._modeling.reconnectStart(mshape, src, {x: src.x+src.width/2, y: src.y+tgt.height/2})
            // this._modeling.reconnectEnd(mshape, tgt, {x: tgt.x+tgt.width/2, y: tgt.y+tgt.height/2})
            // this._modeling.updateWaypoints(mshape, points)
        }
        // move all states to ensure a clean start
        var bus = this._bus
        var modeler = this._modeling
        var push = 1
        for(var k in named_els){
            const item = named_els[k]
            setTimeout( () => 
            {
                modeler.moveShape(item,
                    {x: 0.01, y:0.01},
                    false,
                    {
                        recurse: false,
                        layout: true
                    }
                )
                bus.fire('element.changed', 
                    {element: item}
                )
                bus.fire('elements.changed', 
                    {elements: [item]}
                )
            }
            , push) 
            push += 1
        }
    }
}

export default TsXmlImporter