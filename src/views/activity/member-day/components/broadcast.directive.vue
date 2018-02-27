<template>
    <div class="tiger-con" >
            {{tel}}
    </div>
</template>
<script type="text/javascript" scoped>
    export default {
        props: ['config','close'],
        data() {
            return {
                conf: this.$props.config.list[0].tel,
                timer: null,
                tel: ""
            }
        },
        mounted() {
            this.initScroll(200);

        },
        methods: {
            initScroll(delay) {
                var list = this.$props.config.list;
                var max = this.$props.config.list.length;
                var _this = this;
                this.timer = setInterval(function() {
                    var randomNum = Math.round(Math.random()*(max-1));
                    _this.tel = list[randomNum].tel;
                
                },delay);
            }
        },
        
    }
</script>
<style type="text/css" lang="less">
</style>