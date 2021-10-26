export default {
    namespaced: true,
    state: {
        loaderStatus:true,
    },

    mutations: {
        SET_LOADER_STATUS(state, value) {
            state.loaderStatus = value
        }
    },

    getters: {
        getLoaderStatus: (state) => state.loaderStatus
    },

    actions: {
        setLoaderStatus({commit}, value){
            commit('SET_LOADER_STATUS',value)
        }
    },
};