<template>
    <div id="root">
        <div class="ui-main">
            <div class="scan-font"></div>
            <div class="scan-win-tip">关注微信公众号<i class="scan-win-ring">“河北中烟”</i>,获取更多服务</div>
            <div class="scan-win-con">
                <ul class="luck-draw">
                    <li class="lottery-unit luck-draw-item" :class="'lottery-unit-'+item.id" v-for="item in todoList" :key="item.id" @click="handleClick(item.id)" md="hb_1_jge" md_name="九宫格">
                        <i class="luck-m"></i>
                        <img class="luck-draw-img" :src="item.imgUrl" alt=""/>
                    </li>
                </ul>
            </div>
            <div class= "scan-alert-con" v-if="awardFlag">
                <div class="scan-alert">
                    <div class="alert-face"></div>
                    <div class="alert-title">恭喜获得<i style="color:#f06c00">{{prizeName}}</i></div>
                    <div class="alert-desc" v-if="awardType===3">¥{{awardPrize}}鼓励金<i v-if="score!==''">+{{score}}荷石币</i></div>
                    <div class="alert-desc" v-if="awardType===6">{{score}}荷石币</div>
                    <div class="alert-btn" @click="handleJudgeClick" md="hb_4_jge" md_name="确定领奖按钮">赶紧收下</div>
                    <i class="alert-cannel" @click="handleCannelClick"></i>
                </div>
            </div>
            <div class= "scan-alert-con" v-if="thankFlag">
                <div class="scan-alert scan-alert-else">
                    <div class="alert-thanks">{{prizeName}}</div>
                    <div class="alert-thanks-desc">
                        <img class="card-img" :src="participationImg" alt="">
                    </div>
                    <div class="participation-btn" v-if="participationFlag">
                        <div class="participationChange" @click="handleParticipationChange">换一个</div>
                    </div>
                    <div class="alert-btn alert-btn-else" @click="handleJudgeClick" md="hb_4_jge" md_name="确定领奖按钮">确定</div>
                    <i class="alert-cannel" @click="handleCannelClick"></i>
                </div>
            </div>
            <div class= "scan-alert-con" v-if="noawardFlag">
                <div class="scan-alert scan-alert-else">
                    <div class="alert-thanks-no"></div>
                    <div class="alert-award-no">很遗憾未中奖</div>
                    <div class="alert-btn alert-btn-else" @click="handleCannelClick">确定</div>
                    <i class="alert-cannel" @click="handleCannelClick"></i>
                </div>
            </div>
            <div class= "scan-alert-con"  v-if="tipFlag">
                <div class="alert-tip-con">
                    <div class="alert-tip-title">
                        提示
                    </div>
                    <div class="alert-tip-desc" :class="{alertTipActive: alertActive}">
                        {{tipMessage}}
                    </div>
                    <div class="alert-btn alert-btn-else alert-tip-btn" @click="handleCannelClick">我知道了</div>
                </div>
            </div>
            <div class="sucess" v-if="successFlag">{{receive}}</div>
            <valiadate-alert v-if="valiadateFlag" @getcode="handleGetCode" @submitcode="handleSubmitCode" :msg="message" @handlecannel="handleCannelBtn"></valiadate-alert>
            <crCode v-if="crCodeFlag" @handleclose="handleCannelCode"></crCode>
        </div>
    </div>
