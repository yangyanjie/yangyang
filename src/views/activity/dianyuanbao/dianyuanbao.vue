<template>
    <div class="ui-dyb">
        <sa-page-load ishow="1"></sa-page-load>
        <img src="./img/bg@2x.png" class="bg">
        <img src="./img/title@2x.png" class="title">
        <ul class="packet">
            <li @click="!unbind && drow()" class="packet-1" md="hb_1_dyb" md_name="点元宝">
                <img src="./img/packet-1@2x.png" class="shake">
            </li>
            <li @click="!unbind && drow()" class="packet-2" md="hb_1_dyb" md_name="点元宝">
                <img src="./img/packet-2@2x.png" class="shake">
            </li>
            <li @click="!unbind && drow()" class="packet-3" md="hb_1_dyb" md_name="点元宝">
                <img src="./img/packet-3@2x.png" class="shake">
            </li>
            <li @click="!unbind && drow()" class="packet-4" md="hb_1_dyb" md_name="点元宝">
                <img src="./img/packet-4@2x.png" class="shake">
            </li>
            <li @click="!unbind && drow()" class="packet-5" md="hb_1_dyb" md_name="点元宝">
                <img src="./img/packet-5@2x.png" class="shake">
            </li>
            <li @click="!unbind && drow()" class="packet-6" md="hb_1_dyb" md_name="点元宝">
                <img src="./img/packet-6@2x.png" class="shake">
            </li>
        </ul>
        <!--中奖信息弹窗-->
        <div class="ui-popup invisible" ref="popup">
            <div class="content" ref="pcontent">
                <p class="ptitle">恭喜您获得</p>
                <div :class="awardIdx==idx?'':'invisible'" v-for="(award, idx) in awards">
                    <img :src="award.awardPicUrl" />
                    <a :href="award.awardJumpurl" class="btn-default" md="hb_4_dyb" md_name="确定领奖按钮">确定</a>
                </div>
                <button type="button" class="btn-change" @click="changeImg(awards, awardIdx)">换一个</button>
            </div>
        </div>
        <!--绑定手机号弹窗-->
        <div class="ui-phone invisible" ref="phone">
            <form class="content">
                <img src="./img/close@2x.png" class="close" @click="gohome">
                <h4>验证手机</h4>
                <div class="phone-block">
                    <input type="number" name="phone" :value="pnum" placeholder="手机号" @keyup="phoneChange">
                    <p class="help-block" :class="{'invisible':phoneValidate}">*请输入正确的手机号</p>
                    <hr>
                </div>
                <div class="code-block">
                    <div class="input-block">
                        <input type="number" name="code" :value="pcode" placeholder="验证码" @keyup="codeChange">
                        <p class="help-block" :class="{'invisible':codeValidate}">*请输入正确的验证码</p>
                    </div>
                    <div class="get-code">
                        <button type="button" @click="!count && phoneValidate && (phoneValidate!==1) && getCode()" md="hb_3_dyb" md_name="获取验证码按钮">获取验证码</button>
                    </div>
                    <hr>
                </div>
                <button type="button" class="btn-confirm" @click="phoneValidate && codeValidate && (codeValidate!==1) && bindPhone()" md="hb_2_dyb" md_name="绑定手机号按钮">确认</button>
            </form>
        </div>
        <!--二维码弹窗-->
        <div class="ui-wxpic invisible" ref="wxpic">
            <div class="img-content">
                <img src="./img/close@2x.png" class="close" @click="gohome">
                <p>为了能及时通知您获奖动态以及新活动动态，</p>
                <p class="img-title">请长按以下二维码图片完成关注，</p>
                <p>关注后奖品将发放至您的个人中心。</p>
                <img class="png" :src="wxpng" />
                <p class="img-bottom">长按扫描二维码，关注公众号</p>
            </div>
        </div>
        <!-- 会员日弹框 -->
        <member-day v-show="memberDayFlag" :sourceId="sourceId" :textOrBtn="textOrBtn"></member-day>
    </div>
