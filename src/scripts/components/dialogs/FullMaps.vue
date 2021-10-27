<template>
    <div>
        <div class="mobile-wrapper" :class="{'hidden':hidden}">
            <div class="iframe-container">
            <preloader ref="preloader"></preloader>
                <iframe :src="iframe_src" frameborder='0' allowfullscreen @load="closePreloader()"></iframe>
                <div class="d-flex p-2 btn-wrapper bg-white">
                    <button @click="closeMaps" class="close-menu btn btn-center-m btn-sm shadow-l rounded-s text-uppercase font-900 bg-red-dark">Tutup Maps</button>
                    &nbsp;
                    <button @click="refreshMaps" class="close-menu btn btn-center-m btn-sm shadow-l rounded-s text-uppercase font-900 bg-green-dark">Pointing Lokasi</button>
                    &nbsp;
                    <button @click="oke_btn" class="close-menu btn btn-center-m btn-sm shadow-l rounded-s text-uppercase font-900" :class="{'bg-blue-dark':isOnLocation,'bg-light':!isOnLocation}">Ambil Foto</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            hidden:true,
            iframe_src:null,
            params:false,
            isOnLocation:false
        }
    },
    props:[
        "lat","lng"
    ],
    created(){
        // this.iframe_src = 'https://www.google.com/maps/embed/v1/view?key=AIzaSyBRtfhwWXM5XGAVVRn6lRnKt1z3RfaOcS8&center='+this.lat+','+this.lng+'&zoom=16&maptype=satellite'
        // this.iframe_src = 'https://maps.google.com/maps?q='+this.lat+','+this.lng+'&z=15&output=embed'
    },
    methods:{
        toggle(params = false){
            this.hidden = false
            this.params = params
            this.refreshMaps()
        },
        closeMaps(){
            this.iframe_src = null
            this.hidden = true
        },
        closePreloader(){
            if(this.iframe_src != null)
                this.$refs.preloader.close()
        },
        refreshMaps(){
            this.$refs.preloader.toggle()
            if (typeof(Android) != "undefined")
            {
                this.iframe_src = null
                Android.showToast('Refresh GPS')
                var getLocation = Android.getLocation()
                getLocation = JSON.parse(getLocation)
                if(getLocation.status == "error")
                {
                    Android.showToast(getLocation.message)
                    return
                }
                else
                    Android.showToast(getLocation.message)

                var coor = getLocation.data
                if(coor)
                {
                    this.iframe_src = 'https://maps.google.com/maps?q='+coor.lat+','+coor.lng+'&z=15&output=embed'
                    var auth = this.$helpers.auth()
                    if(auth.absensi_variables.kordinat_bebas != null)
                        this.isOnLocation = true
                    else
                    {
                        // check location
                        var kordinat_khusus = auth.absensi_variables.kordinat_khusus
                        for(var i=0; i<kordinat_khusus.length; i++)
                        {
                            var kordinat = kordinat_khusus[i]
                            console.log(kordinat)
                            var distance = this.$helpers.distanceBetweenEarthCoordinates({lat:kordinat.latitude,lng:kordinat.longitude},coor)
                            if (typeof(Android) != "undefined")
                                Android.showToast("Jarak : "+distance)
                            console.log("Jarak : "+distance)
                            if(distance <= kordinat.radius)
                            {
                                this.isOnLocation = true
                                break
                            }
                        }
                    }
                }
            }
            // else
            // {
            //     this.iframe_src = 'https://maps.google.com/maps?q='+this.lat+','+this.lng+'&z=15&output=embed'
            // }
        },
        oke_btn(){
            if(this.isOnLocation)
            {
                this.$parent.maps_callback(this.params);
                this.closeMaps()
            }
            else
            {
                var message = "Anda Tidak Berada Di Lokasi"
                console.log(message)
                if (typeof(Android) != "undefined")
                    Android.showToast(message)
            }
        }
    }
}
</script>
<style scoped>
.iframe-container {
    width: 100%;
    height:100vh;
}
iframe {
    width: 100%;
    height: calc(100% - 74px);
}
.hidden {
    display:none;
}
.mobile-wrapper {
    margin:auto;
    width:100%;
    max-width:500px;
    height:100vh;
    overflow:hidden;
    position:fixed;
    top:0;
    left:0;
    z-index: 100;
}
#result {
    display:none;
    text-align: center;
    z-index: 2;
    color: rgba(255,255,255,0.8);
    max-width: 450px;
    width:85%;
    background: rgba(0,0,0,0.5);
    padding: 10px;
    border-radius: 8px;
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translate(-50%, 50%);
}
.btn-wrapper {
    bottom:0;
    position:absolute;
    z-index:2;
    border:0;
    width:100%;
    left:0;
}
</style>