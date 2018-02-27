<template>
  <div id="root">
      <img src="./img/wxScan-bg.png"/>
      <img src="./img/wxqrcode.png" />
  </div>
</template>
<script type="text/javaScript">
export default {
  data() {
      return {
          wxInfo: sessionStorage.getItem("wx-info")
      }
  },
  created(){
            Lib.ajax({
                url: '/platform_v2/getCommonPage',
                method: "post",
                data: {
                    moudleKey: "SCAN_CODE_CHECK_INVITE"
                },
                success: res => {
                    if (res.ret === "200000"){
                        var src = "https://weblog.taozuike.com/md/new_state.js";
                        var Ele = document.getElementsByTagName("script")[0];
                        var v = document.createElement("script") || window.document.createElement("script");
                        v.src = src;
                        v.async = true;
                        v.type = 'text/javascript';
                        Ele.parentNode.insertBefore(v,Ele);
                        window.getpagestatistics = function() {
                            return {
                                pageId: res.data.returnStr,
                                sourceId: Lib.getUrlQuery("sourceId")
                            }
                        };
                    }
                }
            })
  }
}
</script>
<style type="text/css" lang="less">
    html {
        height:  100%;
        position: relative;
        img:nth-of-type(1) {
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
        img:nth-of-type(2) {
            width: 349px;
            height: 349px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }

    }
</style>
