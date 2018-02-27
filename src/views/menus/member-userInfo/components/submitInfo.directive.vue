<template>
    <div id="alert-main">
        <div class="alert-container">
            <div class="alert-right"></div>
            <div class="alert-desc">恭喜你，提交成功!</div>
            <div class="alert-tip">领奖信息已推送至微信公众号<br>请注意查收</div>
            <div class="alert-btn" @click="handleBtnClick">确定</div>
        </div>
    </div>
</template>
<script>
    import bus from "assets/js/bus.js"
    export default {
        methods: {
            handleBtnClick() {
                bus.$emit("handleclickright")
            }
        }
    }
</script>
<style type="text/css" lang="less" scoped>
    #alert-main {
        position: absolute;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,0.7);
    }
    .alert-container {
        overflow: hidden;
        margin: 250px 65px 0 65px;
        width:620px;
        height:552px; 
        background:rgba(255,255,255,1);
        border-radius: 10px ; 
    }
    .alert-right {
        margin: 46px 216px 0 236px;
        width: 166px;
        height: 162px;
        background: url(../imgs/alert-icon.png) no-repeat center;
        background-size: cover;
    }
    .alert-desc {
        margin-top: 63px; 
        height:36px; 
        font-size:36px;
        font-family:"PingFangSC-Regular";
        color:rgba(0,0,0,1);
        line-height:36px;
        text-align: center;
    }
    .alert-tip {
        font-size:20px;
        color:rgba(0,0,0,1);
        line-height: 28px;
        text-align: center;
    }
    .alert-btn {
        margin: 68px 14px 0 14px;
        width:590px;
        height:88px; 
        background: linear-gradient(to bottom, #FF9600  ,#FF7200);
        border-radius: 8px;
        font-size:36px;
        color:rgba(255,255,255,1);  
        text-align: center;
        line-height: 88px;
    }
    


</style>

