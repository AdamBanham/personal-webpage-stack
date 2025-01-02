import TSRenderer from "./TSRender";
import TSTextRenderer from "./TSTextRenderer"

export default {
    __init__ : ['tsRenderer'],
    tsRenderer: ['type', TSRenderer],
    textRenderer: ['type', TSTextRenderer]
}