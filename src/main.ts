import { createApp } from "vue";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import App from "./App.vue"

import '@/sass/element/index.scss';
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import '@/sass/style.sass';

import 'virtual:svg-icons-register'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
    .use(pinia)
    .use(router)
    .mount("#app");