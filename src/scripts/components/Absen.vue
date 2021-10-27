<template>
    <div class="page-content" v-if="loaderStatus==false" ref="absen">
        <page-title :backBtn="true" :pageTitle="pageTitle" image="images/avatars/5s.png"></page-title>
        <div class="card header-card shape-rounded" data-card-height="150">
            <div class="card-overlay bg-highlight opacity-95"></div>
            <div class="card-overlay dark-mode-tint"></div>
            <div class="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
        </div>

        <!-- <div class="card card-style">
            <div class="card-body">
                <p class="mb-1">
                    Absen {{page_type}} digunakan untuk absen jika anda berada di {{page_type=='Luar Lokas'?'luar':''}} wilayah kantor Anda
                </p>
            </div>
        </div> -->
        
        <div class="card card-style">
            <div class="content mt-0 mb-0">
                <div class="list-group list-custom-small list-icon-0">
                    <template v-for="(absen,key) in absen_items">
                        <button @click="launchCamera(absen.name)" :key="key" v-if="!absen.type || absen.type == page_type">
                            <span>{{absen.name}}</span>
                        </button>
                    </template>
                </div>      
            </div>  
        </div>  

        <!-- <gmaps-map>
            <gmaps-marker :position="{ lat: -27, lng: 153 }" />
        </gmaps-map> -->

        <camera ref="camera"></camera>
        <textbox ref="textbox" title="Absen Luar Lokasi"></textbox>
        <full-maps :lat="lat" :lng="lng" ref="maps"></full-maps>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            pageTitle:'Absen',
            page_type:'Sekarang',
            picture:'',
            selectedName:'',
            lat:2.5685118,
            lng:99.6531382,
            coor:null,
            absen_items:[
                {name:'Absen Masuk'},
                {name:'Absen Istirahat'},
                {name:'Absen Selesai Istirahat'},
                {name:'Absen Pulang'},
                {name:'Absen Upacara',type:'Luar Lokasi'},
                {name:'Absen Senam',type:'Luar Lokasi'},
            ]
        }
    },
    created(){
        var params = this.$route.params
        this.page_type = params.type
        this.pageTitle += ' ' + params.type
    },
    methods:{
        startMedia(coor){
            this.coor = coor
            this.lat = coor.lat
            this.lng = coor.lng
        },
        maps_callback(name){
            this.$refs.camera.start(name)
        },
        launchCamera(name)
        {
            this.selectedName = name
            if (this.page_type == "Luar Lokasi")
                this.$refs.textbox.toggle(this.textboxCallback)
            else
                this.$refs.maps.toggle(name)
        },
        textboxCallback(text){
            this.$refs.camera.start(this.selectedName, text)
        }
    },
    mounted(){
        var vm = this
        vm.$store.dispatch('loader/setLoaderStatus',true)
        setTimeout(async function(){
            await vm.$store.dispatch('loader/setLoaderStatus',false)
            window.init_template()
        },1000)

        window.absen = this
        window.startMedia = this.startMedia
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