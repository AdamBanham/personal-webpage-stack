import { NodeChange, useVueFlow, type GraphNode, type NodePositionChange, type XYPosition } from '@vue-flow/core'
import { PetriEditorNamespace } from '../../petri-net-editor/js'
import { ref } from 'vue'
import useHelperLineState from './helperLineState'

interface GetHelperLinesResult {
    horizontal?: number
    vertical?: number
    snapPosition: Partial<XYPosition>
}

interface HelperBounds {
    left: number,
    right: number,
    top: number,
    bottom: number,
    cx: number,
    cy: number,
    width: number,
    height: number
}

function computeBounds(node: GraphNode, change?: NodePositionChange): HelperBounds {
    let base = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        cx: 0,
        cy: 0,
        width: 0,
        height: 0
    }
    if (change) {
        base = {
            ...base,
            left: change.position.x,
            right: change.position.x + ((node.dimensions.width as number) ?? 0),
            top: change.position.y,
            bottom: change.position.y + ((node.dimensions.height as number) ?? 0),
            width: (node.dimensions.width as number) ?? 0,
            height: (node.dimensions.height as number) ?? 0,
        }
    } else {
        base = {
            ...base,
            left: node.position.x,
            right: node.position.x + ((node.dimensions.width as number) ?? 0),
            top: node.position.y,
            bottom: node.position.y + ((node.dimensions.height as number) ?? 0),
            width: ((node.dimensions.width as number) ?? 0),
            height: ((node.dimensions.height as number) ?? 0),
        }
    }

    base.cx = base.left + base.width / 2.0
    base.cy = base.top + base.height / 2.0

    return base
}

// this utility function can be called with a position change (inside onNodesChange)
// it checks all other nodes and calculated the helper line positions and the position where the current node should snap to
// `waypoints` are edge bendpoints the node centre may also align with
export function getHelperLines(change: NodePositionChange, nodes: GraphNode[], distance = 5, waypoints: XYPosition[] = []): GetHelperLinesResult {
    const defaultResult = {
        horizontal: undefined,
        vertical: undefined,
        snapPosition: { x: undefined, y: undefined },
    }
    const nodeA = nodes.find((node) => node.id === change.id)

    if (!nodeA || !change.position || nodeA.parentNode) {
        return defaultResult
    }

    const nodeABounds = computeBounds(nodeA, change)

    let horizontalDistance = distance
    let verticalDistance = distance

    const result = nodes
        .filter((node) => node.id !== nodeA.id && !node.parentNode)
        .reduce<GetHelperLinesResult>((result, nodeB) => {
            const nodeBBounds = computeBounds(nodeB)

            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     A     |
            //  |___________|
            //  |
            //  |
            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     B     |
            //  |___________|
            const distanceLeftLeft = Math.abs(nodeABounds.left - nodeBBounds.left)

            if (distanceLeftLeft < verticalDistance) {
                result.snapPosition.x = nodeBBounds.left
                result.vertical = nodeBBounds.left
                verticalDistance = distanceLeftLeft
            }

            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     A     |
            //  |___________|
            //              |
            //              |
            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     B     |
            //  |___________|
            const distanceRightRight = Math.abs(nodeABounds.right - nodeBBounds.right)

            if (distanceRightRight < verticalDistance) {
                result.snapPosition.x = nodeBBounds.right - nodeABounds.width
                result.vertical = nodeBBounds.right
                verticalDistance = distanceRightRight
            }

            //              |‾‾‾‾‾‾‾‾‾‾‾|
            //              |     A     |
            //              |___________|
            //              |
            //              |
            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     B     |
            //  |___________|
            const distanceLeftRight = Math.abs(nodeABounds.left - nodeBBounds.right)

            if (distanceLeftRight < verticalDistance) {
                result.snapPosition.x = nodeBBounds.right
                result.vertical = nodeBBounds.right
                verticalDistance = distanceLeftRight
            }

            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     A     |
            //  |___________|
            //              |
            //              |
            //              |‾‾‾‾‾‾‾‾‾‾‾|
            //              |     B     |
            //              |___________|
            const distanceRightLeft = Math.abs(nodeABounds.right - nodeBBounds.left)

            if (distanceRightLeft < verticalDistance) {
                result.snapPosition.x = nodeBBounds.left - nodeABounds.width
                result.vertical = nodeBBounds.left
                verticalDistance = distanceRightLeft
            }

            //  |‾‾‾‾‾‾‾‾‾‾‾|‾‾‾‾‾|‾‾‾‾‾‾‾‾‾‾‾|
            //  |     A     |     |     B     |
            //  |___________|     |___________|
            const distanceTopTop = Math.abs(nodeABounds.top - nodeBBounds.top)

            if (distanceTopTop < horizontalDistance) {
                result.snapPosition.y = nodeBBounds.top
                result.horizontal = nodeBBounds.top
                horizontalDistance = distanceTopTop
            }


            //  |‾‾‾‾‾‾‾‾‾‾‾|     |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     A     |‾‾‾‾‾|     B     |
            //  |___________|‾‾‾‾‾|___________|
            const distanceCenterY = Math.abs(nodeABounds.cy - nodeBBounds.cy)

            if (distanceCenterY < horizontalDistance * 2) {
                result.snapPosition.y = nodeBBounds.cy - (nodeABounds.height / 2.0)
                result.horizontal = nodeBBounds.cy
                horizontalDistance = distanceCenterY
            }

            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     A     |
            //  |___________|
            //       | |
            //       | |
            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     B     |
            //  |___________|
            const distanceCenterX = Math.abs(nodeABounds.cx - nodeBBounds.cx)

            if (distanceCenterX < verticalDistance * 2) {
                result.snapPosition.x = nodeBBounds.cx - (nodeABounds.width / 2.0)
                result.vertical = nodeBBounds.cx
                verticalDistance = distanceCenterX
            }


            return result
        }, defaultResult)

    //  |‾‾‾‾‾‾‾‾‾‾‾|
    //  |     A     |-----┐
    //  |___________|     |
    //                    └----→
    for (const point of waypoints) {
        const distanceWaypointY = Math.abs(nodeABounds.cy - point.y)
        if (distanceWaypointY < horizontalDistance) {
            result.snapPosition.y = point.y - (nodeABounds.height / 2.0)
            result.horizontal = point.y
            horizontalDistance = distanceWaypointY
        }

        const distanceWaypointX = Math.abs(nodeABounds.cx - point.x)
        if (distanceWaypointX < verticalDistance) {
            result.snapPosition.x = point.x - (nodeABounds.width / 2.0)
            result.vertical = point.x
            verticalDistance = distanceWaypointX
        }
    }

    return result
}


