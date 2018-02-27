/**
 * Author: zhaobaoli
 * Create Date: 2017-1-2
 * Description: 致歉信页面
 */
'use strict'
import Vue from 'vue'
import flex from 'assets/js/flex'              // 工具库
// 引入三个模板
import App2 from './shop-apologize.vue'

let App = App2

new Vue({
    render: h => h(App)
}).$mount('#app')