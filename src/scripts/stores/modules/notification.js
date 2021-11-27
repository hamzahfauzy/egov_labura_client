export default {
    namespaced: true,

    actions: {
        getNotif({},data){
            return new Promise(resolve => {
                axios.get(env.NOTIF_API_URL + '/get-all-notif-user&user_id='+data.user_id)
                .then(response => {
                    resolve(response.data)
                })
            })
        },
        getUnread({},data){
            return new Promise(resolve => {
                axios.get(env.NOTIF_API_URL + '/get-unread-notif&user_id='+data.user_id)
                .then(response => {
                    resolve(response.data)
                })
            })
        },
    },
};