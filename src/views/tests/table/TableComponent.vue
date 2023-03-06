<script setup lang="ts">
import ElDataTable from '@/components/ElDataTable.vue';
import UserForm from '@/views/admin/components/UserForm.vue';

//TODO add new user /password in form

</script>

<template>

    <ElDataTable endpoint="users">
        <el-table-column prop="id" label="ID" width="55" align="center" />
        <el-table-column prop="name" label="name" sortable="custom"/>
        <el-table-column prop="email" label="email" sortable="custom"/>

        <template #filter="{filter}">
            <el-space mb-2>
            <el-input v-model="filter.test" placeholder="email"/>
            <el-input v-model="filter.test2"/>
        </el-space>
        </template>

        <template #dialog="{ idx, closeDialog }">
            <UserForm :id="idx" @close="closeDialog" />
        </template>
    </ElDataTable>
</template>