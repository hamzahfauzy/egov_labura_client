<template>
    <div id="preloader" :class="{'preloader-hide':!loaderStatus}"><div class="spinner-border color-highlight" role="status"></div></div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            loaderStatus: 'loader/getLoaderStatus',
        })
    }
}
</script>