<template>
    <div id="dzp-userInfo-root">
        <div id= "dzp-userInfo-main">
        <div class="person-info-title">
            <i class="person-info-icon"></i>
            <span class="perspn-info-tip">个人信息填写</span>
        </div>

        <div class="person-info">
            <div class="person-name-con">
                <label for="person-name" class="person-name">姓&nbsp;&nbsp;&nbsp;名:</label>
                <i class="person-info-line"></i>
                <input type="text" name="" id="person-name" class="person-common" placeholder="请输入" ref="username"/>
            </div>
            <div class="person-name-con">
                <label for="person-phone" class="person-name">手机号:</label>
                <i class="person-info-line"></i>
                <input type="text" name="" id="person-phone" class="person-common" placeholder="请输入" ref="phone"/>
            </div>
            <div class="person-name-con">
                <label for="person-id" class="person-name person-label-id">
                    身份证号:</label>
                <i class="person-info-line"></i>
                <input type="text" name="" id="person-id"  class="person-common person-input-id"  placeholder="请输入" ref="idnumber"/>
            </div>

            <!-- 地址选择 -->
            <div class="person-name-con">
                <span class="person-address-title">联系地址:</span>
                <input class="person-address-con" id="demo1" type="text" readonly="" name="input_area" placeholder="请选择  >" ref="personaddressa"/>
            </div>
            <div class="person-name-con">
                <input type="text" class="person-address-desc" placeholder="请填写详细地址，不少于5个字" ref="personaddressd">
                <p id="value1"></p>
            </div>
        </div>

        <div class="person-info-title">
            <i class="person-info-icon"></i>
            <span class="perspn-info-tip">领奖地址填写</span>
        </div>

        <div class="award-info">
            <div class="shop-name-con">
                <label for="shop-name" class="shop-label-common shop-label-name">
                    门店名称:</label>
                <i class="shop-line"></i>
                <input type="text" name="" id="person-id"  class="shop-input-common shop-input-id"  placeholder="请输入" ref="shopname"/>
            </div>
            <div class="shop-name-con">
                <span class="shop-address-title">零售户店区域:</span>
                <div class="shop-address-con">{{salerProvince}}&nbsp;&nbsp;/&nbsp;&nbsp;{{salerCity}}&nbsp;&nbsp;/&nbsp;&nbsp;<input class= "shop-address-input" id="demo2" placeholder="请选择所在区域>" readonly="" name="input_area" ref="shopadressa"></div>
            </div>
            <div class="shop-name-con">
                <input type="text" class="shop-address-desc" placeholder="请填写详细地址及门店名称，不少于8个字" ref="shopadressd">
                <p id="value1"></p>
            </div>
            <div class="submit-btn" @click="handleSubmitBtn">确定</div>
        </div>
        <div class="get-luck-alert" v-if="tipFlag">
            {{tip}}
        </div>
        </div>
        <submit-info v-if="submitSuccFlag"></submit-info>
        <div v-if="errFlag" class="alert-msg">
            <p>{{errMsg}}</p>
        </div>
    </div>    
</template>

