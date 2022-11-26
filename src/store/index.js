import { createStore } from 'vuex';
import Cookie from 'js-cookie';

const state = {
    isCollapse: false, // 左侧边栏是否收缩
    currentMenu: null, // 当前页面，用于顶部面包屑显示
    tagsList: [ // 页面tag
        {
            path: '/',
            name: 'home',
            label: '首页',
            icon: 'home'
        }
    ],
    menu: [],
    token: '',
    bodyHeight: 800, // 页面body高度
}

const getters = {
    getBodyHeight (state) {
        return state.bodyHeight
    }
}

const mutations = {
    updateIsCollapse(state, payload) {
        state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
        if (val.name == 'home') {
            state.currentMenu = null
        } else {
            state.currentMenu = val
            let index = state.tagsList.findIndex((item) => {
                return item.name === val.name
            })
            if (index == -1) {
                state.tagsList.push(val)
            }
        }
    },
    closeTag(state, val) {
        let index = state.tagsList.findIndex((item) => {
            return item.name === val.name
        })
        state.tagsList.splice(index, 1)
    },
    setMenu(state, val) {
        state.menu = val
        localStorage.setItem('menu', JSON.stringify(val))
    },
    addMenu(state, router) {
        if (!localStorage.getItem('menu')) {
            return
        }
        const menu = JSON.parse(localStorage.getItem('menu'))
        console.log('menu', menu)
        state.menu = menu
        let modules = import.meta.glob('../views/**/*.vue')
        const menuArray = []
        menu.forEach(item => {
            if (item.children) {
                item.children = item.children.map(item => {
                    item.component = modules[`../views/${item.url}.vue`]
                    // item.component = () => import(`../views/${item.url}.vue`)
                    return item
                })
                menuArray.push(...item.children)
            } else {
                item.component = modules[`../views/${item.url}.vue`]
                // item.component = () => import(`../views/${item.url}.vue`)
                menuArray.push(item)
            }
        });
        console.log('menuArray', menuArray)
        // 路由动态添加
        menuArray.forEach(item => {
            router.addRoute('Main', item)
        })
        console.log('router', router)
        console.log('addMenu complete')
    },
    clearMenu(state, val) {
        state.menu = []
        localStorage.removeItem('menu')
    },
    setToken (state, val) {
        state.token = val
        Cookie.set('token', val)
    },
    clearToken(state) {
        state.token = ''
        Cookie.remove('token')
    },
    getToken (state) {
        state.token = state.token || Cookie.get('token')
    },
    setBodyHeight (state, val) {
        state.bodyHeight = val
    }
}

const actions = {}

const store = createStore({
    state,
    getters,
    mutations,
    actions,
})

export default store