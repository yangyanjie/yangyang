/**
 * Author: zhaobaoli
 * Create Date: 2017-2-1
 * Description: 损失说明页
 */
'use strict'
import Vue from 'vue'
import flex from 'assets/js/flex'              // 工具库
// 引入三个模板
import App2 from './remedy.vue'

let App = App2

new Vue({
    render: h => h(App)
}).$mount('#app')