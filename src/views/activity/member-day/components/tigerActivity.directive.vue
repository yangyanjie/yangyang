<template>
    <div class="ui-main">
        <div class="pannel-con">
            <div class="activity-container">
                <div class="first-prize">
                    <div class="activity-con">
                        <broad-cast :config="conf" :close="closeTimer"></broad-cast>
                    </div>
                </div>
                <div class="second-prize">
                    <div class="activity-con">
                        <broad-cast :config="conf"></broad-cast>
                    </div>
                </div>
                <div class="third-prize">
                    <div class="activity-con">
                        <broad-cast :config="conf"></broad-cast>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="guaguaFlag">
            <scratch-card></scratch-card>
        </div>
    </div>
</template>
<script>
    import scratchCard from "./guaguaka.vue"
    import broadCast from "./broadcast.directive.vue"
    import bus from "assets/js/bus.js"
    export default {
        data() {
            return {
                guaguaFlag: false,
                closeTimer: false,
                conf: {
                    list: [{
                        tel: '132******5908',
                        money: 88.81
                    }, {
                        tel: '181******0770',
                        money: 88.82
                    }, {
                        tel: '176******8764',
                        money: 88.83
                    }, {
                        tel: '151******3096',
                        money: 88.84
                    }, {
                        tel: '172******6051',
                        money: 88.85
                    }, {
                        tel: '138******8767',
                        money: 88.86
                    }, {
                        tel: '182******9953',
                        money: 88.87
                    }, {
                        tel: '177******8072',
                        money: 88.88
                    }, {
                        tel: '131******9091',
                        money: 88.89
                    }]
                },
            }
        },
        methods: {
            // activityGetServerTime() {
            //     console.log(window.alertAwardFlag);
            //     //获取服务器时间；
            //     //时间为周六晚8:31分，弹出刮刮卡弹框，关闭老虎机动画；
            //     //console.log(window.alertAwardFlag)
            //     // var _this = this;
            //     // setTimeout(function(){
            //     //     _this.flag = true;
            //     // },5000)
            // }
        },
        mounted() {
            
            
        },
        // computed: {
        //     alertAwardFlag:function() {
        //         return window.alertAwardFlag;
        //     }
        // },
        components: {
            scratchCard,
            broadCast
        },
        created() {
            //监测刮刮卡弹框；
            bus.$on("alertGuaGuaKa",() => {
                this.guaguaFlag = true;
            })
        }
    }
</script>
<style type="text/css" lang="less" scoped>
    .ui-main {
        position: absolute;
        height: 100%;
        width: 100%;
        background: url(../imgs/pannel-main1.png) no-repeat center;
        background-size: cover;
        
    }
    .pannel-con {
        overflow: hidden;
        margin: 468px 16px 0 50px;
        width: 686px;
        height: 542px;
        background: url(../imgs/pannel-con.png) no-repeat center;
        background-size: cover;
    }
    .activity-container {
        margin: 92px 20px 0 224px;
        width: 358px;
        height: 360px;
    }
    
    .first-prize ,.second-prize, .third-prize{
        padding-left: 20px; 
        margin-bottom: 20px;
        width: 337px;
        height: 100px;
        font-size:35px;
        color:rgba(53,26,26,1);
        line-height: 100px;
        text-align: center;
    }
    .activity-con {
        height: 100px;
        width: 337px;
        white-space: nowrap;
        overflow: hidden;
    }
</style>

