export default {
    namespaced: true,
    state: {
        active_nav:'home',
    },

    mutations: {
        SET_ACTIVE_NAV(state, value) {
            state.active_nav = value
        }
    },

    getters: {
        getActiveNav: (state) => state.active_nav
    },

    actions: {
        setActiveNav({commit}, value){
            commit('SET_ACTIVE_NAV',value)
        }
    },
};