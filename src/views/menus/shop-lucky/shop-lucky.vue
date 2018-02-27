<template>
    <div class="lucky-main">
        <!--头部-->
        <header>
            <div class="luck"></div>
            <div class="my-lucky">
                我的幸运值<a class="detial" :href="'../menus/shop-lucky-detial.html?t='+tDate">明细</a>
                <p class="inte">{{myLuckScoreData}}</p>
            </div>
            <button v-if="isExchangeTime" @click="popShow()" class="exchange">幸运值即将清空,点击兑换荷石币</button>
            <button v-if="!isExchangeTime" disabled="disabled" class="exchange">每周六21:00开放兑换荷石币</button>
        </header>

        <!--提示：分享、规则-->
        <div class="prompt-con">
            <div class="icon"></div>
            <div @click="alertMsg('赶快邀请小伙伴参加吧!')" class="text">
                <h3>邀请好友获得更多幸运</h3>
                <em>好友点击、评论均有奖励哦</em>
            </div>
            <a class="rule" :href="'../activity/member-day.html?t='+tDate">活动规则</a>
        </div>

        <!--主区域-->
        <div class="main">
            <!--导航-->
            <ul class="nav">
                <li :class="{active:num == 0}" @click="navChange(0)">我的邀请</li>
                <li :class="{active:num == 1}" @click="navChange(1)">好友评论</li>
            </ul>

            <!--邀请-->
            <div class="invite" v-if="num == 0">
                <ul>
                    <li v-for="d in inviteData">
                        <img :src="d.image" alt="">
                        <h5 class="name ellipsis">{{d.nickname}}</h5>
                        <em class="prompt">已助力</em>
                        <span class="score">幸运值 +{{d.luckscore}}</span>
                    </li>
                </ul>
            </div>

            <!--评论-->
            <div class="comment" v-if="num == 1">
                <ul>
                    <li v-for="d in commentData">
                        <img :src="d.image" alt="">
                        <div class="text-con">
                            <h5 class="name ellipsis">{{d.nickname}}</h5>
                            <em class="text ellipsis">{{d.content}}</em>
                            <p class="time">{{d.time}}</p>
                        </div>
                        <span class="score">幸运值 +{{d.luckscore}}</span>
                    </li>
                </ul>
            </div>

            <!--无数据-->
            <div class="empty" v-if="num == 0 && inviteData.length == 0 || num == 1 && commentData.length == 0">
                <p>还没有好友{{num == 0 ? '点击' : '评论'}}</p>
                <p>好友点击进入和评论均有幸运值奖励哦</p>
            </div>
        </div>

        <!--弹窗-->
        <div v-if="popupShow" class="popup">
            <div class="shadow"></div>
            <div class="popup-con">
                <div class="icon"></div>
                <div v-show="!popSucShow">
                    <p>您的剩余幸运值共可兑换</p>
                    <span>{{exchangeValue}}荷石币</span>
                    <em v-if="canExchange">确认兑换？</em>
                    <em v-if="!canExchange">幸运值不足，无法兑换~</em>

                    <div class="popup-footer">
                        <button @click="popConfirm()" :disabled="!canExchange" class="confirm">确定</button>
                        <button @click="popClose()" class="cancel">取消</button>
                    </div>
                </div>

                <div v-show="popSucShow">
                    <p class="suc-text">兑换成功!</p>
                    <button @click="popClose()" class="suc-confirm">确定</button>
                </div>
            </div>
        </div>

        <!-- 提示框 -->
        <div :class="{'alert-show':ifAlertMsg}" class="alert-msg">
            <p>{{alertText}}</p>
        </div>
    </div>
</template>

