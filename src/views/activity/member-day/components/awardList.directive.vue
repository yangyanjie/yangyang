<template>
    <div class="award-ui">
         <i class="award-deamonds"></i>
        <div class="award-container">
            <div class="prize-con">
                <div class="prize-cup"></div>
                <div class="prize-desc">
                    <div class="prize-periods">
                        <div class="periods">2017-11-19期</div>         
                    </div>
                    <div class="award-desc">
                        <div class="address">河北石家庄</div>      
                        <ul class="prize-list">
                            <li class="prize-item">
                                <span class="name-item">蔡明红</span>
                                <span class="award-item">一等奖</span>
                            </li>
                            <li class="prize-item">
                                <span class="name-item">蔡明红</span>
                                <span class="award-item">一等奖</span>
                            </li> 
                            <li class="prize-item">
                                <span class="name-item">蔡明红</span>
                                <span class="award-item">一等奖</span>
                            </li>
                        </ul>
                    </div>
                </div>    
                
            </div>
            <div class="award-down">V</div>
        </div>
        <div class="activity-share"></div>
    </div>    
</template>
<script type="text/javascript">
   

    export default {
        
    }
</script>
<style type="text/css" lang="less" scoped>
    .award-ui {
        position: absolute;
        height: 100%;
        width: 100%;
        background: url(../imgs/activity-main1.png) no-repeat center;
        background-size: cover; 
    }
    .award-container {
        position: relative;
        margin: 88px 66px 0 66px;
        width: 620px;
        height: 970px;
        background: url(../imgs/award-con.png) no-repeat center;
        background-size: cover;
    }
    .award-deamonds {
        display: block;
        z-index: 2;
        position: absolute;
        right: 0;
        top: 0;
        width: 154px;
        height: 178px;
        background: url(../imgs/daily-diamonds.png) no-repeat center;
        background-size: cover; 
    }
    .prize-con {
        position: relative;
        padding-left: 22px; 
        top: 152px;
        width:598px;
        height: 685px;
    }
    .prize-cup {
        position: absolute;
        width: 67px;
        height: 71px;
        background: url(../imgs/prize-cup.png) no-repeat center;
        background-size: cover;
    }
    .prize-desc {
        position: absolute;
        left: 104px;
        width:443px;
        height:176px; 
        font-size:34px;
        font-family:'PingFangSC-Medium';
        color:rgba(53,26,26,1);

    }
    .prize-periods, .prize-item {
        width: 100%;
        height: 44px;
        font-family: 'PingFang SC';
        line-height: 44px;
    }
    .prize-periods {
        font-weight: 900;
    }
    .award-desc {
        height: 230px;
    }
    .address {
        font-family: 'PingFang SC';
        font-weight: 900;
        text-align: right;
    }
    .prize-list {
        margin-top: 5px; 
    }
    .name-item {
        color: #351A1A;
        float: left;
    }
    .award-item {
        padding-right: 50px;
        color: #F83F2B;
        float: right;
    }
    .award-down {
        position: absolute;
        bottom: 33px;
        width:100%;
        height: 24px;
        font-size:24px;
        font-family:'PingFangSC-Light';
        font-weight: 900;
        color:rgba(238,50,42,1);
        line-height:24px;
        text-align: center;

    }
    .activity-share {
        margin: 40px 242px 0 233px;
        width: 275px;
        height: 73px;
        background: url(../imgs/activity-share.png) no-repeat center;
        background-size: cover;
    }


</style>