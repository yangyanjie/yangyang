<template>
 <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide"><img src="./image/1.jpg" class="ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.5s"></div>
      <div class="swiper-slide"><img src="./image/2.jpg" class="ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.5s"></div>
      <div class="swiper-slide"><img src="./image/3.jpg" class="ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.5s"></div>
      <div class="swiper-slide"><img src="./image/4.jpg" class="ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.5s"></div>
      <div class="swiper-slide"><img src="./image/5.jpg" class="ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.5s"></div>
      <div class="swiper-slide"><img src="./image/6.jpg" class="ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.5s"></div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  menthods: {},
  mounted(){
 var swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
      on:{
      init: function(){
        swiperAnimateCache(this); //隐藏动画元素 
        swiperAnimate(this); //初始化完成开始动画
      }, 
      slideChangeTransitionEnd: function(){ 
        swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
      } 
    }
    });
  }
};
</script>
 <style lang="less">
     html, body {
      position: relative;
      height: 100%;
      background: #fff;      
    }
    body {
      background: #fff;
      margin: 0;
      padding: 0;
    }
    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      img{
        width:100%;
      }
    }
      .swiper-pagination-bullet {
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      color:red;
      opacity: 1;
      border: 1px solid red;
      background: transparent;
    }
    .swiper-pagination-bullet-active {
      color:#fff;
      background: #007aff;
    }
  </style>