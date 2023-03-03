import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'

export const useApi = (endpoint:string = 'api') => {

    const {VITE_API_HOST, VITE_API_PATH} = import.meta.env
    
    let baseURL
    if (endpoint === 'api') {
        baseURL = VITE_API_HOST + VITE_API_PATH || '/api'
    } else if (endpoint === 'web') {
        baseURL = VITE_API_HOST || '/'
    }

    const axiosInstance = axios.create({
        baseURL,
        timeout: 1000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest', 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            //'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        withCredentials: true,
    });

    // axiosInstance.interceptors.request.use(
    //     (config: AxiosRequestConfig) => {
    //         return config;
    //     },
    //     (error: AxiosError) => {
    //         return Promise.reject();
    //     }
    // );

    axiosInstance.interceptors.response.use(
        (response: AxiosResponse<any>) => {
            // switch(response.status){}
            if(response.status === 200){
                return response.data
            }else if (response.status === 204){
                return null
            }
            return Promise.reject(response.data)
        },
        (error: AxiosError<{ message: string }>) => {
            const { message } = error.response.data;
            ElMessage({
                message: message || 'Error',
                type: 'error',
                showClose: true,
            });
            return Promise.reject(error)
        }
    );

    return axiosInstance
}