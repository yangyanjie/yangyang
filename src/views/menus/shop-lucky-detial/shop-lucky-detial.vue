<template>
    <!--详情-->
    <div class="detial-con">
        <header>
            <img class="head" :src="image" alt="">
            <p class="name">{{nickname}}</p>
            <div class="score">{{myLuckScoreData}} 幸运值</div>
        </header>
        <h4 class="title">幸运值明细</h4>
        <ul class="list">
            <li v-for="d in detialLuckScoreData">
                <div class="text">
                    <p class="reason">{{d.memberdayTypeName}}</p>
                    <p class="time">{{d.time}}</p>
                </div>
                <em class="score">{{d.type == 1 ? '+' : '-'}}{{d.luckscore}}</em>
            </li>
        </ul>
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
  // 是否跳转
  memberJump.isTime(function (t) {
  });
  let timeout = '';

  export default {
    created() {
      this.getLuckyDetial();
    },
    data() {
      return {
        myLuckScoreData: '', // 我的幸运值
        detialLuckScoreData: [], // 明细
        nickname: '',
        image: '',
        ifAlertMsg: false,
        alertText: '',
      }
    },
    methods: {
      // 幸运值明细
      getLuckyDetial() {
        Lib.ajax({
          url: "/memberDay/getLuckScoreDetail",
          method: 'get',
          headers: {
            appId: weixin_token.appid,
            openId: Lib.getCookie("openid"),
          },
          success: result => {
            if (result.ok) {
              this.detialLuckScoreData = result.data.list;
              this.nickname = result.data.nickname;
              this.image = result.data.image;
              this.myLuckScoreData = result.data.luckscore;
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

    /* 详情 */
    .detial-con {
        header {
            height: 360px;
            background: url(./img/lucky-detial-banner.png) no-repeat top center;
            background-size: 100% 100%;
            overflow: hidden;
            position: relative;
            text-align: center;
            .head {
                width: 148px;
                height: 148px;
                border-radius: 50%;
                display: block;
                margin: 61px auto 0;
            }
            .name {
                color: #fff;
                font-size: 28px;
                margin: 20px 0;
            }
            .score {
                display: inline-block;
                height: 50px;
                background: #FEDA3E;
                border-radius: 25px;
                color: #E94C2C;
                font-size: 28px;
                line-height: 50px;
                padding: 0 30px;
                text-align: center;
            }
        }
        .title {
            height: 70px;
            background: #eee;
            line-height: 70px;
            padding-left: 26px;
        }
        .list {
            background: #fff;
            padding-bottom: 10px;
            li {
                width: 730px;
                border-bottom: 1px solid #eee;
                margin-left: 20px;
                overflow: hidden;
                padding: 24px 0;
                .text {
                    width: 500px;
                    float: left;
                }
                .reason {
                    color: #444;
                    font-size: 28px;
                }
                .time {
                    color: #888;
                    font-size: 24px;
                    margin-top: 15px;
                }
                .score {
                    color: #444;
                    font-size: 32px;
                    float: right;
                    line-height: 62px;
                    margin-right: 30px;
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
