<template>
    <div class="page-content" v-if="loaderStatus==false" ref="absen">
        <page-title :backBtn="true" pageTitle="Profil Saya" image="images/avatars/5s.png"></page-title>
        <success 
            title="Berhasil!" 
            ref="successAlert" 
            :height="310"
            :content="alertContent">
        </success>
        <warning 
            title="Gagal!" 
            ref="warningAlert" 
            :content="alertContent">
        </warning>
        <preloader ref="updatePreloader"></preloader>
        <div class="card header-card shape-rounded" data-card-height="150">
            <div class="card-overlay bg-highlight opacity-95"></div>
            <div class="card-overlay dark-mode-tint"></div>
            <div class="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
        </div>

        <div class="card card-style">
            <div class="content mb-0">
                <h3 class="font-600">Informasi Profil</h3>
                <p>Di bawah ini adalah profil anda, untuk mengubah hubungi Admin OPD anda.</p>
                <div class="input-style has-borders hnoas-icon input-style-always-active validate-field mb-4">
                    <input type="name" class="form-control validate-name" :value="auth.nama" id="form1" placeholder="John Doe" disabled>
                    <label for="form1" class="color-highlight font-400 font-13">Nama</label>
                    <i class="fa fa-times disabled invalid color-red-dark"></i>
                    <i class="fa fa-check disabled valid color-green-dark"></i>
                </div>
                <div class="input-style has-borders no-icon input-style-always-active validate-field mb-4">
                    <input type="email" class="form-control validate-email" :value="auth.username" id="form2" placeholder="name@domain.com" disabled>
                    <label for="form2" class="color-highlight font-400 font-13">NIP / NIK</label>
                    <i class="fa fa-times disabled invalid color-red-dark"></i>
                    <i class="fa fa-check disabled valid color-green-dark"></i>
                </div>
                <div class="input-style has-borders no-icon input-style-always-active validate-field mb-4">
                    <input type="tel" class="form-control validate-tel" :value="auth.nama_opd" id="form3" placeholder="+1 234 567 8990" disabled>
                    <label for="form3" class="color-highlight font-400 font-13">Unit Kerja</label>
                    <i class="fa fa-times disabled invalid color-red-dark"></i>
                    <i class="fa fa-check disabled valid color-green-dark"></i>
                </div>
                <div class="input-style has-borders no-icon input-style-always-active validate-field mb-4">
                    <input type="text" class="form-control validate-text" :value="auth.nomor_wa" id="form44" placeholder="+628123xxxx" disabled>
                    <label for="form44" class="color-highlight font-400 font-13">Nomor WA</label>
                    <i class="fa fa-times disabled invalid color-red-dark"></i>
                    <i class="fa fa-check disabled valid color-green-dark"></i>
                </div>
            </div>
        </div>

        <div class="card card-style pb-4">
            <div class="content mb-0">
                <h3 class="font-600">Update Identitas</h3>
                <p>Isi form di bawah ini untuk mengupdate identitas anda</p>
                <div class="input-style has-borders hnoas-icon input-style-always-active validate-field mb-4">
                    <input type="tel" v-model="nomor_wa" class="form-control validate-name" id="form1">
                    <label for="form1" class="color-highlight font-400 font-13">Nomor WA Baru</label>
                    <i class="fa fa-check disabled invalid color-green-dark"></i>
                    <i class="fa fa-check disabled valid color-green-dark"></i>
                </div>
                <div class="input-style has-borders hnoas-icon input-style-always-active validate-field mb-4">
                    <input type="password" v-model="new_password" class="form-control validate-name" id="form1">
                    <label for="form1" class="color-highlight font-400 font-13">Password Baru</label>
                    <i class="fa fa-check disabled invalid color-green-dark"></i>
                    <i class="fa fa-check disabled valid color-green-dark"></i>
                </div>
                <div>
                    <button @click="updatePassword" class="close-menu btn btn-m btn-center-m button-s shadow-l rounded-s text-uppercase font-900 bg-green-light w-100">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            auth:null,
            nomor_wa:null,
            new_password:'',
            alertContent:'',
        }
    },
    methods:{
        updatePassword(){
            this.$refs.updatePreloader.toggle()
            this.$store.dispatch('auth/updatePassword',{
                token:this.auth.token,
                nomor_wa:this.nomor_wa,
                new_password:this.new_password
            })
            .then(response => {
                this.alertContent = response.pesan
                if(response.status == 'berhasil')
                {
                    this.new_password = ''
                    this.$refs.successAlert.toggle()
                    
                    this.$helpers.updateAuthData(response.auth_data)
                    this.init()
                }
                else
                    this.$refs.warningAlert.toggle()
                this.$refs.updatePreloader.toggle()
            })
        },
        init(){
            this.auth = this.$helpers.auth()
            this.nomor_wa = this.auth.nomor_wa
        }
    },
    created(){
        this.$store.dispatch('nav/setActiveNav','profil')
        this.init()
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
</style>