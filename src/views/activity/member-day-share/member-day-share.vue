<template>
    <div class="share-main">
        <div class="share-desc">
            <div class="luck-value">幸运值：{{myLuckScoreData}}</div>
        </div>

        <div class="share-con">
            <div class="share-get">
                <i class="share-get-icon"></i>
                <i class="share-get-tip">品吸心得</i>
                <a class="my-share-get" :href="'../activity/member-day.html?from=share&t='+tDate">我也要攒幸运值</a>
            </div>

            <div class="commont-show">
                <ul v-if="commentData.length != 0" class="commont-show-con" >
                    <li class="commont-show-item" v-for="item in commentData" :key="item.id">
                        <img class="commont-show-item-img" :src="item.image" alt="">
                        <div class="commont-show-item-con">
                            <span class="commont-show-item-nickname">{{item.nickname}}</span>
                            <span class="commont-show-item-contents ellipsis">{{item.content}}</span>
                            <div class="commmont-show-item-date">
                                <span class="item-date">{{item.time}}</span>
                            </div>
                        </div>
                    </li>
                </ul>

                <!--无数据-->
                <div class="empty" v-if="commentData.length == 0">
                    <p>还没有评论</p>
                    <p>评论后好友会有幸运值奖励哦</p>
                </div>
            </div>

            <div class="commont-con">
                <input v-model="commentText" type="text" class="commit-text" placeholder="我的品吸心得..."/>
                <span @click="setComment()" class="commont-sumit">发送</span>
            </div>
        </div>

        <!-- 提示框 -->
        <div :class="{'alert-show':ifAlertMsg}" class="alert-msg">
            <p>{{alertText}}</p>
        </div>
    </div>
</template>

<script type="text/javascript" scoped>
  import Lib from 'assets/js/Lib.js'
  // 跳转逻辑
  import memberJump from "assets/js/memberday_jump.js";
  // 是否跳转
  memberJump.isTime(function (t) {
  });

  let shareOpenId = s_public.getQueryString("openid");
  let timeout = '';

  export default {
    mounted() {
      this.clickShare();
      this.getLuckyScore();
      this.getCommentData();
    },
    data() {
      return {
        myLuckScoreData: '',
        commentData: [],
        commentText: '',
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
            openId: shareOpenId,
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
      // 评论数据
      getCommentData() {
        Lib.ajax({
          url: "/memberDay/getMyComment",
          method: 'get',
          headers: {
            appId: weixin_token.appid,
            openId: shareOpenId,
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
      // 评论
      setComment() {
        if(this.commentText) {
          let that = this;
          Lib.ajax({
            url: "/memberDay/clickAndComment",
            method: 'get',
            data: {
              shareOpenid: shareOpenId,
              memberDayType: '3',
              content: that.commentText,
            },
            success: result => {
              if (result.ok) {
                // 获取最新评论列表
                that.getCommentData();
                that.commentText = '';// 清空输入框
                if(this.commentData.length > 0) {
                  document.getElementsByClassName('commont-show-con')[0].scrollTop = 0;
                }
                if(result.first) {
                  that.alertMsg('您为好友增加了'+result.luckscore+'点幸运值');
                }
              } else {
                this.alertMsg(result.msg);
              }
            },
            error: err => {
              this.alertMsg(err.message);
            }
          });
        } else {
          this.alertMsg('请输入评论内容');
        }
      },
      // 好友进入加幸运值
      clickShare() {
        Lib.ajax({
          url: "/memberDay/clickAndComment",
          method: 'get',
          data: {
            memberDayType: '2',
            shareOpenid: shareOpenId,
          },
          success: result => {
            if (result.ok) {
              if(result.first) {
                this.alertMsg('您为好友增加了'+result.luckscore+'点幸运值');
              }
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
    ::-webkit-input-placeholder {
        color: #999;
    }

    .share-main {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fff;
    }
    .share-desc {
        overflow: hidden;
        width: 750px;
        height: 402px;
        background: url(./img/share-desc.png) no-repeat center;
        background-size: 100% 100%;
    }
    .share-desc .luck-value {
        margin: 316px 256px 0 258px;
        width:236px;
        height:52px;
        font-size:28px;
        background:rgba(255,246,192,1);
        border-radius: 26px;
        color:rgba(228,41,34,1);
        text-align: center;
        line-height:52px;
    }
    .share-con {
        height: 778px;
        background:rgba(247,247,247,1);
    }
    .share-get {
        padding: 0 20px 0 30px;
        height: 92px;
        background:#fff;
        font-size:34px;
    }
    .commont-show {

    }
    .commont-con {
        position: fixed;
        left: 0;
        bottom: 0;
        width:750px;
        background:rgba(247,247,247,1);
        box-shadow: 0 0px 5px rgba(0,0,0,0.3);
    }
    .commit-text {
        padding: 20px 30px;
        float: left;
        width: 504px;
        height: 60px;
        line-height: 60px;
        font-size: 30px;
        color: #666;
    }
    .commont-sumit {
        z-index: 2;
        float: left;
        width: 186px;
        height: 100px;
        font-size: 34px;
        font-family: 'PingFangSC-Medium';
        text-align: center;
        line-height: 100px;
        background: linear-gradient(to bottom, #FF9600  ,#FF7200);
        color:rgba(255,255,255,1);
        transition: all 0.3s ease-in-out;
        &:active {
            transform: scale(0.98);
        }
    }
    .share-get-icon {
        margin: 26px 10px 0 0;
        float: left;
        width:44px;
        height:42px;
        background: url(./img/share-get-icon.png) no-repeat center;
        background-size: cover;
    }
    .my-share-get {
        margin-top: 20px;
        float: right;
        width:254px;
        height:52px;
        font-size:28px;
        font-family:'PingFangSC-Regular';
        color:rgba(240,108,0,1);
        text-align: center;
        line-height:52px;
        border: 1px solid #F06C00;
        border-radius: 26px ;
    }
    .share-get-tip {
        height: 100%;
        line-height: 92px;
    }
    .commont-show {
        height: 615px;
        /*空*/
        .empty {
            color: #9B9B9B ;
            font-size: 34px;
            line-height: 48px;
            margin-top: 110px;
            text-align: center;
        }
    }
    .commont-show-con {
        height: 615px;
        overflow-y: scroll;

    }
    .commont-show-item {
        margin-left: 32px;
        float: left;
        height: 174px;
        border-bottom: 1px solid #ccc;
    }
    .commont-show-item-img {
        float: left;
        margin: 30px 20px 0 0;
        width: 80px;
        height: 80px;

    }
    .commont-show-item-con {
        padding-top: 28px;
        float: left;
        width:588px;
        height: 174px;
    }
    .commont-show-item-nickname, .commont-show-item-contents{
        display: block;
        height: 48px;
        font-size: 28px;
        color: #333;
        line-height: 48px;
    }
    .commont-show-item-contents {
        color: #666;
    }
    .commmont-show-item-date {
        height: 38px;
        font-size: 24px;
        color: #999;
        line-height: 38px;
    }
    .item-date {
        float: left;
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