<script setup lang="ts">
import { isMobile } from '@/composables/media';
import { computed, onBeforeMount, reactive, ref } from 'vue';
import HeadBar from './components/HeadBar.vue';
import Sidebar from './components/Sidebar.vue';
import { useAppStore } from '@/store/app-store';
import {backendRoutes} from '@/router/backendRoutes'

const app = useAppStore()
const sidebarRelated = reactive<Layout.SidebarRelated>({
    width: '15rem',
    collapsedWidth: '3rem'
})

const _isMobile = isMobile()
onBeforeMount(() => {
    app.sidebar.isCollapsed= _isMobile.value
})

const asideWidth = computed(() => {
    return app.sidebar.isCollapsed ? sidebarRelated?.collapsedWidth : sidebarRelated?.width
})

</script>

<template>
    <el-container>
        <el-aside :width="asideWidth" class="h-full">
            <div>Logo?</div>
            <Sidebar :routesList="backendRoutes"/>
        </el-aside>
        <el-container>
            <el-header>
                <HeadBar />
                <!-- <div>TagsBar ?</div> -->
            </el-header>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>