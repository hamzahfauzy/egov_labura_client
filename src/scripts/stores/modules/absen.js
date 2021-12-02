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
        },
        getAbsenLuar({},data){
            return new Promise(resolve => {
                var formData = new FormData
                formData.append('bulan',data.bulan)
                formData.append('pegawai_id',data.pegawai_id)
                formData.append('jenis_pegawai',data.jenis_pegawai)
                formData.append('user_key','absensiAPI')
                formData.append('pass_key','12345654321')

                axios.post(env.ABSEN_API_URL + '/getAbsenLuarLokasi',formData)
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        },
        getAbsenLuarBawahan({},data){
            return new Promise(resolve => {
                var formData = new FormData
                if(data.bulan && data.bulan != '-')
                    formData.append('bulan',data.bulan)
                formData.append('pegawai_id',data.pegawai_id)
                formData.append('jenis_pegawai',data.jenis_pegawai)
                if(data.status)
                    formData.append('status',data.status)
                formData.append('user_key','absensiAPI')
                formData.append('pass_key','12345654321')

                axios.post(env.ABSEN_API_URL + '/getAbsenLuarLokasi/bawahan',formData)
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        },
        tolakAbsen({},data){
            return new Promise(resolve => {
                var formData = new FormData
                formData.append('absensi_id',data.absensi_id)
                formData.append('accesskey',data.access_key)
                formData.append('user_key','absensiAPI')
                formData.append('pass_key','12345654321')

                axios.post(env.ABSEN_API_URL + '/tolakabsenluarlokasi',formData)
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        },
        terimaAbsen({},data){
            return new Promise(resolve => {
                var formData = new FormData
                formData.append('absensi_id',data.absensi_id)
                formData.append('accesskey',data.access_key)
                formData.append('user_key','absensiAPI')
                formData.append('pass_key','12345654321')

                axios.post(env.ABSEN_API_URL + '/setujuiabsenluarlokasi',formData)
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        }
    },
};