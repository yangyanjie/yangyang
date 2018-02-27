<template>
    <div>
        <sa-page-load ishow="1"></sa-page-load>
        <main class="main">
            <p class="explain">使用本商城前，请您仔细阅读下述规则。如您不同意本规则或商城对其进行的修改条款，您可以选择不参与本商城活动；您一旦使用本商城提供的服务，即视为您已了解并完全同意本规则中的各项内容。</p>
            <p class="title">一、荷石币是什么</p>
            <p class="content"><span class="font_hide">1.</span>荷石币是钻石提供的积分服务，可以凭借荷石币参与钻石商城的商品兑换、互动小游戏等。</p>
            <p class="title">二、荷石币如何获取</p>
            <p class="content">1.用户完成钻石烟包、条包扫码验真，参与钻石漂流瓶、翻牌子、点元宝等活动，即可获取数量不等的荷石币。</p>
            <p class="content">2.平台钻石会员日活动及不定期主题活动也有机会获取荷石币，具体请关注“河北中烟”微信公众号。</p>
            <p class="content">3.荷石币限个人账户使用，不能转送，也不能折算为现金。</p>
            <p class="title">三、荷石币如何使用</p>
            <p class="content">1.荷石币可在钻石商城兑换：兑换专区的奖品仅支持荷石币兑换，不作为商品销售。会员账户积累荷石币达到或超过某一奖品的兑换标准时，即可兑换。兑换成功后，系统将从会员账户中扣减相应数量荷石币。荷石币不能退回，请合理安排使用。</p>
            <p class="content">2.荷石币可用于抽奖活动：每次抽奖需要消耗100荷石币，有机会抽取各种虚拟卡券，活动一经参与，无论中奖与否都不能退回，请合理使用。</p>
            <p class="content">3.已获得的礼品可在“我的口袋”里查看。获得的卡券均有有效期，请及时使用。获得实物礼品后请于7天内填写收货地址，逾期视为放弃，荷石币不能退回。</p>
            <p class="content">4.会员成功提交订单后，奖品将在7个工作日内寄出；发货后，会员可在【我的口袋】中的商品列表页面，点击商品的【订单详情】中查看相应的物流信息。</p>
            <p class="content">5.奖品由商城物流供应商EMS免费配送到会员指定的收货地址。由指定收货人签字后即视为配送完成。</p>
            <p class="title">四、补充条款</p>
            <p class="content">1.商城兑换奖品仅为回馈会员，不属市场销售行为，故不提供商品发票凭证。</p>
            <p class="content">2.荷石币是钻石商城的虚拟凭证，仅供会员参与本平台活动之用。兑换奖品前并不构成会员实际资产。荷石币不能折算现金、不可转让或在钻石会员平台以外的渠道作为支付依据。</p>
            <p class="content">3.会员兑换奖品（包括但不仅限于实物、电话卡）、兑换券或其他有价凭证后，应在有效期限内使用完毕，逾期无法使用导致的损失由会员自行承担。</p>
            <p class="content">4.商城或宣传品中的商品图片仅供参考，请以收到的实物为准。</p>
            <p class="content">5.已兑奖品除在运送途中发生损毁或奖品本身的质量瑕疵原因外，恕不退货或换货。</p>
            <p class="title">五、其他</p>
            <p class="content">1.本平台提供的荷石币作为用户回报计划中的一部分，有效期暂无限制，且无滚动清零，后续如有调整和优化会提前公告，敬请关注。</p>
            <p class="content">2.对于任何通过不正当手段参与者，本平台有权取消其抽奖资格。</p>
            <p class="content">3.如遇不可抗力因素，或因故无法进行时，本平台有权决定取消、终止、修改或暂停本活动。</p>
            <p class="content" style="margin-bottom:15PX;">4.本平台拥有相关活动的最终解释权。</p>
            <div id="statistics" data-pageid="3004" class="hidden"></div>
            <div ref="activityId" id="mdActiveId" data-id='scoremall003' class="hidden"></div>
        </main>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
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

        },
        //相关操作事件
        methods: {
            
        }
    }
</script>
<style type="text/css" lang="less">
    .main{
        background-color: #FFFFFF;
        padding: 0 45px;
        font-size: 28px;
        line-height: 42px;
        letter-spacing: 1px;
        color: #444;
        
        .explain{
            padding: 30px 0;
        }
        .title{
            font-weight: bold;
            line-height: 90px;
        }
        .content{
            line-height: 45px;
            padding-left: 45px;
            text-indent: -27px;
        }
        p:last-child{
            margin-bottom: 42px;
        }
        .font_hide{
            color: transparent;
        }
    }
     
</style>