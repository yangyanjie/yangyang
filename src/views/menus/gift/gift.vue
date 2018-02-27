<template>
    <div id="root">
        <sa-page-load ishow="1"></sa-page-load>
        <alert-dialog :constants='constants' ref="alert" @alertFn = 'alertFn'></alert-dialog>
        <valiadate-alert v-if="valiadateFlag" @getcode="handleGetCode" @submitcode="handleSubmitCode" :msg="message" @handlecannel="handleCannelBtn"></valiadate-alert>
        <crCode v-if="crCodeFlag" @handleclose="handleCannelCode"></crCode>
        <ul class="border-box" v-if="showBool">
            <li class="border-box" v-for = "(item ,index) in list" :key="index" :class="item.status ===3?'gray':'white'" @click="drow(item)">
                <div class="top">
                    <!-- <img src="./img/red_packet.png" alt=""> -->
                    <img src="./img/red_packet.png" v-if="item.awardType === 3">
                    <img src="./img/mygift_score.png"  v-else-if="item.awardType === 6">
                    <img :src="item.awardUrl" v-else>
                    <div>
                        <p>{{item.awardName}}</p>
                        <p><span :class="item.awardType===3?
                                                    '':item.awardType===6?'':'line'">{{item.awardType===6?item.awardScore:item.awardType===3?'￥'+item.money:item.awardPrice}}</span>*1</p>
                        <p>{{item.awardType===3?"请在24小时领取":"请在7天内领取"}}</p>
                    </div>
                </div>
                <div class="bottom">
                    <p>中奖时间：{{format(item.drawTime)}}</p>
                    <div :class="item.status === 2?
                                            'received':item.status === 1?'receive':'expired'" :md="'hb_7_list_'+item.id" :md_name="item.awardName" @click = "gotoDetail(item)">{{item.status === 2?'订单详情':item.status === 1?'待领取':'已过期'}}</div>
                </div>
            </li>
        </ul>
        <div class="no-gift" v-else>
            <img src="./img/no-gift.png" />
            <p>竟然一份礼品都没有</p>
            <a :href="'center.html?t='+tDate">快去参加活动吧</a>
        </div>
    </div>
