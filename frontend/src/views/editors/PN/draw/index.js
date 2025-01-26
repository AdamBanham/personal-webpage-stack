import PetriRenderer from "./petriRender";
import TSTextRenderer from "./TSTextRenderer"

export default {
    __init__ : ['petriRenderer'],
    petriRenderer: ['type', PetriRenderer],
    textRenderer: ['type', TSTextRenderer]
}