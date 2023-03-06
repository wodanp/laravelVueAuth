<script setup lang="ts">
import { useCrud } from '@/composables/crud';
import { reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import SvgIcon from './SvgIcon.vue';
import { debounce } from 'lodash-es';

const props = defineProps({
    endpoint: { type: String },
    hideAddButton: { type: Boolean, default: true },
    showDialogFooter: { type: Boolean, default: false },
    showFullScreen: { type: Boolean, default: true }
})

const crudApi = useCrud(props.endpoint)

const query = reactive({
    pageIndex: 1,
    pageSize: 2,
    search: null,
    order: null,
    filter: {},
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
    udateTableData()
}

const showFilterPanel = ref(false)
const toggleFilterPanel = ()=>{
    console.log('toggleFilterPanel')
    showFilterPanel.value = !showFilterPanel.value
}

const handleSortChange = ({ prop, order })=>{
    query.order = (order)? {prop, order: (order === 'descending')?'desc':'asc'}: null    
}

const handleClearSerach = ()=>{
    query.filter = {}
    udateTableData()
}

watch(
    () => query,
    debounce((query) => {
        udateTableData()
    },500),
    { deep: true }
)

</script>

<template>
    <el-space mb-2 class="search">
        <el-input v-model="query.search" clearable @clear="handleClearSerach">
            <template #prepend>
                <i-ep-filter @click="toggleFilterPanel"/>
            </template>
            <template #append>
                <i-ep-search @click="handleSearch"/>
            </template>
        </el-input>
        <el-button @click="handleAdd" v-if="!hideAddButton">Add</el-button>
    </el-space>
    <div v-if="showFilterPanel" class="py-2 my-2">
        <slot name="filter" :filter="query.filter"></slot>
    </div>

    <el-table :data="tableData" @sort-change="handleSortChange"  class="mt-5">
        <slot />
        <el-table-column width="155" align="center">
            <template #default="scope">
                <el-button @click="handleEdit(scope.$index, scope.row)" circle>
                    <!-- <SvgIcon svg="tabler-edit" :size="18"/> -->
                    <i-ep-edit />
                </el-button>
                <el-button @click="handleDelete(scope.$index, scope.row)" circle>
                    <!-- <SvgIcon svg="tabler-trash" :size="18" /> -->
                    <i-ep-delete />
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

    <div class="bg-slate-800 p-5 rounded-2xl mt-10">
        {{ query }}
    </div>
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

.search
    .el-input-group__prepend
        cursor: pointer
    .el-input-group__append
        cursor: pointer
        background-color: var(--el-color-primary)
        color: var(--el--color-text-primary)
</style>