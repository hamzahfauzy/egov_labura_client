<template>
    <div class="page-title page-title-small">
        <h2>
            <button @click="back" v-if="backBtn"><i class="fa fa-arrow-left"></i></button> &nbsp;
            {{pageTitle}}
        </h2>
        <!-- <a href="#" data-menu="menu-main" class="bg-fade-highlight-light shadow-xl preload-img" :data-src="image"></a> -->
    </div>
</template>
<script>
export default {
    props:{
        backBtn:'',
        pageTitle:'',
        image:'' // defaul images/logo.png
    },
    methods:{
        back(){
            // this.$router.back()
            window.goBack()
        }
    }
}
</script>