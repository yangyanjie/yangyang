<template>
    <div id="root">
        <sa-page-load ishow="1"></sa-page-load>
        <div class="bg">
            <div class="box">
                <img src="./img/lc@2x.png" class="lc">
                <img src="./img/rc@2x.png" class="rc">
                <img :src="nickimg" class="ni">
                <p>{{nickname}}</p>
                <img src="./img/zl@2x.png" class="zl" v-if="helphim">
                <button type="button" class="btn" @click="helpHim()" v-if="helphim">为他（她）助力</button>
                <button type="button" class="rule" @click="isShowRule=true" v-if="helphim">活动规则</button>
                <div class="fqz" v-if="!helphim">福气值</div>
                <p class="fqvalue" v-if="!helphim">{{num}}</p>
                <div class="hr" v-if="!helphim"></div>
                <img src="./img/tx@2x.png" class="tx" v-if="!helphim">
                <p class="apqz" v-if="!helphim">+5福气值</p>
                <div class="hr" v-if="!helphim"></div>
                <button class="rule-little" type="button" @click="isShowRule=true" v-if="!helphim">活动规则</button>
            </div>
            <button type="button" class="share" @click="isShowRule=true">我也要参加</button>
        </div>
        <sa-rule v-show="isShowRule" @rulectrl="isShowRule=false"></sa-rule>
        <sa-alert :msg="msg"></sa-alert>
        <!-- 每次进来不同 -->
        <div style="display:none;">{{+new Date}}</div>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import SaBroadcast from 'components/broadcast.directive'
    import SaRule from '../nianzj/components/rule.component'
    import SaAlert from '../nianzj/components/alert.component'
    import Jump from 'assets/js/wx.timejump'
    import Lib from 'assets/js/Lib'

    let openKey = 'TOKEN-4567890123-'+window.location.host;
    let appKey = 'TOKEN-3456789012-'+window.location.host;

    export default {
        data() {
            return {
                nickimg: '',
                nickname: '',
                helphim: true,
                num: 0,
                msg: '',
                isShowRule: false
            }
        },
        components: {
            SaPageLoad, SaBroadcast, SaRule, SaAlert
        },
        mounted() {
            let that = this;
            Jump.insertTime({
                url: '/app-hebei/views/activity/nianzj-award.html?pubkey=true&t='+(+new Date),
                callback: function () {
                    that.isHelp();
                    // 获取分享者的信息
                    that.getShareMem();
                }
            });
        },
        methods: {
            isHelp: function () {
                let that = this;
                Lib.ajax({
                    url: '/yearAward/alreadyHelp',
                    data: {
                        shareOpenid: Lib.getUrlQuery('openid')
                    },
                    success: function (res) {
                        res = res || {};
                        that.helphim = !res.alreadyHelp;
                    }
                })
            },
            getShareMem: function () {
                let that = this;
                Lib.ajax({
                    url: '/yearAward/getMyHappyScore',
                    data: {
                        appId: Lib.getCookie(appKey),
                        openId: Lib.getUrlQuery('openid')
                    },
                    success: function (res) {
                        res = res || {};
                        let data = res.data || {};
                        that.nickname = data.nickName || "";
                        that.nickimg = data.headImage || "";
                        that.num = data.score || "0";
                    }
                });
            },
            helpHim: function () {
                let that = this;
                Lib.ajax({
                    url: '/yearAward/increaseHappyScoreByHelp',
                    data: {
                        shareOpenid: Lib.getUrlQuery('openid')
                    },
                    success: function (res) {
                        res = res || {};
                        if (res.ok) {
                            that.msg = {
                                dat: +new Date,
                                txt: "助力成功，祝您新春愉快，合家欢乐",
                                tye: 'tips'
                            };
                            that.helphim = false;
                            that.getShareMem();
                        } else {
                            that.msg = {
                                dat: +new Date,
                                txt: "亲，您已经助力过了",
                                tye: 'error'
                            }
                        }
                    }
                });
            }
        }
    }
</script>
<style type="text/css" lang="less">
    // iphone X
    @media only screen and (device-width: 375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) {
        #root {
            margin-top: 145px;
        }
    }
    #root {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        .bg {
            position: absolute;
            width: 100%;
            height: 100%;
            bottom: 0;
            right: 0;
            left: 0;
            background: url('./img/bg@2x.png') no-repeat;
            background-size: cover;
        }
        .box {
            background: url('./img/box@2x.png') no-repeat;
            background-size: cover;
            margin: 370px 75px 0;
            text-align: center;
            position: relative;
            height: 604px;
            width: 600px;
            .lc {
                position: absolute;
                left: 0;
                top: 50px;
                width: 240px;
                height: 136px;
            }
            .rc {
                position: absolute;
                right: 0;
                top: 96px;
                width: 240px;
                height: 136px;
            }
            .ni {
                margin: 64px auto 0;
                width: 130px;
                height: 130px;
                border-radius: 65px;
                border: 1px solid #ddd; /*1px*/
            }
            p {
                font-size: 30px;
                color: #000000;
                text-align: center;
                margin-top: 10px;
            }
            .zl {
                margin: 20px auto 0;
                width: 336px;
                height: 80px;
            }
            .btn {
                width: 360px;
                height: 85px;
                margin: 14px auto 0;
                background: url('./img/bt@2x.png') no-repeat;
                background-size: cover;
                font-size: 34px;
                color: #fff;
            }
            .rule {
                width: 164px;
                height: 40px;
                margin: 40px auto 0;
                border: 2px solid #D30202; /*px*/
                color: #D30202;
                border-radius: 20px;
                display: block;
                background: #fff;
                font-size: 29px;
                padding: 0;
            }
            .fqz {
                width: 308px;
                height: 50px;
                margin: 15px auto 0;
                background: url('./img/fq@2x.png') no-repeat;
                background-size: cover;
                font-size: 28px;
                line-height: 40px;
                color: #fff;
            }
            .hr {
                width: 375px;
                background: #EFE7CB;
                height: 2px;
                margin: 10px auto;
            }
            .fqvalue {
                font-size: 56px;
                color: #DD0009;
                text-align: center;
                margin-top: 3px;
            }
            .tx {
                width: 328px;
                height: 38px;
                margin: 0 auto;
            }
            .apqz {
                width: 180px;
                height: 40px;
                margin: 4px auto;
                font-size: 42px;
                color: #DD0009;
            }
            .rule-little {
                position: relative;
                font-size: 20px;
                color: #D30202;
                border: 2px solid #D30202; /*1px*/
                border-radius: 15px;
                height: 30px;
                width: 128px;
                // right: -110px;
                padding: 0;
                background: #fff;
            }
        }
        .share {
            position: relative;
            width: 620px;
            height: 100px;
            text-align: center;
            margin: 10px 65px 0;
            font-size: 42px;
            color: #B9040B;
            background: #fbed35;
            box-shadow: 5px 10px 1px #A30505;
            border-radius: 5px;
        }
    }
</style>