import {
    assign
} from 'min-dash'

import {
    getConnectionMid
} from "diagram-js/lib/layout/LayoutUtil"

const XML_ILLEGALS = {
    '<' : '&lt;',
    '>' : '&gt;',
    "'" : '&apos;',
    '"' : '&quot;',
    '&' : '&amp;',
}


class TsXmlImporter {

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
            this._modeling.removeElements(
                els
            )
        }
        // parse states
        var named_els = {}
        
        var states = system.getElementsByTagName("state")
        for (var state of states){
            var attrs = state.attributes
            var pos = state.getElementsByTagName("position")[0]
            var label = state.getElementsByTagName("label")[0]
            var context = {
                id: attrs.id.value,
                x: pos.attributes.x.value,
                y: pos.attributes.y.value,
                stateLabel: this.decode(label.textContent)
            }
            var shape = this._factory.createState(
                context, attrs.type.value
            )
            named_els[shape.id] = shape
            this._factory.logIdentifer(shape.id)
            this._modeling.createShape(
                shape, {x: shape.x, y:shape.y}, 
                this._canvas.getRootElement(),
                1
            )
        }
        // parse arcs
        var arcs = system.getElementsByTagName("arc")
        for(var arc of arcs){
            var attrs = arc.attributes 
            var label = this.decode(
                arc.getElementsByTagName("label")[0].textContent 
            )
            var src = arc.getElementsByTagName("source")[0].attributes
            var tgt = arc.getElementsByTagName("target")[0].attributes
            var connect = this._factory.createConnectionBetweenStates(
                attrs.id.value, 
                named_els[src.id.value],
                named_els[tgt.id.value],
            );
            var waypoints = []
            var svgWay = arc.getElementsByTagName("waypoints")
            if (svgWay.length > 0){
                svgWay = svgWay[0].getElementsByTagName("position")
                for(const svgWayPoint of svgWay){
                    waypoints.push({
                        x: svgWayPoint.attributes.x.value - connect.source.r,
                        y: svgWayPoint.attributes.y.value - connect.source.r,
                    })
                }
                connect.waypoints = [].concat(waypoints)
            }
            connect.arcLabel = label
            this._factory.logIdentifer(connect.id)
            var nc = this._modeling.createConnection(
                connect.source,
                connect.target,
                -1,
                connect,
                this._canvas.getRootElement()
            )
            if (!connect.selfLoop){
                if (connect.waypoints.length < 2){
                    this._modeling.layoutConnection(connect)
                }
                this._bus.fire('elements.changed', {
                    elements: [connect.source, connect.target, connect]
                })

            } else {
                // nc.waypoints = waypoints
            }

            var elLabel = this._factory.createLabel({
                text: label,
                width: 50,
                height: 12,
                labelTarget: connect,
                x: 0
            })
            assign(label, this._txRender.getTextAnnotationBounds(
                elLabel, label
            ))
            this._modeling.createLabel(
                connect,
                getConnectionMid(connect),
                elLabel,
                connect
            )
            
        }
        // move all states to ensure a clean start
        var bus = this._bus
        var modeler = this._modeling
        var push = 1
        for(var k in named_els){
            const item = named_els[k]
            this._modeling.moveShape(item,
                {x: 1, y:1},
                false,
                {
                    recurse: false,
                    layout: false
                }
            )
            setTimeout( () => 
            {
                bus.fire('element.changed', 
                    {element: item}
                )
                modeler.moveShape(item,
                    {x: -1, y:-1},
                    false,
                    {
                        recurse: false,
                        layout: false
                    }
                )
            }
            , push) 
            push += 1
        }
    }
}

export default TsXmlImporter