<script setup lang="ts">
import { useCrud } from '@/composables/crud';
import { reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import SvgIcon from './SvgIcon.vue';

const props = defineProps({
    endpoint: { type: String },
    hideAddButton: { type: Boolean, default: false },
    showDialogFooter: { type: Boolean, default: false },
    showFullScreen: { type: Boolean, default: true }
})

const crudApi = useCrud(props.endpoint)

const query = reactive({
    pageIndex: 1,
    pageSize: 2,
    search: null
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

const closeDialog = () => {
    udateTableData()
    showDialog.value = false
}

const isFullscreen = ref(false)
const toggleFull = () => {
  isFullscreen.value = !isFullscreen.value
}

const handleSearch = ()=>{
    query.pageIndex = 1
    udateTableData()
}

</script>

<template>
    <div class="bg-green-900 flex gap-4 mb-4">
        <el-input v-model="query.search" clearable></el-input>
        <el-button @click="handleSearch"><SvgIcon svg="tabler-search" :size="16"/> Search</el-button>
        <el-button @click="handleAdd" v-if="!hideAddButton">Add</el-button>
    </div>
    
    <slot name="filter"></slot>
    
    <el-table :data="tableData">
        <slot />
        <el-table-column width="155" align="center">
            <template #default="scope">
                <el-button @click="handleEdit(scope.$index, scope.row)" circle>
                    <SvgIcon svg="tabler-edit" :size="18"/>
                </el-button>
                <el-button @click="handleDelete(scope.$index, scope.row)" circle>
                    <SvgIcon svg="tabler-trash" :size="18" />
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    
    <el-pagination class="mt-10" background layout="total, sizes, prev, pager, next" v-model:current-page="query.pageIndex"
        :total="tableMeta.total" :page-size="query.pageSize" :page-sizes="[2, 20, 200]" @size-change="handlePageSizeChange"
        @current-change="handlePageIndexChange" />

    <el-dialog v-model="showDialog" :fullscreen="isFullscreen" class="el-data-table">
        <template #header>
            <div class="flex justify-between">
                <span v-if="idx>0">Edit</span><span v-else>New</span>
                <el-link :underline="false" @click="toggleFull" class="mr-4" v-if="showFullScreen">
                    <SvgIcon :svg="isFullscreen?'tabler-minimize':'tabler-maximize'" :size="16"/>
                </el-link>
            </div>
        </template>
        <slot name="dialog" :idx="idx" :data="idxData" :closeDialog="closeDialog"></slot>

        <template #footer v-if="showDialogFooter">
            <span>
                <el-button @click="showDialog = false">Close</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="sass">
.el-data-table
    .el-dialog__header
        font-size: 1.1rem
    .el-dialog__headerbtn
        width: 2.75rem
        height: 2.75rem
        right: 0.5rem
        top: .625rem
</style>