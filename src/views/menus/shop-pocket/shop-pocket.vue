<template>
    <div>
        <sa-page-load ishow="1"></sa-page-load>
        <main class="main">
            <div id="leftTabBox" class="tabBox">
                <div class="hd">
                    <ul>
                        <li data-type="card"><a>卡券</a></li>
                        <li data-type="good"><a>实物</a></li>
                    </ul>
                </div>
                <div class="bd" id="indexTab-bd">
                    <div>
                        <ul id="cardSec">
                            <!--<li class="card_item normal_time clearfix">
                                <div class="card_img lf">
                                    <a href="">
                                        <div class="item_img" id=""></div>
                                    </a>
                                </div>
                                <div class="card_detail">
                                    <div class="card_name">中国移动100M流量</div>
                                </div>
                                <div class="card_exchange clearfix">
                                    <div class="win_time lf">兑换时间：2017/12/18 08:45:23</div>
                                    <div class="card_btn_item get_card_btn lf">待领取</div>
                                </div>
                            </li>
                            <li class="card_item normal_time clearfix">
                                <div class="card_img lf">
                                    <a href="">
                                        <div class="item_img"></div>
                                    </a>
                                </div>
                                <div class="card_detail">
                                    <div class="card_name">中国移动100M流量</div>
                                    <div class="card_no">卡号：1223423423423</div>
                                    <div class="card_pass">卡密：0980345lsidfo08</div>
                                </div>
                                <div class="card_exchange clearfix">
                                    <div class="win_time lf">兑换时间：2017/12/18 08:45:23</div>
                                    <div class="card_btn_item card_order_detail lf">订单详情</div>
                                </div>
                            </li>
                            <li class="card_item over_time clearfix">
                                <div class="card_img lf">
                                    <a href="javascript:">
                                        <div class="item_img"></div>
                                    </a>
                                </div>
                                <div class="card_detail">
                                    <div class="card_name">中国移动100M流量</div>
                                </div>
                                <div class="card_exchange clearfix">
                                    <div class="win_time lf">兑换时间：2017/12/18 08:45:23</div>
                                    <div class="card_btn_item card_over_time lf">已过期</div>
                                </div>
                            </li>
                            <li class="card_item normal_time clearfix">
                                <div class="card_img lf">
                                    <a href="">
                                        <div class="item_img"></div>
                                    </a>
                                </div>
                                <div class="card_detail">
                                    <div class="card_name">中国移动100M流量</div>
                                </div>
                                <div class="card_exchange clearfix">
                                    <div class="win_time lf">兑换时间：2017/12/18 08:45:23</div>
                                    <div class="card_btn_item card_wait lf">发放中</div>
                                </div>
                            </li>-->
                        
                        </ul>
                        <div id="noCard">
                            <div class="no_item_img"></div>
                            <div class="no_item_explain">空空如也</div>
                        </div>
                    </div>
                    <div>
                        <ul id="goodSec"></ul>
                        <div id="noGood">
                            <div class="no_item_img"></div>
                            <div class="no_item_explain">空空如也</div>
                        </div>
                    </div>
                </div>
            </div>
            <!--验证手机号-->
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
                    <p class="seccess_send">奖品已发送至<span id="sendTel"></span>的账户中，请注意查收</p>
                    <div class="receive_know_btn" id="successBtn" @click="gotoIndex()">我知道了</div>
                </div>
            </div>
            <!--卡券领取失败-->
            <div class="receive_error_box">
                <img src="./img/error.png"/>
                <p>领取失败</p>
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
                        <img id="codePic" src=""/>
                    </div>
                    <div class="long-follow">长按扫描二维码,关注公众号</div>
                </div>
            </div>
            <div id="statistics" data-pageid="3003" class="hidden"></div>
            <div ref="activityId" id="mdActiveId" data-id='scoremall003' class="hidden"></div>
        </main>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import Lib from 'assets/js/Lib.js'
    import $ from 'jquery'

    let entityPageNum = 1; //默认实物第一页
    let entityTotalPage = 1;  //实物总页数
    let cardPageNum = 1; //默认实物第一页
    let cardTotalPage = 1;  //实物总页数
    //领取卡券
    let receiveSuccessTimer = null;
    let receiveErrorTimer = null;
    let myMobile = '';
    let pattern = /^1[3-9][0-9]{9}$/;  //验证手机号
    //获取验证码
    let countdown=59;
    let started = true;
    let curItem = null;
    let curItemProductId = null;
    let curItemOrderId = null;
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
            this.getUserInfo();
            this.getCardData(cardPageNum);
            this.getEntityData(entityPageNum);
            this.touchTap();
            this.scrollPage();
            this.getVerFollow();
        },
        //相关操作事件
        methods: {
            // 设置滑动容器高度
            tabEndFunction : function(i) {
                var bd = document.getElementById("indexTab-bd");
                // 设置tab容器高度，最小高度为减去nav高度，减去底部按钮容器高度，减去container的padding-bottom； +2的目的是固定定位的nav到顶部时再滑动会抖动，因为距离正好
                //var tabConHeight = window.innerHeight - document.getElementsByClassName('hd')[0].offsetHeight - parseInt($('.container').css('paddingBottom')) + 2;
                var tabConHeight = window.innerHeight - document.getElementsByClassName('hd')[0].offsetHeight ;
                if(bd.children[i].children[0].offsetHeight > tabConHeight) {
                    bd.parentNode.style.height = bd.children[i].children[0].offsetHeight+"px";
                    bd.style.height = bd.children[i].children[0].offsetHeight+"px";
                } else {
                    bd.parentNode.style.height = tabConHeight+"px";
                    bd.style.height = tabConHeight+"px";
                }
                if(i>0) bd.parentNode.style.transition="700ms";//添加动画效果
            },
            touchTap: function(){
                let that = this;
                TouchSlide({
                    slideCell:"#leftTabBox",
                    endFun : function(i){
                        that.tabEndFunction(i);
                    }
                });
            },
            strRegion : function(timeStr){
                if(parseInt(timeStr) <= 9){
                    return '0'+timeStr;
                }
                return timeStr;
            },
            timesFormatStr: function(times){
                let that = this;
                return times.getFullYear() + "/" + that.strRegion((times.getMonth() + 1)) + "/" + that.strRegion(times.getDate()) + " " + that.strRegion(times.getHours()) + ":" + that.strRegion(times.getMinutes())+ ":" + that.strRegion(times.getSeconds());
            },
            getCardData: function(curCardPage){
                //获取卡券列表信息
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                Lib.ajax({
                    method: 'post',
                    url: '/act/rule/'+activityId,
                    data:{
                        name: 'orderlist',
                        type: 2,
                        pageNo: curCardPage,
                        pageSize: 10
                    },
                    success: function (data) {
                        if(data.code === 1){
                            var cardArr = data.context.data;
                            cardTotalPage = data.context.totalPage;
                            if(cardArr.length > 0){
                                for(var j=0;j<cardArr.length;j++){
                                    var d = new Date(cardArr[j].ctime);
                                    //时间转换
                                    var timeStr = that.timesFormatStr(d);
                                    var liStr = '';
                                    switch(cardArr[j].status){
                                        case 0:
                                        case 3:
                                            liStr = '<li class="card_item normal_time clearfix">'+
                                                    '<div class="card_img lf">'+
                                                    '<a href="../menus/shop-shopdetail.html?sourceId=3003&productId='+cardArr[j].productId+'&type='+cardArr[j].type+'&t='+new Date().getTime()+'">'+
                                                    '<div class="item_img" id="cardItemImg'+ cardArr[j].orderId +'"></div>'+
                                                    '</a>'+
                                                    '</div>'+
                                                    '<div class="card_detail">'+
                                                    '<div class="card_name">'+cardArr[j].memo+'</div>'+
                                                    '</div>'+
                                                    '<div class="card_exchange clearfix">'+
                                                    '<div class="win_time lf">兑换时间：'+timeStr+'</div>'+
                                                    '<div class="card_btn_item get_card_btn lf" id="'+cardArr[j].orderId+'" data-id="'+cardArr[j].orderId+'"'+
                                                        'data-type="'+cardArr[j].type+'" md="'+cardArr[j].orderId+'" md_name="'+cardArr[j].memo+'">待领取</div>'+
                                                    '</div>'+
                                                    '</li>';
                                            break;
                                        case 2:
                                            var codeNum = cardArr[j].orderdetails[0].code;
                                            var codeStr = '';
                                            if(codeNum != null && codeNum != ''){
                                                codeStr ='<div class="card_no">卡号：'+codeNum+'</div>';
                                            }
                                            var secretNum = cardArr[j].orderdetails[0].secret;
                                            var secretStr = '';
                                            if(secretNum != null && secretNum != ''){
                                                secretStr = '<div class="card_pass">卡密：'+secretNum+'</div>';
                                            }
                                            liStr = '<li class="card_item normal_time clearfix">'+
                                                    '<div class="card_img lf">'+
                                                    '<a href="../menus/shop-shopdetail.html?sourceId=3003&productId='+cardArr[j].productId+'&type='+cardArr[j].type+'&t='+new Date().getTime()+'">'+
                                                    '<div class="item_img" id="cardItemImg'+ cardArr[j].orderId +'"></div>'+
                                                    '</a>'+
                                                    '</div>'+
                                                    '<div class="card_detail">'+
                                                    '<div class="card_name">'+cardArr[j].memo+'</div>'+ codeStr+secretStr+
                                                    '</div>'+
                                                    '<div class="card_exchange clearfix">'+
                                                    '<div class="win_time lf">兑换时间：'+timeStr+'</div>'+
                                                    '<div class="card_btn_item card_order_detail lf" data-orderId="'+cardArr[j].orderId+'" md="'+cardArr[j].orderId+'" md_name="'+cardArr[j].memo+'">订单详情</div>'+
                                                    '</div>'+
                                                    '</li>';
                                            break;
                                        case 4:
                                            liStr = '<li class="card_item over_time clearfix">'+
                                                    '<div class="card_img lf">'+
                                                    '<a href="javascript:">'+
                                                    '<div class="item_img" id="cardItemImg'+ cardArr[j].orderId +'"></div>'+
                                                    '</a>'+
                                                    '</div>'+
                                                    '<div class="card_detail">'+
                                                    '<div class="card_name">'+cardArr[j].memo+'</div>'+
                                                    '</div>'+
                                                    '<div class="card_exchange clearfix">'+
                                                    '<div class="win_time lf">兑换时间：'+timeStr+'</div>'+
                                                    '<div class="card_btn_item card_over_time lf" md="'+cardArr[j].orderId +'" md_name="'+cardArr[j].memo+'">已过期</div>'+
                                                    '</div>'+
                                                    '</li>';
                                            break;
                                        case 5:
                                            liStr='<li class="card_item normal_time clearfix">'+
                                                    '<div class="card_img lf">'+
                                                    '<a href="../menus/shop-shopdetail.html?sourceId=3003&productId='+cardArr[j].productId+'&type='+cardArr[j].type+'&t='+new Date().getTime()+'">'+
                                                    '<div class="item_img" id="cardItemImg'+ cardArr[j].orderId +'"></div>'+
                                                    '</a>'+
                                                    '</div>'+
                                                    '<div class="card_detail">'+
                                                    '<div class="card_name">'+cardArr[j].memo+'</div>'+
                                                    '</div>'+
                                                    '<div class="card_exchange clearfix">'+
                                                    '<div class="win_time lf">兑换时间：'+timeStr+'</div>'+
                                                    '<div class="card_btn_item card_wait lf" md="'+cardArr[j].orderId +'" md_name="'+cardArr[j].memo+'">发放中</div>'+
                                                    '</div>'+
                                                    '</li>';
                                            break;
                                        default :
                                    }
                                    $('#cardSec').append(liStr);
                                    $('#cardItemImg'+cardArr[j].orderId).css('background-image','url("'+cardArr[j].image+'")');
                                    //待领取
                                    $('#'+cardArr[j].orderId).bind('click',function(){
                                        if(myMobile != null && myMobile != ''){
                                            var curCardItem = $(this);
                                            that.exchangeCard(curCardItem.attr('data-id'),curCardItem.attr('data-type'));
                                            curItem = curCardItem.attr('data-type');
                                            curItemProductId = curCardItem.attr('data-id');
                                            curItemOrderId = curCardItem.attr('data-id');
                                        }else{
                                            $('.tel_wrap').show();
                                            $(".tel_wrap").on('touchmove', function(event) { event.preventDefault(); }, false);
                                            var curCardItem = $(this);
                                            curItem = curCardItem.attr('data-type');
                                            curItemProductId = curCardItem.attr('data-id');
                                            curItemOrderId = curCardItem.attr('data-id');
                                        }
                                    })
                                    //查看订单详情
                                    $('.card_order_detail').bind('click',function(){
                                        var curDetailCardItem = $(this);
                                        that.getDetailByOrderId(curDetailCardItem.attr('data-orderId'));
                                    })
                                    that.tabEndFunction(0);
                                }

                            }else{
                                $('#cardSec').hide();
                                $('#noCard').show();
                            }

                        }
                    }
                });
            },
            getEntityData: function(curEntityPage){
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                //获取实物信息列表
                Lib.ajax({
                    method: 'post',
                    url: '/act/rule/'+activityId,
                    data:{
                        name: 'orderlist',
                        type: 1,
                        pageNo: curEntityPage,
                        pageSize: 10
                    },
                    success: function (data) {
                        if(data.code === 1){
                            var goodArr = data.context.data;
                            entityTotalPage = data.context.totalPage;
                            if(goodArr.length > 0){
                                for(var i=0;i<goodArr.length;i++){
                                    var d = new Date(goodArr[i].ctime);
                                    var goodTimeStr = that.timesFormatStr(d);
                                    //时间转换
                                    var liGoodStr = '';
                                    var timeShowStr = '';
                                    if(goodArr[i].score == 0){
                                        timeShowStr = '<div class="win_time lf">中奖时间：'+goodTimeStr+'</div>';
                                    }else{
                                        timeShowStr = '<div class="win_time lf">兑换时间：'+goodTimeStr+'</div>';
                                    }
                                    switch(goodArr[i].status){
                                        case 0:
                                            liGoodStr = '<li class="card_item normal_time clearfix" md="'+goodArr[i].orderId+'">'+
                                                    '<div class="card_img lf">'+
                                                    '<a href="../menus/shop-shopdetail.html?sourceId=3003&productId='+goodArr[i].productId+'&type='+goodArr[i].type+'&t='+new Date().getTime()+'">'+
                                                    '<div class="item_img" id="goodItemImg'+ goodArr[i].orderId +'"></div>'+
                                                    '</a>'+
                                                    '</div>'+
                                                    '<div class="card_detail">'+
                                                    '<div class="card_name">'+goodArr[i].memo+'</div>'+
                                                    '<div class="card_no">请在7天内领取</div>'+
                                                    '</div>'+
                                                    '<div class="card_exchange clearfix">'+timeShowStr+
                                                    '<div class="card_btn_item get_card_btn lf" id="'+goodArr[i].orderId+'" data-id="'+goodArr[i].productId+'" '+
                                                        'data-type="'+goodArr[i].type+'" data-orderId="'+goodArr[i].orderId+'" md="'+ goodArr[i].orderId +'" md_name="'+goodArr[i].memo+'">待领取</div>'+
                                                    '</div>'+
                                                    '</li>';
                                            break;
                                        case 1:
                                        case 2:
                                            liGoodStr = '<li class="card_item normal_time clearfix">'+
                                                    '<div class="card_img lf">'+
                                                    '<a href="../menus/shop-shopdetail.html?sourceId=3003&productId='+goodArr[i].productId+'&type='+goodArr[i].type+'&t='+new Date().getTime()+'">'+
                                                    '<div class="item_img" id="goodItemImg'+ goodArr[i].orderId +'"></div>'+
                                                    '</a>'+
                                                    '</div>'+
                                                    '<div class="card_detail">'+
                                                    '<div class="card_name">'+goodArr[i].memo+'</div>'+
                                                    '</div>'+
                                                    '<div class="card_exchange clearfix">'+timeShowStr+
                                                    '<div class="card_btn_item card_order_detail lf" data-orderId="'+goodArr[i].orderId+'" md="'+goodArr[i].orderId+'" md_name="'+goodArr[i].memo+'">订单详情</div>'+
                                                    '</div>'+
                                                    '</li>';
                                            break;
                                        case 4:
                                            liGoodStr = '<li class="card_item over_time clearfix">'+
                                                    '<div class="card_img lf">'+
                                                    '<a href="javascript:">'+
                                                    '<div class="item_img" id="goodItemImg'+ goodArr[i].orderId +'"></div>'+
                                                    '</a>'+
                                                    '</div>'+
                                                    '<div class="card_detail">'+
                                                    '<div class="card_name">'+goodArr[i].memo+'</div>'+
                                                    '</div>'+
                                                    '<div class="card_exchange clearfix">'+timeShowStr+
                                                    '<div class="card_btn_item card_over_time lf" md="'+goodArr[i].orderId+'" md_name="'+goodArr[i].memo+'">已过期</div>'+
                                                    '</div>'+
                                                    '</li>';
                                            break;
                                        default :
                                    }
                                    $('#goodSec').append(liGoodStr);
                                    $('#goodItemImg'+goodArr[i].orderId).css('background-image','url("'+goodArr[i].image+'")');
                                    //领取实物
                                    $('#'+goodArr[i].orderId).bind('click',function(){
                                        if(myMobile != null && myMobile != ''){
                                            var curGoodItem = $(this);
                                            that.exchangeCard(curGoodItem.attr('data-id'),curGoodItem.attr('data-type'),curGoodItem.attr('data-orderId'));
                                            curItem = curGoodItem.attr('data-type');
                                            curItemProductId = curGoodItem.attr('data-id');
                                            curItemOrderId = curGoodItem.attr('data-orderId');
                                        }else{
                                            $('.tel_wrap').show();
                                            $(".tel_wrap").on('touchmove', function(event) { event.preventDefault(); }, false);
                                            var curGoodItem = $(this);
                                            curItem = curGoodItem.attr('data-type');
                                            curItemProductId = curGoodItem.attr('data-id');
                                            curItemOrderId = curGoodItem.attr('data-orderId');
                                        }
                                    })
                                    //查看订单详情
                                    $('.card_order_detail').bind('click',function(){
                                        var curDetailGoodItem = $(this);
                                        that.getDetailByOrderId(curDetailGoodItem.attr('data-orderId'));
                                    })
                                    that.tabEndFunction(1);
                                }
                            }else{
                                $('#goodSec').hide();
                                $('#noGood').show();
                            }
                        }
                    }
                });
            },
            getDetailByOrderId : function(orderId){
                //查看订单详情
                window.location.href="../menus/shop-order-detail.html?sourceId=3003&orderId="+orderId+'&t='+new Date().getTime();
            },
            exchangeCard: function(id,type,goodOrderId){
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                if(isFollowStatus == 1){
                    //关注过公众号
                    //兑换卡券
                    if(type == 2){
                        //实物兑换走productId
                        window.location.href = '../menus/shop-myorder.html?sourceId=3003&productId='+id+'&orderId='+goodOrderId+'&t='+new Date().getTime();
                    }else{
                        //卡券兑换走orderId
                        Lib.ajax({
                            url: '/act/rule/'+activityId,
                            method: 'post',
                            data: {
                                name: 'orderaccept',
                                orderid: id,
                                mobile : myMobile
                            },
                            success: function(data){
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
                }else{
                    $('.isSubscribeBox').show();
                    $(".isSubscribeBox").on('touchmove', function(event) { event.preventDefault(); }, false);
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
                                            that.verFollow();
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
                                        if(isFollowStatus == 0){
                                            $('.isSubscribeBox').show();
                                            $(".isSubscribeBox").on('touchmove', function(event) { event.preventDefault(); }, false);
                                        }else{
                                            if(curItem != null){
                                                if(curItem == 2){
                                                    window.location.href = '../menus/shop-myorder.html?sourceId=3003&productId='+curItemProductId+'&orderId='+curItemOrderId;
                                                }else{
                                                    Lib.ajax({
                                                        method: 'post',
                                                        url: '/act/rule/'+activityId,
                                                        data: {
                                                            'name': 'userInfo'
                                                        },
                                                        success: function (data) {
                                                            if(data.code === 1){
                                                                var userObj = data.context;
                                                                myMobile = userObj.mobile;
                                                                Lib.ajax({
                                                                    method: 'post',
                                                                    url: '/act/rule/'+activityId,
                                                                    data: {
                                                                        name: 'orderaccept',
                                                                        orderid: curItemOrderId,
                                                                        mobile : myMobile
                                                                    },
                                                                    success: function(data){
                                                                        if(data.code == 1){
                                                                            $('#sendTel').html(myMobile);
                                                                            $('.receive_success_box').show();
                                                                            $(".receive_success_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                                                                            receiveSuccessTimer = setTimeout(function(){
                                                                                //$('.receive_success_box').hide();
                                                                                window.location.href = '../menus/shop.html?sourceId=3003&t='+new Date().getTime();
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
                                                        }
                                                    });
                                                }
                                            }
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
            getUserInfo : function(){
                //获取用户信息
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
                            var userObj = res.context;
                            myMobile = userObj.mobile;
                        }
                    }
                });
            },
            scrollPage: function(){
                let that = this;
                //滚动页面加载数据
                $(window).scroll(function () {
                    var scrollTop = $(this).scrollTop();
                    var scrollHeight = $(document).height();
                    var windowHeight = $(this).height();
                    if(scrollTop + windowHeight == scrollHeight){
                        //判断当前是否为卡券
                        var curObj = $('.on');
                        var curType = curObj.attr('data-type');
                        if(curType == 'card'){
                            var curCardPage = ++cardPageNum;
                            if(curCardPage <= cardTotalPage){
                                that.getCardData(curCardPage);
                            }
                        }else{
                            var curEntityPage = ++entityPageNum;
                            if(curEntityPage <= entityTotalPage){
                                that.getEntityData(curEntityPage);
                            }
                        }
                    }
                });
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
                            $('#codePic').attr('src',res.context.qrimage);
                        }
                    }
                });
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
        
    }
    .tabBox .hd{ 
        height: 88px;
        width: 100%; 
        line-height:88px;
        font-size: 32px; 
        background: #F5E6D4;
        position:fixed;
        z-index: 30;  
    }
    .tabBox .hd ul{ 
        position:absolute; 
        height:88px; 
        top:0;
        margin-left: 250px; 
        overflow:hidden; 
    }
    .tabBox .hd ul li{ 
        float:left;
        color: #003333;
        width: 68px;
        height: 75px;
    }
    .tabBox .hd ul li:first-child{
        margin-right: 120px;
    }
    .tabBox .hd ul .on{ 
        border-bottom: 4px solid #F06C00; 
        color:#F06C00;
    }
    .tabBox .hd ul .on a{ 
        display: block; /* 修复Android 4.0.x 默认浏览器当前样色无效果bug */  
    }
    .tabBox .bd ul{ 
        padding: 30px 30px 0;
        background-color: #EEEEEE;
        overflow: scroll;
        z-index: 10;
    }
    .tempWrap{
        padding-top: 88px;
    }
    /*我的卡券*/
    .card_item{
        width: 100%;
        height:285px;
        position:relative;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        margin-bottom: 30px;
    }
    .normal_time{
        background-image: url("./img/normal-time.png");
    }
    .over_time{
        background-image: url("./img/over-time.png");
    }
    .card_item .item_img{
        width: 144px;
        height: 130px;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        margin: 40px 30px 0;
    }
    .over_time .item_img{
        -webkit-filter: grayscale(100%);    
        filter: grayscale(100%);
        filter: gray;
    }
    .card_item .card_detail{
        float: left;
        padding-top: 42px;
    }
    .card_detail .card_name{
        font-size: 28px;
        color: #515151;
        font-weight: bold;
    }
    .card_no,.card_pass{
        font-size: 24px;
        color: #888888;
    }
    .card_no{
        margin-top: 23px;
    }
    .card_pass{
        margin-top: 8px;
    }
    .card_exchange{
        position: absolute;
        bottom: 0;
    }
    .card_exchange .win_time{
        font-size: 24px;
        color: #888888;
        line-height: 84px;
        padding-left: 30px;
    }
    .card_btn_item{
        width: 120px;
        height: 48px;
        font-size: 24px;
        text-align: center;
        line-height: 48px;
        margin-top: 18px;
        margin-left: 150px;
    }
    .get_card_btn{
        color: #FFFFFF;
        background: linear-gradient(90deg,#FF7200,#FF9600);
        -webkit-background: linear-gradient(90deg,#FF7200,#FF9600);
        border-radius: 4px;
        -webkit-border-radius: 4px;
    }
    .card_exchange .card_order_detail{
        color: #F06C00;
        background-color: #FFFFFF;
        border: 1px solid #F06C00;
        border-radius: 4px;
        -webkit-border-radius: 4px;
    }
    .card_wait{
        color: #888888;
        background-color: #FFFFFF;
        border: 1px solid #888888;
        border-radius: 1px;
        -webkit-border-radius: 1px;
    }
    .card_exchange .card_over_time{
        color: #888888;
    }
    #noCard,#noGood{
        display: none;
    }
    .no_item_img{
        width: 388px;
        height: 328px;
        background-image: url("./img/no-item.png");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        margin: 150px 0 75px 50%;
        transform: translateX(-50%);
    }
    .no_item_explain{
        font-size: 36px;
        color: #999999;
        text-align: center;
    }
    //验证手机弹框
    .tel_wrap {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .6);
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
        outline: none;
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
        margin-top: 13px;
        font-size: 24px;
        color: #C7000B;
        display: none;
    }
    .yan-err {
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .tel .message {
        padding-top: 10px;
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
        background: linear-gradient(to bottom,#FF7200,#FF9500);
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