<template>
    <div class="page-content" v-if="loaderStatus==false" ref="absen">
        <page-title :backBtn="true" :pageTitle="pageTitle" image="images/avatars/5s.png"></page-title>
        <warning 
            :title="warning.title" 
            ref="warningAlert" 
            :content="warning.content">
        </warning>

        <preloader ref="izinpreloader"></preloader>
        <div class="card header-card shape-rounded" data-card-height="150">
            <div class="card-overlay bg-highlight opacity-95"></div>
            <div class="card-overlay dark-mode-tint"></div>
            <div class="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
        </div>

        <!-- <div class="card card-style">
            <div class="content mt-0 mb-0">
                <div class="list-group list-custom-small list-icon-0">
                    <template v-for="(list,key) in lists">
                        <router-link :to="list.route" :key="key">
                            <i :class="list.icon"></i>
                            <span>{{list.name}}</span>
                        </router-link>
                    </template>
                </div>      
            </div>  
        </div>   -->

        <div class="card card-style">
            <div class="content mb-0">        
                <h3>Filter Izin Kerja</h3>
                <p>
                    Pilih Bulan dan Tahun untuk memfilter Izin Kerja Pegawai
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
                <h4>Izin Kerja Anda</h4>
                <p>
                    Izin Kerja anda pada bulan {{periode.bulan}} dan tahun {{periode.tahun}}
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
                        <div class="vcard-field" @click="showLogAbsenImage(log.lampiran)">
                            <strong>{{log.tanggal_awal+' - '+log.tanggal_akhir}}</strong>
                            <!-- <a href="javascript:void(0)" style="display:block">
                                {{log.tanggal_awal+' - '+log.tanggal_akhir}}
                            </a> -->
                            <span :class="'badge '+badges[log.status]">{{log.status}}</span>
                            <i class="fas fa-check-circle color-facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pb-3"></div>
        </div>

        <div class="fab">
            <router-link :to="{name:'IzinKerjaBawahan'}" class="btn-verif-izin"><i class="fa fa-user-check"></i></router-link>
            <router-link :to="{name:'BuatIzinKerja'}" class="btn-create-izin"><i class="fa fa-plus"></i></router-link>
        </div>

    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            pageTitle:'Izin Kerja',
            lists:[
                {name:'Buat Izin',icon:'fas fa-folder-plus',route:{name:'BuatIzinKerja'}},
                {name:'Menunggu Disetujui',icon:'fas fa-spinner',route:{name:'LogAbsen',params:{type:'Luar Lokasi'}}},
                {name:'Izin Disetujui',icon:'fas fa-clipboard-check',route:{name:'LogAbsen',params:{type:'Luar Lokasi'}}},
                {name:'Izin Ditolak',icon:'fas fa-calendar-times',route:{name:'LogAbsen',params:{type:'Luar Lokasi'}}},
                {name:'Verifikasi Izin Bawahan',icon:'fas fa-user-check',route:{name:'LogAbsen',params:{type:'Luar Lokasi'}}},
            ],
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

            var request = await this.$store.dispatch('izinkerja/getIzin',{
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

        }
    },
    mounted(){
        var vm = this
        vm.$store.dispatch('loader/setLoaderStatus',true)
        setTimeout(async function(){
            await vm.$store.dispatch('loader/setLoaderStatus',false)
            window.init_template()
            // await vm.filterLog()
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