<template>
    <div class="ui-img-loading"></div>
    <img :src="imgUrl" @load="successLoadImg" @error="errorLoadImg">
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                imgUrl: this.url || ''
            }
        },
        mounted() {

        },
        methods: {
            successLoadImg: function () {

            },
            errorLoadImg: function () {

            }
        },
        props: ['url']
    }
</script>
<style type="text/css" lang="less">

</style>