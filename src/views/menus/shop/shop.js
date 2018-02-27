/**
 * Author: liubin
 * Create Date: 2017-10-17
 * Description: 扫码验真页面
 */
'use strict'
import Vue from 'vue'
import flex from 'assets/js/flex'              // 工具库
// 引入三个模板
import App1 from './shop.vue'

let App = App1

new Vue({
    render: h => h(App)
}).$mount('#app')