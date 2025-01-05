import {
    isState,
    isInternalState,
    isEndingState,
    isStartingState
} from "./elements/TSElementFactory"

const XML_HEAD = 
`
<?xml version="1.0" encoding="UTF-8"?>\n
<transition-system>\n
`

const XML_TAIL = 
`
</transition-system>
`


class TsXmlExporter {

    constructor(registry){
        this._registry = registry
        this._xml = ""
    }

    export(){
        this._xml = this.createHead()
        var that = this
        // process states first
        var check = isState
        var els = this._registry.filter(check)
        var f = function(el,gfx) {
            return that.serialise(that,el,gfx)
        }
        els.forEach(f)
        // process arcs next
        check = (el) => {return !isState(el)}
        els = this._registry.filter(check)
        els.forEach(f)
        // add tail and return
        return this._xml + this.createTail()
    }

    createHead(){
return `<?xml version="1.0" encoding="UTF-8"?>
<transition-system>\n`
    }

    serialise(self, element, gfx){
        if (element.id.includes('implicitroot'))
            return
        if(isState(element)){
            self._xml += self.serialiseState(element,gfx)
        } else {
            self._xml += self.serialiseArc(element,gfx)
        }
    }

    serialiseState(state, gfx){
        console.log(state, gfx)
return `\t<state id="`+ state.id +`" type="` + state.stateType +`">
\t\t<label>`
+ (state.stateLabel != null ? state.stateLabel.trim() : "") +
`</label>
\t\t<position x="` + state.x + `" y="` + state.y + `" />
\t</state>\n`
    }

    serialiseArc(arc,gfx){
        console.log(arc, gfx)
return `\t<arc id="` + arc.id + `">
\t\t<label>`
+ (arc.arcLabel != null ? arc.arcLabel.trim() : "") + 
`</label>
\t\t<source id="` + arc.source.id +`" />
\t\t<target id="` + arc.target.id +`" />
\t</arc>\n`
    }

    createTail(){
        return `</transition-system>`
    }
}

export default TsXmlExporter