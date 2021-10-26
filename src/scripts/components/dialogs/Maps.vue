<template>
    <div>
        <div id="menu-maps" class="menu menu-box-modal rounded-m" :class="{'menu-active':status}"
            data-menu-height="410" 
            data-menu-width="330">
            <div class='responsive-iframe max-iframe'><iframe :src="iframe_src" frameborder='0' allowfullscreen></iframe></div>
            <h3 class="text-center font-700 mt-3">Lokasi Anda</h3>
            <p class="boxed-text-l">
                Klik pointing lokasi untuk merefresh lokasi anda saat ini atau klik Oke untuk mulai melakukan absen.
            </p>
            <div class="d-flex p-2">
                <button @click="refreshMaps" class="close-menu btn btn-center-m btn-sm shadow-l rounded-s text-uppercase font-900 bg-green-dark">Pointing Lokasi</button>
                &nbsp;
                <button @click="oke_btn" class="close-menu btn btn-center-m btn-sm shadow-l rounded-s text-uppercase font-900 bg-green-dark">Oke</button>
            </div>
        </div>   
        <div class="menu-hider" :class="{'menu-active':status}" @click="toggle(params)"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            status:false,
            iframe_src:'',
            params:false
        }
    },
    props:[
        "lat","lng"
    ],
    created(){
        // this.iframe_src = 'https://www.google.com/maps/embed/v1/view?key=AIzaSyBRtfhwWXM5XGAVVRn6lRnKt1z3RfaOcS8&center='+this.lat+','+this.lng+'&zoom=16&maptype=satellite'
        this.iframe_src = 'https://maps.google.com/maps?q='+this.lat+','+this.lng+'&z=15&output=embed'
    },
    methods:{
        toggle(params = false){
            this.status = !this.status
            this.params = params
            this.refreshMaps()
        },
        refreshMaps(){
            if (typeof(Android) != "undefined")
            {
                Android.showToast('Refresh GPS')
                var getLocation = Android.getLocation()
                getLocation = JSON.parse(getLocation)
                if(getLocation.status == "error")
                {
                    Android.showToast(getLocation.message)
                    return
                }

                var coor = getLocation.data
                if(coor)
                    this.iframe_src = 'https://maps.google.com/maps?q='+coor.lat+','+coor.lng+'&z=15&output=embed'
            }
        },
        oke_btn(){
            this.$parent.maps_callback(this.params);
        }
    }
}
</script>