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
        },
        getLogAbsen({},data){
            return new Promise(resolve => {
                var formData = new FormData
                formData.append('bulan',data.bulan)
                formData.append('pegawai_id',data.pegawai_id)
                formData.append('jenis_pegawai',data.jenis_pegawai)
                formData.append('user_key','absensiAPI')
                formData.append('pass_key','12345654321')

                axios.post(env.ABSEN_API_URL + '/getLogAbsen',formData)
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        }
    },
};