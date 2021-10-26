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
                    <div class="splide__slide" v-for="slide in sliders" :key="slide">
                        <div class="card rounded-l mx-2 text-center shadow-l" :style="{backgroundImage:'url('+slide+'&random='+randomString+')'}" data-card-height="320">
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

        <div class="row">
            <div class="col-6" v-for="(service,index) in services" :key="index">
                <router-link :to="service.type_content">
                <div class="card bg-20 mt-4 content rounded-m shadowl">
                    <div class="card-body text-center">
                        <h4 class="color-white">{{service.label}}</h4>
                        <p class="color-white">
                            {{service.description}}
                        </p>
                    </div>
                    <div class="card-overlay gradient-green opacity-95 rounded-m shadow-l"></div>
                    <div class="card-overlay dark-mode-tint rounded-m shadow-l"></div>
                </div>
                </router-link>
            </div>
        </div>

        <!-- footer and footer card-->
        <menu-footer></menu-footer>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            randomString:'',
            sliders:[
                'https://storage.googleapis.com/slider-layanan/slider1.jpg?nocache=true',
                'https://storage.googleapis.com/slider-layanan/slider2.jpg?nocache=true',
                'https://storage.googleapis.com/slider-layanan/slider3.jpg?nocache=true',
            ],
            services:[
                {
                    label:'Absen Sekarang',
                    description:'Klik untuk absen jika berada di wilayah',
                    type:'route',
                    type_content:{name:'Absen',params:{type:'Sekarang'}}
                },
                {
                    label:'Absen Luar Lokasi',
                    description:'Klik untuk absen di luar wilayah kantor',
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
    created(){
        this.randomString = (Math.random() + 1).toString(36).substring(7);
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