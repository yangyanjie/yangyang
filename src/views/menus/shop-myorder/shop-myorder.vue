<template>
    <div>
        <sa-page-load ishow="1"></sa-page-load>
        <main class="main">    
            <div class="order-wrap">
                <div class="adress-box" @click="selectAddress()">
                    <div><span class="user"></span><span id="telNum"></span></div>
                    <div id="address"></div>
                    <img class="arrow-right" src="./img/arrow-right.png"/>
                </div>
                <div class="no-address border-box" @click="addAddress()">
                    新建地址<img class="arrow-right" src="./img/arrow-right.png"/>
                </div>
                <div class="goods clearfloat">
                    <div class="goods-pic"></div>
                    <div class="goods-word">
                        <div class="goods-title"></div>
                        <span class="count">数量：x1</span>
                        <div class="clearfloat">
                            <span class="price"></span>
                        </div>
                    </div>
                </div>
                <div class="btn" md="jf_11_exchange_btn" @click="confirmReceive()">确认领取</div>
            </div>
            <!--领取成功弹框-->
            <div class="success_box">
                <img src="./img/success.png"/>
                <p>领取成功</p>
            </div>
            <!--领取失败弹框-->
            <div class="error_box">
                <img src="./img/error.png"/>
                <p>领取失败</p>
            </div>
            <!--请选择正确地址弹框 -->
            <div class='pop'> 
                <div class='pop-mask border-box'>
                    <div class='close' @click="closeWarn()"></div>
                    <p>请选择正确地址</p>
                    <div class='pop_btn btn_middle' @click="closeWarn()">确定</div>
                </div>
            </div>
            <div id="statistics" data-pageid="3011" class="hidden"></div>
            <div ref="activityId" id="mdActiveId" data-id='scoremall003' class="hidden"></div>
        </main>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import Lib from 'assets/js/Lib.js'
    import $ from 'jquery'
    let productId = Lib.getUrlQuery('productId');
    let addressId = Lib.getUrlQuery('addressId');
    let orderId = Lib.getUrlQuery('orderId');
    let addressData = null;
    let btnClick = true;  //点击兑换按钮
    //领取弹框定时器
    let receiveSuccessTimer = null;
    let receiveErrorTimer = null;

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
            this.getAddressList();
            this.getProductInfo();
        },
        //相关操作事件
        methods: {
            getAddressList : function(){
                //获取用户地址信息
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                if(addressId){
                    (function () {            
                        Lib.ajax({
                            url: '/act/rule/'+activityId,
                            method: 'post',
                            data: {
                                "name": 'addrdetail',
                                "addrid": addressId
                            },
                            success: function (res) {
                                if (res.code === 1) {
                                    addressData = res.context;
                                    if (addressData == null) {
                                        $(".no-address").show();
                                        $(".adress-box").hide();
                                    } else {
                                        addressId = addressData.id;
                                        $('.user').html(addressData.name);
                                        $('#telNum').html(addressData.mobile);
                                        $('#address').html(addressData.address);
                                        $(".adress-box").show();
                                        $(".no-address").hide();
                                    }
                                }
                            }
                        })
                    })();
                }else{
                    (function () {
                        var data = "";
                        Lib.ajax({
                            url: '/act/rule/'+activityId,
                            method: 'post',
                            data: {
                                "name": 'addrlist'
                            },
                            success: function (res) {
                                if (res.code === 1) {
                                    addressData = res.context;
                                    if (addressData == null || addressData.length == 0) {
                                        $(".no-address").show();
                                        $(".adress-box").hide();
                                    } else {
                                        addressId = addressData[0].id;
                                        $('.user').html(addressData[0].name);
                                        $('#telNum').html(addressData[0].mobile);
                                        $('#address').html(addressData[0].address);
                                        $(".adress-box").show();
                                        $(".no-address").hide();
                                    }
                                }
                            }
                        }); 
                    })();
                }
            },
            getProductInfo : function(){
                //获取商品信息
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                Lib.ajax({
                    url: '/act/rule/'+activityId,
                    method: 'post',
                    data: {
                        'name': 'itemdetail',
                        'productId' : productId
                    },
                    success: function (res) {
                        if(res.code == 1){
                            let data = res.context;
                            if(data.shop == 1){
                                $('.goods-pic').html("<img src=\""+data.icon+"\" \/>");
                                $('.goods-title').html(data.memo);
                                $('.price').html(data.score+'积分');
                                $('.btn').attr('md_name',data.memo);
                            }else{
                                $('.goods-pic').html("<img src=\""+data.icon+"\" \/>");
                                $('.goods-title').html(data.memo);
                                $('.price').html("<s>"+data.score+"积分<s/>");
                                $('.btn').attr('md_name',data.memo);
                            }
                        }
                    }
                });
            },
            addAddress: function(){
                //开始新建地址
                if(orderId){
                    window.location.href = "../menus/shop-add-address.html?productId="+productId+"&orderId="+orderId+'&t='+new Date().getTime();
                }else{
                    window.location.href = "../menus/shop-add-address.html?productId="+productId+'&t='+new Date().getTime();
                }
            },
            selectAddress: function(){
                //从地址列表中选择地址
                if(orderId){
                    window.location.href = "../menus/shop-address-list.html?productId="+productId+"&orderId="+orderId+"&addressId="+addressId+'&t='+new Date().getTime();
                }else{
                    window.location.href = "../menus/shop-address-list.html?productId="+productId+"&addressId="+addressId+'&t='+new Date().getTime();
                }
            },
            confirmReceive: function(){
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                //确认领取物品
                if (addressData == null || addressData.length == 0 || addressData == undefined) {
                    $('.pop').show();
                } else {
                    if(btnClick){
                        btnClick = false;
                        if(orderId){
                            Lib.ajax({
                                method: 'POST',
                                url: '/act/rule/'+activityId,
                                data: {
                                    name: 'orderupdate',
                                    orderid : orderId,
                                    addrid : addressId
                                },
                                success: function (res) {
                                    if (res.code === 1) {
                                        $('.success_box').show();
                                        receiveSuccessTimer = setTimeout(function(){
                                            btnClick = true;
                                            window.location.href = '../menus/shop.html?t='+new Date().getTime();
                                            clearTimeout(receiveSuccessTimer);
                                        },2000);
                                    }else {
                                        $('.error_box').show();
                                        receiveErrorTimer = setTimeout(function(){
                                            $('.error_box').hide();
                                            btnClick = true;
                                            clearTimeout(receiveErrorTimer);
                                        },2000);
                                    }
                                }
                            }); 
                        }else{
                            Lib.ajax({
                                method: 'post',
                                url: '/act/rule/'+activityId,
                                data: {
                                    name: 'ordercreate',
                                    productId : productId,
                                    addrid : addressId
                                },
                                success: function (res) {
                                    if (res.code === 1) {
                                        $('.success_box').show();
                                        receiveSuccessTimer = setTimeout(function(){
                                            btnClick = true;
                                            window.location.href = '../menus/shop.html?t='+new Date().getTime();
                                            clearTimeout(receiveSuccessTimer);
                                        },2000);
                                    }else {
                                        $('.error_box').show();
                                        receiveErrorTimer = setTimeout(function(){
                                            $('.error_box').hide();
                                            btnClick = true;
                                            clearTimeout(receiveErrorTimer);
                                        },2000);
                                    }
                                }
                            }); 
                        }
                    }
                }
            },
            closeWarn: function(){
                //关闭地址警告弹框
                $('.pop').hide();
            }
        }
    }
