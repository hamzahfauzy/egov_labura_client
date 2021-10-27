<template>
    <div @click="toggle">
        <div id="menu-warning-1" class="menu menu-box-modal rounded-m" :class="{'menu-active':status}" 
            data-menu-height="300" 
            data-menu-width="310">
            <div class="preloader-wrapper">
                <div class="spinner-border color-green-dark" role="status"></div>
            </div>
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
    methods:{
        toggle(){
            this.status = !this.status
        },
        open(){
            this.status = true
        },
        close(){
            this.status = false
        }
    }
}
</script>