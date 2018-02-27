/**
 * Author: hanzha, liubin
 * Create Date: 2018-01-30
 * Description: 年终奖微信分享 拷贝会员日
 */

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
            if (pos == -1){
                value = parts[1];
            } else {
                value = parts[1].slice(0, parts[1].indexOf(";"));
            }
        }
        return value;
    }

    var openKey = 'TOKEN-4567890123-'+window.location.host;

    var shareTitle = "抽“钻石”跑步来领钻石年终奖";
    var shareDesc = "点击帮TA助力福气值吧！";
    var shareLink = window.location.origin + "/yearAward/share/" + getCookie(openKey);
    var shareImg = "http://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/img/nianzj.jpg";

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

    function share(){
        wx.showOptionMenu();

        wx.onMenuShareTimeline({
            title: shareTitle, // 分享标题
            link: shareLink, // 分享链接
            imgUrl: shareImg,
            success: function (res) {
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
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });
    }
});

