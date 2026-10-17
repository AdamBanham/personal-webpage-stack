import { useVueFlow, type Edge, type GraphNode, type XYPosition } from '@vue-flow/core'
import {
    computed, effectScope, getCurrentScope, onScopeDispose, ref, shallowRef, watch,
    type EffectScope, type Ref, type ShallowRef,
} from 'vue'
import useIdentities from './useIdentities'

/** tokens taken from (or put into) one place by a single firing */
export interface PlaceTokens {
    placeId: string
    /** the arc the tokens travel along */
    edgeId: string
    tokenIds: string[]
}

/** a set of tokens that, together, enable a transition */
export interface Binding {
    /** stable identity: transition plus its sorted token ids */
    key: string
    transitionId: string
    inputs: PlaceTokens[]
    /** every token in `inputs`, flattened */
    tokenIds: string[]
}

export interface FiringRecord {
    /** 1-based position in the firing history */
    step: number
    transitionId: string
    binding: Binding
    consumed: PlaceTokens[]
    produced: PlaceTokens[]
    firedAt: Date
}

export interface BindingsComputedEvent {
    transitionId: string
    bindings: Binding[]
    /** more bindings exist than `maxBindings` allowed to be listed */
    truncated: boolean
}

export interface BeforeFireEvent {
    transitionId: string
    binding: Binding
    /** veto this firing; nothing is consumed or produced */
    cancel: () => void
}

/** a token in flight along an arc, rendered by FiringTokenLayer */
export interface TokenFlight {
    id: string
    /** consumed tokens travel in, produced tokens travel out */
    kind: 'input' | 'output'
    edgeId: string
    path: string
    duration: number
    delay: number
    done: () => void
}

export interface FiringOptions {
    /** animate tokens along arcs while firing (default true) */
    animate?: boolean
    /** cap on the bindings listed per transition, the product of token choices grows fast (default 50) */
    maxBindings?: number
    /** ms per unit of arc length, clamped to [minDuration, maxDuration] */
    msPerPixel?: number
    minDuration?: number
    maxDuration?: number
    /** ms the transition flashes for, between its inputs arriving and its outputs leaving */
    flashDuration?: number
}

type Listener<T> = (payload: T) => void | Promise<void>

interface HookOptions {
    /** also call the listener straight away with the current state, where the hook has one */
    immediate?: boolean
}

interface Hook<T> {
    on: (fn: Listener<T>, options?: HookOptions) => { off: () => void }
    trigger: (payload: T) => Promise<void>
}

/** `current` supplies the payloads replayed to `immediate` listeners */
function createHook<T>(current?: () => T[]): Hook<T> {
    const listeners = new Set<Listener<T>>()

    return {
        on(fn, options = {}) {
            listeners.add(fn)
            const off = () => listeners.delete(fn)
            // listeners registered from a component go away with it
            if (getCurrentScope()) onScopeDispose(off)
            if (options.immediate) current?.().forEach((payload) => fn(payload))
            return { off }
        },
        async trigger(payload) {
            await Promise.all([...listeners].map((fn) => fn(payload)))
        },
    }
}

interface FiringState {
    options: Required<FiringOptions>
    history: Ref<FiringRecord[]>
    isFiring: Ref<boolean>
    flights: Ref<TokenFlight[]>
    /** transition currently flashing, once its inputs have arrived */
    flashing: Ref<string | null>
    /** binding the user is hovering in a picker; its tokens are highlighted */
    previewBinding: ShallowRef<Binding | null>
    /** FiringTokenLayer instances mounted, without one there is nothing to animate */
    layers: Ref<number>
    hooks: {
        bindingsComputed: Hook<BindingsComputedEvent>
        beforeFire: Hook<BeforeFireEvent>
        fired: Hook<FiringRecord>
        historyCleared: Hook<void>
        bindingPreviewed: Hook<Binding | null>
    }
    /** detached: shared watchers outlive the component that happened to create them */
    scope: EffectScope
    bindings: ShallowRef<Map<string, BindingsComputedEvent>>
    /** whether the shared watchers have been set up, which needs the flow's store */
    started: boolean
}

const DEFAULTS: Required<FiringOptions> = {
    animate: true,
    maxBindings: 50,
    msPerPixel: 6,
    minDuration: 450,
    maxDuration: 1400,
    flashDuration: 500,
}

type FlowStore = ReturnType<typeof useVueFlow>

// shared per flow instance, so nodes, panels and the editor all see the same firing state;
// keyed by the store so a remounted editor starts afresh
const states = new WeakMap<FlowStore, FiringState>()

