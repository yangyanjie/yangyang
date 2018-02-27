/**
 * Author: liubin
 * Create Date: 2017-01-31
 * Description: 特定时间跳转到指定页面
 */

/**
 * [params]
 * 名称          描述         类型         是否必须
 * time        跳转时间      string         否
 * url         跳转地址      string         否
 * callback    回调函数      function       否
 */

import Lib from './Lib'

function checkDate (time, res, url, callback) {
    res = res || {};
    time = time || res.drawTime || +new Date;
    let nowTime = res.systemTime || +new Date;
    let leftTime = time - nowTime;
    if (leftTime > 0) {
        callback(res);
        setTimeout(() => {
            window.location.href = window.location.origin + url;
        }, leftTime);
    } else {
        window.location.href = window.location.origin + url;
    }
}

export default {
    insertTime: function (opts) {
        let time = '',
            callback = opts.callback || function (res) {},
            url = opts.url || "/app-hebei/views/menus/home.html?t="+(+new Date);
        if (!!opts.time) {
            time = +new Date(opts.time);
        }
        Lib.ajax({
            url: '/yearAward/getServerTime',
            success: res => {
                checkDate(time, res, url, callback);
            },
            error: res => {
                checkDate(time, res, url, callback);
            }
        });
    }
}