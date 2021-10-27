<template>
    <div id="footer-bar" class="footer-bar-5" v-if="$route.name != 'Login' && $route.name != 'ResetPassword'">
        <!-- <router-link :to="{name:'Login'}"><i data-feather="heart" data-feather-line="1" data-feather-size="21" data-feather-color="red-dark" data-feather-bg="red-fade-light"></i><span>Login</span></router-link> -->
        <!-- <a href="/"><i data-feather="image" data-feather-line="1" data-feather-size="21" data-feather-color="green-dark" data-feather-bg="green-fade-light"></i><span>Media</span></a> -->
        <router-link :to="{name:'Dashboard'}" :class="{'active-nav':this.active_nav=='home'}"><i data-feather="home" data-feather-line="1" data-feather-size="21" data-feather-color="blue-dark" data-feather-bg="blue-fade-light"></i><span>Home</span></router-link>
        <router-link :to="{name:'Profile'}" :class="{'active-nav':this.active_nav=='profil'}"><i data-feather="user-check" data-feather-line="1" data-feather-size="21" data-feather-color="yellow-dark" data-feather-bg="yellow-fade-light"></i><span>Profil</span></router-link>
        <a href="https://layanan.labura.go.id"><i data-feather="file" data-feather-line="1" data-feather-size="21" data-feather-color="brown-dark" data-feather-bg="brown-fade-light"></i><span>Layanan Lainnya</span></a>
        <a href="https://t.me/egovlabura"><i data-feather="message-circle" data-feather-line="1" data-feather-size="21" data-feather-color="green-dark" data-feather-bg="green-fade-light"></i><span>Bantuan</span></a>
        <a href="javascript:void(0)" @click="doLogout"><i data-feather="log-out" data-feather-line="1" data-feather-size="21" data-feather-color="red-dark" data-feather-bg="red-fade-light"></i><span>Keluar</span></a>
        <!-- <a href="/"><i data-feather="settings" data-feather-line="1" data-feather-size="21" data-feather-color="dark-dark" data-feather-bg="gray-fade-light"></i><span>Settings</span></a> -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            active_nav: 'nav/getActiveNav',
        }),
        currentRouteName() {
            return this.$route.name;
        }
    },
    methods:{
        doLogout(){
            this.$store.dispatch('auth/doLogout').then(() => {
                this.$router.push({name:'Login'})
            })
        }
    }
}
</script>
<style scoped>
#footer-bar {
    z-index: 12;
}
</style>