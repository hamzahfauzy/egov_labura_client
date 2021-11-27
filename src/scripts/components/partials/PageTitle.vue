<template>
    <div class="page-title page-title-small">
        <h2>
            <button @click="back" v-if="backBtn"><i class="fa fa-arrow-left"></i></button> &nbsp;
            {{pageTitle}}
        </h2>
        <!-- <a v-if="$route.name == 'Dashboard'" href="#" data-menu="menu-main" class="bg-fade-highlight-light shadow-xl preload-img" :data-src="image"></a> -->
        <router-link v-if="$route.name == 'Dashboard'" class="preload-img notif-link" :to="{name:'Notification'}" data-menu="menu-main">
            <i class="fa fa-bell"></i>
            <!-- <span class="badge bg-red color-white font-10 p-1" style="position:absolute;top:0;" v-if="notif_count">{{notif_count}}</span> -->
        </router-link>
    </div>
</template>
<script>
export default {
    props:{
        backBtn:'',
        pageTitle:'',
        image:'' // defaul images/logo.png
    },
    data(){
        return {
            notif_count:0,
        }
    },
    async created(){
        // var auth = this.$helpers.auth()
        // var request = await this.$store.dispatch('notification/getUnread',auth)
        // this.notif_count = request.length
    },
    methods:{
        back(){
            // this.$router.back()
            window.goBack()
        }
    }
}
</script>
<style scoped>
.notif-link {
    color:#FFF;
    font-size:25px;
    text-align: center;
}
.notif-link i {
    display:block;
    margin-top:8px;
}
.bg-red {
    background-color: red;
}
</style>