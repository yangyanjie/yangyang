<template>
    <div id="root">
        <sa-page-load ishow="1"></sa-page-load>
        <alert-dialog :constants='constants' ref="alert" @getAwardFn = "getAwardFn" @alertFn = "alertFn"></alert-dialog>
        <valiadate-alert v-if="valiadateFlag" @getcode="handleGetCode" @submitcode="handleSubmitCode" :msg="message" @handlecannel="handleCannelBtn"></valiadate-alert>
        <crCode v-if="crCodeFlag" @handleclose="handleCannelCode"></crCode>
        <!-- tab页 -->
        <div class="tabs">
            <div>
                <a :href="'home.html?sourceId'+sourceId+'&t='+tDate" md="hb_1_nav_01" md_name="扫码验真">
                    <img src="./img/tab_scan_dark.png"  />
                    <p>扫码验真</p>
                </a>
            </div>
            <div>
                <a href="#" md="hb_1_nav_02" md_name="活动中心" class = "tabs-active">
                    <img src="./img/tab_activity_light.png"  />
                    <p>活动中心</p>
                </a>
            </div>
            <div>
                <a :href="'shop.html?sourceId'+sourceId+'&t='+tDate" md="hb_1_nav_03" md_name="积分商城">
                    <img src="./img/tab_integral_dark.png"  />
                    <p>钻石商城</p>
                </a>
            </div>
            <div>
                <a :href="'person.html?sourceId'+sourceId+'&t='+tDate" md="hb_1_nav_04" md_name="个人中心">
                    <img src="./img/tab_my_dark.png" />
                    <p>个人中心</p>
                </a>
            </div>
        </div>
        <!-- 活动展示 -->
        <div class="activity-wrap" :class="isBool ? 'visible' : 'invisible'">
            <div class="activity" v-for = "(item,index) in data" :key = "index" @click="drow(item)" :md = "'hb_2_activity_'+item.id" :md_name = "item.activityName">
                <div class="activity-header border-box">
                    <div>
                        <span class="fl">{{item.activityName}}</span>
                        <!-- 判断是否是首扫本人，是本人就判断是否参与或者领奖 -->
                        <span class="fr">{{item.selfScan?
                                            item.awardUser === null?
                                                "未参与": item.awardUser.status === 1?
                                                "中奖未领取": item.awardUser.status === 2?
                                                "已领奖": item.awardUser.status === 3?
                                                "已过期":"未参与":""}}</span>
                        <!-- <span class="fr">未参与</span> -->
                    </div>
                    <p>{{item.activityDec}}</p>
                </div>
                <img :src="item.activityEntrance" :md = "'hb_2_activity_'+item.id" :md_name = "item.activityName"/>
            </div>
        </div>
        <div class="nothing" :class="isBool ? 'invisible' : 'visible' ">
            <img src="./img/no_activity.png" />
            <p>暂时没有扫码活动哦～</p>
        </div>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import Lib from 'assets/js/Lib'              // 工具库
    import alertDialog from 'components/alert.directive'
    import valiadateAlert from 'components/valiadate.directive'
    import crCode from "components/crCode.directive"
    // let Global = {
    //     "sn": sessionStorage.sn,
    //     "code": sessionStorage.code,
    //     "orgCode": sessionStorage.orgCode,
    //     "moudleKey": "SCAN_CODE_CHECK"
    // }
    export default {
        data() {
            return {
                data: [],
                isBool: true,
                Global: {
                    "sn": sessionStorage.sn,
                    "code": sessionStorage.code,
                    "orgCode": sessionStorage.orgCode,
                    "moudleKey": "SCAN_CODE_CHECK"
                },
                tDate: new Date().getTime(),
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
                sourceId: ""
            }
        },
        components: {
            SaPageLoad,alertDialog,valiadateAlert,crCode
        },
        created() {
            let that = this;
            // Lib.ajax({
            //     url: '/act_v2/getActivity',
            //     method: 'post',
            //     data: {
            //         orgCode: that.Global.orgCode,
            //         moudleKey: "SCAN_CODE_CHECK",
            //         sn: that.Global.sn
            //     },
            //     success: res => {
            //         if (res.ret === "200000") {
            //             if (res.data.length === 0) {
            //                 that.isBool = false;
            //             } else {
            //                 that.isBool  = true;
            //                 that.data = res.data;
            //             }
            //         }
            //     }
            // });
            if (sessionStorage.getItem("token") === null) {
                window.location.href = "/s";
            };
            //埋点函数
            Lib.ajax({
                url: '/platform_v2/getCommonPage',
                method: 'post',
                data: {
                    moudleKey: "SCAN_CODE_CHECK_ACTIVITY"
                },
                success: res => {
                    if (res.ret === "200000") {
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
                    }
                }
            })
            that.getActivity();
        },
        methods: {
            getActivity: function() {
                Lib.ajax({
                    url: '/act_v2/getActivity',
                    method: 'post',
                    data: {
                        orgCode: this.Global.orgCode,
                        moudleKey: "SCAN_CODE_CHECK",
                        sn: this.Global.sn,
                        alertBool: true
                    },
                    success: res => {
                        if (res.ret === "200000") {
                            if (res.data.length === 0) {
                                this.isBool = false;
                            } else {
                                this.isBool  = true;
                                this.data = res.data;
                            }
                        } else {
                                this.isBool = false;
                        }
                    }
                });
            },
            drow: function(params) {
                if(params.firstScan) {
                    if (params.selfScan) {
                        if(params.awardUser === null || params.awardUser === "") {
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
                            this.constants.type = "alert"
                        // alert("此二维码的抽奖机会仅属于首扫验真用户，请您再扫一包参加抽奖吧");
                    }
                } else{
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
                    if(res.data.mobile ===null || res.data.mobile ==="") {
                        //新用户；
                        //验证手机号；
                        console.log("出来弹框");
                        this.valiadateFlag = true;
                        console.log(this.valiadateFlag);
                    }else {
                        //老用户；
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
                    this.getActivity();
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
            alertFn:function() {
                if(this.alertBool){
                    window.location.href = "home.html?t=" + this.tDate+'&sourceId='+this.sourceId
                }
            },
            handleCannelCode() {
                this.crCodeFlag = false;
            }
        }
    }
</script>
<style type="text/css" lang="less">
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
        .fl {
            float: left;
        }
        .fr {
            float: right;
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
        .activity-wrap {
            width: 100%;
            .activity {
                margin-bottom: 20px;
                .activity-header {
                    width: 100%;
                    background-color: #fff;
                    padding: 31px 22px 17px 20px;
                    div {
                        overflow: hidden;
                        line-height: 1;
                        margin-bottom: 17px;
                        span {
                            display: block;
                        }
                        span.fl {
                            font-size: 28px;
                            color: rgba(51,51,51,1);
                        }
                        span.fr{
                            color: rgba(102,102,102,1);
                            font-size: 18px;
                        }
                    }
                    p {
                        color: rgba(102,102,102,1);
                        font-size: 20px;
                    }
                }
                img {
                    width: 100%;
                }
            }
            .activity:last-child {
                margin-bottom: 0;
            }
        }
        .nothing {
            width: 100%;
            margin-top: 190px;
            text-align: center;
            img {
                width: 388px;
                height: 322px;
            }
            p {
                font-size: 32px;
                padding-top: 123px;
                color: rgba(204,204,204,1);
            }
        }
    }
</style>
