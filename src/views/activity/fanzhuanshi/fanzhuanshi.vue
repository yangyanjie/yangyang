<template>
    <div class="ui-fzs">
        <sa-page-load ishow="1"></sa-page-load>
        <img src="./img/bg@2x.png" class="bg">
        <div class="content first">
            <img src="./img/zs@2x.png" @click="!unbind && drow()" md="hb_1_fzs" md_name="翻钻石">
            <img src="./img/zs@2x.png" @click="!unbind && drow()" md="hb_1_fzs" md_name="翻钻石">
            <img src="./img/zs@2x.png" @click="!unbind && drow()" md="hb_1_fzs" md_name="翻钻石">
            <img src="./img/zs@2x.png" @click="!unbind && drow()" md="hb_1_fzs" md_name="翻钻石">
        </div>
        <div class="content second">
            <img src="./img/zs@2x.png" @click="!unbind && drow()" md="hb_1_fzs" md_name="翻钻石">
            <img src="./img/zs@2x.png" @click="!unbind && drow()" md="hb_1_fzs" md_name="翻钻石">
            <img src="./img/zs@2x.png" @click="!unbind && drow()" md="hb_1_fzs" md_name="翻钻石">
            <img src="./img/zs@2x.png" @click="!unbind && drow()" md="hb_1_fzs" md_name="翻钻石">
        </div>
        <div class="broadcast">
            <div class="title">中奖名单</div>
            <div class="scroll">
                <sa-broadcast :config="conf"></sa-broadcast>
            </div>
        </div>
        <div class="rule">
            <div class="title">活动说明</div>
            <div class="content">
                <p v-html="dec">{{dec}}</p>
            </div>
        </div>
        <!--中奖信息弹窗-->
        <div class="ui-popup invisible" ref="popup">
            <div class="content" ref="pcontent">
                <p class="ptitle">恭喜您获得</p>
                <div :class="awardIdx==idx?'':'invisible'" v-for="(award, idx) in awards">
                    <img :src="award.awardPicUrl" />
                    <a :href="award.awardJumpurl" class="btn-default" md="hb_4_dyb" md_name="确定领奖按钮">确定</a>
                </div>
                <button type="button" class="btn-change" @click="changeImg(awards, awardIdx)">换一个</button>
            </div>
        </div>
        <!--绑定手机号弹窗-->
        <div class="ui-phone invisible" ref="phone">
            <form class="content">
                <img src="./img/close@2x.png" class="close" @click="gohome">
                <h4>验证手机</h4>
                <div class="phone-block">
                    <input type="number" name="phone" value="pnum" placeholder="手机号" @keyup="phoneChange">
                    <p class="help-block" :class="{'invisible':phoneValidate}">*请输入正确的手机号</p>
                    <hr>
                </div>
                <div class="code-block">
                    <div class="input-block">
                        <input type="number" name="code" value="pcode" placeholder="验证码" @keyup="codeChange">
                        <p class="help-block" :class="{'invisible':codeValidate}">*请输入正确的验证码</p>
                    </div>
                    <div class="get-code">
                        <button type="button" @click="!count && phoneValidate && (phoneValidate!==1) && getCode()" md="hb_3_fzs" md_name="获取验证码按钮">获取验证码</button>
                    </div>
                    <hr>
                </div>
                <button type="button" class="btn-confirm" @click="phoneValidate && codeValidate && (codeValidate!==1) && bindPhone()" md="hb_2_fzs" md_name="绑定手机号按钮">确认</button>
            </form>
        </div>
        <!--二维码弹窗-->
        <div class="ui-wxpic invisible" ref="wxpic">
            <div class="img-content">
                <img src="./img/close@2x.png" class="close" @click="gohome">
                <p>为了能及时通知您获奖动态以及新活动动态，</p>
                <p class="img-title">请长按以下二维码图片完成关注，</p>
                <p>关注后奖品将发放至您的个人中心。</p>
                <img class="png" :src="wxpng" />
                <p class="img-bottom">长按扫描二维码，关注公众号</p>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import Lib from 'assets/js/Lib.js'
    import SaPageLoad from 'components/pageload.directive'
    import SaBroadcast from 'components/broadcast.directive'

    let lastRefresh = '';
    function formatDate (date) {
        let D = new Date(date);
        let Y = D.getFullYear();
        let M = D.getMonth() + 1;
        let d = D.getDate();
        return D.getFullYear() + '/' + (M < 9 ? '0'+M : M) + '/' + (d < 9 ? '0'+d : d);
    }
    export default {
        data() {
            return {
                dec: '',
                count: 0,
                pnum: '',
                pcode: '',
                awards: [],
                awardIdx: 0,
                unbind: false,
                codeValidate: 1,
                phoneValidate: 1,
                conf: {
                    len: 2,
                    template: '0',
                    list: []
                },
                wxpng: sessionStorage.getItem('wx-info'),
                sourceId: ""
            }
        },
        beforeCreate() {
            Lib.ajax({
                url: '/user_v2/info',
                method: 'post',
                data: {
                    moudleKey: 'SCAN_CODE_CHECK',
                    sn: sessionStorage.getItem('sn'),
                    code: sessionStorage.getItem('code'),
                    orgCode: sessionStorage.getItem("orgCode")
                },
                success: function (res) {
                    if (res.ret === '200000') {
                        var data = res.data || {};
                        sessionStorage.setItem('nickname', data.nickname || '');
                        sessionStorage.setItem('mobile', data.mobile || '');
                    }
                }
            });
        },
        created() {
            //埋点函数
            Lib.ajax({
                url: '/platform_v2/getActivityPage',
                method: 'post',
                data: {
                    moudleKey: "SCAN_CODE_CHECK_ACTIVITY_8",
                    activityCode: Lib.getUrlQuery('activityCode')
                },
                success: res => {
                    if (res.ret === "200000") {
                        this.sourceId = res.data.pageId;
                        var src = "https://weblog.taozuike.com/md/new_state.js";
                        var Ele = document.getElementsByTagName("script")[0];
                        var v = document.createElement("script") || window.document.createElement("script");
                        v.src = src;
                        v.async = true;
                        v.type = 'text/javascript';
                        Ele.parentNode.insertBefore(v,Ele);
                        window.getpagestatistics = function() {
                            return {
                                pageId: res.data.returnStr,
                                sourceId: Lib.getUrlQuery("sourceId")
                            }
                        };
                    }
                }
            })
        },
        components: {
            SaPageLoad, SaBroadcast
        },
        mounted() {
            let that = this;
            if(sessionStorage.getItem("token") == null || sessionStorage.getItem("sn") == null || sessionStorage.getItem("code") == null) {
                window.location.href = "/s"
            }
            //滚动取消
            // setInterval(function () {
            //     that.scroll();
            // }, 5000)
            that.scroll();
            // 活动说明
            Lib.ajax({
                url: '/act_v2/queryActivityAwards',
                method: 'post',
                data: {
                    moudleKey: 'SCAN_CODE_CHECK',
                    sn: sessionStorage.getItem('sn'),
                    code: sessionStorage.getItem('code'),
                    orgCode: sessionStorage.getItem("orgCode"),
                    activityCode: Lib.getUrlQuery('activityCode')
                },
                success: function (res) {
                    if (res.ret === '200000') {
                        var data = res.data || {};
                        if (!!data.ActivityV2.activityDoc) {
                            that.dec = data.ActivityV2.activityDoc.replace(/\s\S/g, function(n){
                                if (typeof n !== 'undefined') {
                                    return '<br/>' + n;
                                }
                            }) || '';
                        }
                    }
                }
            });
            // 软键盘问题
            // that.fixphone();
        },
        methods: {
            fixphone: function () {
                let that = this;
                let wmax = document.documentElement.clientHeight;
                window.onresize = function () {
                    let wmin = document.documentElement.clientHeight;
                    // 唤醒软键盘
                    if (wmax > wmin) {
                        that.$refs.phone.children.scrollTop = 0;
                    }
                }
            },
            changeImg: function (arr, idx) {
                if(++idx >= arr.length){
                    idx = 0;
                }
                this.$data.awardIdx = idx;
            },
            gohome: function () {
                window.location.href = '../menus/home.html?sourceId=' + this.sourceId+"&t=" + new Date().getTime();
            },
            popupfn: function (params) {
                if (params) {
                    // 展示中奖信息
                    this.$refs.popup.className = 'ui-popup';
                    document.body.style.overflow = 'hidden';
                } else {
                    // 隐藏中奖信息
                    this.$refs.popup.className = 'ui-popup invisible';
                    document.body.style.overflow = 'auto';
                }
                return this;
            },
            phonefn: function (params) {
                if (params) {
                    // 展示绑定手机
                    this.$refs.phone.className = 'ui-phone';
                    document.body.style.overflow = 'hidden';
                } else {
                    // 隐藏绑定手机
                    this.$refs.phone.className = 'ui-phone invisible';
                    document.body.style.overflow = 'auto';
                }
                return this;
            },
            wxpic: function (params) {
                if (params) {
                    // 展示二维码
                    this.$refs.wxpic.className = 'ui-wxpic';
                    document.body.style.overflow = 'hidden';
                } else {
                    // 隐藏二维码
                    this.$refs.wxpic.className = 'ui-wxpic invisible';
                    document.body.style.overflow = 'auto';
                }
                return this;
            },
            scroll: function (params) {
                let that = this;
                Lib.ajax({
                    url: '/award_v2/scrollAward',
                    method: 'post',
                    data: {
                        lastRefresh: lastRefresh,
                        activityCode: Lib.getUrlQuery('activityCode')
                    },
                    loading: true,
                    success: function (res) {
                        if (res.ret === '200000') {
                            lastRefresh = res.data.lastRefresh || '';
                            that.conf.list = res.data.list.map(l => {
                                let money = '';
                                switch(l.awardType) {
                                    case 1:
                                        money = '获得'+l.awardName;
                                        break;
                                    case 3:
                                        if (l.money) {
                                            money = '获得'+l.money+'元的红包';
                                        } else {
                                            money = '获得'+l.money+'元的红包+'+l.awardName;
                                        }
                                        break;
                                    case 6:
                                        money = '获得'+l.awardName;
                                        break;
                                    case 889:
                                        money = '获得'+l.awardName;
                                        break;
                                    default:
                                        console.log('type: '+l.awardType);
                                }
                                return {
                                    tel: l.awardNickName || '',
                                    money: money,
                                    time: formatDate(l.ctime)
                                }
                            });
                        }
                    }
                });
            },
            drow: function () {
                let that = this;
                // 解除事件绑定，避免多次点击
                this.$data.unbind = true;
                // 抽奖
                Lib.ajax({
                    url: '/act_v2/draw',
                    method: 'post',
                    data: {
                        moudleKey: 'SCAN_CODE_CHECK',
                        sn: sessionStorage.getItem('sn'),
                        code: sessionStorage.getItem('code'),
                        orgCode: sessionStorage.getItem("orgCode"),
                        activityCode: Lib.getUrlQuery('activityCode')
                    },
                    success: function (res) {
                        // 这里还没写完奖品类型
                        if (res.ret === "200000") {
                            let thx = '';
                            let data = res.data || {};
                            if (data.awardType === 1) {
                                console.log('实物');
                            } else if (data.awardType === 3) {
                                console.log('红包');
                                if (data.score) {
                                    thx += '<p class="pprize">'+data.prizeName+'</p>';
                                    thx += '<p class="pptitle">恭喜您获得</p>';
                                    thx += '<p class="pptype">'+data.awardPrice+'元';
                                    thx += '+'+data.score+'荷石币</p>';
                                } else {
                                    thx += '<p class="ptitle">恭喜您获得</p>';
                                    thx += '<p class="presult"><em>'+data.awardPrice+'</em>元</p>';
                                    thx += '<p class="ptype">鼓励金</p>';
                                }
                                thx += '<button type="button" class="btn-default" md="hb_4_fzs" md_name="确定领奖按钮">立即收下</button>';
                            } else if (data.awardType === 6) {
                                console.log('积分');
                                thx += '<p class="ptitle">恭喜您获得</p>';
                                thx += '<p class="pscore"><em>'+data.score+'</em></p>';
                                thx += '<p class="ptype">荷石币</p>';
                                thx += '<button type="button" class="btn-default" md="hb_4_fzs" md_name="确定领奖按钮">立即收下</button>';
                            } else if (data.awardType === 889) {
                                console.log('卡券');
                                that.$data.awards = data.moreList;
                                that.popupfn(1).wxpic(0).phonefn(0);
                                return;
                            } else {
                                thx += '<p class="ptitle">很遗憾,未中奖</p>';
                                thx += '<p class="pnothing">谢谢参与</p>';
                                thx += '<button type="button" class="btn-default" md="hb_4_fzs" md_name="确定领奖按钮">确认</button>';
                                that.$refs.pcontent.innerHTML = thx;
                                that.$refs.pcontent.lastChild.onclick = that.gohome;
                                that.popupfn(1).wxpic(0).phonefn(0);
                                return;
                            }
                            that.$refs.pcontent.innerHTML = thx;
                            that.$refs.pcontent.id = data.id;
                            that.$refs.pcontent.phone = data.awardUser.mobile;
                            that.$refs.pcontent.lastChild.onclick = that.take;
                            that.popupfn(1).wxpic(0).phonefn(0);
                        } else {
                            alert(res.message || "发送失败");
                        }
                    }
                });
            },
            getGift: function (id, phone) {
                let that = this;
                // 关注公众号
                if (!!sessionStorage.getItem('wx-info')) {
                    that.popupfn(0).wxpic(1).phonefn(0);
                    return '';
                }
                Lib.ajax({
                    url: '/award_v2/getgift',
                    method: 'post',
                    data: {
                        activityId: Lib.getUrlQuery('activityCode'),
                        province: "",
                        city: "",
                        district: "",
                        mobile: sessionStorage.mobile || phone || '',
                        address: "",
                        username: sessionStorage.nickname || '',
                        region: "",
                        orderChannel: "SCAN_CODE_CHECK",
                        orgCode: sessionStorage.getItem("orgCode"),
                        id: id
                    },
                    success: function (res) {
                        if (res.ret === '200000') {
                            alert('领取成功');
                            that.gohome();
                        } else {
                            alert('领取失败');
                        }
                    }
                });
            },
            take: function () {
                // 绑定手机号
                if (!sessionStorage.getItem('mobile')) {
                    this.popupfn(0).wxpic(0).phonefn(1);
                    return '';
                }
                // 直接调接口跳走
                this.getGift(this.$refs.pcontent.id, this.$refs.pcontent.phone);
            },
            getCode: function () {
                let $btn = event.target, countInter;
                let that = this;
                this.$data.count = 29;
                $btn.innerText = '重新发送(60s)';
                countInter = setInterval(function () {
                    $btn.innerText = '重新发送('+ (that.$data.count--) +'s)';
                    if (!that.$data.count) {
                        clearInterval(countInter);
                        countInter = null;
                        $btn.innerText = '获取验证码';
                    }
                }, 1000);
                // 调接口
                Lib.ajax({
                    url: '/act_v2/sendMessage',
                    method: 'post',
                    data: {
                        mobile: that.$data.pnum || '',
                        orgCode: sessionStorage.getItem("orgCode"),
                        scaleType: "bind_mobile"
                    },
                    success: function (res) {
                        if (res.ret === "200000") {
                            console.log("发送成功");
                        } else {
                            alert("发送失败")
                        }
                    }
                })
            },
            bindPhone: function () {
                let that = this;
                Lib.ajax({
                    url: '/act_v2/register',
                    method: 'post',
                    data: {
                        score: 0,
                        scaleType: "bind_mobile",
                        mobile: that.$data.pnum || '',
                        smsCode: that.$data.pcode || '',
                        orgCode: sessionStorage.getItem("orgCode"),
                        activityCode: Lib.getUrlQuery('activityCode')
                    },
                    success: function (res) {
                        if (res.ret === "200000") {
                            console.log("绑定成功");
                            sessionStorage.mobile = that.$data.pnum;
                            that.take();
                        } else {
                            alert("验证码错误")
                        }
                    }
                })
            },
            phoneChange: function () {
                let phone = event.target.value || '';
                if (/^1[0-9]{2}\d{8}$/.test(phone)) {
                    this.phoneValidate = true;
                } else {
                    this.phoneValidate = false;
                }
                this.pnum = phone;
            },
            codeChange: function () {
                let code = event.target.value || '';
                if (/\d{4}$/.test(code)) {
                    this.$data.codeValidate = true;
                } else {
                    this.$data.codeValidate = false;
                }
                this.pcode = code;
            }
        }
    }
