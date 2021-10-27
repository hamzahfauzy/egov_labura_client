export default {
    namespaced: true,

    actions: {
        doLogout(){
            window.localStorage.removeItem('auth')
        },
        doLogin({},data){
            return new Promise(resolve => {
                var formData = new FormData
                formData.append('username',data.username)
                formData.append('password',data.password)
                axios.post(env.API_URL + '/loginApp',formData,{
                    method:'POST',
                })
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        },
        resetPassword({},data){
            return new Promise(resolve => {
                var formData = new FormData
                formData.append('username',data.username)
                axios.post(env.API_URL + '/lupapassword',formData,{
                    method:'POST',
                })
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        },
        updatePassword({},data){
            return new Promise(resolve => {
                var formData = new FormData
                formData.append('token',data.token)
                formData.append('new_password',data.new_password)
                formData.append('nomor_wa',data.nomor_wa)
                axios.post(env.API_URL + '/ubahpassword',formData,{
                    method:'POST',
                })
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        }
    },
};