<script>
  import Lib from 'assets/js/Lib.js'
  // 跳转逻辑
  import memberJump from "assets/js/memberday_jump.js";
  // 微信分享
  import wxShare from "assets/js/wx_memberday_share.js";
  let timeout = '';

  export default {
    created() {
      var that = this;
      this.getLuckyScore();
      this.getInviteData();
      this.getCommentData();
      // 是否到兑换时间
      memberJump.isTime(function (t) {
        that.isExchangeTime = memberJump.isExchange;
      });
    },
    data() {
      return {
        myLuckScoreData: '', // 我的幸运值
        exchangeValue: '',  // 可兑换的荷石币值
        inviteData: [], // 邀请数据
        commentData: [], // 评论数据
        num: 0, // nav当前索引
        canExchange: true,  // 幸运值兑换的荷石币是否大于0，去改变确认按钮状态是否可点击，以及文字显示差异
        popupShow: false, // 弹窗
        popSucShow: false, // 成功弹窗
        isExchangeTime: false, // 兑换时间
        nickname: '',
        avatar: '',
        tDate: new Date().getTime(),
        ifAlertMsg: false,
        alertText: '',
      }
    },
    methods: {
      // 我的幸运值
      getLuckyScore() {
        Lib.ajax({
          url: "/memberDay/getMyLuckScore",
          method: 'get',
          headers: {
            appId: weixin_token.appid,
            openId: Lib.getCookie("openid"),
          },
          success: result => {
            if (result.ok) {
              this.myLuckScoreData = result.luckscore;
            } else {
              this.alertMsg(result.msg);
            }
          },
          error: err => {
            this.alertMsg(err.message);
          }
        });
      },
      // 出现弹窗
      popShow() {
        // 获取可兑换的值
        Lib.ajax({
          url: "/memberDay/getAvailableScore",
          method: 'get',
          headers: {
            appId: weixin_token.appid,
            openId: Lib.getCookie("openid"),
          },
          data: {
            changeLuckScore: this.myLuckScoreData,
          },
          success: result => {
            if (result.ok) {
              this.exchangeValue = result.heshiCoin;
              if(this.exchangeValue == 0 || this.myLuckScoreData < 200) {
                this.canExchange = false; // 可兑换值为0时，设置;可兑换值大于等于200时，才可以点击
              }
              // 弹窗状态
              this.popSucShow = false;
              this.popupShow = true;
            } else {
              this.alertMsg(result.msg);
            }
          },
          error: err => {
            this.alertMsg(err.message);
          }
        });
      },
      // 确认兑换
      popConfirm() {
        // 兑换接口
        Lib.ajax({
          url: "/memberDay/createAndChange",
          method: 'get',
          headers: {
            appId: weixin_token.appid,
            openId: Lib.getCookie("openid"),
          },
          data: {
            memberDayType: '4',
            changeLuckScore: this.myLuckScoreData,
          },
          success: result => {
            if (result.ok) {
              // 获取最新积分
              this.getLuckyScore();

              // 弹窗状态
              this.popSucShow = true;
            } else {
              this.alertMsg(result.msg);
            }
          },
          error: err => {
            this.alertMsg(err.message);
          }
        });
      },
      // 关闭弹窗
      popClose() {
        this.popupShow = false;
      },
      // tab切换
      navChange(index) {
        this.num = index;
      },
      // 邀请数据
      getInviteData() {
        Lib.ajax({
          url: "/memberDay/getMyInvitation",
          method: 'get',
          headers: {
            appId: weixin_token.appid,
            openId: Lib.getCookie("openid"),
          },
          success: result => {
            if (result.ok) {
              this.inviteData = result.data || [];
            } else {
              this.alertMsg(result.msg);
            }
          },
          error: err => {
            this.alertMsg(err.message);
          }
        });
      },
      // 评论数据
      getCommentData() {
        Lib.ajax({
          url: "/memberDay/getMyComment",
          method: 'get',
          headers: {
            appId: weixin_token.appid,
            openId: Lib.getCookie("openid"),
          },
          success: result => {
            if (result.ok) {
              this.commentData = result.data || [];
            } else {
              this.alertMsg(result.msg);
            }
          },
          error: err => {
            this.alertMsg(err.message);
          }
        });
      },
      // 弹出提示
      alertMsg(text) {
        // 多次调用时，先清除timeout，防止闪烁
        if(timeout) {
          clearTimeout(timeout);
        }
        let that = this; // ???这里为什么
        that.alertText = text;
        that.ifAlertMsg = true;
        timeout = setTimeout(function() {
          that.ifAlertMsg = false;
        }, 3000);
      },
    }
  }
