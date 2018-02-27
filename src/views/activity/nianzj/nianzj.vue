<template>
    <div id="root">
        <sa-page-load ishow="1"></sa-page-load>
        <div class="bcast"><i></i>
            <div class="scroll">
                <sa-broadcast :config="conf"></sa-broadcast>
            </div>
        </div>
        <div class="bg">
            <div class="w-top">
                当前第一万名福气值:{{winScore}}
                <div>(非实时数据，约每4小时刷新一次)</div>
            </div>
            <div class="box">
                <p class="refresh">每5分钟刷新一次</p>
                <ul class="award">
                    <li v-for="(l, i) in awardList" :class="{top1:i==0,top2:i==1,top3:i==2,top4:i==3}">
                        <div v-if="i > 2" class="hr"></div>
                        <div class="idx" v-if="i > 2">{{i+1}}.</div>
                        <img src="./img/1@2x.png" v-if="i==0">
                        <img src="./img/2@2x.png" v-if="i==1">
                        <img src="./img/3@2x.png" v-if="i==2">
                        <div class="name ellipsis">{{l.name}}</div>
                        <div class="fq ellipsis">{{l.num}}福气值</div>
                    </li>
                    <li v-if="!awardList.length" class="no-scan">暂无人扫码</li>
                </ul>
                <div class="more"></div>
                <div class="hr"></div>
                <div class="fqz">我的福气值</div>
                <div class="fqznum">
                    <div>{{num}}</div>
                    <a :href="detailUrl">明细</a>
                </div>
                <p class="tips">集够<em>1000福气值&nbsp;排名前10000人</em>即有资格瓜分巨额年终奖</p>
            </div>
            <div class="rule">
                大奖名额仍有空缺，赶紧加入！
                <button type="button" @click="isShowRule=true">活动规则</button>
            </div>
            <button type="button" id="share" class="share" @click="shareLink()">请好友助力</button>
            <p class="page-tips">参加完年终奖活动，还可以返回验真首页参加常规活动哦！</p>
        </div>
        <sa-rule v-show="isShowRule" @rulectrl="isShowRule=false"></sa-rule>
        <sa-alert :msg="msg"></sa-alert>
    </div>
