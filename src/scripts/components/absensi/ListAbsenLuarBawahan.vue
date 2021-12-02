<template>
    <div class="page-content" v-if="loaderStatus==false" ref="absen">
        <page-title :backBtn="true" :pageTitle="pageTitle" image="images/avatars/5s.png"></page-title>
        <warning 
            :title="warning.title" 
            ref="warningAlert" 
            :content="warning.content">
        </warning>
        <success 
            :title="success.title" 
            ref="successAlert" 
            height="250"
            :content="success.content">
        </success>

        <preloader ref="izinpreloader"></preloader>
        <div class="card header-card shape-rounded" data-card-height="150">
            <div class="card-overlay bg-highlight opacity-95"></div>
            <div class="card-overlay dark-mode-tint"></div>
            <div class="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
        </div>

        <div class="card card-style">
            <div class="content mb-0">        
                <h3>Filter Absen Luar Lokasi Bawahan</h3>
                <p>
                    Pilih Bulan dan Tahun untuk memfilter Absen Luar Lokasi Pegawai
                </p>
                
                <div class="input-style input-style-always-active has-borders no-icon validate-field mb-4">
                    <select class="form-control validate-name" name="bulan" id="bulan" v-model="periode.bulan">
                        <option value="">-Pilih Bulan-</option>
                        <option v-for="bulan in list_bulan" :key="bulan.kode" :value="bulan.kode">{{bulan.nama}}</option>
                    </select>
                    <label for="form1ab" class="color-theme opacity-50 text-uppercase font-700 font-10">Bulan</label>
                    <i class="fa fa-times disabled invalid color-red-dark"></i>
                    <i class="fa fa-check disabled valid color-green-dark"></i>
                </div>
                
                <div class="pb-3"></div>

                <div class="input-style input-style-always-active has-borders no-icon mb-4">
                    <select class="form-control validate-name" name="tahun" id="tahun" v-model="periode.tahun">
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                    <!-- <input type="tel" v-model="periode.tahun" class="form-control" id="form2ab" placeholder="Tahun" style="padding-top:0!important;transform: none!important;margin-bottom: 0!important;"> -->
                    <label for="form1ab" class="color-theme opacity-50 text-uppercase font-700 font-10">Tahun</label>
                    <i class="fa fa-check disabled invalid color-green-dark"></i>
                    <i class="fa fa-check disabled valid color-green-dark"></i>
                </div>

                <div class="pb-3"></div>

                <div class="input-style input-style-always-active has-borders no-icon validate-field mb-4">
                    <select class="form-control validate-name" name="status" id="status" v-model="periode.status" style="text-transform:capitalize;">
                        <option value="">-Pilih Status-</option>
                        <option v-for="status in ['menunggu','disetujui','ditolak']" :key="status" :value="status">{{status}}</option>
                    </select>
                    <label for="form1ab" class="color-theme opacity-50 text-uppercase font-700 font-10">Status</label>
                    <i class="fa fa-times disabled invalid color-red-dark"></i>
                    <i class="fa fa-check disabled valid color-green-dark"></i>
                </div>

                <div class="pb-3"></div>

                <button class="btn btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s bg-yellow-light" style="width:100%" @click="filterLog">Lihat</button>

            </div>
        </div>

        <div class="card card-style" v-if="logs.length">
            <div class="content">
                <h4>Absen Luar Lokasi Bawahan</h4>
                <p>
                    Absen Luar Lokasi bawahan pada bulan {{periode.bulan}} dan tahun {{periode.tahun}}
                </p>
            </div>

            <div class="accordion" id="accordion-1">
                <div class="card card-style shadow-0 bg-highlight mb-1" v-for="(log,i) in logs" :key="i">
                    <button class="btn accordion-btn color-white no-effect collapsed" data-bs-toggle="collapse" :data-bs-target="'#collapse'+i" aria-expanded="false">
                        <i class="fas fa-calendar-check me-2"></i>
                        {{log.dibuat_pada}}
                        <i class="fa fa-chevron-down font-10 accordion-icon"></i>
                    </button>

                    <div :id="'collapse'+i" class="bg-theme collapse" :data-bs-parent="'#accordion-1'" style="">
                        <div class="vcard-field" @click="showLogAbsenImage(log.link_absensi)">
                            {{log.jenis_absen}}
                        </div>
                        <div class="row mb-0" v-if="log.status == 'Menunggu'">
                            <div class="col-4 pe-1">
                                <a href="javascript:void(0)" @click="tolak(log)" class="btn btn-3d btn-s btn-full mb-3 rounded-xs text-uppercase font-900 shadow-s border-red-dark bg-red-light">Tolak</a>
                            </div>
                            <div class="col-4 ps-1 pe-1">
                                <a href="javascript:void(0)" @click="terima(log)" class="btn btn-3d btn-s btn-full mb-3 rounded-xs text-uppercase font-900 shadow-s  border-green-dark bg-green-light">Terima</a>
                            </div>
                            <div class="col-4 ps-1">
                                <a href="javascript:void(0)" @click="showLogAbsenImage(log.link_absensi)" class="btn btn-3d btn-s btn-full mb-3 rounded-xs text-uppercase font-900 shadow-s  border-blue-dark bg-blue-light">Lihat</a>
                            </div>
                        </div>
                        <div v-else>
                            <a href="javascript:void(0)" @click="showLogAbsenImage(log.link_absensi)" class="btn btn-3d btn-s btn-full mb-3 rounded-xs text-uppercase font-900 shadow-s  border-blue-dark bg-blue-light">Lihat</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pb-3"></div>
        </div>

    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            pageTitle:'Absen Bawahan',
            badges:{
                'Menunggu':'bg-yellow-light',
                'Disetujui':'bg-green-light',
                'Ditolak':'bg-red-light',
            },
            logs:[],
            list_bulan:[
                {
                    kode:'01',
                    nama:'Januari'
                },
                {
                    kode:'02',
                    nama:'Februari'
                },
                {
                    kode:'03',
                    nama:'Maret'
                },
                {
                    kode:'04',
                    nama:'April'
                },
                {
                    kode:'05',
                    nama:'Mei'
                },
                {
                    kode:'06',
                    nama:'Juni'
                },
                {
                    kode:'07',
                    nama:'Juli'
                },
                {
                    kode:'08',
                    nama:'Agustus'
                },
                {
                    kode:'09',
                    nama:'September'
                },
                {
                    kode:'10',
                    nama:'Oktober'
                },
                {
                    kode:'11',
                    nama:'November'
                },
                {
                    kode:'12',
                    nama:'Desember'
                }
            ],
            periode:{
                bulan:'',
                tahun:'',
                status:'',
            },
            warning:{
                title:'',
                content:''
            },
            success:{
                title:'',
                content:''
            },
            auth:{}
        }
    },
    created(){
        this.auth = this.$helpers.auth()
    },
    methods:{
        async filterLog(){
            // if(this.periode.bulan == '' && this.periode.tahun == '')
            // {
            //     this.warning = {
            //         title:'Maaf!',
            //         content:'Bulan dan Tahun tidak boleh Kosong'
            //     }
            //     this.$refs.warningAlert.toggle()
            //     return
            // }

            this.$refs.izinpreloader.toggle()

            var request = await this.$store.dispatch('absen/getAbsenLuarBawahan',{
                bulan: this.periode.bulan+'-'+this.periode.tahun,
                pegawai_id: this.auth.user_id,
                jenis_pegawai: this.auth.jenis_pegawai,
                status:this.periode.status
            })
            
            if(request.status == 'berhasil')
            {
                this.logs = request.data
            }

            this.$refs.izinpreloader.toggle()
        },
        showLogAbsenImage(url){
            window.open(url)

        },
        async tolak(log){
            this.$refs.izinpreloader.toggle()
            var request = await this.$store.dispatch('absen/tolakAbsen',log)
            if(request.status == 'berhasil')
            {
                this.$refs.izinpreloader.toggle()
                this.success = {
                    title:'Berhasil',
                    content:request.pesan
                }

                this.$refs.successAlert.toggle()

                this.filterLog(false)
            }
            else
            {
                this.warning = {
                    title:'Gagal',
                    content:request.pesan
                }

                this.$refs.warningAlert.toggle()
            }
        },
        async terima(log){
            this.$refs.izinpreloader.toggle()
            var request = await this.$store.dispatch('absen/terimaAbsen',log)
            if(request.status == 'berhasil')
            {
                this.$refs.izinpreloader.toggle()
                this.success = {
                    title:'Berhasil',
                    content:request.pesan
                }

                this.$refs.successAlert.toggle()

                this.filterLog(false)
            }
            else
            {
                this.warning = {
                    title:'Gagal',
                    content:request.pesan
                }

                this.$refs.warningAlert.toggle()
            }
        }
    },
    mounted(){
        var vm = this
        vm.$store.dispatch('loader/setLoaderStatus',true)
        setTimeout(async function(){
            await vm.$store.dispatch('loader/setLoaderStatus',false)
            window.init_template()
            await vm.filterLog()
        },1000)
    },
    computed: {
        ...mapGetters({
            loaderStatus: 'loader/getLoaderStatus',
        })
    }
}
</script>
<style scoped>
.list-custom-small button {
    text-align: left;
    color: #1f1f1f;
    font-weight: 600;
    font-size: 13px;
    border-bottom: solid 1px rgba(0, 0, 0, 0.05);
}

.fab {
    position:fixed;
    bottom:0;
    right: 0;
    margin-right: 15px;
    margin-bottom: 60px;
    z-index:11;
}

.fab a {
    text-align: center;
    border:0;
    display: block;
    padding:15px;
    margin-bottom:15px;
    font-size: 25px;
    border-radius:100%;
    color:#FFF;
    width: 55px;
    box-shadow: 3px 3px 6px 0px rgb(0 0 0 / 30%);;
}

.btn-create-izin {
    background-color:rgba(74, 137, 220, 1);
}

.btn-verif-izin {
    background-color:rgb(212, 199, 77);
}

.collapse,.collapsing {
    padding:10px;
}
</style>