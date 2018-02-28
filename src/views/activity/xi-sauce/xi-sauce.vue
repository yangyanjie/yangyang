<template>
    <div class="xi-sauce-main">
        <div class="xi-sauce-bg">
            <div class="xi-sauce-title">
                <img class = "xi-sauce-img" src="./imgs/xi-sauce-title.png" alt=""/>
            </div>
            <div class="xi-sauce-activity-main">
                <button class="xi-sauce-rule-btn">活动<br>规则</button>
                <div class="xi-sauce-activity-con">
                    <div class="xi-sauce-activity-pannel" >
                        <ul class="xi-sauce-activity-wrapper" ref="activityWrapper">
                            <li class="xi-sauce-activity-item">
                                <img class = "xi-sauce-item-img" src="./imgs/1.jpeg" alt="" />
                                <span class="xi-sauce-item-tip">习酱行军壶酒<br>不锈钢一瓶</span>
                            </li>
                            <li class="xi-sauce-activity-item">
                                <img class = "xi-sauce-item-img" src="./imgs/1.jpeg" alt="" />
                                <span class="xi-sauce-item-tip">习酱行军壶酒<br>不锈钢一瓶</span>
                            </li>
                            <li class="xi-sauce-activity-item">
                                <img class = "xi-sauce-item-img" src="./imgs/1.jpeg" alt="" />
                                <span class="xi-sauce-item-tip">习酱行军壶酒<br>不锈钢一瓶</span>
                            </li>
                            <li class="xi-sauce-activity-item">
                                <img class = "xi-sauce-item-img" src="./imgs/1.jpeg" alt="" />
                                <span class="xi-sauce-item-tip">习酱行军壶酒<br>不锈钢一瓶</span>
                            </li>
                            <li class="xi-sauce-activity-item">
                                <img class = "xi-sauce-item-img" src="./imgs/1.jpeg" alt="" />
                                <span class="xi-sauce-item-tip">习酱行军壶酒<br>不锈钢一瓶</span>
                            </li>
                            <li class="xi-sauce-activity-item">
                                <img class = "xi-sauce-item-img" src="./imgs/1.jpeg" alt="" />
                                <span class="xi-sauce-item-tip">习酱行军壶酒<br>不锈钢一瓶</span>
                            </li>
                        </ul>
                        <button class="xi-sauce-activity-needle"></button>
                    </div>
                </div>
            </div>
            <div class="xi-sauce-broadcast-con"></div>
        </div>
    </div>    
</template>

<script type="text/javascript">
    
</script>
<style type="text/css" lang="less">
    .xi-sauce-main {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #CD0707;
        .xi-sauce-bg {
            position: absolute;
            width: 100%;
            height: 100%;
            background: url(./imgs/xi-sauce-bg.png) no-repeat center;
            background-size: 100% 100%; 
            .xi-sauce-title {
                margin: 40px 0 0;
                width:100%;
                height: 182px;
                .xi-sauce-img {
                    width: 100%;
                }
            }
            .xi-sauce-activity-main {
                margin: 20px 0 10px;
                position: relative;
                width: 100%;
                height: 806px;
                    .xi-sauce-rule-btn {
                        position: absolute;
                        right: 0;
                        top: 0;
                        display: block;
                        width:117px;
                        height:107px; 
                        background:rgba(0,0,0,0.5);
                        border-radius: 54px 0 0 54px;
                        font-size:32px;
                        color:#F7EAA4;
                        line-height:36px;
                    }
                    .xi-sauce-activity-con {
                        overflow: hidden;
                        margin: 0 56px 14px;
                        width: 636px;
                        height: 806px;
                        background: url(./imgs/activity-con.png) no-repeat center;
                        background-size: 100% 100%;
                    .xi-sauce-activity-pannel {
                        position: relative;
                        margin: 177px 15px 0;
                        width: 606px;
                        height: 608px;
                        background: url(./imgs/activity-pannel.png) no-repeat center;
                        background-size: 100% 100%;  
                    }
                    .xi-sauce-activity-wrapper {
                        overflow: hidden;
                        width: 100%;
                        height: 100%;
                        .xi-sauce-activity-item {
                            position: absolute;
                            margin: 18px 0 0 228px;
                            width: 150px;
                            height: 170px;
                            .xi-sauce-item-img {
                                width: 100%;
                                height: 113px;
                            }
                            .xi-sauce-item-tip {
                                display: block;
                                margin: 5px 0 0 8px;
                                width: 130px;
                                height: 48px;
                                font-size: 20px !important;
                                font-family: "PingFang SC";
                                line-height: 24px;
                                text-align: center;
                                color: #F7EAA4;
                            }
                        }
                        .xi-sauce-activity-item:nth-of-type(2) {
                            transform-origin: 50% 286px;
                            transform: rotate(60deg);
                        }
                        .xi-sauce-activity-item:nth-of-type(3) {
                            transform-origin: 50% 286px;
                            transform: rotate(120deg);
                        }
                        .xi-sauce-activity-item:nth-of-type(4) {
                            transform-origin: 50% 286px;
                            transform: rotate(180deg);
                        }
                        .xi-sauce-activity-item:nth-of-type(5) {
                            transform-origin: 50% 286px;
                            transform: rotate(240deg);
                        }
                        .xi-sauce-activity-item:nth-of-type(6) {
                            transform-origin: 50% 286px;
                            transform: rotate(300deg);
                        }
                        
                    }
                    .xi-sauce-activity-needle {
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        width: 212px;
                        height: 204px;
                        background: url(./imgs/activity-needle.png) no-repeat center;
                        background-size: 100% 100%; 
                    }

                }
            }
            
            .xi-sauce-broadcast-con {
                margin: 0 30px;
                width: 690px;
                height: 98px;
                background:rgba(0,0,0,0.5);
                border-radius: 18px;
            }
        }
    }
</style>