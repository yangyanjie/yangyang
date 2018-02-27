/**
 * Author: liubin
 * Create Date: 2017-12-26
 * Description: 微信分享公用
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
})(this, function () {
    'use strict';
    var shareTitle = "爱尚扫码活动火爆进行中";
    var shareDesc = "微信红包，砸金蛋，积分抽奖，多重奖励享不停！";
    var shareLink = window.location.origin + "/app-hebei/";
    var shareImg = "https://weiopn.oss-cn-beijing.aliyuncs.com/henanscan/leaf.png";
    wx.config({
        debug: false, //
        appId: weixin_token.appid, // 必填，公众号的唯一标识
        timestamp: weixin_token.timestamp, // 必填，生成签名的时间戳
        nonceStr: weixin_token.noncestr, // 必填，生成签名的随机串
        signature: weixin_token.signature,// 必填，签名，见附录1
        jsApiList: [
            'scanQRCode',
            'getLocation',
            "hideMenuItems",
            "hideAllNonBaseMenuItem"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
        wx.hideAllNonBaseMenuItem();
        // share();
    });

    function share(){
        wx.showOptionMenu();
        wx.onMenuShareTimeline({
            title: shareTitle, // 分享标题
            link: shareLink, // 分享链接
            imgUrl: shareImg,
            success: function () {
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
                //alert('已取消');
            },
            fail: function (res) {
                //alert(res);
            }
        });
        wx.onMenuShareQQ({
            title: shareTitle, // 分享标题
            link: shareLink, // 分享链接
            imgUrl:shareImg,
            desc: shareDesc, // 分享描述
            success: function (res) {
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
                //alert(res);
            }
        });
        wx.onMenuShareWeibo({
            title: shareTitle, // 分享标题
            link: shareLink, // 分享链接
            imgUrl:shareImg,
            desc: shareDesc, // 分享描述
            trigger: function (res) {
                //alert('用户点击发送给朋友');
            },
            success: function (res) {
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
                //alert(res);
            }
        });
        wx.onMenuShareQZone({
            title: shareTitle, // 分享标题
            desc: shareDesc, // 分享描述
            link: shareLink, // 分享链接
            imgUrl:shareImg, // 分享图标
            success: function () {

            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }
});