</template>
<script type="text/javascript">
import {Lottery} from 'assets/js/lottery.js';
import Lib from "assets/js/Lib.js";
import valiadateAlert from 'components/valiadate.directive.vue';
import crCode from "components/crCode.directive.vue";
    export default {
        components: {
            valiadateAlert,
            crCode
        },
        data() {
            return {
               todoList:[
                   {
                       id: 1,
                       imgUrl: '../../static/jiugonge/1@2x.png'
                   },
                   {
                       id: 2,
                       imgUrl: '../../static/jiugonge/2@2x.png'
                   },
                   {
                       id: 3,
                       imgUrl: '../../static/jiugonge/3@2x.png'
                   },
                   {
                       id: 8,
                       imgUrl: '../../static/jiugonge/4@2x.png'
                   },
                   {
                       id: 0,
                       imgUrl: '../../static/jiugonge/5@2x.png'
                   },
                   {
                       id: 4,
                       imgUrl: '../../static/jiugonge/6@2x.png'
                   },
                   {
                       id: 7,
                       imgUrl: '../../static/jiugonge/7@2x.png'
                   },
                   {
                       id: 6,
                       imgUrl: '../../static/jiugonge/8@2x.png'
                   },
                   {
                       id: 5,
                       imgUrl: '../../static/jiugonge/9@2x.png'
                   }
                ],
                lotteryFlag: true,
                awardFlag: false,
                thankFlag: false,
                noawardFlag: false,
                valiadateFlag: false,
                crCodeFlag: false,//关注公众号；
                successFlag: false,
                participationFlag: false,//参与奖
                awardPrize:"",//红包额度；
                prizeName: "",// 奖项名称；
                score: "",//积分；
                awardType: "",//奖项类型
                awardUrl: "",
                message:"",
                receive: "",
                awardUser: null,
                participationList: [], // 奖券数据
                participationImg: "", // 奖券图片地址
                participationText: "",// 奖券信息
                getSite:'',// 领取卡券地址
                urlIndex: 0,
                tipFlag: false,//提示；
                tipMessage: "",//提示信息；
                alertActive: false,//提示信息；
                sourceId: ""

            }
        },
        methods: {
            randomNum(n) {
				return Math.round(Math.random()*n);
            },
            getData() {
                 Lib.ajax({
                    url: "/platform_v2/getActivityPage",
                    method: "post",
                    data: {
                        moudleKey: "SCAN_CODE_CHECK_ACTIVITY_5",
                        activityCode: Lib.getUrlQuery('activityCode')
                    },
                    success: res => {
                        if (res.ret === "200000") {
                            console.log(this);
                            this.sourceId = res.data.pageId;
                            var src = "https://weblog.taozuike.com/md/new_state.js";
                            var Ele = document.getElementsByTagName("script")[0];
                            var v = document.createElement("script") || window.createElement("script");
                            v.src = src;
                            v.async = true;
                            v.type = 'text/javascript';
                            Ele.parentNode.insertBefore(v,Ele);
                            window.getpagestatistics = function() {
                                return {
                                    pageId: res.data.returnStr,
                                    sourceId: Lib.getUrlQuery("sourceId")
                                }
                            };
                            console.log(window.getpagestatistics());
                        }
                    }
                 })
            },
            handleClick() {
                if(this.lotteryFlag) {
                    this.lotteryFlag = false;
                    var n = this.randomNum(7);
                    var _this = this;
                    this.lottery.run(n+1,function(){
                        _this.handleGetAward();
                        _this.flag = true;
                    })
                }

            },
            handleCannelClick() {
                this.awardFlag = false;
                this.noawardFlag = false;
                this.thankFlag = false;
                this.tipFlag = false;
                window.location.href = '../menus/home.html?sourceId='+this.sourceId+"&t="+ +new Date();
            },
            handleGetAward(){
                Lib.ajax({
                    url: "/act_v2/draw",
                    headers: {
                      token: sessionStorage.getItem("token"),
                      tokenId: sessionStorage.getItem("tokenId")
                    },
                    data: {
                        orgCode: sessionStorage.getItem("orgCode"),
                        activityCode: Lib.getUrlQuery('activityCode'),
                        sn: sessionStorage.getItem("sn"),
                        code: sessionStorage.getItem("code"),
                        moudleKey: "SCAN_CODE_CHECK"
                    },
                    success: this.handleGetAwardSucc
                })
            },
            handleGetAwardSucc(res) {
                //debugger;
                console.log(res);
                if(res.ret === "200000") {
                    var res = res.data;
                    this.awardUser = res.awardUser;
                    this.awardType = res.awardType;
                    switch(this.awardType) {
                        case 0 :
                            this.noawardFlag = true;
                            //console.log("很遗憾，未中奖");
                            break;
                        case 1 :
                            //this.award = "实物";
                            console.log("实物");
                            break;
                        case 3 :
                            this.prizeName = res.prizeName;
                            if(res.score === 0) {
                                //只有红包；
                                this.awardPrize = res.awardPrice;
                                this.awardFlag = true;

                            }else {
                                //红包+积分；
                                this.awardPrize = res.awardPrice;
                                this.score = res.score;
                                this.awardFlag = true;

                            }

                            //console.log("红包");
                            break;
                        case 6 :
                            //this.award = "积分";
                            this.score = res.score;
                            this.awardFlag = true;
                            console.log("积分");
                            break;
                        case 889 :
                            if(res.moreList.length >= 2) {
                                this.participationFlag = true;
                            }
                            this.prizeName = res.prizeName;
                            this.participationList = res.moreList; // 卡券数据
                            this.participationImg = res.moreList[0].awardPicUrl; // 卡券的图片链接地址;
                            this.getSite = res.moreList[0].awardJumpurl; // 领取卡券的地址
                            this.thankFlag = true;
                            console.log("卡劵");
                            break;

                    }
                }else if(res.ret === "400400") {
                    this.tipMessage = res.message;
                    console.log(this.tipMessage.length);
                    if(this.tipMessage.length < 13) {
                        this.alertActive = true;
                    }else{
                        this.alertActive = false;
                    }
                    this.tipFlag = true;
                }
            },
            handleJudgeClick() {
                Lib.ajax({
                    url: "/user_v2/info",
                    headers: {
                      token: sessionStorage.getItem("token"),
                      tokenId: sessionStorage.getItem("tokenId")
                    },
                    success: this.hanldeGetUserInfoSucc
                })
            },
            hanldeGetUserInfoSucc(res) {

                console.log(res);
                //判断是否为新老用户；
                if(res.ret === "200000") {
                    console.log(res.data);

                    if(res.data.mobile) {
                        //老用户；
                        console.log(sessionStorage.getItem("wx-info"));
                        //wx-info有值就没关注，没值就关注了；
                        //调试改变了条件；！
                        if(!sessionStorage.getItem("wx-info")) {
                            //关注过公众号；
                            //调getGift接口；
                            if(this.awardType === 889) {
                                this.goLotteries();
                            }else{
                                this.getGiftInfo(res);
                            }

                        }else {
                            //未关注过公众号；
                            //去关注公众号；
                            if(this.awardType === 3 || this.awardType === 6) {
                                this.crCodeFlag = true;
                            }else if(this.awardType === 889){
                                this.crCodeFlag = true;
                            }
                        }
                    }else {
                        //新用户；
                        //验证手机号；
                        if(this.awardType === 3 || this.awardType === 6) {
                            this.valiadateFlag = true;
                        }else if(this.awardType === 889){
                            this.valiadateFlag = true;
                        }


                    }
                }
            },
            getGiftInfo(res) {
                console.log(res);
                var res = res.data;
                this.awardUser.mobile = res.mobile;
                this.awardUser.awardNickName = res.nickname;
                console.log(res);
                Lib.ajax({
                    url: "/award_v2/getgift",
                    headers: {
                      token: sessionStorage.getItem("token"),
                      tokenId: sessionStorage.getItem("tokenId")
                    },
                    data: {
                        activityId: this.awardUser.activityCode,
                        province: "",
                        city: "",
                        district: "",
                        mobile: this.awardUser.mobile,
                        address: "",
                        username: this.awardUser.awardNickName,
                        region: "",
                        orderChannel: "SCAN_CODE_CHECK",
                        orgCode: sessionStorage.getItem("orgCode"),
                        id: this.awardUser.id
                    },
                    success: this.hanldeGetGiftSucc
                })

            },
            handleSetTimeOut() {
                var _this = this;
                setTimeout(function(){
                     window.location.href = '../menus/home.html?sourceId='+this.sourceId+"&t="+ +new Date();
                    _this.successFlag = false;
                    _this.awardFlag = false;
                    _this.thankFlag = false;

                },1000)
            },
            hanldeGetGiftSucc(res) {
                if(res.ret === "200000") {
                    console.log(res);
                    this.receive = "领取成功";
                    this.successFlag = true;
                    this.handleSetTimeOut();
                }else {
                    this.receive = "领取失败";
                    this.successFlag = true;
                    this.handleSetTimeOut();
                }
            },
            handleGetCode(m) {
                var m = m.phone;
                //获取验证码；
                Lib.ajax({
                    url: "/act_v2/sendMessage",
                    headers: {
                      token: sessionStorage.getItem("token"),
                      tokenId: sessionStorage.getItem("tokenId")
                    },
                    data: {
                        mobile: m,
                        orgCode: sessionStorage.getItem("orgCode"),
                        scaleType:"bind_mobile"

                    },
                    success: function(res) {
                        if(res.ret === "200000") {
                            console.log("验证码获取成功");
                        }else {
                            console.log("验证码获取失败");
                        }

                    }
                })
            },
            handleSubmitCode(c) {
                console.log(c);
                var m = c.phone;
                var c = c.code;
                //判断验证码是否正确；
                Lib.ajax({
                    url: "/act_v2/register",
                    headers: {
                      token: sessionStorage.getItem("token"),
                      tokenId: sessionStorage.getItem("tokenId")
                    },
                    data: {
                        mobile: m,
                        smsCode: c,
                        activityCode: Lib.getUrlQuery('activityCode'),
                        score: 0,
                        orgCode: sessionStorage.getItem("orgCode"),
                        scaleType: "bind_mobile"

                    },
                    success: this.handleSubmitCodeSucc
                })

            },
            handleSubmitCodeSucc(res) {
                if(res.ret === "200000") {
                    this.valiadateFlag = false;
                    //手机号验证码验证成功；
                    this.message = "1";
                    if(!sessionStorage.getItem("wx-info")) {
                        //关注过公众号；
                        //调getGift接口；
                        this.handleJudgeClick();

                    }else {
                        //未关注过公众号；
                        //去关注公众号；
                        this.crCodeFlag = true;

                    }
                }else if(res.ret === "400400") {
                    if(res.message === "请填写验证码") {
                        //验证码为空；
                        this.message = "0";
                    }else {
                        //验证码不匹配；
                        this.message = "2";
                    }
                }else {
                    console.log("其他错误");
                }
            },
            handleCannelBtn() {
                this.valiadateFlag = false;

            },
            handleParticipationChange() {
                this.urlIndex = this.urlIndex+1;
                //console.log(this.participationList.length)
                if (this.participationList.length >= 2) {

                    if (this.urlIndex == this.participationList.length) {
                        this.urlIndex = 0;
                    }
                    console.log(this.urlIndex);
                    this.participationImg = this.participationList[this.urlIndex].awardPicUrl; // 奖券图片地址
                    this.getSite = this.participationList[this.urlIndex].awardJumpurl; // 领取卡券的地址
                }

            },
            // 领奖券
            goLotteries() {
                location.href =  this.getSite;
            },
            //关闭验证弹窗；
            handleCannelCode() {
                this.crCodeFlag = false;
            }

        },
        mounted() {
            if(sessionStorage.getItem("token") == null || sessionStorage.getItem("sn") == null || sessionStorage.getItem("code") == null) {
                window.location.href = "/s"
            };
            this.lottery = new Lottery();
            this.getData();

        },
        computed: {

        }

    }
