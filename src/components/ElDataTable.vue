<script setup lang="ts">
import { useCrud } from '@/composables/crud';
import { reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const props = defineProps({
    endpoint: { type: String },
    hideAddButton: {type: Boolean, default: false},
    showDialogFooter: {type: Boolean, default: false},
})

const crudApi = useCrud(props.endpoint)

const query = reactive({
    pageIndex: 1,
    pageSize: 2,
})

//in in elTable composable verschieben?
const tableData = ref([])
const tableMeta = ref({
    total: 0
})
const udateTableData = () => {
    crudApi.fetch(query).then(res => {
        tableData.value = res.data
        tableMeta.value = res.meta
    })
}
udateTableData()


const handlePageSizeChange = (val: number) => {
    query.pageIndex = 1
    query.pageSize = val
    udateTableData();
}
const handlePageIndexChange = (val: number) => {
    query.pageIndex = val;
    udateTableData();
}

//elDialog composable?
const idx = ref(-1)             //TODO überlegen ob ich das brauche wenn id in idxData steht?
const idxData = ref(null)   // oder hier nur idx und laden und daten im form?
const showDialog = ref(false)
const handleAdd = () => {
	idx.value = -1
	showDialog.value = true
}
const handleEdit = async (index: number, row: any) => {
    if (row.id > 0 && row.id !== idx.value) {
        idx.value = row.id
        await crudApi.get(idx.value).then(res => {
            idxData.value = res.data
        })
    } else {
        idxData.value = null
    }
    showDialog.value = true
}

const handleDelete = (index: number, row: any) => {
    ElMessageBox.confirm(
        `delete id: ${row.id}?`,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            crudApi.del(row.id).then(res => {
                udateTableData()
                ElMessage({
                    type: 'success',
                    message: 'Delete completed',
                })
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}

const closeDialog = ()=>{
    udateTableData()
    showDialog.value = false
}
</script>

<template>
    <el-button @click="handleAdd" v-if="!hideAddButton">Add</el-button>
    <el-table :data="tableData">
        <slot />
        <el-table-column width="155" align="center">
            <template #default="scope">
                <el-button @click="handleEdit(scope.$index, scope.row)" circle><SvgIcon svg="tabler-edit" /></el-button>
                <el-button @click="handleDelete(scope.$index, scope.row)" circle><SvgIcon svg="tabler-trash" /></el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination  class="mt-10"
        background layout="total, sizes, prev, pager, next" v-model:current-page="query.pageIndex"
        :total="tableMeta.total" :page-size="query.pageSize" :page-sizes="[2, 20, 200]" @size-change="handlePageSizeChange"
        @current-change="handlePageIndexChange" />

    <el-dialog v-model="showDialog">
        <slot name="dialog" :idx="idx" :data="idxData" :closeDialog="closeDialog"></slot>

        <template #footer v-if="showDialogFooter">
            <span>
                <el-button @click="showDialog = false">Close</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="sass">
</style>