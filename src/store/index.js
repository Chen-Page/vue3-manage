import { createStore } from 'vuex';

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
}

const getters = {}

const mutations = {
    updateIsCollapse (state, payload) {
        state.isCollapse = !state.isCollapse
    },
    selectMenu (state, val) {
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
    closeTag (state, val) {
        let index = state.tagsList.findIndex((item) => {
            return item.name === val.name
        })
        state.tagsList.splice(index, 1)
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