function getState(store: FlowStore, options: FiringOptions): FiringState {
    let state = states.get(store)
    if (!state) {
        const bindings = shallowRef(new Map<string, BindingsComputedEvent>())
        const preview = shallowRef<Binding | null>(null)
        state = {
            options: { ...DEFAULTS },
            history: ref([]),
            isFiring: ref(false),
            flights: ref([]),
            flashing: ref(null),
            previewBinding: preview,
            layers: ref(0),
            hooks: {
                bindingsComputed: createHook(() => [...bindings.value.values()]),
                beforeFire: createHook(),
                fired: createHook(),
                historyCleared: createHook(),
                bindingPreviewed: createHook(() => [preview.value]),
            },
            scope: effectScope(true),
            bindings,
            started: false,
        }
        states.set(store, state)
    }
    Object.assign(state.options, options)
    return state
}

/** k-subsets of `items`, in order */
function combinations<T>(items: T[], k: number): T[][] {
    if (k === 0) return [[]]
    const out: T[][] = []
    items.forEach((item, i) => {
        for (const rest of combinations(items.slice(i + 1), k - 1)) out.push([item, ...rest])
    })
    return out
}

export function arcWeight(edge: Edge): number {
    const weight = Number(edge.data?.weight ?? 1)
    return Number.isInteger(weight) && weight > 0 ? weight : 1
}

/** somewhere inside the place's outline, clear of the border */
export function randomTokenPosition(place: GraphNode): XYPosition {
    const { width, height } = place.dimensions
    return {
        x: 10 + Math.random() * Math.max(width - 20, 0),
        y: 10 + Math.random() * Math.max(height - 20, 0),
    }
}

const sameMembers = (a: string[], b: Set<string>) => a.length === b.size && a.every((id) => b.has(id))

/**
 * Firing of transitions for a Petri net drawn in vue-flow.
 *
 * A transition is enabled when every input place holds at least as many tokens as its arc weight
 * (`edge.data.weight`, default 1). A binding picks which tokens are consumed. Firing removes them,
 * flies them along the input arcs, then flies new tokens along the output arcs into the output places.
 *
 * State is shared per flow id: call it from any component inside the editor to fire,
 * read the history, or listen with `onBindingsComputed`, `onBeforeFire`, `onFired`, `onHistoryCleared`
 * and `onBindingPreviewed`.
 */
