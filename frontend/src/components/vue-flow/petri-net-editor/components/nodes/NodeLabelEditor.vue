<template>
    <div class="editing-box containter-fluid nodrag nowheel" v-if="show">
        <v-form @submit.prevent.stop="onSubmit" @dblclick.stop @keydown.esc="onCancel">
            <v-text-field 
                style="height: 25px;"
                class="text-bg-light"
                label="New Label" v-model="label" variant="outlined" density="compact" hide-details
                ref="editingTextField">

            </v-text-field>
        </v-form>
    </div>
</template>

<script setup lang="ts">
import { nextTick, useTemplateRef, watch } from 'vue';


const label = defineModel<string | undefined>('label')
const show = defineModel<boolean>('show')
const editingTextField = useTemplateRef('editingTextField')

const emit = defineEmits(["save", "cancel"])

watch(show, () => {
    nextTick(
        () => {
            editingTextField.value?.focus()
        }
    )
})

function onSubmit() {
    emit('save')
}

function onCancel() {
    emit('cancel')
}
</script>

<style>
.editing-box {
    position: absolute;
    width: 100px;
    height: 25px;
    max-height: 25px;
    font-size: 10px;
    top: calc(0% - 50px);
    left: calc(0% - 25px);
    z-index: 500;

    .v-field__field {
        height: 25px;
        font-size: 10px;
        margin-top: -5px;
    }

    .v-label.v-field-label.v-field-label--floating {
        font-size: 9px;
    }
}
</style>