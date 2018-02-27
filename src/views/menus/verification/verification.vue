<template>
    <div id="root">
        <sa-page-load ishow="1"></sa-page-load>
        <alert-dialog :constants='constants' ref="alert"></alert-dialog>
        <div class="wrap border-box">
            <div class="header">
                <img src="./img/verification.png" />
                <span>验真伪</span>
            </div>
            <input type="number" placeholder="请输入包装内六位数验证码" v-model="inputValue">
            <p>打开包装顶部即可查看验证码</p>
        </div>
        <div class="btn" @click="!unbind && verify()">
            验&nbsp;&nbsp;证
        </div>
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
    created() {
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
<style type="text/css" lang="less">
    html {
        height: 100%;
        background-color: #eee;
        .border-box {
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
        }
        .wrap {
            width: 100%;
            height: 440px;
            padding-top: 51px;
            background-color: #fff;
            box-shadow: 0 0 20px rgba(0,0,0,1);
            text-align: center;
            .header {
                text-align: center;
                height: 120px;
                line-height: 120px;
                font-size: 40px;
                img {
                    vertical-align: middle
                }
                span {
                    padding-left: 10px;
                }
            }
            input {
                width: 85%;
                height: 120px;
                border: 1px solid orangered;
                background-color: #FFFAEE;
                font-size: 40px;
                text-align: center;
            }
            >p {
                font-size: 30px;
                color: black;
                padding-top: 35px;
            }
        }
        .btn {
            width: 100%;
            height: 99px;
            line-height: 99px;
            text-align: center;
            color: #fff;
            position: relative;
            z-index: 80;
            top: 550px;
            right: 0;
            font-size: 35px;
            font-weight: bolder;
            background: url('./img/rect.png') center no-repeat;
            background-size: cover;
        }
    }
</style>


