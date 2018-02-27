<template>
    <div>
        <sa-page-load ishow="1"></sa-page-load>
        <main class="main">
            <div class="body_wrap hidden">
                <div class="userName whiteBgcolor border-box">
                    <label>
                        <span class="label-title">收件人：</span>
                        <input type="text" placeholder="请填写收件人姓名" id="name" maxlength='16'>
                    </label>
                </div>
                <div class="userNum whiteBgcolor border-box">
                    <label>
                        <span class="label-title">手机号码：</span>
                        <input type="number" placeholder="请填写收件人联系方式" id="tel" maxlength='11'>
                    </label>
                </div>
                <div class="address whiteBgcolor userNum border-box">
                    <span class="label-title">收货地址：</span>
                    <select name="province" id="province" @change="changeProvince()">
                        <option value="省">省</option>
                    </select><span class="symbol">/</span>
                    <select name="city" id="city" @change="changeCity()">
                        <option value="市">市</option>
                    </select><span class="symbol">/</span>
                    <select name="district" id="district">
                        <option value="区">区</option>
                    </select>
                </div>
                <div class="detailed-address whiteBgcolor">
                    <label>
                        <textarea name="" id="textarea" class="border-box" placeholder="请填写详细地址" maxlength='64'></textarea>
                    </label>
                </div>
                <button id="confirmBtn" @click="comfirmAddress()">确认地址</button>
                <div class="address_box">
                    <div class="address_detail">
                        <div class="address_close_btn" @click="closeWarn()"></div>
                        <div class="address_warn"></div>
                        <div class="address_confirm_btn" @click="closeWarn()">确定</div>
                    </div>
                </div>
            </div>
            <div id="statistics" data-pageid="3007" class="hidden"></div>
            <div ref="activityId" id="mdActiveId" data-id='scoremall003' class="hidden"></div>
        </main>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import Lib from 'assets/js/Lib.js'
    import $ from 'jquery'

    let productId = Lib.getUrlQuery("productId");
    let addressId = Lib.getUrlQuery("addressId");
    let orderId = Lib.getUrlQuery('orderId');
    let s = Lib.getUrlQuery('s');
    let provinceId = ""; //省ID
    let cityId = "";  //市ID
    let districtId = "";  //区ID
    let mobileRegex = /^1[0-9]{2}\d{8}$/;  //验证手机号
    export default {
        data() {
            return {
            }
        },
        components: {
            SaPageLoad
        },
        //实例初始化最之前，无法获取到data里的数据
        beforeCreate(){

        },
        //created创建完毕状态
        created() {

        },
        //在挂载开始之前被调用
        beforeMount(){

        },
        //已成功挂载，相当ready()
        mounted(){
            this.initAddress();

        },
        //相关操作事件
        methods: {
            initAddress: function(){
                setTimeout(function(){
                    $('.body_wrap').removeClass('hidden');
                }, 500);
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                if(addressId){
                    Lib.ajax({
                        url: '/act/rule/'+activityId,
                        method: 'post',
                        data: {
                            "name": 'addrdetail',
                            "addrid": addressId
                        },
                        success: function (res) {
                            if (res.code === 1) {
                                var data = res.context;
                                $("#name").val(data.name);
                                $("#tel").val(data.mobile);
                                $("#textarea").val(data.detail);
                                provinceId = data.prov;
                                cityId = data.city;
                                districtId = data.district
                                that.getProvince();
                            }
                        }
                    })
                }else{
                    that.getProvince();
                }

            },
            getProvince: function(){
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                Lib.ajax({
                    url: '/award/regions',
                    method: 'post',
                    success: function (res) {
                        if (res.code === 1) {
                            var data = res.context;
                            var stroption = '<option value="省">省</option>';
                            $(data).each(function (index,n) {
                                if (n.id === provinceId){
                                    stroption += '<option value="'+n.id+'" selected>'+n.name+'</option>';
                                    that.changeValue({parent:n.id},$("#city"),1);
                                }else {
                                    stroption += '<option value="'+n.id+'">'+n.name+'</option>'
                                }
                            });

                            $("#province").html(stroption);
                        }
                    }
                })
            },
            changeValue: function(val,ele,p){
                let that = this;
                if(val.parent != '省' && val.parent != '市'){
                    //更改地区id值
                    ele.html("");
                    if(p === 1){
                        p = "市";
                    }else {
                        p = "区";
                    }
                    Lib.ajax({
                        url: '/award/regions',
                        method: 'post',
                        data : val,
                        success: function (res) {
                            if(res.code === 1) {
                                var data = res.context;
                                var stroption = '<option value="'+p+'">'+p+'</option>';
                                $(data).each(function (index,n) {
                                    if (n.id === cityId){
                                        stroption +=  '<option value="'+n.id+'" selected>'+n.name+'</option>';
                                        that.changeValue({parent:n.id},$("#district"),2)
                                    }else if (n.id === districtId) {
                                        stroption +=  '<option value="'+n.id+'" selected>'+n.name+'</option>';
                                    }else {
                                        stroption +=  '<option value="'+n.id+'">'+n.name+'</option>';
                                    }
                                });
                                ele.html(stroption);
                            }
                        }
                    })
                }
            },
            changeProvince: function(){
                //选择省
                let that = this;
                var proObj = {
                    "parent" : $("#province").val()
                }
                that.changeValue(proObj,$("#city"),1);
            },
            changeCity: function(){
                //选择市
                let that = this;
                var cityObj = {
                    "parent" : $("#city").val()
                }
                that.changeValue(cityObj,$("#district"),2);
            },
            comfirmAddress: function(){
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                //确认添加地址
                let name = $("#name").val();
                let mobile = $("#tel").val();
                let province = $("#province").val();
                let city = $("#city").val();
                let district = $("#district").val();
                let textarea = $("#textarea").val();
                if (name === "") {
                    $('.address_warn').html('收件人不能为空');
                    $('.address_box').show();
                    $(".address_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                    return;
                } else if (mobile == '' || !mobileRegex.test(mobile)){
                    $('.address_warn').html('请输入正确的电话');
                    $('.address_box').show();
                    $(".address_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                    return;
                }else if (province === "省" || city === "市") {
                    $('.address_warn').html('请选择正确的省市区');
                    $('.address_box').show();
                    $(".address_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                    return;
                } else  if (textarea === "") {
                    $('.address_warn').html('请输入详细地址');
                    $('.address_box').show();
                    $(".address_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                    return;
                } else if (textarea.length > 64){
                    $('.address_warn').html('详细地址过长');
                    $('.address_box').show();
                    $(".address_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                    return;
                }else {
                    var addressObj = {
                        name: 'addradd',
                        username: name,
                        mobile: mobile,
                        address: textarea,
                        province: province,
                        city: city,
                        district: district,
                        gendar: 1
                    };
                    if(addressId){
                        addressObj.addrid= addressId;
                    }
                    Lib.ajax({
                        url: '/act/rule/'+activityId,
                        method: 'post',
                        data : addressObj,
                        success: function (res) {
                            if(res.code == 1){
                                if(s){
                                    window.location.href = '../menus/shop-address-list.html?s='+s+'&t='+new Date().getTime();
                                }else{
                                    if(orderId != undefined && orderId != null && orderId != ''){
                                        window.location.href = '../menus/shop-myorder.html?productId='+productId+'&orderId='+orderId+'&t='+new Date().getTime();
                                    }else{
                                        window.location.href = '../menus/shop-myorder.html?productId='+productId+'&t='+new Date().getTime();
                                    }
                                }
                            }else{
                                $('.address_warn').html('添加地址失败');
                                $('.address_box').show();
                                $(".address_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                                return;
                            }
                        }
                    })
                }
            },
            closeWarn: function(){
                //关闭警告弹框
                $('.address_box').hide();
            }
        }
    }
</script>
<style type="text/css" lang="less">
    html {
        height: 100%;
    }
    body {
        min-height: 100%;
        overflow-x: hidden;
        background-color: #F5F5F5;
    }
    input::-webkit-input-placeholder {
        color: #CDCDCD;
    }
    input:-moz-placeholder {
        color: #CDCDCD;
    }
    input::-moz-placeholder {
        color: #CDCDCD;
    }
    input:-ms-input-placeholder {
        color: #CDCDCD;
    }
    .whiteBgcolor {
        background-color: #FFFFFF;
        font-size: 36px;
        line-height: 100px;
    }
    .userName, .userNum, .address {
        width: 100%;
        padding-left: 20px;
        box-sizing: border-box;
        overflow: hidden;
    }
    .userNum input {
        color: #333333;
    }
    .userName, .userNum {
        border-bottom: 1px solid #eeeeee;
    }
    .label-title {
        font-size: 36px;
        color: black;
    }
    .address .label-title {
        display: block;
        line-height: 1;
        padding-top: 38px;
        word-wrap: break-word;
        word-break: normal;
    }
    .userName input, .userNum input {
        font-size: 36px;
        text-indent: 20px;
    }
    .address select {
        width: 30%;
        font-size: 34px;
        color: #333333;
        border: 0px;
        outline: 0px;
        background-color: white;
        appearance: none;
        word-wrap: break-word;
        text-overflow: ellipsis;
        white-space: normal;
        -moz-appearance: none; /* Firefox */
        -webkit-appearance: none; /* Safari  Chrome */
    }
    .symbol {
        color: #CDCDCD;
    }
    .detailed-address {
        box-sizing: border-box;
        padding: 25px 0 0 20px;
        overflow: hidden;
    }
    .detailed-address span {
        display: block;
        width: 27%;
    }
    #textarea {
        display: block;
        float: left;
        width: 98%;
        height: 225px;
        font-size: 32px;
        color: #333333;
        resize: none;
        border: 1px solid #E7E7E7;
        margin-bottom: 20px;
    }
    #confirmBtn {
        display: block;
        margin: 345px auto 0;
        width: 654px;
        height: 99px;
        background: linear-gradient(to bottom,#FF7200,#FF9600);
        color: #FFFFFF;
        font-size: 36px;
        border-radius: 8px;
    }
    .address_box{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 40;
        background-color: rgba(0,0,0,.6);
        display: none;
    }
    .address_detail{
        background-color: #FFFFFF;
        width: 620px;
        margin: 195px auto;
        border-radius: 20px;
        -webkit-border-radius: 20px;
        position: relative;
        padding: 50px 0 30px;
    }
    .address_close_btn{
        position: absolute;
        top: 20px;
        right: 20px;
        width: 36px;
        height: 36px;
        background-image: url("./img/login-close-btn.png");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
    }
    .address_warn{
        font-size: 36px;
        color: #313131;
        text-align: center;
        margin-top: 45px;
    }
    .address_confirm_btn{
        width: 583px;
        height: 88px;
        background: linear-gradient(to bottom,#FF7200,#FF9600);
        color: #FFFFFF;
        font-size: 30px;
        text-align: center;
        line-height: 88px;
        margin: 60px auto 0;
        border-radius: 8px;
        -webkit-border-radius: 8px;
    }

</style>