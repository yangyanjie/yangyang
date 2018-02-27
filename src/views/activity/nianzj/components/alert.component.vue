<template>
    <!-- 成功弹窗 -->
    <div id="alert_success" v-show="!!txt" v-if="tye=='success'">
        <img src="../img/suc@2x.png">
        <div class="msg">{{txt}}</div>
    </div>
    <!-- 错误弹窗 -->
    <div id="alert_error" v-show="!!txt" v-else-if="tye=='error'">
        <img src="../img/err@2x.png">
        <div class="msg">{{txt}}</div>
    </div>
    <!-- 底部消息 -->
    <div id="alert_tips" v-show="!!txt" v-else-if="tye=='tips'">
        <div class="msg">{{txt}}</div>
    </div>
    <!-- 普通弹窗 -->
    <div id="alert_common" v-show="!!txt" v-else>
        <p class="title">提示</p>
        <div class="msg">{{txt}}</div>
    </div>
    <!-- to be continue... -->
</template>
<script type="text/javascript">
    export default {
        data() {
            let msg = this.$props['msg'] || {};
            return {
                txt: msg['txt'] || "",
                tye: msg['type'] || "common"
            }
        },
        mounted() {
            this.initEvent();
        },
        methods: {
            initEvent() {
                let that = this, o = {dat:0};
                that.$watch('msg', (msg) => {
                    if (msg.dat-o.dat<3000) return;
                    Object.assign(that, msg);
                    o = msg;
                    !!msg.txt && setTimeout(() => {
                        that.txt = '';
                    }, 3000);
                });
            }
        },
        props: ['msg']
    }
</script>
<style type="text/css" lang="less">
    @keyframes alert_pop {
        0% { transform: translateY(-30%); opacity: 0; }
        40% { transform: translateY(-40%); opacity: .4; }
        80% { transform: translateY(-50%); opacity: .8; }
        100% { transform: translateY(-50%); opacity: 1; }
    }
    .palert {
        position: absolute;
        width: 540px;
        top: 50%;
        // left: 50%;
        margin: 0 105px;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, .7);
        text-align: center;
        border-radius: 20px;
        z-index: 1000;
        animation: alert_pop .2s;
    }
    #alert_common {
        .palert;
        height: 200px;
        p {
            position: relative;
            font-size: 34px;
            color: #fff;
            height: 50px;
            line-height: 50px;
            border-bottom: 2px solid #ddd; /*px*/
        }
        div {
            position: relative;
            font-size: 30px;
            color: #fff;
            height: 150px;
            padding: 20px;
            line-height: 50px;
            box-sizing: border-box;
        }
    }
    #alert_success {
        .palert;
        height: 280px;
        img {
            position: relative;
            height: 75px;
            width: 75px;
            margin: 30px auto 0;
        }
        div {
            position: relative;
            font-size: 30px;
            color: #fff;
            height: 150px;
            line-height: 150px;
        }
    }
    #alert_error {
        .palert;
        height: 180px;
        img {
            position: relative;
            height: 75px;
            width: 75px;
            margin: 24px auto 0;
        }
        div {
            position: relative;
            font-size: 30px;
            color: #fff;
            height: 80px;
            line-height: 80px;
        }
    }
    #alert_tips {
        .palert;
        height: 100px;
        top: 90%;
        div {
            position: relative;
            font-size: 30px;
            color: #fff;
            height: 100px;
            line-height: 100px;
        }
    }
</style>
