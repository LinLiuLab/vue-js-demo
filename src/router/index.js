// src/router/index.js

import {
    createRouter,
    createWebHistory,
    // createWebHashHistory,
} from "vue-router";
import { defineAsyncComponent } from "vue";

const router = createRouter({
    // history: createWebHashHistory(),  // hash model
    history: createWebHistory(), // history model
    routes: [
        {
            path: "/",
            name: "document",
            component: defineAsyncComponent(() =>
                import(`../views/DocumentManage.vue`)
            ),
            meta: {
                title: "Document Manage",
            },
        },
        {
            path: "/*",
            redirect: "/",
        },
    ],
});

// router guard
router.beforeEach((to, from, next) => {
    console.log(to, from);
    if (to.meta.title) {
        document.title = `${to.meta.title}`;
    }
    next();
});

router.afterEach((to, from) => {
    console.log(to, from);
    console.log("afterEach");
});

export default router;
