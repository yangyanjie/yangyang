<template>
    <div class="phone-index" v-show="showOrhide">
			<div class="ui-phone" ref="phone">
        <form class="content">
            <img src="../../static/common/home_close.png" class="close" @click="showOrhide = false">
            <h4>验证手机</h4>
            <div class="phone-block">
                <input type="number" name="phone" :value="pnum" placeholder="手机号" @keyup="phoneChange">
                <p class="help-block" :class="{'invisible':phoneValidate}">*请输入正确的手机号</p>
            </div>
            <div class="code-block">
                <div class="input-block">
                    <input type="number" name="code" value="pcode" placeholder="验证码" @keyup="codeChange">
                    <p class="help-block" :class="{'invisible':codeValidate}">*请输入正确的验证码</p>
                </div>
                <div class="get-code">
                    <button type="button" @click="!count && phoneValidate && (phoneValidate!==1) && getCode()">获取验证码</button>
                </div>
            </div>
            <button type="button" class="btn-confirm" @click="phoneValidate && codeValidate && (codeValidate!==1) && bindPhone()">确认</button>
        </form>
    	</div>
			<cr-code v-show="isShow"></cr-code>
      <draw-alert :drawInfo="drawInfo" v-show="drawFlag"></draw-alert>
		</div>
</template>
<script type="text/javascript">
import CrCode from "./crCode.directive.vue";
import Lib from "assets/js/Lib.js";
import drawAlert from "./draw.directive";
export default {
  data() {
    return {
      // 弹出框的传入参数
      constants: {
        title: "提示",
        msg: "",
        type: "alert",
        text: ["确定"],
        flag: "0"
      },
      phoneValidate: 1,
      codeValidate: 1,
      count: 0,
      pnum: "",
      isShow: false,
      smsCode: "",
      showOrhide: true,
      drawInfo: "",
      drawFlag: false // 隐藏领奖的弹出框
    };
  },
  props: ["id"],
  components: {
    CrCode,
    drawAlert
  },
  methods: {
    phonefn: function(params) {
      if (params) {
        // 展示绑定手机
        this.$refs.phone.className = "ui-phone";
      } else {
        // 隐藏绑定手机
        this.$refs.phone.className = "ui-phone invisible";
      }
      return this;
    },
    getCode: function() {
      let that = this,
        countInter;
      let $btn = event.target;
      this.$data.count = 29;
      $btn.innerText = "(30s)后重新获取";
      countInter = setInterval(function() {
        $btn.innerText = "(" + that.$data.count-- + "s)后重新获取";
        if (!that.$data.count) {
          clearInterval(countInter);
          countInter = null;
          $btn.innerText = "获取验证码";
        }
      }, 1000);
      // 调接口
      Lib.ajax({
        url: "/act_v2/sendMessage",
        method: "post",
        headers: {
          token: sessionStorage.getItem("token"),
          tokenId: sessionStorage.getItem("tokenId")
        },
        data: {
          mobile: that.$data.pnum || "",
          orgCode: sessionStorage.getItem("orgCode"),
          scaleType: "bind_mobile"
        },
        success: function(res) {
          if (res.ret == "200000") {
            this.drawInfo = "发送成功";
            this.drawFlag = true;
            setTimeout(() => {
              this.drawFlag = false;
            }, 1000);
          } else {
            this.drawInfo = "发送失败";
            this.drawFlag = true;
            setTimeout(() => {
              this.drawFlag = false;
            }, 1000);
          }
        }
      });
    },
    bindPhone: function() {
      let that = this;
      Lib.ajax({
        url: "/act_v2/register",
        method: "post",
        headers: {
          token: sessionStorage.getItem("token"),
          tokenId: sessionStorage.getItem("tokenId")
        },
        data: {
          mobile: that.$data.pnum || "",
          smsCode: that.$data.smsCode || "",
          activityCode: Lib.getUrlQuery("activityCode"),
          score: 0,
          orgCode: sessionStorage.getItem("orgCode"),
          scaleType: "bind_mobile"
        },
        success: function(res) {
          if (res.ret == "200000") {
            // 这里是手机号绑定成功之后
            if (sessionStorage.getItem("wx-info")) {
              // 没有关注公众号
              that.phonefn();
              that.isShow = true;
            } else {
              // 关注公众号了
              // 直接领奖
              Lib.ajax({
                url: "/user_v2/info",
                method: "post",
                headers: {
                  token: sessionStorage.getItem("token"),
                  tokenId: sessionStorage.getItem("tokenId")
                },
                data: {
                  orgCode: sessionStorage.getItem("orgCode"),
                  sn: sessionStorage.getItem("sn"),
                  moudleKey: "SCAN_CODE_CHECK",
                  code: sessionStorage.getItem("code")
                },
                success: res => {
                  Lib.ajax({
                    url: "/award_v2/getgift",
                    method: "post",
                    headers: {
                      token: sessionStorage.getItem("token"),
                      tokenId: sessionStorage.getItem("tokenId")
                    },
                    data: {
                      activityId: Lib.getUrlQuery("activityCode"),
                      province: "",
                      city: "",
                      district: "",
                      mobile: that.$data.pnum || "",
                      address: "",
                      username: res.data.nickname,
                      region: "",
                      orderChannel: "SCAN_CODE_CHECK",
                      orgCode: sessionStorage.getItem("orgCode"),
                      id: that.id
                    },
                    success: res => {
                      // 领取成功
                      if (res.ret == "200000") {
                        that.phonefn();
                        this.drawInfo = "领取成功";
                        this.drawFlag = true;
                        setTimeout(() => {
                          this.drawFlag = false;
                          location.href =
                            "../../views/menus/home.html?t=" + +new Date();
                        }, 1000);
                      } else {
                        // 领取失败
                        that.phonefn();
                        this.drawInfo = "领取失败";
                        this.drawFlag = true;
                        setTimeout(() => {
                          this.drawFlag = false;
                          location.href =
                            "../../views/menus/home.html?t=" + +new Date();
                        }, 1000);
                      }
                    },
                    error: res => {
                      alert(res.message);
                    }
                  });
                }
              });
            }
          } else {
            // 手机号绑定失败
            this.drawInfo = "绑定失败";
            this.drawFlag = true;
          }
        }
      });
    },
    phoneChange: function() {
      let phone = event.target.value || "";
      if (/^1[0-9]{2}\d{8}$/.test(phone)) {
        this.phoneValidate = true;
      } else {
        this.phoneValidate = false;
      }
      this.pnum = phone;
    },
    codeChange: function() {
      let code = event.target.value || "";
      console.log(code + "code");
      if (/\d{4}$/.test(code)) {
        this.$data.codeValidate = true;
      } else {
        this.$data.codeValidate = false;
      }
      this.smsCode = code;
    }
  }
};
</script>
<style type="text/css" lang="less">
.phone-index {
  position: absolute;
  z-index: 14;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.ui-phone {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 80;
  .content {
    position: relative;
    width: 620px;
    height: 520px;
    margin: 285px auto 0;
    background: #fff;
    border-radius: 5px;
    font-size: 28px;
    font-family: "微软雅黑";
    img.close {
      position: absolute;
      width: 36px;
      height: 36px;
      right: 20px;
      top: 20px;
    }
    h4 {
      position: relative;
      // display: block;
      text-align: center;
      font-size: 34px;
      color: #333;
      top: 50px;
    }
    .phone-block {
      position: relative;
      top: 150px;
      margin: 0 20px;
      height: 80px;
      border-bottom: 1px solid #cccccc;
      input {
        font-size: 28px;
        display: block;
        width: 100%;
      }
      p {
        font-size: 14px;
      }
    }
    .code-block {
      border-bottom: 1px solid #cccccc;
      position: relative;
      top: 150px;
      margin: 0 20px;
      height: 80px;
      .input-block {
        width: 320px;
        display: inline-block;
        input {
          font-size: 28px;
          display: block;
        }
        p {
          font-size: 18px;
        }
      }
      .get-code {
        width: 220px;
        height: 100%;
        float: right;
        display: inline-block;
        button {
          font-size: 28px;
          background: #fff;
          color: #333;
          width: 100%;
          height: 100%;
          border-left: 1px solid #ddd; /*1px*/
        }
      }
    }
    .help-block {
      color: #c7000b;
      font-size: 20px;
    }
    .btn-confirm {
      position: absolute;
      bottom: 30px;
      width: 590px;
      height: 88px;
      left: 15px;
      font-size: 32px;
      line-height: 88px;
      color: #fff;
      background: #ff7200;
      border-radius: 5px;
    }
  }
}
</style>