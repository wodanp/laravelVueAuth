<script setup lang="ts">
import { useElDialog } from '@/composables/elDialog';
import { useElTable } from '@/composables/elTable';

const {rows, rowsTotal, currentPage, currentPageSize, fetch, changePageSize, changePage} = useElTable('users')
fetch()

const {showDialog, openDialog} = useElDialog()

</script>

<template>
    <el-table :data="rows">
        <el-table-column prop="id" label="ID" width="55" align="center" />
        <el-table-column prop="name" label="name" />
        <el-table-column prop="email" label="email" />

        <el-table-column width="155" align="center">
            <template #default="scope">
                <el-button @click="openDialog">te</el-button>
                <!-- <el-button @click="handleEdit(scope.$index, scope.row)" circle>
                    <SvgIcon svg="tabler-edit" :size="18"/>
                </el-button>
                <el-button @click="handleDelete(scope.$index, scope.row)" circle>
                    <SvgIcon svg="tabler-trash" :size="18" />
                </el-button> -->
            </template>
        </el-table-column>
    </el-table>

    <el-pagination class="mt-10" background layout="total, sizes, prev, pager, next" 
        v-model:current-page="currentPage"
        :total="rowsTotal" :page-size="currentPageSize" :page-sizes="[2, 20, 200]" 
        @size-change="changePageSize"
        @current-change="changePage" />

    <el-dialog v-model="showDialog">
        xx
    </el-dialog>
</template>