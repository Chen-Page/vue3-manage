import { createStore } from 'vuex';

const state = {
    isCollapse: false
}

const getters = {}

const mutations = {
    updateIsCollapse (state, payload) {
        state.isCollapse = !state.isCollapse
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