<template>
    <div>
        <sa-page-load ishow="1"></sa-page-load>
        <main class="main">
            <div class="home_sec clearfix"></div>
            <div id="statistics" data-pageid="3012" class="hidden"></div>
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
            this.getAllEntity();
        },
        //相关操作事件
        methods: {
            getAllEntity : function(){
                //获取精选优惠券
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
                            var dataArr = res.context.data;
                            for(var i = 0; i<dataArr.length;i++){
                                var goodItemStr = '<div class="home_detail"  md_name="'+dataArr[i].memo+'" md="'+dataArr[i].productId+'" data-id="'+dataArr[i].productId+'" data-type="'+dataArr[i].type+'">'+
                                    '<div class="home_img" id="good_'+dataArr[i].productId+'"></div>'+
                                    '<p class="home_name">'+dataArr[i].memo+'</p>'+
                                    '<div class="home_brief">'+
                                    // '<img src="https://weiopn.oss-cn-beijing.aliyuncs.com/scoremall/img/integral_icon.png"/>'+
                                    '<p>'+dataArr[i].score+'<span>荷石币</span></p>'+
                                    '</div>'+
                                    '<div class="exchange_btn" md_name="'+dataArr[i].memo+'" md="'+dataArr[i].productId+'">立即兑换</div>'+
                                    '</div>';
                                $('.home_sec').append(goodItemStr);
                                $('#good_'+dataArr[i].productId).css('background-image','url("'+dataArr[i].image+'")');
                            }
                            $('.home_detail').bind('click',function(){
                                var curHomeItem = $(this);
                                that.getDetailById(curHomeItem.attr('data-id'),curHomeItem.attr('data-type'));
                            })
                        }
                    }
                });
            },
            getDetailById : function(productId,productType){
                window.location.href = '../menus/shop-shopdetail.html?sourceId=3012&productId='+ productId +'&productType='+productType+'&t='+new Date().getTime();
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
    .home_sec{
        width: 100%;
        // background: linear-gradient(to bottom,#c85113,#e63f24,#e85113);
        background-color: #d42c19;
    }
    .home_detail{
        box-sizing:border-box;
        -webkit-box-sizing:border-box; /* Safari */
        width:50%;
        float:left;
        padding: .266rem 0;
        border-top: 1px solid #ddd;
        background: linear-gradient(to right,rgba(208,70,70,0.35),rgba(226,99,99,0.35),rgba(240,126,93,0.35));
    }
    .home_sec .home_detail:nth-child(odd){
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
        font-size: 30px;
        color: #FEFBEC;
        padding: 0 20px;
        vertical-align: middle;
        display: inline;
    }
    .home_brief p span{
        font-size: 28px;
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
        background-size: cover;
        border-radius: 4px;
    }
    
</style>