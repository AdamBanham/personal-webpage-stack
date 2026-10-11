<template>
    <div class="editor-content">
        <div class="editor-header">
            <h2> Testing PN Editor </h2>
        </div>

        <!-- this is where I would put the petri-net editor -->

        <div class="canvas mt-2 p-1">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis fuga rem quos voluptatibus incidunt
                consectetur eveniet laudantium! Blanditiis magni inventore est ex vero et voluptatum provident assumenda ab,
                unde eveniet.
            </p>

            <PetriNetEditorVF />
            
        </div>
    </div>
</template>

<script setup lang="ts">
import PetriNetEditorVF from '@/components/vue-flow/petri-net-editor/PetriNetEditorVF.vue'


</script>

<style scoped lang="sass">
@use "@/styles/content.sass" as cont
    
h2 
    color: black


.canvas 
    width: 100%
    height: 100%

</style>