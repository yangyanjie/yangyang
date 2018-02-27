<template>
  <div class="ui-goMember">
      <img src="../../static/image/alert-member.png" alt="会员日弹框" class="png">
      <img src="../../static/image/close-member.png" alt="关闭按钮" class="close" @click="gohome()">
      <input type="button" value="点击进入活动" @click="goMember()" class="btn" v-show="!textOrBtn">
      <div class="text" v-show="textOrBtn">
        <p class="text_title">河北省内（除保定）用户看这里</p>
        <p class="text_text">扫码经典醇和、盛世迎宾－点击进入会员日活动页面</p>
        <p class="text_title"><span style="color:#fff"> - </span>允许开启地理定位</p>
        <p class="text_text">还可以参加钻石会员日活动，3000元大奖等你拿！</p>
      </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {

      }
    },
    props:['sourceId','textOrBtn'],
    methods:{
      goMember: function() {
        window.location.href =
          "./member-day.html?sourceId=" +
          this.sourceId +
          "&t=" +
          new Date().getTime();
      },
      gohome: function() {
        window.location.href =
          "../menus/home.html?sourceId=" +
          this.sourceId +
          "&t=" +
          new Date().getTime();
      },
    }
  }
</script>
<style lang="less" scoped>
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
      top: -100px;
      right: 10px;
      width: 59px;
      height: 59px;
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
    .text{
      padding-left: 30px;
      position: absolute;
      left: 0;
      bottom: 0px;
      background: #e0611e;
      width: (600px-30px);
      .text_title{
        margin-top: 10px;
        font-weight: 700;
        color: #000000;
        font-size: 26px;
      }
      .text_text{
        margin-top: 8px;
        margin-bottom: 6px;
        color: #ffffff;
        font-size: 20px;
      }
    }
  }
</style>

