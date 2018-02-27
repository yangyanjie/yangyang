<template>
    <div id="root">
        <alert-dialog :constants='constants' ref="alert" @getAwardFn = "getAwardFn" @alertFn="alertFn"></alert-dialog>
        <valiadate-alert v-if="valiadateFlag" @getcode="handleGetCode" @submitcode="handleSubmitCode" :msg="message" @handlecannel="handleCannelBtn"></valiadate-alert>
        <crCode v-if="crCodeFlag" @handleclose="handleCannelCode"></crCode>
        <!-- tab页 -->
        <div class="tabs">
            <div>
                <a href="#" md="hb_1_nav_01" md_name="扫码验真" class = "tabs-active">
                    <img src="./img/tab_scan_light.png"  />
                    <p class="tabs-active">扫码验真</p>
                </a>
            </div>
            <div>
                <a :href="'center.html?sourceId='+sourceId+'&t='+tDate" md="hb_1_nav_02" md_name="活动中心">
                    <img src="./img/tab_activity_dark.png"  />
                    <p>活动中心</p>
                </a>
            </div>
            <div>
                <a :href="'shop.html?sourceId='+sourceId+'&t='+tDate" md="hb_1_nav_03" md_name="积分商城">
                    <img src="./img/tab_integral_dark.png"  />
                    <p>钻石商城</p>
                </a>
            </div>
            <div>
                <a :href="'person.html?sourceId='+sourceId+'&t='+tDate" md="hb_1_nav_04" md_name="个人中心">
                    <img src="./img/tab_my_dark.png"  />
                    <p>个人中心</p>
                </a>
            </div>
        </div>
        <!-- 活动banner -->
        <!-- <div class="active-banner" v-if = "!jiayanBool">
            <div v-for = "(item ,index) in activityBanner" :key="index" @click="drow(item)">
                <img :src = "item.activityEntrance"/>
            </div>
        </div> -->
        <!-- 没有扫码进来-->
        <div class="jiayan-wrap border-box" v-if="jiayanBool">
            <img src="./img/home_logo.png" />
            <p>扫描烟盒上的二维码，验证钻石真品</p>
            <div @click="scanQrCode()" md = "hb_1_saoyisao" md_name = "扫一扫">扫&nbsp;码&nbsp;验&nbsp;真</div>
        </div>
        <!-- 零售店码 -->
        <div class="retailer-scan border-box invisible" @click="scanQrCode()">
            <img src="./img/retailer-sao.png" />
            <span>扫描零售店码，增加活动中奖概率</span>
            <i></i>
        </div>
        <!-- 产品详情 -->
        <div class="product-wrap border-box" v-if="!jiayanBool">
            <div class="fl product-details">
                <div class="details-header">
                    <span>{{productDetail.product&&productDetail.product.name}}</span>
                    <span md="hb_1_detail" md_name="详情"><a :href="'smoke-detail.html?sourceId='+sourceId+'&t='+tDate" md="hb_1_detail" md_name ="详情">详情</a></span>
                </div>
            <p v-if = "productDetail.validTrue==='1'&&productDetail.scanCount<8">此码为正确编码</p>
            <p v-if="productDetail.validTrue==='1'&&productDetail.scanCount==8">还有&nbsp;<span>2</span>&nbsp;次扫码机会</p>
            <p v-if="productDetail.validTrue==='1'&&productDetail.scanCount==9">还有&nbsp;<span>1</span>&nbsp;次扫码机会</p>
            <p v-if="productDetail.validTrue==='1'&&productDetail.scanCount==10">此码多次被扫，我们即将锁定该码</p>
            <p v-if="productDetail.validTrue==='1'&&productDetail.scanCount>10">该码扫取次数过多，已被锁定</p>
            <p v-if = "productDetail.validTrue==='2'">此烟码未激活</p>
            <p v-if = "productDetail.validTrue==='0'">此烟码疑似假码</p>
            <p v-if = "productDetail.validTrue === '1'&&productDetail.firstScanTime">首扫时间：{{format(productDetail.firstScanTime)}}</p>
            <span class="record" v-if= "productDetail.scanCount>=9" md="hb_1_record" md_name="扫码记录"><a :href="'scan-record.html?sourceId='+sourceId+'&t='+tDate" md="hb_1_record" md_name="扫码记录">扫码记录</a></span>
            <p>规<i></i>格：{{["","盒","条","件"][productDetail.product&&productDetail.product.unitType]}}</p>
            <p>焦油含量：{{productDetail.tobaccoPropertyV2&&productDetail.tobaccoPropertyV2.oil}}mg</p>
            <p>厂<i></i>家：{{productDetail.orgV2&&productDetail.orgV2.orgName}}</p>
            </div>
            <div class="fr tobacco">
                <img :src="productDetail.product&&productDetail.product.bigPic" />
                <img src="./img/hehua.png" class="newyear-hehua">
            </div>
        </div>
        <!-- 牛逼的会员日 -->
        <div class="vip-wrap" v-if = "!activityBool">
            <div class="vip-header border-box">
                <img src="./img/vip.png"  class="vip-icon"/>
                <span>{{activityFormTip}}</span>
                <img src="./img/clickhere.gif" class="vip-gif">
            </div>
            <!-- <div class="vip-banner-wrap">
                <div class="vip-banner" @click = "vip()">
                    <img src="./img/vip-banner.png" />
                </div>
            </div> -->
        <!-- 活动banner -->
            <div class="active-banner" v-if="!activityBool">
                <div v-for = "(item ,index) in activityBanner" :key="index" @click="drow(item)" :md="'hb_1_activity_'+item.id" :md_name="item.activityName">
                    <img :src = "item.activityEntrance" :md="'hb_1_activity_'+item.id" :md_name="item.activityName"/>
                </div>
            </div>
        </div>
        <!-- 让你去关注，不关注扫什么码 -->
        <div class="please-scan-wrap border-box">
            <img src="./img/scan.png"/>
            <p>关注公众号<span>“河北中烟”</span>，获取更多惊喜</p>
        </div>
        <!-- 吸烟有害健康，就别吸了吧 -->
        <div class="warning_wrap border-box invisible" ref= "warning_wrap">
            <div class="container border-box">
                <img src="./img/image_dont_smok.png" />
                <p>吸烟有害健康</p>
                <div class="prompt">
                    <img src="./img/icon_prompt.png" />
                    <span>
                    本页包含烟草产品信息，未满18周岁请勿继续访问
                    </span>
                </div>
                <div class="infor">
                    <input type="checkbox" :checked = 'picked'  @click="pick"/>
                    我已悉知以上提示信息并已年满十八周岁
                </div>
                <div class="btn" :class="picked ? 'orange':'gray'" @click="go" md="hb_1_know" md_name = "继续访问">
                    继续访问
                </div>
            </div>
        </div>
        <!-- 大哥去参加活动吧，给你点火 -->
        <div class="pop-activity-wrap" v-if="popActivity">
            <div class="pop-activity">
                <div class="activity-bg" :class="popActivityBg"></div>
                <div class="activity-btn" :class="popActivityBtn" @click="popGoActivity(activityBanner[0])">点击进入活动</div>
                <div class="pop-close" @click="popActivityClose()">
                    <img src="./img/pop-activity.png" />
                </div>
            </div>
        </div>

        <!--河北 红包雪 入口-->
        <!--
        <a href="/app-hebei/views/activity/hongbaoxue.html?cache=false">
            <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/img/packet.png" class="ui-hebei-hbx">
        </a>
        -->
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib'              // 工具库
    import alertDialog from 'components/alert.directive'
    import valiadateAlert from 'components/valiadate.directive'
    import crCode from "components/crCode.directive"
    export default {
        data() {
            return {
                productDetail: {},
                activityBanner:[],
                tDate: new Date().getTime(),
                picked:true,
                constants: {
                    "title": "提示",
                    "msg": "",
                    "type": "alert",
                    "text": ["确定"]
                },
                awardUser:{}, //保存中奖信息,
                valiadateFlag: false,
                crCodeFlag: false,
                message: "",
                alertBool: false,
                jiayanBool: false,
                activityBool: true,
                activityFormTip: "",
                sourceId: "",
                popActivity: false,
                popActivityBg: "vip-bg",
                popActivityBtn: "vip-btn",
            }
        },
        components: {
            alertDialog,valiadateAlert,crCode
        },
        //实例初始化最之前，无法获取到data里的数据
        beforeCreate(){
            let that = this;
        },
        //在挂载开始之前被调用
        beforeMount(){
            let that = this;
        },
        created() {
            let that = this;
            //给大佬们种token
            // Lib.ajax({
            //     url: '/platform_v2/getToke',
            //     method: 'get',
            //     success: res => {
            //         sessionStorage.token = res.data.token || '';
            //         sessionStorage.tokenId = res.data.tokenId || '';
            //         that.init();
            //     }
            // });
            Lib.ajax({
                url: "/platform_v2/getIndexPage",
                method: "post",
                data: {
                    moudleKey: "SCAN_CODE_CHECK"
                },
                success: res => {
                    if (res.ret === "200000") {
                    sessionStorage.token = res.data.token || '';
                    sessionStorage.tokenId = res.data.tokenId || '';
                    that.sourceId = res.data.pageId;

                    var src = "https://weblog.taozuike.com/md/new_state.js";
                    var Ele = document.getElementsByTagName("script")[0];
                    var v = document.createElement("script") || window.document.createElement("script");
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
                    that.init();
                    //你不知道抽烟有害健康
                    if (res.data.iknow === "no" && sessionStorage.access ===null) {
                            that.$refs.warning_wrap.style.display = "block";
                        }
                    } else {
                        that.jiayanBool = true;
                        that.activityBool = true;
                    }
                }
            });
        },
        //已成功挂载，相当ready()
        mounted(){
            let that = this ;
        },
        //相关操作事件
        methods: {
            init: function () {
                let that = this;
                //产品信息
                Lib.ajax({
                    url: '/award_v2/queryProductAndScanNum',
                    method: 'post',
                    success: res => {
                        if(res.ret === "200000") {
                            var data = res.data;
                            if (data.product.sn ===null || data.code.length===0) {
                                that.jiayanBool = true;
                            } else {
                                that.jiayanBool = false;
                                that.productDetail = data;
                                sessionStorage.code = data.code;
                                sessionStorage.sn = data.product.sn;
                                sessionStorage.orgCode = data.tobaccoPropertyV2.orgCode;
                                if(data.gepType == "微信GPS") {
                                    sessionStorage.isGPS = 1;
                                } else {
                                    sessionStorage.isGPS = 0;
                                }
                                this.initNext();
                            }
                        } else {
                            this.jiayanBool = true;
                        }
                    }
                });
                //是否关注微信公众号
                Lib.ajax({
                    url: '/platform_v2/wechat/info',
                    method: 'post',
                    success: res => {
                        if (res.ret === "200000") {
                            if (res.data.code === "1") {
                                sessionStorage.setItem("wx-info", "")
                            } else {
                                sessionStorage.setItem("wx-info", res.data.cdn)
                            }
                        }
                    }
                })
            },
            initNext: function() {
                var that = this;
                // 首页活动展现
                Lib.ajax({
                    url: '/act_v2/getActivityIndex',
                    method: 'post',
                    data: {
                        orgCode: sessionStorage.getItem("orgCode"),
                        moudleKey: "SCAN_CODE_CHECK",
                        sn: sessionStorage.getItem("sn")
                    },
                    success: res => {
                        if(res.ret === "200000") {
                            var data = res.data;
                            var activityForm = data[0] && data[0].activityForm;
                            switch(activityForm) {
                                case "act-2" :
                                    that.activityFormTip = "验真漂流瓶";
                                    break;
                                case "act-10" :
                                    that.activityFormTip = "验真抓好礼";
                                    break;
                                case "act-9" :
                                    that.activityFormTip = "验真点元宝";
                                    break;
                                case "act-8" :
                                    that.activityFormTip = "验真识钻石";
                                    break;
                                case "act-5" :
                                    that.activityFormTip = "条盒抽好礼";
                                    break;
                                case "act-12":
                                    that.activityFormTip = "钻石会员日";
                                    break;
                                case "act-14":
                                    that.activityFormTip = "验真年终奖";
                                    break;
                            }

                            if (data.length ===0) {
                                that.activityBool = true;
                            } else {
                                that.activityBool = false;
                                var aBanner = [];
                                aBanner.push(data.slice(0,1)[0]);
                                var vipBanner = data.filter(d => d.activityForm === "act-12");
                                var nzjBanner = data.filter(d => d.activityForm === "act-14");
                                var commonBanner = data.filter(d => d.activityForm !== "act-12" && d.activityForm !== "act-14")[0];
                                //会员日与年终奖的显示
                                if(aBanner[0].activityForm === "act-12" || aBanner[0].activityForm === "act-14") {
                                    if(commonBanner) {
                                        aBanner.push(commonBanner)
                                    }
                                } else {
                                    if(vipBanner.length !== 0) {
                                        aBanner.push(vipBanner[0])
                                    }
                                    if(nzjBanner.length !==0) {
                                        aBanner.push(nzjBanner[0])
                                    }
                                }
                                if(vipBanner.length !== 0) {
                                    sessionStorage.hasVip = 1;
                                } else {
                                    sessionStorage.hasVip = 0;
                                }
                                that.activityBanner = aBanner;
                                that.popActivityFn();
                            }
                        }
                    }
                });
                //会员日活动
            },
            pick() {
                this.picked = !this.picked;
            },
            go(){
                let that = this;
                if(that.picked) {
                Lib.ajax({
                    url: '/hnscan/iknow',
                    type: 'get',
                    success: res => {
                        if (res.ret === "200000") {
                            that.$refs.warning_wrap.style.display = "none";
                            sessionStorage.access = "iknow";
                        }
                    }
                })
                }
            },
            drow: function(params) {
                if(params.firstScan) {
                    if (params.selfScan) {
                        if(params.awardUser === null || params.awardUser === "") {
                            this.gotoActivity(params);
                        } else{
                            if(params.awardUser.status ===1) {
                                this.awardUser = params.awardUser;
                                this.$refs.alert.show = true;
                                this.constants.msg = "此二维码上次参与活动抽中的"+params.awardUser.prizeName+"尚未领取，请立即领取";
                                this.constants.type = "confirm";
                                this.constants.text = ["领奖","取消"]
                                // alert("此二维码上次参与活动抽中的"+awardUser.prizeName+"尚未领取，请立即领取");
                            } else {
                                this.$refs.alert.show = true;
                                this.alertBool = false;
                                this.constants.msg = "一个二维码只能参加一次活动，不能贪心噢";
                                this.constants.type = "alert"
                                // alert("一个二维码只能参加一次活动，不能贪心噢");
                            }
                        }
                    } else {
                            this.$refs.alert.show = true;
                            this.alertBool = false;
                            this.constants.msg = "此二维码的抽奖机会仅属于首扫验真用户，请您再扫一包参加抽奖吧";
                        // alert("此二维码的抽奖机会仅属于首扫验真用户，请您再扫一包参加抽奖吧");
                    }
                } else{
                    this.gotoActivity(params);
                }
            },
            getAwardFn() {
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
                //判断是否为新老用户；
                if(res.ret === "200000") {
                    console.log(res.data);
                    if(res.data.mobile === null || res.data.mobile === "") {
                        //新用户；
                        //验证手机号；
                        console.log("出来弹框");
                        this.valiadateFlag = true;
                        console.log(this.valiadateFlag);
                    }else {
                        //老用户；
                        // console.log(sessionStorage.getItem("wx-info"));
                        //wx-info有值就没关注，没值就关注了；
                        this.awardUser.awardNickName = res.data.nickname;
                        this.awardUser.mobile = res.data.mobile;
                        //调试改变了条件；！
                        if(!sessionStorage.getItem("wx-info")) {
                            //关注过公众号；
                            //调getGift接口；
                            this.getGiftInfo(res);

                        }else {
                            //未关注过公众号；
                            //去关注公众号；
                            this.crCodeFlag = true;

                        }
                    }
                }
            },
            getGiftInfo(res) {
                console.log(this.awardUser);
                var res = res.data;
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
            hanldeGetGiftSucc(res) {
                if(res.ret === "200000") {
                    this.$refs.alert.show = true;
                    this.alertBool = true;
                    this.constants = {
                        "title": "提示",
                        "msg": "领取成功",
                        "type": "alert",
                        "text": ["确定"]
                    };
                    this.initNext();
                }else {
                    this.$refs.alert.show = true;
                    this.alertBool = false;
                    this.constants = {
                        "title": "提示",
                        "msg": res.message,
                        "type": "alert",
                        "text": ["确定"]
                    };
                }
            },
            //获取验证码，赶紧成为老用户吧
            handleGetCode(m) {
                var m = m.phone;
                //获取验证码；
                Lib.ajax({
                    url: "/act_v2/sendMessage",
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
            //判断验证码是否正确,别想捡漏
            handleSubmitCode(c) {
                var m = c.phone;
                var c = c.code;
                //判断验证码是否正确；
                Lib.ajax({
                    url: "/act_v2/register",
                    data: {
                        mobile: m,
                        smsCode: c,
                        activityCode: this.awardUser.activityCode,
                        score: 0,
                        orgCode: sessionStorage.getItem("orgCode"),
                        scaleType: "bind_mobile"

                    },
                    success: this.handleSubmitCodeSucc
                })
            },
            handleSubmitCodeSucc(res) {
                if(res.ret === "200000") {
                    //手机号验证码验证成功；
                    this.message = "1";
                    this.handleCannelBtn();
                    this.getAwardFn();
                    // if(!sessionStorage.getItem("wx-info")) {
                    //     //关注过公众号；
                    //     //调getGift接口；
                    //     this.getGiftInfo(res);

                    // }else {
                    //     //未关注过公众号；
                    //     //去关注公众号；
                    //     this.crCodeFlag = true;
                    // }
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
            alertFn:function(){
                if(this.alertBool){
                    window.location.href = "home.html?t=" + this.tDate
                }
            },
            handleCannelCode() {
                this.crCodeFlag = false;
            },
            // vip: function() {
            //     window.location.href = '../activity/member-day?t='+this.tDate
            // },
            scanQrCode: function() {
                wx.scanQRCode({
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    }
                });
            },
            popActivityIfFn: function(params) {
                let that = this;
                switch(params) {
                    case "act-2" :
                    that.popActivityBg = "piaoliuping-bg";
                    that.popActivityBtn = "piaoliuping-btn";
                    break;
                    case "act-10" :
                    that.popActivityBg = "wakuang-bg";
                    that.popActivityBtn = "wakuang-btn";
                    break;
                    case "act-9" :
                    that.popActivityBg = "dianyuanbao-bg";
                    that.popActivityBtn = "dianyuanbao-btn";
                    break;
                    case "act-8" :
                    that.popActivityBg = "fanzuanshi-bg";
                    that.popActivityBtn = "fanzuanshi-btn";
                    break;
                    case "act-5" :
                    that.popActivityBg = "jiugongge-bg";
                    that.popActivityBtn = "jiugongge-btn";
                    break;
                    case "act-12":
                    that.popActivityBg = "vip-bg";
                    that.popActivityBtn = "vip-btn";
                    break;
                    case "act-14":
                    that.popActivityBg = "nianzj-bg";
                    that.popActivityBtn = "nianzj-btn";
                    break;
                }
                setTimeout(function() {
                    that.popActivity = true;
                },3000)
            },
            popActivityFn: function() {
                let that = this;
                if(that.activityBanner.length !==0) {
                    if (that.activityBanner[0].firstScan) {
                        if (that.activityBanner[0].selfScan) {
                            if(that.activityBanner[0].awardUser === null || that.activityBanner[0].awardUser === "") {
                                if(sessionStorage.rclick != "1") {
                                    that.popActivityIfFn(that.activityBanner[0].activityForm);
                                }
                            }
                        }
                    } else {
                        that.popActivityIfFn(that.activityBanner[0].activityForm);
                    }
                }
            },
            popActivityClose: function() {
                this.popActivity = false;
            },
            popGoActivity: function(params) {
                if(params != null) {
                    this.gotoActivity(params);
                }
            },
            gotoActivity: function(params) {
                    switch (params.activityForm)
                    {
                    case "act-2":
                        window.location.href = '../activity/piaoliuping.html?activityCode='+params.activityCode+'&sourceId='+this.sourceId+'&t'+this.tDate;
                        sessionStorage.rclick = 1;
                        break;
                    case "act-5":
                        window.location.href = '../activity/jiugonge.html?activityCode='+params.activityCode+'&sourceId='+this.sourceId+'&t='+this.tDate;
                        sessionStorage.rclick = 1;
                        break;
                    case "act-9":
                        window.location.href = '../activity/dianyuanbao.html?activityCode='+params.activityCode+'&sourceId='+this.sourceId+'&t='+this.tDate;
                        sessionStorage.rclick = 1;
                        break;
                    case "act-10":
                        window.location.href = '../activity/wakuang.html?activityCode='+params.activityCode+'&sourceId='+this.sourceId+'&t='+this.tDate;
                        sessionStorage.rclick = 1;
                        break;
                    case "act-8":
                        window.location.href = '../activity/fanzhuanshi.html?activityCode='+params.activityCode+'&sourceId='+this.sourceId+'&t='+this.tDate;
                        sessionStorage.rclick = 1;
                        break;
                    case "act-12":
                        window.location.href = '../activity/member-day.html?activityCode='+params.activityCode+'&sourceId='+this.sourceId+'&t='+this.tDate;
                        sessionStorage.rclick = 1;
                        break;
                    case "act-14":
                        window.location.href = '../activity/nianzj.html?activityCode='+params.activityCode+'&sourceId='+this.sourceId+'&t='+this.tDate;
                        sessionStorage.rclick = 1;
                        break;
                    }
            },
            lessTen(m) {
                return m<10? "0"+m:m
            },
            format(shijianchuo){
                //shijianchuo是整数，否则要parseInt转换
                var time = new Date(parseInt(shijianchuo));
                var y = time.getFullYear();
                var m = time.getMonth()+1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();
                return y+'-'+this.lessTen(m)+'-'+this.lessTen(d)+' '+this.lessTen(h)+':'+this.lessTen(mm)+':'+this.lessTen(s);
            }
        }
    }
</script>
<style type="text/css" lang="less">
    @keyframes hbxShake {
        2%,24%,80% {
            transform: translate(0, 3px) rotate(1.5deg);
        }
        4%,68%,98% {
            transform: translate(0, -3px) rotate(-0.5deg);
        }
        38%,6% {
            transform: translate(0, 3px) rotate(-1.5deg);
        }
        8%,86% {
            transform: translate(0, -3px) rotate(-1.5deg);
        }
        10%,72% {
            transform: translate(0, 5px) rotate(1.5deg);
        }
        12%,64%,78%,96% {
            transform: translate(0, -0.5px) rotate(1.5deg);
        }
        14%,54% {
            transform: translate(0, -3px) rotate(1.5deg);
        }
        16% {
            transform: translate(0, -0.5px) rotate(-1.5deg);
        }
        18%,22% {
            transform: translate(0, 0.5px) rotate(-1.5deg);
        }
        20%,36%,46% {
            transform: translate(0, -3px) rotate(2.5deg);
        }
        26%,50% {
            transform: translate(0, 0.5px) rotate(0.5deg);
        }
        28% {
            transform: translate(0, 0.5px) rotate(1.5deg);
        }
        30%,40%,62%,76%,88% {
            transform: translate(0, -0.5px) rotate(2.5deg);
        }
        32%,34%,66% {
            transform: translate(0, 3px) rotate(-0.5deg);
        }
        42% {
            transform: translate(0, 5px) rotate(-1.5deg);
        }
        44%,70% {
            transform: translate(0, 3px) rotate(0.5deg);
        }
        48%,74%,82% {
            transform: translate(0, -0.5px) rotate(0.5deg);
        }
        52%,56%,60% {
            transform: translate(0, 5px) rotate(2.5deg);
        }
        58% {
            transform: translate(0, 0.5px) rotate(2.5deg);
        }
        84% {
            transform: translate(0, 3px) rotate(2.5deg);
        }
        90% {
            transform: translate(0, 5px) rotate(-0.5deg);
        }
        92% {
            transform: translate(0, 0.5px) rotate(-0.5deg);
        }
        94% {
            transform: translate(0, 5px) rotate(0.5deg);
        }
        0%,100% {
            transform: translate(0, 0) rotate(0);
        }
    }
    html {
        height: 100%;
        background-color: #eee;
        body {
            width: 100%;
            overflow-x: hidden;
            padding-bottom: 98px;
        }
        .border-box {
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
        }
        .jiayan-wrap {
            width: 100%;
            height: 509px;
            padding-top: 84px;
            margin-bottom: 88px;
            background: url('./img/saoma_bg.png') center no-repeat;
            background-size: cover;
            text-align: center;
            >img {
                width: 217px;
                height: 199px;
            }
            >p {
                font-size: 24px;
                color: white;
                padding: 29px 0 28px;
            }
            >div {
                width: 364px;
                height: 73px;
                line-height: 73px;
                text-align: center;
                background:url('./img/saoma-btn.png') center no-repeat;
                background-size: cover;
                color: rgba(228,24,6,1);
                font-size: 24px;
                margin: 0 auto;
            }
        }
        .fl {
            float: left;
        }
        .fr {
            float: right;
        }
        .retailer-scan, .product-wrap {
            margin-bottom: 22px;
        }
        .tabs {
            width: 100%;
            height: 98px;
            background-color: rgba(51,48,45,1);
            display: flex;
            display: -webkit-flex;
            justify-content: space-around;
            align-items: center;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 99;
            a {
                display: block;
                text-align: center;
                color: rgba(200,200,200,1);
                img {
                    display: block;
                    width: 44px;
                    height: 44px;
                    margin: 0 auto 10px;
                }
            }
            div:nth-of-type(4) img {
                width: 37px;
                height: 38px;
            }
            .tabs-active {
                color: rgba(255,122,0,1);
            }
        }
        .active-banner {
            width: 100%;
            div {
                // height: 292px;
                // background-color: #fff;
                margin-bottom: 18px;
                img {
                    width: 100%;
                    height: 270px;
                }
            }
        }
        .retailer-scan {
            width: 100%;
            height: 88px;
            line-height: 88px;
            padding-left: 14px;
            position: relative;
            background-color: rgba(255,255,255,1);
            img {
                vertical-align: middle;
                margin-right: 18px;
            }
            span {
                color: rgba(0,0,0,1);
                font-size: 25px;
            }
            i {
                display: block;
                width: 16px;
                height: 28px;
                background: url("./img/arrow-left.png") no-repeat;
                background-size: cover;
                position: absolute;
                right: 22px;
                top: 50%;
                transform: translateY(-50%);
                -webkit-transform: translateY(-50%);
            }
        }
        .product-wrap {
            width: 100%;
            // height: 400px;
            overflow: hidden;
            background-color: rgba(255,255,255,1);
            padding: 46px 42px 36px 30px;
            margin-top: 23px;
            background-image: url("./img/denglong.png");
            background-position: right top;
            background-repeat:  no-repeat;
            background-size: 239px 115px;
            .product-details {
                .details-header {
                    height:40px;
                    line-height: 40px;
                    margin-bottom: 33px;
                    span {
                        text-align: center;
                        display: inline-block;
                    }
                    span:nth-of-type(1) {
                        color: rgba(1,1,1,1);
                        font-size: 38px;
                        margin-right: 21px;
                        font-weight: bolder;
                        vertical-align: middle;
                    }
                    span:nth-of-type(2) {
                        width:80px;
                        height:38px;
                        line-height: 38px;
                        border: 1px solid #333333;
                        border-radius: 6px;
                        vertical-align: -4px;
                        a {
                            color: rgba(51,51,51,1);
                        }
                    }
                }
                > p {
                    font-size: 26px;
                    margin-bottom: 19px;
                    span {
                        color: rgba(255,94,21,1);
                    }
                    i {
                        display: inline-block;
                        width: 2em;
                    }
                }
                .record {
                    display: block;
                    width: 128px;
                    height: 37px;
                    text-align: center;
                    line-height: 37px;
                    font-size: 20px;
                    margin-bottom: 35px;
                    border: 1px solid #333;
                    border-radius: 6px;
                    a {
                        color: rgba(51,51,51,1);
                    }
                }
            }
            .tobacco {
                width: 157px;
                position: relative;
                img:nth-of-type(1) {
                    width: 100%;
                }
                .newyear-hehua {
                    width: 150px;
                    height: 73px;
                    position: absolute;
                    left: -100px;
                    bottom: -35px;
                }
            }
        }
        .vip-wrap {
            width: 100%;
            .vip-header {
                width: 100%;
                height: 70px;
                line-height: 70px;
                padding-left: 13px;
                background-color: rgba(255,255,255,1);
                position: relative;
                .vip-icon {
                    width: 32px;
                    height: 32px;
                    margin-right: 23px;
                    vertical-align: middle;
                }
                span {
                    font-size: 28px;
                }
                .vip-gif {
                    width: 291px;
                    height: 40px;
                    position: absolute;
                    right: 22px;
                    top: 50%;
                    transform: translateY(-50%);
                    -webkit-transform: translateY(-50%);
                }
            }
            .vip-banner-wrap {
                width: 100%;
                margin-bottom: 40px;
                .vip-banner {
                    height: 270px;
                    img {
                        width: 100%;
                    }
                }
            }
        }
        .please-scan-wrap {
            width: 100%;
            height: 512px;
            padding-top: 116px;
            background: url("./img/scan-bg.png") center no-repeat;
            background-size: cover;
            text-align: center;
            img {
                width: 240px;
                height : 240px;
            }
            p {
                padding-top: 38px;
                color: rgba(56,56,56,1);
                font-size: 22px;
                span {
                    color: #fff;
                }
            }
        }
        .warning_wrap {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, .5);
            z-index: 40;
            * {
                text-align: center
            }
            .container {
                width: 620px;
                height: 640px;
                background-color: #fff;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                z-index: 99;
                border-radius: 16px;
                padding-top: 86px;
                >img {
                    display: block;
                    width: 200px;
                    height: 200px;
                    margin: 0 auto;
                    padding-bottom: 34px;
                }
                >p {
                    color: rgba(239,149,52,1);
                    font-size: 28px;
                }
                .prompt, .infor {
                    color:rgba(180,180,180,1);
                    font-size: 20px;
                    line-height: 1;
                }
                .prompt {
                    padding: 83px 0 13px;
                    img {
                        width: 25px;
                        height: 25px;
                        vertical-align: middle;
                    }
                }
                .infor {
                    padding-bottom: 28px;
                    input {
                        width: 25px;
                        height: 25px;
                        vertical-align: middle;
                        border: 1px solid gray;
                        -webkit-appearance: checkbox;
                    }
                }
                .btn {
                    width: 580px;
                    height: 88px;
                    line-height: 88px;
                    text-align: center;
                    color: #fff;
                    border-radius: 8px;
                    font-size: 28px;
                    margin: 0 auto;
                }
                .orange {
                    background-color: rgba(255,114,0,1);
                }
                .gray {
                    background-color: #eee;
                }
            }
        }
        .ui-hebei-hbx {
            position: fixed;
            right: 10px;
            top: 220px;
            width: 120px;
            animation: hbxShake 10s ease-in-out infinite;
        }
        .pop-activity-wrap {
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            background:rgba(0,0,0,.8);
            z-index: 110;
            .pop-activity {
                width: 600px;
                height: 700px;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                .activity-bg {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                }
                .activity-btn {
                    width: 312px;
                    height: 89px;
                    position: absolute;
                    bottom: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    -webkit-transform: translateX(-50%);
                    color: rgba(255,255,255,1);
                    font-size: 34px;
                    line-height: 89px;
                    text-align: center;
                    border-radius: 10px ;
                }
                .jiugongge-bg {
                    background-image: url('./img/jiugonge.png')
                }
                .jiugongge-btn, .vip-btn {
                    background-color: rgba(171,53,0,1);
                }
                .wakuang-bg {
                    background-image: url('./img/wazuanshi.png')
                }
                .wakuang-btn {
                    border: 1px solid #fff;
                }
                .fanzuanshi-bg {
                    background-image: url('./img/fanzuanshi.png')
                }
                .fanzuanshi-btn {
                    background-color: rgba(218,48,0,1)
                }
                .vip-bg {
                    background-image: url('./img/vip-bg.png');
                }
                .nianzj-bg {
                    background-image: url('./img/nianzj-bg.png');
                }
                .nianzj-btn {
                    background: #d30202;
                }
                .piaoliuping-bg {
                    background-image: url('./img/piaoliuping.png')
                }
                .piaoliuping-btn, .dianyuanbao-btn {
                    width: 294px;
                    height: 94px;
                    line-height: 62px;
                    color: rgba(165,75,10,1);
                    background: url(./img/piaoliuping-btn.png) center no-repeat;
                    background-size: cover;
                }
                .dianyuanbao-bg {
                    background-image: url('./img/dianyuanbao.png')
                }
                .pop-close {
                    width: 59px;
                    height: 59px;
                    position: absolute;
                    right: 0;
                    top: -83px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>

