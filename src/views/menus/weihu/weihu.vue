<template>
    <div id="root">
        <div class="header">
            <img src="./img/logo.png" id="logo" />
            <img src="./img/chilun.png" class="chilun"/>
            <img src="./img/heshibi.png" class="heshi">
        </div>
        <p>真伪鉴别系统升级中<br />感谢您的谅解</p>
        <p>全新升级 敬请期待</p>
        <p>请留好您的烟包，更多精彩，咱们1月1日见</p>
    </div>
</template>
<script type="text/javascript">
</script>
<style type="text/css" lang="less">
   .header {
       width: 100%;
       height: 610px;
       background: url('./img/header-bg.png') center no-repeat;
       background-size: cover;
       position: relative;
       #logo {
           width: 80px;
           position: absolute;
           left: 21px;
           top: 32px;
       }
       .chilun {
           width: 430px;
           position: absolute;
           left: 0;
           right: 0;
           top: 0;
           bottom: 0;
           margin: auto;
       }
       .heshi {
           width: 108px;
           height: 108px;
           position: absolute;
           left: 50%;
           transform: translateX(-50%);
           -webkit-transform: translateX(-50%);
           bottom: -54px;
       }
   }
   p {
       text-align: center;
   }
   p:nth-of-type(1) {
       padding-top: 103px;
       line-height: 80px;
       color: rgba(121,121,121,1);
       font-size: 34px;
   }
   p:nth-of-type(2) {
       padding-top: 95px;
       font-size: 54px;
       color: rgba(208,50,36,1);
   }
   p:nth-of-type(3) {
       padding-top: 27px;
       font-size: 26px;
       color: rgba(110,107,107,1);
   }
</style>