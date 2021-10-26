<template>
    <div @click="toggle">
        <div id="menu-warning-1" class="menu menu-box-modal rounded-m" :class="{'menu-active':status}" 
            data-menu-height="300" 
            data-menu-width="310">
            <h1 class="text-center mt-3 pt-1"><i class="fa fa-3x fa-times color-red-dark"></i></h1>
            <h1 class="text-center mt-3 font-700">{{title}}</h1>
            <p class="boxed-text-l">
                {{content}}
            </p>
            <a href="#" class="close-menu btn btn-m btn-center-m button-s shadow-l rounded-s text-uppercase font-900 bg-red-light">Tutup</a>
        </div>
        <div class="menu-hider" :class="{'menu-active':status}"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            status:false
        }
    },
    props:[
        "title","content"
    ],
    methods:{
        toggle(){
            this.status = !this.status
        }
    }
}
</script>