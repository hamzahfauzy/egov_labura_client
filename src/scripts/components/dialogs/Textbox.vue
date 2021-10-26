<template>
    <div>
        <div id="menu-success-1" class="menu menu-box-modal rounded-m"  :class="{'menu-active':status}" 
            data-menu-height="260" 
            data-menu-width="310">
            <h1 class="text-center mt-3 font-700">{{title}}</h1>
            <div class="p-2">
                <label for="">Keterangan</label>
                <textarea class="form-control" v-model="textbox"></textarea>
                <a href="#" @click="doCallback" class="close-menu btn btn-m btn-center-m button-s shadow-l rounded-s text-uppercase font-900 bg-green-light w-100">Submit</a>
            </div>
        </div>  
        <div class="menu-hider" :class="{'menu-active':status}"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            status:false,
            textbox:'',
            callback:null
        }
    },
    props:[
        "title","content"
    ],
    methods:{
        toggle(callback = false){
            this.status = !this.status
            this.callback = callback
        },
        doCallback(){
            this.callback(this.textbox)
            this.textbox = ''
        }
    }
}
</script>