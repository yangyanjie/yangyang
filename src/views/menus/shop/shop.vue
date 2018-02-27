<template>
    <div>
        <sa-page-load ishow="1"></sa-page-load>
        <main class="main">
            <!--<div class="header_banner"></div>
            <div class="header_sec">
                <div class="header_wrap">
                    <div id="header">
                        <a href="javascript:" class="be zs_h1"></a>
                        <a :href="'../menus/shop-apologize.html?t='+tDate" class="be zs_h2"></a>
                    </div>
                    <div class="headerNav">
                        <ul>
                            <li class="headerList now_HeaderList"></li>
                            <li class="headerList"></li>
                        </ul>
                    </div>
                </div>
            </div>-->
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <!-- 物流停用 -->
                    <div class="swiper-slide">
                        <img src="./img/material-outage.jpg">
                    </div>
                    <div class="swiper-slide">
                        <img src="./img/banner-top.png">
                    </div>
                    <!--<div class="swiper-slide" @click="gotoApologize()">
                        <img src="./img/banner-apologize.jpg">
                    </div>-->
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
            <div class="login_show clearfix">
                <div class="lf" id="myIntegral" md="jf_01_menu_01" md_name="我的荷石币">
                    <a :href="'../menus/shop-integral.html?t='+tDate" md="jf_01_menu_01" md_name="我的荷石币">
                        <img src="./img/shop-1.png"/>
                        <p>我的荷石币</p>
                    </a>
                </div>  
                <div class="lf" id="myPacket" md="jf_01_menu_02" md_name="我的口袋">
                    <a :href="'../menus/shop-pocket.html?t='+tDate" md="jf_01_menu_02" md_name="我的口袋">
                        <img src="./img/shop-2.png"/>
                        <p>我的口袋</p>
                    </a>
                </div>
                <div class="lf" id="rulesExplain" md="jf_01_menu_03" md_name="荷石币规则">
                    <a :href="'../menus/shop-rule.html?t='+tDate" md="jf_01_menu_03" md_name="荷石币规则">
                        <img src="./img/shop-3.png"/>
                        <p>荷石币规则</p>
                    </a>
                </div>
            </div>
            <div class="banner_sec">
                <div class="banner_wrap">
                    <div ref="banner" class="banner">
                        <a :href="'../menus/shop-game.html?t='+tDate" class="ban" ref="be"></a>
                    </div>
                </div>
            </div>
            <!--精选优惠券-->
             <div class="coupon_sec">
                <div class="coupon_title clearfix" md="jf_01_menu_04" md_name="精选优惠券">
                    <div class="title_icon lf"></div>
                    <div class="explain lf">精选优惠券</div>
                    <!--<div class="title_back rf"></div>-->
                </div>
                <div class="card_sec clearfix" id="cardSec">
                   <!--<div class="card_detail">
                        <div class="card_img"></div>
                        <p class="card_name">唯品会20元购物券</p>
                        <div class="card_brief">
                            <p>100<span>克拉</span></p><s>180克拉</s>
                        </div>
                        <div class="exchange_btn">立即兑换</div>
                    </div>
                    <div class="card_detail">
                        <div class="card_img"></div>
                        <p class="card_name">唯品会20元购物券唯品会20元购物券</p>
                        <div class="card_brief">
                            <p>100<span>克拉</span></p><s>180克拉</s>
                        </div>
                        <div class="exchange_btn">立即兑换</div>
                    </div>-->
                </div>
            </div>
            <!--家居日用品-->
            <div class="home_sec">
                <div class="home_title clearfix" md="jf_01_menu_05" md_name="实物兑换">
                    <div class="home_title_icon lf"></div>
                    <div class="explain lf">实物兑换</div>
                    <!--<div class="title_back rf"></div>-->
                </div>
                <div class="home_item_sec clearfix">
                    <!--<div class="home_detail">
                        <div class="home_img"></div>
                        <p class="home_name">木烟斗木烟斗木烟斗木烟斗</p>
                        <div class="home_brief clearfix">
                            <div class="home_exchange_btn lf">立即兑换</div>
                            <div class="home_gold lf"></div>
                            <p class="lf">100<span>分</span></p>
                        </div>
                    </div>
                    <div class="home_detail">
                        <div class="home_img"></div>
                        <p class="home_name">木烟斗木烟斗木烟斗木烟斗</p>
                        <div class="home_brief clearfix">
                            <div class="home_exchange_btn lf">立即兑换</div>
                            <div class="home_gold lf"></div>
                            <p class="lf">100<span>分</span></p>
                        </div>
                    </div>
                    <div class="home_detail">
                        <div class="home_img"></div>
                        <p class="home_name">木烟斗木烟斗木烟斗木烟斗</p>
                        <div class="home_brief clearfix">
                            <div class="home_exchange_btn lf">立即兑换</div>
                            <div class="home_gold lf"></div>
                            <p class="lf">100<span>分</span></p>
                        </div>
                    </div>-->
                </div>
            </div>
            <div class="white"></div>
            <div class="tabs">
                <div>
                    <a :href="'home.html?t='+tDate" md="hb_1_nav_01" md_name="扫码验真">
                        <img src="./img/tab_icon_scan.png"/>
                        <p>扫码验真</p>
                    </a>
                </div>
                <div>
                    <a :href="'center.html?t='+tDate" md="hb_1_nav_02" md_name="活动中心">
                        <img src="./img/tab_icon_activity.png" />
                        <p>活动中心</p>
                    </a>
                </div>
                <div>
                    <a href="javascript:" md="hb_1_nav_03" md_name="钻石商城">
                        <img src="./img/tab_icon_shop_sel.png" />
                        <p class="tabs-active">钻石商城</p >
                    </a>
                </div>
                <div>
                    <a :href="'person.html?t='+tDate" md="hb_1_nav_04" md_name="个人中心">
                        <img src="./img/tab_icon_my.png" />
                        <p>个人中心</p >
                    </a>
                </div>
            </div>
            <div id="statistics" data-pageid="3001" class="hidden"></div>
            <div ref="activityId" id="mdActiveId" data-id='scoremall003' class="hidden"></div>
        </main>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import Lib from 'assets/js/Lib.js'
    import $ from 'jquery'

    export default {
        data() {
            return {
                tDate: new Date().getTime(),
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
            this.getCoupon();
            this.getHome();
            // this.initHeader();
            this.initSwiper();
        },
        //相关操作事件
        methods: {
            getCoupon : function(){
                sessionStorage.setItem('jf_index',true);
                //获取精选优惠券
                let activityId = this.$refs.activityId.getAttribute('data-id');
                let that = this;
                Lib.ajax({
                    url: '/act/rule/'+activityId,
                    method: 'post',
                    data: {
                        'name': 'itemlist',
                        'catId': 1,
                        'pageNo': 1,
                        'pageSize': 20
                    },
                    success: function (res) {
                        if(res.code === 1){
                            var dataArr = res.context.data;
                            for(var i = 0; i<dataArr.length;i++){
                                var cardItemStr = '<div class="card_detail" md="jf_01_gift_'+dataArr[i].productId+'" md_name="'+dataArr[i].memo+'" data-id="'+dataArr[i].productId+'" data-type="'+dataArr[i].type+'">'+
                                    '<div class="card_img" id="card_'+dataArr[i].productId+'"></div>'+
                                    '<p class="card_name">'+dataArr[i].memo+'</p>'+
                                    '<div class="card_brief">'+
                                    // '<img src="https://weiopn.oss-cn-beijing.aliyuncs.com/scoremall/img/integral_icon.png" />'+
                                    '<p>'+dataArr[i].score+'<span>荷石币</span></p>'+
                                    '</div>'+
                                    '<div class="exchange_btn">立即兑换</div>'+
                                    '</div>';
                                $('#cardSec').append(cardItemStr);
                                $('#card_'+dataArr[i].productId).css('background-image','url("'+dataArr[i].image+'")');
                            }
                            $('.card_detail').bind('click',function(){
                                var curCardItem = $(this);
                                that.getDetailById(curCardItem.attr('data-id'),curCardItem.attr('data-type'));
                            })
                        }
                    }
                });
            },
            getHome : function(){
                sessionStorage.setItem('jf_index',true);
                //获取实物兑换
                let activityId = this.$refs.activityId.getAttribute('data-id');
                let that = this;
                Lib.ajax({
                    url: '/act/rule/'+activityId,
                    method: 'post',
                    data: {
                        'name': 'itemlist',
                        'catId': 2,
                        'pageNo': 1,
                        'pageSize': 20
                    },
                    success: function (res) {
                        if(res.code === 1){
                            var dataHomeArr = res.context.data;
                            for(var j = 0;j<dataHomeArr.length;j++){
                                var homeItemStr = '<div class="home_detail"  md_name="'+dataHomeArr[j].memo+'" md="jf_01_gift_'+dataHomeArr[j].productId+'" data-id="'+dataHomeArr[j].productId+'" data-type="'+dataHomeArr[j].type+'">'+
                                            '<div class="home_img" id="home_'+dataHomeArr[j].productId+'"></div>'+
                                            '<p class="home_name">'+dataHomeArr[j].memo+'</p>'+
                                            '<div class="home_brief">'+
                                            // '<img src="https://weiopn.oss-cn-beijing.aliyuncs.com/scoremall/img/integral_icon.png"/>'+
                                            '<p>'+dataHomeArr[j].score+'<span>荷石币</span></p>'+
                                            '</div>'+
                                            '<div class="exchange_btn" md_name="'+dataHomeArr[j].memo+'" md="'+dataHomeArr[j].productId+'">立即兑换</div>'+
                                            '</div>';
                                $('.home_item_sec').append(homeItemStr);
                                $('#home_'+dataHomeArr[j].productId).css('background-image','url("'+dataHomeArr[j].image+'")');
                            }
                            $('.home_detail').bind('click',function(){
                                var curHomeItem = $(this);
                                that.getDetailById(curHomeItem.attr('data-id'),curHomeItem.attr('data-type'));
                            })
                        }
                    }
                });
            },
            showAllCoupon : function(){
                window.location.href = '../menus/shop-coupons.html?sourceId=3001&t='+new Date().getTime();
            },
            showAllEntity : function(){
                window.location.href = '../menus/shop-entity.html?sourceId=3001&t='+new Date().getTime();
            },
            getDetailById : function(productId,productType){
                window.location.href = '../menus/shop-shopdetail.html?sourceId=3001&productId='+ productId +'&productType='+productType+'&t='+new Date().getTime();
            },
            initHeader: function(){
                //初始化轮播信息
                if ($('.be').length >= 2) {
                    $('#header').append($('.be:first').clone());
                    $('#header').prepend($('.be:nth-last-of-type(2)').clone());
                    $('#header').width($('.be').length * 100 + "%");
                    $('.be').width(100 / $('.be').length + "%");
                    $('#header').css("left", "-100%");

                    var index = 1;
                    var Throttle = true;
                    var ks, js;
                    /*定义开始和结束*/
                    var time;
                    /*定时器*/
                    /*移动*/
                    function moved(i) {
                        index = index + i;
                        $('#header').css({
                            "transition": "all .3s linear",
                            "left": -index * 100 + "%"
                        });
                    }
                    time = setInterval(function () {
                        moved(1);
                    }, 4000);
                    /*监听transition事件，判断index值。*/
                    $(window).bind("transitionend", function () {
                        if (index >= $('.be').length - 1) {
                            index = 1;
                        } else if (index <= 0) {
                            index = $('.be').length - 2;
                        }
                        /*小圆点*/
                        $('.headerList').each(function () {
                            $(this).removeClass('now_HeaderList')
                        }).add($('.headerList')).eq(index - 1).addClass('now_HeaderList');

                        $('#header').css({
                            left: -index * $('.be').width(),
                            transition: "",
                            webkitTransition: ""
                        })
                    });
                    /*绑定touch事件*/
                    $('#header').on("touchstart", function (e) {
                        /*清除定时器*/
                        clearInterval(time);
                        ks = e.originalEvent.touches[0].clientX;
                        $('.be').css("transition", 'all 0s');
                    });
                    $('#header').bind("touchmove", function (e) {
                        e.preventDefault();
                        //js = e.touches[0].clientX;
                        js = e.originalEvent.touches[0].clientX;
                        if (Throttle) {
                            $('#header').css("marginLeft", js - ks)
                        }
                    });
                    $('#header').bind("touchend", function (e) {
                        /*重置定时器*/
                        clearInterval(time);
                        time = setInterval(function () {
                            moved(1);
                        }, 4500);
                        /*单机或者双击判断*/
                        if (js == 0) {
                            ks = 0;
                        }
                        $('#header').css("marginLeft", 0);
                        if (Throttle) {
                            /*判断是否滑到下一张*/
                            if ((js - ks) > 50) {
                                moved(-1);
                                $('.pause').each(function () {
                                    $(this).get(0).pause();
                                    $(this).get(0).controls = false;
                                    $(this).siblings('img').show().add($(this)).addClass('play')
                                            .add($(this)).removeClass('pause').add($(this)).find("p").show();
                                });
                                /*重置移动距离*/
                                js = 0;
                                Throttle = false;
                                setTimeout(function () {
                                    Throttle = true;
                                }, 500);
                                return;
                            }
                            if ((js - ks) < -50) {
                                moved(1);
                                js = 0;
                                $('.pause').each(function () {
                                    $(this).get(0).pause();
                                    $(this).get(0).controls = false;
                                    $(this).siblings('img').show().add($(this)).addClass('play')
                                            .add($(this)).removeClass('pause').add($(this)).find("p").show();
                                });
                                Throttle = false;
                                setTimeout(function () {
                                    Throttle = true;
                                }, 500);
                                return;
                            }
                        }
                    });
                } else {
                    $('#header').width($('.be').length * 100 + "%");
                    $('.be').width(100 + "%");
                    $(".headerNav").hide();
                }
            },
            initSwiper: function(){
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    loop:true,
                    grabCursor: true,
                    paginationClickable: true,
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false
                });
            },
            gotoApologize: function(){
                window.location.href = "../menus/shop-apologize.html?t="+new Date().getTime();
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
        background-color: #F0EFED;
    }
    html, body {
        position: relative;
        height: 100%;
    }
    .swiper-container {
        width: 100%;
        height: 482px;
    }
    .swiper-wrapper img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    /*.header{
        position: relative;
        width: 100%;
        height: 482px;
        background-image: url("./img/banner-top.png");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        
    }*/
    .header_sec{
        width: 100%;
        height: 482px;
    }
    .header_wrap {
        width: 100%;
        height: 482px;
        position: relative;
        overflow: hidden;
    }
    #header{
        position: absolute;
        width: 500%;
        height: 100%;
        left: 0;
        top: 0;
    }
    #header .be {
        display: block;
        width: 20%;
        float: left;
        height: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
    }
    .headerNav {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        bottom: 20px;
    }
    .headerNav .headerList {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        float: left;
        margin-right: 8px;
        background-color: #666666;
    }
    .headerNav .now_HeaderList {
        background-color: #FFFFFF;
    }
    #zs_h1{
        background-image: url("./img/banner-top.png");
    }
    #zs_h2{
        background-image: url("./img/banner-apologize.jpg");
    }
    
    .login_show{
        position: absolute;
        width: 100%;
        // margin-top: 482px;
        padding: 27px 0 25px;
        background-color: #C21D0A;
    }
    .login_show div{
        width: 33.33%;
        text-align: center;
    }
    .login_show div img{
        width: 37px;
        height: 36px;
        display: block;
        margin: 0 auto 9px;
    }
    .login_show div p{
        font-size: 24px;
        color: #FAFBC8;
    }
    /*banner_sec*/
    .banner_sec{
        width: 100%;
        height: 260px;
        margin-top: 150px;
        .banner_wrap {
            width: 100%;
            height: 260px;
            position: relative;
            overflow: hidden;
        }
        .banner {
            position: absolute;
            width: 500%;
            height: 100%;
            left: 0;
            top: 0;
        }
        .banner .ban {
            display: block;
            width: 20%;
            float: left;
            height: 100%;
            background-image: url("./img/banner-game.png");
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: cover;
        }
    }
    /*精选优惠券*/
    .coupon_title{
        margin-top: 20px;
        background-color: #C52A18;
        position: relative;
    }
    .coupon_title .title_icon{
        width: 32px;
        height: 26px;
        background-image: url("./img/title-icon-coupon.png");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        margin: 32px 20px 0;
    }
    .coupon_title .explain{
        font-size: 34px;
        color: #FAFBC8;
        line-height: 90px;
    }
    .coupon_title .title_back{
        width: 20px;
        height: 20px;
        background-image: url("./img/icon-more.png");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        margin: 40px 20px 0 0;
    }
    .card_sec{
        width: 100%;
        background: linear-gradient(to bottom,#CA2828,#E63F24,#E85113);
    }
    .card_detail{
        box-sizing:border-box;
        -webkit-box-sizing:border-box; /* Safari */
        width:50%;
        float:left;
        padding: 20px 0;
        border-top: 1px solid #ddd;
    }
    .card_sec .card_detail:nth-child(odd){
        border-right: 1px solid #ddd;
    }
    .card_detail .card_img{
        width: 303px;
        height: 148px;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        margin: 0 auto;
    }
    .card_detail .card_name{
        font-size: 30px;
        color: #FEFBEC;
        height: 40px;
        text-align: center;
        padding: 42px 22px 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
    .card_brief{
        text-align: center;
        line-height: 30px;
    }
    .card_brief img{
        width: 24px;
        height: 24px;
        vertical-align: middle;
    }
    .card_brief p{
        font-size: 30px;
        color: #FEFBEC;
        padding: 0 20px;
        vertical-align: middle;
        display: inline;
    }
    .card_brief p span{
        font-size: 28px;
    }
    .card_brief s{
        font-size: 24px;
        color: #FEFBEC;
        padding-left: 10px;
    }
    .exchange_btn{
        width: 200px;
        height: 48px;
        font-size: 24px;
        color: #E1211F;
        line-height: 48px;
        text-align: center;
        margin: 15px auto 0;
        background-image: url('./img/btn-bg.png');
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        border-radius: 4px;
    }
    .white{
        width: 100%;
        height: 20px;
        background-color: #FFFFFF;
        padding-bottom: 118px;
        box-sizing: border-box;
    }
    /*tabs*/
    .tabs {
        width: 100%;
        height: 98px;
        background-color: rgba(51,48,45,1);
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 99;
        a {
            display: block;
            text-align: center;
            color: rgba(200,200,200,1);
            img {
                display: block;
                width: 44px;
                height: 44px;
                margin: 0 auto 10px;
            }
        }
        div:nth-of-type(4) img {
            width: 37px;
            height: 38px;
        }
        .tabs-active {
            color: rgba(255,122,0,1);
        }
    }
    /*家居日用品*/
    .home_sec{
        width: 100%;
        margin-top: 20px;
    }
    .home_item_sec{
        background: linear-gradient(to bottom,#c85113,#e63f24,#e85113);
        // background-color: #d42c19;
    }
    .home_detail{
        box-sizing: border-box;
        -webkit-box-sizing: border-box; /* Safari */
        width:50%;
        float:left;
        padding: 30px 0 20px;
        border-top: 1px solid #ddd;
        background: linear-gradient(to right,rgba(208,70,70,0.35),rgba(226,99,99,0.35),rgba(240,126,93,0.35));
    }
    .home_item_sec .home_detail:nth-child(odd){
        border-right: 1px solid #ddd;
    }
    .home_detail .home_img{
        width: 152px;
        height: 152px;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        margin: 0 auto;
    }
    .home_detail .home_name{
        font-size: 32px;
        width: 330px;
        height: 42px;
        color: #FEFBEC;
        text-align: center;
        margin: 27px auto 0;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .home_brief{
        text-align: center;
        line-height: 30px;
    }
    .home_brief img{
        width: 24px;
        height: 24px;
        vertical-align: middle;
    }
    .home_brief p{
        font-size: 28px;
        color: #FEFBEC;
        padding: 0 10px;
        vertical-align: middle;
        display: inline;
    }
    .home_brief p span{
        font-size: 24px;
    }
    .home_exchange_btn{
        width: 280px;
        height: 48px;
        font-size: 22px;
        color: #E1211F;
        line-height: 48px;
        text-align: center;
        margin: 18px auto 0;
        background-color: #B96E88;
        border-radius: 4px;
    }
    .home_sec{
        background-color: #FFFFFF;
        width: 100%;
    }
    .home_title{
        background-color: #E85113; //d42c19 
    }
    .home_title .home_title_icon{
        width: 34px;
        height: 34px;
        background-image: url("./img/title_icon_home.png");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        margin: 26px 20px 0;
        border-radius: 4px;
        -webkit-border-radius: 4px;
    }
    .home_title .explain{
        font-size: 34px;
        color: #FAFBC8;
        line-height: 88px;
    }
    .home_title .title_back{
        width: 20px;
        height: 20px;
        background-image: url("./img/icon-back.png");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        margin: 34px 20px 0 0;
    }

</style>