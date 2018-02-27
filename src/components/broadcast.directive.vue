<template>
    <!--如果要加自己写模版，0，1，2，，，，-->
    <!--if(!'')-->
    <ul ref="scroll" v-if="!conf.template">
        <li v-for="l in conf.list">恭喜{{l.tel}}&nbsp;&nbsp;&nbsp;&nbsp;获得<div class="money">{{l.money}}</div>元的红包</li>
    </ul>
    <!--else if('0')-->
    <ul ref="scroll" v-else-if="conf.template == '0'" class="ui-template-0">
        <div v-if="!conf.list.length" class="nothing">暂无中奖记录~</div>
        <li v-for="l in conf.list">恭喜<div class="tel ellipsis">{{l.tel}}</div><div class="money">{{l.money}}</div>&nbsp;{{l.time}}</li>
    </ul>
    <!--else if('1')-->
    <ul ref="scroll" v-else-if="conf.template == '1'" class="waZuanShi">
        <li v-for="(l,i) in conf.list" class="waZuanShi-li" :key="i"><div>恭喜&nbsp;{{l.awardNickName}}</div><div class="awardInfo">获得{{l.prizeName}}</div><div>{{l.time}}</div></li>
    </ul>
    <!--else if('2')-->
    <ul ref="scroll" v-else-if="conf.template == '2'">
        <li v-for="l in conf.list">
          <div class="ellipsis">{{l.name}}</div>
          <div class="txt">{{l.txt}}</div>
        </li>
    </ul>
    <!--else-->
    <ul ref="scroll" v-else>
        <li v-for="l in conf.list">
            请在此添加模板
        </li>
    </ul>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      conf: this.$props.config
    };
  },
  mounted() {
    this.$watch("conf.list", function() {
      if (this.conf.list.length) {
        this.initSroll(15, 1000);
      }
    });
  },
  methods: {
    initSroll: function(speed, delay) {
      let $scroll = this.$refs.scroll;
      let lh = $scroll.children[0].scrollHeight;
      let scrollInter = null;

      function firstScroll() {
        let $first = $scroll.children[0];
        let firstInter = null;
        $first.style.marginTop = 0;
        firstInter = setInterval(function() {
          if (lh <= -parseInt($first.style.marginTop)) {
            clearInterval(firstInter);
            firstInter = null;
            $scroll.appendChild($first.cloneNode(true));
            $scroll.lastChild.style.marginTop = 0;
            $first.remove();
            return;
          }
          $first.style.marginTop = parseInt($first.style.marginTop) - 1 + "px";
        }, speed);
      }
      if ($scroll.children.length <= (this.conf.len || 2)) {
        clearInterval(scrollInter);
        scrollInter = null;
      } else {
        scrollInter = setInterval(firstScroll, speed * lh + delay);
      }
    }
  },
  props: ["config"]
};
</script>
<style type="text/css" lang="less" scoped>
ul {
  height: 100%;
  width: 100%;
  overflow: hidden;
  li {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
    color: #342401;
    font-size: 28px;
    height: 40px;
    line-height: 40px;
    font-family: "微软雅黑";
    .money {
      position: relative;
      width: 60px;
      display: inline-block;
    }
  }
}
.ui-template-0 {
  padding: 0 20px;
  box-sizing: border-box;
  .nothing {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
  .tel {
    position: relative;
    width: 120px;
    display: inline-block;
  }
  .money {
    position: relative;
    width: 200px;
    display: inline-block;
    color: #ef0501;
  }
}
.waZuanShi {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .waZuanShi-li {
    div {
      width: 33.333333%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    word-break: break-all;
    position: relative;
    color: #511811;
    height: 40px;
    line-height: 40px;
    font-family: "微软雅黑";
    .awardInfo {
      width: 190px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: red;
      position: relative;
      display: inline-block;
    }
  }
}
</style>