/**
 * Author: hanzha
 * Create Date: 2018-01-11
 * Description: 我的幸运值
 */
'use strict'
import Vue from 'vue'
import flex from 'assets/js/flex'              // 工具库
// 引入三个模板
import App2 from './shop-lucky.vue'

let App = App2

new Vue({
    render: h => h(App)
}).$mount('#app')