<script type="text/javascript">
    import Lib from 'assets/js/Lib.js'
    import bus from "assets/js/bus.js"
    // 省市区插件js
    import MobileArea from 'assets/js/LArea.js'
    import $ from "jquery";
    import submitInfo from "./components/submitInfo.directive.vue"
    export default {
        data() {
            return {
                tipFlag: false,
                submitSuccFlag: false,
                tip: "",
                mobile: "",//手机号；
                salerProvince:"",//零售户省份；
                salerCity: "",//零售户城市；
                cityCode: "",//城市的cityCode；
                errFlag: false,//错误提示信息；
                errMsg: ""

            }
        },
        components: {
            submitInfo
        },
        mounted() {
            var _this = this;

            Lib.ajax({
                url: "/memberDay/getRegion",
                method: 'get',
                success: result => {
                    if (result) {
                    this.LAreaData = result;

                    var area = new LArea();
                    area.init({
                        'trigger': '#demo1',//触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                        'valueTo': '#value1',//选择完毕后id属性输出到该位置
                        'keys': {id:'code',name:'name'},//绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                        'type': 2,//数据源类型
                        'data': [this.LAreaData.provinces, this.LAreaData.cities, this.LAreaData.areas]//数据源
                    });

                    console.log(this.LAreaData.areas);
                    }
                },
                error: function(err) {
                    _this.errFlag = true;
                    _this.errMsg = err.message;
                    setTimeout(function(){
                        _this.errFlag = false;
                    },1000)
                }
            });
            //获取用户信息；
            Lib.ajax({
                url: "/memberDay/getPersonalAward",
                headers: {
                    appId: weixin_token.appid,
                    openId: Lib.getCookie("openid"),
                },
                
                success: result => {
                    _this.mobile = result.data.mobile;
                    _this.salerProvince = result.data.salerProvince;
                    _this.salerCity = result.data.salerCity;
                    _this.cityCode = result.data.cityCode;
                    Lib.ajax({
                        url: "/memberDay/queryAllRegionByParentCode",
                        data: {
                            parentCode: _this.cityCode
                        },
                        success: result => {
                                
                                if (result) {
                                this.districtData = result.data;
                                    
                                var district = new LArea();
                                district.init({
                                    'trigger': '#demo2',//触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                                    'valueTo': '#value2',//选择完毕后id属性输出到该位置
                                    'keys': {id:'code',name:'name'},//绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                                    'type': 2,//数据源类型
                                    'data': [this.districtData]//数据源
                                });
                            
                            
                            }
                        },
                        error: function(err) {
                            _this.errFlag = true;
                            _this.errMsg = err.message;
                            setTimeout(function(){
                                _this.errFlag = false;
                            },1000)
                        }
                    })
                    
                },
                error: function(err) {
                    _this.errFlag = true;
                    _this.errMsg = err.message;
                    setTimeout(function(){
                        _this.errFlag = false;
                    },1000)
                }
                
            })
            
        },
        methods: {
            handleSubmitBtn() {
                var _this = this;
                var username = this.$refs.username.value;
                var phone = this.$refs.phone.value;
                var idnumber = this.$refs.idnumber.value;
                var personaddressa = this.$refs.personaddressa.value;
                var personaddressd = this.$refs.personaddressd.value;
                var shopname = this.$refs.shopname.value;
                var shopadressa = this.$refs.shopadressa.value;
                var shopadressd = this.$refs.shopadressd.value;
                var phoneReg = /^1[34578]\d{9}$/;
                var isCardReg1 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/;//15位；
                var isCardReg2 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;//18位
                var areaArr = personaddressa.split(",");
                var personalProvince = areaArr[0];
                var personalCity = areaArr[1];
                var personalDistrict = areaArr[2];
                //console.log(username,phone,idnumber,personaddressa,personaddressd,shopname,shopadressa,shopadressd);
                if(username && phone && idnumber && personaddressa && personaddressd && shopname && shopadressa && shopadressd) {//用户名不为空；

                        if(phoneReg.test(phone)) {
                            if(isCardReg1.test(idnumber) || isCardReg2.test(idnumber)) {//信息验证成功；
                                //提交信息，发送请求；
                                Lib.ajax({
                                    url:"/memberDay/inputPersonalInfo",
                                    headers: {
                                        appId: weixin_token.appid,
                                        oppenId: Lib.getCookie("openid"),
                                    },
                                    data: {

                                        username: username,
                                        mobile: phone,
                                        personalId: idnumber,
                                        province: personalProvince,
                                        city: personalCity,
                                        area: personalDistrict,
                                        address: personaddressd,
                                        salerProvince:_this.salerProvince,
                                        salerCity: _this.salerCity,
                                        salerArea: shopadressa,
                                        salerAddress: shopadressd
                                        
                                        
                                    },
                                    success: function(res) {
                                        if(res.ok) {
                                            
                                            _this.submitSuccFlag = true;
                                        }
                                    },
                                    error: function(err) {
                                        _this.errFlag = true;
                                        _this.errMsg = err.message;
                                        setTimeout(function(){
                                            _this.errFlag = false;
                                        },1000)
                                    }
                                })

                            }else{
                                this.tip = "身份证号格式不正确，请重新输入";
                                this.tipFlag = true;
                                setTimeout(function() {
                                    _this.tipFlag = false;
                                },1000)
                            }
                        }else{
                            this.tip = "手机号格式不正确，请重新输入";
                            this.tipFlag = true;
                            setTimeout(function() {
                                _this.tipFlag = false;
                            },1000)
                        }
                }else{
                    this.tip = "请完善领奖信息";
                    this.tipFlag = true;
                    setTimeout(function() {
                        _this.tipFlag = false;
                    },1000)
                }
                console.log(personaddressa);
                
                //console.log(areaArr[0]);
                
            }
            
        },
        created() {
            bus.$on("handleclickright",() => {
                //alert(1);
                //debugger;
                this.submitSuccFlag = true;
                location.href =
                        "../../views/menus/home.html?t=" + +new Date();
            })
        }
    }
