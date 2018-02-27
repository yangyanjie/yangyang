/**
 * Author: liubin
 * Create Date: 2018-01-30
 * Description: 微信分享 有BUG
 */

/**
 * [params]
 * 名称          描述         类型         是否必须
 * imgUrl    图片分享链接     string         是
 * title     分享标题        string         是
 * link      分享链接        string         是
 * desc      分享描述        string         是
 * success   成功回调       function        否
 * error     失败回调       function        否
 * fail      错误回调       function        否
 */

import wx from 'weixin-js-sdk'

let wxShare = {};

// 微信配置
function wxConfig (jsApiList) {
    wx.config({
        debug: false,                       // 是否开启调试模式
        appId: weixin_token.appid,          // 必填，公众号的唯一标识
        timestamp: weixin_token.timestamp,  // 必填，生成签名的时间戳
        nonceStr: weixin_token.noncestr,    // 必填，生成签名的随机串
        signature: weixin_token.signature,  // 必填，签名，见附录1
        jsApiList: jsApiList
    });
}

// 分享配置
function menuShare (opts) {
    let dist = Object.assign({
        imgUrl: "",             // 分享图片
        title: "",              // 分享标题
        link: "",               // 分享链接
        desc: "",               // 分享描述
        success: function () {  // 成功回调
        },
        cancel: function (res) { // 失败回调
        }
    }, opts);
    wx.onMenuShareQQ(dist);
    wx.onMenuShareWeibo(dist);
    wx.onMenuShareQZone(dist);
    wx.onMenuShareTimeline(dist);
    wx.onMenuShareAppMessage(dist);
}

// 启用分享
wxShare.showShare = function (opts) {
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
        menuShare(opts);
    });
};

// 禁止分享
wxShare.hideShare = function () {
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
};

export default wxShare;
