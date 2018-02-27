<template>
	<div class="drifter-container">
		<div class="background">
			<img src="./image/background.png" alt="网络失败">
			<div class="bottle">
				<ul>
					<li v-for="(v,i) in bottleSrc" :key="i" @click="maskOralertFlag()" md="hb_1_plp" md_name="点瓶子">
						<img :src="v">
					</li>
				</ul>
			</div>
		</div>
		<!-- 遮罩层 -->
		<div class="maskLayer" v-show="maskLayerFlag"></div>
		<!-- 验证手机 -->
	  <valiadate-alert v-if="valiadateFlag" @getcode="handleGetCode" @submitcode="handleSubmitCode" :msg="message" @handlecannel="handleCannelBtn"></valiadate-alert>
    <!-- 二维码 -->
		<crCode v-show="crCodeFlag" @handleclose="handleCannelCode"></crCode>
		<!-- 弹出框 -->
		<div class="alert" v-show="alertFlag">
			<!-- 那个遮罩层的图片 -->
			<div class="alert-coating" v-show="coatingFlag">
				<img src="./image/coating.png" id="redux">
				<p v-show="startFlag">刮开涂层即可获取验真鼓励金</p>
				<input type="button" value="开始刮奖" @click="animated()" v-show="startFlag" md="hb_2_plp" md_name="刮奖按钮">
			</div>
			<!-- 关闭按钮 -->
			<span class="card-close" @click="goHome()"></span>
			<div class="card-info">
				<div class="success" v-show="awardType != '0'"><!-- 有奖 -->
					<div class="success-particulars">
            <!-- 中的是积分或红包显示如下 -->
						<p v-if="awardType=='6'||awardType == '3' && score == '0'" >明天的你如钻石般闪耀</p>
            <!-- 红包和积分要显示的标题 -->
            <p v-if="score != '0' && awardType==3" class="score-title">恭喜您获得</p>
            <!-- 只是鼓励金 -->
						<p v-if="awardType == '3' && score == '0'" class="special"><span class="integral">{{m}}<em>元</em></span><span>鼓</span><span>励</span><span>金</span><span>送</span><span>给</span><span>你</span></p>
            <!-- 鼓励金加积分 -->
						<p v-if="score != '0' && awardType=='3'">{{m}}元鼓励金+{{score}}荷石币</p>
            <!-- 只是积分 -->
						<p v-if="awardType == '6'" class="special"><span class="integral">{{score}}</span><span>荷</span><span>石</span><span>币</span><span>送</span><span>给</span><span>你</span></p>
            <!-- 中的是奖券显示如下 -->
            <div class="participation-container" v-if="awardType == '889'">
              <p class="participation-title">参与奖</p>
              <div @click="participationChange()" v-show="participationList.length>=2" class="participation-toggle" md="hb_3_plp" md_name="换一个"><span class="participation-icon"></span>换一个</div>
              <img :src="participationImg" @click="goAward(1)" md="hb_4_plp" md_name="点图片领奖"> <!-- 传入 1 说明是领卡券的逻辑 -->
              <p class="participation-info">{{participationText}}</p>
              <span>点击图片即可领取</span>
            </div>  
					</div>
					<input v-if="awardType=='3' || awardType=='6'" type="button" value="赶紧收下" @click="goAward(0)" md="hb_5_plp" md_name="赶紧收下"><!-- 传入0是普通领奖 -->
				</div>
				<div class="error"  v-show="awardType =='0'"><!-- 无奖 -->
					<h1>谢谢参与</h1>
					<input type="button" value="确定" @click="Home()">
				</div>
        <div class="wrongMessage" v-show="ret != '200000'&& awardType != '0' && awardType != '1' && awardType != '3' && awardType != '6'&& awardType != '889'"><!-- 失败的抽奖提示的信息 -->
          <p>{{wrongMessae}}</p>
					<input type="button" value="确定" @click="goHome()">
        </div>
			</div>
		</div>
    <!-- 领取成功弹出框 -->
    <draw-alert v-show="drawAlertFlag" :drawInfo="drawInfo"></draw-alert>
    <!-- 会员日弹框 -->
    <member-day v-show="memberDayFlag" :sourceId="sourceId" :textOrBtn="textOrBtn"></member-day>
	</div>
