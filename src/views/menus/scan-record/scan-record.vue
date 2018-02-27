<template>
    <div id="root">
        <sa-page-load ishow="1"></sa-page-load>
        <!-- 扫码记录列表 -->
        <div class="lis border-box">
            <ul>
                <li v-for="(item, index) in data" :key ="index">
                    <span class="fl">{{item.key}}</span>
                    <span class="fr">{{item.cnt}}&nbsp;次</span>
                </li>
            </ul>
        </div>
    <div class="bottom border-box" :class="invisible">
        <p>如果你购买的是新烟且以上扫码记录您并不知情，请点击标记</p>
        <div :class="CLASSNAME" md="hb_8_sign" md_name="标记假烟" @click="sign">
            {{message}}
        </div>
    </div>
    </div>
</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import Lib from 'assets/js/Lib'              // 工具库
    let sn = sessionStorage.getItem("sn");
    let code = sessionStorage.getItem("code");
    export default {
        data() {
            return {
                CLASSNAME: "orange",
                invisible: "invisible",
                message: "标记假烟",
                data: {}
            }
        },
        components: {
            SaPageLoad
        },
        created() {
            let that = this;
            Lib.ajax({
                url: "/platform_v2/getCommonPage",
                method: "post",
                data: {
                    moudleKey: "SCAN_CODE_CHECK_HISTORY"
                },
                success: res => {
                    if(res.ret === "200000") {
                        var src = "https://weblog.taozuike.com/md/new_state.js";
                        var Ele = document.getElementsByTagName("script")[0];
                        var v = document.createElement("script") || window.document.createElement("script");
                        v.src = src;
                        v.async = true;
                        v.type = 'text/javascript';
                        Ele.parentNode.insertBefore(v,Ele);
                        window.getpagestatistics = function() {
                            return {
                                pageId: res.data.returnStr,
                                sourceId: Lib.getUrlQuery("sourceId")
                            }
                        };
                    }
                }
            })
            Lib.ajax({
                url: "/act_v2/scanListBySn",
                method: "post",
                data: {
                    sn: sn,
                    code: code
                },
                success: res => {
                    if (res.ret === "200000") {
                        that.data = res.data.list;
                        that.invisible = "visible";
                        //是否已经标记
                        if (res.data.feedFlag) {
                            that.CLASSNAME = "gray";
                            that.message = "已标记";
                        } else {
                            that.CLASSNAME = "orange";
                            that.message = "标记假烟";
                        }
                    }
                }
            })

        },
        methods: {
            sign() {
                let target = event.target;
                let that = this; 
                if (target.className==="orange") {
                    Lib.ajax({
                        url: "/act_v2/saveFeed",
                        method: "post",
                        data: {
                            sn: sn,
                            code: code,
                            feedContent: "有意见"
                        },
                        success: res => {
                           if(res.ret === "200000") {
                            that.CLASSNAME = "gray";
                            that.message = "已标记";
                           } else {
                               alert(res.msg)
                           }
                        }
                    })
                }
            }

        }
    }
</script>
<style type="text/css" lang="less">
    .border-box {
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    .lis {
        width: 100%;
        background-color: #ffffff;
        padding: 0 55px;
        ul {
            li {
                width: 100%;
                border-bottom: 1px solid #E6E6E6;
                line-height: 87px;
                overflow: hidden;
                span.fl {
                    padding-left: 26px;
                    font-size: 28px;
                    color: rgba(81,81,81,1);
                }
                span.fr {
                    font-size: 32px;
                    color: rgba(254,120,6,1);
                    padding-right: 26px
                }
            }
        }
    }
    .bottom {
        width: 100%;
        height: 208px;
        background-color: rgba(245,245,245,1);
        >p {
            line-height: 80px;
            color: rgba(153,153,153,1);
            font-size: 20px;
            text-align: center;
        }
        >div {
            width: 690px;
            height: 98px;
            margin: 0 auto;
            line-height: 98px;
            text-align: center;
            color: #fff;
            font-size: 32px;
        }
        >.orange {
            background-color: rgba(254,120,6,1);
        }
        >.gray {
            background-color: rgba(200,200,200,1);
        }

    }
</style>