</template>
<script type="text/javascript">
    import SaBroadcast from 'components/broadcast.directive'
    import SaPageLoad from 'components/pageload.directive'
    import SaAlert from './components/alert.component'
    import SaRule from './components/rule.component'
    import Jump from 'assets/js/wx.timejump'
    import Lib from 'assets/js/Lib'

    let openKey = 'TOKEN-4567890123-'+window.location.host;
    let appKey = 'TOKEN-3456789012-'+window.location.host;
    // let openKey = 'TOKEN-4567890123-hbh.saotx.cn';
    // let appKey = 'TOKEN-3456789012-hbh.saotx.cn';
    let pubKey = Lib.getUrlQuery('activityCode');

    export default {
        data() {
            return {
                awardList: [],
                num: 0,
                msg: '',
                conf: {
                    len: 1,
                    template: '2',
                    list: []
                },
                winScore: 0,
                maxCount: 10000,
                detailUrl: 'nianzj-list.html?t='+(+new Date)+(!!pubKey?'&pubkey=true':''),
                isShowRule: false
            }
        },
        components: {
            SaPageLoad, SaBroadcast, SaRule, SaAlert
        },
        mounted() {
            let that = this,
                url = '/app-hebei/views/activity/nianzj-award.html?t='+(+new Date);
            if (pubKey) {
                // 扫码进来
                url += '&pubkey=true';
            }
            // 接口调用
            function run () {
                that.initScroll();
                that.initFuqz();
                that.getMyFqz();
                that.getWinScore();
                // 每5分钟刷新一次
                setInterval(()=>{
                    that.initFuqz();
                }, 5*60*1000)
            }
            // 只需要在首页控制
            Jump.insertTime({
                url: url,
                callback: function (res) {
                    if (pubKey) {
                        // 增加积分值成功后调用接口
                        that.addFqz(run);
                    } else {
                        // 公众号进来
                        that.firstOpen(run);
                    }
                }
            });
        },
        methods: {
            getWinScore: function () {
                let that = this;
                Lib.ajax({
                    url: '/yearAward/getWinScoreAndCount',
                    success: function (res) {
                        res = res || {};
                        that.winScore = res.winningScore || 0;
                        that.maxCount = res.maxcount || 10000;
                    }
                });
            },
            firstOpen: function (callback) {
                let that = this;
                Lib.ajax({
                    url: '/yearAward/increaseHappyScoreByOpen',
                    data: {
                        sn: sessionStorage.getItem('sn') || "",
                        code: sessionStorage.getItem('code') || ""
                    },
                    success: function (res) {
                        res = res || {};
                        callback();
                        if (res.ok) {
                            if (!!res.happyscore) {
                                that.msg = {
                                    dat: +new Date,
                                    txt: "恭喜您获得+"+res.happyscore+"福气值!",
                                    tye: 'success'
                                };
                            }
                        }
                    }
                })
            },
            addFqz: function (callback) {
                let that = this;
                Lib.ajax({
                    url: '/yearAward/increaseHappyScoreByScan',
                    data: {
                        sn: sessionStorage.getItem('sn') || "",
                        code: sessionStorage.getItem('code') || ""
                    },
                    success: function (res) {
                        res = res || {};
                        callback();
                        if (res.ok) {
                            if (!!res.happyscore) {
                                that.msg = {
                                    dat: +new Date,
                                    txt: "恭喜您获得+"+res.happyscore+"福气值!",
                                    tye: 'success'
                                };
                            } else {
                                that.msg = {
                                    dat: +new Date,
                                    txt: "您已经获得过福气值!",
                                    tye: 'error'
                                };
                            }
                        } else {
                            that.msg = {
                                dat: +new Date,
                                txt: res.msg,
                                tye: 'error'
                            };
                        }
                    }
                });
            },
            initScroll: function () {
                let that = this;
                Lib.ajax({
                    url: '/yearAward/getTopTwentylog',
                    success: (res)=> {
                        res = res || {};
                        let data = res.data || [];
                        that.conf.list = data.map((d)=>{
                            return {
                                name: d.nickName || "",
                                txt: '刚刚加入活动'
                            }
                        })
                    }
                });
            },
            initFuqz: function () {
                let that = this;
                Lib.ajax({
                    url: '/yearAward/getTopTenScore',
                    success: (res) => {
                        res = res || {};
                        let data = res.data || [];
                        that.awardList = data.map((d)=>{
                            return {
                                name: d.nickName || "",
                                num: d.score || '0'
                            }
                        })
                    }
                })
            },
            getMyFqz: function () {
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
                        that.num = data.score || 0;
                    }
                })
            },
            shareLink: function () {
                this.msg = {
                    dat: +new Date,
                    txt: "赶快发页面给好友吧, 有好友助力你的福气值也会增加哦！",
                    tye: 'common'
                };
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
            min-height: 1150px;
            max-height: 1170px; // 为了保证华为手机能够显示全
            height: 100%;
            width: 100%;
            bottom: 0;
            right: 0;
            left: 0;
            top: 50px;
            background: url('./img/bg@2x.png') no-repeat;
            background-size: cover;
        }
        .bcast {
            position: absolute;
            height: 50px;
            width: 100%;
            top: 0;
            left: 0;
            background: #df2813;
            padding-left: 100px;
            box-sizing: border-box;
            z-index: 100;
            i {
                position: absolute;
                width: 44px;
                height: 30px;
                background: url('./img/bcast@2x.png') no-repeat;
                background-size: cover;
                left: 50px;
                top: 10px;
            }
            .scroll {
                position: relative;
                overflow: auto;
                height: 100%;
                li {
                    height: 100%;
                    color: #ffef9c;
                    .txt {
                        position: relative;
                        width: 250px;
                        display: inline-block;
                        line-height: 50px;
                    }
                    .ellipsis {
                        position: relative;
                        display: inline-block;
                        line-height: 50px;
                        width: 100%;
                        padding-right: 20px;
                        box-sizing: border-box;
                    }
                }
            }
        }
        .w-top {
            position: relative;
            margin: 260px 185px 0;
            height: 60px;
            width: 380px;
            padding: 10px 0 0;
            box-sizing: border-box;
            text-align: center;
            font-size: 26px;
            color: #e92e18;
            font-weight: 500;
            line-height: 26px;
            div {
                font-size: 20px;
                font-weight: 400;
            }
        }
        .box {
            background: url('./img/box@2x.png') no-repeat;
            background-size: cover;
            margin: 10px 7px 0;
            text-align: center;
            position: relative;
            height: 607px;
            width: 736px;
            .refresh {
                position: relative;
                top: 44px;
                font-size: 16px;
                color: #fff;
                text-align: center;
                visibility: hidden;
                width: 200px;
                margin: 0 auto;
                background: #d5431b;
                height: 20px;
                line-height: 20px;
                border-radius: 10px;
            }
            .award {
                position: relative;
                width: 470px;
                margin: auto;
                height: 280px;
                overflow: scroll;
                margin-top: 80px;
                font-size: 22px;
                .no-scan {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    border: 0;
                }
                li {
                    color: #F20101;
                    line-height: 24px;
                    height: 35px;
                    width: 300px;;
                    margin: 0 auto;
                    border-top: 2px solid #ede7db; /*2px*/
                    .idx {
                        float: left;
                        width: 40px;
                        text-align: right;
                        padding: 0 5px;
                        box-sizing: border-box;
                        line-height: 35px;
                        height: 100%;
                    }
                    .name {
                        float: left;
                        width: 120px;
                        text-align: center;
                        padding: 0 5px;
                        line-height: 35px;
                        box-sizing: border-box;
                        height: 100%;
                    }
                    .fq {
                        float: left;
                        width: 140px;
                        text-align: left;
                        padding: 0 5px;
                        box-sizing: border-box;
                        line-height: 35px;
                        height: 100%;
                    }
                }
                .top1, .top2, .top3 {
                    position: absolute;
                    width: 160px;
                    margin-top: 0;
                    border-top: 0;
                    div {
                        text-align: center;
                        width: 100%;
                        height: 30px;
                    }
                    img {
                        width: 85px;
                        height: 53px;
                    }
                }
                .top1 {
                    transform: translateX(-50%);
                    left: 50%;
                }
                .top2 {
                    top: 80px;
                    left: 0px;
                }
                .top3 {
                    top: 80px;
                    right: 0px;
                }
                .top4 {
                    margin-top: 200px;
                }
            }
            .more {
                position: relative;
                width: 19px;
                height: 8px;
                margin: 0 auto;
                background: url('./img/arrow.png') no-repeat;
                background-size: cover;
            }
            > .hr {
                width: 456px;
                background: #FF4600;
                height: 2px;
                margin: 10px auto;
            }
            .fqz {
                position: relative;
                width: 306px;
                height: 50px;
                background: url('./img/fq@2x.png') no-repeat;
                background-size: cover;
                line-height: 40px;
                margin: auto;
                color: #fff;
            }
            .fqznum {
                position: relative;
                margin: 5px auto 0;
                width: 300px;
                div {
                    width: 200px;
                    font-size: 40px;
                    color: #DD0009;
                    display: inline-block;
                }
                a {
                    position: absolute;
                    width: 80px;
                    height: 32px;
                    top: 3px;
                    line-height: 32px;
                    border: 2px solid #FF0000; /*px*/
                    border-radius: 15px;
                    color: #FF0000;
                    background: #fff;
                    font-size: 22px;
                    padding: 0;
                }
            }
            .tips {
                width: 500px;
                margin: 10px auto 0;
                font-size: 17px;
                color: #616160;
                text-align: center;
                em {
                    color: #DD0009;
                }
            }
        }
        .rule {
            position: relative;
            width: 550px;
            height: 40px;
            font-size: 26px;
            text-align: center;
            margin: 0 100px;
            color: #fff;
            button {
                padding: 0;
                font-size: 28px;
                width: 164px;
                height: 40px;
                border: 2px solid #E6B312; /*px*/
                border-radius: 20px;
                color: #D30202;
                background: -webkit-linear-gradient(#FAFBC8, #E6B312);
                background: -o-linear-gradient(#FAFBC8, #E6B312);
                background: -moz-linear-gradient(#FAFBC8, #E6B312);
                background: linear-gradient(#FAFBC8, #E6B312);
            }
        }
        .share {
            position: relative;
            width: 620px;
            height: 80px;
            text-align: center;
            margin: 10px 65px 0;
            font-size: 42px;
            color: #B9040B;
            background: #fbed35;
            box-shadow: 5px 10px 1px #a30913;
            border-radius: 5px;
        }
        .page-tips {
            position: absolute;
            width: 650px;
            margin: 20px 50px 0;
            font-size: 24px;
            color: #EFE7CB;
            font-weight: 500;
            text-align: center;
        }
    }
</style>