export default function useFiring(flowId: string, options: FiringOptions = {}) {
    const store = useVueFlow(flowId)
    const state = getState(store, options)
    const { getNodes, getEdges, findNode, removeNodes, addNodes, addSelectedNodes, removeSelectedNodes, getSelectedNodes, vueFlowRef } =
        store
    const { getNext } = useIdentities()

    const tokensIn = (placeId: string) => getNodes.value.filter((n) => n.type === 'token' && n.parentNode === placeId)

    function inputArcs(transitionId: string) {
        return getEdges.value.filter((e) => e.target === transitionId && findNode(e.source)?.type === 'place')
    }

    function outputArcs(transitionId: string) {
        return getEdges.value.filter((e) => e.source === transitionId && findNode(e.target)?.type === 'place')
    }

    function computeBindings(transitionId: string): BindingsComputedEvent {
        const limit = state.options.maxBindings
        // per input arc, every way of picking `weight` of the place's tokens
        const choices = inputArcs(transitionId).map((edge) => ({
            edge,
            picks: combinations(tokensIn(edge.source).map((t) => t.id), arcWeight(edge)),
        }))

        let partial: PlaceTokens[][] = [[]]
        let truncated = false
        for (const { edge, picks } of choices) {
            const next: PlaceTokens[][] = []
            for (const prefix of partial) {
                // two arcs from the same place cannot take the same token
                const taken = new Set(prefix.flatMap((p) => p.tokenIds))
                for (const tokenIds of picks) {
                    if (tokenIds.some((id) => taken.has(id))) continue
                    if (next.length >= limit) {
                        truncated = true
                        break
                    }
                    next.push([...prefix, { placeId: edge.source, edgeId: edge.id, tokenIds }])
                }
            }
            partial = next
        }

        const bindings = partial.map((inputs) => {
            const tokenIds = inputs.flatMap((p) => p.tokenIds)
            return { key: `${transitionId}:${[...tokenIds].sort().join(',')}`, transitionId, inputs, tokenIds }
        })
        return { transitionId, bindings, truncated }
    }

    if (!state.started) state.scope.run(() => {
        state.started = true

        // only the net's structure matters for bindings; this stays equal while nodes are dragged
        const structure = computed(() =>
            JSON.stringify([
                getNodes.value.filter((n) => n.type !== 'place').map((n) => [n.id, n.type, n.parentNode]),
                getEdges.value.map((e) => [e.id, e.source, e.target, arcWeight(e)]),
            ]),
        )

        const bindings = state.bindings

        // recompute on structural change only, and announce each transition whose bindings changed
        watch(
            structure,
            () => {
                const before = bindings.value
                const now = new Map<string, BindingsComputedEvent>()
                for (const t of getNodes.value.filter((n) => n.type === 'transition')) {
                    now.set(t.id, computeBindings(t.id))
                }
                bindings.value = now

                const keysOf = (e?: BindingsComputedEvent) => e?.bindings.map((b) => b.key).join('|')
                for (const [id, event] of now) {
                    if (!before.has(id) || keysOf(before.get(id)) !== keysOf(event)) {
                        state.hooks.bindingsComputed.trigger(event)
                    }
                }
            },
            { immediate: true },
        )
    })
    const bindings = state.bindings

    const bindingsFor = (transitionId: string) => bindings.value.get(transitionId)?.bindings ?? []
    const isEnabled = (transitionId: string) => bindingsFor(transitionId).length > 0
    const isTruncated = (transitionId: string) => bindings.value.get(transitionId)?.truncated ?? false
    const enabledTransitions = computed(() => [...bindings.value].filter(([, e]) => e.bindings.length).map(([id]) => id))

    const selectedTokenIds = computed(() => getSelectedNodes.value.filter((n) => n.type === 'token').map((n) => n.id))
    const selectedTransitionIds = computed(() =>
        getSelectedNodes.value.filter((n) => n.type === 'transition').map((n) => n.id),
    )

    /** bindings made of exactly the selected tokens: each one can be fired as is */
    const fireableSelection = computed<Binding[]>(() => {
        const selected = new Set(selectedTokenIds.value)
        if (!selected.size) return []
        return [...bindings.value.values()].flatMap((e) => e.bindings.filter((b) => sameMembers(b.tokenIds, selected)))
    })

    /** bindings the user can choose from: those of selected transitions, or those that include every selected token */
    const candidateBindings = computed<Binding[]>(() => {
        const selected = selectedTokenIds.value
        const transitions = new Set(selectedTransitionIds.value)
        return [...bindings.value.values()].flatMap((e) =>
            e.bindings.filter(
                (b) =>
                    (transitions.size === 0 || transitions.has(b.transitionId)) &&
                    (transitions.size > 0 || selected.length > 0) &&
                    selected.every((id) => b.tokenIds.includes(id)),
            ),
        )
    })

    /** select exactly the binding's tokens, which makes it fireable from the selection */
    function selectBinding(binding: Binding) {
        removeSelectedNodes(getSelectedNodes.value)
        addSelectedNodes(binding.tokenIds.map((id) => findNode(id)).filter((n): n is GraphNode => !!n))
    }

    /** the binding being hovered, e.g. in a binding picker; null when hovering ends */
    function previewBinding(binding: Binding | null) {
        if (state.previewBinding.value?.key === binding?.key) return
        state.previewBinding.value = binding
        state.hooks.bindingPreviewed.trigger(binding)
    }

    const flightDuration = (length: number) =>
        Math.min(Math.max(length * state.options.msPerPixel, state.options.minDuration), state.options.maxDuration)

    /**
     * Fly tokens along several arcs as one batch; resolves once they have all landed.
     * Every token arrives at the same moment: the batch takes as long as its longest arc,
     * and tokens sharing an arc leave a little apart but travel faster to catch up.
     */
    function fly(kind: TokenFlight['kind'], legs: { edgeId: string, count: number }[]): Promise<void> {
        if (!state.options.animate || !state.layers.value) return Promise.resolve()

        const routes = legs.flatMap(({ edgeId, count }) => {
            const pathEl = vueFlowRef.value?.querySelector<SVGPathElement>(
                `.vue-flow__edge[data-id="${CSS.escape(edgeId)}"] .vue-flow__edge-path`,
            )
            const path = pathEl?.getAttribute('d')
            return pathEl && path && count > 0 ? [{ edgeId, count, path, length: pathEl.getTotalLength() }] : []
        })
        if (!routes.length) return Promise.resolve()

        const total = Math.max(...routes.map((r) => flightDuration(r.length)))
        const batch = Date.now()

        return Promise.all(
            routes.flatMap(({ edgeId, count, path }) => {
                // keep at least half the batch time for the last token to leave
                const stagger = Math.min(120, total / 2 / count)
                return Array.from(
                    { length: count },
                    (_, i) =>
                        new Promise<void>((resolve) => {
                            const flight: TokenFlight = {
                                id: `${edgeId}:${batch}:${i}`,
                                kind,
                                edgeId,
                                path,
                                duration: total - i * stagger,
                                delay: i * stagger,
                                done: () => {
                                    state.flights.value = state.flights.value.filter((f) => f.id !== flight.id)
                                    resolve()
                                },
                            }
                            state.flights.value = [...state.flights.value, flight]
                        }),
                )
            }),
        ).then(() => undefined)
    }

    /** hold the transition in its flashing state while TransitionNode plays the flash */
    async function flash(transitionId: string) {
        if (!state.options.animate || !state.layers.value) return
        state.flashing.value = transitionId
        await new Promise((resolve) => setTimeout(resolve, state.options.flashDuration))
        state.flashing.value = null
    }

    function stillEnabled(binding: Binding) {
        return bindingsFor(binding.transitionId).some((b) => b.key === binding.key)
    }

    /**
     * Fire a transition with the given binding, or with its first one.
     * Resolves to the firing record, or null when it was not enabled, vetoed, or another firing is running.
     */
    async function fire(transitionId: string, binding?: Binding): Promise<FiringRecord | null> {
        const chosen = binding ?? bindingsFor(transitionId)[0]
        if (state.isFiring.value || !chosen || chosen.transitionId !== transitionId || !stillEnabled(chosen)) {
            return null
        }

        // claimed before the hooks run, so a second fire in the same tick backs off
        state.isFiring.value = true
        let cancelled = false
        try {
            await state.hooks.beforeFire.trigger({ transitionId, binding: chosen, cancel: () => (cancelled = true) })
        } catch (error) {
            state.isFiring.value = false
            throw error
        }
        // a listener may have changed the net while we waited
        if (cancelled || !stillEnabled(chosen)) {
            state.isFiring.value = false
            return null
        }

        previewBinding(null)
        try {
            // consume: the tokens leave their places and travel into the transition
            removeNodes(chosen.tokenIds, false, false)
            await fly('input', chosen.inputs.map((p) => ({ edgeId: p.edgeId, count: p.tokenIds.length })))

            // every input has arrived: the transition flashes before producing
            await flash(transitionId)

            // produce: new tokens travel out along every output arc
            const outputs = outputArcs(transitionId)
            await fly('output', outputs.map((e) => ({ edgeId: e.id, count: arcWeight(e) })))

            const produced: PlaceTokens[] = []
            for (const edge of outputs) {
                const place = findNode(edge.target)
                if (!place) continue
                const tokens = Array.from({ length: arcWeight(edge) }, () => ({
                    id: getNext('token'),
                    type: 'token',
                    parentNode: place.id,
                    extent: 'parent' as const,
                    position: randomTokenPosition(place),
                }))
                addNodes(tokens)
                produced.push({ placeId: place.id, edgeId: edge.id, tokenIds: tokens.map((t) => t.id) })
            }

            const record: FiringRecord = {
                step: state.history.value.length + 1,
                transitionId,
                binding: chosen,
                consumed: chosen.inputs,
                produced,
                firedAt: new Date(),
            }
            state.history.value = [...state.history.value, record]
            await state.hooks.fired.trigger(record)
            return record
        } finally {
            state.flashing.value = null
            state.isFiring.value = false
        }
    }

    function clearHistory() {
        state.history.value = []
        state.hooks.historyCleared.trigger()
    }

    const firedCount = (transitionId: string) => state.history.value.filter((r) => r.transitionId === transitionId).length

    return {
        // state
        history: computed(() => state.history.value),
        isFiring: computed(() => state.isFiring.value),
        flights: computed(() => state.flights.value),
        flashingTransition: computed(() => state.flashing.value),
        /** TransitionNode times its flash keyframes by this */
        flashDuration: state.options.flashDuration,
        previewedBinding: computed(() => state.previewBinding.value),
        enabledTransitions,
        selectedTokenIds,
        selectedTransitionIds,
        fireableSelection,
        candidateBindings,
        // queries
        bindingsFor,
        isEnabled,
        isTruncated,
        firedCount,
        inputArcs,
        outputArcs,
        // actions
        fire,
        selectBinding,
        previewBinding,
        clearHistory,
        // hooks
        onBindingsComputed: state.hooks.bindingsComputed.on,
        onBeforeFire: state.hooks.beforeFire.on,
        onFired: state.hooks.fired.on,
        onHistoryCleared: state.hooks.historyCleared.on,
        /** called with the hovered binding, and with null when hovering ends or it is fired */
        onBindingPreviewed: state.hooks.bindingPreviewed.on,
        /** for FiringTokenLayer: registers a renderer for in-flight tokens */
        registerLayer() {
            state.layers.value++
            onScopeDispose(() => state.layers.value--)
        },
    }
}
