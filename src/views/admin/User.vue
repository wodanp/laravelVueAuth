<script setup lang="ts">
import ElDataTable from '@/components/ElDataTable.vue';
import UserForm from './components/UserForm.vue';

//TODO add new user /password in form

</script>

<template>
    <h1>User</h1>
    <ElDataTable endpoint="users" hideAddButton>
        <el-table-column prop="id" label="ID" width="55" align="center" />
        <el-table-column prop="name" label="name" />
        <el-table-column prop="email" label="email" />

        <template #dialog="{ idx, closeDialog }">
            <UserForm :id="idx" @close="closeDialog" />
        </template>
    </ElDataTable>
</template>