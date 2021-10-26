<template>
    <div id="menu-main"
         class="menu menu-box-right menu-box-detached rounded-m"
         data-menu-width="260"
         data-menu-active="nav-pages"
         data-menu-effect="menu-over"
         v-if="$route.name != 'Login'">  
         <div class="menu-header">
            <!-- <a href="#" data-toggle-theme class="border-right-0"><i class="fa font-12 color-yellow-dark fa-lightbulb"></i></a>
            <a href="#" data-menu="menu-highlights" class="border-right-0"><i class="fa font-12 color-green-dark fa-brush"></i></a>
            <a href="#" data-menu="menu-share" class="border-right-0"><i class="fa font-12 color-red-dark fa-share-alt"></i></a>
            <a href="index-settings.html" class="border-right-0"><i class="fa font-12 color-blue-dark fa-cog"></i></a> -->
            <a href="#" class="close-menu border-right-0"><i class="fa font-12 color-red-dark fa-times"></i></a>
        </div>

        <div class="menu-logo text-center">
            <a href="#"><img class="rounded-circle bg-highlight" width="80" src="images/avatars/5s.png"></a>
            <h1 class="pt-3 font-800 font-28 text-uppercase">{{$helpers.auth().nama}}</h1>
        </div>

        <div class="menu-items mb-4">
            <h5 class="text-uppercase opacity-20 font-12 pl-3">Menu</h5>
            <!-- <router-link :to="{name:'Dashboard'}" id="nav-welcome">
                <i data-feather="home" data-feather-line="1" data-feather-size="16" data-feather-color="blue-dark" data-feather-bg="blue-fade-light"></i>
                <span>Home</span>
                <i class="fa fa-circle"></i>
            </router-link> -->
            <a href="#" @click="doLogout" class="close-menu">
                <i data-feather="log-out" data-feather-line="3" data-feather-size="16" data-feather-color="red-dark" data-feather-bg="red-fade-dark"></i>
                <span>Log Out</span>
                <i class="fa fa-circle"></i>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        doLogout(){
            this.$store.dispatch('auth/doLogout').then(() => {
                this.$router.push({name:'Login'})
            })
        }
    }
}
</script>