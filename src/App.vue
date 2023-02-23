<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from './store/app-store';


const app = useAppStore()
app.updateDarkMode()

</script>

<template>
    <router-view/>
</template>