</template>
<script>
    import SaPageLoad from 'components/pageload.directive'
    import Lib from 'assets/js/Lib'              // 工具库
    import alertDialog from 'components/alert.directive'
    import valiadateAlert from 'components/valiadate.directive'
    import crCode from "components/crCode.directive"
    export default {
        data() {
            return {
                list: [],
                awardUser:"",
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
                alertBool: true,
                showBool: false,
                tDate: new Date().getTime(),
                unbind: true,
                sourceId:""
            }
        },
        components: {
            SaPageLoad,alertDialog,valiadateAlert,crCode
        },
        created() {
            this.init();
            Lib.ajax({
                url: '/platform_v2/getCommonPage',
                method: "post",
                data: {
                    moudleKey: "SCAN_CODE_CHECK_ACTIVITY_GIFT"
                },
                success: res => {
                    if (res.ret === "200000"){
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
        },
        methods: {
            init: function() {
                    Lib.ajax({
                        url: "/award_v2/awardUser",
                        method: "post",
                        data: {
                            "page": "1",
                            "pageSize": "10000",
                            "lastRefresh": ""
                        },
                        success: res => {
                            if (res.ret === "200000") {
                                if (res.data.count===0) {
                                    this.showBool = false;
                                } else {
                                    this.showBool = true;
                                    this.list = res.data.list
                                }
                            }
                        }
                    })
            },
            drow: function(params){
                if(params.status ===2) {
                    console.log("已领奖");
                    return;
                };
                if (this.unbind) {
                    if(params.status ===1) {
                        this.unbind = false;
                        this.awardUser = params;
                        console.log(this.awardUser)
                        this.getAwardFn();
                        // this.$refs.alert.show = true;
                        // this.constants.msg = "此二维码上次参与活动抽中的"+params.awardUser.prizeName+"尚未领取，请立即领取";
                        // this.constants.type = "confirm";
                        // this.constants.text = ["领奖","取消"]
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
                    this.unbind = true;
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
                this.unbind = true;
                if(res.ret === "200000") {
                    this.constants = {
                        "title": "提示",
                        "msg": "领取成功",
                        "type": "alert",
                        "text": ["确定"]
                    };
                    this.$refs.alert.show = true;
                    this.alertBool = true;
                }else {
                    this.constants = {
                        "title": "提示",
                        "msg": res.message,
                        "type": "alert",
                        "text": ["确定"]
                    };
                    this.$refs.alert.show = true;
                    this.alertBool = false;
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
                this.unbind = true;
                this.valiadateFlag = false;
            },
            alertFn:function(){
                if(this.alertBool){
                    window.location.href = "home.html?sourceId="+this.sourceId+"&t=" + this.tDate
                }
            },
            //判断跳转礼品详情
            gotoDetail: function(params) {
                if (params.status === 2) {
                    window.location.href = 'gift-detail.html?sourceId='+this.sourceId+'&awardCode='+params.id+'&t='+this.tDate
                }
            },
            handleCannelCode() {
                this.crCodeFlag = false;
            },
            lessTen(m) {
                return m<10? "0"+m:m
            },
            format(shijianchuo){
                //shijianchuo是整数，否则要parseInt转换
                var time = new Date(shijianchuo);
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
    html {
        min-height: 100%;
        background-color: #eee;
        .border-box {
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
        }
        ul {
            width: 100%;
            padding: 20px 32px 0; 
            background-color: rgba(238,238,238,1);
            .white {
                background: url("./img/my_gift_white.png") center no-repeat;
                background-size: cover;
            }
            .gray {
                 background: url("./img/my_gift_gray.png") center no-repeat;
                 background-size: cover;
            }
            li {
                width: 100%;
                height: 282px;
                position: relative;
                margin-bottom: 30px;
                padding: 40px 20px 0px 35px;
                // background: url("./img/my_gift_white.png") center no-repeat;
                .top {
                    width: 100%;
                    overflow: hidden;
                    img {
                        width: 120px;
                        height: 120px;
                        float: left;
                    }
                    div {
                        margin-left: 48px;
                        line-height: 1.5;
                        float: left;
                        p {
                            color: rgba(136,136,136,1);
                            font-size: 20px;
                            .line {
                                text-decoration: line-through;
                            }
                        }
                        p:nth-of-type(1) {
                            font-size: 24px;
                            font-weight: bolder;
                            color: black;
                        }
                    }
                }
                .bottom {
                    width: 90%;
                    position: absolute;
                    bottom: 20px;
                    left: 35px;
                    overflow: hidden;
                    p {
                        height: 48px;
                        line-height: 48px;
                        float: left;
                        color: rgba(136,136,136,1);
                        font-size: 20px;
                    }
                    div {
                        width: 120px;
                        height: 48px;
                        line-height: 48px;
                        text-align: center;
                        float: right;
                        font-size: 20px;
                    }
                    .receive {
                        background-color: rgba(255,114,0,1);
                        color: rgba(255,255,255,1);
                    }
                    .expired {
                        border: 1px solid gray;
                        color: #999999;
                    }
                    .received {
                        border: 1px solid rgba(240,108,0,1);
                        color: rgba(240,108,0,1);
                    }

                }
            }
        }
        .no-gift {
            margin-top: 179px;
            text-align: center;
            img {
                width: 388px;
                height: 322px;
                margin-bottom: 78px;
            }
            p {
                color: rgba(153,153,153,1);
                font-size: 32px;
                padding-bottom: 29px;
            }
            a {
                font-size: 20px;
                color: rgba(240,108,0,1);
                text-decoration: underline;
            }
        }
    }

</style>