</script>

<!--省市区插件样式-->

<style type="text/css" lang="less">

@-webkit-keyframes slideInUp {
    from {
        -webkit-transform: translate3d(0, 100%, 0);
                transform: translate3d(0, 100%, 0);
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
    }
}

@keyframes slideInUp {
    from {
        -webkit-transform: translate3d(0, 100%, 0);
                transform: translate3d(0, 100%, 0);
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
    }
}

    #dzp-userInfo-root {
        position: absolute;
        width:100%;
        height: 100%;
    }
    #dzp-userInfo-main {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #eee;
        .person-info-title {
            padding: 22px 0 0 18px;
            margin-bottom: 28px;
            height: 68px;
            background: #fff;
            .person-info-icon {
                margin-right: 24px;
                float: left;
                width: 42px;
                height: 42px;
                background: url(./imgs/person-info-icon.png) no-repeat center;
                background-size: cover;
            }
            .perspn-info-tip {
                float: left;
                height: 42px;
                font-size: 36px;
                color:#333;
                line-height: 42px;
            }
        }
        .person-info {
            padding-left: 20px; 
            height: 438px;
            background: #fff;
            .person-name-con {
                height: 86px;
                border-bottom: 1px solid #eee;
                .person-name {
                    float: left;
                    width:132px;
                    height: 86px;
                    font-size: 32px;
                    color:#333;
                    line-height: 86px;
                    text-align: center;
                }
                .person-info-line {
                    margin: 30px 0 0 24px;
                    float: left;
                    width:2px;
                    height: 27px;
                    background:#DCDCDD; 
                }
                .person-common {
                    padding: 0 20px;
                    float: left;
                    width: 500px;
                    height: 86px;
                    font-size: 24px;
                }
                .person-label-id {
                    width: 144px;
                }
                .person-input-id {
                    width:488px;
                }
                .person-address-title {
                    float: left;
                    width: 144px;
                    height: 86px;
                    font-size: 32px;
                    color:#333;
                    line-height: 86px;
                }
                .person-address-con {
                    padding: 0 20px;
                    float: left;
                    width:514px;
                    height: 86px;
                    font-size: 24px;
                    color: #666;
                    line-height: 86px;
                }
                .person-address-desc {
                    width:698px;
                    height: 84px;
                    font-size: 24px;
                }

            }
        }
        .award-info {
            padding-left: 20px; 
            height: 509px;
            background: #fff;
            .shop-name-con {
                height: 86px;
                border-bottom: 1px solid #eee;
            }
            .shop-label-common {
                float: left;
                width:144px;
                height: 86px;
                font-size: 32px;
                color:#333;
                line-height: 86px;
                text-align: center;
            }
            .shop-line {
                margin: 30px 0 0 24px;
                float: left;
                width:2px;
                height: 27px;
                background:#DCDCDD; 
            }
            .shop-input-common {
                padding: 0 20px;
                float: left;
                width: 488px;
                height: 86px;
                font-size: 24px;
            }
            .shop-address-title {
                float: left;
                width: 210px;
                height: 86px;
                font-size: 32px;
                color:#333;
                line-height: 86px;
            }
            .shop-address-con {
                padding: 0 20px;
                float: left;
                width: 444px;
                height: 86px;
                font-size: 24px;
                line-height: 86px;
            }
            .shop-address-input {
                display: inline-block;
                width:180px;
                font-size: 22px;
                color:#333;

            }
            .shop-address-desc {
                width:698px;
                height: 84px;
                font-size: 24px;
            }
            .submit-btn {
                margin: 80px 0 0 6px;
                width:700px;
                height: 98px;
                font-size: 34px;
                font-weight: 900;
                text-align: center;
                line-height: 98px;
                color: #fff;
                background: linear-gradient(to bottom, #FF9600  ,#FF7200);
                border-radius: 8px;
            }
        }
        
    }
    .get-luck-alert {
        position: absolute;
        padding-top:10px; 
        left: 104px;
        top: 358px;
        width: 540px;
        height: 150px;
        background:rgba(0,0,0,0.7);
        border-radius: 20px ;
        font-size:34px;
        font-weight: 900;
        color: #fff;
        text-align: center;
        line-height: 150px;
    }

