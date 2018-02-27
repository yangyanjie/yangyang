<template>
    <!--详情-->
    <div class="detial-con">
        <sa-page-load ishow="1"></sa-page-load>
        <header>
            <img class="head" :src="headImage" alt="">
            <p class="name">{{nickNme}}</p>
            <div class="score">{{score}} 福气值</div>
        </header>
        <h4 class="title">福气值明细</h4>
        <ul class="list">
            <li v-for="d in scoreData">
                <div class="text">
                    <p class="reason">
                        <span class="friend ellipsis" v-if="d.scoreType == 2">
                            {{d.friendName}}
                        </span>
                        <span>{{d.type}}</span>
                    </p>
                    <p class="time">{{d.scoreTime}}</p>
                </div>
                <em class="score">{{d.scoreNum}}</em>
            </li>
        </ul>
        <!-- 提示框 -->
        <sa-alert :msg="msg"></sa-alert>
    </div>
</template>

<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import SaAlert from '../nianzj/components/alert.component'
    import Jump from 'assets/js/wx.timejump'
    import Lib from 'assets/js/Lib'

    let openKey = 'TOKEN-4567890123-'+window.location.host;
    let appKey = 'TOKEN-3456789012-'+window.location.host;
    let pubKey = Lib.getUrlQuery('appkey');

    let NEWYEAR = [
        '',
        '祝您新春愉快，合家欢乐！',
        '祝您狗年大吉，万事如意！',
        '祝您新春快乐，多福多幸运！',
        '祝您家兴百和，福临康安！',
        '祝您新的一年满满都是爱！'
    ];

    function formatDate (date) {
        let D = new Date(date);
        let Y = D.getFullYear();
        let M = D.getMonth() + 1;
        let d = D.getDate();
        let h = D.getHours();
        let m = D.getMinutes();
        let s = D.getSeconds();
        return D.getFullYear() + '-' + (M < 9 ? '0'+M : M) + '-' + (d < 9 ? '0'+d : d) + ' ' + (h < 9 ? '0'+h : h) + ':' + (m < 9 ? '0'+m : m) + ':' + (s < 9 ? '0'+s : s);
    }

    export default {
        data() {
            return {
                score: '',
                scoreData: [],
                nickNme: '',
                headImage: '',
                msg: ''
            }
        },
        components: {
            SaPageLoad, SaAlert
        },
        mounted() {
            let that = this, url = '/app-hebei/views/activity/nianzj-award.html';
            url += '?t='+(+new Date)+(!!pubKey?'&pubkey=true':'');
            Jump.insertTime({
                url: url,
                callback: function () {
                    that.getHappyScore();
                    that.getScoreDetail();
                }
            });
        },
        methods: {
            getScoreDetail() {
                let that = this;
                Lib.ajax({
                    url: "/yearAward/getHappyScoreDetail",
                    method: 'get',
                    success: res => {
                        res = res || {};
                        if (res.ok) {
                            let data = res.data || [];
                            that.scoreData = data.map(d=>{
                                return {
                                    type: [
                                        '','扫码获得福气值',
                                        NEWYEAR[d.messageType] || NEWYEAR[1],
                                        '公众号奖励'
                                    ][d.scoreType] || "",
                                    friendName: d.friendNickname || "",
                                    scoreTime: formatDate(d.scoreTime) || "",
                                    scoreType: d.scoreType,
                                    scoreNum: '+'+d.score || 0
                                }
                            });
                        } else {
                            that.msg = {
                                dat: +new Date,
                                txt: res.msg || "接口异常!",
                                tye: 'common'
                            }
                        }
                    }
                });
            },
            getHappyScore() {
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
                        Object.assign(that, data);
                    }
                })
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped>
    .detial-con {
        header {
            height: 360px;
            background: url(./img/lucky-detial-banner.png) no-repeat top center;
            background-size: 100% 100%;
            overflow: hidden;
            position: relative;
            text-align: center;
            .head {
                width: 148px;
                height: 148px;
                border-radius: 50%;
                display: block;
                margin: 61px auto 0;
            }
            .name {
                color: #fff;
                font-size: 28px;
                margin: 20px 0;
            }
            .score {
                display: inline-block;
                height: 50px;
                background: #FEDA3E;
                border-radius: 25px;
                color: #E94C2C;
                font-size: 28px;
                line-height: 50px;
                padding: 0 30px;
                text-align: center;
            }
        }
        .title {
            height: 70px;
            background: #eee;
            line-height: 70px;
            padding-left: 26px;
        }
        .list {
            background: #fff;
            padding-bottom: 10px;
            li {
                width: 730px;
                border-bottom: 1px solid #eee;
                margin-left: 20px;
                overflow: hidden;
                padding: 24px 0;
                .text {
                    width: 600px;
                    float: left;
                }
                .reason {
                    color: #444;
                    font-size: 28px;
                    .friend {
                        max-width: 150px;
                        float: left;
                    }
                }
                .time {
                    color: #888;
                    font-size: 24px;
                    margin-top: 15px;
                }
                .score {
                    color: #444;
                    font-size: 32px;
                    float: right;
                    line-height: 62px;
                    margin-right: 30px;
                }
            }
        }

    }

    // 提示框
    .alert-msg {
        width: 540px;
        background: rgba(0,0,0,0.7);
        border-radius: 20px;
        box-sizing: border-box;
        color: #fff;
        font-size: 30px;
        line-height: 50px;
        padding: 60px;
        position: fixed;
        top: 50%;
        left: 0;
        right: 0;
        margin: 100px auto 0;
        text-align: center;
        transition: all 0.3s ease-in-out;
        display: none;
        &.alert-show {
            display: block;
        }
    }
</style>
