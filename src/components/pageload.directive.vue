<template>
    <div class="loading" v-show="show">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                show: this.$props.ishow
            }
        },
        components: {

        },
        //实例初始化最之前，无法获取到data里的数据
        beforeCreate(){

        },
        //在挂载开始之前被调用
        beforeMount(){

        },
        created() {

        },
        //已成功挂载，相当ready()
        mounted(){
            let that = this;
            setTimeout(function () {
                that.$data.show = false;
            }, 2000)
        },
        //相关操作事件
        methods: {

        },
        props: ['ishow']
    }
</script>
<style type="text/css" lang="less" scoped>
    @keyframes load {
        0%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    @-webkit-keyframes load {
        0%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    .loading {
        position: absolute;
        width: 100%;
        text-align: center;
        height: 20px;
        margin: 0 auto;
        margin-top: 200px;
    }
    .loading span {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 5px;
        border-radius: 50%;
        background: #ff9f00;
        animation: load 1.04s ease infinite;
        -webkit-animation: load 1.04s ease infinite;
    }
    .loading span:last-child {
        margin-right: 0;
    }
    .loading span:nth-child(1) {
        animation-delay: 0.003s;
        -webkit-animation-delay: 0.003s;
    }
    .loading span:nth-child(2) {
        animation-delay: 0.015s;
        -webkit-animation-delay: 0.015s;
    }
    .loading span:nth-child(3) {
        animation-delay: 0.03s;
        -webkit-animation-delay: 0.03s;
    }
    .loading span:nth-child(4) {
        animation-delay: 0.045s;
        -webkit-animation-delay: 0.045s;
    }
    .loading span:nth-child(5) {
        animation-delay: 0.06s;
        -webkit-animation-delay: 0.06s;
    }
</style>