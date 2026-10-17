import { ref, watch } from "vue";
import { NodeTypes } from ".";

type StyledNodeTypes = Exclude<NodeTypes, 'token'>

interface NodeDefaults {
    color?: string
}

type Defaults = Record<StyledNodeTypes, NodeDefaults>

const STORAGE_KEY = 'petri-net-node-defaults'

function readStored(): Defaults {
    const empty: Defaults = { place: {}, transition: {} }
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return empty

        const stored = JSON.parse(raw)
        // only keep well formed colours, so a stale or tampered entry can't break the nodes
        for (const type of Object.keys(empty) as StyledNodeTypes[]) {
            const color = stored?.[type]?.color
            if (typeof color === 'string' && /^#[0-9a-f]{3,8}$/i.test(color)) {
                empty[type].color = color
            }
        }
    } catch {
        // storage blocked or unreadable entry: fall back to the stock look
    }
    return empty
}

function writeStored(value: Defaults) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
        // storage blocked or full: the defaults still apply for this visit
    }
}

const defaults = ref<Defaults>(readStored())
watch(defaults, writeStored, { deep: true })

export default function useNodeDefaults() {

    function defaultColorFor(type: NodeTypes): string | undefined {
        return type === 'token' ? undefined : defaults.value[type].color
    }

    /** pass undefined to go back to the stock look */
    function setDefaultColor(type: StyledNodeTypes, color: string | undefined) {
        defaults.value[type].color = color
    }

    /** the data a freshly created node of this type should start with */
    function defaultDataFor(type: NodeTypes): Record<string, any> {
        const color = defaultColorFor(type)
        return color ? { color } : {}
    }

    return {
        defaultColorFor,
        setDefaultColor,
        defaultDataFor,
    }
}
