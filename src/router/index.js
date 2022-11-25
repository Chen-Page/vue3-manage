import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: 'home',
        name: 'main',
        component: () => import('../views/Main.vue'),
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('../views/home/Home.vue')
            },
            {
                path: 'user',
                name: 'User',
                component: () => import('../views/user/User.vue')
            },
            {
                path: 'mall',
                name: 'mall',
                component: () => import('../views/mall/Mall.vue')
            },
            {
                path: 'pageOne',
                name: 'page1',
                component: () => import('../views/page/PageOne.vue')
            },
            {
                path: 'pageTwo',
                name: 'page2',
                component: () => import('../views/page/PageTwo.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router

