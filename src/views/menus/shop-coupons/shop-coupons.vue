<template>
    <div>
        <sa-page-load ishow="1"></sa-page-load>
        <main class="main">
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
            <div id="statistics" data-pageid="3013" class="hidden"></div>
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
        },
        //相关操作事件
        methods: {
            getCoupon : function(){
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
                                    '<p>'+dataArr[i].score+'<span>荷石币</span><s>'+dataArr[i].listScore+'荷石币</s></p>'+
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
            getDetailById : function(productId,productType){
                window.location.href = '../menus/shop-shopdetail.html?sourceId=3013&productId='+ productId +'&productType='+productType+'&t='+new Date().getTime();
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
        border-bottom: 1px solid #ddd;
        // background: linear-gradient(to right,#F0ECE9,#FEFBF8);
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
</style>