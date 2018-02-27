/**
 * Author: liubin
 * Create Date: 2017-12-27
 * Description: 红包雪
 */
'use strict';
// import $ from 'jquery';

(function () {
    var hasNext;
    var packetDown;
    var HOME_URL = '/app-hebei/index.html?t='+ (+new Date);
    var CDN = 'https://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/';
    // 没有来源页面信息的时候，改成规则页URL地址
    if (document.referrer === '') {
        // window.location.href = '../red-packet-11/rule.html';
    }

    // 微信分享

    // 微信分享配置
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: weixin_token.appid, // 必填，公众号的唯一标识
        timestamp: weixin_token.timestamp, // 必填，生成签名的时间戳
        nonceStr: weixin_token.noncestr, // 必填，生成签名的随机串
        signature: weixin_token.signature,// 必填，签名，见附录1
        jsApiList: [
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'showOptionMenu',
            'scanQRCode'
        ]
    });

    wx.ready(function () {
        var shareTitle = '元旦不剁手，好礼码上拿';
        var shareDesc = '01月01日20:00扫码抢壕礼，50万壕礼当天巨献！先到先得，快来拼手速！'
        var shareImg = CDN + 'img/img-share.png';
        var shareLink = location.origin + '/app-hebei/index.html?share=true&cache=false';
        wxShare(shareTitle, shareDesc, shareImg, shareLink);
    })

    wx.error(function(res) {
        // alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
    });

    function wxShare(shareTitle, shareDesc, shareImg, shareLink) {
        // 朋友圈
        wx.onMenuShareTimeline({
            title: shareTitle, // 分享标题
            link: shareLink, // 分享链接
            imgUrl: shareImg, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        // 好友
        wx.onMenuShareAppMessage({
            title: shareTitle,
            desc: shareDesc,
            link: shareLink,
            imgUrl: shareImg,
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }

    // 添加cookie
    // $.cookie('the_cookie', 'the_value');

    // 判断当前用户规格是否符合活动要求
    $.ajax({
        url: '/act/rule/redrain003?now='+(new Date().getTime()),
        // url: 'https://cs.hmtx.cc/redrain/info?now='+(new Date().getTime()),
        type: 'POST',
        data: {'name': 'redinfo'},
        dataType: 'json'
    }).done(function(result) {
        var data = result.context;
        if(result.code) {
            $('.remain-num span').html(''+data.remain+'个');
            $('.total-num span').html(''+data.total+'个');
            $('.remain-num').show();
            // 是否有下一场
            hasNext = data.hasNext;
            // 判断是否参与过
            if(data.isJoined) {
                if(hasNext) {
                    $('.popup-con.already').show().find('.has-next').show();
                } else {
                    $('.popup-con.already').show().find('.no-next').show();
                }
            } else { // 如果未参与过
                // 如果是三种规格
                if(data.available) {
                    // 剩余红包为0
                    if(data.remain <= 0) {
                        // 并且还有下一场
                        if(hasNext) {
                            $('.popup-con.late-over').show().find('.late').show();
                        } else {// 没有下一场
                            $('.popup-con.late-over').show().find('.over').show();
                        }
                    } else {
                        // 两分钟内进来，获取当前距开始时间，然后调用倒计时
                        var startTime = data.stime;
                        var nowTime = data.now;
                        if(startTime < nowTime && data.etime > data.now) {
                            // 获取秒
                            // var nSecond = parseInt((startTime-nowTime)/1000%60);
                            // $('.thirty-seconds .seconds').html(nSecond);
                            // // 获取分
                            // var nMinute = parseInt((startTime-nowTime)/(1000*60));
                            // var thirtyMinutes = $('.thirty-seconds .minutes');
                            // var thirtyMinutesTimes = parseInt(thirtyMinutes.html());
                            // if(thirtyMinutesTimes < 10) {
                            //     thirtyMinutes.html('0'+nMinute);
                            // } else {
                            //     thirtyMinutes.html(nMinute);
                            // }
                            $("#id_showscan").hide();
                            $("#id_showback").click(function () {
                                history.go(-1);
                            }).show();
                            $('.game-con').hide();
                            $('.ui-rule').show().find('.btn-rule').click(function (e) {
                                $('.pop-rule').show().find('.close').click(function (e) {
                                    $('.pop-rule').hide();
                                });
                            });
                            // 扫一扫
                            $('.ui-rule button').click(function (e) {
                                // alert('扫一扫');
                                wx.scanQRCode({
                                    needResult: 0,
                                    scanType: ["qrCode","barCode"],
                                    success: function (res) {
                                        // window.location.href = res.resultStr;
                                    }
                                });
                            });
                            $(".ui-rule").hide();
                            // 能参与，倒计时开始
                            countDown();

                        }
                    }
                } else {
                    // 虽然对方参加不了，，还是给他看看效果吧
                    // packetDown = setInterval(add,800);
                    // 参与不了提示
                    // $('.popup-con.limit').show();
                    $("#id_showscan").show();
                    $("#id_showback").hide();
                    $('.game-con').hide();
                    $('.ui-rule').show().find('.btn-rule').click(function (e) {
                        $('.pop-rule').show().find('.close').click(function (e) {
                            $('.pop-rule').hide();
                        });
                    });
                    // 扫一扫
                    $('.ui-rule button').click(function (e) {
                        // alert('扫一扫');
                        wx.scanQRCode({
                            needResult: 0,
                            scanType: ["qrCode","barCode"],
                            success: function (res) {
                                // window.location.href = res.resultStr;
                            }
                        });
                    });
                }
            }
        } else {
          alert(result.msg || result.message);
        }
    }).fail(function(errorData) {
        alert('请求错误,请重试');
    });
    // countDown();

    // 倒计时
    function countDown() {
        $('.comming').show();

        function countFun() {
            var thirtyMinutes = $('.thirty-seconds .minutes');
            var thirtyMinutesTimes = parseInt(thirtyMinutes.html());

            var thirtySeconds = $('.thirty-seconds .seconds');
            var thirtySecondsTimes = parseInt(thirtySeconds.html());

            // 如果秒为0，那么分减1
            if(thirtySecondsTimes == 0 && thirtyMinutesTimes > 0) {
                // 设置分秒
                --thirtyMinutesTimes;
                thirtySecondsTimes = 60;
            }

            // 分大于0，或者分等于0 且 秒大于0
            if(thirtyMinutesTimes > 0 || (thirtyMinutesTimes == 0 && thirtySecondsTimes > 0)) {
                // 设置秒
                --thirtySecondsTimes;
            }

            if(thirtySecondsTimes < 10) {
                thirtySeconds.html('0'+thirtySecondsTimes);
            } else {
                thirtySeconds.html(thirtySecondsTimes);
            }
            // 设置分
            if(thirtyMinutesTimes < 10) {
                thirtyMinutes.html('0'+thirtyMinutesTimes);
            } else {
                thirtyMinutes.html(thirtyMinutesTimes);
            }

            // 处于30秒的倒计时
            if(thirtyMinutesTimes > 0 || (thirtyMinutesTimes == 0 && thirtySecondsTimes > 0)) {
                $('.thirty-seconds, .countdown em').show();
            } else {
                clearInterval(thirtyCount);
                $('.thirty-seconds, .countdown em').hide();
                $('.three-seconds').show();

                // 3秒倒计时
                var threeTimes = 6;
                var threeCount = setInterval(function() {
                    $("#show_"+(threeTimes)).hide();
                    $("#show_"+(--threeTimes)).show();
                    // 本身就是在setInterval里面，所以每次都会生成一个，导致有问题。
                    if(packetDown) {
                        clearInterval(packetDown);
                    }
                    // 倒计时结束时操作
                    if(threeTimes == 0) {
                        prizeInfo(); // 其他人中奖信息接口
                        remain(); // 获取当前剩余红包数，5秒调用一次
                        clearInterval(threeCount); // 清除倒计时
                        $('.comming').hide();
                        $('.game-con').show();
                        packetDown = setInterval(add,800);
                    }
                }, 1000);
            }
        }
        // countFun();
        // 30秒倒计时
        var thirtyCount = setInterval(function() {
            countFun();
        }, 1000);
    }


    // 获取当前剩余红包数，5秒调用一次
    var remainInt;
    var remainNum = $('.remain-num span');
    function remain() {
        // 这样的5秒一循环是有bug的，必须清除。。
        if(remainInt) {
            clearTimeout(remainInt);
        }

        $.ajax({
            url: '/act/rule/redrain003',
            // url: 'https://cs.hmtx.cc/redrain/info',
            type: 'POST',
            data: {'name': 'redinfo'},
            dataType: 'json'
        }).done(function(result) {
            var data = result.context;
            var nowRemain = data.remain;
            remainNum.html(nowRemain);

            remainInt = setTimeout(function() {
                if(nowRemain && nowRemain != 0) {
                    remain();
                } else {
                    clearTimeout(remainInt);
                }
            }, 5000);
        }).fail(function(errorData) {
            // alert('请求错误,请重试');
            console.log('请求错误,请重试');
        });
    }

    // 其他人获奖信息
    function prizeInfo() {
        $.ajax({
            url: '/act/rule/redrain003',
            // url: 'https://cs.hmtx.cc/redrain/latest',
            type: 'POST',
            data: {'name': 'redlatest'},
            dataType: 'json'
        }).done(function(result) {
            var data = result.context;
            // console.log(data)
            if(data) {
                $('.prized-con').show();

                $.each(data, function(i) {
                    $('.prized-main ul').append('<li>恭喜 <span class="ellipsis"> '+ data[i].nickname +' </span> <p>获得<span>' + data[i].amount + '</span>元红包</p></li>');
                });

                var liHeight = $('.prized-main li').height();
                if($('.prized-main li').length <= 2) {
                    $('.prized-main').addClass('less');
                } else {
                    startmarquee(liHeight,20,1500);
                }
            }
        }).fail(function(errorData) {
            alert('请求错误,请重试');
        });
    }

    // 消息滚动
    function startmarquee(lh,speed,delay) {
        var m=false;
        var t;
        var marqueebox=document.getElementsByClassName("prized-main")[0]; // 第一部分
        marqueebox.innerHTML+=marqueebox.innerHTML;
        marqueebox.style.marginTop=0;

        function start(){
            t=setInterval(scrolling,speed);
            if(!m) {
                marqueebox.style.marginTop=parseInt(marqueebox.style.marginTop)-1+"px";
            }
        }

        /* 滚动函数 */
        function scrolling(){
            if(parseInt(marqueebox.style.marginTop)%lh!=0){
                marqueebox.style.marginTop=parseInt(marqueebox.style.marginTop)-1+"px";
                if(Math.abs(parseInt(marqueebox.style.marginTop))>=marqueebox.scrollHeight/2) marqueebox.style.marginTop=0;
                }else{
                    clearInterval(t);
                    setTimeout(start,delay);
                }
            }
            setTimeout(start,delay);
        }

        // 立即领取
        $('.prize .get-btn').click(function() {
            $('.prize-show').hide();
            // $('.prize-get').show();
            $('.ui-wxpng').find('img.close').click(function () {
                window.location.href = HOME_URL;
            });
            //$('.ui-wxpng').find('img.png').attr('src', sessionStorage.getItem('wx-info'));
            $('.ui-wxpng').show();
        })
        // 返回
        $('.btn-s-r').click(function() {
            // window.history.back(); //不会刷新
            // history.back();location.reload(); // 没有测试
            window.location.href = HOME_URL; //
        })
        // 分享
        $('.share-btn').click(function() {
            $('.share-arrow').show();
        })


        // *********** 红包掉落js   start ***********
        var win = (parseInt($(".game-list").css("width"))) - 60;
        $(".game-con, .game-list").css("height", document.documentElement.getBoundingClientRect().height);
        $("li").css({});

        // 初始num值
        var num = 0;
        var add = function() {
            // var imageNum = parseInt(Math.random() * (3 - 1) + 1); // 图片编号
            var packetWidth = parseInt(Math.random() * 36 + 70); // 宽度
            var Left = parseInt(Math.random() * (win - 0) + 0); // 距左边界位置
            var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg"; // 旋转
            num++;

            // 容器里添加元素
            $(".game-list").append("<li class='li" +num+ "'><img class='img_packet' md='img_packet' md_name='元旦红包雪，掉落红包点击次数' src='"+CDN+"img/packet.png'></li>");

            if($('.game-list li:last-child img').hasClass('img_1')) {
                // 层级增高，防止点不中
                $('.game-list li:last-child').addClass('high');
            }

            $(".li" + num).css({
                "left": Left,
            });

            // 设置图片大小、旋转
            $(".li" + num + " img").css({
                "width": packetWidth,
                "transform": "rotate(" + rot + ")",
            });

            // $(".li" + num).animate({'top': $(window).height()+200},5000,function(){
            //   //删掉已经显示的红包
            //   this.remove()
            // });
            $('.game-list').on('webkitAnimationEnd', $(".li" + num), function(e) {
                e.target.remove();
            });
        }

        // setInterval(add,800);
        // $('.packet').show().find('img').addClass('ani');

        //点击红包的时候弹出模态层
        var packetIsClick = true; // 是否可点击
        $('.game-list').on('click', 'li .img_packet', function(e){
            if(packetIsClick) {
            packetIsClick = false; // 设置为不可点击
            $.ajax({
                url: '/act/rule/redrain003',
                // url: 'https://cs.hmtx.cc/redrain/join',
                type: 'POST',
                data: {'name': 'reddraw'},
                dataType: 'json',
                beforeSend: function() {$('.loading-con').show();}
            }).done(function(result) {
                packetIsClick = true;
                $('.loading-con').hide();
                var data = result.context || {};

                // 点开动画
                $('.packet').show().find('img').addClass('ani');
                setTimeout(function(){
                    $('.packet').hide();
                    packetClick();
                }, 2000)

                function packetClick() {
                    if(result.code == 1) {
                        // isNew表示是否参加过这一场了
                        // 停止掉落
                        clearInterval(packetDown);
                        $('.prize').show().find('.money span').html(data.amount);
                        // $('.prize').find('.prize-get .title').html(data.memo);
                    } else if (result.code == 700002) {
                        $('.popup-con.late-over').show().find('.over').show();
                    } else {
                        alert(result.msg);
                    }
                }

            }).fail(function(errorData) {
                packetIsClick = true;
                $('.loading-con').hide();
                alert('请求错误,请重试');
            });
        } else {
            e.preventDefault();
        }
    });
    // *********** 红包掉落js   end ***********
})()


