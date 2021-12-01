<template>
    <div class="page-content" v-if="loaderStatus==false" ref="absen">
        <page-title :backBtn="true" :pageTitle="pageTitle" image="images/avatars/5s.png"></page-title>
        <preloader ref="vpreloader"></preloader>
        <div class="card header-card shape-rounded" data-card-height="150">
            <div class="card-overlay bg-highlight opacity-95"></div>
            <div class="card-overlay dark-mode-tint"></div>
            <div class="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
        </div>

        <div class="card card-style">
            <div class="content mt-0 mb-0">
                <div class="list-group list-custom-small list-icon-0" v-if="notifications != []">
                    <template v-for="(notif,key) in notifications">
                        <button :key="key" style="line-height:2;padding-top:10px;padding-bottom:10px;" @click="openUrl(notif.url, $event)">
                            <small style="color:#666"><i class="fa fa-clock fa-fw" style="line-height:1;"></i> {{notif.tanggal}}</small><br>
                            <span style="font-weight:300" v-html="notif.contents"></span>
                        </button>
                    </template>
                </div>      
                <div class="list-group list-custom-small list-icon-0" v-else>
                    <button style="text-align:center">
                        <span><i>Tidak ada Notifikasi!</i></span>
                    </button>
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
            pageTitle:'Notifikasi',
            notifications:[]
        }
    },
    async created(){
        // this.$refs.vpreloader.toggle()
        var auth = this.$helpers.auth()
        var request = await this.$store.dispatch('notification/getNotif',auth)
        this.notifications = request
        // this.$refs.vpreloader.toggle()
    },
    methods:{
        openUrl(url, ev){
            if(url != "" && ev.target.tagName.toLowerCase() != 'a')
                window.open(url)
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
</style>