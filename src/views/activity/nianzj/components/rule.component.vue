<template>
    <div class="rule-popup">
        <div class="close" @click="$emit('rulectrl')">
            <img src="../img/X@2x.png">
        </div>
        <div class="content">
            <div>
                <p><em>1.</em><span>用户扫新烟包</span>随机奖励100-200福气值，被扫过的烟包不会再获得福气值；</p>
                <p><em>2.</em><span>用户也可从河北中烟微信公众号—拾自在—钻石年终奖里参加活动</span>，未扫过烟包的用户首次进入活动赠送50福气值；</p>
                <p><em>3.</em>用户将活动页面发送给好友，好友助力得5福气值（每位好友只能为您助力一次）；</p>
                <p><em>4.</em>活动时间：2018年2月7日—2018年2月11日，开奖时间：2018年2月11日20点整，2月11日20点停止收集福气值，可在河北中烟微信公众号—拾自在—钻石年终奖查看是否中奖，系统发奖会有2小时左右延迟。</p>
                <p><em>5.</em>获奖福气值的门槛为1000福气值，前10000名累计满1000福气值的用户（按福气值多少排序），瓜分年终大奖；福气值相同的用户按达到最高福气值的时间先后进行排名；</p>
                <p><em>6.</em>福气值每5分钟刷新一次；我的福气值明细中只显示最近50条记录；</p>
                <p><em>7.</em>本次活动最终解释权归平台所有，针对任何通过不正当手段参与活动或获得福气值的用户，平台有权取消其领奖资格。</p>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() { return {} },
        methods: {}
    }
</script>
<style type="text/css" lang="less">
    @keyframes popup {
        0% { transform: scale(0) }
        100% { transform: scale(1) }
    }
    .rule-popup {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .7);
        z-index: 1000;
        .close {
            position: absolute;
            width: 68px;
            height: 68px;
            right: 30px;
            margin-top: 80px;
            border: 2px solid #fff; /*px*/
            border-radius: 34px;
            img {
                width: 34px;
                height: 34px;
                margin: 17px;
            }
        }
        .content {
            position: relative;
            width: 713px;
            height: 896px;
            margin: 20% auto 0;
            background: url('../img/popup@2x.png') no-repeat;
            background-size: cover;
            animation: popup .5s;
            padding: 110px 90px;
            box-sizing: border-box;
            div {
                width: 100%;
                height: 100%;
                overflow-y: auto;
                p {
                    width: 514px;
                    font-size: 25px;
                    color: #080700;
                    margin: auto;
                    line-height: 40px;
                    padding: 0 30px;
                    box-sizing: border-box;
                    text-indent: -35px;
                    em {
                        color: rgba(209,2,2,1);
                        font-size: 40px;
                        font-weight: 500;
                    }
                    span {
                        color: #ee1e1e;
                    }
                }
            }
        }
    }
</style>
