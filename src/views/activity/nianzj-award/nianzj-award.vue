<template>
    <div id="root">
        <sa-page-load ishow="1"></sa-page-load>
        <div class="bg">
            <div class="box">
                <!-- 开奖先保留 -->
                <img src="./img/wa@2x.png" class="wa invisible">
                <!-- 开奖提示 -->
                <div class="w-open" v-if="win == 0">
                    <div>钻石年终奖</div>
                    <p>已于今日<em>20:00</em></p>
                    <p>停止收集福气值</p>
                </div>
                <!-- 中奖 -->
                <div class="winner" v-if="win == 1">
                    <p>恭喜您成功瓜分钻石年终奖</p>
                    <div>您获得了8.88元</div>
                    <p>系统会将奖金发送到您的微信上</p>
                </div>
                <!-- 未中奖 -->
                <div class="loser" v-if="win == 2">
                    <div>很遗憾</div>
                    <p>您未收集够<em>1000福气值</em></p>
                    <p>或未进入排名<em>前10000名</em></p>
                </div>
            </div>
            <div class="tips" v-if="win == 0">稍后您可以在<br>河北中烟微信公众号-拾自在-钻石年终奖<br>查询您的中奖状态</div>
            <div class="tips" v-if="win == 1">温馨提示：系统会有2小时左右的延迟请耐心等待</div>
            <div class="tips" v-if="win == 2">再接再厉，请继续关注河北中烟其他活动更多奖励等着你</div>
        </div>
        <!-- 弹窗 -->
        <sa-alert :msg="msg" v-if="win == 0"></sa-alert>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import SaAlert from '../nianzj/components/alert.component'
    import Lib from 'assets/js/Lib'

    let openKey = 'TOKEN-4567890123-'+window.location.host;
    let appKey = 'TOKEN-3456789012-'+window.location.host;
    // let openKey = 'TOKEN-4567890123-hbh.saotx.cn';
    // let appKey = 'TOKEN-3456789012-hbh.saotx.cn';
    let pubKey = Lib.getUrlQuery('pubkey');

    export default {
        data() {
            return {
                win: 0,
                msg: ''
            }
        },
        components: {
            SaPageLoad, SaAlert
        },
        mounted() {
            let that = this;
            // 区别是否是公众号进来的
            if (pubKey) {
                that.win = 0;
            } else {
                that.getMyDetail();
            }
            that.fixIOS();
        },
        methods: {
            getMyDetail: function () {
                let that = this;
                Lib.ajax({
                    url: '/yearAward/getMyHappyScore',
                    data: {
                        appId: Lib.getCookie(appKey),
                        openId: Lib.getCookie(openKey)
                    },
                    success: (res) => {
                        res = res || {};
                        let data = res.data || {};
                        // 0: 未开奖, 1: 中奖, 2:未中奖
                        that.win = data.awardStatus || 0;
                        if (!that.win) {
                            that.msg = {
                                dat: +new Date,
                                txt: "钻石年终奖正在开奖...",
                                tye: 'common'
                            };
                        }
                    }
                })
            },
            fixIOS: function () {
                // IOS返回按键 好烦
                var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isIOS) {
                    (function(){
                        pushHistory();
                        setTimeout(function () {
                            window.addEventListener("popstate", function(e) {
                                // 扫码进来 直接到开奖页 返回 跳过过度页
                                if (pubKey) {
                                    window.location.href = window.location.origin + "/app-hebei/views/menus/home.html?t="+(+new Date);
                                } else {
                                    window.history.go(-2);
                                }
                            }, false);
                        }, 500);
                    })();
                    function pushHistory() {
                        var state = {
                            title: "title",
                            url: window.location.href
                        };
                        window.history.pushState(state, state.title, state.url);
                    }
                }
            }
        }
    }
</script>
<style type="text/css" lang="less">
    #root {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
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
            // margin: 520px 0 0;
            text-align: center;
            position: absolute;
            bottom: 200px;
            height: 530px;
            width: 750px;
            .wa {
                width: 274px;
                height: 105px;
                margin: 215px auto 230px;
            }
            .winner {
                position: relative;
                width: 400px;
                height: 170px;
                text-align: center;
                margin: auto;
                padding-top: 190px;
                box-sizing: border-box;
                p {
                    font-size: 28px;
                    font-weight: 500;
                    color: #160101;
                }
                div {
                    font-size: 48px;
                    font-weight: 500;
                    color: #E4110A;
                    margin: 20px 0 40px;
                }
            }
            .loser {
                position: relative;
                width: 400px;
                height: 170px;
                text-align: center;
                margin: auto;
                padding-top: 180px;
                box-sizing: border-box;
                p {
                    font-size: 30px;
                    font-weight: 500;
                    color: #160101;
                    margin: 15px 0;
                    em {
                        color: #E4110A;
                    }
                }
                div {
                    font-size: 44px;
                    font-weight: 500;
                    margin: 10px 0 30px;
                }
            }
            .w-open {
                position: relative;
                width: 400px;
                height: 170px;
                text-align: center;
                margin: auto;
                padding-top: 180px;
                box-sizing: border-box;
                p {
                    font-size: 30px;
                    font-weight: 500;
                    color: #160101;
                    margin: 15px 0;
                    em {
                        color: #E4110A;
                    }
                }
                div {
                    color: #E4110A;
                    font-size: 44px;
                    font-weight: 500;
                    margin: 10px 0 30px;
                }
            }
        }
        .tips {
            position: absolute;
            width: 600px;
            height: 120px;
            margin: 0 75px;
            font-size: 32px;
            color: #EFE7CB;
            font-weight: 500;
            bottom: 80px;
        }
    }
</style>