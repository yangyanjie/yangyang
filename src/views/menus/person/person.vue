<template>
    <div id="root">
        <sa-page-load ishow="1"></sa-page-load>
        <!-- tab 页 -->
        <div class="tabs">
            <div>
                <a :href="'home.html?sourceId='+sourceId+'&t='+ tDate" md="hb_1_nav_01" md_name="扫码验真">
                    <img src="./img/tab_scan_dark.png"  />
                    <p>扫码验真</p>
                </a>
            </div>
            <div>
                <a :href="'center.html?sourceId'+sourceId+'&t'+tDate" md="hb_1_nav_02" md_name="活动中心">
                    <img src="./img/tab_activity_dark.png"  />
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
                <a href="#" md="hb_1_nav_04" md_name="个人中心" class = "tabs-active">
                    <img src="./img/tab_my_light.png"  />
                    <p>个人中心</p>
                </a>
            </div>
        </div>
        <div class="person-header-wrap">
            <img src="./img/person-header-bg.png" />
            <div class="header-content">
                <div class="circle">
                    <img :src="data.avatar" />
                </div>
                <div class="head-text">
                    <p class="nickname">{{data.nickname}}</p>
                    <p class="score">
                        <span>{{data.score}}</span>荷石币
                    </p>
                </div>
            </div>
        </div>
        <div class="list">
            <ul class="border-box">
                <li class="border-box">
                    <a :href="'gift.html?sourceId='+sourceId+'&t='+tDate" md="hb_4_person_gift" md_name="我的礼品">我的礼品</a>
                    <span></span>
                </li>
                <li class="border-box">
                    <a :href="'shop-integral.html?sourceId='+sourceId+'&t='+tDate" md="hb_4_person_jf" md_name="我的荷石币">我的荷石币</a>
                    <span></span>
                </li>
                <li class="border-box">
                    <a :href="'shop-lucky.html?sourceId='+sourceId+'&t='+tDate" md="hb_4_person_lucky" md_name="我的幸运值">我的幸运值</a>
                    <span></span>
                </li>
                <li class="border-box">
                    <a :href="'shop-address-list.html?sourceId='+sourceId+'&s=person&t='+tDate">地址管理</a>
                    <span></span>
                </li>
            </ul>
        </div>
        <ul class="wx-scan-box border-box" :class="wxInfo">
            <li class="wx-scan border-box"><a :href="'wxscan.html?sourceId='+sourceId+'&t='+tDate" md="hb_4_person_wx" md_name="关注公众号">关注微信公众号</a><span></span></li>
        </ul>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import Lib from 'assets/js/Lib'              // 工具库
    export default {
        data() {
            return {
                data: {},
                wxInfo: 'invisible',
                sourceId: '',
                tDate: new Date().getTime()
            }
        },
        components: {
            SaPageLoad
        },
        created() {
            let that = this;
            Lib.ajax({
                url: '/platform_v2/getCommonPage',
                method: "post",
                data: {
                    moudleKey: "SCAN_CODE_CHECK_SELF"
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
            if (Lib.getCookie("TOKEN-8901234567") || sessionStorage.getItem("jf_index")) {
                that.setToken();
            } else if(sessionStorage.getItem("token") === null) {
                window.location.href = '/s';
            } else {
                that.init();
            }
        },
        methods: {
            setToken(){
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
                        this.init();
                        }
                    }
                })
            },
            init() {
                let that = this;
                Lib.ajax({
                    url: '/user_v2/info',
                    method: 'get',
                    data:{
                        orgCode: sessionStorage.orgCode,
                        sn: sessionStorage.sn,
                        moudleKey: "SCAN_CODE_CHECK",
                        code: sessionStorage.code
                    },
                    success: res => {
                        if(res.ret === "200000") {
                            that.data = res.data;
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
                                that.wxInfo = "invisible"
                            } else {
                                that.wxInfo = "visible"
                            }
                        }
                    }
                })
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
        .person-header-wrap {
            width: 100%;
            height: 360px;
            position: relative;
            >img {
                width: 100%;
                position:absolute;
                top: 0;
                left: 0;
                z-index: 10;
            }
            .header-content {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
                top: 61px;
                z-index: 20;
                overflow: hidden;
                .circle {
                    width: 148px;
                    height: 148px;
                    background: rgba(255,255,255,1);
                    border-radius: 50%;
                    margin: 0 auto;
                    position: relative;
                    >img {
                        display: block;
                        width: 135px;
                        height: 135px;
                        border-radius: 50%;
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        top: 0;
                        margin: auto;
                    }
                }
                .head-text {
                    text-align: center;
                    line-height: 1;
                    font-size: 24px;
                    .nickname {
                        min-width: 111px;
                        color: rgba(255,255,255,1);
                        margin:21px 0px;
                    }
                    .score {
                        display: inline-block;
                        min-width: 160px;
                        height: 48px;
                        line-height: 48px;
                        border-radius: 24px;
                        background-color: rgba(255,255,255,1);
                        color: rgba(233,76,44,1);
                    }
                }
            }
        }
        li {
            width: 100%;
            height: 93px;
            line-height: 93px;
            border-bottom: 1px solid #F0F0F0;
            padding-left: 59px;
            position: relative;
            background-position: center left;
            background-repeat: no-repeat;
            background-size: 35px 38px; 
            a {
                display: block;
                color: rgba(51,51,51,1);
                font-size: 30px;
               }
            }
        ul span {
            display: block;
            width: 15px;
            height: 26px;
            background: url("./img/person-arrow.png") center no-repeat;
            background-size: cover;
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
        }
        .list {
            width: 100%;
            overflow: hidden;
            margin-top: 40px;
            ul {
                width: 100%;
                padding-left: 31px;
                background-color: #fff;
                li:nth-of-type(1) {
                    background-image: url("./img/sass_icon_personal_liwu.png")
                }
                li:nth-of-type(2) {
                    background-image: url("./img/sass_icon_personal_jifen.png")
                }
                li:nth-of-type(3) {
                    background-image: url("./img/sass_icon_personal_luck.png")
                }
                li:nth-of-type(4) {
                    background-image: url("./img/sass_icon_personal_dizhi.png")
                }
            }
        }
        .wx-scan-box {
            width: 100%;
            overflow: hidden;
            margin-top: 40px;
            padding-left: 31px;
            background-color: #fff;
            li {
                background-image: url("./img/sass_icon_wx.png")
            }
        }
    }
</style>