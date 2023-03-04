import { type RouteRecordRaw } from "vue-router";

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
                component: () => import("@/views/admin/User.vue"),
            },
        ],
    },
    {
        path: "/test",
        name: "Tests",
        meta: { title: "Tests", icon: "tabler-question-mark" },
        children: [
            {
                path: "table",
                name: "table",
                children: [
                    {
                        path: "component",
                        name: "component",
                        component: () =>
                            import("@/views/tests/table/TableComponent.vue"),
                    },
                    {
                        path: "composables",
                        name: "Composables",
                        component: () =>
                            import("@/views/tests/table/TableComposables.vue"),
                    },
                ],
            },
            {
                path: "crud",
                name: "Curd",
                component: () => import("@/views/tests/Crud.vue"),
            },
            {
                path: "inputs",
                name: "Inputs",
                component: () => import("@/views/tests/Inputs.vue"),
            },
        ],
    },
];
