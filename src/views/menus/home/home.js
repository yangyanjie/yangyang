/**
 * Author: linyongjin
 * Create Date: 2017-12-17
 * Description: 扫码验真页面
 */
'use strict'
import Vue from 'vue'
import Flex from 'assets/js/flex'
import App from './home.vue'

(function () {
    // IOS返回按键 好烦
    var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {
        (function(){
            pushHistory();
            setTimeout(function () {
                window.addEventListener("popstate", function(e) {
                    // 扫码进来 直接到开奖页 返回 跳过过度页
                    window.location.href = window.location.origin + "/app-hebei/views/menus/home.html?t="+(+new Date);
                }, false);
            }, 500)
        })();
        function pushHistory() {
            var state = {
                title: "title",
                url: window.location.href
            };
            window.history.pushState(state, state.title, state.url);
        }
    }
})()

new Vue({
    render: h => h(App)
}).$mount('#app')
