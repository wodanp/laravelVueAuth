<script setup lang="ts">
import { useIcon } from '@/composables/icon';
import { useAppStore } from '@/store/app-store';

const Sun = useIcon({ svg: 'tabler-sun' })
const Moon = useIcon({ svg: 'tabler-moon' })

const app = useAppStore()

</script>

<template>    
    <el-switch 
        v-model="app.isDarkMode" 
        inline-prompt
        :active-icon="Sun" 
        :inactive-icon="Moon" 
        @change="app.updateDarkMode" 
        />
</template>