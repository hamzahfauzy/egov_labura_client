<template>
    <div class="page-content" v-if="loaderStatus==false">
        <page-title :backBtn="false" pageTitle="" image=""></page-title>
        <Warning title="Login Gagal!" ref="warningAlert" :content="warningMessage"></Warning>
        <preloader ref="preloader"></preloader>
        <div class="card header-card shape-rounded" data-card-height="150">
            <div class="card-overlay bg-highlight opacity-95"></div>
            <div class="card-overlay dark-mode-tint"></div>
            <div class="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
        </div>
        <div class="footer">
            <div class="footer card card-style mx-0 mb-0">   

                <center>
                    <img src="images/logo.png" alt="" width="70px" class="mt-4">
                </center>

                <a href="#" class="footer-title pt-4 mb-2">E-Gov Labura</a>

                <form method="post" @submit="doLogin" class="content mb-0">
                    <div class="input-style no-borders has-icon validate-field mb-4">
                        <i class="fa fa-user"></i>
                        <input type="name" v-model="auth.username" class="form-control" id="form1a" placeholder="NIP/NIK">
                        <label for="form1a" class="color-blue-dark font-10 mt-1">NIP / NIK</label>
                        <i class="fa fa-check disabled invalid color-green-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i>
                        <em>(required)</em>
                    </div>
                    
                    <div class="input-style no-borders has-icon validate-field mb-4">
                        <i class="fa fa-lock"></i>
                        <input type="password" v-model="auth.password" class="form-control" id="form3a" placeholder="Password">
                        <label for="form3a" class="color-blue-dark font-10 mt-1">Password</label>
                        <i class="fa fa-check disabled invalid color-green-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i>
                        <em>(required)</em>
                    </div>

                    <div class="mb-4">
                        <button class="btn btn-m mt-2 mb-2 w-100 bg-blue-dark rounded-sm text-uppercase font-900">Login</button>
                        <center>
                            <router-link :to="{name:'ResetPassword'}">Lupa Password ?</router-link>
                        </center>
                    </div>

                    
                </form>

                <!-- <p class="boxed-text-l">
                    Dipersembahkan untuk Kabupaten Labuhanbatu Utara agar semakin Jaya.
                </p> -->

                <div class="text-center mb-3">
                    <a href="https://t.me/egovlabura" class="icon icon-xs rounded-sm shadow-l me-1 bg-facebook"><i class="fab fa-telegram"></i></a>
                    <a href="https://www.instagram.com/diskominfolabura/" class="icon icon-xs rounded-sm shadow-l me-1 bg-twitter"><i class="fab fa-instagram"></i></a>
                </div>

                <p class="footer-copyright pb-3 mb-1">Copyright &copy; Diskominfo <span id="copyright-year">2021</span>. All Rights Reserved.</p>
            </div>
        </div>
    </div>    
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            warningMessage:'Password tidak cocok!',
            dialogStatus: false,
            preloaderStatus: false,
            auth:{
                username:'',
                password:''
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
    methods:{
        async doLogin(event){
            event.preventDefault()
            // alert('Do Login')
            this.$refs.preloader.toggle()
            this.$store.dispatch('auth/doLogin',this.auth).then(response => {
                this.$refs.preloader.toggle()
                if(response.status == 'gagal')
                {
                    if(response.pesan == 'User tidak ditemukan!')
                        this.warningMessage = "NIP / NIK tidak ditemukan!"

                    this.$refs.warningAlert.toggle()
                }
                else
                {
                    window.localStorage.setItem('auth',JSON.stringify(response))
                    this.$router.push({name:'Dashboard'})
                }
            }).catch (error => {
                console.log(error)
                this.$refs.preloader.toggle()
                this.$refs.warningAlert.toggle()
            })
            return false
        }
    },
    computed: {
        ...mapGetters({
            loaderStatus: 'loader/getLoaderStatus',
        })
    }
}
</script>