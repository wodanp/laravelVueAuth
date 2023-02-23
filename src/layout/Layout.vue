<script setup lang="ts">
import HeadBar from './components/HeadBar.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
    <el-container>
        <el-aside>
            <Sidebar />
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