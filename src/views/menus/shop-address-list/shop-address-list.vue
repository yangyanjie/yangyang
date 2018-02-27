<template>
    <div>
        <sa-page-load ishow="1"></sa-page-load>
        <main class="main">
            <div class="body_wrap">
                <div class="nothing">
                    <img src="./img/address-nothing.png"/>
                    <p>目前还没有添加地址哦~</p>
                </div>
                <div class="content_wrap">
                    <!--<div class="wrap border-box">
                        <span class="bg"></span>
                        <div class="left">
                            <div class="title">
                                <span class="name"></span>
                                <span class="tel"></span>
                            </div>
                            <p class="address"></p>
                        </div>
                        <div class="right">
                            <div class="set border-box" data-id="">
                                <a href="javascript:">
                                    <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/scoremall/img/icon_edit.png"/><br/>
                                    <span>编辑</span>
                                </a>
                            </div>
                            <div class="del border-box" data-id="">
                                <a href="javascript:">
                                    <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/scoremall/img/icon_delete.png"/><br/>
                                    <span>删除</span>
                                </a>
                            </div>
                        </div>
                    </div>-->
                </div>
                <div class="btn" @click="addAddress()">
                    <a id='createAddress' href="javascript:">新建地址</a>
                </div>
            </div>
            <!--请确认删除地址弹框 -->
            <div class='pop'> 
                <div class='pop-mask border-box'>
                    <div class='close' @click="closeWarn()"></div>
                    <p>确认删除该地址</p>
                    <div class='pop_btn btn_left border-box' @click="deleteAddress()">确认</div> 
                    <div class='pop_btn btn_right border-box' @click="closeWarn()">取消</div>
                </div>
            </div>
            <div id="statistics" data-pageid="3008" class="hidden"></div>
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
    let orderId = Lib.getUrlQuery("orderId");
    let s = Lib.getUrlQuery("s");
    let deleteObj = null;

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
            console.log();
        },
        //已成功挂载，相当ready()
        mounted(){
            this.getAddressList();
            this.touchMoveChange();
        },
        //相关操作事件
        methods: {
            getAddressList: function(){
                //获取个人地址列表
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                Lib.ajax({
                    url: '/act/rule/'+activityId,
                    method: 'post',
                    data: {
                        "name": 'addrlist'
                    },
                    success: function (res) {
                        if(res.code === 1) {
                            var data = res.context;
                            if(data.length == 0) {
                                $(".nothing").show();
                            }else {
                                var addressItem = '';
                                for(let i=0;i<data.length;i++){
                                    var bgStr = '<span class="bg disabled"></span>';
                                    if(addressId){
                                        if(data[i].id == addressId){
                                            bgStr = '<span class="bg choose"></span>';
                                        }
                                    }else{
                                        if (i === 0){
                                            bgStr = '<span class="bg choose"></span>';
                                        }
                                    }
                                    addressItem += '<div class="wrap border-box">' + bgStr +
                                        '<div class="left">'+
                                            '<div class="title">'+
                                                '<span class="name">'+data[i].name+'</span>'+
                                                '<span class="tel">'+data[i].mobile+'</span>'+
                                            '</div>'+
                                            '<p class="address">'+data[i].address+'</p>'+
                                        '</div>'+
                                        '<div class="right">'+
                                            '<div class="set border-box" data-id="'+data[i].id+'">'+
                                                '<a href="javascript:">'+
                                                    '<img src="https://weiopn.oss-cn-beijing.aliyuncs.com/scoremall/img/icon_edit.png"/><br/>'+
                                                    '<span>编辑</span>'+
                                                '</a>'+
                                            '</div>'+
                                            '<div class="del border-box" data-id="'+data[i].id+'">'+
                                                '<a href="javascript:">'+
                                                    '<img src="https://weiopn.oss-cn-beijing.aliyuncs.com/scoremall/img/icon_delete.png"/><br/>'+
                                                    '<span>删除</span>'+
                                                '</a>'+
                                            '</div>'+
                                        '</div></div>';
                                    
                                }
                                $('.content_wrap').append(addressItem);
                                $(".wrap").innerWidth($("body").width()+$(".wrap").innerWidth());
                            }
                        }
                    }
                })
            },
            addAddress: function(){
                //添加地址
                if(s){
                    window.location.href = "../menus/shop-add-address.html?s="+s+'&t='+new Date().getTime();
                }else{
                    if(orderId){
                        window.location.href = "../menus/shop-add-address.html?productId="+productId+"&orderId="+orderId+'&t='+new Date().getTime();
                    }else{
                        window.location.href = "../menus/shop-add-address.html?productId="+productId+'&t='+new Date().getTime();
                    }
                }                
            },
            touchMoveChange: function(){
                //滑动
                var start, end; //声明开始和结束变量
                var yd;
                setTimeout(function () {
                    yd = $("body").width() - $(".wrap").innerWidth();
                },1000);
                var bools = true ;
                var bool;
                $(".content_wrap").on("touchstart",".wrap", function (e) {
                    bools = true;
                    bool =  $(this).css("left") === '0px' ? true : false;
                    start = e.originalEvent.targetTouches[0].clientX;
                    $(".wrap").css({"left": 0+'px'});
                    //给end一个初始变量，随便给，防止用户单次点击的情况
                    end = start;
                    $(this).css({
                        "transition": "all 0s"
                    });
                });

                $(".content_wrap").on("touchmove",".wrap", function (e) {
                    bools = false;
                    end = e.originalEvent.targetTouches[0].clientX;
                    if ((end - start) < 0 && (end - start) >= yd) {
                        $(this).css({"left": (end - start)+'px'})
                    }
                });
                $(".content_wrap").on("touchend", ".wrap",function (e) {
                    if (bool && bools) {
                        if(s){
                            window.location.href = "../menus/shop-add-address.html?s="+s+'&t='+new Date().getTime()+'&addressId='+$(this).find(".set").attr("data-id")+'&t='+new Date().getTime();
                        }else{
                            if(orderId){
                                window.location.href = "../menus/shop-myorder.html?addressId="+$(this).find(".set").attr("data-id")+"&productId="+productId+"&orderId="+orderId+'&t='+new Date().getTime();
                            }else{
                                window.location.href = "../menus/shop-myorder.html?addressId="+$(this).find(".set").attr("data-id")+"&productId="+productId+'&t='+new Date().getTime();
                            }
                        }
                        
                        $(".bg").removeClass("choose").addClass("disabled");
                        $(this).find(".bg").removeClass("disabled").addClass("choose");
                    } else {
                        if ((end - start) > -40) {
                            $(this).css({
                                "left": 0
                            })
                        } else {
                            $(this).css({
                                "transition": "all .3s",
                                "left": yd
                            })
                        }
                    }
                    bools = true;

                });

                //删除按钮
                $(".content_wrap").on("touchend",".del", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var id =$(this).attr("data-id");
                    var that = $(this);
                    var length = that.parents(".wrap").next(".wrap").length;
                    deleteObj = {
                        id:id,
                        ele:that,
                        length:length
                    }
                    $('.pop').show();
                });
                $(".content_wrap").on("touchend",".set", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if(s){
                        window.location.href = "../menus/shop-add-address.html?s="+s+'&t='+new Date().getTime()+'&addressId='+$(this).attr("data-id")+'&t='+new Date().getTime();
                    }else{
                        if(orderId){
                            window.location.href = "../menus/shop-add-address.html?addressId="+$(this).attr("data-id")+"&productId="+productId+"&orderId="+orderId+'&t='+new Date().getTime();
                        }else{
                            window.location.href = "../menus/shop-add-address.html?addressId="+$(this).attr("data-id")+"&productId="+productId+'&t='+new Date().getTime();
                        }
                    }
                });
            },
            deleteAddress: function(){
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                //删除地址
                Lib.ajax({
                    url: '/act/rule/'+activityId,
                    method: 'post',
                    data : {
                        "name": 'addrdel',
                        "addrid" :  deleteObj.id
                    },
                    success: function (data) {
                        if(data.code === 1){
                            if( deleteObj.ele.parents(".wrap").find(".bg").hasClass("choose")) {
                                if(deleteObj.length === 1) {
                                    deleteObj.ele.parents(".wrap").next(".wrap").find(".bg").removeClass("disabled").addClass("choose");
                                }else if(deleteObj.length === 0){
                                    //判断是不是最后一个
                                    if($(".wrap").length === 1){
                                        $(".nothing").show();
                                    }else {
                                        $(".content_wrap .wrap:nth-of-type(1)").find(".bg").removeClass("disabled").addClass("choose");
                                    }
                                }
                                that.closeWarn();
                            }
                            deleteObj.ele.parents(".wrap").remove();
                        }
                    }
                });
            },
            closeWarn: function(){
                //关闭删除地址
                $('.pop').hide();
            }
        }
    }
