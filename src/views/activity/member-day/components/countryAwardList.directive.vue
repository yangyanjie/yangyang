<template>
    <div class="award-ui">
        <div>
        <i class="award-deamonds"></i>
        <div class="award-container">
            <div class="prize-con">
                <div class="prize-cup"></div>
                <div class="prize-desc">
                    <div class="prize-periods">
                        <div class="periods">{{countryData.winningTime}}</div>         
                    </div>
                    <div class="prize-desc-con">
                        <div class="award-desc" v-for="(countryItem,countryKey) in countryData.data">
                            <div class="address">{{countryKey}}</div>      
                            <ul class="prize-list">
                                <li class="prize-item" v-for="prizeItem in countryItem">
                                    <span class="name-item">{{prizeItem.nickname}}</span>
                                    <span class="award-item">{{prizeItem.awardName}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="prize-desc-more">V</div>
            </div>
            
        </div>
        <div class="activity-share" @click="handleShareEvent">邀请攒幸运值</div>
        </div>
        <!-- 邀请好友的弹框 -->
        <div class="inviation-alert" v-if= "inviationAlertFlag">
            赶快邀请小伙伴参加吧, 有好友助力<br>
        你的幸运值也会增加哦
        </div>
        <div v-if="errFlag" class="alert-msg">
            <p>{{errMsg}}</p>
        </div>
    </div>    
</template>
<script type="text/javascript">
   
    import Lib from "assets/js/Lib.js" 
    export default {
        data() {
            return {
                countryData: {},
                inviationAlertFlag: false,//分享弹框；
                errFlag: false,//错误提示信息；
                errMsg: ""
            }
        },
        methods: {
            getCounttryListData() {
                var _this = this;
                // Lib.ajax({
                //     url: "../../static/datas/awardlist.json",
                //     type: "GET",
                //     dataType: "json",
                //     success: this.getCounttryListDataSucc
                // })
                Lib.ajax({
                    url: "/memberDay/getAllWinningList",
                    data: {
                        winningType: 1
                    },
                    success: this.getCounttryListDataSucc,
                    error: function(err) {
                        _this.errFlag = true;
                        _this.errMsg = err.message;
                        setTimeout(function(){
                            _this.errFlag = false;
                        },1000)
                    }
                })
                
            },
            getCounttryListDataSucc(res) {
                var _this = this;
                //console.log(res);
                //console.log(Lib.dataFormat(res.data));
                if(res.ok) {
                    this.countryData = res;
                    this.countryData.winningTime = res.winningTime;
                    this.countryData.data = Lib.dataFormat(res.data);
                }else {
                    _this.errFlag = true;
                    _this.errMsg = res.msg;
                    setTimeout(function(){
                        _this.errFlag = false;
                    },1000)
                }
                //console.log(this.countryData);
                
            },
            //分享页面；
            handleShareEvent() {
                var _this = this;
                this.inviationAlertFlag = true;
                setTimeout(function() {
                    _this.inviationAlertFlag = false;
                },1000)
            }
        },
        created() {
            this.getCounttryListData();
        },
        mounted() {
            
        },
        components: {
            
        }
    }
</script>
<style type="text/css" lang="less" scoped>
    .award-ui {
        position: absolute;
        height: 100%;
        width: 100%;
        background: url(../imgs/activity-main1.png) no-repeat center;
        background-size: cover; 
    }
    .award-container {
        position: relative;
        margin: 80px 66px 0 66px;
        width: 620px;
        height: 970px;
        background: url(../imgs/country-con.png) no-repeat center;
        background-size: cover;
    }
    .award-deamonds {
        display: block;
        z-index: 2;
        position: absolute;
        right: 0;
        top: 0;
        width: 154px;
        height: 178px;
        background: url(../imgs/daily-diamonds.png) no-repeat center;
        background-size: cover; 
    }
    .prize-con {
        position: relative;
        padding-left: 22px; 
        top: 152px;
        width:598px;
        height: 685px;
    }
    .prize-cup {
        position: absolute;
        width: 67px;
        height: 71px;
        background: url(../imgs/prize-cup.png) no-repeat center;
        background-size: cover;
    }
    
    .prize-desc-con {
        height: 690px;
        overflow-y: scroll;
    }
    .prize-desc {
        position: absolute;
        left: 104px;
        width:443px;
        height:176px; 
        font-size:34px;
        font-family:'PingFangSC-Medium';
        color:rgba(53,26,26,1);

    }
    .prize-desc-more {
        position: absolute;
        left:50%;
        color: red;
        bottom: -100px;
        font-size: 40px;
        font-weight: 900;
    }
    .prize-periods, .prize-item {
        width: 100%;
        height: 44px;
        font-family: 'PingFang SC';
        line-height: 44px;
    }
    .prize-periods {
        font-weight: 900;
    }
    .award-desc {
        height: 230px;
    }
    .address {
        font-family: 'PingFang SC';
        font-weight: 900;
        text-align: right;
    }
    .prize-list {
        margin-top: 5px; 
    }
    .name-item {
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #351A1A;
        float: left;
    }
    .award-item {
        padding-right: 50px;
        color: #F83F2B;
        float: right;
    }
    .award-down {
        position: absolute;
        bottom: 33px;
        width:100%;
        height: 24px;
        font-size:24px;
        font-family:'PingFangSC-Light';
        font-weight: 900;
        color:rgba(238,50,42,1);
        line-height:24px;
        text-align: center;

    }
    .activity-share {
        margin: 30px 242px 0 233px;
        width: 275px;
        height: 72px;
        background: url(../imgs/activity-shares.png) no-repeat center;
        background-size: 100% 100%;
        font-size: 30px;
        font-weight: 900;
        font-family:"PingFangSC-Medium";
        color: #FAFBC8 ;
        text-align: center;
        line-height: 72px;
    }
    //邀请好友的弹框
    .inviation-alert {
        padding-top: 20px; 
        position: absolute;
        left: 104px;
        top: 850px;
        width: 540px;
        height: 122px;
        background:rgba(0,0,0,0.7);
        border-radius: 20px ;
        font-size:32px;
        font-weight: 900;
        color: #fff;
        text-align: center;
        line-height: 50px;
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