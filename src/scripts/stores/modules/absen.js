export default {
    namespaced: true,

    actions: {
        getUpacaraStatus(){
            return new Promise(resolve => {
                axios.get(env.API_URL + '/cekabsenupacara')
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        },
        getSenamStatus(){
            return new Promise(resolve => {
                axios.get(env.API_URL + '/cekabsensenam')
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        }
    },
};