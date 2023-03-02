
import { useApi } from "@/composables/api";

const api = useApi();

export const useCrud = (endpoint: string) => {
    const fetch = async (queryParams?: Object) => {
        return await api.get(`/${endpoint}`, { params: queryParams });
    };

    const create = async (payload: object) => {
        return await api.post(`/${endpoint}`, payload);
    };

    const get = async (id: number) => {
        return await api.get(`/${endpoint}/${id}`);
    };

    const update = async (id: number, payload: object) => {
        return await api.put(`/${endpoint}/${id}`, payload);
    };

    const patch = async (id: number, payload: object) => {
        return await api.patch(`/${endpoint}/${id}`, payload);
    };

    const del = async (id: number) => {
        return await api.delete(`/${endpoint}/${id}`);
    };

    return {
        fetch,
        create,
        get,
        update,
        patch,
        del,
    };
}