<template>
    <div class="scratchcard-main">
        <div class="scratchcard-container">
            <!-- 取消 -->
            <div class="scratchcard-cannel" @click="handleGoHome"></div>
            <!-- 刮刮乐区域 -->
            <div class="scratchcard-con" @click="handleGetAward">
                <div class="scratchcard-gua"  v-if="start" style="z-index:100">
                    <img src="../imgs/scratch-con.png"  class="scratchcard-img" alt="" id="redux">
                    <div class="scratchcard-title" v-if="startFlag">刮开涂层即查询您所在区域<br>获奖人名单</div>
                </div>
                <!-- 获奖弹窗 -->
                <div class="scratchcard-award" v-if="awardFlag" style="z-index:50"> 
                    <div class="scratchcard-award-title">您获得 {{awardData.region}}地区 {{awardData.awardName}}!</div>
                    <div class="scratchcard-award-money">{{awardData.amount}}元</div>
                    <div class="scratchard-award-desc">您中奖信息已推送到您的微信上请注意查收</div>
                    <div class="secatchchard-award-tip">注意：通过获奖链接填写信息才有资格领奖哦</div>
                    <div class="scratchcard-alert scratchcard-award-alert" @click="handleGetAwardList">查看全国中奖名单</div>
                </div>
                <!-- 获奖弹窗 -->
                <div class="scratchcard-award" v-if="noawardFlag" style="z-index:50"> 
                    <div class="no-award-title">
                        <i class="no-award-icon"></i>
                         <span class="no-award-desc">再接再厉呦!<br>
                            多多积累幸运值，惊喜等着你!
                         </span>
                         <!--钻石会员日感恩回馈您<i class="no-award-em">{{awardData.heshiCoin}}荷石币</i></span> -->
                    </div>
                    <div class="scratchcard-award-region">
                        <i class="scratchcard-award-location"></i>
                        <span class="award-location-desc">
                            您当前所在区域：<i class="location-address">{{awardData.region}}</i>
                        </span>
                    </div>
                    <div class="scratch-award-desc">
                        <i class="prize-icon"></i>
                        <ul class="prize-list">
                            <li class="prize-item" v-for="prizeItem in awardData.data">
                                <span class="name-item">{{prizeItem.nickname}}</span>
                                <span class="award-item">{{prizeItem.awardName}}&nbsp;&nbsp;{{prizeItem.amount}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="scratchcard-alert" @click="handleGetAwardList">查看全国中奖名单</div>
                </div>
            </div>    
        </div>
        <!-- 提示框 -->
        <div v-if="errFlag" class="alert-msg">
            <p>{{errMsg}}</p>
        </div>
    </div>
</template>
<script type="text/javascript">
    import bus from "assets/js/bus.js"
    import Lib from "assets/js/Lib.js"
    export default {
        data() {
            return {
                start: true,
                startFlag: true,
                awardFlag: false,
                cartFlag: false,
                noawardFlag: false,
                type: true,
                awardData: {},//中奖弹框；
                errFlag: false,//错误提示信息；
                errMsg: ""
            }
        },
        components: {
        },
        methods: {
            //掉中奖接口
            handleGetAward() {
                this.defalutCard();
            },
            //初始化刮刮卡；
            defalutCard() {
                var _this = this;
                this.startFlag = false;
                    $("#redux").eraser({
                        size: 50, // 设置皮擦大小
                        completeRatio: 0.8, // 设置擦出比例
                        progressFunction: function(p) {
                            if (p >= 0.7) {
                                $(".alert-coating").css("display", "none");
                                $("#redux").eraser("clear");
                                $("#redux").css("display", "none")
                                _this.start = false;
                            }
                        }
                    });
                // if(this.type){
                //     //中奖；
                //     this.awardFlag = true;
                // }else{
                //     //未中奖；
                //     this.noawardFlag = true;
                // }
                
            },
            //回首页；
            handleGoHome() {
                location.href =
                        "../../views/menus/home.html?t=" + +new Date();
            },
            //查看全国中奖名单；
            handleGetAwardList() {
                //console.log(this.awardFlag,this.noawardFlag)
                console.log(this);
                this.awardFlag = false;
                this.noawardFlag = false;
                bus.$emit("getawardlist");
            },
            //获取中奖数据；
            getAwardData() {
                var _this = this;
                // Lib.ajax({
                //     url: "../../static/datas/draw.json",
                //     type: "GET",
                //     dataType: "json",
                //     success: this.GetAwardDataSucc
                // })
                //alert(2);
                Lib.ajax({
                    url: "/memberDay/getPersonalAward",
                    headers: {
                        appId: weixin_token.appid,
                        openId: Lib.getCookie("openid"),
                    },
                    data: {
                        winningType: 1
                    },
                    success: this.GetAwardDataSucc,
                    error: function(err) {
                        _this.errFlag = true;
                        _this.errMsg = err.message;
                        setTimeout(function(){
                            _this.errFlag = false;
                        },1000)
                    }
                })
            },
            //成功获取中奖数据；
            GetAwardDataSucc(res) {
                var _this = this;
                if(res.ok) {
                    //console.log(res);
                    if(res.isWinning) {//中奖；
                        this.awardData.awardName = res.awardName;
                        this.awardData.region = res.region.replace("市","");
                        this.awardData.amount = res.amount;
                        this.awardFlag = true;
                    }else {//未中奖；
                        this.noawardFlag = true;
                        this.awardData = res;
                    }
                    //console.log(res);
                }else {
                    _this.errFlag = true;
                    _this.errMsg = res.msg;
                    setTimeout(function(){
                        _this.errFlag = false;
                    },1000)
                }
            }
         },
        mounted() {
            //获取中奖数据；
            this.getAwardData();
        }
    }
</script>
<style type="text/css" lang="less" scoped>
    .scratchcard-main {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
    }
    .scratchcard-container {
        margin: 250px 67px 0 73px;
        width: 610px;
        height: 749px;
        background: url(../imgs/scratch-card.png) no-repeat center;
        background-size: cover;
    }
    .scratchcard-cannel {
        float: right;
        margin: -25px -25px 0 0;
        width:62px;
        height:62px; 
        background:url(../imgs/scratch-cannel.png) no-repeat center;
        background-size: cover;
    }
    .scratchcard-con {
        position: relative;
        float: left;
        margin: 250px 20px 17px 20px;
        width: 570px;
        height: 445px;
    }
    .scratchcard-gua {
        position: absolute;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .scratchcard-img {
        width: 100%;
        height: 100%;
    }
    .scratchcard-title {
        position: absolute;
        top: 178px;
        width:100%;
        height:95px; 
        text-align: center;
        font-size:36px;
        font-family:'PingFangSC-Medium';
        color:rgba(82,80,80,1);
        line-height:61px;
    }
    .scratchcard-award {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        float: left;
        width: 570px;
        height: 445px;
        background:url(../imgs/scratch-award.png) no-repeat center;
        background-size: cover;
    }
    .scratchcard-award-title {
        margin-top: 78px;
        height: 34px; 
        font-size: 34px;
        font-family:'FZLTTHJW--GB1-0';
        font-weight: 900;
        text-align: center;
        line-height: 34px;
        color:rgba(248,63,43,1);
    }
    .scratchcard-award-money {
        margin: 12px 208px 16px 210px;
        width:140px;
        height:42px; 
        background:#F7C42E;
        border-radius: 20px ;
        font-size: 28px;
        font-weight: 900;
        color: #F83F2B;
        line-height: 42px;
        text-align: center;
    }
    .scratchard-award-desc {
        margin-left: 92px;
        width: 410px;
        height: 84px;
        font-size: 28px;
        color: #351A1A;
        line-height: 42px;
        text-align: center;
    }
    .secatchchard-award-tip {
        margin-top: 26px;
        height: 22px;
        font-size: 22px;
        color:#525050;
        text-align: center;
    }
    .scratchcard-award .scratchcard-award-alert {
        margin-top: 36px;
    }
    .scratchcard-award-region {
        margin-left: 46px;
        height: 28px; 
        font-size: 28px;
        font-family: 'PingFangSC-Regular';
        color:rgba(53,26,26,1);
    }
    .scratchcard-award-location {
        margin: 6px 32px 0 0;
        float: left;
        width: 20px;
        height: 26px;
        background: url(../imgs/scratch-location.png) no-repeat center;
        background-size: cover;
    }
    .location-address {
        color: #F83F2B;
    }
    .scratch-award-desc {
        margin: 30px 84px 0 46px;
        width: 440px;
        height: 94px; 
        font-size: 28px;
        font-family: 'PingFangSC-Regular';
        color:rgba(53,26,26,1);
    }
    .prize-icon {
        float: left;
        margin: 6px 32px 0 0;
        width: 20px;
        height: 24px;
        background: url(../imgs/prize-icon.png) no-repeat center;
        background-size: cover;
    }
    .prize-list {
        float: left;
        width: 384px;
        height: 94px;
    }
    .prize-item {
        float: left;
        width:100%;
        height: 28px;
        margin-bottom: 5px;
    }
    .name-item {
        width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        float: left;
    }
    .award-item {
        float: right;
        color: red;
    }
    .scratchcard-alert {
        margin: 50px 146px 0 146px;
        width:277px;
        height:44px; 
        font-size:26px;
        border: 1px solid #F83F2B;
        border-radius: 20px;
        text-align: center;
        line-height: 44px;
    }
    .no-award-title {
        margin: 62px 56px 22px 46px;
        width: 452px;
        height: 60px;
        font-size: 28px;
    }
    .no-award-icon {
        float: left;
        margin: 2px 32px 22px 0;
        width: 20px;
        height: 18px;
        background: url(../imgs/no-award-icon.png) no-repeat center;
        background-size: cover;
    }
    .no-award-desc{
        float: left;
        height: 60px;
        line-height: 32px;
        color:rgba(53,26,26,1);
    }
    .no-award-em {
        color: #F83F2B;
    }
    .alert-msg {
        width: 540px;
        position: absolute;
        background: rgba(0,0,0,0.7);
        border-radius: 20px;
        color: #fff;
        font-size: 30px;
        line-height: 150px;
        top: 50%;
        left: 0;
        right: 0;
        margin: 100px auto 0;
        text-align: center;
    
    }
</style>