</script>
<style type="text/css" lang="less">
    .clearfix{
        *zoom:1
    }
    .clearfix:after{
        clear:both;
        height:0;
        overflow:hidden;
        display:block;
        visibility:hidden;
        content:"";
    }
    .lf{
        float: left;
    }
    .rf{
        float: right;
    }
    body {
        width: 100%;
        min-height: 100%;
        overflow-x: hidden;
    }
    .order-wrap {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        font-size: 28px;
    }
    .order-wrap * {
        box-sizing: border-box;
    }
    .adress-box {
        height: 134px;
        padding: 20px;
        margin-bottom: 18px;
        background-color: white;
        position: relative;
        display: none;
    }
    .adress-box > div {
        width: 600px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 45px;
        line-height: 45px;
    }
    .adress-box >div:nth-of-type(2) {
        color: #888888;
    }
    .no-address {
        height: 88px;
        line-height: 88px;
        position: relative;
        background: white;
        padding: 0 20px;
        margin-bottom: 18px;
        color: #333333;
        display: block;
    }
    .user {
        font-weight: bolder;
        padding-right: 60px;
    }
    .arrow-right {
        width: 15px;
        height: 26px;
        position: absolute;
        right: 50px;
        top: 50%;
        transform: translateY(-50%);
    }
    .goods {
        height: 240px;
        background-color: white;
        padding: 20px;
    }
    .goods-pic {
        width: 255px;
        height: 200px;
        float: left;
        position: relative;
        overflow: hidden;
    }
    .goods-pic img {
        height: 164px;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    .goods-word {
        width: 413px;
        height: 100%;
        padding-top: 40px;
        float: right;
    }
    .goods-title {
        font-weight: bolder;
        padding-bottom: 27px;
    }
    .price {
        color: #ff4444;
    }
    .count {
        color: #cdcdcd;
        display: block;
        padding-bottom: 27px;
    }
    .btn {
        width: 650px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        color: white;
        background: linear-gradient(to bottom,#FF7200,#FF9600);
        border-radius: 10px;
        position: fixed;
        bottom: 110px;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
    }
    /*领取成功弹框*/
    .success_box,.error_box{
        width: 240px;
        height: 240px;
        position: absolute;
        z-index: 30;
        background-color: rgba(0,0,0,.5);
        border-radius: 8px;
        -webkit-border-radius: 8px;
        left: 50%;
        top: 50%;
        margin-left: -120px;
        margin-top: -120px;
        text-align: center;
        display: none;
    }
    .success_box img{
        width: 120px;
        display: block;
        margin: 33px auto;
    }
    .error_box img{
        width: 24px;
        display: block;
        margin: 33px auto;
    }
    .success_box p,.error_box p{
        font-size: 35px;
        color: #FFFFFF;
    }
    //弹框提示
    .pop{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .6);
        z-index: 40;
        display: none;
    }
    .pop-mask {
        width: 620px;
        padding-top: 100px;
        background-color: #ffffff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 20px;
    }
    .pop-mask p {
        font-size: 38px;
        text-align: center;
        color: #333333;
        padding:0 38px 85px;
    }
    .pop_btn {
        width: 50%;
        height: 88px;
        text-align: center;
        line-height: 88px;
        color: white;
        font-size: 36px;
    }
    .btn_left {
        float: left;
        border-top: 1px solid gray;
        color: #D7A57e;
        border-right: 1px solid gray;
    }
    .btn_right {
        float: right;
        color: #999;
        border-top: 1px solid gray;
    }
    .btn_middle {
        width: 580px;
        margin: 0 auto 38px;
        background: linear-gradient(to bottom,#FF7200,#FF9600);
        border-radius: 8px;
    }
    .close {
        width: 36px;
        height: 36px;
        background: url("./img/close-icon.png") center no-repeat;
        background-size: 36px 36px;
        position: absolute;
        right: 20px;
        top: 20px;
    }
</style>