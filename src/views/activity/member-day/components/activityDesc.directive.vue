<template>
    <div class="ui-else-main">
        <div class="ui-else-top">
            <div class="daily-activity">
                <img src="../imgs/daily-diamonds.png" class="daily-diamonds">
                <div class="daily-diamonds"></div>
                <div class="daily-desc">每周六晚八点半 准时开奖</div>
                <div class="activity-desc">
                    <div class="activity-desc-item">
                        <span class="activity-icon"></span>
                        <div class="activity-desc-icon">
                            周一至周六20:30<span style="color: red">扫码新烟包并进入会员日活动页面</span>在获得原有奖励基础上获得50幸运值;<br>
                            <!-- 2018-02-23 需求变更 liubin
                            周六 0:00-20:30 <span style="color: red">扫码新烟包并进入会员日活动页面</span>可获得50幸运值+100荷石币;<br>-->
                            邀请好友,每位好友<span style="color: red">点击链接</span>可助力5幸运值,好友<span style="color: red">发表品吸评价</span>可助力10幸运;<br>
                            幸运值越高中奖几率越大!<br>

                        </div>
                    </div>
                    <div class="activity-desc-item">
                        <span class="activity-icon"></span>
                        <div class="activity-desc-icon">
                            周六晚20:30停止收集幸运值并开奖;<br>
                            一等奖:3000元,二等奖:2000元,三等奖:1000元;<br>
                            中奖用户将获得中奖信息推送,中奖后幸运值清零;
                            未中奖用户可在周六晚9点后将幸运值按比例200:20兑换为荷石币,周日24:00幸运值清零。<br>
                        </div>
                    </div>
                    <div class="activity-desc-item">
                        <span class="activity-icon"></span>
                        <div class="activity-desc-icon">
                            <span style="color: red;" >注意:首次进入活动页面允许开启地理位置才可获得活动资格！并请在同一地区扫码,多地区扫码奖励不叠加！两期活动内同一位用户不能连续中奖！</span><br>
                            此活动仅限河北地区参加(<span style="color: red;" >经典醇和保定暂不参加、盛世迎宾石家庄暂不参加</span>)！用户领奖后相关税费由中奖人自行承担！<br>

                        </div>
                    </div>
                </div>
                <img class="activity-desc-more" src="../imgs/i-more.png">
            </div>
            <div class="daily-tip">
                重要提示：中奖后72小时内未填写领奖信息<br>视为自愿放弃领奖机会
            </div>
            <div class="prize-container" v-if="beforeFlag">
                <div class="prize-diamonds"></div>
                <div class="prize-con">
                    <div class="prize-cup"></div>
                    <div class="prize-desc">
                        <div class="prize-desc-item" v-for="(awardItem,awardKey) in awardList.data">
                            <div class="prize-periods" >
                                <span class="periods">{{awardList.winningTime}}</span>
                                <span class="address">{{awardKey}}</span>
                            </div>
                            <ul class="prize-list">
                                <li class="prize-item" v-for="item in awardItem">
                                    <span class="name-item">{{item.nickname}}</span>
                                    <span class="award-item">{{item.awardName}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img class="prize-desc-more" src="../imgs/i-more.png">
                </div>

            </div>
            <div class="prize-container prize-desc-start" v-if="noDataFlag">
                        大奖虚席以待<br>周六晚八点半静候君临
            </div>
            <!-- 邀请好友和我的幸运值 -->
            <div class="share-container" v-if="successFlag">
                <div class="prize-cannel" v-if="prizeCannelFlag">中奖人距填写领奖信息截止还有:  <span class="prize-btn">{{hour}}小时{{minute}}分{{second}}秒</span></div>
                <div class="activity-share" @click="handleInviationEvent">邀请攒幸运值</div>
                <div class="activity-myluck" @click="handleMyLuckEvent">我的幸运值</div>
            </div>
            <!-- 扫一扫 -->
            <div class="share-scan" v-if="scanFlag" @click="handleScanEvent">扫一扫</div>
            <div class="share-refresh" v-if="refreshFlag" @click="handleRefreshGetLocation">
                <span class="click-refresh">点击刷新页面</span>
                <span class="get-location">允许获取地理位置,才能参加活动哦</span>
            </div>
            <!-- 获取荷石币和幸运值弹框 -->
            <div class="get-luck-alert" v-if="luckAndHeAwardFlag">
                <div class="get-luck-img"></div>
                <div class="get-luck-font">恭喜您获得<br>{{heshiCoin}}荷石币+{{luckScore}}幸运值</div>
            </div>
            <!-- 邀请好友的弹框 -->
            <div class="inviation-alert" v-if="inviationAlertFlag">赶快邀请小伙伴参加吧, 有好友助力<br>
            你的幸运值也会增加哦
            </div>
            <!-- <guagua></guagua> -->
            <!-- 提示框 -->
            <div v-if="errFlag" class="alert-msg">
                <p>{{errMsg}}</p>
            </div>
        </div>
        <!-- 倒计时布局start -->
        <div v-if="countDownFlag" class="countDown-main">
            <div class="countDown-title"></div>
            <div class="countDown-img">
                <div class="countDown-start">{{countDownTime}}</div>
            </div>
        </div>
        <!-- 倒计时布局end -->
    </div>

</template>
<script>
    //import wx from "weixin-js-sdk";
    import bus from "assets/js/bus.js";
    import Lib from "assets/js/Lib.js";
    // import guagua from "./guaguaka.vue";
    export default({
        // components: {
        //     guagua
        // },
        data() {
            return {
                refreshFlag: false,
                successFlag: false,
                inviationAlertFlag:false,
                awardList: {},
                luckAndHeAwardFlag: false,//获取荷石币和幸运值弹框；
                luckScore: "",//幸运值；
                heshiCoin: "",//荷石币；
                scanFlag: false,//扫一扫
                latitude: "",//纬度；
                longitude:"",//经度；
                beforeFlag: false,//判断是否显示列表
                noDataFlag: false,
                errFlag: false,//错误提示信息；
                errMsg: "",
                code: "",//烟码；
                prizeCannelFlag: false,//是否显示距离领奖取消；
                countDownTime: null,
                hour: "",
                minute: "",
                second: "",
                expiryTime: "",//过期时间；
                countDownTime: "",//倒计时；
                countDownFlag: false,//倒计时旗帜变量；

            }
        },
        methods: {
            handleGetLocation() {
                var _this = this;
                wx.ready(function () {
                    //console.log(2)
                    //alert(2)
                    wx.getLocation({
                        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: function (res) {
                            //console.log("hhhhhhhhhhhhhh");
                            //alert(3)
                            //alert("success");
                            //alert(res.errMsg);
                            _this.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                            _this.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。

                           if(!(Lib.getUrlQuery("from") === "share")) {
                               //不是分享页面；
                               _this.successFlag = true;
                               _this.handleGetLuckAndHeAward();
                           }

                            //获取幸运值和荷石币；


                        },
                        cancel: function (res) {
                            _this.refreshFlag = true;
                        },
                        fail: function (res) {
                            //alert("fail");
                        }
                    })
                 })

            },
            //邀请好友攒幸运值接口；
            handleInviationEvent() {
                this.inviationAlertFlag = true;
                var _this = this;
                setTimeout(function() {
                    _this.inviationAlertFlag = false;
                },1000)
            },
            //处理我的幸运值；
            handleMyLuckEvent() {
                //bus.$emit("myLuck");
                location.href =
                        "../../views/menus/shop-lucky.html?t=" + +new Date();
            },
            //获取幸运值和荷石币；
            handlegetAwardListData() {

                 var _this = this;

                Lib.ajax({
                    url:"/memberDay/getAllWinningList",
                    headers: {
                        appId: weixin_token.appid,
                        oppenId: Lib.getCookie("openid"),
                    },
                    data: {

                        winningType: 1
                    },
                    success: this.handleGetAwardListSucc,
                    error: function(err) {
                        _this.errFlag = true;
                        _this.errMsg = err.message;
                        setTimeout(function(){
                            _this.errFlag = false;
                        },1000)
                    }

                })

            },
            //成功获取上期获奖名单；
            handleGetAwardListSucc(res) {
                //alert(2);
                //console.log(res);
                var _this = this;
                if(res.ok) {
                    if(res.data.length) {
                        this.noDataFlag = false;
                        this.beforeFlag = true;
                    }else {
                        this.beforeFlag = false;
                        this.noDataFlag = true;
                    }
                    this.awardList = res;
                    this.awardList.winningTime = res.winningTime;
                    this.awardList.data = Lib.dataFormat(res.data);



                }else {
                    _this.errFlag = true;
                    _this.errMsg = res.msg;
                    setTimeout(function(){
                        _this.errFlag = false;
                    },1000)
                }
                //console.log(this.awardList);
                // if(res.ok) {//数据获取成功；
                //     this.awardList = res.data;
                // }

            },
             //获取幸运值和荷石币
            handleGetLuckAndHeAward() {
                this.code = sessionStorage.getItem("code");
                var _this = this;
                 Lib.ajax({
                    url:"/memberDay/createAndChange",
                    headers: {
                        appId: weixin_token.appid,
                        openId: Lib.getCookie("openid"),
                    },
                    data: {
                        memberDayType: 1,
                        lng: _this.longitude,
                        lat: _this.latitude,
                        code: sessionStorage.getItem("code"),
                    },
                    success: function(res) {
                        if(res.ok && res.codeValid) {
                            if(!_this.code) {
                                _this.successFlag = false;
                                return;
                            }
                            _this.luckScore = res.luckscore;
                            _this.heshiCoin = res.heshiCoin;
                            //从公众号入口进入；
                            //console.log(sessionStorage.getItem(code))
                            if(_this.successFlag) {

                                _this.luckAndHeAwardFlag = true;
                                setTimeout(function() {
                                    _this.luckAndHeAwardFlag = false;
                                },3000)
                            }
                        }else {
                            _this.errFlag = true;
                            _this.errMsg = res.msg;
                            setTimeout(function(){
                                _this.errFlag = false;
                            },1000)
                        }

                    },
                    error: function(err) {
                        _this.errFlag = true;
                        _this.errMsg = err.message;
                        setTimeout(function(){
                            _this.errFlag = false;
                        },1000)
                    }
                })

                //获取荷石币；
                // Lib.ajax({
                //     url: "../../static/datas/heshicoin.json",
                //     type: "GET",
                //     dataType: "json",
                //     success: function(res) {
                //         if(res.ok) {//数据获取成功；
                //             _this.heshiCoin = res.heshiCoin;
                //             _this.luckAndHeAwardFlag = true;
                //             setTimeout(function() {
                //                 _this.luckAndHeAwardFlag = false;
                //             },1000)
                //         }
                //     }
                // })
            },
            //刷新获取位置；
            handleRefreshGetLocation() {
                this.handleGetLocation();
            },
            //处理扫一扫事件；
            handleScanEvent() {
                wx.scanQRCode({
                    desc: 'scanQRCode desc',
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        //console.log(res);
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    }
                });
            },
            handleGetDescServerTime() {
                var _this = this;
                Lib.ajax({
                    url:"/memberDay/getServerTime",
                    success: this.GetDescServerTimeSucc,
                    error: function(err) {
                        _this.errFlag = true;
                        _this.errMsg = err.message;
                        setTimeout(function(){
                            _this.errFlag = false;
                        },1000)
                    }
                })
            },
            GetDescServerTimeSucc(res) {
                console.log(res);
                if(res.systemTime > res.drawTime) {

                    //过期时间；
                    this.expiryTime = res.drawTime + 72*60*60*1000 -res
                    .systemTime;

                    // console.log(this.expiryTime);
                    // console.log(typeof(this.expiryTime >= 0));
                    if(this.expiryTime >0) {
                        this.prizeCannelFlag = true;
                        this.defaultTimeData();
                        //console.log("chenggong")
                    }


                }


            },
            //初始化时间数据；
            defaultTimeData() {
                //console.log(this.expiryTime);
                this.hour = parseInt(this.expiryTime/1000/3600);
                this.minute = parseInt((this.expiryTime - this.hour*3600*1000)/1000/60);
                this.second = parseInt((this.expiryTime - this.hour*3600*1000 - this.minute*60*1000)/1000);
                this.handleCountDown();
            },
            //开启定时器；
            handleCountDown() {
                var _this = this;
                this.countDownTime = setInterval(function(){
                    if(_this.hour <= 0 && _this.minute <= 0 && _this.second <=0) {
                        _this.prizeCannelFlag = false;
                        clearInterval(_this.countDownTime);
                    }
                     if(_this.second === 0) {

                         _this.second = 60;
                         if(_this.minute == 0) {
                             _this.minute = 60;
                             _this.hour --;
                         }
                         _this.minute --;
                     }
                     _this.second --;
                },1000)
            }


        },
        mounted() {

            //获取中奖列表；
            this.handlegetAwardListData();
            //微信配置初始化；
             this.handleGetLocation();
             //获取服务器时间；
             this.handleGetDescServerTime();

        },
        created(){
             bus.$on("sharegetluck",() => {
                this.successFlag = false;
                this.refreshFlag = false;
                this.scanFlag = true;

            })
            //监听倒计时start；
            bus.$on("countDown",(a) => {
                this.countDownFlag = true;
                this.countDownTime = 60 - a;
            })
            //监听倒计时end；

        }
    })
