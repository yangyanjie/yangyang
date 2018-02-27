<template>
    <div id="root">
        <expect-con v-if="expectFlag"></expect-con>
        <tiger-activity v-if="tigerFlag"></tiger-activity>
        <activity-desc v-show="descFlag"></activity-desc>
        <country-list v-if="countryFlag"></country-list>
        <div v-if="errFlag" class="alert-msg">
            <p>{{errMsg}}</p>
        </div>
    </div>
</template>

<script type="text/javascript">
    // 全国中奖名单弹窗；
    import countryList from "./components/countryAwardList.directive.vue"
    //活动详情介绍；
    import activityDesc from "./components/activityDesc.directive.vue"
    //1月1号到1月15号敬请期待页面；
    import expectCon from "./components/expectCon.directive.vue"
    //老虎机活动页面；
    import tigerActivity  from "./components/tigerActivity.directive.vue"
    //引入bus；进行非父子组件传值；
    import bus from "assets/js/bus.js"
    //提交用户信息成功的弹窗页面；
    // import submitInfo from "./components/submitInfo.directive.vue"
    // //是否兑换荷石币页面；
    // import isExchange from "./components/isExchange.directive.vue"
    // //兑换成功页面；
    // import exchangeSucc from "./components/exchageSucc.directive.vue"
    import Lib from "assets/js/Lib.js"
    // 微信分享
    import wxShare from "assets/js/wx_memberday_share.js"


    export default {
        data() {
            return {
                expectFlag: false,
                tigerFlag: false,
                descFlag: false,
                countryFlag: false,
                serverTime: "",//服务器时间；
                activityStart: "",//活动开始时间；
                timer: null,//定时器；
                SeverTimer: null,//获取服务器时间的定时器；
                currentDay: "",//当前日期；
                currentHour: "",//时；
                currentMinute: "",//分；
                currentSecond: "",//秒；
                startDay: "",
                startHour: "",
                startMinute: "",
                errFlag: false,//错误提示信息；
                errMsg: ""

            }
        },
        components: {
            countryList,
            activityDesc,
            expectCon,
            tigerActivity,
        },
        methods: {
            //获取服务器时间；
            getServerTime() {
                var _this = this;
                // Lib.ajax({
                //     url: "../../static/datas/servertime.json",
                //     type: "GET",
                //     dataType: "json",
                //     success: this.GetServerTimeSucc,
                //         error: function(err) {
                //         _this.errFlag = true;
                //         _this.errMsg = err.message;
                //         setTimeout(function(){
                //             _this.errFlag = false;
                //         },1000)
                //     }
                // })

                //真实数据；
                Lib.ajax({
                    url:"/memberDay/getServerTime",
                    success: this.GetServerTimeSucc,
                    error: function(err) {
                        _this.errFlag = true;
                        _this.errMsg = err.message;
                        setTimeout(function(){
                            _this.errFlag = false;
                        },1000)
                    }
                })
                //1.周六晚8:30-8:31进入活动页面；
                //this.tigerFlag = true;
                //2.非活动时间进入活动介绍页面；
                //this.descFlag = true;
            },
            GetServerTimeSucc(res) {
                //时间获取成功；
                    this.handleServerTime(res);
            },
            //处理服务器时间的弹窗；
            handleServerTime(res) {
                //服务器时间；
                this.serverTime = res.systemTime;
                //活动开始时间；
                this.activityStart = res.drawTime;
                //处理时间的逻辑判断；
                window.activityFlag = false;
                //window.alertAwardFlag = false;
                var _this = this;
                var time = Number(this.serverTime);
                this.currentDay = new Date(this.serverTime).getDay();
                this.currentHour = new Date(this.serverTime).getHours();
                this.currentMinute = new Date(this.serverTime).getMinutes();
                this.currentSecond = new Date(this.serverTime).getSeconds();

                this.startDay = new Date(this.activityStart).getDay();
                this.startHour = new Date(this.activityStart).getHours();
                this.startMinute = new Date(this.activityStart).getMinutes();
                console.log(this.currentDay,this.currentHour,this.currentMinute,this.currentSecond,this.startDay,this.startHour,this.startMinute);
                if(this.currentDay === this.startDay && this.currentHour === this.startHour) {//是周六晚八点；
                    if(this.currentMinute >= this.startMinute && this.currentMinute < this.startMinute + 1){//晚8:30-8:31;
                        this.handleTiger();
                    }else if(this.startMinute - this.currentMinute >= 0 && this.startMinute - this.currentMinute <= 30) {
                        //发获取服务器时间的请求；
                        this.serverTimer = setInterval(function() {
                            if(window.activityFlag) {
                                bus.$emit("tigerstart");
                                clearInterval(_this.serverTimer);
                            }else {//处理逻辑；
                                _this.currentSecond++;
                                //倒计时逻辑处理start；
                                if(_this.currentMinute === _this.startMinute -1 && _this.currentSecond >=50) {
                                    bus.$emit("countDown",_this.currentSecond);

                                }
                                 //倒计时逻辑处理end；
                               console.log(_this.currentSecond+"秒");
                                if(_this.currentSecond === 59) {
                                    _this.currentMinute++;
                                    _this.currentSecond =0;
                                    console.log(_this.currentMinute+"分")
                                }
                                if(_this.currentMinute === _this.startMinute) {
                                    _this.currentSecond = 0;
                                     window.activityFlag = true;
                                }
                            }
                        },1000)
                        this.descFlag = true;

                    }else{
                        this.descFlag = true;
                    }
                }else {//不是周六晚八点；
                    this.descFlag = true;
                }
                //判断是否跳转到活动开奖页面；
                if(window.activityFlag) {
                    this.descFlag = false;
                    this.tigerFlag = true;
                }

            },
            //处理活动逻辑；
            handleTiger() {
                //alert(2);
                var _this = this;
                this.descFlag = false;
                this.tigerFlag = true;
                this.timer = setInterval(function() {
                    _this.currentSecond++;
                    console.log(_this.currentSecond);
                    if(_this.currentSecond >= 59) {
                        bus.$emit("alertGuaGuaKa");
                        
                        clearInterval(_this.timer);
                    }
                },1000)
            },
            //判断是不是从分享页面跳转过来的；
            handleShareGetMyLuck() {
                //alert(1);
                // var str = "https://hbh.saotx.cn/app-hebei/views/activity/member-day.html?from=share&t=1515750174851"
                // console.log()
                if(Lib.getUrlQuery("from") === "share"){
                    bus.$emit("sharegetluck")
                }
            }
        },
        mounted() {
            //获取服务器时间；
            this.getServerTime();
            // 新建邀请
            //this.newInvite();
            //判断是不是从分享页面跳转过来的；
            this.handleShareGetMyLuck();
        },
        computed: {

        },
        created() {
            bus.$on("getawardlist",() => {
                //alert(1);
                //debugger;
                this.tigerFlag = false;
                this.countryFlag = true;
            })
            // bus.$on("myLuck", () => {
            //     this.tigerFlag = false;
            // })
            bus.$on("sharegetluck",() => {
                this.descFlag = true;
                //bus.$emit("shareget");
            })
            //监听活动开始页面；
            bus.$on("tigerstart",() => {

                this.handleTiger();

            })

        }
    }
</script>

<style type="text/css" lang="less" scoped>
    #root {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .alert-msg {
        width: 540px;
        position: absolute;
        background: rgba(0,0,0,0.7);
        border-radius: 20px;
        color: #fff;
        font-size: 30px;
        line-height: 150px;
        top: 50%;
        left: 0;
        right: 0;
        margin: 100px auto 0;
        text-align: center;
    
    }
    
</style>