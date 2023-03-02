import { type RouteRecordRaw } from "vue-router"

export const backendRoutes: RouteRecordRaw[] = [
    {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "tabler-layout-dashboard" },
        component: () => import("@/views/dashboard/Dashboard.vue"),
    },
    {
        path: "/admin",
        name: "Admin",
        meta: { title: "Admin", icon: "tabler-settings" },
        children: [
            {
                path: "user",
                name: "User",
                meta: { title: "User", icon: "tabler-user" },
                component: () =>
                    import("@/views/admin/User.vue"),
            },
        ],
    },
    {
        path: "/test",
        name: "Tests",
        meta: { title: "Tests", icon: "tabler-question-mark" },
        children: [
            {
                path: "crud",
                name: "Curd",
                component: () =>
                    import("@/views/tests/Crud.vue"),
            },
            {
                path: "leve2",
                name: "leve2",
                component: () =>
                    import("@/views/dashboard/Dashboard.vue"),
            },
        ],
    },
]