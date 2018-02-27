/**
 * Author: linyongjin
 * Create Date: 2017-12-19
 * Description: 个人中心
 */
'use strict'
import Vue from 'vue'
// 引入三个模板
import Flex from 'assets/js/flex'
import App from './person.vue'

new Vue({
    render: h => h(App)
}).$mount('#app')