<template>
    <div class="isexchange-main">
        <div class="isexchange-container">
            <div class="isexchange-right"></div>
            <div class="isexchange-desc">您的剩余幸运值共可兑换</div>
            <div class="isexchange-num">20荷石币</div>
            <div class="isexchange-tip">确认兑换?</div>
            <div class="isexchange-btn">
                <span class="submit-btn">确定</span>
                <span class="cannel-btn">取消</span>
            </div>
        </div>
    </div>
</template>
<script>
    
    export default {
        
    }
</script>
<style type="text/css" lang="less" scoped>
    .isexchange-main {
        z-index: 2;
        position: absolute;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,0.7);
    }
    .isexchange-container {
        overflow: hidden;
        margin: 262px 65px 0 65px;
        width:620px;
        height:522px; 
        background:rgba(255,255,255,1);
        border-radius: 10px ; 
    }
    .isexchange-right {
        margin: 48px 240px 0 240px;
        width: 138px;
        height: 138px;
        background: url(../imgs/is-exchage.png) no-repeat center;
        background-size: cover;
    }
    .isexchange-desc {
        margin: 26px 0 15px;
        height: 34px;
        color:rgba(81,81,81,1);
        line-height:34px;
        text-align: center;
    }
    .isexchange-num {
        margin-bottom: 60px;
        height: 36px;
        color:#000;
        line-height:36px;
        text-align: center;
    }
    .isexchange-tip {
        margin-bottom: 44px;
        height: 32px;
        color:#000;
        font-weight: 900;
        line-height:32px;
        text-align: center;
    }
    .isexchange-btn {
        height: 88px;
        border-top: 1px solid #eee;
        font-size: 34px;
        line-height: 88px;
    }
    .submit-btn, .cannel-btn {
        float: left;
        height: 88px;
    }
    .submit-btn {
        width:310px;
        color:#F06C00;;
        text-align: center;
        border-right: 1px solid #eee;

    }
    .cannel-btn {
        width:308px;
        color: #444;
        text-align: center;
    }
    

    
    


</style>

