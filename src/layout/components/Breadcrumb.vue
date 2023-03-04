<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteLocationMatched } from 'vue-router'

const route = useRoute()

const breadCrumbItems = ref<RouteLocationMatched[]>([])
watch(
    () => route.path,
    () => {
        breadCrumbItems.value = route.matched.filter((item) => item.meta.breadcrumb !== false && !item.meta.hidden)
        console.log('breadCrumbItems', breadCrumbItems.value)
        if (breadCrumbItems.value.length === 0) return
        //TODO dashboard als home icon? was wenn ich mehr dashbaords habe, 
    },
    { immediate: true }
)
</script>

<template>
    <el-breadcrumb>
        <el-breadcrumb-item v-for="item in breadCrumbItems">
            <router-link :to="item.path">
                {{ item?.meta?.title ?? item?.name ?? 'name' }}
            </router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>