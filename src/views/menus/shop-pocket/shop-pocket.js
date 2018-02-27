/**
 * Author: liubin
 * Create Date: 2017-12-18
 * Description: 我的口袋页面
 */
'use strict'
import Vue from 'vue'
import flex from 'assets/js/flex'              // 工具库
// 引入三个模板
import App2 from './shop-pocket.vue'

let App = App2

new Vue({
    render: h => h(App)
}).$mount('#app')