<template>
    <div id="root">
        <sa-page-load ishow="1"></sa-page-load>
        <main class="ui-main">
            <img src="./img/background@2x.png" class="ui-bg">
            <div class="ui-box">
                <p class="sum">红包总量：<em>{{sum}}</em>个</p>
                <p class="num">红包余量：<em>{{num}}</em>个</p>
            </div>
            <ul class="packet-list">
                <li><img :src="img"></li>
            </ul>
            <div class="broadcast">
                <sa-broadcast :config="conf"></sa-broadcast>
            </div>
        </main>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import SaBroadcast from 'components/broadcast.directive'
    export default {
        data() {
            return {
                sum: 10000,
                num: 10000,
                img: '',
                conf: {
                    list: [{
                        tel: '138******8765',
                        money: 88.81
                    }, {
                        tel: '138******8765',
                        money: 88.82
                    }, {
                        tel: '138******8765',
                        money: 88.83
                    }, {
                        tel: '138******8765',
                        money: 88.84
                    }, {
                        tel: '138******8765',
                        money: 88.85
                    }, {
                        tel: '138******8765',
                        money: 88.86
                    }, {
                        tel: '138******8765',
                        money: 88.87
                    }, {
                        tel: '138******8765',
                        money: 88.88
                    }, {
                        tel: '138******8765',
                        money: 88.89
                    }]
                }
            }
        },
        components: {
            SaPageLoad, SaBroadcast
        },
        mounted() {

        },
        methods: {

        }
    }
</script>
<style type="text/css" lang="less">
    .ui-main {
        position: absolute;
        height: 100%;
        width: 100%;
        .ui-bg {
            position: absolute;
            width: 100%;
            height: 100%;
        }
        .ui-box {
            position: absolute;
            top: 0;
            z-index: 100;
            color: #FFE63A;
            font-size: 30px;
            .sum {
                margin: 40px 0 10px 40px;
            }
            .num {
                margin: 20px 0 0 40px;
            }
        }
        .packet-list {
            position: absolute;
            height: 100%;
            width: 100%;
            z-index: 10;
            top: 0;
            left: 0;
        }
        .broadcast {
            position: fixed;
            width:670px;
            height:114px;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background:rgba(231,181,75,1);
            padding: 18px 74px;
            box-sizing: border-box;
            z-index: 1000;
        }
    }
</style>