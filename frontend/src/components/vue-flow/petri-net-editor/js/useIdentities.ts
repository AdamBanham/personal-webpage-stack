import { ref, toValue } from "vue";
import { NodeTypes } from ".";

interface Counter {
    current: number,
    freed: number[]
}

interface State {
    initialised: boolean;
    identities: Record<NodeTypes, Counter>;
}

type NodeIds = `${NodeTypes}-${number}${number}${number}${number}`

const state = ref<State>({
    initialised: false,
    identities: {
        'place': {
            current: 0,
            freed: []
        },
        'transition' : {
            current: 0,
            freed: []
        },
        'token' : {
            current: 0,
            freed: []
        },
    }
})

export default function useIdentities(){

    function _free(type: NodeTypes, id: number){
        const counter = state.value.identities[type]
        counter.freed.push(id)
        counter.freed.sort((a,b) => b - a)
    }

    function _get_next_id(type: NodeTypes): number {
        const counter = toValue(state.value.identities[type])
        const freed = toValue(counter.freed)

        if (freed.length > 0){
            return freed.pop()
        }
        else {
            counter.current += 1
            return counter.current
        }
    }

    function getNext(type: NodeTypes): string {
        const id = _get_next_id(type)
        return `${type}-${String(id).padStart(4, "0")}`;
    }

    function getNextPlace(){
        return getNext('place')
    }

    function getNextTransition(){
        return getNext('transition')
    }

    function getNextToken(){
        return getNext('token')
    }

    function freeIdentity(id: NodeIds){
        const type = id.split('-')[0] as NodeTypes
        const identity = parseInt(id.split('-')[1])
        _free(type, identity)
    }

    return {
        getNext,
        getNextPlace,
        getNextTransition,
        getNextToken,
        freeIdentity
    }
}