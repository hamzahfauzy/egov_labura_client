<template>
    <div class="page-content" v-if="loaderStatus==false" ref="absen">
        <page-title :backBtn="true" :pageTitle="pageTitle" image="images/avatars/5s.png"></page-title>
        <warning 
            :title="warning.title" 
            ref="warningAlert" 
            :content="warning.content">
        </warning>
        <success 
            :title="logabsen.title" 
            ref="successAlert" 
            :content="logabsen.content">
        </success>

        <preloader ref="logabsenpreloader"></preloader>
        <div class="card header-card shape-rounded" data-card-height="150">
            <div class="card-overlay bg-highlight opacity-95"></div>
            <div class="card-overlay dark-mode-tint"></div>
            <div class="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
        </div>

        <div class="card card-style">
            <div class="content mb-0">        
                <h3>Filter Log Absen</h3>
                <p>
                    Pilih Bulan dan Tahun untuk memfilter Log Absen Pegawai
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

                <button class="btn btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s bg-yellow-light" style="width:100%" @click="filterLog">Lihat</button>

            </div>
        </div>

        <div class="card card-style" v-if="logs.length">
            <div class="content">
                <h4>Log Absen Anda</h4>
                <p>
                    Log absen anda pada bulan {{periode.bulan}} dan tahun {{periode.tahun}}
                </p>
            </div>

            <div class="accordion" id="accordion-1">
                <div class="card card-style shadow-0 bg-highlight mb-1" v-for="(log,i) in logs" :key="i">
                    <button class="btn accordion-btn color-white no-effect collapsed" data-bs-toggle="collapse" :data-bs-target="'#collapse'+i" aria-expanded="false">
                        <i class="fas fa-calendar-check me-2"></i>
                        {{log.hari}}
                        <i class="fa fa-chevron-down font-10 accordion-icon"></i>
                    </button>

                    <div :id="'collapse'+i" class="bg-theme collapse" :data-bs-parent="'#accordion-1'" style="" v-if="log.absensi">
                        <div class="vcard-field" v-if="log.absensi.masuk" @click="showLogAbsenImage(log.absensi.masuk.lampiran)">
                            <strong>Masuk</strong>
                            <a href="javascript:void(0)">
                                {{log.absensi.masuk.waktu}}
                                <span v-if="log.absensi.masuk.diluar_lokasi && log.absensi.masuk.disetujui_oleh == null">(Luar Lokasi)</span>
                                <span v-if="log.absensi.masuk.diluar_lokasi && log.absensi.masuk.disetujui_oleh">(Luar Lokasi, Disetujui Oleh {{log.absensi.masuk.disetujui_oleh}})</span>
                            </a>
                            <i class="fas fa-check-circle color-facebook"></i>
                        </div>
                        <div class="vcard-field" v-if="log.absensi.istirahat" @click="showLogAbsenImage(log.absensi.istirahat.lampiran)">
                            <strong>Istirahat</strong>
                            <a href="javascript:void(0)">
                                {{log.absensi.istirahat.waktu}}
                                <span v-if="log.absensi.istirahat.diluar_lokasi && log.absensi.istirahat.disetujui_oleh == null">(Luar Lokasi)</span>
                                <span v-if="log.absensi.istirahat.diluar_lokasi && log.absensi.istirahat.disetujui_oleh">(Luar Lokasi, Disetujui Oleh {{log.absensi.istirahat.disetujui_oleh}})</span>
                            </a>
                            <i class="fas fa-check-circle color-facebook"></i>
                        </div>
                        <div class="vcard-field" v-if="log.absensi.selesai_istirahat" @click="showLogAbsenImage(log.absensi.selesai_istirahat.lampiran)">
                            <strong>Selesai Istirahat</strong>
                            <a href="javascript:void(0)">
                                {{log.absensi.selesai_istirahat.waktu}}
                                <span v-if="log.absensi.selesai_istirahat.diluar_lokasi && log.absensi.selesai_istirahat.disetujui_oleh == null">(Luar Lokasi)</span>
                                <span v-if="log.absensi.selesai_istirahat.diluar_lokasi && log.absensi.selesai_istirahat.disetujui_oleh">(Luar Lokasi, Disetujui Oleh {{log.absensi.selesai_istirahat.disetujui_oleh}})</span>
                            </a>
                            <i class="fas fa-check-circle color-facebook"></i>
                        </div>
                        <div class="vcard-field" v-if="log.absensi.pulang" @click="showLogAbsenImage(log.absensi.pulang.lampiran)">
                            <strong>Pulang</strong>
                            <a href="javascript:void(0)">
                                {{log.absensi.pulang.waktu}}
                                <span v-if="log.absensi.pulang.diluar_lokasi && log.absensi.pulang.disetujui_oleh == null">(Luar Lokasi)</span>
                                <span v-if="log.absensi.pulang.diluar_lokasi && log.absensi.pulang.disetujui_oleh">(Luar Lokasi, Disetujui Oleh {{log.absensi.pulang.disetujui_oleh}})</span>
                            </a>
                            <i class="fas fa-check-circle color-facebook"></i>
                        </div>
                    </div>

                    <div :id="'collapse'+i" class="bg-theme collapse" :data-bs-parent="'#accordion-1'" style="" v-if="log.izin_kerja">
                        <div class="vcard-field" @click="openUrl(log.izin_kerja.lampiran)">
                            <strong>{{log.izin_kerja.jenis_izin}}</strong>
                            <a href="javascript:void(0)">
                                Lampiran
                            </a>
                            <span v-if="log.izin_kerja.disetujui_oleh">(Disetujui Oleh {{log.izin_kerja.disetujui_oleh}})</span>
                            <i class="fas fa-check-circle color-facebook"></i>
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
            auth:null,
            pageTitle:'Log Absen',
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
            },
            bulan:'',
            warning:{
                title:'',
                content:''
            },
            logabsen:{
                title:'',
                content:''
            }
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

            this.$refs.logabsenpreloader.toggle()

            var request = await this.$store.dispatch('absen/getLogAbsen',{
                bulan: this.periode.bulan+'-'+this.periode.tahun,
                pegawai_id: this.auth.user_id,
                jenis_pegawai: this.auth.jenis_pegawai
            })
            
            if(request.status == 'berhasil')
            {
                this.logs = request.data
            }

            this.$refs.logabsenpreloader.toggle()
        },
        showLogAbsenImage(url){
            this.logabsen = {
                title:'Foto Absensi Anda',
                content:'<img src="'+url+'" width="200px" height="200px" style="object-fit:cover;">'
            }

            this.$refs.successAlert.toggle()
        },
        openUrl(url){
            window.open(url)
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
.collapse,.collapsing {
    padding:10px;
}
</style>