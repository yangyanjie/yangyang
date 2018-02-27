<template>
    <div id="system">
        <img src="./img/404@2x.png" class="error">
        <button type="button" @click="gohome()">点击返回首页</button>
    </div>
</template>
<script type="text/javascript">
    export default {
        methods: {
            gohome: function () {
                let url = '/app-hebei/views/menus/home.html?t='+(+new Date);
                window.location.href = window.location.origin + url;
            }
        }
    }
</script>
<style type="text/css" lang="less">
    #system {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        .error {
            position: relative;
            width: 670px;
            height: 932px;
            margin: 0 40px;
        }
        button {
            position: absolute;
            width: 700px;
            margin: 0 25px;
            height: 88px;
            bottom: 100px;
            font-size: 36px;
            color: #fff;
            background: linear-gradient(#FF7200, #FF9600);
        }
    }
</style>