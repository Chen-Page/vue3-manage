import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

const routes = [
    {
        path: '/',
        redirect: '/home',
        name: 'Main',
        component: () => import('../views/Main.vue'),
        children: []
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('../views/404.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


function checkRouter (path) {
    let hasCheck = router.getRoutes().filter((router) => {
         return router.path == path
    }).length
    if (hasCheck) {
        return true
    } else {
        return false
    }
}
checkRouter()

router.beforeEach((to, from, next) => {
    store.commit('getToken')
    const token = store.state.token
    // 不存在token跳转到登录页面
    if (!token && to.name !== 'login') {
        next({ name: 'login' })
    } else if (token && to.name === 'login') { // 存在token
        next({name: 'home'})
    } else if (!checkRouter(to.path)) {
        next({name: 'home'})
    } else {
        next()
    }
})



export default router

