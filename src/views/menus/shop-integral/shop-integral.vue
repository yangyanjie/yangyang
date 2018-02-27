<template>
    <div>
        <sa-page-load ishow="1"></sa-page-load>
        <main class="main">
            <div class="banner">
                <div class="person_img"></div>
                <div class="person_name"></div>
                <p class="integral_cont"></p>
            </div>
            <div class="integral_info">
                <h3 class="title">荷石币明细</h3>
                <ul class="integral_detail">
                    <!--<li class="detail_item">
                        <div class="left">
                            <div class="item_title">积分抽奖</div>
                            <div class="item_date">2017-12-12 16:15:50</div>
                        </div>
                        <div class="item_cont">+50</div>
                    </li>
                    <li class="detail_item">
                        <div class="left">
                            <div class="item_title">积分抽奖</div>
                            <div class="item_date">2017-12-12 16:15:50</div>
                        </div>
                        <div class="item_cont">-50</div>
                    </li>-->
                </ul>
                <div id="noIntegral">
                    <div class="no_item_img"></div>
                    <div class="no_item_explain">暂无荷石币明细</div>
                </div>
            </div>
            <div id="statistics" data-pageid="3002" class="hidden"></div>
            <div ref="activityId" id="mdActiveId" data-id='scoremall003' class="hidden"></div>
        </main>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import Lib from 'assets/js/Lib.js'
    import $ from 'jquery'

    let pageNum = 1;
    let totalPage = 1;
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
            this.getIntegralInfo(pageNum);
            this.scrollFlowPoints();
        },
        //相关操作事件
        methods: {
            getIntegralInfo : function(pageNum){
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                Lib.ajax({
                    url: '/act/rule/'+activityId,
                    method: 'post',
                    data: {
                        'name': 'pointflow',
                        'pageNo': pageNum,
                        'pageSize': 20
                    },
                    success: function (res) {
                        if(res.code === 1){
                            var pointsResult = res.context.data;
                            totalPage = res.context.totalPage;
                            if(pointsResult.length > 0){ 
                                for(var i=0;i<pointsResult.length;i++){
                                    var d = new Date(pointsResult[i].createTime);
                                    var dateStr = that.timesFormatStr(d);
                                    var li = '';
                                    if(pointsResult[i].txnType){
                                        li = '<li class="detail_item">' +
                                            '<div class="left">' +
                                                '<div class="item_title">'+ pointsResult[i].txnDesc +'</div>' +
                                                '<div class="item_date">'+ dateStr +'</div>'+
                                            '</div>'+
                                            '<div class="item_cont">+'+ pointsResult[i].txnPoints +'</div>'+
                                        '</li>';
                                    }else{
                                        li = '<li class="detail_item">'+
                                            '<div class="left">' +
                                                '<div class="item_title">'+ pointsResult[i].txnDesc +'</div>' +
                                                '<div class="item_date">'+ dateStr +'</div>'+
                                            '</div>'+
                                            '<div class="item_cont">-'+ pointsResult[i].txnPoints +'</div>'+
                                        '</li>';
                                    }
                                    $('.integral_detail').append(li);
                                }
                            }else{
                                $('.integral_detail').hide();
                                $('#noIntegral').show();
                            }
                        }
                    }
                });
            },
            getUserInfo : function(){
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
                            $('.person_name').html(userObj.nickName);
                            $('.integral_cont').html(userObj.points+'荷石币');
                            $('.person_img').css('background-image','url('+userObj.avatar+')');
                        }
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
                return times.getFullYear() + "-" + that.strRegion((times.getMonth() + 1)) + "-" + that.strRegion(times.getDate()) + " " + that.strRegion(times.getHours()) + ":" + that.strRegion(times.getMinutes())+ ":" + that.strRegion(times.getSeconds());
            },
            scrollFlowPoints: function(){
                let that = this;
                $(window).scroll(function () {
                    var scrollTop = $(this).scrollTop();
                    var scrollHeight = $(document).height();
                    var windowHeight = $(this).height();
                    if(scrollTop + windowHeight == scrollHeight){
                        var curPage = ++pageNum;
                        if(curPage <= totalPage){
                            that.getIntegralInfo(curPage);
                        }
                    }  
                })
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
    .banner {
        width: 100%;
        height: 4.8rem;
        background: url("./img/integral-bg.png") center no-repeat;
        background-size: cover;
        position: relative;
        .person_img{
            width: 148px;
            height: 148px;
            border-radius: 50%;
            // background-image: url("./img/pho-my.png");
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: contain;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 60px;
        }
        .person_name{
            font-size: 28px;
            color: #FFFFFF;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 230px;
        }
        .integral_cont {
            background: #FEDA3E;
            border-radius: 24.5px;
            color: #E94C2C;
            display: inline-block;
            font-size: 28px;
            height: 48px;
            line-height: 48px;
            margin-top: 276px;
            padding: 0 24px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .integral_info {
        width: 100%;
        color: #444;
    }
    .integral_info .title {
        background: #EEEEEE;
        font-size: 26px;
        padding: 28px 0 20px 26px;
    }
    .integral_info li {
        height: 80px;
        border-bottom: 1px solid #eeeeee;
        margin-left: 30px;
        padding: 22px 30px 22px 0;
    }
    .integral_info li .left {
        float: left;
    }
    .integral_info li .left .item_title {
        font-size: 28px;
    }
    .integral_info li .left .item_date {
        color: #888;
        font-size: 24px;
        line-height: 24px;
        margin-top: 12px;
    }
    .integral_info li .item_cont {
        font-size: 32px;
        float: right;
        line-height: 60px;
        color: #444;
    }
    .integral_info li .item_cont.add {
        color: #f29700;
    }
    .integral_info li .item_cont.minus {
        color: #444;
    }
    #noIntegral{
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
</style>