export default function useHelperLines(namespace:string, distance?:number) {

    const { onNodesChange, nodes, edges, applyNodeChanges } = useVueFlow(namespace)

    const turnOff = ref<undefined | (() => void)>(undefined)
    const { horizontal: helperLineHorizontal, vertical: helperLineVertical } = useHelperLineState(namespace)

    function updateHelperLines(changes: NodeChange[], nodes: GraphNode[]) {
        helperLineHorizontal.value = undefined
        helperLineVertical.value = undefined

        if (changes.length === 1 && changes[0].type === 'position' && changes[0].dragging && changes[0].position) {
            const waypoints = edges.value.flatMap((edge) => (edge.data?.waypoints as XYPosition[] | undefined) ?? [])
            const helperLines = getHelperLines(changes[0], nodes, distance, waypoints)

            // if we have a helper line, we snap the node to the helper line position
            // this is being done by manipulating the node position inside the change object
            changes[0].position.x = helperLines.snapPosition.x ?? changes[0].position.x
            changes[0].position.y = helperLines.snapPosition.y ?? changes[0].position.y

            // if helper lines are returned, we set them so that they can be displayed
            helperLineHorizontal.value = helperLines.horizontal
            helperLineVertical.value = helperLines.vertical
        }

        return changes
    }

    function updateLines(changes: NodeChange[]) {
        const updatedChanges = updateHelperLines(changes, nodes.value as GraphNode[])
        nodes.value = applyNodeChanges(updatedChanges)
    }

    function reset(){
        if (turnOff.value){
            turnOff.value()
        }
        const {off} = onNodesChange(updateLines)
        turnOff.value = off
        helperLineHorizontal.value = undefined
        helperLineVertical.value = undefined
    }

    function off(){
        if (turnOff.value){
            turnOff.value()
        } 
        helperLineHorizontal.value = undefined
        helperLineVertical.value = undefined
    }
        
    reset()

    return {
        helperLineHorizontal,
        helperLineVertical,
        off,
        reset
    }
}