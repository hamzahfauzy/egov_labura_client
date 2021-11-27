<template>
    <div>
        <success 
            title="Absensi berhasil!" 
            ref="successAlert" 
            :content="successContent">
        </success>
        <warning 
            title="Wajah Tidak Cocok!" 
            ref="warningAlert" 
            content="Pastikan pencahayaan cukup dan kamera menghadap lurus ke wajah!">
        </warning>
        <div class="mobile-wrapper" :class="{'hidden':hidden}">
            <preloader ref="preloader"></preloader>
            <video autoplay="true" id="videoElement" poster="images/logo-egov-flip.png"></video>
            <div id="result">Memuat...</div>
            <button @click="start(name)" id="btn-absen">Pindai Ulang</button>
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
            successContent:''
        }
    },
    methods:{
        start(name, keterangan = ''){
            this.name = name
            this.hidden = false
            this.$refs.preloader.toggle()
            var video = document.querySelector("#videoElement");
            var vm = this

            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    document.getElementById('result').style.display = "block";
                    document.getElementById('result').innerHTML = "Memuat Kamera...";
                    vm.mystream = stream
                    video.srcObject = stream;
                    video.onplaying = async function(){
                        vm.$refs.preloader.toggle()
                        document.getElementById('btn-absen').style.display = "none";

                        document.getElementById('result').innerHTML = "Sedang Memindai! Diharapkan untuk tidak bergerak selama proses pemindaian."

                        var counter = Math.floor(Math.random() * 2) + 1;
                        counter = counter * 1000
                        setTimeout(e => {
                            document.getElementById('result').innerHTML = "Sedang Mengidentifikasi Wajah. Mohon tunggu..."
                            video.pause()
                            var canvas = document.createElement('canvas')
                            var context = canvas.getContext('2d')
                            canvas.height = video.videoHeight // offsetHeight
                            canvas.width = video.videoWidth // offsetWidth
                            context.drawImage(video,0,0,canvas.width,canvas.height)
                            var srcAbsen = canvas.toDataURL("image/jpeg",0.5)

                            var auth = vm.$helpers.auth()

                            var formData = new FormData;
                            formData.append('username',auth.username)
                            formData.append('nama',auth.nama)
                            formData.append('user_id',auth.user_id)
                            formData.append('skpd_id',auth.skpd_id)
                            formData.append('nama_opd',auth.nama_opd)
                            formData.append('jenis_absen',name)
                            formData.append('jenis_pegawai',auth.jenis_pegawai)
                            formData.append('keterangan',keterangan)
                            formData.append('file_absensi',srcAbsen)

                            fetch(env.ABSEN_API_URL+'/pushAbsen',{
                                method:'POST',
                                body:formData
                            }).then(e => e.text())
                            .then(e => {
                                if(e == "")
                                {
                                    document.getElementById('result').innerHTML = "Wajah anda tidak ditemukan. Disarankan agar menggunakan kamera yang bagus dengan pengambilan yang bagus";
                                    document.getElementById('btn-absen').style.display = "block";
                                    return
                                }
                                var e = JSON.parse(e)
                                var cocok = e.status == 'fail' ? "Tidak Cocok" : "Cocok"
                                document.getElementById('result').innerHTML = "Wajah "+cocok+". "+e.message
                                
                                if(e.status == 'success')
                                {
                                    vm.$refs.successAlert.toggle()
                                    if(vm.mystream != null)
                                    vm.mystream.getTracks().forEach(track => {
                                        track.stop();
                                    });
                                    vm.successContent = '<span style="display:block;margin-bottom:10px;">'+name+' berhasil <br>Pada ' + e.tanggal + '</span><img width="100px" height="150px" style="object-fit:cover;object-position:center" src="'+srcAbsen+'">'
                                    vm.hidden = true
                                    // setTimeout(() => {
                                        // location.href='/absen/absen_berhasil?token=<?=$_GET['token']?>&id='+e.id
                                    // },1000)
                                }
                                else
                                {
                                    vm.$refs.warningAlert.toggle()
                                    if(vm.mystream != null)
                                    vm.mystream.getTracks().forEach(track => {
                                        track.stop();
                                    });
                                    vm.hidden = true
                                }
                                    // document.getElementById('btn-absen').style.display = "block";
                                    
                                    
                            }).catch(e => {
                                vm.$refs.warningAlert.toggle()
                                if(vm.mystream != null)
                                vm.mystream.getTracks().forEach(track => {
                                    track.stop();
                                });
                                vm.hidden = true
                            })
                        },counter)
                    }
                })
                .catch(function (error) {
                    vm.$refs.preloader.toggle()
                    console.log("Something went wrong!");
                    vm.hidden = true
                });
            }
        }
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
    display:none;
    bottom:0;
    padding:15px;
    position:absolute;
    z-index:2;
    border:0;
    width:100%;
    left:0;
    background: #FFF;
}
</style>