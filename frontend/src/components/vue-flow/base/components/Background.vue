<template>
    <div class="editor-background">
        <svg class="w-100 h-100">
            <defs>
                <pattern
                    :id="patternId"
                    :width="size"
                    :height="size"
                    patternUnits="userSpaceOnUse"
                >
                    <circle :cx="size / 2" :cy="size / 2" :r="radius" :fill="patternColor"></circle>
                </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" :fill="bgColor"></rect>
            <rect x="0" y="0" width="100%" height="100%" :fill="`url(#${patternId})`"></rect>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

type Props = {
    bgColor?: string,
    patternColor?: string,
    size?: number,
    radius?: number,
}

const props = withDefaults(defineProps<Props>(),{
    bgColor: "lightgray",
    patternColor: "darkgray",
    size: 20,
    radius: 1.5,
})

const patternId = `editor-background-${useId()}`

</script>

<style scoped>
.editor-background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
}
</style>