.gearArea {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 16px;
    /* background-color: rgba(0, 0, 0, 0.2); */
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9900;
    overflow: hidden;
    -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
}

.area_ctrl {
    vertical-align: middle;
    background-color: #d5d8df;
    color: #000;
    margin: 0;
    height: auto;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9901;
    overflow: hidden;
    -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
}

.slideInUp {
    -webkit-animation: slideInUp .3s;
            animation: slideInUp .3s;
}
.area_roll {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: auto;
    overflow: hidden;
    background-color: transparent;
    -webkit-mask: -webkit-gradient(linear, 0% 50%, 0% 100%, from(#debb47), to(rgba(36, 142, 36, 0)));
    -webkit-mask: -webkit-linear-gradient(top, #debb47 50%, rgba(36, 142, 36, 0));
}

.area_roll>div {
    font-size: 1.6em;
    height: 10em;
    display: inline-block;
    /* float: left; */
    background-color: transparent;
    position: relative;
    overflow: hidden;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
        -ms-flex: 1;
            flex: 1;
}

.area_roll>div .gear {
    width: 100%;
    
    position: absolute;
    z-index: 9902;
    margin-top: 4em;
}

.area_roll_mask {
    -webkit-mask: -webkit-gradient(linear, 0% 40%, 0% 0%, from(#debb47), to(rgba(36, 142, 36, 0)));
    -webkit-mask: -webkit-linear-gradient(bottom, #debb47 50%, rgba(36, 142, 36, 0));
    padding: 0;
}

.area_grid {
    position: relative;
    top: 4em;
    width: 100%;
    height: 2em;
    margin: 0;
    box-sizing: border-box;
    z-index: 0;
    border-top: 1px solid #abaeb5;
    border-bottom: 1px solid #abaeb5;
}

.area_roll>div:nth-child(3) .area_grid>div {
    left: 42%;
}

.area_btn {
    color: #000;
    font-size: 1.6em;
    line-height: 1em;
    text-align: center;
    padding: .8em 1em;
}

.area_btn_box:before,
.area_btn_box:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    display: block;
    background-color: #96979b;
    z-index: 15;
    -webkit-transform: scaleY(0.33);
            transform: scaleY(0.33);
}

.area_btn_box {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack:justify;
    -webkit-justify-content:space-between;
        -ms-flex-pack:justify;
            justify-content:space-between;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
        -ms-flex-align: stretch;
            align-items: stretch;
    background-color: #f1f2f4;
    position: relative;
}

.area_btn_box:before {
    left: 0;
    top: 0;
    -webkit-transform-origin: 50% 20%;
            transform-origin: 50% 20%;
}

.area_btn_box:after {
    left: 0;
    bottom: 0;
    -webkit-transform-origin: 50% 70%;
            transform-origin: 50% 70%;
}

.tooth {
    height: 2em;
    line-height: 2em;
    text-align: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    line-clamp: 1;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -webkit-flex-direction:column;
        -ms-flex-direction:column;
            flex-direction:column;
    overflow: hidden;
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