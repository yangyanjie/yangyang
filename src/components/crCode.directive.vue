<template>
	<div class="crCode-ui" style="z-index:60">
		<div class="crCode-container">
			<img src="../../static/image/background.png" class="crCode-bgc">
			<img src="../../static/image/close.png" class="crCode-close" @click="handleClose">
			<div class="crCode-info">
				<p>为了能及时通知您获奖动态以及新</p>
				<p>活动动态,</p>
				<p><em>请长按以下二维码图片完成关注,</em></p>
				<p>关注后奖品将发放至您的<em>个人中心。</em></p>
			</div>
			<div class="crCode-pic">
				<img :src="img">
			</div>
			<p>长按扫描二维码，关注公众号</p>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      img: sessionStorage.getItem("wx-info")
    };
  },
  methods: {
    handleClose() {
      this.$emit("handleclose");
    }
  }
};
</script>
<style lang="less">
.crCode-ui {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 20;
}
.crCode-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 620px;
  height: 831px;
  z-index: 20;
  .crCode-bgc {
    width: 620px;
    height: 831px;
  }
  .crCode-close {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 50px;
    height: 50px;
  }
  .crCode-info {
    font-size: 32px;
    position: absolute;
    top: 111px;
    left: 50%;
    transform: translateX(-46%);
    width: 512px;
    p {
      text-align: left;
      color: #c30707;
      line-height: 50px;
      em {
        font-weight: 700;
      }
    }
  }
  .crCode-pic {
    position: absolute;
    top: 361px;
    left: 50%;
    transform: translateX(-50%);
    img {
      width: 300px;
      height: 300px;
    }
  }
  > p {
    position: absolute;
    white-space: nowrap;
    left: 50%;
    bottom: 104px;
    transform: translateX(-50%);
    color: #c30707;
    font-size: 24px;
    font-family: "微软雅黑";
    font-weight: 600;
    border: 1px dashed #cccccc; /* 1px */
    background: url('../../static/image/juxing.png') no-repeat left;
    background-size: 440px 44px;
  }
}
</style>