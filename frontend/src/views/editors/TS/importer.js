
class TsXmlImporter {

    constructor(modeling, factory, canvas, registry){
        this._modeling = modeling 
        this._factory = factory
        this._canvas = canvas
        this._registry = registry
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
                stateLabel: label.textContent
            }
            var shape = this._factory.createState(
                context, attrs.type.value
            )
            named_els[shape.id] = shape
            this._factory.logIdentifer(shape.id)
            this._modeling.createShape(
                shape, {x: shape.x, y:shape.y}, this._canvas.getRootElement()
            )
        }
        // parse arcs
        var arcs = system.getElementsByTagName("arc")
        for(var arc of arcs){
            var attrs = arc.attributes 
            var label = arc.getElementsByTagName("label")[0].textContent 
            var src = arc.getElementsByTagName("source")[0].attributes
            var tgt = arc.getElementsByTagName("target")[0].attributes
            var connect = this._factory.createConnectionBetweenStates(
                attrs.id.value, 
                named_els[src.id.value],
                named_els[tgt.id.value],
            );
            connect.arcLabel = label
            this._factory.logIdentifer(connect.id)
            this._modeling.createConnection(
                connect.source,
                connect.target,
                1,
                connect,
                this._canvas.getRootElement()
            )
            this._modeling.layoutConnection(connect)
        }
        // move all states to ensure a clean start
        for(var k in named_els){
            this._modeling.moveShape(
                named_els[k],
                {x:0,y:0}
            )
        }
    }
}

export default TsXmlImporter