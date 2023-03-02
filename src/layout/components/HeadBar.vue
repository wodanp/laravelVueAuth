<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import { useAppStore } from '@/store/app-store';
import { useAuthStore } from '@/store/auth-store';
import Breadcrumb from './Breadcrumb.vue';

const auth = useAuthStore()
const app = useAppStore()
</script>

<template>
    <div class="headbar flex justify-between">
    <section class="inline-flex items-center">
        <SvgIcon :svg="`tabler-layout-sidebar-left-${app.sidebar.isCollapsed ? 'expand' : 'collapse'}`" class="mr-2"
            @click="app.toggleSideBar" />
        <Breadcrumb />
    </section>
    <section class="inline-flex items-center">
        <!-- TODO dropdown.vue:201 Uncaught (in promise) ReferenceError: triggeringElement is not defined -->
        <!-- <el-dropdown>
                <span class="el-dropdown-link flex items-center">
                    <SvgIcon svg="tabler-user-circle" class="mr-2" />
                    {{ auth.me?.name }}
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>           
                            <el-dropdown-item>user</el-dropdown-item>
                            <el-dropdown-item divided @click="auth.logout">
                                <span style="display: block">Logout</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown> -->
            <el-link @click="auth.logout">{{ auth.me?.name }} logout</el-link>
        </section>
    </div>
</template>