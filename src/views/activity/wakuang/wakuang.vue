<template>
    <div id="container">
        <div class="background">
            <img src="./image/newBottom.png" class="bottom">  <!-- 背景图 -->
						<ul class="stone-container">
							<li v-for="(v,i) in stoneSrc" :key="i"  @click="luckyDraw($event.target)">
								<img :src="v" class="stone" md="hb_1_wzs" md_name="挖石头">                <!-- 石头 -->
								<img src="./image/scoop.png" class="scoop" style="display:inlin-block"> <!-- 铲子 -->
							</li>
						</ul>
          <div class="broadcast">
              <div class="title">中奖名单</div>
              <div class="scroll">
                <div v-if="!conf.list.length" style="font-size:15px">暂无中奖记录~</div>
                  <sa-broadcast :config="conf"></sa-broadcast>
              </div>
          </div>
          <div class="rule">
              <div class="title">活动说明</div>
              <div class="content">
                  <p v-html="ActivityIntroductionInfo"></p>
              </div>
          </div>
				</div>
				<!-- 遮罩层 -->
				<div class="maskLayer" v-show="maskLayerFlag"></div>
				<!-- 验证手机 -->
				<!-- <phone v-show="phoneFlag" :id="id"></phone> -->
        <valiadate-alert v-if="valiadateFlag" @getcode="handleGetCode" @submitcode="handleSubmitCode" :msg="message" @handlecannel="handleCannelBtn"></valiadate-alert>
        <!-- 二维码 -->
		    <crCode v-show="crCodeFlag" @handleclose="handleCannelCode"></crCode>
				<div class="alert" v-show="alertFlag">
					<img src="./image/successIcon.png" class="successIcon" v-show="awardType != '0' && awardType != '666'">
					<img :src="isSucceedSrc">
					<span class="card-close" @click="goHome" v-if="awardType!='889' && awardType != '666'"></span>
					<!-- 中奖 -->
					<div class="successContainer" v-show="awardType != 0 && awardType != '666'">
            <div v-show="awardType != '889'">
              <span class="awardTitle">{{prizeName}}</span><br><!-- 几等奖 -->
						  <div class="awardInfo">
                <span>恭喜您获得</span>
                <span v-if="awardType=='3'&&score=='0'">{{money}}鼓励金</span>
                <span v-if="awardType=='6'&&score!='0'">{{score}}荷石币</span>
                <span v-if="awardType=='3'&&score!='0'">{{money}}鼓励金+{{score}}荷石币</span>
						  </div>
						  <button class="awardBtn" @click="goAward" md="hb_2_wzs" md_name="赶紧收下">赶紧收下</button>
            </div>
            <div v-show="awardType == '889'" class="participation-container">
              <span class="awardTitle">参与奖</span><br>
              <div v-show="participationList.length>=2" @click="participationChange" md="hb_3_wzs" md_name="换一个">换一个</div>
              <img :src="participationImg">
              <button @click="goAward(1)" md="hb_4_wzs" md_name="参与奖的确定按钮">确定</button>
            </div>
					</div>
					<!-- 未中奖 -->
					<div class="errorContainer" v-show="awardType == '0'">
						<span class="picture"></span>
						<div class="error-info">
							<span>真遗憾，未中奖</span>
							<span>谢谢参与</span>
						</div>
						<button class="error-btn" @click="goHome">确 定</button>
					</div>
          <!-- 抽奖失败 -->
					<div class="errorContainer" v-show="awardType == '666'">
						<span class="picture"></span>
						<div class="error-info">
							<p>{{drawErrInfo}}</p>
						</div>
						<button class="drawErr-btn" @click="goHome">确 定</button>
					</div>
				</div>
        <draw-alert v-show="drawAlertFlag" :drawInfo="drawInfo"></draw-alert>
    </div>
