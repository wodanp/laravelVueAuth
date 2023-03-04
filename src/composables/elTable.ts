import { useCrud } from "@/composables/crud";
import { computed, reactive, ref, unref } from "vue";

export const useElTable = (endpoint: string) => {
    const crudApi = useCrud(endpoint);

    //sort filter als parameter übergeben?
    const query = reactive({
        pageIndex: 1,
        pageSize: 2,
    });

    const rows = ref([]);
    const meta = reactive({
        total: 0,
    });
    const fetch = () => {
        crudApi.fetch(query).then((res) => {
            rows.value = res.data;
            Object.assign(meta, res.meta);
        });
    };

    const changePageSize = (val: number) => {
        query.pageIndex = 1;
        query.pageSize = val;
        fetch();
    };
    const changePage = (val: number) => {
        query.pageIndex = val;
        fetch();
    };

    return {
        rows,
        // rowsTotal: computed(() => unref(meta.total)),
        // rowsTotal,
        rowsTotal: computed(() => meta.total),
        currentPage: computed(() => query.pageIndex),
        currentPageSize: computed(() => query.pageSize),
        meta,

        fetch,
        changePageSize,
        changePage,
    };
};