</template>
<script type="text/javascript">
import Lib from 'assets/js/Lib.js'
import crCode from 'components/crCode.directive.vue' // 二维码弹框
import valiadateAlert from 'components/valiadate.directive.vue'
import drawAlert from 'components/draw.directive.vue' // 领取成功或失败的弹出框
import memberDay from 'components/member.directive.vue' // 会员日弹框
export default {
  data() {
    return {
      bottleSrc: [
        '../../static/piaoliuping/bottle1.png',
        '../../static/piaoliuping/bottle2.png',
        '../../static/piaoliuping/bottle3.png',
        '../../static/piaoliuping/bottle4.png',
        '../../static/piaoliuping/bottle5.png',
        '../../static/piaoliuping/bottle6.png'
      ],
      maskLayerFlag: false /* 遮罩层的显示和隐藏*/,
      alertFlag: false /* 弹出框的显示隐藏*/,
      coatingFlag: true, // 刮刮乐的遮罩层显示隐藏
      startFlag: true /* 开始按钮的显示隐藏 */,
      awardType: '', // 奖项类型（0谢谢参与，1实物，3红包，6积分, 889卡券)
      m: '', //显示中了多少元红包
      score: 0, // 积分
      id: '', // 在判断是老用户的时候用到
      crCodeFlag: false,
      participationList: [], // 奖券数据
      participationImg: '', // 奖券图片地址
      participationText: '', // 奖券信息
      getSite: '', // 领取卡券地址
      i: 0,
      drawInfo: '', // 领奖提示信息（黑色小~）
      drawAlertFlag: false, //领奖弹出框显示隐藏（黑色小~）
      ret: '', // 失败的信息显示隐藏（控制ret）
      wrongMessae: '', // 失败的信息提示
      valiadateFlag: false, // 引入手机弹框
      message: '',
      sourceId: '', // 埋点id
      memberDayFlag: false, // 会员日弹框显示隐藏
      textOrBtn:true, // 控制会员日弹框是显示 按钮 还是 文案 （true 是显示文案，false 是显示按钮）
    }
  },
  methods: {
    maskOralertFlag() {
      this.maskLayerFlag = true
      this.alertFlag = true
    },
    /* 抽奖 */
    animated() {
      let that = this
      Lib.ajax({
        url: '/act_v2/draw',
        headers: {
          token: sessionStorage.getItem('token'),
          tokenId: sessionStorage.getItem('tokenId')
        },
        data: {
          activityCode: Lib.getUrlQuery('activityCode'),
          orgCode: sessionStorage.getItem('orgCode'),
          moudleKey: 'SCAN_CODE_CHECK', // 关键字
          sn: sessionStorage.getItem('sn'),
          code: sessionStorage.getItem('code')
        },
        success: result => {
          if (result) {
            if (result.data) {
              that.awardType = result.data.awardType // 返回的奖项类型
              that.m = result.data.money // 中了多少钱
              // that.prizeName = result.data.score + "荷石币"; // 直接显示返回多少积分的全称【这里的积分是荷石币】
              that.score = result.data.score // 中了多少积分
              that.id = result.data.awardUser.id
              if (result.data.moreList) {
                that.participationList = result.data.moreList || [] // 卡券数据
                that.participationImg =
                  result.data.moreList && result.data.moreList[0].awardPicUrl // 卡券的图片链接地址
                that.participationText =
                  result.data.moreList && result.data.moreList[0].awardName // 卡券的介绍文字
                that.getSite =
                  result.data.moreList && result.data.moreList[0].awardJumpurl // 领取卡券的地址
              }
              that.startAward() // 初始化刮刮卡
              that.animated = null // 取消绑定
            } else {
              // 失败的抽奖处理(提示信息在刮奖显示)
              that.ret = result.ret
              that.wrongMessae = result.message
              that.startAward() // 初始化刮刮卡
            }
          }
        },
        error: err => {
          alert(err.message)
        }
      })
    },
    /* 领奖 */
    goAward(n) {
      let that = this
      Lib.ajax({
        url: '/user_v2/info',
        method: 'post',
        headers: {
          token: sessionStorage.getItem('token'),
          tokenId: sessionStorage.getItem('tokenId')
        },
        data: {
          orgCode: sessionStorage.getItem('orgCode'),
          sn: sessionStorage.getItem('sn'),
          moudleKey: 'SCAN_CODE_CHECK',
          code: sessionStorage.getItem('code')
        },
        success: res => {
          if (res.data && res.data.mobile == null) {
            that.valiadateFlag = true
            /* 新用户 */
          } else {
            /* 老用户 */
            if (!!sessionStorage.getItem('wx-info')) {
              // 没有关注公众号
              that.crCodeFlag = true
              that.alertFlag = true
            } else {
              // 直接领奖
              if (n == 1) {
                location.href = that.getSite // 直接去领取卡券
                that.alertFlag = true
                return
              }
              Lib.ajax({
                url: '/award_v2/getgift',
                method: 'post',
                headers: {
                  token: sessionStorage.getItem('token'),
                  tokenId: sessionStorage.getItem('tokenId')
                },
                data: {
                  activityId: Lib.getUrlQuery('activityCode'),
                  province: '',
                  city: '',
                  district: '',
                  mobile: res.data.mobile || '',
                  address: '',
                  username: res.data.nickname || '',
                  region: '',
                  orderChannel: 'SCAN_CODE_CHECK',
                  orgCode: sessionStorage.getItem('orgCode'),
                  id: that.id
                },
                success: res => {
                  if (res.ret == '200000') {
                    // 领取成功
                    if (sessionStorage.getItem('hasVip') == '0') {
                      // 没有会员日
                      that.drawAlert({
                        message: '领取成功',
                        goHome: 1,
                        time: 3000
                      })
                    } else {
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
                    // 领取失败
                     if (sessionStorage.getItem('hasVip') == '0') {
                      // 没有会员日
                       that.drawAlert({
                        message: '领取失败',
                        goHome: 1,
                        time: 3000
                      })
                    } else {
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
                },
                error: res => {
                  alert(res.message)
                }
              })
            }
          }
        }
      })
    },
    /* 刮刮功能初始化 */
    startAward() {
      this.startFlag = false
      $('#redux').eraser({
        size: 40, // 设置皮擦大小
        completeRatio: 0.8, // 设置擦出比例
        progressFunction: function(p) {
          if (p >= 0.7) {
            $('.alert-coating').css('display', 'none')
            $('#redux').eraser('clear')
          }
        }
      })
    },
    goHome() {
      location.href =
        '../../views/menus/home.html?t=' +
        new Date() +
        '&sourceId=' +
        this.sourceId
    },
    Home() {
      if (sessionStorage.getItem('hasVip') == '0') {
        // 没有会员日
        location.href =
          '../../views/menus/home.html?t=' +
          new Date() +
          '&sourceId=' +
          this.sourceId
      } else {
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
    },
    // 切换卡券
    participationChange() {
      if (this.participationList.length >= 2) {
        this.i = this.i + 1
        if (this.i == this.participationList.length) {
          this.i = 0
        }
        this.participationImg = this.participationList[this.i].awardPicUrl // 奖券图片地址
        this.participationText = this.participationList[this.i].awardName // 奖券信息
        this.getSite = this.participationList[this.i].awardJumpurl // 领取卡券的地址
      }
    },
    // 隐藏手机弹出框
    handleCannelBtn() {
      this.valiadateFlag = false
    },
    // 获取验证码
    handleGetCode(m) {
      var m = m.phone
      let that = this
      //获取验证码；
      Lib.ajax({
        url: '/act_v2/sendMessage',
        headers: {
          token: sessionStorage.getItem('token'),
          tokenId: sessionStorage.getItem('tokenId')
        },
        data: {
          mobile: m,
          orgCode: sessionStorage.getItem('orgCode'),
          scaleType: 'bind_mobile'
        },
        success: function(res) {
          if (res.ret == '200000') {
            that.drawAlert({
              message: '验证码已发送'
            })
          } else {
            that.drawAlert({
              message: '验证码发送失败'
            })
          }
        }
      })
    },
    // 点击手机弹框确认按钮
    handleSubmitCode(c) {
      let that = this
      var m = c.phone
      var c = c.code
      //判断验证码是否正确；
      Lib.ajax({
        url: '/act_v2/register',
        headers: {
          token: sessionStorage.getItem('token'),
          tokenId: sessionStorage.getItem('tokenId')
        },
        data: {
          mobile: m,
          smsCode: c,
          activityCode: Lib.getUrlQuery('activityCode'),
          score: 0,
          orgCode: sessionStorage.getItem('orgCode'),
          scaleType: 'bind_mobile'
        },
        success: that.handleSubmitCodeSucc
      })
    },
    // 点击手机弹框确认按钮的成功回调函数
    handleSubmitCodeSucc(res) {
      let that = this
      if (res.ret == '200000') {
        that.valiadateFlag = false
        //手机号验证码验证成功；
        that.message = '1'
        if (!sessionStorage.getItem('wx-info')) {
          //关注过公众号；
          if (that.awardType == '889') {
            // 判断是否是卡券
            location.href = that.getSite // 直接去领取卡券
            return
          } else {
            that.alertFlag = true
            that.goAward()
          }
        } else {
          //未关注过公众号；
          //去关注公众号；
          this.crCodeFlag = true
          this.valiadateFlag = false
          this.alertFlag = true
        }
      } else if (res.ret === '400400') {
        if (res.message == '请填写验证码') {
          //验证码为空；
          this.message = '0'
        } else {
          //验证码不匹配；
          this.message = '2'
        }
      } else {
        console.log('其他错误')
      }
    },
    /* 控制（小黑弹框） [message：提示的信息，goHome：传入则回首页]*/
    drawAlert(obj) {
      obj = obj || {}
      let that = this
      that.drawInfo = obj.message
      that.drawAlertFlag = true
      setTimeout(() => {
        that.drawAlertFlag = false
        if (obj.goHome) {
          location.href =
            '../../views/menus/home.html?t=' +
            new Date() +
            '&sourceId=' +
            this.sourceId
        }
      }, obj.time || 1000)
    },
    // 二维码的弹出框显示隐藏
    handleCannelCode() {
      this.crCodeFlag = false
    }
  },
  created() {
    let that = this
    /* 埋点数据 */
    Lib.ajax({
      url: '/platform_v2/getIndexPage',
      method: 'post',
      data: {
        activityCode: Lib.getUrlQuery('activityCode'),
        moudleKey: 'SCAN_CODE_CHECK'
      },
      success: res => {
        if (res.ret === '200000') {
          that.sourceId = res.data.pageId
          var src = 'https://weblog.taozuike.com/md/new_state.js'
          var Ele = document.getElementsByTagName('script')[0]
          var v =
            document.createElement('script') ||
            window.document.createElement('script')
          v.src = src
          v.async = true
          v.type = 'text/javascript'
          Ele.parentNode.insertBefore(v, Ele)
          window.getpagestatistics = function() {
            return {
              pageId: res.data.returnStr,
              sourceId: Lib.getUrlQuery('sourceId')
            }
          }
        }
      }
    })
  },
  mounted() {
    if(sessionStorage.getItem("token") == null || sessionStorage.getItem("sn") == null || sessionStorage.getItem("code") == null) {
      window.location.href = "/s"
    }
  },
  components: {
    crCode,
    // phone,
    valiadateAlert,
    drawAlert,
    memberDay
  }
}
</script>
<style type="text/css" lang="less" scoped>
@keyframes waggle {
  0% {
    transform: rotate(0deg);
  } /* 添加旋转角度，以下类似 */
  10% {
    transform: rotate(-2deg);
  }
  20% {
    transform: rotate(-4deg);
  }
  30% {
    transform: rotate(-6deg);
  }
  40% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  60% {
    transform: rotate(-8deg);
  }
  70% {
    transform: rotate(-6deg);
  }
  80% {
    transform: rotate(-4deg);
  }
  90% {
    transform: rotate(-2deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.drifter-container {
  width: 750px;
  height: 100%;
  position: absolute;
  .background {
    overflow: hidden;
    position: relative;
    width: 750px;
    height: 100%;
    > img {
      width: 750px;
      height: 100%;
    }
    > .bottle {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      > ul {
        position: relative;
        > li {
          position: absolute;
          -webkit-animation: waggle 1.5s infinte;
          animation: waggle 1.5s infinite;
        }
        > li:first-child {
          left: 230px;
          top: 450px;
          img {
            width: 80px;
            height: 98px;
          }
        }
        > li:nth-child(2) {
          left: 590px;
          top: 480px;

          img {
            width: 72px;
            height: 88px;
          }
        }
        > li:nth-child(3) {
          left: 320px;
          top: 600px;
          img {
            width: 100px;
            height: 120px;
          }
        }
        > li:nth-child(4) {
          left: 58px;
          top: 640px;
          img {
            width: 122px;
            height: 150px;
          }
        }
        > li:nth-child(5) {
          left: 600px;
          top: 700px;
          img {
            width: 100px;
            height: 120px;
          }
        }
        > li:nth-child(6) {
          left: 410px;
          top: 840px;
          img {
            width: 144px;
            top: 174px;
          }
        }
      }
    }
  }
  // 遮罩层
  .maskLayer {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    width: 750px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  // 弹出框
  .alert {
    z-index: 12;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 610px;
    height: 750px;
    margin: auto;
    .alert-coating {
      z-index: 10;
      bottom: 76px;
      left: 38px;
      width: 538px;
      height: 300px;
      position: absolute;
      p {
        font-size: 36px;
        font-family: '微软雅黑';
        color: rgba(226, 99, 99, 1);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 180px;
        white-space: nowrap;
        font-weight: 700;
      }
      input {
        z-index: 13;
        position: absolute;
        width: 342px;
        height: 70px;
        border-radius: 40px;
        background-image: linear-gradient(0deg, #e26363, #f07e5d);
        left: 50%;
        transform: translateX(-50%);
        bottom: 40px;
        color: #fff;
        font-size: 31px;
      }
      img {
        position: absolute;
        bottom: 0;
        left: 0px;
        width: 538px;
        height: 300px;
      }
    }
    .card-close {
      z-index: 14;
      position: absolute;
      top: -24px;
      right: -24px;
      background: url('./image/close.png') no-repeat;
      background-size: 64px 64px;
      width: 64px;
      height: 64px;
    }
    .card-info {
      width: 610px;
      height: 750px;
      background: url('./image/cardInfo.png') no-repeat;
      background-size: 610px 750px;
      .success {
        position: absolute;
        top: 380px;
        left: 0;
        width: 100%;
        height: 200px;
        .success-particulars {
          top: 30px;
          text-align: justify;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          .score-title {
            // 显示积分和红包的标题
            margin-bottom: 20px;
            text-align: center !important;
            text-align-last: center !important;
            margin-top: -14px;
            -webkit-text-stroke: 1.6px #e26363;
            color: #ffffff;
            font-size: 40px;
            text-shadow: 2px 2px 2px #e26363;
          }
          p {
            white-space: nowrap;
            text-align: justify;
            font-size: 34px;
            font-family: '微软雅黑';
            color: rgba(226, 99, 99, 1);
            p.special {
              display: -webkit-box;
              display: -webkit-flex;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-pack: justify;
              -webkit-justify-content: space-between;
              -ms-flex-pack: justify;
              justify-content: space-between;
              align-items: baseline;
            }
            .integral {
              display: inline-block;
              font-size: 50px;
              font-family: '微软雅黑';
              color: #e26363;
              em {
                font-weight: 400;
                font-size: 50px;
              }
            }
          }
          .participation-container {
            text-align: center;
            .participation-title {
              text-align: center !important;
              text-align-last: center !important;
              margin-top: -14px;
              -webkit-text-stroke: 1.6px #e26363;
              color: #ffffff;
              font-size: 40px;
              text-shadow: 2px 2px 2px #e26363;
            }
            .participation-toggle {
              position: absolute;
              right: -140px;
              top: -14px;
              cursor: pointer;
              .participation-icon {
                display: inline-block;
                background: url('./image/participation-icon.png') no-repeat -2px;
                width: 30px;
                height: 36px;
                background-size: 30px;
                vertical-align: middle;
              }
              color: #e26363;
              // font-size: 6px;
              border: 1px solid #e26363; /*1px*/
              text-align: center;
              line-height: 36px;
              width: 110px;
              border-radius: 6px;
            }
            img {
              display: inline-block;
              width: 218px;
              height: 80px;
              margin: 14px 0;
            }
            .participation-info {
              font-size: 26px;
              text-align: center;
              text-align-last: center;
              margin-bottom: 20px;
            }
            span {
              color: #6d6d6d;
              font-size: 20px;
              letter-spacing: -1px;
            }
          }
        }
        input {
          position: absolute;
          width: 342px;
          height: 70px;
          border-radius: 40px;
          background-image: linear-gradient(0deg, #e26363, #f07e5d);
          left: 50%;
          transform: translateX(-50%);
          bottom: -46px;
          color: #fff;
          font-size: 32px;
        }
      }
      .error {
        width: 100%;
        height: 100%;
        h1 {
          font-size: 60px;
          font-family: '微软雅黑';
          color: rgba(226, 99, 99, 1);
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 240px;
          font-weight: 500;
        }
        input {
          position: absolute;
          width: 342px;
          height: 70px;
          border-radius: 40px;
          background-image: linear-gradient(0deg, #e26363, #f07e5d);
          left: 50%;
          transform: translateX(-50%);
          bottom: 120px;
          color: #fff;
          font-size: 32px;
        }
      }
      .wrongMessage {
        width: 100%;
        height: 100%;
        p {
          color: #e26363;
          font-size: 28px !important;
          font-weight: 500;
          width: 400px;
          min-height: 60px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 230px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        input {
          position: absolute;
          width: 342px;
          height: 70px;
          border-radius: 40px;
          background-image: linear-gradient(0deg, #e26363, #f07e5d);
          left: 50%;
          transform: translateX(-50%);
          bottom: 120px;
          color: #fff;
          font-size: 32px;
        }
      }
    }
  }
}
</style>