</template>
<script type="text/javascript">
import SaBroadcast from "components/broadcast.directive.vue";
import Lib from "assets/js/Lib.js";
import crCode from "components/crCode.directive.vue"; // 二维码弹框
// import Alert from "components/alert.directive.vue"; // 弹出框
import valiadateAlert from "components/valiadate.directive.vue";
import drawAlert from "components/draw.directive.vue"; // 领取成功或失败的弹出框
import $ from "jquery";
let lastRefresh = "";
function formatDate(date) {
  let D = new Date(date);
  let Y = D.getFullYear();
  let M = D.getMonth() + 1;
  let d = D.getDate();
  return (
    D.getFullYear() + "/" + (M < 9 ? "0" + M : M) + "/" + (d < 9 ? "0" + d : d)
  );
}
export default {
  data() {
    return {
      // 活动说明
      ActivityIntroductionInfo: "",
      stoneSrc: [
        // 石头SRC
        "../../static/wakuang/stone2x.png",
        "../../static/wakuang/stone2x.png",
        "../../static/wakuang/stone2x.png",
        "../../static/wakuang/stone2x.png",
        "../../static/wakuang/stone2x.png",
        "../../static/wakuang/stone2x.png"
      ],
      money: "", //显示中了多少元红包
      maskLayerFlag: false, //遮罩层的显示隐藏
      conf: {
        len: 2,
        template: "1",
        list: []
      },
      awardType: "", // 奖项类型（0谢谢参与，1实物，3红包，6积分，卡券889）
      isSucceedSrc: "", //popupbottom2x 有奖的图片 errorBj 无奖的图片(alert背景图)
      crCodeFlag: false,
      alertFlag: false,
      id: "", // 在判断是老用户的时候用到
      prizeName: "", // 显示绑定几等奖
      awardName: "", // 显示中奖信息
      participationList: [], // 奖券数据
      participationImg: "", // 奖券图片地址
      getSite: "", // 领取卡券地址
      score: "", // 中了多少积分
      i: 0, // 给切换卡券做准备
      drawInfo: "", // 领奖提示信息（黑色小~）
      drawAlertFlag: false, //领奖弹出框显示隐藏（黑色小~）
      valiadateFlag: false, // 手机弹框的显示隐藏
      message: "",
      noLuckyDraw: true, // 控制只让抽一次奖
      drawErrInfo: "", // 控制的是抽奖失败
      sourceId: "" // 埋点数据
    };
  },
  methods: {
    /* 抽奖 */
    luckyDraw(t) {
      if (this.noLuckyDraw) {
        let that = this;
        that.noLuckyDraw = false;
        $(t)
          .siblings("img")
          .css("display", "block");
        // t.nextElementSibling.style.display = "block"; // 铲子显示 chenliang
        Lib.ajax({
          url: "/act_v2/draw",
          headers: {
            token: sessionStorage.getItem("token"),
            tokenId: sessionStorage.getItem("tokenId")
          },
          data: {
            activityCode: Lib.getUrlQuery("activityCode"),
            orgCode: sessionStorage.getItem("orgCode"), // "hebeizhongyan"
            moudleKey: "SCAN_CODE_CHECK", // 关键字
            sn: sessionStorage.getItem("sn"), // "1234567"
            code: sessionStorage.getItem("code")
          },
          success: result => {
            if (result) {
              $(t)
                .siblings("img")
                .css("display", "none"); // 铲子隐藏
              t.src = "../../static/wakuang/breakopen2x.png"; // 换成炸开的图片
              if (result.data) {
                that.isSucceedSrc =
                  result.data.awardType == 0
                    ? "../../static/wakuang/errorBj.png"
                    : "../../static/wakuang/popupbottom2x.png"; // 是否抽中奖的背景图
                that.awardType = result.data.awardType; // 返回的奖项类型
                that.maskLayerFlag = true; // 遮罩层显示
                that.alertFlag = true; // 中奖弹出框显示
                that.prizeName = result.data.prizeName; // 中奖的几等奖
                // that.awardName = result.data.awardName; // 中奖的信息
                that.money = result.data.money; // 中了多少红包
                that.id = result.data.awardUser.id;
                if (result.data.moreList) {
                  that.participationList = result.data.moreList || []; // 卡券数据
                  that.participationImg =
                    result.data.moreList && result.data.moreList[0].awardPicUrl; // 卡券的图片链接地址
                  that.getSite =
                    result.data.moreList &&
                    result.data.moreList[0].awardJumpurl; // 领取卡券的地址
                }
                that.score = result.data.score; // 得到多少积分
              } else {
                // 显示弹出框，跳转首页（抽奖失败【没有data那个属性】】）
                that.alertFlag = true;
                that.drawErrInfo = result.message;
                that.awardType = "666";
                that.isSucceedSrc = "../../static/wakuang/errorBj.png";
                that.maskLayerFlag = true;
                /* todo */
              }
            }
          },
          error: err => {
            alert(err.message);
          }
        });
      }
    },
    /* 去首页 */
    goHome() {
      location.href =
        "../../views/menus/home.html?t=" +
        +new Date() +
        "&sourceId=" +
        this.sourceId;
    },
    /* 领奖 */
    goAward(n) {
      let that = this;
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
          if (res.data && res.data.mobile == null) {
            that.valiadateFlag = true; // 显示绑定手机
            /* 新用户 */
          } else {
            /* 老用户 */
            if (!!sessionStorage.getItem("wx-info")) {
              // 没有关注公众号
              that.crCodeFlag = true; // 显示二维码
              that.valiadateFlag = false; // 显示绑定手机
              that.alertFlag = true; // 弹出框显示的
            } else {
              // 直接领奖
              if (n == 1) {
                location.href = that.getSite; // 直接去领取卡券
                return;
              }
              // 直接领奖
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
                  mobile: res.data.mobile,
                  address: "",
                  username: res.data.nickname,
                  region: "",
                  orderChannel: "SCAN_CODE_CHECK",
                  orgCode: sessionStorage.getItem("orgCode"),
                  id: that.id
                },
                success: res => {
                  if (res.ret == "200000") {
                    // 领取成功
                    that.drawAlert({
                      message: "领取成功",
                      goHome: 1,
                      time: 3000
                    });
                  } else {
                    // 领取失败
                    that.drawAlert({
                      message: "领取失败",
                      goHome: 1,
                      time: 3000
                    });
                  }
                },
                error: err => {
                  alert(err.message);
                }
              });
            }
          }
        }
      });
    },
    /* 获取轮播数据 */
    scroll() {
      let that = this;
      Lib.ajax({
        url: "/award_v2/scrollAward",
        method: "post",
        headers: {
          token: sessionStorage.getItem("token"),
          tokenId: sessionStorage.getItem("tokenId")
        },
        data: {
          lastRefresh: lastRefresh,
          activityCode: Lib.getUrlQuery("activityCode")
        },
        success: res => {
          if (res.ret == "200000") {
            lastRefresh = res.data.lastRefresh || "";
            if (res.data.list.length >= 1) {
              that.conf.list = res.data.list.map(l => {
                return {
                  // tel: (l.mobile || "00000000000").replace(
                  //   /^(\d{3})\d{4}(\d+)/,
                  //   "$1****$2"
                  // ),
                  awardNickName: (l.awardNickName || "").replace(/(.{4}).*/,"$1....."),
                  prizeName: (l.prizeName || "").replace(/(.{4}).*/, "$1....."),
                  time: formatDate(l.ctime)
                };
              });
            }
          }
        }
      });
    },
    // 切换卡券
    participationChange() {
      if (this.participationList.length >= 2) {
        this.i = this.i + 1;
        if (this.i == this.participationList.length) {
          this.i = 0;
        }
        this.participationImg = this.participationList[this.i].awardPicUrl; // 奖券图片地址
        this.getSite = this.participationList[this.i].awardJumpurl; // 领取卡券的地址
      }
    },
    // 隐藏手机弹出框
    handleCannelBtn() {
      this.valiadateFlag = false;
    },
    // 获取验证码
    handleGetCode(m) {
      var m = m.phone;
      let that = this;
      //获取验证码；
      Lib.ajax({
        url: "/act_v2/sendMessage",
        headers: {
          token: sessionStorage.getItem("token"),
          tokenId: sessionStorage.getItem("tokenId")
        },
        data: {
          mobile: m,
          orgCode: sessionStorage.getItem("orgCode"),
          scaleType: "bind_mobile"
        },
        success: function(res) {
          if (res.ret == "200000") {
            that.drawAlert({
              message: "验证码已发送"
            });
          } else {
            that.drawAlert({
              message: "验证码发送失败"
            });
          }
        }
      });
    },
    // 点击手机弹框确认按钮
    handleSubmitCode(c) {
      let that = this;
      var m = c.phone;
      var c = c.code;
      //判断验证码是否正确；
      Lib.ajax({
        url: "/act_v2/register",
        headers: {
          token: sessionStorage.getItem("token"),
          tokenId: sessionStorage.getItem("tokenId")
        },
        data: {
          mobile: m,
          smsCode: c,
          activityCode: Lib.getUrlQuery("activityCode"),
          score: 0,
          orgCode: sessionStorage.getItem("orgCode"),
          scaleType: "bind_mobile"
        },
        success: res => {
          if (res.ret == "200000") {
            that.valiadateFlag = false;
            //手机号验证码验证成功；
            that.message = "1";
            if (!sessionStorage.getItem("wx-info")) {
              //关注过公众号；
              that.alertFlag = true;
              if (that.awardType == "889") {
                // 判断是否是卡券
                location.href = that.getSite; // 直接去领取卡券
                return;
              }
              that.goAward();
            } else {
              //未关注过公众号；
              //去关注公众号；
              this.crCodeFlag = true;
              this.valiadateFlag = false;
              this.alertFlag = true;
            }
          } else if (res.ret === "400400") {
            if (res.message === "请填写验证码") {
              //验证码为空；
              this.message = "0";
            } else {
              //验证码不匹配；
              this.message = "2";
            }
          } else {
            console.log("其他错误");
          }
        }
      });
    },
    /* 控制（小黑弹框） [message：提示的信息，goHome：传入则回首页]*/
    drawAlert(obj) {
      obj = obj || {};
      let that = this;
      that.drawInfo = obj.message;
      that.drawAlertFlag = true;
      setTimeout(() => {
        that.drawAlertFlag = false;
        if (obj.goHome) {
                location.href = "../../views/menus/home.html?t=" +new Date()+"&sourceId=" + this.sourceId;
        }
      }, obj.time || 1000);
    },
    // 二维码的弹出框显示隐藏
    handleCannelCode() {
      this.crCodeFlag = false;
    }
  },
  components: {
    // 轮播组件
    SaBroadcast,
    crCode,
    valiadateAlert,
    drawAlert
  },
  mounted() {
    let that = this;
    if(sessionStorage.getItem("token") == null || sessionStorage.getItem("sn") == null || sessionStorage.getItem("code") == null) {
      window.location.href = "/s"
    }
    //滚动取消
    // setInterval(() => {
    //   that.scroll();
    // }, 5000);
  },
  created() {
    let that = this;
    /* 埋点数据 */
    Lib.ajax({
      url: "/platform_v2/getIndexPage",
      method: "post",
      data: {
        activityCode:Lib.getUrlQuery('activityCode'),
        moudleKey: "SCAN_CODE_CHECK"
      },
      success: res => {
        if (res.ret === "200000") {
          that.sourceId = res.data.pageId;
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
    this.scroll();
    /* 活动说明 */
    Lib.ajax({
      url: "/act_v2/queryActivityAwards",
      method: "post",
      headers: {
        token: sessionStorage.getItem("token"),
        tokenId: sessionStorage.getItem("tokenId")
      },
      data: {
        activityCode: Lib.getUrlQuery("activityCode"),
        code: sessionStorage.getItem("code"),
        sn: sessionStorage.getItem("sn")
      },
      success: res => {
        if (res.ret == 200000) {
          this.ActivityIntroductionInfo = res.data.ActivityV2.activityDoc.replace(/\s\S/g,function(n) {
              if (typeof n !== undefined) {
                return "<br/>" + n;
              }
            }
          );
        }
      },
      error: err => {
        alert(err.message);
      }
    });
  }
};
</script>
<style type="text/css" lang="less" scoped>
@keyframes scoopAnimate {
  from {
    transform: translate(120px, -290px) rotate(0deg);
  }
  to {
    transform: translate(80px, -196px) rotate(20deg);
  }
}
#container {
  overflow: hidden;
  width: 750px;
  height: 100%;
  .background {
    crcode {
      position: absolute;
      z-index: 99;
    }
    phone {
      position: absolute;
      z-index: 88;
    }
    // 底图
    .bottom {
      width: 750px;
      position: absolute;
      left: 0;
      top: 0;
    }
    // 中奖名单
    .broadcast {
      position: absolute;
      width: 638px;
      top: 1200px;
      height: 215px;
      left: 56px;
      .title {
        position: relative;
        width: 100%;
        height: 64px;
        background-color: #af560d;
        color: #f9f2c3;
        font-size: 32px;
        line-height: 64px;
        text-align: center;
        display: inline-block;
      }
      .scroll {
        position: relative;
        width: 100%;
        height: 126px;
        background-color: #fff;
        display: inline-block;
        li {
          margin: 0 20px;
          font-size: 24px;
          height: 50px;
          line-height: 50px;
        }
      }
    }
    // 中奖说明
    .rule {
      margin-top: 38px;
      position: absolute;
      width: 638px;
      height: 208px;
      top: 1460px;
      left: 56px;
      .title {
        position: relative;
        width: 100%;
        height: 58px;
        background-color: #af560d;
        color: #f9f2c3;
        font-size: 32px;
        line-height: 58px;
        text-align: center;
        display: inline-block;
      }
      .content {
        word-break: break-all; /* 让文字换行 */
        overflow-y: auto;
        position: relative;
        width: 100%;
        height: 360px;
        background-color: #fff;
        display: inline-block;
        p {
          position: relative;
          font-size: 24px;
          color: #511811;
          margin: 10px 50px 0 20px;
          line-height: 36px;
        }
      }
    }
    // 石头
    .stone-container {
      width: 100%;
      height: 500px;
      top: 600px;
      position: absolute;
      z-index: 1;
      li {
        position: relative;
        width: 194px;
        height: 170px;
        float: left;
        margin-left: 40px;
        margin-top: 60px;
        .stone {
          width: 194px;
          height: 200px;
        }
        .scoop {
          position: absolute;
          width: 150px;
          height: 119px;
          -webkit-animation: scoopAnimate 1s;
          animation: scoopAnimate 1s;
          display: none;
          transform: translate(80px, -196px) rotate(20deg);
        }
      }
    }
  }
  // 遮罩层
  .maskLayer {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    width: 750px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  // 弹出框
  .alert {
    z-index: 11;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 590px;
    height: 798px;
    margin: auto;
    .card-close {
      z-index: 14;
      position: absolute;
      top: -20px;
      right: -20px;
      background: url("./image/close.png") no-repeat;
      background-size: 64px 64px;
      width: 64px;
      height: 64px;
    }
    img {
      width: 590px;
      height: 798px;
    }
    .successIcon {
      position: absolute;
      left: 10px;
      top: -70px;
      width: 184px;
      height: 140px;
    }
    // 成功显示的信息样式
    .successContainer {
      font-size: 36px;
      color: #fff;
      font-family: "微软雅黑";
      width: 100%;
      height: calc(798px-334px);
      position: absolute;
      top: 334px;
      left: 0;
      text-align: center;
      .participation-container {
        width: 100%;
        height: 100%;
        margin-top: -20px;
        span {
          display: inline-block;
          font-size: 36px;
        }
        div {
          position: absolute;
          right: 68px;
          top: 220px;
          cursor: pointer;
          color: #fff;
          // font-size: 6px;
          border: 1px solid #fff; /* 1px */
          line-height: 36px;
          width: 120px;
          padding: 5px;
          border-radius: 5px;
        }
        img {
          display: inline-block;
          width: 460px;
          height: 160px;
          margin: 14px 0;
        }
        button {
          margin-top: 80px;
          width: 534px;
          height: 88px;
          font-size: 36px;
          font-family: "微软雅黑";
          color: rgba(255, 255, 255, 1);
          text-align: center;
          line-height: 88px;
          background-color: #ffb202;
          border-radius: 20px;
          letter-spacing: 10px;
        }
      }

      .awardTitle {
        display: inline-block;
        text-align: center;
        font-size: 50px;
        font-weight: 600;
      }
      .awardInfo {
        span {
          display: block;
          margin-top: 20px;
          font-family: "微软雅黑";
        }
      }
      .awardBtn {
        width: 534px;
        height: 88px;
        background-color: #ffb202;
        font-size: 36px;
        color: #fff;
        border-radius: 20px;
        letter-spacing: 10px;
        position: absolute;
        bottom: 64px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    // 失败显示的信息样式
    .errorContainer {
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      text-align: center;
      .picture {
        margin-bottom: 40px;
        display: block;
        width: 182px;
        height: 140px;
        background: url("./image/errorIcon.png");
        background-size: 182px 140px;
        transform: translate(182px, 66px);
      }
      .error-info {
        padding-top: 70px;
        span:first-child {
          display: inline-block;
          font-size: 36px;
          font-family: "微软雅黑";
          color: rgba(255, 255, 255, 1);
          margin-bottom: 34px;
        }
        span:last-child {
          display: inline-block;
          font-size: 96px;
          font-family: "微软雅黑";
          color: rgba(255, 255, 255, 1);
        }
      }
      .error-btn {
        width: 534px;
        height: 88px;
        font-size: 36px;
        font-family: "微软雅黑";
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 88px;
        margin-top: 190px;
        background-color: #ffb202;
        border-radius: 20px;
        letter-spacing: 10px;
      }
      .drawErr-btn {
        width: 534px;
        height: 88px;
        font-size: 36px;
        font-family: "微软雅黑";
        color: rgba(255, 255, 255, 1);
        line-height: 88px;
        position: absolute;
        left: 50%;
        bottom: 100px;
        transform: translateX(-50%);
        background-color: #ffb202;
        border-radius: 20px;
        letter-spacing: 10px;
      }
      p {
        margin-top: 100px;
        padding: 0 40px;
        font-size: 36px;
        font-family: "微软雅黑";
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>