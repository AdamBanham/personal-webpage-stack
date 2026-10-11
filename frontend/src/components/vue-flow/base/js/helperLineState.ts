import { shallowRef, type ShallowRef } from 'vue'

export interface HelperLineState {
    horizontal: ShallowRef<number | undefined>
    vertical: ShallowRef<number | undefined>
}

const states = new Map<string, HelperLineState>()

/** Guide lines shared by everything that snaps within one flow (node drags, edge waypoint drags). */
export default function useHelperLineState(flowId: string): HelperLineState {
    let state = states.get(flowId)
    if (!state) {
        state = { horizontal: shallowRef(undefined), vertical: shallowRef(undefined) }
        states.set(flowId, state)
    }
    return state
}
