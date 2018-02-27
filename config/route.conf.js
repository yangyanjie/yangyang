/**
 * Author: liubin
 * Create Date: 2017-10-25
 * Description: 接口配置转发
 */

// version:     接口版本
// routepath:   请求接口
// description: 接口描述
// proxyTarget: 转发地址

'use strict'
module.exports = [
    { proxyTarget: 'https://hbh.saotx.cn', routepath: '/act_v2/*' },
    { proxyTarget: 'https://hbh.saotx.cn', routepath: '/a/tokenjs' },
    { proxyTarget: 'https://hbh.saotx.cn', routepath: '/act/rule/*' },
    { proxyTarget: 'https://hbh.saotx.cn', routepath: '/award_v2/*' },
    { proxyTarget: 'https://hbh.saotx.cn', routepath: '/memberDay/*' },
    { proxyTarget: 'https://hbh.saotx.cn', routepath: '/yearAward/*' },
    { proxyTarget: 'https://hbh.saotx.cn', routepath: '/hnscan/iknow' },
    { proxyTarget: 'https://hbh.saotx.cn', routepath: '/user_v2/info' },
    { proxyTarget: 'https://hbh.saotx.cn', routepath: '/award/regions' },
    { proxyTarget: 'https://hbh.saotx.cn', routepath: '/s/checkCodeOut' },
    { proxyTarget: 'https://hbh.saotx.cn', routepath: '/platform_v2/**' },
    { proxyTarget: 'https://hbh.saotx.cn', routepath: '/score/uc/*/vcode' },
    { proxyTarget: 'https://hbh.saotx.cn', routepath: '/score/uc/*/bindMobile' },
    { proxyTarget: 'http://portal.v2.taozuike.com', routepath: '/saotx/outer/*' }
];