</template>
<script type="text/javascript">
import Lib from "assets/js/Lib.js";
import SaPageLoad from "components/pageload.directive";
import memberDay from 'components/member.directive.vue' // 会员日弹框
export default {
  data() {
    return {
      count: 0,
      pnum: "",
      pcode: "",
      awards: [],
      awardIdx: 0,
      unbind: false,
      codeValidate: 1,
      phoneValidate: 1,
      wxpng: sessionStorage.getItem("wx-info"),
      sourceId: "",
      memberDayFlag: false, // 会员日弹框显示隐藏
      textOrBtn:true, // 控制会员日弹框是显示 按钮 还是 文案 （true 是显示文案，false 是显示按钮）
    };
  },
  components: {
    SaPageLoad,
    memberDay
  },
  beforeCreate() {
    Lib.ajax({
      url: "/user_v2/info",
      method: "post",
      data: {
        moudleKey: "SCAN_CODE_CHECK",
        sn: sessionStorage.getItem("sn"),
        code: sessionStorage.getItem("code"),
        orgCode: sessionStorage.getItem("orgCode")
      },
      success: function(res) {
        if (res.ret === "200000") {
          var data = res.data || {};
          sessionStorage.setItem("nickname", data.nickname || "");
          sessionStorage.setItem("mobile", data.mobile || "");
        }
      }
    });
  },
  created() {
    //埋点函数
    Lib.ajax({
      url: "/platform_v2/getActivityPage",
      method: "post",
      data: {
        moudleKey: "SCAN_CODE_CHECK_ACTIVITY_9",
        activityCode: Lib.getUrlQuery("activityCode")
      },
      success: res => {
        if (res.ret === "200000") {
          this.sourceId = res.data.pageId;
          var src = "https://weblog.taozuike.com/md/new_state.js";
          var Ele = document.getElementsByTagName("script")[0];
          var v =
            document.createElement("script") ||
            window.document.createElement("script");
          v.src = src;
          v.async = true;
          v.type = "text/javascript";
          Ele.parentNode.insertBefore(v, Ele);
          window.getpagestatistics = function() {
            return {
              pageId: res.data.returnStr,
              sourceId: Lib.getUrlQuery("sourceId")
            };
          };
        }
      }
    });
  },
  mounted() {
    // 软键盘问题
    // this.fixphone();
    if(sessionStorage.getItem("token") == null || sessionStorage.getItem("sn") == null || sessionStorage.getItem("code") == null) {
      window.location.href = "/s"
    }
  },
  methods: {
    fixphone: function() {
      let that = this;
      let wmax = document.documentElement.clientHeight;
      window.onresize = function() {
        let wmin = document.documentElement.clientHeight;
        // 唤醒软键盘
        if (wmax > wmin) {
          that.$refs.phone.children.scrollTop = 0;
        }
      };
    },
    changeImg: function(arr, idx) {
      if (++idx >= arr.length) {
        idx = 0;
      }
      this.$data.awardIdx = idx;
    },
    gohome: function() {
      window.location.href =
        "../menus/home.html?sourceId=" +
        this.sourceId +
        "&t=" +
        new Date().getTime();
    },
    popupfn: function(params) {
      if (params) {
        // 展示中奖信息
        this.$refs.popup.className = "ui-popup";
        document.body.style.overflow = "hidden";
      } else {
        // 隐藏中奖信息
        this.$refs.popup.className = "ui-popup invisible";
        document.body.style.overflow = "auto";
      }
      return this;
    },
    phonefn: function(params) {
      if (params) {
        // 展示绑定手机
        this.$refs.phone.className = "ui-phone";
        document.body.style.overflow = "hidden";
      } else {
        // 隐藏绑定手机
        this.$refs.phone.className = "ui-phone invisible";
        document.body.style.overflow = "auto";
      }
      return this;
    },
    wxpic: function(params) {
      if (params) {
        // 展示二维码
        this.$refs.wxpic.className = "ui-wxpic";
        document.body.style.overflow = "hidden";
      } else {
        // 隐藏二维码
        this.$refs.wxpic.className = "ui-wxpic invisible";
        document.body.style.overflow = "auto";
      }
      return this;
    },
    drow: function() {
      let that = this;
      // 解除事件绑定，避免多次点击
      this.$data.unbind = true;
      // 抽奖
      Lib.ajax({
        url: "/act_v2/draw",
        method: "post",
        data: {
          moudleKey: "SCAN_CODE_CHECK",
          sn: sessionStorage.getItem("sn"),
          code: sessionStorage.getItem("code"),
          orgCode: sessionStorage.getItem("orgCode"),
          activityCode: Lib.getUrlQuery("activityCode")
        },
        success: function(res) {
          // 这里还没写完奖品类型
          if (res.ret === "200000") {
            let thx = "";
            let data = res.data || {};
            if (data.awardType === 1) {
              console.log("实物");
            } else if (data.awardType === 3) {
              console.log("红包");
              if (data.score) {
                thx += '<p class="pprize">' + data.prizeName + "</p>";
                thx += '<p class="pptitle">恭喜您获得</p>';
                thx += '<p class="pptype">' + data.awardPrice + "元";
                thx += "+" + data.score + "荷石币</p>";
              } else {
                thx += '<p class="ptitle">恭喜您获得</p>';
                thx +=
                  '<p class="presult"><em>' + data.awardPrice + "</em>元</p>";
                thx += '<p class="ptype">鼓励金</p>';
              }
              thx +=
                '<button type="button" class="btn-default" md="hb_4_dyb" md_name="确定领奖按钮">立即收下</button>';
            } else if (data.awardType === 6) {
              console.log("积分");
              thx += '<p class="ptitle">恭喜您获得</p>';
              thx += '<p class="pscore"><em>' + data.score + "</em></p>";
              thx += '<p class="ptype">荷石币</p>';
              thx +=
                '<button type="button" class="btn-default" md="hb_4_dyb" md_name="确定领奖按钮">立即收下</button>';
            } else if (data.awardType === 889) {
              console.log("卡券");
              that.$data.awards = data.moreList;
              that
                .popupfn(1)
                .wxpic(0)
                .phonefn(0);
              return;
            } else {
              thx += '<p class="ptitle">很遗憾,未中奖</p>';
              thx += '<p class="pnothing">谢谢参与</p>';
              thx +=
                '<button type="button" class="btn-default" md="hb_4_dyb" md_name="确定领奖按钮">确认</button>';
              that.$refs.pcontent.innerHTML = thx;
              if(sessionStorage.getItem('hasVip')=='0'){ // 无会员日活动
                that.$refs.pcontent.lastChild.onclick = that.gohome;
              }else{ // 有会员日活动
                that.$refs.pcontent.lastChild.onclick = function (){
                  if (!sessionStorage.getItem('isGPS')) {
                        // 显示文案
                        that.memberDayFlag = true;
                        that.textOrBtn = true;
                      } else {
                        // 授权了 GPS 给飞机票
                        that.memberDayFlag = true;
                        that.textOrBtn = false;
                      }
                }
              }
              that.popupfn(1).wxpic(0).phonefn(0);
              return;
            }
            that.$refs.pcontent.innerHTML = thx;
            that.$refs.pcontent.id = data.id;
            that.$refs.pcontent.phone = data.awardUser.mobile;
            that.$refs.pcontent.lastChild.onclick = that.take;
            that.popupfn(1).wxpic(0).phonefn(0);
          } else {
            alert(res.message || "发送失败");
          }
        }
      });
    },
    getGift: function(id, phone) {
      let that = this;
      if (!!sessionStorage.getItem("wx-info")) {
        // 新用户
        that
          .popupfn(0)
          .wxpic(1)
          .phonefn(0);
        return;
      }
      Lib.ajax({
        url: "/award_v2/getgift",
        method: "post",
        data: {
          activityId: Lib.getUrlQuery("activityCode"),
          province: "",
          city: "",
          district: "",
          mobile: sessionStorage.mobile || phone || "",
          address: "",
          username: sessionStorage.nickname || "",
          region: "",
          orderChannel: "SCAN_CODE_CHECK",
          orgCode: sessionStorage.getItem("orgCode"),
          id: id
        },
        success: function(res) {
          if (res.ret === "200000") {
            //alert('领取成功');
            if(sessionStorage.getItem('hasVip')=='0'){ // 没有会员日
            that.gohome();
            }else{
              if (!sessionStorage.getItem('isGPS')) {
                // 显示文案
                that.memberDayFlag = true;
                that.textOrBtn = true;
              } else {
                // 授权了 GPS 给飞机票
                that.memberDayFlag = true;
                that.textOrBtn = false;
              }
            }
          } else {
            if(sessionStorage.getItem('hasVip')=='0'){ // 没有会员日
                 alert(res.message || "领取失败");
            }else{
                // 有会员日
              if (!sessionStorage.getItem('isGPS')) {
                // 显示文案
                that.memberDayFlag = true;
                that.textOrBtn = true;
              } else {
                // 授权了 GPS 给飞机票
                that.memberDayFlag = true;
                that.textOrBtn = false;
              }
            }
          }
        }
      });
    },
    take: function() {
      // 绑定手机号
      if (!sessionStorage.getItem("mobile")) {
        this.popupfn(0)
          .wxpic(0)
          .phonefn(1);
        return "";
      }
      // 直接调接口跳走
      this.getGift(this.$refs.pcontent.id, this.$refs.pcontent.phone);
    },
    getCode: function() {
      let $btn = event.target,
        countInter;
      let that = this;
      this.$data.count = 59;
      $btn.innerText = "重新发送(60s)";
      countInter = setInterval(function() {
        $btn.innerText = "重新发送(" + that.$data.count-- + "s)";
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
        data: {
          mobile: that.$data.pnum || "",
          orgCode: sessionStorage.getItem("orgCode"),
          scaleType: "bind_mobile"
        },
        success: function(res) {
          if (res.ret === "200000") {
            console.log("发送成功");
          } else {
            alert("发送失败");
          }
        }
      });
    },
    bindPhone: function() {
      let that = this;
      Lib.ajax({
        url: "/act_v2/register",
        method: "post",
        data: {
          score: 0,
          scaleType: "bind_mobile",
          mobile: that.$data.pnum || "",
          smsCode: that.$data.pcode || "",
          orgCode: sessionStorage.getItem("orgCode"),
          activityCode: Lib.getUrlQuery("activityCode")
        },
        success: function(res) {
          if (res.ret === "200000") {
            console.log("绑定成功");
            sessionStorage.mobile = that.$data.pnum;
            that.take();
          } else {
            alert("验证码错误");
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
      if (/\d{4}$/.test(code)) {
        this.$data.codeValidate = true;
      } else {
        this.$data.codeValidate = false;
      }
      this.pcode = code;
    },
    // member: function(params) {
    //   if (params) {
    //     // 展示跳转会员日弹框
    //     this.$refs.member.className = "ui-goMember";
    //     document.body.style.overflow = "hidden";
    //   } else {
    //     // 隐藏跳转会员日弹框
    //     this.$refs.member.className = "ui-goMember invisible";
    //     document.body.style.overflow = "auto";
    //   }
    //   return this;
    // },
    // goMember: function() {
    //   window.location.href =
    //     "./member-day?sourceId=" +
    //     this.sourceId +
    //     "&t=" +
    //     new Date().getTime();
    // }
  }
};
</script>
<style type="text/css" lang="less">
@keyframes shake {
  from,
  to {
    -webkit-transform: translate(0, 0) rotate(0deg);
    transform: translate(0, 0) rotate(0deg);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate(1.5px, -2.5px) rotate(-5deg);
    transform: translate(1.5px, -2.5px) rotate(-5deg);
  }
  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate(-1.5px, 2.5px) rotate(5deg);
    transform: translate(-1.5px, 2.5px) rotate(5deg);
  }
}
@keyframes popup {
  0% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.1);
  }
  60% {
    transform: scale(1);
  }
  80% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes packet1 {
  0% {
    top: 0px;
  }
  80% {
    top: 610px;
  }
  90% {
    top: 590px;
  }
  100% {
    top: 610px;
  }
}
@keyframes packet2 {
  0% {
    top: 0px;
  }
  80% {
    top: 532px;
  }
  90% {
    top: 512px;
  }
  100% {
    top: 532px;
  }
}
@keyframes packet3 {
  0% {
    top: 0px;
  }
  80% {
    top: 404px;
  }
  90% {
    top: 384px;
  }
  100% {
    top: 404px;
  }
}
@keyframes packet4 {
  0% {
    top: 0px;
  }
  80% {
    top: 610px;
  }
  90% {
    top: 590px;
  }
  100% {
    top: 610px;
  }
}
@keyframes packet5 {
  0% {
    top: 0px;
  }
  80% {
    top: 494px;
  }
  90% {
    top: 474px;
  }
  100% {
    top: 494px;
  }
}
@keyframes packet6 {
  0% {
    top: 0px;
  }
  80% {
    top: 610px;
  }
  90% {
    top: 590px;
  }
  100% {
    top: 610px;
  }
}
.ui-dyb {
  position: absolute;
  height: 100%;
  width: 100%;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .title {
    position: relative;
    margin: 53px 82px 0;
    height: 244px;
    width: 586px;
  }
  .packet {
    .shake {
      -webkit-animation: shake 3s linear infinite alternate;
      animation: shake 3s linear infinite alternate;
      animation-delay: 1s;
    }
    img {
      height: 100%;
      width: 100%;
    }
    .packet-1 {
      position: absolute;
      width: 110px;
      height: 126px;
      top: 610px;
      left: 40px;
      -webkit-animation: packet1 0.5s linear 1 alternate;
      animation: packet1 0.5s linear 1 alternate;
      animation-delay: 0.5s;
    }
    .packet-2 {
      position: absolute;
      width: 130px;
      height: 146px;
      top: 532px;
      left: 206px;
      -webkit-animation: packet2 0.5s linear 1 alternate;
      animation: packet2 0.5s linear 1 alternate;
      animation-delay: 0.5s;
    }
    .packet-3 {
      position: absolute;
      width: 123px;
      height: 124px;
      top: 404px;
      left: 306px;
      -webkit-animation: packet3 0.5s linear 1 alternate;
      animation: packet3 0.5s linear 1 alternate;
      animation-delay: 0.5s;
    }
    .packet-4 {
      position: absolute;
      width: 125px;
      height: 144px;
      top: 610px;
      left: 348px;
      -webkit-animation: packet4 0.5s linear 1 alternate;
      animation: packet4 0.5s linear 1 alternate;
      animation-delay: 0.5s;
    }
    .packet-5 {
      position: absolute;
      width: 114px;
      height: 112px;
      top: 494px;
      left: 484px;
      -webkit-animation: packet5 0.5s linear 1 alternate;
      animation: packet5 0.5s linear 1 alternate;
      animation-delay: 0.5s;
    }
    .packet-6 {
      position: absolute;
      width: 146px;
      height: 142px;
      top: 610px;
      left: 548px;
      -webkit-animation: packet6 0.5s linear 1 alternate;
      animation: packet6 0.5s linear 1 alternate;
      animation-delay: 0.5s;
    }
  }
  .ui-popup {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    .content {
      position: relative;
      width: 588px;
      height: 742px;
      margin: 212px auto 0;
      background: url(./img/bgpopup@2x.png) no-repeat;
      background-size: cover;
      border-radius: 5px;
      animation: popup 0.8s;
      -webkit-animation: popup 0.8s;
      p {
        position: absolute;
        text-align: center;
        color: #fff;
        font-size: 36px;
        font-family: "微软雅黑";
        transform: translateX(-50%);
        left: 50%;
      }
      .pprize {
        top: 328px;
      }
      .pptitle {
        top: 430px;
      }
      .pptype {
        top: 530px;
      }
      .ptitle {
        top: 328px;
      }
      .pnothing {
        top: 420px;
        font-size: 68px;
      }
      .presult {
        top: 350px;
        em {
          font-size: 148px;
        }
      }
      .pscore {
        top: 370px;
        em {
          font-size: 120px;
        }
      }
      .ptype {
        top: 530px;
      }
      img {
        position: absolute;
        bottom: 180px;
        height: 130px;
        transform: translateX(-50%);
        left: 50%;
        width: 420px;
      }
    }
    .btn-default {
      position: absolute;
      background: #fcca39;
      color: #cf0922;
      width: 314px;
      height: 80px;
      border-radius: 40px;
      bottom: 65px;
      left: 136px;
      font-size: 36px;
      line-height: 80px;
      text-align: center;
    }
    .btn-change {
      position: absolute;
      background: #fd4027;
      border: 1px solid #ddd; /*1px*/
      bottom: 130px;
      right: 40px;
      width: 100px;
      height: 45px;
      color: #fff;
      font-size: 24px;
      padding: 0;
      text-align: center;
    }
  }
  .ui-phone {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    .content {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 620px;
      height: 520px;
      background: #fff;
      border-radius: 15px;
      font-size: 28px;
      z-index: 1020;
      font-family: "微软雅黑";
      animation: popup 0.8s;
      -webkit-animation: popup 0.8s;
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
        height: 90px;
        margin: 0 20px;
        input {
          font-size: 28px;
          display: block;
          width: 580px;
        }
      }
      .code-block {
        position: relative;
        top: 150px;
        height: 90px;
        margin: 0 20px;
        .input-block {
          width: 60%;
          display: inline-block;
          input {
            font-size: 28px;
            display: block;
            width: 100%;
          }
        }
        .get-code {
          width: 40%;
          float: right;
          display: inline-block;
          button {
            font-size: 28px;
            background: #fff;
            color: #333;
            width: 100%;
            height: 100%;
            border-left: 1px solid #ddd; /*1px*/
            text-align: right;
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
  .ui-wxpic {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    .img-content {
      position: relative;
      width: 620px;
      height: 830px;
      margin: 100px auto 0;
      background: url(./img/bgpopimg@2x.png) no-repeat center center;
      background-size: cover;
      border-radius: 15px;
      animation: popup 0.8s;
      -webkit-animation: popup 0.8s;
      padding: 110px 50px 0;
      box-sizing: border-box;
      line-height: 45px;
      .img-title {
        font-weight: 500;
      }
      .img-bottom {
        margin: 0px;
        text-align: center;
        width: 304px;
        border: 4px outset #fafbc8;
        margin: auto;
        font-size: 22px;
        font-weight: 500;
        margin-top: 5px;
        line-height: 30px;
      }
      img.close {
        position: absolute;
        width: 36px;
        height: 36px;
        right: 20px;
        top: 20px;
      }
      img.png {
        position: relative;
        width: 312px;
        height: 312px;
        transform: translateX(-50%);
        left: 50%;
        margin-top: 50px;
      }
      p {
        font-size: 32px;
        color: #c7000b;
      }
    }
  }
  .ui-goMember {
    z-index: 1000;
    -webkit-animation: popup 0.8s;
    animation: popup 0.8s;
    position: absolute;
    width: 600px;
    height: 700px;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    .close {
      position: absolute;
      top: -20px;
      right: -20px;
    }
    .btn {
      width: 312px;
      height: 90px;
      position: absolute;
      left: 50%;
      bottom: 50px;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      background-color: #ab3500;
      text-align: center;
      line-height: 90px;
      font-size: 36px;
      color: #fff;
      border-radius: 20px;
    }
    .png {
      width: 600px;
      height: 700px;
    }
  }
}
</style>