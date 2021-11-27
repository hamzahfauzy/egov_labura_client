<template>
    <div class="page-content" v-if="loaderStatus==false" ref="absen">
        <page-title :backBtn="true" :pageTitle="pageTitle" image="images/avatars/5s.png"></page-title>
        <preloader ref="izinpreloader"></preloader>

        <warning 
            :title="warning.title.toUpperCase()" 
            ref="warningAlert" 
            :content="warning.content">
        </warning>
        <success 
            :title="success.title.toUpperCase()" 
            ref="successAlert" 
            height="340"
            :content="success.content">
        </success>
        <div class="card header-card shape-rounded" data-card-height="150">
            <div class="card-overlay bg-highlight opacity-95"></div>
            <div class="card-overlay dark-mode-tint"></div>
            <div class="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
        </div>

        <div class="card card-style">
            <div class="content mb-0">
                <div class="input-style input-style-always-active has-borders no-icon validate-field mb-4">
                    <select class="form-control validate-name" v-model="form.jenis_izin">
                        <option value="">-Pilih Satu-</option>
                        <option v-for="jenis_izin in jenis_izin_lists" :key="jenis_izin" :value="jenis_izin">{{jenis_izin}}</option>
                    </select>
                    <label for="form1ab" class="color-theme opacity-50 text-uppercase font-700 font-10">Jenis Izin Kerja</label>
                    <i class="fa fa-times disabled invalid color-red-dark"></i>
                    <i class="fa fa-check disabled valid color-green-dark"></i>
                </div>
                
                <div class="pb-3"></div>

                <div class="input-style input-style-always-active has-borders no-icon mb-4">
                    <input type="date" v-model="form.tanggal_awal" class="form-control" id="form2ab" placeholder="Tanggal Awal" style="padding-top:0!important;transform: none!important;margin-bottom: 0!important;">
                    <label for="form1ab" class="color-theme opacity-50 text-uppercase font-700 font-10">Tanggal Awal</label>
                    <i class="fa fa-check disabled invalid color-green-dark"></i>
                    <i class="fa fa-check disabled valid color-green-dark"></i>
                </div>

                <div class="pb-3"></div>

                <div class="input-style input-style-always-active has-borders no-icon mb-4">
                    <input type="date" v-model="form.tanggal_akhir" class="form-control" id="form2ab" placeholder="Tanggal Akhir" style="padding-top:0!important;transform: none!important;margin-bottom: 0!important;">
                    <label for="form1ab" class="color-theme opacity-50 text-uppercase font-700 font-10">Tanggal Akhir</label>
                    <i class="fa fa-check disabled invalid color-green-dark"></i>
                    <i class="fa fa-check disabled valid color-green-dark"></i>
                </div>

                <div class="pb-3"></div>

                <label for="">Berkas</label>
                <div class="row mb-0">
                    <div class="col-6 pe-1">
                        <a href="javascript:void(0)" @click="getPic" class="btn btn-3d btn-s btn-full mb-3 rounded-xs text-uppercase font-900 shadow-s border-red-dark bg-red-light">
                            <i class="fa fa-camera fa-fw"></i> Ambil Foto
                        </a>
                    </div>
                    <div class="col-6 ps-1">
                        <a href="javascript:void(0)" @click="$refs.fileUpload.click()" class="btn btn-3d btn-s btn-full mb-3 rounded-xs text-uppercase font-900 shadow-s  border-green-dark bg-green-light">
                            <i class="fa fa-upload fa-fw"></i> Upload
                        </a>
                    </div>
                    <div class="col-12" style="opacity:0;height:0px;position:absolute;top:-100px">
                        <input type="file" ref="fileUpload" @change="getFile($event)">
                    </div>
                </div>

                <div class="form-group berkas-group" v-if="form.berkas">
                    <button id="btn-close" @click="remove"><i class="fa fa-trash"></i></button>
                    <img :src="form.berkas" alt="" width="100%">
                </div>

                <div class="form-group lampiran-group" v-if="form.lampiran">
                    <b>{{form.lampiran.name}}</b>
                    <a href="javascript:void(0)" @click="remove"><i class="fa fa-trash"></i></a>
                </div>

                <div class="pb-3"></div>

                <button class="btn btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s bg-yellow-light" style="width:100%" @click="saveIzin">Simpan</button>

            </div>
        </div>

        <izin-kamera ref="izinKamera"></izin-kamera>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default{
    data(){
        return {
            pageTitle:'Buat Izin Kerja',
            jenis_izin_lists:[
                'Sakit',
                'Urusan Keluarga',
                'Cuti',
                'Lainnya'
            ],
            form:{
                jenis_izin:'',
                tanggal_awal:'',
                tanggal_akhir:'',
                berkas:'',
                lampiran:''
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
        cam_callback(picture){
            this.form.lampiran = ""
            this.form.berkas = picture
        },
        async saveIzin(){
            // validation
            if(this.form.jenis_izin == '')
                return

            if(this.form.tanggal_awal == '')
                return

            if(this.form.lampiran == '' && this.form.berkas == '')
                return

            this.$refs.izinpreloader.toggle()
            try {
                this.form.pegawai_id = this.auth.user_id
                this.form.jenis_pegawai = this.auth.jenis_pegawai
                var request = await this.$store.dispatch('izinkerja/createIzin',this.form)
                if(request.status == 'berhasil')
                {
                    this.success = {
                        title:request.status,
                        content:request.pesan
                    }

                    this.$refs.successAlert.toggle()
                    this.reset()
                }
                else
                {
                    this.warning = {
                        title:request.status,
                        content:request.pesan
                    }

                    this.$refs.warningAlert.toggle()
                }
            } catch (error) {
                this.warning = {
                    title:'Error',
                    content:'..................'
                }
                this.$refs.warningAlert.toggle()
            }
            this.$refs.izinpreloader.toggle()
        },
        getPic(){
            this.$refs.izinKamera.start(this.cam_callback)
        },
        getFile(ev){
            this.form.berkas = ""
            this.form.lampiran = ev.target.files[0]
        },
        remove(){
            this.form.lampiran = ""
            this.form.berkas = ""
            this.$refs.fileUpload.value = ""
        },
        reset(){
            this.form = {
                jenis_izin:'',
                tanggal_awal:'',
                tanggal_akhir:'',
                berkas:'',
                lampiran:''
            }
        }
    },
    mounted(){
        var vm = this
        vm.$store.dispatch('loader/setLoaderStatus',true)
        setTimeout(async function(){
            await vm.$store.dispatch('loader/setLoaderStatus',false)
            window.init_template()
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
#btn-close {
    background: transparent;
    border:0;
    font-size:20px;
    position:absolute;
    top:0;
    left:0;
    margin-top: 10px;
    margin-left: 10px;
    color:red;
}
.berkas-group {
    position:relative;
}
.lampiran-group {
    color:blue;
}

.lampiran-group a {
    color:red;
}
</style>