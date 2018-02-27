<template>
    <div id="root">
        <sa-page-load ishow="1"></sa-page-load>
        <alert-dialog :constants='constants' ref="alert"></alert-dialog>
        <img src="./img/bg01.png" id="bg1" />
        <img src="./img/bg02.png" id="bg2" />
        <input type="number" v-model="inputValue" placeholder="请输入包装内6位数验证码"/>
        <div class="btn" @click="!unbind && verify()">确认</div>
    </div>
</template>
<script type = "text/javaScript">
    import SaPageLoad from 'components/pageload.directive'
    import Lib from 'assets/js/Lib'              // 工具库
    import alertDialog from 'components/alert.directive'
export default {
    data() {
        return {
            tDate: new Date().getTime(),
            inputValue: "",
            constants: {
                "title": "提示",
                "msg": "",
                "type": "alert",
                "text": ["确定"]
            },
            unbind: false
        }
    },
    components:{
        SaPageLoad,alertDialog
    },
    methods: {
        verify: function() {
                this.unbind = true;
                let reg = /^\d{6}$/;   
                if (this.inputValue.length !==6) {
                    this.unbind = false;
                    this.constants.msg = "请正确输入包装内六位数验证码";
                    this.$refs.alert.show = true;
                    return;
                }
                if(!reg.test(this.inputValue)) {
                    this.unbind = false;
                    this.constants.msg = "请正确输入包装内六位数验证码";
                    this.$refs.alert.show = true;
                    return;
                }
                Lib.ajax({
                    url: '/s/checkCodeOut',
                    method: 'post',
                    data: {
                        'verifyCode': this.inputValue,
                        'code': Lib.getUrlQuery('code')
                    },
                    success: res => {
                        if (res.ret === "200000" && res.data.valid) {
                            this.unbind = false;
                            // console.log(res);
                            window.location.href = 'https://' + res.data.domain + '/s/outCodeDispatch?sn=' + res.data.sn + '&code=' + res.data.code + '&verifyCode=' + res.data.verifyCode + '&t=' + this.tDate 
                        } else {
                            this.unbind = false;
                            this.constants.msg = res.message;
                            this.$refs.alert.show = true;
                        }
                    }
                })
        }
    }
}
</script>
<style type="text/css" lang="less" scoped>
    html {
        width: 100%;
        height: 100%;
        body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;
            #bg1 {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 10;
            }
            #bg2 {
                width: 60%;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
                top: 140px;
                z-index: 20;
            }
            input {
                width: 60%;
                font-size: 26px;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
                top: 420px;
                z-index: 30;
                background: rgba(255,255,255,0);
                text-align: center
            }
            .btn {
                width: 60%;
                height: 90px;
                border-radius: 12px;
                line-height: 90px;
                text-align: center;
                color: white;
                font-size: 26px;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
                top: 500px;
                z-index: 40;
                background: rgba(16, 184, 114, 0.5)
            }
        }
    }
</style>