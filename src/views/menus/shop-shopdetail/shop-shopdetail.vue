<template>
    <div>
        <sa-page-load ishow="1"></sa-page-load>
        <main class="main">
            <div class="top-bg"></div>
            <div class="shop_img"></div>
            <div class="shop_info">
                <div class="shop_title">
                    <span class="shop_brief">商品名称:</span>
                    <span class="shop_name"></span>
                </div>
                <dl class="shop_detail">
                    <dt>商品介绍:</dt>
                    <dd id="productBrief"></dd>
                </dl>
            </div>
            <div class="exchang_sec clearfix">
                <div class="shop_price lf">单价：<span class="shopPoint"></span></div>
                <div class="exchange_btn rf" md="jf_06_exchange_01" @click="exchange()">立即兑换</div>
                <div class="no_exchange_btn rf"></div>
            </div>
            <div class="bomb_box">
                <div class="bomb_detail">
                    <div class="bomb_img"></div>
                    <div class="bomb_explain">确定兑换吗？</div>
                    <div class="bomb_btn clearfix">
                        <div class="deter_btn lf" @click="confirmExchange()">确定</div>
                        <div class="cancel_btn rf" @click="cancelExchange()">取消</div>
                    </div>
                </div>
            </div>
            <div class="tel_wrap">
                <div class="tel border-box">
                    <div class="close" @click="closeTel()"></div>
                    <p>验证手机</p>
                    <div class="login_tel border-box">
                        <input type="tel" placeholder="手机号" id="telephone" class="code" @keyup="validateTel()">
                        <div class="tel-err">*请填写正确手机号</div>
                    </div>
                    
                    <div class="login_tel message border-box">
                        <input type="tel" placeholder="验证码" class="code" id="yan" @keyup="validateYan()">
                        <div class="send gray_btn" @click="getValidateCode()">获取验证码</div>
                        <div class="yan-err">*验证码不能为空</div>
                    </div>
                    
                    <div class="verify" @click="bindTel()">确认</div>
                </div>
            </div>
            <!--卡券领取成功-->
            <div class="receive_success_box">
                <div class="receive_detail">
                    <img src="./img/receive-success.png" />
                    <p class="success_info">恭喜您，已领取成功!</p>
                    <p class="seccess_send">奖品已发送至<span id="sendTel">18310246666</span>的账户中，请注意查收</p>
                    <div class="receive_know_btn" id="successBtn" @click="gotoIndex()">我知道了</div>
                </div>
            </div>
            <!--卡券领取失败-->
            <div class="receive_error_box">
                <img src="./img/error.png"/>
                <p>兑换失败</p>
            </div>
            <!--关注公众号弹框-->
            <div class="isSubscribeBox">
                <div class="verDetailBox">
                    <div class="verClose" @click="closeVerFollow()"></div>
                    <div class="crCode-info">
                        <p>为了能及时通知您获奖动态以及新</p>
                        <p>活动动态,</p>
                        <p><em>请长按以下二维码图片完成关注,</em></p>
                        <p>关注后奖品将发放至您的<em>个人中心。</em></p>
                    </div>
                    <div class="crCode-pic">
                        <img id="codePic" src="">
                    </div>
                    <div class="long-follow">长按扫描二维码,关注公众号</div>
                </div>
            </div>
            <div id="statistics" data-pageid="3006" class="hidden"></div>
            <div ref="activityId" id="mdActiveId" data-id='scoremall003' class="hidden"></div>
        </main>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import Lib from 'assets/js/Lib.js'
    import $ from 'jquery'
    let pattern = /^1[3-9][0-9]{9}$/;  //验证手机号
    //获取验证码
    let countdown=59;
    let started = true;
    let productId = Lib.getUrlQuery('productId');
    let productType = Lib.getUrlQuery('productType');
    //卡券领取弹框定时器
    let receiveErrorTimer = null;
    let receiveSuccessTimer = null;
    let myMobile = '';
    let isFollowStatus = 0;
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
            this.getProductDetail();
            this.getVerFollow();
        },
        //相关操作事件
        methods: {
            getProductDetail : function(){
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                Lib.ajax({
                    url: '/act/rule/'+activityId,
                    method: 'post',
                    data: {
                        'name': 'userInfo'
                    },
                    success: function (res) {
                        if(res.code === 1){
                            let userObj = res.context;
                            var myPoints = userObj.points;
                            myMobile = userObj.mobile;
                            Lib.ajax({
                                url: '/act/rule/'+activityId,
                                method: 'post',
                                data: {
                                    'name': 'itemdetail',
                                    'productId' : productId
                                },
                                success: function (res) {
                                    console.log(res);
                                    if(res.code === 1){
                                        var shopObj = res.context;
                                        $('.shop_img').css('background-image','url(' + shopObj.icon + ')');
                                        $('.shop_name').html(shopObj.memo);
                                        $('#productBrief').html(shopObj.description);
                                        $('.shopPoint').text(shopObj.score+'荷石币');
                                        var goodType = shopObj.type;
                                        if(shopObj.shop == 1){
                                            $('.exchang_sec').show();
                                            if(shopObj.amount > 0){
                                                if(myPoints >= shopObj.score){
                                                    $('.exchange_btn').attr('md_name',shopObj.memo);
                                                    $('.exchange_btn').show();
                                                }else{
                                                    $('.exchange_btn').hide();
                                                    $('.no_exchange_btn').html('荷石币不足').show();
                                                }
                                            }else{
                                                $('.exchange_btn').hide();
                                                $('.no_exchange_btn').html('已兑完').show();
                                            }
                                        }else{
                                            $('.exchang_sec').hide();
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            },
            exchange : function(){
                let that = this;
                if(myMobile != '' && myMobile != null){
                    if(isFollowStatus == 1){
                        $('.bomb_box').show();
                        $(".bomb_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                    }else{
                        $('.isSubscribeBox').show();
                        $(".isSubscribeBox").on('touchmove', function(event) { event.preventDefault(); }, false);
                    }  
                }else{
                    $('.tel_wrap').show();
                    $(".tel_wrap").on('touchmove', function(event) { event.preventDefault(); }, false);
                }
                
            },
            closeTel : function(){//关闭手机验证弹框
                $('.tel_wrap').hide();
            },
            validateTel : function(){
                //验证手机号
                var mobile = $('#telephone').val();
                if (mobile == '' || !pattern.test(mobile)) {
                    $('.tel-err').show();
                } else {
                    $('.tel-err').hide();
                }
            },
            validateYan: function(){
                var yanVal = $('#yan').val();
                if (yanVal == '') {
                    $('.yan-err').show();
                } else {
                    $('.yan-err').hide();
                }
            },
            setTime: function(obj){
                let that = this;
                if (countdown == 0) {
                    obj.attr('disabled',false).html("获取验证码");
                    countdown = 59;
                    started = true;
                    return;
                } else {
                    obj.attr('disabled',true).html("重新发送(" + countdown + ")");
                    countdown--;
                }
                setTimeout(function() {
                    that.setTime(obj)
                },1000)
            },
            getValidateCode: function(){
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                //获取验证码
                var telNum = $('#telephone').val();
                if(telNum != ''){
                    if(pattern.test(telNum)){
                        $('.tel-err').hide();
                        if(started){
                            that.setTime($('.gray_btn'));
                            started = false;
                            var telNom = $('#telephone').val();
                            if(pattern.test(telNom)){
                                Lib.ajax({
                                    url: "/score/uc/"+activityId+"/vcode",
                                    method: 'post',
                                    data: {
                                        "mobile": telNom
                                    },
                                    success: function (res) {
                                        if(res.code == 1){

                                        }
                                    }
                                });
                            }
                        }
                    }else{
                        $('.tel-err').html('*请填写正确手机号').show();
                    }
                }else{
                    $('.tel-err').html('*请填写正确手机号').show();
                }
            },
            bindTel: function(){
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                //绑定手机号
                var telNom = $('#telephone').val();
                var valinum = $('#yan').val();
                if(telNom != ''){
                    if(pattern.test(telNom)){
                        if(valinum != ''){
                            $('.tel-err').hide();
                            $('.yan-err').hide();
                            Lib.ajax({
                                method: "post",
                                url: "/score/uc/"+activityId+"/bindMobile",
                                data: {
                                    "mobile": telNom,
                                    "vcode": valinum
                                },
                                success: function(data){
                                    if(data.code == 1){
                                        myMobile = telNom;
                                        $('.tel_wrap').hide();
                                        $('body').css('position','relative');
                                        // $('.bomb_box').show();
                                        // that.verFollow();
                                        if(isFollowStatus == 0){
                                            $('.isSubscribeBox').show();
                                            $(".isSubscribeBox").on('touchmove', function(event) { event.preventDefault(); }, false);
                                        }else{
                                            $('.bomb_box').show();
                                        }
                                    }else{
                                        $('.yan-err').html('*验证码错误').show();
                                    }
                                }
                            });
                        }else{
                            $('.tel-err').hide();
                            $('.yan-err').html('*验证码不能为空').show();
                        }
                    }else{
                        $('.tel-err').html('*请填写正确手机号').show();
                    }
                }else{
                    $('.tel-err').html('*请填写正确手机号').show();
                }
            },
            cancelExchange: function(){
                //关闭兑换弹框
                $('.bomb_box').hide();
            },
            confirmExchange: function(){
                //确定开始兑换
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                if(productType == 2){
                    window.location.href = '../menus/shop-myorder.html?productId='+productId+'&t='+new Date().getTime();
                }else{
                    //卡券兑换
                    Lib.ajax({
                        url: '/act/rule/'+activityId,
                        method: 'post',
                        data: {
                            name: 'ordercreate',
                            mobile : myMobile,
                            productId : productId
                        },
                        method: 'POST',
                        success: function (data) {
                            if(data.code == 1){
                                $('#sendTel').html(myMobile);
                                $('.receive_success_box').show();
                                $(".receive_success_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                                receiveSuccessTimer = setTimeout(function(){
                                    window.location.href = '../menus/shop.html?sourceId=3006&t='+new Date().getTime();
                                },2000);
                            }else{
                                $('.receive_error_box').show();
                                $(".receive_error_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                                receiveErrorTimer = setTimeout(function(){
                                    $('.receive_error_box').hide();
                                    clearTimeout(receiveErrorTimer);
                                },2000);
                            }
                        }
                    });
                }
            },
            verFollow: function(){
                //判断是否关注公众号
                Lib.ajax({
                    url: '/act/rule/'+activityId,
                    method: 'post',
                    data: {
                        'name': 'issubscribe'
                    },
                    success: function (res) {
                        if(res.code == 1){
                            var subsObj = res.context;
                            var isSubscribe = subsObj.isSubscribe;
                            //1:关注  0:未关注
                            if(isSubscribe == 0){
                                // $('.crCode-pic').css('background-image','url("'+subsObj.qrimage+'")');
                                $('#codePic').attr('src',subsObj.qrimage);
                                $('.isSubscribeBox').show();
                                $(".isSubscribeBox").on('touchmove', function(event) { event.preventDefault(); }, false);
                            }
                        }
                    }
                });
            },
            closeVerFollow: function(){
                //关闭验证弹框
                $('.isSubscribeBox').hide();
                $('.tel_wrap').hide();
            },
            getVerFollow: function(){
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                //获取是否关注公众号状态
                Lib.ajax({
                    url: '/act/rule/'+activityId,
                    method: 'post',
                    data: {
                        'name': 'issubscribe'
                    },
                    success: function (res) {
                        if(res.code == 1){
                            isFollowStatus = res.context.isSubscribe;
                            // $('.crCode-pic').css('background-image','url("'+res.context.qrimage+'")');
                            $('#codePic').attr('src',res.context.qrimage);
                        }
                    }
                });
            },
            gotoIndex: function(){
                window.location.href = '../menus/shop.html?sourceId=3006&t='+new Date().getTime();
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
    .main{
        // background-color: #F0EFED;
    }
    .top-bg{
        width: 100%;
        height: 260px;
        background-image: url("./img/shop-detail-bg.png");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
    }
    .shop_img{
        width: 250px;
        height: 250px;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        margin: -160px auto 0;
    }
    .shop_info{
        padding: 10px 20px 120px;
    }
    .shop_info .shop_title{
        padding: 20px;
        font-size: 32px;
        border-bottom: 1px solid #D7A37E;
    }
    .shop_title .shop_brief{
        font-weight: bold;
    }
    .shop_detail{
        padding: 0 20px;
    }
    dl dt{
        font-size: 32px;
        font-weight: bold;
        line-height: 75px;
        margin-top: 18px;
    }
    dl dd{
        font-size: 28px;
        line-height: 45px;
        color: #999999;
        word-wrap: break-word;
        margin-left: 0px;
    }
    dl dd img{
        width: 100%;
    }
    dl dd div{
        font-size: 28px;
        color: #444;
    }
    .exchang_sec{
        width: 100%;
        height: 100px;
        background-color: #F7F7F7;
        position: fixed;
        bottom: 0;
    }
    .shop_price{
        font-size: 32px;
        font-weight: bold;
        color: #444444;
        padding-left: 40px;
        line-height: 100px;
    }
    .shop_price span{
        font-weight: normal;
        color: #F06C00;
    }
    .exchang_sec .exchange_btn{
        width: 160px;
        height: 48px;
        font-size: 24px;
        color: #FFFFFF;
        text-align: center;
        line-height: 48px;
        background: linear-gradient(90deg,#FF7200,#FF9600);
        border-radius: 4px;
        -webkit-border-radius: 4px;
        margin-top: 25px;
        margin-right: 40px;
    }
    .exchang_sec .no_exchange_btn{
        display: none;
        width: 160px;
        height: 48px;
        font-size: 24px;
        color: #FFFFFF;
        text-align: center;
        line-height: 48px;
        border-radius: 4px;
        -webkit-border-radius: 4px;
        margin-top: 25px;
        margin-right: 40px;
        background-color: rgba(0,0,0,.3);
    }
    //确定兑换弹框
    .bomb_box{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 30;
        background-color: rgba(0,0,0,.6);
        display: none;
    }
    .bomb_detail{
        width: 620px;
        background-color: #FFFFFF;
        margin: 338px auto 0;
        border-radius: 15px;
        -webkit-border-radius: 15px;
        padding-top: 86px;
        position: relative;
    }
    .bomb_img{
        width: 106px;
        height: 106px;
        background-image: url("./img/exchange.png");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        margin: 0 auto;

    }
    .bomb_explain{
        font-family: 'PingFangSC Regular';
        font-size: 32px;
        text-align: center;
        color: #444444;
        margin: 19px 0 65px;
    }
    .deter_btn,.cancel_btn{
        width: 50%;
        height: 90px;
        line-height: 90px;
        border-top: 1px solid #EEEEEE;
        font-size: 32px;
        text-align: center;
        box-sizing:border-box;
    }
    .deter_btn{
        border-right: 2px solid #EEEEEE;
        color: #F06C00;
    }
    .cancel_btn{
        color: #444444;
    }
    //验证手机弹框
    .tel_wrap{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0, .6);
        z-index: 40;
        display: none;
    }
    .tel_wrap .tel {
        width: 620px;
        height: 540px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 99;
        background-color: #ffffff;
        border-radius: 20px;
        padding: 34px 18px 44px;
    }
    .tel .close {
        width: 36px;
        height: 36px;
        background: url("./img/close-icon.png") center no-repeat;
        background-size: 36px 36px;
        position: absolute;
        right: 20px;
        top: 20px;
    }
    .tel > p {
        font-size: 36px;
        color: #333333;
        text-align: center;
        font-weight: bolder;
        padding-bottom: 89px;
    }
    .login_tel {
        padding-bottom: 20px;
        border-bottom: 1px solid gray;
    }
    .login_tel input {
        display: block;
        font-size: 36px;
        color: #666666;
    }
    input::-webkit-input-placeholder {
        color: #e5e5e5;
    }
    :-moz-placeholder {
        color: #e5e5e5;
    }
    ::-moz-placeholder {
        color: #e5e5e5;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #e5e5e5;
    }
    .tel-err,.yan-err {
        // padding-left: 10px;
        margin-top: 13px;
        font-size: 24px;
        color: #C7000B;
        display: none;
        // position: absolute;
        // left: 0;
        // bottom: 0;
    }
    .yan-err {
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .tel .message {
        padding-top: 20px;
        overflow: hidden;
        position: relative;
    }
    .tel .message .code {
        width: 308px;
        height: 65px;
        line-height: 65px;
        float: left;
    }
    .login_tel .send {
        width: 187px;
        height: 35px;
        line-height: 35px;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -18px;
        text-align: center;
        font-size: 28px;
        color: #444444;
        border-left: 1px solid gray;
    }
    .verify {
        width: 593px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        color: white;
        font-size: 36px;
        position: absolute;
        left: 50%;
        margin-left: -297px;
        bottom: 37px;
        background: linear-gradient(to bottom,#FF9500,#FF7200);
        border-radius: 8px;
    }
    //卡券领取成功弹窗
    .receive_success_box{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 40;
        background-color: rgba(0,0,0,.6);
        display: none;
        .receive_detail{
            background-color: #ffffff;
            width: 620px;
            margin: 225px auto 0;
            padding: 50px 0 30px;
            border-radius: 10px;
            -webkit-border-radius: 10px;
        }
        .receive_detail .success_info{
            font-size: 36px;
            color: #000000;
            font-family: 'PingFangSC Regular';
            padding: 0 75px;
            text-align: center;
        }
        .receive_detail .receive_know_btn{
            margin: 70px auto 0;
            width: 590px;
            height: 88px;
            background: linear-gradient(to bottom,#FF7200,#FF9500);
            color: #FFFFFF;
            font-size: 30px;
            text-align: center;
            line-height: 88px;
            border-radius: 8px;
            -webkit-border-radius: 8px;
        }
        .receive_detail img{
            margin: 0 auto 60px;
            width: 163px;
            height: 163px;
            display: block;
        }
        .receive_detail .seccess_send{
            font-size: 20px;
            padding: 0 128px;
            line-height: 30px;
            color: #515151;
            margin-top: 5px;
            font-family: 'PingFangSC Regular';
            text-align: center;
        }
        .receive_detail .seccess_send span{
            color: #FF7E09;
        }
    }
    
    /*卡券兑换失败弹框*/
    .receive_error_box{
        width: 240px;
        height: 240px;
        position: absolute;
        z-index: 30;
        background-color: rgba(0,0,0,.6);
        border-radius: 8px;
        -webkit-border-radius: 8px;
        left: 50%;
        top: 50%;
        margin-left: -120px;
        margin-top: -120px;
        text-align: center;
        display: none;
    }
    .receive_error_box img{
        width: 24px;
        display: block;
        margin: 33px auto;
    }
    .receive_error_box p{
        font-size: 34.5px;
        color: #FFFFFF;
    }
    //关注微信公众号弹框
    .isSubscribeBox{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .6);
        z-index: 40;
        display: none;
        .verDetailBox{
            position: relative;
            width: 620px;
            height: 831px;
            background-image: url("./img/ver-bg.png");
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: cover;
            margin: 0px auto;
            top: 50%;
            transform: translateY(-50%);
            .verClose{
                position: absolute;
                width: 49px;
                height: 49px;
                background-image: url("./img/ver-close.png");
                background-repeat: no-repeat;
                background-position: 50%;
                background-size: cover;
                top: 17px;
                right: 16px;
            }
            .crCode-info{
                font-size: 32px;
                position: absolute;
                top: 111px;
                left:50%;
                transform: translateX(-46%);
                width: 512px;
                p{
                    text-align: left;
                    color: #C7000B;
                    line-height: 50px;
                    em{
                        font-weight: bold;
                    }
                }
            }
            .crCode-pic{
                position: absolute;
                width: 312px;
                height: 312px;
                top:361px;
                left: 50%;
                transform: translateX(-50%);
                // background-image: url("./img/ver-close.png");
                // background-repeat: no-repeat;
                // background-position: 50%;
                // background-size: cover;
            }
            .crCode-pic img{
                width: 312px;
                height: 312px;
            }
            .long-follow{
                position: absolute;
                box-sizing: border-box;
                white-space: nowrap;
                width:312px;
                height: 42px;
                line-height: 42px;
                left: 50%;
                top: 680px;
                transform: translateX(-50%);
                color: #C7000B;
                font-size: 24px;
                text-align: center;
                font-family: 'PingFangSC-Medium';
                font-weight: bold;
                border: 4px solid transparent;
                border-top-colors: #FAFBC8; 
                border-right-colors: #FAFBC8 #E6B312; 
                border-bottom-colors: #E6B312; 
                border-left-colors: #FAFBC8 #E6B312;
                -webkit-border-top-colors: #FAFBC8; 
                -webkit-border-right-colors: #FAFBC8 #E6B312; 
                -webkit-border-bottom-colors: #E6B312; 
                -webkit-border-left-colors: #FAFBC8 #E6B312;
            }
        }
    }
    
</style>