</script>

<style type="text/css" lang="less" scoped>
    /* 省略号 */
    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .lucky-main {
        width: 100%;
        max-width: 1000px;
        height: 100%;
        background: #eee;
        line-height: 1;
        margin: 0 auto;
        overflow-y: auto;
        position: absolute;
        top: 0;
        left: 0;

        /* 头部 */
        header {
            height: 360px;
            background: url(./img/lucky-header-bg.png) no-repeat top center;
            background-size: 100% 100%;
            overflow: hidden;
            position: relative;

            /*四叶草*/
            .luck {
                width: 79px;
                height: 79px;
                background: url(./img/lucky-header-luck.png) no-repeat top center;
                background-size: contain;
                margin: 60px auto 26px;
            }

            /*我的幸运值*/
            .my-lucky {
                color: #fff;
                cursor: pointer;
                font-size: 36px;
                font-weight: bold;
                line-height: 1;
                text-align: center;
                position: relative;
                /*明细*/
                .detial {
                    height: 34px;
                    border: 1px solid #fff;
                    border-radius: 17px;
                    color: #fff;
                    font-size: 28px;
                    line-height: 34px;
                    padding: 0 13px;
                    position: absolute;
                    margin-left: 24px;
                }
                /*幸运值*/
                .inte {
                    font-size: 42px;
                    margin-top: 21px;
                }
            }

            .exchange {
                width: 557px;
                height: 149px;
                background: url(./img/lucky-header-change.png) no-repeat top center;
                background-size: contain;
                color: #DB1113;
                font-size: 30px;
                position: absolute;
                left: 0;
                right: 0;
                top: 243px;
                margin: 0 auto;
                padding-bottom: 20px;
                text-align: center;
                &:disabled {
                    color: #666;
                }
            }
        }

        /* 提示：分享、规则 */
        .prompt-con {
            height: 115px;
            background: #fff;
            margin: 21px auto;
            overflow: hidden;
            position: relative;
            .icon {
                width: 36px;
                height: 38px;
                background: url(./img/lucky-header-share.png) no-repeat top center;
                background-size: contain;
                position: absolute;
                top: 37px;
                left: 37px;
            }
            .text {
                margin-left: 95px;
            }
            h3 {
                color: #333;
                font-size: 32px;
                line-height: 1;
                margin: 30px 0 6px;
            }
            em {
                color: #9B9B9B;
                font-size: 22px;
            }
            .rule {
                height: 46px;
                border: 1px solid #F83F2B;
                border-radius: 21px;
                color: #F83F2B;
                font-size: 32px;
                line-height: 46px;
                padding: 0 12px;
                position: absolute;
                top: 27px;
                right: 18px;
            }
        }

        /* 主区域 */
        .main {
            /*导航*/
            .nav {
                height: 94px;
                background: #fff;
                overflow: hidden;
                li {
                    width: 50%;
                    color: #333;
                    font-size: 32px;
                    float: left;
                    line-height: 94px;
                    text-align: center;
                    transition: all 0.1s linear;
                }
                li.active {
                    background: #FC3732;
                    color: #fff;
                }
            }

            /*空*/
            .empty {
                color: #9B9B9B ;
                font-size: 34px;
                line-height: 48px;
                margin-top: 110px;
                text-align: center;
            }

            /*邀请*/
            .invite {
                padding: 5px 30px;
                li {
                    border-bottom: 1px solid #dedede;
                    line-height: 80px;
                    margin: 35px 2px 0 2px;
                    overflow: hidden;
                    padding-bottom: 14px;
                    img {
                        width: 80px;
                        height: 80px;
                        background: #fff;
                        float: left;
                    }
                    .name {
                        width: 180px;
                        color: #333 ;
                        font-size: 28px;
                        float: left;
                        margin: 0 41px 0 20px;

                    }
                    .prompt {
                        color: #FC3732 ;
                        font-size: 28px;
                    }
                    .score {
                        color: #FF7A00;
                        font-size: 28px;
                        font-weight: bold;
                        float: right;
                        margin-right: 10px;
                    }
                }
            }

            /*评论*/
            .comment {
                padding: 5px 30px;
                li {
                    border-bottom: 1px solid #dedede;
                    line-height: 1;
                    margin: 35px 2px 0 2px;
                    overflow: hidden;
                    padding-bottom: 14px;
                    img {
                        width: 80px;
                        height: 80px;
                        background: #fff;
                        float: left;
                    }
                    .text-con {
                        width: 427px;
                        float: left;
                        margin: 0 50px 0 20px;
                        overflow: hidden;
                    }
                    .name {
                        width: 180px;
                        color: #333 ;
                        font-size: 28px;
                    }
                    .text {
                        color: #666 ;
                        display: block;
                        font-size: 28px;
                        margin: 20px 0 18px;
                    }
                    .time {
                        color: #999 ;
                        font-size: 24px;
                    }
                    .score {
                        width: 86px;
                        color: #FF7A00;
                        font-size: 28px;
                        font-weight: bold;
                        float: right;
                        line-height: 38px;
                        margin: 4px 20px 0 0;
                        text-align: center;
                    }
                }
            }
        }

        /* 弹窗 */
        .popup {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            /*弹窗阴影*/
            .shadow {
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                position: absolute;
                top: 0;
                left: 0;
            }
            /*弹窗主体*/
            .popup-con {
                width: 620px;
                height: 522px;
                background: #fff;
                border-radius: 10px;
                font-size: 34px;
                line-height: 1;
                overflow: hidden;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                .icon {
                    width: 138px;
                    height: 138px;
                    background: url(./img/lucky-pop-icon.png) no-repeat center top;
                    background-size: contain;
                    margin: 48px auto 26px;
                }
                p {
                    color: #515151;
                }
                span {
                    color: #040404;
                    display: block;
                    margin: 15px 0 60px;
                }
                em {
                    color: #515151;
                    display: block;
                    font-weight: bold;
                    text-indent: 20px;
                }
            }
            /*弹窗底部按钮*/
            .popup-footer {
                width: 100%;
                height: 88px;
                border-top: 1px solid #eee;
                position: absolute;
                left: 0;
                bottom: 0;
                button {
                    width: 310px;
                    height: 87px;
                    background: none;
                    font-size: 34px;
                    float: left;
                    transition: all 0.3s ease-in-out;
                    &:active {
                        background: #f1f1f1;
                    }
                    &:disabled {
                        color: #b5b5b5;
                    }
                }
                .confirm {
                    border-right: 1px solid #eee;
                    color: #F06C00;
                }
            }

            /*成功后弹窗内容*/
            .suc-text {
                font-weight: bold;
                margin-top: 50px;
            }
            .suc-confirm {
                width: 590px;
                height: 88px;
                background: linear-gradient(#FF9600, #FF7200);
                border-radius: 8px;
                color: #fff;
                font-size: 34px;
                letter-spacing: 9px;
                margin-top: 135px;
                text-indent: 7px;
                transition: all 0.3s ease-in-out;
                &:active {
                    transform: scale(0.98);
                }
            }
        }
    }

    // 提示框
    .alert-msg {
        width: 540px;
        background: rgba(0,0,0,0.7);
        border-radius: 20px;
        box-sizing: border-box;
        color: #fff;
        font-size: 30px;
        line-height: 50px;
        padding: 60px;
        position: fixed;
        top: 50%;
        left: 0;
        right: 0;
        margin: 100px auto 0;
        text-align: center;
        transition: all 0.3s ease-in-out;
        /*opacity: 0;*/
        display: none;
        &.alert-show {
            /*opacity: 1;*/
            display: block;
        }
    }
</style>
