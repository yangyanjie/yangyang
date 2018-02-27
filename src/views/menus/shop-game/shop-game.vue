<template>
    <div>
        <sa-page-load ishow="1"></sa-page-load>
        <main class="main">
            <div class="game_sec">
                <div class="draw_sec clearfix">
                    <div id="machine1" class="slotMachine lf">
                        <!--<div class="slot slot1"></div>
                        <div class="slot slot2"></div>
                        <div class="slot slot3"></div>-->
                    </div>
                    <div id="machine2" class="slotMachine mar_center lf">
                        <!--<div class="slot slot1"></div>
                        <div class="slot slot2"></div>
                        <div class="slot slot3"></div>-->
                    </div>
                    <div id="machine3" class="slotMachine lf">
                        <!--<div class="slot slot1"></div>
                        <div class="slot slot2"></div>
                        <div class="slot slot3"></div>-->
                    </div>
                </div>
                <div class="counts hidden"></div>
                <div class="play_btn" md="jf_05_play" md_name="抽奖" @click="startGame()"></div>
                <div class="info_sec">
                    <div id="roll-wrap">
                        <ul class="win_info" id="winInfoList">
                            <!--<li class="win_item clearfix">
                                <div class="shop_img lf">
                                    <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/scoremall/award/sk/ziqibeizi@2x.png" />
                                </div>
                                <div class="win_tel lf">18512348876</div>
                                <div class="win_date lf">2017/12/15 20:15</div>
                            </li>
                            <li class="win_item clearfix">
                                <div class="shop_img lf">
                                    <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/scoremall/award/sk/ziqibeizi@2x.png" />
                                </div>
                                <div class="win_tel lf">18512348876</div>
                                <div class="win_date lf">2017/12/15 20:15</div>
                            </li>
                            <li class="win_item clearfix">
                                <div class="shop_img lf">
                                    <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/scoremall/award/sk/ziqibeizi@2x.png" />
                                </div>
                                <div class="win_tel lf">18512348876</div>
                                <div class="win_date lf">2017/12/15 20:15</div>
                            </li>-->
                        </ul>
                    </div>
                    <div class="integral_explain">
                        <p>荷石币抽奖规则</p>
                        <p class="content">1.您可每次使用<span id='perCount'></span>荷石币，参与一次老虎机游戏，有机会获得1-50元不等的三网通话费及100元的京东购物卡。每天参与抽奖次数不限。</p>
                        <!--<p class="content">2.每次抽奖扣除<span id='perCount'></span>金叶币，每天参与抽奖次数不限。点击抽奖后显示三个图标相同即为中奖，所获奖励以弹窗内容为准。</p>-->
                        <p class="content">2.活动规则：点击抽奖后，当三个方格内的图标完全一致时，即表示用户中了该奖项，当三个图标不一致时即为谢谢参与（没有中奖），所获奖励以弹窗内容为准。</p>
                        <p class="content">3.中奖名单由系统抽取，实时公布中奖数据，保证公平公正公开。对于任何通过不正当手段参与者，本平台有权取消其抽奖资格。</p>
                        <p class="content">4.本平台对活动拥有最终解释权。</p>
                    </div>
                </div>
            </div>
            <!--中奖弹框-->
            <div class="win_box">
                <div class="win_detail">
                    <div class="win_title"></div>
                    <div class="goods_img"></div>
                    <p class="win_good_name">中奖名称</p>
                    <div class="btn_sec clearfix" id='winGoods'>
                        <div class="accept_btn lf" @click="acceptGift()">赶紧收下</div>
                        <div class="again_btn rf" @click="closeWinBox()">再玩一次</div>
                    </div>
                    <!--<div class="btn_sec" id='winIntegral' style="display:none;">
                        <div class="again_btn" style="margin:0 auto;">再玩一次</div>
                    </div>-->
                </div>
            </div>
            <!--未中任何奖-->
            <div class="no_win_box">
                <div class="no_win_detail">
                    <div class="no_win_top"></div>
                    <div class="no_win_info"></div>
                    <div class="no_win_explain">本次没有中奖&nbsp;&nbsp;再接再励</div>
                    <!--<p class="no_win_counts">今日还能再玩<span></span>次</p>-->
                    <div class="no_win_btn clearfix">
                        <div class="lf no_win_know" @click="noWinAgain()">我知道了</div>
                        <div class="rf no_win_again" @click="noWinAgain()">再玩一下</div>
                    </div>
                </div>
            </div>
            <!--摇奖次数已用完-->
            <div class="no_times_box">
                <div class="no_times_detail">
                    <div class="no_times_top"></div>
                    <div class="no_times_info"></div>
                    <div class="no_win_explain">今日次数已用完</div>
                    <!--<p class="no_times_counts">今日还能再玩<span>4</span>次</p>-->
                    <div class="no_times_btn clearfix">
                        <div class="lf no_times_know" @click="selectPocket()">查看口袋</div>
                        <div class="rf no_times_again" @click="noTimeClose()">明日再来</div>
                    </div>
                </div>
            </div>
            <!--积分不足-->
            <div class="no_points_box">
                <div class="no_points_detail">
                    <div class="no_points_top"></div>
                    <div class="no_points_info"></div>
                    <div class="no_point_explain">荷石币不足，不能抽奖~</div>
                    <div class="no_points_btn">
                        <div class="no_points_know" @click="noPointsClose()">我知道了</div>
                    </div>
                </div>
            </div>
            <!--验证手机号弹框-->
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
            <div id="statistics" data-pageid="3005" class="hidden"></div>
            <div ref="activityId" id="mdActiveId" data-id='scoremall003' class="hidden"></div>
        </main>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import Lib from 'assets/js/Lib.js'

    //摇奖需要的积分
    let requirePoints = 0;
    //剩余摇奖次数
    let remainTimes = 0;
    //获取中奖productId信息列表
    let productIdArr = [];
    //初始化摇奖框
    let machine1 = null;
    let machine2 = null;
    let machine3 = null;
    //判断摇奖显示图片位置
    let machine1Index = '';
    let machine2Index = '';
    let machine3Index = '';
    //摇奖结婚信息
    let winInfo = {};
    //开始摇奖
    let playStart = false;
    let countdown=59;
    let started = true;
    let pattern = /^1[3-9][0-9]{9}$/;  //验证手机号
    let move = document.ontouchmove;//保存默认触摸事件
    let isFollowStatus = 0;  //是否关注公众号的状态 0:未关注  1:关注
    
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
            this.getViewImg();
            this.getVerFollow();
        },
        //相关操作事件
        methods: {
            getViewImg: function(){
                //获取摇奖图片
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');

                Lib.ajax({
                    method: 'post',
                    url: '/act/rule/'+activityId,
                    data: {
                        name: "laba-view"
                    },
                    success: function(data){
                        if(data.code == 1){
                            //新增获取的摇奖图片
                            var viewObj = data.context;
                            $('.counts').html("剩余抽奖次数："+viewObj.remainTimes+"次");
                            remainTimes = viewObj.remainTimes;
                            $('#perCount').html(viewObj.pointsPerTime);
                            requirePoints = viewObj.pointsPerTime;
                            $('#perTime').html(viewObj.timesPerDay);
                            var items = viewObj.items;
                            for(var i=0;i<items.length;i++){
                                var shotStr = '<div class="slot slot_'+i+'"></div>';
                                $('#machine1').append(shotStr);
                                $('#machine2').append(shotStr);
                                $('#machine3').append(shotStr);
                            }
                            for(var j=0;j<items.length;j++){
                                $('.slot_'+j).css('background-image', 'url(' + items[j].showImage + ')');
                                productIdArr.push(items[j].productId);
                            }
                            that.initLottryImg();
                            that.getWinInfo();
                            playStart = true;
                        }
                    }
                });
            },
            initLottryImg: function(){
                //初始化摇奖图片
                //显示摇奖图片
                machine1 = $("#machine1").slotMachine({  //第一个老虎机设置
                    active: 0, //初始化时显示第几张图案
                    delay: 500 //延迟
                });
                machine2 = $("#machine2").slotMachine({
                    active: 1,
                    delay: 500
                });
                machine3 = $("#machine3").slotMachine({
                    active: 2,
                    delay: 500
                });
            },
            getWinInfo: function(){
                //获取中奖信息
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                Lib.ajax({
                    method: 'post',
                    url: '/act/rule/'+activityId,
                    data: {
                        name: "laba-trumpet"
                    },
                    success: function (data) {
                        if(data.code === 1){
                            var infoObj = data.context;
                            if(infoObj.length == 0){
                                $('#roll-wrap').hide();
                                $('.integral_explain').css('margin-top','0');
                            }else{
                                var li = '';
                                for(var m=0;m<infoObj.length;m++){
                                    //时间转换
                                    var d = new Date(infoObj[m].time);
                                    var dateStr = that.timesFormatStr(d);
                                    // var mobile = infoObj[m].mobile;
                                    // var transformMobile = mobile.substr(0,3)+"****"+mobile.substr(7);
                                    li += '<li class="win_item clearfix">'+
                                            '<div class="shop_img lf">'+
                                            '<img src="'+infoObj[m].image+'" />'+
                                            '</div>'+
                                            '<div class="win_tel lf">'+infoObj[m].mobile+'</div>'+
                                            '<div class="win_date lf">'+dateStr+'</div>'+
                                            '</li>';
        
                                }
                                $('#winInfoList').append(li);
                                //获取滚动信息
                                setInterval(function() {
                                    var liFirst = $(".win_info").find('li:first');
                                    $(".win_info").animate({
                                        top: "-33.33%"
                                    }).animate({
                                        "top": 0
                                    }, 0, function() {
                                        var clone = liFirst.clone();
                                        $(".win_info").append(clone);
                                        liFirst.remove();
                                    })
                                }, 3000);
                            }
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
                return times.getFullYear() + "/" + that.strRegion((times.getMonth() + 1)) + "/" + that.strRegion(times.getDate()) + " " + that.strRegion(times.getHours()) + ":" + that.strRegion(times.getMinutes());
            },
            startGame: function(){
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                //开始摇奖
                if(playStart){
                    //禁止触摸
                    document.ontouchmove = function (e) {
                        e.preventDefault();
                    };
                    playStart = false;
                    var playObj = $(".play_btn");
                    playObj.css({'transform':'translateY(5px)'});
                    setTimeout(function(){
                        playObj.css({'transform':'translateY(0px)'});
                    },300);                   
                    $.ajax({
                        method: 'post',
                        url: '/act/rule/'+activityId,
                        data: {
                            'name': 'userInfo'
                        },
                        success: function (data) {
                            if(data.code === 1){
                                var userObj = data.context;
                                //1.先判断是否绑定手机号
                                if(userObj.mobile != null && userObj.mobile != ''){
                                    //判断是否关注公众号
                                    if(isFollowStatus == 1){
                                        //2.判断用户积分是否可以有摇奖资格
                                        if(userObj.points >= requirePoints){
                                            //3.判断当天摇奖剩余次数
                                            if(remainTimes > 0){
                                                //开始摇奖并获取摇奖图片
                                                that.getLotteyInfo();
                                            }else{
                                                $('.no_times_box').show();
                                                $(".no_times_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                                                playStart = true;
                                            }
                                        }else{
                                            $('.no_points_box').show();
                                            $('.no_points_box').on('touchmove', function(event) { event.preventDefault(); }, false);
                                            playStart = true;
                                        }
                                    }else{
                                        $('.isSubscribeBox').show();
                                        $(".isSubscribeBox").on('touchmove', function(event) { event.preventDefault(); }, false);
                                        playStart = true;
                                    }
                                }else{
                                    $('.tel_wrap').show();
                                    $(".tel_wrap").on('touchmove', function(event) { event.preventDefault(); }, false);
                                    $('body').css('position','fixed');
                                    playStart = true;
                                }
                            }else{
                                $('.no_times_box').show();
                                $(".no_times_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                                playStart = true;
                            }
                        }
                    });
                }
            },
            getLotteyInfo: function(){
                let that = this;
                let activityId = that.$refs.activityId.getAttribute('data-id');
                //获取摇奖信息
                Lib.ajax({
                    ethod: 'post',
                    url: '/act/rule/'+activityId,
                    data: {
                        name: "laba-draw"
                    },
                    success: function(data){
                        if(data.code == 1){
                            var infoObj = data.context;
                            //未中奖
                            if(infoObj.productId == ''){
                                winInfo = {
                                    image : infoObj.image,
                                    productId : infoObj.productId,
                                    remainTimes : infoObj.remainTimes,
                                    url : infoObj.url,
                                    name:infoObj.name,
                                    orderId: infoObj.orderId
                                };
                                var showTotalLength = productIdArr.length;
                                var ran1 = Math.floor( Math.random() * showTotalLength);
                                var ran2 = Math.floor( Math.random() * showTotalLength);
                                var ran3 = Math.floor( Math.random() * showTotalLength);
                                if(ran1 == ran2 && ran2 == ran3 && ran1 == ran3){
                                    // ran1 = Math.floor( Math.random() * showTotalLength);
                                    // ran2 = Math.floor( Math.random() * showTotalLength);
                                    // ran3 = Math.floor( Math.random() * showTotalLength);
                                    ran1 = 0;
                                    ran2 = 1;
                                    ran3 = 2;
                                }
                                
                                if(machine1 != null && machine2 != null && machine3 != null){
                                    machine1.shuffle(3, that.onComplete ,ran1); //调用第一个老虎机
                                    setTimeout(function() { //500秒后调用第二个老虎机
                                        machine2.shuffle(3, that.onComplete,ran2);
                                    }, 500);
                                    setTimeout(function() { //1000秒后调用第三个老虎机
                                        machine3.shuffle(3, that.onComplete,ran3);
                                    }, 1000);
                                }
                            }else{
                                //实物中奖
                                winInfo = {
                                    image : infoObj.image,
                                    productId : infoObj.productId,
                                    remainTimes : infoObj.remainTimes,
                                    url : infoObj.url,
                                    type : infoObj.type,
                                    name: infoObj.name,
                                    orderId: infoObj.orderId
                                };
                                var showIndex = productIdArr.indexOf(infoObj.productId);
                                
                                if(showIndex != -1){
                                    if(machine1 != null && machine2 != null && machine3 != null){
                                        machine1.shuffle(3, that.onComplete ,showIndex); //调用第一个老虎机
                                        setTimeout(function() { //500秒后调用第二个老虎机
                                            machine2.shuffle(3, that.onComplete,showIndex);
                                        }, 500);
                                        setTimeout(function() { //1000秒后调用第三个老虎机
                                            machine3.shuffle(3, that.onComplete,showIndex);
                                        }, 1000);
                                    }
                                }
                            }
                        }else{
                            $('.no_times_box').show();
                            $(".no_times_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                            playStart = true;
                        }
                    }
                });
            },
            onComplete: function($el, active){
                //摇奖结束后回调函数
                //实物中奖
                switch ($el[0].id) {
                    case 'machine1':
                        machine1Index = active.index;
                        break;
                    case 'machine2':
                        machine2Index = active.index;
                        break;
                    case 'machine3':
                        machine3Index = active.index;
                        setTimeout(function(){
                            if(machine1Index == machine2Index && machine2Index == machine3Index && machine1Index == machine3Index){
                                $('.counts').html("剩余抽奖次数："+winInfo.remainTimes+"次");
                                $('.goods_img').css('background-image','url("'+winInfo.image+'")');
                                $('.remind_counts span').html(winInfo.remainTimes);
                                $('.win_good_name').html(winInfo.name);
                                $('.win_box').show();
                                $(".win_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                            }else{
                                if(winInfo.url != ''){
                                    // $('.thanks_info img').attr('src',winInfo.image);
                                    // $('.thanks_counts span').html(winInfo.remainTimes);
                                    $('.counts').html("剩余抽奖次数："+winInfo.remainTimes+"次");
                                    $('.thanks_info').css('background-image','url("'+winInfo.image+'")')
                                    $('.thanks_box').show();
                                    $(".thanks_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                                }else{
                                    // $('.no_win_counts span').html(winInfo.remainTimes);
                                    $('.counts').html("剩余抽奖次数："+winInfo.remainTimes+"次");
                                    $('.no_win_box').show();
                                    $(".no_win_box").on('touchmove', function(event) { event.preventDefault(); }, false);
                                }
                            }
                            playStart = true;
                        },800);
                        break;
                }
            },
            closeTel : function(){//关闭手机验证弹框
                $('.tel_wrap').hide();
                $('body').css('position','relative');
                document.ontouchmove = move;
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
                                        $('.tel_wrap').hide();
                                        $('body').css('position','relative');
                                        if(isFollowStatus == 0){
                                            $('.isSubscribeBox').show();
                                            $(".isSubscribeBox").on('touchmove', function(event) { event.preventDefault(); }, false);
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
            acceptGift: function(){
                //收下礼品
                if(winInfo.type != ''){
                    window.location.href = '../menus/shop-pocket.html?sourceId=3005&productId='+winInfo.productId+'&orderId='+winInfo.orderId+'&t='+new Date().getTime();
                }
            },
            closeWinBox: function(){
                //关闭中奖弹框
                 $('.goods_img').css('background-image','url("")');
                $('.remind_counts span').html(winInfo.remainTimes);
                $('.win_good_name').html('');
                $('.win_box').hide();
                //恢复触摸
                document.ontouchmove = move;
            },
            noWinAgain: function(){
                //关闭没有中奖弹框
                $('.no_win_box').hide();
                document.ontouchmove = move;
            },
            selectPocket: function(){
                //查看口袋
                window.location.href = '../menus/shop-pocket.html?sourceId=3005&t='+new Date().getTime();
            },
            noTimeClose: function(){
                //关闭没有次数弹框
                $('.no_times_box').hide();
                document.ontouchmove = move;
            },
            noPointsClose: function(){
                //关闭荷石币不足弹框
                $('.no_points_box').hide();
                document.ontouchmove = move; 
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
    
    body{
        background: url("./img/lottery-bg.png") no-repeat;
        height: 100%;
        width: 100%;
        overflow: scroll;
        background-size: 100%;
        -webkit-text-size-adjust: 100% !important;
    }
    .game_sec {
        margin: 450px auto 0;
        width: 100%;
        position: absolute;
        z-index: 10;
    }
    //摇奖区域
    .draw_sec {
        margin: 0 auto;
        padding-top: 7.5px;
        width: 510px;
    }
    .slotMachine {
        width: 143px;
        height: 143px;
        overflow: hidden;
        text-align: center;
    }
    .slotMachine .slot {
        width: 143px;
        height: 180px;
        // background-position: 50%;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .slot{
        // background-image: url(http://weiopn.oss-cn-beijing.aliyuncs.com/scoremall/award/henan/qunar-300-package.jpg);
    }
    #machine1{
        margin-left: 6px;
    }
    #machine2{
        margin: 0 27px 0 30px;
    }
    .counts {
        width: 310px;
        height: 58px;
        line-height: 55px;
        text-align : center;
        font-size: 30px;
        color: #FBFBFA;
        box-sizing: border-box;
        margin: 80px auto 0;
        background-color: #333333;
        border: 4px solid #535353;
        border-radius: 26px;
        -webkit-border-radius: 26px;
    }
    .play_btn {
        margin: 15px auto 0;
        width: 210px;
        height: 133px;
        background-image: url("./img/btn-normal.png");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 197px 123px;
    }
    .info_sec{
        width: 100%;
        padding-top: 48px;
        position: relative;
        background: linear-gradient(to left bottom,#FF7200,#FF9600,#FF7200);
    }
    #roll-wrap {
        width: 93.33%;
        position: absolute;
        left: 3.33%;
        overflow: hidden;
        height: 293px;
    }
    .win_info {
        position: absolute;
        left: 0;
        top: 0;
        margin: 0 auto;
        width: 100%;
        -webkit-padding-start: 0;
        overflow: hidden;
        // margin-top: 40px;
    }
    .win_info .win_item {
        width: 100%;
        // line-height: 60px;
        background-color: #FFF1E5;
        border: 2px solid #F06C00;
        border-radius: 10px;
        -webkit-border-radius: 10px;
        margin-bottom: 14px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding: 12px 0 2px;
    }
    .shop_img {
        margin-left: 15px;
        margin-top: 4px;
    }
    .shop_img img {
        display: inline-block;
        width: 56px;
        height: 56px;
        vertical-align: center;
    }
    .border {
        width: 2px;
        height: 62px;
        background-color: #F06C00;
        margin-top: 10px;
    }
    .win_tel,.win_date {
        font-family: "PingFangSC Regular";
        font-size: 37px;
        color: #000000;
        padding-left: 20px;
        margin-top: 6px;
    }
    .win_tel {
        border-left: 3px solid #DF8909;
        margin-left: 24px;
    }
    .integral_explain {
        margin-top: 360px;
        padding: 0 30px 20px;
    }
    .integral_explain p {
        font-size: 31px;
        color: #432416;
        font-family: "PingFangSC Regular";
        padding-left: 51px;
        text-indent: -26px;
    }
    .integral_explain p:first-child {
        font-size: 42px;
        font-family: "PingFangSC Semiblod";
        text-align: center;
        padding-left: 0;
    }
    /*中奖弹框*/
    .win_box {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 30;
        background-color: rgba(0,0,0,.6);
        display: none;
    }
    .win_detail {
        z-index: 50;
        width: 615px;
        height: 585px;
        margin: 216px auto 0;
        background-color: #FFFFFF;
        border: 3px solid #B96E88;
        border-radius: 15px;
        -webkit-border-radius: 15px;
        position: relative;
        overflow: hidden;
    }
    .win_detail .win_title{
        width: 368px;
        height: 66px;
        background-image: url("./img/wish-win.png");
        background-repeat: no-repeat;
        background-position: 50%;
        margin: 36px auto 0;
        background-size: cover;
    }
    .goods_img {
        width: 236px;
        height: 236px;
        margin: 36px auto 0;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
    }
    .win_good_name {
        font-size: 30px;
        color: #616161;
        text-align: center;
        margin-top: 15px;
    }
    .btn_sec {
        margin-top: 39px;
    }
    .btn_sec div {
        width: 222px;
        height: 78px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        font-size: 36px;
        text-align: center;
        line-height: 83px;
        border-radius: 38.5px;
        -webkit-border-radius: 38.5px;
    }
    .accept_btn {
        background-color: #FFFFFF;
        color: #F06C00;
        border: 2px solid #F06C00;
        margin-left: 58px;
    }
    .again_btn {
        background-color: #F06C00;
        color: #FFFFFF;
        margin-right: 58px;
    }
    /*未中奖弹框*/
    .no_win_box {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 30;
        background-color: rgba(0,0,0,.6);
        display: none;
    }
    .no_win_detail {
        z-index: 50;
        width: 615px;
        height: 540px;
        margin: 216px auto 0;
        background-color: #FFFFFF;
        border: 3px solid #B96E88;
        border-radius: 15;
        -webkit-border-radius: 15px;
        position: relative;
        overflow: hidden;
    }
    .no_win_top {
        width: 225px;
        height: 66px;
        background-image: url("./img/no-win-title.png");
        background-repeat: no-repeat;
        background-position: 50%;
        margin: 36px auto 0;
        background-size: cover;
    }
    .no_win_info {
        width: 183px;
        height: 183px;
        margin: 36px auto 0;
        background-image: url("./img/no-win-show.png");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
    }
    .no_win_explain{
        font-size: 33px;
        color: #646161;
        text-align: center;
        margin-top: 27px;
    }
    .no_win_counts {
        font-size: 27px;
        color: #E1B180;
        text-align: center;
        margin-top: 16px;
    }
    .no_win_btn {
        margin-top: 39px;
    }
    .no_win_btn div {
        width: 222px;
        height: 78px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        font-size: 38px;
        text-align: center;
        line-height: 83px;
        border-radius: 45px;
        -webkit-border-radius: 45px;
    }
    .no_win_know {
        background-color: #FFFFFF;
        color: #F06C00;
        border: 2px solid #F06C00;
        margin-left: 58px;
    }
    .no_win_again {
        background: linear-gradient(to bottom,#FF7200,#FF9600);
        color: #FFFFFF;
        margin-right: 58px;
    }
    /*摇奖次数已用完*/
    .no_times_box {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 30;
        background-color: rgba(0,0,0,.6);
        display: none;
    }
    .no_times_detail {
        z-index: 50;
        width: 615px;
        height: 540px;
        margin: 216px auto 0;
        background-color: #FFFFFF;
        border: 3px solid #B96E88;
        border-radius: 15px;
        -webkit-border-radius: 15px;
        position: relative;
        overflow: hidden;
    }
    .no_times_top {
        width: 225px;
        height: 66px;
        background-image: url("./img/no-win-title.png");
        background-repeat: no-repeat;
        background-position: 50%;
        margin: 36px auto 0;
        background-size: cover;
    }
    .no_times_info {
        width: 183px;
        height: 183px;
        margin: 36px auto 0;
        background-image: url("./img/no-win-show.png");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
    }
    .no_times_counts {
        font-size: 30px;
        color: #A8A8A7;
        text-align: center;
        margin-top: 23px;
    }
    .no_times_btn {
        margin-top: 39px;
    }
    .no_times_btn div {
        width: 222px;
        height: 78px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        font-size: 36px;
        text-align: center;
        line-height: 78px;
        border-radius: 38.5px;
        -webkit-border-radius: 38.5px;
    }
    .no_times_know {
        background: linear-gradient(to bottom,#FF7200,#FF9600);
        color: #FFFFFF;
        margin-left: 58px;
    }
    .no_times_again {
        background-color: #FFFFFF;
        color: #F06C00;
        border: 2px solid #F06C00;
        margin-right: 58px;
    }
    /*积分不足弹框*/
    .no_points_box {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 30;
        background-color: rgba(0,0,0,.6);
        display: none;
    }
    .no_points_detail {
        z-index: 50;
        width: 615px;
        height: 540px;
        margin: 216px auto 0;
        background-color: #FFFFFF;
        border: 3px solid #B96E88;
        border-radius: 15px;
        -webkit-border-radius: 15px;
        position: relative;
        overflow: hidden;
    }
    .no_points_top {
        width: 225px;
        height: 66px;
        background-image: url("./img/no-win-title.png");
        background-repeat: no-repeat;
        background-position: 50%;
        margin: 36px auto 0;
        background-size: cover;
    }
    .no_points_info {
        width: 183px;
        height: 183px;
        margin: 36px auto 0;
        background-image: url("./img/no-win-show.png");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
    }
    .no_point_explain{
        font-size: 33px;
        color: #626061;
        text-align: center;
        margin-top: 27px;
    }
    .no_points_counts {
        font-size: 30px;
        color: #A8A8A7;
        text-align: center;
        margin-top: 22.5px;
    }
    .no_points_know {
        margin: 39px auto 0;
        width: 222px;
        height: 78px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        font-size: 38px;
        text-align: center;
        line-height: 83px;
        border-radius: 45px;
        -webkit-border-radius: 45px;
        background-color: #FFFFFF;
        color: #F06C00;
        border: 2px solid #F06C00;
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