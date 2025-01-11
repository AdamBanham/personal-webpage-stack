import {
    isState,
    isInternalState,
    isEndingState,
    isStartingState
} from "./elements/TSElementFactory"

import  {
    isLabel, isConnection
  } from "diagram-js/lib/util/ModelUtil"

const XML_HEAD = 
`
<?xml version="1.0" encoding="UTF-8"?>\n
<transition-system>\n
`

const XML_TAIL = 
`
</transition-system>
`

const XML_ILLEGALS = {
    '&' : '&amp;',
    '<' : '&lt;',
    '>' : '&gt;',
    "'" : '&apos;',
    '"' : '&quot;'
}


class TsXmlExporter {

    constructor(registry){
        this._registry = registry
        this._xml = ""
    }

    encode(text){
        var ret = text
        for(const illegal in XML_ILLEGALS){
            ret = ret.replace(
                illegal, XML_ILLEGALS[illegal]
            )
        }
        return ret
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
        } else if (isConnection(element)) {
            self._xml += self.serialiseArc(element,gfx)
        } else {

        }
    }

    serialiseState(state, gfx){
        // console.log(state, gfx)
return `\t<state id="`+ state.id +`" type="` + state.stateType +`">
\t\t<label>`
+ (state.stateLabel != null ? this.encode(state.stateLabel.trim()) : "") +
`</label>
\t\t<position x="` + state.x + `" y="` + state.y + `" />
\t</state>\n`
    }

    serialiseArc(arc,gfx){
        // console.log(arc, gfx)
var ret = `\t<arc id="` + arc.id + `">
\t\t<label>`
+ (arc.arcLabel != null ? this.encode(arc.arcLabel.trim()) : "") + 
`</label>
\t\t<source id="` + arc.source.id +`" />
\t\t<target id="` + arc.target.id +`" />
\t\t<waypoints>\n`
for(const way of arc.waypoints){
    ret += `\t\t\t<position x="` + way.x + `" y="` + way.y + `" />\n`
}

return ret + `\t\t</waypoints>
\t</arc>\n`
    }

    createTail(){
        return `</transition-system>`
    }
}

export default TsXmlExporter