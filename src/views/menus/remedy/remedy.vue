<template>
    <div>
        <sa-page-load ishow="1"></sa-page-load>
        <main class="main">
            <img src="./img/remedy.png">
        </main>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    export default {
        data() {
            return {
            }
        },
        components: {
            SaPageLoad
        },
        //实例初始化最之前，无法获取到data里的数据
        beforeCreate(){

        },
        //created创建完毕状态
        created() {

        },
        //在挂载开始之前被调用
        beforeMount(){

        },
        //已成功挂载，相当ready()
        mounted(){

        },
        //相关操作事件
        methods: {
            
        }
    }
</script>
<style type="text/css" lang="less">
    body{
        height: 100%;
        width: 100%;
        overflow: scroll;
        position: absolute;
    }
    img{
        width: 100%;
        height: auto;
    }
    
</style>