</script>
<style type="text/css" lang="less">
    @keyframes popup {
        0% { transform: scale(0) }
        40% { transform: scale(1.1) }
        60% { transform: scale(1) }
        80% { transform: scale(.9) }
        100% { transform: scale(1) }
    }
    .ui-fzs {
        .bg {
            position: absolute;
            width: 750px;
            height: 1720px;
            top: 0;
            left: 0;
        }
        .content {
            position: absolute;
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
            img {
                width: 156px;
                float: left;
                margin: 0 10px;
                transform: rotateY(-180deg)
            }
            .turn {
                transform: rotateY(0deg);
                transition: transform 1s;
            }
        }
        .first {
            top: 538px;
        }
        .second {
            top: 719px;
        }
        .broadcast {
            position: absolute;
            width: 638px;
            top: 982px;
            height: 215px;
            left: 56px;
            .title {
                position: relative;
                width: 100%;
                height: 64px;
                background-color: #f08b00;
                color: #f9f2c3;
                font-size: 32px;
                line-height: 64px;
                text-align: center;
                display: inline-block;
            }
            .scroll {
                position: relative;
                width: 100%;
                height: 154px;
                background-color: #fff;
                display: inline-block;
                li {
                    font-size: 24px;
                    height: 50px;
                    line-height: 50px;
                }
            }
        }
        .rule {
            position: absolute;
            width: 638px;
            height: 208px;
            top: 1243px;
            left: 56px;
            .title {
                position: relative;
                width: 100%;
                height: 58px;
                background-color: #e69622;
                color: #f9f2c3;
                font-size: 32px;
                line-height: 58px;
                text-align: center;
                display: inline-block;
            }
            .content {
                position: relative;
                width: 100%;
                height: 150px;
                background-color: #fff;
                overflow: auto;
                p {
                    position: relative;
                    font-size: 24px;
                    color: #511811;
                    margin: 10px 50px 0 22px;
                    line-height: 36px;
                }
            }
        }
        .ui-popup {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, .5);
            z-index: 1000;
            .content {
                position: relative;
                width: 588px;
                height: 742px;
                margin: 212px auto 0;
                background: url(./img/bgpopup@2x.png) no-repeat;
                background-size: cover;
                border-radius: 5px;
                animation: popup .8s;
                -webkit-animation: popup .8s;
                p {
                    position: absolute;
                    text-align: center;
                    color: #fff;
                    font-size: 36px;
                    font-family: "微软雅黑";
                    transform: translateX(-50%);
                    left: 50%;
                }
                .pprize {
                    top: 328px;
                }
                .pptitle {
                    top: 430px;
                }
                .pptype {
                    top: 530px;
                }
                .ptitle {
                    top: 328px;
                }
                .pnothing {
                    top: 420px;
                    font-size: 68px;
                }
                .presult {
                    top: 350px;
                    em {
                        font-size: 148px;
                    }
                }
                .pscore {
                    top: 370px;
                    em {
                        font-size: 120px;
                    }
                }
                .ptype {
                    top: 530px;
                }
                img {
                    position: absolute;
                    bottom: 170px;
                    height: 130px;
                    transform: translateX(-50%);
                    left: 50%;
                    width: 420px;
                }
            }
            .btn-default {
                position: absolute;
                background: #fcca39;
                color: #cf0922;
                width: 314px;
                height: 80px;
                border-radius: 20px;
                bottom: 65px;
                left: 136px;
                font-size: 36px;
            }
            .btn-change {
                position: absolute;
                background: #fd4027;
                border: 1px solid #ddd; /*1px*/
                bottom: 130px;
                right: 40px;
                width: 100px;
                height: 45px;
                color: #fff;
                font-size: 36px;
                padding: 0;
                text-align: center;
            }
        }
        .ui-phone {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, .5);
            z-index: 1000;
            .content {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 620px;
                height: 520px;
                background: #fff;
                border-radius: 15px;
                font-size: 28px;
                z-index: 1020;
                background: #fff;
                border-radius: 15px;
                font-size: 28px;
                font-family: '微软雅黑';
                animation: popup .8s;
                -webkit-animation: popup .8s;
                img.close {
                    position: absolute;
                    width: 36px;
                    height: 36px;
                    right: 20px;
                    top: 20px;
                }
                h4 {
                    position: relative;
                    // display: block;
                    text-align: center;
                    font-size: 34px;
                    color: #333;
                    top: 50px;
                }
                .phone-block {
                    position: relative;
                    top: 150px;
                    height: 80px;
                    margin: 0 20px;
                    input {
                        font-size: 28px;
                        display: block;
                        width: 100%;
                    }
                }
                .code-block {
                    position: relative;
                    top: 150px;
                    height: 80px;
                    margin: 0 20px;
                    .input-block {
                        width: 60%;
                        display: inline-block;
                        input {
                            font-size: 28px;
                            display: block;
                            width: 100%;
                        }
                    }
                    .get-code {
                        width: 40%;
                        float: right;
                        display: inline-block;
                        button {
                            font-size: 28px;
                            background: #fff;
                            color: #333;
                            width: 100%;
                            height: 100%;
                            border-left: 1px solid #ddd; /*1px*/
                            text-align: right;
                        }
                    }
                }
                .help-block {
                    color: #C7000B;
                    font-size: 20px;
                }
                .btn-confirm {
                    position: absolute;
                    bottom: 30px;
                    width: 590px;
                    height: 88px;
                    left: 15px;
                    font-size: 32px;
                    line-height: 88px;
                    color: #fff;
                    background: #FF7200;
                    border-radius: 5px;
                }
            }
        }
        .ui-wxpic {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, .5);
            z-index: 1000;
            .img-content {
                position: relative;
                width: 620px;
                height: 830px;
                margin: 100px auto 0;
                background: url(./img/bgpopimg@2x.png) no-repeat center center;
                background-size: cover;
                border-radius: 15px;
                animation: popup .8s;
                -webkit-animation: popup .8s;
                padding: 110px 50px 0;
                box-sizing: border-box;
                line-height: 45px;
                .img-title {
                    font-weight: 500;
                }
                .img-bottom {
                    margin: 0px;
                    text-align: center;
                    width: 304px;
                    border: 4px outset #FAFBC8;
                    margin: auto;
                    font-size: 22px;
                    font-weight: 500;
                    margin-top: 5px;
                    line-height: 30px;
                }
                img.close {
                    position: absolute;
                    width: 36px;
                    height: 36px;
                    right: 20px;
                    top: 20px;
                }
                img.png {
                    position: relative;
                    width: 312px;
                    height: 312px;
                    transform: translateX(-50%);
                    left: 50%;
                    margin-top: 50px;
                }
                p {
                    font-size: 32px;
                    color: #C7000B;
                }
            }
        }
    }
</style>