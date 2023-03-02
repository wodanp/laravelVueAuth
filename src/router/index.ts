import { useAuthStore } from "@/store/auth-store";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import {backendRoutes} from './backendRoutes'

const Layout = () => import("@/layout/Layout.vue");

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "BackendMenu",
        redirect: "/dashboard",
        meta: { breadcrumb: false },
        component: Layout,
        children: backendRoutes,
    },
    {
        path: "/register",
        name: "register",
        meta: { title: "Register", hidden: true },
        component: () => import("@/views/auth/Register.vue"),
    },
    {
        path: "/login",
        name: "Login",
        meta: { title: "Login", hidden: true },
        component: () => import("@/views/auth/Login.vue"),
    },
    {
        path: "/two-factor-challenge",
        name: "TwoFactorChallenge",
        meta: { hidden: true, title: "TwoFactorChallenge" },
        component: () => import("@/views/auth/TwoFactorChallenge.vue"),
    },
    {
        path: "/error/403",
        meta: { hidden: true },
        component: () => import("@/views/error/Error403.vue"),
    },
    {
        path: "/:catchAll(.*)*",
        meta: { hidden: true },
        component: () => import("@/views/error/Error404.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    document.title = to?.meta?.title
        ? `${to.meta.title} | laravelVueAuth`
        : `laravelVueAuth`; //TODO aus env

    const auth = useAuthStore();
    if (auth?.isLoggedIn) {
        if (to.path === "/login") {
            next({ path: "/" });
        } else {
            //TODO berechtigung prüfen
            // if(to?.meta?.role){
            // if(await auth.hasRole(to.meta.role)){
            //     next()
            // }else{
            //     next('/error/403')
            // }
            // }else{
            next();
            // }
        }
    } else {
        if (["/login", "/register"].indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
        }
    }
});

export default router;
