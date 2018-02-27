/**
 * Author: zhaobaoli
 * Create Date: 2017-12-15
 * Description: 摇一摇 幸运奖页
 */
'use strict'
import Vue from 'vue'
import flex from 'assets/js/flex'              // 工具库
// 引入三个模板
import App2 from './shop-game.vue'

let App = App2

new Vue({
    render: h => h(App)
}).$mount('#app')