</script>
<style type="text/css" lang="less">
    .ui-main {
        position: absolute;
        height: 100%;
        width: 100%;
        background: url(./imgs/scan-main.png) no-repeat center;
        background-size: 100% 100%;
    }
    .scan-font {
        margin: 100px 178px 0 178px;
        width: 394px;
        height: 244px;
        background: url(./imgs/scan-font.png) no-repeat center;
        background-size: cover;
    }
    .scan-win-con {
        position: absolute;
        left: 0;
        top: 352px;
        height:722px;
        background: url(./imgs/activity-con.png) no-repeat center;
        background-size: 100% 100%;
    }
    .scan-win-tip {
        margin-top: 30px;
        height:34px;
        font-size:30px;
        color:rgba(129,39,0,1);
        line-height:34px;
        text-align: center;
    }
    .scan-win-ring {
        font-weight: 900;
        color: #f06c00;
    }
    .scan-win-gap {
        height: 172px;
    }
    .luck-draw {
        padding: 190px 0 0 52px;
        height: 468px;
    }
    .luck-draw-item {
        position: relative;
        float: left;
        width: 216px;
        height: 150px;
    }
    .lottery-light{
        background:rgba(255,102,0,0.5);
    }
    .luck-draw-img {
        width: 100%;
        height: 100%;
    }
    .luck-m {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        width:100%;
        height: 100%;

    }
    .scan-alert-con {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 3;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
    }
    .scan-alert {
        position: absolute;
        left: 66px;
        top: 200px;
        width: 616px;
        height: 528px;
        background: url(./imgs/scan-alert.png) no-repeat center;
        background-size: 100%;
    }
    //提示弹框；
    .alert-tip-con {
        position: absolute;
        left: 66px;
        top: 200px;
        width: 616px;
        height: 528px;
        background: url(./imgs/scan-alert.png) no-repeat center;
        background-size: 100%;
    }
    .alert-tip-title {
        height: 200px;
        line-height: 200px;
        font-family:'PingFangSC-Semibold';
        font-size: 48px;
        color: #812700;
        text-align: center;
    }
    .alert-tip-desc {
        margin: 0 58px;
        line-height: 64px;
        font-size: 36px;
        font-family:'PingFangSC-Semibold';
        color: #812700;

    }
    .alertTipActive {
        text-align: center;
    }
    .alert-tip-btn {
        position: absolute;
        bottom:50px;
    }
    .alert-cannel {
        position: absolute;
        right: -10px;
        top: -10px;
        width: 58px;
        height: 58px;
        background: url(./imgs/scan-cannel.png) no-repeat center;
        background-size: 100%;
    }
    .alert-face {
        margin: 80px 256px 0 258px;
        width: 102px;
        height: 102px;
        background: url(./imgs/scan-face.png) no-repeat center;
        background-size: 100%;
    }
    .alert-title {
        margin-top: 4px;
        height:76px;
        font-size: 44px;
        font-weight: 900;
        line-height: 76px;
        text-align: center;
        color: #5F2D03;
    }
    .alert-desc {
        margin-top:32px;
        height:34px;
        font-size:34px;
        font-family:'FZPWJW--GB1-0';
        font-weight: 900;
        color:#F06C00;
        text-align: center;
        line-height: 34px;
    }
    .alert-btn {
        margin: 90px 202px 0 204px;
        width:208px;
        height:58px;
        font-family:"PingFangSC-Semibold";
        font-weight: 900;
        text-align: center;
        line-height: 58px;
        color:#fff;
        background: linear-gradient(to bottom, #FF9600  ,#FF7200);

    }
    .scan-alert-else {
        width: 604px;
        height: 514px;
    }
    .alert-thanks {
        margin-top: 50px;
        height: 76px;
        font-size: 40px;
        color: #5F2D03;
        text-align: center;
        line-height: 76px;
    }
    .participationChange {
        width: 102px;
        height: 34px;
        margin: 8px 0 0 455px;
        font-size: 24px;
        line-height: 34px;
        color: #5F2D03;
        border: 1px solid #5F2D03;
        text-align: center;
    }
    .alert-thanks-desc {
        margin: 0px 48px 0 64px;
        width: 492px;
        height: 232px;
    }
    .card-img {
        width:100%;
        height: 100%;
    }
    .alert-btn-else {
        margin-top: 20px;
    }
    .alert-thanks-no {
        margin: 80px 166px 0 178px;
        width: 270px;
        height: 184px;
        background: url(./imgs/noaward-face.png) no-repeat center;
        background-size: 100%;
    }
    .alert-award-no {
        margin: 44px 196px 0 200px;
        width: 220px;
        height: 36px;
        font-size: 36px;
        font-family:'PingFangSC-Medium';
        color:rgba(129,39,0,1);
        line-height: 36px;
    }
    .sucess {
        position: absolute;
        left: 0;
        top:0;
        bottom: 0;
        right: 0;
        margin: auto;
        z-index: 300;
        width:211px;
        height:166px;
        font-size:26px;
        color: #fff;
        text-align: center;
        line-height: 166px;
        background:rgba(0,0,0,0.8);
        border-radius: 10px;
    }

</style>