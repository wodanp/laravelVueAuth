<script setup lang="ts">
import ElDataTable from '@/components/ElDataTable.vue';
import UserForm from '@/views/admin/components/UserForm.vue';

//TODO add new user /password in form

</script>

<template>
    <h1>User</h1>x
    <ElDataTable endpoint="users">
        <el-table-column prop="id" label="ID" width="55" align="center" />
        <el-table-column prop="name" label="name" />
        <el-table-column prop="email" label="email" />

        <!-- <template #filter>
            Filter
        </template> -->

        <template #dialog="{ idx, closeDialog }">
            <UserForm :id="idx" @close="closeDialog" />
        </template>
    </ElDataTable>
</template>