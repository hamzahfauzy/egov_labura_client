<template>
    <div>
        <div class="mobile-wrapper" :class="{'hidden':hidden}">
            <video autoplay="true" id="videoElement" poster="images/logo-egov-flip.png"></video>
            <button @click="getPic" id="btn-absen"><i class="fa fa-camera"></i></button>
            <button @click="close" id="btn-close"><i class="fa fa-times"></i></button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            picture:'',
            mystream:null,
            hidden:true,
            name:'',
            successContent:'',
            cam_callback:null,
        }
    },
    methods:{
        close(){
            if(this.mystream != null)
            this.mystream.getTracks().forEach(track => {
                track.stop();
            });
            this.hidden = true
        },
        start(callback){
            var video = document.querySelector("#videoElement");
            var vm = this
            this.hidden = false
            this.cam_callback = callback

            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    vm.mystream = stream
                    video.srcObject = stream;
                })
            }
        },
        getPic(){
            var video = document.querySelector("#videoElement");
            var canvas = document.createElement('canvas')
            var context = canvas.getContext('2d')

            video.pause()
            canvas.height = video.videoHeight // offsetHeight
            canvas.width = video.videoWidth // offsetWidth
            context.drawImage(video,0,0,canvas.width,canvas.height)
            this.picture = canvas.toDataURL("image/jpeg")
            this.cam_callback(this.picture)
            this.close()
        },
    },
    mounted(){
        
    },
    beforeDestroy() {
        if(this.mystream != null)
        this.mystream.getTracks().forEach(track => {
            track.stop();
        });
    }
}
</script>
<style scoped>
video, canvas {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    height:100%;
    width:100%;
    object-fit:cover;
}
.hidden {
    display:none;
}
.mobile-wrapper {
    margin:auto;
    width:100%;
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
button {
    border-radius:100%;
    bottom:0;
    padding:15px;
    position:absolute;
    z-index:2;
    border:1px solid #efefef;
    color:#efefef;
    width:auto;
    left:calc(50% - 41px);
    background: transparent;
    font-size: 50px;
    margin-bottom:15px;
}

#btn-close {
    border:0;
    left:0;
    top:0;
    height:30px;
    font-size:30px;
    padding:0;
    margin-top:15px;
    margin-left:15px;
}
</style>