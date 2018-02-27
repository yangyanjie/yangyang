<template>
    <div id="root">
        <div class="header-wrap border">
            <div class="header-title">
                {{productDetail.name}}
            </div>
            <div class="header-content">
                <p>生产商：{{productDetail.orgName}}</p>
                <!-- <p>厂商官方服务电话：<a :href="'tel:'+productDetail.tel">{{productDetail.tel}}</a></p>
                <a :href="'tel:'+productDetail.tel"><img src="./img/home_detail_phone.png" /></a> -->
            </div>
        </div>
        <div class="information-wrap">
            <div class="information-title">
                基本信息
            </div>
            <div class="information-content">
                <p>类型: {{productDetail.typeName}}</p>
                <p>烟支规格: {{productDetail.lengthmm}}</p>
                <p>焦油含量: {{productDetail.oil}}mg</p>
                <p>烟气一氧化碳量: {{productDetail.carbonMonoxide}}mg</p>
                <p>烟气烟碱量: {{productDetail.nicotine}}mg</p>
            </div>
            <div class="information-img">
                <img :src='productDetail.smallPic' />
            </div>
        </div>
    </div>
</template>

<script>
    import SaPageLoad from 'components/pageload.directive'
    import Lib from 'assets/js/Lib'              // 工具库
    export default {
        data() {
            return {
                productDetail:{
                    name: ''
                }
            }
        },
        created() {
            let that = this;
            Lib.ajax({
                url:"/award_v2/queryProductDetail",
                method: "post",
                data: {
                    sn: sessionStorage.getItem("sn")
                },
                success: res => {
                    if (res.ret === "200000") {
                        that.productDetail = Object.assign(that.productDetail,res.data.orgV2,res.data.product,res.data.tobaccoPropertyV2);
                        // console.log(that.productDetail)
                    } else {
                        alert(res.message);
                    }
                }
            })
        },
        mounted(){
            // debugger
            // console.log(this.productDetail)
        },
        methods: {}
    }
</script>
<style type="text/css" lang="less">
    html {
        height: 100%;
        background-color: #eee;
        body {
            width: 100%;
            min-height: 100%;
        }
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
        .header-wrap {
            width: 100%;
            height: 318px;
            background-color: #fff;
            padding-left: 29px;
            margin-bottom: 20px;
            .header-title {
                height: 164px;
                line-height: 164px;
                font-size: 44px;
                color: rgba(51,51,51,1);
                font-weight: bolder;
            }
            .header-content {
                font-size: 28px;
                color: rgba(129,129,129,1);
                position: relative;
                p {
                    line-height: 70px;
                    a {
                        color: rgba(254,120,6,1);
                        font-size: 32px;
                    }
                }
                >a {
                    display: block;
                    position: absolute;
                    width: 88px;
                    height: 88px;
                    right: 75px;
                    bottom: 30px;
                    img {
                        width: 100%;
                    }
                }
            }
        }
        .information-wrap {
            width: 100%;
            height: 499px;
            background-color: #fff;
            padding-left: 30px;
            position: relative;
            .information-title {
                height: 136px;
                line-height: 136px;
                font-size: 32px;
                font-weight: bolder;
            }
            .information-content {
                font-size: 28px;
                color: rgba(129,129,129,1);
                p {
                    line-height: 55px;
                }
            }
            .information-img {
                width: 175px;
                height: 335px;
                position: absolute;
                right: 52px;
                top: 100px;
                img {
                    width: 100%;
                }
            }
        }
    }
</style>


