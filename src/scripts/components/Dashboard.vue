<template>
    <div class="page-content" v-if="loaderStatus==false">
        <page-title :backBtn="false" pageTitle="Dashboard" image="images/avatars/5s.png"></page-title>
        <div class="card header-card shape-rounded" data-card-height="150">
            <div class="card-overlay bg-highlight opacity-95"></div>
            <div class="card-overlay dark-mode-tint"></div>
            <div class="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
        </div>

        <!-- Homepage Slider-->
        <div class="splide single-slider slider-no-arrows slider-no-dots homepage-slider" id="single-slider-1">
            <div class="splide__track">
                <div class="splide__list">
                    <div class="splide__slide" v-for="(slide,idx) in sliders" :key="idx" @click="redirect(slide.post_url)">
                        <div class="card rounded-l mx-2 text-center shadow-l" :style="{backgroundImage:'url('+slide.thumb+'?random='+randomString+')'}" data-card-height="320">
                            <div class="card-bottom">
                                <h1 class="font-24 font-700"> </h1>
                                <p class="boxed-text-xl">
                                     
                                </p>
                            </div>
                            <!-- <div class="card-overlay bg-gradient-fade"></div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <router-link v-for="(service,index) in services" :key="index" :to="service.type_content" class="card card-style mb-3">
        <div class="d-flex pt-3 pb-3">
            <div class="mt-2 ps-3 ms-2">
                <h1 class="center-text" v-html="service.icon"></h1>
            </div>
            <div class="pt-2 mt-1 ps-4">
                <h4 class="color-theme font-600">{{service.label}}</h4>
                <p class="mt-n2 font-11 color-highlight mb-2">
                    {{service.description}}
                </p>
            </div>
            <div class="ms-auto align-self-center me-3">
                <span class="badge bg-highlight color-white font-10 py-1 px-2"><span class="fa-fw select-all fas"></span></span>
            </div>
        </div>
        </router-link>

    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            randomString:'',
            sliders:[
                {
                    "thumb":"images/logo.png",
                    "post_url":"#"
                },
                {
                    "thumb":"images/logo.png",
                    "post_url":"#"
                },
                {
                    "thumb":"images/logo.png",
                    "post_url":"#"
                }
            ],
            services:[
                {
                    icon:'<i data-feather="target" data-feather-line="1" data-feather-size="50" data-feather-color="green-dark" data-feather-bg="green-fade-light"></i>',
                    label:'Absen Sekarang',
                    description:'Absen jika di lokasi kantor',
                    type:'route',
                    type_content:{name:'Absen',params:{type:'Sekarang'}}
                },
                {
                    icon:'<i data-feather="map-pin" data-feather-line="1" data-feather-size="50" data-feather-color="red-dark" data-feather-bg="red-fade-light"></i>',
                    label:'Absen Luar Lokasi',
                    description:'Absen jika diluar lokasi kantor',
                    type:'route',
                    type_content:{name:'Absen',params:{type:'Luar Lokasi'}}
                }
                // ,
                // {
                //     label:'Layanan Lainnya',
                //     type:'link',
                //     type_content:'https://layanan.labura.go.id'
                // }
            ]
        }
    },
    async created(){
        this.randomString = (Math.random() + 1).toString(36).substring(7);
        this.$store.dispatch('nav/setActiveNav','home')
        // var vm = this

        var request = await fetch('https://storage.googleapis.com/slider-layanan-egov/slider.json?no-cache=true')
        var response = await request.json()
        this.sliders = response
    },
    methods:{
        redirect(url){
            if(url == '#') return
            location.href=url
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