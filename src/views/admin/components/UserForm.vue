<script lang="ts" setup>
import { useCrud } from '@/composables/crud';
import { useElForm } from '@/composables/elForm';
import { ref, watch } from 'vue';

const props = defineProps({
    id: { type: Number, default: null }
})
const emit = defineEmits(['close'])

const { formRef, formModel, formRules, validateForm, resetForm } = useElForm({
    name: [{ required: true }],
    email: [{ required: true, type: 'email' }],
})

const users = useCrud('users')
const loading = ref(false)
watch(
    () => props.id,
    (id) => {
        loading.value = true
        if (id > 0) {
            users.get(id).then(res => {
                Object.assign(formModel, res.data)
                loading.value = false
            })
        }else{
            resetForm()
            loading.value = false
        }

    },
    { immediate: true }
)

const handleSave = () => {
    if (props.id && props.id > 0) {
        users.patch(props.id, formModel)
    } else {
        users.create(formModel)
    }
    emit('close')
}


</script>

<template>
    <el-form ref="formRef" :model="formModel" :rules="formRules" v-loading="loading">
        <el-form-item prop="name">
            <el-input v-model="formModel.name" placeholder="name" />
        </el-form-item>

        <el-form-item prop="email">
            <el-input v-model="formModel.email" placeholder="email" />
        </el-form-item>

        <el-button type="primary" @click="validateForm(handleSave)">Save</el-button>
        <el-button type="" @click="$emit('close')">Cancel</el-button>
    </el-form>
</template>