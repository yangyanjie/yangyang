/**
 * Author: liubin
 * Creat Date: 2017-10-20
 * Description: 对常用函数的封装
 */
import Vue from 'vue'
import axios from 'axios'

//解决click点击300毫秒延时问题
import FastClick from 'fastclick'
FastClick.attach(document.body);

// 数据filter
import vueFilter from './vue.filter'

axios.defaults.withCredentials = true

let oproto = Object.prototype;
let serialize = oproto.toString;
let Rxports = {};
// ajax 请求
Rxports.ajax = function (opt, conf) {
    let opts = opt || {};
    let that = this;
    if (!opts.url) {
        alert('请填写接口地址');
        return false;
    }
    opts.headers = opts.headers || {
        'Content-Type':'application/x-www-form-urlencoded'
    };
    // 配置
    if (!opts.token && sessionStorage.token && sessionStorage.tokenId) {
        opts.headers.token   = sessionStorage.token;
        opts.headers.tokenId = sessionStorage.tokenId;
    }
    if (!opts.loading) {
        // Aloading();
    }
    axios({
        method: opts.type || 'post',
        url: opts.url,
        params: opts.data || {},
        headers: opts.headers,
        // baseURL:'https://localhost:8085',
        timeout: opts.time || 10*1000,
        responseType: opts.dataType || 'json'
    }).then((res)=>{
        // Ahidding();
        if(res.status == 200 ){
            if(opts.success){
                opts.success(res.data, res);
            }
        }else{
            if (data.error) {
                opts.error(error);
            }else{
                showTimeOutError(3000, res.data.message || '连接超时，请检查网络连接');
            }
        }
    }).catch((error)=>{
        let status = error.response && error.response.status;
        if ('ECONNABORTED' === error.code) {
            showTimeOutError(3000, '连接超时，请检查网络连接');
        } else if (status >= 500) {
            showTimeOutError(3000, '连接超时，请检查网络连接');
        } else {
            throw new Error(error);
        }
    });
};

// 数组判断
Rxports.isArrayLike = function (obj) {
    if (!obj) return false
    var n = obj.length
    if (n === (n >>> 0)) { //检测length属性是否为非负整数
        var type = serialize.call(obj).slice(8, -1)
        if (/(?:regexp|string|function|window|global)$/i.test(type))
            return false
        if (type === "Array")
            return true
        try {
            if ({}.propertyIsEnumerable.call(obj, "length") === false) { //如果是原生对象
                return /^\s?function/.test(obj.item || obj.callee)
            }
            return true
        } catch (e) { //IE的NodeList直接抛错
            return !obj.window //IE6-8 window
        }
    }
    return false
};

// 循环
Rxports.each = function (obj, fn) {
    var That = this;
    if (obj) { //排除null, undefined
        var i = 0
        if (That.isArrayLike(obj)) {
            for (var n = obj.length; i < n; i++) {
                if (fn(i, obj[i]) === false)
                    break
            }
        } else {
            for (i in obj) {
                if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
                    break
                }
            }
        }
    }
};

// 获取url参数
Rxports.getUrlQuery = function (name,Url) {
    //URL GET 获取值
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i"),
        url = Url || location.href;
    if (reg.test(url))
    return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};

// 获取cookie
Rxports.getCookie = function (name) {
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
};

//数据格式化；
Rxports.dataFormat = function (dataArr) {
    var result = {};
    dataArr.forEach(function (d) {
        if (result.hasOwnProperty(d.region)) {
            result[d.region].push(d);
        } else {
            result[d.region] = [d];
        }
    });
    return result;
}

// 错误弹窗
function showTimeOutError (time, msg) {
    var timeout = document.getElementById('ui-ajax-timeout');
    if (!!timeout) {
        return;
    }
    var div = document.createElement('div');
    var body = document.body.children[0];

    div.style.zIndex = 2000;
    div.style.width = '60%';
    div.style.height = '0.8rem';
    div.id = 'ui-ajax-timeout';
    div.style.position = 'absolute';
    div.style.bottom = '2rem';
    div.style.opacity = '1';
    div.style.background = 'rgba(0,0,0,.5)';
    div.style.fontSize = '0.4rem';
    div.style.color = '#fff';
    div.style.textAlign = 'center';
    div.style.lineHeight = '0.8rem';
    div.style.margin = '0 20%';
    div.style.border = '1px solid #ddd';
    div.style.borderRadius = '0.1rem';
    div.innerHTML = msg;
    body.parentNode.insertBefore(div, body);
    //自动隐藏
    setTimeout(function () {
        var timeoutHide = document.getElementById('ui-ajax-timeout');
        if (!!timeoutHide) {
            timeoutHide.remove();
        }
    }, time);
}

// ajax加载动画
function Aloading () {
    var load = document.getElementById('ui-ajax-loading');
    if (!!load) {
        return;
    }
    var div = document.createElement('div');
    var img = document.createElement('img');
    var body = document.body.children[0];
    img.style.top = '50%';
    img.style.left = '50%';
    img.style.width = '40px';
    img.style.height = '40px';
    img.style.position = 'absolute';
    img.style.transform = 'translate(-50%, -50%)';
    img.src = "https://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/img/loading.gif";

    div.style.zIndex = 2000;
    div.style.width = '100%';
    div.style.height = '100%';
    div.id = 'ui-ajax-loading';
    div.style.position = 'absolute';
    div.style.background = 'rgba(0,0,0,.1)';

    div.appendChild(img);
    body.parentNode.insertBefore(div, body);
    document.body.style.overflow = 'hidden';
}

// ajax隐藏动画
function Ahidding () {
    var load = document.getElementById('ui-ajax-loading');
    if (!!load) {
        load.remove();
        document.body.style.overflow = 'auto';
    }
}

export default Rxports;
