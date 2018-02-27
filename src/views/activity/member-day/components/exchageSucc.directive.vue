<template>
<!-- 兑换成功弹框 -->
    <div class="exchange-main">
        <div class="exchange-container">
            <div class="exchange-right"></div>
            <div class="exchange-desc">兑换成功!</div>
            <div class="exchange-btn">确定</div>
        </div>
    </div>
</template>
<script>
    
    export default {
        
    }
</script>
<style type="text/css" lang="less" scoped>
    .exchange-main {
        z-index: 2;
        position: absolute;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,0.7);
    }
    .exchange-container {
        overflow: hidden;
        margin: 262px 65px 0 65px;
        width:620px;
        height:522px; 
        background:rgba(255,255,255,1);
        border-radius: 10px ; 
    }
    .exchange-right {
        margin: 48px 240px 0 240px;
        width: 138px;
        height: 138px;
        background: url(../imgs/is-exchage.png) no-repeat center;
        background-size: cover;
    }
    .exchange-desc {
        margin: 50px 0 134px;
        height: 36px;
        color:#515151;
        line-height:36px;
        text-align: center;
    }
    .exchange-btn {
        margin: 0 14px;
        width: 590px;
        height: 88px;
        font-size: 34px;
        font-weight: 900;
        text-align: center;
        color: #fff;
        line-height: 88px;
        background: linear-gradient(to bottom, #FF9600  ,#FF7200);
        border-radius: 8px; 
    }
   
</style>