</script>
<style type="text/css" lang="less">
    html {
        height: 100%;
    }
    body {
        width: 100%;
        overflow-x:hidden;
        padding-bottom: 300px;
        background-color: #f5f5f5;
    }
    .border-box{
        box-sizing: border-box;
    }
    .nothing {
        width: 100%;
        margin-top: 180px;
        display: none;
        text-align: center;
    }
    .nothing img{
        width: 388px;
        height: 322px;
        display: inline-block;
    }
    .nothing>p {
        padding-top: 80px;
        font-size: 36px;
        color: #999999;
    }
    .content_wrap {
        width: 100%;
        overflow: hidden;
    }
    .wrap {
        width: 100px;
        // width: -webkit-calc(100% + 100px);
        margin-bottom: 20px;
        padding: 30px 0 21px 72px;
        background-color: #ffffff;
        overflow: hidden;
        position: relative;
    }
    .wrap .bg {
        display: block;
        width: 28px;
        height: 28px;
        position: absolute;
        left: 15px;
        top: 40px;
        background-size: cover;
    }
    .choose {
        background: url("./img/icon_right_choose.png") no-repeat;
    }
    .disabled {
        background: url("./img/icon_right_disabled.png") no-repeat;
    }
    .left {
        float: left;
        padding-right: 40px;
    }
    .left .title {
        overflow: hidden;
    }
    .title .name,.title .tel{
        width: 225px;
        display: block;
        float: left;
        font-size: 36px;
        padding-bottom: 32px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .title .name {
        font-weight: bolder;
    }
    .title .tel {
        padding-left: 58px;
        padding-top: 5px;
    }
    .left .address {
        width: 534px;
        font-size: 36px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .right {
        width: 200px;
        height: 126px;
        float: left;
        border-left:1px solid #cdcdcd;
    }
    .right .set , .right .del {
        width: 50%;
        height: 100%;
        float: left;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
    }
    .set>a, .del>a {
        text-align: center;
        color: #cccccc;
        font-size: 24px;
    }
    .set img , .del img {
        width: 43px;
        height: 43px;
    }
    .btn {
        width: 650px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 36px;
        background: linear-gradient(to bottom,#FF7200,#FF9600);
        border-radius: 10px;
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
    }
    .btn a{
        color: white;
        display: block;
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
        color: #FF7200;
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