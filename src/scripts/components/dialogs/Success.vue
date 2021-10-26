<template>
    <div @click="toggle">
        <div id="menu-success-1" class="menu menu-box-modal rounded-m"  :class="{'menu-active':status}" 
            data-menu-height="460" 
            data-menu-width="310">
            <h1 class="text-center mt-3 pt-1"><i class="fa fa-3x fa-check-circle color-green-dark shadow-xl rounded-circle"></i></h1>
            <h1 class="text-center mt-3 font-700">{{title}}</h1>
            <p class="boxed-text-l" v-html="content"></p>
            <a href="#" class="close-menu btn btn-m btn-center-m button-s shadow-l rounded-s text-uppercase font-900 bg-green-light">Oke</a>
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