<template>
    <div>
        <sa-page-load ishow="1"></sa-page-load>
        <main class="main">
            <div class="top-bg"></div>
            <div class="shop_img"></div>
            <div class="order_info">
                <dl>
                    <dt class="order_name"></dt>
                    <dd class="order_count" style="-webkit-margin-start: 0;"></dd>
                </dl>
                <div class="order_item" id="orderId"></div>
                <div class="order_item" id="orderTime"></div>
                <div class="flow_info">
                    <div class="order_item" id="expressName"></div>
                    <div class="order_item" id="expressNum"></div>
                    <div class="express_query" md_name="快递查询" @click="showWayInfo()">快递查询</div>
                </div>
            </div>
            <div id="statistics" data-pageid="3009" class="hidden"></div>
            <div ref="activityId" id="mdActiveId" data-id='scoremall003' class="hidden"></div>
        </main>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import Lib from 'assets/js/Lib.js'
    import $ from 'jquery'

    let orderId = Lib.getUrlQuery("orderId");
    let curOrderId = ''; //当前物流订单号
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
            this.getOrderDetailInfo();
        },
        //相关操作事件
        methods: {
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
            getOrderDetailInfo: function(){
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                //获取订单详情
                Lib.ajax({
                    method: 'post',
                    url: '/act/rule/'+activityId,
                    data:{
                        name: 'orderdetail',
                        orderid: orderId
                    },
                    success: function (data) {
                        if(data.code === 1){
                            var detailObj = data.context;
                            $('.shop_img').css('background-image','url('+detailObj.image+')');
                            $('.order_name').html(detailObj.memo);
                            var d = new Date(detailObj.ctime);
                            //时间转换
                            var timeStr = that.timesFormatStr(d);
                            if(detailObj.score > 0){
                                $('.order_count').html('积分兑换：'+detailObj.score+'积分');
                                $('#orderTime').html('兑换时间：'+timeStr);
                            }else{
                                $('.order_count').html('￥<s>'+detailObj.price+'*1</s>');
                                $('#orderTime').html('中奖时间：'+timeStr);
                            }
                            $('#orderId').html('订单编号：'+detailObj.orderId);

                            if(detailObj.waybills.length > 0){
                                var expressObj = detailObj.waybills[0];
                                $('#expressName').html('快递公司：'+expressObj.name);
                                $('#expressNum').html('快递单号：'+expressObj.waybill);
                                curOrderId = expressObj.waybill;
                                $('.express_query').attr('md',detailObj.orderId);
                                $('.flow_info').show();
                            }
                        }
                    }
                });
            },
            showWayInfo: function(){
                //显示物流信息
                window.location.href = 'https://m.kuaidi100.com/result.jsp?nu='+curOrderId;
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
    .order_info{
        padding: 0 56px;
    }
    dl{
        text-align: center;
        margin: 30px 0 60px;
    }
    .order_name{
        font-size: 38px;
        color: #F06C00;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
    .flow_info{
        position: relative;
        display: none;
    }
    .order_count{
        font-size: 34px;
        color: #F06C00;
        margin-top: 18px;
    }
    .order_item{
        font-size: 28px;
        color: #666666;
        line-height: 68px;
    }
    .express_query{
        width: 125px;
        font-size: 30px;
        color: #F06C00;
        font-weight: bold;
        border-bottom: 2px solid #F06C00;
        position: absolute;
        right: 0;
        bottom: 14px;
    }
    
</style>