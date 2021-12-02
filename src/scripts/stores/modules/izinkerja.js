export default {
    namespaced: true,

    actions: {
        createIzin({},data){
            return new Promise(resolve => {
                var formData = new FormData
                formData.append('pegawai_id',data.pegawai_id)
                formData.append('jenis_pegawai',data.jenis_pegawai)
                formData.append('tanggal_awal',data.tanggal_awal)
                formData.append('tanggal_akhir',data.tanggal_akhir)
                formData.append('jenis_izin',data.jenis_izin)
                if(data.berkas)
                    formData.append('file_izin',data.berkas)
                if(data.lampiran)
                    formData.append('lampiran',data.lampiran)
                formData.append('user_key','absensiAPI')
                formData.append('pass_key','12345654321')

                axios.post(env.ABSEN_API_URL + '/buatIzin',formData)
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        },
        getIzin({},data){
            return new Promise(resolve => {
                var formData = new FormData
                formData.append('bulan',data.bulan)
                formData.append('pegawai_id',data.pegawai_id)
                formData.append('jenis_pegawai',data.jenis_pegawai)
                if(data.status)
                    formData.append('status',data.status)
                formData.append('user_key','absensiAPI')
                formData.append('pass_key','12345654321')

                axios.post(env.ABSEN_API_URL + '/getIzinKerja',formData)
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        },
        getIzinBawahan({},data){
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

                axios.post(env.ABSEN_API_URL + '/getIzinKerja/bawahan',formData)
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        },
        tolakIzin({},data){
            return new Promise(resolve => {
                var formData = new FormData
                formData.append('izinkerja_id',data.izinkerja_id)
                formData.append('accesskey',data.access_key)
                formData.append('user_key','absensiAPI')
                formData.append('pass_key','12345654321')

                axios.post(env.ABSEN_API_URL + '/tolakizinkerja',formData)
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        },
        terimaIzin({},data){
            return new Promise(resolve => {
                var formData = new FormData
                formData.append('izinkerja_id',data.izinkerja_id)
                formData.append('accesskey',data.access_key)
                formData.append('user_key','absensiAPI')
                formData.append('pass_key','12345654321')

                axios.post(env.ABSEN_API_URL + '/setujuiizinkerja',formData)
                // .then(response => response.json())
                .then(response => {
                    resolve(response.data)
                })
            })
        }
    },
};