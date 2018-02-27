/**
 * Author: liubin
 * Create Date: 2018-01-26
 * Description: 未完成 有BUG
 */
'use strict';
// 全局对象 公共方法
var G = {};
// 禁止微信修改字体
(function () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
　　} else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }
    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
        });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', {
                'fontSize': 0
            });
        });
    }
})();

// 华为手机 虚拟按键
(function () {

})();

// 微信分享
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
    function wxConfig (jsApiList) {
        wx.config({
            debug: false, //
            appId: weixin_token.appid, // 必填，公众号的唯一标识
            timestamp: weixin_token.timestamp, // 必填，生成签名的时间戳
            nonceStr: weixin_token.noncestr, // 必填，生成签名的随机串
            signature: weixin_token.signature,// 必填，签名，见附录1
            jsApiList: jsApiList
        });
    }
    // 分享
    function showShare (otps) {
        wxConfig([
            'scanQRCode',
            'getLocation',
            'showOptionMenu',
            'getLocation',
            'scanQRCode'
        ]);
        // 加载完成
        wx.ready(function () {
            wx.showOptionMenu();
            menuShareTimeline(opts);
            menuShareAppMessage(opts);
            menuShareQQ(opts);
            menuShareWeibo(opts);
        });
    }

    // 禁止分享
    function hideShare (otps) {
        wxConfig([
            'scanQRCode',
            'getLocation',
            'hideMenuItems',
            'hideAllNonBaseMenuItem'
        ]);
        // 加载完成
        wx.ready(function () {
            wx.hideAllNonBaseMenuItem();
        });
    }

    function menuShareTimeline (opts) {
        wx.onMenuShareTimeline({
            title: opts.title || "", // 分享标题
            imgUrl: opts.img || "",  // 分享图片
            link: opts.link || "",   // 分享链接
            desc: opts.desc || "",   // 分享描述
            success: function () {
            },
            error: function (res) {
            },
            fail: function (res) {
            }
        });
    }

    function menuShareAppMessage (opts) {
        wx.onMenuShareAppMessage({
            title: opts.title || "", // 分享标题
            imgUrl: opts.img || "",  // 分享图片
            link: opts.link || "",   // 分享链接
            desc: opts.desc || "",   // 分享描述
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });
    }

    function menuShareQQ (opts) {
        wx.onMenuShareQQ({
            title: opts.title || "", // 分享标题
            imgUrl: opts.img || "",  // 分享图片
            link: opts.link || "",   // 分享链接
            desc: opts.desc || "",   // 分享描述
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });
    }

    function menuShareWeibo(opts) {
        wx.onMenuShareWeibo({
            title: opts.title || "", // 分享标题
            imgUrl: opts.img || "",  // 分享图片
            link: opts.link || "",   // 分享链接
            desc: opts.desc || "",   // 分享描述
            trigger: function (res) {
            },
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });
    }

    function menuShareQZone (opts) {
        wx.onMenuShareQZone({
            title: opts.title || "", // 分享标题
            imgUrl: opts.img || "",  // 分享图片
            link: opts.link || "",   // 分享链接
            desc: opts.desc || "",   // 分享描述
            success: function () {
            },
            cancel: function () {
            }
        });
    }

    G.wxShowShare = showShare;
    G.wxhideShare = hideShare;

    // 暴漏接口
    window._ = Object.assign({}, window._, G);
});