</script>
<style type="text/css" lang="less" scoped>
    .ui-else-main {
        position: absolute;
        height: 100%;
        width: 100%;
        background: url(../imgs/activity-main1.png) no-repeat center;
        background-size: cover;
    }
    .ui-else-top {
        position: absolute;
        height: 100%;
        width: 100%;
    }
    .daily-activity {
        overflow: hidden;
        margin: 58px 65px 0 65px;
        width: 620px;
        height: 532px;
        background: url(../imgs/daily-activity.png) no-repeat center;
        background-size: cover;
    }
    .daily-diamonds {
        position: absolute;
        right: 65px;
        // float: right;
        margin:  -80px -64px 0 0;
        width: 140px;
        height: 160px;
        // background: url(../imgs/daily-diamonds.png) no-repeat center;
        // background-size: 100% 100%;
    }
    .daily-desc {
        margin: 100px 48px 0 40px;
        font-size:32px;
        font-family:'PingFangSC-Regular';
        color:red;
        text-align: center;
    }
    .activity-desc {
        overflow-y: scroll;
        float: left;
        margin: 10px 48px 0 53px;
        // width:519px;
        width:520px;
        height:316px;
        font-size:28px;
        font-family:'PingFangSC-Regular';
        color:rgba(53,26,26,1);
        line-height:44px;
    }
    .activity-desc-more {
        // width:100%;
        // height: 70px;
        // float: left;
        // font-size: 28px;
        // line-height: 70px;
        // text-align: center;
        // color: red;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 70px;
        height: 50px;
    }
    .activity-icon {
        float: left;
        margin: 14px 10px 0 0px;
        width:20px;
        height:17px;
        background: url(../imgs/icon.png) no-repeat center;
        background-size: cover;
    }
    .activity-desc-icon {
        float: left;
        width: 462px;
    }
    .prize-container {
        margin: 20px 65px 0 65px;
        width: 620px;
        height: 331px;
        background: url(../imgs/activity-prize.png) no-repeat center;
        background-size: 100% 100%;
    }
    .prize-diamonds {
        float: left;
        margin:  -45px 0 28px 0;
        width: 117px;
        height: 117px;
        background: url(../imgs/prize-diamonds.png) no-repeat center;
        background-size: cover;
    }
    .prize-con {
        position: relative;
        padding-left: 22px;
        top: 103px;
        width:598px;
        height: 176px;
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
        overflow-y: scroll;
        left: 104px;
        width:443px;
        height:176px;
        font-size:34px;
        font-family:'PingFangSC-Medium';
        color:rgba(53,26,26,1);

    }
    .prize-desc-more {
        position: absolute;
        // width:100%;
        // height: 50px;
        // font-size: 28px;
        // line-height: 50px;
        // text-align: center;
        // color: red;
        left: 50%;
        transform: translateX(-50%);
        bottom:-40px;
        width: 70px;
        height: 50px;
    }
    .prize-desc-start {
        padding-top: 130px;
        height: 200px;
        color: #F83F2B;
        font-size:34px;
        font-family:'PingFangSC-Medium';
        text-align: center;

    }
    .prize-periods, .prize-item {
        width: 100%;
        height: 44px;
        font-family: 'PingFang SC';
        line-height: 44px;
    }
    .periods {
        float: left;
    }
    .address {
        float: right;
    }
    .prize-list {
        margin-top: 5px;
    }
    .name-item {
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #351A1A;
        float: left;
    }
    .award-item {
        padding-right: 50px;
        color: #F83F2B;
        float: right;
    }
    .add-more {
        position: absolute;
        left: 250px;
        bottom: 6px;
        width:100px;
        height: 67px;

    }
    .more-item {
        display: block;
        height:23px;
        font-size:25px;
        font-family:'PingFangSC-Regular';
        color:rgba(248,63,43,1);
        text-align: center;
    }
    .more-v {
        margin-top: 10px;
    }
    .share-container{
        margin: 20px 68px 0 64px;
        height: 62px;
    }
    .activity-share {
        //margin: 27px 242px 0 233px;
        float: left;
        width: 262px;
        height: 62px;
        font-size: 30px;
        font-weight: 900;
        font-family:"PingFangSC-Medium";
        color: #FAFBC8 ;
        text-align: center;
        line-height: 62px;
        background: url(../imgs/activity-shares.png) no-repeat center;
        background-size: cover;
    }
    .activity-myluck {
        float: right;
        width: 262px;
        height: 62px;
        font-size: 30px;
        font-weight: 900;
        font-family:"PingFangSC-Medium";
        color: #FAFBC8 ;
        text-align: center;
        line-height: 62px;
        background: url(../imgs/activity-shares.png) no-repeat center;
        background-size: cover;
    }
    //邀请好友的弹框
    .inviation-alert {
        padding-top: 20px;
        position: absolute;
        left: 104px;
        top: 850px;
        width: 540px;
        height: 122px;
        background:rgba(0,0,0,0.7);
        border-radius: 20px ;
        font-size:32px;
        font-weight: 900;
        color: #fff;
        text-align: center;
        line-height: 50px;
    }
    //
    .get-luck-alert {
        position: absolute;
        padding-top:10px;
        left: 104px;
        top: 358px;
        width: 540px;
        height: 280px;
        background:rgba(0,0,0,0.7);
        border-radius: 20px ;
        font-size:34px;
        font-weight: 900;
        color: #fff;
        text-align: center;
        line-height: 68px;
    }
    .get-luck-img {
        margin: 28px 226px 0 238px;
        width: 76px;
        height: 76px;
        background:url(../imgs/right-alert.png) no-repeat center;
        background-size: 100% 100%;
    }
    //扫一扫
    .share-scan {
        margin: 20px 114px 0 114px;
        width: 520px;
        height: 104px;
        background: url(../imgs/scan.png) no-repeat center;
        background-size: 100% 100%;
        font-size:56px;
        font-weight: 900;
        color: #FAFBC8;
        text-align: center;
        line-height: 104px;
    }
    //刷新获取位置；
    .share-refresh {
        margin: 20px 114px 0 114px;
        width: 520px;
        height: 98px;
        background: url(../imgs/click-refresh.png) no-repeat center;
        background-size: 100% 100%;
    }
    .click-refresh, .get-location {
        display: block;
        text-align: center;
        font-weight: 900;
        color: #FAFBC8;
    }
    .click-refresh {
        font-size: 32px;
        line-height: 50px;
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
    .daily-tip {
        margin-top:18px;
        height:67px;
        font-size:28px;
        font-weight: 900;
        font-family:"PingFangSC-Medium";
        color:rgba(53,26,26,1);
        line-height:40px;
        text-align: center;
    }
    .prize-cannel {
        margin-bottom: 14px;
        font-size:26px;
        font-family:"PingFangSC-Medium";
        text-align: center;
        height: 42px;
        line-height: 42px;
        color: #351A1A;
    }
    .prize-btn {
        display: inline-block;
        width:220px;
        height:42px;
        background:rgba(255,246,192,1);
        border-radius: 16px ;
    }
    //倒计时弹框的样式；
    .countDown-main {
        position: absolute;
        height: 100%;
        width: 100%;
        background: rgba(0,0,0,0.7);
        background-size: cover;
        .countDown-title {
            margin: 224px 122px 0 146px;
            width: 482px;
            height: 100px;
            background: url(../imgs/countDownTitle.png) no-repeat center;
            background-size: 100% 100%;
        }
        .countDown-img {
            overflow: hidden;
            margin: 50px 10px 0;
            width: 730px;
            height: 564px;
            background: url(../imgs/countDownSecond.png) no-repeat center;
            background-size: 100% 100%;
        }
        .countDown-start {
            margin-top: 152px;
            width: 100%;
            font-size: 240px;
            text-align: center;
            color: #FAFBC7;
            animation: miao 1s infinite ease-in-out;
            -webkit-animation: miao 1s infinite ease-in-out;
            transform-origin: center center !important;
            text-shadow: 0 0 10px #fff997,0 0 10px #4e2f35;
        }
        
    }
    @keyframes miao {
    0%,100% {
        transform: scale(1);
        -webkit-transform: scale(1);
    }
    50% {
        transform: scale(0.8);
        -webkit-transform: scale(0.8);
    }
    }
    @-webkit-keyframes miao {
    0%,100% {
        transform: scale(1);
        -webkit-transform: scale(1);
    }
    50% {
        transform: scale(0.8);
        -webkit-transform: scale(0.8);
    }
    }

</style>

