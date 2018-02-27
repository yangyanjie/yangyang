/**
 * Author: hanzha
 * Create Date: 2018-01-13
 * Description: 会员日微信分享公用
 */
import Lib from './Lib.js'

(function (global, factory) {
    // 插入微信JSDK
    function init(callback) {
        var src = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'; //微信JSDK
        var scr = global.document.getElementsByTagName('script')[0];
        var doc = global.document || window.document;
        var v   = doc.createElement('script');
        v.type  = 'text/javascript';
        v.async = true;
        v.src   = src;
        v.onload = function() {
            callback();
        }
        scr.parentNode.insertBefore(v, scr);
    }
    typeof wx === "undefined" ? init(factory) : factory();
})(window, function () {
    'use strict';

    function getCookie(name) {
        var cookie = "; " + document.cookie;
        var parts = cookie.split("; " + name + "=");
        var value = null;
        if(parts && parts.length === 2){
            var pos = parts[1].indexOf(";");
            //can not find ";", means only one cookie key-value. if use index pos -1, then the cookie value would minus the last pos char, it's wrong
            if (pos == -1){
                value = parts[1];
            } else {
                value = parts[1].slice(0, parts[1].indexOf(";"));
            }
        }
        return value;
    }

    var openKey = 'TOKEN-4567890123-'+window.location.host;

    var shareTitle = "每周六晚8:30,幸运摇大奖";
    var shareDesc = "点击Ta,助力好友赢幸运值!!!";
    // var shareLink = window.location.origin + "/memberDay/share/" + getCookie("openid");
    var shareLink = window.location.origin + "/memberDay/share/" + getCookie(openKey);
    var shareImg = "https://weiopn.oss-cn-beijing.aliyuncs.com/hebeizhongyan/md_share_img.jpg";

    wx.config({
        debug: false, //
        appId: weixin_token.appid, // 必填，公众号的唯一标识
        timestamp: weixin_token.timestamp, // 必填，生成签名的时间戳
        nonceStr: weixin_token.noncestr, // 必填，生成签名的随机串
        signature: weixin_token.signature,// 必填，签名，见附录1
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'showOptionMenu',
            'getLocation',
            'scanQRCode'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function () {
        share();
    });

    // 新建邀请
    var createInvitation = function() {
      Lib.ajax({
        url: "/memberDay/createInvitation",
        method: 'get',
        headers: {
          appId: weixin_token.appid,
          openId: Lib.getCookie("openid"),
        },
        success: result => {
          if (result.ok) {

          }
        },
        error: err => {
          alert(err.message);
        }
      });
    }

    function share(){
        wx.showOptionMenu();

        wx.onMenuShareTimeline({
            title: shareTitle, // 分享标题
            link: shareLink, // 分享链接
            imgUrl: shareImg,
            success: function (res) {
              createInvitation();
            },
            error: function (res) {
                alert(JSON.stringify(res))
            }
        });

        wx.onMenuShareAppMessage({
            title: shareTitle, // 分享标题
            link: shareLink, // 分享链接
            imgUrl:shareImg,
            desc: shareDesc, // 分享描述
            success: function (res) {
              createInvitation();
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
                //alert(res);
            }
        });
    }
});






