<template>
    <div class="ui-popup">
        <img src="" class="close">
        <img src="">
        <div class="content"></div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            let conf = this.$props.config || {

            };

            return {
                conf: conf
            }
        },
        methods: {

        },
        props: 'config'
    }
</script>
<style type="text/css" lang="less">
    .ui-popup {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1000;
        box-shadow: rgba(0, 0, 0, .3);
    }
</style>